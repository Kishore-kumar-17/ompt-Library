import { TextCategoryTemplate } from "../types.js"

export const CREATIVE_TEMPLATE: TextCategoryTemplate = {
  name: "Creative Writing",
  defaultOutputFormat: "prose",
  defaultReasoningDepth: "quick answer",
  sections: [
    "ROLE", "TASK", "CONSTRAINTS", "AUDIENCE_TONE", "OUTPUT_FORMAT",
    "AVOID", "LOCKS_SCOPE", "LOCKS_FORMAT",
  ],
}

export function buildCreativeConstraints(): string {
  return "CONSTRAINTS: specify length, point of view, and genre conventions to follow — a creative brief without these produces generic output"
}
