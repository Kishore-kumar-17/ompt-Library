import { nanoid } from "nanoid";
import { db } from "../../db/client.js";
import { builtPrompts } from "../../db/schema.js";
import type { BuildRequest, BuildResult, PipelineContext } from "../types.js";
import type { BuildPromptRequest, BuildPromptResponse } from "../contracts.js";
import { hasApiKey } from "../utils.js";
import { buildFromRules } from "../rule-engine/index.js";
import { generatePrompt } from "../rule-engine/prompt-generator.js";
import { buildGenericFallback } from "../rule-engine/generic-fallback.js";
import { buildVideoFallback } from "../rule-engine/video-bridge.js";
import { buildTextFallback } from "../rule-engine/text-bridge.js";
import { buildCodeFallback } from "../rule-engine/code-bridge.js";
import { buildWebsiteFallback } from "../rule-engine/website-bridge.js";
import type { PlatformKey } from "../rule-engine/types.js";
import { PromptPipeline } from "../pipeline/index.js";
import { getAIService } from "../ai/service.js";
import { MODEL_TIER } from "../ai/models.js";
import { getEngine } from "../engines/index.js";
import { IntentAnalyzerStage }      from "../pipeline/intent-analyzer.js";
import { CategoryDetectorStage }    from "../pipeline/category-detector.js";
import { PlatformResolverStage }    from "../pipeline/platform-resolver.js";
import { RequirementExtractorStage } from "../pipeline/requirement-extractor.js";
import { PromptPlannerStage }       from "../pipeline/prompt-planner.js";
import { ComponentAssemblerStage }  from "../pipeline/component-assembler.js";
import { PlatformOptimizerStage }   from "../pipeline/platform-optimizer.js";
import { PromptValidatorStage }     from "../pipeline/prompt-validator.js";
import { PromptScorerStage }        from "../pipeline/prompt-scorer.js";

function createBuildPipeline(): PromptPipeline {
  return new PromptPipeline([
    new IntentAnalyzerStage(),
    new CategoryDetectorStage(),
    new PlatformResolverStage(),
    new RequirementExtractorStage(),
    new PromptPlannerStage(),
    new ComponentAssemblerStage(),
    new PlatformOptimizerStage(),
    new PromptValidatorStage(),
    new PromptScorerStage(),
  ]);
}

// ─── Request / response mapping ───────────────────────────────────────────────

function toInternalRequest(r: BuildPromptRequest): BuildRequest {
  return { idea: r.input, family: r.mode, platform: r.platform, category: r.category };
}

function toPublicResponse(result: BuildResult, platform: string): BuildPromptResponse {
  return {
    prompt: result.prompt,
    metadata: {
      platform: platform as BuildPromptResponse["metadata"]["platform"],
      score: result.score?.overall ?? 0,
      version: "1.0",
    },
  };
}

function selectModelTier(quality?: "fast" | "balanced" | "premium") {
  if (quality === "fast")    return MODEL_TIER.FAST;
  if (quality === "premium") return MODEL_TIER.PREMIUM;
  return MODEL_TIER.QUALITY;
}

// ─── Rule-engine fallback ──────────────────────────────────────────────────────

const VALID_PLATFORMS: PlatformKey[] = ["chatgpt", "gemini", "midjourney", "flux", "firefly", "grok"]

function ruleEngineFallback(request: BuildRequest): BuildResult {
  // The image rule engine below (Pro Formula v4.2) only knows the image
  // domain. Other families get their own dedicated formula where one exists
  // (video → Motion Formula v1.0), or a generic structural fallback otherwise
  // — either way, never silently forced through the image formula.
  if (request.family === "video") {
    return buildVideoFallback(request);
  }
  if (request.family === "text") {
    return buildTextFallback(request);
  }
  if (request.family === "code") {
    return buildCodeFallback(request);
  }
  if (request.family === "website") {
    return buildWebsiteFallback(request);
  }
  if (request.family !== "image") {
    return buildGenericFallback(request);
  }

  const platform = VALID_PLATFORMS.includes(request.platform as PlatformKey)
    ? (request.platform as PlatformKey)
    : "chatgpt"

  // Build idea string — include style/mood hints if provided
  const ideaParts = [request.idea]
  if (request.style) ideaParts.push(request.style)
  if (request.mood)  ideaParts.push(request.mood)
  const fullIdea = ideaParts.join(", ")

  // Use engine-driven generator as primary path
  const generated = generatePrompt(fullIdea, platform)

  const score = Math.min(90, 60 + generated.wordCount / 5)
  const grade = score >= 80 ? "A" : score >= 60 ? "B" : "C"

  return {
    prompt:      generated.prompt,
    platform:    generated.platform,
    family:      request.family,
    score:       { overall: Math.round(score), grade, dimensions: {} } as any,
    runId:       nanoid(),
    tokensUsed:  0,
  }
}

// ─────────────────────────────────────────────────────────────────────────────

export async function buildPrompt(
  request: BuildPromptRequest,
  userId: string | null,
  onChunk?: (text: string) => void
): Promise<BuildPromptResponse> {
  const internal = toInternalRequest(request);
  const modelTier = selectModelTier(request.options?.quality);

  // Use rule engine when no valid API key is configured
  if (!hasApiKey()) {
    return toPublicResponse(ruleEngineFallback(internal), request.platform);
  }

  // The AI pipeline (platformRegistry, CategoryDetectorStage, etc.) has no
  // concept of website-builder platforms yet — several website platform IDs
  // (chatgpt, claude, gemini, grok) collide with already-registered IMAGE
  // platform configs, so running website requests through the pipeline
  // doesn't throw, it silently produces an image-style prompt. Route website
  // straight to the verified Website Formula v1.0 rule engine until the
  // pipeline has real website-domain stage support.
  if (internal.family === "website") {
    return toPublicResponse(ruleEngineFallback(internal), request.platform);
  }

  try {
  const runId = nanoid();
  const ctx: PipelineContext = {
    request: internal,
    userId,
    runId,
    startedAt: new Date(),
    intent: null,
    detectedFamily: null,
    detectedCategory: null,
    platform: null,
    requirements: null,
    componentPlan: [],
    components: new Map(),
    assembledPrompt: null,
    validationResult: null,
    score: null,
    tokensUsed: 0,
    stageTimings: {},
    errors: [],
  };

  // Wire streaming callback if provided
  if (onChunk) (ctx as any)._onChunk = onChunk;

  const pipeline = createBuildPipeline();
  const result = await pipeline.execute(ctx);

  if (!result.assembledPrompt) {
    throw new Error(
      result.errors.length > 0
        ? result.errors.join("; ")
        : "Prompt generation failed"
    );
  }

  // Engine-polish pass: if the target platform has a dedicated engine (e.g.
  // Midjourney, Flux, Firefly), send the assembled prompt through that engine's
  // model-specific system prompt to rewrite it in the correct dialect.
  const engine = getEngine(request.platform);
  if (engine) {
    try {
      const ai = getAIService();
      const polish = await ai.complete({
        model: modelTier,
        system: engine.systemPrompt,
        messages: [{ role: "user", content: result.assembledPrompt }],
        maxTokens: 1000,
      });
      if (polish.text.trim()) {
        result.assembledPrompt = polish.text.trim();
        result.tokensUsed += polish.inputTokens + polish.outputTokens;
      }
    } catch {
      // Non-fatal — keep the unpolished assembled prompt if the polish fails
    }
  }

  // Persist to built_prompts table
  try {
    await db.insert(builtPrompts).values({
      userId,
      categoryId: result.detectedCategory ?? undefined,
      platformId: internal.platform,
      fieldValues: { idea: internal.idea },
      generatedPrompt: result.assembledPrompt,
      qualityScore: result.score?.overall ?? null,
      scoreGrade: result.score?.grade ?? null,
      tokensUsed: result.tokensUsed,
      durationMs: Date.now() - result.startedAt.getTime(),
      runId,
    });
  } catch {
    // Non-fatal — generation succeeded even if persistence fails
  }

  return toPublicResponse(
    {
      prompt: result.assembledPrompt,
      platform: internal.platform,
      family: result.detectedFamily ?? internal.family,
      score: result.score,
      runId,
      tokensUsed: result.tokensUsed,
    },
    request.platform
  );
  } catch (err: any) {
    // AI pipeline failed (bad key, quota, network) — fall back to rule engine
    console.warn("AI pipeline failed, using rule engine fallback:", err?.message ?? err)
    return toPublicResponse(ruleEngineFallback(internal), request.platform);
  }
}
