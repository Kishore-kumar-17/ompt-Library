---
prompt_id: pcpp02
sub_category: Portfolio
sub_type: Creator-Photographer with Sidebar Navigation
title: CreatorGrid — Functional Utility & Experimental Art
reference_patterns: sidebar_utility_nav, categorical_technique_routing, digital_good_integration
inspiration: mathieustern.com
quality_score:
status: draft
notes: Focused on a "Creator-Entrepreneur" aesthetic with organized categorization and integrated commerce.
---

## Base Prompt

### Section 1 — Role

You are a senior product designer specializing in creator-centric portfolios and digital asset marketplaces. You understand that for modern "Creator-Photographers," the website is both an archive and a storefront. You master the "Structured UI," where deep categorization and ease of discovery are paramount. You reject "vague" or "artsy" layouts in favor of the "Creator" philosophy: fixed sidebars, clearly labeled nested menus, and highly functional utility blocks. You design for "Educational Authority," ensuring that tutorials, gear reviews, and digital presets are as scannable as the photography itself.

---

### Section 2 — Application Overview

This is a comprehensive creator platform for an experimental photographer and educator. The audience consists of fellow creatives looking for inspiration, students buying educational assets, and brands looking for technical expertise. The goal is to provide a highly organized hub that balances artistic output with educational commerce.

The application covers: Fixed Sidebar Navigation, Technique-based Category Pages, Lens Museum (Digital Archive), Integrated Shop (LUTs/Presets), and a Tutorial-First Blog.

---

### Section 3 — Brand Voice & Mood

The mood is "Organized & Experimental" and "Technically Savvy." It feels like a well-labeled laboratory for visual arts. It is bright, airy, and hyper-structured.

Copy is informative and encouraging. Headers are clear and technical: "The Weird Lens Museum," "Infrared Photography," "Mastering Trichromy." It avoids fluff in favor of specific technique names and instructional value.

Vibe word: Organized.

---

### Section 4 — Core Features & Functionality

1. **Fixed Sidebar/Top-bar Navigation** — A persistent, text-based menu that provides instant access to Photography, Shop, and Blog pillars.
2. **Nested Technique Categories** — Navigation depth allowing users to filter by specific photographic methods (e.g., Infrared, 3D Portraits, Double Exposure).
3. **Lens Museum Archive** — A custom post-type or database view that acts as a technical library of rare and vintage lenses with specs and sample shots.
4. **Digital Asset Storefront** — A clean e-commerce layer for instant delivery of LUT packs, Ebooks, and Presets.
5. **Interactive Thumbnail Toggles** — Gallery controls that allow users to switch between large-scale immersion and quick thumbnail grids.

---

### Section 5 — Design Specifications

**Visual style:** Clean Utility. High-contrast (Black text on White), generous whitespace, and a grid-based content structure. The interface is "invisible" to let the highly saturated experimental imagery pop.

**Color mode:** Primarily Light Mode (High Contrast).

**Color palette:**
- Background: `#FFFFFF` (Pure White)
- Surface/UI: `#F9F9F9` (Off-White for UI blocks)
- Border: `#EEEEEE` (Light Grey - 1px hair-lines)
- Text Primary: `#000000` (Pure Black)
- Text Secondary: `#666666` (Mid Grey)
- Accent: `#000000` (Minimalist accents, no bright brand colors)

**Typography:** Modern Sans-Serif (e.g., Inter, Montserrat, or Gotham).
- Section Titles: `20px`, weight 700, All-Caps, dot-separated (e.g., `SHOP · BLOG`).
- Body/Descriptions: `16px`, weight 400, line-height 1.6.
- UI Labels: `12px`, uppercase, bold.

**Spacing:** 16px base unit. 
- Sidebar Width: `240px` to `280px`.
- Content Gaps: `32px` to `48px`.
- Section Padding: `64px` vertical.

**Border radius:** `2px` (Subtle, crisp rounding) or `0px`.

**Responsive:** Mobile-first navigation (Hamburger menu). On mobile, the sidebar collapses into a clean top-bar.

**Accessibility:** WCAG AAA (Black on White). Navigation must be fully keyboard accessible with visible focus indicators.

**Motion:** 
- Dropdown Hover: Quick `200ms` fade/slide.
- Gallery Next/Prev: Smooth `300ms` transitions.
- Thumbnail Reveal: Staggered entry for grid items.

---

### Section 6 — Structure

**Homepage Layout:**
1. **Sidebar (Fixed):** Logo top. Vertical links: Photography (with dropdown), Shop, Blog, About. Bottom: Social Icons.
2. **Main Content:** Modular blocks. Hero project banner -> Featured Categories Grid -> Latest from Lens Museum.
3. **Footer:** Simple copyright and cart indicator (Squarespace-style: `0 items / €0`).

**Category Page Layout:**
- **Header:** Technique Title (e.g., "Trichromy") + 1-sentence explanation.
- **Gallery:** Grid of project covers or a scroll-based slideshow with "Show Thumbnails" toggle.

**Shop Page:**
- Tiled grid of digital products. Clear badges for "LUT Pack" or "Ebook." Large price and "Buy Now" button.

---

### Section 7 — Technical Specifications

- **Framework:** Next.js 14 App Router, React 18, TypeScript strict mode.
- **Styling:** Tailwind CSS v3.
- **Navigation:** Framer Motion for nested sidebar interactions.
- **E-commerce:** Stripe or Lemonsqueezy for digital asset delivery and print sales.
- **CMS:** Contentlayer or Sanity.io for structured "Lens Museum" and "Technique" data.
- **State:** Zustand for managing category filters and cart state.

---

### Section 8 — Implementation Steps

1. **The Sidebar Shell:** Build the responsive fixed sidebar with nested menu logic using Framer Motion.
2. **Technique CMS:** Set up the data structure for projects to be tagged by multiple "Techniques" (Double Exposure, etc.).
3. **Lens Museum View:** Build the technical archive grid with custom metadata fields for lens specs.
4. **Gallery Engine:** Implement the toggle-able gallery (Immersion vs Grid) for project pages.
5. **Shop Integration:** Build the digital asset product page with a high-conversion checkout overlay.

---

### Section 9 — User Experience

The user is a "Learner and Enthusiast." 
The UI must be "Structured and Helpful." Every image should be linked to the "Technique" used to create it.
The "Aha! moment" is finding a rare lens in the Museum or seeing how a complex technique like Infrared is broken down into a tutorial.

---

### Section 10 — Constraints

- **No cluttered backgrounds.** Pure white or very light grey only.
- **No generic navigation labels.** Use technique-specific names.
- **No distractions in the gallery.** Navigation controls should fade out during scroll.
- **No manual digital fulfillment.** Assets must be delivered instantly post-purchase.
- **No heavy shadows.** Use 1px borders or very subtle `shadow-sm` for UI cards.

---

## Platform Versions

### Category A — v0

Build a "Structured Creator" portfolio inspired by Mathieu Stern. 
Style: High-contrast White background (#FFFFFF), Pure Black typography (#000000), 2px border-radius, and modern Sans-serif fonts.
Include:
1. Fixed Sidebar Navigation with nested dropdowns for "Photography" techniques.
2. "Lens Museum" Grid - a technical archive of gear with custom spec labels.
3. Technique-specific Gallery Pages (e.g., Infrared, Trichromy) with a "Show Thumbnails" toggle.
Use clean, organized layouts and a "Creator-Storefront" approach.

---

### Category B — Cursor

In `src/app/`, implement an "Experimental Photographer Hub" (Mathieu Stern style).
Stack: Next.js 14, Tailwind, Zustand, Contentlayer.
Visual Rules: 
- Primary Color: `#000000` (Text)
- Background: `#FFFFFF` (Canvas)
- Radius: `rounded-sm` (2px)
- Navigation: Persistent sidebar (Fixed left).

Implement:
1. `components/layout/Sidebar.tsx` - A responsive vertical menu with Framer Motion dropdowns.
2. `app/museum/page.tsx` - A structured grid view for the "Lens Museum" technical library.
3. `app/photography/[technique]/page.tsx` - A dynamic route that filters projects by technique tag.
4. `components/shop/AssetCard.tsx` - A clean card for digital goods (LUTs/Presets) with price and Buy action.

Focus on "Functional Utility" and scannable categorization. No blurs. No heavy shadows.

---

### Lovable

Build a creator-photographer platform with a fixed 240px left sidebar, white (#FFFFFF) canvas, black (#000000) text, 2px border-radius. Organized, lab-like aesthetic.

Must include:
- Fixed sidebar: logo top, nested technique links (Photography → Infrared / Trichromy / Double Exposure / 3D Portraits), Shop, Blog. All-caps dot-separated titles: `PHOTOGRAPHY · SHOP · BLOG`. Active link `background: #F0F0F0`.
- Technique gallery `/photography/[technique]`: filtered photo grid + large/thumbnail view toggle with `aria-pressed` on toggle buttons. `AnimatePresence` filter transition.
- Lens Museum `/museum`: grid cards with gear name `16px` 700, year + format + mount `12px` muted, sample `<img alt>`.
- Shop `/shop`: asset cards (LUT, Preset, Ebook) with type badge, price, `<a href rel="noopener noreferrer">` purchase link. No payment form inline.
- Blog `/blog`: article list with technique category badge and read time.

`prefers-reduced-motion`: sidebar dropdowns open instantly, no height animation.

---

### ChatGPT Canvas

Let's build a creator-photographer platform — "Structured Creator" aesthetic inspired by Mathieu Stern.

**Design system:**
- Background: `#FFFFFF`; Surface: `#F9F9F9`; Border: `1px solid #EEEEEE`
- Text: `#000000`; Muted: `#666666`
- Border-radius: `2px` cards, `4px` buttons
- Font: Inter/Montserrat; section titles `20px` weight 700 all-caps dot-separated; body `16px` weight 400; labels `12px` uppercase bold
- Sidebar: `240px` fixed left, `border-right: 1px solid #EEEEEE`

**Build iteratively:**
1. **Sidebar** — nested technique accordion nav, Shop + Blog links
2. **Technique gallery** `/photography/[technique]` — filtered grid + large/thumbnail toggle with `aria-pressed`
3. **Lens Museum** `/museum` — spec archive cards (name, year, format, mount, sample image)
4. **Shop** `/shop` — asset cards with price and external purchase link
5. **Blog** `/blog` — article list with technique badge and reading time

`prefers-reduced-motion`: all accordion and filter transitions instant.

---

### Bolt

Scaffold a creator-photographer platform with fixed sidebar.

Stack: Next.js 14 App Router + TypeScript + Tailwind CSS + Framer Motion

```css
:root { --bg: #FFFFFF; --surface: #F9F9F9; --border: #EEEEEE; --ink: #000000; --muted: #666666; }
body { background: var(--bg); color: var(--ink); }
```

Components:
- `Sidebar` — `position: fixed; left: 0; width: 240px; height: 100vh; border-right: 1px solid var(--border)`. Nested technique links with Framer Motion height expand. Mobile: hamburger drawer.
- `TechniqueGallery` — CSS grid, large/thumbnail toggle with `aria-pressed`. `AnimatePresence` `opacity 0→1 250ms`.
- `LensMuseum` — spec cards: name `16px` 700, year + format + mount `12px` muted, sample `<img>`.
- `AssetCard` — title, type badge, price `18px` 700, `<a href rel="noopener noreferrer">` buy link. No inline payment.

Main content: `margin-left: 240px`.

---

### Claude Artifacts

Build a self-contained creator-photographer platform. Next.js 14 App Router + TypeScript + CSS Modules.

```typescript
// src/types/index.ts
export type Technique = 'infrared' | 'trichromy' | 'double_exposure' | '3d_portrait' | 'film'
export type AssetType = 'lut' | 'preset' | 'ebook'

export interface Lens {
  id: string; name: string; year: number
  format: string; mount: string
  sampleSrc: string; sampleAlt: string; description: string
}

export interface Asset {
  id: string; title: string; type: AssetType
  price: number; currency: string; purchaseUrl: string
  coverSrc: string; coverAlt: string
}

export interface Photo {
  id: string; slug: string; title: string
  technique: Technique; src: string; alt: string
  description: string; year: number
}
```

Design rules:
- `border-radius: 2px` cards; `4px` buttons — via CSS custom property `--radius-card: 2px`
- Sidebar `TechniqueDropdown` is `'use client'` — `useReducedMotion()` guard on Framer Motion height animation
- Shop links: `<a href={asset.purchaseUrl} rel="noopener noreferrer">` — NEVER render payment form inline
- `generateStaticParams()` from Technique union values. `notFound()` for unknown techniques.

---

### Grok

Implement CreatorGrid — creator-photographer platform with fixed sidebar.

1. `src/app/globals.css` — `--bg: #FFFFFF; --surface: #F9F9F9; --border: #EEEEEE; --ink: #000000; --muted: #666666; --radius-card: 2px; --radius-btn: 4px` — `body { background: var(--bg); color: var(--ink); }`
2. `src/types/index.ts` — `Technique` union (5 values) — `AssetType` union — `Lens` interface (id, name, year, format, mount, sampleSrc, sampleAlt, description) — `Asset` interface (id, title, type, price, currency, purchaseUrl, coverSrc, coverAlt) — `Photo` interface (id, slug, title, technique, src, alt, year)
3. `src/components/layout/Sidebar.tsx` — `position: fixed; left: 0; width: 240px; height: 100vh` — nested technique links with Framer Motion accordion — `aria-label="Main navigation"` — mobile hamburger drawer with `aria-expanded`
4. `src/app/photography/[technique]/page.tsx` — `generateStaticParams()` from Technique union — filtered photo grid — large/thumbnail toggle with `aria-pressed`
5. `src/app/museum/page.tsx` — `Lens[]` grid cards — name `16px` 700, specs `12px` muted, sample `<img alt>`
6. `src/app/shop/page.tsx` — `Asset[]` cards — `<a href={asset.purchaseUrl} rel="noopener noreferrer" aria-label="Buy {asset.title}">` — no inline payment
7. QA: `npx tsc --noEmit` → 0 errors — `npm run build` passes

---

### Gemini

Design and implement a creator-photographer platform — "Organized Creator" aesthetic inspired by Mathieu Stern.

**Design layer:** White canvas `#FFFFFF`, off-white surface `#F9F9F9`, `1px solid #EEEEEE` borders. Typography: Inter/Montserrat — section titles `20px` weight 700 all-caps dot-separated; body `16px`; labels `12px` uppercase. `border-radius: 2px` cards, `4px` buttons. Monochromatic — no colour accents beyond black/white/grey.

**Data layer:** `Technique` union (infrared, trichromy, double_exposure, 3d_portrait, film). `Photo` (slug, title, technique, src, alt, year). `Lens` (name, year, format, mount, sampleSrc). `Asset` (title, type, price, purchaseUrl). Static in `src/lib/`. `generateStaticParams()` for `[technique]`.

**Component layer:** `Sidebar` (fixed 240px, nested technique accordion, Shop + Blog links). `TechniqueGallery` (filtered grid, large/thumbnail toggle with `aria-pressed`). `LensMuseum` (spec cards). `AssetCard` (price + external link, no payment form). Mobile: sidebar becomes hamburger drawer.

**Motion layer:** Sidebar accordion: `height: 0→auto 200ms ease`. Filter: `opacity 0→1 200ms`. `prefers-reduced-motion`: all transitions instant. `useReducedMotion()` guard on all Framer Motion components.
