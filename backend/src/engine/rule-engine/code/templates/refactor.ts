import { CodeCategoryTemplate } from "../types.js"

export const REFACTOR_TEMPLATE: CodeCategoryTemplate = {
  name: "Refactor",
  defaultOutputFormat: "full file",
  isAgentic: true,
  sections: [
    "TASK", "TECH_STACK", "NON_GOALS", "OUTPUT_FORMAT", "CONVENTION",
    "AVOID", "LOCKS_BOUNDARY", "LOCKS_ACCEPTANCE", "LOCKS_CONVENTION",
  ],
}

export function buildNonGoalsSection(): string {
  return "NON-GOALS: explicitly state what must NOT change — observable behavior, public API, and performance characteristics"
}
