# 06 — Tasks
## Iconic Indian Luxury Brand Flagship · bw_platform_02

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
  **Font setup — Bodoni/Didot + Montserrat**
  Authoritative serif weight 600 for headings. Montserrat weight 400 for metadata. No weight 700+.

  Acceptance: DevTools shows serif on `<h1>–<h4>`, Montserrat on `<p>` and metadata. `grep -r "font-weight: 700\|font-weight: 800" src` returns empty.
  Files: `src/app/layout.tsx`

---

- [ ] **TASK-003** | Est: 30m
  **Design tokens — 5 CSS variables + heading tracking**
  All 5 color values as CSS custom properties. Heading `letter-spacing: 0.15em` enforced globally.

  Tokens (exact values):
  ```css
  --color-sepia:   #F4F1EA;
  --color-ink:     #1A1A1A;
  --color-gold:    #B59410;
  --color-black:   #000000;
  --color-border:  #E5E7EB;

  body { background: var(--color-sepia); }
  h1, h2, h3, h4 { letter-spacing: 0.15em; }
  ```

  Acceptance: All 5 variables in DevTools. Body bg is sepia, not white. `grep -r "#[0-9A-Fa-f]" src/components --include="*.module.css"` → empty.
  Files: `src/app/globals.css`

---

- [ ] **TASK-004** | Est: 20m
  **Accessibility utilities**
  `.sr-only`, `prefers-reduced-motion` reset, `border-radius: 0` on `*` reset.

  Acceptance: `.sr-only` hides text visually. `@media (prefers-reduced-motion: reduce)` sets `transition-duration: 0.01ms`. `grep -r "border-radius: [1-9]" src/components --include="*.module.css"` → empty.
  Files: `src/app/globals.css`

---

- [ ] **TASK-005** | Est: 30m
  **TypeScript types**
  All domain types exported. `tsc --noEmit` exits 0.

  ```typescript
  export type CollectionCategory = 'couture' | 'jewellery' | 'accessories' | 'heritage'

  export interface Collection {
    id: string; name: string; category: CollectionCategory
    year: number; coverPortrait: string; storySlug: string
    portfolioImages: string[]; narrativeText: string
  }

  export interface RetailStore {
    id: string; city: string; country: string; address: string
    interiorImage: string; email: string; whatsapp: string
  }

  export interface NavLink { label: string; href: string }
  ```

  Files: `src/types/index.ts`

---

- [ ] **TASK-006** | Est: 30m
  **Static data files**
  Mock data for all page sections.

  Acceptance: `collections.ts` exports 3 `Collection` objects across different categories. `stores.ts` exports 3 `RetailStore` objects (Mumbai, New York, Hyderabad). All `tsc --noEmit` clean.
  Files: `src/lib/collections.ts`, `src/lib/stores.ts`

---

## Phase 1 — Navigation and Hero

---

- [ ] **TASK-007** | Est: 1.5h
  **SiteNav**
  Minimalist centered logo navigation.

  Acceptance: Logo center in serif 600, `0.15em` tracking. Left: Couture, Jewellery, Accessories, Heritage — `11px` Montserrat uppercase, `0.2em` tracking. Right: "Global Flagships" + Search icon. On scroll >0: `1px solid var(--color-border)` bottom border. Background `var(--color-sepia)`. `border-radius: 0` everywhere.
  Files: `src/components/layout/SiteNav.tsx`

---

- [ ] **TASK-008** | Est: 1.5h
  **CinematicHero**
  Full-width 2:3 vertical portrait with title overlay.

  Acceptance: Full-width image, `aspect-ratio: 2/3` enforced via CSS. Centered text overlay: collection title in white serif 600, `clamp(24px, 4vw, 40px)`, `0.15em` tracking. No CTA button. Dark gradient covers bottom 30% for legibility. Server Component.
  Files: `src/components/home/CinematicHero.tsx`

---

## Phase 2 — Collection and Story Sections

---

- [ ] **TASK-009** | Est: 1.5h
  **CollectionStories**
  Vertical editorial story card stack.

  Acceptance: 3 cards, `120px` gap between. Each: full-width 2:3 portrait, collection name below in serif 600 `0.15em` tracking, "Explore →" in gold `11px` Montserrat uppercase. No card background fills. Server Component.
  Files: `src/components/home/CollectionStories.tsx`

---

- [ ] **TASK-010** | Est: 2h
  **Collection Story Page**
  Long-form collection narrative with portrait grid.

  Acceptance: `app/stories/[slug]/page.tsx` with `generateMetadata` → `<title>{collection.name} | DramaticLuxury`. `notFound()` if slug not found. Portrait grid: 5–8 images at `aspect-ratio: 2/3`, `48px` gap. Narrative text: serif 500, max-width `600px` centered. Server Component.
  Files: `src/app/stories/[slug]/page.tsx`

---

## Phase 3 — Retail and Inquiry

---

- [ ] **TASK-011** | Est: 1h
  **ArtOfRetail**
  Global flagship store showcase.

  Acceptance: 3 store cards. Each: full-bleed interior image, store name (serif 600, `0.15em`), city + country (Montserrat `11px` uppercase), "Contact Store" text link. Server Component.
  Files: `src/components/home/ArtOfRetail.tsx`

---

- [ ] **TASK-012** | Est: 1.5h
  **LuxuryBarrier + InquiryDrawer**
  Non-transactional inquiry flow.

  Acceptance: `LuxuryBarrier` renders only: "Explore" (link to story page) + "Contact Boutique" (drawer trigger). NO "Add to Cart," NO prices, NO cart icon anywhere. `grep -ri "add.to.cart\|addtocart\|useCart" src` → empty. `InquiryDrawer` is `'use client'`: Framer Motion `x: '100%'` → `x: 0`, `duration: 0.4`. `useReducedMotion()` guard: skip animation when true.
  Files: `src/components/ui/LuxuryBarrier.tsx`, `src/components/ui/InquiryDrawer.tsx`

---

- [ ] **TASK-013** | Est: 30m
  **SiteFooter**
  Minimal sepia footer.

  Acceptance: `var(--color-sepia)` bg, `1px solid var(--color-border)` top. 3 text links: Contact, Careers, Heritage Foundation — Montserrat `11px` uppercase `0.2em`. No social icons. Server Component.
  Files: `src/components/layout/SiteFooter.tsx`

---

## Phase 4 — QA

---

- [ ] **TASK-014** | Est: 1h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== No hex in module CSS ===" && \
    grep -r "#[0-9A-Fa-f]\{3,6\}" src/components --include="*.module.css" \
    && echo "FAIL — use CSS variables" || echo "PASS"

  echo "=== No white backgrounds ===" && \
    grep -r "background.*#fff\|background.*white\|background.*FFFFFF" src --include="*.module.css" --include="*.tsx" \
    && echo "FAIL — use sepia #F4F1EA" || echo "PASS"

  echo "=== No Add to Cart ===" && \
    grep -ri "add.to.cart\|addtocart\|useCart\|CartButton" src --include="*.tsx" \
    && echo "FAIL — luxury barrier only" || echo "PASS"

  echo "=== Heading letter-spacing 0.15em ===" && \
    grep -r "letter-spacing.*0.15em" src/app/globals.css && echo "PASS" || echo "FAIL"

  echo "=== InquiryDrawer is use client ===" && \
    grep -r "'use client'" src/components/ui/InquiryDrawer.tsx && echo "PASS" || echo "FAIL"

  echo "=== No border-radius other than 0px ===" && \
    grep -r "border-radius: [1-9]\|rounded-sm\|rounded-md\|rounded-full" \
    src --include="*.tsx" --include="*.module.css" \
    && echo "FAIL — 0px only" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
