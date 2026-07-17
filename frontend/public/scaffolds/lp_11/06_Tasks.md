# 06 — Tasks
## Template Gallery & Marketplace Hub · lp_platform_11

Tasks are ordered by dependency. Complete each task fully before starting the next.

---

## Phase 0 — Foundation

---

- [ ] **TASK-001** | Est: 1h
  **Initialise project**
  Next.js 14 App Router, TypeScript strict, Tailwind CSS v3, static export.

  ```bash
  npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"
  npm install framer-motion lucide-react zustand
  ```

  Acceptance: `npm run dev` starts. `tsc --noEmit` exits 0. `npm run build` produces `/out` directory.
  Files: `package.json`, `tsconfig.json`, `next.config.ts`

---

- [ ] **TASK-002** | Est: 30m
  **Design tokens — CSS variables**
  Strictly neutral. White foundation, near-black text, 1px borders.

  ```css
  --color-bg:       #FFFFFF;
  --color-surface:  #F9FAFB;
  --color-border:   #E5E7EB;
  --color-ink:      #111827;
  --color-muted:    #6B7280;

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

  Acceptance: `grep -r "bg-black\|color.*blue\|color.*purple" src/components --include="*.tsx"` → empty — neutral gallery only.
  Files: `src/app/globals.css`

---

- [ ] **TASK-003** | Est: 45m
  **TypeScript types**
  All domain types exported. `tsc --noEmit` exits 0.

  ```typescript
  export type TemplateCategory = 'portfolio' | 'saas' | 'ecommerce' | 'agency' | 'blog'
  export type TemplateStyle = 'dark' | 'minimal' | 'threed' | 'glassmorphic' | 'editorial'

  export interface Template {
    id: string; slug: string; name: string
    category: TemplateCategory; style: TemplateStyle
    creator: string; creatorAvatarAlt: string
    price: number; currency: string
    thumbnailAlt: string; previewVideoUrl?: string
    pageCount: number; isFeatured?: boolean
  }

  export interface TemplateFilters {
    category: TemplateCategory | 'all'
    style: TemplateStyle | 'all'
    priceRange: 'free' | 'paid' | 'all'
  }
  ```

  Files: `src/types/index.ts`

---

- [ ] **TASK-004** | Est: 45m
  **Static data files**
  Mock data for gallery.

  Acceptance: `templates.ts` exports 12 `Template` objects across all 5 categories and 3+ styles, at least 3 `isFeatured: true`, at least 4 `price: 0` (free). `tsc --noEmit` clean.
  Files: `src/lib/templates.ts`

---

## Phase 1 — Navigation and Gallery Shell

---

- [ ] **TASK-005** | Est: 1h
  **SiteNav**
  Gallery-optimized nav with centered search and account.

  Acceptance: White bg, `1px solid var(--color-border)` bottom. Logo left Inter 700. Center: Search input `<input placeholder="Search templates..." aria-label="Search templates">`. Right: Account link + "Publish Template" ghost button. Wide `max-w-[1440px]`. Server Component.
  Files: `src/components/layout/SiteNav.tsx`

---

- [ ] **TASK-006** | Est: 1.5h
  **FilterSidebar**
  Category and style filter — state via Zustand.

  Acceptance: `'use client'`. Sidebar sticky. Category pills: all 5 `TemplateCategory` values + "All". Style pills: all 5 `TemplateStyle` values + "All". Price toggle: Free / Paid / All. Zustand store `useFilterStore`: `filters: TemplateFilters`, `setCategory`, `setStyle`, `setPriceRange`. Item count updates per filter. Server Component wrapper, client filter state.
  Files: `src/components/gallery/FilterSidebar.tsx`, `src/store/filterStore.ts`

---

## Phase 2 — Template Cards and Masonry Grid

---

- [ ] **TASK-007** | Est: 2h
  **MasonryEngine + TemplateCard**
  Multi-column masonry with video hover preview.

  Acceptance: `MasonryEngine.tsx`: CSS `columns: 3` desktop → `columns: 2` tablet → `columns: 1` mobile — NOT CSS Grid or flex. Each `TemplateCard.tsx` (server): thumbnail `<img alt={template.thumbnailAlt}>`, creator avatar `<img alt={template.creatorAvatarAlt}>`, template name Inter 600, category + style tags Inter `12px` muted, price (Free / $X) Inter 700. `VideoHoverCard.tsx` is `'use client'`: if `previewVideoUrl` present, hover shows `<video autoPlay muted loop playsInline>` overlay — `prefers-reduced-motion`: no video on hover. `1px solid var(--color-border)` card border. `4px` radius.
  Files: `src/components/gallery/MasonryEngine.tsx`, `src/components/gallery/TemplateCard.tsx`, `src/components/gallery/VideoHoverCard.tsx`

---

- [ ] **TASK-008** | Est: 1.5h
  **DetailModal**
  Template detail overlay with live preview and remix.

  Acceptance: `'use client'`. Triggered by card click. `role="dialog"` with `aria-modal="true"` and `aria-labelledby`. `backdrop-blur-xl` dark overlay. Scroll-lock on `<body>` while open (`overflow: hidden`). Content: page-by-page scrolling snapshot images, "Live Preview →" external link, "Remix Template →" primary CTA black bg. Focus trapped. Escape key closes. Framer `scale 0.95→1, opacity 0→1`. `useReducedMotion()` guard.
  Files: `src/components/gallery/DetailModal.tsx`

---

## Phase 3 — Search and QA

---

- [ ] **TASK-009** | Est: 1h
  **GallerySearch**
  Client-side instant search across template names and tags.

  Acceptance: `GallerySearchInput.tsx` is `'use client'`. Debounced `200ms`. Filters `Template[]` by name + category + style against query. Results update in `MasonryEngine`. "No templates found for [query]" empty state with Inter `16px`. `aria-label="Search templates"` on input.
  Files: `src/components/gallery/GallerySearchInput.tsx`

---

- [ ] **TASK-010** | Est: 1h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== FilterSidebar is use client ===" && \
    grep -r "'use client'" src/components/gallery/FilterSidebar.tsx && echo "PASS" || echo "FAIL"

  echo "=== VideoHoverCard is use client ===" && \
    grep -r "'use client'" src/components/gallery/VideoHoverCard.tsx && echo "PASS" || echo "FAIL"

  echo "=== DetailModal has aria-modal ===" && \
    grep -r "aria-modal" src/components/gallery/DetailModal.tsx && echo "PASS" || echo "FAIL"

  echo "=== DetailModal traps focus ===" && \
    grep -r "focus\|trap\|Escape\|keyDown" src/components/gallery/DetailModal.tsx && echo "PASS" || echo "FAIL"

  echo "=== MasonryEngine uses CSS columns ===" && \
    grep -r "columns:" src/components/gallery/MasonryEngine.tsx && echo "PASS" || echo "FAIL"

  echo "=== MasonryEngine NOT flex or grid ===" && \
    grep -r "display.*flex\|display.*grid\|grid-template" src/components/gallery/MasonryEngine.tsx \
    && echo "REVIEW — should use CSS columns" || echo "PASS"

  echo "=== Thumbnail has alt text ===" && \
    grep -r "thumbnailAlt\|alt=" src/components/gallery/TemplateCard.tsx && echo "PASS" || echo "FAIL"

  echo "=== No hex in component files ===" && \
    grep -r "#[0-9A-Fa-f]\{3,6\}" src/components --include="*.tsx" \
    && echo "FAIL — use CSS variables" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
