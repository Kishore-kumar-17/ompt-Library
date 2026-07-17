# 06 — Tasks
## Exam-Prep Edtech Discovery & Detail Pages · pcpp_platform_19

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
  Academic modernism — white base, success green primary, iconic gold premium.

  ```css
  --color-bg:       #FFFFFF;
  --color-surface:  #F7F7F7;
  --color-border:   #E5E7EB;
  --color-ink:      #1A1A1A;
  --color-muted:    #757575;
  --color-success:  #08BD80;
  --color-iconic:   #FBB03B;

  body { background: var(--color-bg); color: var(--color-ink); }

  :focus-visible {
    outline: 2px solid var(--color-success);
    outline-offset: 2px;
  }

  .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
  }
  ```

  Acceptance: All variables in DevTools. `grep -r "bg-green\|#08BD" src/components --include="*.tsx"` → empty (use CSS variables).
  Files: `src/app/globals.css`

---

- [ ] **TASK-003** | Est: 45m
  **TypeScript types**
  All domain types exported. `tsc --noEmit` exits 0.

  ```typescript
  export type ExamCategory = 'upsc' | 'neet' | 'jee' | 'cat' | 'gate' | 'banking'

  export interface Educator {
    id: string; name: string; subject: string
    experience: number
    followers: number
    avatarSrc: string; avatarAlt: string
  }

  export interface Batch {
    id: string; title: string; educatorId: string
    examCategory: ExamCategory
    startDate: string
    isFree: boolean
  }

  export interface SubscriptionPlan {
    id: 'plus' | 'iconic'
    name: string; monthlyPrice: number; annualPrice: number
    features: { label: string; included: boolean }[]
    subscriptionUrl: string
  }
  ```

  Files: `src/types/index.ts`

---

- [ ] **TASK-004** | Est: 30m
  **Static data files**
  Mock data for all sections.

  Acceptance: `educators.ts` exports 6 `Educator` objects. `batches.ts` exports 10 `Batch` objects across all 6 `ExamCategory` values — mix of free and paid. `subscriptionPlans.ts` exports 2 `SubscriptionPlan` objects (plus + iconic). `tsc --noEmit` clean.
  Files: `src/lib/educators.ts`, `src/lib/batches.ts`, `src/lib/subscriptionPlans.ts`

---

## Phase 1 — Navigation and Hero

---

- [ ] **TASK-005** | Est: 1h
  **HubNav + Goal search hero**
  Category navigation with prominent exam goal entry.

  Acceptance: `HubNav.tsx` (server): `position: sticky; top: 0`. `background: var(--color-bg)`. Logo left Inter 800 `20px`. Category links: UPSC, NEET, JEE, CAT, GATE, Banking — `13px` uppercase. "Start Free →" right: `background: var(--color-success); color: white` `8px` radius `44px`. `aria-label="Main navigation"`. Hero: heading Inter 800 `clamp(32px,5vw,48px)`. Sub: `18px` muted. `GoalSearchInput.tsx` is `'use client'`: `<input type="search" aria-label="Search for your exam goal">` — filters `Batch[]` by title on keystroke. Results dropdown: batch title + examCategory. Keyboard: ArrowUp/Down to navigate, Enter to select, Escape to close. `role="combobox"` `aria-expanded`. `8px` radius.
  Files: `src/components/layout/HubNav.tsx`, `src/components/home/GoalSearchInput.tsx`

---

## Phase 2 — Discovery Grid

---

- [ ] **TASK-006** | Est: 1.5h
  **ExamGrid + statistics strip**
  Goal-based exam discovery and social proof stats.

  Acceptance: `app/page.tsx`. `StatBand.tsx` (server): stat strip with 4 hardcoded values displayed in `repeat(4,1fr)` grid. Value Inter 800 `clamp(24px,3vw,36px)` `color: var(--color-success)`. Label `14px` muted. `BatchGrid.tsx` (server): CSS Grid `repeat(4,1fr)` desktop → `repeat(2,1fr)` mobile. Each `BatchCard.tsx` (server): title Inter 700 `18px`, examCategory badge `14px` muted, isFree "Free" tag `12px` muted. `8px` radius. `1px solid var(--color-border)`. Server Component.
  Files: `src/app/page.tsx`, `src/components/home/StatBand.tsx`, `src/components/home/ExamGrid.tsx`, `src/components/home/ExamCard.tsx`

---

- [ ] **TASK-007** | Est: 1.5h
  **Educator directory**
  Celebrity-style educator pedigree cards.

  Acceptance: `app/educators/page.tsx`. CSS Grid `repeat(4,1fr)` desktop → `repeat(2,1fr)` mobile. `EducatorCard.tsx` (server): portrait `<img alt={educator.avatarAlt} aria-label="{educator.name}, {educator.subject}, {educator.experience} yrs">`. Name Inter 700 `16px`. Subject `13px` muted. Experience (number, years) `12px` muted. Followers `12px` muted. `8px` radius. `1px solid var(--color-border)`. `background: var(--color-surface)`. Server Component.
  Files: `src/app/educators/page.tsx`, `src/components/educators/EducatorCard.tsx`

---

## Phase 3 — Subscription Plans

---

- [ ] **TASK-008** | Est: 1h
  **Plan comparison — Plus vs Iconic**
  Side-by-side subscription feature comparison. No real payment.

  Acceptance: `app/plans/page.tsx`. `PlanComparison.tsx` (server): CSS Grid `repeat(2,1fr)` desktop → stacked mobile. Each `PlanCard.tsx` (server): `name` Inter 800 `24px`. Iconic plan: `border: 2px solid var(--color-iconic)`. `PricingToggle.tsx` is `'use client'`: Monthly / Annual toggle — `aria-pressed`. Monthly shows `monthlyPrice`; Annual shows `annualPrice` + "Save" badge `11px` muted. Features `<ul>`: item `label` with `included` → `✓`/`✗` `color: var(--color-success)`/muted — NOT SVG icon. "Choose Plan →" `<a href={plan.subscriptionUrl} aria-label="Choose {plan.name} plan">` `background: var(--color-success)` (or `var(--color-iconic)` for iconic) `8px` radius `44px`. NEVER render payment form.
  Files: `src/app/plans/page.tsx`, `src/components/plans/PlanComparison.tsx`, `src/components/plans/PlanCard.tsx`, `src/components/plans/PricingToggle.tsx`

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

  echo "=== GoalSearchInput is use client ===" && \
    grep -r "'use client'" src/components/home/GoalSearchInput.tsx && echo "PASS" || echo "FAIL"

  echo "=== GoalSearchInput has role=combobox ===" && \
    grep -r "combobox\|aria-expanded" src/components/home/GoalSearchInput.tsx && echo "PASS" || echo "FAIL"

  echo "=== EducatorCard has aria-label with pedigree ===" && \
    grep -r "aria-label" src/components/educators/EducatorCard.tsx && echo "PASS" || echo "FAIL"

  echo "=== PricingToggle is use client ===" && \
    grep -r "'use client'" src/components/plans/PricingToggle.tsx && echo "PASS" || echo "FAIL"

  echo "=== PricingToggle has aria-pressed ===" && \
    grep -r "aria-pressed" src/components/plans/PricingToggle.tsx && echo "PASS" || echo "FAIL"

  echo "=== No payment form ===" && \
    grep -r "stripe\|CardElement\|payment_intent" src --include="*.tsx" \
    && echo "FAIL — external link only" || echo "PASS"

  echo "=== No hex in component files ===" && \
    grep -r "#[0-9A-Fa-f]\{3,6\}" src/components --include="*.tsx" \
    && echo "FAIL — use CSS variables" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
