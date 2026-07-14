import type { PlatformConfig } from "../../types.js";

export const klingConfig: PlatformConfig = {
  id: "kling",
  name: "Kling",
  family: "video",
  wordBudget: { min: 60, max: 130 },
  compressionLevel: "minimal",
  supportedTiers: [],
  parameterFlags: "",
  componentOrder: ["objective", "context", "style", "technical"],
  requiredComponents: ["objective"],
  structureRules: `Platform: Kling AI Video
Word budget: 60-130 words.
Structure:
1. Subject and scene description
2. Action / motion description (what is moving)
3. Camera angle and movement
4. Lighting and atmosphere
5. Visual quality / style modifiers

Key rules:
- Kling excels at realistic human motion and physics
- Be explicit about human actions if people are present: "walking briskly", "turning to look at camera"
- Physical interactions are a strength: objects falling, hands picking up items, fabric movement
- Environment matters: describe background, weather, time of day
- Quality: "high quality", "cinematic", "realistic" work well`,
  systemPromptAddition: `You are generating a video prompt for Kling AI. Emphasize realistic motion and physics. Be explicit about human actions and physical interactions. Describe the environment and time of day. Kling excels at realistic motion — leverage this by describing motion with precision.`,
};
