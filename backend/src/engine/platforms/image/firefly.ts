import type { PlatformConfig } from "../../types.js";

export const fireflyConfig: PlatformConfig = {
  id: "firefly",
  name: "Adobe Firefly",
  family: "image",
  wordBudget: { min: 155, max: 180 },
  compressionLevel: "minimal",
  supportedTiers: ["PRODUCT", "PEOPLE", "ART"],
  parameterFlags: "",
  componentOrder: ["objective", "context", "technical", "style", "negative"],
  requiredComponents: ["objective", "technical", "negative"],
  structureRules: `Platform: Adobe Firefly
Word budget: 155-180 words (compact, commercially-safe).
Structure:
1. "editorial [shot type] [AR]" opener to signal commercial intent
2. Subject description — material, color, finish, label text, key props
3. Lock block (inline, bolded — no "LOCKS —" prefix)
4. Camera + grade — single compressed line (drop "tethered", "focus-stacked")
5. Palette — hex + percentage
6. References — surname-only for photographers, full brand name for campaigns
7. Exclude — comma-separated

Lock format: **GEOMETRY:** <content>. **ORIENTATION:** <content>. **FRAMING:** <content>. **LIGHT:** <content>. **MATERIAL:** <content>.`,
  systemPromptAddition: `You are generating for Adobe Firefly. Start with "editorial [shot type] [AR]" to signal commercial intent. Use compact lock blocks without the "LOCKS —" prefix. Drop "tethered" and "focus-stacked" from camera rig. Use surname-only for photographer references. Compress camera + grade to one line.`,
};
