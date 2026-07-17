# 07 — Developer Guide
## Indian Architecture + Interiors Studio Portfolio · portfolio_platform_04

Reference while building. Rules here are non-negotiable — they are the design.

---

## 1. Non-Negotiable Rules

| Rule | Why |
|------|-----|
| Caption slide-up on ProjectCard hover — NEVER image scale | Architecture photography is not a product thumbnail; scale reads as e-commerce |
| `border-radius: 0` on all structural elements | Editorial aesthetic — rounded corners signal consumer UI, not professional design |
| Font weights 300 and 500 ONLY | System stack fidelity; Helvetica Neue at 300/500 is the intended palette |
| `var(--color)` always in components — never `#F5F2EE` or `#1A1A1A` | Components must work in both default and dark sections without modification |
| `--color-accent` (#C4501A) on active discipline tab underline ONLY | Terracotta is a signal, not a brand colour; overuse destroys the signal |
| `--ease: cubic-bezier(0.25, 0.46, 0.45, 0.94)` for every transition | Single easing = systemic coherence |
| System font stack — no web fonts | Zero FOUT, no network overhead; a design philosophy, not just a technical choice |
| Nav transparent on homepage hero, cream after scroll | Nav that always shows its background competes with full-bleed photography |
| Two-level discipline + category filter | Single-level is not granular enough for a studio with 3 disciplines and 13 categories |
| Press section: publication names as text — no logo images | Logos are branding for the publications, not for the studio |

---

## 2. The Caption Slide-Up — How It Works

```css
/* ProjectCard.module.css */

.imageWrapper {
  position: relative;
  overflow: hidden;        /* clips the caption when translateY(100%) */
  aspect-ratio: 3 / 2;
}

.caption {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  transform: translateY(100%);         /* hidden below image edge by default */
  transition: transform 0.4s var(--ease);
  padding: var(--space-sm) var(--space-sm) var(--space-md);
  background: linear-gradient(transparent, rgba(26,26,26,0.75));
  color: #F5F2EE;                      /* always light — gradient is always dark */
}

.card:hover .caption,
.card:focus-visible .caption {
  transform: translateY(0);            /* slides into view */
}

/* NEVER add this */
/* .card:hover .image { transform: scale(...); } */
```

The `overflow: hidden` on `.imageWrapper` is what makes the caption invisible when `translateY(100%)` — without it, the caption would show below the image. This is the critical CSS.

---

## 3. Two-Level Filter — State Machine

```
State:
  discipline: 'all' | 'architecture' | 'interiors' | 'adaptive-reuse'
  category:   'all' | ArchCategory | IntCategory

Transitions:
  setDiscipline(d) → also setCategory('all')   ← ALWAYS reset category on discipline change
  setCategory(c)   → discipline unchanged

Category list rendered:
  discipline === 'all'             → no category row
  discipline === 'architecture'    → ARCH_CATEGORIES (6 options)
  discipline === 'interiors'       → INT_CATEGORIES (7 options)
  discipline === 'adaptive-reuse'  → no category row (discipline IS the filter)

Filter logic:
  filtered = projects
    .filter(p => discipline === 'all' || p.discipline === discipline)
    .filter(p => category  === 'all' || p.category  === category)
```

**Common mistake:** Not resetting category when discipline changes. A user on Architecture → Institutional who switches to Interiors will get zero results if "institutional" stays active. Always call `setCategory('all')` inside `handleDisciplineChange`.

---

## 4. Nav Transparency Logic

```typescript
const scrolled = useScrolled(60)     // true when scrollY > 60
const pathname = usePathname()
const isHome = pathname === '/'

// Transparent only on the homepage before the user has scrolled
const transparent = isHome && !scrolled
```

```css
.nav.transparent { background: transparent; }
.nav.filled      { background: var(--color-bg); transition: background-color 0.3s var(--ease); }
```

On `/work`, `/about`, `/contact`: `isHome` is false → nav always `.filled`.
On `/`: before scroll → `.transparent`; after 60px scroll → `.filled`.

**Do not add a backdrop-filter or box-shadow to the transparent state** — it defeats the purpose of the transparent nav over photography.

---

## 5. Theme System at Section Level

```tsx
// Correct — section declares its own theme
<section data-theme="dark" className={styles.statement}>
  <p>Conscious design.</p>
</section>

// Correct — default section (no attribute = :root vars)
<section className={styles.work}>
  <ProjectGrid items={featured} />
</section>

// Wrong — hardcoded colour
<section style={{ backgroundColor: '#1A1A1A' }}>

// Wrong — theme on body for section-level use
<body data-theme="dark">   // only appropriate for global dark mode toggle
```

The `--color-accent` variable (#C4501A) is NOT redefined in `[data-theme="dark"]` or `[data-theme="accent"]`. It remains #C4501A in all themes. Do not change it per theme.

---

## 6. Image Sizing — `sizes` Attribute

Always set `sizes` on ProjectCard images or `next/image` will request full-viewport-width images:

```tsx
// ProjectCard — 3-col desktop, 2-col tablet, 1-col mobile
<Image
  sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
  ...
/>

// Homepage hero — always full viewport
<Image
  sizes="100vw"
  priority
  ...
/>

// ImageGallery full-width row
<Image
  sizes="100vw"
  ...
/>

// ImageGallery half-width
<Image
  sizes="(max-width: 767px) 100vw, 50vw"
  ...
/>
```

---

## 7. Naming Conventions

### Files
- Components: `PascalCase/PascalCase.tsx` + `PascalCase.module.css`
- Data: `camelCase.ts` in `src/data/`
- Hooks: `useCamelCase.ts` in `src/hooks/`
- Types: `index.ts` in `src/types/`

### CSS module classes
- camelCase: `.imageWrapper`, `.captionTitle`, `.disciplineRow`

### Project slugs
- lowercase, hyphen-separated: `taj-heritage-hotel`, `corporate-hq-bengaluru`
- Used in: URL, coverImage path, heroImage path, image array paths

### Data conventions
- `area` field: include unit — `"4,200 sqm"` (string, not number)
- `location` field: "City, India" or "City, State" format
- `materials` array: title-cased — `"Rajasthani Sandstone"`, not `"rajasthani sandstone"`
- `awards` array on Project: short form — `"Surface Design Awards 2025 — Supreme Award"`

---

## 8. Common Mistakes

### Mistake 1: Image scale on hover

```css
/* WRONG — this ruins the design system */
.card:hover .image { transform: scale(1.04); }

/* CORRECT — only the caption moves */
.card:hover .caption { transform: translateY(0); }
```

### Mistake 2: Not resetting category on discipline change

```typescript
// WRONG
const handleDisciplineChange = (d: Discipline | 'all') => {
  setDiscipline(d)
  // category still set to 'institutional' — zero results when switching to Interiors
}

// CORRECT
const handleDisciplineChange = (d: Discipline | 'all') => {
  setDiscipline(d)
  setCategory('all')   // always reset
}
```

### Mistake 3: Using colour-accent for text

```css
/* WRONG — #C4501A fails contrast on #F5F2EE at body size */
.label { color: var(--color-accent); }

/* CORRECT — accent only for border-bottom on active tab */
.tab.active { border-bottom-color: var(--color-accent); }
```

### Mistake 4: Adding web fonts

```tsx
// WRONG
import { Inter } from 'next/font/google'

// WRONG
@import url('https://fonts.googleapis.com/...')

// CORRECT — globals.css
body { font-family: 'Neue Haas Grotesk','Helvetica Neue',Helvetica,Arial,sans-serif; }
```

### Mistake 5: Missing `overflow: hidden` on imageWrapper

Without it, the caption slides up but is still visible below the image card before hover.

```css
/* REQUIRED — do not remove */
.imageWrapper { overflow: hidden; }
```

### Mistake 6: Press section with logo images

```tsx
// WRONG
<img src="/press/dezeen-logo.svg" alt="Dezeen" />

// CORRECT
<p className={styles.publication}>Dezeen</p>
```

### Mistake 7: Font weight other than 300/500

```css
/* WRONG */
font-weight: 400;  /* body prose */
font-weight: 700;  /* headings */

/* CORRECT */
font-weight: 300;  /* body */
font-weight: 500;  /* headings, labels, nav, CTAs */
```

### Mistake 8: Adaptive Reuse showing category pills

```tsx
// WRONG — adaptive-reuse doesn't have sub-categories
if (discipline !== 'all') {
  return <CategoryRow categories={categories} />
}

// CORRECT — adaptive-reuse has no categories array, so nothing renders
if (categories.length > 0) {
  return <CategoryRow categories={categories} />
}
// In the parent, categories = [] when discipline === 'adaptive-reuse'
```

---

## 9. Indian Materials Reference

Use real Indian materials in project data — they signal the studio's vernacular authenticity:

| Category | Materials |
|----------|-----------|
| Stone | Rajasthani Sandstone, Kota Stone, Kadappa Stone, Agra Red Sandstone, Makrana Marble |
| Plaster | Lime Plaster, Surkhi Plaster, Jaipur Blue Pottery Tiles |
| Wood | Teak, Sheesham (Indian Rosewood), Bamboo, Coconut Wood |
| Craft | Handwoven Cane, Khadi Fabric, Jute Weave, Block-Printed Cotton |
| Modern | Recycled Brick, Compressed Earth Blocks, Fly Ash Bricks |

---

## 10. Static Generation and `notFound()`

```typescript
export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export default function Page({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug)
  if (!project) notFound()  // throws — Next.js renders 404
  return <ProjectDetailLayout project={project} />
}
```

`notFound()` throws internally. Do not guard with `if (!project) return null` — this renders a blank page, not a 404.

---

## 11. Launch Checklist

- [ ] `tsc --noEmit` zero errors
- [ ] `npm run build` succeeds; `/out/work/` contains all 8 project slugs
- [ ] Zero `border-radius` on structural elements (confirm in DevTools)
- [ ] No font files in Network tab
- [ ] Caption slides up on hover; image does NOT scale — verify in browser
- [ ] Nav transparent on homepage hero before scroll; cream after 60px
- [ ] Nav always cream on /work, /about, /contact
- [ ] Selecting Architecture shows 6 category pills
- [ ] Selecting Interiors shows 7 different category pills
- [ ] Selecting Adaptive Reuse shows NO category pills
- [ ] Switching disciplines resets category selection
- [ ] `aria-selected` on discipline tabs toggles correctly
- [ ] `aria-pressed` on category pills toggles correctly
- [ ] All external links: `target="_blank" rel="noopener noreferrer"`
- [ ] Press section: text-only, no images
- [ ] Awards sorted newest first
- [ ] NextProject wraps from last project to first
- [ ] `prefers-reduced-motion`: captions always visible, transitions instant
- [ ] Lighthouse performance ≥ 90 on /work
- [ ] Lighthouse accessibility ≥ 90 on all pages
- [ ] OG image in page source; renders on social share preview
