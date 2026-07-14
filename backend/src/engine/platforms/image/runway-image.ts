import type { PlatformConfig } from "../../types.js";

export const runwayImageConfig: PlatformConfig = {
  id: "runway-image",
  name: "Runway (Image)",
  family: "image",
  wordBudget: { min: 100, max: 160 },
  compressionLevel: "standard",
  supportedTiers: ["PRODUCT", "PEOPLE", "ART"],
  parameterFlags: "",
  componentOrder: ["objective", "style", "technical", "negative"],
  requiredComponents: ["objective", "style", "negative"],
  structureRules: `Platform: Runway Image Generation
Word budget: 100-160 words. Cinematic language preferred.
Structure:
1. Scene description with cinematic framing language
2. Subject and environment details
3. Lighting and atmosphere
4. Color grade reference
5. Exclude list

Key rules:
- Runway is optimized for cinematic aesthetics — use film/director references
- Lighting: describe in cinematography terms (motivated light, practical source, etc.)
- Color: reference film grades or DPs (Roger Deakins color, Blade Runner 2049 palette)
- Keep descriptions visual and scene-based rather than technical camera specs`,
  systemPromptAddition: `You are generating for Runway Image. Use cinematic and film-language descriptors. Reference directors, DPs, or films for style. Describe lighting in cinematography terms. Color should reference film grades or specific films rather than hex codes.`,
};
