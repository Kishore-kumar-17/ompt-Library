// ─── Code Category Template Registry ────────────────────────────────────────────
// Drives the category branching that used to be duplicated imperatively in
// builder.ts and improver.ts (if (cat === "bugfix") ... if (cat === "feature")
// ...). Each category's CodeCategoryTemplate (name/sections/defaultOutputFormat
// /isAgentic) plus its category-specific "extra" section builder are looked up
// here instead of re-branched at every call site.

import type { CodeCategory, CodeCategoryTemplate } from "../types.js"
import { BUGFIX_TEMPLATE, buildReproSection } from "./bugfix.js"
import { FEATURE_TEMPLATE, buildAcceptanceCriteriaSection } from "./feature.js"
import { REFACTOR_TEMPLATE, buildNonGoalsSection } from "./refactor.js"
import { REVIEW_TEMPLATE, buildFocusAreasSection } from "./review.js"
import { TEST_TEMPLATE, buildCoverageTargetSection } from "./test.js"

export interface CodeCategoryDefinition {
  template: CodeCategoryTemplate
  buildExtraSection: () => string
}

export const CODE_CATEGORY_REGISTRY: Record<CodeCategory, CodeCategoryDefinition> = {
  bugfix:   { template: BUGFIX_TEMPLATE,   buildExtraSection: buildReproSection },
  feature:  { template: FEATURE_TEMPLATE,  buildExtraSection: buildAcceptanceCriteriaSection },
  refactor: { template: REFACTOR_TEMPLATE, buildExtraSection: buildNonGoalsSection },
  review:   { template: REVIEW_TEMPLATE,   buildExtraSection: buildFocusAreasSection },
  test:     { template: TEST_TEMPLATE,     buildExtraSection: buildCoverageTargetSection },
}

// Whether a category's template includes a given section key (e.g. review's
// template has no "CONVENTION"/"LOCKS_CONVENTION" entry — it produces
// findings, not conforming code, so there's nothing to "match conventions"
// against). Replaces the `if (cat !== "review") ...` special-casing that used
// to be hardcoded at each call site.
export function hasSection(category: CodeCategory, section: string): boolean {
  const def = CODE_CATEGORY_REGISTRY[category]
  return def ? def.template.sections.includes(section) : false
}
