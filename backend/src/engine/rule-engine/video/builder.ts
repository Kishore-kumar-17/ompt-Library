// ─── Rule-Based Video Builder ───────────────────────────────────────────────────
// Assembles a complete structured video prompt from user selections.
// Zero API calls — Motion Formula v1.0 assembly only.

import type { VideoBuildRequest, VideoRuleEngineResult } from "./types.js"
import { NEGATIVE_LOCKS, CATEGORY_DEFAULTS } from "./dictionaries.js"
import { expandCameraMove, expandLighting, expandAction, expandSetting, expandColorGrade } from "./context-expander.js"
import { generateVideoLocks } from "./lock-generator.js"
import {
  buildSubjectSection, buildActionSection, buildSettingSection, buildCameraSection,
  buildLightingSection, buildColorGradeSection, buildRefsSection, buildExcludeSection,
} from "./templates/narrative.js"
import { buildProductRotation } from "./templates/product.js"
import { buildNatureAtmosphere } from "./templates/nature.js"
import { buildActionIntensity } from "./templates/action.js"
import { buildAbstractTransform } from "./templates/abstract.js"
import { formatForVideoPlatform } from "./formatter.js"
import { scoreVideoPrompt } from "./validator.js"

export function buildVideoFromRules(req: VideoBuildRequest): VideoRuleEngineResult {
  const cat = req.category ?? "narrative"
  const defaults = CATEGORY_DEFAULTS[cat] ?? CATEGORY_DEFAULTS.narrative

  const subjectExp  = req.subject ?? "the subject"
  const actionExp   = expandAction(req.action ?? null)          ?? req.action ?? "moving naturally within the frame"
  const settingExp  = expandSetting(req.setting ?? null)        ?? req.setting ?? "a clearly defined environment"
  const cameraExp   = expandCameraMove(req.cameraMove ?? null)  ?? expandCameraMove(defaults.cameraMove) ?? defaults.cameraMove
  const lightingExp = expandLighting(req.lighting ?? null)      ?? expandLighting(defaults.lighting) ?? defaults.lighting
  const gradeExp    = expandColorGrade(req.colorGrade ?? null)  ?? expandColorGrade("natural neutral") ?? "natural neutral grade"

  const sections: string[] = [buildSubjectSection(subjectExp)]

  if (cat === "narrative" || cat === "action") sections.push(buildActionSection(actionExp))
  if (cat === "product")  sections.push(buildProductRotation())
  if (cat === "nature")   sections.push(buildNatureAtmosphere())
  if (cat === "action")   sections.push(buildActionIntensity())
  if (cat === "abstract") sections.push(buildAbstractTransform())

  sections.push(buildSettingSection(settingExp))
  sections.push(buildCameraSection(cameraExp))
  sections.push(buildLightingSection(lightingExp))
  sections.push(buildColorGradeSection(gradeExp))
  sections.push(buildRefsSection(req.mood ?? "cinematic"))

  const negatives = NEGATIVE_LOCKS[cat] ?? NEGATIVE_LOCKS.narrative
  sections.push(buildExcludeSection(negatives))

  const locks = generateVideoLocks(cat, subjectExp)
  sections.push(locks.motion)
  sections.push(locks.camera)
  sections.push(locks.temporal)
  if (cat === "narrative" || cat === "action") sections.push(locks.continuity)

  if (req.extraNotes?.trim()) sections.push(`NOTES: ${req.extraNotes.trim()}`)

  const rawPrompt = sections.join("\n\n")
  const formatted = formatForVideoPlatform(rawPrompt, req.platform, locks)
  // Score the structured (pre-format) text — several platform formatters
  // (Kling, Sora, Pika, Veo) rewrite labeled sections into flowing prose,
  // which would make section-presence scoring blind to content that's
  // genuinely there, just no longer under an explicit "LABEL:" prefix.
  const score = scoreVideoPrompt(rawPrompt)

  return {
    prompt: formatted,
    platform: req.platform,
    category: cat,
    score,
    components: {
      subject: !!req.subject, action: !!req.action, setting: !!req.setting,
      cameraMove: !!req.cameraMove, lighting: !!req.lighting, colorGrade: !!req.colorGrade,
      locks: true,
    },
    locks,
    negatives,
    wordCount: formatted.split(/\s+/).filter(Boolean).length,
    engine: "rule-based",
  }
}
