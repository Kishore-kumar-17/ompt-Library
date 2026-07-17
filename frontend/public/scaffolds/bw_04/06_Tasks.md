# 06 — Tasks
## Indian Lifestyle Retail & Editorial Hub · bw_platform_04

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
  **Font setup — Montserrat only**
  Montserrat weights 400 and 700 only. No serif fonts. All headings uppercase.

  Acceptance: DevTools shows Montserrat on all elements. `grep -r "serif\|Playfair\|Georgia" src` returns empty. All `h1–h4` in globals have `text-transform: uppercase; letter-spacing: 0.05em`.
  Files: `src/app/layout.tsx`

---

- [ ] **TASK-003** | Est: 30m
  **Design tokens — 6 CSS variables**
  All 6 color values as CSS custom properties. `2px` border-radius standard.

  Tokens (exact values):
  ```css
  --color-citrus:  #FDB913;
  --color-teal:    #008080;
  --color-white:   #FFFFFF;
  --color-coconut: #FDFDF9;
  --color-dune:    #F3F4F1;
  --color-ink:     #1A1A1A;
  ```

  Global heading rules:
  ```css
  h1, h2, h3, h4 { text-transform: uppercase; letter-spacing: 0.05em; }
  .card, .btn, .badge { border-radius: 2px; }
  ```

  Acceptance: All 6 variables in DevTools. `grep -r "border-radius: [3-9]\|rounded-md\|rounded-lg" src/components` → empty. Headings in DevTools show `text-transform: uppercase`.
  Files: `src/app/globals.css`

---

- [ ] **TASK-004** | Est: 20m
  **Accessibility utilities**
  `.sr-only`, `prefers-reduced-motion` reset, `StatusTicker` pause on motion.

  Acceptance: `.sr-only` hides text visually. `@media (prefers-reduced-motion: reduce)` stops marquee animation.
  Files: `src/app/globals.css`

---

- [ ] **TASK-005** | Est: 45m
  **TypeScript types**
  All domain types exported. `tsc --noEmit` exits 0.

  ```typescript
  export type ProductCategory = 'women' | 'men' | 'home' | 'travel' | 'gifting'
  export type GiftRecipient = 'her' | 'him'
  export type GiftPriceRange = 'under_3k' | 'under_5k' | 'under_10k'

  export interface Product {
    id: string; name: string; category: ProductCategory
    collectionTag: string; price: number; images: string[]
    giftRecipient?: GiftRecipient; giftPriceRange?: GiftPriceRange; slug: string
  }

  export interface JournalArticle {
    id: string; slug: string; title: string
    coverImage: string; excerpt: string
    nicoRadioPlaylistUrl?: string; linkedProductIds: string[]
  }
  ```

  Files: `src/types/index.ts`

---

- [ ] **TASK-006** | Est: 45m
  **Static data files**
  Mock data for all sections.

  Acceptance: `products.ts` exports 15 `Product` objects across all categories, all with `collectionTag` (e.g., `"ganga"`, `"spice"`). At least 3 products share the same `collectionTag` for pairing. `articles.ts` exports 4 `JournalArticle` objects with `linkedProductIds`. All `tsc --noEmit` clean.
  Files: `src/lib/products.ts`, `src/lib/articles.ts`

---

## Phase 1 — Navigation and Hero

---

- [ ] **TASK-007** | Est: 1h
  **SiteNav**
  Centered logo navigation with editorial links.

  Acceptance: White bg, `1px solid #EEEEEE` bottom border. Logo center (Montserrat 700 uppercase). Left: Women, Men, Home, Travel. Right: Gifting, Journal, Search, Bag. `2px` radius on all interactive elements.
  Files: `src/components/layout/SiteNav.tsx`

---

- [ ] **TASK-008** | Est: 1h
  **CollectionHero + StatusTicker**
  Full-width lifestyle hero with marquee ticker.

  Acceptance: `CollectionHero`: full-width image, `min-height: 70vh`, bold all-caps Montserrat 700 `clamp(24px, 4vw, 40px)` overlay, Citrus "SHOP NOW" badge (`2px` radius). `StatusTicker`: CSS `@keyframes` marquee (NOT Framer Motion), Montserrat 700 `11px` all-caps `0.1em` tracking. `prefers-reduced-motion` pauses marquee. Server Components.
  Files: `src/components/home/CollectionHero.tsx`, `src/components/ui/StatusTicker.tsx`

---

## Phase 2 — Discovery Sections

---

- [ ] **TASK-009** | Est: 1h
  **CategoryTiles**
  3-column category grid.

  Acceptance: 3 tiles: Kitchen & Dining, Decor, Apparel. Each: square lifestyle image, 1-word all-caps Montserrat 700 `11px` title below. `2px` radius on tile images. Hover: `scale(1.02)` on image, `prefers-reduced-motion` skip. Server Component.
  Files: `src/components/home/CategoryTiles.tsx`

---

- [ ] **TASK-010** | Est: 1.5h
  **NicoJournalStrip + PairingEngine**
  Horizontal journal cards and cross-category pairing carousel.

  Acceptance: `NicoJournalStrip`: horizontal snap-scroll, `scrollbar-width: none`, 4 article cards (cover image, Montserrat 700 all-caps title, "NICO RADIO" teal badge if `nicoRadioPlaylistUrl` present). `PairingEngine` (`'use client'`): horizontal carousel showing products with same `collectionTag` as source product, "WE LOVE THIS WITH..." `11px` all-caps label above.
  Files: `src/components/home/NicoJournalStrip.tsx`, `src/components/home/PairingEngine.tsx`

---

- [ ] **TASK-011** | Est: 1.5h
  **GiftingConcierge**
  Interactive gift guide with filters.

  Acceptance: `'use client'`. "THE GIFT SHOP" Montserrat 700 all-caps heading. 4 filter pills: [HER] [HIM] [UNDER ₹3K] [UNDER ₹5K] — Citrus bg on active, `2px` radius. `useMemo` filters products by `giftRecipient` + `giftPriceRange`. Product grid: 3-col desktop, 2-col mobile. Server-rendered initial state.
  Files: `src/components/home/GiftingConcierge.tsx`

---

## Phase 3 — Journal and Footer

---

- [ ] **TASK-012** | Est: 1.5h
  **Journal Article Page**
  Editorial long-form template with buy-points.

  Acceptance: `app/journal/[slug]/page.tsx` with `generateMetadata` → `<title>{article.title} | Nico Journal`. `notFound()` if slug not found. Layout: Montserrat 700 all-caps headline, lead image, long-form text with inline `ProductCard` buy-points. Spotify embed if `nicoRadioPlaylistUrl` present. Server Component.
  Files: `src/app/journal/[slug]/page.tsx`

---

- [ ] **TASK-013** | Est: 30m
  **SiteFooter**
  4-column nomad-friendly footer.

  Acceptance: White bg, `1px solid #EEEEEE` top. 4 columns: Women + Men / Home + Travel / The Journal / Gifting + Company. Link text `var(--color-ink)`, hover Citrus. No social icons. Montserrat 400 `14px`. Server Component.
  Files: `src/components/layout/SiteFooter.tsx`

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

  echo "=== All headings uppercase ===" && \
    grep -r "text-transform.*uppercase\|uppercase" src/app/globals.css && echo "PASS" || echo "FAIL"

  echo "=== No border-radius above 2px ===" && \
    grep -r "rounded-md\|rounded-lg\|rounded-xl\|rounded-full\|border-radius: [3-9]" \
    src/components --include="*.tsx" \
    && echo "FAIL — 2px only" || echo "PASS"

  echo "=== GiftingConcierge is use client ===" && \
    grep -r "'use client'" src/components/home/GiftingConcierge.tsx && echo "PASS" || echo "FAIL"

  echo "=== PairingEngine is use client ===" && \
    grep -r "'use client'" src/components/home/PairingEngine.tsx && echo "PASS" || echo "FAIL"

  echo "=== StatusTicker uses CSS animation not Framer ===" && \
    grep -r "motion\." src/components/ui/StatusTicker.tsx \
    && echo "FAIL — use CSS @keyframes" || echo "PASS"

  echo "=== No dark section backgrounds ===" && \
    grep -r "bg-black\|bg-gray-900\|background.*#0\|background.*#1" \
    src/components --include="*.tsx" \
    && echo "FAIL — white/coconut/dune only" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
