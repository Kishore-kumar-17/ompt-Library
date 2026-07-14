import type { PlatformConfig } from "../../types.js";

export const geminiImageConfig: PlatformConfig = {
  id: "gemini",
  name: "Gemini",
  family: "image",
  wordBudget: { min: 155, max: 180 },
  compressionLevel: "minimal",
  supportedTiers: ["PRODUCT", "PEOPLE", "ART"],
  parameterFlags: "",
  componentOrder: ["objective", "context", "technical", "style", "negative"],
  requiredComponents: ["objective", "technical", "negative"],
  structureRules: `Platform: Gemini
Word budget: 155-180 words (compact but complete).
Structure:
1. Shot type + campaign line (shorter than ChatGPT)
2. Subject description — compressed: key material, color, label text, props in one paragraph
3. Lock block (inline, bolded — NO "LOCKS —" prefix)
4. Camera + grade — single compressed line
5. Palette — hex + percentages single line
6. References — short name list
7. Exclude — comma-separated

Lock format: **GEOMETRY:** <content>. **ORIENTATION:** <content>. **FRAMING:** <content>. **LIGHT:** <content>. **MATERIAL:** <content>.
Compression: Drop articles, compress camera to "Body Lens f/X 1/Xs ISO XX", grade to "LUT-name grain-N +/-EV".`,
  systemPromptAddition: `You are generating for Gemini. Use compact lock blocks WITHOUT the "LOCKS —" prefix. Drop articles. Compress camera + grade to a single line. Word budget is tight: 155-180 words maximum.`,
};
