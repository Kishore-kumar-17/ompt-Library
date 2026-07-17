# 00 — Orchestrator
## Design-Forward Developer Blog · portfolio_platform_07

---

## Site Context

**Reference:** joshwcomeau.com — developer with strong design sensibility
**Type:** Design-forward developer blog with interactive MDX tutorials
**Content focus:** CSS, React, animations, JavaScript, web performance
**Audience:** Web developers who want to understand the *why* behind techniques, not just the *how*

---

## What Makes This Site Distinctive

1. **HSL color system** — every color is a CSS custom property with an HSL value. Not hex. Not RGB. HSL. This is both a technical statement and a teaching tool (Josh wrote a famous essay on HSL for color systems).

2. **No-flash dark mode** — an inline `<script>` in `<head>` runs before CSS loads, reading localStorage and setting `data-theme` on `<html>`. No white flash on dark-mode reload.

3. **Saturated palette** — deep navy background + bright blue + bright pink. Not muted. Not grey. The site looks vivid on a good monitor.

4. **Category color coding** — 8 categories (CSS, React, Animation, JavaScript, Career, SVG, Next.js, General), each with a distinct HSL accent. Category tags on cards use their category's color.

5. **Gradient text** — `linear-gradient` clipped to text via `-webkit-background-clip: text`. Used on hero headings and post titles in the hero area.

6. **Scroll progress bar** — a 3px fixed gradient bar at the top of blog post pages that fills as the user reads.

7. **Interactive MDX components** — custom React components usable inside MDX: `<Callout>` for annotated asides, `<Counter>` for demonstrating React state, `<ColorSwatch>` for HSL color examples.

8. **Table of contents** — generated from post `## headings`, shown as a sticky sidebar on desktop with IntersectionObserver active tracking.

---

## Critical Design Constraints

| Constraint | Rule |
|-----------|------|
| Colors in CSS | All HSL custom properties. Never hardcode hex or rgb in CSS. |
| Dark mode | Inline script in `<head>` — NOT next-themes. Prevents flash. |
| Color mode toggle | Reads/writes `data-theme` on `document.documentElement` + localStorage. |
| Gradient text | `background: var(--gradient-accent); -webkit-background-clip: text; -webkit-text-fill-color: transparent` |
| Post list layout | Vertical list (not grid). Each PostCard full width, stacked. |
| Category tags | `style={{ color: CATEGORY_COLORS[category] }}` — dynamic color from the record. |
| Scroll progress | Only on blog post pages, not on homepage or blog list. |
| MDX components | At minimum: Callout (info/warning/success), Counter ('use client'), ColorSwatch. |
| `suppressHydrationWarning` | On `<html>` — required because inline script sets attribute before React hydrates. |
| Font | 'Wotfard' → 'Nunito' → system. Rounded, friendly sans-serif. |

---

## Color System

```css
/* Dark mode — default */
:root {
  --color-bg:           hsl(210deg 15% 6%);
  --color-bg-card:      hsl(210deg 15% 12%);
  --color-bg-elevated:  hsl(210deg 15% 18%);
  --color-text:         hsl(210deg 10% 90%);
  --color-text-muted:   hsl(210deg 10% 60%);
  --color-border:       hsl(210deg 15% 22%);
  --color-primary:      hsl(225deg 100% 75%);   /* blue */
  --color-secondary:    hsl(333deg 100% 65%);   /* pink */
  --color-tertiary:     hsl(280deg 100% 85%);   /* purple */
  --gradient-accent:    linear-gradient(135deg, hsl(225deg 100% 75%), hsl(333deg 100% 65%));
}

/* Light mode */
[data-theme="light"] {
  --color-bg:          hsl(210deg 30% 98%);
  --color-bg-card:     hsl(210deg 20% 94%);
  --color-bg-elevated: hsl(210deg 20% 88%);
  --color-text:        hsl(210deg 25% 12%);
  --color-text-muted:  hsl(210deg 15% 40%);
  --color-border:      hsl(210deg 20% 78%);
  /* primary, secondary, tertiary, gradient: UNCHANGED */
}
```

---

## Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | Next.js 14 App Router | Static generation of blog routes |
| Language | TypeScript strict | Typed Post schema + Category |
| Styling | CSS Modules + CSS custom properties | HSL system requires explicit CSS var control |
| Content | MDX via next-mdx-remote | Custom components within posts |
| Frontmatter | gray-matter | Simple, standard |
| Dark mode | Inline script + data-theme | No-flash approach, no library needed |
| Fonts | System stack (Wotfard fallback chain) | Wotfard if self-hosted, else Nunito/system |
| Deployment | Vercel static export | |

---

## Scaffold Files

| File | Contents |
|------|----------|
| `00_Orchestrator.md` | This file |
| `01_PRD.md` | Personas, FRs, acceptance criteria |
| `02_Architecture.md` | TypeScript schema, MDX pipeline, dark mode script, component specs |
| `03_Design.md` | Full CSS token system, gradient text, PostCard spec, Callout spec, anti-patterns |
| `04_Plan.md` | 5-day build plan |
| `05_Epics_and_Stories.md` | 5 epics, 30 stories |
| `06_Tasks.md` | 19 tasks |
| `07_Guide.md` | HSL rationale, no-flash dark mode explained, MDX component patterns, common mistakes |

---

## How This Differs from portfolio_05 (Lee Robinson)

| Feature | portfolio_05 (Lee Robinson) | portfolio_07 (JWC) |
|---------|-----------------------------|--------------------|
| Design approach | Intentional minimalism | Rich, saturated, designed |
| Color system | Tailwind neutral scale | HSL CSS custom properties |
| Dark mode | next-themes | Inline script + data-theme |
| Post layout | Titles-only flat list | Cards with abstract + category tag |
| Category system | None | 8 categories with hsl accent colors |
| Interactive content | None | Callout, Counter, ColorSwatch MDX widgets |
| Scroll features | None | Scroll progress bar, ToC with active tracking |
| Fonts | System sans | Wotfard (rounded, designed) |
| Visual complexity | Near zero | High (gradients, animations, colour) |
