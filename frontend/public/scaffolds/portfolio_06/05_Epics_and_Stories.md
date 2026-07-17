# 05 — Epics and Stories
## Iconic Developer Portfolio · portfolio_platform_06

---

## Epic 1 — Foundation

**STORY-001: Project setup**
`create-next-app` with TypeScript and Tailwind. `output: 'export'` in next.config.ts. `darkMode: 'class'` in tailwind.config (always dark, no toggle needed — included for completeness). `html { scroll-behavior: smooth }` in globals.css. `tsc --noEmit` zero errors.

**STORY-002: Tailwind colour palette**
Custom colors in `tailwind.config.ts` extend.colors: navy, light-navy, lightest-navy, slate, light-slate, lightest-slate, off-white, teal — all with exact hex values from 03_Design.md. Custom fontFamily: sans and mono stacks. Custom transitionTimingFunction: ease-custom.

**STORY-003: Types**
`Job { company, title, url, range, bullets[] }` and `Project { title, description, tech[], github?, external?, image?, featured }` in `src/types/index.ts`. No `any`.

**STORY-004: Jobs data**
`src/data/jobs.ts` — 4 Job entries newest first. Realistic companies (e.g. current position at a known tech company, 2–3 previous). 3–5 impact-driven bullet points per job ("Led migration from X to Y, reducing Z by 40%").

**STORY-005: Projects data**
`src/data/projects.ts` — 6 Project entries. 3 with `featured: true` (and image path). 3 with `featured: false` (grid cards, no image required). Tech stacks: React, TypeScript, Next.js, GraphQL, Node.js, Python, AWS, PostgreSQL etc.

---

## Epic 2 — Layout + Hooks

**STORY-006: useActiveSection hook**
IntersectionObserver on section IDs array. `rootMargin: '-30% 0px -60% 0px'`. Returns the id of the section most currently visible. Cleaned up on unmount. Only file that handles scroll-spy state — no other component tracks section visibility.

**STORY-007: useInView hook**
IntersectionObserver, fires once (unobserve after intersect). Threshold 0.1. Checks `prefers-reduced-motion` — immediately sets `inView: true` if reduced motion is preferred. Returns `{ ref, inView }`.

**STORY-008: Two-column page layout**
`page.tsx` ('use client'). `bg-navy min-h-screen`. Inner `max-w-screen-xl mx-auto`. `lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]`. Left: Header with sticky prop. Right: scrollable div with sections. On mobile: single column.

**STORY-009: Root layout**
`layout.tsx`: `<html lang="en" className="scroll-smooth">`. Body: `bg-navy text-slate font-sans antialiased`. SkipNav as first element. Metadata: name + tagline as description + OG.

---

## Epic 3 — Left Panel

**STORY-010: SocialLinks component**
Flex row of 4+ links. Each: `aria-label`, `target="_blank" rel="noopener noreferrer"`. Style: `text-lightest-slate hover:text-teal hover:-translate-y-0.5 transition-all`. SVG icons or text abbreviations — no icon library import.

**STORY-011: Nav component**
Props: `activeSection: string`. Vertical `<ul>`. Each item: `<a href="#id">` with line div + label span. Active: line `w-16 bg-off-white`, text `text-off-white font-medium`. Inactive: line `w-8 bg-slate opacity-60`, text `text-slate opacity-60 hover:opacity-100 hover:text-lightest-slate`. Transition: `transition-all duration-300`.

**STORY-012: Header component**
`lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col lg:justify-between`. Contains: top block (name h1 + title h2 + tagline p + Nav hidden on mobile) and bottom block (SocialLinks). Name: `text-4xl lg:text-5xl font-bold text-off-white tracking-tight`. Title: `text-xl text-lightest-slate font-medium mt-3`. Tagline: `text-slate text-sm mt-4 max-w-[260px] leading-normal`.

---

## Epic 4 — Content Sections

**STORY-013: Section heading pattern**
Reusable heading: `<span className="font-mono text-teal">01.</span>` + section name + decorative line after. See 02_Architecture.md § Section Heading Pattern. Used by AboutSection, ExperienceSection, ProjectsSection.

**STORY-014: AboutSection**
Section `id="about"`. useInView fade-up. Section heading "01. About". Bio: 2–3 paragraphs in `text-slate leading-relaxed`. Skills grid: `grid grid-cols-2 gap-x-4 gap-y-2`, each item `flex items-center gap-2` with `▹` in `text-teal font-mono text-xs` and skill name in `font-mono text-lightest-slate text-sm`.

**STORY-015: JobTabs component**
`'use client'`. `useState(0)` for active index. Tab list: vertical, `role="tablist"`, `border-l border-lightest-navy`. Each tab: `role="tab"`, `aria-selected`, `tabIndex`: 0 when active, -1 when inactive. Active: `border-l-2 border-teal text-teal bg-light-navy/50`. Inactive: `border-l-2 border-transparent text-slate hover:text-teal hover:bg-light-navy/30`. Content panel: `role="tabpanel"` — title, company link (teal), date (mono), bullets (▹ teal + text lightest-slate).

**STORY-016: ExperienceSection**
Section `id="experience"`. useInView fade-up. Section heading "02. Experience". Renders `<JobTabs />`.

**STORY-017: FeaturedProject component**
Props: `project: Project`, `index: number`. Even index (0, 2): image column-span 7 on left, content col-span 7 absolute on right. Odd index (1): reversed. Image: `mix-blend-multiply grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all`. Overline: `font-mono text-xs text-teal tracking-widest`. Title: `text-off-white font-bold text-2xl hover:text-teal`. Description: `bg-light-navy p-6 shadow-xl text-lightest-slate text-sm`. Tech: `font-mono text-xs text-slate flex flex-wrap gap-4`. Links: `↗` text with hover:text-teal.

**STORY-018: ProjectCard component**
`bg-light-navy hover:-translate-y-1 transition-all duration-200 p-7 flex flex-col`. Folder icon (text-teal text-3xl) + links row. Title: `text-off-white font-semibold hover:text-teal`. Description: `text-slate text-sm leading-relaxed flex-grow`. Tech: `font-mono text-xs text-slate flex flex-wrap gap-3 mt-4`.

**STORY-019: ProjectsSection**
Section `id="projects"`. Section heading "03. Projects". useInView on section. Space between featured projects: `space-y-24`. FeaturedProject × 3 (index 0, 1, 2). Below: grid heading "Other Noteworthy Projects" in mono teal centered. `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4` of ProjectCards.

---

## Epic 5 — Polish + Accessibility

**STORY-020: Fade-up animations**
Apply useInView to section wrappers (AboutSection, ExperienceSection, ProjectsSection). Transition class: `transition-all duration-500` with `opacity-0 translate-y-6` → `opacity-100 translate-y-0`. Stagger featured projects with delay utilities.

**STORY-021: ARIA for JobTabs**
`role="tablist"` on tab list. `role="tab"`, `aria-selected={isActive}`, `tabIndex={isActive ? 0 : -1}` on each tab button. `role="tabpanel"` on content div. Arrow key navigation (optional but recommended): Left/Right or Up/Down keys cycle through tabs.

**STORY-022: ARIA for social and project links**
Each social link: `aria-label="GitHub profile"`, `aria-label="LinkedIn profile"` etc. Each project GitHub link: `aria-label="View project source code on GitHub"`. Each external link: `aria-label="View live project"`.

**STORY-023: SkipNav**
First focusable DOM element in layout. Href="#main". Hidden until focused: `sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-teal focus:text-navy focus:px-4 focus:py-2 focus:text-sm focus:font-medium`.

**STORY-024: Open Graph metadata**
`layout.tsx` generateMetadata: title (name), description (tagline), og:image (`/og-image.png`, 1200×630), og:type: website.

**STORY-025: Performance and build**
No font files in Network tab. `tsc --noEmit` zero errors. `npm run build` succeeds. Lighthouse performance ≥ 90. Lighthouse accessibility ≥ 90.

**STORY-026: prefers-reduced-motion**
In globals.css: `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { transition-duration: 0.01ms !important; } html { scroll-behavior: auto; } }`. In useInView: immediately returns `inView: true` under reduced motion — elements start fully visible.

**STORY-027: Text selection style**
`::selection { background-color: rgba(100,255,218,0.3); color: #e6f1ff; }` in globals.css. Subtle teal highlight on text selection — one of the polish details that signals attention to craft.

**STORY-028: Mobile nav**
On mobile (< lg), Nav list is NOT in the sticky left column (which collapses). Add a mobile nav: horizontal scrollable row at the top of the page, or render nav links in the header block (not sticky). Confirm all three anchors work and scroll correctly on mobile.

---

## Expanded Acceptance Criteria — Critical Stories

---

### STORY-006 — useActiveSection (expanded AC)

```typescript
// src/hooks/useActiveSection.ts
import { useEffect, useState } from 'react'

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState(sectionIds[0])

  useEffect(() => {
    const observers = sectionIds.map(id => {
      const el = document.getElementById(id)
      if (!el) return null

      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
      )
      observer.observe(el)
      return observer
    })

    return () => observers.forEach(o => o?.disconnect())
  }, [sectionIds])

  return activeSection
}
```

Acceptance criteria:
- `rootMargin: '-30% 0px -60% 0px'` — triggers when section enters the middle 10% of the viewport
- Returns first section id as default (so About is highlighted on initial load)
- Cleanup: all observers disconnected on unmount
- Does NOT use `useRef` for the section elements — uses `getElementById` inside `useEffect`
- Sections must have matching `id` attributes: `<section id="about">`, `<section id="experience">`, `<section id="projects">`

---

### STORY-015 — JobTabs (expanded AC)

```tsx
// Correct ARIA pattern for JobTabs
export function JobTabs({ jobs }: { jobs: Job[] }) {
  const [active, setActive] = useState(0)

  return (
    <div className="flex gap-8 flex-col md:flex-row">
      <ul role="tablist" aria-label="Work experience" className="border-l border-lightest-navy">
        {jobs.map((job, i) => (
          <li key={job.company}>
            <button
              role="tab"
              aria-selected={i === active}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') setActive((i + 1) % jobs.length)
                if (e.key === 'ArrowUp') setActive((i - 1 + jobs.length) % jobs.length)
              }}
              className={`block px-5 py-3 text-sm font-mono border-l-2 transition-all ${
                i === active
                  ? 'border-teal text-teal bg-light-navy/50'
                  : 'border-transparent text-slate hover:text-teal hover:bg-light-navy/30'
              }`}
            >
              {job.company}
            </button>
          </li>
        ))}
      </ul>
      <div
        role="tabpanel"
        aria-label={`${jobs[active].company} experience`}
        className="flex-1"
      >
        <h3 className="text-off-white font-medium text-lg">
          {jobs[active].title} <span className="text-teal">@ <a href={jobs[active].url} className="hover:underline">{jobs[active].company}</a></span>
        </h3>
        <p className="font-mono text-xs text-slate mt-1 mb-4">{jobs[active].range}</p>
        <ul className="space-y-2">
          {jobs[active].bullets.map(b => (
            <li key={b} className="flex items-start gap-2 text-slate text-sm leading-relaxed">
              <span className="text-teal font-mono text-xs mt-0.5 flex-shrink-0">▹</span>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
```

Acceptance criteria:
- `role="tablist"` on the `<ul>`, `role="tab"` on each `<button>`
- `aria-selected="true/false"` switches on click
- `tabIndex={0}` only on active tab — all others are `-1`
- Arrow key navigation: Up/Down cycles through tabs
- `role="tabpanel"` on the content div

---

### STORY-017 — FeaturedProject Alternating Layout (expanded AC)

```tsx
export function FeaturedProject({ project, index }: { project: Project; index: number }) {
  const isEven = index % 2 === 0

  return (
    <div className="relative grid md:grid-cols-12 gap-4 items-center">
      {/* Image — columns 1-7 for even, 6-12 for odd */}
      <div className={`md:col-span-7 ${isEven ? 'md:col-start-1' : 'md:col-start-6'} md:row-start-1`}>
        {project.image && (
          <Image
            src={project.image}
            alt={project.title}
            width={700}
            height={438}
            className="grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-300 mix-blend-multiply"
          />
        )}
      </div>
      {/* Content — columns 6-12 for even (on top of image), 1-7 for odd */}
      <div className={`relative z-10 md:col-span-7 ${isEven ? 'md:col-start-6 text-right' : 'md:col-start-1 text-left'} md:row-start-1`}>
        <p className="font-mono text-xs text-teal tracking-widest mb-2">Featured Project</p>
        <h3 className="text-2xl font-bold text-off-white hover:text-teal transition-colors mb-4">
          <a href={project.external ?? project.github ?? '#'}>{project.title}</a>
        </h3>
        <div className="bg-light-navy p-6 shadow-xl text-lightest-slate text-sm leading-relaxed mb-4">
          {project.description}
        </div>
        ...
      </div>
    </div>
  )
}
```

Acceptance criteria:
- Even index (0, 2...): image in columns 1-7, content in columns 6-12 (content overlaps image on right)
- Odd index (1, 3...): image in columns 6-12, content in columns 1-7 (content overlaps image on left)
- Content div has `z-10` — appears on top of image visually
- Image uses `mix-blend-multiply` — blends with `bg-light-navy` background
- Image hover: `grayscale-0 opacity-100` — reveals full colour
- Dev check: inspect DOM for index 0 → image column-start should be 1; index 1 → column-start should be 6

---

## Epic 6 — Quality Verification

**STORY-029: Scroll-spy verification**
- Scroll to "About" section → "about" nav item has `text-off-white` + `w-16` line
- Scroll to "Experience" → "experience" item active
- Scroll to "Projects" → "projects" item active
- Teal colour: NEVER appears as a large fill — only on: active nav line, ▹ bullets, hover states, "01." labels

**STORY-030: Teal constraint verification**
```bash
# Teal must NEVER be a background fill
grep -r "bg-teal" src/  # must return ZERO results (except SkipNav bg-teal which is intentional)
```
Manual: scan every section background — must be navy, light-navy, or transparent only.

**STORY-031: JobTabs ARIA verification**
- Tab through tab list with Tab key → only active tab is reachable (others have tabIndex=-1)
- Arrow Down/Up keys cycle through tabs
- Browser accessibility tree: role="tablist", role="tab", role="tabpanel" all present

**STORY-032: FeaturedProject alternating layout**
- Project at index 0: image on left, content on right → check in DevTools (`md:col-start-1` on image)
- Project at index 1: image on right, content on left → check in DevTools (`md:col-start-6` on image)
- Project at index 2: same as index 0 (even)

**STORY-033: Build verification**
- `tsc --noEmit` zero errors
- `npm run build` succeeds — static export with no dynamic runtime
- `grep -r "bg-teal" src/` → zero results (except skip nav)
