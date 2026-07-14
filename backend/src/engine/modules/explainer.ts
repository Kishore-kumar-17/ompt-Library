import { getAIService } from "../ai/service.js";
import { MODEL_TIER } from "../ai/models.js";
import type { ExplainRequest, ExplainResult, ComponentKey } from "../types.js";

export async function explainPrompt(request: ExplainRequest): Promise<ExplainResult> {
  const { promptText, platform, family } = request;

  const system = `You are an expert prompt engineer who explains why prompts work.
Break down the given prompt into its structural components and explain the purpose and effectiveness of each.
Respond with valid JSON only, no markdown:
{
  "summary": "2-3 sentence overview of what makes this prompt effective (or not)",
  "components": [
    {
      "key": "one of: role|objective|context|constraints|style|output_format|technical|platform_params|safety|negative",
      "text": "the actual text from the prompt for this component",
      "purpose": "what this component does",
      "effectiveness": "high|medium|low"
    }
  ],
  "strengths": ["list of 2-4 specific strengths"],
  "techniques": ["list of 2-4 prompt engineering techniques used"]
}`;

  const userMsg = `Explain this ${family ?? "AI"} prompt${platform ? ` (for ${platform})` : ""}:

${promptText}`;

  const ai = getAIService();
  const res = await ai.complete({
    model: MODEL_TIER.FAST,
    system,
    messages: [{ role: "user", content: userMsg }],
    maxTokens: 800,
  });

  interface ParsedExplain {
    summary: string;
    components: Array<{ key: ComponentKey; text: string; purpose: string; effectiveness: "high" | "medium" | "low" }>;
    strengths: string[];
    techniques: string[];
  }

  try {
    const parsed = JSON.parse(res.text.replace(/```json?\s*/g, "").replace(/```/g, "").trim()) as ParsedExplain;
    return {
      summary: parsed.summary,
      components: parsed.components,
      strengths: parsed.strengths,
      techniques: parsed.techniques,
      tokensUsed: res.inputTokens + res.outputTokens,
    };
  } catch {
    return {
      summary: "Unable to parse explanation. The prompt was analyzed but the structured breakdown could not be generated.",
      components: [],
      strengths: [],
      techniques: [],
      tokensUsed: res.inputTokens + res.outputTokens,
    };
  }
}
