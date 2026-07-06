// ─── Code Platform Formatter ────────────────────────────────────────────────────
// Converts structured prompt text to each coding-assistant platform's native
// prompting style. No AI — pure string transformation. The key divergence:
// Claude Code / Cursor are agentic and can explore the repo themselves, so
// they need explicit scope boundaries more than pasted code. Copilot rewards
// a short, comment-style brief over a long formal spec. ChatGPT/Gemini are
// non-agentic chat models that can't browse files, so they need an explicit
// reminder to paste the relevant code/error inline.

import type { CodePlatformKey } from "./types.js"

function extractValue(text: string, label: string): string {
  const regex = new RegExp(`${label}:\\s*(.+?)(?=\\n[A-Z]|\\*\\*LOCKS|$)`, "si")
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

function formatClaudeCode(raw: string): string {
  const task       = extractValue(raw, "TASK")
  const stack      = extractValue(raw, "TECH STACK")
  const extra      = extractCategoryExtra(raw)
  const format     = extractValue(raw, "OUTPUT FORMAT")
  const convention = extractValue(raw, "CONVENTIONS")
  const locks      = extractLocks(raw)

  return [
    `Task: ${task}`,
    stack ? `Stack: ${stack}.` : "",
    extra ? `${extra.label}: ${extra.value}` : "",
    convention ? `Conventions: ${convention}.` : "",
    `Output: ${format}.`,
    "",
    locks,
  ].filter((l) => l !== undefined).join("\n")
}

function formatCursor(raw: string): string {
  // Cursor's inline chat rewards brevity — same content as Claude Code but
  // condensed to one-liners instead of full lock-block prose.
  const task       = extractValue(raw, "TASK")
  const stack      = extractValue(raw, "TECH STACK")
  const extra      = extractCategoryExtra(raw)
  const format     = extractValue(raw, "OUTPUT FORMAT")
  const boundary   = raw.match(/\*\*LOCKS - BOUNDARY:\*\*\s*(.+?)(?=\n|$)/i)?.[1]?.trim() ?? ""
  const acceptance = raw.match(/\*\*LOCKS - ACCEPTANCE:\*\*\s*(.+?)(?=\n|$)/i)?.[1]?.trim() ?? ""

  return [
    task,
    stack ? `Stack: ${stack}.` : "",
    extra ? `${extra.label}: ${extra.value}.` : "",
    boundary ? `Scope: ${boundary}` : "",
    acceptance ? `Done when: ${acceptance}` : "",
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

  return [
    `**Task:** ${task}`,
    stack ? `**Stack:** ${stack}` : "",
    extra ? `**${extra.label}:** ${extra.value}` : "",
    convention ? `**Conventions:** ${convention}` : "",
    `**Output:** ${format}`,
    avoid ? `**Avoid:** ${avoid}` : "",
    "",
    locks,
    "",
    "**Note:** paste the relevant code and any error output below — this assistant cannot browse the repository.",
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
