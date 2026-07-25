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

// Word-set (Jaccard) similarity — catches "improved" a prompt that's already
// in the target format by trivially swapping synonyms sentence-for-sentence
// (same structure, same length, same word order) rather than genuinely
// deepening it. A plain equality check misses this: the text isn't
// byte-identical, just barely reworded.
function tooSimilar(a: string, b: string): boolean {
  const words = (s: string) => new Set(s.toLowerCase().match(/[a-z0-9]+/g) ?? []);
  const wa = words(a), wb = words(b);
  if (wa.size === 0 || wb.size === 0) return false;
  let shared = 0;
  for (const w of wa) if (wb.has(w)) shared++;
  const jaccard = shared / (wa.size + wb.size - shared);
  return jaccard > 0.82;
}

const ANTI_ECHO_INSTRUCTION = `
IMPORTANT: If the input is already close to this format (e.g. it's a prior AI-generated prompt being refined further), do not just restructure it or swap words for synonyms — you must genuinely deepen it: add sensory/technical detail the input lacks, sharpen vague phrasing, tighten camera/lighting/motion specificity. Never return something that's merely a reworded paraphrase of the input with the same structure and length.`;

export async function improveVideoWithAI(
  request: ImproveRequest,
  userId: string | null
): Promise<ImproveResult> {
  const system = `${VIDEO_FORMULA}\n\n${VIDEO_PLATFORM_FORMULAS[request.platform] ?? ""}${ANTI_ECHO_INSTRUCTION}`;
  const userMessage = `Restructure this video idea/prompt into the format above, for the ${request.platform} platform. If it's already in that format, materially deepen and enrich it instead of just reformatting or rewording it:\n\n${request.prompt}`;

  let scoreBefore = null;
  try {
    scoreBefore = await scorePrompt(request.prompt, request.platform, "video");
  } catch { /* non-fatal */ }

  const ai = getAIService();
  const res = await ai.complete({
    model: MODEL_TIER.QUALITY,
    system,
    messages: [{ role: "user", content: userMessage }],
    maxTokens: 3500,
  });

  let improved = res.text.trim();
  let tokensUsed = res.inputTokens + res.outputTokens;

  // Safety net: one retry with an explicit correction if the result is a
  // near-paraphrase rather than a real improvement.
  if (tooSimilar(improved, request.prompt)) {
    try {
      const retryRes = await ai.complete({
        model: MODEL_TIER.QUALITY,
        system,
        messages: [
          { role: "user", content: userMessage },
          { role: "assistant", content: res.text },
          { role: "user", content: "That response was barely reworded from the input — you did not actually improve anything. Rewrite it now with concrete, material changes: real added detail, sharper specificity, not synonym substitutions." },
        ],
        maxTokens: 3500,
      });
      tokensUsed += retryRes.inputTokens + retryRes.outputTokens;
      const retryImproved = retryRes.text.trim();
      if (!tooSimilar(retryImproved, request.prompt)) improved = retryImproved;
    } catch { /* keep the original result if the retry itself fails */ }
  }

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
