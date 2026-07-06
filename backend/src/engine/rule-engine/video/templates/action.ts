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
