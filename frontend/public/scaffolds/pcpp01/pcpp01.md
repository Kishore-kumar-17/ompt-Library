---
prompt_id: pcpp01
sub_category: Portfolio
sub_type: Cinematic Editorial Photographer
title: MuseumDark — High-Impact Visual Storytelling
reference_patterns: full_bleed_immersion, minimal_chrome_ui, gallery_grid_storytelling
inspiration: joeyl.com
quality_score:
status: draft
notes: Focused on a "Digital Museum" aesthetic where the imagery is the sole focus.
---

## Base Prompt

### Section 1 — Role

You are a senior product designer specializing in high-end photography portfolios and cinematic digital experiences. You understand that for world-class photographers, the website is not a tool—it is a gallery. You master the "Invisible UI," where navigation and controls exist only to serve the image. You reject "busy" or "trendy" layouts in favor of the "Museum" philosophy: deep blacks, expansive negative space, and full-bleed immersion. You design for "Emotional Resonance," ensuring that every transition and scroll depth enhances the cinematic quality of the work.

---

### Section 2 — Application Overview

This is a premium cinematic portfolio for a world-renowned photographer and director. The audience consists of high-end commercial clients, gallery curators, and photography enthusiasts. The goal is to create an immersive environment that showcases long-form photography series and motion work with zero distractions.

The application covers: Immersive Homepage Grid, Full-Bleed Project Pages, Director's Reel (Video), an integrated Fine-Art Shop, and an educational "Learn" section.

---

### Section 3 — Brand Voice & Mood

The mood is "Cinematic & Sophisticated" and "Quietly Authoritative." It feels like walking through a private wing of a contemporary art museum at night. It is dark, focused, and timeless.

Copy is minimal and evocative. Headers are bold but small, acting as "captions" rather than "sales pitches." It avoids corporate jargon in favor of storytelling: "Behind the lens," "We came from fire," "The human condition."

Vibe word: Immersive.

---

### Section 4 — Core Features & Functionality

1. **High-Density Homepage Grid** — A clean, responsive grid of project covers. Hovering on a cover reveals a subtle title and a "View Series" prompt.
2. **Full-Bleed Project View** — Images that span the entire width/height of the viewport. Supporting both vertical scrolls and horizontal carousels for specific series.
3. **Integrated Motion Reel** — Auto-playing, high-quality video loops for the "Director" section, transitioning into a full-screen theater mode on click.
4. **"Dudes with Cameras" Blog** — A sophisticated storytelling section with behind-the-scenes videos and "Gear" breakdowns.
5. **Fine-Art Shop Integration** — A seamless, minimalist storefront for purchasing signed prints and books without breaking the gallery aesthetic.

---

### Section 5 — Design Specifications

**Visual style:** Dark Gallery. Deep blacks, charcoal surfaces, and high-contrast typography. All elements are designed to make vibrant photographic highlights "pop."

**Color mode:** Strictly Dark Mode.

**Color palette:**
- Background: `#000000` (Pure Black)
- Surface/UI: `#121212` (Deep Charcoal)
- Border: `#1F1F1F` (Dark Slate)
- Text Primary: `#FFFFFF` (Pure White)
- Text Secondary: `#888888` (Muted Grey)
- Accent: `#FFFFFF` (White — used sparingly for CTAs)

**Typography:** Modern Geometric Sans-Serif (e.g., Inter, Montserrat, or Helvetica).
- Project Titles: `24px`, weight 700, All-Caps, tracking `0.1em`.
- Body/Captions: `14px`, weight 400, leading 1.6.
- UI Labels: `11px`, bold, tracking `0.05em`.

**Spacing:** 12px base unit. 
- Grid Gaps: `8px` to `24px` (Variable based on series).
- Hero Padding: `0px` (Full-bleed focus).
- Content Margins: `40px` for text-heavy sections (Bio/Gear).

**Border radius:** `0px` (Strictly sharp corners for a "fine art" frame feel).

**Responsive:** Desktop-first for the "Big Screen" cinematic experience. Mobile view uses a 1-column high-impact stack.

**Accessibility:** WCAG AA (White on Black). All images must have descriptive `alt` text for screen readers.

**Motion:** 
- Image Load: Subtle "Fade + Scale" `opacity 0 -> 1`, `scale 1.05 -> 1`.
- Navigation Reveal: Slide-down header on mouse-up scroll.
- Page Cuts: Hard cuts or quick `300ms` fades to mimic cinema editing.

---

### Section 6 — Structure

**Homepage Layout:**
1. **Nav (Hidden):** Minimalist "Burger" or text links top-right (Portfolio, Bio, Shop, Learn). Logo top-left (Clean Wordmark).
2. **Grid:** High-density project grid. Cards are `3:4` or `1:1` aspect ratios.
3. **Footer:** Simple "Contact & Social" links on pure black.

**Project Page Layout:**
- **Hero:** One massive, full-screen image.
- **Narrative:** Small centered block of text (max-width `600px`).
- **Series:** A mix of full-bleed single images and 2-column "diptych" grids.
- **End:** "Next Series" large link at the bottom.

**Shop Page:**
- Minimalist grid of prints. No "Sale" badges. Price shown on hover only.

---

### Section 7 — Technical Specifications

- **Framework:** Next.js 14 App Router, React 18, TypeScript strict mode.
- **Styling:** Tailwind CSS v3.
- **Animation:** Framer Motion for gallery transitions and lazy-loading reveals.
- **Media:** Next.js `<Image>` with `priority` for heros. Video hosting via Mux or Vimeo SDK.
- **State:** Zustand for managing "Gallery Mode" (Fullscreen states) and Shop Cart.
- **Database:** Supabase for Project CMS and Print Metadata.

---

### Section 8 — Implementation Steps

1. **The Canvas:** Setup `globals.css` with a pure black background and define the geometric typography pairing.
2. **Gallery Shell:** Build the responsive project grid with the "Hover Title" logic.
3. **Project Template:** Implement the full-bleed image component with support for both scroll and slider modes.
4. **Director's Reel:** Build the video player component with auto-play loops and theater-mode transition.
5. **Shop Layer:** Add the minimalist e-commerce storefront with a clean checkout overlay.

---

### Section 9 — User Experience

The user is an "Art Observer." 
The UI must be "Invisible." Remove every possible button, line, and border that isn't essential.
The "Aha! moment" is the first scroll into a project—the sheer scale of the imagery should feel immersive.

---

### Section 10 — Constraints

- **No soft shadows.** Shadows should be non-existent or hard-edged.
- **No rounded corners.** Sharp edges only.
- **No "Urgency" or "Marketing" pop-ups.** Zero distractions.
- **No standard "Grid" patterns.** Allow for varied image sizes in a series (Diptychs, Triptychs).
- **No pure white backgrounds.** Even in the "Bio" section, stick to Dark Mode.

---

## Platform Versions

### Category A — v0

Build a "Digital Museum" photography portfolio inspired by Joey L. 
Style: Pure Black background (#000000), White typography (#FFFFFF), 0px border-radius (sharp corners), and minimalist modern Sans-serif fonts.
Include:
1. High-Density Portfolio Grid with title-on-hover logic.
2. Full-Bleed Project Page with immersive, large-scale imagery and "diptych" (2-column) sections.
3. Director's Reel section with high-quality auto-playing video loops.
Use cinematic photography and a "Minimal Chrome" UI approach.

---

### Category B — Cursor

In `src/app/`, implement a "Cinematic Editorial Portfolio" (Joey L. style).
Stack: Next.js 14, Tailwind, Zustand, Framer Motion.
Visual Rules: 
- Primary Color: `#FFFFFF` (Text)
- Background: `#000000` (Canvas)
- Radius: `rounded-none` (0px)
- Font: Modern Geometric Sans (e.g., Inter).

Implement:
1. `app/page.tsx` - A project grid where images have a subtle "Fade + Scale" entry.
2. `app/portfolio/[slug]/page.tsx` - A full-bleed project layout with a mix of single and diptych image sections.
3. `components/media/VideoReel.tsx` - A theater-mode video component that expands from a small loop.
4. `components/layout/MinimalNav.tsx` - A hidden navigation that reveals on scroll-up or menu click.

Focus on "Invisible UI" and high-impact visual storytelling. No gradients. No rounded corners.

---

### Lovable

Build a "Digital Museum" cinematic photography portfolio on a pure black (#000000) canvas. The UI is invisible — images and words are all that exist. 0px border-radius everywhere.

Must include:
- Project grid: 3 columns desktop → 1 column mobile. Cards `aspect-ratio: 3/4`. Hover: title + "View Series" fades in over `rgba(0,0,0,0.5)` overlay.
- Full-bleed project page: hero image `100vw`, centered narrative block `max-width: 600px`, alternating single and diptych 2-column image sections, "Next Series" link at bottom.
- Director's Reel: `<video autoPlay muted loop playsInline poster>`. Click → `position: fixed; inset: 0` theater mode. `aria-label="Director's reel"`.
- Nav: hidden by default, reveals on scroll-up. Logo top-left, text links top-right. No fill — `1px solid #1F1F1F` border-bottom on reveal. `aria-label="Main navigation"`.
- Shop: print grid, price `opacity: 0` → `opacity: 1` on hover only.

No gradients. No rounded corners. No soft shadows. `prefers-reduced-motion`: all states shown immediately, no transitions.

---

### ChatGPT Canvas

Let's build a cinematic photography portfolio — "Digital Museum" — for a world-class editorial photographer inspired by Joey L.

**Design system:**
- Background: `#000000` — pure black on every surface; Elevated: `#121212`; Border: `1px solid #1F1F1F`
- Text primary: `#FFFFFF`; Text muted: `#888888`
- Border-radius: `0px` everywhere — no exceptions
- Font: Inter or Montserrat; project titles `24px` weight 700 all-caps `letter-spacing: 0.1em`; body `14px` weight 400 leading 1.6; UI labels `11px` bold `letter-spacing: 0.05em`

**Build iteratively:**
1. **Homepage** — dense `3:4` project grid, title-on-hover fade overlay, `opacity 0→1` + `scale 1.05→1` entrance animation
2. **Project page** `/portfolio/[slug]` — full-bleed hero → `max-width: 600px` centered narrative → alternating full-width and diptych image blocks → "Next Series" link
3. **Director's Reel** `/reel` — `<video autoPlay muted loop playsInline>` full viewport width, click → theater-mode overlay
4. **Shop** `/shop` — print grid, price hidden until hover

Motion: all transitions `300ms ease-out`. `prefers-reduced-motion`: disable all, render final states instantly.

---

### Bolt

Scaffold a Next.js 14 photography portfolio — cinematic, strictly dark, museum-quality.

Stack: Next.js 14 App Router + TypeScript + Tailwind CSS + Framer Motion

```css
:root { --bg: #000000; --surface: #121212; --border: #1F1F1F; --ink: #FFFFFF; --muted: #888888; }
*, *::before, *::after { border-radius: 0 !important; }
body { background: var(--bg); color: var(--ink); }
```

Components:
- `MinimalNav` — `position: fixed; top: 0`. `transform: translateY(-100%)` default, `translateY(0)` on scroll-up. `1px solid var(--border)` bottom on reveal only.
- `ProjectGrid` — CSS `repeat(3, 1fr)` → `1fr` mobile. Cells: `aspect-ratio: 3/4`. Hover: title overlay `opacity 0→1`.
- `VideoReel` — `<video autoPlay muted loop playsInline poster={posterSrc}>`. Click → `position: fixed; inset: 0; z-index: 50` theater overlay.
- `ShopGrid` — print cards, price `opacity: 0 group-hover:opacity-100`.

Tailwind config: `borderRadius: { DEFAULT: '0px' }`. No `rounded-*` classes anywhere.

---

### Claude Artifacts

Build `pcpp01` — MuseumDark, a cinematic editorial photography portfolio. Inspired by joeyl.com. Next.js 14 App Router + TypeScript strict + CSS Modules. No Tailwind.

**File structure:**
```
src/
  app/
    layout.tsx          — root layout: InvisibleNav always mounted, pure black body
    page.tsx            — Homepage: ProjectGrid (high-density covers)
    projects/
      [slug]/page.tsx   — Project page: full-bleed hero + diptych series + NextSeries
    bio/page.tsx        — Bio page: text-only, dark, no photography
    shop/page.tsx       — Print shop: minimalist grid, price on hover only
    reel/page.tsx       — Director's reel: autoplay video + theater mode
    globals.css         — 5 CSS tokens ONLY
  types/index.ts
  lib/
    projects.ts         — 8 mock Project objects (all 4 categories)
    prints.ts           — 4 mock Print objects
  components/
    layout/
      InvisibleNav.tsx  — server, text links top-right, hidden until hover, zero bg
    home/
      ProjectGrid.tsx   — 'use client', 3:4 + 1:1 mixed aspect-ratio grid, hover title reveal
      ProjectCover.tsx  — server, next/image, cover + category + year on hover
    projects/
      ProjectHero.tsx   — full-bleed single image, 100vw × 100vh, no caption overlay
      SeriesBlock.tsx   — handles full / diptych-left / diptych-right layouts
      NextSeries.tsx    — large link to next project, bottom of every project page
    shop/
      PrintGrid.tsx     — server, minimal grid, price visible only on hover
      PrintCard.tsx     — server, no "Add to Cart" button on grid — click → overlay
    reel/
      VideoReel.tsx     — 'use client', autoPlay muted loop playsInline, theater mode on click
```

**globals.css (define first — zero hex in .module.css files):**
```css
:root {
  --bg:      #000000;  /* body background — never override */
  --surface: #121212;  /* cards, nav bg on hover */
  --border:  #1F1F1F;  /* subtle separators */
  --ink:     #FFFFFF;  /* all text */
  --muted:   #888888;  /* captions, metadata */
}

*, *::before, *::after { border-radius: 0; }

body {
  background: var(--bg);
  color: var(--ink);
  font-family: 'Inter', Helvetica, sans-serif;
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

**types/index.ts:**
```typescript
export type ProjectCategory = 'editorial' | 'portrait' | 'motion' | 'commercial'
export type ImageLayout = 'full' | 'diptych-left' | 'diptych-right'

export interface ProjectImage { src: string; alt: string; layout: ImageLayout }

export interface Project {
  id: string; slug: string; title: string
  category: ProjectCategory; year: number
  coverSrc: string; coverAlt: string
  description: string; images: ProjectImage[]
  videoUrl?: string; posterSrc?: string
}

export interface Print {
  id: string; title: string; edition: string
  size: string; price: number; coverSrc: string; coverAlt: string
}
```

**Critical rules:**
1. `background: #000000` on body — set via CSS var `--bg` — never override with surface or grey
2. `border-radius: 0` everywhere — global reset in globals.css — no exceptions for any element
3. `generateStaticParams()` on `projects/[slug]/page.tsx` — `notFound()` for unknown slugs (not `return null`)
4. `<video>` always: `autoPlay muted loop playsInline poster={posterSrc}` — all 5 attributes required
5. `prefers-reduced-motion`: `useReducedMotion()` guard on all Framer Motion transitions — if `true`, `duration: 0`
6. Print shop: price hidden on grid, visible only on hover/focus — no "Sale" or "New" badges anywhere
7. `InvisibleNav`: `pointer-events: none` on container, `pointer-events: auto` on individual links — never blocks image view

**Mistakes to avoid:**
- Do not use any grey or dark-grey backgrounds outside `--surface: #121212` — all section backgrounds are `--bg: #000000`
- Do not add rounded corners anywhere — not `2px`, not `4px` — zero only
- Do not show price in the PrintGrid by default — hover/focus reveal only
- Do not use Tailwind — CSS Modules only for all component styles
- Do not add any marketing copy or urgency text — captions are descriptive, never promotional
- Do not render "Next/Prev" arrows on project image series — scroll-driven navigation only
- Do not place text overlays on full-bleed hero images — text appears below or in adjacent block

---

### Grok

Implement MuseumDark — cinematic editorial photography portfolio.

1. `src/app/globals.css` — `--bg: #000000; --surface: #121212; --border: #1F1F1F; --ink: #FFFFFF; --muted: #888888` — `body { background: var(--bg); color: var(--ink); }` — `*, *::before, *::after { border-radius: 0; }`
2. `src/types/index.ts` — `ProjectCategory` union — `ImageLayout` union — `Project` interface (id, slug, title, category, year, coverSrc, coverAlt, description, images array, optional videoUrl) — `Print` interface (id, title, edition, size, price, coverSrc, coverAlt)
3. `src/lib/projects.ts` — 8 mock `Project` objects across all 4 categories
4. `src/components/layout/MinimalNav.tsx` — `position: fixed; transform: translateY(-100%)` default — scroll-up reveals — `aria-label="Main navigation"`
5. `src/app/page.tsx` — CSS grid `repeat(3, 1fr)` → `1fr` mobile — `aspect-ratio: 3/4` — hover overlay — Framer Motion `opacity 0→1` with `useReducedMotion()` guard
6. `src/app/portfolio/[slug]/page.tsx` — `generateStaticParams()` — `notFound()` — full-bleed hero → `max-width: 600px` prose → alternating full/diptych image blocks
7. `src/components/media/VideoReel.tsx` — `<video autoPlay muted loop playsInline poster={posterSrc}>` — click → `position: fixed; inset: 0` theater — `aria-label="Director's reel"`
8. `src/app/shop/page.tsx` — print grid — price `opacity: 0 → 1` on hover — `aria-label` per card
9. QA: `grep -r "rounded\|border-radius" src/components --include="*.tsx"` → empty — `npx tsc --noEmit` → 0 errors — `npm run build` passes

---

### Gemini

Design and implement a cinematic photography portfolio — "Digital Museum" — for a world-class editorial photographer.

**Design layer:** Strictly dark. `body { background: #000000 }`. Surfaces `#121212`. `1px` borders `#1F1F1F`. Typography: Inter/Montserrat — project titles `24px` weight 700 all-caps `letter-spacing: 0.1em` white; body `14px` weight 400 `#888888`; UI labels `11px` bold. `border-radius: 0` everywhere. No gradients, no shadows.

**Data layer:** `Project` interface — slug, title, category, year, coverSrc, coverAlt, description, images array (each with layout: full|diptych-left|diptych-right), optional videoUrl. Static in `src/lib/projects.ts`. `generateStaticParams()` for `[slug]`.

**Component layer:** `MinimalNav` (fixed, hidden, reveals on scroll-up). `ProjectGrid` (CSS `repeat(3, 1fr)`, `3:4` cells, hover fade overlay). `ProjectPage` (full-bleed hero → `max-width: 600px` narrative → alternating full/diptych blocks). `VideoReel` (autoPlay muted loop, click → theater overlay). `ShopGrid` (prints with price on hover only).

**Motion layer:** `opacity 0→1, scale 1.05→1, 300ms ease-out` on image load. `prefers-reduced-motion`: `transition-duration: 0.01ms !important` globally; `useReducedMotion()` guard skips Framer Motion variants entirely.
