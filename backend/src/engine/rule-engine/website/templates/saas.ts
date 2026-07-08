import type { WebsiteCategoryTemplate } from "../types.js"
import { CATEGORY_DEFAULTS } from "../dictionaries.js"

export const SAAS_TEMPLATE: WebsiteCategoryTemplate = {
  name: "Apps & SaaS Interface",
  defaultPalette: CATEGORY_DEFAULTS.saas.defaultPalette,
  defaultAudience: CATEGORY_DEFAULTS.saas.defaultAudience,
  sections: [
    "ROLE", "APPLICATION_OVERVIEW", "BRAND_VOICE", "CORE_FEATURES", "DESIGN_SPECIFICATIONS",
    "CONTENT_GUIDELINES", "TECHNICAL_CONSTRAINTS", "SEO_PERFORMANCE", "INTERACTIONS", "CONSTRAINTS",
    "LOCKS_DESIGN_SYSTEM", "LOCKS_TYPOGRAPHY", "LOCKS_SPACING", "LOCKS_ACCESSIBILITY",
  ],
}

// SaaS's own unique addition — an app interface (unlike a marketing site) has
// real UI state to account for: signed-out, loading, empty, populated, error.
// Skipping any of these is the single most common SaaS-prompt failure.

export function buildAppStateNote(): string {
  return "APPLICATION STATES: every data-driven view must be designed for all five states — signed-out/gate, loading (skeleton, not spinner-only), empty (with a first-action prompt, not a bare 'no data'), populated, and error (with a retry action). Do not design only the populated happy-path state and leave the rest implicit."
}
