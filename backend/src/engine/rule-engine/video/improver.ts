// ─── Rule-Based Video Improver ──────────────────────────────────────────────────
// Enriches weak/vague video prompts using rule-based expansion — no API calls.
// Strategy: parse → detect gaps → inject motion/camera/setting detail → add locks.

import type { VideoImproveRequest, VideoRuleEngineResult } from "./types.js"
import { parseVideoPrompt } from "./parser.js"
import { expandCameraMove, expandLighting, expandSetting, expandColorGrade } from "./context-expander.js"
import { NEGATIVE_LOCKS, CATEGORY_DEFAULTS } from "./dictionaries.js"
import { generateVideoLocks } from "./lock-generator.js"
import { buildRefsSection, buildExcludeSection } from "./templates/narrative.js"
import { formatForVideoPlatform } from "./formatter.js"
import { scoreVideoPrompt } from "./validator.js"

const DEFAULTS = {
  setting:  "a clearly defined environment with visible time-of-day and background detail",
  camera:   "steady tracking shot, medium framing",
  lighting: "natural motivated lighting matching the scene's time of day",
  grade:    "natural neutral grading with balanced contrast",
}

export function improveVideoWithRules(req: VideoImproveRequest): VideoRuleEngineResult {
  const parsed = parseVideoPrompt(req.promptText)
  const cat = req.category ?? parsed.detectedCategory
  const defaults = CATEGORY_DEFAULTS[cat] ?? CATEGORY_DEFAULTS.narrative

  const trimmedInput = req.promptText.trim()
  const firstClause = parsed.subject ?? trimmedInput.split(/[,\n]/)[0].trim()
  // When the input is one unbroken clause (no comma), the "subject" the
  // parser extracts is the whole sentence — use a short leading phrase
  // instead so SUBJECT and ACTION don't repeat the same text verbatim.
  const subject = firstClause === trimmedInput
    ? trimmedInput.split(/\s+/).slice(0, 6).join(" ")
    : firstClause
  const settingExp  = expandSetting(parsed.setting)       ?? parsed.setting  ?? DEFAULTS.setting
  const cameraExp   = expandCameraMove(parsed.cameraMove) ?? expandCameraMove(defaults.cameraMove) ?? defaults.cameraMove
  const lightingExp = expandLighting(parsed.lighting)     ?? expandLighting(defaults.lighting) ?? defaults.lighting
  const gradeExp    = expandColorGrade(parsed.colorGrade) ?? DEFAULTS.grade

  const lines: string[] = [
    `SUBJECT: ${subject}`,
    `ACTION: ${trimmedInput}`,
    `SETTING: ${settingExp}`,
    `CAMERA: ${cameraExp}`,
    `LIGHTING: ${lightingExp}`,
    `COLOR GRADE: ${gradeExp}`,
    buildRefsSection("cinematic"),
  ]

  const negatives = NEGATIVE_LOCKS[cat] ?? NEGATIVE_LOCKS.narrative
  lines.push(buildExcludeSection(negatives))

  const locks = generateVideoLocks(cat, subject)
  lines.push(locks.motion, locks.camera, locks.temporal, locks.continuity)

  const rawImproved = lines.join("\n\n")
  const formatted = formatForVideoPlatform(rawImproved, req.platform, locks)
  const score = scoreVideoPrompt(rawImproved)

  return {
    prompt: formatted,
    platform: req.platform,
    category: cat,
    score,
    components: {
      subject: true, action: true, setting: true,
      cameraMove: true, lighting: true, colorGrade: true, locks: true,
    },
    locks,
    negatives,
    wordCount: formatted.split(/\s+/).filter(Boolean).length,
    engine: "rule-based",
  }
}
