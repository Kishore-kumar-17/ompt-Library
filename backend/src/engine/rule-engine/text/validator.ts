// ─── Text Validator / Quality Scorer ────────────────────────────────────────────
// Scores prompts 0–100 based on completeness and section presence.
// No AI — deterministic rule-based scoring.

const SECTION_WEIGHTS: Record<string, number> = {
  ROLE:            10,
  TASK:            25,
  "AUDIENCE & TONE": 10,
  "OUTPUT FORMAT": 20,
  REASONING:        8,
  AVOID:            7,
  "LOCKS - SCOPE":  8,
  "LOCKS - FORMAT": 7,
  "LOCKS - DEPTH":  5,
}

function detectSection(prompt: string, section: string): boolean {
  const lower = prompt.toLowerCase()
  const sec = section.toLowerCase()
  if (sec.startsWith("locks")) return lower.includes(`**${sec}`)
  return lower.includes(`${sec}:`) || lower.includes(`${sec} `) || lower.includes(`${sec}\n`)
}

export function scoreTextPrompt(prompt: string): number {
  let total = 0
  let earned = 0
  for (const [section, weight] of Object.entries(SECTION_WEIGHTS)) {
    total += weight
    if (detectSection(prompt, section)) earned += weight
  }
  const wc = prompt.split(/\s+/).filter(Boolean).length
  if (wc > 40) earned += 3
  if (wc > 90) earned += 4
  const raw = Math.round((earned / (total + 7)) * 100)
  return Math.min(100, Math.max(0, raw))
}

export function getMissingTextSections(prompt: string): string[] {
  return Object.keys(SECTION_WEIGHTS).filter((section) => !detectSection(prompt, section))
}
