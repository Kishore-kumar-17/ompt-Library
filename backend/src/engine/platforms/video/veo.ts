import type { PlatformConfig } from "../../types.js";

export const veoConfig: PlatformConfig = {
  id: "veo",
  name: "Veo",
  family: "video",
  wordBudget: { min: 80, max: 160 },
  compressionLevel: "standard",
  supportedTiers: [],
  parameterFlags: "",
  componentOrder: ["objective", "context", "style", "technical"],
  requiredComponents: ["objective"],
  structureRules: `Platform: Veo (Google DeepMind)
Word budget: 80-160 words.
Structure:
1. Scene description — location, time, environment
2. Subject(s) — who or what is in the scene, their appearance
3. Action / event — what happens in the clip
4. Cinematography — shot type, camera movement
5. Lighting and color
6. Tone / mood

Key rules:
- Veo is Google's flagship video model — strong on realistic scenes and natural motion
- Describe the temporal arc: beginning state → action → end state
- Strong at outdoor environments and natural lighting
- Camera language: "close-up", "medium shot", "wide establishing shot", "tracking"
- Be descriptive about environment details — Veo renders them accurately`,
  systemPromptAddition: `You are generating a video prompt for Veo by Google. Describe the temporal arc of the scene (beginning to end). Use proper cinematography language for shots and camera movement. Veo handles realistic environments and natural motion very well — describe these in detail.`,
};
