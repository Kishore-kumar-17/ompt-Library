// ─── Rule-Based Text Builder ────────────────────────────────────────────────────
// Assembles a complete structured text/LLM prompt from user selections.
// Zero API calls — Instruction Formula v1.0 assembly only.

import type { TextBuildRequest, TextRuleEngineResult } from "./types.js"
import { ANTI_PATTERNS, CATEGORY_DEFAULTS } from "./dictionaries.js"
import { expandRole, expandOutputFormat, expandTone, expandReasoningDepth } from "./context-expander.js"
import { generateTextLocks } from "./lock-generator.js"
import {
  buildRoleSection, buildTaskSection, buildAudienceToneSection,
  buildOutputFormatSection, buildReasoningSection, buildAvoidSection,
} from "./templates/qa.js"
import { buildCreativeConstraints } from "./templates/creative.js"
import { buildAnalysisScopeDimensions } from "./templates/analysis.js"
import { buildSourceHandlingSection } from "./templates/summarization.js"
import { buildMappingSection } from "./templates/transformation.js"
import { formatForTextPlatform } from "./formatter.js"
import { scoreTextPrompt } from "./validator.js"

export function buildTextFromRules(req: TextBuildRequest): TextRuleEngineResult {
  const cat = req.category ?? "qa"
  const defaults = CATEGORY_DEFAULTS[cat] ?? CATEGORY_DEFAULTS.qa

  const taskExp    = req.task ?? "complete the requested task"
  const roleExp    = expandRole(defaults.role) ?? defaults.role
  const toneExp    = expandTone(req.tone ?? null) ?? expandTone(defaults.tone) ?? defaults.tone
  const formatExp  = expandOutputFormat(req.outputFormat ?? null) ?? expandOutputFormat(defaults.outputFormat) ?? defaults.outputFormat
  const depthExp   = expandReasoningDepth(req.reasoningDepth ?? null) ?? expandReasoningDepth(defaults.reasoningDepth) ?? defaults.reasoningDepth

  const sections: string[] = [buildRoleSection(roleExp), buildTaskSection(taskExp)]

  if (cat === "creative")       sections.push(buildCreativeConstraints())
  if (cat === "analysis")       sections.push(buildAnalysisScopeDimensions())
  if (cat === "summarization")  sections.push(buildSourceHandlingSection())
  if (cat === "transformation") sections.push(buildMappingSection())

  sections.push(buildAudienceToneSection(toneExp))
  sections.push(buildOutputFormatSection(formatExp))

  if (cat === "qa" || cat === "analysis") sections.push(buildReasoningSection(depthExp))

  const antiPatterns = ANTI_PATTERNS[cat] ?? ANTI_PATTERNS.qa
  sections.push(buildAvoidSection(antiPatterns))

  const locks = generateTextLocks(cat, formatExp, depthExp)
  sections.push(locks.scope)
  sections.push(locks.format)
  if (cat !== "creative" && cat !== "transformation") sections.push(locks.depth)

  if (req.extraNotes?.trim()) sections.push(`NOTES: ${req.extraNotes.trim()}`)

  const rawPrompt = sections.join("\n\n")
  const formatted = formatForTextPlatform(rawPrompt, req.platform)
  // Score the structured (pre-format) text — Perplexity's formatter in
  // particular strips role/tone/locks down to a bare query by design, which
  // would make section-presence scoring blind to content that's genuinely
  // there, just intentionally not sent to that platform.
  const score = scoreTextPrompt(rawPrompt)

  return {
    prompt: formatted,
    platform: req.platform,
    category: cat,
    score,
    components: {
      task: !!req.task, audience: !!req.audience, tone: !!req.tone,
      outputFormat: !!req.outputFormat, reasoningDepth: !!req.reasoningDepth, locks: true,
    },
    locks,
    antiPatterns,
    wordCount: formatted.split(/\s+/).filter(Boolean).length,
    engine: "rule-based",
  }
}
