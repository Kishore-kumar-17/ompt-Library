import { VideoCategoryTemplate } from "../types.js"

export const PRODUCT_TEMPLATE: VideoCategoryTemplate = {
  name: "Product Showcase",
  defaultCameraMove: "orbit",
  defaultLighting: "studio soft",
  defaultDuration: "4-6s",
  sections: [
    "SUBJECT", "ROTATION", "SETTING", "CAMERA",
    "LIGHTING", "COLOR_GRADE", "EXCLUDE",
    "LOCKS_MOTION", "LOCKS_CAMERA", "LOCKS_TEMPORAL",
  ],
}

export function buildProductRotation(): string {
  return "ROTATION: product rotates smoothly on a fixed vertical axis at constant angular speed, one clean revolution across the clip, no wobble or axis drift"
}

// ─── LOCK generators (Product Showcase) ──────────────────────────────────────
// Product shots fail differently from character shots: the camera orbits a
// static hero object, so the locks that matter are rotation mechanics and
// hero-light consistency across the reveal — not human motion or identity.

export function buildMotionLock(motionSpeed: string, motionDirection: string): string {
  return `**LOCKS - MOTION:** product rotates at a ${motionSpeed}, ${motionDirection} continuous single-axis turn, mechanically constant angular velocity maintained throughout — no wobble, no axis precession, no speed ramping mid-turn.`
}

export function buildCameraLock(cameraMoveType: string, cameraStart: string, cameraEnd: string): string {
  return `**LOCKS - CAMERA:** single continuous ${cameraMoveType} around the product at a fixed radius and height, starting on ${cameraStart} and ending on ${cameraEnd} — camera never crosses the product's silhouette, no handheld micro-shake, no focal-length breathing.`
}

export function buildTemporalLock(beginState: string, endState: string): string {
  return `**LOCKS - TEMPORAL:** clip begins with ${beginState} and ends with ${endState} — hero key-light position and specular highlight stay fixed relative to the product throughout the rotation, no lighting flicker, no hot-spot drift, no exposure pumping.`
}

export function buildContinuityLock(identityAnchor: string): string {
  return `**LOCKS - CONTINUITY:** ${identityAnchor} keeps identical material, color, label placement and proportions across every frame of the reveal — no logo distortion, no geometry warp, no reflection popping between frames.`
}
