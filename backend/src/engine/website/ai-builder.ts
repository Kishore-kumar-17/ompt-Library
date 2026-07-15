// ─── Website AI Builder ─────────────────────────────────────────────────────────
// Website family bypasses the generic multi-stage pipeline entirely (see
// engine/modules/builder.ts) because platformRegistry collides on 5 platform
// IDs shared with image/text/code (chatgpt, claude, gemini, grok, cursor).
// This is a single dedicated AI call instead — same shape as how
// engine/modules/improver.ts already does one system-prompt call per family,
// just extracted to its own module since builder.ts has no equivalent
// per-family call to hook into.

import { nanoid } from "nanoid";
import { db } from "../../db/client.js";
import { builtPrompts } from "../../db/schema.js";
import { getAIService } from "../ai/service.js";
import { MODEL_TIER } from "../ai/models.js";
import { scorePrompt } from "../pipeline/prompt-scorer.js";
import { WEBSITE_FORMULA } from "./system-prompts.js";
import { WEBSITE_PLATFORM_FORMULAS } from "./platform-prompts.js";
import type { BuildRequest, BuildResult } from "../types.js";

export async function buildWebsiteWithAI(
  request: BuildRequest,
  userId: string | null,
  platform: string
): Promise<BuildResult> {
  const system = `${WEBSITE_FORMULA}\n\n${WEBSITE_PLATFORM_FORMULAS[platform] ?? ""}`;

  const ai = getAIService();
  const startedAt = Date.now();
  const res = await ai.complete({
    model: MODEL_TIER.QUALITY,
    system,
    // request.idea already carries the frontend's structured selections
    // (category/subCategory/audience/palette/pages) folded in as parenthetical
    // hints by routes/builder.ts's normalizeBuildRequest — an LLM parses that
    // prose fine, so no separate structured payload is needed here.
    messages: [{ role: "user", content: request.idea }],
    maxTokens: 4000,
  });

  const prompt = res.text.trim();
  const runId = nanoid();

  let score: BuildResult["score"] = null;
  try {
    score = await scorePrompt(prompt, platform, "website");
  } catch {
    // Non-fatal — generation already succeeded even if scoring fails
  }

  try {
    await db.insert(builtPrompts).values({
      userId,
      categoryId: request.category ?? null,
      platformId: platform,
      fieldValues: { idea: request.idea },
      generatedPrompt: prompt,
      qualityScore: score?.overall ?? null,
      scoreGrade: score?.grade ?? null,
      tokensUsed: res.inputTokens + res.outputTokens,
      durationMs: Date.now() - startedAt,
      runId,
    });
  } catch {
    // Non-fatal — generation succeeded even if persistence fails
  }

  return {
    prompt,
    platform,
    family: "website",
    score,
    runId,
    tokensUsed: res.inputTokens + res.outputTokens,
  };
}
