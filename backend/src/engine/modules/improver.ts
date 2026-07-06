import { db } from "../../db/client.js";
import { improvedPrompts } from "../../db/schema.js";
import { improveWithRules } from "../rule-engine/index.js";
import { improveGenericFallback } from "../rule-engine/generic-fallback.js";
import { improveVideoFallback } from "../rule-engine/video-bridge.js";
import { improveTextFallback } from "../rule-engine/text-bridge.js";
import { improveCodeFallback } from "../rule-engine/code-bridge.js";
import type { PlatformKey } from "../rule-engine/types.js";
import { getAIService } from "../ai/service.js";
import { MODEL_TIER } from "../ai/models.js";
import { platformRegistry } from "../platforms/index.js";
import { scorePrompt } from "../pipeline/prompt-scorer.js";
import { getEngine } from "../engines/index.js";
import type { ImproveRequest, ImproveResult, ImproverChange, Family } from "../types.js";
import type { ImprovePromptRequest, ImprovePromptResponse } from "../contracts.js";
import { hasApiKey } from "../utils.js";

// ─── Family detection ─────────────────────────────────────────────────────────

const IMAGE_PLATFORMS = new Set(["midjourney", "flux", "firefly", "chatgpt", "gemini", "grok", "ideogram", "leonardo", "stable-diffusion", "runway-image"]);
const VIDEO_PLATFORMS = new Set(["runway", "sora", "pika", "kling", "luma", "veo"]);
const CODE_PLATFORMS  = new Set(["claude-code", "cursor", "copilot", "chatgpt-code", "gemini-code"]);

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
    video: `You are an expert video prompt engineer.
Transform the weak prompt into a professional cinematic video prompt with:
- Detailed camera movement (dolly, crane, steadicam, tracking)
- Lighting setup and mood description
- Color grading references
- Duration and pacing notes
- Sound design suggestions if helpful`,
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
  if (family !== "image") {
    return improveGenericFallback(request, family);
  }

  const platform = VALID_PLATFORMS.includes(request.platform as PlatformKey)
    ? (request.platform as PlatformKey)
    : "chatgpt"

  const result = improveWithRules({ promptText: request.prompt, platform })

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
    platform: request.platform,
    family: request.family ?? "image",
    tokensUsed: 0,
  }
}

// ─── Request / response mapping ───────────────────────────────────────────────

function toInternalRequest(r: ImprovePromptRequest): ImproveRequest {
  return { prompt: r.prompt, platform: r.platform };
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
  const family = detectFamily(request.prompt, request.platform);

  // Fall back to rule engine immediately when no API key configured
  if (!hasApiKey()) {
    return toPublicResponse(ruleEngineFallback(internal, family), request.prompt);
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
    return toPublicResponse(ruleEngineFallback(internal, family), request.prompt);
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

  return toPublicResponse(
    { improved: parsed.improved, changes: parsed.changes, platform: internal.platform, family, scoreBefore, scoreAfter, delta, tokensUsed },
    request.prompt
  );
}
