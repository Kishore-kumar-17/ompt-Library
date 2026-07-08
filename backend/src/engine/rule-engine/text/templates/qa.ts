// ─── Q&A / Explanation Formula Template ─────────────────────────────────────────
// Instruction Formula v1.0 — holds the shared section builders and the three
// CLARITY LOCKS reused across all text categories.

import { TextCategoryTemplate, TextCategory } from "../types.js"
import { QA_QUESTION_TYPES, EXAMPLE_SCAFFOLDS } from "../dictionaries.js"
import { detectMode } from "../mode-detector.js"

export type QaMode = "factual" | "diagnostic" | "exploratory"

const QA_MODE_KEYWORDS: Record<QaMode, string[]> = {
  factual:     ["what is", "define", "who is", "when did", "when was", "how many", "what year", "meaning of"],
  diagnostic:  ["why does", "why is", "why doesn't", "why isn't", "troubleshoot", "debug", "not working", "error", "issue", "problem", "fix"],
  exploratory: ["how do", "how does", "explain", "difference between", "pros and cons", "trade-off", "trade-offs", "what are the", "how should i think about"],
}

export function detectQaMode(task: string): QaMode {
  return detectMode(task, QA_MODE_KEYWORDS, "exploratory")
}

// QA's own unique content (the rest of this file is shared cross-category
// section builders — see the module comment below).
export function buildQaQuestionTypeSection(task: string): string {
  const mode = detectQaMode(task)
  return `QUESTION TYPE: ${QA_QUESTION_TYPES[mode]}`
}

// Optional few-shot/example scaffold — included only where a short worked
// example genuinely helps calibrate output (currently QA and transformation;
// see EXAMPLE_SCAFFOLDS). Returns null when no example is registered for the
// given category/sub-mode, in which case callers should simply omit it.
export function buildFewShotSection(category: TextCategory, mode: string | null): string | null {
  if (!mode) return null
  const example = EXAMPLE_SCAFFOLDS[`${category}:${mode}`]
  return example ? `EXAMPLE:\n${example}` : null
}

export const QA_TEMPLATE: TextCategoryTemplate = {
  name: "Q&A / Explanation",
  defaultOutputFormat: "prose",
  defaultReasoningDepth: "quick answer",
  sections: [
    "ROLE", "TASK", "AUDIENCE_TONE", "OUTPUT_FORMAT",
    "REASONING", "AVOID", "LOCKS_SCOPE", "LOCKS_FORMAT", "LOCKS_DEPTH",
  ],
}

// ─── Section builders (shared across all text categories) ────────────────────

export function buildRoleSection(role: string): string {
  return `ROLE: You are ${role}.`
}

export function buildTaskSection(task: string): string {
  return `TASK: ${task}`
}

export function buildAudienceToneSection(tone: string, audience?: string | null): string {
  return audience
    ? `AUDIENCE & TONE: Written for ${audience}. Tone: ${tone}`
    : `AUDIENCE & TONE: ${tone}`
}

export function buildOutputFormatSection(format: string): string {
  return `OUTPUT FORMAT: ${format}`
}

export function buildReasoningSection(depth: string): string {
  return `REASONING: ${depth}`
}

export function buildAvoidSection(antiPatterns: string[]): string {
  return `AVOID: ${antiPatterns.join(" | ")}`
}

// ─── LOCK generators (Instruction Formula v1.0) ───────────────────────────────
// Text prompts fail on ambiguity, not geometry or motion — locks pin exactly
// what's in/out of scope, the exact output structure, and the expected depth.

export function buildScopeLock(scopeInclude: string, scopeExclude: string): string {
  return `**LOCKS - SCOPE:** answer must cover ${scopeInclude}. Do not drift into ${scopeExclude} unless the user explicitly asks a follow-up about it.`
}

export function buildFormatLock(formatSpec: string): string {
  return `**LOCKS - FORMAT:** output must be ${formatSpec} — no deviation from this structure, no mixing in a different format mid-response.`
}

export function buildDepthLock(depthSpec: string): string {
  return `**LOCKS - DEPTH:** ${depthSpec} — do not over- or under-shoot this depth regardless of how interesting tangents seem.`
}
