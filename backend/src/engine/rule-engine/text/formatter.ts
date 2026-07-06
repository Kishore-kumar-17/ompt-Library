// ─── Text Platform Formatter ────────────────────────────────────────────────────
// Converts structured prompt text to each text-LLM platform's native prompting
// style. No AI — pure string transformation. The most important divergence:
// Perplexity is RAG-grounded search, so heavy role-framing/persona instructions
// actively hurt it — it wants a direct, concise factual query, not a system
// prompt. Claude rewards explicit XML structure; DeepSeek rewards an explicit
// step-by-step trigger for its reasoning behavior.

import type { TextPlatformKey } from "./types.js"

function extractValue(text: string, label: string): string {
  const regex = new RegExp(`${label}:\\s*(.+?)(?=\\n[A-Z]|\\*\\*LOCKS|$)`, "si")
  const m = text.match(regex)
  return m?.[1]?.trim() ?? ""
}

function extractRole(text: string): string {
  const m = text.match(/ROLE:\s*You are\s*(.+?)\.?\s*(?=\n|$)/i)
  return m?.[1]?.trim() ?? ""
}

function formatClaude(raw: string): string {
  const role   = extractRole(raw)
  const task   = extractValue(raw, "TASK")
  const tone   = extractValue(raw, "AUDIENCE & TONE")
  const format = extractValue(raw, "OUTPUT FORMAT")
  const depth  = extractValue(raw, "REASONING")
  const avoid  = extractValue(raw, "AVOID")
  const locks  = raw.match(/(\*\*LOCKS.*?)(?=\n\n|\*\*LOCKS|$)/gis)?.join("\n") ?? ""

  return [
    role   ? `<role>You are ${role}.</role>` : "",
    `<task>${task}</task>`,
    tone   ? `<audience_tone>${tone}</audience_tone>` : "",
    `<output_format>${format}</output_format>`,
    depth  ? `<reasoning>${depth}</reasoning>` : "",
    avoid  ? `<avoid>${avoid}</avoid>` : "",
    "",
    locks,
  ].filter((l) => l !== undefined).join("\n")
}

function formatChatGPT(raw: string): string {
  const role   = extractRole(raw)
  const task   = extractValue(raw, "TASK")
  const tone   = extractValue(raw, "AUDIENCE & TONE")
  const format = extractValue(raw, "OUTPUT FORMAT")
  const avoid  = extractValue(raw, "AVOID")

  return [
    role ? `You are ${role}.` : "",
    "",
    `Task: ${task}`,
    tone ? `Tone: ${tone}` : "",
    `Output format: ${format}`,
    avoid ? `Avoid: ${avoid}` : "",
  ].filter((l) => l !== undefined).join("\n")
}

function formatGemini(raw: string): string {
  const role   = extractRole(raw)
  const task   = extractValue(raw, "TASK")
  const tone   = extractValue(raw, "AUDIENCE & TONE")
  const format = extractValue(raw, "OUTPUT FORMAT")
  const avoid  = extractValue(raw, "AVOID")

  return [
    role ? `**Role:** ${role}` : "",
    `**Task:** ${task}`,
    tone ? `**Tone:** ${tone}` : "",
    `**Format:** ${format}`,
    avoid ? `**Avoid:** ${avoid}` : "",
  ].filter((l) => l !== undefined).join("\n")
}

function formatGrok(raw: string): string {
  const role   = extractRole(raw)
  const task   = extractValue(raw, "TASK")
  const format = extractValue(raw, "OUTPUT FORMAT")
  const tone   = extractValue(raw, "AUDIENCE & TONE")

  return [
    role ? `Acting as ${role}, ${task}` : task,
    format ? `Format: ${format}.` : "",
    tone ? `Tone: ${tone}.` : "",
  ].filter(Boolean).join(" ")
}

function formatPerplexity(raw: string): string {
  // Deliberately minimal — Perplexity is a RAG-grounded search model. Role
  // framing, tone instructions, and lock blocks add noise rather than signal;
  // a direct, concise factual query with a format hint performs better.
  const task   = extractValue(raw, "TASK")
  const format = extractValue(raw, "OUTPUT FORMAT")

  return [task, format ? `Provide the answer as ${format}.` : ""].filter(Boolean).join(" ")
}

function formatDeepSeek(raw: string): string {
  const role   = extractRole(raw)
  const task   = extractValue(raw, "TASK")
  const format = extractValue(raw, "OUTPUT FORMAT")
  const depth  = extractValue(raw, "REASONING")
  const avoid  = extractValue(raw, "AVOID")

  return [
    role ? `You are ${role}.` : "",
    "",
    `Task: ${task}`,
    `Output format: ${format}`,
    depth ? `${depth}.` : "",
    "Think step-by-step before giving the final answer.",
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
