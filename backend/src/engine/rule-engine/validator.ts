// ─── Validator / Quality Scorer ────────────────────────────────────────────────
// Scores prompts 0–100 based on completeness and section presence.
// No AI — deterministic rule-based scoring.

import type { RuleEngineCategory } from "./types"

interface ScoreDetail {
  section: string
  present: boolean
  weight: number
}

const SECTION_WEIGHTS: Record<string, number> = {
  SUBJECT:      20,
  WARDROBE:     10,
  SETTING:      10,
  COMPOSITION:   8,
  LIGHTING:     12,
  CAMERA:       10,
  SKIN:          5,
  PALETTE:       5,
  REFS:          3,
  EXCLUDE:       3,
  "LOCKS - ORIENTATION": 5,
  "LOCKS - FRAMING":     5,
  "LOCKS - LIGHT":       4,
}

function detectSection(prompt: string, section: string): boolean {
  const lower = prompt.toLowerCase()
  const sec = section.toLowerCase()
  if (sec.startsWith("locks")) {
    return lower.includes(`**${sec}`)
  }
  return (
    lower.includes(`${sec}:`) ||
    lower.includes(`${sec} `) ||
    lower.includes(`${sec}\n`)
  )
}

export function scorePrompt(prompt: string, _category: RuleEngineCategory): number {
  let total = 0
  let earned = 0

  for (const [section, weight] of Object.entries(SECTION_WEIGHTS)) {
    total += weight
    if (detectSection(prompt, section)) earned += weight
  }

  // Bonus points: word count richness
  const wc = prompt.split(/\s+/).filter(Boolean).length
  if (wc > 200) earned += 3
  if (wc > 400) earned += 4

  const raw = Math.round((earned / (total + 7)) * 100)
  return Math.min(100, Math.max(0, raw))
}

export function getScoreDetails(prompt: string): ScoreDetail[] {
  return Object.entries(SECTION_WEIGHTS).map(([section, weight]) => ({
    section,
    present: detectSection(prompt, section),
    weight,
  }))
}

export function getMissingSections(prompt: string): string[] {
  return getScoreDetails(prompt)
    .filter(d => !d.present)
    .map(d => d.section)
}
