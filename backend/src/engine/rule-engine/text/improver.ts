// ─── Rule-Based Text Improver ───────────────────────────────────────────────────
// Enriches weak/vague text prompts using rule-based expansion — no API calls.
// Strategy: parse → detect gaps → inject role/format/depth structure → add locks.

import type { TextImproveRequest, TextRuleEngineResult } from "./types.js"
import { parseTextPrompt } from "./parser.js"
import { expandOutputFormat, expandTone, expandReasoningDepth, expandRole } from "./context-expander.js"
import { ANTI_PATTERNS, CATEGORY_DEFAULTS } from "./dictionaries.js"
import { generateTextLocks } from "./lock-generator.js"
import { buildAvoidSection } from "./templates/qa.js"
import { formatForTextPlatform } from "./formatter.js"
import { scoreTextPrompt } from "./validator.js"

export function improveTextWithRules(req: TextImproveRequest): TextRuleEngineResult {
  const parsed = parseTextPrompt(req.promptText)
  const cat = req.category ?? parsed.detectedCategory
  const defaults = CATEGORY_DEFAULTS[cat] ?? CATEGORY_DEFAULTS.qa

  const roleExp   = expandRole(defaults.role) ?? defaults.role
  const toneExp   = expandTone(parsed.tone)             ?? expandTone(defaults.tone) ?? defaults.tone
  const formatExp = expandOutputFormat(parsed.outputFormat) ?? expandOutputFormat(defaults.outputFormat) ?? defaults.outputFormat
  const depthExp  = expandReasoningDepth(parsed.reasoningDepth) ?? expandReasoningDepth(defaults.reasoningDepth) ?? defaults.reasoningDepth

  const lines: string[] = [
    `ROLE: You are ${roleExp}.`,
    `TASK: ${req.promptText.trim()}`,
    `AUDIENCE & TONE: ${toneExp}`,
    `OUTPUT FORMAT: ${formatExp}`,
  ]

  if (cat === "qa" || cat === "analysis") lines.push(`REASONING: ${depthExp}`)

  const antiPatterns = ANTI_PATTERNS[cat] ?? ANTI_PATTERNS.qa
  lines.push(buildAvoidSection(antiPatterns))

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
      task: true, audience: true, tone: true,
      outputFormat: true, reasoningDepth: cat === "qa" || cat === "analysis", locks: true,
    },
    locks,
    antiPatterns,
    wordCount: formatted.split(/\s+/).filter(Boolean).length,
    engine: "rule-based",
  }
}
