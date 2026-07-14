import { CodeCategoryTemplate } from "../types.js"

export const REVIEW_TEMPLATE: CodeCategoryTemplate = {
  name: "Code Review",
  defaultOutputFormat: "explanation included",
  isAgentic: false,
  sections: [
    "TASK", "TECH_STACK", "FOCUS_AREAS", "OUTPUT_FORMAT",
    "AVOID", "LOCKS_BOUNDARY", "LOCKS_ACCEPTANCE",
  ],
}

export function buildFocusAreasSection(): string {
  return "FOCUS AREAS: name what the review should prioritize — correctness, security, performance, or maintainability — an unscoped review produces generic style comments instead of the feedback that matters"
}
