// ─── People & Portraits Formula Template ──────────────────────────────────────
// Formula v4.2 — 13 ordered sections including explicit hand-position lock.
// CRITICAL: Hand locks specify TROUSER vs JACKET pocket explicitly to prevent
// model misinterpretation (Gemini/ChatGPT render these differently without it).

import { CategoryTemplate } from "../types"

export const PEOPLE_TEMPLATE: CategoryTemplate = {
  name: "People & Portraits",
  lockProfile: "people",
  defaultCamera: "portrait",
  defaultLighting: "studio",
  hasHandLock: true,
  sections: [
    "SUBJECT",
    "WARDROBE",
    "SETTING",
    "COMPOSITION",
    "LIGHTING",
    "CAMERA",
    "SKIN",
    "PALETTE",
    "REFS",
    "EXCLUDE",
    "LOCKS_ORIENTATION",
    "LOCKS_FRAMING",
    "LOCKS_LIGHT",
    "LOCKS_HAND",
  ],
}

// ─── Section assembly functions ───────────────────────────────────────────────

export function buildSubjectSection(subject: string): string {
  return `SUBJECT: ${subject}`
}

export function buildWardrobeSection(wardrobe: string): string {
  return `WARDROBE: ${wardrobe}`
}

export function buildSettingSection(setting: string): string {
  return `SETTING: ${setting}`
}

export function buildCompositionSection(framing: string = "chest-up"): string {
  const framingMap: Record<string, string> = {
    "chest-up":           "chest-and-above framing, subject centred horizontally, eyes at upper 40% of frame, 55mm-equivalent perspective, slight camera-right angle, rule-of-thirds vertical alignment",
    "head-and-shoulders": "tight head-and-shoulders portrait crop, face fills 50% of frame, eyes at upper third, shoulders angled 15° from camera, shallow depth of field",
    "full-length":        "head-to-toe full-length framing, subject centred, environment provides context in background, balanced negative space left and right",
    "environmental":      "environmental portrait, subject occupies 40% of frame, setting provides narrative context, foreground/background depth layers, 35mm perspective",
    "fashion":            "editorial fashion framing, 2:3 vertical, full figure or 3/4 length, balanced white space, strong vertical lines aligned with subject posture",
  }
  return `COMPOSITION: ${framingMap[framing] ?? framingMap["chest-up"]}`
}

export function buildLightingSection(lighting: string): string {
  return `LIGHTING: ${lighting}`
}

export function buildCameraSection(camera: string): string {
  return `CAMERA: ${camera}`
}

export function buildSkinSection(): string {
  return "SKIN: true-to-life skin texture — visible pore structure, natural subsurface scattering, subtle blemish presence (authentic, not retouched), healthy undertone, natural skin gloss at 15-20%, no plastic smoothing or AI smoothing artifacts"
}

export function buildPaletteSection(palette: string): string {
  return `PALETTE: ${palette}`
}

export function buildRefsSection(style: string = "editorial"): string {
  const refs: Record<string, string> = {
    "editorial":    "REFS: Platon portrait series — direct gaze, simple backdrop, psychological depth. Annie Leibovitz — authentic character storytelling. Rankin — textural realism, graphic composition",
    "fashion":      "REFS: Steven Meisel — editorial perfection, fashion narrative authority. Helmut Newton — bold contrast, power stance. Peter Lindbergh — natural beauty, cinematic depth",
    "documentary":  "REFS: Steve McCurry — intimate cultural storytelling. Sebastião Salgado — dramatic human conditions. Mary Ellen Mark — gritty authentic narrative",
    "commercial":   "REFS: Chase Jarvis — brand-forward lifestyle authenticity. Nadav Kander — clean sophisticated commercial portraiture. Rich Brilliant Willing — architectural clean-line aesthetics",
    "fine art":     "REFS: Gregory Crewdson — cinematic narrative still life. Cindy Sherman — conceptual self-portraiture. Sally Mann — intimate atmospheric authenticity",
  }
  return refs[style] ?? refs["editorial"]
}

export function buildExcludeSection(negatives: string[]): string {
  return `EXCLUDE: ${negatives.join(" | ")}`
}

// ─── LOCK generators (Pro Formula v4.2) ──────────────────────────────────────

export function buildOrientationLock(
  facingAngle: number,
  headAngle: number,
  symmetry: number,
  repeatedDetails: number = 0,
  verticalAngle: number = 88
): string {
  const dir = facingAngle > 0 ? "camera-right" : facingAngle < 0 ? "camera-left" : "straight-to-camera"
  return `**LOCKS - ORIENTATION:** primary subject facing ${Math.abs(facingAngle)}deg ${dir} with head angle ${headAngle}deg, symmetry held within ${symmetry}%, ${repeatedDetails} repeated details, central element vertical at ${verticalAngle}deg.`
}

export function buildFramingLock(
  primaryX: number,
  primaryY: number,
  border: number,
  negativeSpace: number,
  ar: string
): string {
  const sec2X = parseFloat((1 - primaryX).toFixed(2))
  const sec2Y = parseFloat((primaryY + 0.12).toFixed(2))
  return `**LOCKS - FRAMING:** orthographic gallery view, camera perpendicular to image plane at 0deg, primary element at (x=${primaryX}, y=${primaryY}), secondary element at (x=${sec2X}, y=${sec2Y}), border ${border}% even rule, negative space ${negativeSpace}%, canvas AR ${ar}.`
}

export function buildLightLock(
  colorTemp: number,
  lightAltitude: number,
  lightAzimuth: number,
  shadowFeather: number,
  contrast: string,
  specular: number
): string {
  return `**LOCKS - LIGHT:** archival soft source ${colorTemp}K altitude ${lightAltitude}deg/azimuth ${lightAzimuth}deg, chiaroscuro controlled, shadow feather ${shadowFeather}%, contrast ${contrast}, specular highlight restrained at ${specular}%.`
}

export function buildHandLock(handPosition: string | null): string | null {
  if (!handPosition) return null
  return `**LOCKS - HAND POSITION:** ${handPosition} — ENFORCE LITERALLY: do not substitute jacket pocket for trouser pocket or vice versa. Count EXACTLY five fingers per hand. No floating arms. Natural gravity-driven arm angle.`
}
