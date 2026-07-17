# 06 — Tasks
## Engineering-First Showcase & Technical Deep Dive · lp_platform_14

Tasks are ordered by dependency. Complete each task fully before starting the next.

---

## Phase 0 — Foundation

---

- [ ] **TASK-001** | Est: 1h
  **Initialise project**
  Next.js 14 App Router, TypeScript strict, Tailwind CSS v3.

  ```bash
  npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"
  npm install framer-motion lucide-react
  ```

  Acceptance: `npm run dev` starts. `tsc --noEmit` exits 0.
  Files: `package.json`, `tsconfig.json`, `next.config.ts`

---

- [ ] **TASK-002** | Est: 30m
  **Design tokens — CSS variables**
  Laboratory white foundation. Nickel and copper accents.

  ```css
  --color-bg:       #FFFFFF;
  --color-surface:  #F9FAFB;
  --color-border:   #E5E7EB;
  --color-ink:      #111827;
  --color-muted:    #6B7280;
  --color-accent:   #2563EB;
  --color-nickel:   #8E8E93;
  --color-copper:   #B87333;

  body { background: var(--color-bg); color: var(--color-ink); }

  :focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
  }
  ```

  Acceptance: All variables in DevTools. `grep -r "bg-black\|background.*#000" src/components --include="*.tsx"` → empty (light mode only, dark highlights use `data-theme`).
  Files: `src/app/globals.css`

---

- [ ] **TASK-003** | Est: 45m
  **TypeScript types**
  All domain types. `tsc --noEmit` exits 0.

  ```typescript
  export interface MachineLayer {
    id: string; name: string
    description: string; imageAlt: string
    order: number
  }

  export interface PerformanceMetric {
    id: string; value: string; unit: string
    label: string; context: string
  }

  export interface AccessoryItem {
    id: string; name: string
    imageAlt: string; isInBox: boolean
    description: string
  }

  export interface TechSpec {
    category: string; label: string; value: string
  }

  export interface ProductVariant {
    id: string; name: string; price: number
    currency: string; imageAlt: string
    isAvailable: boolean
  }
  ```

  Files: `src/types/index.ts`

---

- [ ] **TASK-004** | Est: 45m
  **Static data files**
  Mock data for all sections.

  Acceptance: `layers.ts` exports 5 `MachineLayer` objects (ordered by `order`). `metrics.ts` exports 4 `PerformanceMetric` objects with specific values (e.g., "100,000 rpm"). `accessories.ts` exports 6 `AccessoryItem` objects, at least 4 `isInBox: true`. `specs.ts` exports 16+ `TechSpec` objects across 4 categories. `variants.ts` exports 3 `ProductVariant` objects. `tsc --noEmit` clean.
  Files: `src/lib/layers.ts`, `src/lib/metrics.ts`, `src/lib/accessories.ts`, `src/lib/specs.ts`, `src/lib/variants.ts`

---

## Phase 1 — Navigation

---

- [ ] **TASK-005** | Est: 1h
  **SiteNav**
  Sticky laboratory nav with commerce CTA.

  Acceptance: White bg, `1px solid var(--color-border)` bottom, `box-shadow` on scroll. Logo left Inter 700. Links: Technology, Accessories, Specifications, Shop. "Shop Direct →" CTA: accent bg, white text, `4px` radius, `44px` height. Mobile hamburger `aria-expanded`. Server Component.
  Files: `src/components/layout/SiteNav.tsx`

---

## Phase 2 — Engineering Hero

---

- [ ] **TASK-006** | Est: 1.5h
  **MetricHeroSection**
  Performance metric as primary visual anchor.

  Acceptance: White bg section. Centered layout `max-w-[1280px]`. Primary metric Inter 800 `clamp(64px,8vw,120px)` ink — THIS IS THE HEADLINE (e.g., "100,000rpm"). Metric unit Inter 400 `24px` muted inline. "Engineered to outperform." Inter 400 `20px` muted below. Product hero image centered below metric. Server Component.
  Files: `src/components/home/MetricHeroSection.tsx`

---

- [ ] **TASK-007** | Est: 2h
  **ExplodedHero**
  Scroll-triggered product layer deconstruction.

  Acceptance: `'use client'`. `IntersectionObserver` triggers layer sequence on viewport entry. Layers animate from scattered positions → assembled product (Framer Motion `layoutId` or explicit coordinate animation). `useReducedMotion()` guard — if reduced motion: show assembled product only, skip scatter/reassemble. Each `MachineLayer` has descriptive `alt={layer.imageAlt}`. Section has `aria-label="Product layer animation"`.
  Files: `src/components/home/ExplodedHero.tsx`

---

- [ ] **TASK-008** | Est: 1h
  **MetricCounters**
  Technical numbers animated on scroll entry.

  Acceptance: `'use client'`. `IntersectionObserver` triggers count-up animation for each `PerformanceMetric`. Count-up: 0 → `metric.value` (strip units for animation, re-add on complete). Monospace `font-mono` for number, Inter `14px` muted for context. `aria-live="polite"` on each counter span. `useReducedMotion()` guard — render final value immediately.
  Files: `src/components/home/MetricCounters.tsx`

---

## Phase 3 — Accessories and Specs

---

- [ ] **TASK-009** | Est: 1.5h
  **InTheBoxGrid**
  Top-down accessory system grid.

  Acceptance: CSS Grid `repeat(4,1fr)` desktop → `repeat(2,1fr)` mobile. Each `AccessoryCard.tsx` (server): top-down product image `alt={accessory.imageAlt}`, accessory name Inter 600 `15px`, "Included" chip if `isInBox`, description Inter `13px` muted. `1px solid var(--color-border)` card border. `4px` radius. Server Component.
  Files: `src/components/product/InTheBoxGrid.tsx`, `src/components/product/AccessoryCard.tsx`

---

- [ ] **TASK-010** | Est: 1.5h
  **TechnicalSpecTable + ProductVariantSelector**
  Exhaustive specs and add-to-cart.

  Acceptance: `TechnicalSpecTable.tsx` (server): specs grouped by `category`. Each group: `<table>` with `<caption>` = category name. `<th scope="row">` on label cells. `1px solid var(--color-border)` row separators. `ProductVariantSelector.tsx` is `'use client'`: 3 variant cards — `aria-pressed` on selected. "Add to Cart →" accent bg `4px` radius `44px` height. Out-of-stock variants: `aria-disabled="true"` + `opacity: 0.4` — NEVER `display: none`.
  Files: `src/components/product/TechnicalSpecTable.tsx`, `src/components/product/ProductVariantSelector.tsx`

---

## Phase 4 — QA

---

- [ ] **TASK-011** | Est: 1h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== ExplodedHero is use client ===" && \
    grep -r "'use client'" src/components/home/ExplodedHero.tsx && echo "PASS" || echo "FAIL"

  echo "=== ExplodedHero handles reduced motion ===" && \
    grep -r "useReducedMotion\|reducedMotion" src/components/home/ExplodedHero.tsx \
    && echo "PASS" || echo "FAIL"

  echo "=== MetricCounters has aria-live ===" && \
    grep -r "aria-live" src/components/home/MetricCounters.tsx && echo "PASS" || echo "FAIL"

  echo "=== ProductVariantSelector has aria-pressed ===" && \
    grep -r "aria-pressed" src/components/product/ProductVariantSelector.tsx && echo "PASS" || echo "FAIL"

  echo "=== OOS variants not display none ===" && \
    grep -r "display.*none\|hidden" src/components/product/ProductVariantSelector.tsx \
    && echo "FAIL — use opacity not display:none for OOS" || echo "PASS"

  echo "=== TechSpec table has scope ===" && \
    grep -r "scope=" src/components/product/TechnicalSpecTable.tsx && echo "PASS" || echo "FAIL"

  echo "=== No hex in component files ===" && \
    grep -r "#[0-9A-Fa-f]\{3,6\}" src/components --include="*.tsx" \
    && echo "FAIL — use CSS variables" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
