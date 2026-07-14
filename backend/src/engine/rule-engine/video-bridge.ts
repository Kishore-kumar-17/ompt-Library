// ─── Video Engine Bridge ────────────────────────────────────────────────────────
// Adapts the generic BuildRequest/ImproveRequest contracts (engine/types.ts) to
// the Motion Formula v1.0 video rule engine's own request/result shapes, and
// back. Keeps the video engine's internals (categories, locks, per-platform
// formatting) independent of the shared Builder/Improver public contracts.

import { nanoid } from "nanoid";
import type { BuildRequest, BuildResult, ImproveRequest, ImproveResult, ScoreGrade } from "../types.js";
import {
  buildVideoFromRules,
  improveVideoWithRules,
  parseVideoPrompt,
  type VideoPlatformKey,
  type VideoCategory,
} from "./video/index.js";

const VALID_VIDEO_PLATFORMS: VideoPlatformKey[] = ["kling", "sora", "runway", "pika", "luma", "veo"];
const VALID_VIDEO_CATEGORIES: VideoCategory[] = ["narrative", "product", "nature", "action", "abstract"];

function resolveVideoPlatform(platform: string): VideoPlatformKey {
  return VALID_VIDEO_PLATFORMS.includes(platform as VideoPlatformKey)
    ? (platform as VideoPlatformKey)
    : "kling";
}

function toGrade(score: number): ScoreGrade {
  if (score >= 90) return "pro";
  if (score >= 70) return "excellent";
  if (score >= 40) return "good";
  return "poor";
}

export function buildVideoFallback(request: BuildRequest): BuildResult {
  const platform = resolveVideoPlatform(request.platform);
  // Build requests only carry a free-text idea (no structured fields), so run
  // it through the same parser the improver uses to recover category/setting/
  // camera/lighting hints before assembling.
  const parsed = parseVideoPrompt(request.idea);
  // Prefer the caller's explicit category (e.g. a UI category selector) over
  // keyword auto-detection — auto-detection is only a fallback for freeform
  // ideas with no explicit selection, not something that should silently
  // override a real user choice.
  const category = VALID_VIDEO_CATEGORIES.includes(request.category as VideoCategory)
    ? (request.category as VideoCategory)
    : parsed.detectedCategory;

  const result = buildVideoFromRules({
    category,
    subject: parsed.subject ?? request.idea,
    action: request.idea,
    setting: parsed.setting ?? undefined,
    cameraMove: parsed.cameraMove ?? undefined,
    lighting: parsed.lighting ?? undefined,
    colorGrade: parsed.colorGrade ?? undefined,
    mood: request.mood,
    platform,
  });

  return {
    prompt: result.prompt,
    platform: result.platform,
    family: "video",
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

export function improveVideoFallback(request: ImproveRequest): ImproveResult {
  const platform = resolveVideoPlatform(request.platform);
  const result = improveVideoWithRules({ promptText: request.prompt, platform });

  return {
    improved: result.prompt,
    changes: [
      {
        label: `Restructured using Motion Formula v1.0 (${result.category} category: subject, action, camera, lighting, color grade)`,
        applied: true,
      },
      {
        label: "Added motion/camera/temporal/continuity locks to prevent identity drift and unnatural motion",
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
    family: "video",
    tokensUsed: 0,
  };
}
