// ─── Rule-Based Text Improver ───────────────────────────────────────────────────
// Enriches weak/vague text prompts using rule-based expansion — no API calls.
// Strategy: parse → detect gaps → inject role/format/depth structure → add locks.

import type { TextImproveRequest, TextRuleEngineResult } from "./types.js"
import { parseTextPrompt } from "./parser.js"
import { expandOutputFormat, expandTone, expandReasoningDepth, expandRole, expandAudience } from "./context-expander.js"
import { ANTI_PATTERNS, CATEGORY_DEFAULTS } from "./dictionaries.js"
import { generateTextLocks } from "./lock-generator.js"
import {
  buildAvoidSection, buildAudienceToneSection,
  buildQaQuestionTypeSection, detectQaMode, buildFewShotSection,
} from "./templates/qa.js"
import { buildCreativeConstraints } from "./templates/creative.js"
import { buildAnalysisScopeDimensions } from "./templates/analysis.js"
import { buildSourceHandlingSection } from "./templates/summarization.js"
import { buildMappingSection, detectTransformationMode } from "./templates/transformation.js"
import { formatForTextPlatform } from "./formatter.js"
import { scoreTextPrompt } from "./validator.js"

export function improveTextWithRules(req: TextImproveRequest): TextRuleEngineResult {
  const parsed = parseTextPrompt(req.promptText)
  const cat = req.category ?? parsed.detectedCategory
  const defaults = CATEGORY_DEFAULTS[cat] ?? CATEGORY_DEFAULTS.qa

  const roleExp     = expandRole(defaults.role) ?? defaults.role
  const toneExp     = expandTone(parsed.tone)             ?? expandTone(defaults.tone) ?? defaults.tone
  const formatExp   = expandOutputFormat(parsed.outputFormat) ?? expandOutputFormat(defaults.outputFormat) ?? defaults.outputFormat
  const depthExp    = expandReasoningDepth(parsed.reasoningDepth) ?? expandReasoningDepth(defaults.reasoningDepth) ?? defaults.reasoningDepth
  const audienceExp = expandAudience(parsed.audience)

  const lines: string[] = [
    `ROLE: You are ${roleExp}.`,
    `TASK: ${req.promptText.trim()}`,
  ]

  if (cat === "qa")             lines.push(buildQaQuestionTypeSection(req.promptText))
  if (cat === "creative")       lines.push(buildCreativeConstraints(req.promptText))
  if (cat === "analysis")       lines.push(buildAnalysisScopeDimensions(req.promptText))
  if (cat === "summarization")  lines.push(buildSourceHandlingSection(req.promptText))
  if (cat === "transformation") lines.push(buildMappingSection(req.promptText))

  lines.push(buildAudienceToneSection(toneExp, audienceExp))
  lines.push(`OUTPUT FORMAT: ${formatExp}`)

  if (cat === "qa" || cat === "analysis") lines.push(`REASONING: ${depthExp}`)

  const antiPatterns = ANTI_PATTERNS[cat] ?? ANTI_PATTERNS.qa
  lines.push(buildAvoidSection(antiPatterns))

  const fewShotMode = cat === "qa" ? detectQaMode(req.promptText) : cat === "transformation" ? detectTransformationMode(req.promptText) : null
  const fewShot = buildFewShotSection(cat, fewShotMode)
  if (fewShot) lines.push(fewShot)

  const locks = generateTextLocks(cat, formatExp, depthExp)
  lines.push(locks.scope, locks.format)
  if (cat !== "creative" && cat !== "transformation") lines.push(locks.depth)

  const rawImproved = lines.join("\n\n")
  const formatted = formatForTextPlatform(rawImproved, req.platform)
  const score = scoreTextPrompt(rawImproved)

  return {
    prompt: formatted,
    platform: req.platform,
    category: cat,
    score,
    components: {
      task: true, audience: !!parsed.audience, tone: true,
      outputFormat: true, reasoningDepth: cat === "qa" || cat === "analysis", locks: true,
    },
    locks,
    antiPatterns,
    wordCount: formatted.split(/\s+/).filter(Boolean).length,
    engine: "rule-based",
  }
}
