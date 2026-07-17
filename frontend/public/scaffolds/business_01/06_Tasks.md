# 06 — Tasks
## Results-Led IIT-JEE / NEET Coaching Website · business_platform_01

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
  Inter weight 400, 600, 700 for all text. No decorative fonts — institutional clarity only.

  Acceptance: DevTools shows Inter on all text. `grep -r "Playfair\|serif\|Georgia" src` returns empty.
  Files: `src/app/layout.tsx`

---

- [ ] **TASK-003** | Est: 30m
  **Design tokens — CSS variables**
  All color values as CSS custom properties. Light bg globally — never pure white as section bg.

  Tokens (exact values):
  ```css
  --color-bg:       #F8FAFD;
  --color-surface:  #FFFFFF;
  --color-tint:     #EDF3FA;
  --color-ink:      #152238;
  --color-muted:    #4C5C72;
  --color-border:   rgba(21,34,56,0.14);
  --color-action:   #0F4AA8;
  --color-hover:    #0C3A84;
  --color-success:  #1E7D3A;
  --color-warning:  #B26A12;
  --color-data:     #5E3AA8;

  body { background: var(--color-bg); color: var(--color-ink); }
  ```

  Acceptance: All variables in DevTools. Body bg is `#F8FAFD`. `grep -r "bg-white\|background.*#fff\|background: white" src/components --include="*.tsx"` → empty (surface is `#FFFFFF` but accessed only via `var(--color-surface)`).
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

  Acceptance: `.sr-only` hides text visually. `@media (prefers-reduced-motion: reduce)` sets `transition-duration: 0.01ms`. Focus ring visible on all interactive elements.
  Files: `src/app/globals.css`

---

- [ ] **TASK-005** | Est: 1h
  **TypeScript types**
  All domain types exported. `tsc --noEmit` exits 0.

  ```typescript
  export type ExamType = 'jee' | 'neet' | 'foundation' | 'olympiad'
  export type ProgramMode = 'classroom' | 'online' | 'hybrid'
  export type DietaryType = never  // not applicable

  export interface ResultProof {
    id: string; studentName: string; rank: string
    exam: ExamType; year: string; programTrack: string
    imageAlt: string; isVerified: boolean
  }

  export interface Program {
    id: string; name: string; exam: ExamType
    classRange: string; mode: ProgramMode
    duration: string; description: string
  }

  export interface Center {
    id: string; city: string; address: string
    phone: string; mapEmbedSrc: string
    batches: string[]; facilities: string[]
  }

  export interface Lead {
    name: string; phone: string; city: string
    examInterest: ExamType; class: string
    source: string
  }

  export interface ScholarshipRegistration {
    name: string; phone: string; class: string
    city: string; examPreference: ExamType
    testDate: string
  }
  ```

  Files: `src/types/index.ts`

---

- [ ] **TASK-006** | Est: 45m
  **Static data files**
  Mock data for all sections.

  Acceptance: `results.ts` exports 8 `ResultProof` objects across JEE/NEET, at least 4 with `isVerified: true`. `programs.ts` exports 6 `Program` objects covering all 4 exam types. `centers.ts` exports 5 `Center` objects across different cities. `tsc --noEmit` clean.
  Files: `src/lib/results.ts`, `src/lib/programs.ts`, `src/lib/centers.ts`

---

## Phase 1 — Navigation and Hero

---

- [ ] **TASK-007** | Est: 1h
  **SiteNav + UtilityStrip**
  Sticky nav with helpline strip above.

  Acceptance: `UtilityStrip`: action bg `var(--color-action)`, white text, helpline number, "Free Counseling" link. `SiteNav`: bg bg `var(--color-surface)`, scroll shadow `box-shadow: 0 1px 4px rgba(21,34,56,0.1)`. Logo left Inter 700. Links: Results, Programs, Centers, Scholarship, Contact. "Book Free Class" CTA button bg `var(--color-action)` white text `4px` radius. `44px` min-height on CTA. Server Components.
  Files: `src/components/layout/UtilityStrip.tsx`, `src/components/layout/SiteNav.tsx`

---

- [ ] **TASK-008** | Est: 1h
  **HeroSection**
  Homepage hero with key proof signal.

  Acceptance: Tint bg `var(--color-tint)`. Inter 700 `clamp(36px, 5vw, 62px)` headline. Inter 400 `18px` sub-headline. Two CTAs: "Book Free Counseling" (filled action) + "View Results" (ghost `1px action border`). `4px` radius on both buttons. Metric row below headline: 3–4 key stats (e.g., "Selections in 2024", "Centers across India"). Server Component.
  Files: `src/components/home/HeroSection.tsx`

---

## Phase 2 — Proof and Programs

---

- [ ] **TASK-009** | Est: 1.5h
  **ResultsProofHub**
  Year/exam/program filtered result cards.

  Acceptance: `ResultsFilter.tsx` is `'use client'`. 3 filter dropdowns: exam type, year, program track. `ResultCard.tsx` (server): student photo with `alt` text, rank Inter 700 `24px` action color, exam badge, program label, verified checkmark if `isVerified`. Result methodology note in Inter `12px` muted at section bottom — always visible. `tsc --noEmit` clean.
  Files: `src/app/results/page.tsx`, `src/components/results/ResultsFilter.tsx`, `src/components/results/ResultCard.tsx`

---

- [ ] **TASK-010** | Est: 1.5h
  **ProgramPathwayGrid**
  Course discovery by exam type.

  Acceptance: CSS Grid `grid-template-columns: repeat(3, 1fr)` desktop, `repeat(2, 1fr)` tablet, `1fr` mobile. Each card: exam type badge, program name Inter 600, class range Inter 400 `14px`, mode chip (classroom/online/hybrid), duration, "Know More →" action-color link. Card bg `var(--color-surface)`, `4px` radius, border `1px solid var(--color-border)`. `ProgramFilterBar.tsx` is `'use client'` — exam type tabs. Server Component for grid.
  Files: `src/app/programs/page.tsx`, `src/components/programs/ProgramPathwayGrid.tsx`, `src/components/programs/ProgramFilterBar.tsx`

---

- [ ] **TASK-011** | Est: 1h
  **Program detail page**
  Individual track pages — `generateStaticParams` from programs data.

  Acceptance: `app/programs/[track]/page.tsx`. `generateStaticParams()` from `programs.ts`. `notFound()` for unknown slugs. Sections: overview, curriculum list, mode comparison table, schedule, pedagogy summary, "Book Free Class" CTA. No dynamic server routes — fully static. Server Component.
  Files: `src/app/programs/[track]/page.tsx`

---

## Phase 3 — Center Discovery and Admissions

---

- [ ] **TASK-012** | Est: 1h
  **Center pages**
  City-based center directory.

  Acceptance: `app/centers/page.tsx`: CSS Grid city list, each city links to `/centers/[city]`. `app/centers/[city]/page.tsx`: center name, address, phone, map embed (`<iframe>` with `title` attribute), batch schedule, facilities list. `generateStaticParams()` from `centers.ts`. `notFound()` for unknown city. Server Components.
  Files: `src/app/centers/page.tsx`, `src/app/centers/[city]/page.tsx`

---

- [ ] **TASK-013** | Est: 1.5h
  **AdmissionsLeadForm**
  Counseling lead capture — client component.

  Acceptance: `'use client'` directive. Fields: name, phone (OTP-verified placeholder), class selector, city selector, exam interest selector. Submit → POST `/api/leads`. Confirmation screen with counselor assignment message. All `<label>` elements linked to inputs via `htmlFor`. Error states use `role="alert"`. No `display:none` on error — use opacity or height transition. `4px` radius on inputs.
  Files: `src/components/admissions/AdmissionsLeadForm.tsx`, `src/app/api/leads/route.ts`

---

- [ ] **TASK-014** | Est: 1h
  **ScholarshipFlow**
  Scholarship test registration — multi-step.

  Acceptance: `'use client'` on page. Steps: eligibility (class/exam) → test slot picker → city preference → confirmation. Progress indicator shows current step. `/api/scholarship` POST validates + stores. Confirmation screen with admit card download placeholder. Error on invalid slot handled with inline message. `4px` radius throughout.
  Files: `src/app/scholarship/page.tsx`, `src/app/api/scholarship/route.ts`

---

## Phase 4 — QA

---

- [ ] **TASK-015** | Est: 1h
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

  echo "=== AdmissionsLeadForm is use client ===" && \
    grep -r "'use client'" src/components/admissions/AdmissionsLeadForm.tsx && echo "PASS" || echo "FAIL"

  echo "=== ResultCard has alt text pattern ===" && \
    grep -r "alt=" src/components/results/ResultCard.tsx && echo "PASS" || echo "FAIL"

  echo "=== Map iframe has title ===" && \
    grep -r "title=" src/app/centers --include="*.tsx" && echo "PASS" || echo "FAIL"

  echo "=== Result methodology note present ===" && \
    grep -r "methodology\|source\|verified" src/app/results/page.tsx && echo "PASS" || echo "REVIEW"

  echo "=== No border-radius above 4px ===" && \
    grep -r "rounded-md\|rounded-lg\|rounded-xl\|rounded-full\|border-radius: [5-9]" \
    src/components --include="*.tsx" \
    && echo "FAIL — 4px only" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
