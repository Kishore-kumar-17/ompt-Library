# 06 — Tasks
## K-12 and Competitive Learning Platform · business_platform_03

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
  Define all color values as CSS custom properties in `globals.css`.

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
  --color-data:     #5E3AA8;

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
  export type ExamType = 'jee' | 'neet' | 'foundation' | 'olympiad'
  export type ProgramMode = 'offline' | 'online' | 'hybrid'

  export interface Program {
    id: string; name: string; exam: ExamType
    classLevel: string; mode: ProgramMode; duration: string
    description: string; isSeasonalSpecial?: boolean
  }

  export interface Center {
    id: string; city: string; address: string; phone: string
    mapEmbedSrc: string; batchSchedule: string[]; feeRange: string
  }

  export interface ResultProof {
    id: string; studentName: string; rank: string
    exam: ExamType; year: string; programTrack: string
    imageAlt: string; isVerified: boolean
  }

  export interface Teacher {
    id: string; name: string; subject: string
    credentials: string; experienceYears: number; photoAlt: string
  }

  export interface Lead {
    name: string; phone: string; class: string
    city: string; examInterest: ExamType; source: string
  }

  export interface ScholarshipRegistration {
    name: string; phone: string; class: string
    city: string; examPreference: ExamType; testDate: string
  }
  ```

  Files: `src/types/index.ts`

---

- [ ] **TASK-004** | Est: 45m
  **CMS content schema**
  Define Sanity.io (or mock JSON) schemas for programs, centers, result_proofs, and teacher profiles.

  Acceptance: Schema files define all fields matching TypeScript interfaces. `programs.ts` exports 8 `Program` objects across all exam types. `centers.ts` exports 5 `Center` objects. `results.ts` exports 8 `ResultProof` objects, at least 4 `isVerified: true`. `teachers.ts` exports 4 `Teacher` objects. `tsc --noEmit` clean.
  Files: `src/lib/programs.ts`, `src/lib/centers.ts`, `src/lib/results.ts`, `src/lib/teachers.ts`

---

- [ ] **TASK-005** | Est: 1h
  **SiteNav**
  Sticky navigation with booking CTA.

  Acceptance: Sticky, scroll-shadow `box-shadow: 0 1px 4px rgba(21,34,56,0.1)` on scroll. Links: Programs / Results / App / Scholarship / Centers / Contact. "Book Free Class" CTA: action bg, white text, `4px` radius, `44px` height. Mobile hamburger with `aria-expanded` and `aria-controls`. Server Component.
  Files: `src/components/layout/SiteNav.tsx`

---

## Phase 1 — Proof and Credibility

---

- [ ] **TASK-006** | Est: 45m
  **UtilityStrip**
  Top-of-page helpline and urgency signal.

  Acceptance: Action bg, white text Inter `14px`. Helpline number as `<a href="tel:...">`. Free class messaging. `aria-label` on dismiss button (mobile only). Server Component.
  Files: `src/components/layout/UtilityStrip.tsx`

---

- [ ] **TASK-007** | Est: 1.5h
  **ProofMetricsBand**
  Outcome metrics with year context and accessible counter animation.

  Acceptance: 4–6 metric tiles: number, label, year context (e.g., "2024 JEE Selections"). Counter animates 0→value on scroll entry (`IntersectionObserver`). `aria-live="polite"` on counter `<span>`. `useReducedMotion()` guard — render final value immediately without animation. Tint bg section. Server Component with client counter wrapper only.
  Files: `src/components/home/ProofMetricsBand.tsx`

---

- [ ] **TASK-008** | Est: 1h
  **TeacherTrustSection**
  Faculty credibility grid.

  Acceptance: 3-column grid desktop, 1-col mobile. Teacher card: photo `<img alt={teacher.photoAlt}>`, name Inter 600, subject chip, credentials Inter `14px`, experience years. Card bg `var(--color-surface)`, `4px` radius, border `1px solid var(--color-border)`. Server Component.
  Files: `src/components/home/TeacherTrustSection.tsx`

---

- [ ] **TASK-009** | Est: 1.5h
  **Results page**
  Exam/year/program filter + result cards + methodology note.

  Acceptance: `app/results/page.tsx`. `ResultsFilter.tsx` is `'use client'`: exam type, year, program track. `ResultCard.tsx` (server): student name, rank Inter 700 action color, exam+year badge, verified checkmark if `isVerified`. Methodology note Inter `12px` muted always rendered at bottom — NOT in tooltip, NOT behind toggle. `tsc --noEmit` clean.
  Files: `src/app/results/page.tsx`, `src/components/results/ResultsFilter.tsx`, `src/components/results/ResultCard.tsx`

---

- [ ] **TASK-010** | Est: 45m
  **ParentTestimonialBlock**
  Trust quotes with child context.

  Acceptance: 2–3 quote cards: parent quote Inter `16px` italic, child's class and program label, parent name Inter 600. Tint bg section. Card bg surface, `4px` radius. Server Component.
  Files: `src/components/home/ParentTestimonialBlock.tsx`

---

## Phase 2 — Program Discovery

---

- [ ] **TASK-011** | Est: 1.5h
  **ProgramPathwayGrid**
  4-column course discovery grid with exam-type filter.

  Acceptance: `ProgramFilterBar.tsx` is `'use client'`: exam type tabs (JEE/NEET/Foundation/Olympiad). `ProgramCard.tsx` (server): exam type badge, program name Inter 600, class level, mode chip, CTA "Know More →". CSS Grid `repeat(4,1fr)` desktop → `repeat(2,1fr)` tablet → `repeat(2,1fr)` mobile. `4px` radius on cards.
  Files: `src/app/programs/page.tsx`, `src/components/programs/ProgramPathwayGrid.tsx`, `src/components/programs/ProgramFilterBar.tsx`, `src/components/programs/ProgramCard.tsx`

---

- [ ] **TASK-012** | Est: 1.5h
  **Program detail page**
  Individual track page — static generation.

  Acceptance: `app/programs/[track]/page.tsx`. `generateStaticParams()` from `programs.ts`. `notFound()` for unknown slugs. Sections: overview, curriculum overview, mode comparison, schedule, pedagogy summary, "Book Free Class" CTA. Fully static — no dynamic routes. Server Component.
  Files: `src/app/programs/[track]/page.tsx`

---

- [ ] **TASK-013** | Est: 1h
  **Program index page**
  All tracks listed with exam type filter.

  Acceptance: `app/programs/page.tsx`. All programs listed in editorial vertical list (NOT table or grid). Exam type filter tabs above list. Each item: program name, exam type, class level, mode, duration, "Know More →" link. Server Component.
  Files: `src/app/programs/page.tsx`

---

## Phase 3 — App Experience and Center Discovery

---

- [ ] **TASK-014** | Est: 1h
  **AppExperienceModule**
  Mobile app feature showcase.

  Acceptance: Feature list: personalization, adaptive practice, live doubt solving. Screen preview cards with captions. App Store + Google Play badges — each with `aria-label="Download on App Store"` / `aria-label="Get it on Google Play"`. Install event tracking `onClick` handler. Server Component.
  Files: `src/components/home/AppExperienceModule.tsx`

---

- [ ] **TASK-015** | Est: 20m
  **App install event tracking**
  Source + platform attribution on badge click.

  Acceptance: `'use client'` wrapper on badges. Click fires `window.dataLayer?.push({ event: 'app_install_click', source: pagePath, platform: 'ios'|'android' })`. No tracking fires on server render.
  Files: `src/components/ui/AppStoreBadge.tsx`

---

- [ ] **TASK-016** | Est: 1h
  **Center index page**
  City grid with center count.

  Acceptance: `app/centers/page.tsx`. CSS Grid city list, each with city name Inter 600, center count badge, link to `/centers/[city]`. Tint bg. Server Component.
  Files: `src/app/centers/page.tsx`

---

- [ ] **TASK-017** | Est: 1h
  **Center detail page**
  Individual center with map, schedule, and fee range.

  Acceptance: `app/centers/[city]/page.tsx`. `generateStaticParams()` from `centers.ts`. `notFound()` for unknown city. Sections: center name, address, phone (`<a href="tel:...">`), map `<iframe title="Map of [city] center">`, batch schedule list, fee range, local inquiry CTA. Server Component.
  Files: `src/app/centers/[city]/page.tsx`

---

## Phase 4 — Admissions Funnel

---

- [ ] **TASK-018** | Est: 1.5h
  **FreeClassForm**
  Lead capture with OTP phone verification.

  Acceptance: `'use client'`. Fields: student name, class selector, city selector, parent phone. OTP step: 6-digit code input, resend after 60s countdown. Confirmation screen with counselor assignment message. All `<label>` linked via `htmlFor`. Error states: `role="alert"`, never `display:none`. `4px` radius inputs.
  Files: `src/components/admissions/FreeClassForm.tsx`

---

- [ ] **TASK-019** | Est: 45m
  **OTP API route**
  Issue, verify, rate-limit OTP.

  Acceptance: POST `/api/otp`: generate 6-digit OTP, store in memory/KV with 10-min TTL. Rate limit: 3 OTPs per phone per 10 minutes — return `429` on excess. POST `/api/otp/verify`: match OTP, return success/error. Responds with `{ success: boolean, message: string }`.
  Files: `src/app/api/otp/route.ts`, `src/app/api/otp/verify/route.ts`

---

- [ ] **TASK-020** | Est: 45m
  **Leads API route**
  Validate and CRM push.

  Acceptance: POST `/api/leads`: validate required fields (name, phone, class, city, examInterest). Return `400` with field errors on invalid. CRM push placeholder (log to console if no CRM configured). Return `{ success: true, confirmationId: string }`.
  Files: `src/app/api/leads/route.ts`

---

- [ ] **TASK-021** | Est: 1.5h
  **Scholarship registration flow**
  Multi-step eligibility → slot → center → confirmation.

  Acceptance: `'use client'` on page. Steps: eligibility (class + exam) → test slot picker → center preference → form (name, phone, email) → confirmation. Progress indicator shows step `N of 4`. POST `/api/scholarship` stores registration. Confirmation: exam name, date, center, admit card download placeholder. Error: `role="alert"`.
  Files: `src/app/scholarship/page.tsx`, `src/app/api/scholarship/route.ts`

---

- [ ] **TASK-022** | Est: 45m
  **Scholarship API route**
  Validate registration and return confirmation.

  Acceptance: POST `/api/scholarship`: validate all fields, store registration (in-memory or file for static). Return `{ success: true, confirmationId: string, examDetails: {...} }`. Return `400` on missing fields with field-level errors.
  Files: `src/app/api/scholarship/route.ts`

---

- [ ] **TASK-023** | Est: 1h
  **FreeClassCTABand**
  Bottom-of-page conversion module.

  Acceptance: Tint bg section at page bottom. Class selector + city selector embedded as mini inline form. "Book Free Class →" CTA action bg. On submit → open `FreeClassForm` with pre-filled values. Server Component wrapper, client `<form>`.
  Files: `src/components/home/FreeClassCTABand.tsx`

---

## Phase 5 — QA

---

- [ ] **TASK-024** | Est: 45m
  **Analytics instrumentation**
  Funnel event tracking.

  Acceptance: `'use client'` wrappers push to `window.dataLayer`: `page_view`, `cta_click` (with cta_label), `form_start`, `otp_sent`, `form_submit` (with exam_interest + class + city). No events fire server-side.
  Files: `src/lib/analytics.ts`

---

- [ ] **TASK-025** | Est: 1h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== No hardcoded hex in components ===" && \
    grep -r "#[0-9A-Fa-f]\{3,6\}" src/components --include="*.tsx" \
    && echo "FAIL — use CSS variables" || echo "PASS"

  echo "=== ResultsFilter is use client ===" && \
    grep -r "'use client'" src/components/results/ResultsFilter.tsx && echo "PASS" || echo "FAIL"

  echo "=== ProgramFilterBar is use client ===" && \
    grep -r "'use client'" src/components/programs/ProgramFilterBar.tsx && echo "PASS" || echo "FAIL"

  echo "=== FreeClassForm is use client ===" && \
    grep -r "'use client'" src/components/admissions/FreeClassForm.tsx && echo "PASS" || echo "FAIL"

  echo "=== AppStoreBadge has aria-label ===" && \
    grep -r "aria-label" src/components/ui/AppStoreBadge.tsx && echo "PASS" || echo "FAIL"

  echo "=== ProofMetricsBand has aria-live ===" && \
    grep -r "aria-live" src/components/home/ProofMetricsBand.tsx && echo "PASS" || echo "FAIL"

  echo "=== Methodology note not hidden ===" && \
    grep -r "accordion\|collapse\|hidden\|display.*none" src/app/results/page.tsx \
    && echo "REVIEW — methodology must always be visible" || echo "PASS"

  echo "=== Map iframe has title ===" && \
    grep -r "title=" src/app/centers --include="*.tsx" && echo "PASS" || echo "FAIL"

  echo "=== No border-radius above 4px ===" && \
    grep -r "rounded-md\|rounded-lg\|rounded-xl\|rounded-full" \
    src/components --include="*.tsx" \
    && echo "FAIL — 4px only" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥95, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
