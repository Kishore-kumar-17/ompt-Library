import type { PlatformConfig } from "../../types.js";

export const claudeTextConfig: PlatformConfig = {
  id: "claude",
  name: "Claude",
  family: "text",
  wordBudget: { min: 50, max: 300 },
  compressionLevel: "verbose",
  supportedTiers: [],
  parameterFlags: "",
  componentOrder: ["role", "context", "objective", "constraints", "output_format"],
  requiredComponents: ["objective", "output_format"],
  structureRules: `Platform: Claude (Anthropic)
Structure:
1. Role/persona framing (optional but effective: "You are an expert X")
2. Context — background information Claude needs
3. Task — what you want Claude to do, broken into clear steps
4. Constraints — what to avoid, tone, length restrictions
5. Output format — how to structure the response (markdown, JSON, bullet list, etc.)

Key rules for Claude:
- Claude responds exceptionally well to explicit output format instructions
- Use XML-style tags for complex structured outputs: <analysis>, <recommendations>
- Be explicit about reasoning depth: "think step by step", "consider edge cases"
- Claude handles long context — provide full background without summarizing
- Tone specification is effective: "Be direct and concise", "Use accessible language"
- Chain-of-thought prompts work well: "Before answering, reason through..."`,
  systemPromptAddition: `You are generating a prompt for Claude (Anthropic). Use clear role framing, explicit output format specification, and XML-style structural tags if needed. Claude responds well to detailed reasoning instructions and explicit format requirements. Leverage Claude's ability to handle long context and complex multi-step tasks.`,
};
