import { VideoCategoryTemplate } from "../types.js"

export const ABSTRACT_TEMPLATE: VideoCategoryTemplate = {
  name: "Abstract / Motion Graphics",
  defaultCameraMove: "static",
  defaultLighting: "studio soft",
  defaultDuration: "4-8s",
  sections: [
    "SUBJECT", "TRANSFORM", "CAMERA",
    "LIGHTING", "COLOR_GRADE", "EXCLUDE",
    "LOCKS_MOTION", "LOCKS_TEMPORAL",
  ],
}

export function buildAbstractTransform(): string {
  return "TRANSFORM: continuous, mathematically smooth transformation from the start form to the end form — no sudden jumps in scale, topology, or color"
}

// ─── LOCK generators (Abstract / Motion Graphics) ────────────────────────────
// Abstract clips fail on shape-morph discontinuities and unmotivated
// transitions, not on human identity or physical camera/subject motion.

export function buildMotionLock(motionSpeed: string, motionDirection: string): string {
  return `**LOCKS - MOTION:** form transforms at a ${motionSpeed}, ${motionDirection} morph, transformation speed held constant across the clip — no sudden topology jumps, no scale pops, no discontinuities in the morph path.`
}

export function buildCameraLock(cameraMoveType: string, cameraStart: string, cameraEnd: string): string {
  return `**LOCKS - CAMERA:** single continuous ${cameraMoveType} relative to the transforming form, starting framed on ${cameraStart} and ending on ${cameraEnd} — no cuts mid-transition, camera path stays smooth and unbroken through the morph.`
}

export function buildTemporalLock(beginState: string, endState: string): string {
  return `**LOCKS - TEMPORAL:** clip begins with ${beginState} and ends with ${endState} — the transformation resolves smoothly within the clip's duration, no abrupt mid-morph cutoff, no snapping back to the start form.`
}

export function buildContinuityLock(identityAnchor: string): string {
  return `**LOCKS - CONTINUITY:** ${identityAnchor} — color palette, material quality and overall stylistic language remain consistent throughout the transformation, no unmotivated palette shifts, no texture popping between frames.`
}
