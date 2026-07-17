# 06 — Tasks
## Global Luxury Wedding Photographer · pcpp_platform_06

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
  Minimalist luxury — white + near-black. Zero decorative color; structure through spacing.

  ```css
  --color-bg:       #FFFFFF;
  --color-surface:  #F9F9F9;
  --color-border:   #1A1A1A;
  --color-ink:      #1A1A1A;
  --color-muted:    #757575;

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

  Acceptance: Body bg `#FFFFFF`. Zero border-radius globally. `grep -r "rounded\|border-radius: [1-9]" src --include="*.tsx"` → empty.
  Files: `src/app/globals.css`

---

- [ ] **TASK-003** | Est: 45m
  **TypeScript types**
  All domain types exported. `tsc --noEmit` exits 0.

  ```typescript
  export interface WeddingStory {
    id: string; slug: string; title: string
    coupleName: string; location: string; year: number
    coverSrc: string; coverAlt: string
    excerpt: string; aspectRatio: 'portrait' | 'landscape'
  }

  export interface Workshop {
    id: string; title: string; type: 'conference' | 'masterclass' | 'mentorship'
    date: string; location: string; registrationUrl: string
  }
  ```

  Files: `src/types/index.ts`

---

- [ ] **TASK-004** | Est: 30m
  **Static data files**
  Mock data for all sections.

  Acceptance: `weddings.ts` exports 8 `WeddingStory` objects — mix of portrait and landscape aspectRatio. `workshops.ts` exports 4 `Workshop` objects across all 3 type values. `tsc --noEmit` clean.
  Files: `src/lib/weddings.ts`, `src/lib/workshops.ts`

---

## Phase 1 — Navigation

---

- [ ] **TASK-005** | Est: 1h
  **IconicNav**
  Fashion-magazine minimal nav. Wide-tracked caps links.

  Acceptance: Top-bar `position: fixed; top: 0; width: 100%`. `background: rgba(255,255,255,0.97)`. Logo left: Montserrat 500 `14px` tracking `0.15em` uppercase. Links: Work, Journal, Workshops, Press, About — `14px` tracking `0.15em` uppercase `color: var(--color-muted)`. Active: `color: var(--color-ink)`. On scroll: `1px solid var(--color-border)` bottom. `aria-label="Main navigation"`. Server Component.
  Files: `src/components/layout/IconicNav.tsx`

---

## Phase 2 — Masonry Gallery

---

- [ ] **TASK-006** | Est: 2h
  **MasonryGrid + Work detail**
  Editorial masonry with varied aspect-ratio cards.

  Acceptance: `app/page.tsx`. `MasonryGrid.tsx` (server): CSS `columns: 3` desktop → `columns: 2` tablet → `columns: 1` mobile. `column-gap: 24px`. Each `WorkCard.tsx` (server): `break-inside: avoid; margin-bottom: 24px`. `<img alt={work.coverImageAlt}>` — `aspect-ratio: {work.coverAspectRatio}`, `object-fit: cover`. On hover: `WorkOverlay.tsx` is `'use client'`: `opacity: 0→1` `400ms`. Overlay: white title Montserrat 600 `20px`, location `12px` muted. `prefers-reduced-motion`: overlay always visible. `0px` border-radius (enforced globally). Work detail: `app/work/[slug]/page.tsx`. `generateStaticParams()`. Full-bleed cover. Images below in single column. `notFound()`.
  Files: `src/app/page.tsx`, `src/app/work/[slug]/page.tsx`, `src/components/gallery/MasonryGrid.tsx`, `src/components/gallery/WorkCard.tsx`, `src/components/gallery/WorkOverlay.tsx`

---

## Phase 3 — Education Hub

---

- [ ] **TASK-007** | Est: 1.5h
  **Education Hub**
  Workshops, conferences, and masterclasses.

  Acceptance: `app/workshops/page.tsx`. `EventFilterBar.tsx` is `'use client'`: filter by `type` — Conference, Workshop, Masterclass. `aria-pressed` on active filter. `EventCard.tsx` (server): date Inter Mono `14px` muted, title Montserrat 600 `18px`, location `14px` muted, description `14px`. "Register →" `<a href={event.registrationUrl} rel="noopener noreferrer">` — plain link, NOT a button with bg. `1px solid var(--color-border)` card border. Server Component wrapper.
  Files: `src/app/workshops/page.tsx`, `src/components/education/EventFilterBar.tsx`, `src/components/education/EventCard.tsx`

---

## Phase 4 — Journal and Press

---

- [ ] **TASK-008** | Est: 1h
  **Journal — narrative blog**
  Long-scroll editorial storytelling.

  Acceptance: `app/journal/page.tsx`. Journal entries list: `JournalCard.tsx` (server): cover image `aspect-ratio: 16/9`, title Montserrat 600 `24px`, date `12px` muted, excerpt `16px` muted. `app/journal/[slug]/page.tsx`: `generateStaticParams()`. Reading container `max-width: 700px` centered. Body text `18px` leading 1.6. `120px–180px` vertical section margins. `notFound()`. Server Component.
  Files: `src/app/journal/page.tsx`, `src/app/journal/[slug]/page.tsx`, `src/components/journal/JournalCard.tsx`

---

- [ ] **TASK-009** | Est: 45m
  **Press strip + Sony Ambassador badge**
  Prestige recognition section.

  Acceptance: `PressStrip.tsx` (server): `<ul role="list">` horizontal row of press logos. Each `<li>`: logo `<img alt={press.logoAlt}>` grayscale CSS filter `filter: grayscale(1)`. Hover: `filter: grayscale(0)` `300ms`. `prefers-reduced-motion`: no filter transition. "Sony Global Ambassador" badge: `<aside>` — text only, no logo (avoid brand IP). Plain text "Sony Global Ambassador" Inter 600 `16px`. NO raster brand logos for Sony. Server Component.
  Files: `src/components/home/PressStrip.tsx`

---

## Phase 5 — QA

---

- [ ] **TASK-010** | Est: 1h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== Zero border-radius ===" && \
    grep -r "rounded\|border-radius: [1-9]" src --include="*.tsx" \
    && echo "FAIL — 0px radius only" || echo "PASS"

  echo "=== No white backgrounds in components ===" && \
    grep -r "bg-white\|background.*#fff\|background: white" src/components --include="*.tsx" \
    && echo "REVIEW — verify intentional" || echo "PASS"

  echo "=== WorkOverlay is use client ===" && \
    grep -r "'use client'" src/components/gallery/WorkOverlay.tsx && echo "PASS" || echo "FAIL"

  echo "=== WorkOverlay handles reduced motion ===" && \
    grep -r "useReducedMotion\|reducedMotion" src/components/gallery/WorkOverlay.tsx \
    && echo "PASS" || echo "FAIL"

  echo "=== EventFilterBar has aria-pressed ===" && \
    grep -r "aria-pressed" src/components/education/EventFilterBar.tsx && echo "PASS" || echo "FAIL"

  echo "=== generateStaticParams in work page ===" && \
    grep -r "generateStaticParams" src/app/work --include="*.tsx" && echo "PASS" || echo "FAIL"

  echo "=== No hex in component files ===" && \
    grep -r "#[0-9A-Fa-f]\{3,6\}" src/components --include="*.tsx" \
    && echo "FAIL — use CSS variables" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
