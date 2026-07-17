# 06 — Tasks
## Scale + Trust — Multi-Program Coaching Admissions Platform · business_platform_02

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
  **Font setup — Inter**
  Inter weight 400, 600, 700. Institutional tone — no decorative fonts.

  Acceptance: DevTools shows Inter on all text. `grep -r "Playfair\|serif\|Georgia" src` returns empty.
  Files: `src/app/layout.tsx`

---

- [ ] **TASK-003** | Est: 30m
  **Design tokens — CSS variables**
  All color values as CSS custom properties. Light bg globally.

  Tokens (exact values):
  ```css
  --color-bg:       #F7FAFE;
  --color-surface:  #FFFFFF;
  --color-tint:     #EAF2FC;
  --color-ink:      #12233F;
  --color-muted:    #4A5F7D;
  --color-dim:      rgba(18,35,63,0.46);
  --color-border:   rgba(18,35,63,0.14);
  --color-action:   #0E4BAF;
  --color-hover:    #0B3D8F;
  --color-success:  #1F7C3B;
  --color-warning:  #B36A12;
  --color-data:     #5E3BA9;

  body { background: var(--color-bg); color: var(--color-ink); }
  ```

  Acceptance: All variables in DevTools. Body bg is `#F7FAFE`. `grep -r "bg-white\|background.*#fff\|background: white" src/components --include="*.tsx"` → empty.
  Files: `src/app/globals.css`

---

- [ ] **TASK-004** | Est: 20m
  **Accessibility utilities**
  `.sr-only`, `prefers-reduced-motion` reset, focus ring.

  ```css
  :focus-visible {
    outline: 2px solid var(--color-action);
    outline-offset: 2px;
  }
  ```

  Acceptance: `.sr-only` hides text visually. Reduced-motion sets `transition-duration: 0.01ms`. Focus ring on all interactive elements.
  Files: `src/app/globals.css`

---

- [ ] **TASK-005** | Est: 1h
  **TypeScript types**
  All domain types exported. `tsc --noEmit` exits 0.

  ```typescript
  export type ExamType = 'jee' | 'neet' | 'foundation' | 'olympiad' | 'repeater'
  export type ProgramMode = 'classroom' | 'digital' | 'distance' | 'hybrid'
  export type ScholarshipExam = 'ANTHE' | 'NEST' | 'iACST' | 'ACST'

  export interface ResultProof {
    id: string; studentName: string; rank: string
    exam: ExamType; year: string; programTrack: string
    imageAlt: string; isVerified: boolean; sourceNote: string
  }

  export interface Program {
    id: string; name: string; exam: ExamType
    classRange: string; modes: ProgramMode[]
    duration: string; isRepeater: boolean
  }

  export interface Center {
    id: string; city: string; address: string
    phone: string; mapEmbedSrc: string
    nearestTestCenter?: string
  }

  export interface Lead {
    name: string; phone: string; city: string
    examInterest: ExamType; class: string
    source: string; scholarshipPath: boolean
  }

  export interface ScholarshipRegistration {
    name: string; phone: string; class: string
    city: string; examPreference: ExamType
    scholarshipExam: ScholarshipExam; testDate: string
  }
  ```

  Files: `src/types/index.ts`

---

- [ ] **TASK-006** | Est: 45m
  **Static data files**
  Mock data for all sections.

  Acceptance: `results.ts` exports 10 `ResultProof` objects across JEE/NEET/Foundation, each with `sourceNote`. `programs.ts` exports 8 `Program` objects including at least 1 `isRepeater: true`. `centers.ts` exports 6 `Center` objects across different cities. `tsc --noEmit` clean.
  Files: `src/lib/results.ts`, `src/lib/programs.ts`, `src/lib/centers.ts`

---

## Phase 1 — Navigation and Hero

---

- [ ] **TASK-007** | Est: 1h
  **SiteNav + UtilityStrip**
  Helpline strip + sticky navigation.

  Acceptance: `UtilityStrip`: action bg, white text, helpline, "ANTHE/NEST Registrations Open" link. `SiteNav`: surface bg, scroll shadow. Logo left Inter 700. Links: Results, Programs, Centers, Scholarship, Admissions, Contact. "Book Free Class" CTA action bg `4px` radius. Mobile hamburger menu with `aria-expanded`. Server Components.
  Files: `src/components/layout/UtilityStrip.tsx`, `src/components/layout/SiteNav.tsx`

---

- [ ] **TASK-008** | Est: 1h
  **HeroSection + ProofMetricsBand**
  Homepage entry with key outcome metrics.

  Acceptance: `HeroSection`: tint bg, Inter 700 `clamp(36px, 5vw, 62px)` headline, two CTAs ("Book Free Class" filled + "View Results" ghost). `ProofMetricsBand`: 4–6 stats with year context label (e.g., "2024 JEE Results"). Counter animation on scroll entry (`IntersectionObserver`). `aria-live="polite"` on counter elements. `useReducedMotion()` guard — skip count animation. Server Component with client wrapper for counters.
  Files: `src/components/home/HeroSection.tsx`, `src/components/home/ProofMetricsBand.tsx`

---

## Phase 2 — Proof Hub and Program Discovery

---

- [ ] **TASK-009** | Est: 1.5h
  **Results Proof Hub**
  Exam/year/program-filtered result display with methodology transparency.

  Acceptance: `ResultsFilter.tsx` is `'use client'`: exam type, year, program track dropdowns. `ResultCard.tsx` (server): student photo (alt from `imageAlt` field), rank Inter 700 action color, exam/year badges, source note. Methodology disclaimer in Inter `12px` muted always visible at bottom — NEVER in tooltip or accordion. `sourceNote` renders on every card.
  Files: `src/app/results/page.tsx`, `src/components/results/ResultsFilter.tsx`, `src/components/results/ResultCard.tsx`

---

- [ ] **TASK-010** | Est: 1.5h
  **ProgramPathwayGrid + mode comparison**
  All programs with mode tabs and detail pages.

  Acceptance: `ProgramModeTab.tsx` is `'use client'`: tabs for Classroom / Digital / Distance. `ProgramCard.tsx` (server): exam badge, class range, mode chips, duration, "Know More →" link. CSS Grid `repeat(3, 1fr)` desktop → `repeat(2, 1fr)` tablet → `1fr` mobile. Program detail page: curriculum, mode comparison table (`<table>` with `scope` attributes), cohort schedule, "Book Free Class" CTA. `generateStaticParams()` from `programs.ts`.
  Files: `src/app/programs/page.tsx`, `src/app/programs/[track]/page.tsx`, `src/components/programs/ProgramModeTab.tsx`, `src/components/programs/ProgramCard.tsx`

---

## Phase 3 — Centers, Scholarship, and Admissions

---

- [ ] **TASK-011** | Est: 1h
  **Center Network pages**
  City index + center detail with map.

  Acceptance: `app/centers/page.tsx`: cities in tint-bg grid, center count badge per city. `app/centers/[city]/page.tsx`: name, address, phone, map `<iframe title="...">`, nearest test center note, local inquiry CTA. `generateStaticParams()` from `centers.ts`. `notFound()` for unknown city. Server Components.
  Files: `src/app/centers/page.tsx`, `src/app/centers/[city]/page.tsx`

---

- [ ] **TASK-012** | Est: 1.5h
  **Scholarship registration flow**
  Multi-step ANTHE/NEST/iACST/ACST intake.

  Acceptance: `'use client'` on page. Steps: exam selector (ANTHE/NEST/iACST/ACST) → eligibility check (class/age) → test date picker → city + center preference → registration form (name, phone, email) → confirmation. Progress bar shows step `N of 5`. POST `/api/scholarship` returns confirmation ID. Confirmation screen shows exam name, date, center, and admit card download placeholder. Error states use `role="alert"`.
  Files: `src/app/scholarship/page.tsx`, `src/app/api/scholarship/route.ts`

---

- [ ] **TASK-013** | Est: 1.5h
  **AdmissionsLeadForm + counselor assignment**
  Multi-mode lead capture — classroom vs digital vs distance paths differ.

  Acceptance: `'use client'`. Mode selector first (classroom/digital/distance) — form fields change based on mode (city/center only for classroom). OTP phone verification step (placeholder). POST `/api/leads` with full enriched payload. Confirmation with counselor name placeholder and callback time slot. All inputs have associated `<label>`. `4px` radius on inputs and buttons.
  Files: `src/components/admissions/AdmissionsLeadForm.tsx`, `src/app/api/leads/route.ts`

---

## Phase 4 — QA

---

- [ ] **TASK-014** | Est: 1h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== No hardcoded hex in components ===" && \
    grep -r "#[0-9A-Fa-f]\{3,6\}" src/components --include="*.tsx" \
    && echo "FAIL — use CSS variables" || echo "PASS"

  echo "=== ResultsFilter is use client ===" && \
    grep -r "'use client'" src/components/results/ResultsFilter.tsx && echo "PASS" || echo "FAIL"

  echo "=== ProgramModeTab is use client ===" && \
    grep -r "'use client'" src/components/programs/ProgramModeTab.tsx && echo "PASS" || echo "FAIL"

  echo "=== Result methodology always visible ===" && \
    grep -r "accordion\|collapse\|hidden\|display.*none" src/app/results/page.tsx \
    && echo "REVIEW — methodology must always be visible" || echo "PASS"

  echo "=== Map iframe has title ===" && \
    grep -r "title=" src/app/centers --include="*.tsx" && echo "PASS" || echo "FAIL"

  echo "=== sourceNote present on ResultCard ===" && \
    grep -r "sourceNote" src/components/results/ResultCard.tsx && echo "PASS" || echo "FAIL"

  echo "=== ProofMetricsBand has aria-live ===" && \
    grep -r "aria-live" src/components/home/ProofMetricsBand.tsx && echo "PASS" || echo "FAIL"

  echo "=== No border-radius above 4px ===" && \
    grep -r "rounded-md\|rounded-lg\|rounded-xl\|rounded-full" \
    src/components --include="*.tsx" \
    && echo "FAIL — 4px only" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
