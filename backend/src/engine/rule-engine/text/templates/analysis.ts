import { TextCategoryTemplate } from "../types.js"
import { ANALYSIS_MODES } from "../dictionaries.js"
import { detectMode } from "../mode-detector.js"

export const ANALYSIS_TEMPLATE: TextCategoryTemplate = {
  name: "Analysis / Research",
  defaultOutputFormat: "markdown",
  defaultReasoningDepth: "consider edge cases",
  sections: [
    "ROLE", "TASK", "SCOPE_DIMENSIONS", "AUDIENCE_TONE", "OUTPUT_FORMAT",
    "REASONING", "AVOID", "LOCKS_SCOPE", "LOCKS_FORMAT", "LOCKS_DEPTH",
  ],
}

export type AnalysisMode = "comparative" | "causal" | "evaluative"

const MODE_KEYWORDS: Record<AnalysisMode, string[]> = {
  comparative: ["compare", "vs", "versus", "which is better", "difference between", "pros and cons", "option a", "option b"],
  causal:      ["why did", "why does", "why is", "root cause", "what caused", "caused by", "leads to", "impact of", "effect of", "consequence"],
  evaluative:  ["evaluate", "assess", "is it worth", "is this good", "how good is", "worth it", "critique", "review of"],
}

export function detectAnalysisMode(task: string): AnalysisMode {
  return detectMode(task, MODE_KEYWORDS, "evaluative")
}

export function buildAnalysisScopeDimensions(task: string): string {
  const mode = detectAnalysisMode(task)
  return `SCOPE DIMENSIONS: name the specific dimensions the analysis must compare or evaluate against — an unscoped analysis produces a vague survey instead of a usable judgment. ${ANALYSIS_MODES[mode]}`
}
