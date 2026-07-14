// ─── Rule Engine Types ─────────────────────────────────────────────────────────
// All types for zero-API rule-based prompt building and improvement.

// ─── Scene JSON (intermediate representation from D:\prompt engine) ──────────
// Canonical structured representation of any idea/scene, used as the pipeline
// intermediate between raw text and platform-specific prompt output.
export interface SceneJSON {
  subject: {
    primary: string
    secondary: string[]
    pose: string
  }
  environment: {
    type: "indoor" | "outdoor" | "abstract" | "studio" | "mixed"
    setting: string
    scale: "intimate" | "medium" | "expansive"
  }
  composition: {
    layout: string
    focal_point: string
    depth: "shallow" | "moderate" | "deep"
  }
  color_palette: {
    dominant: string[]
    accent: string[]
    mood: "warm" | "cool" | "neutral" | "vibrant" | "desaturated"
  }
  lighting: {
    type: "natural" | "artificial" | "mixed"
    direction: string
    quality: "hard" | "soft" | "diffused"
    intensity: "bright" | "moderate" | "dim"
  }
  style: {
    artistic: string
    period: "contemporary" | "vintage" | "timeless" | "futuristic"
    aesthetic: string
  }
  atmosphere: {
    mood: string
    tone: "serious" | "whimsical" | "dramatic" | "peaceful" | "energetic"
  }
  technical: {
    camera_angle: string
    perspective: string
    quality_level: "concept" | "draft" | "professional" | "cinematic"
  }
}

export type RuleEngineCategory = "people" | "fashion" | "product" | "art" | "social"

export type PlatformKey = "chatgpt" | "gemini" | "midjourney" | "flux" | "firefly" | "grok"

export interface RuleEngineBuildRequest {
  category: RuleEngineCategory
  subject?: string
  wardrobe?: string
  setting?: string
  lighting?: string
  camera?: string
  handPosition?: string
  style?: string
  palette?: string
  extraNotes?: string
  platform: PlatformKey
}

export interface RuleEngineImproveRequest {
  promptText: string
  platform: PlatformKey
  category?: RuleEngineCategory
}

export interface ParsedPrompt {
  detectedCategory: RuleEngineCategory
  subject: string | null
  wardrobe: string | null
  setting: string | null
  lighting: string | null
  camera: string | null
  handPosition: string | null
  style: string | null
  palette: string | null
  missingComponents: string[]
  originalWords: string[]
}

export interface LockValues {
  facingAngle: number
  headAngle: number
  symmetry: number
  repeatedDetails: number
  verticalAngle: number
  cameraPosition: string
  primaryX: number
  primaryY: number
  secondaryX: number
  secondaryY: number
  border: number
  negativeSpace: number
  ar: string
  colorTemp: number
  lightAltitude: number
  lightAzimuth: number
  shadowFeather: number
  contrast: string
  specular: number
  handLock: string | null
}

export interface RuleEngineResult {
  prompt: string
  platform: PlatformKey
  category: RuleEngineCategory
  score: number
  components: {
    subject: boolean
    wardrobe: boolean
    setting: boolean
    lighting: boolean
    camera: boolean
    handPosition: boolean
    locks: boolean
  }
  locks: {
    orientation: string
    framing: string
    light: string
    hand: string | null
  }
  negatives: string[]
  wordCount: number
  engine: "rule-based"
}

export interface CategoryTemplate {
  name: string
  sections: string[]
  lockProfile: string
  defaultCamera: string
  defaultLighting: string
  hasHandLock: boolean
}
