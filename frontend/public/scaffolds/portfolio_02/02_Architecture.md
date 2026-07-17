# 02 — Architecture
## Editorial Grid Portfolio · portfolio_platform_02

---

### 1. Architecture Decision

Static site. Next.js 14 App Router for server-side rendering and Open Graph meta. CSS Modules for component-scoped layout styles. No client-side JavaScript for layout — everything is CSS. Content lives in a single typed data file.

No database. No CMS. No API routes. Deployed as a static export.

---

### 2. Tech Stack

| Layer | Choice | NOT using | Reason |
|-------|--------|-----------|--------|
| Framework | Next.js 14 App Router | Vite/React only | SSR for OG meta; `next/image` |
| Language | TypeScript strict | JS | typed content data, no runtime surprises |
| Styling | CSS Modules | Tailwind / CSS-in-JS | manual grid coordinates; Tailwind abstracts away the specificity this design requires |
| Fonts | System stack | Google Fonts | no FOUT, no network request, instant render |
| Images | `next/image` | `<img>` | automatic WebP, explicit dimensions |
| Animations | CSS transitions only | Framer Motion / GSAP | restraint is the aesthetic |
| Deployment | Vercel static export | Server deployment | no dynamic routes needed |

---

### 3. Folder Structure

```text
src/
├── app/
│   ├── layout.tsx            ← root layout: meta, OG tags, body font class
│   ├── page.tsx              ← home page: assembles grid sections
│   └── globals.css           ← CSS custom properties, reset, base styles
├── components/
│   ├── PageGrid/
│   │   ├── PageGrid.tsx      ← CSS Grid wrapper with named grid areas
│   │   └── PageGrid.module.css
│   ├── NameBlock/
│   │   ├── NameBlock.tsx     ← typographic name treatment in grid
│   │   └── NameBlock.module.css
│   ├── SideNav/
│   │   ├── SideNav.tsx       ← vertical-rl navigation
│   │   └── SideNav.module.css
│   ├── HeroPhoto/
│   │   ├── HeroPhoto.tsx     ← next/image with opacity + blend mode
│   │   └── HeroPhoto.module.css
│   ├── AccentBox/
│   │   └── AccentBox.tsx     ← red structural border element
│   ├── BioSection/
│   │   ├── BioSection.tsx
│   │   └── BioSection.module.css
│   ├── TalksSection/
│   │   ├── TalksSection.tsx
│   │   └── TalksSection.module.css
│   ├── ExperimentsSection/
│   │   ├── ExperimentsSection.tsx
│   │   └── ExperimentsSection.module.css
│   ├── WritingSection/
│   │   ├── WritingSection.tsx    ← optional
│   │   └── WritingSection.module.css
│   ├── ContactSection/
│   │   ├── ContactSection.tsx
│   │   └── ContactSection.module.css
│   └── SkipNav/
│       └── SkipNav.tsx       ← accessibility skip link
├── data/
│   └── content.ts            ← single source of truth for all content
├── types/
│   └── index.ts              ← TypeScript interfaces
└── public/
    └── photo.jpg             ← creator portrait
```

---

### 4. TypeScript Types

```typescript
// src/types/index.ts

export interface Owner {
  name: string
  displayName: string        // typographic treatment (may split across lines)
  role: string
  affiliation: string
  bio: string[]              // array of paragraphs
  photoUrl: string
  photoAlt: string
}

export interface Talk {
  title: string
  event: string
  year: number
  videoUrl: string
  slidesUrl?: string
}

export interface Experiment {
  title: string
  description: string
  url: string
  sourceUrl?: string
}

export interface Article {
  title: string
  publication: string
  year: number
  url: string
}

export interface Contact {
  email: string
  github: string
  linkedin: string
  mastodon?: string
  twitter?: string
}
```

---

### 5. CSS Grid Architecture

```css
/* src/components/PageGrid/PageGrid.module.css */

.grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(5, auto);
  min-height: 100vh;
  background: var(--bg);
  padding: var(--space-lg);
  gap: 0;
}

/* Named grid placements */
.nameArea      { grid-column: 1 / 4;  grid-row: 1 / 6; }
.navArea       { grid-column: 4 / 5;  grid-row: 1 / 3; }
.accentArea    { grid-column: 3 / 6;  grid-row: 1 / 6; }  /* behind others — z-index: -1 */
.photoArea     { grid-column: 3 / 6;  grid-row: 3 / 6; }
.contentArea   { grid-column: 6 / 8;  grid-row: 4 / 6; }
.footerArea    { grid-column: 1 / 8;  grid-row: 6 / 7; }

/* Responsive: single column below 900px */
@media (max-width: 900px) {
  .grid {
    display: block;
    padding: var(--space-md);
  }
}
```

---

### 6. Photo Blend Mode Pattern

```css
/* src/components/HeroPhoto/HeroPhoto.module.css */

.photoWrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.5;
  mix-blend-mode: multiply;
  transition: opacity 200ms ease;
}

.photo:hover {
  opacity: 0.65;
}

/* mix-blend-mode: multiply works because:
   - background is warm beige (#E4E4D5)
   - photo is against this background
   - multiply removes white areas, darkens midtones
   - result: photo integrates with page, not floating */
```

---

### 7. Vertical Navigation Pattern

```css
/* src/components/SideNav/SideNav.module.css */

.nav {
  writing-mode: vertical-rl;
  text-orientation: mixed;
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  padding: var(--space-sm);
}

.link {
  font-weight: 800;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text);
  text-decoration: none;
  transition: color 120ms ease;
}

.link:hover { color: var(--accent); }
.link:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

/* Mobile: restore horizontal writing */
@media (max-width: 900px) {
  .nav {
    writing-mode: horizontal-tb;
    flex-direction: row;
    flex-wrap: wrap;
  }
}
```

---

### 8. Fluid Typography Scale

```css
/* src/app/globals.css */
:root {
  --bg: #E4E4D5;
  --accent: #D55349;
  --text: #000000;
  --text-muted: rgba(0, 0, 0, 0.5);

  --font: 'Avenir Next', 'Avenir', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  --weight-body: 400;
  --weight-strong: 800;

  --size-display: calc(1.6rem + 1.6vw);
  --size-h2: clamp(1rem, 2.5vw, 1.4rem);
  --size-body: 1.1rem;
  --size-small: 0.85rem;
  --size-nav: 0.85rem;

  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 2rem;
  --space-lg: 3rem;
  --space-xl: 5rem;
}

/* Hard reset for border-radius */
*, *::before, *::after {
  box-sizing: border-box;
  border-radius: 0;              /* NO border-radius anywhere */
  margin: 0;
  padding: 0;
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font);
  font-size: var(--size-body);
  font-weight: var(--weight-body);
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
}

a {
  color: inherit;
  font-weight: var(--weight-strong);
  text-transform: uppercase;
  text-decoration: none;
  letter-spacing: 0.04em;
  transition: color 120ms ease;
}

a:hover { color: var(--accent); }

a:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

h1, h2, h3, h4 {
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-weight: var(--weight-strong);
  line-height: 1.1;
}
```

---

### 9. Open Graph Meta

```tsx
// src/app/layout.tsx
export const metadata: Metadata = {
  title: 'Jane Smith — Designer & Developer',
  description: 'Portfolio of Jane Smith, CSS layout specialist and speaker.',
  openGraph: {
    title: 'Jane Smith — Designer & Developer',
    description: 'CSS Grid experiments, conference talks, and creative web work.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jane Smith — Designer & Developer',
    description: 'CSS Grid experiments, conference talks, and creative web work.',
    images: ['/og-image.png'],
  },
}
```

---

### 10. Build and Deployment

```bash
# Static export
next build
# Output: .next/ or out/ depending on next.config.js

# next.config.ts
const nextConfig = {
  output: 'export',   // static export — no server required
  images: { unoptimized: true },  // or use Vercel image optimization (remove unoptimized)
}
```

No environment variables needed. All content is static.

Deploy to Vercel: push to GitHub → Vercel auto-deploys on push. Zero configuration needed.

---

### 11. Component Data Flow

```
page.tsx (Next.js App Router)
│
├── imports: owner, talks, experiments, articles, contact from content.ts
│
├── <PageGrid>                    ← layout wrapper (CSS Grid)
│    ├── <NameBlock owner={owner} />
│    ├── <SideNav />              ← static nav links (no props)
│    ├── <AccentBox />            ← no props — pure CSS structural element
│    ├── <HeroPhoto owner={owner} />
│    ├── <BioSection owner={owner} />
│    ├── <TalksSection talks={talks} />
│    ├── <ExperimentsSection experiments={experiments} />
│    ├── {articles.length > 0 && <WritingSection articles={articles} />}
│    └── <ContactSection contact={contact} />
│
└── <SkipNav />   ← renders before <PageGrid> in DOM order

State: NONE. This is a fully static server component tree. No useState, no useEffect, no client components.
```

Every component is a React Server Component by default. No `'use client'` directive needed anywhere — there is no interactivity requiring client-side JS.

---

### 12. Section Component Pattern

All content section components follow the same structure:

```tsx
// Pattern: BioSection.tsx (every content section is identical in shape)
import type { Owner } from '../../types'
import styles from './BioSection.module.css'

interface Props { owner: Owner }

export function BioSection({ owner }: Props) {
  return (
    <section aria-labelledby="bio-heading" className={styles.section}>
      <h2 id="bio-heading" className={styles.heading}>About</h2>
      {owner.bio.map((paragraph, i) => (
        <p key={i} className={styles.paragraph}>{paragraph}</p>
      ))}
      <p className={styles.role}>
        <strong>{owner.role}</strong>
        {owner.affiliation && ` · ${owner.affiliation}`}
      </p>
    </section>
  )
}
```

Every section:
1. Is a `<section>` with `aria-labelledby="[section]-heading"`
2. Has an `<h2 id="[section]-heading">` matching the `aria-labelledby`
3. Renders data from `content.ts` via typed props
4. Has its own `.module.css` with shared section heading pattern

---

### 13. TypeScript Strict Configuration

```json
// tsconfig.json (generated by create-next-app, verify these are set)
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "noImplicitAny": true
  }
}
```

`strict: true` catches: `null` dereferences on optional fields (`owner.photoUrl?`), missing return types, and implicit `any` in map callbacks. Run `tsc --noEmit` before every commit.

---

### 14. Dark Mode Architecture

Dark mode is handled entirely in `globals.css` — no JavaScript, no React state, no class toggling. CSS custom property redefinition inside `@media (prefers-color-scheme: dark)` propagates automatically to every component that uses those variables:

```css
/* globals.css — light mode (default) */
:root {
  --bg: #E4E4D5;
  --text: #000000;
  --text-muted: rgba(0,0,0,0.5);
  --accent: #D55349;
}

/* Dark mode — only these tokens change */
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #1C1C1A;
    --text: #E4E4D5;
    --text-muted: rgba(228,228,213,0.5);
    /* --accent stays #D55349 */
  }
}
```

The `mix-blend-mode` override for dark mode lives in `HeroPhoto.module.css` (not globals.css) — it targets the specific `<img>` element, not a token:

```css
/* HeroPhoto.module.css — dark mode override */
@media (prefers-color-scheme: dark) {
  .photo { mix-blend-mode: screen; opacity: 0.6; }
}
```
