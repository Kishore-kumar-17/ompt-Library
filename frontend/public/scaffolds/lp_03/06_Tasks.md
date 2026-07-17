# 06 — Tasks
## Social-First Event Landing Page · lp_platform_03

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
  **Font setup — EB Garamond + Inter**
  EB Garamond weight 400 and 600 for headings. Inter weight 400 and 500 for body and UI.

  Acceptance: DevTools shows EB Garamond on `h1–h2` and event titles, Inter on meta and UI. `grep -r "font-weight: 700\|font-weight: 800" src` returns empty for EB Garamond.
  Files: `src/app/layout.tsx`

---

- [ ] **TASK-003** | Est: 30m
  **Design tokens — CSS variables**
  Light mode only. Warm paper white foundation.

  ```css
  --color-bg:       #FDFDFC;
  --color-surface:  #F9FAFB;
  --color-border:   rgba(17,24,39,0.08);
  --color-ink:      #111827;
  --color-muted:    #6B7280;
  --color-accent:   #111827;
  --color-soft:     rgba(17,24,39,0.05);

  body { background: var(--color-bg); color: var(--color-ink); }

  :focus-visible {
    outline: 2px solid var(--color-ink);
    outline-offset: 2px;
  }

  .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
  }
  ```

  Acceptance: All variables in DevTools. Body bg is `#FDFDFC`. `grep -r "bg-white\|background.*#fff\|background: white" src/components --include="*.tsx"` → empty (surface uses `var(--color-surface)`).
  Files: `src/app/globals.css`

---

- [ ] **TASK-004** | Est: 45m
  **TypeScript types**
  All domain types exported. `tsc --noEmit` exits 0.

  ```typescript
  export interface EventData {
    id: string; title: string; coverImageAlt: string
    date: string; time: string; location: string
    hostId: string; attendeeCount: number; isOnline: boolean
  }

  export interface Attendee {
    id: string; name: string; avatarAlt: string
    avatarInitials: string
  }

  export interface Host {
    id: string; name: string; bio: string
    avatarAlt: string; followerCount: number
    upcomingEvents: string[]
  }

  export interface RSVPSubmission {
    name: string; email: string; eventId: string
  }
  ```

  Files: `src/types/index.ts`

---

- [ ] **TASK-005** | Est: 30m
  **Static data files**
  Mock data for all sections.

  Acceptance: `events.ts` exports 4 `EventData` objects. `attendees.ts` exports 12 `Attendee` objects for avatar stack (showing first 5 + "X others"). `hosts.ts` exports 2 `Host` objects. `tsc --noEmit` clean.
  Files: `src/lib/events.ts`, `src/lib/attendees.ts`, `src/lib/hosts.ts`

---

## Phase 1 — Event Landing

---

- [ ] **TASK-006** | Est: 1h
  **MinimalNav**
  Centered nav — no hamburger, no mega-menu.

  Acceptance: Transparent bg, `1px solid var(--color-border)` bottom border. Logo center EB Garamond 600. Links: Discover, Create Event. "Sign In" ghost button right. Centered layout `max-w-[800px]`. Server Component.
  Files: `src/components/layout/MinimalNav.tsx`

---

- [ ] **TASK-007** | Est: 1.5h
  **EventLanding**
  Centered single-event hero with cover image and logistics.

  Acceptance: `max-w-[800px]` centered. Cover image `16:9` aspect ratio, `12px` radius, `alt={event.coverImageAlt}`. EB Garamond 600 `clamp(28px,4vw,44px)` event title. Logistics block: Date, Time, Location — each with accessible icon + Inter `15px`. `AvatarStack` below logistics. "RSVP / Register" CTA opens `RSVPModal`. Server Component.
  Files: `src/components/event/EventLanding.tsx`

---

- [ ] **TASK-008** | Est: 1h
  **AvatarStack**
  Overlapping attendee avatars with "+X others" label.

  Acceptance: Renders first 5 `Attendee` objects as overlapping `32px` circular avatars — CSS `margin-left: -8px` on each after first. Each `<img>` has `alt={attendee.name}`. If `alt` empty: render initials div with `aria-label={attendee.name}`. "+X attending" label Inter 400 `14px` muted. Server Component.
  Files: `src/components/event/AvatarStack.tsx`

---

- [ ] **TASK-009** | Est: 1.5h
  **RSVPModal**
  One-tap registration modal — client component.

  Acceptance: `'use client'` directive. `role="dialog"` with `aria-modal="true"` and `aria-labelledby`. Opens with Framer Motion `opacity 0→1`, `scale 0.95→1`. `useReducedMotion()` guard — skip animation. Fields: Name, Email — minimum viable. "Register →" submit button. Success state: "You're in! See you there." replaces form in same modal container. Escape key closes. Outside click closes. Focus trapped inside modal while open.
  Files: `src/components/event/RSVPModal.tsx`

---

## Phase 2 — Discovery and Host Pages

---

- [ ] **TASK-010** | Est: 1.5h
  **Discovery Feed**
  Event listing homepage.

  Acceptance: `app/page.tsx`. Vertical stack of `EventCard.tsx` (server): cover image `alt={event.coverImageAlt}`, host avatar, event title EB Garamond 600, date+location Inter `14px` muted, attendee count. `DiscoveryFilter.tsx` is `'use client'`: category pill filters. No grid — vertical single-column feed. `max-w-[800px]` centered. `12px` radius on cards.
  Files: `src/app/page.tsx`, `src/components/discovery/EventCard.tsx`, `src/components/discovery/DiscoveryFilter.tsx`

---

- [ ] **TASK-011** | Est: 1h
  **Host Community Page**
  Host profile with following and upcoming events calendar.

  Acceptance: `app/host/[id]/page.tsx`. `generateStaticParams()` from `hosts.ts`. `notFound()` for unknown host. Sections: host avatar `alt={host.avatarAlt}`, name EB Garamond 600, bio Inter `16px`, follower count, "Follow" button (client). Upcoming events: vertical list of `EventCard` components filtered by `host.upcomingEvents`. `FollowButton.tsx` is `'use client'`: toggled state in `useState`, optimistic UI.
  Files: `src/app/host/[id]/page.tsx`, `src/components/host/FollowButton.tsx`

---

## Phase 3 — QA

---

- [ ] **TASK-012** | Est: 1h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== No white backgrounds ===" && \
    grep -r "bg-white\|background.*#fff\|background: white" src/components --include="*.tsx" \
    && echo "FAIL — use warm paper #FDFDFC" || echo "PASS"

  echo "=== RSVPModal is use client ===" && \
    grep -r "'use client'" src/components/event/RSVPModal.tsx && echo "PASS" || echo "FAIL"

  echo "=== RSVPModal has aria-modal ===" && \
    grep -r "aria-modal" src/components/event/RSVPModal.tsx && echo "PASS" || echo "FAIL"

  echo "=== DiscoveryFilter is use client ===" && \
    grep -r "'use client'" src/components/discovery/DiscoveryFilter.tsx && echo "PASS" || echo "FAIL"

  echo "=== FollowButton is use client ===" && \
    grep -r "'use client'" src/components/host/FollowButton.tsx && echo "PASS" || echo "FAIL"

  echo "=== AvatarStack has alt text ===" && \
    grep -r "alt=" src/components/event/AvatarStack.tsx && echo "PASS" || echo "FAIL"

  echo "=== Cover image has alt text ===" && \
    grep -r "coverImageAlt\|alt=" src/components/event/EventLanding.tsx && echo "PASS" || echo "FAIL"

  echo "=== No hex in component files ===" && \
    grep -r "#[0-9A-Fa-f]\{3,6\}" src/components --include="*.tsx" \
    && echo "FAIL — use CSS variables" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
