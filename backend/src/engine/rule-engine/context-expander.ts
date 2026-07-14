// ─── Context Expander ─────────────────────────────────────────────────────────
// Expands short terms to rich descriptions using dictionary lookup.
// No AI — pure table-driven substitution.

import {
  LIGHTING, CAMERA, SUBJECT_PEOPLE, SETTING,
  WARDROBE, HAND_POSITION, STYLE_PHOTO, PALETTE,
} from "./dictionaries"

function lookup(dict: Record<string, string>, term: string | null): string | null {
  if (!term) return null
  const lower = term.toLowerCase().trim()
  if (dict[lower]) return dict[lower]
  // Partial match
  for (const [key, val] of Object.entries(dict)) {
    if (lower.includes(key) || key.includes(lower)) return val
  }
  return term
}

export function expandLighting(term: string | null): string | null {
  return lookup(LIGHTING, term)
}

export function expandCamera(term: string | null): string | null {
  return lookup(CAMERA, term)
}

export function expandSubject(term: string | null): string | null {
  if (!term) return null
  const found = lookup(SUBJECT_PEOPLE, term)
  return found ?? term
}

export function expandSetting(term: string | null): string | null {
  return lookup(SETTING, term)
}

export function expandWardrobe(term: string | null): string | null {
  return lookup(WARDROBE, term)
}

export function expandHandPosition(term: string | null): string | null {
  return lookup(HAND_POSITION, term)
}

export function expandStyle(term: string | null): string | null {
  return lookup(STYLE_PHOTO, term)
}

export function expandPalette(term: string | null): string | null {
  return lookup(PALETTE, term)
}
