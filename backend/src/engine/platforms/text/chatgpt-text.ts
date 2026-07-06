import type { PlatformConfig } from "../../types.js";

export const chatgptTextConfig: PlatformConfig = {
  id: "chatgpt-text",
  name: "ChatGPT",
  family: "text",
  wordBudget: { min: 50, max: 300 },
  compressionLevel: "standard",
  supportedTiers: [],
  parameterFlags: "",
  componentOrder: ["role", "context", "objective", "constraints", "output_format"],
  requiredComponents: ["objective"],
  structureRules: `Platform: ChatGPT (GPT-4o / GPT-4)
Structure:
1. Role assignment ("Act as a senior X", "You are a Y expert")
2. Task description — clear, specific goal
3. Context — relevant background
4. Constraints — tone, length, format rules
5. Output format — what the final answer should look like

Key rules for ChatGPT:
- Role framing is very effective: "Act as a..." sets strong persona
- Break complex tasks into numbered steps
- Specify examples: "For example:" sections improve output quality
- ChatGPT responds well to explicit formatting: "Format your response as:", "Use bullet points"
- Few-shot examples: "Here is an example of what I want: [example]"`,
  systemPromptAddition: `You are generating a prompt for ChatGPT. Use clear role assignment ("Act as a..."), explicit numbered task steps, and formatting instructions. ChatGPT responds well to examples and explicit output format specifications.`,
};
