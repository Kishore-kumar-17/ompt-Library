import type { PipelineContext, PipelineStage, StructuredRequirements, Family } from "../types.js";
import { getAIService } from "../ai/service.js";
import { MODEL_TIER } from "../ai/models.js";

export class RequirementExtractorStage implements PipelineStage {
  name = "requirement-extractor";

  async execute(ctx: PipelineContext): Promise<PipelineContext> {
    const { request, intent, detectedFamily } = ctx;
    const family = detectedFamily ?? request.family;

    // Build requirements from available signals without an extra AI call when possible
    const quickReqs = buildRequirementsFromIntent(request, intent, family as Family);

    // Only call AI if the idea is complex enough to benefit from extraction
    if (request.idea.length < 60 || !needsExtraction(family as Family)) {
      ctx.requirements = quickReqs;
      return ctx;
    }

    const system = `You extract structured prompt requirements from a user description. Return ONLY valid JSON, no markdown.`;

    const userMsg = `Extract structured requirements from this ${family} prompt idea:
"${request.idea}"
${request.style  ? `Style: ${request.style}` : ""}
${request.mood   ? `Mood: ${request.mood}` : ""}
${request.aspect ? `Aspect ratio: ${request.aspect}` : ""}

Return JSON:
{
  "role": "the persona/expert role to adopt (null if not applicable)",
  "objective": "what exactly needs to be generated/done (required)",
  "context": "background context needed (null if simple)",
  "constraints": ["list of specific requirements or limitations"],
  "style": "visual or writing style (null if none)",
  "outputFormat": "how the output should be formatted (null if standard)",
  "technical": "technical specifications like camera, aspect ratio, etc (null if none)",
  "negative": "what to avoid or exclude (null if none)"
}`;

    try {
      const ai = getAIService();
      const res = await ai.complete({
        model: MODEL_TIER.FAST,
        system,
        messages: [{ role: "user", content: userMsg }],
        maxTokens: 500,
      });
      ctx.tokensUsed += res.inputTokens + res.outputTokens;

      const extracted = JSON.parse(res.text.trim()) as StructuredRequirements;
      ctx.requirements = {
        ...quickReqs,
        ...extracted,
        // Preserve quick-derived fields when AI returns null
        style: extracted.style ?? quickReqs.style,
        technical: extracted.technical ?? quickReqs.technical,
      };
    } catch {
      ctx.requirements = quickReqs;
    }

    return ctx;
  }
}

function buildRequirementsFromIntent(
  request: PipelineContext["request"],
  intent: PipelineContext["intent"],
  family: Family
): StructuredRequirements {
  const style = [request.style, request.mood, intent?.style, intent?.mood]
    .filter(Boolean)
    .join(", ") || null;

  const technical =
    request.aspect
      ? `Aspect ratio: ${request.aspect}`
      : null;

  return {
    role: null,
    objective: intent?.subject ?? request.idea,
    context: intent?.setting ?? null,
    constraints: intent?.constraints ?? [],
    style,
    outputFormat: null,
    technical,
    negative: null,
  };
}

function needsExtraction(family: Family): boolean {
  // Text and code prompts need more structured requirements
  return family === "text" || family === "code" || family === "content";
}
