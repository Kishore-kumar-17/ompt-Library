# 06 — Tasks
## Modern Indian Restaurant Flagship · bw_platform_05

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
  **Font setup — Playfair Display + Inter**
  Playfair Display weight 600 for headings and dish names. Inter weight 400 and 500 for body and UI.

  Acceptance: DevTools shows Playfair 600 on `h1–h3` and dish names, Inter on body. `grep -r "font-weight: 700\|font-weight: 800" src` returns empty for Playfair.
  Files: `src/app/layout.tsx`

---

- [ ] **TASK-003** | Est: 30m
  **Design tokens — 6 CSS variables**
  All 6 color values as CSS custom properties. Parchment bg globally — never white.

  Tokens (exact values):
  ```css
  --color-parchment: #FFFDF6;
  --color-ink:       #1A1A1A;
  --color-green:     #067A46;
  --color-red:       #E31E24;
  --color-ochre:     #EAB308;
  --color-border:    #E5E7EB;

  body { background: var(--color-parchment); }
  ```

  Acceptance: All 6 variables in DevTools. Body bg is `#FFFDF6`. `grep -r "background.*#fff\|background.*white\|bg-white" src/components --include="*.tsx"` → empty.
  Files: `src/app/globals.css`

---

- [ ] **TASK-004** | Est: 20m
  **Accessibility utilities**
  `.sr-only`, `prefers-reduced-motion` reset. Confirm `DietaryBadge` aria-label pattern documented.

  Acceptance: `.sr-only` hides text visually. `@media (prefers-reduced-motion: reduce)` sets `transition-duration: 0.01ms`. `BookingDrawer` renders immediately without animation when reduced motion is detected.
  Files: `src/app/globals.css`

---

- [ ] **TASK-005** | Est: 45m
  **TypeScript types**
  All domain types exported. `tsc --noEmit` exits 0.

  ```typescript
  export type DietaryType = 'veg' | 'non_veg' | 'contains_egg'
  export type MenuCategory = 'small_plates' | 'hearty' | 'bar' | 'desserts'

  export interface MenuItem {
    id: string; name: string; description: string
    category: MenuCategory; dietary: DietaryType
    price: number; isSeasonalSpecial?: boolean
  }

  export interface CanteenStory {
    id: string; slug: string; title: string
    coverImage: string; excerpt: string
    category: 'event' | 'initiative' | 'cocktail' | 'community'
    linkedMerchIds?: string[]
  }

  export interface MerchProduct {
    id: string; name: string; price: number
    type: 'gift_card' | 'book' | 'apparel'
    image: string; isDigital: boolean
  }
  ```

  Files: `src/types/index.ts`

---

- [ ] **TASK-006** | Est: 45m
  **Static data files**
  Mock data for all page sections.

  Acceptance: `menu.ts` exports 12 `MenuItem` objects covering all 4 categories. Both `veg` and `non_veg` dietary types present. `stories.ts` exports 4 `CanteenStory` objects. `merch.ts` exports 6 `MerchProduct` objects (mix of gift cards, books, apparel). All `tsc --noEmit` clean.
  Files: `src/lib/menu.ts`, `src/lib/stories.ts`, `src/lib/merch.ts`

---

## Phase 1 — Navigation and Hero

---

- [ ] **TASK-007** | Est: 1.5h
  **SiteNav + MobileBookingBar + BookingDrawer**
  Sticky nav with reservation drawer (the critical booking flow).

  Acceptance: `SiteNav`: parchment bg, scroll border, Playfair 600 logo, "Book a Table" red button (`2px` radius, `44px` height). `MobileBookingBar`: fixed bottom, full-width, red bg — `hidden md:hidden` desktop, visible mobile only. `BookingDrawer`: `'use client'`, Framer `x: '100%'` → `x: 0`, `400ms ease`. `useReducedMotion()`: skip animation. Contains booking widget iframe placeholder. NO `/reservations` page route.
  Files: `src/components/layout/SiteNav.tsx`, `src/components/layout/MobileBookingBar.tsx`, `src/components/ui/BookingDrawer.tsx`

---

- [ ] **TASK-008** | Est: 1h
  **NarrativeHero + MenuPreviewStrip**
  Homepage hero and dish preview.

  Acceptance: `NarrativeHero`: full-bleed image, Playfair 600 `clamp(28px, 4vw, 48px)` white overlay, ghost CTA (`1px white border`, `2px` radius). `MenuPreviewStrip`: horizontal snap-scroll, `scrollbar-width: none`, 3–4 dish cards (dish photo, Playfair 600 name, `DietaryBadge`), "View Full Menu →" link at end. Server Components.
  Files: `src/components/home/NarrativeHero.tsx`, `src/components/home/MenuPreviewStrip.tsx`

---

## Phase 2 — Menu Page

---

- [ ] **TASK-009** | Est: 2h
  **Icon-Led Menu Page**
  Digital menu with sticky category sidebar.

  Acceptance: `app/menu/page.tsx`. `MenuSidebar.tsx`: sticky, each category has SVG icon + Inter `11px` uppercase label — every icon MUST have `aria-label` (e.g., `aria-label="Small Plates"`). `DishListItem.tsx` (server): Playfair 600 dish name, Inter 400 description, price (₹XXX), `DietaryBadge.tsx`. `DietaryBadge`: green circle SVG = veg, red circle = non-veg, amber = contains_egg — `aria-label` mandatory on all. Menu is a vertical editorial list — NO table or CSS grid layout.
  Files: `src/app/menu/page.tsx`, `src/components/menu/MenuSidebar.tsx`, `src/components/menu/DishListItem.tsx`, `src/components/menu/DietaryBadge.tsx`

---

## Phase 3 — Stories and Shop

---

- [ ] **TASK-010** | Est: 1.5h
  **CanteenStoriesGrid + TeamSection**
  Story grid and team section on homepage.

  Acceptance: `CanteenStoriesGrid`: staggered 2x2 grid, `16px` radius cards, Framer stagger `opacity 0→1`, `y: 16→0`. `useReducedMotion()` guard. Each card: image, Playfair 600 title, Inter 400 excerpt, "Read More →" green link. `TeamSection`: 3–4 portrait cards, Playfair 600 name, Inter 400 1-sentence bio. Server Components (stagger as client wrapper only).
  Files: `src/components/home/CanteenStoriesGrid.tsx`, `src/components/home/TeamSection.tsx`

---

- [ ] **TASK-011** | Est: 1h
  **Merch Shop Page**
  Product grid for gift cards, books, and apparel.

  Acceptance: `app/shop/page.tsx`. 3-col desktop, 2-col tablet, 1-col mobile grid. Each card: product image, name (Playfair 600), price (₹XXX), "Quick Add" red button (`2px` radius). Digital products: "Digital Delivery" badge in ochre. Physical: "Ships in 5–7 days" note. Server Component. No cart UI needed — "Quick Add" opens `BookingDrawer` placeholder for checkout.
  Files: `src/app/shop/page.tsx`

---

## Phase 4 — QA

---

- [ ] **TASK-012** | Est: 1h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== No white backgrounds ===" && \
    grep -r "background.*#fff\|bg-white\|background.*white" src/components --include="*.tsx" \
    && echo "FAIL — use parchment #FFFDF6" || echo "PASS"

  echo "=== No reservations page ===" && \
    ls src/app/reservations 2>/dev/null \
    && echo "FAIL — no reservations page, booking is drawer only" || echo "PASS"

  echo "=== BookingDrawer is use client ===" && \
    grep -r "'use client'" src/components/ui/BookingDrawer.tsx && echo "PASS" || echo "FAIL"

  echo "=== DietaryBadge has aria-label ===" && \
    grep -r "aria-label" src/components/menu/DietaryBadge.tsx && echo "PASS" || echo "FAIL"

  echo "=== MenuSidebar icons have aria-label ===" && \
    grep -r "aria-label" src/components/menu/MenuSidebar.tsx && echo "PASS" || echo "FAIL"

  echo "=== MobileBookingBar hidden on desktop ===" && \
    grep -r "hidden.*md\|md:hidden" src/components/layout/MobileBookingBar.tsx && echo "PASS" || echo "FAIL"

  echo "=== No border-radius above 16px ===" && \
    grep -r "rounded-xl\|rounded-2xl\|rounded-full\|border-radius: [2-9][0-9]px" \
    src/components --include="*.tsx" \
    && echo "FAIL — max 16px on story cards" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
