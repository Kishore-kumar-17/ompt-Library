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
