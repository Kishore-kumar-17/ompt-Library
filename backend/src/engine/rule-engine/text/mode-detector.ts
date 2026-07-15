// ─── Text Sub-Mode Detector ─────────────────────────────────────────────────────
// Generic keyword-scoring helper used by category templates to pick a finer
// sub-mode from free task text (e.g. analysis: comparative/causal/evaluative).
// Same word-boundary keyword-scoring approach as detectCategoryByScore, just
// parameterized so every category template can reuse one implementation.

import { detectCategoryByScore } from "../keyword-utils.js"

export function detectMode<T extends string>(
  text: string,
  modeKeywords: Record<T, string[]>,
  fallback: T
): T {
  return detectCategoryByScore(text, modeKeywords, fallback)
}
