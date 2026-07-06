import type { PipelineContext, PipelineStage } from "../types.js";
import { getAIService } from "../ai/service.js";
import { MODEL_TIER } from "../ai/models.js";
import {
  platformRegistry,
  IMAGE_SHARED_FORMULA,
  VIDEO_SHARED_FORMULA,
  TEXT_SHARED_FORMULA,
  CODE_SHARED_FORMULA,
} from "../platforms/index.js";

export class ComponentAssemblerStage implements PipelineStage {
  name = "component-assembler";

  async execute(ctx: PipelineContext): Promise<PipelineContext> {
    const { request, platform, requirements, intent, detectedFamily } = ctx;
    const family = detectedFamily ?? request.family;

    // Build the system prompt from the shared formula + platform-specific addition
    const sharedFormula = getSharedFormula(family);
    const platformAddition = platform?.systemPromptAddition ?? "";
    const structureRules = platform?.structureRules ?? "";

    const system = [
      sharedFormula,
      structureRules ? `\n${structureRules}` : "",
      platformAddition ? `\n${platformAddition}` : "",
      "\nIMPORTANT: Output ONLY the final prompt text. No explanations, no markdown code fences, no commentary.",
    ].join("");

    // Build user message from requirements + request enrichments
    const userMsg = buildUserMessage(request, requirements, intent, platform?.id ?? "", family);

    const ai = getAIService();

    let fullText = "";

    // Use streaming if the context has an onChunk callback wired up
    if ((ctx as any)._onChunk) {
      const onChunk = (ctx as any)._onChunk as (text: string) => void;
      const res = await ai.stream(
        { model: MODEL_TIER.QUALITY, system, messages: [{ role: "user", content: userMsg }], maxTokens: 1500 },
        onChunk
      );
      fullText = res.text;
      ctx.tokensUsed += res.inputTokens + res.outputTokens;
    } else {
      const res = await ai.complete({
        model: MODEL_TIER.QUALITY,
        system,
        messages: [{ role: "user", content: userMsg }],
        maxTokens: 1500,
      });
      fullText = res.text;
      ctx.tokensUsed += res.inputTokens + res.outputTokens;
    }

    ctx.assembledPrompt = fullText.trim();
    return ctx;
  }
}

function getSharedFormula(family: string): string {
  switch (family) {
    case "image":   return IMAGE_SHARED_FORMULA;
    case "video":   return VIDEO_SHARED_FORMULA;
    case "code":    return CODE_SHARED_FORMULA;
    default:        return TEXT_SHARED_FORMULA;
  }
}

function buildUserMessage(
  request: PipelineContext["request"],
  requirements: PipelineContext["requirements"],
  intent: PipelineContext["intent"],
  platformId: string,
  family: string
): string {
  const parts: string[] = [`Generate a ${family} prompt for ${platformId}.`];
  parts.push(`Subject/idea: ${request.idea}`);

  if (request.style)  parts.push(`Style: ${request.style}`);
  if (request.mood)   parts.push(`Mood: ${request.mood}`);
  if (request.aspect) parts.push(`Aspect ratio: ${request.aspect}`);
  if (request.category) parts.push(`Category: ${request.category}`);

  if (intent?.suggestedTier) {
    parts.push(`Tier: ${intent.suggestedTier} (apply correct lock types for this tier)`);
  }

  if (requirements?.constraints.length) {
    parts.push(`Constraints: ${requirements.constraints.join("; ")}`);
  }

  if (family === "image") {
    parts.push(
      "Apply the full v4.2 Pro Formula with appropriate tier locks. Include camera rig, grade, palette with hex codes, photographer references, and exclude list."
    );
  } else if (family === "video") {
    parts.push(
      "Write a rich cinematic video prompt with camera movement, lighting setup, color grading reference, and pacing notes."
    );
  } else if (family === "code") {
    parts.push(
      "Write a structured coding prompt with role framing, clear task specification, tech stack, and expected output format."
    );
  } else {
    parts.push(
      "Write a structured AI instruction prompt with role framing, task breakdown, output format specification, and tone definition."
    );
  }

  return parts.join("\n");
}
