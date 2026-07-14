import type { PlatformConfig } from "../../types.js";

export const ideogramConfig: PlatformConfig = {
  id: "ideogram",
  name: "Ideogram",
  family: "image",
  wordBudget: { min: 100, max: 150 },
  compressionLevel: "minimal",
  supportedTiers: ["PRODUCT", "PEOPLE", "ART"],
  parameterFlags: "",
  componentOrder: ["objective", "context", "style", "technical", "negative"],
  requiredComponents: ["objective", "negative"],
  structureRules: `Platform: Ideogram
Word budget: 100-150 words. Ideogram excels at text rendering and typography.
Structure:
1. Subject description with emphasis on any text/typography elements (quote text in quotes)
2. Visual style and color palette description
3. Lighting and atmosphere
4. Composition and framing
5. Exclude list

Key rules:
- Put any text to be rendered in "quotes" in the prompt
- Specify font style if important: serif, sans-serif, handwritten, etc.
- Ideogram handles typography better than any other platform — leverage this
- Palette: describe color relationships, not just individual colors
- Keep sentences short and declarative`,
  systemPromptAddition: `You are generating for Ideogram, which excels at text rendering and typography. If the prompt involves any text or typography, place quoted text in the prompt and specify font style. Keep descriptions concise and declarative. Emphasize color palette relationships.`,
};
