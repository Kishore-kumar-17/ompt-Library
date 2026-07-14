import type { PlatformConfig } from "../../types.js";

export const pikaConfig: PlatformConfig = {
  id: "pika",
  name: "Pika",
  family: "video",
  wordBudget: { min: 50, max: 120 },
  compressionLevel: "minimal",
  supportedTiers: [],
  parameterFlags: "",
  componentOrder: ["objective", "style", "technical"],
  requiredComponents: ["objective"],
  structureRules: `Platform: Pika
Word budget: 50-120 words (concise, motion-focused).
Structure:
1. Subject + action (what is happening)
2. Visual style (cinematic, anime, 3D, etc.)
3. Camera motion (zoom in, pan left, orbit, etc.)
4. Mood/atmosphere
5. Optional: style reference

Key rules:
- Pika is optimized for short, punchy motion clips
- Lead with the action — what is moving and how
- Camera motion keywords: "zoom in", "zoom out", "pan left/right", "tilt up/down", "orbit"
- Style keywords work well: "cinematic", "photorealistic", "anime style", "3D render"
- Keep it short — Pika does best with focused, clear descriptions`,
  systemPromptAddition: `You are generating a video prompt for Pika. Keep it concise and action-focused. Lead with what is moving and how. Use clear camera motion keywords (zoom, pan, tilt, orbit). Pika works best with short, punchy descriptions under 120 words.`,
};
