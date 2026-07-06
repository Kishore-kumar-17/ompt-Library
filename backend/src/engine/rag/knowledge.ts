// ─── Platform Knowledge — distilled from RAG docs ────────────────────────────
// Hand-curated rules extracted from official platform documentation in:
//   backend/src/engine/rag/{Platform}/*.md
//
// Kept as TypeScript constants (not runtime file reads) for zero I/O overhead.
// When the RAG docs are updated, re-distill the relevant sections here.

export interface PlatformParameter {
  flag: string
  description: string
  example: string
}

export interface PlatformKnowledge {
  platform: string
  source: string           // RAG file(s) the knowledge was extracted from
  promptStructure: string  // canonical order of elements in a prompt
  parameters: PlatformParameter[]
  bestPractices: string[]
  avoid: string[]
  styleKeywords: string[]
  qualityModifiers: string[]
  examplePrompts: string[]
}

// ─── Midjourney ───────────────────────────────────────────────────────────────
// Source: RAG/Midjourney/Prompt Basics.md + Parameter List.md
const MIDJOURNEY: PlatformKnowledge = {
  platform: "midjourney",
  source: "Prompt Basics.md, Parameter List.md",
  promptStructure:
    "[subject], [visual style / medium], [environment], [lighting], [color], [mood] --ar X:Y --v 6.1 --s VALUE --q 2",
  parameters: [
    { flag: "--ar",        description: "Aspect ratio",                   example: "--ar 16:9" },
    { flag: "--v 6.1",     description: "Model version (latest stable)",  example: "--v 6.1" },
    { flag: "--v 7",       description: "V7 model (draft quality faster)", example: "--v 7" },
    { flag: "--s",         description: "Stylize 0-1000 (default 100)",   example: "--s 750" },
    { flag: "--q 2",       description: "Quality level",                  example: "--q 2" },
    { flag: "--no",        description: "Negative prompt (exclusions)",    example: "--no blur, text, watermark" },
    { flag: "--style raw", description: "Raw mode for realistic output",  example: "--style raw" },
    { flag: "--c",         description: "Chaos 0-100 (variation)",        example: "--c 20" },
    { flag: "--niji 6",    description: "Anime and illustrative model",   example: "--niji 6" },
    { flag: "--weird",     description: "Unconventional/surreal output",  example: "--weird 250" },
    { flag: "--iw",        description: "Image weight for img prompts",   example: "--iw 2" },
  ],
  bestPractices: [
    "Short focused keyword prompts outperform long sentence lists",
    "Place ALL parameters at the very END of the prompt after a space",
    "Use strong, specific synonyms (enormous instead of big, crimson instead of red)",
    "Use specific numbers not vague plurals (three cats not cats)",
    "Describe what you WANT — use --no for exclusions",
    "Reference specific art styles and artists by name",
    "Comma-separate all keywords with single spaces",
    "No punctuation inside parameter flags",
    "Lighting keywords: soft, ambient, neon, studio lights, overcast, dramatic",
    "Medium keywords: photo, oil painting, watercolor, illustration, sculpture, tapestry",
  ],
  avoid: [
    "Full sentences and conversational tone",
    "Putting parameters in the middle of the prompt",
    "Vague words: big, nice, beautiful, good",
    "Contradictory styles (photorealistic AND abstract)",
    "Unsupported or legacy parameters",
    "Comma after the last parameter",
  ],
  styleKeywords: [
    "photorealistic", "oil painting", "watercolor", "anime", "illustration",
    "concept art", "cinematic", "editorial", "vintage photography",
    "3D render", "digital art", "hyperrealistic", "impressionist",
    "baroque", "surrealist", "minimalist",
  ],
  qualityModifiers: [
    "highly detailed", "sharp focus", "professional photography",
    "award-winning", "8k resolution",
  ],
  examplePrompts: [
    "colored pencil illustration of bright orange California poppies --ar 1:1 --v 6.1 --s 750",
    "samurai in rain, cinematic, neon-lit, moody, deep shadows --ar 9:16 --v 6.1 --s 500 --style raw",
    "luxury perfume bottle, product photography, marble surface, soft studio lighting --ar 4:5 --q 2",
  ],
}

// ─── ChatGPT (GPT Image) ─────────────────────────────────────────────────────
// Source: RAG/ChatGPT/Image Generation.md + GPT Image 1 Model Docs.md
const CHATGPT: PlatformKnowledge = {
  platform: "chatgpt",
  source: "Image Generation.md, GPT Image 1 Model Docs.md",
  promptStructure:
    "Complete descriptive paragraph: [subject + action] in [environment]. [Lighting]. [Style]. [Materials/textures]. [Color palette]. [Camera/composition]. [Mood].",
  parameters: [
    { flag: "size",    description: "Image dimensions", example: "1024x1024, 1792x1024, 1024x1792" },
    { flag: "quality", description: "Output quality",   example: "standard or hd" },
    { flag: "n",       description: "Number of images", example: "n=1 to 10" },
    { flag: "style",   description: "Style mode",       example: "vivid or natural" },
  ],
  bestPractices: [
    "Write in complete descriptive sentences, not keywords",
    "Describe materials and surface textures explicitly",
    "Specify camera angle and perspective",
    "Describe atmospheric conditions and mood",
    "Use natural language — avoid Midjourney-style keyword lists",
    "Be specific about colors, lighting direction, and quality",
    "Include rendering style (photorealistic, oil painting, etc.)",
    "Describe secondary elements and background in detail",
  ],
  avoid: [
    "Keyword stuffing without sentence structure",
    "Comma-separated lists (Midjourney style)",
    "Midjourney parameters (--ar, --v, --s)",
    "Overly technical jargon",
    "Contradictory descriptions",
    "Ambiguous or vague subject descriptions",
  ],
  styleKeywords: [
    "photorealistic", "oil on canvas", "watercolor painting", "digital illustration",
    "cinematic photography", "architectural visualization", "concept art",
    "pencil sketch", "anime style", "3D render", "editorial photography",
  ],
  qualityModifiers: [
    "ultra-high resolution", "photorealistic", "sharp details",
    "professional grade", "cinematic quality",
  ],
  examplePrompts: [
    "A photorealistic scene of a lone samurai standing in a rain-soaked alley at night. The neon signs reflect off the wet cobblestones, casting violet and amber light. The samurai's dark armor glistens with raindrops. Eye-level perspective, shallow depth of field, cinematic color grade.",
    "A luxury glass perfume bottle on a white marble surface. Soft studio lighting from the upper left. The bottle casts a long dramatic shadow. The glass has subtle blue-tinted reflections. Clean, minimal composition. Product photography style.",
  ],
}

// ─── Gemini (Google Vision) ──────────────────────────────────────────────────
// Source: RAG/Gemini/Prompting Strategies.md + Image Generation.md
const GEMINI: PlatformKnowledge = {
  platform: "gemini",
  source: "Prompting Strategies.md, Image Generation.md",
  promptStructure:
    "Labeled sections: Main Subject: | Scene Context: | Visual Elements: | Color Scheme: | Style Reference: | Composition: | Lighting: | Quality:",
  parameters: [],
  bestPractices: [
    "Use clear, specific instructions — be explicit about every detail",
    "Structure as labeled sections for best results",
    "Reference visual concepts with precise descriptive adjectives",
    "Specify composition guidelines explicitly (rule of thirds, centered, etc.)",
    "Describe intended mood and emotional tone",
    "Include specific style references",
    "Avoid ambiguous descriptions",
    "Layer details: primary subject, then environment, then lighting, then style",
  ],
  avoid: [
    "Ambiguous or vague descriptions",
    "Contradictory instructions",
    "Excessive parameters or technical flags",
    "Proprietary Midjourney/Flux syntax",
    "Short keyword-only lists without context",
  ],
  styleKeywords: [
    "photorealistic", "professional photography", "digital illustration",
    "cinematic", "editorial", "oil painting", "watercolor", "concept art",
    "minimalist design", "architectural visualization",
  ],
  qualityModifiers: [
    "ultra-high resolution", "photorealistic", "sharp details",
    "professional grade", "detailed rendering",
  ],
  examplePrompts: [
    "Main Subject: samurai warrior in traditional armor\nScene Context: rain-soaked urban alley at night\nVisual Elements: neon sign reflections on wet stone, dramatic rain effect\nColor Scheme: deep navy, charcoal, violet neon, amber light\nStyle Reference: cinematic photography, noir\nComposition: full body shot, eye-level angle\nLighting: mixed neon and practical ambient, low-key\nQuality: ultra-high resolution, professional grade",
  ],
}

// ─── Flux (Black Forest Labs) ────────────────────────────────────────────────
// Source: RAG/Flux/Prompting Guide.md + API Reference.md
const FLUX: PlatformKnowledge = {
  platform: "flux",
  source: "Prompting Guide.md, API Reference.md, Getting Started.md",
  promptStructure:
    "[subject + specific descriptors]. [Action/pose]. [Environment with detail]. [Style/medium]. [Lighting]. [Composition]. [Quality modifiers].",
  parameters: [
    { flag: "width",    description: "Image width in pixels",  example: "1024" },
    { flag: "height",   description: "Image height in pixels", example: "768" },
    { flag: "steps",    description: "Inference steps",        example: "28-50" },
    { flag: "guidance", description: "CFG guidance scale",     example: "3.5" },
  ],
  bestPractices: [
    "Use specific, precise adjectives — never vague descriptors",
    "Describe action and movement explicitly",
    "Specify exact style or medium (oil painting, DSLR photo, CGI render)",
    "Include quality modifiers at the end",
    "Be precise about composition (rule of thirds, centered, low angle)",
    "Describe secondary details and background texture",
    "Technical language works well — be exact",
    "State the subject first, then build outward",
  ],
  avoid: [
    "Vague descriptions (nice, beautiful, good)",
    "Contradictory styles",
    "Impossible compositions",
    "Unsupported API parameters in prompt text",
    "Overly long run-on sentences",
  ],
  styleKeywords: [
    "photorealistic DSLR photograph", "cinematic film still", "oil on canvas",
    "digital illustration", "concept art", "3D CGI render",
    "watercolor painting", "pencil sketch", "editorial photography",
  ],
  qualityModifiers: [
    "highly detailed", "sharp render", "no artifacts",
    "professional quality", "ultra-realistic",
  ],
  examplePrompts: [
    "Samurai warrior in rain. Subject: traditional Japanese samurai in lacquered black armor. Action: standing still, hand resting on katana hilt. Environment: dark urban alley, rain-soaked cobblestones, neon reflections. Style: cinematic photography. Lighting: low-key neon, mixed violet and amber. Composition: full body, eye-level. Quality: highly detailed, sharp render, no artifacts.",
  ],
}

// ─── Adobe Firefly ───────────────────────────────────────────────────────────
// Source: RAG/Firefly/Writing Effective Text Prompts.md (core extracted content)
const FIREFLY: PlatformKnowledge = {
  platform: "firefly",
  source: "Writing Effective Text Prompts.md, Generate Images with Text to Image.md",
  promptStructure:
    "Visual narrative: [subject doing action] in [setting]. [Lighting] creates [mood]. [Style] quality. [Color story]. [Composition focus]. [Quality level].",
  parameters: [
    { flag: "aspect_ratio",   description: "Aspect ratio of output",      example: "1:1, 4:3, 16:9, 9:16" },
    { flag: "content_type",   description: "Output content type",         example: "photo, art, graphic" },
    { flag: "style_strength", description: "Style intensity 1-150",       example: "75" },
  ],
  bestPractices: [
    "Use rich descriptive storytelling language",
    "Tell a visual story — describe what's happening",
    "Reference design styles: photorealistic, watercolor, oil painting, etc.",
    "Specify color relationships and palette mood",
    "Include mood descriptors that evoke emotion",
    "Be specific about quality expectations",
    "Describe the feeling and atmosphere, not just visual elements",
    "Firefly is trained on licensed Adobe Stock content — commercial-safe",
  ],
  avoid: [
    "Technical Midjourney-style parameters and flags",
    "Purely keyword-based lists without narrative",
    "Ambiguous composition descriptions",
    "Contradictory instructions",
    "Technical jargon that doesn't describe visuals",
  ],
  styleKeywords: [
    "photorealistic", "watercolor", "oil painting", "digital art",
    "cinematic", "graphic design", "vintage", "minimalist",
    "editorial photography", "concept art", "illustration",
  ],
  qualityModifiers: [
    "highly detailed", "professional quality",
    "rich detail", "vibrant colors",
  ],
  examplePrompts: [
    "A visual story of a lone samurai in the rain — a dark neon-lit alley where violet light creates a moody, dramatic atmosphere. The scene unfolds with cinematic photography quality, telling a narrative of solitude and strength. The color story flows through deep navy, charcoal, and violet neon, each hue balanced to support the noir emotional tone.",
  ],
}

// ─── Grok (xAI Vision) ──────────────────────────────────────────────────────
// Source: RAG/Grok/Image Generation.md + Image Understanding.md
const GROK: PlatformKnowledge = {
  platform: "grok",
  source: "Image Generation.md, Image Understanding.md",
  promptStructure:
    "Conversational description: Picture [subject] — [setting] where [lighting] creates [mood]. [Style]. [Color]. [Composition]. [Quality].",
  parameters: [
    { flag: "model",        description: "Image model to use",          example: "grok-imagine-image-quality" },
    { flag: "aspect_ratio", description: "Aspect ratio",                example: "16:9, 1:1, 4:3, auto" },
    { flag: "resolution",   description: "Output resolution",           example: "1k, 2k" },
  ],
  bestPractices: [
    "Use conversational, natural language",
    "Be specific but friendly in tone",
    "Describe visual concepts clearly",
    "Include style references",
    "Specify composition naturally",
    "Describe mood naturally — evocative language works well",
    "Use 'grok-imagine-image-quality' model for best results",
  ],
  avoid: [
    "Overly technical terms and jargon",
    "Rigid Midjourney-style parameters in the prompt",
    "Contradictory descriptions",
    "Overly long academic-style descriptions",
  ],
  styleKeywords: [
    "photorealistic", "cinematic", "digital art", "illustration",
    "photography", "oil painting", "concept art", "vintage",
  ],
  qualityModifiers: [
    "high quality", "detailed", "professional",
  ],
  examplePrompts: [
    "Picture this: a samurai in a rain-soaked alley where neon signs create that perfect moody, noir feel. The visual style is cinematic photography with deep navy and violet tones. The composition draws you right into the scene — full body, eye level. Distinctly dramatic atmosphere with professional quality.",
  ],
}

// ─── Exports ──────────────────────────────────────────────────────────────────

export const PLATFORM_KNOWLEDGE: Record<string, PlatformKnowledge> = {
  midjourney: MIDJOURNEY,
  chatgpt:    CHATGPT,
  gemini:     GEMINI,
  flux:       FLUX,
  firefly:    FIREFLY,
  grok:       GROK,
}

export function getKnowledge(platform: string): PlatformKnowledge | null {
  return PLATFORM_KNOWLEDGE[platform.toLowerCase()] ?? null
}

export function getPromptStructure(platform: string): string {
  return getKnowledge(platform)?.promptStructure ?? "natural language description"
}

export function getBestPractices(platform: string): string[] {
  return getKnowledge(platform)?.bestPractices ?? []
}

export function getParameters(platform: string): PlatformParameter[] {
  return getKnowledge(platform)?.parameters ?? []
}
