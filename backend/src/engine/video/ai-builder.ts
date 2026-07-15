// ─── Video AI Builder ────────────────────────────────────────────────────────────
// A dedicated AI call for video family, same shape as engine/website/ai-builder.ts
// and for the same reason: the generic multi-stage pipeline has no concept of
// the 15-section + 6-extras video structure, and platformRegistry doesn't even
// recognize 2 of the 5 platforms the UI actually offers (seedance, higgsfield).
// Bypassing the pipeline sidesteps both problems at once.

import { nanoid } from "nanoid";
import { db } from "../../db/client.js";
import { builtPrompts } from "../../db/schema.js";
import { getAIService } from "../ai/service.js";
import { MODEL_TIER } from "../ai/models.js";
import { scorePrompt } from "../pipeline/prompt-scorer.js";
import { VIDEO_FORMULA } from "./system-prompts.js";
import { VIDEO_PLATFORM_FORMULAS } from "./platform-prompts.js";
import type { BuildRequest, BuildResult } from "../types.js";

export async function buildVideoWithAI(
  request: BuildRequest,
  userId: string | null,
  platform: string
): Promise<BuildResult> {
  const system = `${VIDEO_FORMULA}\n\n${VIDEO_PLATFORM_FORMULAS[platform] ?? ""}`;

  const ai = getAIService();
  const startedAt = Date.now();
  const res = await ai.complete({
    model: MODEL_TIER.QUALITY,
    system,
    // request.idea already carries the frontend's structured selections
    // (duration/camera movement/pacing/sound design/mood/style) folded in as
    // parenthetical hints by routes/builder.ts's normalizeBuildRequest.
    messages: [{ role: "user", content: request.idea }],
    maxTokens: 3500,
  });

  const prompt = res.text.trim();
  const runId = nanoid();

  let score: BuildResult["score"] = null;
  try {
    score = await scorePrompt(prompt, platform, "video");
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
    family: "video",
    score,
    runId,
    tokensUsed: res.inputTokens + res.outputTokens,
  };
}
