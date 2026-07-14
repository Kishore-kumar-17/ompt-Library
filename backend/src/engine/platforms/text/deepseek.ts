import type { PlatformConfig } from "../../types.js";

export const deepseekConfig: PlatformConfig = {
  id: "deepseek",
  name: "DeepSeek",
  family: "text",
  wordBudget: { min: 50, max: 300 },
  compressionLevel: "standard",
  supportedTiers: [],
  parameterFlags: "",
  componentOrder: ["role", "objective", "context", "constraints", "output_format"],
  requiredComponents: ["objective", "output_format"],
  structureRules: `Platform: DeepSeek
Structure:
1. Role/persona (effective: "Act as a X")
2. Task — specific and clear
3. Technical context if relevant
4. Step-by-step breakdown
5. Output format

Key rules for DeepSeek:
- DeepSeek excels at technical, analytical, and coding tasks
- Chain-of-thought reasoning works extremely well: "<think>" mode triggered automatically for R1 model
- Mathematical and logical reasoning is a strength
- Technical writing and documentation is a strength
- Step-by-step explanations get high-quality responses`,
  systemPromptAddition: `You are generating a prompt for DeepSeek. DeepSeek excels at technical analysis, mathematics, reasoning, and code. Use chain-of-thought prompting ("think step by step") for complex reasoning tasks. Include explicit output format for technical content.`,
};
