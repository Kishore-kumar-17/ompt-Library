# 06 — Tasks
## Indian Creator Hub & Multi-Product Portfolio · lp_platform_07

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
  High-contrast light/dark with Neon Yellow accent.

  ```css
  --color-bg:       #FFFFFF;
  --color-dark-bg:  #000000;
  --color-surface:  #F9FAFB;
  --color-border:   #E5E7EB;
  --color-ink:      #111827;
  --color-muted:    #6B7280;
  --color-accent:   #FAFF00;

  body { background: var(--color-bg); color: var(--color-ink); }

  :focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
  }
  ```

  Acceptance: All variables in DevTools. `grep -r "#FAFF00\|#faff00" src/components --include="*.tsx"` → empty — use `var(--color-accent)`.
  Files: `src/app/globals.css`

---

- [ ] **TASK-003** | Est: 45m
  **TypeScript types**
  All domain types exported. `tsc --noEmit` exits 0.

  ```typescript
  export type CourseCategory = 'money' | 'mindset' | 'career' | 'relationships'

  export interface FailureEntry {
    id: string; year: string; title: string
    lesson: string; category: string
  }

  export interface Course {
    id: string; slug: string; name: string
    category: CourseCategory; priceINR: number
    outcomeTags: string[]; hasLifetimeAccess: boolean
    imageAlt: string
  }

  export interface SocialProofStat {
    id: string; label: string; value: string
    context: string
  }

  export interface Book {
    id: string; title: string; coverAlt: string
    isBestseller: boolean; description: string
    buyUrl: string
  }
  ```

  Files: `src/types/index.ts`

---

- [ ] **TASK-004** | Est: 45m
  **Static data files**
  Mock data for all sections.

  Acceptance: `failures.ts` exports 8 `FailureEntry` objects spanning multiple years. `courses.ts` exports 8 `Course` objects across all 4 categories, each with `priceINR` in Indian currency format. `stats.ts` exports 4 `SocialProofStat` objects (followers, learners, subscribers, etc.). `books.ts` exports 3 `Book` objects, at least 1 `isBestseller: true`. `tsc --noEmit` clean.
  Files: `src/lib/failures.ts`, `src/lib/courses.ts`, `src/lib/stats.ts`, `src/lib/books.ts`

---

## Phase 1 — Hero and Social Proof

---

- [ ] **TASK-005** | Est: 1h
  **SiteNav**
  Minimal high-contrast nav with Neon CTA.

  Acceptance: White bg, `1px solid var(--color-border)` bottom. Logo left Montserrat 900 ink. Links: WebVeda, Books, Newsletter. "Get Courses →" CTA: accent bg `var(--color-accent)`, black text, `4px` radius, `44px` height. Mobile hamburger `aria-expanded`. Server Component.
  Files: `src/components/layout/SiteNav.tsx`

---

- [ ] **TASK-006** | Est: 1h
  **HubHero + SocialProofStrip**
  High-res portrait hero with massive stats.

  Acceptance: `HubHero`: white section, high-res portrait `alt="[Creator name]"`, Montserrat 900 `clamp(36px,5vw,64px)` all-caps headline. `SocialProofStrip.tsx` is `'use client'`: counter animation 0→value on viewport entry, `aria-live="polite"` on each counter. `useReducedMotion()` guard — render final value immediately. Black bg section, white text, stat values Montserrat 900 `48px`, labels Inter 400 `16px` muted.
  Files: `src/components/home/HubHero.tsx`, `src/components/home/SocialProofStrip.tsx`

---

## Phase 2 — Failure Resume and Courses

---

- [ ] **TASK-007** | Est: 1.5h
  **Failure Resume Timeline**
  Vertical timeline building emotional trust.

  Acceptance: Black bg section. `border-left: 2px solid var(--color-accent)` vertical line. Each `FailureEntry`: year Inter 700 `14px` accent-color, title Inter 700 `18px` white, lesson Inter 400 `14px` white `0.7` opacity. `LessonTooltip.tsx` is `'use client'`: hover "Lesson →" link opens tooltip with full lesson text — `role="tooltip"` with `aria-describedby`. `useReducedMotion()` guard on tooltip fade.
  Files: `src/components/home/FailureTimeline.tsx`, `src/components/ui/LessonTooltip.tsx`

---

- [ ] **TASK-008** | Est: 1.5h
  **WebVeda Course Grid**
  Transparent-priced course marketplace.

  Acceptance: `app/webveda/page.tsx`. `CourseFilterBar.tsx` is `'use client'`: category tabs (Money, Mindset, Career, Relationships). `CourseCard.tsx` (server): course name Montserrat 700, category tag, `₹{priceINR.toLocaleString('en-IN')}` price Inter 700 ink, "Lifetime Access" badge if `hasLifetimeAccess`. Outcome tags chips. "Enroll Now →" CTA accent bg `4px` radius. CSS Grid `repeat(3,1fr)` desktop → `repeat(2,1fr)` tablet → `1fr` mobile.
  Files: `src/app/webveda/page.tsx`, `src/components/courses/CourseCard.tsx`, `src/components/courses/CourseFilterBar.tsx`

---

- [ ] **TASK-009** | Est: 1h
  **BookShowcase**
  3D-style book display with bestseller badges.

  Acceptance: Horizontal row of `BookCard.tsx` (server): book cover `alt={book.coverAlt}`, CSS `perspective: 1000px` 3D tilt on hover — `prefers-reduced-motion`: skip tilt. Title Inter 700, "NYT Bestseller" chip if `isBestseller`, description Inter `14px` muted, "Buy →" black bg button. Server Component.
  Files: `src/components/home/BookShowcase.tsx`, `src/components/home/BookCard.tsx`

---

## Phase 3 — QA

---

- [ ] **TASK-010** | Est: 1h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== SocialProofStrip is use client ===" && \
    grep -r "'use client'" src/components/home/SocialProofStrip.tsx && echo "PASS" || echo "FAIL"

  echo "=== SocialProofStrip has aria-live ===" && \
    grep -r "aria-live" src/components/home/SocialProofStrip.tsx && echo "PASS" || echo "FAIL"

  echo "=== LessonTooltip is use client ===" && \
    grep -r "'use client'" src/components/ui/LessonTooltip.tsx && echo "PASS" || echo "FAIL"

  echo "=== LessonTooltip has role tooltip ===" && \
    grep -r "role.*tooltip" src/components/ui/LessonTooltip.tsx && echo "PASS" || echo "FAIL"

  echo "=== CourseFilterBar is use client ===" && \
    grep -r "'use client'" src/components/courses/CourseFilterBar.tsx && echo "PASS" || echo "FAIL"

  echo "=== Course price uses INR format ===" && \
    grep -r "toLocaleString\|en-IN\|₹" src/components/courses/CourseCard.tsx && echo "PASS" || echo "FAIL"

  echo "=== No hex in component files ===" && \
    grep -r "#[0-9A-Fa-f]\{3,6\}" src/components --include="*.tsx" \
    && echo "FAIL — use CSS variables" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
