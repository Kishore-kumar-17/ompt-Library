import type { PlatformConfig } from "../../types.js";

export const claudeCodeConfig: PlatformConfig = {
  id: "claude-code",
  name: "Claude Code",
  family: "code",
  wordBudget: { min: 50, max: 500 },
  compressionLevel: "verbose",
  supportedTiers: [],
  parameterFlags: "",
  componentOrder: ["context", "objective", "constraints", "output_format"],
  requiredComponents: ["objective"],
  structureRules: `Platform: Claude Code (Anthropic CLI)
Structure:
1. Project context — what the codebase is, stack, conventions
2. Task — specific coding objective
3. Constraints — what NOT to do, preserve existing patterns, no new dependencies
4. Expected output — files to create/edit, what success looks like

Key rules for Claude Code:
- Be explicit about what files to touch and which to leave alone
- Specify the tech stack: "React 18, TypeScript 5, Tailwind CSS v4"
- Define conventions: "use named exports", "no default exports", "snake_case files"
- Specify what to NOT change: "do not refactor unrelated code"
- For bug fixes: provide the error message and reproduction steps
- For features: describe the acceptance criteria, not just the feature name`,
  systemPromptAddition: `You are generating a prompt for Claude Code (Anthropic's CLI coding assistant). Include project context, tech stack, and specific file conventions. Be explicit about what to change and what NOT to touch. Define acceptance criteria, not just task descriptions.`,
};
