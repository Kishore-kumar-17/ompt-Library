// ─── Website Prompt Parser ─────────────────────────────────────────────────────
// Keyword extraction from raw user input — no AI, no API. The builder route
// folds structured UI selections (category/sub-category/palette/audience/
// pages) into the free-text idea string as "(category: business; palette:
// Dark; ...)" hints (see routes/builder.ts normalizeBuildRequest) — this
// parser recovers them from that text when a structured field wasn't passed
// through explicitly.

import type { ParsedWebsitePrompt, WebsiteCategory } from "./types.js"
import { CATEGORY_SUBCATEGORIES, WEBSITE_PAGE_NAMES } from "./dictionaries.js"

const CATEGORY_KEYWORDS: Record<WebsiteCategory, string[]> = {
  business:  ["restaurant", "cafe", "clinic", "healthcare", "school", "institute", "boutique", "retail store", "real estate", "law firm", "legal", "service business", "salon", "gym"],
  ecommerce: ["ecommerce", "e-commerce", "shop", "store", "product page", "checkout", "cart", "fashion store", "subscription box", "digital product", "storefront"],
  portfolio: ["portfolio", "photographer", "photography", "designer portfolio", "blogger", "writer site", "developer portfolio", "artist site", "case study", "creator site"],
  saas:      ["saas", "dashboard", "app interface", "developer tool", "api product", "b2b app", "admin panel", "software product"],
  landing:   ["landing page", "waitlist", "coming soon", "launch page", "sign up page", "conference", "event page", "course launch", "info product"],
}

const PALETTE_KEYWORDS = ["dark", "light", "vibrant", "monochrome", "earth tones", "pastel", "neon"]
const AUDIENCE_KEYWORDS: Record<string, string> = {
  "b2b": "B2B", "b2c": "B2C", "gen-z": "Youth / Gen-Z", "gen z": "Youth / Gen-Z", "youth": "Youth / Gen-Z",
  "premium": "Premium / Luxury", "luxury": "Premium / Luxury", "student": "Students",
  "parent": "Parents", "developer": "Developers",
}

function detectCategory(text: string): WebsiteCategory {
  const lower = text.toLowerCase()
  const scores: Record<WebsiteCategory, number> = { business: 0, ecommerce: 0, portfolio: 0, saas: 0, landing: 0 }
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    for (const kw of keywords) {
      if (lower.includes(kw)) scores[cat as WebsiteCategory]++
    }
  }
  const sorted = (Object.entries(scores) as [WebsiteCategory, number][]).sort((a, b) => b[1] - a[1])
  return sorted[0][1] > 0 ? sorted[0][0] : "business"
}

function detectSubcategory(text: string, category: WebsiteCategory): string | null {
  const lower = text.toLowerCase()
  const candidates = CATEGORY_SUBCATEGORIES[category] ?? []
  for (const sub of candidates) {
    const parts = sub.toLowerCase().split(/\s*\/\s*/)
    if (parts.some((p) => lower.includes(p))) return sub
  }
  return null
}

function detectPalette(text: string): string | null {
  const lower = text.toLowerCase()
  const hit = PALETTE_KEYWORDS.find((kw) => lower.includes(kw))
  if (!hit) return null
  return hit.replace(/\b\w/g, (c) => c.toUpperCase())
}

function detectAudience(text: string): string | null {
  const lower = text.toLowerCase()
  for (const [kw, label] of Object.entries(AUDIENCE_KEYWORDS)) {
    if (lower.includes(kw)) return label
  }
  return null
}

function detectPages(text: string): string[] {
  const lower = text.toLowerCase()
  return WEBSITE_PAGE_NAMES.filter((page) => lower.includes(page.toLowerCase()))
}

function getMissingComponents(parsed: Partial<ParsedWebsitePrompt>): string[] {
  const required: (keyof ParsedWebsitePrompt)[] = ["subcategory", "palette", "audience"]
  return required.filter((field) => !parsed[field])
}

export function parseWebsitePrompt(raw: string): ParsedWebsitePrompt {
  const words = raw.trim().split(/\s+/)
  const category = detectCategory(raw)

  const parsed: ParsedWebsitePrompt = {
    detectedCategory: category,
    subcategory: detectSubcategory(raw, category),
    palette: detectPalette(raw),
    audience: detectAudience(raw),
    pages: detectPages(raw),
    missingComponents: [],
    originalWords: words,
  }

  parsed.missingComponents = getMissingComponents(parsed)
  return parsed
}
