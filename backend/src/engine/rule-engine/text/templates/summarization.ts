import { TextCategoryTemplate } from "../types.js"

export const SUMMARIZATION_TEMPLATE: TextCategoryTemplate = {
  name: "Summarization",
  defaultOutputFormat: "bullet list",
  defaultReasoningDepth: "quick answer",
  sections: [
    "ROLE", "TASK", "SOURCE_HANDLING", "OUTPUT_FORMAT",
    "AVOID", "LOCKS_SCOPE", "LOCKS_FORMAT", "LOCKS_DEPTH",
  ],
}

export function buildSourceHandlingSection(): string {
  return "SOURCE HANDLING: treat only the provided source text as ground truth — do not introduce outside facts or fill gaps with assumptions"
}
