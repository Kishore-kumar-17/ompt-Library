// ─── Text Engine Bridge ─────────────────────────────────────────────────────────
// Adapts the generic BuildRequest/ImproveRequest contracts (engine/types.ts) to
// the Instruction Formula v1.0 text rule engine's own request/result shapes,
// and back.

import { nanoid } from "nanoid";
import type { BuildRequest, BuildResult, ImproveRequest, ImproveResult, ScoreGrade } from "../types.js";
import {
  buildTextFromRules,
  improveTextWithRules,
  parseTextPrompt,
  type TextPlatformKey,
  type TextCategory,
} from "./text/index.js";

const VALID_TEXT_PLATFORMS: TextPlatformKey[] = ["claude", "chatgpt-text", "gemini-text", "grok-text", "perplexity", "deepseek"];
const VALID_TEXT_CATEGORIES: TextCategory[] = ["qa", "creative", "analysis", "summarization", "transformation"];

function resolveTextPlatform(platform: string): TextPlatformKey {
  return VALID_TEXT_PLATFORMS.includes(platform as TextPlatformKey)
    ? (platform as TextPlatformKey)
    : "chatgpt-text";
}

function toGrade(score: number): ScoreGrade {
  if (score >= 90) return "pro";
  if (score >= 70) return "excellent";
  if (score >= 40) return "good";
  return "poor";
}

export function buildTextFallback(request: BuildRequest): BuildResult {
  const platform = resolveTextPlatform(request.platform);
  const parsed = parseTextPrompt(request.idea);
  // Prefer the caller's explicit category over keyword auto-detection — see
  // the same fix in video-bridge.ts for the rationale.
  const category = VALID_TEXT_CATEGORIES.includes(request.category as TextCategory)
    ? (request.category as TextCategory)
    : parsed.detectedCategory;

  const result = buildTextFromRules({
    category,
    task: request.idea,
    // BuildRequest (engine/types.ts) has no dedicated audience field, so the
    // only signal available here is whatever parseTextPrompt detected from
    // the idea text itself (e.g. "... for a beginner", "... for executives").
    audience: parsed.audience ?? undefined,
    tone: request.style ?? request.mood,
    outputFormat: parsed.outputFormat ?? undefined,
    reasoningDepth: parsed.reasoningDepth ?? undefined,
    platform,
  });

  return {
    prompt: result.prompt,
    platform: result.platform,
    family: "text",
    score: {
      overall: result.score,
      grade: toGrade(result.score),
      dimensions: [],
      wordCount: result.wordCount,
      inBudget: true,
    },
    runId: nanoid(),
    tokensUsed: 0,
  };
}

export function improveTextFallback(request: ImproveRequest): ImproveResult {
  const platform = resolveTextPlatform(request.platform);
  const result = improveTextWithRules({ promptText: request.prompt, platform });

  return {
    improved: result.prompt,
    changes: [
      {
        label: `Restructured using Instruction Formula v1.0 (${result.category} category: role, task, tone, output format${result.category === "qa" || result.category === "analysis" ? ", reasoning depth" : ""})`,
        applied: true,
      },
      {
        label: "Added scope/format/depth locks and category-specific anti-patterns to avoid",
        applied: true,
      },
    ],
    scoreBefore: null,
    scoreAfter: {
      overall: result.score,
      grade: toGrade(result.score),
      dimensions: [],
      wordCount: result.wordCount,
      inBudget: true,
    },
    delta: null,
    platform: result.platform,
    family: "text",
    tokensUsed: 0,
  };
}
