import { CodeCategoryTemplate } from "../types.js"

export const TEST_TEMPLATE: CodeCategoryTemplate = {
  name: "Test Writing",
  defaultOutputFormat: "full file",
  isAgentic: true,
  sections: [
    "TASK", "TECH_STACK", "COVERAGE_TARGET", "OUTPUT_FORMAT", "CONVENTION",
    "AVOID", "LOCKS_BOUNDARY", "LOCKS_ACCEPTANCE", "LOCKS_CONVENTION",
  ],
}

export function buildCoverageTargetSection(): string {
  return "COVERAGE TARGET: specify what must be covered — the happy path, named edge cases, and error conditions — not just line coverage for its own sake"
}
