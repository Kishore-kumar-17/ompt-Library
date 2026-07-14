// ─── Engineering Spec Formula v1.0 — Dictionaries ──────────────────────────────
// Term → rich engineering-spec description. No API calls — pure lookup.

export const TECH_STACK: Record<string, string> = {
  "react":       "React 18+ with function components and hooks — no class components, no legacy lifecycle methods",
  "vue":         "Vue 3 with the Composition API — avoid the Options API unless the existing file already uses it",
  "angular":     "Angular 17+ with standalone components — avoid NgModules for new code unless the existing app is module-based, prefer the new @if/@for control-flow syntax over *ngIf/*ngFor",
  "svelte":      "Svelte 5 with runes ($state, $derived) — don't mix runes with the legacy `$:` reactive syntax in the same component, match the project's existing store patterns for cross-component state",
  "node":        "Node.js 20 LTS with ES modules — no CommonJS require() unless the existing file uses it",
  "deno":        "Deno with its built-in TypeScript support and secure-by-default permissions — no reaching for Node-only APIs or npm-specific tooling unless the project's Node compat layer already uses them",
  "typescript":  "TypeScript in strict mode — no `any` unless justified in a comment, prefer explicit return types on exported functions",
  "javascript":  "vanilla JavaScript (ES2022+), with JSDoc types if the project uses them instead of TypeScript — no implicit globals, strict equality (===) only",
  "python":      "Python 3.11+ with type hints on function signatures, following PEP 8",
  "django":      "Django with its ORM and standard app structure — no raw SQL unless the existing code already uses it",
  "flask":       "Flask with blueprints for route organization and explicit error handlers — no bare `except:` clauses, no business logic left inside route functions",
  "fastapi":     "FastAPI with Pydantic models for request/response validation — use dependency injection for shared logic instead of global state, async route handlers unless the operation is CPU-bound",
  "go":          "Go 1.21+ following standard project layout and idiomatic error handling (no panics for expected errors)",
  "rust":        "Rust with the current stable toolchain — prefer Result/Option over unwrap() outside of tests",
  "java":        "Java 17+ LTS — prefer Optional over returning null, checked exceptions only where the caller can meaningfully recover, follow the existing package layering",
  "spring":      "Spring Boot with constructor injection — avoid field injection (@Autowired directly on fields), keep controller/service/repository layering consistent with the existing codebase",
  "kotlin":      "Kotlin with coroutines for async work — prefer data classes and sealed classes over verbose POJOs/if-else chains, avoid !! non-null assertions outside of tests",
  "c#":          "C# with .NET 8 and nullable reference types enabled — prefer async/await over blocking calls (no `.Result`/`.Wait()`), LINQ over manual loops where it improves clarity",
  "ruby":        "idiomatic Ruby using blocks and Enumerable methods over manual loops — follow the project's Rubocop config if one exists rather than personal style",
  "rails":       "Ruby on Rails following convention-over-configuration — no bypassing ActiveRecord validations/callbacks unless the existing code already does, keep business logic out of controllers",
  "php":         "PHP 8.2+ with `declare(strict_types=1)` and typed properties — no untyped array-as-object patterns where a class or enum already models the data",
  "laravel":     "Laravel following Eloquent ORM and standard MVC structure — no raw SQL unless the existing code already uses it, use form requests for validation instead of inline checks",
  "swift":       "Swift with modern concurrency (async/await, actors) — prefer structs and value types over classes unless reference semantics are required, avoid force-unwrapping (!) outside of tests",
  "c++":         "C++20 with RAII and smart pointers (unique_ptr/shared_ptr) — no raw new/delete, no manual memory management where a standard container already suffices",
  "express":     "Express.js with async/await route handlers and centralized error-handling middleware",
  "next.js":     "Next.js App Router conventions — server components by default, client components only when needed",
  "nuxt":        "Nuxt 3 with the Composition API and auto-imports — avoid the Options API and manual explicit imports unless matching existing code in the project",
  "remix":       "Remix following its loader/action data-flow conventions — no client-side data fetching (useEffect + fetch) where a loader or action already covers it",
  "nestjs":      "NestJS with decorator-based modules/providers — follow the existing dependency-injection structure, no bypassing the module system with manual `new` instantiation of services",
  "postgresql":  "PostgreSQL with parameterized queries only — no string-concatenated SQL, migrations must be reversible and reviewed for lock/performance impact on large tables",
}

export const CODE_OUTPUT_FORMAT: Record<string, string> = {
  "diff only":         "a unified diff only — no full file reproduction, no explanation unless something is non-obvious",
  "full file":         "the complete updated file(s), ready to save — no partial snippets that require manual merging",
  "explanation included": "the code changes plus a short explanation of why each change was necessary",
  "tests included":    "the code changes plus corresponding test updates — no change ships without covering tests",
  "inline comments":   "the code changes with brief inline comments only where the reasoning isn't obvious from the code itself",
  "commit message":    "a conventional commit message (type(scope): summary, e.g. fix(auth): ...) plus the code changes — no vague messages like 'fix stuff' or 'updates'",
  "pr description":    "the code changes plus a pull-request-ready description: what changed, why, and how to test it — written for a reviewer who hasn't seen the codebase today",
  "patch file":        "a git-apply-able patch file in unified diff format only — no surrounding prose, no markdown fences around the patch",
}

export const CONVENTION: Record<string, string> = {
  "existing patterns":  "match the existing file's naming, error-handling, and structural conventions exactly — do not introduce a new pattern for something the codebase already has a pattern for",
  "style guide":        "follow the project's linter/formatter configuration as the source of truth for style, not personal preference",
  "no new dependencies": "do not add new dependencies — solve it with what's already in the project unless explicitly told otherwise",
  "conventional commits": "use Conventional Commits format (feat/fix/chore/refactor: ...) for any commit messages produced, matching the project's existing commit history style",
  "test-driven":         "write the failing test first, then the minimal code to make it pass — no implementation before a red test exists",
  "monorepo boundaries":  "respect the existing monorepo package boundaries — no cross-package imports that bypass the published package's public interface",
  "backwards compatible": "changes must be backwards compatible — no breaking changes to a public API or schema without an explicit major-version bump and migration note",
  "small commits":        "keep changes as small, reviewable, atomic commits — no bundling unrelated changes into a single commit",
}

// ─── Category defaults ────────────────────────────────────────────────────────
// Default output format now lives on each category's CodeCategoryTemplate
// (templates/*.ts, see defaultOutputFormat) instead of being duplicated here —
// this only holds the boundary/acceptance hints that have no template home.

export const CATEGORY_DEFAULTS: Record<string, {
  boundaryHint: string; acceptanceHint: string;
}> = {
  bugfix:   { boundaryHint: "only the file(s) containing the bug",                 acceptanceHint: "the reported error no longer occurs and the existing test suite still passes" },
  feature:  { boundaryHint: "only the files necessary to implement the stated feature", acceptanceHint: "the feature works as specified and has test coverage for the main path and at least one edge case" },
  refactor: { boundaryHint: "internal structure only — no change to public API or observable behavior", acceptanceHint: "all existing tests pass unchanged and no external behavior differs" },
  review:   { boundaryHint: "the diff or files under review only",                acceptanceHint: "every finding cites a specific file and line, ranked by severity" },
  test:     { boundaryHint: "test files only — no production code changes to make tests pass", acceptanceHint: "the new tests fail against the old behavior and pass against the intended behavior" },
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
