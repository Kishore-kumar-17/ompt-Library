// ─── Rule-Based Video Improver ──────────────────────────────────────────────────
// Enriches weak/vague video prompts using rule-based expansion — no API calls.
// Strategy: parse → detect gaps → inject motion/camera/setting detail → add locks.

import type { VideoImproveRequest, VideoRuleEngineResult } from "./types.js"
import { parseVideoPrompt } from "./parser.js"
import { expandCameraMove, expandLighting, expandSetting, expandColorGrade, expandSubject, getCameraNumericSpec } from "./context-expander.js"
import { NEGATIVE_LOCKS, CATEGORY_DEFAULTS, CATEGORY_OUTPUT_DEFAULTS } from "./dictionaries.js"
import { generateVideoLocks } from "./lock-generator.js"
import {
  buildRefsSection, buildExcludeSection,
  buildStyleSection, buildQualityTagSection, buildAudioSection, buildAspectRatioSection, buildDurationSection,
} from "./templates/narrative.js"
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
  // SUBJECT is always kept short (first few words) regardless of where a
  // comma happens to land in the input — deriving it from "everything up to
  // the first comma" broke down badly on long or already-structured pasted
  // text (e.g. a previous Improve result fed back in), where the first comma
  // can be hundreds of characters in, making SUBJECT swallow most of the
  // text. ACTION separately still carries the full input verbatim; the
  // formatter (formatForVideoPlatform) collapses the two back into one
  // clause when SUBJECT turns out to be a plain prefix of ACTION, so this
  // never prints the same words twice.
  const subjectShort = trimmedInput.split(/\s+/).slice(0, 8).join(" ").replace(/[,.:;]+$/, "")
  const subjectExp    = expandSubject(subjectShort) ?? subjectShort
  // Short anchor form (first clause) for repeated use inside LOCKS text —
  // keeps lock sentences readable even when the SUBJECT dictionary expands
  // subjectShort into a full descriptive clause.
  const subjectAnchor = subjectExp.split(",")[0].trim() || subjectExp
  // ACTION carries the literal input text — cap how much of it gets embedded
  // so a long, already-structured paste (e.g. this engine's own previous
  // output fed back in on a round-trip) can't balloon the result every time
  // it's improved again. A genuine action/motion description is a sentence
  // or two; well past that is far more likely to be prior generated output
  // than a fresh idea, and every SETTING/CAMERA/LIGHTING/STYLE section below
  // regenerates fresh regardless, so keeping the whole thing verbatim here
  // only duplicates content that's already represented elsewhere. Cutting at
  // the last full sentence (rather than a raw character cap) also keeps this
  // from slicing into a "Camera:"/"Lighting is…" sentence mid-way, which
  // would otherwise visibly overlap the freshly regenerated CAMERA/LIGHTING
  // lines right below it.
  const actionText = (() => {
    if (trimmedInput.length <= 280) return trimmedInput
    const capped = trimmedInput.slice(0, 280)
    const lastBoundary = Math.max(capped.lastIndexOf(". "), capped.lastIndexOf("! "), capped.lastIndexOf("? "))
    return lastBoundary > 40 ? capped.slice(0, lastBoundary + 1).trim() : capped.trim() + "…"
  })()
  const settingExp    = expandSetting(parsed.setting)       ?? parsed.setting  ?? DEFAULTS.setting
  const resolvedCameraMove = parsed.cameraMove ?? defaults.cameraMove
  const cameraSpec    = getCameraNumericSpec(resolvedCameraMove, req.platform)
  const cameraExpBase = expandCameraMove(resolvedCameraMove) ?? defaults.cameraMove
  const cameraExp     = cameraSpec ? `${cameraExpBase}, ${cameraSpec}` : cameraExpBase
  const lightingExp   = expandLighting(parsed.lighting)     ?? expandLighting(defaults.lighting) ?? defaults.lighting
  const gradeExp      = expandColorGrade(parsed.colorGrade) ?? DEFAULTS.grade

  const outputDefaults = CATEGORY_OUTPUT_DEFAULTS[cat] ?? CATEGORY_OUTPUT_DEFAULTS.narrative

  const lines: string[] = [
    `SUBJECT: ${subjectExp}`,
    `ACTION: ${actionText}`,
    `SETTING: ${settingExp}`,
    `CAMERA: ${cameraExp}`,
    `LIGHTING: ${lightingExp}`,
    `COLOR GRADE: ${gradeExp}`,
    buildStyleSection(outputDefaults.style),
    buildQualityTagSection(outputDefaults.qualityTag),
    buildAudioSection(outputDefaults.audio),
    buildAspectRatioSection(outputDefaults.aspectRatio),
    buildDurationSection(defaults.duration),
    buildRefsSection("cinematic"),
  ]

  const negatives = NEGATIVE_LOCKS[cat] ?? NEGATIVE_LOCKS.narrative
  lines.push(buildExcludeSection(negatives))

  const locks = generateVideoLocks(cat, subjectAnchor, {
    action: actionText,
    setting: parsed.setting,
    cameraMove: parsed.cameraMove,
  })
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
