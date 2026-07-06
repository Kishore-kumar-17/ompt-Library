import type { PlatformConfig } from "../../types.js";

export const lumaConfig: PlatformConfig = {
  id: "luma",
  name: "Luma Dream Machine",
  family: "video",
  wordBudget: { min: 60, max: 130 },
  compressionLevel: "standard",
  supportedTiers: [],
  parameterFlags: "",
  componentOrder: ["objective", "style", "technical"],
  requiredComponents: ["objective"],
  structureRules: `Platform: Luma Dream Machine
Word budget: 60-130 words.
Structure:
1. Scene / subject description
2. Motion and animation style
3. Lighting and mood
4. Camera behavior
5. Style/aesthetic reference

Key rules:
- Luma excels at dreamlike, fluid motion and stylized aesthetics
- Use poetic, evocative language for atmosphere
- Reference visual artists, art styles, or film aesthetics
- Camera movement keywords: "slow motion", "time-lapse", "floating", "drifting"
- Luma handles imaginative/fantastical scenes well`,
  systemPromptAddition: `You are generating a video prompt for Luma Dream Machine. Use evocative, atmospheric language. Luma excels at dreamlike, fluid motion. Reference visual artists or art aesthetics for style. Describe the mood as much as the action.`,
};
