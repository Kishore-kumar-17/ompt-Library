# Portfolio Prompt 02 — Editorial Grid Portfolio
## Inspired by Jen Simmons · jensimmons.com

---

## Base Prompt

You are a senior front-end developer who specialises in CSS layout and typographic design systems. Build a content-rich editorial portfolio for a designer-developer hybrid. The site uses CSS Grid as its primary layout tool — not flexbox, not a UI framework. The grid is expressive and asymmetric: the creator's name is a typographic element that spans multiple cells, navigation runs vertically in a sidebar, and a photograph sits at the intersection of layout and content. The design philosophy is Modernist: three colours maximum, generous whitespace, geometric precision.

**Role:** Senior front-end developer, CSS layout specialist

**Application Overview:**
A personal portfolio for a designer who also writes and speaks about web technologies. The site is itself a demonstration of advanced CSS — intrinsic grid layouts, fluid typography with `clamp()` and `calc()`, `writing-mode` navigation, photo blend modes. Content types include: bio, current role and affiliation, talks/presentations, side projects and experiments, external writing, and social links. The layout must look like it was designed by someone who understands CSS Grid at a deep level — not a card grid, but an editorial page layout.

**Brand Voice & Mood:**
Modernist, editorial, confident. The restraint of three colours (warm beige, coral red, black) communicates taste and expertise. No gradients, no shadows, no decoration — let the grid and typography do the work. The red accent is used sparingly: borders, hover states, one structural element. The voice in copy is direct and first-person: "I work on CSS. I make things with the web."

**Core Features:**
- Hero grid: asymmetric CSS Grid layout, name spanning multiple cells as typographic element
- Vertical navigation sidebar (`writing-mode: vertical-rl`)
- Content sections: Bio, Current Work, Talks/Presentations, Experiments/Labs, Contact
- Photo treatment: low opacity with `mix-blend-mode: multiply` on warm background
- Fluid typography: `clamp()` for all headings, `calc()` responsive scaling
- External links: talks (YouTube/video), writing (external publications), experiments (live demos)
- Dark mode aware: responds to `prefers-color-scheme` (optional but valued)
- Fully keyboard navigable; semantic HTML throughout

**Design Specifications:**

Fonts: System font stack — `'Avenir Next', 'Avenir', 'Helvetica Neue', 'Helvetica', sans-serif`. No web font loading. Weights used: 400 (body), 800 (links, nav, labels).

Color palette:
- Background: `#E4E4D5` (warm beige — the ground)
- Accent: `#D55349` (coral red — used sparingly)
- Text: `#000000`
- Muted text: `rgba(0, 0, 0, 0.5)`
- Photo overlay: accent red at 15% opacity for blend mode treatment

Border radius: none. This is a grid-first, geometry-first design. No rounded corners anywhere.

Typography:
- Name/display: `calc(1.6rem + 1.6vw)`, weight 800, uppercase, letter-spacing 0.04em
- Section headings: `clamp(1rem, 2.5vw, 1.4rem)`, weight 800, uppercase
- Body: `1.1rem / 1.65`, weight 400
- Nav links: `0.85rem`, weight 800, uppercase, `writing-mode: vertical-rl` on desktop
- External links: weight 800, uppercase, no underline by default, coral underline on hover

**Structure:**

Desktop grid (≥ 900px):
- 7 columns, 5 rows
- Name/title: spans columns 1–3, rows 1–5 (left zone, vertical stacking of name characters or words)
- Red accent box: positioned behind nav + photo area as a background element
- Vertical nav: column 4, rows 1–2, `writing-mode: vertical-rl`
- Photo: columns 3–5, rows 3–5, `opacity: 0.5`, `mix-blend-mode: multiply`
- Content: columns 6–7, rows 4–5
- Footer: below grid, horizontal

Mobile (< 900px):
- Single column layout
- Name horizontal and centered, full width
- Nav horizontal, row of links
- Photo: max-height 280px
- Content stacked below

**Technical Specifications:**
- Next.js 14 App Router (TypeScript strict)
- CSS Grid via Tailwind arbitrary values OR native CSS modules (Grid preferred over Tailwind grid utilities for this complexity)
- Content in `src/data/content.ts` (typed) for talks, experiments, links
- MDX support for bio and long-form text (optional)
- `next/image` for photo with explicit dimensions
- No JavaScript animations — transitions via CSS only
- Semantic HTML: `<main>`, `<nav>`, `<header>`, `<article>`, `<aside>`, `<section>`
- Open Graph meta tags on all pages

**Implementation Steps:**
1. Set up Next.js 14 + TypeScript + CSS Modules (or Tailwind with custom config)
2. Define CSS custom properties: colors, font stack, grid template
3. Build grid layout component with named grid areas
4. Build vertical navigation component with `writing-mode: vertical-rl`
5. Build photo component with opacity + blend mode treatment
6. Build typographic name treatment (spanning grid area)
7. Content data: talks array, experiments array, external links, bio
8. Build content section components: Bio, Talks, Experiments, Contact
9. Wire content from data file to components
10. Build responsive fallback (single column below 900px)
11. Add Open Graph meta, semantic HTML audit
12. Accessibility: focus rings, skip-nav, alt text on photo

**User Experience:**
The page loads instantly — no fonts to load, no JavaScript required for layout. The visitor sees an editorial page that immediately communicates design literacy. The asymmetric grid is not confusing — the visual weight of the name anchors the left, the photo creates warmth, and the content is clearly readable on the right. Navigation is unconventional (vertical) but legible. On mobile, everything collapses to a clean single-column reading experience. No hover tricks, no scroll animations — the design doesn't need them.

**Constraints:**
- No component libraries (Radix, shadcn, etc.) — HTML + CSS only for all layout
- No JavaScript for layout or animation — CSS transitions only
- Minimum 3 content sections: Bio, Work/Projects, Contact
- Talks section must link to video/external URL — not embed iframes inline
- Photo must use `mix-blend-mode` with the background colour — it is a design element, not a decorative aside
- All external links: `target="_blank" rel="noopener noreferrer"`, weight 800 uppercase
- Skip-nav link at page top for keyboard users
- No dark mode toggle switch — use `@media (prefers-color-scheme: dark)` automatically
- Respect: `prefers-reduced-motion: reduce` → disable all animations and transitions.

---

## Platform Versions

---

### Lovable

Build an editorial personal portfolio with a strong CSS Grid layout and a Modernist three-colour palette. No component libraries — the layout is the design.

**Design tokens (globals.css):**
```css
:root {
  --bg: #E4E4D5;
  --accent: #D55349;
  --text: #000000;
  --text-muted: rgba(0,0,0,0.5);
  --font: 'Avenir Next', 'Avenir', 'Helvetica Neue', Helvetica, sans-serif;
  --weight-body: 400;
  --weight-strong: 800;
  --display-size: calc(1.6rem + 1.6vw);
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #1A1A16;
    --text: #E4E4D5;
    --text-muted: rgba(228,228,213,0.5);
  }
}
```

**Grid layout (CSS Grid, not flexbox):**
```css
.page-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, auto);
  gap: 0;
}
.name-area   { grid-column: 1 / 4; grid-row: 1 / 6; }
.nav-area    { grid-column: 4 / 5; grid-row: 1 / 3; writing-mode: vertical-rl; }
.photo-area  { grid-column: 3 / 6; grid-row: 3 / 6; }
.content-area { grid-column: 6 / 8; grid-row: 4 / 6; }

@media (max-width: 900px) {
  .page-grid { display: block; }
}
```

**Photo treatment:**
```css
.hero-photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.5;
  mix-blend-mode: multiply;
}
```

**Red accent border box (decorative structural element):**
```css
.accent-box {
  grid-column: 3 / 6;
  grid-row: 1 / 6;
  border: 3px solid #D55349;
  pointer-events: none;
  z-index: 0;
}
```

**Navigation (`writing-mode: vertical-rl`):**
```css
nav { writing-mode: vertical-rl; text-orientation: mixed; }
nav a { font-weight: 800; font-size: 0.85rem; text-transform: uppercase; color: #000; text-decoration: none; }
nav a:hover { color: #D55349; }
```

**Content sections:** Bio (paragraph text), Talks (list of talk title + event + video link), Experiments (list of project name + link), Contact (email + GitHub + social).

**TypeScript types (src/data/content.ts):**
```typescript
export interface Talk { title: string; event: string; year: number; videoUrl: string }
export interface Experiment { title: string; description: string; url: string }
export interface Writing { title: string; publication: string; url: string; year: number }

export const bio = `I work on CSS layout and web design systems. I make things with the web.`
export const talks: Talk[] = []
export const experiments: Experiment[] = []
export const contact = { email: '', github: '', twitter: '' }
```

---

### ChatGPT Canvas

Create a content-rich personal portfolio website with editorial CSS Grid layout. Stack: Next.js 14 + TypeScript + CSS Modules. No UI framework — pure CSS Grid layout.

**Setup:**
```bash
npx create-next-app@latest portfolio --typescript --no-tailwind --app --src-dir
```

**CSS custom properties (globals.css):**
```css
:root {
  --bg: #E4E4D5;
  --accent: #D55349;
  --text: #000000;
  --text-muted: rgba(0,0,0,0.5);
  --font: 'Avenir Next', 'Avenir', 'Helvetica Neue', Helvetica, sans-serif;
  --weight-body: 400;
  --weight-strong: 800;
  --display-size: calc(1.6rem + 1.6vw);
}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; border-radius: 0; }
body { background: var(--bg); color: var(--text); font-family: var(--font); font-weight: var(--weight-body); }
```

**Content data structure (`src/data/content.ts`):**
```typescript
export interface Talk { title: string; event: string; year: number; videoUrl: string }
export interface Experiment { title: string; description: string; url: string }
export interface Writing { title: string; publication: string; url: string; year: number }

export const bio = `I'm a designer and developer who works on CSS layout and type systems.`
export const talks: Talk[] = [{ title: 'Intrinsic Web Design', event: 'An Event Apart', year: 2018, videoUrl: '#' }]
export const experiments: Experiment[] = [{ title: 'Grid Garden', description: 'CSS Grid teaching game', url: '#' }]
export const writing: Writing[] = [{ title: 'CSS Grid Guide', publication: 'CSS-Tricks', url: '#', year: 2020 }]
export const contact = { email: 'you@example.com', github: '#', linkedin: '#' }
```

**File structure:**
```
src/
├── app/page.tsx              ← main page
├── components/
│   ├── PageGrid.tsx          ← CSS Grid wrapper
│   ├── NameBlock.tsx         ← typographic name treatment
│   ├── SideNav.tsx           ← vertical-rl navigation
│   ├── HeroPhoto.tsx         ← opacity + blend mode photo
│   ├── BioSection.tsx
│   ├── TalksSection.tsx
│   ├── ExperimentsSection.tsx
│   └── ContactSection.tsx
├── data/content.ts
└── styles/
    ├── grid.module.css
    └── globals.css
```

**grid.module.css:**
```css
.grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, auto);
  min-height: 100vh;
}
.nameArea   { grid-column: 1 / 4; grid-row: 1 / 6; }
.navArea    { grid-column: 4 / 5; grid-row: 1 / 3; writing-mode: vertical-rl; display: flex; align-items: center; gap: 2rem; padding: 1rem; }
.photoArea  { grid-column: 3 / 6; grid-row: 3 / 6; position: relative; overflow: hidden; }
.contentArea { grid-column: 6 / 8; grid-row: 4 / 6; padding: 2rem; }

@media (max-width: 900px) { .grid { display: block; } }
```

---

### Bolt

Build a personal portfolio website for a designer-developer hybrid. Editorial aesthetic, CSS Grid layout, three colours only.

**Stack:** Next.js 14 App Router + TypeScript + Tailwind CSS (with custom config for grid)

**Tailwind custom values (`tailwind.config.ts`):**
```typescript
extend: {
  colors: {
    bg: '#E4E4D5',
    accent: '#D55349',
    ink: '#000000',
  },
  fontFamily: {
    sans: ["'Avenir Next'", "'Avenir'", "'Helvetica Neue'", 'Helvetica', 'sans-serif'],
  },
  gridTemplateColumns: {
    editorial: 'repeat(7, 1fr)',
  },
  gridTemplateRows: {
    editorial: 'repeat(5, auto)',
  },
}
```

**Page grid (Tailwind arbitrary grid placement):**
```tsx
<main className="bg-bg min-h-screen grid grid-cols-editorial grid-rows-editorial max-w-7xl mx-auto p-8">
  <div className="[grid-column:1/4] [grid-row:1/6]">      {/* Name */}</div>
  <nav className="[grid-column:4/5] [grid-row:1/3] [writing-mode:vertical-rl]"> {/* Nav */}</nav>
  <div className="[grid-column:3/6] [grid-row:3/6]">      {/* Photo */}</div>
  <div className="[grid-column:6/8] [grid-row:4/6]">      {/* Content */}</div>
</main>
```

**Content sections to build:**
1. **Bio** — 2–3 paragraph bio from `content.ts`, font-size 1.1rem
2. **Talks** — list: talk title (weight 800, link to video), event name (muted), year
3. **Experiments** — list: project name (weight 800 link), one-line description
4. **Contact** — email link + GitHub + social, all weight 800 uppercase

**Hover interactions (CSS only, no JS):**
- All external links: `text-decoration: none` default; on hover `text-decoration: underline` in `#D55349`
- Nav links: color transition to `#D55349` on hover, 120ms
- Photo: `transition: opacity 200ms` — `opacity: 0.5` default, `opacity: 0.65` on hover

---

### v0

Build an editorial portfolio using Next.js and shadcn/ui for content components, but with a fully custom CSS Grid for the page layout. The grid and typography are the design — shadcn provides only basic text and link components.

**Important:** Override shadcn defaults heavily. This design uses zero border-radius, system fonts only, and a strict three-colour palette.

**Page layout:** Pure CSS Grid — do not use shadcn `<Card>` for layout sections. The grid is semantic HTML arranged by CSS.

**CSS overrides (globals.css):**
```css
*, *::before, *::after { border-radius: 0 !important; }
body { background: #E4E4D5; color: #000; font-family: 'Avenir Next', Avenir, 'Helvetica Neue', Helvetica, sans-serif; }
a { font-weight: 800; text-transform: uppercase; color: #000; text-decoration: none; }
a:hover { color: #D55349; text-decoration: underline; text-decoration-color: #D55349; }
h1, h2, h3 { text-transform: uppercase; letter-spacing: 0.04em; }
```

**shadcn components to use (sparingly):**
- `<Separator>` → section dividers (styled as 1px `#000` rule)
- `<Badge>` → year labels on talks (override to flat black, square)
- `<Button variant="link">` → talk and experiment links (override font-weight to 800)

**Grid areas as named CSS classes (not shadcn):**
```css
.name-block  { grid-column: 1/4; grid-row: 1/6; font-size: calc(1.6rem + 1.6vw); font-weight: 800; }
.nav-block   { grid-column: 4/5; grid-row: 1/3; writing-mode: vertical-rl; }
.photo-block { grid-column: 3/6; grid-row: 3/6; position: relative; }
.bio-block   { grid-column: 6/8; grid-row: 4/6; }
```

**Talks list pattern:**
```tsx
{talks.map(talk => (
  <div key={talk.title} className="flex justify-between items-start border-t border-black pt-3 mb-3">
    <a href={talk.videoUrl} target="_blank" rel="noopener"
       className="font-bold uppercase text-sm hover:text-[#D55349] transition-colors">
      {talk.title}
    </a>
    <span className="text-xs text-black/50 ml-4 shrink-0">{talk.year}</span>
  </div>
))}
```

---

### Claude Artifacts

```text
You are a senior front-end developer who specialises in CSS layout, intrinsic web design,
and typographic systems.

Build a content-rich editorial portfolio for a designer-developer hybrid.
The layout is CSS Grid. No component libraries. No JavaScript animations.
The design philosophy: three colours, geometric precision, typography as layout.

Read all 7 scaffold files before writing any code.

TECH STACK: Next.js 14 App Router + TypeScript strict + CSS Modules (no Tailwind for layout)

DESIGN TOKENS:
--bg: #E4E4D5
--accent: #D55349
--text: #000000
--text-muted: rgba(0,0,0,0.5)
--font: 'Avenir Next', 'Avenir', 'Helvetica Neue', Helvetica, sans-serif
--weight-body: 400
--weight-strong: 800

GRID:
- Desktop (≥900px): 7 columns × 5 rows
- Name: col 1–4, row 1–6 | Nav: col 4, row 1–3, vertical-rl
- Photo: col 3–6, row 3–6, opacity 0.5, mix-blend-mode: multiply
- Content: col 6–8, row 4–6
- Mobile: single column, nav horizontal

CRITICAL RULES:
- No border-radius anywhere — none
- No web font loading — system font stack only
- No JavaScript for layout or animation — CSS only
- All external links: font-weight 800, uppercase, target="_blank" rel="noopener noreferrer"
- Photo MUST use mix-blend-mode: multiply — it is a design element
- Skip-nav link at page top
- Semantic HTML: main, nav, header, article, aside, section
- Content from src/data/content.ts — never hardcode in JSX
```

**Four defining constraints:**

**1. CSS Grid only — flexbox not permitted for page layout**
The entire page layout is a single `display: grid` with `grid-template-columns: repeat(7, 1fr)` and `grid-template-rows: repeat(5, auto)`. Grid placement uses `grid-column` and `grid-row` longhand — not shorthand `area` names. Flexbox is only permitted inside grid cells for alignment of inline elements. Any use of flexbox for sectioning-level layout fails the constraint.

**2. System font stack — zero network font requests**
Font family is `'Avenir Next', 'Avenir', 'Helvetica Neue', Helvetica, sans-serif`. No `@import` in CSS, no `<link rel="preload">`, no `next/font`. The design's elegance must come entirely from the stack fallback order, weight contrast, and letter-spacing. Verify: Network tab shows zero font requests on page load.

**3. Photo mix-blend-mode is a structural design element — not decoration**
The `<img>` in `.photo-area` must have `opacity: 0.5` and `mix-blend-mode: multiply`. This blends the photo with the warm beige background to create a tonal wash. If `mix-blend-mode` is absent, the photo is a decorative image — violating the design philosophy. The parent `.photo-area` must have `background: var(--bg)` to make the multiply mode meaningful.

**4. No JS for animation — CSS transitions only**
All interactive feedback uses CSS: `transition: color 120ms ease-out` on nav links, `transition: opacity 200ms` on photo hover, `text-decoration-color` transition on external links. Zero Framer Motion, zero GSAP, zero scroll observers. `@media (prefers-color-scheme: dark)` is permitted; it is a CSS feature. JavaScript role: routing and data fetching only.

---

### Grok

```text
Build a personal portfolio website for a designer-developer. Read all 7 scaffold files first.

CONCEPT: Editorial CSS Grid layout. Three colours. Vertical navigation. No JS animations.

STACK: Next.js 14 + TypeScript + CSS Modules

TOKENS:
colors = { bg: '#E4E4D5', accent: '#D55349', text: '#000' }
font = "'Avenir Next', 'Avenir', 'Helvetica Neue', Helvetica, sans-serif"
weights = { body: 400, strong: 800 }
display = 'calc(1.6rem + 1.6vw)'

GRID TEMPLATE (desktop ≥900px):
grid-template-columns: repeat(7, 1fr)
grid-template-rows: repeat(5, auto)
Areas: name[1/4, 1/6], nav[4/5, 1/3], photo[3/6, 3/6], content[6/8, 4/6]

CONTENT TYPES (all from content.ts):
- owner: { name, role, bio, affiliation }
- talks: Array<{ title, event, year, videoUrl }>
- experiments: Array<{ title, description, url }>
- writing: Array<{ title, publication, url, year }>
- contact: { email, github, linkedin }

FILE GENERATION ORDER:
1. src/types/index.ts — Talk, Experiment, Writing, Owner interfaces
2. src/data/content.ts — seed data for all content types
3. src/styles/globals.css — CSS custom properties, base reset
4. src/styles/grid.module.css — grid template, named area classes
5. src/components/PageGrid.tsx — grid shell, handles responsive collapse
6. src/components/NameBlock.tsx — display-size name spanning name-area
7. src/components/SideNav.tsx — vertical-rl nav links, horizontal on mobile
8. src/components/HeroPhoto.tsx — next/image + opacity + mix-blend-mode styles
9. src/components/BioSection.tsx — bio paragraph + role/affiliation
10. src/components/TalksSection.tsx — talk list with video links
11. src/components/ExperimentsSection.tsx — experiment list with links
12. src/components/ContactSection.tsx — email + social links
13. src/app/page.tsx — assembles all components in grid

NON-NEGOTIABLES:
- No border-radius — strict
- System fonts only
- mix-blend-mode: multiply on photo
- writing-mode: vertical-rl on desktop nav
- nav horizontal on mobile
- Skip-nav at page top
- All links weight 800 uppercase

Implement one task at a time from 06_Tasks.md.
```

---

### Gemini

**Brief for Gemini:** Upload all 7 scaffold files. Summarise PRD and Architecture before coding.

Build an editorial CSS Grid portfolio for a designer-developer hybrid. The site is itself a demonstration of advanced CSS layout — intrinsic grid, fluid typography, blend modes, vertical text.

**Pre-coding summary checklist:**
- [ ] Stack confirmed: Next.js 14 + TypeScript + CSS Modules
- [ ] Color palette: `#E4E4D5` bg, `#D55349` accent, `#000` text — three colours only
- [ ] Font: system stack, Avenir Next → Avenir → Helvetica Neue → Helvetica — no web font loading
- [ ] Grid: 7col × 5row desktop, single-column mobile (breakpoint 900px)
- [ ] Grid areas: name[col 1–4, row 1–6], nav[col 4, row 1–3], photo[col 3–6, row 3–6], content[col 6–8, row 4–6]
- [ ] Photo: `opacity: 0.5` + `mix-blend-mode: multiply`
- [ ] Nav: `writing-mode: vertical-rl` on desktop, horizontal on mobile
- [ ] Content: bio, talks (with video links), experiments (with demo links), contact
- [ ] No border-radius, no web fonts, no JS animations
- [ ] Skip-nav at page top, semantic HTML throughout

**Gemini build order:**
1. Content data file (`content.ts`) — define all types and data
2. CSS custom properties and grid template CSS
3. Page grid shell — named areas, responsive breakpoint
4. Name block — typographic treatment
5. Vertical nav component
6. Photo component — opacity + blend mode
7. Content sections — Bio, Talks, Experiments, Contact
8. Open Graph meta, semantic HTML audit
9. Accessibility check — skip-nav, focus rings, alt text

---

### Cursor

```text
@00_Orchestrator.md @01_PRD.md @02_Architecture.md @03_Design.md

Build an editorial CSS Grid personal portfolio. Designer-developer hybrid.
Three colours. System fonts. No border-radius. No JS animations.

Stack: Next.js 14 App Router + TypeScript + CSS Modules

Start with TASK-001 from @06_Tasks.md.

Design constraints to hold throughout:
- Grid: 7col × 5row desktop, single column mobile, breakpoint 900px
- bg: #E4E4D5 | accent: #D55349 | text: #000
- Font: 'Avenir Next', 'Avenir', 'Helvetica Neue', Helvetica, sans-serif
- Weight 400 body | weight 800 links/labels/nav
- Photo: opacity 0.5 + mix-blend-mode: multiply — mandatory design element
- Nav: writing-mode: vertical-rl on desktop, horizontal on mobile
- All external links: weight 800, uppercase, target _blank rel noopener
- No border-radius anywhere — enforce with CSS reset: * { border-radius: 0 }
- No loading states needed — system fonts load instantly, no images blocking
- Content always from src/data/content.ts — never hardcoded in components

Reference @03_Design.md for grid area coordinates whenever placing a component.
Reference @06_Tasks.md for the current task only — don't jump ahead.
```

**SideNav.tsx — full implementation:**
```tsx
import styles from './SideNav.module.css'
import { navLinks } from '@/data/content'

export function SideNav() {
  return (
    <nav className={styles.nav} aria-label="Primary navigation">
      <ul className={styles.list}>
        {navLinks.map(link => (
          <li key={link.href}>
            <a
              href={link.href}
              className={styles.link}
              {...(link.external
                ? { target: '_blank', rel: 'noopener noreferrer' }
                : {})}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
```

```css
/* SideNav.module.css */
.nav {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  display: flex;
  align-items: center;
  padding: 1rem 0.5rem;
}
.list { display: flex; flex-direction: column; gap: 1.5rem; list-style: none; }
.link {
  font-family: var(--font);
  font-weight: 800;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: var(--text);
  text-decoration: none;
  transition: color 120ms ease-out;
}
.link:hover { color: var(--accent); }
.link:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }

@media (max-width: 900px) {
  .nav { writing-mode: horizontal-tb; }
  .list { flex-direction: row; gap: 2rem; }
}
```

**HeroPhoto.tsx — blend mode implementation:**
```tsx
import Image from 'next/image'
import styles from './HeroPhoto.module.css'

interface HeroPhotoProps { src: string; alt: string }

export function HeroPhoto({ src, alt }: HeroPhotoProps) {
  return (
    <div className={styles.wrapper}>
      <Image
        src={src}
        alt={alt}
        fill
        className={styles.photo}
        sizes="(max-width: 900px) 100vw, 40vw"
        priority
      />
    </div>
  )
}
```

```css
/* HeroPhoto.module.css */
.wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  background: var(--bg);   /* required for multiply blend mode */
  overflow: hidden;
}
.photo {
  object-fit: cover;
  opacity: 0.5;
  mix-blend-mode: multiply;
  transition: opacity 200ms ease-out;
}
.wrapper:hover .photo { opacity: 0.65; }
```

**QA grep commands:**
```bash
# No border-radius anywhere
grep -rn "border-radius" src/ | grep -v "0$\|0 ;\|module.css"

# System fonts only — no @import or next/font
grep -rn "@import\|next/font\|GoogleFont" src/

# mix-blend-mode must be present on photo
grep -n "mix-blend-mode" src/components/HeroPhoto.module.css

# No JS animations — no framer-motion, no gsap
grep -rn "framer-motion\|gsap\|animate(" src/components/

# All external links must have rel="noopener noreferrer"
grep -rn 'target="_blank"' src/ | grep -v 'noopener'

# writing-mode present in SideNav
grep -n "writing-mode" src/components/SideNav.module.css
```
