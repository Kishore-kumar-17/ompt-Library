// ─── Text Platform Formatter ────────────────────────────────────────────────────
// Converts structured prompt text to each text-LLM platform's native prompting
// style. No AI — pure string transformation. The most important divergences:
// Perplexity is RAG-grounded search, so heavy role-framing/persona instructions
// actively hurt it — it wants a direct, concise factual query, not a system
// prompt. Claude rewards explicit XML structure. Grok responds well to being
// told directly to skip hedging and to lean on its real-time/current-events
// awareness rather than a stale-knowledge caveat. DeepSeek rewards an explicit
// step-by-step reasoning trigger, scaled to how much depth was actually asked
// for rather than a fixed generic sentence.

import type { TextPlatformKey } from "./types.js"

// Every section label the builder/improver can emit, in the order they can
// appear. The extraction lookahead below stops at the next KNOWN label (or
// **LOCKS, or end of string) rather than "any line starting with a capital
// letter" — that generic heuristic broke on multi-line content (e.g. EXAMPLE
// blocks whose lines start with "Q:"/"A:"/"Input:") and could misfire on
// task text that happens to contain a capitalized line.
const KNOWN_LABELS = [
  "ROLE", "TASK", "QUESTION TYPE", "SCOPE DIMENSIONS", "CONSTRAINTS",
  "SOURCE HANDLING", "MAPPING", "AUDIENCE & TONE", "OUTPUT FORMAT",
  "REASONING", "EXAMPLE", "AVOID",
]

// Category-specific "extra" sections — at most one is ever present per
// generated prompt (the builder pushes exactly one, based on category).
const EXTRA_LABELS = ["QUESTION TYPE", "SCOPE DIMENSIONS", "CONSTRAINTS", "SOURCE HANDLING", "MAPPING"]

function escapeForRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function extractValue(text: string, label: string): string {
  const stopLabels = KNOWN_LABELS.filter((l) => l !== label).map(escapeForRegex)
  const stop = `(?:\\n(?:${stopLabels.join("|")}):|\\n\\*\\*LOCKS|$)`
  const regex = new RegExp(`${escapeForRegex(label)}:\\s*(.+?)(?=${stop})`, "si")
  const m = text.match(regex)
  return m?.[1]?.trim() ?? ""
}

function extractRole(text: string): string {
  const m = text.match(/ROLE:\s*You are\s*(.+?)\.?\s*(?=\n|$)/i)
  return m?.[1]?.trim() ?? ""
}

// Whichever category-specific section is present (SCOPE DIMENSIONS,
// CONSTRAINTS, SOURCE HANDLING, MAPPING, or QUESTION TYPE) — carries the
// category sub-mode guidance through to every platform's output instead of
// being silently dropped.
function extractExtras(raw: string): string {
  for (const label of EXTRA_LABELS) {
    const v = extractValue(raw, label)
    if (v) return v
  }
  return ""
}

function extractExample(raw: string): string {
  return extractValue(raw, "EXAMPLE")
}

function formatClaude(raw: string): string {
  const role    = extractRole(raw)
  const task    = extractValue(raw, "TASK")
  const extras  = extractExtras(raw)
  const tone    = extractValue(raw, "AUDIENCE & TONE")
  const format  = extractValue(raw, "OUTPUT FORMAT")
  const depth   = extractValue(raw, "REASONING")
  const example = extractExample(raw)
  const avoid   = extractValue(raw, "AVOID")
  const locks   = raw.match(/(\*\*LOCKS.*?)(?=\n\n|\*\*LOCKS|$)/gis)?.join("\n") ?? ""

  return [
    role    ? `<role>You are ${role}.</role>` : "",
    `<task>${task}</task>`,
    extras  ? `<guidance>${extras}</guidance>` : "",
    tone    ? `<audience_tone>${tone}</audience_tone>` : "",
    `<output_format>${format}</output_format>`,
    depth   ? `<reasoning>${depth}</reasoning>` : "",
    example ? `<example>${example}</example>` : "",
    avoid   ? `<avoid>${avoid}</avoid>` : "",
    "",
    locks,
  ].filter((l) => l !== undefined).join("\n")
}

function formatChatGPT(raw: string): string {
  const role    = extractRole(raw)
  const task    = extractValue(raw, "TASK")
  const extras  = extractExtras(raw)
  const tone    = extractValue(raw, "AUDIENCE & TONE")
  const format  = extractValue(raw, "OUTPUT FORMAT")
  const example = extractExample(raw)
  const avoid   = extractValue(raw, "AVOID")

  return [
    role ? `You are ${role}.` : "",
    "",
    `Task: ${task}`,
    extras ? `Guidance: ${extras}` : "",
    tone ? `Tone: ${tone}` : "",
    `Output format: ${format}`,
    example ? `Example:\n${example}` : "",
    avoid ? `Avoid: ${avoid}` : "",
  ].filter((l) => l !== undefined).join("\n")
}

function formatGemini(raw: string): string {
  const role    = extractRole(raw)
  const task    = extractValue(raw, "TASK")
  const extras  = extractExtras(raw)
  const tone    = extractValue(raw, "AUDIENCE & TONE")
  const format  = extractValue(raw, "OUTPUT FORMAT")
  const example = extractExample(raw)
  const avoid   = extractValue(raw, "AVOID")

  return [
    role ? `**Role:** ${role}` : "",
    `**Task:** ${task}`,
    extras ? `**Guidance:** ${extras}` : "",
    tone ? `**Tone:** ${tone}` : "",
    `**Format:** ${format}`,
    example ? `**Example:**\n${example}` : "",
    avoid ? `**Avoid:** ${avoid}` : "",
  ].filter((l) => l !== undefined).join("\n")
}

// Grok's real differentiators vs. a generic assistant persona: it's tuned to
// be direct and comfortable giving an actual opinion instead of hedging
// everything, and it has native awareness of current/real-time information —
// both are worth stating explicitly rather than reusing ChatGPT/Gemini's
// neutral, hedge-tolerant framing.
function formatGrok(raw: string): string {
  const role    = extractRole(raw)
  const task    = extractValue(raw, "TASK")
  const extras  = extractExtras(raw)
  const tone    = extractValue(raw, "AUDIENCE & TONE")
  const format  = extractValue(raw, "OUTPUT FORMAT")
  const example = extractExample(raw)
  const avoid   = extractValue(raw, "AVOID")

  return [
    role
      ? `You're ${role}. Be direct — give a real, opinionated answer where one is warranted instead of hedging everything.`
      : "Be direct — give a real, opinionated answer where one is warranted instead of hedging everything.",
    `Task: ${task}`,
    extras ? extras : "",
    format ? `Format: ${format}.` : "",
    tone ? `Tone: ${tone}.` : "",
    "If anything here touches current events or something time-sensitive, use your live/real-time knowledge and say so — don't fall back on a stale-training-data caveat.",
    example ? example : "",
    avoid ? `Avoid: ${avoid}` : "",
  ].filter(Boolean).join(" ")
}

function formatPerplexity(raw: string): string {
  // Deliberately minimal — Perplexity is a RAG-grounded search model. Role
  // framing, tone instructions, category guidance, and lock blocks add noise
  // rather than signal; a direct, concise factual query with a format hint
  // performs better.
  const task   = extractValue(raw, "TASK")
  const format = extractValue(raw, "OUTPUT FORMAT")

  return [task, format ? `Provide the answer as ${format}.` : ""].filter(Boolean).join(" ")
}

// DeepSeek's distinguishing behavior is its explicit reasoning trace. The
// trigger should scale with how much reasoning depth was actually requested —
// a fixed "think step-by-step" sentence tacked onto every prompt regardless of
// task (e.g. a one-line creative tagline) is generic filler, not a real quirk.
function formatDeepSeek(raw: string): string {
  const role    = extractRole(raw)
  const task    = extractValue(raw, "TASK")
  const extras  = extractExtras(raw)
  const format  = extractValue(raw, "OUTPUT FORMAT")
  const depth   = extractValue(raw, "REASONING")
  const example = extractExample(raw)
  const avoid   = extractValue(raw, "AVOID")

  const wantsDeepReasoning = /step[- ]by[- ]step|edge case|exhaustive|show.*working/i.test(depth)
  const reasoningTrigger = wantsDeepReasoning
    ? "Reason through this explicitly, step-by-step, before answering — lay out the intermediate reasoning first and don't skip steps even where the answer seems obvious."
    : "Think it through briefly before answering, but keep the visible reasoning short — this doesn't call for a long derivation."

  return [
    role ? `You are ${role}.` : "",
    "",
    `Task: ${task}`,
    extras ? extras : "",
    `Output format: ${format}`,
    depth ? `Depth: ${depth}.` : "",
    reasoningTrigger,
    example ? `Example:\n${example}` : "",
    avoid ? `Avoid: ${avoid}` : "",
  ].filter((l) => l !== undefined).join("\n")
}

export function formatForTextPlatform(raw: string, platform: TextPlatformKey): string {
  switch (platform) {
    case "claude":       return formatClaude(raw)
    case "chatgpt-text": return formatChatGPT(raw)
    case "gemini-text":  return formatGemini(raw)
    case "grok-text":    return formatGrok(raw)
    case "perplexity":   return formatPerplexity(raw)
    case "deepseek":     return formatDeepSeek(raw)
    default:             return raw
  }
}
