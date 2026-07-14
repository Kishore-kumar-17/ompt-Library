import { TextCategoryTemplate } from "../types.js"
import { SUMMARIZATION_MODES } from "../dictionaries.js"
import { detectMode } from "../mode-detector.js"

export const SUMMARIZATION_TEMPLATE: TextCategoryTemplate = {
  name: "Summarization",
  defaultOutputFormat: "bullet list",
  defaultReasoningDepth: "quick answer",
  sections: [
    "ROLE", "TASK", "SOURCE_HANDLING", "OUTPUT_FORMAT",
    "AVOID", "LOCKS_SCOPE", "LOCKS_FORMAT", "LOCKS_DEPTH",
  ],
}

export type SummarizationMode = "executive" | "detailed" | "bullet-point"

const MODE_KEYWORDS: Record<SummarizationMode, string[]> = {
  executive:      ["executive summary", "tl;dr", "tldr", "one paragraph", "in a sentence", "brief summary", "high level", "for leadership", "for the ceo"],
  detailed:       ["detailed summary", "comprehensive", "in depth", "in-depth", "thorough summary", "full summary", "don't leave anything out"],
  "bullet-point": ["key points", "bullet", "main points", "summarize the main"],
}

export function detectSummarizationMode(task: string): SummarizationMode {
  return detectMode(task, MODE_KEYWORDS, "bullet-point")
}

export function buildSourceHandlingSection(task: string): string {
  const mode = detectSummarizationMode(task)
  return `SOURCE HANDLING: treat only the provided source text as ground truth — do not introduce outside facts or fill gaps with assumptions. ${SUMMARIZATION_MODES[mode]}`
}
