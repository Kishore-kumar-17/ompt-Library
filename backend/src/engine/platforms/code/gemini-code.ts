import type { PlatformConfig } from "../../types.js";

export const geminiCodeConfig: PlatformConfig = {
  id: "gemini-code",
  name: "Gemini Code",
  family: "code",
  wordBudget: { min: 50, max: 350 },
  compressionLevel: "standard",
  supportedTiers: [],
  parameterFlags: "",
  componentOrder: ["role", "context", "objective", "constraints", "output_format"],
  requiredComponents: ["objective", "output_format"],
  structureRules: `Platform: Gemini (Code tasks)
Structure:
1. Role: "You are an expert [technology] developer"
2. Context — codebase description, stack, current code
3. Task — specific implementation or analysis goal
4. Constraints — patterns, no new deps, performance requirements
5. Output format — specify clearly

Key rules for Gemini code tasks:
- Gemini has a large context window — include the full relevant code
- Strong at code review and refactoring tasks
- Good at multi-language support and framework migrations
- Explicit output format: "Return only TypeScript, no markdown code fences"
- Gemini 1.5+ handles long code files effectively`,
  systemPromptAddition: `You are generating a code prompt for Gemini. Include full code context (Gemini handles large context well). Use role framing and explicit output format. Gemini excels at code review, refactoring, and multi-language tasks.`,
};
