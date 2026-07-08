// ─── Video Platform Formatter ──────────────────────────────────────────────────
// Converts structured prompt text to each video platform's native prompting
// style. No AI — pure string transformation, but each platform genuinely
// prompts differently: Kling wants explicit physics language, Sora wants
// narrative prose, Pika wants short punchy descriptions, Runway/Luma respond
// well to explicit camera-move vocabulary, Veo accepts natural-language
// camera direction inline with the action.

import type { VideoPlatformKey } from "./types.js"

interface Locks {
  motion: string
  camera: string
  temporal: string
  continuity: string
}

function extractValue(text: string, label: string): string {
  const regex = new RegExp(`${label}:\\s*(.+?)(?=\\n[A-Z]|\\*\\*LOCKS|$)`, "si")
  const m = text.match(regex)
  return m?.[1]?.trim() ?? ""
}

function formatKling(raw: string): string {
  const subject  = extractValue(raw, "SUBJECT")
  const action   = extractValue(raw, "ACTION")
  const setting  = extractValue(raw, "SETTING")
  const camera   = extractValue(raw, "CAMERA")
  const lighting = extractValue(raw, "LIGHTING")

  return [
    `${subject}.`,
    action   ? `${action}.` : "",
    setting  ? `Set in ${setting}.` : "",
    camera   ? `Camera: ${camera}.` : "",
    lighting ? `${lighting}.` : "",
    "Realistic human motion and physics, natural weight and momentum throughout.",
  ].filter(Boolean).join(" ")
}

function formatSora(raw: string): string {
  const subject  = extractValue(raw, "SUBJECT")
  const action   = extractValue(raw, "ACTION")
  const setting  = extractValue(raw, "SETTING")
  const camera   = extractValue(raw, "CAMERA")
  const lighting = extractValue(raw, "LIGHTING")
  const grade    = extractValue(raw, "COLOR GRADE")

  return [
    `A cinematic shot of ${subject}, set in ${setting || "a richly detailed environment"}.`,
    action ? `${action}.` : "",
    camera ? `Camera: ${camera}.` : "",
    lighting ? `Lit with ${lighting}.` : "",
    grade ? `Graded with a ${grade} look.` : "",
  ].filter(Boolean).join(" ")
}

function formatRunway(raw: string): string {
  const subject  = extractValue(raw, "SUBJECT")
  const action   = extractValue(raw, "ACTION")
  const setting  = extractValue(raw, "SETTING")
  const camera   = extractValue(raw, "CAMERA")
  const lighting = extractValue(raw, "LIGHTING")
  const grade    = extractValue(raw, "COLOR GRADE")
  const locks    = raw.match(/(\*\*LOCKS.*?)(?=\n\n|\*\*LOCKS|$)/gis)?.join("\n") ?? ""

  return [
    action ? `${subject}. ${action}` : `${subject}.`,
    setting  ? `Setting: ${setting}.` : "",
    `Camera movement: ${camera}.`,
    lighting ? `Lighting: ${lighting}.` : "",
    grade ? `Color grade: ${grade}.` : "",
    "",
    locks,
  ].filter((l) => l !== undefined).join("\n")
}

function formatPika(raw: string): string {
  const subject = extractValue(raw, "SUBJECT")
  const action  = extractValue(raw, "ACTION")
  const camera  = extractValue(raw, "CAMERA")

  // Pika rewards short, punchy prompts over long prose.
  return [subject, action, camera ? `-camera ${camera}` : ""].filter(Boolean).join(", ")
}

function formatLuma(raw: string): string {
  const subject  = extractValue(raw, "SUBJECT")
  const action   = extractValue(raw, "ACTION")
  const setting  = extractValue(raw, "SETTING")
  const camera   = extractValue(raw, "CAMERA")
  const lighting = extractValue(raw, "LIGHTING")

  return [
    `Subject: ${subject}`,
    action   ? `Action: ${action}`   : "",
    setting  ? `Environment: ${setting}` : "",
    `Camera: ${camera}`,
    lighting ? `Lighting: ${lighting}` : "",
  ].filter(Boolean).join("\n")
}

function formatVeo(raw: string): string {
  const subject  = extractValue(raw, "SUBJECT")
  const action   = extractValue(raw, "ACTION")
  const setting  = extractValue(raw, "SETTING")
  const camera   = extractValue(raw, "CAMERA")
  const lighting = extractValue(raw, "LIGHTING")

  return [
    action ? `${subject}, ${action}.` : `${subject}.`,
    setting  ? `The scene takes place in ${setting}.` : "",
    camera   ? `Camera: ${camera}.` : "",
    lighting ? `Lighting is ${lighting}.` : "",
  ].filter(Boolean).join(" ")
}

export function formatForVideoPlatform(raw: string, platform: VideoPlatformKey, locks: Locks): string {
  switch (platform) {
    case "kling":  return formatKling(raw)
    case "sora":   return formatSora(raw)
    case "runway": return formatRunway(raw)
    case "pika":   return formatPika(raw)
    case "luma":   return formatLuma(raw)
    case "veo":    return formatVeo(raw)
    default:       return raw
  }
}
