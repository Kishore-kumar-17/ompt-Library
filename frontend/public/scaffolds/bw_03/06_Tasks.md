# 06 — Tasks
## Modern Indian D2C Saree Boutique · bw_platform_03

Tasks are ordered by dependency. Complete each task fully before starting the next.

---

## Phase 0 — Foundation

---

- [ ] **TASK-001** | Est: 1h
  **Initialise project**
  Next.js 14 App Router, TypeScript strict, Tailwind CSS v3, static export.

  ```bash
  npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"
  npm install framer-motion zustand lucide-react
  ```

  Acceptance: `npm run dev` starts. `tsc --noEmit` exits 0. `npm run build` produces `/out` directory.
  Files: `package.json`, `tsconfig.json`, `next.config.ts`

---

- [ ] **TASK-002** | Est: 30m
  **Font setup — Montserrat + Playfair Display**
  Montserrat weights 500 and 600. Playfair Display weight 500. No 700+ for Playfair.

  Acceptance: DevTools shows Montserrat on nav and product names, Playfair on story headers.
  Files: `src/app/layout.tsx`

---

- [ ] **TASK-003** | Est: 30m
  **Design tokens — 6 CSS variables + 12px radius**
  All 6 color values as CSS variables. `border-radius: 12px` on all `.card`, `.btn`, `.modal` in globals.

  Tokens (exact values):
  ```css
  --color-red:     #E31E24;
  --color-teal:    #3AA4CB;
  --color-white:   #FFFFFF;
  --color-surface: #F9F9F9;
  --color-text:    #242424;
  --color-stone:   #57534E;
  ```

  Acceptance: All 6 variables in DevTools. `grep -r "border-radius: 0\|rounded-none" src/components` → empty. `grep -r "9999px\|rounded-full" src/components --include="*.tsx"` → empty (no pill CTAs).
  Files: `src/app/globals.css`

---

- [ ] **TASK-004** | Est: 20m
  **Accessibility utilities**
  `.sr-only`, `prefers-reduced-motion` reset for animations.

  Acceptance: `.sr-only` hides text visually. `@media (prefers-reduced-motion: reduce)` sets `transition-duration: 0.01ms`. HeroCarousel auto-play pauses when reduced motion detected.
  Files: `src/app/globals.css`

---

- [ ] **TASK-005** | Est: 45m
  **TypeScript types**
  All domain types exported. `tsc --noEmit` exits 0.

  ```typescript
  export type SareeSize =
    | 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | '3XL' | '4XL'

  export type ProductCategory = 'saree' | 'blouse' | 'men' | 'home' | 'accessories'

  export interface Product {
    id: string; name: string; category: ProductCategory
    price: number; originalPrice?: number
    images: string[]
    sizes: { size: SareeSize; inStock: boolean }[]
    story?: string
  }

  export interface SutaBookArticle {
    id: string; slug: string; title: string
    excerpt: string; coverImage: string
    poem?: string; linkedProducts: string[]
  }

  export interface CartItem { productId: string; size: SareeSize; quantity: number }
  ```

  Files: `src/types/index.ts`

---

- [ ] **TASK-006** | Est: 45m
  **Static data + cart store**
  Mock product data and Zustand cart store.

  Acceptance: `products.ts` exports 12 `Product` objects with evocative names (e.g., "Latte Freckles") — no SKU codes. Every product has all 9 sizes with `inStock` boolean. `articles.ts` exports 3 `SutaBookArticle` objects. `useCartStore.ts`: Zustand + persist, Buy 3 Get 1 Free — when `items.length >= 3`, cheapest item discount = 100%. `tsc --noEmit` clean.
  Files: `src/lib/products.ts`, `src/lib/articles.ts`, `src/store/useCartStore.ts`

---

## Phase 1 — Navigation and Hero

---

- [ ] **TASK-007** | Est: 1h
  **SiteHeader**
  Sticky navigation with centered logo and sub-nav.

  Acceptance: Search icon left, Logo center (Playfair 500 "SutaStyle"), Account + Cart right. Sub-nav: Saree, Blouse, Men, Home, Accessories. `border-bottom: 1px solid #E5E5E5` always visible. `12px` radius on Cart icon badge. Server Component (sub-nav links are static).
  Files: `src/components/layout/SiteHeader.tsx`

---

- [ ] **TASK-008** | Est: 2h
  **HeroCarousel**
  Auto-playing lifestyle photo carousel.

  Acceptance: 3–4 slides, auto-advances at 3000ms. `useReducedMotion()`: when true, show first slide static — no auto-play. Overlay: Montserrat 700 `clamp(28px, 5vw, 48px)` white text. "Shop Now" button: red `var(--color-red)`, `12px` radius, `44px` height. Dot indicators below carousel.
  Files: `src/components/home/HeroCarousel.tsx`

---

## Phase 2 — Product Discovery

---

- [ ] **TASK-009** | Est: 1.5h
  **BestsellerReel + ProductCard**
  Horizontal snap-scroll product reel.

  Acceptance: `overflow-x: auto`, `scrollbar-width: none`, `scroll-snap-type: x mandatory`. 6–8 `ProductCard` components. `ProductCard`: 4:5 image, evocative product name (Montserrat 600), price (formatted ₹X,XXX), "Quick Add" red button (`12px` radius). Server Component.
  Files: `src/components/home/BestsellerReel.tsx`, `src/components/products/ProductCard.tsx`

---

- [ ] **TASK-010** | Est: 1.5h
  **QuickBuyModal**
  Card-level size selector and add-to-bag flow.

  Acceptance: `'use client'`. Framer Motion: `y: '100%'` → `y: 0`, `duration: 0.2`, `ease: 'easeOut'`. `useReducedMotion()` guard: skip transform, render at final state. Size chips: all 9 sizes rendered — `inStock: false` → `opacity: 0.4` + `text-decoration: line-through`, never `display: none`. "Add to Bag" red button dispatches to `useCartStore`.
  Files: `src/components/products/QuickBuyModal.tsx`

---

- [ ] **TASK-011** | Est: 1h
  **CommunityGrid**
  Staggered masonry of customer photos.

  Acceptance: Staggered 2–3 col grid. Each item: customer photo (varied aspect ratios), customer name, handle (e.g., "@archana_suta"), "Shop the Look" text link in `var(--color-teal)`. Server Component.
  Files: `src/components/home/CommunityGrid.tsx`

---

## Phase 3 — Story and Commerce

---

- [ ] **TASK-012** | Est: 1.5h
  **SutaBookPreview + Story Page**
  Story section teasers and full article template.

  Acceptance: `SutaBookPreview.tsx`: 3 story card teasers (cover image, Playfair title, excerpt, "Read →" teal link). `app/suta-book/[slug]/page.tsx`: `generateMetadata`, `notFound()` for unknown slugs. Article: Playfair 500 headline, lifestyle image, narrative text (`var(--color-stone)`), inline buy-point links. Server Components.
  Files: `src/components/home/SutaBookPreview.tsx`, `src/app/suta-book/[slug]/page.tsx`

---

- [ ] **TASK-013** | Est: 1h
  **OfferStrip**
  Urgency offer bar with countdown timer.

  Acceptance: `'use client'`. Red `var(--color-red)` bg, white text. "Buy 3, Get 1 Free — ends in HH:MM:SS." Countdown: `useEffect` decrements from target timestamp. `OfferProgressBar` shows cart progress: "Add N more for a free saree!" below timer. Server-side target time stored in `lib/offer.ts`.
  Files: `src/components/home/OfferStrip.tsx`

---

## Phase 4 — QA

---

- [ ] **TASK-014** | Est: 1h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== No hex in component files ===" && \
    grep -r "#[0-9A-Fa-f]\{3,6\}" src/components --include="*.tsx" \
    && echo "FAIL — use CSS variables" || echo "PASS"

  echo "=== No border-radius 0 ===" && \
    grep -r "rounded-none\|border-radius: 0[^px]" src/components --include="*.tsx" --include="*.css" \
    && echo "FAIL — 12px minimum" || echo "PASS"

  echo "=== No pill CTAs (9999px) ===" && \
    grep -r "rounded-full\|9999px" src/components --include="*.tsx" \
    && echo "FAIL — use 12px only" || echo "PASS"

  echo "=== No hidden out-of-stock sizes ===" && \
    grep -r "display.*none.*stock\|hidden.*stock\|inStock.*display.*none" src/components --include="*.tsx" \
    && echo "FAIL — use opacity:0.4 + strikethrough" || echo "PASS"

  echo "=== No SKU-style product names ===" && \
    grep -r "SKU\|product-[0-9]\|PROD-[0-9]" src/lib --include="*.ts" \
    && echo "FAIL — use evocative names" || echo "PASS"

  echo "=== QuickBuyModal is use client ===" && \
    grep -r "'use client'" src/components/products/QuickBuyModal.tsx && echo "PASS" || echo "FAIL"

  echo "=== useCartStore has Buy 3 Get 1 logic ===" && \
    grep -r "cheapest\|applyDiscount\|offerDiscount\|getOneFor" src/store/useCartStore.ts \
    && echo "PASS" || echo "FAIL"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
