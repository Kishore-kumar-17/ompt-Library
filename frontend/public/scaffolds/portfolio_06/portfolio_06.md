# Portfolio 06 — Brittany Chiang (Iconic Developer Portfolio)
## Category A: 8 Platform Versions

**Source:** https://brittanychiang.com
**Type:** Single-page developer portfolio with sticky two-column layout and scroll-spy navigation
**Distinguishing traits:** Dark navy + teal palette, sticky left panel with scroll-activated nav, monospace font for accent labels, numbered sections, job tab switcher, alternating featured project cards, fade-up scroll animations

---

## Base Prompt

Build an iconic developer portfolio — the kind engineers call the gold standard. Single-page app with anchor-link navigation: About, Experience, Projects. On desktop: two-column layout — sticky left panel (name, title, nav, socials) + scrollable right content. Scroll-spy: as user scrolls, the active section highlights in the left nav.

**Stack:** Next.js 14 App Router + TypeScript + Tailwind CSS with custom colour config. Single-page structure — all sections on `/`, pre-rendered. No MDX needed.

**Colour system (dark navy + teal):**
```css
/* Extend Tailwind config */
navy:           '#0a192f'   /* page background */
light-navy:     '#112240'   /* card bg, hover bg */
lightest-navy:  '#233554'   /* borders, dividers */
slate:          '#8892b0'   /* muted text */
light-slate:    '#a8b2d8'   /* secondary text */
lightest-slate: '#ccd6f6'   /* body text */
white:          '#e6f1ff'   /* headings, emphasis */
teal:           '#64ffda'   /* accent — use sparingly */
```

**Typography:**
- Sans font: `'Calibre', 'Inter', 'San Francisco', 'SF Pro Text', -apple-system, system-ui, sans-serif` — body + headings
- Mono font: `'SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', monospace` — section numbers, labels, tech tags
- Base size: 16px
- Heading (name): `text-5xl font-bold text-white`
- Title: `text-2xl font-medium text-lightest-slate`
- Tagline: `text-slate text-base`
- Section label: `font-mono text-sm text-teal` (e.g. "01.")
- Section heading: `text-2xl font-semibold text-lightest-slate`
- Body: `text-slate leading-relaxed`

**Easing:** `cubic-bezier(0.645, 0.045, 0.355, 1)` — the "easeInOutCubic" curve used throughout.

**Two-column layout (desktop):**
```
lg:grid lg:grid-cols-[1fr_1.5fr] min-h-screen
left:  lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col lg:justify-between
right: scrollable content
```

**Left panel contents:**
1. Studio block: name (`h1`, `text-5xl font-bold`), title (`h2`, `text-xl font-medium text-lightest-slate`), tagline (paragraph, `text-slate text-sm max-w-[300px]`)
2. Nav list (vertical): About / Experience / Projects — each with a line that grows on active (`w-8→w-16 border-t-2`) + text opacity 0.5→1
3. Social icons row: GitHub / LinkedIn / CodePen / Instagram / Goodreads — `text-slate hover:text-teal transition-colors`

**Scroll-spy:** `useActiveSection` hook — `IntersectionObserver` on `#about`, `#experience`, `#projects`. Returns active section id. Nav items apply active styles when their href matches.

**Sections:**

1. **About** (`#about`): 2–3 paragraphs of bio. Numbered label "01. About". Skills grid — technologies listed in a 2-column grid with `▹` teal bullet before each item. Written in first person.

2. **Experience** (`#experience`): Numbered label "02. Experience". Tab switcher: company tabs on left (vertical), job details on right. Each job: title + `@ Company` (teal), date range, bulleted achievements. Tabs: `border-l-2 border-lightest-navy px-4 py-2 text-slate hover:text-teal hover:bg-light-navy`. Active tab: `border-l-2 border-teal text-teal`.

3. **Projects** (`#projects`): Numbered label "03. Projects". Featured projects (3–4): full-width card alternating left/right image + content. Content: overline label "Featured Project" (mono, teal), title (white, large link), description card (light-navy bg, shadow), tech list (mono, slate), GitHub + external links. Then: other notable projects grid (3-col, cards with hover lift).

**Fade-up animation on scroll:** Elements with `.fade-up` class: `opacity-0 translate-y-6` → `opacity-100 translate-y-0` when in view via IntersectionObserver.

**TypeScript schema:**
```typescript
export interface Job {
  company: string
  title: string
  url: string
  range: string         // "January 2022 — Present"
  bullets: string[]
}

export interface Project {
  title: string
  description: string
  tech: string[]
  github?: string
  external?: string
  image?: string
  featured: boolean
}
```

**No page routing.** All sections are anchor IDs on a single `page.tsx`. Nav links use `href="#about"` etc.

---

## Platform Versions

---

### 1. Lovable

```
Build an iconic developer portfolio — single-page with anchor navigation. The reference design is widely considered the gold standard for software engineer portfolios.

Tech: Next.js 14 + TypeScript + Tailwind CSS with custom colour config. No CSS Modules. Static export.

Tailwind custom colours (extend in config):
  navy: '#0a192f'          // page bg
  light-navy: '#112240'    // card bg
  lightest-navy: '#233554' // borders
  slate: '#8892b0'         // muted text
  light-slate: '#a8b2d8'   // secondary text
  lightest-slate: '#ccd6f6'// body text
  white-custom: '#e6f1ff'  // headings
  teal: '#64ffda'          // accent (use sparingly)

Design rules:
- Background always bg-navy (#0a192f). Never white or light.
- Teal (#64ffda) only for: active nav indicator, section number labels, skill bullet points, active tab border, hover states on icons/links. Never as background.
- Font-mono for: section number prefixes ("01.", "02."), tech stack labels, overline "Featured Project" label.
- Two-column layout on desktop (lg:): left sticky panel (lg:sticky top-0 h-screen), right scrollable content.
- On mobile: single column, left panel content stacks above sections.

TypeScript schema:
Job: { company, title, url, range, bullets: string[] }
Project: { title, description, tech: string[], github?, external?, image?, featured: boolean }

Sections (all on single page.tsx with anchor IDs):
#about — "01. About" label (mono, teal). Bio paragraphs. Skills grid (2-col, ▹ bullet before each item in teal).
#experience — "02. Experience". Tab switcher: company tabs left, job content right. Active tab: border-l-2 teal + teal text. Each job: "Title @ Company" (company in teal), date range (mono, slate), bullets.
#projects — "03. Projects". 3 featured projects: alternating image left/right layout. Overline "Featured Project" (mono teal), title (white link), description on light-navy card, tech list (mono slate), GitHub + external links. Then: 3-col grid of other notable projects.

Left panel (sticky):
- Name h1 (text-5xl font-bold text-white-custom)
- Title h2 (text-xl font-medium text-lightest-slate)
- Tagline p (text-slate text-sm, max 12 words)
- Nav list: About / Experience / Projects. Active state via useActiveSection hook (IntersectionObserver scroll-spy). Active: line grows from w-8 to w-16 + text-white-custom. Inactive: text-slate opacity-60.
- Social icons row (bottom): GitHub LinkedIn CodePen. text-slate hover:text-teal.

useActiveSection hook: IntersectionObserver on #about, #experience, #projects. Returns active section id string.

Seed with realistic engineer data: 4 jobs (current + 3 previous, real-looking companies like "Airbnb", "Stripe", "Shopify"). 6 projects total (3 featured, 3 grid). Technologies: React, TypeScript, Next.js, Node.js, GraphQL, AWS, Python.
```

---

### 2. ChatGPT Canvas

```
Build a single-page developer portfolio. Next.js 14 App Router, TypeScript, Tailwind CSS with custom dark-navy colour palette. Static export.

This is a single-page app — all content on page.tsx with anchor IDs. No routing except anchors.

tailwind.config.ts custom colours:
  extend: { colors: {
    'navy': '#0a192f',
    'light-navy': '#112240',
    'lightest-navy': '#233554',
    'slate': '#8892b0',
    'light-slate': '#a8b2d8',
    'lightest-slate': '#ccd6f6',
    'off-white': '#e6f1ff',
    'teal': '#64ffda',
  }}

File structure:
src/
  app/ layout.tsx, page.tsx, globals.css
  components/ Header.tsx, Nav.tsx, AboutSection.tsx, ExperienceSection.tsx, JobTabs.tsx, ProjectsSection.tsx, FeaturedProject.tsx, ProjectCard.tsx, SocialLinks.tsx
  data/ jobs.ts, projects.ts
  hooks/ useActiveSection.ts, useInView.ts
  types/ index.ts

globals.css: html { scroll-behavior: smooth; } body { background: #0a192f; font-family: 'Calibre','Inter',-apple-system,sans-serif; } @media(prefers-reduced-motion:reduce){ * { transition-duration:.01ms!important; } }

Types:
Job: { company:string; title:string; url:string; range:string; bullets:string[] }
Project: { title:string; description:string; tech:string[]; github?:string; external?:string; image?:string; featured:boolean }

useActiveSection(sectionIds: string[]): IntersectionObserver on each section, threshold 0.5, returns id of most-visible section.

useInView(): IntersectionObserver, fires once, returns { ref, inView }. Used for fade-up animation.

Layout (page.tsx):
<main className="bg-navy text-slate">
  <div className="lg:grid lg:grid-cols-[1fr_1.5fr] max-w-6xl mx-auto">
    {/* Left — sticky */}
    <Header activeSection={activeSection} />
    {/* Right — scrollable */}
    <div>
      <AboutSection />
      <ExperienceSection />
      <ProjectsSection />
    </div>
  </div>
</main>

Header.tsx:
- lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col lg:justify-between lg:py-24 px-12
- Name h1: text-5xl font-bold text-off-white
- Title h2: text-xl font-medium text-lightest-slate mt-3
- Tagline p: text-slate text-sm mt-4 max-w-[260px]
- Nav: vertical list, active item determined by activeSection prop
- Active nav item: line (border-t-2 border-off-white w-16) + text-off-white font-medium
- Inactive: line (border-t-2 border-slate w-8) + text-slate opacity-60
- SocialLinks at bottom

JobTabs.tsx:
- Vertical tab list (company names) on left, content on right
- Active tab: border-l-2 border-teal text-teal bg-light-navy
- Inactive: border-l-2 border-lightest-navy text-slate hover:text-teal hover:bg-light-navy
- Content: title + "@ company" (company span text-teal), range (font-mono text-sm text-slate), bullets (▹ before each, text-lightest-slate)

FeaturedProject.tsx:
- Alternating: even index → image left, content right; odd → image right, content left
- "Featured Project" overline: font-mono text-xs text-teal
- Title: text-off-white font-bold text-2xl hover:text-teal
- Description: bg-light-navy p-6 text-lightest-slate text-sm leading-relaxed rounded-none
- Tech list: flex gap-4 font-mono text-xs text-slate
- Icons: GitHub + ExternalLink, text-lightest-slate hover:text-teal

Seed: 4 jobs, 6 projects (3 featured). Real tech stack. Indian city or US city locations fine.
```

---

### 3. Bolt.new

```
Build the gold-standard developer portfolio. Single-page, Next.js 14 + TypeScript + Tailwind. All sections on one page with anchor navigation. Scroll-spy activates nav.

DESIGN RULES (these make the portfolio iconic — do not deviate):
1. Background: bg-navy (#0a192f) everywhere. No white sections.
2. Teal (#64ffda) used ONLY for: active states, accent labels, hover on links/icons, ▹ bullets. Never as a background colour.
3. Two-column desktop layout: lg:sticky left panel + scrollable right.
4. Section numbers in font-mono text-teal: "01.", "02.", "03."
5. Experience section: tab switcher (company list left, details right), NOT an accordion or timeline.
6. Featured projects: alternating left/right image + content layout, NOT a uniform grid.
7. Active nav: growing line indicator (w-8 → w-16) + text-off-white. Inactive: w-8 line + text-slate.
8. NO page navigation — all anchors. No /about, /experience routes.
9. Tech stack labels: font-mono text-xs text-slate. No coloured badges.
10. Fade-up on scroll via useInView hook.

Custom Tailwind colors:
navy #0a192f | light-navy #112240 | lightest-navy #233554
slate #8892b0 | light-slate #a8b2d8 | lightest-slate #ccd6f6
off-white #e6f1ff | teal #64ffda

Jobs: { company, title, url, range, bullets: string[] }
Projects: { title, description, tech: string[], github?, external?, image?, featured: boolean }

hooks/useActiveSection.ts:
IntersectionObserver on section IDs. Returns active section slug. Used to drive nav active state.

hooks/useInView.ts:
IntersectionObserver, fires once. Used for fade-up animation on sections.

Sections on page.tsx:
1. #about — bio paragraphs + skills grid (2-col, ▹ teal bullet)
2. #experience — JobTabs component (vertical tabs + job content)
3. #projects — 3 FeaturedProject cards + 3-col ProjectCard grid

Left sticky header (desktop):
Name → Title → Tagline → Nav list → Social icons (bottom)

Seed: 4 jobs (current=Airbnb/Stripe/Vercel/etc, previous realistic). 6 projects (3 featured: one with image, one without, one with image). React, TypeScript, GraphQL, Node.js, AWS in tech stacks.
```

---

### 4. v0

```
Design and build an iconic single-page developer portfolio. Next.js 14 + TypeScript + Tailwind CSS custom dark palette.

Visual system:
Colors (add to tailwind.config.ts extend.colors):
  navy: '#0a192f' | light-navy: '#112240' | lightest-navy: '#233554'
  slate: '#8892b0' | light-slate: '#a8b2d8' | lightest-slate: '#ccd6f6'
  off-white: '#e6f1ff' | teal: '#64ffda'

Fonts:
  sans: ['Calibre', 'Inter', 'San Francisco', '-apple-system', 'sans-serif']
  mono: ['SF Mono', 'Fira Code', 'Fira Mono', 'Roboto Mono', 'monospace']

Layout:
  Single page. All content on / with section anchor IDs.
  Desktop: grid grid-cols-[1fr_1.5fr] max-w-screen-xl mx-auto.
  Left column: lg:sticky top-0 h-screen flex flex-col justify-between py-24 px-12.
  Right column: py-24 px-12 space-y-32.
  Mobile: single column, left panel stacks above sections.

Left panel structure:
  - h1: name, text-5xl font-bold text-off-white tracking-tight
  - h2: role title, text-xl text-lightest-slate mt-3
  - p: tagline, text-slate text-sm mt-4 leading-snug max-w-[260px]
  - nav: vertical list, items driven by useActiveSection hook
    Active item: flex items-center gap-4 → line (h-px bg-off-white w-16) + text-sm font-medium text-off-white uppercase tracking-widest
    Inactive: same but bg-slate w-8 + text-slate opacity-60
  - social icons: row at bottom, text-slate hover:text-teal transition-colors

Sections (right column):
  #about: section label ("01. About" — "01." in font-mono text-teal, "About" in text-lightest-slate). Bio 2–3 paragraphs. Skills: 2-col grid of items, each with ▹ in text-teal before the skill name.

  #experience: section label "02. Experience". JobTabs:
    Left: vertical list of company names. Active: border-l-2 border-teal text-teal bg-light-navy. Inactive: border-l-2 border-lightest-navy text-slate hover:text-teal hover:bg-light-navy px-5 py-3.
    Right: job title + "@ Company" (company as teal link). Date range in font-mono text-xs text-slate mt-1. Bullets: ul with ▹ before each.

  #projects: section label "03. Projects". FeaturedProject (×3): odd-indexed projects flip image to right side. Each card: overline "Featured Project" font-mono text-xs text-teal, title as text-off-white text-2xl font-bold hover:text-teal, description box bg-light-navy p-7 text-lightest-slate text-sm, tech list font-mono text-xs text-slate flex gap-3, GitHub + external link icons. Then 3-col grid of ProjectCard (bg-light-navy hover:-translate-y-1 transition-transform, folder icon, links, title, description, tech).

useActiveSection(ids: string[]): IntersectionObserver on section elements, rootMargin '-30% 0px -60% 0px', returns active id.

useInView(): fires once, returns { ref, inView }, used for opacity-0 translate-y-6 → opacity-100 translate-y-0 transition.

Seed with 4 jobs + 6 projects. TypeScript, React, Next.js, Node, GraphQL, AWS, Python in stacks.
```

---

### 5. Claude Artifacts (Cursor / Windsurf / IDE agents)

```
Build a production-ready single-page developer portfolio. Next.js 14 App Router + TypeScript strict + Tailwind CSS. Static export. Single page.tsx with all sections — no routing.

COLOUR SYSTEM — extend tailwind.config.ts:
```typescript
colors: {
  navy:            '#0a192f',
  'light-navy':    '#112240',
  'lightest-navy': '#233554',
  slate:           '#8892b0',
  'light-slate':   '#a8b2d8',
  'lightest-slate':'#ccd6f6',
  'off-white':     '#e6f1ff',
  teal:            '#64ffda',
}
fontFamily: {
  sans: ['Calibre','Inter','San Francisco','SF Pro Text','-apple-system','system-ui','sans-serif'],
  mono: ['SF Mono','Fira Code','Fira Mono','Roboto Mono','monospace'],
}
```

TYPES (src/types/index.ts):
```typescript
export interface Job {
  company: string
  title: string
  url: string
  range: string      // "January 2022 — Present"
  bullets: string[]
}

export interface Project {
  title: string
  description: string
  tech: string[]
  github?: string
  external?: string
  image?: string
  featured: boolean
}
```

DATA:
- src/data/jobs.ts — 4 Job entries (most recent first). Realistic companies (Airbnb, Stripe, Shopify, Vercel etc). Bullet points that demonstrate impact.
- src/data/projects.ts — 6 Project entries. 3 featured (image field set), 3 grid-only (no image).

HOOKS:
- src/hooks/useActiveSection.ts:
```typescript
export function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState(sectionIds[0])
  useEffect(() => {
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-30% 0px -60% 0px' }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach((o) => o?.disconnect())
  }, [sectionIds])
  return active
}
```

- src/hooks/useInView.ts: IntersectionObserver, fires once, prefers-reduced-motion aware. Returns { ref, inView }.

COMPONENTS:
Header (src/components/Header.tsx):
  'use client'. lg:sticky lg:top-0 lg:h-screen lg:flex lg:flex-col lg:justify-between lg:py-24 lg:px-12 px-6 py-16.
  Name: h1 text-4xl lg:text-5xl font-bold text-off-white tracking-tight.
  Title: p text-xl text-lightest-slate font-medium mt-3.
  Tagline: p text-slate text-sm mt-4 max-w-[260px] leading-normal.
  Nav: ul with nav items. Each item: button with line + text. Active: line bg-off-white w-16, text text-off-white font-medium. Inactive: line bg-slate w-8, text text-slate opacity-60. onClick: smooth scroll to section, also drives active state alongside useActiveSection.
  SocialLinks: flex gap-4, icons as SVG or emoji text. text-lightest-slate hover:text-teal transition-colors.

JobTabs (src/components/JobTabs.tsx):
  'use client'. useState for activeJob.
  Tab list: vertical, border-l border-lightest-navy.
    Each tab: border-l-2 pl-5 pr-8 py-3 font-mono text-sm.
    Active: border-l-2 border-teal text-teal bg-light-navy/50.
    Inactive: border-l-2 border-transparent text-slate hover:text-teal hover:bg-light-navy/30.
  Content: job.title + " @ " + company (a href job.url, text-teal). Range in font-mono text-xs text-slate mt-1. Bullets: ul, each li has ▹ text-teal mr-2 font-mono, text-lightest-slate text-sm.

FeaturedProject (src/components/FeaturedProject.tsx):
  Props: project + index (even/odd for flip).
  Even: image-left content-right. Odd: content-left image-right (via lg:flex-row-reverse or grid).
  Overline: font-mono text-xs text-teal tracking-widest "Featured Project".
  Title: text-2xl font-bold text-off-white hover:text-teal transition-colors.
  Description: bg-light-navy lg:absolute lg:z-10 p-7 text-lightest-slate text-sm leading-relaxed shadow-xl.
  Tech: flex flex-wrap gap-4 font-mono text-xs text-slate.
  Links: text-lightest-slate hover:text-teal.

ProjectCard (src/components/ProjectCard.tsx):
  bg-light-navy hover:-translate-y-1 transition-all duration-200. p-7.
  Header: folder icon (text-teal text-3xl) + links right.
  Title: text-off-white font-semibold mt-5 mb-3 hover:text-teal.
  Description: text-slate text-sm leading-relaxed.
  Tech: flex flex-wrap gap-3 font-mono text-xs text-slate mt-4.

PAGE (src/app/page.tsx):
  'use client'. useActiveSection(['about','experience','projects']).
  <main className="bg-navy text-slate min-h-screen">
    <div className="max-w-screen-xl mx-auto lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)]">
      <Header activeSection={active} onNavClick={scrollTo} />
      <div className="px-6 lg:px-24 py-24 space-y-32">
        <AboutSection />
        <ExperienceSection />
        <ProjectsSection />
        <footer>Built by [Name]. Designed with reference to Brittany Chiang's v4.</footer>
      </div>
    </div>
  </main>

globals.css: html { scroll-behavior: smooth; } @media(prefers-reduced-motion:reduce){ html{scroll-behavior:auto;} }
Verify: tsc --noEmit zero errors. npm run build succeeds.
```

---

### 6. Google Gemini / Gemini Canvas

```
Build a developer portfolio that engineers consistently call the gold standard for its genre. Single-page design — all content on one page with smooth anchor scroll navigation. No routing between pages.

Stack: Next.js 14 + TypeScript + Tailwind CSS. Custom dark colour palette. Static export.

The design is characterised by:
- Dark navy background (#0a192f) — the entire site
- A single teal accent (#64ffda) used sparingly
- Two-column desktop: sticky left panel + scrolling right content
- Monospace font for labels, numbers, and tech stack tags
- Numbered sections: "01. About", "02. Experience", "03. Projects"
- Scroll-spy nav that highlights the current section
- Experience shown as a tab switcher (not a timeline)
- Featured projects as alternating image+content cards (not a uniform grid)

Custom Tailwind colours:
navy #0a192f, light-navy #112240, lightest-navy #233554, slate #8892b0, light-slate #a8b2d8, lightest-slate #ccd6f6, off-white #e6f1ff, teal #64ffda

Data structures:
Job { company, title, url, range: string, bullets: string[] }
Project { title, description, tech: string[], github?, external?, image?, featured: boolean }

Three content sections:
1. About (#about): 2–3 bio paragraphs. Then a 2-column skills grid — each skill preceded by ▹ in teal. No progress bars. No percentage gauges.
2. Experience (#experience): Tab switcher. Company names as vertical tabs. Active tab: teal left border + teal text + light-navy bg. Each tab's content: title @ company (company in teal and linked), date range in mono, bullet achievements.
3. Projects (#projects): Three featured projects — alternating layout (image left for even, image right for odd). Each: "Featured Project" overline in mono teal, bold title, floating description on light-navy card, tech list in mono, GitHub + live links. Below: grid of 3 smaller project cards (light-navy bg, folder icon, hover lift).

Sticky left panel (desktop):
Your name (h1, large, bold, near-white), role title (h2, medium, lightest-slate), tagline (small, slate, max ~15 words), vertical nav list (About/Experience/Projects), social links row (GitHub · LinkedIn · CodePen — slate, teal on hover).

useActiveSection hook:
IntersectionObserver on each section ID. rootMargin '-30% 0px -60% 0px'. Returns the currently visible section's id. Nav uses this to apply active styles.

Fade-up animation:
useInView hook (IntersectionObserver, fires once). Elements start opacity-0 translate-y-6, transition to opacity-100 translate-y-0 on enter. Disabled under prefers-reduced-motion.

Seed with realistic engineer data: 4 jobs, 6 projects (React, TypeScript, Next.js, GraphQL, Node.js, Python, AWS stacks).
```

---

### 7. Grok

```
Build THE developer portfolio. Single page. Dark navy. Teal accent. Sticky left panel with scroll-spy nav. This is the reference design that every engineer with good taste bookmarks.

Stack: Next.js 14, TypeScript, Tailwind CSS, static export.

Palette — extend tailwind.config.ts colors:
  navy: #0a192f (bg), light-navy: #112240 (cards), lightest-navy: #233554 (borders)
  slate: #8892b0 (muted), light-slate: #a8b2d8 (secondary), lightest-slate: #ccd6f6 (body)
  off-white: #e6f1ff (headings), teal: #64ffda (accent — use once per component max)

Fonts: sans = Calibre/Inter/system. mono = SF Mono/Fira Code/Roboto Mono.

Single page.tsx. Sections: #about, #experience, #projects. No routing.

Layout:
Desktop: 2-column grid. Left (40%): sticky, full height, flex column justify-between. Right (60%): scrolls. Mobile: single column.

Left panel: name h1 (bold, off-white, large) → title h2 (lightest-slate) → tagline p (slate, short) → nav ul (vertical) → social links (bottom).

Nav active state: horizontal line that grows from w-8 (inactive, slate) to w-16 (active, off-white) + text-off-white. Driven by useActiveSection IntersectionObserver hook.

#about: "01. About" heading (01. in mono teal, About in lightest-slate). Bio paragraphs. Skills grid 2-col with ▹ teal bullets.

#experience: "02. Experience". JobTabs: vertical tab list (companies) on left. Active tab: border-l-2 border-teal text-teal bg-light-navy/50. Content: title at company (company teal link), mono date, bullet list. useState for active tab.

#projects: "03. Projects". FeaturedProject ×3 (alternating image side). ProjectCard grid ×3 (bg-light-navy hover lift). Tech stacks in font-mono text-xs text-slate.

Data:
jobs.ts: Job[] — 4 entries newest first. Real-sounding companies. Impact-driven bullets ("Led migration of X to Y, reducing load time by Z%").
projects.ts: Project[] — 6 entries. 3 featured (with image path). 3 notable (no image).

useActiveSection: IntersectionObserver, rootMargin '-30% 0px -60% 0px', returns active section id string.
useInView: fires once, returns { ref, inView }, fade-up animation pattern.

Build it. Seed it with engineer data. Verify tsc clean.
```

---

### 8. Cursor (agentic, file-by-file)

```
Build the reference developer portfolio. Single-page Next.js 14 + TypeScript + Tailwind. Work file by file. Report after each step.

IMMUTABLE RULES:
- bg-navy (#0a192f) everywhere — never white sections
- teal (#64ffda) only for accent states — never background fill
- All sections on one page.tsx — NO routing
- Experience = tab switcher. NOT accordion. NOT timeline.
- Featured projects = alternating layout. NOT uniform grid.
- Nav active state = growing line + text-off-white. Driven by IntersectionObserver.
- font-mono on: section number labels, tech tags, job date ranges, "Featured Project" overline

BUILD ORDER:

Step 1 — Setup + Tailwind config
create-next-app with TS + Tailwind. Add custom colors and fonts to tailwind.config.ts. Add html { scroll-behavior: smooth } to globals.css.

Step 2 — Types
src/types/index.ts: Job { company, title, url, range, bullets } and Project { title, description, tech[], github?, external?, image?, featured }.

Step 3 — Data
src/data/jobs.ts: 4 Job entries, newest first, realistic company names, impact-driven bullets.
src/data/projects.ts: 6 Project entries — 3 featured (image), 3 grid-only.

Step 4 — useActiveSection hook
IntersectionObserver on section IDs array. rootMargin: '-30% 0px -60% 0px'. Returns active section id string.

Step 5 — useInView hook
IntersectionObserver, fires once, prefers-reduced-motion aware. Returns { ref, inView }.

Step 6 — SocialLinks component
Flex row of icon links. text-lightest-slate hover:text-teal transition-colors. GitHub, LinkedIn, CodePen, Instagram.

Step 7 — Header component
'use client'. Props: activeSection, onNavClick. lg:sticky top-0 h-screen flex flex-col justify-between. Name h1 + title p + tagline p + Nav list + SocialLinks.

Step 8 — Nav component
Props: activeSection. Vertical ul. Each item: flex items-center gap-4, line div (h-px transition-all) + text span. Active: w-16 bg-off-white + text-off-white font-medium. Inactive: w-8 bg-slate + text-slate.

Step 9 — JobTabs component
'use client'. useState(jobs[0].company). Vertical tab list + content panel. Active tab style + content rendering.

Step 10 — AboutSection
Section id="about". Fade-up via useInView. Numbered heading. Bio paragraphs. Skills grid.

Step 11 — ExperienceSection
Section id="experience". Numbered heading. JobTabs.

Step 12 — FeaturedProject component
Props: project + index. Even/odd flips image side. Overline + title + description card + tech list + links.

Step 13 — ProjectCard component
bg-light-navy hover:-translate-y-1. Folder icon + links + title + description + tech.

Step 14 — ProjectsSection
Section id="projects". Numbered heading. 3 FeaturedProjects. 3-col ProjectCard grid.

Step 15 — page.tsx assembly
'use client'. useActiveSection(['about','experience','projects']). Full layout grid. Header + sections.

Step 16 — layout.tsx + metadata

Step 17 — Final verification
tsc --noEmit + npm run build.

Report after each step: "Step [N] complete. [Built]. TypeScript: clean."
```

**Four defining constraints:**

**1. All sections on single page.tsx — no routing between sections**
`#about`, `#experience`, and `#projects` are anchor IDs on a single `page.tsx`. Nav links use `href="#about"` etc. There are no routes `/about`, `/experience`, or `/projects`. `useActiveSection` drives nav highlight state by observing which section is scrolled into view — not by checking the URL.

**2. Experience section is a tab switcher — NOT accordion, NOT timeline**
`<JobTabs>` renders a vertical list of company name buttons on the left, and the active job's content on the right. `useState(jobs[0].company)` controls which tab is active. No `<details>/<summary>` accordion, no chronological timeline with dates as connectors. The tab switcher is the canonical form for this portfolio genre.

**3. Active nav indicator is a growing horizontal line — not a dot, not a border**
Each nav item has a `<span>` or `<div>` that functions as a line: `h-px` (1px height), `bg-off-white` when active / `bg-slate` when inactive, `w-16` (wide) when active / `w-8` (narrow) when inactive. The transition `transition-all duration-200` creates the growing effect. Text alongside: `text-off-white font-medium` when active / `text-slate` when inactive.

**4. bg-navy everywhere — no white or light-coloured sections**
The entire page background is `bg-navy` (`#0a192f`). There are no light-mode sections, no `data-theme` switching. Teal (`#64ffda`) is used only as an accent color for active states, section number labels, hover effects, and ▹ bullets — never as a background. `light-navy` (`#112240`) is used for card backgrounds and hovered tab states.

**useActiveSection.ts — full implementation:**
```typescript
import { useState, useEffect } from 'react'

export function useActiveSection(sectionIds: string[]) {
  const [active, setActive] = useState(sectionIds[0])

  useEffect(() => {
    const observers = sectionIds.map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-30% 0px -60% 0px' }
      )
      obs.observe(el)
      return obs
    })
    return () => observers.forEach(o => o?.disconnect())
  }, [sectionIds])

  return active
}
```

**JobTabs.tsx — full implementation:**
```tsx
'use client'
import { useState } from 'react'
import { jobs } from '@/data/jobs'
import styles from './JobTabs.module.css'

export function JobTabs() {
  const [activeCompany, setActiveCompany] = useState(jobs[0].company)
  const job = jobs.find(j => j.company === activeCompany)!

  return (
    <div className="flex gap-0">
      <ul className="flex flex-col border-l border-lightest-navy min-w-[140px]">
        {jobs.map(j => (
          <li key={j.company}>
            <button
              onClick={() => setActiveCompany(j.company)}
              className={`w-full text-left px-5 py-3 font-mono text-sm border-l-2 transition-colors ${
                activeCompany === j.company
                  ? 'border-l-teal text-teal bg-light-navy/50'
                  : 'border-l-transparent text-slate hover:text-teal hover:bg-light-navy/30'
              }`}
            >
              {j.company}
            </button>
          </li>
        ))}
      </ul>
      <div className="pl-8 flex-1">
        <h3 className="text-lightest-slate font-medium">
          {job.title}{' '}
          <a href={job.url} className="text-teal" target="_blank" rel="noopener noreferrer">
            @ {job.company}
          </a>
        </h3>
        <p className="font-mono text-xs text-slate mt-1 mb-4">{job.range}</p>
        <ul className="space-y-3">
          {job.bullets.map((b, i) => (
            <li key={i} className="flex gap-2 text-slate text-sm leading-relaxed">
              <span className="text-teal font-mono mt-0.5 shrink-0">▹</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
```

**QA grep commands:**
```bash
# All sections must be anchor IDs on one page — no /about /experience routes
grep -rn "href.*about\|href.*experience\|href.*projects" src/app/ | grep -v "#about\|#experience\|#projects"

# Experience must be JobTabs — not details/summary or timeline
grep -rn "<details\|timeline" src/components/

# Active nav indicator must be line-based (h-px), not dot/border
grep -n "h-px\|w-8\|w-16" src/components/Nav.tsx

# bg-navy everywhere — no white bg on any section
grep -rn "bg-white\|bg-gray\|bg-neutral" src/app/page.tsx src/components/

# Teal only for accent — never as background fill
grep -rn "bg-teal\|background.*#64ffda" src/

# font-mono on section numbers, tech tags, date ranges
grep -n "font-mono" src/components/AboutSection.tsx src/components/FeaturedProject.tsx
```
