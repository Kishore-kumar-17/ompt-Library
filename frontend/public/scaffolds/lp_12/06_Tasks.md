# 06 — Tasks
## Product Showcase & Cinematic Scrollytelling · lp_platform_12

Tasks are ordered by dependency. Complete each task fully before starting the next.

---

## Phase 0 — Foundation

---

- [ ] **TASK-001** | Est: 1h
  **Initialise project**
  Next.js 14 App Router, TypeScript strict, Tailwind CSS v3.

  ```bash
  npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"
  npm install framer-motion lucide-react gsap @gsap/react
  ```

  Acceptance: `npm run dev` starts. `tsc --noEmit` exits 0.
  Files: `package.json`, `tsconfig.json`, `next.config.ts`

---

- [ ] **TASK-002** | Est: 30m
  **Design tokens — CSS variables**
  High-contrast light/dark switching by chapter.

  ```css
  --color-bg:       #FFFFFF;
  --color-bg-dark:  #000000;
  --color-surface:  #F9FAFB;
  --color-border:   #D2D2D7;
  --color-ink:      #1D1D1F;
  --color-muted:    #86868B;
  --color-accent:   #0071E3;

  body { background: var(--color-bg); color: var(--color-ink); }

  :focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      transition-duration: 0.01ms !important;
      animation-duration: 0.01ms !important;
    }
  }
  ```

  Acceptance: All variables in DevTools. Chapter bg switches via `data-theme` attribute — no hardcoded hex in components.
  Files: `src/app/globals.css`

---

- [ ] **TASK-003** | Est: 45m
  **TypeScript types**
  All domain types. `tsc --noEmit` exits 0.

  ```typescript
  export type ChapterTheme = 'light' | 'dark'

  export interface ProductChapter {
    id: string; slug: string; title: string
    theme: ChapterTheme; frameCount?: number
    hotspots?: HotspotCallout[]
  }

  export interface HotspotCallout {
    id: string; x: number; y: number
    label: string; detail: string
    ariaLabel: string
  }

  export interface TechSpec {
    category: string; label: string; value: string
  }

  export interface ProductVariant {
    id: string; name: string; price: number
    currency: string; imageAlt: string
  }
  ```

  Files: `src/types/index.ts`

---

- [ ] **TASK-004** | Est: 30m
  **Static data files**
  Mock chapters and specs.

  Acceptance: `chapters.ts` exports 4 `ProductChapter` objects (intro, audio, battery, design), at least 2 with `hotspots`. `specs.ts` exports 12+ `TechSpec` objects across 4 categories. `variants.ts` exports 3 `ProductVariant` objects. `tsc --noEmit` clean.
  Files: `src/lib/chapters.ts`, `src/lib/specs.ts`, `src/lib/variants.ts`

---

## Phase 1 — Navigation and Sticky Sub-Nav

---

- [ ] **TASK-005** | Est: 1h
  **SiteNav + StickySubNav**
  Minimal top nav + chapter-tracking sticky secondary bar.

  Acceptance: `SiteNav`: transparent bg. Logo left Inter 600 `14px`. "Buy" CTA accent bg `4px` radius. `StickySubNav.tsx` is `'use client'`: appears after hero chapter. Shows product name + current chapter label (tracks via `IntersectionObserver` `rootMargin`). Scroll-chapter jump links. "Buy Now →" accent CTA right. `aria-label="Product navigation"` on `<nav>`.
  Files: `src/components/layout/SiteNav.tsx`, `src/components/layout/StickySubNav.tsx`

---

## Phase 2 — Cinematic Hero

---

- [ ] **TASK-006** | Est: 3h
  **ImageSequenceScrubber**
  Canvas-based scroll-controlled image sequence.

  Acceptance: `'use client'`. `<canvas>` element renders product images (mock 10–30 frames as Next.js `<Image>` preloaded array). GSAP `ScrollTrigger` scrubs frame index as user scrolls pinned section. Pin section height = `frameCount * 80px`. `useReducedMotion()` guard: if reduced motion, skip Canvas and show static final frame `<img>`. `aria-label="Product animation — scroll to explore"` on canvas wrapper. NO interaction events on canvas itself — scroll only.
  Files: `src/components/hero/ImageSequenceScrubber.tsx`

---

- [ ] **TASK-007** | Est: 1.5h
  **PinnedNarrativeChapter**
  Locked viewport with fading text overlays.

  Acceptance: `'use client'`. GSAP `ScrollTrigger` pin section. Chapter headline: Inter 700 `clamp(28px,4vw,56px)`. Text fades `opacity 0→1, y: 20→0` as pinned chapter becomes active. Multiple text overlays stagger in sequence. `useReducedMotion()` guard: render all text immediately, no stagger. `data-theme={chapter.theme}` on section root — switches bg and text color.
  Files: `src/components/hero/PinnedNarrativeChapter.tsx`

---

- [ ] **TASK-008** | Est: 1h
  **HotspotCallout**
  Interactive product deconstruction points.

  Acceptance: `'use client'`. `<button>` at `{x%, y%}` absolute position on product image. `aria-label={hotspot.ariaLabel}`. On click: tooltip/panel renders `label` Inter 700 + `detail` Inter `14px`. Panel: `var(--color-surface)` bg, `1px solid var(--color-border)`, `4px` radius. Closes on outside click or Escape. `role="tooltip"` with `aria-describedby` linkage.
  Files: `src/components/hero/HotspotCallout.tsx`

---

## Phase 3 — Specs and Buy Flow

---

- [ ] **TASK-009** | Est: 1.5h
  **TechnicalSpecGrid + ProductVariantSelector**
  Dense spec table and variant picker.

  Acceptance: `TechnicalSpecGrid.tsx` (server): specs grouped by `category`, each `<table>` with `<caption>` = category name, `scope="row"` on label cells. `1px solid var(--color-border)` row dividers. `ProductVariantSelector.tsx` is `'use client'`: 3 variant cards — selected state with `var(--color-accent)` border. "Add to Cart" accent bg, `4px` radius, `44px` height. `aria-pressed` on selected variant.
  Files: `src/components/product/TechnicalSpecGrid.tsx`, `src/components/product/ProductVariantSelector.tsx`

---

## Phase 4 — QA

---

- [ ] **TASK-010** | Est: 1h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== ImageSequenceScrubber is use client ===" && \
    grep -r "'use client'" src/components/hero/ImageSequenceScrubber.tsx && echo "PASS" || echo "FAIL"

  echo "=== ImageSequenceScrubber handles reduced motion ===" && \
    grep -r "useReducedMotion\|prefers-reduced-motion\|reducedMotion" src/components/hero/ImageSequenceScrubber.tsx \
    && echo "PASS" || echo "FAIL"

  echo "=== StickySubNav is use client ===" && \
    grep -r "'use client'" src/components/layout/StickySubNav.tsx && echo "PASS" || echo "FAIL"

  echo "=== HotspotCallout has aria-label ===" && \
    grep -r "aria-label" src/components/hero/HotspotCallout.tsx && echo "PASS" || echo "FAIL"

  echo "=== HotspotCallout is a button ===" && \
    grep -r "<button" src/components/hero/HotspotCallout.tsx && echo "PASS" || echo "FAIL"

  echo "=== ProductVariantSelector has aria-pressed ===" && \
    grep -r "aria-pressed" src/components/product/ProductVariantSelector.tsx && echo "PASS" || echo "FAIL"

  echo "=== TechSpec table has scope attributes ===" && \
    grep -r "scope=" src/components/product/TechnicalSpecGrid.tsx && echo "PASS" || echo "FAIL"

  echo "=== No hex in component files ===" && \
    grep -r "#[0-9A-Fa-f]\{3,6\}" src/components --include="*.tsx" \
    && echo "FAIL — use CSS variables" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥85 (canvas-heavy page), Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
