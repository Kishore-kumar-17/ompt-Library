// ─── Engineering Spec Formula v1.0 — Dictionaries ──────────────────────────────
// Term → rich engineering-spec description. No API calls — pure lookup.

export const TECH_STACK: Record<string, string> = {
  "react":       "React 18+ with function components and hooks — no class components, no legacy lifecycle methods",
  "vue":         "Vue 3 with the Composition API — avoid the Options API unless the existing file already uses it",
  "node":        "Node.js 20 LTS with ES modules — no CommonJS require() unless the existing file uses it",
  "typescript":  "TypeScript in strict mode — no `any` unless justified in a comment, prefer explicit return types on exported functions",
  "python":      "Python 3.11+ with type hints on function signatures, following PEP 8",
  "go":          "Go 1.21+ following standard project layout and idiomatic error handling (no panics for expected errors)",
  "rust":        "Rust with the current stable toolchain — prefer Result/Option over unwrap() outside of tests",
  "django":      "Django with its ORM and standard app structure — no raw SQL unless the existing code already uses it",
  "express":     "Express.js with async/await route handlers and centralized error-handling middleware",
  "next.js":     "Next.js App Router conventions — server components by default, client components only when needed",
}

export const CODE_OUTPUT_FORMAT: Record<string, string> = {
  "diff only":         "a unified diff only — no full file reproduction, no explanation unless something is non-obvious",
  "full file":         "the complete updated file(s), ready to save — no partial snippets that require manual merging",
  "explanation included": "the code changes plus a short explanation of why each change was necessary",
  "tests included":    "the code changes plus corresponding test updates — no change ships without covering tests",
  "inline comments":   "the code changes with brief inline comments only where the reasoning isn't obvious from the code itself",
}

export const CONVENTION: Record<string, string> = {
  "existing patterns":  "match the existing file's naming, error-handling, and structural conventions exactly — do not introduce a new pattern for something the codebase already has a pattern for",
  "style guide":        "follow the project's linter/formatter configuration as the source of truth for style, not personal preference",
  "no new dependencies": "do not add new dependencies — solve it with what's already in the project unless explicitly told otherwise",
}

// ─── Category defaults ────────────────────────────────────────────────────────

export const CATEGORY_DEFAULTS: Record<string, {
  outputFormat: string; boundaryHint: string; acceptanceHint: string;
}> = {
  bugfix:   { outputFormat: "diff only",             boundaryHint: "only the file(s) containing the bug",                 acceptanceHint: "the reported error no longer occurs and the existing test suite still passes" },
  feature:  { outputFormat: "tests included",        boundaryHint: "only the files necessary to implement the stated feature", acceptanceHint: "the feature works as specified and has test coverage for the main path and at least one edge case" },
  refactor: { outputFormat: "full file",              boundaryHint: "internal structure only — no change to public API or observable behavior", acceptanceHint: "all existing tests pass unchanged and no external behavior differs" },
  review:   { outputFormat: "explanation included",   boundaryHint: "the diff or files under review only",                acceptanceHint: "every finding cites a specific file and line, ranked by severity" },
  test:     { outputFormat: "full file",              boundaryHint: "test files only — no production code changes to make tests pass", acceptanceHint: "the new tests fail against the old behavior and pass against the intended behavior" },
}

// ─── Anti-patterns per category ───────────────────────────────────────────────
// The code-prompting equivalent of the image engine's "negative locks" — the
// most common ways coding-assistant output goes wrong for each task type.

export const ANTI_PATTERNS: Record<string, string[]> = {
  bugfix: [
    "No fixing the symptom without identifying the root cause",
    "No silently swallowing the error instead of fixing it",
    "No unrelated refactoring bundled into the same change",
    "No disabling or skipping the failing test instead of fixing the code",
  ],
  feature: [
    "No scope creep beyond what was specified",
    "No skipping error handling for the new code path",
    "No breaking existing tests to make the new feature pass",
    "No leaving TODOs in place of the requested functionality",
  ],
  refactor: [
    "No changing observable behavior or public API signatures",
    "No dropping existing test coverage",
    "No introducing a new pattern where the codebase already has one",
    "No renaming things unrelated to the stated refactor goal",
  ],
  review: [
    "No vague feedback without a specific file and line reference",
    "No style-only nitpicks presented as critical findings",
    "No missing the security or performance implications of the change",
    "No approving without checking test coverage for the change",
  ],
  test: [
    "No testing implementation details instead of observable behavior",
    "No flaky or non-deterministic tests (timing, network, random without a seed)",
    "No skipping the failure/edge-case paths, only testing the happy path",
    "No production code changes disguised as test changes",
  ],
}
