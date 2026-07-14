// ─── Rule-Based Website Builder ─────────────────────────────────────────────────
// Assembles a complete structured website-builder prompt from user selections.
// Zero API calls — Website Formula v1.0 assembly only.

import type { WebsiteBuildRequest, WebsiteCategory, WebsiteRuleEngineResult } from "./types.js"
import {
  CATEGORY_DEFAULTS, CATEGORY_CONTENT_NOTES, CATEGORY_TECHNICAL_NOTES,
  CATEGORY_SEO_NOTES, CATEGORY_INTERACTION_NOTES, CATEGORY_CONSTRAINT_NOTES,
  DELIVERABLE_FORMAT_NOTE,
} from "./dictionaries.js"
import { resolveSubcategory, getPalette } from "./context-expander.js"
import { generateWebsiteLocks, buildDesignSpecificationsSection } from "./lock-generator.js"
import {
  BUSINESS_TEMPLATE, buildRoleSection, buildOverviewSection, buildVoiceSection,
  buildFeaturesSection, buildTrustSignalsNote,
} from "./templates/business.js"
import { ECOMMERCE_TEMPLATE, buildCommerceFlowNote } from "./templates/ecommerce.js"
import { PORTFOLIO_TEMPLATE, buildCaseStudyNote } from "./templates/portfolio.js"
import { SAAS_TEMPLATE, buildAppStateNote } from "./templates/saas.js"
import { LANDING_TEMPLATE, buildConversionFunnelNote } from "./templates/landing.js"
import { formatForWebsitePlatform } from "./formatter.js"
import { scoreWebsitePrompt } from "./validator.js"

const CATEGORY_TEMPLATES = {
  business: BUSINESS_TEMPLATE,
  ecommerce: ECOMMERCE_TEMPLATE,
  portfolio: PORTFOLIO_TEMPLATE,
  saas: SAAS_TEMPLATE,
  landing: LANDING_TEMPLATE,
} as const

const CATEGORY_EXTRA_NOTE: Record<WebsiteCategory, () => string> = {
  business: buildTrustSignalsNote,
  ecommerce: buildCommerceFlowNote,
  portfolio: buildCaseStudyNote,
  saas: buildAppStateNote,
  landing: buildConversionFunnelNote,
}

function buildListSection(label: string, items: string[]): string {
  return `${label}:\n${items.map((i) => `- ${i}`).join("\n")}`
}

// routes/builder.ts (normalizeBuildRequest) folds the frontend's structured
// selectors into the free-text idea as a trailing "(category: ...; palette:
// ...; ...)" hint group so the parser can recover them — see website-bridge.ts.
// That suffix is a parsing aid, not something the user wrote; strip it before
// the idea text is echoed back into APPLICATION OVERVIEW or NOTES, so the
// generated prompt never leaks internal hint-key plumbing at the user.
function stripHintSuffix(text: string): string {
  const trimmed = text.trim()
  const m = trimmed.match(/^(.*?)\s*\(([^()]*)\)\s*$/s)
  if (!m) return trimmed
  const inner = m[2]
  const looksLikeHintSuffix = /\b(category|sub-category|audience|palette|pages)\s*:/i.test(inner)
  return looksLikeHintSuffix ? m[1].trim() : trimmed
}

export function buildWebsiteFromRules(req: WebsiteBuildRequest): WebsiteRuleEngineResult {
  const cat = req.category ?? "business"
  const template = CATEGORY_TEMPLATES[cat] ?? CATEGORY_TEMPLATES.business
  const defaults = CATEGORY_DEFAULTS[cat] ?? CATEGORY_DEFAULTS.business

  const subcategory = resolveSubcategory(cat, req.subcategory)
  const paletteInput = req.palette ?? defaults.defaultPalette
  const audience = req.audience ?? defaults.defaultAudience
  const pages = req.pages ?? []
  const ideaClean = req.idea?.trim() ? stripHintSuffix(req.idea) : ""

  const sections: string[] = [
    buildRoleSection(cat, subcategory),
    buildOverviewSection(cat, template.name, subcategory, pages, ideaClean || undefined),
    buildVoiceSection(subcategory, audience),
    buildFeaturesSection(subcategory, pages, (CATEGORY_EXTRA_NOTE[cat] ?? buildTrustSignalsNote)()),
    buildDesignSpecificationsSection(paletteInput, cat),
    buildListSection("CONTENT & COPYWRITING GUIDELINES", CATEGORY_CONTENT_NOTES[cat] ?? CATEGORY_CONTENT_NOTES.business),
    buildListSection("TECHNICAL & STACK CONSTRAINTS", CATEGORY_TECHNICAL_NOTES[cat] ?? CATEGORY_TECHNICAL_NOTES.business),
    buildListSection("SEO & PERFORMANCE", CATEGORY_SEO_NOTES[cat] ?? CATEGORY_SEO_NOTES.business),
    buildListSection("INTERACTIONS & MICRO-ANIMATIONS", CATEGORY_INTERACTION_NOTES[cat] ?? CATEGORY_INTERACTION_NOTES.business),
    buildListSection("CONSTRAINTS & NON-GOALS", [...(CATEGORY_CONSTRAINT_NOTES[cat] ?? CATEGORY_CONSTRAINT_NOTES.business), DELIVERABLE_FORMAT_NOTE]),
  ]

  // Only add a NOTES section for genuinely extra content — when extraNotes is
  // just the same idea text already folded into APPLICATION OVERVIEW above
  // (the common case, since the bridge passes the same idea as both idea and
  // extraNotes), repeating it verbatim again here would be pure duplication.
  const extraNotesClean = req.extraNotes?.trim() ? stripHintSuffix(req.extraNotes) : ""
  if (extraNotesClean && extraNotesClean !== ideaClean) sections.push(`NOTES: ${extraNotesClean}`)

  const locks = generateWebsiteLocks(paletteInput, cat)
  sections.push(locks.designSystem, locks.typography, locks.spacing, locks.accessibility)

  const rawPrompt = sections.join("\n\n")
  const { tokens } = getPalette(paletteInput)
  const formatted = formatForWebsitePlatform(rawPrompt, req.platform, locks, tokens, template.name)
  // Score the structured (pre-format) text — several platform formatters
  // (Bolt, Cursor, Gemini, Grok, v0, ChatGPT, Claude) rewrite labeled
  // sections into a different native structure entirely, which would make
  // section-presence scoring blind to content that's genuinely there, just
  // no longer under an explicit "LABEL:" prefix.
  const score = scoreWebsitePrompt(rawPrompt, cat)

  return {
    prompt: formatted,
    platform: req.platform,
    category: cat,
    score,
    components: {
      subcategory: !!req.subcategory,
      palette: !!req.palette,
      audience: !!req.audience,
      pages: !!req.pages?.length,
      locks: true,
    },
    locks,
    wordCount: formatted.split(/\s+/).filter(Boolean).length,
    engine: "rule-based",
  }
}
