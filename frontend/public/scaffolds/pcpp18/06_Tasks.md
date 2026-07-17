# 06 — Tasks
## Course Marketplace & Cohort Landing Pages · pcpp_platform_18

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
  Professional marketplace — white base, category-adaptive accents via CSS variables.

  ```css
  --color-bg:       #FFFFFF;
  --color-surface:  #F8F9FA;
  --color-border:   #E5E7EB;
  --color-ink:      #111827;
  --color-muted:    #4B5563;
  --color-accent:   #2563EB;

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

  Acceptance: All variables in DevTools. Category-specific accent overrides done via `data-category` attribute in CSS — no hardcoded hex in components.
  Files: `src/app/globals.css`

---

- [ ] **TASK-003** | Est: 45m
  **TypeScript types**
  All domain types exported. `tsc --noEmit` exits 0.

  ```typescript
  export type CourseCategory = 'ai' | 'product' | 'engineering' | 'design' | 'marketing'

  export interface Instructor {
    id: string; name: string; title: string; company: string
    avatarSrc: string; avatarAlt: string
    students: number
  }

  export interface CourseModule {
    week: number; title: string; lessons: string[]
  }

  export interface Cohort {
    slug: string; title: string; tagline: string
    category: CourseCategory
    instructor: Instructor
    startDate: string
    price: number
    modules: CourseModule[]
    stripePortalUrl: string
    published: boolean
  }
  ```

  Files: `src/types/index.ts`

---

- [ ] **TASK-004** | Est: 30m
  **Static data files**
  Mock data for all sections.

  Acceptance: `instructors.ts` exports 6 `Instructor` objects. `cohorts.ts` exports 8 `Cohort` objects across all 5 categories — each with 6+ `CourseModule` entries. `tsc --noEmit` clean.
  Files: `src/lib/instructors.ts`, `src/lib/cohorts.ts`

---

## Phase 1 — Navigation

---

- [ ] **TASK-005** | Est: 1h
  **MarketplaceNav**
  Category-linked nav for discovery.

  Acceptance: `position: sticky; top: 0`. `background: var(--color-bg)`. `1px solid var(--color-border)` bottom. Logo left Inter 800 `18px`. Category links: AI, Product, Design, Marketing, Engineering — `13px` uppercase tracking `0.05em`. "Browse All →" right. Mobile: hamburger `aria-expanded`. `aria-label="Main navigation"`. Server Component.
  Files: `src/components/layout/MarketplaceNav.tsx`

---

## Phase 2 — Course Marketplace

---

- [ ] **TASK-006** | Est: 1.5h
  **Course marketplace grid with pedigree cards**
  Category-filtered instructor-led course grid.

  Acceptance: `app/page.tsx`. `CategoryFilter.tsx` is `'use client'`: filter by `CourseCategory` — `aria-pressed` on active. CSS Grid `repeat(3,1fr)` desktop → `repeat(2,1fr)` tablet → `1fr` mobile. Gap `24px`. `CourseCard.tsx` (server): `background: var(--color-surface)` `8px` radius `1px solid var(--color-border)`. Category badge `12px` uppercase `data-category={cohort.category}` — CSS drives color via attribute. Instructor portrait row `<img alt={cohort.instructor.avatarAlt}>` `40px` circle. Title Inter 700 `20px`. Price Inter 700 `18px`. `CohortBadge.tsx` (server): "Starts [date]" `13px` bold `color: var(--color-accent)`. `AnimatePresence` filter `opacity 0→1` `250ms`. `prefers-reduced-motion`: instant.
  Files: `src/app/page.tsx`, `src/components/marketplace/CategoryFilter.tsx`, `src/components/marketplace/CourseCard.tsx`, `src/components/marketplace/CohortBadge.tsx`

---

- [ ] **TASK-007** | Est: 2h
  **Course detail page — syllabus + instructor + enrollment**
  Dense curriculum with accordion and external enrollment CTA.

  Acceptance: `app/courses/[slug]/page.tsx`. `generateStaticParams()`. `notFound()`. Course title Inter 800 `clamp(28px,4vw,48px)`. `InstructorCards.tsx` (server): instructor — `<img alt={cohort.instructor.avatarAlt}>` `aria-label="{cohort.instructor.name}, {cohort.instructor.title} at {cohort.instructor.company}"`. Name Inter 700 `16px`. Title + company `13px` muted. Students `12px` muted. `SyllabusAccordion.tsx` is `'use client'`: `<button aria-expanded>` per module — "Week N: [title]". Framer Motion `height: 0→auto` expand. Inside: lessons `<ul>`. `prefers-reduced-motion`: expand instantly. "Enroll Now →" `<a href={cohort.stripePortalUrl} rel="noopener noreferrer">` — `background: var(--color-accent)` `8px` radius `48px` height. NEVER render Stripe or payment inline.
  Files: `src/app/courses/[slug]/page.tsx`, `src/components/course/InstructorCards.tsx`, `src/components/course/SyllabusAccordion.tsx`

---

## Phase 3 — QA

---

- [ ] **TASK-008** | Est: 1h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== No white backgrounds in components ===" && \
    grep -r "bg-white\|background.*#fff\|background: white" src/components --include="*.tsx" \
    && echo "REVIEW — verify intentional" || echo "PASS"

  echo "=== CategoryFilter has aria-pressed ===" && \
    grep -r "aria-pressed" src/components/marketplace/CategoryFilter.tsx && echo "PASS" || echo "FAIL"

  echo "=== SyllabusAccordion is use client ===" && \
    grep -r "'use client'" src/components/course/SyllabusAccordion.tsx && echo "PASS" || echo "FAIL"

  echo "=== SyllabusAccordion has aria-expanded ===" && \
    grep -r "aria-expanded" src/components/course/SyllabusAccordion.tsx && echo "PASS" || echo "FAIL"

  echo "=== SyllabusAccordion handles reduced motion ===" && \
    grep -r "useReducedMotion\|reducedMotion" src/components/course/SyllabusAccordion.tsx \
    && echo "PASS" || echo "FAIL"

  echo "=== InstructorCards have aria-label ===" && \
    grep -r "aria-label" src/components/course/InstructorCards.tsx && echo "PASS" || echo "FAIL"

  echo "=== No Stripe or payment inline ===" && \
    grep -r "stripe\|CardElement\|payment_intent" src --include="*.tsx" \
    && echo "FAIL — external enrollment link only" || echo "PASS"

  echo "=== No hex in component files ===" && \
    grep -r "#[0-9A-Fa-f]\{3,6\}" src/components --include="*.tsx" \
    && echo "FAIL — use CSS variables" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
