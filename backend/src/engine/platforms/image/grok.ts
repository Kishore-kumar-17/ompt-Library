import type { PlatformConfig } from "../../types.js";

export const grokImageConfig: PlatformConfig = {
  id: "grok",
  name: "Grok",
  family: "image",
  wordBudget: { min: 140, max: 165 },
  compressionLevel: "minimal",
  supportedTiers: ["PRODUCT", "PEOPLE", "ART"],
  parameterFlags: "",
  componentOrder: ["objective", "context", "technical", "negative"],
  requiredComponents: ["objective", "technical", "negative"],
  structureRules: `Platform: Grok
Word budget: 140-165 words (tightest compression).
Structure:
1. Single compact shot type + campaign line
2. Subject description — essential identifiers only, no explanatory phrases
3. Lock block (inline, bolded) — maximally compressed values
4. Camera + grade — bare minimum
5. Palette — hex + percentage only
6. References — surnames only
7. Exclude — short

Lock format: **GEOMETRY:** <compressed>. **ORIENTATION:** <compressed>. **FRAMING:** <compressed>. **LIGHT:** <compressed>. **MATERIAL:** <compressed>.
Compression: Drop all articles, use slash-separated light "key az/alt/Kelvin", surnames only for refs.`,
  systemPromptAddition: `You are generating for Grok. Maximum compression — tightest word budget of all platforms (140-165 words). Drop all articles. Use slash-separated light notation (key az/alt/Kelvin). Surnames only for references. Lock block values must be maximally compressed. Bare-minimum camera and grade line.`,
};
