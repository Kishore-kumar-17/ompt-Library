# 06 — Tasks
## Creator-Photographer with Sidebar Navigation · pcpp_platform_02

Tasks are ordered by dependency. Complete each task fully before starting the next.

---

## Phase 0 — Foundation

---

- [ ] **TASK-001** | Est: 1h
  **Initialise project**
  Next.js 14 App Router, TypeScript strict, Tailwind CSS v3, static export.

  ```bash
  npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"
  npm install framer-motion lucide-react
  ```

  Acceptance: `npm run dev` starts. `tsc --noEmit` exits 0. `npm run build` produces `/out` directory.
  Files: `package.json`, `tsconfig.json`, `next.config.ts`

---

- [ ] **TASK-002** | Est: 30m
  **Design tokens — CSS variables**
  Light mode utility aesthetic. Pure white + zero-color UI so experimental imagery pops.

  ```css
  --color-bg:       #FFFFFF;
  --color-surface:  #F9F9F9;
  --color-border:   #EEEEEE;
  --color-ink:      #000000;
  --color-muted:    #666666;

  body { background: var(--color-bg); color: var(--color-ink); }

  :focus-visible {
    outline: 2px solid var(--color-ink);
    outline-offset: 2px;
  }

  .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
  }
  ```

  Acceptance: Body bg is `#FFFFFF`. `grep -r "bg-black\|background.*#000" src/components --include="*.tsx"` → empty (light mode only).
  Files: `src/app/globals.css`

---

- [ ] **TASK-003** | Est: 45m
  **TypeScript types**
  All domain types exported. `tsc --noEmit` exits 0.

  ```typescript
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

  Files: `src/types/index.ts`

---

- [ ] **TASK-004** | Est: 30m
  **Static data files**
  Mock data for all sections.

  Acceptance: `techniques.ts` exports 5 mock photo arrays (one per `Technique`). `lenses.ts` exports 8 `Lens` objects. `assets.ts` exports 6 `Asset` objects across all 3 `AssetType` values. `tsc --noEmit` clean.
  Files: `src/lib/techniques.ts`, `src/lib/lenses.ts`, `src/lib/assets.ts`

---

## Phase 1 — Sidebar Layout Shell

---

- [ ] **TASK-005** | Est: 1.5h
  **FixedSidebar**
  240px persistent vertical navigation. Collapses to hamburger on mobile.

  Acceptance: `position: fixed; top: 0; left: 0; width: 240px; height: 100vh`. `background: var(--color-bg)`. `1px solid var(--color-border)` right edge. Logo top: Inter 700 `14px` uppercase tracking `0.15em`. Nav sections: Photography, Shop, Blog — Inter 600 `12px` uppercase tracking `0.15em`. `TechniqueDropdown.tsx` is `'use client'`: Framer Motion `height: 0→auto` `200ms` on hover/click. Active link: `font-weight: 700`. Mobile (`<768px`): sidebar hidden, hamburger button in `<header>` triggers slide-in drawer — `aria-expanded` attribute. `aria-label="Main navigation"` on `<nav>`. Server Component wrapper.
  Files: `src/components/layout/FixedSidebar.tsx`, `src/components/layout/TechniqueDropdown.tsx`

---

- [ ] **TASK-006** | Est: 30m
  **RootLayout with sidebar offset**
  Content area never obscured by the 240px sidebar.

  Acceptance: `<main>` has `margin-left: 240px` on desktop. `padding: 32px 48px`. On mobile: no margin-left. `max-width: 1200px` for content within the offset area. Server Component.
  Files: `src/app/layout.tsx`

---

## Phase 2 — Gallery and Technique Routing

---

- [ ] **TASK-007** | Est: 1.5h
  **Homepage — technique category index**
  Entry-point grid showing all techniques.

  Acceptance: `app/page.tsx`. CSS Grid `repeat(3,1fr)` desktop → `repeat(2,1fr)` tablet → `1fr` mobile. Gap `32px`. Each `TechniqueCard.tsx` (server): `aspect-ratio: 4/3`, cover image `alt={project.coverImageAlt}`. Category label Inter `12px` uppercase muted. Title Inter 700 `20px` ink. `0px` border-radius. Hover: image scales `1.0→1.03` `300ms ease`. `prefers-reduced-motion`: no scale. Server Component.
  Files: `src/app/page.tsx`, `src/components/gallery/TechniqueCard.tsx`

---

- [ ] **TASK-008** | Est: 1.5h
  **Technique category page + GallerySwitcher**
  Filtered grid with grid/full-size toggle.

  Acceptance: `app/photography/[technique]/page.tsx`. `generateStaticParams()` from technique categories. `notFound()` for unknown techniques. `GallerySwitcher.tsx` is `'use client'`: toggle between "Grid" and "Full" view. Grid: `repeat(3,1fr)` gap `8px`. Full: single-column `max-width: 100%`. Toggle buttons: `aria-pressed` on active. Transition: `opacity 0→1` `200ms`. `prefers-reduced-motion`: instant switch. ProjectCard: `alt={project.coverImageAlt}`, tags listed `12px` muted. Server Component wrapper.
  Files: `src/app/photography/[technique]/page.tsx`, `src/components/gallery/GallerySwitcher.tsx`

---

## Phase 3 — Lens Museum

---

- [ ] **TASK-009** | Est: 1.5h
  **LensMuseum**
  Technical archive of rare and vintage lenses.

  Acceptance: `app/lenses/page.tsx`. CSS Grid `repeat(4,1fr)` desktop → `repeat(2,1fr)` mobile. Each `LensCard.tsx` (server): lens image `alt={lens.imageAlt}`, name Inter 700 `16px`, focal length + aperture Inter Mono `14px` muted. On click: `LensDetailPanel.tsx` is `'use client'`: drawer slides in from right `x: 100%→0` `300ms`. Panel shows: `SpecTable` (`font-family: monospace`) with mount, era, notes — `<table>` with `<th scope="row">`. Sample images strip. Close button `aria-label="Close lens detail"`. Focus trapped inside panel. Escape closes. `prefers-reduced-motion`: panel appears instantly.
  Files: `src/app/lenses/page.tsx`, `src/components/lenses/LensCard.tsx`, `src/components/lenses/LensDetailPanel.tsx`

---

## Phase 4 — Digital Storefront

---

- [ ] **TASK-010** | Est: 1h
  **Digital Asset Shop**
  LUTs, presets, and ebooks — no cart, instant download links.

  Acceptance: `app/shop/page.tsx`. CSS Grid `repeat(3,1fr)` desktop → `1fr` mobile. Each `ProductCard.tsx` (server): image `alt={product.imageAlt}`, title Inter 700 `18px` all-caps, type label `11px` uppercase muted, price `14px` ink. "Download →" link (NOT a cart button — direct or inquiry link). `downloadNote` rendered in `11px` muted below link. NEVER add-to-cart, NEVER checkout flow. Server Component.
  Files: `src/app/shop/page.tsx`, `src/components/shop/ProductCard.tsx`

---

## Phase 5 — QA

---

- [ ] **TASK-011** | Est: 1h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== No dark backgrounds ===" && \
    grep -r "bg-black\|background.*#000\|background: black" src/components --include="*.tsx" \
    && echo "FAIL — light mode only" || echo "PASS"

  echo "=== No white backgrounds in dark overrides ===" && \
    grep -r "bg-white\|background.*#fff\|background: white" src/components --include="*.tsx" \
    && echo "REVIEW — verify intentional" || echo "PASS"

  echo "=== FixedSidebar has aria-label ===" && \
    grep -r "aria-label" src/components/layout/FixedSidebar.tsx && echo "PASS" || echo "FAIL"

  echo "=== TechniqueDropdown is use client ===" && \
    grep -r "'use client'" src/components/layout/TechniqueDropdown.tsx && echo "PASS" || echo "FAIL"

  echo "=== GallerySwitcher has aria-pressed ===" && \
    grep -r "aria-pressed" src/components/gallery/GallerySwitcher.tsx && echo "PASS" || echo "FAIL"

  echo "=== LensDetailPanel has focus trap ===" && \
    grep -r "focus\|trap\|aria-modal\|role.*dialog" src/components/lenses/LensDetailPanel.tsx \
    && echo "PASS" || echo "FAIL"

  echo "=== No Add to Cart in shop ===" && \
    grep -r "Add to Cart\|addToCart\|cart" src/app/shop --include="*.tsx" \
    && echo "FAIL — download links only, no cart" || echo "PASS"

  echo "=== No hex in component files ===" && \
    grep -r "#[0-9A-Fa-f]\{3,6\}" src/components --include="*.tsx" \
    && echo "FAIL — use CSS variables" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
