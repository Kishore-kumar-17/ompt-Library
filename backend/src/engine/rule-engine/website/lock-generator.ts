// ─── Website Lock Generator ─────────────────────────────────────────────────────
// Generates Website Formula v1.0's DESIGN SPECIFICATIONS section and the
// compact LOCKS block that restates it as a non-negotiable invariant. Website
// prompting doesn't fail on a single frame drifting (image) or a clip's
// motion drifting (video) — it fails on page N quietly using a different hex
// value, radius, or type scale than page 1. The LOCKS block exists so an AI
// website builder has one place, repeated at the very end of the prompt right
// before it starts generating, that pins the exact numbers across every page.

import type { WebsiteCategory } from "./types.js"
import { getPalette, getPaletteMood, getPaletteRadius, getTypography, getSpacing } from "./context-expander.js"
import { BREAKPOINTS } from "./dictionaries.js"

export function buildDesignSpecificationsSection(paletteName: string, category: WebsiteCategory): string {
  const { name, tokens } = getPalette(paletteName)
  const mood = getPaletteMood(name)
  const radius = getPaletteRadius(name)
  const type = getTypography(category)
  const spacing = getSpacing(category)
  const colorMode = /dark|neon/i.test(name) ? "Dark" : "Light"

  const lines = [
    "DESIGN SPECIFICATIONS:",
    `Visual style: ${mood}.`,
    `Color mode: ${colorMode}.`,
    "Color palette: "
      + `Background '${tokens.background}' | Surface '${tokens.surface}' | Section tint '${tokens.sectionTint}' | `
      + `Primary text '${tokens.primaryText}' | Secondary text '${tokens.secondaryText}' | Border '${tokens.border}' | `
      + `Primary action '${tokens.primaryAction}' | Action hover '${tokens.actionHover}' | `
      + `Accent success '${tokens.accentSuccess}' | Accent warning '${tokens.accentWarning}' | Accent data '${tokens.accentData}'.`,
    "Typography: "
      + `${type.fontFamily}. Display ${type.display} | H2 ${type.h2} | H3 ${type.h3} | Body ${type.body} | Small/meta ${type.small}.`,
    `Spacing: ${spacing}.`,
    `Radius: Cards '${radius.cards}', inputs '${radius.inputs}', buttons '${radius.buttons}', pills '${radius.pills}'.`,
    `Responsive breakpoints: ${BREAKPOINTS}.`,
    "Accessibility: WCAG AA minimum contrast on all text/background pairs, visible focus rings on every interactive element, no color-only status indicators.",
  ]
  return lines.join("\n")
}

export function generateWebsiteLocks(paletteName: string, category: WebsiteCategory): {
  designSystem: string
  typography: string
  spacing: string
  accessibility: string
} {
  const { name, tokens } = getPalette(paletteName)
  const radius = getPaletteRadius(name)
  const type = getTypography(category)
  const spacing = getSpacing(category)

  return {
    designSystem:
      `**LOCKS - DESIGN SYSTEM:** every page and component uses exactly these tokens — `
      + `background '${tokens.background}', surface '${tokens.surface}', primary action '${tokens.primaryAction}', `
      + `action hover '${tokens.actionHover}', border '${tokens.border}' — no page introduces a different background, `
      + `accent, or action color; no per-page one-off palette drift.`,
    typography:
      `**LOCKS - TYPOGRAPHY:** ${type.fontFamily} throughout, display/H2/H3/body/small sizes fixed as specified in `
      + `Design Specifications on every page — no page substitutes a different font family or invents an intermediate `
      + `heading size not in this scale.`,
    spacing:
      `**LOCKS - SPACING & RADIUS:** ${spacing}; radius cards '${radius.cards}' / inputs '${radius.inputs}' / `
      + `buttons '${radius.buttons}' / pills '${radius.pills}' held constant across every page and component — `
      + `no page tightens or loosens the grid, no component invents its own corner radius.`,
    accessibility:
      "**LOCKS - ACCESSIBILITY:** WCAG AA contrast and visible keyboard focus rings are non-negotiable on every "
      + "page and every interactive state (hover, active, disabled) — do not trade accessibility for visual polish.",
  }
}
