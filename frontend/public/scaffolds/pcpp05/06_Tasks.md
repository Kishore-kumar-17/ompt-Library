# 06 — Tasks
## Indian Wedding Photography & Films · pcpp_platform_05

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
  Modern royalty — white base with antique gold and deep maroon accents.

  ```css
  --color-bg:       #FFFFFF;
  --color-surface:  #FAFAFA;
  --color-border:   #E8E8E8;
  --color-ink:      #1A1A1A;
  --color-muted:    #757575;
  --color-gold:     #B59410;
  --color-maroon:   #7D0A0A;
  --color-theater:  #000000;

  body { background: var(--color-bg); color: var(--color-ink); }

  :focus-visible {
    outline: 2px solid var(--color-gold);
    outline-offset: 2px;
  }

  .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
  }
  ```

  Acceptance: All variables in DevTools. `grep -r "bg-yellow\|#FFD700\|#gold" src/components --include="*.tsx"` → empty (use CSS variables only).
  Files: `src/app/globals.css`

---

- [ ] **TASK-003** | Est: 45m
  **TypeScript types**
  All domain types exported. `tsc --noEmit` exits 0.

  ```typescript
  export interface WeddingStory {
    id: string; slug: string; title: string
    chapterNumber: number; date: string
    venue: string; venueCity: string; excerpt: string
    posterSrc: string; posterAlt: string
    coverVideoUrl?: string
    photos: { src: string; alt: string }[]
    isCelebrity?: boolean
  }

  export interface InquiryFormData {
    partner1: string; partner2: string
    weddingDate: string; venueCity: string
    story: string; email: string; phone: string
  }
  ```

  Files: `src/types/index.ts`

---

- [ ] **TASK-004** | Est: 30m
  **Static data files**
  Mock data for all sections.

  Acceptance: `weddings.ts` exports 8 `WeddingStory` objects — at least 2 with `isCelebrity: true`, at least 2 with `coverVideoUrl`. `tsc --noEmit` clean.
  Files: `src/lib/weddings.ts`

---

## Phase 1 — Navigation

---

- [ ] **TASK-005** | Est: 1h
  **RoyalNav**
  Centered logo, minimalist links, gold focus ring.

  Acceptance: Top-bar `position: fixed; top: 0; width: 100%`. `background: rgba(255,255,255,0.95); backdrop-filter: blur(8px)`. Logo center: Playfair Display 600 `20px` — serif, NOT all-caps. Links left: Stories, Films. Links right: About, Inquire. `14px` Inter 400. "Inquire" link: `color: var(--color-gold)`. On scroll: `1px solid var(--color-border)` bottom appears. `aria-label="Main navigation"`. Server Component.
  Files: `src/components/layout/RoyalNav.tsx`

---

## Phase 2 — Hero and Stories

---

- [ ] **TASK-006** | Est: 1.5h
  **CinematicHero**
  Full-screen muted auto-playing video with poster.

  Acceptance: `VideoHero.tsx` (server): `<video autoPlay muted loop playsInline poster={posterSrc}>`. Poster `<img>` loads immediately — no layout shift. `height: 100svh`. Overlay: `background: linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.6))`. Over overlay: serif display headline Playfair Display 600 `clamp(36px,5vw,64px)` white centered. `prefers-reduced-motion`: render poster `<img>` only — NO video element. `aria-label="Wedding highlights reel"` on video. Server Component.
  Files: `src/components/home/VideoHero.tsx`

---

- [ ] **TASK-007** | Est: 1.5h
  **StoryBook feed — wedding chapters**
  Chronological wedding story feed.

  Acceptance: `app/page.tsx`. Each `ChapterCard.tsx` (server): full-bleed cover `aspect-ratio: 16/9` `<img alt={story.coverImageAlt}>`. Chapter title Playfair Display 500 `28px`. Couple name Playfair Display `20px` muted. Narrative intro Inter 400 `16px` leading 1.7 `max-width: 640px`. If `isCelebrity`: "Celebrity Wedding" label — `border: 1px solid var(--color-gold)` `11px` uppercase `color: var(--color-gold)`. `0px` border-radius. `120px` gap between chapters. Server Component.
  Files: `src/app/page.tsx`, `src/components/stories/ChapterCard.tsx`

---

- [ ] **TASK-008** | Est: 2h
  **Wedding story page — film + photo sequence**
  Immersive single-wedding narrative page.

  Acceptance: `app/stories/[slug]/page.tsx`. `generateStaticParams()`. `notFound()` for unknown slug. `AlternatingMediaBlock.tsx` (server): renders `StoryMedia[]`:
  - `type: 'photo'` and NOT `isDiptych`: full-bleed `<img alt={media.imageAlt}>` width 100%.
  - `isDiptych: true`: CSS Grid `1fr 1fr` gap `8px`.
  - `type: 'film_trailer'`: renders `TrailerCard.tsx` with poster image + play button overlay. Play button: `aria-label="Play wedding trailer"`. Caption if present: `<figcaption>` Inter `14px` centered muted. `CinemaModal.tsx` is `'use client'`: `position: fixed; inset: 0; background: var(--color-theater)`. Framer `opacity 0→1 300ms`. `role="dialog"` `aria-modal="true"` `aria-label="Wedding film"`. Escape closes. Focus trapped. `directorNote` if present: `16px` italic white centered `max-width: 500px`.
  Files: `src/app/stories/[slug]/page.tsx`, `src/components/stories/AlternatingMediaBlock.tsx`, `src/components/stories/TrailerCard.tsx`, `src/components/stories/CinemaModal.tsx`

---

## Phase 3 — Inquiry

---

- [ ] **TASK-009** | Est: 1h
  **Inquiry form — "Your Story"**
  Sophisticated lead form. No booking engine, no payment.

  Acceptance: `app/inquire/page.tsx`. Heading Playfair Display 600 `clamp(28px,4vw,48px)`. Subheading Inter 400 `18px` muted. Form renders `InquiryField[]` from data: `<label>` + `<input>` or `<textarea>`. `InquiryForm.tsx` is `'use client'`: `onSubmit` prevents default, shows `<div role="status">` "Thank you — we'll be in touch" on success. `border-bottom: 1px solid var(--color-border)` on inputs — NO border box style. `0px` border-radius. `required` fields: `aria-required="true"`. No actual API call needed — mock success state only.
  Files: `src/app/inquire/page.tsx`, `src/components/inquiry/InquiryForm.tsx`

---

## Phase 4 — QA

---

- [ ] **TASK-010** | Est: 1h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== VideoHero has muted and playsInline ===" && \
    grep -r "muted\|playsInline" src/components/home/VideoHero.tsx && echo "PASS" || echo "FAIL"

  echo "=== VideoHero has poster ===" && \
    grep -r "poster=" src/components/home/VideoHero.tsx && echo "PASS" || echo "FAIL"

  echo "=== VideoHero handles reduced motion ===" && \
    grep -r "prefers-reduced-motion\|useReducedMotion\|reducedMotion" src/components/home/VideoHero.tsx \
    && echo "PASS" || echo "FAIL"

  echo "=== CinemaModal has aria-modal ===" && \
    grep -r "aria-modal" src/components/stories/CinemaModal.tsx && echo "PASS" || echo "FAIL"

  echo "=== CinemaModal is use client ===" && \
    grep -r "'use client'" src/components/stories/CinemaModal.tsx && echo "PASS" || echo "FAIL"

  echo "=== InquiryForm is use client ===" && \
    grep -r "'use client'" src/components/inquiry/InquiryForm.tsx && echo "PASS" || echo "FAIL"

  echo "=== No hex in component files ===" && \
    grep -r "#[0-9A-Fa-f]\{3,6\}" src/components --include="*.tsx" \
    && echo "FAIL — use CSS variables" || echo "PASS"

  echo "=== No checkout or payment in inquiry ===" && \
    grep -r "checkout\|payment\|cart\|stripe" src/app/inquire --include="*.tsx" \
    && echo "FAIL — inquiry only" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
