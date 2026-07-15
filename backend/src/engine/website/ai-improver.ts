// ─── Website AI Improver ────────────────────────────────────────────────────────
// Bypasses engine/modules/improver.ts's shared buildSystemPrompt()/parseResponse()
// JSON contract entirely. Two reasons that path doesn't work for website:
// 1. WEBSITE_FORMULA's own rules say "output ONLY the structured prompt text,
//    no JSON" — directly conflicting with the generic improve flow's appended
//    "respond with valid JSON only" instruction, which confuses the model into
//    nesting/duplicating output.
// 2. Asking an LLM to JSON-escape hundreds of lines of code-heavy output
//    (backticks, braces, nested quotes) is fragile — the generic path's
//    parseResponse() has a lossy fallback for this, but website output hits it
//    routinely rather than as a rare edge case.
// Same rationale as engine/website/ai-builder.ts's raw-text response.

import { db } from "../../db/client.js";
import { improvedPrompts } from "../../db/schema.js";
import { getAIService } from "../ai/service.js";
import { MODEL_TIER } from "../ai/models.js";
import { scorePrompt } from "../pipeline/prompt-scorer.js";
import { WEBSITE_FORMULA } from "./system-prompts.js";
import { WEBSITE_PLATFORM_FORMULAS } from "./platform-prompts.js";
import type { ImproveRequest, ImproveResult, ImproverChange } from "../types.js";

export async function improveWebsiteWithAI(
  request: ImproveRequest,
  userId: string | null
): Promise<ImproveResult> {
  const system = `${WEBSITE_FORMULA}\n\n${WEBSITE_PLATFORM_FORMULAS[request.platform] ?? ""}`;

  let scoreBefore = null;
  try {
    scoreBefore = await scorePrompt(request.prompt, request.platform, "website");
  } catch { /* non-fatal */ }

  const ai = getAIService();
  const res = await ai.complete({
    model: MODEL_TIER.QUALITY,
    system,
    messages: [{
      role: "user",
      content: `Restructure this website idea/prompt into the format above, for the ${request.platform} platform:\n\n${request.prompt}`,
    }],
    maxTokens: 4000,
  });

  const improved = res.text.trim();
  const tokensUsed = res.inputTokens + res.outputTokens;

  let scoreAfter = null;
  try {
    scoreAfter = await scorePrompt(improved, request.platform, "website");
  } catch { /* non-fatal */ }

  const delta = scoreBefore !== null && scoreAfter !== null ? scoreAfter.overall - scoreBefore.overall : null;

  const changes: ImproverChange[] = [
    { label: "Restructured into the 10-section Website Formula (role, overview, brand voice, features, design specifications, structure, technical specifications, implementation steps, UX, constraints)", applied: true },
    { label: `Adapted to ${request.platform}'s native prompting style`, applied: true },
  ];

  try {
    await db.insert(improvedPrompts).values({
      userId,
      originalText: request.prompt,
      improvedText: improved,
      platformId: request.platform,
      changesSummary: changes,
      scoreBefore: scoreBefore?.overall ?? null,
      scoreAfter: scoreAfter?.overall ?? null,
      scoreDelta: delta ?? null,
      tokensUsed,
    });
  } catch {
    // Non-fatal — improve already succeeded even if persistence fails
  }

  return {
    improved,
    changes,
    platform: request.platform,
    family: "website",
    scoreBefore,
    scoreAfter,
    delta,
    tokensUsed,
  };
}
