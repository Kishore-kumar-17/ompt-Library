import { getAIService } from "../ai/service.js";
import { MODEL_TIER } from "../ai/models.js";
import { platformRegistry } from "../platforms/index.js";
import { scorePrompt } from "../pipeline/prompt-scorer.js";
import type { ConvertRequest, ConvertResult } from "../types.js";

export async function convertPrompt(request: ConvertRequest): Promise<ConvertResult> {
  const { promptText, fromPlatform, toPlatform, family } = request;

  const fromConfig = platformRegistry.get(fromPlatform);
  const toConfig   = platformRegistry.get(toPlatform);

  const fromDesc = fromConfig ? `${fromConfig.name} (${fromConfig.structureRules.slice(0, 200)}...)` : fromPlatform;
  const toDesc   = toConfig   ? `${toConfig.name}\n\n${toConfig.structureRules}` : toPlatform;

  const system = `You are an expert prompt engineer who converts prompts between AI platforms while preserving all content and intent.
Convert the given ${family} prompt from ${fromPlatform} format to ${toPlatform} format.
The converted prompt must preserve all subjects, style, mood, technical specs, and creative intent — only the FORMAT should change.
Respond with valid JSON only:
{
  "converted": "the full converted prompt text",
  "changesSummary": ["list of 3-6 format changes made"]
}`;

  const userMsg = `Convert this ${fromPlatform} prompt to ${toPlatform} format:

SOURCE (${fromPlatform}):
${promptText}

TARGET PLATFORM RULES (${toPlatform}):
${toDesc}`;

  const ai = getAIService();
  const res = await ai.complete({
    model: MODEL_TIER.QUALITY,
    system,
    messages: [{ role: "user", content: userMsg }],
    maxTokens: 1500,
  });

  interface ParsedConvert { converted: string; changesSummary: string[] }
  let parsed: ParsedConvert;
  try {
    parsed = JSON.parse(res.text.replace(/```json?\s*/g, "").replace(/```/g, "").trim()) as ParsedConvert;
  } catch {
    parsed = {
      converted: res.text.trim(),
      changesSummary: [`Reformatted from ${fromPlatform} to ${toPlatform}`],
    };
  }

  let score = null;
  try {
    score = await scorePrompt(parsed.converted, toPlatform, family, toConfig?.wordBudget);
  } catch { /* non-fatal */ }

  return {
    converted: parsed.converted,
    changesSummary: parsed.changesSummary,
    score,
    tokensUsed: res.inputTokens + res.outputTokens,
  };
}
