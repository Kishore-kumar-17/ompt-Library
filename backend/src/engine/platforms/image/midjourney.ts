import type { PlatformConfig } from "../../types.js";

export const midjourneyConfig: PlatformConfig = {
  id: "midjourney",
  name: "Midjourney",
  family: "image",
  wordBudget: { min: 210, max: 250 },
  compressionLevel: "standard",
  supportedTiers: ["PRODUCT", "PEOPLE", "ART"],
  parameterFlags: "--ar X:Y --v 6.1 --stylize 0 --style raw --q 2 --no <excludes>",
  componentOrder: ["objective", "context", "style", "technical", "platform_params", "negative"],
  requiredComponents: ["objective", "technical", "negative"],
  structureRules: `Platform: Midjourney
Word budget: 210-250 words (token-dense with :: separators).
Structure:
1. Shot type + subject description :: after opening phrase
2. Subject detail segments — each major element is its own :: segment
3. Lock block segments — one :: segment per lock type, values in hyphenated form
4. Camera rig segment — "Phase One XF IQ4 150MP Schneider 80mm LS f/8 1/125s ISO 50 tethered ::"
5. Grade segment — "Capture-One-LUT grain-N +/-EV ::"
6. Palette segment — "color #hex NN% ... palette ::"
7. References segment — "Firstname-Lastname Brand-name-style ::"
8. Parameter flags — "--ar X:Y --v 6.1 --stylize 0 --style raw --q 2 --no token1 token2"

Lock format (hyphenated tokens inside :: segments):
:: GEOMETRY <hyphenated-values> :: ORIENTATION <hyphenated-values> :: FRAMING <hyphenated-values> :: LIGHT <hyphenated-values> :: MATERIAL <hyphenated-values> ::

Hyphenation: spaces become hyphens inside values, degrees stay attached (90°), ratios as-is (1.23:1).
Always end with --ar and --no flags.`,
  systemPromptAddition: `You are generating for Midjourney. Use :: weight-break separators between segments. Hyphenate all multi-word values within lock blocks. End with Midjourney parameter flags --ar X:Y --v 6.1 --stylize 0 --style raw --q 2 --no <excludes>.`,
};
