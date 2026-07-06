import { CategoryTemplate } from "../types"

export const SOCIAL_TEMPLATE: CategoryTemplate = {
  name: "Social Media",
  lockProfile: "social",
  defaultCamera: "chest-up",
  defaultLighting: "soft",
  hasHandLock: false,
  sections: [
    "SUBJECT", "WARDROBE", "SETTING", "COMPOSITION",
    "LIGHTING", "CAMERA", "PALETTE",
    "EXCLUDE", "LOCKS_ORIENTATION", "LOCKS_FRAMING", "LOCKS_LIGHT",
  ],
}

export function buildSocialComposition(platform: string = "instagram"): string {
  const ar = platform === "instagram" ? "1:1 square" : platform === "story" ? "9:16 vertical" : "4:5 portrait"
  return `COMPOSITION: ${ar} social media format, subject occupies 60-70% of frame, clean background or soft bokeh, strong visual hook in upper third, scroll-stopping visual weight, face clearly legible at thumbnail size`
}
