# 06 — Tasks
## One-Screen Value Prop & Beta Social Proof · lp_platform_09

Tasks are ordered by dependency. Complete each task fully before starting the next.

---

## Phase 0 — Foundation

---

- [ ] **TASK-001** | Est: 1h
  **Initialise project**
  Next.js 14 App Router, TypeScript strict, Tailwind CSS v3, static export.

  ```bash
  npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"
  npm install framer-motion lucide-react zod
  ```

  Acceptance: `npm run dev` starts. `tsc --noEmit` exits 0. `npm run build` produces `/out` directory.
  Files: `package.json`, `tsconfig.json`, `next.config.ts`

---

- [ ] **TASK-002** | Est: 30m
  **Design tokens — CSS variables**
  High-velocity minimalism. White foundation, Momentum Blue CTA.

  ```css
  --color-bg:       #FFFFFF;
  --color-input:    #F9FAFB;
  --color-border:   #E4E4E7;
  --color-ink:      #18181B;
  --color-muted:    #71717A;
  --color-accent:   #2563EB;

  html, body { margin: 0; padding: 0; height: 100%; overflow: hidden; }
  body {
    background: var(--color-bg);
    color: var(--color-ink);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  :focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
  }
  ```

  Acceptance: Body has `overflow: hidden` — zero scroll. `grep -r "overflow-y.*auto\|overflow-y.*scroll" src --include="*.tsx"` → empty.
  Files: `src/app/globals.css`

---

- [ ] **TASK-003** | Est: 30m
  **TypeScript types**
  Minimal types. `tsc --noEmit` exits 0.

  ```typescript
  export interface BetaEntry {
    email: string; joinedAt: string; referrer?: string
  }

  export interface LogoItem {
    id: string; name: string; svgAlt: string
  }

  export interface SubmissionState {
    status: 'idle' | 'submitting' | 'success' | 'error'
    errorMessage?: string
  }
  ```

  Files: `src/types/index.ts`

---

- [ ] **TASK-004** | Est: 20m
  **Static data**
  Validation logos and beta stats.

  Acceptance: `logos.ts` exports 5–8 `LogoItem` objects (authority companies/people). `betaStats.ts` exports `{ count: number, label: string }`. `tsc --noEmit` clean.
  Files: `src/lib/logos.ts`, `src/lib/betaStats.ts`

---

## Phase 1 — Inverted Pyramid Landing

---

- [ ] **TASK-005** | Est: 1.5h
  **InvertedPyramid Layout**
  100vh single-screen — everything above the fold.

  Acceptance: `app/page.tsx`. `height: 100vh; overflow: hidden`. Flexbox column center. Visual weight flows: H1 (largest) → SubHeader → BetaCapture → GrayscaleLogoStrip (smallest). `StudioMark` top-center: wordmark Inter 700 `13px` uppercase, absolute position. NO scroll — all content fits in viewport on desktop and tablet. Server Component wrapper.
  Files: `src/app/page.tsx`

---

- [ ] **TASK-006** | Est: 1h
  **MassiveH1 + SubHeaderValue**
  Fluid headline driving visual hierarchy.

  Acceptance: `MassiveH1.tsx`: Inter 800 `clamp(36px,6vw,80px)` ink — fills ~50% of visual height. `SubHeaderValue.tsx`: Inter 500 `clamp(16px,2vw,22px)` muted, centered, `max-w-[480px]`. Zero decoration, zero icon. Server Components.
  Files: `src/components/hero/MassiveH1.tsx`, `src/components/hero/SubHeaderValue.tsx`

---

- [ ] **TASK-007** | Est: 1.5h
  **BetaCapture**
  High-contrast one-tap beta join with Zod validation.

  Acceptance: `'use client'` directive. `<form aria-label="Join beta">`. Email input: `var(--color-input)` bg, `1px solid var(--color-border)`, `4px` radius, `44px` height. "Join Beta →" button: `var(--color-accent)` bg, white text, `4px` radius, `44px` height. Zod email validation: inline error `role="alert"` appears below input — no page shake. Success: "You're in! Welcome to the future." replaces form via Framer `AnimatePresence`. `useReducedMotion()` guard — skip animation. `EarlyAccessCounter.tsx` (separate component, same file): Framer count-up `0→value` on mount, monospace `font-mono` `13px` muted, `aria-live="polite"`.
  Files: `src/components/beta/BetaCapture.tsx`

---

- [ ] **TASK-008** | Est: 45m
  **GrayscaleLogoStrip**
  Authority validation through company logos.

  Acceptance: Horizontal flex row of 5–8 SVG logos. Each `<img>` or inline `<svg>` has `alt={logo.svgAlt}`. Default: `filter: grayscale(100%) opacity(0.4)`. No hover color change — static grayscale always. Centered below `BetaCapture`. Server Component.
  Files: `src/components/hero/GrayscaleLogoStrip.tsx`

---

## Phase 2 — API and QA

---

- [ ] **TASK-009** | Est: 45m
  **Beta submission API**
  Email capture with rate limiting.

  Acceptance: POST `/api/beta`: validate email via Zod. Return `400 { error: 'Invalid email' }` on failure. Rate limit: 1 entry per email (in-memory Set). Return `{ success: true, position: number }`. No duplicate emails.
  Files: `src/app/api/beta/route.ts`

---

- [ ] **TASK-010** | Est: 1h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== No scroll on body ===" && \
    grep -r "overflow-y.*auto\|overflow-y.*scroll" src --include="*.tsx" \
    && echo "FAIL — zero scroll, 100vh only" || echo "PASS"

  echo "=== BetaCapture is use client ===" && \
    grep -r "'use client'" src/components/beta/BetaCapture.tsx && echo "PASS" || echo "FAIL"

  echo "=== EarlyAccessCounter has aria-live ===" && \
    grep -r "aria-live" src/components/beta/BetaCapture.tsx && echo "PASS" || echo "FAIL"

  echo "=== GrayscaleLogoStrip has alt text ===" && \
    grep -r "alt=" src/components/hero/GrayscaleLogoStrip.tsx && echo "PASS" || echo "FAIL"

  echo "=== BetaCapture error has role alert ===" && \
    grep -r "role.*alert\|role=\"alert\"" src/components/beta/BetaCapture.tsx && echo "PASS" || echo "FAIL"

  echo "=== Form has aria-label ===" && \
    grep -r "aria-label" src/components/beta/BetaCapture.tsx && echo "PASS" || echo "FAIL"

  echo "=== No hex in component files ===" && \
    grep -r "#[0-9A-Fa-f]\{3,6\}" src/components --include="*.tsx" \
    && echo "FAIL — use CSS variables" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
