import { CodeCategoryTemplate } from "../types.js"

export const FEATURE_TEMPLATE: CodeCategoryTemplate = {
  name: "Feature",
  defaultOutputFormat: "tests included",
  isAgentic: true,
  sections: [
    "TASK", "TECH_STACK", "ACCEPTANCE_CRITERIA", "OUTPUT_FORMAT", "CONVENTION",
    "AVOID", "LOCKS_BOUNDARY", "LOCKS_ACCEPTANCE", "LOCKS_CONVENTION",
  ],
}

export function buildAcceptanceCriteriaSection(): string {
  return "ACCEPTANCE CRITERIA: list the specific conditions that define this feature as complete — the main path plus at least one edge case"
}
