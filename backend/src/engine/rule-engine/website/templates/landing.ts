import type { WebsiteCategoryTemplate } from "../types.js"
import { CATEGORY_DEFAULTS } from "../dictionaries.js"

export const LANDING_TEMPLATE: WebsiteCategoryTemplate = {
  name: "Landing Page",
  defaultPalette: CATEGORY_DEFAULTS.landing.defaultPalette,
  defaultAudience: CATEGORY_DEFAULTS.landing.defaultAudience,
  sections: [
    "ROLE", "APPLICATION_OVERVIEW", "BRAND_VOICE", "CORE_FEATURES", "DESIGN_SPECIFICATIONS",
    "CONTENT_GUIDELINES", "TECHNICAL_CONSTRAINTS", "SEO_PERFORMANCE", "INTERACTIONS", "CONSTRAINTS",
    "LOCKS_DESIGN_SYSTEM", "LOCKS_TYPOGRAPHY", "LOCKS_SPACING", "LOCKS_ACCESSIBILITY",
  ],
}

// Landing's own unique addition — a landing page has exactly one conversion
// funnel and no navigation to distract from it, unlike every other category
// here which is a genuine multi-page site.

export function buildConversionFunnelNote(): string {
  return "CONVERSION FUNNEL: the page is a single linear scroll toward one primary CTA repeated at the top, middle, and bottom — every section either builds the case for that action or removes a specific objection to it. No section exists purely for decoration, and no secondary link is allowed to route the visitor away from the page before they convert."
}
