# 06 — Tasks
## Cinematic Editorial Photographer Portfolio · pcpp_platform_01

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
  Strictly dark. Pure black foundation. Zero color in UI.

  ```css
  --color-bg:       #000000;
  --color-surface:  #121212;
  --color-border:   #1F1F1F;
  --color-ink:      #FFFFFF;
  --color-muted:    #888888;

  body { background: var(--color-bg); color: var(--color-ink); }
  * { border-radius: 0 !important; }

  :focus-visible {
    outline: 1px solid var(--color-ink);
    outline-offset: 2px;
  }

  .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
  }
  ```

  Acceptance: Body bg is `#000000`. Zero border-radius. `grep -r "rounded\|border-radius: [1-9]" src --include="*.tsx"` → empty.
  Files: `src/app/globals.css`

---

- [ ] **TASK-003** | Est: 45m
  **TypeScript types**
  All domain types exported. `tsc --noEmit` exits 0.

  ```typescript
  export type ProjectType = 'photo_series' | 'motion' | 'fine_art'

  export interface Project {
    id: string; slug: string; title: string
    type: ProjectType; coverImageAlt: string
    year: string; isFeatured?: boolean
  }

  export interface ProjectMedia {
    id: string; projectId: string
    imageAlt: string; caption?: string
    isDiptychLeft?: boolean; isDiptychRight?: boolean
  }

  export interface PrintProduct {
    id: string; title: string; imageAlt: string
    edition: string; price: number; currency: string
  }
  ```

  Files: `src/types/index.ts`

---

- [ ] **TASK-004** | Est: 30m
  **Static data files**
  Mock data for all sections.

  Acceptance: `projects.ts` exports 8 `Project` objects, at least 2 `type: 'motion'` and 3 `isFeatured: true`. `media.ts` exports 12 `ProjectMedia` objects, at least 2 diptych pairs. `prints.ts` exports 4 `PrintProduct` objects. `tsc --noEmit` clean.
  Files: `src/lib/projects.ts`, `src/lib/media.ts`, `src/lib/prints.ts`

---

## Phase 1 — Gallery Infrastructure

---

- [ ] **TASK-005** | Est: 1h
  **MinimalNav**
  Hidden-on-scroll dark navigation.

  Acceptance: `'use client'`. `opacity: 0` by default → `opacity: 1` on scroll up; `opacity: 0` on scroll down. Logo center Inter 700 `11px` uppercase tracking `0.1em` white. Links left/right: Projects, Motion, Shop, About. `position: fixed; top: 0`. Transition `opacity 300ms`. `useReducedMotion()` guard — always visible, no scroll hide.
  Files: `src/components/layout/MinimalNav.tsx`

---

- [ ] **TASK-006** | Est: 1.5h
  **ProjectGrid**
  Responsive portfolio grid with 3:4 aspect ratio cards.

  Acceptance: `app/page.tsx`. CSS Grid `repeat(3,1fr)` desktop → `repeat(2,1fr)` tablet → `1fr` mobile. Each `ProjectCard.tsx` (server): `aspect-ratio: 3/4`, cover image `alt={project.coverImageAlt}`. Hover: dark overlay `0→0.5`, white text title Inter 700 `24px` all-caps tracking `0.1em` + type label Inter `11px` muted — `opacity: 0→1` on hover. `prefers-reduced-motion`: show overlay always, no transition. Zero gap between cards (grid gap `1px solid var(--color-border)`).
  Files: `src/app/page.tsx`, `src/components/gallery/ProjectCard.tsx`

---

## Phase 2 — Project View

---

- [ ] **TASK-007** | Est: 1.5h
  **Project detail page**
  Full-bleed immersive photo series viewer.

  Acceptance: `app/projects/[slug]/page.tsx`. `generateStaticParams()` from `projects.ts`. `notFound()` for unknown slug. Layout: `padding: 0` (full-bleed). `FullBleedMedia.tsx` (server): `<img>` full viewport width, `loading="lazy"`, `alt={media.imageAlt}`. `DiptychGrid.tsx` (server): side-by-side grid for diptych pairs — `grid-template-columns: 1fr 1fr`, no gap. `ProjectNarrative.tsx` (server): white caption `14px` weight 400 centered `max-w-[600px]` — not a sidebar. Server Component.
  Files: `src/app/projects/[slug]/page.tsx`, `src/components/project/FullBleedMedia.tsx`, `src/components/project/DiptychGrid.tsx`, `src/components/project/ProjectNarrative.tsx`

---

## Phase 3 — Motion and Shop

---

- [ ] **TASK-008** | Est: 1.5h
  **VideoLoop + TheaterModal**
  Motion reel with full-screen theater mode.

  Acceptance: `VideoLoop.tsx` (server): `<video autoPlay muted loop playsInline poster={posterSrc}>`. Poster loads immediately — no layout shift. `prefers-reduced-motion`: render poster `<img>` only, no video. `TheaterModal.tsx` is `'use client'`: triggered by click, `position: fixed; inset: 0` black bg. Framer `opacity 0→1`. `role="dialog"` with `aria-modal="true"`. Escape key closes. Focus trapped inside.
  Files: `src/components/motion/VideoLoop.tsx`, `src/components/motion/TheaterModal.tsx`

---

- [ ] **TASK-009** | Est: 45m
  **PrintShop**
  Minimal fine-art print storefront.

  Acceptance: `app/shop/page.tsx`. CSS Grid `repeat(3,1fr)` desktop. `PrintCard.tsx` (server): image `alt={print.imageAlt}`, title Inter `24px` all-caps, edition label `11px` muted, price `14px` white. "Inquire →" link — no cart, no add-to-cart, no checkout. Server Component.
  Files: `src/app/shop/page.tsx`, `src/components/shop/PrintCard.tsx`

---

## Phase 4 — QA

---

- [ ] **TASK-010** | Est: 1h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== Zero border-radius ===" && \
    grep -r "rounded\|border-radius: [1-9]" src --include="*.tsx" \
    && echo "FAIL — 0px radius only" || echo "PASS"

  echo "=== No white backgrounds ===" && \
    grep -r "bg-white\|background.*#fff\|background: white" src/components --include="*.tsx" \
    && echo "FAIL — dark mode only" || echo "PASS"

  echo "=== VideoLoop has muted and playsInline ===" && \
    grep -r "muted\|playsInline" src/components/motion/VideoLoop.tsx && echo "PASS" || echo "FAIL"

  echo "=== VideoLoop has poster ===" && \
    grep -r "poster=" src/components/motion/VideoLoop.tsx && echo "PASS" || echo "FAIL"

  echo "=== TheaterModal has aria-modal ===" && \
    grep -r "aria-modal" src/components/motion/TheaterModal.tsx && echo "PASS" || echo "FAIL"

  echo "=== MinimalNav is use client ===" && \
    grep -r "'use client'" src/components/layout/MinimalNav.tsx && echo "PASS" || echo "FAIL"

  echo "=== No Add to Cart in shop ===" && \
    grep -r "Add to Cart\|addToCart\|cart" src/app/shop --include="*.tsx" \
    && echo "FAIL — inquiry only, no cart" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
