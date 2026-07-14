// ─── Engine-Driven Prompt Generator ───────────────────────────────────────────
// Builds platform-optimised prompts from a raw idea using engine definitions.
// Zero API calls — purely deterministic, driven by engine JSON + dictionaries.

import { getEngine } from "../engines/index.js"
import { getKnowledge } from "../rag/knowledge.js"
import type { PlatformKey, SceneJSON } from "./types.js"

// ─── Idea Parser ──────────────────────────────────────────────────────────────

interface ParsedIdea {
  raw: string
  subject: string
  setting: string
  lighting: string
  mood: string
  style: string
  colors: string
  composition: string
  action: string
  quality: string
  aspect: string
}

// Keyword → rich value maps for intelligent expansion
const SETTING_MAP: Record<string, string> = {
  "sea":        "coastal seashore where ocean meets sandy beach",
  "shore":      "scenic shoreline with waves and sandy beach",
  "beach":      "expansive sandy beach with ocean backdrop",
  "ocean":      "vast open ocean with deep blue water",
  "forest":     "lush forest with towering trees and dappled light",
  "mountain":   "dramatic mountain landscape with rocky peaks",
  "city":       "vibrant urban cityscape with streets and buildings",
  "street":     "atmospheric urban street with architectural details",
  "desert":     "vast arid desert landscape with sand dunes",
  "field":      "open meadow or pastoral countryside",
  "garden":     "lush garden with flowers and greenery",
  "studio":     "professional photography studio with controlled environment",
  "interior":   "elegant interior space with architectural details",
  "rooftop":    "urban rooftop with city skyline backdrop",
  "waterfall":  "dramatic waterfall cascading into misty pool",
  "lake":       "serene lake with mirror-like water surface",
  "night":      "atmospheric nighttime environment with ambient light",
  "sunset":     "dramatic sunset landscape with golden sky",
  "sunrise":    "tranquil sunrise with soft pastel sky",
  "rain":       "rain-soaked environment with wet reflective surfaces",
  "snow":       "winter landscape blanketed in pristine snow",
}

const LIGHTING_MAP: Record<string, string> = {
  "sunshine":     "warm golden natural sunlight, 3200-3500K, soft directional rays",
  "sun":          "natural sunlight, warm golden quality, bright and clear",
  "golden hour":  "magical golden hour light, 3000-3400K, low angle warm rays",
  "sunset":       "dramatic sunset lighting, deep orange and amber tones",
  "sunrise":      "soft pastel sunrise light, gentle warm glow on horizon",
  "moonlight":    "cool silver moonlight, 6500K, soft ambient nocturnal glow",
  "overcast":     "soft diffused overcast daylight, 6500K, even shadowless illumination",
  "dramatic":     "dramatic chiaroscuro lighting, strong contrast, deep shadows",
  "neon":         "vibrant neon urban lighting, mixed colour spill",
  "candlelight":  "warm intimate candlelight, 1800-2200K, flickering amber glow",
  "studio":       "professional studio strobe, 5600K, octabox key light",
  "natural":      "soft natural ambient light, even and flattering",
  "backlit":      "strong rim backlighting creating silhouette edge separation",
  "soft":         "large-format diffused soft light, gentle gradual shadows",
  "morning":      "fresh morning light, 5200K, gentle directional warmth",
  "night":        "nighttime ambient, mixed artificial light sources",
  "dark":         "low-key dramatic darkness with selective subject illumination",
  "bright":       "bright high-key illumination, 5500K, clean and airy",
}

const MOOD_MAP: Record<string, string> = {
  "peaceful":     "serene, tranquil, contemplative, calm",
  "dramatic":     "powerful, intense, emotionally charged, striking",
  "mysterious":   "enigmatic, atmospheric, intriguing, shadowy",
  "romantic":     "intimate, warm, tender, dreamy",
  "energetic":    "dynamic, vibrant, lively, full of movement",
  "melancholic":  "wistful, bittersweet, quietly emotional, reflective",
  "epic":         "grand, awe-inspiring, cinematic, monumental",
  "nostalgic":    "warm, vintage, memory-laden, timeless",
  "futuristic":   "sleek, innovative, forward-looking, sci-fi",
  "dark":         "brooding, moody, noir, atmospheric",
  "happy":        "joyful, uplifting, bright, cheerful",
  "ethereal":     "dreamlike, otherworldly, soft, magical",
  "minimal":      "clean, restrained, elegant, focused",
  "surreal":      "dreamlike, unexpected, imaginative, uncanny",
}

const STYLE_MAP: Record<string, string> = {
  "cinematic":        "cinematic photography, film-quality colour grade, anamorphic lens quality",
  "photorealistic":   "photorealistic, hyperdetailed, camera-quality rendering",
  "editorial":        "editorial photography style, magazine-quality, professional colour grade",
  "oil painting":     "traditional oil on canvas, painterly brushwork, rich colour depth",
  "watercolor":       "soft watercolour wash, transparent layers, delicate paper texture",
  "illustration":     "detailed illustration, clean linework, graphic design quality",
  "anime":            "anime art style, cel-shaded, vibrant colours, expressive",
  "vintage":          "vintage film photography, aged patina, warm faded tones",
  "minimalist":       "minimal clean composition, negative space, refined simplicity",
  "3d render":        "high-quality 3D render, ray-traced lighting, photorealistic CGI",
  "sketch":           "detailed pencil sketch, cross-hatching, expressive linework",
  "abstract":         "abstract expressionist style, bold colour fields, non-representational",
  "dark moody":       "dark and moody, low-key, rich contrast, atmospheric depth",
  "vibrant":          "vibrant saturated colours, high contrast, bold visual impact",
  "hyperrealistic":   "hyperrealistic detail, photorealistic texture, lifelike rendering",
  "neon":             "neon-lit cyberpunk aesthetic, vivid light spill, dark atmosphere",
}

const COLOR_MAP: Record<string, string> = {
  "golden":     "warm golden yellow #D4A017, amber #C87C2A, rich ochre",
  "blue":       "ocean blue #1A6B9A, deep navy #0A1E3D, cerulean #2980B9",
  "sunset":     "deep orange #E8610A, coral #F0705A, warm pink #E8A89C",
  "green":      "forest green #2D6A4F, sage #87A878, emerald #1B6B3A",
  "red":        "deep crimson #8B1A1A, warm red #C0392B, ruby #96281B",
  "purple":     "rich violet #6C3483, lavender #967BB6, deep plum #4A235A",
  "neutral":    "warm white #FAF7F2, stone grey #8A8A8A, charcoal #3D3D3D",
  "monochrome": "pure black #0A0A0A, mid-grey #8A8A8A, silver #C4C4C4",
  "warm":       "warm amber #C97C2A, ivory #F5E6D3, caramel #7B5230",
  "cool":       "cool blue #1B2A4A, silver #C0C4CC, slate grey #6B7A8D",
}

const COMPOSITION_MAP: Record<string, string> = {
  "wide":         "wide panoramic composition, sweeping horizontal view, full environment context",
  "portrait":     "vertical portrait composition, subject centred, 2:3 aspect ratio",
  "close-up":     "intimate close-up, subject fills frame, shallow depth of field",
  "rule of thirds": "rule-of-thirds grid alignment, dynamic off-centre balance",
  "symmetrical":  "balanced symmetrical composition, strong central axis",
  "aerial":       "aerial bird's-eye view, overhead perspective, map-like composition",
  "low angle":    "dramatic low-angle perspective, subject looms heroically upward",
  "high angle":   "high-angle overhead view, subject appears smaller, environment emphasized",
  "environmental": "environmental framing, subject within rich contextual setting",
  "landscape":    "wide landscape format, horizon line visible, vast spatial depth",
  "macro":        "extreme macro detail, microscopic perspective, intricate texture focus",
}

// ─── Idea Parser ──────────────────────────────────────────────────────────────

function expandFromMap(text: string, map: Record<string, string>): string | null {
  const lower = text.toLowerCase()
  for (const [key, val] of Object.entries(map)) {
    if (lower.includes(key)) return val
  }
  return null
}

function inferColors(idea: string): string {
  const explicit = expandFromMap(idea, COLOR_MAP)
  if (explicit) return explicit
  // Infer from setting/lighting context
  if (/sun|gold|warm|beach|desert|autumn/i.test(idea)) return "warm golden #D4A017, amber #C87C2A, sandy beige #D4B896"
  if (/sea|ocean|water|sky|blue/i.test(idea)) return "ocean blue #1A6B9A, deep navy #0A2040, sky blue #87CEEB"
  if (/night|dark|moon/i.test(idea)) return "deep navy #0A1628, charcoal #2C2C2C, silver #C0C4CC"
  if (/forest|nature|green/i.test(idea)) return "forest green #2D6A4F, earthy brown #5D4037, soft ivory #F5F0E8"
  if (/snow|winter|ice/i.test(idea)) return "pure white #FAFAFA, pale blue #B8D4E8, silver-grey #C8D0D8"
  return "balanced natural palette with complementary tones appropriate to the scene"
}

function inferComposition(idea: string, platform: string): string {
  if (/landscape|sea|mountain|desert|field|wide/i.test(idea)) return "wide panoramic landscape composition, horizon centred"
  if (/portrait|person|face|man|woman/i.test(idea)) return "vertical portrait composition, subject fills upper two-thirds of frame"
  if (/product|bottle|watch|object/i.test(idea)) return "centred product composition, subject on clean surface, 45° three-quarter angle"
  if (/close|macro|detail/i.test(idea)) return "tight close-up composition, subject fills frame entirely"
  if (platform === "midjourney") return "dynamic composition with strong visual hierarchy, rule-of-thirds alignment"
  return "balanced compositional framing with clear subject hierarchy"
}

function inferAspect(idea: string, platform: string): string {
  if (/landscape|wide|panorama|sea|mountain|city/i.test(idea)) return "16:9"
  if (/portrait|person|vertical/i.test(idea)) return "2:3"
  if (/square|product/i.test(idea)) return "1:1"
  if (platform === "midjourney") return "16:9"
  return "16:9"
}

export function parseIdea(raw: string, platform: string): ParsedIdea {
  const lower = raw.toLowerCase()

  // Subject: first meaningful clause
  const subject = raw.split(/\s*[,\n]\s*/)[0].trim() || raw.trim()

  // Setting
  const setting = expandFromMap(raw, SETTING_MAP)
    ?? (lower.includes("outdoor") || lower.includes("outside") ? "outdoor natural environment"
      : lower.includes("indoor") || lower.includes("inside") ? "indoor interior space"
      : `${subject} in a fitting atmospheric environment`)

  // Lighting
  const lighting = expandFromMap(raw, LIGHTING_MAP)
    ?? (lower.includes("dark") ? "dramatic low-key lighting with selective illumination"
      : lower.includes("bright") ? "bright high-key natural daylight"
      : "soft natural ambient lighting, balanced and flattering")

  // Mood
  const mood = expandFromMap(raw, MOOD_MAP)
    ?? (lower.includes("dramatic") ? "dramatic and powerful"
      : lower.includes("peaceful") || lower.includes("calm") ? "serene and tranquil"
      : lower.includes("dark") ? "brooding and atmospheric"
      : "evocative and visually engaging")

  // Style
  const style = expandFromMap(raw, STYLE_MAP)
    ?? "photorealistic, high-quality photography, professional colour grade"

  // Colors
  const colors = inferColors(raw)

  // Composition
  const composition = inferComposition(raw, platform)

  // Action / pose
  const action = lower.includes("running") || lower.includes("walking") || lower.includes("flying") || lower.includes("falling")
    ? `dynamic motion — ${subject}`
    : lower.includes("standing") || lower.includes("sitting") ? `static poised — ${subject}`
    : "naturally positioned in scene"

  // Quality
  const quality = platform === "midjourney"
    ? "high quality, professional output"
    : "ultra-high resolution, photorealistic, sharp details, professional grade"

  // Aspect ratio
  const aspect = inferAspect(raw, platform)

  return { raw, subject, setting, lighting, mood, style, colors, composition, action, quality, aspect }
}

// ─── Scene JSON Builder ───────────────────────────────────────────────────────
// Converts raw idea text into the structured SceneJSON intermediate representation
// (ported from D:\prompt engine\vision-analyzer.js, text-based rather than image-based).

export function analyzeIdeaToScene(raw: string, platform = "chatgpt"): SceneJSON {
  const p = parseIdea(raw, platform)
  const lower = raw.toLowerCase()

  // environment type
  const envType: SceneJSON["environment"]["type"] =
    /studio/i.test(raw) ? "studio"
    : /indoor|inside|interior|room/i.test(raw) ? "indoor"
    : /outdoor|outside|nature|landscape|street|beach|forest|mountain/i.test(raw) ? "outdoor"
    : /abstract|fantasy|surreal/i.test(raw) ? "abstract"
    : "outdoor"

  // environment scale
  const envScale: SceneJSON["environment"]["scale"] =
    /close|macro|detail|intimate|portrait/i.test(raw) ? "intimate"
    : /wide|landscape|panorama|vast|expansive/i.test(raw) ? "expansive"
    : "medium"

  // composition depth
  const compDepth: SceneJSON["composition"]["depth"] =
    /bokeh|shallow|blur|close-up/i.test(raw) ? "shallow"
    : /landscape|wide|deep|environmental/i.test(raw) ? "deep"
    : "moderate"

  // color palette mood
  const paletteMood: SceneJSON["color_palette"]["mood"] =
    /warm|golden|sunset|orange|amber/i.test(raw) ? "warm"
    : /cool|blue|night|silver|cold/i.test(raw) ? "cool"
    : /vibrant|neon|colorful|bright|vivid/i.test(raw) ? "vibrant"
    : /monochrome|grey|black|minimal/i.test(raw) ? "desaturated"
    : "neutral"

  // dominant colors (extract from p.colors which has hex values)
  const colorParts = p.colors.split(",").map(c => c.split("#")[0].trim()).filter(Boolean)
  const dominant = colorParts.slice(0, 2)
  const accent = colorParts.slice(2, 3)

  // lighting type
  const lightType: SceneJSON["lighting"]["type"] =
    /studio|flash|strobe|artificial|neon/i.test(raw) ? "artificial"
    : /natural|sun|daylight|overcast/i.test(raw) ? "natural"
    : "mixed"

  // lighting quality
  const lightQuality: SceneJSON["lighting"]["quality"] =
    /soft|diffused|overcast|fill/i.test(raw) ? "soft"
    : /hard|dramatic|harsh/i.test(raw) ? "hard"
    : "diffused"

  // lighting intensity
  const lightIntensity: SceneJSON["lighting"]["intensity"] =
    /bright|high-key|harsh|noon/i.test(raw) ? "bright"
    : /dark|low-key|dim|night|shadow/i.test(raw) ? "dim"
    : "moderate"

  // style period
  const stylePeriod: SceneJSON["style"]["period"] =
    /vintage|retro|old|classic/i.test(raw) ? "vintage"
    : /future|sci-fi|cyberpunk|tech/i.test(raw) ? "futuristic"
    : /timeless|elegant|classic/i.test(raw) ? "timeless"
    : "contemporary"

  // atmosphere tone
  const atmTone: SceneJSON["atmosphere"]["tone"] =
    /dramatic|intense/i.test(lower) ? "dramatic"
    : /peaceful|calm|serene/i.test(lower) ? "peaceful"
    : /energetic|dynamic|vibrant/i.test(lower) ? "energetic"
    : /whimsical|playful|fun/i.test(lower) ? "whimsical"
    : "serious"

  // quality level
  const qualityLevel: SceneJSON["technical"]["quality_level"] =
    /cinematic|film/i.test(raw) ? "cinematic"
    : /professional|editorial|studio/i.test(raw) ? "professional"
    : /sketch|draft|rough/i.test(raw) ? "draft"
    : "professional"

  // camera angle
  const cameraAngle =
    /low angle|below|upward/i.test(raw) ? "low angle looking up"
    : /high angle|overhead|aerial|bird/i.test(raw) ? "high angle overhead"
    : /side|profile/i.test(raw) ? "side profile"
    : "straight on, eye level"

  // perspective
  const perspective =
    /aerial|bird|top-down/i.test(raw) ? "aerial"
    : /wide|panorama/i.test(raw) ? "wide angle"
    : "one-point"

  return {
    subject: {
      primary: p.subject,
      secondary: [],
      pose: p.action,
    },
    environment: {
      type: envType,
      setting: p.setting,
      scale: envScale,
    },
    composition: {
      layout: p.composition,
      focal_point: p.subject,
      depth: compDepth,
    },
    color_palette: {
      dominant: dominant.length ? dominant : ["natural tones"],
      accent: accent.length ? accent : [],
      mood: paletteMood,
    },
    lighting: {
      type: lightType,
      direction: /backlit|back light/i.test(raw) ? "from behind" : /side/i.test(raw) ? "side" : "front-diagonal",
      quality: lightQuality,
      intensity: lightIntensity,
    },
    style: {
      artistic: p.style.split(",")[0].trim(),
      period: stylePeriod,
      aesthetic: p.style.split(",").slice(1).join(",").trim() || p.style.split(",")[0].trim(),
    },
    atmosphere: {
      mood: p.mood,
      tone: atmTone,
    },
    technical: {
      camera_angle: cameraAngle,
      perspective,
      quality_level: qualityLevel,
    },
  }
}

// ─── Component Builders (per engine required_components) ─────────────────────

function buildChatGPTPrompt(p: ParsedIdea): string {
  return `A ${p.style} depicting ${p.subject}. The scene is set in ${p.setting}, bathed in ${p.lighting}. The overall mood is ${p.mood}, with a sense of visual narrative and depth. The composition follows ${p.composition}, drawing the viewer's eye naturally through the frame. The colour palette features ${p.colors}. Camera perspective: eye-level, slightly elevated, with natural perspective rendering. Material textures are rendered with precise surface detail — every surface has authentic roughness, reflectivity, and grain. The atmosphere is rich with ${p.mood} energy, capturing a definitive moment of ${p.raw} with cinematic quality.`
}

function buildGeminiPrompt(p: ParsedIdea): string {
  return [
    `Main Subject: ${p.subject}`,
    `Scene Context: ${p.setting}`,
    `Visual Elements: ${p.lighting} illuminating the scene, ${p.action}, rich environmental detail throughout`,
    `Color Scheme: ${p.colors}`,
    `Style Reference: ${p.style}`,
    `Composition: ${p.composition}`,
    `Lighting Approach: ${p.lighting}`,
    `Quality Level: ${p.quality}`,
  ].join("\n")
}

function buildMidjourneyPrompt(p: ParsedIdea): string {
  // Per RAG docs: subject, style, environment, lighting, color, mood — then ALL params at end
  const knowledge = getKnowledge("midjourney")
  const styleRef = knowledge?.styleKeywords.find(s =>
    p.style.toLowerCase().includes(s.toLowerCase().split(" ")[0])
  ) ?? p.style.split(",")[0].trim()

  const keywords = [
    p.subject,
    styleRef,
    p.setting.split(",")[0].trim(),
    p.lighting.split(",")[0].trim(),
    `${p.mood.split(",")[0].trim()} mood`,
    p.colors.split(",")[0].trim(),
    "highly detailed",
  ].filter(Boolean).join(", ")

  // Canonical MJ parameter order from docs: --ar --v --s --q --style
  return `${keywords} --ar ${p.aspect} --v 6.1 --s 750 --q 2 --style raw`
}

function buildFluxPrompt(p: ParsedIdea): string {
  // Per RAG docs: subject first, then action, environment, style, lighting, composition, quality
  const action = p.action.includes("naturally positioned") ? "posed naturally in scene" : p.action
  return [
    `${p.subject}.`,
    `Subject: ${p.subject} captured with precise technical detail.`,
    `Action: ${action}.`,
    `Environment: ${p.setting}.`,
    `Style: ${p.style.split(",")[0].trim()}.`,
    `Lighting: ${p.lighting.split(",")[0].trim()}.`,
    `Composition: ${p.composition.split(",")[0].trim()}.`,
    `Quality: ${p.quality}, sharp render, no artifacts.`,
    `Color palette: ${p.colors.split(",")[0].trim()}.`,
  ].join(" ")
}

function buildFireflyPrompt(p: ParsedIdea): string {
  // Per RAG docs: visual storytelling narrative — subject, setting, lighting, mood, style, color story, composition
  const lightShort = p.lighting.split(",")[0].trim()
  const colorShort = p.colors.split(",").slice(0, 2).join(",").trim()
  return `A visual story of ${p.subject} — ${p.setting} where ${lightShort} creates a ${p.mood.split(",")[0].trim()} atmosphere. The scene unfolds with ${p.style.split(",")[0].trim()} quality, telling a narrative of natural beauty and visual harmony. The colour story flows through ${colorShort}, each hue carefully balanced to support the ${p.mood.split(",")[0].trim()} emotional tone. The composition is ${p.composition.split(",")[0].trim()}, focusing attention on what matters most. ${p.quality}, richly detailed, evoking a strong sense of place and emotion.`
}

function buildGrokPrompt(p: ParsedIdea): string {
  // Per RAG docs: conversational, specific but friendly, natural dialogue
  const lightFirst = p.lighting.split(",")[0].trim()
  const colorFirst = p.colors.split(",")[0].trim()
  const styleFirst = p.style.split(",")[0].trim()
  const compFirst  = p.composition.split(",")[0].trim()
  return `Picture this: ${p.subject} — ${p.setting} where the ${lightFirst} creates that perfect ${p.mood.split(",")[0].trim()} feel. The visual style is ${styleFirst}, with ${colorFirst} tones setting the atmosphere. The composition is ${compFirst}, drawing you right into the scene. It has a distinctly ${p.mood.split(",")[0].trim()} quality with superb ${p.quality.split(",")[0].trim()} rendering.`
}

// ─── Main Generator ───────────────────────────────────────────────────────────

export interface GeneratedPrompt {
  prompt: string
  platform: string
  engineName: string
  philosophy: string
  components: string[]
  wordCount: number
}

export function generatePrompt(idea: string, platform: PlatformKey): GeneratedPrompt {
  const engine = getEngine(platform)
  const parsed = parseIdea(idea, platform)

  let prompt: string

  switch (platform) {
    case "chatgpt":    prompt = buildChatGPTPrompt(parsed);    break
    case "gemini":     prompt = buildGeminiPrompt(parsed);     break
    case "midjourney": prompt = buildMidjourneyPrompt(parsed); break
    case "flux":       prompt = buildFluxPrompt(parsed);       break
    case "firefly":    prompt = buildFireflyPrompt(parsed);    break
    case "grok":       prompt = buildGrokPrompt(parsed);       break
    default:           prompt = buildChatGPTPrompt(parsed);    break
  }

  return {
    prompt,
    platform,
    engineName:  engine?.name ?? platform,
    philosophy:  engine?.philosophy ?? "natural language",
    components:  engine ? extractComponents(engine.systemPrompt) : [],
    wordCount:   prompt.split(/\s+/).filter(Boolean).length,
  }
}

// Extract the required_components list from the system prompt text
function extractComponents(systemPrompt: string): string[] {
  const match = systemPrompt.match(/## Required Components[\s\S]*?(?=##|$)/)
  if (!match) return []
  return match[0]
    .split("\n")
    .filter(l => l.trim().startsWith("-"))
    .map(l => l.replace(/^-\s*/, "").trim())
    .filter(Boolean)
}
