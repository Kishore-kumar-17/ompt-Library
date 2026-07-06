// ─── Rule-Based Improver ──────────────────────────────────────────────────────
// Enriches weak/vague prompts using rule-based expansion — no API calls.
// Strategy: parse → detect gaps → inject rich context → add locks.

import type { RuleEngineImproveRequest, RuleEngineResult } from "./types"
import { parsePrompt } from "./parser"
import {
  expandLighting, expandCamera, expandSubject,
  expandSetting, expandWardrobe, expandHandPosition,
  expandStyle, expandPalette,
} from "./context-expander"
import { NEGATIVE_LOCKS, LOCK_DEFAULTS } from "./dictionaries"
import { generateLocks } from "./lock-generator"
import {
  buildSkinSection, buildRefsSection, buildExcludeSection,
} from "./templates/people"
import { formatForPlatform } from "./formatter"
import { scorePrompt } from "./validator"

// Default enrichment blocks for missing sections
const DEFAULTS = {
  lighting: "professional studio strobe, 5600K, 45° above camera-right, 90cm octabox key light, silver reflector fill camera-left, 5:1 ratio",
  camera:   "Sony A7R V, 85mm f/1.4L, f/2.0, 1/160s, ISO 100, tripod-mounted, 5° above eye level",
  setting:  "clean professional studio environment, seamless grey-white backdrop, controlled neutral background",
  wardrobe: "contemporary business casual — slim-fit dark trousers, open-collar shirt, clean leather shoes",
  palette:  "warm neutral palette — charcoal #3D3D3D 30%, warm white #F5F0EB 25%, stone grey #8A8A8A 20%, muted brown #7B6152 15%, off-white #FAF7F2 10%",
  skin:     "true-to-life skin texture, natural subsurface scattering, authentic pore structure, no smoothing artifacts",
}

export function improveWithRules(req: RuleEngineImproveRequest): RuleEngineResult {
  const parsed = parsePrompt(req.promptText)
  const cat = req.category ?? parsed.detectedCategory

  // Expand parsed fields, fall back to defaults for any missing
  const subjectExp  = expandSubject(parsed.subject)    ?? parsed.subject  ?? req.promptText.split(/[,\n]/)[0].trim()
  const wardrobeExp = expandWardrobe(parsed.wardrobe)  ?? parsed.wardrobe ?? DEFAULTS.wardrobe
  const settingExp  = expandSetting(parsed.setting)    ?? parsed.setting  ?? DEFAULTS.setting
  const lightingExp = expandLighting(parsed.lighting)  ?? parsed.lighting ?? DEFAULTS.lighting
  const cameraExp   = expandCamera(parsed.camera)      ?? parsed.camera   ?? DEFAULTS.camera
  const handExp     = expandHandPosition(parsed.handPosition)
  const styleExp    = expandStyle(parsed.style)        ?? parsed.style    ?? "editorial portrait"
  const paletteExp  = expandPalette(parsed.palette)    ?? parsed.palette  ?? DEFAULTS.palette

  // Build enriched sections
  const lines: string[] = [
    `SUBJECT: ${subjectExp}`,
    `WARDROBE: ${wardrobeExp}`,
    `SETTING: ${settingExp}`,
    `COMPOSITION: chest-and-above framing, subject centred horizontally, eyes at upper 40% of frame, 55mm-equivalent perspective, rule-of-thirds vertical alignment`,
    `LIGHTING: ${lightingExp}`,
    `CAMERA: ${cameraExp}`,
  ]

  if (cat === "people" || cat === "fashion") {
    lines.push(buildSkinSection())
  }

  lines.push(`PALETTE: ${paletteExp}`)
  lines.push(buildRefsSection(parsed.style ?? "editorial"))

  const negatives = NEGATIVE_LOCKS[cat] ?? NEGATIVE_LOCKS.people
  lines.push(buildExcludeSection(negatives))

  const locks = generateLocks(cat, handExp)
  lines.push(locks.orientation)
  lines.push(locks.framing)
  lines.push(locks.light)
  if (locks.hand) lines.push(locks.hand)

  const rawImproved = lines.join("\n\n")
  const formatted = formatForPlatform(rawImproved, req.platform, locks)
  const score = scorePrompt(formatted, cat)

  return {
    prompt: formatted,
    platform: req.platform,
    category: cat,
    score,
    components: {
      subject:      true,
      wardrobe:     true,
      setting:      true,
      lighting:     true,
      camera:       true,
      handPosition: !!handExp,
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
