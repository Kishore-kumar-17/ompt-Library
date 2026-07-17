# 06 — Tasks
## Premium Course Landing Page & Professional Network · pcpp_platform_17

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
  Professional tech editorial — white, deep slate, reforge blue accent.

  ```css
  --color-bg:       #FFFFFF;
  --color-surface:  #F9FAFB;
  --color-border:   #E5E7EB;
  --color-ink:      #111827;
  --color-muted:    #4B5563;
  --color-accent:   #1D4ED8;

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

  Acceptance: All variables in DevTools. `grep -r "bg-white\|background.*#fff" src/components --include="*.tsx"` → empty.
  Files: `src/app/globals.css`

---

- [ ] **TASK-003** | Est: 45m
  **TypeScript types**
  All domain types exported. `tsc --noEmit` exits 0.

  ```typescript
  export type CourseTrack = 'product' | 'marketing' | 'ai' | 'engineering'
  export type CourseFormat = 'live_cohort' | 'on_demand'

  export interface Artifact {
    id: string; title: string; company: string
    category: CourseTrack; docType: string
    previewSrc: string; previewAlt: string
    isLocked: boolean
  }

  export interface CourseHost {
    id: string; name: string; title: string
    imageSrc: string; imageAlt: string; studentCount: number
  }

  export interface Course {
    slug: string; title: string; track: CourseTrack
    format: CourseFormat; hosts: CourseHost[]
    modules: { name: string; lessons: string[]; artifacts: string[] }[]
    stripePortalUrl: string
  }
  ```

  Files: `src/types/index.ts`

---

- [ ] **TASK-004** | Est: 30m
  **Static data files**
  Mock data for all sections.

  Acceptance: `artifacts.ts` exports 12 `Artifact` objects — mix of locked/unlocked across all 4 tracks. `courseHosts.ts` exports 8 `CourseHost` objects. `courses.ts` exports 4 `Course` objects. `tsc --noEmit` clean.
  Files: `src/lib/artifacts.ts`, `src/lib/courseHosts.ts`, `src/lib/courses.ts`

---

## Phase 1 — Navigation

---

- [ ] **TASK-005** | Est: 1h
  **ProfessionalNav**
  High-authority nav with blue CTA.

  Acceptance: `position: sticky; top: 0`. `background: var(--color-bg)`. `1px solid var(--color-border)` bottom. Logo left Inter 800 `18px`. Links: Artifacts, Courses, Operators, Pricing — `14px`. "Start Trial →" CTA right: `background: var(--color-accent); color: white` `8px` radius `44px` height. `aria-label="Main navigation"`. Server Component.
  Files: `src/components/layout/ProfessionalNav.tsx`

---

- [ ] **TASK-006** | Est: 1h
  **AlumniLogoStrip**
  Monochrome company logo wall for social proof.

  Acceptance: `AlumniLogoStrip.tsx` (server): `<ul role="list">` horizontal wrap. Each `<li>`: `<img>` `filter: grayscale(1) opacity(0.5)`. Hover: `filter: grayscale(0) opacity(1)` `200ms`. `prefers-reduced-motion`: no filter transition. `aria-label="Companies that trust us"` on container. Data sourced from a local `alumniCompanies` array (plain objects, not typed `AlumniCompany` interface). Server Component.
  Files: `src/components/home/AlumniLogoStrip.tsx`

---

## Phase 2 — Artifact Discovery

---

- [ ] **TASK-007** | Est: 2h
  **ArtifactGrid + gated state**
  Real-world strategy document preview grid.

  Acceptance: `app/artifacts/page.tsx`. `CategoryFilter.tsx` is `'use client'`: filter by `CourseTrack` — `aria-pressed` on active. CSS Grid `repeat(4,1fr)` desktop → `repeat(2,1fr)` mobile. Each `ArtifactCard.tsx` (server): preview `<img src={artifact.previewSrc} alt={artifact.previewAlt}>` `aspect-ratio: 3/4`. Company Inter 700 `13px` uppercase muted. Title Inter 600 `16px`. `docType` `12px` muted. If `isLocked`: `<div aria-label="Locked — member access required">` overlay `opacity: 0.4` + lock icon text "Member only" `12px`. `8px` radius. `1px solid var(--color-border)`. NEVER `display: none` on locked preview — opacity overlay only. `AnimatePresence` on filtered cards `opacity 0→1` `200ms`. `prefers-reduced-motion`: instant.
  Files: `src/app/artifacts/page.tsx`, `src/components/artifacts/CategoryFilter.tsx`, `src/components/artifacts/ArtifactCard.tsx`

---

## Phase 3 — Curriculum Hub

---

- [ ] **TASK-008** | Est: 1.5h
  **Course catalog + detail page**
  Dense curriculum layout with operator hosts.

  Acceptance: `app/courses/page.tsx`. `TrackFilter.tsx` is `'use client'`: filter by `CourseTrack` — Product, Marketing, AI, Engineering. `aria-pressed`. `FormatToggle.tsx` is `'use client'`: Live Cohort / On Demand (`CourseFormat`) — `aria-pressed`. `CourseCard.tsx` (server): title Inter 700 `20px`, `format` badge `12px` uppercase, `track` badge `12px` uppercase muted. Host portrait thumbnails from `course.hosts`: `<img src={host.imageSrc} alt={host.imageAlt}>` `32px` circle row. `8px` radius. `app/courses/[slug]/page.tsx`: `generateStaticParams()`. Module list `<ol>` Inter `16px` with lessons per module. `CourseHostCard.tsx` (server): portrait `<img src={host.imageSrc} alt={host.imageAlt}>`, name `16px`, title `13px` `color: var(--color-accent)`, `studentCount` `12px` muted. "Join →" `<a href={course.stripePortalUrl}>` external link. NEVER inline enrollment form.
  Files: `src/app/courses/page.tsx`, `src/app/courses/[slug]/page.tsx`, `src/components/courses/TrackFilter.tsx`, `src/components/courses/FormatToggle.tsx`, `src/components/courses/CourseCard.tsx`, `src/components/courses/CourseHostCard.tsx`

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

  echo "=== CategoryFilter has aria-pressed ===" && \
    grep -r "aria-pressed" src/components/artifacts/CategoryFilter.tsx && echo "PASS" || echo "FAIL"

  echo "=== Artifacts use isLocked not isGated ===" && \
    grep -r "isLocked" src/lib/artifacts.ts && echo "PASS" || echo "FAIL"

  echo "=== Locked artifacts not display none ===" && \
    grep -r "display.*none\|hidden" src/components/artifacts/ArtifactCard.tsx \
    && echo "FAIL — use opacity overlay, not display:none" || echo "PASS"

  echo "=== TrackFilter has aria-pressed ===" && \
    grep -r "aria-pressed" src/components/courses/TrackFilter.tsx && echo "PASS" || echo "FAIL"

  echo "=== Courses use hosts not operatorIds ===" && \
    grep -r "hosts:" src/lib/courses.ts && echo "PASS" || echo "FAIL"

  echo "=== generateStaticParams in courses page ===" && \
    grep -r "generateStaticParams" src/app/courses --include="*.tsx" && echo "PASS" || echo "FAIL"

  echo "=== No enrollment form ===" && \
    grep -r "stripe\|checkout\|CardElement" src/app/courses --include="*.tsx" \
    && echo "FAIL — external link only" || echo "PASS"

  echo "=== No hex in component files ===" && \
    grep -r "#[0-9A-Fa-f]\{3,6\}" src/components --include="*.tsx" \
    && echo "FAIL — use CSS variables" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
