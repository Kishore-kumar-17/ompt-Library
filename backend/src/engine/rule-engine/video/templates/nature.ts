import { VideoCategoryTemplate } from "../types.js"

export const NATURE_TEMPLATE: VideoCategoryTemplate = {
  name: "Nature / Landscape",
  defaultCameraMove: "pan",
  defaultLighting: "golden hour",
  defaultDuration: "6-12s",
  sections: [
    "SUBJECT", "ATMOSPHERE", "SETTING", "CAMERA",
    "LIGHTING", "COLOR_GRADE", "EXCLUDE",
    "LOCKS_MOTION", "LOCKS_CAMERA", "LOCKS_TEMPORAL",
  ],
}

export function buildNatureAtmosphere(): string {
  return "ATMOSPHERE: natural ambient motion only — wind-driven foliage, water surface movement, drifting clouds — no artificial or accelerated time-lapse motion unless explicitly requested"
}

// ─── LOCK generators (Nature / Landscape) ────────────────────────────────────
// Landscape shots fail on weather/time-of-day drift and looping ambient
// motion, not on human identity or product geometry — locks target those.

export function buildMotionLock(motionSpeed: string, motionDirection: string): string {
  return `**LOCKS - MOTION:** environment moves at a ${motionSpeed}, ${motionDirection} across the frame — wind, water and cloud motion stay physically consistent in speed and direction across the whole clip, no sudden gusts, stillness changes, or looping motion cycles.`
}

export function buildCameraLock(cameraMoveType: string, cameraStart: string, cameraEnd: string): string {
  return `**LOCKS - CAMERA:** single continuous ${cameraMoveType} across the landscape, starting on ${cameraStart} and settling on ${cameraEnd} — no whip pans, no speed ramping, camera path stays smooth and level throughout.`
}

export function buildTemporalLock(beginState: string, endState: string): string {
  return `**LOCKS - TEMPORAL:** clip begins with ${beginState} and ends with ${endState} — time-of-day and weather condition remain internally consistent for the clip's duration, no unmotivated lighting jumps, no cloud teleportation, no impossible weather transitions.`
}

export function buildContinuityLock(identityAnchor: string): string {
  return `**LOCKS - CONTINUITY:** ${identityAnchor} — key natural landmarks retain identical position, scale and form from first frame to last, no terrain morphing, no duplicated or looping foliage/water tiles.`
}
