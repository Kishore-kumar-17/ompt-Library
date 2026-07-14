import type { PlatformConfig } from "../../types.js";

export const chatgptImageConfig: PlatformConfig = {
  id: "chatgpt",
  name: "ChatGPT Images",
  family: "image",
  wordBudget: { min: 200, max: 225 },
  compressionLevel: "standard",
  supportedTiers: ["PRODUCT", "PEOPLE", "ART"],
  parameterFlags: "",
  componentOrder: ["objective", "context", "technical", "style", "platform_params", "negative"],
  requiredComponents: ["objective", "technical", "negative"],
  structureRules: `Platform: ChatGPT (DALL-E / GPT-4o image gen)
Word budget: 200-225 words.
Structure (in order):
1. Shot type + campaign/scene line
2. Subject description — detailed: form factor, material, color, finish, props
3. Lock block (inline, bolded) — use "**LOCKS — GEOMETRY:**", "**ORIENTATION:**", "**FRAMING:**", "**LIGHT:**", "**MATERIAL:**" (or CLOTHING for people)
4. Camera rig — body, lens, aperture, shutter, ISO
5. Grade — LUT, film emulation, grain, EV
6. Palette — 3-5 named colors with hex codes and percentages
7. References — 3-4 photographer or campaign references
8. Exclude — comma-separated list

Lock block format:
**LOCKS — GEOMETRY:** <content>. **ORIENTATION:** <content>. **FRAMING:** <content>. **LIGHT:** <content>. **MATERIAL:** <content>.

For PEOPLE tier (no GEOMETRY/MATERIAL; CLOTHING added):
**LOCKS — ORIENTATION:** <content>. **FRAMING:** <content>. **LIGHT:** <content>. **CLOTHING:** <content>.

For ART tier:
**LOCKS — ORIENTATION:** <content>. **FRAMING:** <content>. **LIGHT:** <content>.`,
  systemPromptAddition: `You are generating for ChatGPT image generation. Use bolded inline lock blocks with "**LOCKS — GEOMETRY:**" format. Include full camera rig, grade, palette with named colors + hex codes + percentages, and photographer references.`,
};
