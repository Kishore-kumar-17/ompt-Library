// ─── Rule-Based Code Improver ────────────────────────────────────────────────────
// Enriches weak/vague coding prompts using rule-based expansion — no API calls.
// Strategy: parse → detect gaps → inject stack/scope/acceptance structure → locks.

import type { CodeImproveRequest, CodeRuleEngineResult } from "./types.js"
import { parseCodePrompt } from "./parser.js"
import { expandTechStack, expandCodeOutputFormat, expandConvention } from "./context-expander.js"
import { ANTI_PATTERNS } from "./dictionaries.js"
import { generateCodeLocks } from "./lock-generator.js"
import { buildAvoidSection } from "./templates/shared.js"
import { CODE_CATEGORY_REGISTRY, hasSection } from "./templates/registry.js"
import { formatForCodePlatform } from "./formatter.js"
import { scoreCodePrompt } from "./validator.js"

export function improveCodeWithRules(req: CodeImproveRequest): CodeRuleEngineResult {
  const parsed = parseCodePrompt(req.promptText)
  const cat = req.category ?? parsed.detectedCategory
  const def = CODE_CATEGORY_REGISTRY[cat] ?? CODE_CATEGORY_REGISTRY.feature

  const stackExp      = expandTechStack(parsed.techStack) ?? parsed.techStack ?? "match the existing project's language and framework versions"
  const formatExp     = expandCodeOutputFormat(parsed.outputFormat) ?? expandCodeOutputFormat(def.template.defaultOutputFormat) ?? def.template.defaultOutputFormat
  const conventionExp = expandConvention("existing patterns") ?? "match the existing file's naming, error-handling, and structural conventions"

  const lines: string[] = [
    `TASK: ${req.promptText.trim()}`,
    `TECH STACK: ${stackExp}`,
    def.buildExtraSection(),
  ]

  lines.push(`OUTPUT FORMAT: ${formatExp}`)
  if (hasSection(cat, "CONVENTION")) lines.push(`CONVENTIONS: ${conventionExp}`)

  const antiPatterns = ANTI_PATTERNS[cat] ?? ANTI_PATTERNS.feature
  lines.push(buildAvoidSection(antiPatterns))

  const locks = generateCodeLocks(cat, conventionExp, {}, def.template.isAgentic)
  lines.push(locks.boundary, locks.acceptance)
  if (hasSection(cat, "LOCKS_CONVENTION")) lines.push(locks.convention)

  const rawImproved = lines.join("\n\n")
  const formatted = formatForCodePlatform(rawImproved, req.platform)
  const score = scoreCodePrompt(rawImproved, cat)

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
