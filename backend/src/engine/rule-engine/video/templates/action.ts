import { VideoCategoryTemplate } from "../types.js"

export const ACTION_TEMPLATE: VideoCategoryTemplate = {
  name: "Action / Dynamic",
  defaultCameraMove: "handheld",
  defaultLighting: "harsh midday",
  defaultDuration: "3-6s",
  sections: [
    "SUBJECT", "ACTION", "INTENSITY", "SETTING", "CAMERA",
    "LIGHTING", "COLOR_GRADE", "EXCLUDE",
    "LOCKS_MOTION", "LOCKS_CAMERA", "LOCKS_TEMPORAL", "LOCKS_CONTINUITY",
  ],
}

export function buildActionIntensity(): string {
  return "INTENSITY: high-energy dynamic movement with believable momentum and follow-through, motion blur proportional to speed, no unnatural floating during fast motion"
}

// ─── LOCK generators (Action / Dynamic) ──────────────────────────────────────
// Fast motion fails on unnatural physics and blur that doesn't track true
// speed — locks target motion-blur/speed consistency, not static geometry.

export function buildMotionLock(motionSpeed: string, motionDirection: string): string {
  return `**LOCKS - MOTION:** subject moves at a ${motionSpeed}, ${motionDirection}, motion-blur intensity scales proportionally with true speed and stays consistent frame to frame — no unnatural deceleration, no teleporting between poses, no speed mismatched to the depicted effort.`
}

export function buildCameraLock(cameraMoveType: string, cameraStart: string, cameraEnd: string): string {
  return `**LOCKS - CAMERA:** single continuous ${cameraMoveType} matched to the subject's speed, starting on ${cameraStart} and ending on ${cameraEnd} — camera shake and motion blur remain proportional to actual subject velocity, no whip-cuts, no speed ramping independent of the action.`
}

export function buildTemporalLock(beginState: string, endState: string): string {
  return `**LOCKS - TEMPORAL:** clip begins with ${beginState} and ends with ${endState} — momentum and follow-through carry continuously through the action's resolution, no mid-action freeze, no rewind or loop-back to the start state.`
}

export function buildContinuityLock(identityAnchor: string): string {
  return `**LOCKS - CONTINUITY:** ${identityAnchor} keeps identical body proportions, wardrobe and gear through every high-speed frame — no limb merging, no duplicated limbs during rapid movement, no frame-rate stutter or judder.`
}
