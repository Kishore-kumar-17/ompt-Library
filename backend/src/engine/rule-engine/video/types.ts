// ─── Video Rule Engine Types ───────────────────────────────────────────────────
// Motion Formula v1.0 — zero-API deterministic video prompt construction.
// Unlike the image engine (which locks static geometry/color), video prompting
// fails on TEMPORAL consistency: identity drift, unnatural motion, morphing,
// camera arcs that don't match the described action. Locks here pin motion and
// continuity across the clip's duration, not a single frame's composition.

export type VideoCategory = "narrative" | "product" | "nature" | "action" | "abstract"

export type VideoPlatformKey = "kling" | "sora" | "runway" | "pika" | "luma" | "veo" | "seedance" | "higgsfield"

export interface VideoBuildRequest {
  category: VideoCategory
  subject?: string
  action?: string
  setting?: string
  cameraMove?: string
  lighting?: string
  colorGrade?: string
  mood?: string
  extraNotes?: string
  platform: VideoPlatformKey
}

export interface VideoImproveRequest {
  promptText: string
  platform: VideoPlatformKey
  category?: VideoCategory
}

export interface ParsedVideoPrompt {
  detectedCategory: VideoCategory
  subject: string | null
  action: string | null
  setting: string | null
  cameraMove: string | null
  lighting: string | null
  colorGrade: string | null
  missingComponents: string[]
  originalWords: string[]
}

export interface VideoLockValues {
  motionSpeed: string
  motionDirection: string
  cameraMoveType: string
  cameraStart: string
  cameraEnd: string
  beginState: string
  endState: string
  identityAnchor: string
}

export interface VideoRuleEngineResult {
  prompt: string
  platform: VideoPlatformKey
  category: VideoCategory
  score: number
  components: {
    subject: boolean
    action: boolean
    setting: boolean
    cameraMove: boolean
    lighting: boolean
    colorGrade: boolean
    locks: boolean
  }
  locks: {
    continuity: string
    motion: string
    camera: string
    temporal: string
  }
  negatives: string[]
  wordCount: number
  engine: "rule-based"
}

export interface VideoCategoryTemplate {
  name: string
  sections: string[]
  defaultCameraMove: string
  defaultLighting: string
  defaultDuration: string
}
