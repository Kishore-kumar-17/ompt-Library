// ─── Bug Fix Formula Template ───────────────────────────────────────────────────
// Engineering Spec Formula v1.0 — holds the shared section builders and the
// three SCOPE LOCKS reused across all code categories.

import { CodeCategoryTemplate } from "../types.js"

export const BUGFIX_TEMPLATE: CodeCategoryTemplate = {
  name: "Bug Fix",
  defaultOutputFormat: "diff only",
  isAgentic: false,
  sections: [
    "TASK", "TECH_STACK", "REPRO", "OUTPUT_FORMAT", "CONVENTION",
    "AVOID", "LOCKS_BOUNDARY", "LOCKS_ACCEPTANCE", "LOCKS_CONVENTION",
  ],
}

// ─── Section builders (shared across all code categories) ────────────────────

export function buildTaskSection(task: string): string {
  return `TASK: ${task}`
}

export function buildTechStackSection(stack: string): string {
  return `TECH STACK: ${stack}`
}

export function buildReproSection(): string {
  return "REPRO: include the exact error message or stack trace and the steps to reproduce it — a bug report without repro steps can't be verified as fixed"
}

export function buildOutputFormatSection(format: string): string {
  return `OUTPUT FORMAT: ${format}`
}

export function buildConventionSection(convention: string): string {
  return `CONVENTIONS: ${convention}`
}

export function buildAvoidSection(antiPatterns: string[]): string {
  return `AVOID: ${antiPatterns.join(" | ")}`
}

// ─── LOCK generators (Engineering Spec Formula v1.0) ──────────────────────────
// Code prompts fail on scope creep and undefined "done" — locks pin exactly
// what files are in bounds, what completion means, and which conventions to
// follow instead of inventing new ones.

export function buildBoundaryLock(include: string, exclude: string): string {
  return `**LOCKS - BOUNDARY:** changes are scoped to ${include}. Do not modify ${exclude} — if a change there seems necessary, stop and flag it instead of making it.`
}

export function buildAcceptanceLock(acceptance: string): string {
  return `**LOCKS - ACCEPTANCE:** this task is done when ${acceptance} — nothing more, nothing less.`
}

export function buildConventionLock(convention: string): string {
  return `**LOCKS - CONVENTION:** ${convention} — do not introduce a new pattern where the codebase already has an established one.`
}
