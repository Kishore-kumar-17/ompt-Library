import type { PlatformConfig } from "../../types.js";

export const cursorConfig: PlatformConfig = {
  id: "cursor",
  name: "Cursor",
  family: "code",
  wordBudget: { min: 30, max: 300 },
  compressionLevel: "standard",
  supportedTiers: [],
  parameterFlags: "",
  componentOrder: ["context", "objective", "constraints"],
  requiredComponents: ["objective"],
  structureRules: `Platform: Cursor (AI Code Editor)
Structure:
1. Brief context (@-mentions files/symbols if possible)
2. Task — what to implement or fix
3. Key constraints — patterns to follow

Key rules for Cursor:
- Cursor has full codebase context — brief prompts can reference file structure
- Use @file, @symbol, or @codebase references for precision
- Agent mode: describe the end goal, not individual steps
- Composer: use for multi-file changes
- Keep prompts tighter than for standalone LLMs — Cursor sees the code
- Specify: "don't change any other files", "maintain the existing patterns"`,
  systemPromptAddition: `You are generating a prompt for Cursor AI editor. Cursor has full codebase context, so prompts can be more concise. Reference files and symbols by name. Specify scope limits ("only modify X file") and pattern constraints. For agent mode, describe end goals.`,
};
