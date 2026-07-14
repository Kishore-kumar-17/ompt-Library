// ─── Text Lock Generator ────────────────────────────────────────────────────────
// Generates Instruction Formula v1.0 LOCK blocks. No AI — deterministic output
// from category defaults + overrides.

import type { TextLockValues, TextCategory } from "./types.js"
import { buildScopeLock, buildFormatLock, buildDepthLock } from "./templates/qa.js"

const SCOPE_DEFAULTS: Record<TextCategory, { include: string; exclude: string }> = {
  qa:             { include: "a direct answer to exactly what was asked", exclude: "unrelated background history or tangential topics" },
  creative:       { include: "the specific piece requested — the stated length, POV, and genre", exclude: "meta-commentary about the writing itself" },
  analysis:       { include: "the named dimensions of comparison only", exclude: "dimensions not explicitly requested, however tempting to add" },
  summarization:  { include: "only what is present in the source material", exclude: "outside knowledge or opinion not present in the source" },
  transformation: { include: "the requested change in form or register", exclude: "any change to the underlying meaning or facts" },
}

export function generateTextLocks(
  category: TextCategory,
  outputFormat: string,
  reasoningDepth: string,
  overrides: Partial<TextLockValues> = {}
): { scope: string; format: string; depth: string } {
  const d = SCOPE_DEFAULTS[category] ?? SCOPE_DEFAULTS.qa

  const v: TextLockValues = {
    scopeInclude: overrides.scopeInclude ?? d.include,
    scopeExclude: overrides.scopeExclude ?? d.exclude,
    formatSpec:   overrides.formatSpec   ?? outputFormat,
    depthSpec:    overrides.depthSpec    ?? reasoningDepth,
  }

  return {
    scope:  buildScopeLock(v.scopeInclude, v.scopeExclude),
    format: buildFormatLock(v.formatSpec),
    depth:  buildDepthLock(v.depthSpec),
  }
}
