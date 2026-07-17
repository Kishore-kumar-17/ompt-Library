# 06 — Tasks
## Premium Event Landing Page & Schedule Hub · pcpp_platform_21

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
  Strictly dark — pure black foundation, kelly green accent.

  ```css
  --color-bg:       #000000;
  --color-surface:  #121212;
  --color-border:   #27272A;
  --color-ink:      #FFFFFF;
  --color-muted:    #A1A1AA;
  --color-accent:   #10B981;

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

  Acceptance: Body bg `#000000`. Dark mode only. `grep -r "bg-white\|background.*#fff\|background: white" src/components --include="*.tsx"` → empty.
  Files: `src/app/globals.css`

---

- [ ] **TASK-003** | Est: 45m
  **TypeScript types**
  All domain types exported. `tsc --noEmit` exits 0.

  ```typescript
  export type SessionTrack = 'design' | 'dev' | 'ai' | 'leadership'

  export interface Speaker {
    slug: string; name: string; company: string
    avatarSrc: string; avatarAlt: string
  }

  export interface Session {
    id: string; title: string
    speakerSlug: string; track: SessionTrack
    day: 1 | 2; time: string
    registrationUrl: string
  }
  ```

  Files: `src/types/index.ts`

---

- [ ] **TASK-004** | Est: 30m
  **Static data files**
  Mock data for all sections.

  Acceptance: `speakers.ts` exports 12 `Speaker` objects. `sessions.ts` exports 16 `Session` objects — 8 per day, spread across all 4 tracks. `tsc --noEmit` clean.
  Files: `src/lib/speakers.ts`, `src/lib/sessions.ts`

---

## Phase 1 — Navigation and Urgency Ticker

---

- [ ] **TASK-005** | Est: 1h
  **EventNav + UrgencyTicker**
  Dark event nav with kelly green CTA and marquee ticker.

  Acceptance: `EventNav.tsx` (server): `position: fixed; top: 0; width: 100%`. `background: rgba(0,0,0,0.9); backdrop-filter: blur(8px)`. Logo left Inter 800 `18px` white. Links: Speakers, Schedule, Venue — `14px` `color: var(--color-muted)`. "Register →" right: `background: var(--color-accent); color: var(--color-bg)` `2px` radius `44px`. `aria-label="Main navigation"`. `UrgencyTicker.tsx` is `'use client'`: full-width strip `background: var(--color-accent)`. Inner `<p>` with CSS `animation: marquee linear infinite` — "Early Bird ends soon · Limited seats · Register now ·". `aria-hidden="true"` — decorative, not announced. `prefers-reduced-motion`: pause animation, show static text.
  Files: `src/components/layout/EventNav.tsx`, `src/components/layout/UrgencyTicker.tsx`

---

## Phase 2 — Hero and Speaker Grid

---

- [ ] **TASK-006** | Est: 1.5h
  **Cinematic video hero**
  Full-screen muted video with poster fallback.

  Acceptance: `VideoHero.tsx` (server): `<video autoPlay muted loop playsInline poster={posterSrc}>`. Poster loads immediately — zero layout shift. `height: 100svh`. Dark overlay `rgba(0,0,0,0.6)`. Over overlay: Inter 800 `clamp(36px,6vw,72px)` tracking tight white all-caps heading. "Shaping the future of design" subheading `20px` muted. Date/location `14px` `color: var(--color-accent)`. `prefers-reduced-motion`: poster `<img>` only — no `<video>`. `aria-label="Conference highlights reel"` on video. `0px` border-radius. Server Component.
  Files: `src/components/home/VideoHero.tsx`

---

- [ ] **TASK-007** | Est: 2h
  **Speaker directory — B&W to color on hover**
  High-contrast speaker grid with bio overlay.

  Acceptance: `app/speakers/page.tsx`. CSS Grid `repeat(4,1fr)` desktop → `repeat(2,1fr)` mobile. Gap `24px`. `SpeakerCard.tsx` is `'use client'`: Renders `<img alt={speaker.avatarAlt}>` with `filter: grayscale(1)`. On hover: `filter: grayscale(0)` `300ms`. `prefers-reduced-motion`: no filter transition — show full colour directly. Below image: name Inter 700 `16px` white. Company `13px` `color: var(--color-muted)`. On card click: `SpeakerModal.tsx` is `'use client'`: `position: fixed; inset: 0; background: rgba(0,0,0,0.9)`. `role="dialog"` `aria-modal="true"` `aria-labelledby`. Speaker name + company. Escape closes. Focus trapped. `2px` radius on modal container. `0px` border-radius on images.
  Files: `src/app/speakers/page.tsx`, `src/components/speakers/SpeakerCard.tsx`, `src/components/speakers/SpeakerModal.tsx`

---

## Phase 3 — Schedule

---

- [ ] **TASK-008** | Est: 2h
  **Multi-track schedule hub**
  Interactive timeline with track filtering.

  Acceptance: `app/schedule/page.tsx`. `TrackFilter.tsx` is `'use client'`: filter by `SessionTrack` — Design, Dev, AI, Leadership. `aria-pressed` on active. Sessions list: grouped by `day` (Day 1 / Day 2). Each `SessionCard.tsx` (server): `background: var(--color-surface)`. Track badge `12px` uppercase `color: var(--color-accent)`. Time `font-family: 'JetBrains Mono', monospace` `13px` muted. Title Inter 600 `16px` white. Speaker name via `speakerSlug` lookup `13px` muted. "Register →" `<a href={session.registrationUrl}>`. `1px solid var(--color-border)`. `2px` radius. Sticky day header on mobile (`position: sticky; top: [nav-height]` `background: var(--color-bg)`). Server Component wrapper.
  Files: `src/app/schedule/page.tsx`, `src/components/schedule/TrackFilter.tsx`, `src/components/schedule/SessionCard.tsx`

---

## Phase 4 — Tickets

---

- [ ] **TASK-009** | Est: 45m
  **Ticket types — no real payment**
  Registration tier display with external enrollment links.

  Acceptance: `app/tickets/page.tsx`. Note: `TicketType` interface has been removed from `src/types/index.ts` — define ticket data as a page-level const with an inline type. CSS Grid `repeat(3,1fr)` desktop → stacked mobile. `TicketCard.tsx` (server): `background: var(--color-surface)`. Label Inter 800 `20px` white. Price Inter 700 `28px` `color: var(--color-accent)`. Features `<ul>` `14px` muted. If available: "Register →" `<a href={registrationUrl} rel="noopener noreferrer" aria-label="Register for {label}">` `background: var(--color-accent); color: var(--color-bg)` `2px` radius `44px`. If NOT available: `<button disabled aria-disabled="true" aria-label="Sold out">Sold Out</button>` — `opacity: 0.4`. NEVER `display: none` for sold-out tickets. NEVER render payment form. Server Component.
  Files: `src/app/tickets/page.tsx`, `src/components/tickets/TicketCard.tsx`

---

## Phase 5 — QA

---

- [ ] **TASK-010** | Est: 1h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== Dark mode only — no white backgrounds ===" && \
    grep -r "bg-white\|background.*#fff\|background: white" src/components --include="*.tsx" \
    && echo "FAIL — dark mode only" || echo "PASS"

  echo "=== VideoHero has muted and playsInline ===" && \
    grep -r "muted\|playsInline" src/components/home/VideoHero.tsx && echo "PASS" || echo "FAIL"

  echo "=== VideoHero has poster ===" && \
    grep -r "poster=" src/components/home/VideoHero.tsx && echo "PASS" || echo "FAIL"

  echo "=== VideoHero handles reduced motion ===" && \
    grep -r "prefers-reduced-motion\|useReducedMotion\|reducedMotion" src/components/home/VideoHero.tsx \
    && echo "PASS" || echo "FAIL"

  echo "=== UrgencyTicker is aria-hidden ===" && \
    grep -r "aria-hidden" src/components/layout/UrgencyTicker.tsx && echo "PASS" || echo "FAIL"

  echo "=== UrgencyTicker handles reduced motion ===" && \
    grep -r "useReducedMotion\|reducedMotion\|prefers-reduced-motion" src/components/layout/UrgencyTicker.tsx \
    && echo "PASS" || echo "FAIL"

  echo "=== SpeakerModal has aria-modal ===" && \
    grep -r "aria-modal" src/components/speakers/SpeakerModal.tsx && echo "PASS" || echo "FAIL"

  echo "=== SpeakerCard handles reduced motion ===" && \
    grep -r "useReducedMotion\|reducedMotion" src/components/speakers/SpeakerCard.tsx \
    && echo "PASS" || echo "FAIL"

  echo "=== Sold-out tickets not display none ===" && \
    grep -r "display.*none\|hidden" src/components/tickets/TicketCard.tsx \
    && echo "FAIL — use opacity + aria-disabled" || echo "PASS"

  echo "=== TrackFilter has aria-pressed ===" && \
    grep -r "aria-pressed" src/components/schedule/TrackFilter.tsx && echo "PASS" || echo "FAIL"

  echo "=== No hex in component files ===" && \
    grep -r "#[0-9A-Fa-f]\{3,6\}" src/components --include="*.tsx" \
    && echo "FAIL — use CSS variables" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
