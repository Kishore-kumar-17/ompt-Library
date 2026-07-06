import { TextCategoryTemplate } from "../types.js"

export const ANALYSIS_TEMPLATE: TextCategoryTemplate = {
  name: "Analysis / Research",
  defaultOutputFormat: "markdown",
  defaultReasoningDepth: "consider edge cases",
  sections: [
    "ROLE", "TASK", "SCOPE_DIMENSIONS", "AUDIENCE_TONE", "OUTPUT_FORMAT",
    "REASONING", "AVOID", "LOCKS_SCOPE", "LOCKS_FORMAT", "LOCKS_DEPTH",
  ],
}

export function buildAnalysisScopeDimensions(): string {
  return "SCOPE DIMENSIONS: name the specific dimensions the analysis must compare or evaluate against — an unscoped analysis produces a vague survey instead of a usable judgment"
}
