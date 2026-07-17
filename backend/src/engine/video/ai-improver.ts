// ─── Video AI Improver ───────────────────────────────────────────────────────────
// Bypasses engine/modules/improver.ts's shared buildSystemPrompt()/parseResponse()
// JSON contract, same reasoning and shape as engine/website/ai-improver.ts:
// VIDEO_FORMULA's own "output raw text only" rule conflicts with the generic
// flow's "respond with JSON" instruction, and JSON-escaping long prose output
// is fragile. Raw text in, raw text out, with a fixed descriptive changes list.

import { db } from "../../db/client.js";
import { improvedPrompts } from "../../db/schema.js";
import { getAIService } from "../ai/service.js";
import { MODEL_TIER } from "../ai/models.js";
import { scorePrompt } from "../pipeline/prompt-scorer.js";
import { VIDEO_FORMULA } from "./system-prompts.js";
import { VIDEO_PLATFORM_FORMULAS } from "./platform-prompts.js";
import type { ImproveRequest, ImproveResult, ImproverChange } from "../types.js";

export async function improveVideoWithAI(
  request: ImproveRequest,
  userId: string | null
): Promise<ImproveResult> {
  const system = `${VIDEO_FORMULA}\n\n${VIDEO_PLATFORM_FORMULAS[request.platform] ?? ""}`;

  let scoreBefore = null;
  try {
    scoreBefore = await scorePrompt(request.prompt, request.platform, "video");
  } catch { /* non-fatal */ }

  const ai = getAIService();
  const res = await ai.complete({
    model: MODEL_TIER.QUALITY,
    system,
    messages: [{
      role: "user",
      content: `Restructure this video idea/prompt into the format above, for the ${request.platform} platform:\n\n${request.prompt}`,
    }],
    maxTokens: 3500,
  });

  const improved = res.text.trim();
  const tokensUsed = res.inputTokens + res.outputTokens;

  let scoreAfter = null;
  try {
    scoreAfter = await scorePrompt(improved, request.platform, "video");
  } catch { /* non-fatal */ }

  const delta = scoreBefore !== null && scoreAfter !== null ? scoreAfter.overall - scoreBefore.overall : null;

  const changes: ImproverChange[] = [
    { label: "Restructured to cover all 15 video-formula sections (shot type, subject, action, environment, lighting, camera movement, time/weather, style, quality tag, audio, aspect ratio, duration, color grade, mood, physics/motion)", applied: true },
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
    family: "video",
    scoreBefore,
    scoreAfter,
    delta,
    tokensUsed,
  };
}
