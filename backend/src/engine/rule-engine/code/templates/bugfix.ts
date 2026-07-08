// ─── Bug Fix Formula Template ───────────────────────────────────────────────────
// Engineering Spec Formula v1.0 — bugfix-specific content only. Shared
// section/lock builders reused across all categories live in ./shared.ts.

import { CodeCategoryTemplate } from "../types.js"

export const BUGFIX_TEMPLATE: CodeCategoryTemplate = {
  name: "Bug Fix",
  defaultOutputFormat: "diff only",
  isAgentic: false,
  sections: [
    "TASK", "TECH_STACK", "REPRO", "OUTPUT_FORMAT", "CONVENTION",
    "AVOID", "LOCKS_BOUNDARY", "LOCKS_ACCEPTANCE", "LOCKS_CONVENTION",
  ],
}

export function buildReproSection(): string {
  return "REPRO: include the exact error message or stack trace and the steps to reproduce it — a bug report without repro steps can't be verified as fixed"
}
