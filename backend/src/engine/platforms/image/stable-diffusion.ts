import type { PlatformConfig } from "../../types.js";

export const stableDiffusionConfig: PlatformConfig = {
  id: "stable-diffusion",
  name: "Stable Diffusion",
  family: "image",
  wordBudget: { min: 75, max: 150 },
  compressionLevel: "minimal",
  supportedTiers: ["PRODUCT", "PEOPLE", "ART"],
  parameterFlags: "",
  componentOrder: ["objective", "style", "technical", "negative"],
  requiredComponents: ["objective", "negative"],
  structureRules: `Platform: Stable Diffusion
Word budget: 75-150 words. Keyword-weighted style.
Structure:
1. Subject description (noun-first, comma-separated keywords)
2. Style tokens (photorealistic, 8k, masterpiece, best quality)
3. Lighting tokens (studio lighting, dramatic, cinematic)
4. Artist/style references (if relevant)
5. Technical quality boosters
6. Negative prompt (CRITICAL — separate section after --)

Key rules:
- Token weight matters: list most important keywords first
- Quality boosters: "masterpiece, best quality, highly detailed, sharp focus"
- Negative section (after --): "blurry, deformed, ugly, bad anatomy, watermark, low quality"
- Comma separation over prose
- Parentheses for emphasis: (beautiful face:1.2)`,
  systemPromptAddition: `You are generating for Stable Diffusion. Use comma-separated keyword tokens rather than prose sentences. Put quality boosters early. List the negative prompt as a separate comma-separated list. Token order matters — most important concepts first.`,
};
