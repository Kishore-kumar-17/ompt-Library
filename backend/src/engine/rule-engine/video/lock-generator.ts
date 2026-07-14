// ─── Video Lock Generator ───────────────────────────────────────────────────────
// Generates Motion Formula v1.0 LOCK blocks. No AI — deterministic output from
// category defaults + overrides. Each category dispatches to its own lock
// builders (narrative/product/nature/action/abstract) since the failure modes
// that matter differ by category — a product reveal fails on hero-light
// drift, a landscape shot fails on weather continuity, a fight scene fails on
// motion-blur/speed mismatch, and so on.

import type { VideoLockValues, VideoCategory } from "./types.js"
import { CATEGORY_DEFAULTS } from "./dictionaries.js"
import * as narrative from "./templates/narrative.js"
import * as product from "./templates/product.js"
import * as nature from "./templates/nature.js"
import * as action from "./templates/action.js"
import * as abstract from "./templates/abstract.js"

type LockBuilderSet = {
  buildMotionLock: (motionSpeed: string, motionDirection: string) => string
  buildCameraLock: (cameraMoveType: string, cameraStart: string, cameraEnd: string) => string
  buildTemporalLock: (beginState: string, endState: string) => string
  buildContinuityLock: (identityAnchor: string) => string
}

const LOCK_BUILDERS: Record<VideoCategory, LockBuilderSet> = {
  narrative: narrative,
  product,
  nature,
  action,
  abstract,
}

// ─── cameraStart / cameraEnd derivation ──────────────────────────────────────
// Previously these were static placeholders ("the establishing framing" /
// "the resolved final framing") regardless of what was actually requested.
// Derive them instead from the real setting/action/cameraMove so the CAMERA
// lock describes this clip's actual opening and closing framing.

function firstPhrase(text: string | null | undefined, maxWords = 8): string | null {
  if (!text) return null
  const clause = text.split(/[,.\n]/)[0].trim()
  if (!clause) return null
  const words = clause.split(/\s+/).filter(Boolean).slice(0, maxWords)
  return words.length ? words.join(" ") : null
}

function deriveCameraStart(subject: string, setting?: string | null, cameraMove?: string | null): string {
  const settingPhrase = firstPhrase(setting, 6)
  const move = (cameraMove ?? "").toLowerCase()
  if (/orbit|arc/.test(move)) {
    return `${subject} centered in frame at the orbit's starting angle${settingPhrase ? `, within ${settingPhrase}` : ""}`
  }
  if (/dolly out|pull out|crane up/.test(move)) {
    return `a tight opening frame on ${subject}${settingPhrase ? ` within ${settingPhrase}` : ""}`
  }
  return settingPhrase
    ? `a wide establishing view of ${settingPhrase} with ${subject} positioned in frame`
    : `a wide establishing view of ${subject}`
}

function deriveCameraEnd(subject: string, action?: string | null, cameraMove?: string | null): string {
  const actionPhrase = firstPhrase(action, 8)
  const move = (cameraMove ?? "").toLowerCase()
  if (/dolly in|push in/.test(move)) {
    return actionPhrase
      ? `a tight resolved framing on ${subject} as ${actionPhrase} completes`
      : `a tight resolved framing on ${subject}`
  }
  if (/dolly out|pull out|crane up/.test(move)) {
    return `a wide resolved framing revealing the full scene around ${subject}`
  }
  if (/orbit|arc/.test(move)) {
    return `${subject} centered in frame back at the orbit's starting angle, revolution complete`
  }
  return actionPhrase
    ? `${subject} settled in its resolved framing after ${actionPhrase}`
    : `${subject} in its resolved final framing`
}

export function generateVideoLocks(
  category: VideoCategory,
  subject: string,
  context: { action?: string | null; setting?: string | null; cameraMove?: string | null } = {},
  overrides: Partial<VideoLockValues> = {}
): { motion: string; camera: string; temporal: string; continuity: string } {
  const d = CATEGORY_DEFAULTS[category] ?? CATEGORY_DEFAULTS.narrative
  const resolvedCameraMove = context.cameraMove ?? d.cameraMove

  const v: VideoLockValues = {
    motionSpeed:     overrides.motionSpeed     ?? d.motionSpeed,
    motionDirection: overrides.motionDirection ?? d.motionDirection,
    cameraMoveType:  overrides.cameraMoveType  ?? d.cameraMove,
    cameraStart:     overrides.cameraStart     ?? deriveCameraStart(subject, context.setting, resolvedCameraMove),
    cameraEnd:       overrides.cameraEnd       ?? deriveCameraEnd(subject, context.action, resolvedCameraMove),
    beginState:      overrides.beginState      ?? `${subject} at rest`,
    endState:        overrides.endState        ?? `${subject} having completed the described action`,
    identityAnchor:  overrides.identityAnchor  ?? subject,
  }

  const builders = LOCK_BUILDERS[category] ?? LOCK_BUILDERS.narrative

  return {
    motion:     builders.buildMotionLock(v.motionSpeed, v.motionDirection),
    camera:     builders.buildCameraLock(v.cameraMoveType, v.cameraStart, v.cameraEnd),
    temporal:   builders.buildTemporalLock(v.beginState, v.endState),
    continuity: builders.buildContinuityLock(v.identityAnchor),
  }
}
