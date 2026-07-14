import type { WebsiteCategoryTemplate } from "../types.js"
import { CATEGORY_DEFAULTS } from "../dictionaries.js"

export const PORTFOLIO_TEMPLATE: WebsiteCategoryTemplate = {
  name: "Portfolio / Creator Site",
  defaultPalette: CATEGORY_DEFAULTS.portfolio.defaultPalette,
  defaultAudience: CATEGORY_DEFAULTS.portfolio.defaultAudience,
  sections: [
    "ROLE", "APPLICATION_OVERVIEW", "BRAND_VOICE", "CORE_FEATURES", "DESIGN_SPECIFICATIONS",
    "CONTENT_GUIDELINES", "TECHNICAL_CONSTRAINTS", "SEO_PERFORMANCE", "INTERACTIONS", "CONSTRAINTS",
    "LOCKS_DESIGN_SYSTEM", "LOCKS_TYPOGRAPHY", "LOCKS_SPACING", "LOCKS_ACCESSIBILITY",
  ],
}

// Portfolio's own unique addition — the work itself is the product, so every
// entry needs a forced narrative structure or it degrades into an
// unexplained image dump, which is the single most common portfolio failure.

export function buildCaseStudyNote(): string {
  return "CASE STUDY STRUCTURE: every portfolio entry follows problem, process, outcome — a raw image or file with no framing text is not acceptable as a standalone entry. Where the work is visual-only (photography, art), the framing text is a short caption stating context (client/brief, medium, year) rather than a full narrative."
}
