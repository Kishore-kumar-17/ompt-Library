# 06 — Tasks
## Career Acceleration & Tech Upskilling Platform · business_platform_04

Tasks are ordered by dependency. Complete each task fully before starting the next.

---

## Phase 0 — Foundation

---

- [ ] **TASK-001** | Est: 1h
  **Initialise project**
  Next.js 14 App Router with TypeScript strict mode, Tailwind CSS v3, static export.

  ```bash
  npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"
  npm install framer-motion lucide-react
  ```

  Acceptance: `npm run dev` starts. `tsc --noEmit` exits 0. `npm run build` produces `/out` directory.
  Files: `package.json`, `tsconfig.json`, `next.config.ts`

---

- [ ] **TASK-002** | Est: 30m
  **Design tokens — CSS variables**
  All color values as CSS custom properties in `globals.css`.

  ```css
  --color-bg:       #F8FAFD;
  --color-surface:  #FFFFFF;
  --color-tint:     #EDF3FA;
  --color-ink:      #152238;
  --color-muted:    #4C5C72;
  --color-border:   rgba(21,34,56,0.14);
  --color-action:   #0F4AA8;
  --color-success:  #1E7D3A;
  --color-warning:  #B26A12;
  --color-salary:   #5E3AA8;

  body { background: var(--color-bg); color: var(--color-ink); }

  :focus-visible {
    outline: 2px solid var(--color-action);
    outline-offset: 2px;
  }

  .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
  }
  ```

  Acceptance: All variables in DevTools. `grep -r "bg-white\|background.*#fff" src/components --include="*.tsx"` → empty.
  Files: `src/app/globals.css`

---

- [ ] **TASK-003** | Est: 1h
  **TypeScript interfaces**
  All domain types exported. `tsc --noEmit` exits 0.

  ```typescript
  export type ProgramTrack = 'fullstack' | 'data' | 'product' | 'design' | 'devops'
  export type MentorSpecialization = 'engineering' | 'data_science' | 'product' | 'design'
  export type ScholarshipTier = 'gold' | 'silver' | 'bronze' | 'none'

  export interface Program {
    id: string; name: string; track: ProgramTrack
    duration: string; format: 'live' | 'recorded' | 'hybrid'
    outcomeMetric: string; cohortSize: number
  }

  export interface Mentor {
    id: string; name: string; company: string; role: string
    specialization: MentorSpecialization; experienceYears: number
    photoAlt: string
  }

  export interface PlacementProof {
    id: string; alumniName: string; beforeRole: string
    afterRole: string; afterCompany: string; salaryChange: string
    program: ProgramTrack; cohortYear: string; quote: string
  }

  export interface AlumniStory {
    id: string; name: string; beforeSalary: string
    afterSalary: string; company: string; programTrack: ProgramTrack
    cohortYear: string; quote: string; photoAlt: string
  }

  export interface Lead {
    name: string; phone: string; email: string
    programInterest: ProgramTrack; currentRole: string
    experienceYears: number; city: string; source: string
  }

  export interface ScholarshipAssessment {
    answers: Record<string, string>
    tier: ScholarshipTier; discountPercentage: number
    eligiblePrograms: ProgramTrack[]
  }

  export interface EnrollmentCohort {
    id: string; program: ProgramTrack
    startDate: string; seatsRemaining: number
  }
  ```

  Files: `src/types/index.ts`

---

- [ ] **TASK-004** | Est: 45m
  **CMS content schema + static data**
  Define schemas for programs, mentors, placement_proofs, alumni_stories, and cohort data.

  Acceptance: `programs.ts` exports 6 `Program` objects across different tracks. `mentors.ts` exports 8 `Mentor` objects across specializations. `placements.ts` exports 6 `PlacementProof` objects with salary change data. `alumni.ts` exports 4 `AlumniStory` objects. `cohorts.ts` exports 4 `EnrollmentCohort` objects with `seatsRemaining`. `tsc --noEmit` clean.
  Files: `src/lib/programs.ts`, `src/lib/mentors.ts`, `src/lib/placements.ts`, `src/lib/alumni.ts`, `src/lib/cohorts.ts`

---

- [ ] **TASK-005** | Est: 1h
  **SiteNav**
  Sticky nav with demo booking CTA.

  Acceptance: Sticky, scroll-shadow. Links: Programs / Placements / Mentors / Scholarship / Fees / Demo. "Book Demo" CTA: action bg, white text, `4px` radius, `44px` height. Mobile hamburger with `aria-expanded` and `aria-controls`. Server Component.
  Files: `src/components/layout/SiteNav.tsx`

---

## Phase 1 — Placement Proof

---

- [ ] **TASK-006** | Est: 1.5h
  **PlacementProofBand**
  Salary and outcome metrics with counter animation.

  Acceptance: 4–6 tiles: salary/outcome metric, cohort year label (e.g., "2024 Cohort avg"). Counter animates 0→value on scroll entry (`IntersectionObserver`). `aria-live="polite"` on counter spans. `useReducedMotion()` guard — skip animation, render final value. Salary numbers use `var(--color-salary)`. Tint bg.
  Files: `src/components/home/PlacementProofBand.tsx`

---

- [ ] **TASK-007** | Est: 45m
  **CompanyLogoGrid**
  Hiring company logos — accessible and monochrome by default.

  Acceptance: Horizontal or wrapped grid of company logos. Each `<img>` has descriptive `alt` text (e.g., `alt="Google"`). Default: `filter: grayscale(100%)`. Hover: `filter: none`. "X+ hiring companies" count badge above grid. `scrollbar-width: none` on mobile scroll. Server Component.
  Files: `src/components/home/CompanyLogoGrid.tsx`

---

- [ ] **TASK-008** | Est: 1h
  **AlumniStoryCards**
  Before/after salary cards with cohort context.

  Acceptance: Card layout: photo, alumni name Inter 600, before role → after role, salary change `var(--color-salary)`, company name, cohort year + program label, 1-line quote. `4px` radius. CSS Grid `repeat(3,1fr)` desktop → `1fr` mobile.
  Files: `src/components/home/AlumniStoryCards.tsx`

---

- [ ] **TASK-009** | Est: 1.5h
  **Placements page**
  Cohort year + program filter with alumni card grid and methodology note.

  Acceptance: `app/placements/page.tsx`. `PlacementsFilter.tsx` is `'use client'`: cohort year + program track dropdowns. `AlumniCard.tsx` (server): photo `alt` from `AlumniStory.photoAlt`, before/after salary, company, cohort. Methodology note in Inter `12px` muted always visible at bottom — NOT behind toggle or accordion.
  Files: `src/app/placements/page.tsx`, `src/components/placements/PlacementsFilter.tsx`, `src/components/placements/AlumniCard.tsx`

---

## Phase 2 — Program Discovery

---

- [ ] **TASK-010** | Est: 1.5h
  **ProgramTrackGrid**
  Track discovery with outcome and duration summary.

  Acceptance: `ProgramTrackGrid.tsx`: CSS Grid `repeat(4,1fr)` desktop → `repeat(2,1fr)` tablet → `1fr` mobile. Card: track name Inter 600, outcome metric `var(--color-salary)`, duration, "Book Demo" CTA. `4px` radius on cards, border `1px solid var(--color-border)`. Server Component.
  Files: `src/app/programs/page.tsx`, `src/components/programs/ProgramTrackGrid.tsx`

---

- [ ] **TASK-011** | Est: 1.5h
  **Program detail page**
  Curriculum, cohort outcome, and booking CTA — static generation.

  Acceptance: `app/programs/[track]/page.tsx`. `generateStaticParams()` from `programs.ts`. `notFound()` for unknown slugs. Sections: curriculum modules list, mode/format (`<table scope>` attributes for comparison), cohort schedule, outcome data from `placements.ts`, "Book Demo" CTA, nearby cohort seat count from `cohorts.ts`. Server Component.
  Files: `src/app/programs/[track]/page.tsx`

---

- [ ] **TASK-012** | Est: 45m
  **Program index page**
  All tracks with outcome summary — editorial list layout.

  Acceptance: `app/programs/page.tsx`. All programs in vertical editorial list (NOT table, NOT grid). Each: track name, outcome metric, duration, "Book Demo →" link. Server Component.
  Files: `src/app/programs/page.tsx`

---

## Phase 3 — Mentor Credibility

---

- [ ] **TASK-013** | Est: 1h
  **MentorGrid**
  3-column mentor cards with specialization filter.

  Acceptance: `MentorFilter.tsx` is `'use client'`: specialization filter tabs. `MentorCard.tsx` (server): photo `alt={mentor.photoAlt}`, name Inter 600, company, role, experience years, specialization tag. CSS Grid `repeat(3,1fr)` desktop → `1fr` mobile. `4px` radius.
  Files: `src/app/mentors/page.tsx`, `src/components/mentors/MentorGrid.tsx`, `src/components/mentors/MentorCard.tsx`, `src/components/mentors/MentorFilter.tsx`

---

- [ ] **TASK-014** | Est: 45m
  **MentorModelExplainer**
  1:1 live model vs recorded format — structural comparison.

  Acceptance: Two-column comparison: Live 1:1 sessions (left) vs Recorded format (right). Mentor-to-student ratio displayed prominently. Differences in Inter `15px` list items. NOT a marketing claim — factual format description. Server Component.
  Files: `src/components/home/MentorModelExplainer.tsx`

---

## Phase 4 — Scholarship Flow

---

- [ ] **TASK-015** | Est: 2h
  **Scholarship assessment — multi-step with tier reveal**
  Intro → questions → submit → tier reveal → enrollment CTA.

  Acceptance: `'use client'` on page. Steps: intro → 5 assessment questions (MCQ) → submit → tier reveal. Progress bar shows `N of 5`. POST `/api/scholarship` returns `{ tier, discountPercentage, eligiblePrograms }`. `ScholarshipTierReveal.tsx`: animated tier card (opacity 0→1, `y: 16→0`). `useReducedMotion()` guard. Eligible program list with "Enroll Now →" link per program. `role="status"` on tier reveal.
  Files: `src/app/scholarship/page.tsx`, `src/components/scholarship/ScholarshipTierReveal.tsx`

---

- [ ] **TASK-016** | Est: 1h
  **Scholarship API route**
  Server-side score validation and tier assignment.

  Acceptance: POST `/api/scholarship`: receive answers, compute score server-side (not client), assign tier: 75%+ = gold (50% off), 50–74% = silver (30% off), 25–49% = bronze (15% off), <25% = none. Return `{ tier, discountPercentage, eligiblePrograms: ProgramTrack[] }`. Return `400` on invalid input.
  Files: `src/app/api/scholarship/route.ts`

---

## Phase 5 — Enrollment Funnel

---

- [ ] **TASK-017** | Est: 1.5h
  **DemoBookingForm**
  Demo booking with counselor assignment.

  Acceptance: `'use client'`. Fields: program interest selector, current role, experience years, city, phone, email. Submit → POST `/api/demo`. Confirmation: counselor name placeholder, callback time slot, program track confirmed. All `<label>` linked via `htmlFor`. Errors use `role="alert"`. `4px` radius inputs.
  Files: `src/components/enrollment/DemoBookingForm.tsx`

---

- [ ] **TASK-018** | Est: 45m
  **Demo API route**
  Validate, enrich, CRM push.

  Acceptance: POST `/api/demo`: validate required fields, enrich payload with program name and track. CRM push placeholder (console log if unconfigured). Return `{ success: true, confirmationId, counselorAssigned: string, callbackSlot: string }`.
  Files: `src/app/api/demo/route.ts`

---

- [ ] **TASK-019** | Est: 1h
  **FeeEMISection**
  Transparent fee structure and financing options.

  Acceptance: Total fee displayed. EMI options table (`<table>` with proper `scope` attributes): tenure, monthly, total. Financing partner logos with `alt` text. ISA option noted if applicable. Eligibility note in Inter `13px` muted. NOT behind toggle — always visible. Server Component.
  Files: `src/components/home/FeeEMISection.tsx`

---

- [ ] **TASK-020** | Est: 1h
  **Demo page**
  Booking form + cohort scarcity signal + policy notice.

  Acceptance: `app/demo/page.tsx`. `DemoBookingForm` rendered. Nearby cohort from `cohorts.ts`: "N seats remaining in [month] cohort" — NOT fake countdown. Policy notice (cancellation, refund) always rendered below form — NOT in accordion. Server Component.
  Files: `src/app/demo/page.tsx`

---

- [ ] **TASK-021** | Est: 45m
  **Leads API route**
  Validate and push with enriched context.

  Acceptance: POST `/api/leads`: validate name, phone, email, programInterest, currentRole, experienceYears, city. Enrich with program name. CRM push placeholder. Return `{ success: true, confirmationId }`.
  Files: `src/app/api/leads/route.ts`

---

## Phase 6 — QA

---

- [ ] **TASK-022** | Est: 45m
  **Analytics instrumentation**
  Funnel event tracking — page, CTA, form, assessment.

  Acceptance: `'use client'` wrappers push to `window.dataLayer`: `page_view`, `cta_click` (cta_label), `form_start`, `assessment_step` (step_number), `form_submit` (program + background). No events fire server-side. `tsc --noEmit` clean.
  Files: `src/lib/analytics.ts`

---

- [ ] **TASK-023** | Est: 1h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== No hardcoded hex in components ===" && \
    grep -r "#[0-9A-Fa-f]\{3,6\}" src/components --include="*.tsx" \
    && echo "FAIL — use CSS variables" || echo "PASS"

  echo "=== PlacementsFilter is use client ===" && \
    grep -r "'use client'" src/components/placements/PlacementsFilter.tsx && echo "PASS" || echo "FAIL"

  echo "=== MentorFilter is use client ===" && \
    grep -r "'use client'" src/components/mentors/MentorFilter.tsx && echo "PASS" || echo "FAIL"

  echo "=== DemoBookingForm is use client ===" && \
    grep -r "'use client'" src/components/enrollment/DemoBookingForm.tsx && echo "PASS" || echo "FAIL"

  echo "=== Scholarship tier is server-computed ===" && \
    grep -r "score\|tier" src/app/api/scholarship/route.ts && echo "PASS" || echo "REVIEW"

  echo "=== PlacementProofBand has aria-live ===" && \
    grep -r "aria-live" src/components/home/PlacementProofBand.tsx && echo "PASS" || echo "FAIL"

  echo "=== Methodology not hidden ===" && \
    grep -r "accordion\|collapse\|display.*none" src/app/placements/page.tsx \
    && echo "REVIEW — methodology must always be visible" || echo "PASS"

  echo "=== FeeEMISection not in accordion ===" && \
    grep -r "accordion\|collapse\|<details" src/components/home/FeeEMISection.tsx \
    && echo "FAIL — fee must always be visible" || echo "PASS"

  echo "=== Demo policy not in accordion ===" && \
    grep -r "accordion\|<details\|<summary" src/app/demo/page.tsx \
    && echo "FAIL — policy must always be visible" || echo "PASS"

  echo "=== No border-radius above 4px ===" && \
    grep -r "rounded-md\|rounded-lg\|rounded-xl\|rounded-full" \
    src/components --include="*.tsx" \
    && echo "FAIL — 4px only" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥95, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
