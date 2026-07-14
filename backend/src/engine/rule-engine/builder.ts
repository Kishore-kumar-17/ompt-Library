// ─── Rule-Based Builder ────────────────────────────────────────────────────────
// Assembles a complete structured prompt from user selections.
// Zero API calls — formula assembly only.

import type { RuleEngineBuildRequest, RuleEngineResult } from "./types"
import { NEGATIVE_LOCKS } from "./dictionaries"
import {
  expandLighting, expandCamera, expandSubject,
  expandSetting, expandWardrobe, expandHandPosition,
  expandStyle, expandPalette,
} from "./context-expander"
import { generateLocks } from "./lock-generator"
import {
  buildSubjectSection, buildWardrobeSection, buildSettingSection,
  buildCompositionSection, buildLightingSection, buildCameraSection,
  buildSkinSection, buildPaletteSection, buildRefsSection, buildExcludeSection,
} from "./templates/people"
import { formatForPlatform } from "./formatter"
import { scorePrompt } from "./validator"

export function buildFromRules(req: RuleEngineBuildRequest): RuleEngineResult {
  const cat = req.category ?? "people"

  // Expand all terms
  const subjectExp  = expandSubject(req.subject ?? null)   ?? req.subject ?? "professional subject"
  const wardrobeExp = expandWardrobe(req.wardrobe ?? null) ?? req.wardrobe ?? "business casual attire"
  const settingExp  = expandSetting(req.setting ?? null)   ?? req.setting ?? "clean professional studio environment"
  const lightingExp = expandLighting(req.lighting ?? null) ?? req.lighting ?? "professional studio strobe, 5600K, 45° above camera-right, octabox key light"
  const cameraExp   = expandCamera(req.camera ?? null)     ?? req.camera ?? "Sony A7R V, 85mm f/1.4, f/2.0, tripod-mounted, eye-level perspective"
  const handExp     = expandHandPosition(req.handPosition ?? null)
  const styleExp    = expandStyle(req.style ?? null)       ?? req.style ?? "editorial"
  const paletteExp  = expandPalette(req.palette ?? null)   ?? req.palette ?? "neutral"

  // Build sections
  const sections: string[] = [
    buildSubjectSection(subjectExp),
    buildWardrobeSection(wardrobeExp),
    buildSettingSection(settingExp),
    buildCompositionSection("chest-up"),
    buildLightingSection(lightingExp),
    buildCameraSection(cameraExp),
  ]

  if (cat === "people" || cat === "fashion") {
    sections.push(buildSkinSection())
  }

  sections.push(buildPaletteSection(paletteExp))
  sections.push(buildRefsSection(req.style ?? "editorial"))

  const negatives = NEGATIVE_LOCKS[cat] ?? NEGATIVE_LOCKS.people
  sections.push(buildExcludeSection(negatives))

  // Generate locks
  const locks = generateLocks(cat, handExp)

  sections.push(locks.orientation)
  sections.push(locks.framing)
  sections.push(locks.light)
  if (locks.hand) sections.push(locks.hand)

  // Extra notes appended verbatim if provided
  if (req.extraNotes?.trim()) {
    sections.push(`NOTES: ${req.extraNotes.trim()}`)
  }

  const rawPrompt = sections.join("\n\n")
  const formatted = formatForPlatform(rawPrompt, req.platform, locks)
  const score = scorePrompt(formatted, cat)

  return {
    prompt: formatted,
    platform: req.platform,
    category: cat,
    score,
    components: {
      subject:      !!req.subject,
      wardrobe:     !!req.wardrobe,
      setting:      !!req.setting,
      lighting:     !!req.lighting,
      camera:       !!req.camera,
      handPosition: !!req.handPosition,
      locks:        true,
    },
    locks: {
      orientation: locks.orientation,
      framing:     locks.framing,
      light:       locks.light,
      hand:        locks.hand,
    },
    negatives,
    wordCount: formatted.split(/\s+/).filter(Boolean).length,
    engine: "rule-based",
  }
}
