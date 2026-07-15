// ─── Narrative Video Formula Template ──────────────────────────────────────────
// Motion Formula v1.0 — character-driven shots. Holds the shared section
// builders and the four MOTION LOCKS reused across all video categories.

import { VideoCategoryTemplate } from "../types.js"

export const NARRATIVE_TEMPLATE: VideoCategoryTemplate = {
  name: "Narrative / Character",
  defaultCameraMove: "steadicam",
  defaultLighting: "practical interior",
  defaultDuration: "5-10s",
  sections: [
    "SUBJECT", "ACTION", "SETTING", "CAMERA",
    "LIGHTING", "COLOR_GRADE", "REFS", "EXCLUDE",
    "LOCKS_MOTION", "LOCKS_CAMERA", "LOCKS_TEMPORAL", "LOCKS_CONTINUITY",
  ],
}

// ─── Section builders (shared across all video categories) ───────────────────

export function buildSubjectSection(subject: string): string {
  return `SUBJECT: ${subject}`
}

export function buildActionSection(action: string): string {
  return `ACTION: ${action}`
}

export function buildSettingSection(setting: string): string {
  return `SETTING: ${setting}`
}

export function buildCameraSection(cameraMove: string): string {
  return `CAMERA: ${cameraMove}`
}

export function buildLightingSection(lighting: string): string {
  return `LIGHTING: ${lighting}`
}

export function buildColorGradeSection(grade: string): string {
  return `COLOR GRADE: ${grade}`
}

// Fixed per-category defaults (see dictionaries.ts CATEGORY_OUTPUT_DEFAULTS) —
// not keyword-detected from the idea like SUBJECT/CAMERA/LIGHTING above.

export function buildStyleSection(style: string): string {
  return `STYLE: ${style}`
}

export function buildQualityTagSection(qualityTag: string): string {
  return `QUALITY TAG: ${qualityTag}`
}

export function buildAudioSection(audio: string): string {
  return `AUDIO: ${audio}`
}

export function buildAspectRatioSection(aspectRatio: string): string {
  return `ASPECT RATIO: ${aspectRatio}`
}

export function buildDurationSection(duration: string): string {
  return `DURATION: ${duration}`
}

export function buildRefsSection(mood: string = "cinematic"): string {
  const refs: Record<string, string> = {
    "cinematic":   "REFS: Roger Deakins — naturalistic motivated light. Emmanuel Lubezki — continuous immersive camera movement. Greig Fraser — high-contrast atmospheric depth",
    "documentary": "REFS: handheld observational style, natural available light, unobtrusive camera presence, authentic unscripted feel",
    "commercial":  "REFS: clean confident camera moves, glossy controlled lighting, brand-forward polish, high production value",
    "dreamlike":   "REFS: Wong Kar-wai — saturated slow-motion intimacy. Terrence Malick — natural light, flowing camera, poetic pacing",
  }
  return refs[mood] ?? refs["cinematic"]
}

export function buildExcludeSection(negatives: string[]): string {
  return `EXCLUDE: ${negatives.join(" | ")}`
}

// ─── LOCK generators (Motion Formula v1.0) ────────────────────────────────────
// Video diffusion drifts over time, not within one frame — locks pin motion,
// camera arc, temporal structure, and subject identity across the whole clip.

export function buildMotionLock(motionSpeed: string, motionDirection: string): string {
  return `**LOCKS - MOTION:** subject moves at a ${motionSpeed}, travelling ${motionDirection}, constant speed maintained throughout — no unexplained acceleration, deceleration, or teleporting between frames.`
}

export function buildCameraLock(cameraMoveType: string, cameraStart: string, cameraEnd: string): string {
  return `**LOCKS - CAMERA:** single continuous ${cameraMoveType} move, starting on ${cameraStart} and ending on ${cameraEnd} — no cuts, no additional moves layered on top, no drift off the described path.`
}

export function buildTemporalLock(beginState: string, endState: string): string {
  return `**LOCKS - TEMPORAL:** clip begins with ${beginState} and ends with ${endState} — the action must resolve within the clip's duration, no abrupt mid-action cutoff, no looping back to the start state.`
}

export function buildContinuityLock(identityAnchor: string): string {
  return `**LOCKS - CONTINUITY:** ${identityAnchor} remains visually identical in every frame — same face, hairstyle, wardrobe, and proportions from first frame to last. No identity drift, no morphing, no wardrobe changes mid-clip.`
}
