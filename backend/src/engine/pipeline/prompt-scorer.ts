import type {
  PipelineContext,
  PipelineStage,
  PromptScore,
  ScoreDimension,
  ScoreGrade,
} from "../types.js";
import { getAIService } from "../ai/service.js";
import { MODEL_TIER } from "../ai/models.js";

const SCORE_SYSTEM = `You are a prompt quality evaluator. Score the given prompt across 6 dimensions. Return ONLY valid JSON, no markdown.`;

export class PromptScorerStage implements PipelineStage {
  name = "prompt-scorer";

  async execute(ctx: PipelineContext): Promise<PipelineContext> {
    if (!ctx.assembledPrompt) return ctx;

    try {
      ctx.score = await scorePrompt(
        ctx.assembledPrompt,
        ctx.platform?.id,
        ctx.detectedFamily ?? ctx.request.family,
        ctx.platform?.wordBudget,
        ctx.validationResult?.wordCount ?? 0
      );
      ctx.tokensUsed += 30; // approximate haiku call
    } catch {
      ctx.score = null;
    }

    return ctx;
  }
}

export async function scorePrompt(
  promptText: string,
  platformId: string | undefined,
  family: string,
  wordBudget?: { min: number; max: number },
  wordCount?: number
): Promise<PromptScore> {
  const actualWordCount = wordCount ?? promptText.split(/\s+/).filter(Boolean).length;
  const inBudget = wordBudget
    ? actualWordCount >= wordBudget.min && actualWordCount <= wordBudget.max
    : true;

  const userMsg = `Score this ${family} prompt${platformId ? ` for ${platformId}` : ""}:

---
${promptText}
---

Return JSON with scores 0-100 for each dimension:
{
  "specificity": { "score": 0-100, "feedback": "one sentence" },
  "completeness": { "score": 0-100, "feedback": "one sentence" },
  "platform_fit": { "score": 0-100, "feedback": "one sentence" },
  "clarity": { "score": 0-100, "feedback": "one sentence" },
  "structure": { "score": 0-100, "feedback": "one sentence" },
  "safety": { "score": 0-100, "feedback": "one sentence" }
}`;

  const ai = getAIService();
  const res = await ai.complete({
    model: MODEL_TIER.FAST,
    system: SCORE_SYSTEM,
    messages: [{ role: "user", content: userMsg }],
    maxTokens: 400,
  });

  interface RawScore { score: number; feedback: string }
  interface RawScores {
    specificity: RawScore;
    completeness: RawScore;
    platform_fit: RawScore;
    clarity: RawScore;
    structure: RawScore;
    safety: RawScore;
  }

  const raw = JSON.parse(res.text.trim()) as RawScores;

  const dimensions: ScoreDimension[] = [
    { name: "Specificity",   score: clamp(raw.specificity.score),   weight: 0.25, feedback: raw.specificity.feedback },
    { name: "Completeness",  score: clamp(raw.completeness.score),  weight: 0.20, feedback: raw.completeness.feedback },
    { name: "Platform Fit",  score: clamp(raw.platform_fit.score),  weight: 0.20, feedback: raw.platform_fit.feedback },
    { name: "Clarity",       score: clamp(raw.clarity.score),       weight: 0.15, feedback: raw.clarity.feedback },
    { name: "Structure",     score: clamp(raw.structure.score),     weight: 0.10, feedback: raw.structure.feedback },
    { name: "Safety",        score: clamp(raw.safety.score),        weight: 0.10, feedback: raw.safety.feedback },
  ];

  const overall = Math.round(
    dimensions.reduce((sum, d) => sum + d.score * d.weight, 0)
  );

  return { overall, grade: toGrade(overall), dimensions, wordCount: actualWordCount, inBudget };
}

function clamp(n: number): number {
  return Math.max(0, Math.min(100, Math.round(n)));
}

function toGrade(score: number): ScoreGrade {
  if (score >= 90) return "pro";
  if (score >= 70) return "excellent";
  if (score >= 40) return "good";
  return "poor";
}
