// ─── Shared Section & Lock Builders ─────────────────────────────────────────────
// Cross-category machinery reused by every code template: the TASK/TECH STACK/
// OUTPUT FORMAT/CONVENTIONS/AVOID section builders and the three Engineering
// Spec Formula v1.0 locks. Category-specific content (e.g. bugfix's REPRO
// section) lives in its own templates/<category>.ts file instead — this file
// holds only what genuinely has no single category owner.

export function buildTaskSection(task: string): string {
  return `TASK: ${task}`
}

export function buildTechStackSection(stack: string): string {
  return `TECH STACK: ${stack}`
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

export function buildBoundaryLock(include: string, exclude: string, isAgentic = false): string {
  // Agentic categories (feature/refactor/test) legitimately need to explore
  // the codebase to do the work correctly — the boundary lock says so
  // explicitly instead of reading as a contradiction of "don't touch anything
  // else." Non-agentic categories (bugfix/review) are narrowly targeted and
  // don't need that caveat.
  const exploreNote = isAgentic
    ? " You may explore the codebase to understand related code, but only files within the boundary may be changed."
    : ""
  return `**LOCKS - BOUNDARY:** changes are scoped to ${include}. Do not modify ${exclude} — if a change there seems necessary, stop and flag it instead of making it.${exploreNote}`
}

export function buildAcceptanceLock(acceptance: string): string {
  return `**LOCKS - ACCEPTANCE:** this task is done when ${acceptance} — nothing more, nothing less.`
}

export function buildConventionLock(convention: string): string {
  return `**LOCKS - CONVENTION:** ${convention} — do not introduce a new pattern where the codebase already has an established one.`
}
