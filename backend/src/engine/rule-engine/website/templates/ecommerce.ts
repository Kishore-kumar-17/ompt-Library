import type { WebsiteCategoryTemplate } from "../types.js"
import { CATEGORY_DEFAULTS } from "../dictionaries.js"

export const ECOMMERCE_TEMPLATE: WebsiteCategoryTemplate = {
  name: "E-Commerce",
  defaultPalette: CATEGORY_DEFAULTS.ecommerce.defaultPalette,
  defaultAudience: CATEGORY_DEFAULTS.ecommerce.defaultAudience,
  sections: [
    "ROLE", "APPLICATION_OVERVIEW", "BRAND_VOICE", "CORE_FEATURES", "DESIGN_SPECIFICATIONS",
    "CONTENT_GUIDELINES", "TECHNICAL_CONSTRAINTS", "SEO_PERFORMANCE", "INTERACTIONS", "CONSTRAINTS",
    "LOCKS_DESIGN_SYSTEM", "LOCKS_TYPOGRAPHY", "LOCKS_SPACING", "LOCKS_ACCESSIBILITY",
  ],
}

// Ecommerce's own unique addition — the cart/checkout/payment path is the
// entire commercial function of the site, so it gets an explicit, unskippable
// note the way a Business or SaaS site's feature list doesn't need.

export function buildCommerceFlowNote(): string {
  return "COMMERCE FLOW: cart state, applied promo codes, and selected variant must be visible and editable from every step of checkout — never force a user back to the product page to change a size or quantity. Payment errors surface inline next to the failed field, never as a silent redirect or blank screen."
}
