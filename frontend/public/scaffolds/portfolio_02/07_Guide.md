# 07 — Implementation Guide
## Editorial Grid Portfolio · portfolio_platform_02

---

## 1. The Design Premise

This portfolio is not designed *with* CSS. The portfolio *is* CSS. The grid, the vertical type, the blend mode — these are not stylistic choices applied to a content layout. They are the layout. A recruiter who inspects DevTools and sees a hand-crafted 7-column grid with explicit `grid-column` and `grid-row` placements has already understood the creator's skill level before reading a single word.

This means: never use a shortcut that hides the CSS. No Tailwind utility classes for grid placement. No component library that wraps grid areas. Write the grid. Let it be inspected.

---

## 2. Non-Negotiable Rules

| Rule | Correct | Wrong |
|------|---------|-------|
| Border radius | `border-radius: 0` on everything via reset | Any `rounded-*` or `border-radius` value |
| Font loading | System stack only — no `@import`, no `<link>` | Google Fonts, Adobe Fonts, any web font |
| Page layout | CSS Grid with explicit column/row placement | Flexbox for the main page layout |
| Photo treatment | `opacity: 0.5` + `mix-blend-mode: multiply` | Normal opacity, no blend mode |
| Navigation | `writing-mode: vertical-rl` on desktop | Horizontal nav on desktop |
| Animation | CSS `transition` only | Framer Motion, GSAP, JS scroll events |
| Colour count | Three — `#E4E4D5`, `#D55349`, `#000` | Adding a fourth colour |
| Content source | Always from `content.ts` | Hardcoded strings in JSX |
| Link style | Weight 800, uppercase, no underline default | Normal weight, mixed case |

---

## 3. Grid Coordinates Reference

```
Desktop grid: 7 columns × 5 rows

Col:    1    2    3    4    5    6    7
       ┌────┬────┬────┬────┬────┬────┬────┐
Row 1  │         NAME        │ NAV │         │
       │                     │     │         │
Row 2  │                     │     │         │
       │    ┌─── ACCENT ──────────┐│         │
Row 3  │    │          PHOTO     ││         │
       │    │                    ││    CONTENT
Row 4  │    │                    ││         │
       │    └────────────────────┘│         │
Row 5  │                          │         │
       └────┴────┴────┴────┴────┴────┴────┘
```

**Exact CSS placements:**
```css
.nameArea    { grid-column: 1 / 4; grid-row: 1 / 6; }
.accentArea  { grid-column: 3 / 6; grid-row: 1 / 6; }  /* z-index: 0 */
.navArea     { grid-column: 4 / 5; grid-row: 1 / 3; }  /* z-index: 2 */
.photoArea   { grid-column: 3 / 6; grid-row: 3 / 6; }  /* z-index: 1 */
.contentArea { grid-column: 6 / 8; grid-row: 4 / 6; }  /* z-index: 2 */
.footerArea  { grid-column: 1 / 8; grid-row: 6 / 7; }  /* z-index: 2 */
```

---

## 4. Why `mix-blend-mode: multiply` Works Here

```
Background colour: #E4E4D5 (warm beige)
Photo blend mode: multiply

Multiply formula: result = (source × destination) / 255

White in photo (#FFF):   (255 × 228) / 255 = 228 → shows the beige bg
Black in photo (#000):   (0 × 228) / 255   = 0   → shows black
Midtone in photo (#888): (136 × 228) / 255 ≈ 121 → darker beige
```

This is why:
- White backgrounds disappear (show the page beige)
- Skin tones become duotone (warm beige + dark)
- The photo looks printed on the page, not pasted on it

**It breaks when:**
- The photo wrapper has `background: white` (blend has nothing to multiply against)
- The wrapper has `isolation: isolate` (creates a new stacking context, blocking blend)
- The parent has `overflow: hidden` at the wrong level

**Dark mode fix:**
```css
@media (prefers-color-scheme: dark) {
  .photo { mix-blend-mode: screen; }
  /* Screen formula inverts multiply — works on dark backgrounds */
}
```

---

## 5. Writing-Mode Navigation

```css
writing-mode: vertical-rl;
text-orientation: mixed;
```

`vertical-rl` = vertical, right-to-left direction. Text runs from top to bottom, rotated 90° clockwise. This means:
- The text reads top-to-bottom when the reader tilts their head right
- `flex-direction: column` on the nav = links stack top to bottom, which reads naturally

**Common mistake:** Using `transform: rotate(-90deg)` instead. This looks similar but:
- Does not change the element's layout flow
- Causes the element to overlap adjacent grid areas
- Screen readers read the text in wrong order

`writing-mode` is the correct approach — it changes the actual writing direction, not just the visual.

---

## 6. Font Stack Rationale

```css
font-family: 'Avenir Next', 'Avenir', 'Helvetica Neue', Helvetica, Arial, sans-serif;
```

| Font | Availability | Why included |
|------|-------------|--------------|
| Avenir Next | macOS, iOS | First choice — geometric humanist |
| Avenir | older macOS | Fallback for Avenir Next |
| Helvetica Neue | macOS | Windows users won't see Avenir |
| Helvetica | macOS (older) | Older macOS fallback |
| Arial | Windows | The Helvetica-equivalent on Windows |
| sans-serif | All | Final system fallback |

This stack means the site looks almost identical on Mac (Avenir Next), Windows (Arial), and Linux (system sans-serif). No FOUT. No network request. No layout shift.

---

## 7. Content Data Pattern

```typescript
// CORRECT: content from data file
import { talks } from '../../data/content'

export function TalksSection() {
  return <ul>{talks.map(t => <li key={t.title}>{t.title}</li>)}</ul>
}

// WRONG: hardcoded in JSX
export function TalksSection() {
  return (
    <ul>
      <li>CSS Grid is amazing — CSS Day 2023</li>
      <li>Intrinsic Web Design — An Event Apart 2022</li>
    </ul>
  )
}
```

The data file is the only place the portfolio owner ever touches. Components never need editing when content changes.

---

## 8. Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase folders + files | `NameBlock/NameBlock.tsx` |
| CSS Modules | `.module.css`, camelCase classes | `.nameBlock`, `.talkItem` |
| Content interfaces | PascalCase | `Talk`, `Owner`, `Experiment` |
| Data exports | camelCase | `talks`, `owner`, `contact` |
| CSS custom props | kebab-case with `--` | `--size-display`, `--weight-strong` |

---

## 9. Common Mistakes

**Grid:**
- ❌ Using `display: flex` on the page-level layout — it defeats the grid design
- ❌ Forgetting z-index ordering — accent box must be z:0, photo z:1, content z:2
- ❌ Forgetting `position: relative` on photo wrapper when using `next/image fill` mode

**Photo:**
- ❌ `<img style={{ borderRadius: '50%' }}` — circular crops break the Modernist geometry
- ❌ Photo wrapper with white background — blend mode becomes invisible
- ❌ Forgetting `object-fit: cover` — photo distorts without it

**Typography:**
- ❌ `font-weight: 600` — the design only uses 400 and 800; 600 reads as a compromise
- ❌ Mixed-case links — all links are `text-transform: uppercase`; this is not optional

**CSS Reset:**
- ❌ Removing `border-radius: 0` from the reset — this must persist for the entire life of the project
- ❌ Using a UI framework that adds its own `border-radius` — it will conflict

**Accessibility:**
- ❌ Using `<div>` for section containers — use `<section>` with `aria-labelledby`
- ❌ Missing alt text on the photo — it is a meaningful editorial image, not decoration
- ❌ Photo alt: "profile photo" — describe what's in the image: "Jane Smith standing in front of a whiteboard covered in CSS diagrams"

---

## 10. Deployment Checklist

```bash
# Verify before deploying
npm run build   # must succeed with zero errors
tsc --noEmit    # must exit 0

# After deployment, verify:
# 1. Browser DevTools Network tab: no .woff/.woff2/.ttf files loaded
# 2. Browser DevTools Elements tab: zero border-radius values
# 3. Photo: inspect Computed styles → mix-blend-mode: multiply
# 4. Nav: inspect Computed styles → writing-mode: vertical-rl
# 5. Tab through page: skip-nav appears; all links reachable; focus rings visible
# 6. Enable system dark mode: palette changes; accent stays red; photo adapts
# 7. OG tags: paste URL into https://cards-dev.twitter.com/validator
```

---

## 11. next/image Setup for the Hero Photo

The hero photo must fill its CSS Grid area. Use `next/image` with explicit dimensions — NOT the `fill` prop (which requires `position: relative` on the wrapper and adds a `<span>`, which may interfere with grid placement).

```tsx
// src/components/HeroPhoto/HeroPhoto.tsx
import Image from 'next/image'
import { owner } from '../../data/content'
import styles from './HeroPhoto.module.css'

export function HeroPhoto() {
  return (
    <div className={styles.wrapper}>
      <Image
        src={owner.photoUrl}
        alt={owner.photoAlt}
        width={600}
        height={800}
        className={styles.photo}
        priority          // above-the-fold — don't lazy-load
        sizes="(max-width: 900px) 100vw, 30vw"
      />
    </div>
  )
}
```

```css
/* HeroPhoto.module.css */
.wrapper {
  position: relative;
  overflow: hidden;
  height: 100%;
  /* NO background-color — blend mode must see through to page bg */
  /* NO isolation: isolate — would block mix-blend-mode */
}
.photo {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  opacity: 0.5;
  mix-blend-mode: multiply;
  transition: opacity 200ms ease;
  display: block;
}
.photo:hover { opacity: 0.65; }

@media (prefers-color-scheme: dark) {
  .photo { mix-blend-mode: screen; opacity: 0.6; }
}
```

---

## 12. Section + aria-labelledby Pattern

Every content section must be a `<section>` with a unique `id` on the heading and an `aria-labelledby` pointing to it:

```tsx
// src/components/TalksSection/TalksSection.tsx
import { talks } from '../../data/content'
import styles from './TalksSection.module.css'

export function TalksSection() {
  const sorted = [...talks].sort((a, b) => b.year - a.year)

  return (
    <section aria-labelledby="talks-heading" className={styles.section}>
      <h2 id="talks-heading" className={styles.heading}>Talks</h2>
      <ul className={styles.list}>
        {sorted.map(talk => (
          <li key={talk.title} className={styles.item}>
            <a
              href={talk.videoUrl}
              className={styles.title}
              target="_blank"
              rel="noopener noreferrer"
            >
              {talk.title}
            </a>
            <span className={styles.meta}>{talk.event} · {talk.year}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
```

This gives screen readers: "Talks region" with the heading "Talks" — users navigating by landmarks find each section immediately.

**All 4 sections follow this exact same pattern:**
- `<section aria-labelledby="[id]-heading">`
- `<h2 id="[id]-heading">` — matching id
- Content rendered from `content.ts`

---

## 13. Full content.ts Example

```typescript
// src/data/content.ts
import type { Owner, Talk, Experiment, Article, Contact } from '../types'

export const owner: Owner = {
  name: 'Jane Smith',
  displayName: 'Jane\nSmith',    // used for multiline typographic treatment
  role: 'CSS Layout Specialist',
  affiliation: 'CSS Working Group Invited Expert',
  bio: [
    'I think about layout. More specifically, I think about the relationship between content and space — how the decisions we make in CSS shape the meaning a page communicates before a word is read.',
    'Currently working on grid-based editorial interfaces at Fictitious Co. Previously at Mozilla, where I wrote the initial CSS Grid specification tests.',
  ],
  photoUrl: '/photo.jpg',
  photoAlt: 'Jane Smith standing at a whiteboard covered in CSS Grid diagrams',
}

export const talks: Talk[] = [
  { title: 'Intrinsic Web Design', event: 'An Event Apart Seattle', year: 2024, videoUrl: '#' },
  { title: 'The Grid is the Design', event: 'CSS Day Amsterdam', year: 2023, videoUrl: '#' },
  { title: 'Writing Mode as Layout Tool', event: 'Smashing Conf NYC', year: 2023, videoUrl: '#' },
]

export const experiments: Experiment[] = [
  { title: '7-Column Magazine Grid', description: 'Pure CSS editorial grid with 5 named areas and sub-grid', url: '#' },
  { title: 'Blend Mode Portraits', description: 'mix-blend-mode explorations on typography and photography', url: '#' },
]

export const articles: Article[] = [
  { title: 'CSS Grid Fundamentals', publication: 'Smashing Magazine', year: 2024, url: '#' },
]

export const contact: Contact = {
  email: 'jane@example.com',
  github: 'https://github.com/janesmith',
  linkedin: 'https://linkedin.com/in/janesmith',
}
```

---

## 14. next.config.ts for Static Export

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'export',           // generates static HTML — no server needed
  trailingSlash: true,        // /about → /about/index.html for clean Netlify deploys
  images: {
    unoptimized: true,        // required for static export — Vercel handles this automatically
  },
}

export default nextConfig
```

**When deploying to Vercel without `output: 'export'`:** Remove `output: 'export'` and `images.unoptimized` — Vercel runs the Next.js server and handles image optimisation automatically. Only use static export for Netlify, Cloudflare Pages, or GitHub Pages.

---

## 15. QA Grep Commands

Run these before every deploy:

```bash
# 1. No border-radius values (except the reset)
grep -r "border-radius" src/ | grep -v "border-radius: 0"
# Expected: empty output

# 2. No web font imports
grep -rn "@import\|fonts.googleapis\|next/font" src/
# Expected: empty output

# 3. All external links have correct rel attribute
grep -r "target=\"_blank\"" src/ | grep -v "noopener"
# Expected: empty output (every _blank link must have noopener)

# 4. Single h1 on page
grep -rn "<h1" src/
# Expected: exactly 1 result

# 5. No hardcoded content strings in component files (spot check)
grep -rn "\"CSS Day\"\|\"An Event Apart\"" src/components/
# Expected: empty output (content belongs in content.ts only)
```
