// ─── Video Context Expander ────────────────────────────────────────────────────
// Expands short terms to rich cinematographic descriptions via dictionary lookup.
// No AI — pure table-driven substitution.

import { CAMERA_MOVE, LIGHTING_ATMOSPHERE, ACTION, ENVIRONMENT, COLOR_GRADE, SUBJECT, CAMERA_MOVE_NUMERICS, PLATFORM_FPS } from "./dictionaries.js"

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

export function expandSubject(term: string | null): string | null {
  return lookup(SUBJECT, term)
}

// Looks up numeric camera-move precision (focal length / degrees / travel)
// and combines it with the target platform's native frame rate, so the
// CAMERA lock carries real numeric precision rather than purely qualitative
// words like "slow" or "smooth".
export function getCameraNumericSpec(term: string | null, platform: string): string | null {
  const fps = PLATFORM_FPS[platform] ?? 24
  if (!term) return `${fps}fps`
  const lower = term.toLowerCase().trim()
  const key = CAMERA_MOVE_NUMERICS[lower]
    ? lower
    : Object.keys(CAMERA_MOVE_NUMERICS).find((k) => lower.includes(k) || k.includes(lower))
  const spec = key ? CAMERA_MOVE_NUMERICS[key] : undefined
  if (!spec) return `${fps}fps`
  const parts = [
    spec.focalLength,
    spec.degrees ? `${spec.degrees}° of movement` : null,
    spec.travel ?? null,
    `${fps}fps`,
  ]
  return parts.filter(Boolean).join(", ")
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
