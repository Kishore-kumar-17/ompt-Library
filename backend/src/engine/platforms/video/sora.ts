import type { PlatformConfig } from "../../types.js";

export const soraConfig: PlatformConfig = {
  id: "sora",
  name: "Sora",
  family: "video",
  wordBudget: { min: 100, max: 200 },
  compressionLevel: "verbose",
  supportedTiers: [],
  parameterFlags: "",
  componentOrder: ["objective", "context", "style", "technical"],
  requiredComponents: ["objective"],
  structureRules: `Platform: Sora (OpenAI Video)
Word budget: 100-200 words. Sora handles rich narrative descriptions well.
Structure:
1. Scene setup — where and when
2. Subject description — who/what is in the scene
3. Action and movement — what happens during the clip
4. Camera behavior — movement, angle, framing changes
5. Lighting and atmosphere
6. Cinematic style reference
7. Duration / pacing notes

Key rules:
- Sora responds to narrative-style descriptions — write like a screenplay direction
- Include temporal progression: "the camera slowly pulls back to reveal..."
- Be specific about subject motion, not just camera motion
- Environment physics are important — describe how materials behave (cloth flowing, water splashing)
- Sora handles longer clips — describe a beginning, middle, and implied end`,
  systemPromptAddition: `You are generating a video prompt for Sora. Write in narrative/screenplay style describing the full scene. Include both camera movement AND subject movement. Describe environment physics (how materials, liquids, and cloth behave). Think in terms of a short cinematic sequence with progression.`,
};
