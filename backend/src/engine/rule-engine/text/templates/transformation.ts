import { TextCategoryTemplate } from "../types.js"

export const TRANSFORMATION_TEMPLATE: TextCategoryTemplate = {
  name: "Transformation / Rewrite",
  defaultOutputFormat: "prose",
  defaultReasoningDepth: "quick answer",
  sections: [
    "ROLE", "TASK", "MAPPING", "OUTPUT_FORMAT",
    "AVOID", "LOCKS_SCOPE", "LOCKS_FORMAT",
  ],
}

export function buildMappingSection(): string {
  return "MAPPING: preserve the original meaning and every material detail while changing only the register, format, or language requested"
}
