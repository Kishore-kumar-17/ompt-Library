// ─── Rule-Based Code Builder ─────────────────────────────────────────────────────
// Assembles a complete structured coding prompt from user selections.
// Zero API calls — Engineering Spec Formula v1.0 assembly only.

import type { CodeBuildRequest, CodeRuleEngineResult } from "./types.js"
import { ANTI_PATTERNS, CATEGORY_DEFAULTS } from "./dictionaries.js"
import { expandTechStack, expandCodeOutputFormat, expandConvention } from "./context-expander.js"
import { generateCodeLocks } from "./lock-generator.js"
import {
  buildTaskSection, buildTechStackSection, buildReproSection,
  buildOutputFormatSection, buildConventionSection, buildAvoidSection,
} from "./templates/bugfix.js"
import { buildAcceptanceCriteriaSection } from "./templates/feature.js"
import { buildNonGoalsSection } from "./templates/refactor.js"
import { buildFocusAreasSection } from "./templates/review.js"
import { buildCoverageTargetSection } from "./templates/test.js"
import { formatForCodePlatform } from "./formatter.js"
import { scoreCodePrompt } from "./validator.js"

export function buildCodeFromRules(req: CodeBuildRequest): CodeRuleEngineResult {
  const cat = req.category ?? "feature"
  const defaults = CATEGORY_DEFAULTS[cat] ?? CATEGORY_DEFAULTS.feature

  const taskExp       = req.task ?? "complete the requested change"
  const stackExp       = expandTechStack(req.techStack ?? null) ?? req.techStack ?? "match the existing project's language and framework versions"
  const formatExp      = expandCodeOutputFormat(req.outputFormat ?? null) ?? expandCodeOutputFormat(defaults.outputFormat) ?? defaults.outputFormat
  const conventionExp  = expandConvention("existing patterns") ?? "match the existing file's naming, error-handling, and structural conventions"

  const sections: string[] = [buildTaskSection(taskExp), buildTechStackSection(stackExp)]

  if (cat === "bugfix")   sections.push(buildReproSection())
  if (cat === "feature")  sections.push(buildAcceptanceCriteriaSection())
  if (cat === "refactor") sections.push(buildNonGoalsSection())
  if (cat === "review")   sections.push(buildFocusAreasSection())
  if (cat === "test")     sections.push(buildCoverageTargetSection())

  sections.push(buildOutputFormatSection(formatExp))
  if (cat !== "review") sections.push(buildConventionSection(conventionExp))

  const antiPatterns = ANTI_PATTERNS[cat] ?? ANTI_PATTERNS.feature
  sections.push(buildAvoidSection(antiPatterns))

  const locks = generateCodeLocks(cat, conventionExp, { boundaryInclude: req.scopeBoundary })
  sections.push(locks.boundary)
  sections.push(locks.acceptance)
  if (cat !== "review") sections.push(locks.convention)

  if (req.extraNotes?.trim()) sections.push(`NOTES: ${req.extraNotes.trim()}`)

  const rawPrompt = sections.join("\n\n")
  const formatted = formatForCodePlatform(rawPrompt, req.platform)
  // Score the structured (pre-format) text — Copilot's formatter in
  // particular collapses everything to a two-line comment brief, which would
  // make section-presence scoring blind to content that's genuinely there,
  // just intentionally condensed for that platform's style.
  const score = scoreCodePrompt(rawPrompt)

  return {
    prompt: formatted,
    platform: req.platform,
    category: cat,
    score,
    components: {
      task: !!req.task, techStack: !!req.techStack, outputFormat: !!req.outputFormat,
      scopeBoundary: !!req.scopeBoundary, locks: true,
    },
    locks,
    antiPatterns,
    wordCount: formatted.split(/\s+/).filter(Boolean).length,
    engine: "rule-based",
  }
}
