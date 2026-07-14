import type { PipelineContext, PipelineStage, ParsedIntent } from "../types.js";
import { getAIService } from "../ai/service.js";
import { MODEL_TIER } from "../ai/models.js";

// Keywords that suggest tier assignment without an AI call
const PRODUCT_KEYWORDS = /\b(product|bottle|package|packaging|bag|can|box|jar|watch|ring|shoe|bag|handbag|perfume|cosmetic|gadget|device|phone|laptop|car|vehicle|logo|label|brand|poster|banner|ad|advertisement|brochure)\b/i;
const PEOPLE_KEYWORDS = /\b(person|people|man|woman|girl|boy|portrait|face|model|fashion|outfit|style|dress|suit|wedding|family|baby|child|athlete)\b/i;
const ART_KEYWORDS = /\b(art|painting|illustration|digital art|concept art|animation|cartoon|fantasy|abstract|landscape|architecture|interior|nature|animals?|still life)\b/i;

export class IntentAnalyzerStage implements PipelineStage {
  name = "intent-analyzer";

  async execute(ctx: PipelineContext): Promise<PipelineContext> {
    const idea = ctx.request.idea.trim();

    // Fast path: very short or simple ideas — skip AI call
    if (idea.length < 40) {
      ctx.intent = buildSimpleIntent(idea);
      return ctx;
    }

    const system = `You analyze user ideas and extract structured intent. Return ONLY valid JSON, no markdown.`;
    const userMsg = `Extract intent from this prompt idea:
"${idea}"

Return JSON:
{
  "subject": "the main subject or focus",
  "action": "what is happening or what the user wants (null if unclear)",
  "setting": "environment/location (null if none)",
  "mood": "emotional tone (null if none)",
  "style": "visual or writing style (null if none)",
  "constraints": ["any specific requirements mentioned"],
  "suggestedTier": "PRODUCT, PEOPLE, or ART (or null if not an image prompt)"
}`;

    try {
      const ai = getAIService();
      const res = await ai.complete({
        model: MODEL_TIER.FAST,
        system,
        messages: [{ role: "user", content: userMsg }],
        maxTokens: 300,
      });
      ctx.tokensUsed += res.inputTokens + res.outputTokens;

      const parsed = JSON.parse(res.text.trim()) as ParsedIntent;
      ctx.intent = parsed;
    } catch {
      // Fallback: rule-based intent
      ctx.intent = buildSimpleIntent(idea);
    }

    return ctx;
  }
}

function buildSimpleIntent(idea: string): ParsedIntent {
  let tier: string | null = null;
  if (PRODUCT_KEYWORDS.test(idea)) tier = "PRODUCT";
  else if (PEOPLE_KEYWORDS.test(idea)) tier = "PEOPLE";
  else if (ART_KEYWORDS.test(idea)) tier = "ART";

  return {
    subject: idea,
    action: null,
    setting: null,
    mood: null,
    style: null,
    constraints: [],
    suggestedTier: tier,
  };
}
