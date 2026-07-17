# 06 — Tasks
## High-Energy Lifestyle Launch & FOMO Ecommerce · lp_platform_15

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
  Dark mode. Pitch black foundation with Electric Red accent.

  ```css
  --color-bg:       #000000;
  --color-surface:  #111827;
  --color-border:   #1F2937;
  --color-ink:      #FFFFFF;
  --color-muted:    #9CA3AF;
  --color-accent:   #FF0000;
  --color-accent-2: #FF6B6B;

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

  Acceptance: All variables in DevTools. `grep -r "bg-white\|background.*#fff\|background: white" src/components --include="*.tsx"` → empty.
  Files: `src/app/globals.css`

---

- [ ] **TASK-003** | Est: 45m
  **TypeScript types**
  All domain types. `tsc --noEmit` exits 0.

  ```typescript
  export type ProductCategory = 'earbuds' | 'headphones' | 'speakers' | 'smartwatches' | 'cables'

  export interface Product {
    id: string; slug: string; name: string
    category: ProductCategory; price: number
    originalPrice?: number; imageAlt: string
    isNewLaunch?: boolean; isFlashDeal?: boolean
    stockRemaining?: number
  }

  export interface Celebrity {
    id: string; name: string; imageAlt: string
    title: string; productIds: string[]
  }

  export interface FlashSale {
    id: string; endsAt: string
    dealProductIds: string[]
    discountPercent: number
  }

  export interface HeroSlide {
    id: string; headline: string; imageAlt: string
    productId: string; accentColor: string
  }
  ```

  Files: `src/types/index.ts`

---

- [ ] **TASK-004** | Est: 45m
  **Static data files**
  Mock data for all sections.

  Acceptance: `products.ts` exports 12 `Product` objects across 4+ categories, at least 3 `isNewLaunch: true`, at least 3 `isFlashDeal: true`. `celebrities.ts` exports 3 `Celebrity` objects. `flashSales.ts` exports 1 `FlashSale` object with future `endsAt` timestamp. `heroSlides.ts` exports 3 `HeroSlide` objects. `tsc --noEmit` clean.
  Files: `src/lib/products.ts`, `src/lib/celebrities.ts`, `src/lib/flashSales.ts`, `src/lib/heroSlides.ts`

---

## Phase 1 — Navigation and Hero

---

- [ ] **TASK-005** | Est: 1h
  **SiteNav**
  High-density category navigation.

  Acceptance: Black bg, `1px solid var(--color-border)` bottom. Logo left Montserrat 900. Category links: Earbuds, Headphones, Speakers, Smartwatches. "Tribe Rewards →" accent-color link right. Mobile: horizontal scroll category strip. `aria-label="Main navigation"`. Server Component.
  Files: `src/components/layout/SiteNav.tsx`

---

- [ ] **TASK-006** | Est: 1.5h
  **HeroSlider**
  Full-width launch banner slider.

  Acceptance: `'use client'`. 3 `HeroSlide` auto-advances every 5s. Framer Motion `AnimatePresence` — slide transition `x: 100→0`. `useReducedMotion()` guard — stop auto-advance, show static first slide. Slide content: celebrity/lifestyle image `alt={slide.imageAlt}`, Montserrat 900 all-caps headline, "Shop Now →" accent bg `4px` radius CTA. Dot navigation below: `aria-label="Go to slide N"`, `aria-current="true"` on active. Previous/Next buttons `aria-label="Previous/Next slide"`.
  Files: `src/components/home/HeroSlider.tsx`

---

## Phase 2 — Flash Sale and Celebrity Grid

---

- [ ] **TASK-007** | Est: 1.5h
  **FlashSaleCountdownEngine**
  Real-time countdown synchronized across page.

  Acceptance: `'use client'`. Reads `FlashSale.endsAt` ISO string. Computes hours/minutes/seconds remaining via `setInterval(1000)`. Clears interval on component unmount. Displays `HH:MM:SS` in Montserrat 700 `24px` monospace accent-color. `aria-live="off"` — countdown is decorative, not announced every second. `aria-label="Flash sale ends in X hours Y minutes"` as static `<span className="sr-only">`. `useReducedMotion()`: still renders countdown but with 0 animation.
  Files: `src/components/home/FlashSaleCountdownEngine.tsx`

---

- [ ] **TASK-008** | Est: 1.5h
  **DailyDealsGrid + FOMOTicker**
  Flash deal product grid with urgency ticker.

  Acceptance: `DailyDealsGrid.tsx` (server): CSS Grid `repeat(4,1fr)` desktop → `repeat(2,1fr)` mobile. `DealCard.tsx` (server): product image `alt={product.imageAlt}`, name Montserrat 700, price white + strikethrough original price muted, discount badge accent bg, "Stock: {stockRemaining}" in accent `12px` if `stockRemaining < 10` — NEVER fake stock. "Add to Cart →" accent bg `4px` radius. `FOMOTicker.tsx` is `'use client'`: CSS marquee with `animation: marquee linear infinite` showing recent purchase events. `aria-hidden="true"` — decorative only. `prefers-reduced-motion`: pause animation.
  Files: `src/components/home/DailyDealsGrid.tsx`, `src/components/home/DealCard.tsx`, `src/components/home/FOMOTicker.tsx`

---

- [ ] **TASK-009** | Est: 1h
  **CelebCuratedGrid**
  Ambassador product collections.

  Acceptance: 3 `CelebrityCard.tsx` (server): celebrity lifestyle image `alt={celeb.imageAlt}`, name Montserrat 900, title Montserrat 400 `14px` muted. Below card: filtered product strip (products where `id` in `celeb.productIds`). Product thumbnails horizontal scroll `snap-type: x mandatory`. `scrollbar-width: none`. Server Component.
  Files: `src/components/home/CelebCuratedGrid.tsx`, `src/components/home/CelebrityCard.tsx`

---

## Phase 3 — QA

---

- [ ] **TASK-010** | Est: 1h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== No white backgrounds ===" && \
    grep -r "bg-white\|background.*#fff\|background: white" src/components --include="*.tsx" \
    && echo "FAIL — dark mode only" || echo "PASS"

  echo "=== HeroSlider is use client ===" && \
    grep -r "'use client'" src/components/home/HeroSlider.tsx && echo "PASS" || echo "FAIL"

  echo "=== HeroSlider has aria-label on dots ===" && \
    grep -r "aria-label.*slide\|aria-current" src/components/home/HeroSlider.tsx && echo "PASS" || echo "FAIL"

  echo "=== FlashSaleCountdownEngine is use client ===" && \
    grep -r "'use client'" src/components/home/FlashSaleCountdownEngine.tsx && echo "PASS" || echo "FAIL"

  echo "=== FlashSaleCountdown clears interval ===" && \
    grep -r "clearInterval\|useEffect.*return" src/components/home/FlashSaleCountdownEngine.tsx \
    && echo "PASS" || echo "FAIL"

  echo "=== FOMOTicker is aria-hidden ===" && \
    grep -r "aria-hidden" src/components/home/FOMOTicker.tsx && echo "PASS" || echo "FAIL"

  echo "=== Stock not display none ===" && \
    grep -r "display.*none" src/components/home/DealCard.tsx \
    && echo "REVIEW — never hide stock with display:none" || echo "PASS"

  echo "=== No hex in component files ===" && \
    grep -r "#[0-9A-Fa-f]\{3,6\}" src/components --include="*.tsx" \
    && echo "FAIL — use CSS variables" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
