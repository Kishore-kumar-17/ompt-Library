# 06 — Tasks
## Global Scale Multi-Day Conference · lp_platform_01

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
  Dark mode only. Pure black foundation with neon green accent.

  ```css
  --color-bg:       #000000;
  --color-surface:  #0A0A0A;
  --color-border:   rgba(255,255,255,0.1);
  --color-ink:      #FFFFFF;
  --color-muted:    #A1A1AA;
  --color-accent:   #00FF85;
  --color-accent-2: #6C4BFF;

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
  export type SpeakerTrack = 'centre' | 'growthconf' | 'autotech' | 'fintech' | 'health'
  export type TicketTier = 'general' | 'executive' | 'chairperson'

  export interface Speaker {
    id: string; name: string; role: string; company: string
    country: string; track: SpeakerTrack; imageAlt: string
    isFeatured?: boolean
  }

  export interface Session {
    id: string; title: string; speakerId: string
    stage: SpeakerTrack; startTime: string; endTime: string
    day: 1 | 2 | 3
  }

  export interface TicketTierData {
    id: TicketTier; name: string; price: number
    currency: string; features: string[]
    scarcityLabel?: string; isFeatured?: boolean
  }

  export interface StartupAlpha {
    id: string; companyName: string; sector: string; stage: string
  }
  ```

  Files: `src/types/index.ts`

---

- [ ] **TASK-004** | Est: 45m
  **Static data files**
  Mock data for all sections.

  Acceptance: `speakers.ts` exports 12 `Speaker` objects across 3+ tracks, at least 3 `isFeatured: true`. `sessions.ts` exports 8 `Session` objects across 2 days and 3 stages. `tickets.ts` exports exactly 3 `TicketTierData` objects with `scarcityLabel` on at least 1. `tsc --noEmit` clean.
  Files: `src/lib/speakers.ts`, `src/lib/sessions.ts`, `src/lib/tickets.ts`

---

## Phase 1 — Hero and Urgency

---

- [ ] **TASK-005** | Est: 1h
  **SiteNav**
  Minimal dark sticky navigation.

  Acceptance: Transparent bg over hero; black bg on scroll. Logo left Inter 700 white. Links: Speakers, Schedule, Tickets, Startups. "Buy Tickets" CTA: accent bg `#00FF85`, black text, `2px` radius, `44px` height. `0px` radius on links. Server Component.
  Files: `src/components/layout/SiteNav.tsx`

---

- [ ] **TASK-006** | Est: 1.5h
  **VideoHero**
  Full-bleed cinematic video hero.

  Acceptance: `<video>` with `autoPlay muted loop playsInline poster={posterSrc}`. Poster rendered immediately — no layout shift. Dark `0.6` opacity overlay. Inter 900 `clamp(48px, 7vw, 96px)` white headline. Real-time ticket countdown ticker (client component). `prefers-reduced-motion`: pause video, hide countdown animation. `VideoHero` itself is Server Component — countdown is `'use client'` sub-component.
  Files: `src/components/home/VideoHero.tsx`, `src/components/ui/TicketCountdown.tsx`

---

- [ ] **TASK-007** | Est: 45m
  **StatsStrip + UrgencyMarquee**
  Key metrics and scrolling urgency band.

  Acceptance: `StatsStrip`: 3 stats (Attendees, Speakers, Startups) in Inter 800 accent-color number + white label. Surface bg `var(--color-surface)`. `UrgencyMarquee`: CSS `animation: marquee linear infinite` — pure CSS, no JS. Text alternating between white and accent. `aria-hidden="true"` on marquee (decorative). `prefers-reduced-motion`: pause marquee animation. Server Components.
  Files: `src/components/home/StatsStrip.tsx`, `src/components/ui/UrgencyMarquee.tsx`

---

## Phase 2 — Speaker Directory

---

- [ ] **TASK-008** | Est: 2h
  **Speaker Directory with search and filter**

  Acceptance: `app/speakers/page.tsx`. `SpeakerFilter.tsx` is `'use client'`: industry/track/country filter pills (dark-slate bg, `2px` radius). `SpeakerCard.tsx` (server): B&W headshot (`filter: grayscale(100%)`), hover to color (`filter: none`), name Inter 700, role+company muted `14px`. Masonry CSS columns layout. Search input: Algolia placeholder — debounced client filter on static data. `0px` radius on cards.
  Files: `src/app/speakers/page.tsx`, `src/components/speakers/SpeakerFilter.tsx`, `src/components/speakers/SpeakerCard.tsx`

---

## Phase 3 — Schedule and Ticketing

---

- [ ] **TASK-009** | Est: 1.5h
  **Schedule Hub**
  Multi-stage timeline with day and stage tabs.

  Acceptance: `app/schedule/page.tsx`. `ScheduleTabs.tsx` is `'use client'`: Day tabs (Day 1/2/3) + Stage tabs (Centre Stage, GrowthConf, AutoTech). `TimelineRow.tsx` (server): time column Inter 700 accent, stage badge, session title Inter 600 white, speaker name muted. "Happening Now" accent pulse badge on current session. No `display:none` on filtered items — use `hidden` CSS class that is added/removed via JS.
  Files: `src/app/schedule/page.tsx`, `src/components/schedule/ScheduleTabs.tsx`, `src/components/schedule/TimelineRow.tsx`

---

- [ ] **TASK-010** | Est: 1.5h
  **Ticketing Hub**
  3-column tier comparison with scarcity and urgency.

  Acceptance: `app/tickets/page.tsx`. CSS Grid `grid-template-columns: repeat(3, 1fr)` — NOT flex. `TicketCard.tsx` (server): tier name Inter 700, price Inter 800 white, features list, scarcity label in accent `12px` if `scarcityLabel` present. Featured card: accent `1px solid` border. `PriceCountdownBar.tsx` is `'use client'`: sticky top bar "Price increases in X:XX" — real clock. `2px` radius on buy buttons. `prefers-reduced-motion`: skip countdown animation.
  Files: `src/app/tickets/page.tsx`, `src/components/tickets/TicketCard.tsx`, `src/components/tickets/PriceCountdownBar.tsx`

---

## Phase 4 — QA

---

- [ ] **TASK-011** | Est: 1h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== No white backgrounds ===" && \
    grep -r "bg-white\|background.*#fff\|background: white" src/components --include="*.tsx" \
    && echo "FAIL — dark mode only" || echo "PASS"

  echo "=== VideoHero has poster attribute ===" && \
    grep -r "poster=" src/components/home/VideoHero.tsx && echo "PASS" || echo "FAIL"

  echo "=== VideoHero has muted and playsInline ===" && \
    grep -r "muted\|playsInline" src/components/home/VideoHero.tsx && echo "PASS" || echo "FAIL"

  echo "=== TicketCountdown is use client ===" && \
    grep -r "'use client'" src/components/ui/TicketCountdown.tsx && echo "PASS" || echo "FAIL"

  echo "=== SpeakerFilter is use client ===" && \
    grep -r "'use client'" src/components/speakers/SpeakerFilter.tsx && echo "PASS" || echo "FAIL"

  echo "=== ScheduleTabs is use client ===" && \
    grep -r "'use client'" src/components/schedule/ScheduleTabs.tsx && echo "PASS" || echo "FAIL"

  echo "=== TicketCard uses CSS Grid not flex ===" && \
    grep -r "grid-template-columns" src/app/tickets/page.tsx && echo "PASS" || echo "FAIL"

  echo "=== UrgencyMarquee is aria-hidden ===" && \
    grep -r "aria-hidden" src/components/ui/UrgencyMarquee.tsx && echo "PASS" || echo "FAIL"

  echo "=== No hex in component files ===" && \
    grep -r "#[0-9A-Fa-f]\{3,6\}" src/components --include="*.tsx" \
    && echo "FAIL — use CSS variables" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
