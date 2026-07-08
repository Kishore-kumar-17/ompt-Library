// ─── Business Website Formula Template ─────────────────────────────────────────
// Website Formula v1.0 — holds the section builders shared across ALL website
// categories (Role / Application Overview / Brand Voice / Core Features),
// mirroring how video's narrative.ts and text's qa.ts hold their families'
// shared section builders. Business also contributes its own unique addition:
// a trust-signals note, since local/service businesses convert on credibility
// signals in a way the other categories don't.

import type { WebsiteCategory, WebsiteCategoryTemplate } from "../types.js"
import { expandRoleFraming, getSubcategoryFeatures, getAudienceTone } from "../context-expander.js"
import { CATEGORY_DEFAULTS } from "../dictionaries.js"

export const BUSINESS_TEMPLATE: WebsiteCategoryTemplate = {
  name: "Business Website",
  defaultPalette: CATEGORY_DEFAULTS.business.defaultPalette,
  defaultAudience: CATEGORY_DEFAULTS.business.defaultAudience,
  sections: [
    "ROLE", "APPLICATION_OVERVIEW", "BRAND_VOICE", "CORE_FEATURES", "DESIGN_SPECIFICATIONS",
    "CONTENT_GUIDELINES", "TECHNICAL_CONSTRAINTS", "SEO_PERFORMANCE", "INTERACTIONS", "CONSTRAINTS",
    "LOCKS_DESIGN_SYSTEM", "LOCKS_TYPOGRAPHY", "LOCKS_SPACING", "LOCKS_ACCESSIBILITY",
  ],
}

// ─── Section builders (shared across all website categories) ─────────────────

export function buildRoleSection(category: WebsiteCategory, subcategory: string): string {
  return `ROLE: You are ${expandRoleFraming(category, subcategory)}.`
}

export function buildOverviewSection(category: WebsiteCategory, categoryLabel: string, subcategory: string, pages: string[], idea?: string): string {
  const features = getSubcategoryFeatures(subcategory)
  const pageNames = pages.length ? pages.join(", ") : features.map((f) => f.split(" - ")[0].trim()).join(", ")
  const { primaryGoal, secondaryGoal } = CATEGORY_DEFAULTS[category] ?? CATEGORY_DEFAULTS.business
  // Ground-truth examples describe the actual business/idea here ("This is a
  // business website for a top Indian coaching institute preparing students
  // for...") rather than a generic placeholder — fold the user's free-text
  // idea in when present, falling back to the subcategory name alone only
  // when no idea text was supplied.
  const description = idea?.trim() ? idea.trim() : `a ${subcategory.toLowerCase()} concept`
  return [
    "APPLICATION OVERVIEW:",
    `This is a ${categoryLabel.toLowerCase()} for ${description}.`,
    `Core website areas: ${pageNames}.`,
    `Primary goal: ${primaryGoal}. Secondary goal: ${secondaryGoal}.`,
  ].join("\n")
}

export function buildVoiceSection(subcategory: string, audience: string | null | undefined): string {
  const { name, tone } = getAudienceTone(audience)
  const avoidSentence = tone.avoid.charAt(0).toUpperCase() + tone.avoid.slice(1)
  return [
    "BRAND VOICE & MOOD:",
    `Voice is ${tone.voice}, calibrated for a ${name} audience engaging with a ${subcategory.toLowerCase()} site.`,
    `${avoidSentence}.`,
    `Vibe word: ${tone.vibeWord}.`,
  ].join("\n")
}

export function buildFeaturesSection(subcategory: string, pages: string[], extraNote?: string): string {
  const features = getSubcategoryFeatures(subcategory)
  const numbered = features.map((f, i) => `${i + 1}. ${f}`).join("\n")
  const pageNote = pages.length ? `\n\nRequested pages to prioritize in this build: ${pages.join(", ")}.` : ""
  const extra = extraNote ? `\n\n${extraNote}` : ""
  return `CORE FEATURES & FUNCTIONALITY:\n${numbered}${pageNote}${extra}`
}

// ─── Business's own unique addition ───────────────────────────────────────────

export function buildTrustSignalsNote(): string {
  return "TRUST SIGNALS: every page that asks for a booking, quote, or contact detail must be preceded by at least one credibility signal in the same viewport — a certification badge, review count, years-in-business figure, or named credential. Local/service businesses convert on proof of legitimacy, not just aesthetics."
}
