# 00 — Orchestrator
## Iconic Developer Portfolio · portfolio_platform_06

---

## Site Context

**Reference:** brittanychiang.com — widely considered the gold standard for software engineer portfolios
**Type:** Single-page developer portfolio with scroll-spy navigation
**Audience:** Engineering managers, recruiters, fellow developers, conference organisers

---

## What Makes This Iconic

1. **Two-column sticky layout** — left panel stays fixed while right content scrolls. Rare, immediately distinctive.
2. **Scroll-spy nav** — active section highlighted in real time as you scroll. The growing line indicator is the signature touch.
3. **Dark navy + teal** — the palette is instantly recognisable. Teal used with extreme restraint.
4. **Monospace labels** — section numbers ("01."), tech tags, date ranges all in mono font. Signals precision.
5. **Job tab switcher** — experience shown as tabs, not a timeline. Elegant, compact, interactive.
6. **Alternating featured projects** — full-width cards that flip image side. Not a uniform grid.

---

## Critical Design Constraints

| Constraint | Rule |
|-----------|------|
| Background | `bg-navy` (#0a192f) everywhere. No white sections. No light-mode. |
| Teal (#64ffda) usage | Active nav line, section number labels, ▹ bullets, active tab border, hover states on icons/links. NEVER as background fill. NEVER on body text. |
| Page structure | Single page.tsx. All sections are anchor IDs. No routing between pages. |
| Experience section | Tab switcher ONLY. Not accordion. Not timeline. Not cards. |
| Featured projects | Alternating left/right image layout. Not a uniform grid. |
| Nav active state | Growing line (w-8 → w-16) + text-off-white. Driven by IntersectionObserver. |
| Font-mono | Section numbers ("01."), tech stack tags, date ranges, "Featured Project" overline. |
| Section numbering | "01. About", "02. Experience", "03. Projects" — prefix in mono teal, name in lightest-slate. |
| No page routing | All href="#about" style anchors. No Link components to /about etc. |
| Animations | Fade-up on scroll (useInView). Disabled under prefers-reduced-motion. |

---

## Colour System

```typescript
// tailwind.config.ts — extend.colors
{
  'navy':            '#0a192f',   // page background
  'light-navy':      '#112240',   // card bg, hover states
  'lightest-navy':   '#233554',   // borders, dividers
  'slate':           '#8892b0',   // muted text, secondary
  'light-slate':     '#a8b2d8',   // secondary text
  'lightest-slate':  '#ccd6f6',   // body text, bullets
  'off-white':       '#e6f1ff',   // headings, active nav
  'teal':            '#64ffda',   // accent — one per component max
}
```

---

## Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| Framework | Next.js 14 App Router | Static generation, familiar |
| Language | TypeScript strict | Typed data schema |
| Styling | Tailwind CSS + custom palette | Utility classes match single-page component density |
| Scroll-spy | Custom `useActiveSection` hook | IntersectionObserver — no library needed |
| Scroll reveal | Custom `useInView` hook | Same pattern — keeps bundle small |
| Fonts | System stack + Fira Code for mono | No web font requests |
| Deployment | Vercel static export | |

---

## Page Structure

**Single page: `src/app/page.tsx`**

```
<main bg-navy>
  <div max-w-screen-xl mx-auto lg:grid lg:grid-cols-[1fr_1.5fr]>
    ├── <Header>        ← lg:sticky, left panel
    └── <div>           ← scrollable right content
        ├── <AboutSection id="about" />
        ├── <ExperienceSection id="experience" />
        ├── <ProjectsSection id="projects" />
        └── <footer />
```

---

## Component Map

| Component | File | Notes |
|-----------|------|-------|
| Header | Header.tsx | 'use client', sticky left panel, accepts activeSection prop |
| Nav | Nav.tsx | Growing line + text active state, no ThemeToggle |
| SocialLinks | SocialLinks.tsx | GitHub, LinkedIn, CodePen, Instagram — slate→teal hover |
| AboutSection | AboutSection.tsx | Bio paragraphs + skills grid |
| ExperienceSection | ExperienceSection.tsx | Renders JobTabs |
| JobTabs | JobTabs.tsx | 'use client', useState activeJob |
| ProjectsSection | ProjectsSection.tsx | FeaturedProject × 3 + ProjectCard grid |
| FeaturedProject | FeaturedProject.tsx | Props: project + index (for alternating layout) |
| ProjectCard | ProjectCard.tsx | Hover lift, folder icon, light-navy bg |

---

## Hooks

| Hook | File | Purpose |
|------|------|---------|
| useActiveSection | hooks/useActiveSection.ts | IntersectionObserver scroll-spy, returns active id |
| useInView | hooks/useInView.ts | Fade-up trigger, fires once, prefers-reduced-motion aware |

---

## Scaffold Files

| File | Contents |
|------|----------|
| `00_Orchestrator.md` | This file |
| `01_PRD.md` | Personas, FRs, acceptance criteria |
| `02_Architecture.md` | Full TypeScript schema, component specs, hooks code, layout patterns |
| `03_Design.md` | Complete Tailwind design system, component visual specs, anti-patterns |
| `04_Plan.md` | 5-day build plan |
| `05_Epics_and_Stories.md` | 5 epics, 28 stories |
| `06_Tasks.md` | 17 tasks (single-page is simpler than multi-page) |
| `07_Guide.md` | Developer reference — active state logic, alternating project layout, common mistakes |
