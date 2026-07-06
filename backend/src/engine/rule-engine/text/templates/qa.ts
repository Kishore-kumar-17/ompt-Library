// ─── Q&A / Explanation Formula Template ─────────────────────────────────────────
// Instruction Formula v1.0 — holds the shared section builders and the three
// CLARITY LOCKS reused across all text categories.

import { TextCategoryTemplate } from "../types.js"

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

export function buildAudienceToneSection(tone: string): string {
  return `AUDIENCE & TONE: ${tone}`
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
