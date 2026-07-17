# 06 — Tasks
## Personal Site + Newsletter + Courses · pcpp_platform_16

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
  Minimalist builder aesthetic — white, deep slate, black CTA. `4px` radius.

  ```css
  --color-bg:       #FFFFFF;
  --color-surface:  #F3F4F6;
  --color-border:   #E5E7EB;
  --color-ink:      #111827;
  --color-muted:    #6B7280;
  --color-code-bg:  #F3F4F6;

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

  Acceptance: Body bg `#FFFFFF`. Zero decorative color — black-only accent. `grep -r "color-accent" src/app/globals.css` → empty (black ink IS the accent).
  Files: `src/app/globals.css`

---

- [ ] **TASK-003** | Est: 45m
  **TypeScript types**
  All domain types exported. `tsc --noEmit` exits 0.

  ```typescript
  export type NoteCategory = 'business' | 'biohacking' | 'philosophy' | 'productivity' | 'ai'

  export interface BookNote {
    slug: string; title: string; author: string
    date: string
    category: NoteCategory; rating: number
    coverSrc: string; coverAlt: string
    topTakeaways: [string, string, string]
    published: boolean
  }

  export interface Course {
    slug: string; title: string; tagline: string
    modules: { title: string; lessons: string[] }[]
    stripePortalUrl: string
    testimonialPosterSrc?: string
  }
  ```

  Files: `src/types/index.ts`

---

- [ ] **TASK-004** | Est: 30m
  **Static data files**
  Mock data for all sections.

  Acceptance: `bookNotes.ts` exports 12 `BookNote` objects across all 5 `NoteCategory` values. `courses.ts` exports 3 `Course` objects each with 4+ modules. `tsc --noEmit` clean.
  Files: `src/lib/bookNotes.ts`, `src/lib/courses.ts`

---

## Phase 1 — Navigation and Search

---

- [ ] **TASK-005** | Est: 1.5h
  **MinimalNav + SearchModal**
  Clean navigation with full-text search.

  Acceptance: `MinimalNav.tsx` (server): `position: sticky; top: 0`. `background: var(--color-bg)`. `1px solid var(--color-border)` bottom. Name left Inter 600 `16px`. Links: Books, Courses, About — `14px` muted. Search icon `<button aria-label="Open search">`. `SearchModal.tsx` is `'use client'`: `position: fixed; inset: 0`. `<input type="search" aria-label="Search books and courses">` autofocused on open. Searches `bookNotes` array client-side (simple `filter` — no external search API needed for static build). Results list: title + category `14px`. Escape closes. Focus trapped. `role="dialog"` `aria-modal="true"`.
  Files: `src/components/layout/MinimalNav.tsx`, `src/components/ui/SearchModal.tsx`

---

## Phase 2 — Content Feed

---

- [ ] **TASK-006** | Est: 1.5h
  **Digital Garden index — articles and notes feed**
  Search-centric homepage content grid.

  Acceptance: `app/page.tsx`. `CategoryFilter.tsx` is `'use client'`: filter by `NoteCategory` — `aria-pressed` on active. `BookNoteGrid.tsx` (server): CSS Grid `repeat(3,1fr)` desktop → `repeat(2,1fr)` tablet → `1fr` mobile. Gap `32px`. `BookNoteCard.tsx` (server): category `12px` uppercase muted, title Inter 600 `18px`, author `14px` muted, date `12px` muted. `background: var(--color-bg)`. `4px` radius. `1px solid var(--color-border)`. Server Component wrapper.
  Files: `src/app/page.tsx`, `src/components/home/CategoryFilter.tsx`, `src/components/home/BookNoteCard.tsx`

---

- [ ] **TASK-007** | Est: 1.5h
  **Book notes — structured summary pages**
  Book summaries with takeaways and affiliate links.

  Acceptance: `app/books/page.tsx`. Grid `repeat(4,1fr)` desktop → `repeat(2,1fr)` mobile. `BookNoteCard.tsx` (server): cover `<img src={note.coverSrc} alt={note.coverAlt}>` `aspect-ratio: 2/3`. Title Inter 600 `16px`. Author `13px` muted. Rating `12px` (number only, e.g., "4/5" text — NOT SVG stars). `app/books/[slug]/page.tsx`: `generateStaticParams()`. `notFound()`. Title Inter 700 `28px`. Category `12px` uppercase muted. `TopTakeaways.tsx` (server): `<ol>` numbered list Inter `16px` — renders tuple (3 items always). `prefers-reduced-motion`: no animation. Server Component.
  Files: `src/app/books/page.tsx`, `src/app/books/[slug]/page.tsx`, `src/components/books/BookNoteCard.tsx`, `src/components/books/TopTakeaways.tsx`

---

## Phase 3 — Courses

---

- [ ] **TASK-008** | Est: 1h
  **Course landing pages**
  Featured course pages with external enrollment links.

  Acceptance: `app/courses/page.tsx`. Each `CourseCard.tsx` (server): title Inter 700 `24px`, tagline `16px` muted, modules count `13px` muted. "Enroll →" `<a href={course.stripePortalUrl} rel="noopener noreferrer">` — black bg `4px` radius — external link. NEVER render checkout or payment inline. If `testimonialPosterSrc`: testimonial poster `<img>`. `app/courses/[slug]/page.tsx`: `generateStaticParams()`. Full modules list with lessons `<ol>`. Server Component.
  Files: `src/app/courses/page.tsx`, `src/app/courses/[slug]/page.tsx`, `src/components/courses/CourseCard.tsx`

---

## Phase 4 — QA

---

- [ ] **TASK-009** | Est: 1h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== SearchModal is use client ===" && \
    grep -r "'use client'" src/components/ui/SearchModal.tsx && echo "PASS" || echo "FAIL"

  echo "=== SearchModal has role=dialog ===" && \
    grep -r "role.*dialog\|aria-modal" src/components/ui/SearchModal.tsx && echo "PASS" || echo "FAIL"

  echo "=== BookNote uses category not genre ===" && \
    grep -r "category:" src/lib/bookNotes.ts && echo "PASS" || echo "FAIL"

  echo "=== BookNote uses title not bookTitle ===" && \
    grep -r "title:" src/lib/bookNotes.ts && echo "PASS" || echo "FAIL"

  echo "=== No payment form in courses ===" && \
    grep -r "stripe\|checkout\|CardElement\|payment" src/app/courses --include="*.tsx" \
    && echo "FAIL — external link only" || echo "PASS"

  echo "=== CategoryFilter has aria-pressed ===" && \
    grep -r "aria-pressed" src/components/home/CategoryFilter.tsx && echo "PASS" || echo "FAIL"

  echo "=== generateStaticParams in books page ===" && \
    grep -r "generateStaticParams" src/app/books --include="*.tsx" && echo "PASS" || echo "FAIL"

  echo "=== No hex in component files ===" && \
    grep -r "#[0-9A-Fa-f]\{3,6\}" src/components --include="*.tsx" \
    && echo "FAIL — use CSS variables" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
