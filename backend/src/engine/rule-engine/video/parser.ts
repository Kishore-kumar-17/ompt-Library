// ─── Video Prompt Parser ───────────────────────────────────────────────────────
// Keyword extraction from raw user input — no AI, no API.

import type { ParsedVideoPrompt, VideoCategory } from "./types.js"
import { findFirstMatch, detectCategoryByScore } from "../keyword-utils.js"

const CATEGORY_KEYWORDS: Record<VideoCategory, string[]> = {
  narrative: ["person", "man", "woman", "character", "walking", "talking", "story", "scene", "actor"],
  product:   ["product", "bottle", "watch", "device", "package", "showcase", "unboxing", "rotate"],
  nature:    ["landscape", "forest", "ocean", "mountain", "nature", "sky", "clouds", "sunset", "wildlife"],
  action:    ["running", "jumping", "fighting", "sports", "chase", "explosion", "fast", "racing", "stunt"],
  abstract:  ["abstract", "motion graphics", "particles", "morph", "transform", "geometric", "fluid simulation"],
}

const CAMERA_MOVE_KEYWORDS = ["dolly in", "dolly out", "truck left", "truck right", "pan", "tilt up", "tilt down", "crane up", "crane down", "arc", "orbit", "static", "handheld", "steadicam", "push in", "pull out", "whip pan"]
const LIGHTING_KEYWORDS = ["golden hour", "blue hour", "overcast", "harsh midday", "neon night", "practical interior", "moonlight", "storm light", "firelight", "studio soft"]
const COLOR_GRADE_KEYWORDS = ["teal orange", "kodak print", "bleach bypass", "cool blue", "warm sepia", "high contrast noir", "pastel dreamlike", "natural neutral"]
const SETTING_KEYWORDS = ["urban street", "forest", "ocean", "desert", "interior office", "mountain", "space", "underwater"]

function detectCategory(text: string): VideoCategory {
  return detectCategoryByScore(text, CATEGORY_KEYWORDS, "narrative")
}

function getMissingComponents(parsed: Partial<ParsedVideoPrompt>, category: VideoCategory): string[] {
  const required: Record<VideoCategory, string[]> = {
    narrative: ["subject", "action"],
    product:   ["subject", "cameraMove"],
    nature:    ["setting", "lighting"],
    action:    ["subject", "action"],
    abstract:  ["subject"],
  }
  return (required[category] ?? []).filter((field) => !parsed[field as keyof typeof parsed])
}

export function parseVideoPrompt(raw: string): ParsedVideoPrompt {
  const words = raw.trim().split(/\s+/)
  const category = detectCategory(raw)

  const parsed: ParsedVideoPrompt = {
    detectedCategory: category,
    subject:    raw.length > 5 ? raw.split(/[,\n]/)[0].trim() : null,
    action:     null,
    setting:    findFirstMatch(raw, SETTING_KEYWORDS),
    cameraMove: findFirstMatch(raw, CAMERA_MOVE_KEYWORDS),
    lighting:   findFirstMatch(raw, LIGHTING_KEYWORDS),
    colorGrade: findFirstMatch(raw, COLOR_GRADE_KEYWORDS),
    missingComponents: [],
    originalWords: words,
  }

  parsed.missingComponents = getMissingComponents(parsed, category)
  return parsed
}
