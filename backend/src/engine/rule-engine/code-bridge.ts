// ─── Code Engine Bridge ─────────────────────────────────────────────────────────
// Adapts the generic BuildRequest/ImproveRequest contracts (engine/types.ts) to
// the Engineering Spec Formula v1.0 code rule engine's own request/result
// shapes, and back.

import { nanoid } from "nanoid";
import type { BuildRequest, BuildResult, ImproveRequest, ImproveResult, ScoreGrade } from "../types.js";
import {
  buildCodeFromRules,
  improveCodeWithRules,
  parseCodePrompt,
  type CodePlatformKey,
} from "./code/index.js";

const VALID_CODE_PLATFORMS: CodePlatformKey[] = ["claude-code", "cursor", "copilot", "chatgpt-code", "gemini-code"];

function resolveCodePlatform(platform: string): CodePlatformKey {
  return VALID_CODE_PLATFORMS.includes(platform as CodePlatformKey)
    ? (platform as CodePlatformKey)
    : "claude-code";
}

function toGrade(score: number): ScoreGrade {
  if (score >= 90) return "pro";
  if (score >= 70) return "excellent";
  if (score >= 40) return "good";
  return "poor";
}

export function buildCodeFallback(request: BuildRequest): BuildResult {
  const platform = resolveCodePlatform(request.platform);
  const parsed = parseCodePrompt(request.idea);

  const result = buildCodeFromRules({
    category: parsed.detectedCategory,
    task: request.idea,
    techStack: parsed.techStack ?? undefined,
    outputFormat: parsed.outputFormat ?? undefined,
    platform,
  });

  return {
    prompt: result.prompt,
    platform: result.platform,
    family: "code",
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

export function improveCodeFallback(request: ImproveRequest): ImproveResult {
  const platform = resolveCodePlatform(request.platform);
  const result = improveCodeWithRules({ promptText: request.prompt, platform });

  return {
    improved: result.prompt,
    changes: [
      {
        label: `Restructured using Engineering Spec Formula v1.0 (${result.category} category: task, tech stack, output format, boundary/acceptance locks)`,
        applied: true,
      },
      {
        label: "Added scope boundary and acceptance-criteria locks to prevent scope creep and undefined \"done\"",
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
    family: "code",
    tokensUsed: 0,
  };
}
