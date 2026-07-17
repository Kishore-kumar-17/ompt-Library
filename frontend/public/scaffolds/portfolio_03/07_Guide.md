# 07 — Developer Guide
## Studio Portfolio with Case Studies · portfolio_platform_03

Reference while building. Rules here are non-negotiable — they are the design.

---

## 1. Non-Negotiable Rules

| Rule | Why |
|------|-----|
| `border-radius: 0` on all structural elements (cards, sections, images, nav) | The system's visual identity is sharp edges — softness signals uncertainty |
| `border-radius: 4px` on FilterBar pills ONLY | The single exception, intentional contrast with the rest |
| `var(--color)` always — never `#FFFFFF` or `#0A0A0A` in components | Components must work in all 4 themes without modification |
| `data-theme="dark"` on the element, never on `<body>` for sections | Section-level theming — each section declares its own context |
| `--ease: cubic-bezier(0.215, 0.61, 0.355, 1)` for every transition | Single easing creates systemic coherence; mixing easings signals inconsistency |
| No web fonts — system stack only | Zero FOUT, zero network requests for fonts |
| CSS-only theme switching — no JavaScript colour interpolation | JS colour transitions are bypassed by browser paint; CSS custom property transitions work natively |
| `autoPlay muted loop playsInline` on video — nothing else | No controls, no audio. Ever. |
| Manifesto text ≤ 15 words | Short convictions; paragraphs belong in NarrativeSections |
| Font weights: 400 and 700 only | Two weights is a constraint, not a limitation. Enforce it. |

---

## 2. How the Theme System Works

### The mechanism

```css
:root, [data-theme="default"] { --color: #0A0A0A; --color-bg: #FFFFFF; }
[data-theme="dark"]            { --color: #FFFFFF; --color-bg: #0A0A0A; }
[data-theme="red"]             { --color: #FFFFFF; --color-bg: #DA382E; }
[data-theme="blue"]            { --color: #FFFFFF; --color-bg: #312DFB; }
```

CSS custom properties cascade. When you write `data-theme="dark"` on a `<section>`, the browser recalculates `--color` and `--color-bg` for that element and all its descendants. Components inside that section automatically inherit the correct colours — no props, no context, no JavaScript.

### Correct usage

```tsx
// Section declares its own theme
<section data-theme="dark" className={styles.hero}>
  <h1 className={styles.headline}>Digital-First Design Studio</h1>
  {/* --color resolves to #FFFFFF here */}
</section>

// No theme attribute = inherits :root = default (black on white)
<section className={styles.work}>
  <WorkGrid items={featured} />
</section>
```

### Wrong usage

```tsx
// WRONG: hardcoded colour
<h1 style={{ color: '#FFFFFF' }}>Headline</h1>

// WRONG: JavaScript theme switching
document.body.style.backgroundColor = '#0A0A0A'

// WRONG: theme on body for section-level theming
<body data-theme="dark">  {/* only for global dark mode, not section use */}
```

### Theme map — what goes where

| Section | Theme |
|---------|-------|
| VideoHero | `dark` |
| Studio statement strip | `dark` |
| Featured work grid | `default` (no attribute) |
| /work index | `default` |
| CaseStudyHero | `dark` |
| Challenge / Approach / Outcome | `default` |
| NextProject CTA | `dark` |
| /about ManifestoSection | `dark` |
| /about CapabilitiesSection | `default` |
| /about TeamSection | `default` |
| /about AwardsSection | `default` or `red` |
| /contact | `default` |
| Footer | `dark` |

---

## 3. The Easing Curve

```css
--ease: cubic-bezier(0.215, 0.61, 0.355, 1);
```

This is an ease-out curve (starts fast, settles gently). Apply it to every transition in the system:

| Interaction | Duration |
|-------------|----------|
| Theme background/colour | `0.3s var(--ease)` |
| Nav background | `0.3s var(--ease)` |
| WorkCard image hover scale | `0.3s var(--ease)` |
| Filter pill active fill | `0.2s var(--ease)` |
| Scroll reveal (opacity + translateY) | `0.6s var(--ease)` |

Never use `ease`, `ease-in-out`, `linear`, or any other easing function. If you need a transition, use `var(--ease)`.

---

## 4. Naming Conventions

### Files
- Components: `PascalCase/PascalCase.tsx` + `PascalCase.module.css`
- Data: `camelCase.ts` in `src/data/`
- Types: `index.ts` in `src/types/`
- Hooks: `useCamelCase.ts` in `src/hooks/`

### CSS module classes
- Use camelCase: `.imageWrapper`, `.metaStrip`, `.navLink`
- Never use BEM or dashes: `.image-wrapper` is wrong here

### TypeScript
- Interfaces: `PascalCase` (e.g. `CaseStudy`, `TeamMember`)
- Types/unions: `PascalCase` (e.g. `Category`, `Theme`)
- No `any` — ever

### Slugs
- All lowercase, hyphen-separated: `studio-rebrand`, `e-commerce-replatform`
- Match the `slug` field in `work.ts`

---

## 5. Common Mistakes

### Mistake 1: Hardcoding colours in components

```tsx
// WRONG
<p style={{ color: 'white' }}>Label</p>
<div style={{ backgroundColor: '#0A0A0A' }}>Section</div>

// CORRECT
<p className={styles.label}>Label</p>  // CSS uses var(--color)
<section data-theme="dark">Section</section>
```

### Mistake 2: Adding border-radius to structural elements

```css
/* WRONG */
.card { border-radius: 8px; }
.image { border-radius: 4px; }
.section { border-radius: 12px; }

/* CORRECT — zero radius everywhere except filter pills */
.pill { border-radius: 4px; }
```

### Mistake 3: Using `next/font` or importing fonts

```tsx
// WRONG
import { Inter } from 'next/font/google'

// CORRECT — system stack only
font-family: 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif;
```

### Mistake 4: JS colour interpolation for theme sections

```tsx
// WRONG
const [theme, setTheme] = useState('default')
<section style={{ backgroundColor: theme === 'dark' ? '#0A0A0A' : '#FFFFFF' }}>

// CORRECT
<section data-theme="dark">
```

### Mistake 5: Missing `'use client'` on interactive pages

```tsx
// /work/page.tsx uses useState — must have this
'use client'

// /work/[slug]/page.tsx has no client state — no 'use client' needed
```

### Mistake 6: Forgetting `generateStaticParams`

```typescript
// Without this, /work/[slug] routes 404 on static export
export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }))
}
```

### Mistake 7: Wrong font weights

```css
/* WRONG — only 400 and 700 exist in this system */
font-weight: 500;
font-weight: 600;
font-weight: 300;

/* CORRECT */
font-weight: 400;  /* body */
font-weight: 700;  /* headings, labels, CTAs, nav */
```

### Mistake 8: Using easing other than --ease

```css
/* WRONG */
transition: transform 0.3s ease-in-out;
transition: opacity 0.5s cubic-bezier(0.4, 0, 0.2, 1);

/* CORRECT */
transition: transform 0.3s var(--ease);
transition: opacity 0.6s var(--ease);
```

### Mistake 9: `<iframe>` for client live sites

```tsx
// WRONG — never embed
<iframe src="https://client.com" />

// CORRECT — link out with arrow
<a href="https://client.com" target="_blank" rel="noopener noreferrer">
  View live ↗
</a>
```

### Mistake 10: Inline data-theme on body for section theming

```tsx
// WRONG — sets global theme, breaks section-level overrides
<body data-theme="dark">

// CORRECT — only section-level declarations
<section data-theme="dark" className={styles.hero}>
```

---

## 6. The WorkCard Scale Contract

The hover scale on WorkCard images is not optional decoration — it IS the interaction model.

```css
.imageWrapper {
  overflow: hidden;         /* clips the scaled image — required */
  aspect-ratio: 4 / 3;     /* always 4:3 — never change this ratio */
}

.image {
  transition: transform 0.3s var(--ease);
}

.card:hover .image,
.card:focus-visible .image {
  transform: scale(1.04);   /* 1.04 exactly — not 1.05, not 1.03 */
}
```

Without `overflow: hidden` on the wrapper, the scaled image bleeds outside the card. The `focus-visible` selector ensures keyboard users get the same feedback as mouse users.

---

## 7. Static Generation and notFound()

```typescript
// src/app/work/[slug]/page.tsx

export async function generateStaticParams() {
  return caseStudies.map((cs) => ({ slug: cs.slug }))
}

export default function Page({ params }: { params: { slug: string } }) {
  const cs = caseStudies.find((c) => c.slug === params.slug)
  if (!cs) notFound()   // renders Next.js 404 page — never return null
  return <CaseStudyLayout caseStudy={cs} />
}
```

`notFound()` throws internally — Next.js catches it and renders the 404 page. Do not guard with early returns or conditional rendering. Always call `notFound()`.

---

## 8. NextProject Wrap Logic

```typescript
const currentIndex = caseStudies.findIndex((cs) => cs.slug === currentSlug)
const next = caseStudies[(currentIndex + 1) % caseStudies.length]
```

The modulo `% caseStudies.length` wraps the last case study back to index 0. This means the last project's "Next" CTA points to the first project. Test this explicitly — it is the most commonly broken feature in case study navigation.

---

## 9. Accessibility Checklist (per page)

- [ ] `<h1>` appears exactly once per page
- [ ] Section headings are `<h2>`; sub-headings are `<h3>`
- [ ] All `<img>` and `next/image` have descriptive `alt` text
- [ ] All interactive elements reachable by keyboard (Tab + Enter/Space)
- [ ] Focus rings visible: `outline: 2px solid var(--color); outline-offset: 2px`
- [ ] FilterBar pills have `aria-pressed={active === cat.value}`
- [ ] SkipNav is first focusable element; jumps to `id="main"`
- [ ] All external links: `target="_blank" rel="noopener noreferrer"`
- [ ] Video: no controls attribute, no autoplay with sound

---

## 10. prefers-reduced-motion

Two places to implement:

**CSS (globals.css):**
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    transition-duration: 0.01ms !important;
    animation-duration: 0.01ms !important;
  }
  video[autoplay] { display: none; }
  .video-poster { display: block !important; }
}
```

**Hook (useInView.ts):**
```typescript
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
if (prefersReduced) {
  setInView(true)  // immediately visible, skip animation
  return
}
```

---

## 11. `next/image` Usage

```tsx
// Hero images — use priority (above fold)
<Image
  src={cs.heroImage}
  alt={cs.client}
  fill
  priority
  style={{ objectFit: 'cover' }}
/>

// WorkCard covers — first 2 on homepage get priority
<Image
  src={cs.coverImage}
  alt={cs.client}
  fill
  priority={index < 2}
  sizes="(max-width: 768px) 100vw, 50vw"
  style={{ objectFit: 'cover' }}
/>

// Deep page images — no priority
<Image
  src={image}
  alt=""
  fill
  sizes="(max-width: 768px) 100vw, 66vw"
  style={{ objectFit: 'cover' }}
/>
```

Always set `sizes` on WorkCard images. Without it, Next.js assumes 100vw and downloads an unnecessarily large image.

---

## 12. Deployment

```bash
# Build static output
npm run build

# Verify: /out directory created; all slugs present as folders
ls out/work/

# Type check before deploying
npx tsc --noEmit

# Deploy
vercel --prod
```

`next.config.ts` must have `output: 'export'` for static generation. With Vercel, you can omit this and let Vercel handle SSG — but for a fully static export, include it.

---

## 13. Launch Checklist

- [ ] `tsc --noEmit` zero errors
- [ ] `npm run build` succeeds; all case study slugs pre-rendered
- [ ] Zero `border-radius` on structural elements (confirm in browser DevTools)
- [ ] No font files in Network tab (only system fonts)
- [ ] All `data-theme` attributes on correct sections (inspect each page)
- [ ] FilterBar `aria-pressed` toggles on each pill click
- [ ] All external links have `target="_blank" rel="noopener noreferrer"`
- [ ] SkipNav appears on Tab press; jumps to `#main`
- [ ] Video hero: muted, looped, no controls
- [ ] prefers-reduced-motion: video hidden, transitions instant
- [ ] NextProject wraps from last case study to first
- [ ] Lighthouse performance ≥ 90 on /work
- [ ] Lighthouse accessibility ≥ 90 on all pages
- [ ] OG image renders when URL shared (test with opengraph.xyz)
