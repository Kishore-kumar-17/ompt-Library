import { CategoryTemplate } from "../types"

export const ART_TEMPLATE: CategoryTemplate = {
  name: "Artistic & Creative",
  lockProfile: "art",
  defaultCamera: "editorial",
  defaultLighting: "dramatic",
  hasHandLock: false,
  sections: [
    "SUBJECT", "MEDIUM", "COMPOSITION", "LIGHTING",
    "PALETTE", "STYLE", "REFS",
    "EXCLUDE", "LOCKS_ORIENTATION", "LOCKS_FRAMING", "LOCKS_LIGHT",
  ],
}

export function buildArtMedium(medium: string = "digital painting"): string {
  const mediumMap: Record<string, string> = {
    "oil painting":     "traditional oil on canvas, impasto texture, visible brushwork, layered glazes, rich colour depth, Old Masters technique",
    "watercolour":      "transparent watercolour, paper grain visible, soft wet-on-wet edges, luminous washes, delicate granulation",
    "digital painting": "professional digital painting, stylus precision, painterly texture overlay, high-resolution 300dpi output quality",
    "illustration":     "editorial illustration, clean vector-quality linework with painterly colour fill, contemporary graphic style",
    "charcoal":         "charcoal on textured paper, smudge blending, high contrast black-white tonal range, gestural expressive marks",
    "photography":      "fine art photography, large format quality, archival print aesthetic, tonal richness, gallery-exhibition standard",
  }
  return `MEDIUM: ${mediumMap[medium] ?? `${medium} medium, authentic rendering technique, appropriate texture and material quality`}`
}

export function buildArtRefs(style: string = "contemporary"): string {
  const refs: Record<string, string> = {
    "contemporary": "REFS: John Singer Sargent — gestural mastery, light and form. Kehinde Wiley — bold pattern, regal subjects. Cindy Sherman — conceptual narrative authority",
    "classical":    "REFS: Rembrandt van Rijn — chiaroscuro mastery. Vermeer — luminous interior light. Caravaggio — dramatic tenebrism",
    "surrealist":   "REFS: Salvador Dali — dreamscape precision. Magritte — paradoxical clarity. Francis Bacon — psychological distortion",
    "abstract":     "REFS: Mark Rothko — colour field emotion. Franz Kline — bold gestural black. Helen Frankenthaler — poured colour fields",
  }
  return refs[style] ?? refs["contemporary"]
}
