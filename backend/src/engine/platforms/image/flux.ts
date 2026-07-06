import type { PlatformConfig } from "../../types.js";

export const fluxConfig: PlatformConfig = {
  id: "flux",
  name: "Flux",
  family: "image",
  wordBudget: { min: 255, max: 285 },
  compressionLevel: "verbose",
  supportedTiers: ["PRODUCT", "PEOPLE", "ART"],
  parameterFlags: "",
  componentOrder: ["objective", "context", "technical", "style", "platform_params", "negative"],
  requiredComponents: ["objective", "technical", "negative"],
  structureRules: `Platform: Flux
Word budget: 255-285 words (longest, most fully-elaborated).
Structure:
1. Shot type + campaign line — full sentence
2. "Subject: ..." — the most detailed description of all platforms, full narrative
3. Lock block — full sentences, bolded headers ending in "LOCK"
4. "Capture: ..." — camera body, lens, aperture, shutter, ISO
5. "Grade: ..." — LUT, film emulation, grain, EV
6. "Palette: ..." — named colors + hex + percentage
7. "References: ..." — 3-5 names/campaigns written out in full
8. "Exclude: ..." — comma-separated

Lock format (full sentences):
**GEOMETRY LOCK:** <full sentence>. **ORIENTATION LOCK:** <full sentence>. **FRAMING LOCK:** <full sentence>. **LIGHT LOCK:** <full sentence>. **MATERIAL LOCK:** <full sentence>.

Expand abbreviated lock values into full English: "lens height 0.92m" -> "camera lens height 0.92m positioned at the tote mid-body".`,
  systemPromptAddition: `You are generating for Flux. Use LOCK suffix headers (**GEOMETRY LOCK:**, etc.) with full English sentences. Use "Subject:", "Capture:", "Grade:", "Palette:", "References:", "Exclude:" section labels. Maximum elaboration — expand everything into full readable sentences. Longest word budget of all platforms.`,
};
