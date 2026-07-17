# 06 — Tasks
## Enterprise Tech Summit & Leadership Forum · lp_platform_02

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
  Deep navy foundation with glassmorphism surfaces.

  ```css
  --color-bg:       #050B1A;
  --color-glass:    rgba(255,255,255,0.04);
  --color-border:   rgba(255,255,255,0.1);
  --color-ink:      #FFFFFF;
  --color-muted:    rgba(255,255,255,0.6);
  --color-accent:   #F97316;
  --color-accent-2: #7C3AED;

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

  Acceptance: All variables in DevTools. `grep -r "bg-white\|background.*#fff\|background: white" src/components --include="*.tsx"` → empty.
  Files: `src/app/globals.css`

---

- [ ] **TASK-003** | Est: 45m
  **TypeScript types**
  All domain types exported. `tsc --noEmit` exits 0.

  ```typescript
  export type SummitTrack = 'ai' | 'deeptech' | 'fintech' | 'leadership' | 'startup'
  export type AgendaView = 'chronological' | 'venue' | 'my_schedule'

  export interface Speaker {
    id: string; name: string; designation: string
    company: string; companyLogoAlt: string
    track: SummitTrack; imageAlt: string
    linkedSessions: string[]
  }

  export interface Session {
    id: string; title: string; speakerId: string
    track: SummitTrack; venue: string
    date: string; startTime: string; endTime: string
  }

  export interface ThematicPillar {
    id: string; name: string; description: string
    svgIconLabel: string; track: SummitTrack
  }

  export interface StartupFounder {
    id: string; companyName: string; founderName: string
    imageAlt: string; boothPreviewAlt: string; sector: string
  }
  ```

  Files: `src/types/index.ts`

---

- [ ] **TASK-004** | Est: 45m
  **Static data files**
  Mock data for all sections.

  Acceptance: `speakers.ts` exports 9 `Speaker` objects across 3+ tracks. `sessions.ts` exports 12 `Session` objects across 3 venues and 2 dates. `pillars.ts` exports 4 `ThematicPillar` objects — each with a distinct `svgIconLabel`. `founders.ts` exports 6 `StartupFounder` objects. `tsc --noEmit` clean.
  Files: `src/lib/speakers.ts`, `src/lib/sessions.ts`, `src/lib/pillars.ts`, `src/lib/founders.ts`

---

## Phase 1 — Navigation and Hero

---

- [ ] **TASK-005** | Est: 1h
  **SiteNav**
  Enterprise dark nav with glassmorphism.

  Acceptance: `backdrop-blur-xl` with `var(--color-glass)` bg. Orange CTA "Register Now" `2px` radius, `44px` height. Logo left Inter 700. Links: Agenda, Speakers, Startups, App. Mobile hamburger `aria-expanded`. `1px solid var(--color-border)` bottom border. Server Component.
  Files: `src/components/layout/SiteNav.tsx`

---

- [ ] **TASK-006** | Est: 1h
  **ThematicHero**
  Abstract innovation visual with H1 and pillar preview.

  Acceptance: Full-bleed dark bg. Abstract SVG geometric motif (AI nodes / circuit lines) as background — NOT a photograph. Inter 800 `clamp(36px, 5vw, 64px)` white headline. Inter 400 `18px` muted sub-headline. "Register Now" accent filled CTA + "View Agenda" ghost `1px border`. Server Component.
  Files: `src/components/home/ThematicHero.tsx`

---

- [ ] **TASK-007** | Est: 1.5h
  **ThematicPillarGrid + EcosystemStats**
  4-pillar icon grid and metrics strip.

  Acceptance: `ThematicPillarGrid`: CSS Grid `repeat(4,1fr)` desktop → `repeat(2,1fr)` mobile. Each pillar card: glass bg `var(--color-glass)`, `backdrop-blur-xl`, `1px solid var(--color-border)`, SVG icon with `aria-label={pillar.svgIconLabel}`, pillar name Inter 600, description Inter 400 `14px`. `EcosystemStats`: 3–4 metrics in Inter 800 accent. Server Components.
  Files: `src/components/home/ThematicPillarGrid.tsx`, `src/components/home/EcosystemStats.tsx`

---

## Phase 2 — Agenda Hub

---

- [ ] **TASK-008** | Est: 2h
  **Multi-View Agenda Hub**
  Chronological / Venue / My-Schedule toggle with filtering.

  Acceptance: `app/agenda/page.tsx`. `AgendaViewToggle.tsx` is `'use client'`: 3 view buttons (Chronological / Venue / My-Schedule). `AgendaFilter.tsx` is `'use client'`: Date tabs + Track filter (AI, DeepTech, FinTech). `TimelineRow.tsx` (server): [Time] [Venue] [Title] 3-column stack, track badge. My-Schedule: saved to `localStorage` — no auth required for session bookmark. `useReducedMotion()` guard on view transitions.
  Files: `src/app/agenda/page.tsx`, `src/components/agenda/AgendaViewToggle.tsx`, `src/components/agenda/AgendaFilter.tsx`, `src/components/agenda/TimelineRow.tsx`

---

## Phase 3 — Speaker Directory and Startup Zone

---

- [ ] **TASK-009** | Est: 1.5h
  **Speaker Directory**
  Corporate portraits with designation and bio modal.

  Acceptance: `app/speakers/page.tsx`. `SpeakerCard.tsx` (server): professional portrait `alt={speaker.imageAlt}`, name Inter 700, designation + company, company logo `alt={speaker.companyLogoAlt}`. "View Bio →" opens `SpeakerModal.tsx` which is `'use client'`: `role="dialog"` with `aria-modal="true"`, bio text, linked sessions list. Glass card bg, `1px solid var(--color-border)`, `2px` radius. Filter by track.
  Files: `src/app/speakers/page.tsx`, `src/components/speakers/SpeakerCard.tsx`, `src/components/speakers/SpeakerModal.tsx`

---

- [ ] **TASK-010** | Est: 1h
  **Startup Innovation Zone**
  Founder cards with meeting request CTA.

  Acceptance: Masonry grid of `StartupFounderCard.tsx` (server): company name Inter 700, founder name Inter 400, booth preview `<img alt={founder.boothPreviewAlt}>`, sector tag, "Request Meeting →" accent link. Glass card bg. `aria-label` on Request Meeting link includes company name.
  Files: `src/components/home/StartupFounderCard.tsx`

---

## Phase 4 — QA

---

- [ ] **TASK-011** | Est: 1h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== No white backgrounds ===" && \
    grep -r "bg-white\|background.*#fff\|background: white" src/components --include="*.tsx" \
    && echo "FAIL — dark navy only" || echo "PASS"

  echo "=== AgendaViewToggle is use client ===" && \
    grep -r "'use client'" src/components/agenda/AgendaViewToggle.tsx && echo "PASS" || echo "FAIL"

  echo "=== AgendaFilter is use client ===" && \
    grep -r "'use client'" src/components/agenda/AgendaFilter.tsx && echo "PASS" || echo "FAIL"

  echo "=== SpeakerModal is use client ===" && \
    grep -r "'use client'" src/components/speakers/SpeakerModal.tsx && echo "PASS" || echo "FAIL"

  echo "=== SpeakerModal has aria-modal ===" && \
    grep -r "aria-modal" src/components/speakers/SpeakerModal.tsx && echo "PASS" || echo "FAIL"

  echo "=== ThematicPillarGrid SVG icons have aria-label ===" && \
    grep -r "aria-label" src/components/home/ThematicPillarGrid.tsx && echo "PASS" || echo "FAIL"

  echo "=== No hex in component files ===" && \
    grep -r "#[0-9A-Fa-f]\{3,6\}" src/components --include="*.tsx" \
    && echo "FAIL — use CSS variables" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
