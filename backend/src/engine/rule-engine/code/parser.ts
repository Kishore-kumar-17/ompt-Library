// ─── Code Prompt Parser ─────────────────────────────────────────────────────────
// Keyword extraction from raw user input — no AI, no API.

import type { ParsedCodePrompt, CodeCategory } from "./types.js"

const CATEGORY_KEYWORDS: Record<CodeCategory, string[]> = {
  bugfix:   ["bug", "fix", "error", "crash", "broken", "not working", "doesn't work", "isn't working", "fails", "exception", "race condition", "stack trace"],
  feature:  ["add", "implement", "build a", "create a", "new feature", "support for"],
  refactor: ["refactor", "clean up", "restructure", "simplify", "extract", "rename", "reorganize"],
  review:   ["review", "look over", "check this code", "code review", "feedback on", "audit"],
  test:     ["test", "write tests", "unit test", "coverage", "spec for", "test cases"],
}

const TECH_STACK_KEYWORDS = ["react", "vue", "node", "typescript", "python", "go", "rust", "django", "express", "next.js"]
const OUTPUT_FORMAT_KEYWORDS = ["diff only", "full file", "explanation included", "tests included", "inline comments"]

function detectCategory(text: string): CodeCategory {
  const lower = text.toLowerCase()
  const scores: Record<CodeCategory, number> = { bugfix: 0, feature: 0, refactor: 0, review: 0, test: 0 }
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    for (const kw of keywords) {
      if (lower.includes(kw)) scores[cat as CodeCategory]++
    }
  }
  const sorted = (Object.entries(scores) as [CodeCategory, number][]).sort((a, b) => b[1] - a[1])
  return sorted[0][1] > 0 ? sorted[0][0] : "feature"
}

function findFirstMatch(text: string, keywords: string[]): string | null {
  const lower = text.toLowerCase()
  for (const kw of keywords) {
    if (lower.includes(kw)) return kw
  }
  return null
}

function getMissingComponents(parsed: Partial<ParsedCodePrompt>, category: CodeCategory): string[] {
  const required: Record<CodeCategory, string[]> = {
    bugfix:   ["task"],
    feature:  ["task"],
    refactor: ["task"],
    review:   ["task"],
    test:     ["task"],
  }
  return (required[category] ?? []).filter((field) => !parsed[field as keyof typeof parsed])
}

export function parseCodePrompt(raw: string): ParsedCodePrompt {
  const words = raw.trim().split(/\s+/)
  const category = detectCategory(raw)

  const parsed: ParsedCodePrompt = {
    detectedCategory: category,
    task:         raw.trim().length > 3 ? raw.trim() : null,
    techStack:    findFirstMatch(raw, TECH_STACK_KEYWORDS),
    outputFormat: findFirstMatch(raw, OUTPUT_FORMAT_KEYWORDS),
    missingComponents: [],
    originalWords: words,
  }

  parsed.missingComponents = getMissingComponents(parsed, category)
  return parsed
}
