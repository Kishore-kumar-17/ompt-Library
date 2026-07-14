import type { PipelineContext, PipelineStage, Family } from "../types.js";

// Family from platform is the most reliable signal — only override if contradicted
const VIDEO_PLATFORMS = new Set(["runway", "sora", "pika", "kling", "luma", "veo"]);
const IMAGE_PLATFORMS = new Set(["midjourney", "flux", "firefly", "chatgpt", "gemini", "grok", "ideogram", "leonardo", "stable-diffusion", "runway-image"]);
const CODE_PLATFORMS  = new Set(["claude-code", "cursor", "copilot", "chatgpt-code", "gemini-code"]);

const VIDEO_KEYWORDS = /\b(video|footage|clip|scene|animation|motion|film|cinematic|reel|ad|commercial)\b/i;
const CODE_KEYWORDS  = /\b(code|function|class|component|api|bug|error|implement|refactor|test|script)\b/i;

export class CategoryDetectorStage implements PipelineStage {
  name = "category-detector";

  async execute(ctx: PipelineContext): Promise<PipelineContext> {
    const platform = ctx.request.platform?.toLowerCase() ?? "";
    const requestedFamily = ctx.request.family as Family;
    const idea = ctx.request.idea ?? "";

    // Platform is the strongest signal
    let family: Family = requestedFamily;
    if (VIDEO_PLATFORMS.has(platform)) family = "video";
    else if (CODE_PLATFORMS.has(platform))  family = "code";
    else if (IMAGE_PLATFORMS.has(platform)) family = "image";

    // If user's idea contradicts the family, the intent takes precedence
    if (requestedFamily === "video" || VIDEO_KEYWORDS.test(idea)) family = "video";
    if (requestedFamily === "code"  || CODE_KEYWORDS.test(idea))  family = "code";

    ctx.detectedFamily = family;

    // Map category from request or derive a sensible default
    ctx.detectedCategory = ctx.request.category ?? deriveCategory(family, idea);

    // Apply tier hint from intent if not already set
    if (ctx.intent && !ctx.intent.suggestedTier && family === "image") {
      ctx.intent.suggestedTier = inferTier(idea);
    }

    return ctx;
  }
}

function deriveCategory(family: Family, idea: string): string {
  const lower = idea.toLowerCase();

  if (family === "image") {
    if (/portrait|headshot|face/.test(lower))         return "Portraits";
    if (/product|packaging|bottle|jar/.test(lower))   return "Product Photography";
    if (/food|meal|dish|recipe/.test(lower))           return "Food Photography";
    if (/fashion|outfit|clothing|model/.test(lower))  return "Fashion";
    if (/architecture|building|exterior/.test(lower)) return "Architecture";
    if (/interior|room|furniture/.test(lower))        return "Interior Design";
    if (/logo|icon|brand/.test(lower))                return "Logos";
    if (/ad|advertisement|poster/.test(lower))        return "Advertising";
    if (/concept|fantasy|sci-fi|sci fi/.test(lower))  return "Concept Art";
    return "General";
  }

  if (family === "video") {
    if (/commercial|ad|brand/.test(lower))    return "Commercial Ads";
    if (/cinematic|film|movie/.test(lower))   return "Cinematic Shots";
    if (/social|reel|tiktok/.test(lower))     return "Social Media Videos";
    if (/product/.test(lower))                return "Product Videos";
    return "General";
  }

  if (family === "code") {
    if (/frontend|react|vue|angular|ui|component/.test(lower)) return "Frontend";
    if (/backend|api|server|database/.test(lower))             return "Backend";
    if (/test|spec|unit|integration/.test(lower))              return "Testing";
    if (/devops|deploy|docker|ci|cd/.test(lower))             return "DevOps";
    return "General";
  }

  // text / content
  if (/email/.test(lower))       return "Email Writing";
  if (/blog|article/.test(lower)) return "Content Writing";
  if (/social|post|tweet/.test(lower)) return "Social Media";
  if (/seo/.test(lower))         return "SEO";
  if (/copy|ad|headline/.test(lower)) return "Copywriting";
  return "General";
}

function inferTier(idea: string): string | null {
  const lower = idea.toLowerCase();
  if (/product|bottle|package|bag|watch|shoe|gadget|device|car/.test(lower)) return "PRODUCT";
  if (/person|people|man|woman|portrait|model|fashion|face/.test(lower)) return "PEOPLE";
  if (/art|paint|illustration|landscape|abstract|nature/.test(lower)) return "ART";
  return null;
}
