# 06 — Tasks
## Premium Indian Designer Wear · bw_platform_01

Tasks are ordered by dependency. Complete each task fully before starting the next.

---

## Phase 0 — Foundation

---

- [ ] **TASK-001** | Est: 1h
  **Initialise project**
  Next.js 14 App Router, TypeScript strict, CSS Modules, static export.

  ```bash
  npx create-next-app@latest . --typescript --app --src-dir --import-alias "@/*" --no-tailwind
  npm install framer-motion lucide-react
  ```

  `next.config.ts`: `output: 'export'`, `images: { unoptimized: true }`.

  Acceptance: `npm run dev` starts. `tsc --noEmit` exits 0. `npm run build` produces `/out` directory.
  Files: `package.json`, `tsconfig.json`, `next.config.ts`

---

- [ ] **TASK-002** | Est: 30m
  **Font setup — Playfair Display + Montserrat**
  Playfair Display weight 500 only. Montserrat weights 400 and 600 only. No weight 700+.

  Acceptance: DevTools shows Playfair Display on `<h1>–<h4>`, Montserrat on `<body>`. `grep -r "font-weight: 700\|fontWeight: 700" src` returns empty.
  Files: `src/app/layout.tsx`

---

- [ ] **TASK-003** | Est: 30m
  **Design tokens — 6 CSS variables**
  All 6 color values as CSS custom properties in `globals.css`. Zero hex values in module files.

  Tokens (exact values):
  ```css
  --color-ink:       #1A1A1A;
  --color-gold:      #D4AF37;
  --color-white:     #FFFFFF;
  --color-off-white: #FDFDFD;
  --color-divider:   #E5E7EB;
  --color-muted:     #6B7280;
  ```

  Acceptance: All 6 variables accessible in DevTools. `grep -r "#[0-9A-Fa-f]" src/components --include="*.module.css"` → empty.
  Files: `src/app/globals.css`

---

- [ ] **TASK-004** | Est: 15m
  **Accessibility utilities**
  `.sr-only` and `prefers-reduced-motion` reset in `globals.css`. `border-radius: 0` on `*` reset — sharp corners enforced globally.

  Acceptance: `.sr-only` hides text visually. `@media (prefers-reduced-motion: reduce)` sets `transition-duration: 0.01ms` on animated elements. `grep -r "border-radius" src/components --include="*.module.css" | grep -v "0px\|0rem\|50%"` → empty (only `0px` or doctor photo `50%` allowed).
  Files: `src/app/globals.css`

---

- [ ] **TASK-005** | Est: 30m
  **TypeScript types**
  All domain types exported. `tsc --noEmit` exits 0.

  ```typescript
  export type CraftTechnique =
    | 'gota_patti' | 'pichhwai' | 'bandhani' | 'chikankari' | 'zardosi' | 'resham'

  export type ProductCategory = 'women' | 'men' | 'wedding' | 'grassroot'

  export interface Collection {
    id: string; name: string; season: string
    coverVideo?: string; coverImage: string; slug: string
  }

  export interface Product {
    id: string; name: string; category: ProductCategory
    craftTechnique: CraftTechnique; price: number
    image: string; isNew: boolean; slug: string
  }

  export interface ArtisanStory {
    id: string; craftTechnique: CraftTechnique
    headline: string; body: string; videoUrl?: string; image: string
  }

  export interface NavLink { label: string; href: string }
  ```

  Files: `src/types/index.ts`

---

- [ ] **TASK-006** | Est: 45m
  **Static data files**
  Mock data for all page sections.

  Acceptance: `collections.ts` exports 2 `Collection` objects. `products.ts` exports 12 `Product` objects covering all 6 `CraftTechnique` values. `stories.ts` exports 3 `ArtisanStory` objects. All `tsc --noEmit` clean.
  Files: `src/lib/collections.ts`, `src/lib/products.ts`, `src/lib/stories.ts`

---

## Phase 1 — Navigation and Hero

---

- [ ] **TASK-007** | Est: 1.5h
  **SiteNav**
  Sticky navigation with centered logo and scroll-triggered gold border.

  Acceptance: Logo center in Playfair Display 500. Left links: Women, Men, Wedding, Grassroot — `var(--color-muted)` default, `var(--color-ink)` on hover. Right: icon row (Search, Account, Wishlist, Bag, WhatsApp). On scroll >0: `1px solid var(--color-gold)` bottom border appears via `'use client'` scroll listener. `border-radius: 0` on all elements.
  Files: `src/components/layout/SiteNav.tsx`

---

- [ ] **TASK-008** | Est: 2h
  **HeroVideo**
  Full-bleed Mux video hero with minimal text overlay.

  Acceptance: `<video muted loop playsInline preload="none">` — all four attributes required. Dark gradient overlay on bottom half. Collection title in Playfair 500 `clamp(32px, 5vw, 52px)` white. Ghost CTA button: `1px solid white`, `0px` radius, `40px` height. No autoplay without muted+loop. Poster image fallback via `poster` attribute.
  Files: `src/components/home/HeroVideo.tsx`

---

## Phase 2 — Discovery Sections

---

- [ ] **TASK-009** | Est: 1h
  **CraftsStrip**
  Horizontal row of 5 craft technique blocks.

  Acceptance: 5 blocks: Gota Patti, Pichhwai, Bandhani, Chikankari, Zardosi. Each: craft image + `14px` Montserrat craft name. No background fills — image and label only. Horizontal scroll on mobile (`overflow-x: auto`, `scrollbar-width: none`). Server Component.
  Files: `src/components/home/CraftsStrip.tsx`

---

- [ ] **TASK-010** | Est: 1.5h
  **CraftFilter + ProductGrid + ProductCard**
  Interactive craft technique filter and product grid.

  Acceptance: `CraftFilter` is `'use client'` — horizontal pill row, active pill gets `1px solid var(--color-gold)`. `ProductCard` is a server component — 3:4 image, craft label (gold, 11px uppercase), collection name (Montserrat 600). Price: CSS `group-hover` reveal only — not visible on initial render. `isNew === true` → gold `1px` "New" label. 3-col desktop, 2-col tablet, 1-col mobile.
  Files: `src/components/products/CraftFilter.tsx`, `src/components/products/ProductGrid.tsx`, `src/components/products/ProductCard.tsx`

---

- [ ] **TASK-011** | Est: 1h
  **ArtisanalStory**
  Full-width image with centered editorial text overlay.

  Acceptance: Full-width image, minimum 600px height. Centered text overlay (max-width 600px): Playfair 500 `clamp(28px, 4vw, 44px)` white headline. "Explore the Craft →" link, gold underline. Dark gradient covers bottom 40% of image for text legibility. Server Component.
  Files: `src/components/home/ArtisanalStory.tsx`

---

- [ ] **TASK-012** | Est: 1h
  **BridalShowcase**
  Staggered editorial product grid.

  Acceptance: Staggered 2/3-col grid (alternating large/small cards). Cards: 3:4 image, collection name, craft tag in gold. "Book an Appointment" text link at card bottom — not a button. 120px vertical padding on section. Server Component.
  Files: `src/components/home/BridalShowcase.tsx`

---

- [ ] **TASK-013** | Est: 45m
  **GrassrootHub**
  2-column sustainable fashion section.

  Acceptance: Left col: mission headline (Playfair 500) + body copy (2–3 sentences) + "Explore Grassroot →" text link. Right col: 2×2 eco-product grid. `var(--color-off-white)` section background. Server Component.
  Files: `src/components/home/GrassrootHub.tsx`

---

## Phase 3 — Global UI and Footer

---

- [ ] **TASK-014** | Est: 45m
  **WhatsAppButton**
  Fixed floating concierge button.

  Acceptance: Fixed bottom-right, `position: fixed`, `56px × 56px` gold circle (`var(--color-gold)` background). WhatsApp SVG icon white centered. Appears only after `scrollY > 300` (useEffect + useState scroll listener). `href`: `process.env.NEXT_PUBLIC_WHATSAPP_URL`. `aria-label="Contact us on WhatsApp"`.
  Files: `src/components/ui/WhatsAppButton.tsx`

---

- [ ] **TASK-015** | Est: 1h
  **SiteFooter**
  4-column footer with top border.

  Acceptance: 4 columns: Collections / Crafts / Company / Legal. Link text `var(--color-muted)`, hover → `var(--color-ink)` (`150ms ease`). `1px solid var(--color-divider)` top border. No social icons. 2-col tablet, 1-col mobile. Column headings: Montserrat 600, `12px` uppercase, `0.15em` tracking. Server Component.
  Files: `src/components/layout/SiteFooter.tsx`

---

## Phase 4 — Animation and QA

---

- [ ] **TASK-016** | Est: 45m
  **Framer Motion scroll reveals**
  Scroll-triggered entrance on major sections.

  Acceptance: `initial={{ opacity: 0, y: 20 }}` → `whileInView={{ opacity: 1, y: 0 }}` on section content. `viewport={{ once: true }}`. `transition={{ duration: 0.5, ease: 'easeOut' }}`. `useReducedMotion()` guard: when true, render at final state immediately. No bounce easing. No continuous loops.
  Files: `src/components/home/CraftsStrip.tsx`, `src/components/home/ArtisanalStory.tsx`, `src/components/home/BridalShowcase.tsx`

---

- [ ] **TASK-017** | Est: 1h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== No hex in module CSS ===" && \
    grep -r "#[0-9A-Fa-f]\{3,6\}" src/components --include="*.module.css" \
    && echo "FAIL — use CSS variables" || echo "PASS"

  echo "=== No font-weight 700 ===" && \
    grep -r "font-weight: 700\|fontWeight: 700\|font-bold" src --include="*.tsx" --include="*.module.css" \
    && echo "FAIL — max weight is 600" || echo "PASS"

  echo "=== No border-radius above 0px (except 50%) ===" && \
    grep -r "border-radius: [1-9]\|rounded-sm\|rounded-md\|rounded-lg\|rounded-xl\|rounded-full\|9999px" \
    src --include="*.tsx" --include="*.module.css" \
    && echo "FAIL — 0px only (50% for circular photos)" || echo "PASS"

  echo "=== No gold as background ===" && \
    grep -r "background.*D4AF37\|background.*gold\|bg-\[#D4AF37\]" src/components --include="*.tsx" --include="*.module.css" | grep -v "WhatsApp\|concierge" \
    && echo "FAIL — gold is borders and text only" || echo "PASS"

  echo "=== Hero video has muted+loop+playsInline ===" && \
    grep -r "muted" src/components/home/HeroVideo.tsx && \
    grep -r "loop" src/components/home/HeroVideo.tsx && \
    grep -r "playsInline" src/components/home/HeroVideo.tsx && echo "PASS" || echo "FAIL"

  echo "=== CraftFilter is use client ===" && \
    grep -r "'use client'" src/components/products/CraftFilter.tsx && echo "PASS" || echo "FAIL"

  echo "=== No autoplay video ===" && \
    grep -r "autoPlay\|autoplay" src --include="*.tsx" \
    && echo "FAIL — no autoplay allowed" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
