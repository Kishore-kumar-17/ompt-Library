# 06 — Tasks
## Career-Focused Edtech & ROI-Led Landing Pages · pcpp_platform_20

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
  Professional corporate — white base, upGrad red accent, success green for salary stats.

  ```css
  --color-bg:       #FFFFFF;
  --color-surface:  #F3F4F6;
  --color-border:   #E5E7EB;
  --color-ink:      #111827;
  --color-muted:    #4B5563;
  --color-accent:   #E31E24;
  --color-success:  #059669;

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

  Acceptance: All variables in DevTools. `grep -r "bg-red\|#E31" src/components --include="*.tsx"` → empty (use CSS variables only).
  Files: `src/app/globals.css`

---

- [ ] **TASK-003** | Est: 45m
  **TypeScript types**
  All domain types exported. `tsc --noEmit` exits 0.

  ```typescript
  export type CareerDomain = 'ai' | 'data-science' | 'mba' | 'product' | 'marketing' | 'design'

  export interface Course {
    slug: string; title: string; tagline: string
    university: string; universityLogoSrc: string; universityLogoAlt: string
    domain: CareerDomain
    durationWeeks: number
    salaryHikePercent: number
    placementRate: number
    modules: { title: string; topics: string[] }[]
    published: boolean
  }

  export interface LeadForm {
    name: string; email: string; phone: string
    domain: CareerDomain; nationality: 'india' | 'international'
  }
  ```

  Files: `src/types/index.ts`

---

- [ ] **TASK-004** | Est: 30m
  **Static data files**
  Mock data for all sections.

  Acceptance: `courses.ts` exports 8 `Course` objects across all 6 `CareerDomain` values — each with university info and 4+ modules. `tsc --noEmit` clean.
  Files: `src/lib/courses.ts`

---

## Phase 1 — Navigation

---

- [ ] **TASK-005** | Est: 1h
  **ProgramNav**
  Corporate-grade nav with domain dropdowns and red CTA.

  Acceptance: `position: sticky; top: 0`. `background: var(--color-bg)`. Logo left Montserrat 800 `20px`. Domain links: AI, Data Science, MBA, Product, Marketing, Design — `13px`. "Talk to Expert →" right: `background: var(--color-accent); color: white` `4px` radius `44px`. Mobile: hamburger `aria-expanded`. `aria-label="Main navigation"`. Server Component.
  Files: `src/components/layout/ProgramNav.tsx`

---

## Phase 2 — Hero and University Strip

---

- [ ] **TASK-006** | Est: 1.5h
  **Hero + UniversityStrip + ROI stats**
  High-impact landing with trust markers.

  Acceptance: `app/page.tsx`. Hero heading Montserrat 800 `clamp(32px,5vw,54px)` all-caps. Sub `18px` muted. `GoalSearch.tsx` is `'use client'`: `<input type="search" aria-label="Search programs by goal or domain">` — filters `courses` by title/domain on keystroke. `UniversityStrip.tsx` (server): `<ul role="list">` horizontal. Each course university `<img alt={course.universityLogoAlt}>` `filter: grayscale(1) opacity(0.6)`. Hover: `filter: grayscale(0) opacity(1)` `200ms`. `prefers-reduced-motion`: static. `aria-label="University partners"`. `ROIStatBand.tsx` is `'use client'`: `IntersectionObserver` triggers count-up from 0 → value on viewport entry. `prefers-reduced-motion`: render final value immediately. `aria-live="polite"` on each counter span. Value Inter 800 `clamp(28px,4vw,48px)` `color: var(--color-success)`. Label `14px` muted.
  Files: `src/app/page.tsx`, `src/components/home/GoalSearch.tsx`, `src/components/home/UniversityStrip.tsx`, `src/components/home/ROIStatBand.tsx`

---

## Phase 3 — Programs and Learner Stories

---

- [ ] **TASK-007** | Est: 1.5h
  **Program catalog + detail page**
  Domain-filtered programs with syllabus download CTA.

  Acceptance: `app/courses/page.tsx`. `DomainFilter.tsx` is `'use client'`: filter by `CareerDomain` — `aria-pressed`. `CourseCard.tsx` (server): `<img alt={course.universityLogoAlt}>` university logo. Title Montserrat 700 `20px`. Duration (weeks) + price `14px` muted. `salaryHikePercent` `16px` `color: var(--color-success)` "Avg salary hike". "Download Syllabus →" `<button aria-label="Download syllabus for {course.title}">` — shows `role="status"` "Syllabus sent to your email" on click. NEVER provide actual file download. `4px` radius. `app/courses/[slug]/page.tsx`: `generateStaticParams()`. `notFound()`. Full course details. Server Component wrapper.
  Files: `src/app/courses/page.tsx`, `src/app/courses/[slug]/page.tsx`, `src/components/courses/DomainFilter.tsx`, `src/components/courses/CourseCard.tsx`

---

- [ ] **TASK-008** | Est: 1h
  **Learner story feed**
  Before/after career transformation cards.

  Acceptance: `LearnerStoryGrid.tsx` (server): CSS Grid `repeat(2,1fr)` desktop → `1fr` mobile. Each `LearnerCard.tsx` (server): hardcoded page-level learner story const data (not typed as `LearnerStory` — use inline object). Portrait `<img alt="...">` `aria-label="{name} — {beforeRole} to {afterRole}"`. Name Inter 700 `16px`. Before role `13px` muted → After role `13px` `color: var(--color-success)` with "→" separator. Salary hike `16px` `color: var(--color-success)`. Course title `12px` muted. `8px` radius. `1px solid var(--color-border)`. Server Component.
  Files: `src/components/home/LearnerStoryGrid.tsx`, `src/components/home/LearnerCard.tsx`

---

## Phase 4 — QA

---

- [ ] **TASK-009** | Est: 1h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== No white backgrounds in components ===" && \
    grep -r "bg-white\|background.*#fff\|background: white" src/components --include="*.tsx" \
    && echo "REVIEW — verify intentional" || echo "PASS"

  echo "=== GoalSearch is use client ===" && \
    grep -r "'use client'" src/components/home/GoalSearch.tsx && echo "PASS" || echo "FAIL"

  echo "=== ROIStatBand is use client ===" && \
    grep -r "'use client'" src/components/home/ROIStatBand.tsx && echo "PASS" || echo "FAIL"

  echo "=== ROIStatBand has aria-live ===" && \
    grep -r "aria-live" src/components/home/ROIStatBand.tsx && echo "PASS" || echo "FAIL"

  echo "=== ROIStatBand handles reduced motion ===" && \
    grep -r "useReducedMotion\|reducedMotion" src/components/home/ROIStatBand.tsx \
    && echo "PASS" || echo "FAIL"

  echo "=== DomainFilter has aria-pressed ===" && \
    grep -r "aria-pressed" src/components/programs/DomainFilter.tsx && echo "PASS" || echo "FAIL"

  echo "=== LearnerCard has aria-label ===" && \
    grep -r "aria-label" src/components/home/LearnerCard.tsx && echo "PASS" || echo "FAIL"

  echo "=== No actual file download ===" && \
    grep -r "href.*\.pdf\|download=" src/components/programs --include="*.tsx" \
    && echo "REVIEW — must show success status, not download file" || echo "PASS"

  echo "=== No hex in component files ===" && \
    grep -r "#[0-9A-Fa-f]\{3,6\}" src/components --include="*.tsx" \
    && echo "FAIL — use CSS variables" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
