// ─── Video Lock Generator ───────────────────────────────────────────────────────
// Generates Motion Formula v1.0 LOCK blocks. No AI — deterministic output from
// category defaults + overrides.

import type { VideoLockValues, VideoCategory } from "./types.js"
import { CATEGORY_DEFAULTS } from "./dictionaries.js"
import { buildMotionLock, buildCameraLock, buildTemporalLock, buildContinuityLock } from "./templates/narrative.js"

export function generateVideoLocks(
  category: VideoCategory,
  subject: string,
  overrides: Partial<VideoLockValues> = {}
): { motion: string; camera: string; temporal: string; continuity: string } {
  const d = CATEGORY_DEFAULTS[category] ?? CATEGORY_DEFAULTS.narrative

  const v: VideoLockValues = {
    motionSpeed:     overrides.motionSpeed     ?? d.motionSpeed,
    motionDirection: overrides.motionDirection ?? d.motionDirection,
    cameraMoveType:  overrides.cameraMoveType  ?? d.cameraMove,
    cameraStart:     overrides.cameraStart     ?? "the establishing framing",
    cameraEnd:       overrides.cameraEnd       ?? "the resolved final framing",
    beginState:      overrides.beginState      ?? `${subject} at rest`,
    endState:        overrides.endState        ?? `${subject} having completed the described action`,
    identityAnchor:  overrides.identityAnchor  ?? subject,
  }

  return {
    motion:     buildMotionLock(v.motionSpeed, v.motionDirection),
    camera:     buildCameraLock(v.cameraMoveType, v.cameraStart, v.cameraEnd),
    temporal:   buildTemporalLock(v.beginState, v.endState),
    continuity: buildContinuityLock(v.identityAnchor),
  }
}
