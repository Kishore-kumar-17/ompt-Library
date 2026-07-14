import { CategoryTemplate } from "../types"

export const FASHION_TEMPLATE: CategoryTemplate = {
  name: "Fashion & Editorial",
  lockProfile: "fashion",
  defaultCamera: "fashion",
  defaultLighting: "studio",
  hasHandLock: true,
  sections: [
    "SUBJECT", "WARDROBE", "SETTING", "COMPOSITION",
    "LIGHTING", "CAMERA", "SKIN", "PALETTE", "REFS",
    "EXCLUDE", "LOCKS_ORIENTATION", "LOCKS_FRAMING", "LOCKS_LIGHT", "LOCKS_HAND",
  ],
}

export function buildFashionComposition(framing: string = "full-length"): string {
  return `COMPOSITION: editorial fashion ${framing} framing, strong vertical composition, garment silhouette at full clarity, dynamic but controlled pose, balanced white space on both sides of subject, 2:3 vertical canvas ratio`
}

export function buildFashionRefs(): string {
  return "REFS: Steven Meisel — editorial precision, narrative control. Tim Walker — theatrical richness. Craig McDean — raw textural authenticity. Solve Sundsbo — graphic perfection, clean bold lines"
}
