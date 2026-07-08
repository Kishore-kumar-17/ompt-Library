// ─── Text Sub-Mode Detector ─────────────────────────────────────────────────────
// Generic keyword-scoring helper used by category templates to pick a finer
// sub-mode from free task text (e.g. analysis: comparative/causal/evaluative).
// Same table-driven keyword-scoring approach as parser.ts's category detector,
// just parameterized so every category template can reuse one implementation.

export function detectMode<T extends string>(
  text: string,
  modeKeywords: Record<T, string[]>,
  fallback: T
): T {
  const lower = text.toLowerCase()
  let best: T = fallback
  let bestScore = 0
  for (const mode of Object.keys(modeKeywords) as T[]) {
    let score = 0
    for (const kw of modeKeywords[mode]) {
      if (lower.includes(kw)) score++
    }
    if (score > bestScore) {
      bestScore = score
      best = mode
    }
  }
  return best
}
