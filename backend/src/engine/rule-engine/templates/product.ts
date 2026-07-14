import { CategoryTemplate } from "../types"

export const PRODUCT_TEMPLATE: CategoryTemplate = {
  name: "Product Photography",
  lockProfile: "product",
  defaultCamera: "product",
  defaultLighting: "flat",
  hasHandLock: false,
  sections: [
    "SUBJECT", "SETTING", "COMPOSITION", "LIGHTING",
    "CAMERA", "MATERIAL", "PALETTE", "REFS",
    "EXCLUDE", "LOCKS_ORIENTATION", "LOCKS_FRAMING", "LOCKS_LIGHT",
  ],
}

export function buildProductComposition(): string {
  return "COMPOSITION: studio product photography, subject centred on clean surface, camera perpendicular (copy-stand 90° overhead) or 3/4 angled view at 35°, product fills 70% of frame, precise front-surface sharpness, soft background gradation"
}

export function buildProductMaterial(material: string = ""): string {
  if (!material) return "MATERIAL: accurate surface material rendering — correct reflectivity, roughness, translucency as applicable to product type; no phantom reflections"
  return `MATERIAL: ${material} — accurate surface rendering, correct specularity and roughness, authentic material weight and depth`
}

export function buildProductRefs(): string {
  return "REFS: Nick Knight — luxury product precision. Tim Tadder — dramatic product lighting. Karl Taylor — clean commercial product mastery"
}
