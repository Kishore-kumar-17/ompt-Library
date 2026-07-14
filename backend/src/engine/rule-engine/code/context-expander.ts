// ─── Code Context Expander ──────────────────────────────────────────────────────
// Expands short terms to rich engineering-spec descriptions via dictionary
// lookup. No AI — pure table-driven substitution.

import { TECH_STACK, CODE_OUTPUT_FORMAT, CONVENTION } from "./dictionaries.js"

function lookup(dict: Record<string, string>, term: string | null): string | null {
  if (!term) return null
  const lower = term.toLowerCase().trim()
  if (dict[lower]) return dict[lower]
  for (const [key, val] of Object.entries(dict)) {
    if (lower.includes(key) || key.includes(lower)) return val
  }
  return term
}

export function expandTechStack(term: string | null): string | null {
  return lookup(TECH_STACK, term)
}

export function expandCodeOutputFormat(term: string | null): string | null {
  return lookup(CODE_OUTPUT_FORMAT, term)
}

export function expandConvention(term: string | null): string | null {
  return lookup(CONVENTION, term)
}
