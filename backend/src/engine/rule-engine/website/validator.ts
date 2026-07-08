// ─── Website Validator / Quality Scorer ────────────────────────────────────────
// Scores prompts 0–100 based on completeness and section presence, weighted
// by what each category cares about most — mirrors the code engine's
// category-aware fix: a SaaS interface prompt should weigh TECHNICAL &
// STACK CONSTRAINTS (auth/state) more heavily than a Landing Page prompt,
// which weighs INTERACTIONS & MICRO-ANIMATIONS (the whole page is one
// conversion-focused scroll) more heavily instead.

import type { WebsiteCategory } from "./types.js"

const BASE_WEIGHTS: Record<string, number> = {
  ROLE:                                8,
  "APPLICATION OVERVIEW":              10,
  "BRAND VOICE & MOOD":                8,
  "CORE FEATURES & FUNCTIONALITY":     16,
  "DESIGN SPECIFICATIONS":             14,
  "CONTENT & COPYWRITING GUIDELINES":  6,
  "TECHNICAL & STACK CONSTRAINTS":     8,
  "SEO & PERFORMANCE":                 6,
  "INTERACTIONS & MICRO-ANIMATIONS":   6,
  "CONSTRAINTS & NON-GOALS":           6,
  "LOCKS - DESIGN SYSTEM":             5,
  "LOCKS - TYPOGRAPHY":                3,
  "LOCKS - SPACING & RADIUS":          2,
  "LOCKS - ACCESSIBILITY":             2,
}

// Small category-specific emphasis shifts — the section that matters most
// gets a few extra points, taken from a section that matters comparatively
// less for that category's core failure mode.
const CATEGORY_EMPHASIS: Record<WebsiteCategory, Partial<Record<string, number>>> = {
  business:  {},
  ecommerce: { "TECHNICAL & STACK CONSTRAINTS": 12, "CONTENT & COPYWRITING GUIDELINES": 4 },
  portfolio: { "INTERACTIONS & MICRO-ANIMATIONS": 10, "SEO & PERFORMANCE": 4 },
  saas:      { "TECHNICAL & STACK CONSTRAINTS": 14, "SEO & PERFORMANCE": 4 },
  landing:   { "INTERACTIONS & MICRO-ANIMATIONS": 10, "CONTENT & COPYWRITING GUIDELINES": 8 },
}

function getSectionWeights(category?: WebsiteCategory): Record<string, number> {
  const weights: Record<string, number> = { ...BASE_WEIGHTS }
  const emphasis = category ? CATEGORY_EMPHASIS[category] : undefined
  if (emphasis) {
    for (const [section, weight] of Object.entries(emphasis)) {
      if (weight !== undefined) weights[section] = weight
    }
  }
  return weights
}

function detectSection(prompt: string, section: string): boolean {
  const lower = prompt.toLowerCase()
  const sec = section.toLowerCase()
  if (sec.startsWith("locks")) return lower.includes(`**${sec}`)
  return lower.includes(`${sec}:`) || lower.includes(`${sec}\n`) || lower.includes(`### section`) && lower.includes(sec)
}

export function scoreWebsitePrompt(prompt: string, category?: WebsiteCategory): number {
  const weights = getSectionWeights(category)
  let total = 0
  let earned = 0
  for (const [section, weight] of Object.entries(weights)) {
    total += weight
    if (detectSection(prompt, section)) earned += weight
  }
  const wc = prompt.split(/\s+/).filter(Boolean).length
  if (wc > 150) earned += 3
  if (wc > 350) earned += 4
  const raw = Math.round((earned / (total + 7)) * 100)
  return Math.min(100, Math.max(0, raw))
}

export function getMissingWebsiteSections(prompt: string, category?: WebsiteCategory): string[] {
  const weights = getSectionWeights(category)
  return Object.keys(weights).filter((section) => !detectSection(prompt, section))
}
