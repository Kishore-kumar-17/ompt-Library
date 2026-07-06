// ─── Rule-Based Code Improver ────────────────────────────────────────────────────
// Enriches weak/vague coding prompts using rule-based expansion — no API calls.
// Strategy: parse → detect gaps → inject stack/scope/acceptance structure → locks.

import type { CodeImproveRequest, CodeRuleEngineResult } from "./types.js"
import { parseCodePrompt } from "./parser.js"
import { expandTechStack, expandCodeOutputFormat, expandConvention } from "./context-expander.js"
import { ANTI_PATTERNS, CATEGORY_DEFAULTS } from "./dictionaries.js"
import { generateCodeLocks } from "./lock-generator.js"
import { buildAvoidSection } from "./templates/bugfix.js"
import { buildReproSection } from "./templates/bugfix.js"
import { buildAcceptanceCriteriaSection } from "./templates/feature.js"
import { buildNonGoalsSection } from "./templates/refactor.js"
import { buildFocusAreasSection } from "./templates/review.js"
import { buildCoverageTargetSection } from "./templates/test.js"
import { formatForCodePlatform } from "./formatter.js"
import { scoreCodePrompt } from "./validator.js"

export function improveCodeWithRules(req: CodeImproveRequest): CodeRuleEngineResult {
  const parsed = parseCodePrompt(req.promptText)
  const cat = req.category ?? parsed.detectedCategory
  const defaults = CATEGORY_DEFAULTS[cat] ?? CATEGORY_DEFAULTS.feature

  const stackExp      = expandTechStack(parsed.techStack) ?? parsed.techStack ?? "match the existing project's language and framework versions"
  const formatExp     = expandCodeOutputFormat(parsed.outputFormat) ?? expandCodeOutputFormat(defaults.outputFormat) ?? defaults.outputFormat
  const conventionExp = expandConvention("existing patterns") ?? "match the existing file's naming, error-handling, and structural conventions"

  const lines: string[] = [
    `TASK: ${req.promptText.trim()}`,
    `TECH STACK: ${stackExp}`,
  ]

  if (cat === "bugfix")   lines.push(buildReproSection())
  if (cat === "feature")  lines.push(buildAcceptanceCriteriaSection())
  if (cat === "refactor") lines.push(buildNonGoalsSection())
  if (cat === "review")   lines.push(buildFocusAreasSection())
  if (cat === "test")     lines.push(buildCoverageTargetSection())

  lines.push(`OUTPUT FORMAT: ${formatExp}`)
  if (cat !== "review") lines.push(`CONVENTIONS: ${conventionExp}`)

  const antiPatterns = ANTI_PATTERNS[cat] ?? ANTI_PATTERNS.feature
  lines.push(buildAvoidSection(antiPatterns))

  const locks = generateCodeLocks(cat, conventionExp)
  lines.push(locks.boundary, locks.acceptance)
  if (cat !== "review") lines.push(locks.convention)

  const rawImproved = lines.join("\n\n")
  const formatted = formatForCodePlatform(rawImproved, req.platform)
  const score = scoreCodePrompt(rawImproved)

  return {
    prompt: formatted,
    platform: req.platform,
    category: cat,
    score,
    components: {
      task: true, techStack: true, outputFormat: true,
      scopeBoundary: true, locks: true,
    },
    locks,
    antiPatterns,
    wordCount: formatted.split(/\s+/).filter(Boolean).length,
    engine: "rule-based",
  }
}
