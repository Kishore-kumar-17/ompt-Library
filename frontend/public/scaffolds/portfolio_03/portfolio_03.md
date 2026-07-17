# Portfolio Prompt 03 — Studio Portfolio with Case Studies
## Inspired by Locomotive · locomotive.ca

---

## Base Prompt

You are a senior full-stack developer at a creative digital agency. Build a studio portfolio for a design and development agency. The site showcases client work through a filterable case study grid, communicates the studio's identity through a manifesto section, presents the team across disciplines, and closes with a contact section. The design system uses CSS custom properties for theming — sections and pages can switch between light, dark, and accent colour schemes using a `data-theme` attribute. The aesthetic is editorial and restrained: near-black on white as the default, with red and blue accent themes used for emphasis.

**Role:** Senior full-stack developer, digital agency context

**Application Overview:**
A multi-page studio portfolio with: (1) homepage with video hero and featured work, (2) work index with filterable case studies, (3) individual case study pages with project narrative, (4) about/agency page with manifesto, team, and awards, (5) contact page. This is a professional agency site — every page must feel considered, fast, and technically credible. Smooth scroll, hover reveals on work cards, and section-level theme switching make the site feel alive without being gratuitous.

**Brand Voice & Mood:**
Confident without being loud. The studio believes that design and code are tools of expression — what differentiates them is craft and people. Copy is terse and precise. Sentences are short. The manifesto reads like a conviction, not a marketing statement. The visual language is Modernist grotesque: near-black, white, and one accent colour at a time.

**Core Features:**

*Homepage:*
- Video hero (full-viewport, dark theme, white text, autoplay muted loop)
- Studio tagline centred over video
- Featured work: 3–4 case study cards below fold

*Work Index (/work):*
- Filter bar: All / Branding / Digital / Experience / E-commerce / Content
- Case study grid: 2 columns desktop, 1 column mobile
- Each card: project cover image, client name, category tag, year
- Hover: cover image scales subtly (1.0 → 1.04), category tag colour shifts
- Active filter: snappy pill selection, grid re-renders filtered results

*Case Study (/work/[slug]):*
- Full-width hero image with project title overlay
- Project overview: client, scope, year, deliverables (sidebar or above-the-fold strip)
- Narrative sections: Challenge, Approach, Results — alternating text and image
- Next project CTA at bottom

*About (/about):*
- Manifesto section: large display-size statement
- Capabilities: two columns — Design services, Development services
- Team: three discipline pillars (Design, Development, Operations) with name/role list
- Awards and recognition list

*Contact (/contact):*
- Studio address, email, new business inquiry link
- Social links

**Design Specifications:**

Font: `'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif` — weight 400 (body), 700 (headings, labels). Base size 15px, scales to 17px at 1600px+, 21px at 2400px+. Line height 1.3 for headings, 1.6 for body.

Colour system (CSS custom properties — `data-theme` driven):
```css
[data-theme="default"] { --color: #0A0A0A; --color-bg: #FFFFFF; }
[data-theme="dark"]    { --color: #FFFFFF; --color-bg: #0A0A0A; }
[data-theme="red"]     { --color: #FFFFFF; --color-bg: #DA382E; }
[data-theme="blue"]    { --color: #FFFFFF; --color-bg: #312DFB; }
```

Transition on theme change: `background-color 0.3s cubic-bezier(0.215, 0.61, 0.355, 1), color 0.3s cubic-bezier(0.215, 0.61, 0.355, 1)`

Border radius: none on structural elements (cards, sections). Small radius (4px) on filter pills only.

Spacing: 8pt base. Section padding: `clamp(5rem, 10vw, 10rem)` vertical.

**Structure (multi-page):**
- `app/page.tsx` — homepage
- `app/work/page.tsx` — work index
- `app/work/[slug]/page.tsx` — case study detail
- `app/about/page.tsx` — agency
- `app/contact/page.tsx` — contact
- `components/Nav` — sticky horizontal nav, theme-aware
- `components/WorkCard` — case study card with hover
- `components/FilterBar` — category filter
- `data/work.ts` — all case studies (typed)

**Technical Specifications:**
- Next.js 14 App Router, TypeScript strict
- CSS Modules for component styles; CSS custom properties for theming
- `next/image` for all case study images
- `next/video` or native `<video>` for hero
- Framer Motion: page transition (fade), work grid re-render, hover on cards
- Intersection Observer: scroll-triggered section reveals (no external library)
- Case study data in `src/data/work.ts` — typed, single source of truth
- No UI component library — HTML + CSS

**Implementation Steps:**
1. Project setup + CSS custom properties + theme system
2. Nav component (sticky, theme-aware colour inversion)
3. Homepage: video hero + studio tagline + 3 featured work cards
4. Work data: typed case study schema + sample data (5–8 projects)
5. Work index page: FilterBar + WorkCard grid + filter logic
6. Case study page: dynamic route + narrative layout
7. About page: manifesto + capabilities + team + awards
8. Contact page
9. Framer Motion page transitions + scroll reveals
10. Accessibility audit + performance

**User Experience:**
A potential client arrives at the homepage, immediately sees moving image and the studio's positioning. They scroll to see featured work. They navigate to /work, use the filter to find relevant work (e.g., "Branding"), click a case study. The case study page tells a concise story — problem, approach, outcome — with strong visuals. They find the studio credible. They go to /contact. The experience is fast, intentional, and unremarkable in the best sense: no unnecessary friction, no decorative flourish for its own sake.

**Constraints:**
- Video hero: `autoplay muted loop playsInline` — no audio, no controls
- Theme transitions must be CSS-only (no JavaScript colour interpolation)
- Work filter must work without JavaScript (progressively enhanced with JS for animation)
- Case study images: `next/image` with correct `sizes` attribute for responsive loading
- No CMS — all work data in `src/data/work.ts`
- Nav must be legible on all four theme backgrounds
- Awards section: list only, no logos (legal simplicity)
- All external project links: `target="_blank" rel="noopener noreferrer"`
- Respect: `prefers-reduced-motion: reduce` → disable all animations and transitions.

---

## Platform Versions

---

### Lovable

Build a multi-page studio portfolio for a digital design agency. Features: homepage with video hero, filterable work grid, case study pages, about page, contact page. Minimal design system with CSS custom property theming.

**Theme system (core pattern):**
```css
:root, [data-theme="default"] { --color: #0A0A0A; --color-bg: #FFFFFF; }
[data-theme="dark"]  { --color: #FFFFFF; --color-bg: #0A0A0A; }
[data-theme="red"]   { --color: #FFFFFF; --color-bg: #DA382E; }
[data-theme="blue"]  { --color: #FFFFFF; --color-bg: #312DFB; }
body { background: var(--color-bg); color: var(--color); transition: background-color 0.3s cubic-bezier(0.215,0.61,0.355,1), color 0.3s cubic-bezier(0.215,0.61,0.355,1); }
```

**TypeScript types (src/types/index.ts):**
```typescript
export type Category = 'branding' | 'digital' | 'experience' | 'ecommerce' | 'content'

export interface CaseStudy {
  slug: string
  client: string
  category: Category
  year: number
  coverImage: string
  heroImage: string
  tagline: string
  scope: string[]
  challenge: string
  approach: string
  outcome: string
  liveUrl?: string
  featured?: boolean
}

export interface TeamMember { name: string; role: string; discipline: 'design' | 'development' | 'operations' }
export interface Award { year: number; award: string; project: string }
```

**Components to build:**
1. `<Nav>` — sticky, horizontal, `var(--color)` text adapts to theme
2. `<VideoHero>` — full-viewport dark theme, `<video autoPlay muted loop playsInline>`, white tagline centered
3. `<WorkCard>` — cover image (`next/image`), client name, category pill, year; hover: image `scale(1.04)` 300ms ease
4. `<FilterBar>` — pill buttons: All / Branding / Digital / Experience / E-commerce / Content; active pill gets `--color-bg` background / `--color` text inverted
5. `<WorkGrid>` — 2-col desktop, 1-col mobile; filters `caseStudies` by active category
6. `<CaseStudyHero>` — full-width image, title overlay, project meta strip
7. `<ManifestoSection data-theme="dark">` — large display text, dark background

**Nav theme-awareness:**
```tsx
// Nav detects scroll position and current section theme
// Uses IntersectionObserver on each section's data-theme
// On dark/red/blue section: nav text stays var(--color) of that section
```

---

### ChatGPT Canvas

Build a studio portfolio website. Stack: Next.js 14 App Router + TypeScript + CSS Modules.

**Setup:**
```bash
npx create-next-app@latest studio-portfolio --typescript --no-tailwind --app --src-dir
npm install framer-motion
```

**CSS custom properties (globals.css):**
```css
:root { --color: #0A0A0A; --color-bg: #FFFFFF; --ease: cubic-bezier(0.215,0.61,0.355,1); }
[data-theme="dark"]  { --color: #FFFFFF; --color-bg: #0A0A0A; }
[data-theme="red"]   { --color: #FFFFFF; --color-bg: #DA382E; }
[data-theme="blue"]  { --color: #FFFFFF; --color-bg: #312DFB; }
body { background: var(--color-bg); color: var(--color); transition: background-color 0.3s var(--ease), color 0.3s var(--ease); font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 15px; line-height: 1.6; }
```

**Pages:**
- `src/app/page.tsx` — homepage: VideoHero + featured work
- `src/app/work/page.tsx` — FilterBar + WorkGrid
- `src/app/work/[slug]/page.tsx` — CaseStudy layout
- `src/app/about/page.tsx` — ManifestoSection + Team + Awards
- `src/app/contact/page.tsx` — ContactSection

**Data (`src/data/work.ts`):**
```typescript
export const caseStudies: CaseStudy[] = [
  {
    slug: 'project-one', client: 'Acme Co', category: 'digital', year: 2024,
    coverImage: '/work/acme-cover.jpg', heroImage: '/work/acme-hero.jpg',
    tagline: 'Redesigning the digital banking experience',
    scope: ['UX Design', 'Frontend Development'],
    challenge: '...', approach: '...', outcome: '...', featured: true
  },
  // 4–7 more entries
]
```

**File structure:**
```
src/
├── app/page.tsx, work/page.tsx, work/[slug]/page.tsx, about/page.tsx, contact/page.tsx
├── components/ Nav/ VideoHero/ WorkCard/ FilterBar/ WorkGrid/ ManifestoSection/ TeamSection/ CaseStudyHero/
├── data/work.ts
├── types/index.ts
└── styles/ globals.css + *.module.css files
```

---

### Bolt

Build a full studio portfolio with 5 pages, theme switching, and a filterable case study grid.

**Stack:** Next.js 14 App Router + TypeScript + Tailwind CSS

**Tailwind config additions:**
```typescript
extend: {
  colors: { ink: '#0A0A0A', canvas: '#FFFFFF', red: '#DA382E', blue: '#312DFB' },
  fontFamily: { sans: ['Inter', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'] },
  transitionTimingFunction: { studio: 'cubic-bezier(0.215, 0.61, 0.355, 1)' },
}
```

**Theme via `data-theme` + CSS vars (add to globals.css alongside Tailwind):**
```css
[data-theme="dark"]  { --color: #FFF; --color-bg: #0A0A0A; }
[data-theme="red"]   { --color: #FFF; --color-bg: #DA382E; }
[data-theme="blue"]  { --color: #FFF; --color-bg: #312DFB; }
```

**Key Tailwind classes for this design:**
- Cards: `group overflow-hidden` + image child: `group-hover:scale-[1.04] transition-transform duration-300 ease-studio`
- Filter pills: `border border-ink text-ink text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-[4px]`
- Active filter pill: `bg-ink text-canvas`
- Section padding: `py-[clamp(5rem,10vw,10rem)]`
- Manifesto text: `text-[clamp(2rem,5vw,5rem)] font-bold leading-[1.1] uppercase tracking-tight`

**Video hero:**
```tsx
<section data-theme="dark" className="relative h-screen flex items-center justify-center overflow-hidden"
  style={{ background: 'var(--color-bg)', color: 'var(--color)' }}>
  <video autoPlay muted loop playsInline className="absolute inset-0 w-full h-full object-cover opacity-60">
    <source src="/hero.mp4" type="video/mp4" />
  </video>
  <h1 className="relative z-10 text-[clamp(3rem,8vw,8rem)] font-bold uppercase text-white text-center max-w-5xl px-8">
    Digital-First Design Studio
  </h1>
</section>
```

---

### v0

Build a studio portfolio using Next.js + shadcn/ui for navigation and layout structure, with heavy CSS overrides for the agency aesthetic. All colour is via CSS custom properties — shadcn's default colours must be completely overridden.

**Critical shadcn override (globals.css):**
```css
:root {
  --background: 0 0% 100%;        /* maps to #FFFFFF */
  --foreground: 0 0% 4%;          /* maps to #0A0A0A */
  --border: 0 0% 4%;              /* hard black borders */
  --radius: 0;                    /* no rounded corners on structural elements */
}
/* Add studio theme vars alongside shadcn vars */
[data-theme="dark"]  { --background: 0 0% 4%; --foreground: 0 0% 100%; }
[data-theme="red"]   { --background: 2 70% 51%; --foreground: 0 0% 100%; }   /* #DA382E */
[data-theme="blue"]  { --background: 234 97% 58%; --foreground: 0 0% 100%; } /* #312DFB */
```

**shadcn components to use:**
- `<NavigationMenu>` → studio Nav (override to flat, uppercase, no dropdown styling)
- `<Badge>` → category tags on work cards (override to `border-radius: 0`, small uppercase)
- `<Tabs>` + `<TabsList>` → FilterBar (override to pill style with `border-radius: 4px`)
- `<Separator>` → section dividers (1px, `var(--foreground)`)

**Do NOT use shadcn for:**
- Card component (build WorkCard from scratch — shadcn cards add unwanted styling)
- Dialog/Sheet (build CaseStudy pages as actual routes, not modals)
- Any animation component (use Framer Motion directly)

**WorkCard pattern:**
```tsx
<article className="group overflow-hidden cursor-pointer" onClick={() => router.push(`/work/${slug}`)}>
  <div className="overflow-hidden">
    <Image src={coverImage} alt={client} width={800} height={600}
      className="w-full aspect-[4/3] object-cover transition-transform duration-300 ease-[cubic-bezier(0.215,0.61,0.355,1)] group-hover:scale-[1.04]" />
  </div>
  <div className="pt-4 flex justify-between items-baseline">
    <h3 className="font-bold text-sm uppercase tracking-widest">{client}</h3>
    <span className="text-xs text-foreground/50">{year}</span>
  </div>
  <Badge variant="outline" className="mt-1 rounded-none text-xs uppercase tracking-widest border-foreground/30">{category}</Badge>
</article>
```

---

### Claude Artifacts

```text
You are a senior full-stack developer building a studio portfolio for a digital design agency.

Read all 7 scaffold files before writing any code.

TECH STACK: Next.js 14 App Router + TypeScript strict + CSS Modules

THEME SYSTEM:
:root                { --color: #0A0A0A; --color-bg: #FFFFFF; }
[data-theme="dark"]  { --color: #FFFFFF; --color-bg: #0A0A0A; }
[data-theme="red"]   { --color: #FFFFFF; --color-bg: #DA382E; }
[data-theme="blue"]  { --color: #FFFFFF; --color-bg: #312DFB; }
Transition: background-color + color 0.3s cubic-bezier(0.215,0.61,0.355,1)

FONT: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif
Sizes: 15px base → 17px at 1600px → 21px at 2400px. Line height 1.3 headings, 1.6 body.

PAGES: / | /work | /work/[slug] | /about | /contact

CASE STUDY SCHEMA:
{ slug, client, category, year, coverImage, heroImage, tagline, scope[], challenge, approach, outcome, liveUrl? }

CRITICAL RULES:
- No border-radius on structural elements — 4px max on filter pills only
- No JS colour interpolation — theme switching is CSS only via data-theme attribute
- Video hero: autoplay muted loop playsInline — no audio no controls
- All case study images: next/image with correct sizes attribute
- Content from src/data/work.ts — never hardcoded in JSX
- Nav must be legible on all 4 theme backgrounds (uses var(--color) which adapts)
- Work filter: functional without JS; enhanced with Framer Motion for grid animation
```

**Four defining constraints:**

**1. data-theme switching is CSS-only — no JavaScript colour interpolation**
The theme system lives entirely in CSS. When `data-theme` attribute changes on a section or `<body>`, `--color` and `--color-bg` update instantly via CSS cascade, and `body { transition: background-color 0.3s var(--ease), color 0.3s var(--ease) }` handles the fade. Zero inline `style={{ color: ... }}` or `element.style.color = ...` in JavaScript. Verify: no `style` props with hardcoded hex in any component.

**2. Video hero: autoplay muted loop playsInline — all four attributes mandatory**
`autoPlay`: starts immediately. `muted`: required for autoplay in Chrome. `loop`: restarts on end. `playsInline`: prevents fullscreen takeover on iOS. Missing any one breaks the hero in at least one browser. The `<video>` has no `controls` prop and no `src` prop — only `<source src="/hero.mp4" type="video/mp4" />` child.

**3. Work filter is functional without JavaScript**
The base implementation uses CSS `:has()` or server-rendered filtered pages with URL query params (`?category=branding`). JavaScript enhances it with Framer Motion `AnimatePresence` for grid item transitions. If JS is disabled, the filter still works — links update `searchParams`, Next.js re-renders filtered content server-side.

**4. All case study content from src/data/work.ts — never hardcoded**
Every string rendered in work-related JSX comes from the `caseStudies` array. Client names, taglines, scope items, narrative text — all in `work.ts`. This is the single source of truth. Verify: `grep -rn '"Acme\|"Studio\|"Digital"' src/app/work/` returns zero matches.

---

### Grok

```text
Build a studio portfolio for a digital design agency. 5 pages. Filterable case study grid. Theme switching via data-theme CSS attribute.

Read all 7 scaffold files first. Then implement one task at a time from 06_Tasks.md.

STACK: Next.js 14 + TypeScript + CSS Modules

COLORS:
default: { color: '#0A0A0A', bg: '#FFFFFF' }
dark:    { color: '#FFFFFF', bg: '#0A0A0A' }
red:     { color: '#FFFFFF', bg: '#DA382E' }
blue:    { color: '#FFFFFF', bg: '#312DFB' }

TRANSITION: cubic-bezier(0.215,0.61,0.355,1) 0.3s on color + background-color

CASE STUDY TYPE:
interface CaseStudy {
  slug: string; client: string
  category: 'branding'|'digital'|'experience'|'ecommerce'|'content'
  year: number; coverImage: string; heroImage: string
  tagline: string; scope: string[]
  challenge: string; approach: string; outcome: string
  liveUrl?: string; featured?: boolean
}

PAGES:
/ → VideoHero (dark theme) + studio statement + featured work (3 cards)
/work → FilterBar + WorkGrid (all case studies, filterable)
/work/[slug] → CaseStudyHero + meta strip + Challenge/Approach/Outcome sections + NextProject CTA
/about → Manifesto (dark theme section) + Capabilities + Team + Awards
/contact → Address + email + social

FILE GENERATION ORDER:
1. src/types/index.ts — Category, CaseStudy, TeamMember, Award
2. src/data/work.ts — 5–8 seed CaseStudy entries (3 featured)
3. src/data/team.ts + awards.ts — team members + award list
4. src/styles/globals.css — CSS vars + theme system + base reset
5. src/components/Nav — sticky nav, theme-aware text
6. src/components/VideoHero — video element with all 4 attrs
7. src/components/WorkCard — hover scale image, category badge
8. src/components/FilterBar — pill buttons, functional without JS
9. src/app/work/page.tsx — FilterBar + WorkGrid with AnimatePresence
10. src/app/work/[slug]/page.tsx — generateStaticParams + full layout
11. src/app/about/page.tsx — ManifestoSection + team + awards
12. src/app/contact/page.tsx

NON-NEGOTIABLES:
- data-theme switching CSS only — no inline JS color
- Video: autoplay muted loop playsInline
- next/image on all case study images
- Filter bar categories: All / Branding / Digital / Experience / E-commerce / Content
```

---

### Gemini

**Brief for Gemini:** Upload all 7 scaffold files. Summarise PRD and Architecture first.

Build a multi-page studio portfolio for a digital design agency. 5 pages. CSS custom property theming. Filterable case study grid. Video hero.

**Pre-coding summary checklist:**
- [ ] Stack: Next.js 14 App Router + TypeScript + CSS Modules
- [ ] 5 pages: / | /work | /work/[slug] | /about | /contact
- [ ] Theme system: `data-theme` attr drives `--color` + `--color-bg` CSS vars
- [ ] 4 themes: default (white/black), dark (black/white), red (#DA382E), blue (#312DFB)
- [ ] Transition: `0.3s cubic-bezier(0.215,0.61,0.355,1)` on color + background-color
- [ ] Font: Inter → Helvetica Neue → Helvetica → Arial, 15px base
- [ ] Case study schema: slug, client, category, year, coverImage, heroImage, tagline, scope, challenge, approach, outcome
- [ ] Categories: branding / digital / experience / ecommerce / content
- [ ] Video hero: autoplay muted loop playsInline, dark theme section
- [ ] No border-radius on structural elements; 4px on filter pills only
- [ ] No UI component library

**Gemini build order:**
1. CSS custom properties + theme system in globals.css
2. CaseStudy TypeScript type + work.ts data file (5–8 sample entries)
3. Nav component (sticky, theme-aware)
4. VideoHero component
5. WorkCard component + hover treatment
6. FilterBar component + filter state
7. WorkGrid page (/work)
8. CaseStudy page (/work/[slug]) — dynamic route
9. About page sections
10. Contact page
11. Page transitions (Framer Motion)

---

### Cursor

```text
@00_Orchestrator.md @01_PRD.md @02_Architecture.md @03_Design.md

Build a studio portfolio for a digital design agency. 5 pages. Filterable case studies. Theme switching via data-theme.

Stack: Next.js 14 + TypeScript + CSS Modules

Start with TASK-001 from @06_Tasks.md.

Design constraints throughout:
- Theme system: data-theme="default|dark|red|blue" → CSS vars --color + --color-bg
- default: #0A0A0A on #FFFFFF | dark: #FFFFFF on #0A0A0A | red: #FFFFFF on #DA382E | blue: #FFFFFF on #312DFB
- Transition ease: cubic-bezier(0.215,0.61,0.355,1) — the studio's signature timing
- Font: Inter (or Helvetica Neue) — no web font loading if system stack available
- No border-radius on structural elements — 4px only on filter pills
- Video hero: autoplay muted loop playsInline — no controls, no audio
- WorkCard hover: image scale(1.04), 300ms, ease var
- All content from src/data/work.ts — no hardcoded client names in JSX
- Manifesto section: data-theme="dark" applied at section level, not page level
- Nav: legible on all 4 theme backgrounds — uses var(--color), no hardcoded text colour

Reference @03_Design.md for exact theme values and transition specs.
Reference @02_Architecture.md for page structure and data schema.
```

**WorkCard.tsx — full implementation:**
```tsx
import Image from 'next/image'
import Link from 'next/link'
import type { CaseStudy } from '@/types'
import styles from './WorkCard.module.css'

interface WorkCardProps { study: CaseStudy }

export function WorkCard({ study }: WorkCardProps) {
  return (
    <article className={styles.card}>
      <Link href={`/work/${study.slug}`} className={styles.link}>
        <div className={styles.imageWrapper}>
          <Image
            src={study.coverImage}
            alt={study.client}
            width={800}
            height={600}
            sizes="(max-width: 768px) 100vw, 50vw"
            className={styles.image}
          />
        </div>
        <div className={styles.meta}>
          <h3 className={styles.client}>{study.client}</h3>
          <span className={styles.year}>{study.year}</span>
        </div>
        <span className={styles.category}>{study.category}</span>
      </Link>
    </article>
  )
}
```

```css
/* WorkCard.module.css */
.card { overflow: hidden; }
.link { display: block; text-decoration: none; color: inherit; }
.imageWrapper { overflow: hidden; }
.image {
  width: 100%;
  aspect-ratio: 4/3;
  object-fit: cover;
  transition: transform 0.3s cubic-bezier(0.215,0.61,0.355,1);
}
.card:hover .image { transform: scale(1.04); }
.meta { padding-top: 1rem; display: flex; justify-content: space-between; align-items: baseline; }
.client { font-weight: 700; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.06em; color: var(--color); }
.year { font-size: 0.75rem; color: rgba(var(--color-rgb), 0.5); }
.category { display: inline-block; margin-top: 0.25rem; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.08em; border: 1px solid rgba(var(--color-rgb), 0.3); padding: 0.2rem 0.5rem; }
```

**FilterBar.tsx — progressive enhancement:**
```tsx
'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import styles from './FilterBar.module.css'

const CATEGORIES = ['all', 'branding', 'digital', 'experience', 'ecommerce', 'content'] as const

export function FilterBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const active = searchParams.get('category') ?? 'all'

  return (
    <div className={styles.bar} role="group" aria-label="Filter case studies by category">
      {CATEGORIES.map(cat => (
        <button
          key={cat}
          className={`${styles.pill} ${active === cat ? styles.active : ''}`}
          onClick={() => router.push(cat === 'all' ? '/work' : `/work?category=${cat}`)}
          aria-pressed={active === cat}
        >
          {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
      ))}
    </div>
  )
}
```

**ManifestoSection.tsx — section-level dark theme:**
```tsx
import styles from './ManifestoSection.module.css'

interface ManifestoSectionProps {
  statement: string
  sub?: string
}

export function ManifestoSection({ statement, sub }: ManifestoSectionProps) {
  return (
    <section data-theme="dark" className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.statement}>{statement}</p>
        {sub && <p className={styles.sub}>{sub}</p>}
      </div>
    </section>
  )
}
```

```css
/* ManifestoSection.module.css */
.section {
  background: var(--color-bg);
  color: var(--color);
  padding: clamp(5rem, 10vw, 10rem) clamp(1.5rem, 5vw, 5rem);
  transition: background-color 0.3s cubic-bezier(0.215,0.61,0.355,1), color 0.3s cubic-bezier(0.215,0.61,0.355,1);
}
.inner { max-width: 80ch; }
.statement {
  font-size: clamp(2rem, 5vw, 5rem);
  font-weight: 700;
  line-height: 1.1;
  text-transform: uppercase;
  letter-spacing: -0.02em;
}
.sub { margin-top: 2rem; font-size: 1rem; line-height: 1.6; opacity: 0.7; font-weight: 400; }
```

**NextProject.tsx — wrapping CTA at bottom of case study:**
```tsx
import Link from 'next/link'
import type { CaseStudy } from '@/types'
import styles from './NextProject.module.css'

interface NextProjectProps { current: CaseStudy; all: CaseStudy[] }

export function NextProject({ current, all }: NextProjectProps) {
  const idx = all.findIndex(s => s.slug === current.slug)
  const next = all[(idx + 1) % all.length]

  return (
    <section data-theme="dark" className={styles.section}>
      <p className={styles.label}>Next Project</p>
      <Link href={`/work/${next.slug}`} className={styles.link}>
        {next.client} →
      </Link>
    </section>
  )
}
```

```css
/* NextProject.module.css */
.section { background: var(--color-bg); color: var(--color); padding: clamp(5rem,10vw,10rem) clamp(1.5rem,5vw,5rem); }
.label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.5; margin-bottom: 1rem; }
.link { font-size: clamp(2rem,5vw,5rem); font-weight: 700; text-transform: uppercase; color: var(--color); text-decoration: none; }
.link:hover { opacity: 0.7; }
```

**QA grep commands:**
```bash
# No hardcoded hex colors in component TSX
grep -rn "#0A0A0A\|#DA382E\|#312DFB\|#FFFFFF" src/components/

# Video hero must have all 4 attributes
grep -n "autoPlay\|muted\|loop\|playsInline" src/components/VideoHero.tsx | wc -l
# Should return 4

# No border-radius on structural elements
grep -rn "border-radius:" src/components/ | grep -v "4px\|0$\|0;"

# All case study images use next/image
grep -rn "<img " src/app/work/

# theme switching is CSS-only — no JS color manipulation
grep -rn "style.*color:\|\.style\.color" src/components/Nav/

# Content from data file — no hardcoded client names
grep -rn '"Acme\|"Studio\|"Agency"' src/app/work/

# NextProject wraps around — modulo check
grep -n "% all.length\|% caseStudies.length" src/components/NextProject/
```
