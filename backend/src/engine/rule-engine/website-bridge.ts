// ─── Website Engine Bridge ──────────────────────────────────────────────────────
// Adapts the generic BuildRequest/ImproveRequest contracts (engine/types.ts) to
// the Website Formula v1.0 website rule engine's own request/result shapes, and
// back. Keeps the website engine's internals (categories, locks, per-platform
// formatting) independent of the shared Builder/Improver public contracts.

import { nanoid } from "nanoid";
import type { BuildRequest, BuildResult, ImproveRequest, ImproveResult, ScoreGrade } from "../types.js";
import {
  buildWebsiteFromRules,
  improveWebsiteWithRules,
  parseWebsitePrompt,
  type WebsitePlatformKey,
  type WebsiteCategory,
} from "./website/index.js";

const VALID_WEBSITE_PLATFORMS: WebsitePlatformKey[] = ["lovable", "bolt", "v0", "cursor", "chatgpt", "claude", "gemini", "grok"];
const VALID_WEBSITE_CATEGORIES: WebsiteCategory[] = ["business", "ecommerce", "portfolio", "saas", "landing"];

function resolveWebsitePlatform(platform: string): WebsitePlatformKey {
  return VALID_WEBSITE_PLATFORMS.includes(platform as WebsitePlatformKey)
    ? (platform as WebsitePlatformKey)
    : "lovable";
}

function toGrade(score: number): ScoreGrade {
  if (score >= 90) return "pro";
  if (score >= 70) return "excellent";
  if (score >= 40) return "good";
  return "poor";
}

export function buildWebsiteFallback(request: BuildRequest): BuildResult {
  const platform = resolveWebsitePlatform(request.platform);
  // Build requests only carry a free-text idea (no structured fields), so run
  // it through the same parser the improver uses to recover subcategory/
  // palette/audience/pages hints before assembling. The frontend folds its
  // structured selectors into the idea text as "(category: ...; palette:
  // ...; ...)" hints — see routes/builder.ts normalizeBuildRequest.
  const parsed = parseWebsitePrompt(request.idea);
  // Prefer the caller's explicit category (e.g. a UI category selector) over
  // keyword auto-detection — auto-detection is only a fallback for freeform
  // ideas with no explicit selection, not something that should silently
  // override a real user choice.
  const category = VALID_WEBSITE_CATEGORIES.includes(request.category as WebsiteCategory)
    ? (request.category as WebsiteCategory)
    : parsed.detectedCategory;

  const result = buildWebsiteFromRules({
    category,
    subcategory: parsed.subcategory ?? undefined,
    idea: request.idea,
    palette: parsed.palette ?? undefined,
    audience: parsed.audience ?? undefined,
    pages: parsed.pages.length ? parsed.pages : undefined,
    extraNotes: request.idea,
    platform,
  });

  return {
    prompt: result.prompt,
    platform: result.platform,
    family: "website" as BuildResult["family"],
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

export function improveWebsiteFallback(request: ImproveRequest): ImproveResult {
  const platform = resolveWebsitePlatform(request.platform);
  const result = improveWebsiteWithRules({ promptText: request.prompt, platform });

  return {
    improved: result.prompt,
    changes: [
      {
        label: `Restructured using Website Formula v1.0 (${result.category} category: role, overview, brand voice, core features, design specifications, content/technical/SEO/interaction guidelines, constraints)`,
        applied: true,
      },
      {
        label: "Added design-system locks (palette, typography, spacing/radius, accessibility) to prevent per-page drift",
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
    family: "website" as ImproveResult["family"],
    tokensUsed: 0,
  };
}
