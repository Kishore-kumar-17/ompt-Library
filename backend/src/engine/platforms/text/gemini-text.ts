import type { PlatformConfig } from "../../types.js";

export const geminiTextConfig: PlatformConfig = {
  id: "gemini-text",
  name: "Gemini",
  family: "text",
  wordBudget: { min: 50, max: 250 },
  compressionLevel: "standard",
  supportedTiers: [],
  parameterFlags: "",
  componentOrder: ["role", "objective", "context", "constraints", "output_format"],
  requiredComponents: ["objective", "output_format"],
  structureRules: `Platform: Gemini (Google)
Structure:
1. Role/persona (optional)
2. Task — what Gemini should do
3. Background context
4. Specific instructions and constraints
5. Output format

Key rules for Gemini:
- Gemini excels at multi-modal tasks and research-oriented queries
- Structured output requests work well: "Format as a table", "Use markdown headers"
- Gemini responds well to "Think step by step" reasoning instructions
- Good at synthesis tasks: comparing multiple sources, summarizing research
- Grounding: Gemini can use Google Search — mention "using the latest information" if needed`,
  systemPromptAddition: `You are generating a prompt for Gemini by Google. Gemini excels at research, synthesis, and structured output. Include explicit output format instructions. Leverage Gemini's ability to compare and synthesize information from multiple angles.`,
};
