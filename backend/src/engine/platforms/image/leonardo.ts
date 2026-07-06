import type { PlatformConfig } from "../../types.js";

export const leonardoConfig: PlatformConfig = {
  id: "leonardo",
  name: "Leonardo AI",
  family: "image",
  wordBudget: { min: 120, max: 180 },
  compressionLevel: "standard",
  supportedTiers: ["PRODUCT", "PEOPLE", "ART"],
  parameterFlags: "",
  componentOrder: ["objective", "context", "style", "technical", "negative"],
  requiredComponents: ["objective", "style", "negative"],
  structureRules: `Platform: Leonardo AI
Word budget: 120-180 words.
Structure:
1. Subject + action description
2. Visual style (photorealistic, painterly, concept art, etc.)
3. Lighting description
4. Color palette
5. Technical camera details (if photorealistic)
6. Negative prompt (comma-separated, critical for quality)

Key rules:
- Leonardo responds well to style keywords: "photorealistic", "hyperdetailed", "cinematic", "concept art"
- Lighting descriptors are very effective: "golden hour", "studio lighting", "dramatic rim light"
- Negative prompts are important — always include: "blurry, deformed, ugly, watermark, text"
- Specify model-appropriate styles for best results`,
  systemPromptAddition: `You are generating for Leonardo AI. Include clear style keywords (photorealistic, cinematic, concept art, etc.). Emphasize lighting quality. Always include a strong negative prompt. Leonardo responds well to explicit quality descriptors.`,
};
