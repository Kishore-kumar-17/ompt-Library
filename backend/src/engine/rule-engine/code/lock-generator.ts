// ─── Code Lock Generator ────────────────────────────────────────────────────────
// Generates Engineering Spec Formula v1.0 LOCK blocks. No AI — deterministic
// output from category defaults + overrides.

import type { CodeLockValues, CodeCategory } from "./types.js"
import { CATEGORY_DEFAULTS } from "./dictionaries.js"
import { buildBoundaryLock, buildAcceptanceLock, buildConventionLock } from "./templates/shared.js"

export function generateCodeLocks(
  category: CodeCategory,
  convention: string,
  overrides: Partial<CodeLockValues> = {},
  isAgentic = false
): { boundary: string; acceptance: string; convention: string } {
  const d = CATEGORY_DEFAULTS[category] ?? CATEGORY_DEFAULTS.bugfix

  const v: CodeLockValues = {
    boundaryInclude: overrides.boundaryInclude ?? d.boundaryHint,
    boundaryExclude: overrides.boundaryExclude ?? "any file outside that boundary",
    acceptance:       overrides.acceptance      ?? d.acceptanceHint,
    convention:       overrides.convention      ?? convention,
  }

  return {
    boundary:   buildBoundaryLock(v.boundaryInclude, v.boundaryExclude, isAgentic),
    acceptance: buildAcceptanceLock(v.acceptance),
    convention: buildConventionLock(v.convention),
  }
}
