// ─── Code Prompt Parser ─────────────────────────────────────────────────────────
// Keyword extraction from raw user input — no AI, no API.

import type { ParsedCodePrompt, CodeCategory } from "./types.js"
import { findFirstMatch, detectCategoryByScore } from "../keyword-utils.js"

const CATEGORY_KEYWORDS: Record<CodeCategory, string[]> = {
  bugfix:   ["bug", "fix", "error", "crash", "broken", "not working", "doesn't work", "isn't working", "fails", "exception", "race condition", "stack trace"],
  feature:  ["add", "implement", "build a", "create a", "new feature", "support for"],
  refactor: ["refactor", "clean up", "restructure", "simplify", "extract", "rename", "reorganize"],
  review:   ["review", "look over", "check this code", "code review", "feedback on", "audit"],
  test:     ["test", "write tests", "unit test", "coverage", "spec for", "test cases"],
}

const TECH_STACK_KEYWORDS = [
  "react", "vue", "angular", "svelte", "node", "deno", "typescript", "javascript",
  "python", "django", "flask", "fastapi", "go", "rust", "java", "spring", "kotlin",
  "c#", "ruby", "rails", "php", "laravel", "swift", "c++", "express", "next.js",
  "nuxt", "remix", "nestjs", "postgresql",
]
const OUTPUT_FORMAT_KEYWORDS = [
  "diff only", "full file", "explanation included", "tests included", "inline comments",
  "commit message", "pr description", "patch file",
]

function detectCategory(text: string): CodeCategory {
  return detectCategoryByScore(text, CATEGORY_KEYWORDS, "feature")
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
