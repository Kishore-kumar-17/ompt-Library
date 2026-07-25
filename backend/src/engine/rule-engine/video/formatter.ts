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
  // Section labels are always emitted in UPPERCASE at the start of their own
  // line (builder.ts joins sections with "\n\n"). Matching case-insensitively
  // without a line-start anchor let this accidentally match a lowercase
  // "style:"/"category:" occurrence embedded mid-line inside an enrichment
  // hint annotation folded into SUBJECT/ACTION (e.g. "... (style: Cinematic;
  // category: ...)"), pulling the wrong text into that section entirely.
  const regex = new RegExp(`(?:^|\\n)${label}:\\s*(.+?)(?=\\n[A-Z][A-Z ]*:|\\n\\*\\*LOCKS|$)`, "s")
  const m = text.match(regex)
  return m?.[1]?.trim() ?? ""
}

// SUBJECT is frequently a plain, undictionaried short prefix of the exact
// same text ACTION carries in full (e.g. any idea the SUBJECT dictionary
// doesn't recognize) — printing both back-to-back then reads as the same
// words twice ("a lone astronaut walking, a lone astronaut walking across a
// red desert"). When ACTION already starts with SUBJECT, collapse them into
// one clause instead of repeating it.
function extractSubjectAction(raw: string): { subject: string; action: string } {
  const subject = extractValue(raw, "SUBJECT")
  const action = extractValue(raw, "ACTION")
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim()
  if (subject && action && norm(action).startsWith(norm(subject))) {
    return { subject: action, action: "" }
  }
  return { subject, action }
}

function formatKling(raw: string): string {
  const { subject, action } = extractSubjectAction(raw)
  const setting  = extractValue(raw, "SETTING")
  const camera   = extractValue(raw, "CAMERA")
  const lighting = extractValue(raw, "LIGHTING")
  const style    = extractValue(raw, "STYLE")
  const quality  = extractValue(raw, "QUALITY TAG")
  const audio    = extractValue(raw, "AUDIO")
  const aspect   = extractValue(raw, "ASPECT RATIO")
  const duration = extractValue(raw, "DURATION")

  return [
    `${subject}.`,
    action   ? `${action}.` : "",
    setting  ? `Set in ${setting}.` : "",
    camera   ? `Camera: ${camera}.` : "",
    lighting ? `${lighting}.` : "",
    "Realistic human motion and physics, natural weight and momentum throughout.",
    style    ? `${style} style.` : "",
    quality  ? `${quality}.` : "",
    audio    ? `Audio: ${audio}.` : "",
    (duration || aspect) ? `Duration: ${duration || "N/A"}. Aspect ratio: ${aspect || "N/A"}.` : "",
  ].filter(Boolean).join(" ")
}

function formatSora(raw: string): string {
  const { subject, action } = extractSubjectAction(raw)
  const setting  = extractValue(raw, "SETTING")
  const camera   = extractValue(raw, "CAMERA")
  const lighting = extractValue(raw, "LIGHTING")
  const grade    = extractValue(raw, "COLOR GRADE")
  const style    = extractValue(raw, "STYLE")
  const quality  = extractValue(raw, "QUALITY TAG")
  const audio    = extractValue(raw, "AUDIO")
  const aspect   = extractValue(raw, "ASPECT RATIO")
  const duration = extractValue(raw, "DURATION")

  return [
    `A ${style || "cinematic"} shot of ${subject}, set in ${setting || "a richly detailed environment"}.`,
    action ? `${action}.` : "",
    camera ? `Camera: ${camera}.` : "",
    lighting ? `Lit with ${lighting}.` : "",
    grade ? `Graded with a ${grade} look.` : "",
    audio ? `Audio: ${audio}.` : "",
    quality ? `Quality: ${quality}.` : "",
    (duration || aspect) ? `Duration: ${duration || "N/A"}, aspect ratio ${aspect || "N/A"}.` : "",
  ].filter(Boolean).join(" ")
}

function formatRunway(raw: string): string {
  const { subject, action } = extractSubjectAction(raw)
  const setting  = extractValue(raw, "SETTING")
  const camera   = extractValue(raw, "CAMERA")
  const lighting = extractValue(raw, "LIGHTING")
  const grade    = extractValue(raw, "COLOR GRADE")
  const style    = extractValue(raw, "STYLE")
  const quality  = extractValue(raw, "QUALITY TAG")
  const audio    = extractValue(raw, "AUDIO")
  const aspect   = extractValue(raw, "ASPECT RATIO")
  const duration = extractValue(raw, "DURATION")
  const locks    = raw.match(/(\*\*LOCKS.*?)(?=\n\n|\*\*LOCKS|$)/gis)?.join("\n") ?? ""

  return [
    action ? `${subject}. ${action}` : `${subject}.`,
    setting  ? `Setting: ${setting}.` : "",
    `Camera movement: ${camera}.`,
    lighting ? `Lighting: ${lighting}.` : "",
    grade ? `Color grade: ${grade}.` : "",
    style ? `Style: ${style}.` : "",
    quality ? `Quality: ${quality}.` : "",
    audio ? `Audio: ${audio}.` : "",
    duration ? `Duration: ${duration}.` : "",
    aspect ? `Aspect ratio: ${aspect}.` : "",
    "",
    locks,
  ].filter((l) => l !== undefined).join("\n")
}

function formatPika(raw: string): string {
  const { subject, action } = extractSubjectAction(raw)
  const camera   = extractValue(raw, "CAMERA")
  const quality  = extractValue(raw, "QUALITY TAG")
  const duration = extractValue(raw, "DURATION")
  const aspect   = extractValue(raw, "ASPECT RATIO")

  // Pika rewards short, punchy prompts over long prose.
  return [
    subject, action, camera ? `-camera ${camera}` : "", quality,
    duration ? `${duration}` : "", aspect ? `${aspect}` : "",
  ].filter(Boolean).join(", ")
}

function formatLuma(raw: string): string {
  const { subject, action } = extractSubjectAction(raw)
  const setting  = extractValue(raw, "SETTING")
  const camera   = extractValue(raw, "CAMERA")
  const lighting = extractValue(raw, "LIGHTING")
  const style    = extractValue(raw, "STYLE")
  const quality  = extractValue(raw, "QUALITY TAG")
  const audio    = extractValue(raw, "AUDIO")
  const aspect   = extractValue(raw, "ASPECT RATIO")
  const duration = extractValue(raw, "DURATION")

  return [
    `Subject: ${subject}`,
    action   ? `Action: ${action}`   : "",
    setting  ? `Environment: ${setting}` : "",
    `Camera: ${camera}`,
    lighting ? `Lighting: ${lighting}` : "",
    style    ? `Style: ${style}` : "",
    quality  ? `Quality: ${quality}` : "",
    audio    ? `Audio: ${audio}` : "",
    duration ? `Duration: ${duration}` : "",
    aspect   ? `Aspect ratio: ${aspect}` : "",
  ].filter(Boolean).join("\n")
}

function formatVeo(raw: string): string {
  const { subject, action } = extractSubjectAction(raw)
  const setting  = extractValue(raw, "SETTING")
  const camera   = extractValue(raw, "CAMERA")
  const lighting = extractValue(raw, "LIGHTING")
  const style    = extractValue(raw, "STYLE")
  const quality  = extractValue(raw, "QUALITY TAG")
  const audio    = extractValue(raw, "AUDIO")
  const aspect   = extractValue(raw, "ASPECT RATIO")
  const duration = extractValue(raw, "DURATION")

  return [
    action ? `${subject}, ${action}.` : `${subject}.`,
    setting  ? `The scene takes place in ${setting}.` : "",
    camera   ? `Camera: ${camera}.` : "",
    lighting ? `Lighting is ${lighting}.` : "",
    style    ? `Shot in a ${style} style.` : "",
    audio    ? `Audio: ${audio}.` : "",
    quality  ? `${quality}.` : "",
    (duration || aspect) ? `Duration: ${duration || "N/A"}. Aspect ratio: ${aspect || "N/A"}.` : "",
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
