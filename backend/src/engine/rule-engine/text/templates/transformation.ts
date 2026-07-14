import { TextCategoryTemplate } from "../types.js"
import { TRANSFORMATION_MODES } from "../dictionaries.js"
import { detectMode } from "../mode-detector.js"

export const TRANSFORMATION_TEMPLATE: TextCategoryTemplate = {
  name: "Transformation / Rewrite",
  defaultOutputFormat: "prose",
  defaultReasoningDepth: "quick answer",
  sections: [
    "ROLE", "TASK", "MAPPING", "OUTPUT_FORMAT",
    "AVOID", "LOCKS_SCOPE", "LOCKS_FORMAT",
  ],
}

export type TransformationMode = "format-conversion" | "tone-shift" | "simplification"

const MODE_KEYWORDS: Record<TransformationMode, string[]> = {
  "format-conversion": ["convert to", "reformat", "turn this into", "into a table", "into an email", "into bullet", "into json", "into markdown"],
  "tone-shift":        ["make this more", "more formal", "more casual", "more professional", "change the tone", "sound more"],
  simplification:      ["simplify", "eli5", "plain language", "easier to understand", "in simple terms", "dumb it down", "layman"],
}

export function detectTransformationMode(task: string): TransformationMode {
  return detectMode(task, MODE_KEYWORDS, "format-conversion")
}

export function buildMappingSection(task: string): string {
  const mode = detectTransformationMode(task)
  return `MAPPING: preserve the original meaning and every material detail while changing only the register, format, or language requested. ${TRANSFORMATION_MODES[mode]}`
}
