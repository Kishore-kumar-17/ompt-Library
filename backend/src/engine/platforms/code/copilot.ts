import type { PlatformConfig } from "../../types.js";

export const copilotConfig: PlatformConfig = {
  id: "copilot",
  name: "GitHub Copilot",
  family: "code",
  wordBudget: { min: 20, max: 200 },
  compressionLevel: "minimal",
  supportedTiers: [],
  parameterFlags: "",
  componentOrder: ["context", "objective", "constraints"],
  requiredComponents: ["objective"],
  structureRules: `Platform: GitHub Copilot (Chat mode)
Structure:
1. Context — what file/function you're working in
2. Task — what to add, fix, or refactor
3. Constraints — language, framework, patterns

Key rules for Copilot:
- Copilot Chat responds best to concise, specific requests
- Reference the current function or file explicitly
- For inline completion: write a clear comment above the code
- For Chat mode: frame as "help me X" or "explain Y" or "refactor Z to be..."
- Specify language and framework when not obvious from context
- /explain, /fix, /tests are built-in slash commands — structure prompt accordingly`,
  systemPromptAddition: `You are generating a prompt for GitHub Copilot Chat. Keep it concise and specific. Reference the current code context explicitly. Use imperative framing ("implement", "fix", "refactor"). Copilot Chat works best with focused, single-task prompts.`,
};
