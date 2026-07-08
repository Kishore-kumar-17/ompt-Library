// ─── Code Platform Formatter ────────────────────────────────────────────────────
// Converts structured prompt text to each coding-assistant platform's native
// prompting style. No AI — pure string transformation. The key divergence:
// Claude Code / Cursor are agentic and can explore the repo themselves, so
// they need explicit scope boundaries more than pasted code — which is
// exactly why both keep the AVOID guardrail list and CONVENTIONS section
// rather than dropping them. Copilot rewards a short, comment-style brief
// over a long formal spec. ChatGPT/Gemini are non-agentic chat models that
// can't browse files, so they need an explicit reminder to paste the
// relevant code/error inline — and Gemini's large context window and
// preference for structured, stepwise instructions get their own treatment
// rather than cloning the ChatGPT layout.

import type { CodePlatformKey } from "./types.js"

// Every section label that can appear in the structured (pre-format) prompt
// text. Used as the "stop" boundary when extracting a label's value so that
// extraction only stops at a real section header — never partway through a
// multi-line value such as a pasted stack trace, which commonly contains
// capitalized frame/exception lines (e.g. "TypeError: ...", "Caused by: ...")
// that used to be mistaken for the start of the next section.
const KNOWN_SECTION_LABELS = [
  "TASK", "TECH STACK", "REPRO", "ACCEPTANCE CRITERIA", "NON-GOALS",
  "FOCUS AREAS", "COVERAGE TARGET", "OUTPUT FORMAT", "CONVENTIONS", "AVOID", "NOTES",
]

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function nextSectionLookahead(): string {
  const escaped = KNOWN_SECTION_LABELS.map(escapeRegExp).join("|")
  return `(?=\\n(?:${escaped}):|\\n\\*\\*LOCKS|$)`
}

function extractValue(text: string, label: string): string {
  const regex = new RegExp(`${escapeRegExp(label)}:\\s*(.+?)${nextSectionLookahead()}`, "si")
  const m = text.match(regex)
  return m?.[1]?.trim() ?? ""
}

// Category-specific extra section (REPRO / ACCEPTANCE CRITERIA / NON-GOALS /
// FOCUS AREAS / COVERAGE TARGET) — whichever one is present for this category.
const CATEGORY_EXTRA_LABELS = ["REPRO", "ACCEPTANCE CRITERIA", "NON-GOALS", "FOCUS AREAS", "COVERAGE TARGET"]

function extractCategoryExtra(text: string): { label: string; value: string } | null {
  for (const label of CATEGORY_EXTRA_LABELS) {
    const value = extractValue(text, label)
    if (value) return { label, value }
  }
  return null
}

function extractLocks(text: string): string {
  return text.match(/(\*\*LOCKS.*?)(?=\n\n|\*\*LOCKS|$)/gis)?.join("\n") ?? ""
}

// Splits an "AVOID: item1 | item2 | item3" value back into its individual
// anti-pattern lines.
function splitAvoidItems(avoid: string): string[] {
  return avoid.split("|").map((s) => s.trim()).filter(Boolean)
}

function formatClaudeCode(raw: string): string {
  const task       = extractValue(raw, "TASK")
  const stack      = extractValue(raw, "TECH STACK")
  const extra      = extractCategoryExtra(raw)
  const format     = extractValue(raw, "OUTPUT FORMAT")
  const convention = extractValue(raw, "CONVENTIONS")
  const avoid      = extractValue(raw, "AVOID")
  const locks      = extractLocks(raw)

  // Claude Code is agentic and can wander across the repo — it gets the
  // fuller, explicit guardrail list rather than a condensed one.
  const avoidBlock = avoid
    ? `Avoid:\n${splitAvoidItems(avoid).map((item) => `- ${item}`).join("\n")}`
    : ""

  return [
    `Task: ${task}`,
    stack ? `Stack: ${stack}.` : "",
    extra ? `${extra.label}: ${extra.value}` : "",
    convention ? `Conventions: ${convention}.` : "",
    `Output: ${format}.`,
    avoidBlock,
    "",
    locks,
  ].filter((l) => l !== undefined).join("\n")
}

function formatCursor(raw: string): string {
  // Cursor's inline chat rewards brevity — same content as Claude Code but
  // condensed to one-liners instead of full lock-block prose. Conventions
  // and the avoid-list are kept, but tight and scoped to the highest-signal
  // item(s) rather than the full explicit list Claude Code can take.
  const task       = extractValue(raw, "TASK")
  const stack      = extractValue(raw, "TECH STACK")
  const extra      = extractCategoryExtra(raw)
  const format     = extractValue(raw, "OUTPUT FORMAT")
  const convention = extractValue(raw, "CONVENTIONS")
  const avoid      = extractValue(raw, "AVOID")
  const boundary   = raw.match(/\*\*LOCKS - BOUNDARY:\*\*\s*(.+?)(?=\n|$)/i)?.[1]?.trim() ?? ""
  const acceptance = raw.match(/\*\*LOCKS - ACCEPTANCE:\*\*\s*(.+?)(?=\n|$)/i)?.[1]?.trim() ?? ""

  const conventionShort = convention ? convention.split(/[,;]/)[0].trim() : ""
  const avoidShort = avoid ? splitAvoidItems(avoid).slice(0, 2).join("; ") : ""

  return [
    task,
    stack ? `Stack: ${stack}.` : "",
    extra ? `${extra.label}: ${extra.value}.` : "",
    conventionShort ? `Conventions: ${conventionShort}.` : "",
    boundary ? `Scope: ${boundary}` : "",
    acceptance ? `Done when: ${acceptance}` : "",
    avoidShort ? `Avoid: ${avoidShort}.` : "",
    `Output: ${format}.`,
  ].filter(Boolean).join(" ")
}

function formatCopilot(raw: string): string {
  // Copilot rewards a short, comment-style brief over a formal spec.
  const task = extractValue(raw, "TASK")
  const format = extractValue(raw, "OUTPUT FORMAT")
  return `// ${task}\n// Output: ${format}`
}

function formatChatGPTCode(raw: string): string {
  const task       = extractValue(raw, "TASK")
  const stack      = extractValue(raw, "TECH STACK")
  const extra      = extractCategoryExtra(raw)
  const format     = extractValue(raw, "OUTPUT FORMAT")
  const convention = extractValue(raw, "CONVENTIONS")
  const avoid      = extractValue(raw, "AVOID")
  const locks      = extractLocks(raw)

  return [
    `Task: ${task}`,
    stack ? `Stack: ${stack}.` : "",
    extra ? `${extra.label}: ${extra.value}` : "",
    convention ? `Follow these conventions: ${convention}.` : "",
    `Respond with: ${format}.`,
    avoid ? `Avoid: ${avoid}` : "",
    "",
    locks,
    "",
    "[Paste the relevant code, file(s), or error message/stack trace below — this assistant cannot browse the repository.]",
  ].filter((l) => l !== undefined).join("\n")
}

function formatGeminiCode(raw: string): string {
  const task       = extractValue(raw, "TASK")
  const stack      = extractValue(raw, "TECH STACK")
  const extra      = extractCategoryExtra(raw)
  const format     = extractValue(raw, "OUTPUT FORMAT")
  const convention = extractValue(raw, "CONVENTIONS")
  const avoid      = extractValue(raw, "AVOID")
  const locks      = extractLocks(raw)

  // Real, distinct treatment for Gemini rather than a ChatGPT clone:
  //  1. Numbered instruction list — Gemini follows an explicit ordered list
  //     more reliably than loose prose.
  //  2. A request for a short plan before the code — Gemini's structured-
  //     output habits mean asking for that up front reduces the chance it
  //     jumps straight to a diff without checking it against the locks.
  //  3. The context note leans into Gemini's large context window: paste
  //     whole files, not just the failing snippet — more surrounding
  //     context helps rather than dilutes.
  const steps: string[] = [`1. Goal: ${task}`]
  if (stack) steps.push(`${steps.length + 1}. Stack: ${stack}`)
  if (extra) steps.push(`${steps.length + 1}. ${extra.label}: ${extra.value}`)

  return [
    "## Instructions",
    ...steps,
    "",
    convention ? `## Conventions\n${convention}` : "",
    avoid ? `## Avoid\n${avoid}` : "",
    `## Output\nFirst restate your plan in 2-3 bullet points, then provide ${format}.`,
    "",
    locks,
    "",
    "## Context",
    "Paste the full contents of every file involved (not just the failing snippet) plus any error output below. Gemini's long context window works best with complete surrounding context, and this assistant cannot browse the repository on its own.",
  ].filter((l) => l !== undefined).join("\n")
}

export function formatForCodePlatform(raw: string, platform: CodePlatformKey): string {
  switch (platform) {
    case "claude-code":  return formatClaudeCode(raw)
    case "cursor":       return formatCursor(raw)
    case "copilot":      return formatCopilot(raw)
    case "chatgpt-code": return formatChatGPTCode(raw)
    case "gemini-code":  return formatGeminiCode(raw)
    default:             return raw
  }
}
