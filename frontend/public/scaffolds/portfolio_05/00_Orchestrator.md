# 00 — Orchestrator
## Developer Personal Site + Blog · portfolio_platform_05

---

## Site Context

**Type:** Writing-first personal site and technical blog for a software engineer.
**Inspired by:** leerob.com — VP of Developer Experience at Cursor, formerly Vercel
**Core principle:** The design is the typography. Content never competes with decoration.
**Target reader:** Other engineers, potential employers, conference organisers, developer community

---

## What This Site Is

An anti-portfolio. The quality of thinking in blog posts IS the portfolio — not a gallery of project screenshots or animated case study cards.

This site communicates expertise through:
- The clarity of the writing
- The speed at which it loads
- The restraint of the design

It does NOT communicate expertise through:
- Hero images or animated banners
- Project card grids with screenshots
- Custom illustration or icon sets
- Visual complexity of any kind

---

## Critical Design Constraints

| Constraint | Rule |
|-----------|------|
| Layout | Single column only. `max-w-xl mx-auto px-4`. Always. No grid. |
| Images | None on homepage or blog list. Avatar optional (40×40px only). |
| Colors | Tailwind neutral scale only. Zero custom hex values. |
| Fonts | System sans for UI. 'Stix Two Text'/Georgia serif for prose only. |
| Animations | `transition-colors` only. No scroll reveals, no layout animations, no keyframes. |
| Links | ALL links: `underline decoration-1 underline-offset-[2.5px]`. No exceptions. |
| Border-radius | None on interactive elements. Sharp edges everywhere. |
| Icon libraries | None. Use text labels only ("[Dark]", "→", "·"). |
| Dark mode | System preference default via `next-themes`. Class-based. |
| Blog list | Title-only links. No dates shown. No excerpts. No images. No cards. |

---

## Stack

| Layer | Choice | NOT using | Reason |
|-------|--------|-----------|--------|
| Framework | Next.js 14 App Router | Vite | Static generation of `/blog/[slug]` routes |
| Language | TypeScript strict | JS | Typed Post schema |
| Styling | Tailwind CSS | CSS Modules | Content-first site maps to utility classes naturally |
| Typography | @tailwindcss/typography | Custom CSS | Prose plugin handles MDX styling with dark mode |
| Content | MDX (next-mdx-remote) | Contentful / headless CMS | Files in repo — simple, fast, zero API calls |
| Frontmatter | gray-matter | remark-frontmatter | Simpler, widely understood |
| Dark mode | next-themes | Manual context | Handles system preference, hydration, class toggling |
| Fonts | System stack | Google Fonts / next/font | Zero FOUT, zero network request |
| Deployment | Vercel static export | Server | Fully static |

---

## Pages

| Route | File | Type |
|-------|------|------|
| `/` | `app/page.tsx` | Server component — bio + featured posts + social links |
| `/blog` | `app/blog/page.tsx` | Server component — all posts list |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` | MDX post page |
| `/work` | `app/work/page.tsx` | Server component — work history prose |

---

## Content Structure

```
content/
└── posts/
    ├── react-server-components.mdx
    ├── web-performance-budgets.mdx
    ├── typescript-patterns.mdx
    ├── ai-developer-tools.mdx
    ├── deployment-strategies.mdx
    └── developer-documentation.mdx
```

Frontmatter schema (required on every .mdx file):
```yaml
---
title: "Post Title"
date: "2024-03-15"
summary: "One sentence describing the post."
published: true
featured: false
---
```

---

## Scaffold Files

| File | Contents |
|------|----------|
| `00_Orchestrator.md` | This file — site context, constraints, stack |
| `01_PRD.md` | Personas, functional requirements, acceptance criteria |
| `02_Architecture.md` | File structure, TypeScript schema, MDX pipeline, component specs |
| `03_Design.md` | Tailwind design system, link styles, prose config, dark mode |
| `04_Plan.md` | 5-day build plan with ship gates |
| `05_Epics_and_Stories.md` | 5 epics, 25 stories |
| `06_Tasks.md` | Step-by-step tasks with commands |
| `07_Guide.md` | Developer reference — patterns, mistakes, MDX tips |

---

## What Makes This Different from portfolio_03 and portfolio_04

| Feature | portfolio_03 (Locomotive) | portfolio_04 (Studio Lotus) | portfolio_05 (Developer Blog) |
|---------|--------------------------|---------------------------|-------------------------------|
| Primary content | Case study grids | Architecture photography | Written blog posts |
| Images on homepage | No (video) | Yes (hero + cards) | No |
| Styling approach | CSS Modules + CSS vars | CSS Modules + CSS vars | Tailwind CSS |
| Color palette | Black/white + accent | Warm cream + terracotta | Neutral only |
| Font weights | 400/700 | 300/500 | Default (400) + semibold (600) |
| Dark mode | Manual data-theme | Manual data-theme | next-themes system-preference |
| Content management | TypeScript data files | TypeScript data files | MDX files with frontmatter |
| Navigation | Full nav with discipline links | 3-col grid nav | Minimal: name + 2 links + toggle |
| Animations | Framer Motion + scroll reveals | Caption slide-up | transition-colors only |
| Route count | 5 pages | 5 pages | 4 pages |
