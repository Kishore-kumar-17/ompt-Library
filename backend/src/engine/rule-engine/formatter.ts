// ─── Platform Formatter ────────────────────────────────────────────────────────
// Converts structured prompt text to platform-specific output format.
// No AI — pure string transformation.

import type { PlatformKey } from "./types"

interface Locks {
  orientation: string
  framing: string
  light: string
  hand: string | null
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function extractValue(text: string, label: string): string {
  const regex = new RegExp(`${label}:\\s*(.+?)(?=\\n[A-Z]|\\*\\*LOCKS|$)`, "si")
  const m = text.match(regex)
  return m?.[1]?.trim() ?? ""
}

function toKeywords(text: string): string {
  return text
    .replace(/[()[\]{}]/g, "")
    .split(/[,;:\n|]+/)
    .map(s => s.trim())
    .filter(s => s.length > 2)
    .join(", ")
}

// ─── Platform formatters ──────────────────────────────────────────────────────

function formatChatGPT(raw: string): string {
  const subject  = extractValue(raw, "SUBJECT")
  const wardrobe = extractValue(raw, "WARDROBE")
  const setting  = extractValue(raw, "SETTING")
  const lighting = extractValue(raw, "LIGHTING")
  const camera   = extractValue(raw, "CAMERA")
  const skin     = extractValue(raw, "SKIN")
  const palette  = extractValue(raw, "PALETTE")
  const refs     = extractValue(raw, "REFS")
  const locks    = raw.match(/(\*\*LOCKS.*?)(?=\n\n|\*\*LOCKS|$)/gis)?.join("\n\n") ?? ""

  return [
    `A professional editorial photograph of ${subject}.`,
    wardrobe  ? `The subject wears ${wardrobe}.` : "",
    setting   ? `The scene is set in ${setting}.` : "",
    lighting  ? `${lighting}.` : "",
    camera    ? `Shot on ${camera}.` : "",
    skin      ? `Skin rendered with ${skin}.` : "",
    palette   ? `Colour palette: ${palette}.` : "",
    refs      ? `Visual references: ${refs}.` : "",
    locks,
  ].filter(Boolean).join(" ")
}

function formatGemini(raw: string): string {
  const subject  = extractValue(raw, "SUBJECT")
  const wardrobe = extractValue(raw, "WARDROBE")
  const setting  = extractValue(raw, "SETTING")
  const lighting = extractValue(raw, "LIGHTING")
  const camera   = extractValue(raw, "CAMERA")
  const palette  = extractValue(raw, "PALETTE")
  const locks    = raw.match(/(\*\*LOCKS.*?)(?=\n\n|\*\*LOCKS|$)/gis)?.join("\n") ?? ""

  return [
    `Subject: ${subject}`,
    wardrobe ? `Wardrobe: ${wardrobe}` : "",
    setting  ? `Setting: ${setting}`  : "",
    lighting ? `Lighting: ${lighting}`: "",
    camera   ? `Camera: ${camera}`    : "",
    palette  ? `Palette: ${palette}`  : "",
    "",
    locks,
  ].filter(l => l !== undefined).join("\n")
}

function formatMidjourney(raw: string, locks: Locks): string {
  const subject  = extractValue(raw, "SUBJECT")
  const wardrobe = extractValue(raw, "WARDROBE")
  const setting  = extractValue(raw, "SETTING")
  const lighting = extractValue(raw, "LIGHTING")

  const kwSubject  = toKeywords(subject)
  const kwWardrobe = toKeywords(wardrobe)
  const kwSetting  = toKeywords(setting)
  const kwLighting = toKeywords(lighting)

  // Extract AR from orientation lock for --ar param
  const arMatch = locks.framing.match(/canvas AR ([\d:]+)/)
  const ar = arMatch?.[1] ?? "2:3"

  const kw = [kwSubject, kwWardrobe, kwSetting, kwLighting]
    .filter(Boolean)
    .join(", ")

  // LOCK block in midjourney hyphen-concatenated format
  const lockBlock = [
    `:: ORIENTATION primary-subject-facing-${locks.orientation.match(/facing (\d+deg \S+)/)?.[1]?.replace(/\s+/g, "-") ?? "20deg-camera-right"}`,
    `:: FRAMING orthographic-gallery-view camera-perpendicular-0deg`,
    `:: LIGHT archival-soft-source ${locks.light.match(/(\d+K)/)?.[1] ?? "5600K"}-altitude`,
  ].join(" ")

  return `${kw} ${lockBlock} --ar ${ar} --v 6.1 --stylize 500 --style raw --q 2 --no plastic-skin, extra-fingers, ai-artifacts, warped-geometry`
}

function formatFlux(raw: string): string {
  const sections = raw.split(/\n\n/)
  return sections
    .map(s => s.trim())
    .filter(Boolean)
    .join("\n\n")
}

function formatFirefly(raw: string): string {
  const subject  = extractValue(raw, "SUBJECT")
  const wardrobe = extractValue(raw, "WARDROBE")
  const setting  = extractValue(raw, "SETTING")
  const lighting = extractValue(raw, "LIGHTING")
  const palette  = extractValue(raw, "PALETTE")

  return [
    `Photographic portrait of ${subject}.`,
    wardrobe ? `Wearing: ${wardrobe}.` : "",
    setting  ? `Environment: ${setting}.` : "",
    lighting ? `Light quality: ${lighting}.` : "",
    palette  ? `Colour story: ${palette}.` : "",
    "Style: editorial photography, professional colour grade, high production value.",
  ].filter(Boolean).join(" ")
}

function formatGrok(raw: string): string {
  const subject  = extractValue(raw, "SUBJECT")
  const wardrobe = extractValue(raw, "WARDROBE")
  const setting  = extractValue(raw, "SETTING")
  const lighting = extractValue(raw, "LIGHTING")

  return [
    `Professional photo: ${subject}`,
    wardrobe ? `wearing ${wardrobe}` : "",
    setting  ? `in ${setting}` : "",
    lighting ? `lit with ${lighting}` : "",
    "— editorial quality, sharp detail, cinematic grade.",
  ].filter(Boolean).join(", ")
}

// ─── Main dispatcher ──────────────────────────────────────────────────────────

export function formatForPlatform(raw: string, platform: PlatformKey, locks: Locks): string {
  switch (platform) {
    case "chatgpt":    return formatChatGPT(raw)
    case "gemini":     return formatGemini(raw)
    case "midjourney": return formatMidjourney(raw, locks)
    case "flux":       return formatFlux(raw)
    case "firefly":    return formatFirefly(raw)
    case "grok":       return formatGrok(raw)
    default:           return raw
  }
}
