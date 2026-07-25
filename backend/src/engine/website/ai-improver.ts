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

// Word-set (Jaccard) similarity — catches "improved" output that's already
// in the target format getting passed through with only cosmetic noise
// (a moved code fence, a trailing markdown line-break) rather than a real
// improvement pass. A plain equality check misses this: the text isn't
// byte-identical, just barely touched.
function tooSimilar(a: string, b: string): boolean {
  const words = (s: string) => new Set(s.toLowerCase().match(/[a-z0-9]+/g) ?? []);
  const wa = words(a), wb = words(b);
  if (wa.size === 0 || wb.size === 0) return false;
  let shared = 0;
  for (const w of wa) if (wb.has(w)) shared++;
  const jaccard = shared / (wa.size + wb.size - shared);
  return jaccard > 0.82;
}

// Catches a different failure shape than tooSimilar(): the model treating an
// already-structured input as raw material and pasting large verbatim chunks
// of it back into a *newly* generated document (e.g. re-describing the whole
// prior spec inside a fresh "Section 2 Overview"). That produces genuinely
// new surrounding text, which can pull the overall Jaccard score back under
// the tooSimilar() threshold even though a large block was just duplicated —
// checking a few slices of the input for a literal match in the output finds
// it directly instead of relying on the aggregate word-overlap ratio.
function containsVerbatimChunk(output: string, input: string, chunkLen = 200): boolean {
  const trimmedInput = input.trim();
  if (trimmedInput.length < chunkLen) return false;
  const offsets = [0, Math.floor(trimmedInput.length / 3), Math.floor((trimmedInput.length * 2) / 3)];
  return offsets.some((start) => {
    const chunk = trimmedInput.slice(start, start + chunkLen);
    return chunk.length === chunkLen && output.includes(chunk);
  });
}

const ANTI_ECHO_INSTRUCTION = `
IMPORTANT: If the input is already close to this format (e.g. it's a prior AI-generated prompt being refined further), do not just pass it through with cosmetic formatting tweaks — you must genuinely improve it: sharpen vague requirements, add missing specificity to features/design-specs, strengthen weak sections. Never return something that's substantively the same content as the input. Never quote or re-embed large verbatim chunks of the input text inside your output — e.g. do not paste the input into a "business description" or "overview" section, and do not describe the input as if it were the client's raw business brief. Edit the existing sections in place with real improvements; never create a new section that just restates the input, and never repeat a section number.`;

export async function improveWebsiteWithAI(
  request: ImproveRequest,
  userId: string | null
): Promise<ImproveResult> {
  const system = `${WEBSITE_FORMULA}\n\n${WEBSITE_PLATFORM_FORMULAS[request.platform] ?? ""}${ANTI_ECHO_INSTRUCTION}`;
  const userMessage = `Restructure this website idea/prompt into the format above, for the ${request.platform} platform. If it's already in that format, materially improve and enrich it instead of just passing it through:\n\n${request.prompt}`;

  let scoreBefore = null;
  try {
    scoreBefore = await scorePrompt(request.prompt, request.platform, "website");
  } catch { /* non-fatal */ }

  const ai = getAIService();
  const res = await ai.complete({
    model: MODEL_TIER.QUALITY,
    system,
    messages: [{ role: "user", content: userMessage }],
    maxTokens: 4000,
  });

  let improved = res.text.trim();
  let tokensUsed = res.inputTokens + res.outputTokens;

  // Safety net: one retry with an explicit correction if the result is
  // substantively a pass-through, or literally re-embeds chunks of the
  // input, rather than a real improvement.
  if (tooSimilar(improved, request.prompt) || containsVerbatimChunk(improved, request.prompt)) {
    const correction = containsVerbatimChunk(improved, request.prompt)
      ? "That response pasted large verbatim chunks of the input back into the output — e.g. re-describing the entire prior spec inside a new or existing section. Do not quote or re-embed the input's raw text anywhere in your response. Edit the existing sections in place with real improvements; do not create a section that just restates the input, and do not repeat any section number."
      : "That response was substantively the same as the input — you did not actually improve anything. Rewrite it now with concrete, material changes: real added specificity, strengthened sections, not cosmetic formatting tweaks.";
    try {
      const retryRes = await ai.complete({
        model: MODEL_TIER.QUALITY,
        system,
        messages: [
          { role: "user", content: userMessage },
          { role: "assistant", content: res.text },
          { role: "user", content: correction },
        ],
        maxTokens: 4000,
      });
      tokensUsed += retryRes.inputTokens + retryRes.outputTokens;
      const retryImproved = retryRes.text.trim();
      if (!tooSimilar(retryImproved, request.prompt) && !containsVerbatimChunk(retryImproved, request.prompt)) {
        improved = retryImproved;
      }
    } catch { /* keep the original result if the retry itself fails */ }
  }

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
