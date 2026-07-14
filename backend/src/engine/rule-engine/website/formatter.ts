// ─── Website Platform Formatter ────────────────────────────────────────────────
// Converts the structured Website Formula v1.0 prompt to each target
// AI-website-builder's native prompting style. No AI — pure string
// transformation, but each of the 8 platforms genuinely prompts differently:
// Lovable/v0/Claude Artifacts read a full numbered spec document but each
// wants a different framing device around it (React+Tailwind brief, a
// component/route manifest, a single-artifact brief); Bolt/Grok want a
// file-by-file scaffold; Cursor wants an engineering task list with
// acceptance criteria; ChatGPT Canvas wants a conversational iterative build;
// Gemini responds well to an explicit layered (design/data/component/motion)
// spec.

import type { WebsitePlatformKey } from "./types.js"
import type { PaletteTokens } from "./dictionaries.js"

interface Locks {
  designSystem: string
  typography: string
  spacing: string
  accessibility: string
}

const SECTION_LABELS = [
  "ROLE", "APPLICATION OVERVIEW", "BRAND VOICE & MOOD", "CORE FEATURES & FUNCTIONALITY",
  "DESIGN SPECIFICATIONS", "CONTENT & COPYWRITING GUIDELINES", "TECHNICAL & STACK CONSTRAINTS",
  "SEO & PERFORMANCE", "INTERACTIONS & MICRO-ANIMATIONS", "CONSTRAINTS & NON-GOALS",
]

function escapeRegex(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\&]/g, "\\$&")
}

function extractSection(raw: string, label: string): string {
  const stopPattern = SECTION_LABELS.map(escapeRegex).join("|")
  const regex = new RegExp(`${escapeRegex(label)}:\\s*([\\s\\S]*?)(?=\\n(?:${stopPattern}):|\\n\\*\\*LOCKS|$)`, "i")
  const m = raw.match(regex)
  return m?.[1]?.trim() ?? ""
}

interface FeatureLine { name: string; detail: string }

function extractFeatureLines(raw: string): FeatureLine[] {
  const block = extractSection(raw, "CORE FEATURES & FUNCTIONALITY")
  const lines: FeatureLine[] = []
  for (const line of block.split("\n")) {
    const m = line.match(/^\d+\.\s*(.+?)\s*-\s*(.+)$/)
    if (m) lines.push({ name: m[1].trim(), detail: m[2].trim() })
  }
  return lines
}

function cssVarBlock(palette: PaletteTokens): string {
  return [
    "--bg: " + palette.background + ";",
    "--surface: " + palette.surface + ";",
    "--tint: " + palette.sectionTint + ";",
    "--ink: " + palette.primaryText + ";",
    "--muted: " + palette.secondaryText + ";",
    "--border: " + palette.border + ";",
    "--action: " + palette.primaryAction + ";",
    "--action-hover: " + palette.actionHover + ";",
    "--success: " + palette.accentSuccess + ";",
    "--warning: " + palette.accentWarning + ";",
    "--data: " + palette.accentData + ";",
  ].join("\n  ")
}

function slug(name: string): string {
  return name.replace(/[^a-zA-Z0-9]+/g, "-").replace(/(^-|-$)/g, "").toLowerCase() || "page"
}

// ─── Lovable ───────────────────────────────────────────────────────────────────
// Full numbered spec document, React + Tailwind framing up top (Lovable
// builds full React apps from a single conversational brief).

function formatLovable(raw: string, locks: Locks): string {
  const parts = [
    "Build this as a fully responsive React + Tailwind CSS site, component-driven, mobile-first. Follow every section below exactly — do not skip, reorder, or invent sections.",
    "",
  ]
  SECTION_LABELS.forEach((label, i) => {
    const body = extractSection(raw, label)
    parts.push(`### Section ${i + 1} - ${toTitleCase(label)}`, "", body, "", "---", "")
  })
  parts.push(
    `### Section ${SECTION_LABELS.length + 1} - Non-Negotiable Design Locks`, "",
    locks.designSystem, "", locks.typography, "", locks.spacing, "", locks.accessibility,
  )
  return parts.join("\n")
}

function toTitleCase(label: string): string {
  return label.split(" ").map((w) => (w.length <= 3 && w === w.toUpperCase() ? w : w.charAt(0) + w.slice(1).toLowerCase())).join(" ")
}

// ─── Bolt ──────────────────────────────────────────────────────────────────────
// Bolt.new scaffolds fast — a short imperative brief, a CSS-vars design-token
// block, and a component-bullet list rather than a full prose document.

function formatBolt(raw: string, palette: PaletteTokens): string {
  const overview = extractSection(raw, "APPLICATION OVERVIEW")
  const goalLine = overview.split("\n").find((l) => /^primary goal/i.test(l.trim())) ?? ""
  const features = extractFeatureLines(raw)
  const constraints = extractSection(raw, "CONSTRAINTS & NON-GOALS").split("\n").filter(Boolean)

  const lines = [
    `Scaffold a production website. Next.js 14 + TypeScript + Tailwind + CSS vars.`,
    "",
    "```css",
    ":root {",
    "  " + cssVarBlock(palette),
    "}",
    "```",
    "",
    "Components:",
    ...features.slice(0, 6).map((f) => `- '${f.name.replace(/[^a-zA-Z0-9]/g, "")}Section' - ${f.detail}`),
    "",
    goalLine || "Primary goal: convert the visitor into the site's core action.",
    ...constraints.slice(0, 2),
    "",
    "---",
  ]
  return lines.join("\n")
}

// ─── v0 ────────────────────────────────────────────────────────────────────────
// v0 (Vercel) generates React components against shadcn/ui + the Next.js App
// Router — frame as a route + component manifest with a Tailwind token
// extension, not a prose document.

function formatV0(raw: string, palette: PaletteTokens, categoryLabel: string): string {
  const role = extractSection(raw, "ROLE")
  const features = extractFeatureLines(raw)
  const voice = extractSection(raw, "BRAND VOICE & MOOD")

  const lines = [
    `Generate a Next.js App Router site using shadcn/ui + Tailwind CSS for a ${categoryLabel.toLowerCase()}.`,
    "",
    `Context: ${role}`,
    "",
    "Routes / pages:",
    ...features.map((f) => `- 'app/${slug(f.name)}/page.tsx' — ${f.name}: ${f.detail}`),
    "",
    "Tailwind theme extension (tailwind.config):",
    "colors: {",
    `  background: '${palette.background}', surface: '${palette.surface}', tint: '${palette.sectionTint}',`,
    `  ink: '${palette.primaryText}', muted: '${palette.secondaryText}',`,
    `  action: '${palette.primaryAction}', 'action-hover': '${palette.actionHover}',`,
    "},",
    "",
    voice,
    "",
    "Use shadcn/ui primitives (Button, Card, Input, Dialog) wherever a native equivalent exists rather than hand-rolling components.",
  ]
  return lines.join("\n")
}

// ─── Cursor ────────────────────────────────────────────────────────────────────
// Cursor is an in-editor AI pair-programmer — frame as an engineering task
// list with explicit acceptance criteria, not a creative brief.

function formatCursor(raw: string, locks: Locks): string {
  const features = extractFeatureLines(raw)
  const technical = extractSection(raw, "TECHNICAL & STACK CONSTRAINTS").split("\n").filter(Boolean)
  const constraints = extractSection(raw, "CONSTRAINTS & NON-GOALS").split("\n").filter(Boolean)

  const lines = [
    "TASK: Build the following website in this codebase.",
    "",
    "Tech stack: React + TypeScript + Tailwind CSS (or the stack already in this repo if one exists — match existing conventions over introducing a new one).",
    "",
    "Implementation steps:",
    ...features.map((f, i) => `${i + 1}. 'src/pages/${slug(f.name)}' — ${f.name}: ${f.detail}`),
    "",
    "Technical constraints:",
    ...technical.map((t) => `- ${t}`),
    "",
    "Acceptance criteria:",
    ...constraints.map((c) => `- ${c}`),
    `- Design matches the DESIGN SPECIFICATIONS exactly: ${locks.designSystem.replace("**LOCKS - DESIGN SYSTEM:** ", "")}`,
    "",
    "Definition of done: builds cleanly with no type errors, responsive at every breakpoint, and every page listed above exists and is reachable from navigation.",
  ]
  return lines.join("\n")
}

// ─── ChatGPT Canvas ────────────────────────────────────────────────────────────
// Conversational, iterative build framing — matches how ChatGPT is actually
// driven turn-by-turn against a canvas document.

function formatChatGPT(raw: string, palette: PaletteTokens, categoryLabel: string): string {
  const features = extractFeatureLines(raw)
  const voice = extractSection(raw, "BRAND VOICE & MOOD").split("\n")[0] ?? ""

  const lines = [
    `Let's build a ${categoryLabel.toLowerCase()} — ${voice.replace("Voice is ", "").replace(/\.$/, "")}.`,
    "",
    "**Design system:**",
    `- Background '${palette.background}'; Surface '${palette.surface}'; Tint '${palette.sectionTint}'; Text '${palette.primaryText}'; Muted '${palette.secondaryText}'; Action '${palette.primaryAction}'`,
    "",
    "**Build iteratively:**",
    ...features.map((f, i) => `${i + 1}. **${f.name}** - ${f.detail}`),
    "",
    "Show me each page as you build it before moving to the next one so I can course-correct early.",
  ]
  return lines.join("\n")
}

// ─── Claude Artifacts ──────────────────────────────────────────────────────────
// Claude Artifacts renders a single self-contained file — frame the whole
// site as one artifact-safe build with no external calls/assets.

function formatClaude(raw: string, locks: Locks): string {
  const role = extractSection(raw, "ROLE")
  const overview = extractSection(raw, "APPLICATION OVERVIEW")
  const features = extractFeatureLines(raw)
  const design = extractSection(raw, "DESIGN SPECIFICATIONS")

  const lines = [
    "Build this as a single self-contained React artifact — one file, inline Tailwind classes, no external API calls, no external image URLs beyond a placeholder image service, all sections reachable via in-page state or anchor scrolling (no real routing).",
    "",
    `Brief: ${role}`,
    "",
    overview,
    "",
    "Sections to implement in this artifact, top to bottom:",
    ...features.map((f, i) => `${i + 1}. ${f.name} - ${f.detail}`),
    "",
    design,
    "",
    locks.designSystem,
    locks.typography,
  ]
  return lines.join("\n")
}

// ─── Gemini ────────────────────────────────────────────────────────────────────
// Layered framing (design / data / component / motion) — matches how Gemini
// responds well to explicit architectural layering in a single dense prompt.

function formatGemini(raw: string, palette: PaletteTokens, locks: Locks): string {
  const features = extractFeatureLines(raw)
  const interactions = extractSection(raw, "INTERACTIONS & MICRO-ANIMATIONS").split("\n").filter(Boolean)

  const lines = [
    "Design and implement a complete website across the pages below.",
    "",
    "**Design layer:** "
      + `background '${palette.background}', surface '${palette.surface}', tint '${palette.sectionTint}', `
      + `ink '${palette.primaryText}', muted '${palette.secondaryText}', action '${palette.primaryAction}'. `
      + locks.typography.replace("**LOCKS - TYPOGRAPHY:** ", ""),
    "",
    "**Data layer:** " + features.map((f) => `'${f.name}'`).join(", ") + " each backed by a typed content model, not inline hardcoded strings.",
    "",
    "**Component layer:** " + features.map((f) => `'${f.name}Section' (${f.detail})`).join(". "),
    "",
    "**Motion layer:** " + interactions.join(" "),
    "",
    locks.designSystem,
    locks.accessibility,
  ]
  return lines.join("\n")
}

// ─── Grok ──────────────────────────────────────────────────────────────────────
// Numbered file-by-file scaffold ending in explicit QA checks — matches how
// Grok's coding-agent-style output is actually structured and verified.

function formatGrok(raw: string, palette: PaletteTokens): string {
  const features = extractFeatureLines(raw)
  const constraints = extractSection(raw, "CONSTRAINTS & NON-GOALS").split("\n").filter(Boolean)

  const lines = [
    "Implement the following website. Next.js 14, TypeScript, Tailwind.",
    "",
    `1. 'src/app/globals.css' — CSS vars: '--bg: ${palette.background}; --action: ${palette.primaryAction}; --ink: ${palette.primaryText}; --muted: ${palette.secondaryText}'`,
    `2. 'src/types/index.ts' — one interface per page entity listed below`,
    `3. 'src/lib/data.ts' — mock content for every page`,
    ...features.map((f, i) => `${i + 4}. 'src/app/${slug(f.name)}/page.tsx' — ${f.name}: ${f.detail}`),
    `${features.length + 4}. QA: ${constraints[0] ?? "verify all constraints above"}; 'npx tsc --noEmit' → 0 errors`,
  ]
  return lines.join("\n")
}

export function formatForWebsitePlatform(
  raw: string,
  platform: WebsitePlatformKey,
  locks: Locks,
  palette: PaletteTokens,
  categoryLabel: string
): string {
  switch (platform) {
    case "lovable": return formatLovable(raw, locks)
    case "bolt":    return formatBolt(raw, palette)
    case "v0":      return formatV0(raw, palette, categoryLabel)
    case "cursor":  return formatCursor(raw, locks)
    case "chatgpt": return formatChatGPT(raw, palette, categoryLabel)
    case "claude":  return formatClaude(raw, locks)
    case "gemini":  return formatGemini(raw, palette, locks)
    case "grok":    return formatGrok(raw, palette)
    default:        return raw
  }
}
