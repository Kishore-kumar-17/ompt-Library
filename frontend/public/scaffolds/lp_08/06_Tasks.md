# 06 — Tasks
## Single-Input Waitlist & Minimalist Teaser · lp_platform_08

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
  Strictly white foundation. Black text. Zero decorative color.

  ```css
  --color-bg:       #FFFFFF;
  --color-input:    #FDFDFD;
  --color-border:   #E4E4E7;
  --color-ink:      #000000;
  --color-muted:    #71717A;

  body {
    background: var(--color-bg);
    color: var(--color-ink);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  * { border-radius: 0 !important; }

  :focus-visible {
    outline: 2px solid var(--color-ink);
    outline-offset: 2px;
  }

  .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
  }
  ```

  Acceptance: All variables in DevTools. Zero border-radius. `grep -r "rounded\|border-radius: [1-9]" src --include="*.tsx"` → empty.
  Files: `src/app/globals.css`

---

- [ ] **TASK-003** | Est: 30m
  **TypeScript types**
  Minimal types. `tsc --noEmit` exits 0.

  ```typescript
  export interface WaitlistEntry {
    email: string; joinedAt: string
  }

  export interface SubmissionState {
    status: 'idle' | 'loading' | 'success' | 'error'
    message?: string
  }
  ```

  Files: `src/types/index.ts`

---

## Phase 1 — Optically-Centered Landing

---

- [ ] **TASK-004** | Est: 1.5h
  **CenteredVoid Layout**
  100vh full-screen centered — the only page.

  Acceptance: `app/page.tsx`. Flexbox centered. Vertical center offset `-10%` (optical center above true center) using `margin-bottom: 10vh` on the centered container. `StudioMark` glyph top-center: monogram or wordmark in Inter 700 `13px` uppercase, centered absolute at top. Server Component wrapper.
  Files: `src/app/page.tsx`, `src/components/layout/StudioMark.tsx`

---

- [ ] **TASK-005** | Est: 1.5h
  **OpticalInputEngine**
  The hero interaction — centered single-field email capture.

  Acceptance: `'use client'` directive. State machine: `idle → loading → success | error`. `<form>` with `aria-label="Join waitlist"`. Email `<input>`: border-bottom only `1px solid var(--color-border)` on blur, `2px solid var(--color-ink)` on focus — NO full border-box, NO rounded corners. `JoinButton`: solid black fill, white text, `0px` radius, `44px` height. Zod email validation — inline error `role="alert"` below input. `SubmissionFade`: Framer Motion `AnimatePresence` cross-fades form → success on submit. `useReducedMotion()` guard — skip fade, show success immediately.
  Files: `src/components/waitlist/OpticalInputEngine.tsx`

---

- [ ] **TASK-006** | Est: 45m
  **MonoLabel**
  Real-time status indicator in monospace.

  Acceptance: `'use client'`. Renders `VER {version} // {count} JOINED` in `font-mono` `11px` muted. Count fetched from static data or local state — NOT fake real-time. Below the input, Inter `11px` muted. `aria-live="polite"` on count span. Spacing: `24px` below input.
  Files: `src/components/waitlist/MonoLabel.tsx`

---

- [ ] **TASK-007** | Est: 45m
  **SuccessConfirmation**
  Post-submit state — replaces form in same position.

  Acceptance: "You're on the list." Inter `18px` ink centered. "No spam. Just access." Inter `13px` muted below. Appears in exactly the same position as the form — no layout shift. Framer Motion `opacity 0→1`. `role="status"` on success container.
  Files: `src/components/waitlist/SuccessConfirmation.tsx`

---

- [ ] **TASK-008** | Est: 30m
  **DiscreteFooter**
  Fixed bottom utility links — extremely low contrast.

  Acceptance: `position: fixed; bottom: 0`. Centered links: X (Twitter), GitHub, Privacy — lowercase Inter `12px` `var(--color-muted)` `0.5` opacity. Hover: `opacity: 1`. NO icons — text only. `aria-label` on each link with platform name. Server Component.
  Files: `src/components/layout/DiscreteFooter.tsx`

---

## Phase 2 — Submission API

---

- [ ] **TASK-009** | Est: 45m
  **Waitlist API route**
  Email capture and storage.

  Acceptance: POST `/api/waitlist`: validate email with Zod. Return `400` with `{ error: 'Invalid email' }` on failure. Append to in-memory array (or JSON file for static). Return `{ success: true, position: number }`. Rate limit: 1 submission per email per session (check in-memory set).
  Files: `src/app/api/waitlist/route.ts`

---

## Phase 3 — QA

---

- [ ] **TASK-010** | Est: 1h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== Zero border-radius ===" && \
    grep -r "rounded\|border-radius: [1-9]" src --include="*.tsx" \
    && echo "FAIL — 0px radius only" || echo "PASS"

  echo "=== OpticalInputEngine is use client ===" && \
    grep -r "'use client'" src/components/waitlist/OpticalInputEngine.tsx && echo "PASS" || echo "FAIL"

  echo "=== MonoLabel is use client ===" && \
    grep -r "'use client'" src/components/waitlist/MonoLabel.tsx && echo "PASS" || echo "FAIL"

  echo "=== SuccessConfirmation has role status ===" && \
    grep -r "role.*status\|role=\"status\"" src/components/waitlist/SuccessConfirmation.tsx && echo "PASS" || echo "FAIL"

  echo "=== Error input has role alert ===" && \
    grep -r "role.*alert\|role=\"alert\"" src/components/waitlist/OpticalInputEngine.tsx && echo "PASS" || echo "FAIL"

  echo "=== DiscreteFooter is fixed ===" && \
    grep -r "fixed\|position.*fixed" src/components/layout/DiscreteFooter.tsx && echo "PASS" || echo "FAIL"

  echo "=== No decorative colors ===" && \
    grep -r "blue\|green\|red\|purple\|yellow" src/components --include="*.tsx" \
    && echo "FAIL — black and grey only" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
