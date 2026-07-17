// ─── Video Validator / Quality Scorer ──────────────────────────────────────────
// Scores prompts 0–100 based on completeness and section presence.
// No AI — deterministic rule-based scoring.

const SECTION_WEIGHTS: Record<string, number> = {
  SUBJECT:       20,
  ACTION:        15,
  SETTING:       10,
  CAMERA:        15,
  LIGHTING:      10,
  "COLOR GRADE":  5,
  STYLE:          3,
  "QUALITY TAG":  3,
  AUDIO:          3,
  "ASPECT RATIO": 2,
  DURATION:       2,
  EXCLUDE:        5,
  "LOCKS - MOTION":     6,
  "LOCKS - CAMERA":     6,
  "LOCKS - TEMPORAL":   4,
  "LOCKS - CONTINUITY": 4,
}

function detectSection(prompt: string, section: string): boolean {
  const lower = prompt.toLowerCase()
  const sec = section.toLowerCase()
  if (sec.startsWith("locks")) return lower.includes(`**${sec}`)
  return lower.includes(`${sec}:`) || lower.includes(`${sec} `) || lower.includes(`${sec}\n`)
}

export function scoreVideoPrompt(prompt: string): number {
  let total = 0
  let earned = 0
  for (const [section, weight] of Object.entries(SECTION_WEIGHTS)) {
    total += weight
    if (detectSection(prompt, section)) earned += weight
  }
  const wc = prompt.split(/\s+/).filter(Boolean).length
  if (wc > 60) earned += 3
  if (wc > 120) earned += 4
  const raw = Math.round((earned / (total + 7)) * 100)
  return Math.min(100, Math.max(0, raw))
}

export function getMissingVideoSections(prompt: string): string[] {
  return Object.keys(SECTION_WEIGHTS).filter((section) => !detectSection(prompt, section))
}
