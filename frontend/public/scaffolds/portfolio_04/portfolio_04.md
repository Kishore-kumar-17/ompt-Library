# Portfolio 04 — Studio Lotus (Indian Architecture + Interiors)
## Category A: 8 Platform Versions

**Source:** https://www.studiolotus.in
**Type:** Interdisciplinary architecture and interior design practice portfolio
**Distinguishing traits:** Dual-discipline taxonomy (Architecture / Interiors / Adaptive Reuse), photography-forward with restrained UI, warm neutral palette rooted in Indian material culture, press and awards integration, vernacular craft philosophy stated through copy

---

## Base Prompt

Build a portfolio website for an Indian architecture and interior design studio. The studio is an award-winning interdisciplinary practice (founded 2002, Delhi) whose philosophy is "conscious design — celebrating local resources, cultural influences, and contextual approaches." Projects span Architecture (hospitality, institutional, corporate, culture, mixed-use, homes) and Interiors (retail, workplace, leisure, hotels, F&B, brand experiences) plus Adaptive Reuse. The studio has been featured in TIME, Condé Nast Traveller, Dezeen, Architectural Digest, Financial Times.

**Stack:** Next.js 14 App Router + TypeScript + CSS Modules. No Tailwind. No web fonts. Static export (`output: 'export'`). `next/image` throughout.

**Design philosophy:** Photography leads. UI is infrastructure for images. Every component exists to make the work visible, not to decorate the page.

**Color system (warm neutral — Indian plaster palette):**
```css
:root {
  --color:       #1A1A1A;       /* near-black text */
  --color-bg:    #F5F2EE;       /* warm cream — raw plaster wall */
  --color-muted: rgba(26,26,26,0.45);  /* captions, metadata */
  --color-divider: rgba(26,26,26,0.12); /* hairline borders */
  --color-accent: #C4501A;      /* terracotta — Indian earth */
  --color-dark:  #1A1A1A;       /* footer, dark sections */
  --color-dark-bg: #F5F2EE;     /* kept for section-level dark attribute */
}

[data-theme="dark"] {
  --color:    #F5F2EE;
  --color-bg: #1A1A1A;
}

[data-theme="accent"] {
  --color:    #F5F2EE;
  --color-bg: #C4501A;
}
```

**Typography (system stack only):**
- Font: `'Neue Haas Grotesk', 'Helvetica Neue', Helvetica, Arial, sans-serif`
- Base: `15px` → `16px` at 1440px → `18px` at 1920px
- Weights: 300 (body) and 500 (headings, labels, nav) only
- `--size-display: clamp(2.8rem, 6vw, 7rem)` — studio name / hero
- `--size-h1: clamp(1.8rem, 4vw, 4rem)` — project title on hero
- `--size-h2: clamp(1.2rem, 2.5vw, 2.5rem)` — section headings
- `--size-body: 1rem` — body copy
- `--size-small: 0.8rem` — metadata, captions
- `--size-label: 0.7rem` — filter pills, nav links
- Letter-spacing: `-0.03em` on display/h1 (tight), `0.1em` on labels (open)
- Line-height: 1.1 display, 1.3 headings, 1.75 body

**Easing:** `--ease: cubic-bezier(0.25, 0.46, 0.45, 0.94)` (smooth ease-out, slightly gentler than Locomotive)

**Spacing tokens:**
```css
--space-xs: 0.5rem; --space-sm: 1rem; --space-md: 2rem;
--space-lg: 3rem; --space-xl: 6rem; --space-xxl: clamp(6rem, 12vw, 12rem);
```

**Project schema (TypeScript):**
```typescript
export type Discipline = 'architecture' | 'interiors' | 'adaptive-reuse'
export type ArchCategory = 'hospitality' | 'institutional' | 'corporate' | 'culture' | 'mixed-use' | 'homes'
export type IntCategory = 'retail' | 'workplace' | 'leisure' | 'homes' | 'hotels' | 'fb' | 'brand-experiences'
export type ProjectCategory = ArchCategory | IntCategory

export interface Project {
  slug: string
  title: string
  client: string
  discipline: Discipline
  category: ProjectCategory
  location: string
  year: number
  featured: boolean
  coverImage: string
  heroImage: string
  images: string[]
  synopsis: string
  approach: string
  materials: string[]
  area?: string
  awards?: string[]
}
```

**Pages:** `/` (homepage), `/work` (project index with dual-level filtering), `/work/[slug]` (project detail), `/about` (studio story + team + press + awards), `/contact`

**Hover pattern (caption slide-up — NOT image scale):**
```css
.caption {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  padding: var(--space-sm);
  background: linear-gradient(transparent, rgba(26,26,26,0.7));
  transform: translateY(100%);
  transition: transform 0.4s var(--ease);
  color: #F5F2EE;
}
.card:hover .caption { transform: translateY(0); }
```

**Navigation:** Horizontal, sticky, transparent on hero then `--color-bg` on scroll; logo left (studio name, weight 500); discipline tabs center (Architecture / Interiors / Adaptive Reuse); utility right (About / Contact).

**Project index filtering:** Two-level — discipline row (tabs) + category row (pills, changes per discipline). Framer Motion AnimatePresence on grid items.

**Project detail:** Full-width hero image (100vh) → synopsis strip → approach section (two-column: label left 1fr, text right 2fr) → image gallery (masonry-like alternating widths) → materials list → awards (if any) → NextProject CTA.

**About page:** Studio statement (dark section, display size) → founding story (two-column) → Press logos (grayscale, 2-row grid) → Awards list (year / award / project, border-top dividers) → Team (grid of names + roles).

**Zero border-radius everywhere.** No decorative elements. Photography is the decoration.
- Respect: `prefers-reduced-motion: reduce` → disable all animations and transitions.

---

## Platform Versions

---

### 1. Lovable

```
Build a portfolio website for an Indian architecture and interior design studio — an award-winning practice (Delhi, est. 2002) whose philosophy is "conscious design: celebrating local resources, cultural influences, and contextual approaches." Featured in TIME, Condé Nast Traveller, Dezeen, Architectural Digest, Financial Times.

Tech: React + TypeScript + Tailwind CSS (configure to match the design system below exactly — override defaults as needed). Static site. next/image equivalent for images.

Design system:
- Colors: background #F5F2EE (warm cream), text #1A1A1A, muted rgba(26,26,26,0.45), accent terracotta #C4501A, divider rgba(26,26,26,0.12). Dark sections: text #F5F2EE on #1A1A1A bg.
- Font: system stack — 'Neue Haas Grotesk', 'Helvetica Neue', Helvetica, Arial, sans-serif. No Google Fonts. Weights: 300 (body) and 500 (headings/labels) ONLY.
- Type scale: display clamp(2.8rem,6vw,7rem), h1 clamp(1.8rem,4vw,4rem), h2 clamp(1.2rem,2.5vw,2.5rem), body 1rem, small 0.8rem, label 0.7rem.
- Easing: cubic-bezier(0.25,0.46,0.45,0.94) for all transitions. No other easing.
- NO border-radius anywhere. Not on cards, images, buttons, or nav.
- Spacing: xs 0.5rem, sm 1rem, md 2rem, lg 3rem, xl 6rem.

Project TypeScript interface:
{ slug, title, client, discipline: 'architecture'|'interiors'|'adaptive-reuse', category: string, location: string, year: number, featured: boolean, coverImage, heroImage, images: string[], synopsis, approach, materials: string[], area?: string, awards?: string[] }

Pages required:
1. Homepage: sticky nav (transparent→cream on scroll) + full-viewport hero image (first featured project, no video) + "What we make" strip (dark section, discipline count text) + 3×2 featured project grid.
2. /work: two-level filter (discipline tabs + category pills, animated grid with AnimatePresence) + project grid (3-column desktop, 2-col tablet, 1-col mobile).
3. /work/[slug]: 100vh hero image → synopsis (two-column label/text) → approach text → image gallery (alternating full-width and half-width) → materials list → NextProject CTA.
4. /about: dark-section studio statement (display size) + press logos (grayscale) + awards list (year/award/project with border-top dividers) + team grid.
5. /contact: address + email links + social links.

Hover on project cards: caption slides UP from below (translateY 100% → 0), overlaid on image with gradient behind text. NOT image scale.

Nav: logo left (studio name, weight 500), discipline links center (Architecture / Interiors / Adaptive Reuse), About + Contact right.

Seed with 8 realistic projects: at least 2 hospitality, 2 institutional, 2 interiors retail/workplace, 1 adaptive reuse, 1 homes.
```

---

### 2. ChatGPT Canvas

```
Create a Next.js 14 App Router + TypeScript + CSS Modules portfolio site for an Indian architecture and interiors practice. No Tailwind. No web fonts. Static export (output: 'export' in next.config.ts).

Studio context: Award-winning Delhi practice est. 2002. "Conscious design — celebrating local resources, cultural influences, and contextual approaches." Disciplines: Architecture (hospitality, institutional, corporate, culture, mixed-use, homes) + Interiors (retail, workplace, leisure, hotels, F&B, brand-experiences) + Adaptive Reuse.

File structure:
src/
  app/ layout.tsx, page.tsx, work/page.tsx, work/[slug]/page.tsx, about/page.tsx, contact/page.tsx, globals.css
  components/ Nav/ ProjectCard/ ProjectGrid/ DisciplineFilter/ ProjectHero/ SynopsisSection/ ImageGallery/ NextProject/ StudioStatement/ PressSection/ AwardsSection/
  data/ projects.ts, press.ts, awards.ts, team.ts
  types/ index.ts
  hooks/ useScrolled.ts, useInView.ts

globals.css — CSS custom properties:
:root { --color:#1A1A1A; --color-bg:#F5F2EE; --color-muted:rgba(26,26,26,0.45); --color-divider:rgba(26,26,26,0.12); --color-accent:#C4501A; --ease:cubic-bezier(0.25,0.46,0.45,0.94); --space-xs:0.5rem; --space-sm:1rem; --space-md:2rem; --space-lg:3rem; --space-xl:6rem; --size-display:clamp(2.8rem,6vw,7rem); --size-h1:clamp(1.8rem,4vw,4rem); --size-h2:clamp(1.2rem,2.5vw,2.5rem); --size-body:1rem; --size-small:0.8rem; --size-label:0.7rem; }
[data-theme="dark"] { --color:#F5F2EE; --color-bg:#1A1A1A; }
[data-theme="accent"] { --color:#F5F2EE; --color-bg:#C4501A; }
body { font-family:'Neue Haas Grotesk','Helvetica Neue',Helvetica,Arial,sans-serif; font-weight:300; background:var(--color-bg); color:var(--color); }
Hard reset: *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; border-radius:0; }

Types (src/types/index.ts):
export type Discipline = 'architecture'|'interiors'|'adaptive-reuse'
export type ArchCategory = 'hospitality'|'institutional'|'corporate'|'culture'|'mixed-use'|'homes'
export type IntCategory = 'retail'|'workplace'|'leisure'|'homes'|'hotels'|'fb'|'brand-experiences'
export interface Project { slug:string; title:string; client:string; discipline:Discipline; category:ArchCategory|IntCategory; location:string; year:number; featured:boolean; coverImage:string; heroImage:string; images:string[]; synopsis:string; approach:string; materials:string[]; area?:string; awards?:string[] }
export interface PressItem { publication:string; title:string; year:number; url?:string }
export interface Award { year:number; award:string; project:string }
export interface TeamMember { name:string; role:string }

Components:
- ProjectCard: next/image cover, aspect-ratio 3/2, overflow hidden. Hover: caption div (title + location + year) slides up from bottom via translateY 100%→0, 0.4s var(--ease), gradient behind text. NO image scale.
- DisciplineFilter: two rows — top row discipline tabs (Architecture/Interiors/Adaptive Reuse), bottom row category pills (changes per active discipline). Active tab: border-bottom 2px solid var(--color-accent). Active pill: background var(--color), color var(--color-bg). Inactive pill: border 1px solid var(--color-divider).
- ProjectGrid: CSS grid, 3-col desktop, 2-col 1024px, 1-col 768px. AnimatePresence on items.
- Nav: position sticky, top 0. useScrolled hook toggles background from transparent to var(--color-bg) after 60px scroll. Logo left. Discipline links center. About/Contact right. All nav text: weight 500, var(--size-label), uppercase, letter-spacing 0.1em.
- useScrolled: IntersectionObserver or scroll event, returns boolean scrolled.

Seed data: 8 projects (2 hospitality arch, 2 institutional arch, 2 interiors, 1 adaptive-reuse, 1 homes). Use real Indian city locations.
All image paths: /work/[slug]-cover.jpg, /work/[slug]-hero.jpg, /work/[slug]-1.jpg etc.

Verify: tsc --noEmit zero errors. npm run build succeeds. All 8 project slugs pre-render.
```

---

### 3. Bolt.new

```
Next.js 14 portfolio for an Indian architecture + interiors studio. TypeScript, CSS Modules, no Tailwind, no web fonts, static export.

DESIGN RULES (non-negotiable):
1. Color palette: bg #F5F2EE (warm cream), text #1A1A1A, muted rgba(26,26,26,0.45), accent #C4501A (terracotta), divider rgba(26,26,26,0.12). Dark sections use data-theme="dark" attribute → text becomes #F5F2EE on #1A1A1A.
2. Font: system stack only — 'Neue Haas Grotesk','Helvetica Neue',Helvetica,Arial,sans-serif. Weights 300 and 500 ONLY.
3. border-radius: 0 everywhere. Hard reset in globals.css.
4. Hover on project cards: caption slides UP (translateY 100%→0), NOT image scale.
5. Easing: cubic-bezier(0.25,0.46,0.45,0.94) for all transitions. One easing, always.
6. Nav: transparent background on hero, transitions to cream after scroll.
7. Two-level project filter: discipline row + category row (category list changes per discipline).

Project interface:
{ slug, title, client, discipline:'architecture'|'interiors'|'adaptive-reuse', category:string, location:string, year:number, featured:boolean, coverImage, heroImage, images:string[], synopsis, approach, materials:string[], area?:string, awards?:string[] }

Pages:
/ — Hero (full viewport, first featured project image) + dark strip ("Architecture. Interiors. Adaptive Reuse.") + featured projects grid (3 cards).
/work — DisciplineFilter + CategoryFilter + ProjectGrid (3-col→2-col→1-col). Framer Motion AnimatePresence on grid items.
/work/[slug] — generateStaticParams from projects array. Hero 100vh → synopsis two-column → approach → gallery (alternating widths) → materials → NextProject.
/about — StudioStatement (dark, display size, "Conscious design. Celebrating local resources, cultural influences, and context.") + PressSection (grayscale logos grid) + AwardsSection (border-top list) + Team grid.
/contact — Address + email mailto links + social links (noopener).

NextProject: finds current slug index, next = projects[(index+1) % length]. data-theme="dark" section. Wraps to first from last.

Seed with 8 Indian architecture/interiors projects. Real cities: Delhi, Mumbai, Bengaluru, Jaipur, Hyderabad, Udaipur.
```

---

### 4. v0

```
Design and build a Next.js 14 + TypeScript + CSS Modules portfolio for an Indian interdisciplinary design practice (architecture + interiors + adaptive reuse). No Tailwind. No web fonts. Static output.

Visual system:
- Palette: warm cream #F5F2EE background, near-black #1A1A1A text, terracotta accent #C4501A, muted rgba(26,26,26,0.45) for captions/metadata, hairline dividers rgba(26,26,26,0.12).
- Theme system: data-theme="dark" (text #F5F2EE on #1A1A1A bg) + data-theme="accent" (text #F5F2EE on #C4501A bg) applied at section level in JSX.
- Typography: 'Neue Haas Grotesk','Helvetica Neue',Helvetica,Arial,sans-serif. Weights: 300 body, 500 headings/labels.
- Type scale (CSS vars): --size-display clamp(2.8rem,6vw,7rem), --size-h1 clamp(1.8rem,4vw,4rem), --size-h2 clamp(1.2rem,2.5vw,2.5rem), --size-body 1rem, --size-small 0.8rem, --size-label 0.7rem.
- All letter-spacing: -0.03em on display/h1, 0.1em on labels.
- Easing token: --ease: cubic-bezier(0.25,0.46,0.45,0.94).
- Hard reset: all elements border-radius 0. No exceptions.

Components to build:
1. Nav (sticky, useScrolled hook → transparent→cream bg transition on scroll, 0.3s var(--ease))
2. ProjectCard (3/2 aspect-ratio image wrapper, overflow hidden, caption slide-up on hover with gradient overlay, no scale)
3. DisciplineFilter (discipline tabs + category pills, two-level)
4. ProjectGrid (3-col CSS grid, Framer Motion AnimatePresence exit/enter on filter change)
5. ProjectHero (100vh, next/image fill, title overlay bottom-left, dark theme section)
6. SynopsisSection (two-col grid: label 1fr, content 2fr, border-top var(--color-divider))
7. ImageGallery (alternating: full-width row + split 2-col row)
8. NextProject (dark section, "Next Project" small label, next studio name large link with →)
9. StudioStatement (dark section, display-size text, max-width 20ch, "Conscious design. Celebrating local resources.")
10. AwardsSection (border-top list rows: year muted right-aligned, award name weight 500 left)
11. PressSection (grid of publication names — no logos — grayscale treatment)

TypeScript schema in src/types/index.ts — Discipline, ArchCategory, IntCategory, Project, PressItem, Award, TeamMember interfaces.

Seed: 8 realistic Indian architecture/interiors projects (Delhi, Mumbai, Jaipur, Bengaluru, Udaipur, Hyderabad). 3 marked featured.
```

---

### 5. Claude Artifacts (Cursor / Windsurf / IDE agents)

```
Build a complete, production-ready Next.js 14 App Router portfolio for an Indian architecture and interior design practice. TypeScript strict mode. CSS Modules throughout. No Tailwind. Static export. All case study routes pre-generated.

STUDIO: Award-winning interdisciplinary practice, Delhi, est. 2002. Tagline: "Conscious design — celebrating local resources, cultural influences, and contextual approaches." Three disciplines: Architecture (Hospitality, Institutional, Corporate, Culture, Mixed Use, Homes), Interiors (Retail, Workplace, Leisure, Hotels, F&B, Brand Experiences), Adaptive Reuse. Press: TIME, Condé Nast Traveller, Dezeen, Architectural Digest, Financial Times.

DESIGN SYSTEM:
globals.css:
```css
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; border-radius: 0; }
:root {
  --color: #1A1A1A; --color-bg: #F5F2EE; --color-muted: rgba(26,26,26,0.45);
  --color-divider: rgba(26,26,26,0.12); --color-accent: #C4501A;
  --ease: cubic-bezier(0.25,0.46,0.45,0.94);
  --space-xs:.5rem; --space-sm:1rem; --space-md:2rem; --space-lg:3rem; --space-xl:6rem; --space-xxl:clamp(6rem,12vw,12rem);
  --size-display:clamp(2.8rem,6vw,7rem); --size-h1:clamp(1.8rem,4vw,4rem); --size-h2:clamp(1.2rem,2.5vw,2.5rem);
  --size-body:1rem; --size-small:0.8rem; --size-label:0.7rem;
}
[data-theme="dark"]   { --color:#F5F2EE; --color-bg:#1A1A1A; }
[data-theme="accent"] { --color:#F5F2EE; --color-bg:#C4501A; }
html { font-size:15px; }
@media(min-width:1440px){ html{font-size:16px;} }
@media(min-width:1920px){ html{font-size:18px;} }
body { font-family:'Neue Haas Grotesk','Helvetica Neue',Helvetica,Arial,sans-serif; font-weight:300; background:var(--color-bg); color:var(--color); transition:background-color .3s var(--ease),color .3s var(--ease); }
```

TYPES (src/types/index.ts):
```typescript
export type Discipline = 'architecture'|'interiors'|'adaptive-reuse'
export type ArchCategory = 'hospitality'|'institutional'|'corporate'|'culture'|'mixed-use'|'homes'
export type IntCategory = 'retail'|'workplace'|'leisure'|'homes'|'hotels'|'fb'|'brand-experiences'
export type ProjectCategory = ArchCategory|IntCategory

export interface Project {
  slug:string; title:string; client:string; discipline:Discipline; category:ProjectCategory;
  location:string; year:number; featured:boolean; coverImage:string; heroImage:string;
  images:string[]; synopsis:string; approach:string; materials:string[]; area?:string; awards?:string[]
}
export interface Award { year:number; award:string; project:string }
export interface PressItem { publication:string; title:string; year:number; url?:string }
export interface TeamMember { name:string; role:string }
```

DATA:
- src/data/projects.ts — 8 projects (2 hospitality arch, 2 institutional arch, 2 interiors, 1 adaptive-reuse, 1 homes). Indian cities. 3 featured.
- src/data/awards.ts — 5 awards (Surface Design Awards 2025, PLAN Awards 2024, LIV Hospitality 2024, JK AYA 2024, Dezeen longlisted)
- src/data/press.ts — 6 press items (TIME, Condé Nast Traveller, Dezeen, AD Middle East, Financial Times, The Hindu)
- src/data/team.ts — 12 team members (3 founders + directors + associates)

COMPONENTS (all in src/components/, each with .tsx + .module.css):
Nav — sticky, useScrolled hook toggles .scrolled class → background transparent→var(--color-bg) 0.3s
ProjectCard — next/image fill, aspect-ratio 3/2, overflow hidden; caption (.title + .location + .year) position absolute bottom 0, translateY(100%)→translateY(0) on hover, 0.4s var(--ease), gradient overlay. NO image scale.
DisciplineFilter — two rows: discipline tabs (border-bottom 2px var(--color-accent) when active) + category pills (background var(--color)/var(--color-bg) when active). Category list switches when discipline changes.
ProjectGrid — CSS grid 3-col (1200px+), 2-col (768px–1199px), 1-col (<768px). Framer Motion AnimatePresence.
ProjectHero — 100vh, next/image fill priority, data-theme="dark", title bottom-left overlay.
SynopsisSection — two-col grid (1fr 2fr), border-top var(--color-divider).
ImageGallery — alternating rows: [full-width] then [half + half], repeating.
NextProject — data-theme="dark", finds (index+1) % length, large link with →.
StudioStatement — data-theme="dark", display-size paragraph, max-width 20ch.
AwardsSection — border-top list: year (muted, right) + award (weight 500, left) + project (muted, right).
PressSection — grid of publication name text (no logos), grayscale filter, opacity 0.4→1 on hover.
SkipNav — first DOM element, position absolute top -100%, visible on focus.

PAGES:
/ — hero (full-viewport, first featured project image) → discipline strip (dark, "Architecture. Interiors. Adaptive Reuse.") → featured grid (3 ProjectCards)
/work — 'use client', two-level filter, ProjectGrid with AnimatePresence
/work/[slug] — generateStaticParams, notFound() on unknown. ProjectHero → SynopsisSection → approach two-col → ImageGallery → materials list → AwardsSection if awards → NextProject
/about — StudioStatement → founding text (two-col) → PressSection → AwardsSection → team grid
/contact — address + mailto links + social links (target=_blank noopener)

NEXT.CONFIG: output:'export', images:{unoptimized:true}
Verify: tsc --noEmit zero errors. npm run build generates /out. All 8 slugs pre-rendered.
```

**Four defining constraints:**

**1. Caption slide-up on hover — NOT image scale**
`ProjectCard` hover effect: a `.caption` div positioned `absolute bottom-0` starts at `translateY(100%)` and transitions to `translateY(0)` on `.card:hover`. The image element has no scale transform. This is architecturally distinct: the image is static infrastructure; the caption is the reveal. Any `scale()` transform on the image violates the design philosophy of "photography leads, UI steps aside."

**2. Two-level discipline/category filter — category list changes per discipline**
`DisciplineFilter` maintains two state values: `activeDiscipline` and `activeCategory`. When `activeDiscipline` changes, `activeCategory` resets to null. The category pill row renders a different array depending on `activeDiscipline`: `ARCH_CATEGORIES` for architecture, `INT_CATEGORIES` for interiors, empty for adaptive-reuse (which has no sub-categories). This is not a single flat tag filter — it is a hierarchical domain model.

**3. Static export with generateStaticParams — all 8 slugs pre-rendered at build time**
`next.config.ts` has `output: 'export'` and `images: { unoptimized: true }`. Every `/work/[slug]` page uses `generateStaticParams` that returns `projects.map(p => ({ slug: p.slug }))`. If a slug is visited that is not in the array, `notFound()` is called. Verify: `npm run build` produces `/out/work/[slug]/index.html` for all 8 slugs.

**4. System font stack only — zero network font requests**
Font family: `'Neue Haas Grotesk', 'Helvetica Neue', Helvetica, Arial, sans-serif`. No `@import`, no `<link rel="stylesheet">` for fonts, no `next/font/google`. Weights: 300 and 500 only — not 400, not 600. Verify: Network tab shows zero requests to fonts.googleapis.com or fonts.gstatic.com.

---

### 6. Google Gemini / Gemini Canvas

```
Design a minimalist portfolio website for an Indian architecture and interior design studio. The studio (Delhi, est. 2002) practices "conscious design" — prioritising local materials, cultural context, and vernacular craft over decorative form. Think: Dezeen editorial meets Indian craft sensibility.

Tech stack: Next.js 14 + TypeScript + CSS Modules. No Tailwind, no icon libraries, no web fonts.

Visual language:
The site should feel like a high-quality Indian architecture monograph. Pages of cream. Photography that fills the viewport. Text that steps aside. No decorative borders, shadows, gradients (except the caption overlay gradient on hover). No border-radius.

Exact colors:
- Page background: #F5F2EE (warm cream — Indian raw plaster)
- Body text: #1A1A1A (near-black)
- Muted/metadata: rgba(26,26,26,0.45)
- Terracotta accent: #C4501A (used sparingly: active filter indicator, active nav border)
- Dark sections (data-theme="dark"): text #F5F2EE on bg #1A1A1A

Typography rules:
- System font stack: 'Neue Haas Grotesk', 'Helvetica Neue', Helvetica, Arial, sans-serif
- Weights: 300 for body/body copy, 500 for headings/labels/nav. No other weights.
- All labels and nav links: uppercase, letter-spacing 0.1em, var(--size-label) = 0.7rem
- Display text: clamp(2.8rem,6vw,7rem), letter-spacing -0.03em

Project data structure:
Each project has: slug, title, client, discipline ('architecture'|'interiors'|'adaptive-reuse'), category, location (Indian city), year, featured flag, coverImage, heroImage, images array, synopsis, approach text, materials array, optional area and awards.

Key interactions:
1. Project card hover: caption slides up from below image (translateY 100%→0), NOT image scale. Caption shows: project title (weight 500) + location + year. Dark gradient behind caption text.
2. Navigation: transparent on homepage hero, transitions to cream background after user scrolls 60px. No box-shadow.
3. Project filter: two rows — top row selects discipline (Architecture/Interiors/Adaptive Reuse), bottom row shows sub-categories for that discipline. Category list updates when discipline changes.
4. Scroll reveal: elements fade up on enter (opacity 0→1, translateY 20px→0), using IntersectionObserver hook.

Build all 5 pages (/, /work, /work/[slug], /about, /contact) with seeded data for 8 Indian projects across the disciplines.

The /about page must have: a dark-theme manifesto section at display size (max 20 words), a press section (TIME, Condé Nast Traveller, Dezeen, Architectural Digest, Financial Times — text-only, no logos), an awards list (year + award + project in three-column row with border-top dividers), and a team grid.
```

---

### 7. Grok

```
Build a photography-forward portfolio for an Indian architecture and interior design studio. This is a serious design practice (Delhi, 2002) whose work appears in TIME, Dezeen, and Financial Times. The website is infrastructure for showing photography — not a design showpiece in itself.

Rules:
- Images dominate. Text is metadata.
- Warm cream background (#F5F2EE), near-black text (#1A1A1A). Terracotta (#C4501A) for one active-state indicator only.
- No border-radius, no shadows, no decorative elements.
- System fonts: 'Neue Haas Grotesk','Helvetica Neue',Helvetica,Arial,sans-serif. Weights 300 (body) and 500 (headings) only.
- Hover on project cards: caption slides up from the bottom of the image (CSS transform translateY 100%→0), shows title/location/year over a dark gradient. Do not scale the image.
- Nav is sticky; transparent on the full-viewport hero section, then switches to the cream background colour after scroll.

TypeScript project schema:
{ slug, title, client, discipline:'architecture'|'interiors'|'adaptive-reuse', category:string, location:string, year:number, featured:boolean, coverImage, heroImage, images:string[], synopsis, approach, materials:string[], area?:string, awards?:string[] }

Build with: Next.js 14 App Router, TypeScript, CSS Modules, no Tailwind, static export (output:'export').

Pages:
1. Homepage — full-viewport hero (first featured project photo, no video), horizontal discipline strip (dark background, three disciplines listed), featured projects grid (3 cards).
2. /work — two-level discipline/category filter + animated project grid (Framer Motion AnimatePresence).
3. /work/[slug] — generateStaticParams pre-renders all slugs. Page: 100vh hero → synopsis → approach → alternating image gallery → materials → next project CTA (dark section).
4. /about — studio statement in display size (dark section) + press mentions (text-only, grayscale treatment) + awards list (year/award/project, divider lines) + team grid (name + role).
5. /contact — address, emails, social links.

Seed 8 realistic Indian projects. Use real cities: Delhi, Mumbai, Jaipur, Bengaluru, Udaipur, Hyderabad, Pondicherry. Include project types: boutique hotel, cultural centre, corporate HQ, adaptive reuse of heritage building, luxury retail, co-working, private home.
```

---

### 8. Cursor (agentic, file-by-file)

```
You are building a Next.js 14 App Router portfolio for an Indian architecture and interior design studio. Work file by file. After each file, confirm what was built and wait.

Studio: Award-winning interdisciplinary practice, Delhi, est. 2002. "Conscious design — celebrating local resources, cultural influences, contextual approaches." Disciplines: Architecture + Interiors + Adaptive Reuse. Press: TIME, Condé Nast Traveller, Dezeen, Architectural Digest, Financial Times.

CONSTRAINTS (enforce throughout):
- TypeScript strict, no `any`
- CSS Modules only — no Tailwind, no styled-components
- No web fonts — system stack: 'Neue Haas Grotesk','Helvetica Neue',Helvetica,Arial,sans-serif
- Weights: 300 and 500 only
- border-radius: 0 everywhere (hard reset in globals.css)
- Easing: --ease: cubic-bezier(0.25,0.46,0.45,0.94) — only this curve
- Colors via CSS custom properties only — never hardcode hex in components
- Project card hover = caption slide-up, NOT image scale
- data-theme="dark" attribute on sections, never on body for section-level theming

BUILD ORDER:

Step 1 — Setup
npx create-next-app@latest studio-lotus --typescript --no-tailwind --app --src-dir --no-eslint
cd studio-lotus && npm install framer-motion

Step 2 — globals.css
Hard reset + CSS vars: --color #1A1A1A, --color-bg #F5F2EE, --color-muted rgba(26,26,26,0.45), --color-divider rgba(26,26,26,0.12), --color-accent #C4501A, --ease, spacing tokens (xs through xxl), type tokens (display through label). data-theme="dark" and data-theme="accent" overrides. Responsive base font: 15px → 16px at 1440px → 18px at 1920px.

Step 3 — src/types/index.ts
Discipline, ArchCategory, IntCategory, ProjectCategory, Project, Award, PressItem, TeamMember.

Step 4 — src/data/projects.ts
8 projects typed as Project[]. Indian locations. 3 featured. Disciplines: 2 hospitality arch, 2 institutional arch, 2 interiors (retail+workplace), 1 adaptive-reuse, 1 homes.

Step 5 — src/data/awards.ts + src/data/press.ts + src/data/team.ts

Step 6 — src/hooks/useScrolled.ts + src/hooks/useInView.ts

Step 7 — Nav component (transparent→cream, discipline center links, useScrolled)

Step 8 — ProjectCard component (caption slide-up hover, no image scale, aspect 3/2)

Step 9 — DisciplineFilter component (tabs + pills, two-level, category list changes per discipline)

Step 10 — ProjectGrid component (3-col grid, Framer Motion AnimatePresence)

Step 11 — Homepage assembly (hero + dark strip + featured grid)

Step 12 — /work page (client component, two-level filter state, ProjectGrid)

Step 13 — ProjectHero + SynopsisSection + ImageGallery + NextProject components

Step 14 — /work/[slug] page (generateStaticParams + notFound + full layout)

Step 15 — StudioStatement + PressSection + AwardsSection components

Step 16 — /about page assembly

Step 17 — /contact page

Step 18 — Root layout.tsx (SkipNav + Nav + main + Footer + metadata)

Step 19 — Final: tsc --noEmit + npm run build verification

Step 20 — Accessibility audit
SkipNav visible on focus. All images have meaningful alt text. Nav links keyboard reachable. Color contrast on --color-muted passes WCAG AA (4.5:1 minimum). Focus rings visible in both light and dark themes.

Report after each step: "Step [N] complete. [What was built]. Zero TypeScript errors."
```

**useScrolled.ts — Nav transparency hook:**
```typescript
'use client'
import { useState, useEffect } from 'react'

export function useScrolled(threshold = 60): boolean {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [threshold])

  return scrolled
}
```

**ProjectCard.tsx — caption slide-up (full implementation):**
```tsx
import Image from 'next/image'
import Link from 'next/link'
import type { Project } from '@/types'
import styles from './ProjectCard.module.css'

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className={styles.card}>
      <Link href={`/work/${project.slug}`} className={styles.link}>
        <div className={styles.imageWrapper}>
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={styles.image}
          />
          <div className={styles.caption}>
            <span className={styles.captionTitle}>{project.title}</span>
            <span className={styles.captionMeta}>{project.location} · {project.year}</span>
          </div>
        </div>
      </Link>
    </article>
  )
}
```

```css
/* ProjectCard.module.css */
.card { overflow: hidden; }
.link { display: block; text-decoration: none; }
.imageWrapper { position: relative; aspect-ratio: 3/2; overflow: hidden; }
.image { object-fit: cover; }   /* NO scale transform here */
.caption {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  padding: var(--space-sm);
  background: linear-gradient(transparent, rgba(26,26,26,0.75));
  transform: translateY(100%);
  transition: transform 0.4s var(--ease);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}
.card:hover .caption { transform: translateY(0); }
.captionTitle { color: #F5F2EE; font-weight: 500; font-size: var(--size-small); }
.captionMeta  { color: rgba(245,242,238,0.7); font-size: var(--size-label); letter-spacing: 0.1em; text-transform: uppercase; }
```

**DisciplineFilter.tsx — two-level state:**
```tsx
'use client'
import { useState } from 'react'
import type { Discipline, ArchCategory, IntCategory } from '@/types'
import styles from './DisciplineFilter.module.css'

const ARCH_CATEGORIES: ArchCategory[] = ['hospitality','institutional','corporate','culture','mixed-use','homes']
const INT_CATEGORIES: IntCategory[] = ['retail','workplace','leisure','homes','hotels','fb','brand-experiences']

interface FilterState { discipline: Discipline | 'all'; category: string | null }

export function DisciplineFilter({ onChange }: { onChange: (f: FilterState) => void }) {
  const [discipline, setDiscipline] = useState<Discipline | 'all'>('all')
  const [category, setCategory] = useState<string | null>(null)

  const cats = discipline === 'architecture' ? ARCH_CATEGORIES
    : discipline === 'interiors' ? INT_CATEGORIES : []

  const setDisc = (d: Discipline | 'all') => {
    setDiscipline(d); setCategory(null)
    onChange({ discipline: d, category: null })
  }
  const setCat = (c: string) => {
    setCategory(c)
    onChange({ discipline, category: c })
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.disciplines}>
        {(['all','architecture','interiors','adaptive-reuse'] as const).map(d => (
          <button key={d} className={`${styles.tab} ${discipline === d ? styles.activeTab : ''}`}
            onClick={() => setDisc(d)}>
            {d === 'all' ? 'All' : d.replace('-', ' ')}
          </button>
        ))}
      </div>
      {cats.length > 0 && (
        <div className={styles.categories}>
          {cats.map(c => (
            <button key={c} className={`${styles.pill} ${category === c ? styles.activePill : ''}`}
              onClick={() => setCat(c)}>
              {c.replace('-', ' ')}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
```

**QA grep commands:**
```bash
# No border-radius anywhere
grep -rn "border-radius" src/ | grep -v "0$\|0 ;"

# No web fonts — zero font network requests
grep -rn "@import.*font\|googleapis\|gstatic\|next/font" src/

# Caption slide-up must be present — not image scale
grep -n "translateY\|scale(" src/components/ProjectCard/ProjectCard.module.css

# Colors via CSS custom properties only — no hex in component CSS
grep -rn "#[0-9A-Fa-f]\{3,6\}" src/components/ | grep -v ".module.css"

# generateStaticParams present in all dynamic routes
grep -rn "generateStaticParams" src/app/work/

# All images use next/image — no <img> tags
grep -rn "<img " src/components/ src/app/

# Weights 300 and 500 only — no 400, no 600, no 700
grep -rn "font-weight.*400\|font-weight.*600\|font-weight.*700\|fw-[46]00" src/styles/ src/components/

# Two-level filter: category resets when discipline changes
grep -n "setCategory(null)" src/components/DisciplineFilter/

# useScrolled hook drives Nav transparency
grep -n "useScrolled\|scrolled" src/components/Nav/Nav.tsx

# Static export config present
grep -n "output.*export" next.config.ts

# All 8 project slugs appear in generateStaticParams output
npm run build 2>&1 | grep "work/" | wc -l
# Should return 8
```
