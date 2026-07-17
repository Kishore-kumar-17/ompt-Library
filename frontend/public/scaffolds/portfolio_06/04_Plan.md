# 04 — Build Plan
## Iconic Developer Portfolio · portfolio_platform_06

---

## Overview

| Phase | Name | Duration | Goal |
|-------|------|----------|------|
| 0 | Foundation | 0.5 day | Setup, Tailwind palette, types, seed data |
| 1 | Layout + Hooks | 0.5 day | Two-column grid, sticky header, scroll-spy |
| 2 | Left Panel | 0.5 day | Header, Nav active states, SocialLinks |
| 3 | Content Sections | 1.5 days | About, JobTabs, FeaturedProjects, ProjectCards |
| 4 | Polish & Launch | 1 day | Animations, a11y, perf, build verification |

**Total: 4 days** (single-page — less routing complexity than multi-page)

---

## Phase 0 — Foundation (Day 1 morning)

**Deliverables:**
- Next.js 14 + TypeScript + Tailwind CSS setup (static export)
- `tailwind.config.ts`: custom colours (navy/teal palette), custom font families, transition timing
- `src/types/index.ts`: Job, Project interfaces
- `src/data/jobs.ts`: 4 Job entries, newest first, impact-driven bullets
- `src/data/projects.ts`: 6 Project entries (3 featured with images, 3 grid-only)
- `globals.css`: Tailwind directives + `html { scroll-behavior: smooth }` + reduced-motion media query + `::selection` teal

**Ship gate:**
- [ ] `tsc --noEmit` zero errors
- [ ] Custom colours resolve in browser (add temporary `bg-navy` to body — should show #0a192f)
- [ ] Font-mono class applies monospace font to a test element
- [ ] 4 jobs and 6 projects importable with correct types

---

## Phase 1 — Layout + Hooks (Day 1 afternoon)

**Deliverables:**
- `src/hooks/useActiveSection.ts`: IntersectionObserver, rootMargin '-30% 0px -60% 0px', returns active id
- `src/hooks/useInView.ts`: IntersectionObserver, fires once, prefers-reduced-motion aware
- `src/app/page.tsx` shell: `'use client'`, `useActiveSection(['about','experience','projects'])`, two-column grid container, Header + placeholder sections
- `src/app/layout.tsx`: html/body with bg-navy, metadata

**Ship gate:**
- [ ] Page renders with dark navy background
- [ ] Left column is sticky on desktop (confirm by adding 200vh height to right column)
- [ ] `useActiveSection` returns 'about' on load (confirmed via console.log temporarily)
- [ ] No TypeScript errors

---

## Phase 2 — Left Panel (Day 2 morning)

**Deliverables:**
- `SocialLinks.tsx`: social icon links, text-lightest-slate hover:text-teal
- `Nav.tsx`: vertical nav, growing line + text active state, driven by activeSection prop
- `Header.tsx`: sticky left panel with name h1 + title + tagline + Nav + SocialLinks

**Ship gate:**
- [ ] Nav line animates from w-8 to w-16 when activeSection changes
- [ ] Active nav item: off-white text + off-white line
- [ ] Inactive nav: slate opacity-60
- [ ] Social links turn teal on hover
- [ ] On mobile: left panel stacks above sections correctly

---

## Phase 3 — Content Sections (Days 2–3)

**Deliverables:**
- `AboutSection.tsx`: bio paragraphs + 2-col skills grid with ▹ teal bullets
- `JobTabs.tsx`: tab list + content panel, useState, active/inactive tab styles
- `ExperienceSection.tsx`: wraps JobTabs, section heading "02. Experience"
- `FeaturedProject.tsx`: alternating layout, image treatment, description card, tech, links
- `ProjectCard.tsx`: hover lift, folder icon, bg-light-navy
- `ProjectsSection.tsx`: section heading + 3 FeaturedProjects + 3-col card grid

**Ship gate:**
- [ ] About skills grid: 2-col, ▹ in teal before each item
- [ ] JobTabs: clicking a company tab shows that job's content, active tab is teal
- [ ] FeaturedProject index 0: image left, content right
- [ ] FeaturedProject index 1: image right, content left (confirmed visually)
- [ ] ProjectCards: hover lifts card (-translate-y-1)
- [ ] All section headings: "01." etc. in mono teal

---

## Phase 4 — Polish & Launch (Day 4)

**Deliverables:**
- `useInView` applied to section wrappers for fade-up animation
- `JobTabs` ARIA: `role="tablist"`, `role="tab"`, `aria-selected`, keyboard `tabIndex` pattern
- `SocialLinks` `aria-label` on each link
- SkipNav as first DOM element → jumps to `#main`
- OG meta in `layout.tsx`
- Final type check + build verification

**Ship gate (launch):**
- [ ] Lighthouse performance ≥ 90
- [ ] Lighthouse accessibility ≥ 90
- [ ] `tsc --noEmit` zero errors
- [ ] `npm run build` succeeds
- [ ] Scroll-spy: About → Experience → Projects correctly highlights on scroll
- [ ] Teal: NEVER appears as a background fill anywhere on the page
- [ ] Featured projects: confirmed alternating layout (0: image-left, 1: image-right, 2: image-left)
- [ ] Experience: tab switcher (not accordion, not timeline)
- [ ] No font files in Network tab
- [ ] `prefers-reduced-motion`: scroll-spy still works, fade-up skipped

---

## Cut Order

**Never cut:**
- Dark navy background (it IS the design)
- Teal accent system (defines every interactive state)
- Two-column sticky layout (the signature differentiator)
- useActiveSection scroll-spy (the nav would be useless without it)
- Job tab switcher (the experience section depends on it)
- Section number labels in mono teal ("01.", "02.", "03.")

**Cut first:**
- Fade-up animations (useInView) — sections still fully readable without
- FeaturedProject image treatment (grayscale → colour on hover) — show images at full opacity
- ProjectCard hover -translate-y-1 — still functional at translate-y-0
- Social links icons — show as plain text links

**Cut last:**
- Projects section grid cards (reduce to 2 instead of 3)
- The decorative after: line on section headings

---

## Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Teal used as fill background | High | High | `grep -r "bg-teal" src/` must return zero results (except SkipNav) |
| FeaturedProject alternating layout broken | Medium | High | Even/odd check using `index % 2 === 0`; test with 3 projects |
| Scroll-spy wrong section active | Medium | Medium | `rootMargin: '-30% 0px -60% 0px'` — not `0px`; test by scrolling slowly through page |
| JobTabs keyboard navigation missing | Medium | Medium | Arrow Up/Down must cycle tabs; `tabIndex` pattern required |
| Left column not sticky on desktop | Low | High | `lg:sticky lg:top-0 lg:h-screen` on Header — missing any one class breaks it |
| Image grayscale not reverting on hover | Low | Low | `hover:grayscale-0 hover:opacity-100` both required; also needs `transition-all` |

---

## Testing Strategy

| Phase | Critical Test | Method |
|-------|--------------|--------|
| 0 | Custom colours resolve: `bg-navy` shows `#0a192f` | DevTools Computed |
| 1 | Left column sticky: content scrolls, header stays | Manual scroll |
| 1 | `useActiveSection` returns 'about' on load | `console.log` temporarily |
| 2 | Nav: active tab shows `text-off-white` + `w-16` line | Visual + DevTools |
| 2 | Nav: inactive tabs are `opacity-60` | Visual |
| 3 | FeaturedProject 0: image left, content right | Visual + DevTools col-start |
| 3 | FeaturedProject 1: image right, content left | Visual + DevTools col-start |
| 3 | JobTabs: click each company → content changes | Manual |
| 3 | JobTabs: Tab key focus; Arrow key navigation | Manual keyboard test |
| 4 | Scroll-spy: scroll through all 3 sections → correct active state | Manual |
| 4 | `bg-teal` grep returns zero | Bash |
| 4 | Lighthouse ≥ 90 perf + a11y | Lighthouse CLI |

---

## Definition of Done

**Phase 0:**
- Custom colours verified in browser
- TypeScript clean; data files importable with types

**Phase 1:**
- Left column sticky on desktop (`lg:sticky` working)
- `useActiveSection` fires correctly (log confirms)

**Phase 2:**
- Active nav item: off-white text + wide line
- Inactive: slate + narrow line
- Social links turn teal on hover

**Phase 3:**
- About skills: 2-col with ▹ teal bullets
- Experience: tab switcher (not timeline)
- Projects: 3 featured alternating + 3 grid cards
- All section headings: "01." in mono teal

**Phase 4 (launch):**
- Scroll-spy works through all sections
- `bg-teal` grep clean
- Lighthouse ≥ 90
- TypeScript and build clean
