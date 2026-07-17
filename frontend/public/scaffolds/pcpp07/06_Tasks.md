# 06 — Tasks
## International Destination Wedding Photographer · pcpp_platform_07

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
  Atmospheric minimalism — white base, stone-grey accents, nature-inspired neutral palette.

  ```css
  --color-bg:       #FFFFFF;
  --color-surface:  #F8F8F8;
  --color-border:   #E5E5E5;
  --color-ink:      #1A1A1A;
  --color-muted:    #6B7280;
  --color-stone:    #E5E5E5;

  body { background: var(--color-bg); color: var(--color-ink); }

  :focus-visible {
    outline: 1px solid var(--color-ink);
    outline-offset: 2px;
  }

  .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
  }
  ```

  Acceptance: Body bg `#FFFFFF`. Stone-grey palette — no bright accent colors. `grep -r "color-accent\|#FF\|#00" src/app/globals.css` → empty.
  Files: `src/app/globals.css`

---

- [ ] **TASK-003** | Est: 45m
  **TypeScript types**
  All domain types exported. `tsc --noEmit` exits 0.

  ```typescript
  export type TimeOfDay = 'preparation' | 'ceremony' | 'portraits' | 'reception' | 'night'

  export interface WeddingStory {
    id: string; slug: string; title: string
    location: string; country: string; date: string
    coverSrc: string; coverAlt: string; excerpt: string
    chapters: { time: TimeOfDay; images: { src: string; alt: string }[] }[]
  }

  export interface InquiryFormData {
    name: string; email: string; destination: string
    weddingDate: string; vision: string
  }
  ```

  Files: `src/types/index.ts`

---

- [ ] **TASK-004** | Est: 30m
  **Static data files**
  Mock data for all sections.

  Acceptance: `weddings.ts` exports 6 `WeddingStory` objects — each with chapters array covering at least 3 `TimeOfDay` values. `tsc --noEmit` clean.
  Files: `src/lib/weddings.ts`

---

## Phase 1 — Navigation

---

- [ ] **TASK-005** | Est: 1h
  **AeroNav**
  Minimalist atmospheric top-bar — serif logo, stone-grey links.

  Acceptance: Top-bar `position: fixed; top: 0; width: 100%`. Transparent until scroll, then `background: rgba(255,255,255,0.96)`. Logo left: Garamond (or similar serif) `18px` weight 500 — NOT all-caps, NOT bold. Links: Stories, Destinations, About, Inquire — Inter `14px` `color: var(--color-muted)`. Active: `color: var(--color-ink)`. On scroll: `1px solid var(--color-stone)` bottom. `aria-label="Main navigation"`. Server Component.
  Files: `src/components/layout/AeroNav.tsx`

---

## Phase 2 — Landscape Heroes

---

- [ ] **TASK-006** | Est: 1.5h
  **Full-bleed landscape hero + destination grid**
  Grand scale homepage entry.

  Acceptance: `app/page.tsx`. Hero: `height: 100svh`. `<img alt={featuredStory.heroImageAlt}>` `object-fit: cover` full bleed. Overlay text centered bottom: Garamond `clamp(28px,3.5vw,48px)` weight 500 white, location `11px` uppercase tracking `0.1em` `color: var(--color-stone)`. Below hero: `DestinationGrid.tsx` (server): CSS Grid `repeat(4,1fr)` desktop → `repeat(2,1fr)` mobile. Gap `8px`. Each `DestinationTile.tsx` (server): `aspect-ratio: 3/2`, `<img alt={destination.coverImageAlt}>`, overlay with name `12px` uppercase tracking `0.1em` white, count `11px` muted. `0px` border-radius. Server Component.
  Files: `src/app/page.tsx`, `src/components/home/DestinationGrid.tsx`, `src/components/home/DestinationTile.tsx`

---

- [ ] **TASK-007** | Est: 2h
  **Wedding story — time-of-day chronology**
  Narrative sequence organized by time of day.

  Acceptance: `app/stories/[slug]/page.tsx`. `generateStaticParams()`. `notFound()`. Hero: full viewport-width `<img alt={story.heroImageAlt}>` `height: 80svh`. Story title Garamond `clamp(28px,3.5vw,48px)` below. Location `11px` uppercase muted. `TimeOfDaySection.tsx` (server): groups `StoryImage[]` by `timeOfDay`. Each group: `TimeMarker` — `1px solid var(--color-stone)` horizontal line + label `11px` uppercase `color: var(--color-muted)` bold tracking `0.1em`. Images: CSS Grid `repeat(2,1fr)` gap `8px`. Each `<img alt={image.imageAlt}>`. If `caption`: `<figcaption>` `11px` uppercase tracking `0.1em` muted centered. `140px` gap between time-of-day sections. Container `max-width: 1600px`.
  Files: `src/app/stories/[slug]/page.tsx`, `src/components/story/TimeOfDaySection.tsx`

---

## Phase 3 — Pilot Bio and Gear

---

- [ ] **TASK-008** | Est: 1h
  **Pilot bio section**
  Technical background narrative — aviation to photography.

  Acceptance: `app/about/page.tsx`. Two-column layout desktop: text left `max-width: 600px`, portrait image right. Text: Garamond `clamp(28px,3vw,40px)` heading. Body Inter 400 `15px` leading 1.7. `"Pilot → Photographer"` label: `11px` uppercase tracking `0.1em` muted. Section `padding: 140px 0`. `1px solid var(--color-stone)` divider between bio and gear. Server Component.
  Files: `src/app/about/page.tsx`

---

- [ ] **TASK-009** | Est: 45m
  **Gear table**
  Technical kit list in monospace.

  Acceptance: `GearTable.tsx` (server): `<table>` with `<caption>` per category group. `<th scope="row">` on name column. `font-family: 'JetBrains Mono', monospace` for specs column. `14px` muted for notes. `1px solid var(--color-stone)` row separators. `0px` border-radius on table. Fujifilm Ambassador mention: plain text "Fujifilm X Ambassador" Inter 600 `14px` — NO brand logo image. Server Component.
  Files: `src/components/about/GearTable.tsx`

---

## Phase 4 — QA

---

- [ ] **TASK-010** | Est: 1h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== No bright accent colors ===" && \
    grep -r "color-accent\|#FF[0-9]\|#00[0-9]" src/app/globals.css \
    && echo "FAIL — stone-grey palette only" || echo "PASS"

  echo "=== No white backgrounds in components ===" && \
    grep -r "bg-white\|background.*#fff\|background: white" src/components --include="*.tsx" \
    && echo "REVIEW — verify intentional" || echo "PASS"

  echo "=== generateStaticParams in story page ===" && \
    grep -r "generateStaticParams" src/app/stories --include="*.tsx" && echo "PASS" || echo "FAIL"

  echo "=== TimeOfDaySection groups by timeOfDay ===" && \
    grep -r "timeOfDay\|TimeOfDay" src/components/story --include="*.tsx" \
    && echo "PASS" || echo "FAIL"

  echo "=== GearTable has scope attributes ===" && \
    grep -r "scope=" src/components/about/GearTable.tsx && echo "PASS" || echo "FAIL"

  echo "=== Hero images have alt text ===" && \
    grep -r "heroImageAlt\|imageAlt" src/app --include="*.tsx" \
    && echo "PASS" || echo "FAIL"

  echo "=== No hex in component files ===" && \
    grep -r "#[0-9A-Fa-f]\{3,6\}" src/components --include="*.tsx" \
    && echo "FAIL — use CSS variables" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
