// ─── Video Context Expander ────────────────────────────────────────────────────
// Expands short terms to rich cinematographic descriptions via dictionary lookup.
// No AI — pure table-driven substitution.

import { CAMERA_MOVE, LIGHTING_ATMOSPHERE, ACTION, ENVIRONMENT, COLOR_GRADE } from "./dictionaries.js"

function lookup(dict: Record<string, string>, term: string | null): string | null {
  if (!term) return null
  const lower = term.toLowerCase().trim()
  if (dict[lower]) return dict[lower]
  for (const [key, val] of Object.entries(dict)) {
    if (lower.includes(key) || key.includes(lower)) return val
  }
  return term
}

export function expandCameraMove(term: string | null): string | null {
  return lookup(CAMERA_MOVE, term)
}

export function expandLighting(term: string | null): string | null {
  return lookup(LIGHTING_ATMOSPHERE, term)
}

export function expandAction(term: string | null): string | null {
  return lookup(ACTION, term)
}

export function expandSetting(term: string | null): string | null {
  return lookup(ENVIRONMENT, term)
}

export function expandColorGrade(term: string | null): string | null {
  return lookup(COLOR_GRADE, term)
}
