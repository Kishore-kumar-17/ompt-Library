import type { PlatformConfig } from "../../types.js";

export const chatgptCodeConfig: PlatformConfig = {
  id: "chatgpt-code",
  name: "ChatGPT (Code)",
  family: "code",
  wordBudget: { min: 50, max: 400 },
  compressionLevel: "standard",
  supportedTiers: [],
  parameterFlags: "",
  componentOrder: ["role", "context", "objective", "constraints", "output_format"],
  requiredComponents: ["objective", "output_format"],
  structureRules: `Platform: ChatGPT (Code tasks)
Structure:
1. Role: "Act as a senior [language/framework] developer"
2. Context — code snippet, error message, or feature description
3. Task — implement, fix, refactor, explain, review
4. Constraints — performance, readability, no external libs, etc.
5. Output format — raw code only, with comments, with explanation

Key rules for ChatGPT code tasks:
- Paste the relevant code directly in the prompt
- Include error messages verbatim if debugging
- Specify output format: "return only the code, no explanation" OR "explain each line"
- Language/version: "TypeScript 5.3", "Python 3.12", "Node.js 20"
- For architecture questions: "Design a system that..." works well`,
  systemPromptAddition: `You are generating a code prompt for ChatGPT. Use role framing ("Act as a senior developer"). Include the relevant code or error message directly. Specify the output format (code only vs. explanation). Include language/version specifics.`,
};
