import type { PlatformConfig } from "../../types.js";

export const grokTextConfig: PlatformConfig = {
  id: "grok-text",
  name: "Grok",
  family: "text",
  wordBudget: { min: 30, max: 200 },
  compressionLevel: "minimal",
  supportedTiers: [],
  parameterFlags: "",
  componentOrder: ["objective", "context", "constraints"],
  requiredComponents: ["objective"],
  structureRules: `Platform: Grok (xAI)
Structure:
1. Direct task statement — no preamble
2. Context (if essential)
3. Constraints / tone

Key rules for Grok:
- Grok responds to direct, conversational prompts
- Less formal framing than ChatGPT/Claude — can be casual and punchy
- Grok has real-time X/Twitter data access — mention "using current data" for trending topics
- Grok has a witty personality — can request humorous or irreverent angles
- Shorter prompts often work better than long structured ones`,
  systemPromptAddition: `You are generating a prompt for Grok by xAI. Grok responds to direct, conversational prompts. Keep it punchy and to the point. Grok can access real-time X/Twitter data — mention this if the task involves current events or trending topics.`,
};
