// ─── Text Context Expander ──────────────────────────────────────────────────────
// Expands short terms to rich instruction-engineering descriptions via
// dictionary lookup. No AI — pure table-driven substitution.

import { ROLE_PERSONA, OUTPUT_FORMAT, TONE, REASONING_DEPTH, AUDIENCE } from "./dictionaries.js"

function lookup(dict: Record<string, string>, term: string | null): string | null {
  if (!term) return null
  const lower = term.toLowerCase().trim()
  if (dict[lower]) return dict[lower]
  for (const [key, val] of Object.entries(dict)) {
    if (lower.includes(key) || key.includes(lower)) return val
  }
  return term
}

export function expandRole(term: string | null): string | null {
  return lookup(ROLE_PERSONA, term)
}

export function expandOutputFormat(term: string | null): string | null {
  return lookup(OUTPUT_FORMAT, term)
}

export function expandTone(term: string | null): string | null {
  return lookup(TONE, term)
}

export function expandReasoningDepth(term: string | null): string | null {
  return lookup(REASONING_DEPTH, term)
}

export function expandAudience(term: string | null): string | null {
  return lookup(AUDIENCE, term)
}
