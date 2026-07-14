// ─── Rule-Based Prompt Parser ─────────────────────────────────────────────────
// Keyword extraction from raw user input — no AI, no API.

import type { ParsedPrompt, RuleEngineCategory } from "./types"

// ─── Category detection keywords ─────────────────────────────────────────────

const CATEGORY_KEYWORDS: Record<RuleEngineCategory, string[]> = {
  people:  ["person", "man", "woman", "portrait", "face", "people", "human", "engineer", "chef", "doctor", "athlete", "founder", "executive", "model", "musician", "artist", "bedouin", "andean", "entrepreneur"],
  fashion: ["fashion", "editorial", "designer", "outfit", "garment", "clothing", "couture", "style", "lookbook", "collection", "vogue", "runway"],
  product: ["product", "item", "watch", "bottle", "shoe", "bag", "jewel", "object", "package", "cosmetic", "fragrance", "gadget", "device"],
  art:     ["painting", "illustration", "artwork", "digital art", "drawing", "sketch", "canvas", "surreal", "abstract", "concept art", "watercolour", "watercolor", "oil painting"],
  social:  ["instagram", "social media", "story", "reel", "feed", "tiktok", "content", "influencer", "lifestyle post"],
}

// ─── Section keyword matchers ─────────────────────────────────────────────────

const LIGHTING_KEYWORDS = ["window light", "golden hour", "studio", "ring light", "morning light", "blue hour", "overcast", "candlelight", "neon", "rembrandt", "flat", "backlight", "dramatic", "soft"]
const CAMERA_KEYWORDS   = ["portrait", "close-up", "environmental", "wide", "editorial", "product shot", "fashion shot", "chest-up", "head-and-shoulders", "full-length"]
const HAND_KEYWORDS     = ["hands in pockets", "hand in pocket", "arms crossed", "hands clasped", "at sides", "holding", "on keyboard", "prayer"]
const STYLE_KEYWORDS    = ["editorial", "documentary", "fashion photography", "commercial", "cinematic", "fine art", "lifestyle"]
const PALETTE_KEYWORDS  = ["neutral", "cool", "warm", "monochrome", "dark", "vibrant"]

const SETTING_KEYWORDS  = ["office", "studio", "street", "outdoor", "indoor", "nature", "library", "cafe", "rooftop", "desert", "market", "home"]
const WARDROBE_KEYWORDS = ["suit", "business casual", "casual", "hoodie", "formal", "streetwear", "traditional", "athletic", "smart casual", "jeans", "dress"]

// ─── Word-boundary keyword matching ───────────────────────────────────────────
// Plain .includes() false-positives on substrings ("surface" contains "face"),
// which silently misclassifies the subject. Match on word boundaries instead.

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function containsKeyword(lower: string, keyword: string): boolean {
  return new RegExp(`\\b${escapeRegExp(keyword)}\\b`).test(lower)
}

// ─── Category detection ───────────────────────────────────────────────────────
// Falls back to "product" (not "people") when nothing matches or scores tie —
// its required fields (subject/lighting/camera) carry no wardrobe/skin
// assumptions, so it degrades gracefully for subjects outside the five known
// categories (animals, landscapes, vehicles, food, etc).

function detectCategory(text: string): RuleEngineCategory {
  const lower = text.toLowerCase()
  const scores: Record<RuleEngineCategory, number> = {
    people: 0, fashion: 0, product: 0, art: 0, social: 0,
  }
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    for (const kw of keywords) {
      if (containsKeyword(lower, kw)) scores[cat as RuleEngineCategory]++
    }
  }
  const sorted = (Object.entries(scores) as [RuleEngineCategory, number][])
    .sort((a, b) => b[1] - a[1])
  const [topCategory, topScore] = sorted[0]
  const isTie = sorted.filter(([, score]) => score === topScore).length > 1
  return topScore > 0 && !isTie ? topCategory : "product"
}

// ─── Generic keyword finder ───────────────────────────────────────────────────

function findFirstMatch(text: string, keywords: string[]): string | null {
  const lower = text.toLowerCase()
  for (const kw of keywords) {
    if (containsKeyword(lower, kw)) return kw
  }
  return null
}

// ─── Hand position normaliser ─────────────────────────────────────────────────

function normaliseHandPosition(text: string): string | null {
  const lower = text.toLowerCase()
  if (lower.includes("both hands") && lower.includes("pocket")) return "pant pocket both"
  if ((lower.includes("hand in pocket") || lower.includes("hands in pocket")) && lower.includes("jacket")) return "jacket pocket"
  if (lower.includes("hand") && lower.includes("pocket")) return "pant pocket right"
  if (lower.includes("arms crossed") || lower.includes("crossed arms")) return "arms crossed"
  if (lower.includes("clasped")) return "hands clasped"
  if (lower.includes("at side") || lower.includes("by side")) return "at sides"
  if (lower.includes("keyboard") || lower.includes("typing")) return "on keyboard"
  if (lower.includes("holding")) return "holding object"
  if (lower.includes("prayer") || lower.includes("namaste")) return "prayer"
  return findFirstMatch(text, HAND_KEYWORDS)
}

// ─── Missing component checker ────────────────────────────────────────────────

function getMissingComponents(parsed: Partial<ParsedPrompt>, category: RuleEngineCategory): string[] {
  const missing: string[] = []
  const required: Record<RuleEngineCategory, string[]> = {
    people:  ["subject", "lighting", "camera"],
    fashion: ["subject", "wardrobe", "lighting"],
    product: ["subject", "lighting", "camera"],
    art:     ["subject", "style"],
    social:  ["subject", "setting"],
  }
  for (const field of (required[category] ?? [])) {
    if (!parsed[field as keyof typeof parsed]) missing.push(field)
  }
  return missing
}

// ─── Main parser ──────────────────────────────────────────────────────────────

export function parsePrompt(raw: string): ParsedPrompt {
  const words = raw.trim().split(/\s+/)
  const category = detectCategory(raw)

  const parsed: ParsedPrompt = {
    detectedCategory: category,
    subject:      raw.length > 5 ? raw.split(/[,\n]/)[0].trim() : null,
    wardrobe:     findFirstMatch(raw, WARDROBE_KEYWORDS),
    setting:      findFirstMatch(raw, SETTING_KEYWORDS),
    lighting:     findFirstMatch(raw, LIGHTING_KEYWORDS),
    camera:       findFirstMatch(raw, CAMERA_KEYWORDS),
    handPosition: normaliseHandPosition(raw),
    style:        findFirstMatch(raw, STYLE_KEYWORDS),
    palette:      findFirstMatch(raw, PALETTE_KEYWORDS),
    missingComponents: [],
    originalWords: words,
  }

  parsed.missingComponents = getMissingComponents(parsed, category)
  return parsed
}
