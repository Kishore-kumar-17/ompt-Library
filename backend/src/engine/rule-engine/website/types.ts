// ─── Website Rule Engine Types ─────────────────────────────────────────────────
// Website Formula v1.0 — zero-API deterministic website-builder prompt
// construction. Unlike image (static geometry), video (temporal motion), or
// text (ambiguity), website prompting fails on SYSTEM DRIFT: an AI website
// builder that nails the homepage palette then quietly drifts to different
// hex values, spacing, or type scale on the pricing or contact page. Locks
// here pin the design system (palette, typography, spacing/radius,
// breakpoints, accessibility) as an invariant that must hold across every
// page the builder generates, not just the first screen it renders.

export type WebsiteCategory = "business" | "ecommerce" | "portfolio" | "saas" | "landing"

export type WebsitePlatformKey = "lovable" | "bolt" | "v0" | "cursor" | "chatgpt" | "claude" | "gemini" | "grok"

export interface WebsiteBuildRequest {
  category: WebsiteCategory
  subcategory?: string
  idea?: string
  palette?: string
  audience?: string
  pages?: string[]
  extraNotes?: string
  platform: WebsitePlatformKey
}

export interface WebsiteImproveRequest {
  promptText: string
  platform: WebsitePlatformKey
  category?: WebsiteCategory
}

export interface ParsedWebsitePrompt {
  detectedCategory: WebsiteCategory
  subcategory: string | null
  palette: string | null
  audience: string | null
  pages: string[]
  missingComponents: string[]
  originalWords: string[]
}

export interface WebsiteLockValues {
  paletteName: string
  typographyLabel: string
  spacingSystem: string
  radiusScale: string
  breakpoints: string
}

export interface WebsiteRuleEngineResult {
  prompt: string
  platform: WebsitePlatformKey
  category: WebsiteCategory
  score: number
  components: {
    subcategory: boolean
    palette: boolean
    audience: boolean
    pages: boolean
    locks: boolean
  }
  locks: {
    designSystem: string
    typography: string
    spacing: string
    accessibility: string
  }
  wordCount: number
  engine: "rule-based"
}

export interface WebsiteCategoryTemplate {
  name: string
  sections: string[]
  defaultPalette: string
  defaultAudience: string
}
