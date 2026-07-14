// ─── Generic Family-Aware Fallback ─────────────────────────────────────────────
// Zero-API-call safety net for video/text/code/content builds and improvements.
// The dedicated rule-engine (builder.ts/improver.ts in this folder) only knows
// the image domain (wardrobe, skin, camera rigs, lock blocks). When the AI
// pipeline is unavailable (no key, or a runtime failure) for any other family,
// this assembles a structurally-correct — not richly polished — prompt from the
// platform's own componentOrder/requiredComponents instead of silently treating
// every platform as an image platform.

import { nanoid } from "nanoid";
import { platformRegistry } from "../platforms/index.js";
import type {
  BuildRequest,
  BuildResult,
  ImproveRequest,
  ImproveResult,
  Family,
  ComponentKey,
  PlatformConfig,
} from "../types.js";

interface FillerContext {
  idea: string;
  style?: string;
  mood?: string;
}

type FillerMap = Partial<Record<ComponentKey, (ctx: FillerContext) => string>>;

const LABELS: Record<ComponentKey, string> = {
  role: "ROLE",
  objective: "OBJECTIVE",
  context: "CONTEXT",
  constraints: "CONSTRAINTS",
  style: "STYLE",
  output_format: "OUTPUT FORMAT",
  technical: "TECHNICAL",
  platform_params: "PARAMETERS",
  safety: "SAFETY",
  negative: "EXCLUDE",
};

const FILLERS: Partial<Record<Family, FillerMap>> = {
  video: {
    objective: (c) => c.idea,
    context: () =>
      "Describe the environment, time of day, and background clearly so the scene is unambiguous.",
    style: (c) => c.style ?? c.mood ?? "cinematic, high quality, realistic motion and physics",
    technical: () =>
      "Camera: steady tracking or dolly movement, medium framing. Pacing: clear beginning-action-end arc.",
  },
  text: {
    role: () => "You are a knowledgeable, helpful expert assistant.",
    objective: (c) => c.idea,
    context: () => "Assume the reader has no background beyond what is stated above.",
    constraints: () =>
      "Be accurate and concise. Directly address the request without unnecessary caveats.",
    output_format: () =>
      "Respond in clear, well-structured prose or markdown, whichever fits the request best.",
  },
  code: {
    role: () => "You are an expert software engineer.",
    context: (c) => `Task context: ${c.idea}`,
    objective: (c) => c.idea,
    constraints: () =>
      "Follow existing code conventions. Only change what's necessary; do not refactor unrelated code.",
    output_format: () =>
      "Provide the code changes directly, with brief comments only where the reasoning isn't obvious.",
  },
  content: {
    role: () => "You are an expert content strategist.",
    objective: (c) => c.idea,
    context: () => "Define the target audience and platform this content is for.",
    constraints: () => "Match tone and length to the stated audience and platform.",
    output_format: () =>
      "Structure the output with a clear headline, body, and call to action where relevant.",
  },
};

function assemble(platform: PlatformConfig, family: Family, ctx: FillerContext): string {
  const fillers = FILLERS[family] ?? {};
  const order = platform.componentOrder.length ? platform.componentOrder : (["objective"] as ComponentKey[]);
  const seen = new Set<ComponentKey>();
  const sections: string[] = [];

  for (const key of order) {
    if (seen.has(key)) continue;
    seen.add(key);
    const filler = fillers[key];
    if (!filler) continue;
    const text = filler(ctx).trim();
    if (text) sections.push(`${LABELS[key]}: ${text}`);
  }

  // Required components with no filler still need *something* so validation
  // (word budget / required-section checks) doesn't fail outright.
  for (const key of platform.requiredComponents) {
    if (seen.has(key)) continue;
    sections.push(`${LABELS[key]}: (not specified)`);
  }

  if (platform.parameterFlags) sections.push(platform.parameterFlags);

  return sections.join("\n\n");
}

function floorScore(wordCount: number, platform: PlatformConfig) {
  const inBudget = wordCount >= platform.wordBudget.min && wordCount <= platform.wordBudget.max;
  // Deliberately capped well below what the AI pipeline typically scores —
  // this is a structural floor, not a polished result.
  const overall = Math.round(Math.min(65, 40 + wordCount / 6));
  return {
    overall,
    grade: (overall >= 60 ? "good" : "poor") as "good" | "poor",
    dimensions: [],
    wordCount,
    inBudget,
  };
}

export function buildGenericFallback(request: BuildRequest): BuildResult {
  const platform = platformRegistry.getOrDefault(request.platform, request.family);
  const prompt = assemble(platform, platform.family, {
    idea: request.idea,
    style: request.style,
    mood: request.mood,
  });
  const wordCount = prompt.split(/\s+/).filter(Boolean).length;

  return {
    prompt,
    platform: platform.id,
    family: platform.family,
    score: floorScore(wordCount, platform),
    runId: nanoid(),
    tokensUsed: 0,
  };
}

export function improveGenericFallback(request: ImproveRequest, family: Family): ImproveResult {
  const platform = platformRegistry.getOrDefault(request.platform, family);
  // The user's own text becomes the objective/task — we only add the
  // platform-appropriate structure around it, not rewrite their content.
  const prompt = assemble(platform, platform.family, { idea: request.prompt });
  const wordCount = prompt.split(/\s+/).filter(Boolean).length;

  return {
    improved: prompt,
    changes: [
      {
        label: `Restructured into ${platform.family} prompt format (${platform.componentOrder.join(", ")})`,
        applied: true,
      },
      {
        label: "No AI available — applied rule-based structural fallback, not a full rewrite",
        applied: true,
      },
    ],
    scoreBefore: null,
    scoreAfter: floorScore(wordCount, platform),
    delta: null,
    platform: platform.id,
    family: platform.family,
    tokensUsed: 0,
  };
}
