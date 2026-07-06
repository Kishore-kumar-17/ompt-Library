import type { PlatformConfig } from "../../types.js";

export const runwayVideoConfig: PlatformConfig = {
  id: "runway",
  name: "Runway",
  family: "video",
  wordBudget: { min: 80, max: 150 },
  compressionLevel: "standard",
  supportedTiers: [],
  parameterFlags: "",
  componentOrder: ["objective", "context", "style", "technical"],
  requiredComponents: ["objective", "technical"],
  structureRules: `Platform: Runway Gen-3 / Gen-4 (Video)
Word budget: 80-150 words.
Structure:
1. Camera movement description (dolly in, crane up, tracking shot, etc.)
2. Subject and scene description
3. Lighting and atmosphere
4. Color grade / mood
5. Duration hint (short clip, seamless loop, etc.)
6. Aspect ratio if needed (16:9, 9:16 for vertical)

Key rules:
- Start with camera movement — Runway excels at motion
- Be specific about motion: "slow dolly from chest to face", not "close up"
- Reference cinematographers or films for style: "Roger Deakins lighting", "Blade Runner 2049 aesthetic"
- Specify if loop is needed: "seamlessly looping"
- Duration: Runway clips are typically 4-10 seconds — imply pacing accordingly`,
  systemPromptAddition: `You are generating a video prompt for Runway Gen-3/4. Lead with camera movement. Be very specific about how the camera moves. Reference film/DP aesthetics for style. Include pacing and atmosphere. Runway excels at cinematic motion — leverage this.`,
};
