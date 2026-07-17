# 06 — Tasks
## Iconic Developer Portfolio · portfolio_platform_06

Execute one task at a time. Report: "Task [ID] complete. [Built]. [Tested]. Ready for review."
Single-page site — all sections on page.tsx. No routing.

---

## Phase 0 — Foundation

### TASK-001: Project setup + Tailwind palette
```bash
npx create-next-app@latest portfolio --typescript --tailwind --app --src-dir --no-eslint
cd portfolio
```
In `tailwind.config.ts`:
```typescript
darkMode: 'class',
theme: { extend: {
  colors: {
    'navy':'#0a192f','light-navy':'#112240','lightest-navy':'#233554',
    'slate':'#8892b0','light-slate':'#a8b2d8','lightest-slate':'#ccd6f6',
    'off-white':'#e6f1ff','teal':'#64ffda',
  },
  fontFamily: {
    sans: ['Calibre','Inter','San Francisco','-apple-system','system-ui','sans-serif'],
    mono: ['SF Mono','Fira Code','Fira Mono','Roboto Mono','monospace'],
  },
}}
```
In `next.config.ts`: `output: 'export', images: { unoptimized: true }`.
In `globals.css`:
```css
html { scroll-behavior: smooth; }
::selection { background-color: rgba(100,255,218,0.3); color: #e6f1ff; }
@media(prefers-reduced-motion:reduce){ html{scroll-behavior:auto;} *, *::before, *::after { transition-duration:.01ms!important; } }
```
Verify: add `className="bg-navy"` to body — should render deep navy (#0a192f).

Done when: Custom colours work; `tsc --noEmit` passes.

---

### TASK-002: Types
Create `src/types/index.ts`:
```typescript
export interface Job { company:string; title:string; url:string; range:string; bullets:string[] }
export interface Project { title:string; description:string; tech:string[]; github?:string; external?:string; image?:string; featured:boolean }
```
Done when: Both interfaces exported; compiles clean.

---

### TASK-003: Jobs data
Create `src/data/jobs.ts`:
- 4 Job entries, newest first
- Realistic current/previous company names
- Each with 3–5 impact-driven bullets ("Rebuilt the X pipeline using Y, cutting build times by 60%")
- Ranges like "January 2023 — Present"

Done when: `import { jobs } from '../data/jobs'` works; TypeScript clean.

---

### TASK-004: Projects data
Create `src/data/projects.ts`:
- 6 Project entries
- 3 with `featured: true` and `image: '/projects/[name].png'`
- 3 with `featured: false` (grid cards)
- Tech stacks using: React, TypeScript, Next.js, GraphQL, Node.js, Python, AWS, Postgres

Done when: `const featured = projects.filter(p => p.featured)` returns 3 entries.

---

## Phase 1 — Layout + Hooks

### TASK-005: useActiveSection hook
Create `src/hooks/useActiveSection.ts` (from 02_Architecture.md § useActiveSection Hook):
- IntersectionObserver on each section ID
- `rootMargin: '-30% 0px -60% 0px'`
- Returns active section id string
- Cleans up observers on unmount

Done when: Hook compiles; returns string; default to first id in array.

---

### TASK-006: useInView hook
Create `src/hooks/useInView.ts` (from 02_Architecture.md § useInView Hook):
- IntersectionObserver, threshold 0.1, fires once
- Checks `prefers-reduced-motion` — immediately `inView: true` if reduced
- Returns `{ ref, inView }`

Done when: Hook compiles; TypeScript clean.

---

### TASK-007: Root layout + page shell
`src/app/layout.tsx`:
- `<html lang="en" className="scroll-smooth">`
- `<body className="bg-navy text-slate font-sans antialiased">`
- SkipNav as first DOM element (href="#main")
- Root metadata

`src/app/page.tsx` shell:
- `'use client'`
- `useActiveSection(['about', 'experience', 'projects'])`
- Two-column grid container (lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)])
- Placeholder `<Header activeSection={active} />` and `<main id="main">` with empty sections

Done when: Page loads dark navy; `console.log(active)` shows 'about' on load; no TS errors.

---

## Phase 2 — Left Panel

### TASK-008: SocialLinks component
`src/components/SocialLinks.tsx`:
- GitHub, LinkedIn, CodePen, Instagram as `<a>` links
- `aria-label` on each, `target="_blank" rel="noopener noreferrer"`
- `flex gap-5`
- Each link: `text-lightest-slate hover:text-teal hover:-translate-y-0.5 transition-all duration-200`
- Use SVG icons (inline, no library) or font-mono text abbreviations

Done when: Social links render; hover turns teal; no icon library import.

---

### TASK-009: Nav component
`src/components/Nav.tsx`:
- Props: `activeSection: string`
- Vertical `<ul className="space-y-5">`
- Each item: growing line + label (from 02_Architecture.md § Nav Component)
- Active: `w-16 bg-off-white` line + `text-off-white font-medium`
- Inactive: `w-8 bg-slate opacity-60` line + `text-slate opacity-60`
- `transition-all duration-300` on all animated properties

Done when: Changing activeSection prop changes active item; line grows/shrinks.

---

### TASK-010: Header component
`src/components/Header.tsx` (from 02_Architecture.md § Header Component):
- Props: `activeSection: string`
- `lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col lg:justify-between`
- Name h1 + title h2 + tagline p + Nav (hidden on mobile: `hidden lg:block`)
- SocialLinks at bottom
- Left padding: `lg:px-12 px-6`
- Top padding: `lg:py-24 pt-24 pb-12`

Done when: On desktop, left panel is visible and content fills it top to bottom.

---

## Phase 3 — Content Sections

### TASK-011: AboutSection
`src/components/AboutSection.tsx`:
- `id="about"` on the outer section
- `useInView` → fade-up transition on section
- Section heading: "01. About" pattern (from 02_Architecture.md § Section Heading Pattern)
- Bio: 2–3 paragraphs, `text-slate leading-relaxed mb-4 max-w-xl`
- Skills grid: `grid grid-cols-2 gap-x-4 gap-y-2 mt-8 max-w-sm`
  - Each item: `flex items-center gap-2`
  - ▹ span: `text-teal font-mono text-xs`
  - Skill name: `font-mono text-lightest-slate text-sm`

Done when: ▹ is teal; grid is 2-col; bio paragraphs are slate; section heading shows "01." in mono teal.

---

### TASK-012: JobTabs component
`src/components/JobTabs.tsx` (from 02_Architecture.md § JobTabs Component):
- `'use client'`
- `useState(0)` for activeIndex
- Tab list: `role="tablist"`, `border-l border-lightest-navy`, vertical
- Each tab: `role="tab"`, `aria-selected`, `tabIndex` (0 or -1)
- Active: `border-l-2 border-teal text-teal bg-light-navy/50 font-mono text-sm px-5 py-3`
- Inactive: `border-l-2 border-transparent text-slate hover:text-teal hover:bg-light-navy/30`
- Content: `role="tabpanel"`, job title + `@ Company` (company as teal `<a>`), mono date, bullets with ▹

Done when: All tabs clickable; active tab is teal; content updates on tab switch; ARIA attributes present.

---

### TASK-013: ExperienceSection
`src/components/ExperienceSection.tsx`:
- `id="experience"`, useInView fade-up
- Section heading "02. Experience"
- Renders `<JobTabs />`

Done when: Experience section shows with correct heading and functional tab switcher.

---

### TASK-014: FeaturedProject component
`src/components/FeaturedProject.tsx` (from 02_Architecture.md § FeaturedProject Component):
- Props: `project: Project`, `index: number`
- Even index (0, 2): image col-span 7 left, content col-span 7 absolute right
- Odd index (1): column order reversed
- Image: grayscale + opacity treatment, hover reveals full colour
- Overline, title, description card, tech list, links with ↗
- CONFIRM: index 0 has image on LEFT

Done when: 3 projects render; index 0 image-left; index 1 image-right; index 2 image-left.

---

### TASK-015: ProjectCard component
`src/components/ProjectCard.tsx`:
- `bg-light-navy hover:-translate-y-1 transition-all duration-200 p-7 flex flex-col h-full`
- Folder icon (text-teal) + links row at top
- Title: `text-off-white font-semibold hover:text-teal transition-colors cursor-pointer`
- Description: `text-slate text-sm leading-relaxed flex-grow mt-3`
- Tech: `font-mono text-xs text-slate flex flex-wrap gap-3 mt-4`

Done when: Card lifts on hover; folder icon is teal; title hovers to teal.

---

### TASK-016: ProjectsSection
`src/components/ProjectsSection.tsx`:
- `id="projects"`, useInView
- Section heading "03. Projects"
- `const featuredProjects = projects.filter(p => p.featured)`
- `const otherProjects = projects.filter(p => !p.featured)`
- `space-y-24` between FeaturedProject cards
- "Other Noteworthy Projects" label in mono teal centered
- `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4` of ProjectCards

Done when: 3 featured + 3 grid cards render; featured section has alternating layout.

---

## Phase 4 — Polish + Launch

### TASK-017: Final audit
```bash
npx tsc --noEmit
npm run build
```
- [ ] TypeScript: zero errors
- [ ] Build: zero errors; `/out/` generated
- [ ] Scroll-spy: About → Experience → Projects nav updates while scrolling (test manually)
- [ ] Teal: never a background fill anywhere on the page
- [ ] FeaturedProject: index 0 image-left, index 1 image-right confirmed in browser
- [ ] JobTabs: clicking each company shows correct job content
- [ ] `aria-selected` on tabs (confirm in DevTools → Accessibility pane)
- [ ] Social links: `aria-label` present on each
- [ ] No font file requests in Network tab
- [ ] SkipNav visible on Tab press; jumps to #main
- [ ] Lighthouse accessibility ≥ 90
- [ ] Lighthouse performance ≥ 90
- [ ] `prefers-reduced-motion`: elements visible immediately, no fade-up

Deploy: `vercel --prod`

Done when: All checklist items confirmed.
