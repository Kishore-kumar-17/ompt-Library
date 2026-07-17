import { db } from "../../db/client.js";
import { improvedPrompts } from "../../db/schema.js";
import { improveWithRules, parsePrompt } from "../rule-engine/index.js";
import { improveGenericFallback } from "../rule-engine/generic-fallback.js";
import { improveVideoFallback } from "../rule-engine/video-bridge.js";
import { improveTextFallback } from "../rule-engine/text-bridge.js";
import { improveCodeFallback } from "../rule-engine/code-bridge.js";
import { improveWebsiteFallback } from "../rule-engine/website-bridge.js";
import { improveWebsiteWithAI } from "../website/ai-improver.js";
import { improveVideoWithAI } from "../video/ai-improver.js";
import type { PlatformKey, RuleEngineCategory } from "../rule-engine/types.js";
import { getAIService } from "../ai/service.js";
import { MODEL_TIER } from "../ai/models.js";
import { platformRegistry } from "../platforms/index.js";
import { scorePrompt } from "../pipeline/prompt-scorer.js";
import { getEngine } from "../engines/index.js";
import type { ImproveRequest, ImproveResult, ImproverChange, Family } from "../types.js";
import type { ImprovePromptRequest, ImprovePromptResponse } from "../contracts.js";
import { hasApiKey } from "../utils.js";

const VALID_RULE_ENGINE_CATEGORIES: RuleEngineCategory[] = ["people", "fashion", "product", "art", "social"];
const VALID_FAMILIES: Family[] = ["image", "video", "text", "code", "content", "website"];

// ─── Family detection ─────────────────────────────────────────────────────────

const IMAGE_PLATFORMS = new Set(["midjourney", "flux", "firefly", "chatgpt", "gemini", "grok", "ideogram", "leonardo", "stable-diffusion", "runway-image"]);
const VIDEO_PLATFORMS = new Set(["runway", "sora", "pika", "kling", "luma", "veo", "seedance", "higgsfield"]);
const CODE_PLATFORMS  = new Set(["claude-code", "cursor", "copilot", "chatgpt-code", "gemini-code"]);

// Platform-based detection can't disambiguate families that share a platform
// ID (chatgpt/gemini/grok are both image and website platforms; cursor is
// both code and website) — it has no "website" case at all. Resolving family
// through this function alone would make an explicit website request on any
// of those platforms silently resolve to the wrong family. resolveFamily()
// below only falls back to this when the caller didn't specify one.
function detectFamily(prompt: string, platform: string): Family {
  if (IMAGE_PLATFORMS.has(platform)) return "image";
  if (VIDEO_PLATFORMS.has(platform)) return "video";
  if (CODE_PLATFORMS.has(platform))  return "code";

  const p = prompt.toLowerCase();
  if (/\b(video|cinematic|footage|clip|scene|animation|motion)\b/.test(p)) return "video";
  if (/\b(image|photo|picture|portrait|render|illustration|draw|paint)\b/.test(p)) return "image";
  if (/\b(code|function|implement|bug|refactor|api)\b/.test(p)) return "code";
  return "text";
}

function resolveFamily(request: ImproveRequest): Family {
  if (request.family && VALID_FAMILIES.includes(request.family)) return request.family;
  return detectFamily(request.prompt, request.platform);
}

// ─── System prompt builders ───────────────────────────────────────────────────

function buildSystemPrompt(family: Family, platformId: string): string {
  // If we have a dedicated engine for this platform, use its model-specific
  // system prompt instead of the generic family-level one. The engine prompt
  // already encodes the exact dialect, required components, and style rules.
  const engine = getEngine(platformId);
  if (engine) {
    return `${engine.systemPrompt}

The user is giving you a weak or basic prompt to improve. Transform it into a high-quality version following all the rules above.

RESPONSE FORMAT: You MUST respond with valid JSON only. No markdown, no code fences, no extra text.
{
  "improved": "the full improved prompt text here",
  "changes": [
    {"label": "description of change made", "applied": true},
    {"label": "description of check that passed", "applied": false}
  ]
}

The "changes" array should list 4-8 specific improvements (applied: true) or checks that passed (applied: false).
The "improved" field must contain ONLY the final prompt — no explanations, no code fences.`;
  }

  const platform = platformRegistry.get(platformId);
  const platformRules = platform
    ? `${platform.structureRules}\n\n${platform.systemPromptAddition}`
    : "";

  const baseRules: Record<Family, string> = {
    image: `You are an expert prompt engineer using the Pro Formula v4.2 system.
Transform the weak/basic prompt into a professional v4.2 prompt.
- Apply correct tier: PRODUCT, PEOPLE, or ART based on the subject
- Add lock blocks with precise numeric values
- Quantization: non-round numbers (48% not 50%, 47deg not 45deg)
- Add camera rig, grade, palette (3-5 colors + hex + %), references, exclude list
- Delete cargo-cult tokens: "8K ultra-sharp", "aesthetic"`,
    // video is handled by its own early return above (Video Formula), never
    // reaches this table — see the family === "video" branch.
    video: "",
    text: `You are an expert text prompt engineer.
Transform the weak prompt into a structured, high-quality AI instruction with:
- Clear role framing ("Act as...")
- Specific task breakdown with steps
- Output format specification
- Tone and audience definition
- Constraints and quality criteria`,
    code: `You are an expert coding prompt engineer.
Transform the weak prompt into a structured coding instruction with:
- Tech stack and version specifics
- Clear task scope
- Code conventions and constraints
- Expected output format
- What NOT to change`,
    content: `You are an expert content prompt engineer.
Transform the weak prompt into a structured, production-ready content brief with:
- Clear content type and goal
- Target audience and tone
- Structure and format
- Key messages and constraints`,
    // website is handled by its own early return above (Website Formula),
    // never reaches this table — see the family === "website" branch.
    website: "",
  };

  return `${baseRules[family]}
${platformRules}

RESPONSE FORMAT: You MUST respond with valid JSON only. No markdown, no code fences, no extra text.
{
  "improved": "the full improved prompt text here",
  "changes": [
    {"label": "description of change made", "applied": true},
    {"label": "description of check that passed", "applied": false}
  ]
}

The "changes" array should list 4-8 specific improvements (applied: true) or checks that passed (applied: false).
The "improved" field must contain ONLY the final prompt — no explanations, no code fences.`;
}

// ─── Response parser ──────────────────────────────────────────────────────────

function parseResponse(text: string): { improved: string; changes: ImproverChange[] } {
  const cleaned = text.replace(/```json?\s*/g, "").replace(/```\s*/g, "").trim();

  try {
    const parsed = JSON.parse(cleaned);
    if (parsed.improved && Array.isArray(parsed.changes)) return parsed;
  } catch { /* fall through */ }

  const jsonMatch = cleaned.match(/\{[\s\S]*"improved"[\s\S]*"changes"[\s\S]*\}/);
  if (jsonMatch) {
    try {
      const parsed = JSON.parse(jsonMatch[0]);
      if (parsed.improved && Array.isArray(parsed.changes)) return parsed;
    } catch { /* fall through */ }
  }

  return {
    improved: text.trim(),
    changes: [
      { label: "Applied professional prompt structure", applied: true },
      { label: "Enhanced with platform-specific formatting", applied: true },
    ],
  };
}

// ─── Rule-engine fallback ──────────────────────────────────────────────────────

const VALID_PLATFORMS: PlatformKey[] = ["chatgpt", "gemini", "midjourney", "flux", "firefly", "grok"]

// The AI path persists to improved_prompts on success (below) — but the rule-
// engine fallback is the ONLY path when no API key is configured, and it
// previously wrote nothing. That silently dropped every improve from
// /api/engine/history on the free tier. Persist here too, non-fatally.
async function persistRuleEngineImprove(request: ImproveRequest, result: ImproveResult, userId: string | null): Promise<void> {
  try {
    await db.insert(improvedPrompts).values({
      userId,
      originalText: request.prompt,
      improvedText: result.improved,
      platformId: request.platform,
      changesSummary: result.changes,
      scoreBefore: result.scoreBefore?.overall ?? null,
      scoreAfter: result.scoreAfter?.overall ?? null,
      scoreDelta: result.delta ?? null,
      tokensUsed: result.tokensUsed,
    });
  } catch {
    // Non-fatal — the improve already succeeded even if persistence fails
  }
}

async function respondWithRuleEngine(request: ImproveRequest, family: Family, userId: string | null, original: string): Promise<ImprovePromptResponse> {
  const result = ruleEngineFallback(request, family);
  await persistRuleEngineImprove(request, result, userId);
  return toPublicResponse(result, original);
}

function ruleEngineFallback(request: ImproveRequest, family: Family): ImproveResult {
  // The image rule engine (Pro Formula v4.2) only knows the image domain.
  // Other families get their own dedicated formula where one exists
  // (video → Motion Formula v1.0), or a generic structural fallback otherwise.
  if (family === "video") {
    return improveVideoFallback(request);
  }
  if (family === "text") {
    return improveTextFallback(request);
  }
  if (family === "code") {
    return improveCodeFallback(request);
  }
  if (family === "website") {
    return improveWebsiteFallback(request);
  }
  if (family !== "image") {
    return improveGenericFallback(request, family);
  }

  const platform = VALID_PLATFORMS.includes(request.platform as PlatformKey)
    ? (request.platform as PlatformKey)
    : "chatgpt"

  // Honor an explicit category override from the caller (e.g. the user
  // correcting a misclassification in the UI) over keyword auto-detection.
  const category = VALID_RULE_ENGINE_CATEGORIES.includes(request.category as any)
    ? (request.category as RuleEngineCategory)
    : undefined

  const result = improveWithRules({ promptText: request.prompt, platform, category })

  const score = { overall: result.score, grade: result.score >= 80 ? "A" : result.score >= 60 ? "B" : "C", dimensions: {} } as any

  return {
    improved: result.prompt,
    changes: [
      { label: "Expanded with professional subject description", applied: true },
      { label: "Added wardrobe and setting detail", applied: true },
      { label: "Added precise lighting specification", applied: true },
      { label: "Added camera and composition specification", applied: true },
      { label: "Injected Pro Formula v4.2 LOCK blocks", applied: true },
      { label: "Added negative exclusion list", applied: true },
    ],
    scoreBefore: null,
    scoreAfter: score,
    delta: null,
    category: result.category,
    platform: request.platform,
    family: request.family ?? "image",
    tokensUsed: 0,
  }
}

// ─── Request / response mapping ───────────────────────────────────────────────

function toInternalRequest(r: ImprovePromptRequest): ImproveRequest {
  const family = r.family && VALID_FAMILIES.includes(r.family as Family) ? (r.family as Family) : undefined;
  return { prompt: r.prompt, platform: r.platform, category: r.category, family };
}

function toPublicResponse(
  result: ImproveResult,
  original: string
): ImprovePromptResponse {
  return {
    original,
    improved: result.improved,
    improvements: result.changes.map((c) => c.label),
    metadata: {
      scoreBefore: result.scoreBefore?.overall ?? 0,
      scoreAfter:  result.scoreAfter?.overall  ?? 0,
      category: result.category ?? null,
    },
  };
}

function aggressivenessInstruction(level?: "light" | "medium" | "heavy"): string {
  if (level === "light")  return "\nMake only minimal, targeted improvements. Preserve the user's wording as much as possible.";
  if (level === "heavy")  return "\nCompletely rewrite if necessary. Prioritize quality over preserving the original wording.";
  return "";
}

// ─── Main export ──────────────────────────────────────────────────────────────

export async function improvePrompt(
  request: ImprovePromptRequest,
  userId: string | null
): Promise<ImprovePromptResponse> {
  const internal = toInternalRequest(request);
  const family = resolveFamily(internal);

  // Fall back to rule engine immediately when no API key configured
  if (!hasApiKey()) {
    return respondWithRuleEngine(internal, family, userId, request.prompt);
  }

  // Website bypasses the shared JSON-contract flow below entirely — see
  // engine/website/ai-improver.ts for why (system-prompt conflict + fragile
  // JSON-escaping of long code-heavy output). Also sidesteps buildSystemPrompt()
  // /getEngine()'s platform-ID collisions (chatgpt/gemini/grok are also image
  // engine IDs), same as engine/modules/builder.ts's website branch.
  if (family === "website") {
    try {
      return toPublicResponse(await improveWebsiteWithAI(internal, userId), request.prompt);
    } catch (err: any) {
      console.warn("Website AI improve failed, using rule engine fallback:", err?.message ?? err);
      return respondWithRuleEngine(internal, family, userId, request.prompt);
    }
  }

  // Same reasoning as website above — see engine/video/ai-improver.ts.
  if (family === "video") {
    try {
      return toPublicResponse(await improveVideoWithAI(internal, userId), request.prompt);
    } catch (err: any) {
      console.warn("Video AI improve failed, using rule engine fallback:", err?.message ?? err);
      return respondWithRuleEngine(internal, family, userId, request.prompt);
    }
  }

  const aggressiveness = aggressivenessInstruction(request.options?.aggressiveness);
  const system = buildSystemPrompt(family, request.platform) + aggressiveness;

  // Score original prompt (non-fatal if it fails)
  let scoreBefore = null;
  try {
    scoreBefore = await scorePrompt(internal.prompt, internal.platform, family);
  } catch { /* non-fatal */ }

  const ai = getAIService();
  let tokensUsed = 0;
  let res;
  try {
    res = await ai.complete({
      model: MODEL_TIER.QUALITY,
      system,
      messages: [{ role: "user", content: `Improve this ${internal.platform} prompt:\n\n${internal.prompt}` }],
      maxTokens: 1500,
    });
  } catch (err: any) {
    // AI call failed (bad key, quota, network) — fall back to rule engine
    console.warn("AI improve call failed, using rule engine fallback:", err?.message ?? err);
    return respondWithRuleEngine(internal, family, userId, request.prompt);
  }
  tokensUsed += res.inputTokens + res.outputTokens;

  const parsed = parseResponse(res.text);

  // Score improved prompt (non-fatal)
  let scoreAfter = null;
  try {
    scoreAfter = await scorePrompt(parsed.improved, internal.platform, family);
  } catch { /* non-fatal */ }

  const delta =
    scoreBefore !== null && scoreAfter !== null
      ? scoreAfter.overall - scoreBefore.overall
      : null;

  // Persist to improved_prompts table
  try {
    await db.insert(improvedPrompts).values({
      userId,
      originalText: internal.prompt,
      improvedText: parsed.improved,
      platformId: internal.platform,
      changesSummary: parsed.changes,
      scoreBefore: scoreBefore?.overall ?? null,
      scoreAfter: scoreAfter?.overall ?? null,
      scoreDelta: delta ?? null,
      tokensUsed,
    });
  } catch { /* non-fatal */ }

  // The AI path has no rule-engine category classification of its own — unlike
  // ruleEngineFallback above, which always sets one. Without this, every
  // AI-improved image request would report category: null, silently breaking
  // both the "detected category" UI badge and the image lock layer (which
  // needs a category to look up its lock template).
  const category = family === "image" ? parsePrompt(parsed.improved).detectedCategory : undefined;

  return toPublicResponse(
    { improved: parsed.improved, changes: parsed.changes, platform: internal.platform, family, scoreBefore, scoreAfter, delta, tokensUsed, category },
    request.prompt
  );
}
