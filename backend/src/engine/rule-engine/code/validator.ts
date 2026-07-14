// ─── Code Validator / Quality Scorer ────────────────────────────────────────────
// Scores prompts 0–100 based on completeness and section presence, weighted by
// what each category actually needs. A "review" prompt has no CONVENTIONS
// section or LOCKS - CONVENTION lock the way a bugfix/refactor prompt does —
// scoring it against the full section set every other category needs would
// structurally cap it below 100 regardless of how good it actually is, so the
// weights (and which sections even apply) are category-specific.

import type { CodeCategory } from "./types.js"

const BASE_WEIGHTS: Record<string, number> = {
  TASK:            25,
  "TECH STACK":    12,
  "OUTPUT FORMAT": 18,
  AVOID:            7,
  "LOCKS - BOUNDARY":   10,
  "LOCKS - ACCEPTANCE": 10,
}

// Every category has exactly one of these category-specific "extra" sections
// (REPRO / ACCEPTANCE CRITERIA / NON-GOALS / FOCUS AREAS / COVERAGE TARGET).
const CATEGORY_EXTRA_SECTION: Record<CodeCategory, string> = {
  bugfix:   "REPRO",
  feature:  "ACCEPTANCE CRITERIA",
  refactor: "NON-GOALS",
  review:   "FOCUS AREAS",
  test:     "COVERAGE TARGET",
}

// Categories that don't use a CONVENTIONS section / LOCKS - CONVENTION lock —
// "review" produces findings about someone else's code, not new conforming
// code, so there's nothing to "match existing conventions" against.
const CATEGORIES_WITHOUT_CONVENTION = new Set<CodeCategory>(["review"])

function getSectionWeights(category?: CodeCategory): Record<string, number> {
  const weights: Record<string, number> = { ...BASE_WEIGHTS }
  weights[CATEGORY_EXTRA_SECTION[category ?? "feature"]] = 12

  if (!category || !CATEGORIES_WITHOUT_CONVENTION.has(category)) {
    weights.CONVENTIONS = 8
    weights["LOCKS - CONVENTION"] = 5
  }
  return weights
}

function detectSection(prompt: string, section: string): boolean {
  const lower = prompt.toLowerCase()
  const sec = section.toLowerCase()
  if (sec.startsWith("locks")) return lower.includes(`**${sec}`)
  return lower.includes(`${sec}:`) || lower.includes(`${sec} `) || lower.includes(`${sec}\n`)
}

export function scoreCodePrompt(prompt: string, category?: CodeCategory): number {
  const weights = getSectionWeights(category)
  let total = 0
  let earned = 0
  for (const [section, weight] of Object.entries(weights)) {
    total += weight
    if (detectSection(prompt, section)) earned += weight
  }
  const wc = prompt.split(/\s+/).filter(Boolean).length
  if (wc > 40) earned += 3
  if (wc > 90) earned += 4
  const raw = Math.round((earned / (total + 7)) * 100)
  return Math.min(100, Math.max(0, raw))
}

export function getMissingCodeSections(prompt: string, category?: CodeCategory): string[] {
  const weights = getSectionWeights(category)
  return Object.keys(weights).filter((section) => !detectSection(prompt, section))
}
