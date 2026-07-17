# 06 — Tasks
## Indian Editorial Photographer with Project-Led Structure · pcpp_platform_04

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
  Academic white — pure white with near-black type. Zero decorative color.

  ```css
  --color-bg:       #FFFFFF;
  --color-surface:  #F5F5F5;
  --color-border:   #1A1A1A;
  --color-ink:      #1A1A1A;
  --color-muted:    #555555;

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

  Acceptance: Body bg is `#FFFFFF`. Academic white only — no accent color. `grep -r "accent" src/app/globals.css` → empty.
  Files: `src/app/globals.css`

---

- [ ] **TASK-003** | Est: 45m
  **TypeScript types**
  All domain types exported. `tsc --noEmit` exits 0.

  ```typescript
  export type BlockType = 'full' | 'diptych' | 'triptych' | 'prose'

  export interface StoryBlock {
    type: BlockType
    images?: { src: string; alt: string }[]
    prose?: string
  }

  export interface Project {
    id: string; slug: string; title: string
    descriptor: string; year: number
    coverSrc: string; coverAlt: string
    essayBlocks: StoryBlock[]
    pressLinks?: { title: string; url: string; publication: string }[]
  }
  ```

  Files: `src/types/index.ts`

---

- [ ] **TASK-004** | Est: 30m
  **Static data files**
  Mock data for all sections.

  Acceptance: `projects.ts` exports 6 `Project` objects with varied `essayBlocks` arrays — at least 2 with diptych blocks, 1 with triptych, 1 with pressLinks. `tsc --noEmit` clean.
  Files: `src/lib/projects.ts`

---

## Phase 1 — Navigation

---

- [ ] **TASK-005** | Est: 1h
  **UniverseNav**
  Minimal top-bar with project universe switching.

  Acceptance: Top-bar `position: sticky; top: 0`. `background: var(--color-bg)`. `1px solid var(--color-border)` bottom. Wordmark left: Inter 800 `18px` — heavy, tight tracking `-0.02em`. Links: Work, Essays, Press, About. `12px` uppercase tracking `0.15em`. `aria-label="Main navigation"` on `<nav>`. Server Component.
  Files: `src/components/layout/UniverseNav.tsx`

---

## Phase 2 — Universe Hub

---

- [ ] **TASK-006** | Est: 1.5h
  **UniverseHub — project portal grid**
  Central hub directing to distinct project "planets."

  Acceptance: `app/page.tsx`. CSS Grid `repeat(2,1fr)` desktop → `1fr` mobile. Gap `48px`. Each `ProjectPortalCard.tsx` (server): cover image `alt={project.coverImageAlt}` — full card width `aspect-ratio: 3/2`. Title Inter 800 `32px` tracking `-0.02em` below image. Tagline Inter 400 `18px` leading 1.8 muted `max-width: 600px`. Year + location `12px` uppercase muted. `FeaturedTag` if `isFeatured`: plain text label "Featured Work" `11px` uppercase border `1px solid var(--color-ink)` — NOT a badge with background fill. `0px` border-radius. Server Component.
  Files: `src/app/page.tsx`, `src/components/universe/ProjectPortalCard.tsx`

---

- [ ] **TASK-007** | Est: 2h
  **Project deep-dive — narrative sequencing**
  Immersive project page with essay + image sequence.

  Acceptance: `app/projects/[slug]/page.tsx`. `generateStaticParams()`. `notFound()` for unknown slug. Layout: full-bleed. `ProjectJourneySidebar.tsx` (server): sticky left sidebar `240px`. Links: "The Essay," "The Series," "The Press" — smooth scroll anchors `<a href="#essay">` etc. `SequenceBlock.tsx` (server): renders `ProjectImage[]` by `layout`:
  - `single`: full viewport width `<img>`
  - `pair`: CSS Grid `1fr 1fr` gap `16px`
  - `triptych`: CSS Grid `1fr 1fr 1fr` gap `8px`
  All: `alt={image.imageAlt}`. If `caption`: `<figcaption>` `14px` muted centered. Container `max-width: 1100px` for images, `max-width: 700px` for essay text. Essay: Inter 400 `18px` leading 1.8. `120px–160px` vertical padding between sequence blocks. `0px` border-radius.
  Files: `src/app/projects/[slug]/page.tsx`, `src/components/project/ProjectJourneySidebar.tsx`, `src/components/project/SequenceBlock.tsx`

---

## Phase 3 — Press Archive

---

- [ ] **TASK-008** | Est: 1h
  **Press archive page**
  Recognition and publication features.

  Acceptance: `app/press/page.tsx`. Heading Inter 800 `32px`. Press entries as `<ul>` list — each `PressEntry.tsx` (server): publication name Inter 700 `16px`, headline Inter 400 `16px` muted, year `12px` uppercase. `<a href={entry.url} rel="noopener noreferrer">` link on headline. `1px solid var(--color-border)` bottom separator per entry. No cards — plain list only. Server Component.
  Files: `src/app/press/page.tsx`, `src/components/press/PressEntry.tsx`

---

- [ ] **TASK-009** | Est: 1h
  **StoryProgress indicator + BackToTop**
  Reading progress for long essay pages.

  Acceptance: `StoryProgress.tsx` is `'use client'`: `position: fixed; top: 0; left: 0; height: 2px; background: var(--color-ink)`. Width tracks `window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100%`. `aria-hidden="true"` — decorative only. `BackToTop.tsx` is `'use client'`: appears when `scrollY > 600`. `<button>` fixed bottom-right `aria-label="Back to top"`. Click: `window.scrollTo({ top: 0, behavior: 'smooth' })`. `prefers-reduced-motion`: `behavior: 'instant'`. `1px solid var(--color-ink)` border, `0px` radius.
  Files: `src/components/ui/StoryProgress.tsx`, `src/components/ui/BackToTop.tsx`

---

## Phase 4 — QA

---

- [ ] **TASK-010** | Est: 1h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== No accent colors ===" && \
    grep -r "color-accent\|blue\|red\|green" src/app/globals.css \
    && echo "FAIL — academic white only" || echo "PASS"

  echo "=== No white backgrounds in components ===" && \
    grep -r "bg-white\|background.*#fff\|background: white" src/components --include="*.tsx" \
    && echo "REVIEW — verify intentional" || echo "PASS"

  echo "=== SequenceBlock renders all layout types ===" && \
    grep -r "single\|pair\|triptych" src/components/project/SequenceBlock.tsx \
    && echo "PASS" || echo "FAIL"

  echo "=== generateStaticParams in project page ===" && \
    grep -r "generateStaticParams" src/app/projects --include="*.tsx" && echo "PASS" || echo "FAIL"

  echo "=== StoryProgress is aria-hidden ===" && \
    grep -r "aria-hidden" src/components/ui/StoryProgress.tsx && echo "PASS" || echo "FAIL"

  echo "=== BackToTop is use client ===" && \
    grep -r "'use client'" src/components/ui/BackToTop.tsx && echo "PASS" || echo "FAIL"

  echo "=== Press links have rel noopener ===" && \
    grep -r "rel.*noopener" src/components/press --include="*.tsx" \
    && echo "PASS" || echo "FAIL"

  echo "=== No hex in component files ===" && \
    grep -r "#[0-9A-Fa-f]\{3,6\}" src/components --include="*.tsx" \
    && echo "FAIL — use CSS variables" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
