import { getAIService } from "../ai/service.js";
import { MODEL_TIER } from "../ai/models.js";
import { scorePrompt } from "../pipeline/prompt-scorer.js";
import { platformRegistry } from "../platforms/index.js";
import type { AnalyzeRequest, AnalyzeResult, ComponentKey, AnalysisSuggestion, Family } from "../types.js";

const COMPONENT_PATTERNS: Record<ComponentKey, RegExp> = {
  role:           /\b(act as|you are|as a|as an|role:|persona:)\b/i,
  objective:      /.{20}/,  // any non-trivial text satisfies objective
  context:        /\b(context|background|given that|in the scene|setting|environment)\b/i,
  constraints:    /\b(must|should|avoid|do not|don't|limit|constraint|only|without)\b/i,
  style:          /\b(style|aesthetic|mood|tone|vibe|feel|look|cinematic|minimalist|vintage)\b/i,
  output_format:  /\b(format|output|return|respond with|structure|as json|as markdown|as a list)\b/i,
  technical:      /\b(f\/[\d.]+|iso\s*\d+|mm lens|camera|rig|aperture|shutter|grade|lut|palette|hex|#[0-9a-f]{3,6})\b/i,
  platform_params: /--ar|--v \d|--no |--style|--q \d|\*\*LOCKS|::|\bLOCK\b/i,
  safety:         /\b(safe|appropriate|family.friendly|no explicit)\b/i,
  negative:       /\b(exclude|avoid|negative|--no |do not include|without)\b/i,
};

const SEVERITY_MAP: Record<ComponentKey, "critical" | "warning" | "info"> = {
  role:           "info",
  objective:      "critical",
  context:        "warning",
  constraints:    "info",
  style:          "warning",
  output_format:  "warning",
  technical:      "warning",
  platform_params:"warning",
  safety:         "info",
  negative:       "info",
};

const SUGGESTION_MAP: Record<ComponentKey, { message: string; example?: string }> = {
  role:           { message: "Add a role/persona to ground the AI's perspective", example: "Act as a senior product photographer" },
  objective:      { message: "The core objective is missing or unclear" },
  context:        { message: "Add context about the setting, environment, or background" },
  constraints:    { message: "Add explicit constraints to guide the output" },
  style:          { message: "Specify a visual or writing style for more consistent results", example: "Cinematic, high-contrast, film noir aesthetic" },
  output_format:  { message: "Define the output format for structured results", example: "Return as a numbered list with headers" },
  technical:      { message: "Add technical specifications (camera, palette, aspect ratio)", example: "Phase One XF, f/8, 1/125s, ISO 50" },
  platform_params:{ message: "Add platform-specific parameters for optimal results" },
  safety:         { message: "Consider adding safety/content guidelines" },
  negative:       { message: "Add an exclude list to prevent unwanted elements", example: "Exclude: harsh specular, watermarks, plastic sheen" },
};

const IMAGE_PLATFORMS = new Set(["midjourney", "flux", "firefly", "chatgpt", "gemini", "grok", "ideogram", "leonardo", "stable-diffusion", "runway-image"]);
const VIDEO_PLATFORMS = new Set(["runway", "sora", "pika", "kling", "luma", "veo"]);
const CODE_PLATFORMS  = new Set(["claude-code", "cursor", "copilot", "chatgpt-code", "gemini-code"]);

function detectFamily(promptText: string, platform?: string): Family {
  if (platform) {
    if (IMAGE_PLATFORMS.has(platform)) return "image";
    if (VIDEO_PLATFORMS.has(platform)) return "video";
    if (CODE_PLATFORMS.has(platform))  return "code";
  }
  const p = promptText.toLowerCase();
  if (/\b(video|cinematic|footage|clip|animation)\b/.test(p)) return "video";
  if (/\b(image|photo|portrait|illustration|render)\b/.test(p)) return "image";
  if (/\b(code|function|implement|refactor|api|bug)\b/.test(p)) return "code";
  return "text";
}

function detectPlatform(promptText: string): string | null {
  if (/--v \d|--ar \d|--no /i.test(promptText))     return "midjourney";
  if (/\*\*GEOMETRY LOCK\b|\bLOCK:/i.test(promptText)) return "flux";
  if (/\*\*LOCKS —/i.test(promptText))               return "chatgpt";
  if (/editorial.*AR \d/i.test(promptText))          return "firefly";
  return null;
}

export async function analyzePrompt(request: AnalyzeRequest): Promise<AnalyzeResult> {
  const { promptText, platform, family: hintFamily } = request;

  const detectedFamily = hintFamily ?? detectFamily(promptText, platform);
  const detectedPlatform = platform ?? detectPlatform(promptText);
  const wordCount = promptText.split(/\s+/).filter(Boolean).length;

  // Determine which components are relevant for this family
  const relevantComponents = getRelevantComponents(detectedFamily);

  const presentComponents: ComponentKey[] = [];
  const missingComponents: ComponentKey[] = [];

  for (const key of relevantComponents) {
    if (COMPONENT_PATTERNS[key].test(promptText)) {
      presentComponents.push(key);
    } else {
      missingComponents.push(key);
    }
  }

  // Build suggestions from missing components
  const suggestions: AnalysisSuggestion[] = missingComponents.map((key) => ({
    dimension: key,
    severity: SEVERITY_MAP[key],
    message: SUGGESTION_MAP[key].message,
    example: SUGGESTION_MAP[key].example,
  }));

  // Get quality score
  const platformConfig = detectedPlatform ? platformRegistry.get(detectedPlatform) : undefined;
  const score = await scorePrompt(
    promptText,
    detectedPlatform ?? undefined,
    detectedFamily,
    platformConfig?.wordBudget,
    wordCount
  );

  return {
    score,
    missingComponents,
    presentComponents,
    suggestions,
    wordCount,
    detectedFamily,
    detectedPlatform,
    tokensUsed: 60, // approximate
  };
}

function getRelevantComponents(family: Family): ComponentKey[] {
  switch (family) {
    case "image":
      return ["objective", "style", "technical", "platform_params", "negative"];
    case "video":
      return ["objective", "style", "technical"];
    case "code":
      return ["context", "objective", "constraints", "output_format"];
    default:
      return ["role", "objective", "constraints", "output_format"];
  }
}
