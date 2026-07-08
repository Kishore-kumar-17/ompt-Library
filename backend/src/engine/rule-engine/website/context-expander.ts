// ─── Website Context Expander ──────────────────────────────────────────────────
// Expands category/palette/audience/subcategory keys to rich content via
// dictionary lookup. No AI — pure table-driven substitution, same pattern as
// the video/text context-expanders.

import type { WebsiteCategory } from "./types.js"
import {
  ROLE_FRAMING, CATEGORY_DEFAULTS, PALETTES, PALETTE_MOOD, PALETTE_RADIUS,
  TYPOGRAPHY_SCALES, SPACING_BY_CATEGORY, AUDIENCE_TONE, SUBCATEGORY_FEATURES,
  GENERIC_FEATURES, CATEGORY_SUBCATEGORIES,
  type PaletteTokens, type RadiusScale, type TypographyScale, type AudienceTone,
} from "./dictionaries.js"

function fuzzyLookup<T>(dict: Record<string, T>, term: string | null | undefined): T | null {
  if (!term) return null
  const lower = term.toLowerCase().trim()
  for (const key of Object.keys(dict)) {
    if (key.toLowerCase() === lower) return dict[key]
  }
  for (const key of Object.keys(dict)) {
    if (lower.includes(key.toLowerCase()) || key.toLowerCase().includes(lower)) return dict[key]
  }
  return null
}

export function expandRoleFraming(category: WebsiteCategory, subcategory: string): string {
  const template = ROLE_FRAMING[category] ?? ROLE_FRAMING.business
  return template.replace("{sub}", subcategory.toLowerCase())
}

export function getPalette(name: string | null | undefined): { name: string; tokens: PaletteTokens } {
  const fallback = CATEGORY_DEFAULTS.business.defaultPalette
  const match = fuzzyLookup(PALETTES, name)
  if (match) {
    const resolvedName = Object.keys(PALETTES).find((k) => PALETTES[k] === match) ?? fallback
    return { name: resolvedName, tokens: match }
  }
  return { name: fallback, tokens: PALETTES[fallback] }
}

export function getPaletteMood(name: string): string {
  return PALETTE_MOOD[name] ?? PALETTE_MOOD.Light
}

export function getPaletteRadius(name: string): RadiusScale {
  return PALETTE_RADIUS[name] ?? PALETTE_RADIUS.Light
}

export function getTypography(category: WebsiteCategory): TypographyScale {
  return TYPOGRAPHY_SCALES[category] ?? TYPOGRAPHY_SCALES.business
}

export function getSpacing(category: WebsiteCategory): string {
  return SPACING_BY_CATEGORY[category] ?? SPACING_BY_CATEGORY.business
}

export function getAudienceTone(audience: string | null | undefined): { name: string; tone: AudienceTone } {
  const fallbackName = "B2C"
  const match = fuzzyLookup(AUDIENCE_TONE, audience)
  if (match) {
    const resolvedName = Object.keys(AUDIENCE_TONE).find((k) => AUDIENCE_TONE[k] === match) ?? fallbackName
    return { name: resolvedName, tone: match }
  }
  return { name: fallbackName, tone: AUDIENCE_TONE[fallbackName] }
}

// Resolves the subcategory string to a canonical key belonging to `category`
// (falling back to the category's first subcategory when the supplied value
// doesn't match anything recognized), then returns its feature/page list.
export function resolveSubcategory(category: WebsiteCategory, subcategory: string | null | undefined): string {
  const valid = CATEGORY_SUBCATEGORIES[category] ?? CATEGORY_SUBCATEGORIES.business
  if (!subcategory) return valid[0]
  const lower = subcategory.toLowerCase().trim()
  const exact = valid.find((s) => s.toLowerCase() === lower)
  if (exact) return exact
  const partial = valid.find((s) => lower.includes(s.toLowerCase()) || s.toLowerCase().includes(lower))
  return partial ?? valid[0]
}

export function getSubcategoryFeatures(subcategory: string): string[] {
  return SUBCATEGORY_FEATURES[subcategory] ?? GENERIC_FEATURES
}
