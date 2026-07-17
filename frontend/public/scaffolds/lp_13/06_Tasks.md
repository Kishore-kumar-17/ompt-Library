# 06 — Tasks
## Product Discovery & Visual Hero — Glassmorphic Browser · lp_platform_13

Tasks are ordered by dependency. Complete each task fully before starting the next.

---

## Phase 0 — Foundation

---

- [ ] **TASK-001** | Est: 1h
  **Initialise project**
  Next.js 14 App Router, TypeScript strict, Tailwind CSS v3.

  ```bash
  npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"
  npm install framer-motion lucide-react
  ```

  Acceptance: `npm run dev` starts. `tsc --noEmit` exits 0.
  Files: `package.json`, `tsconfig.json`, `next.config.ts`

---

- [ ] **TASK-002** | Est: 30m
  **Design tokens — CSS variables**
  Dark mode only. Gradient foundation with glass surfaces.

  ```css
  --color-bg-from:  #1A0B2E;
  --color-bg-to:    #0F172A;
  --color-glass:    rgba(255,255,255,0.08);
  --color-glow:     rgba(255,255,255,0.12);
  --color-border:   rgba(255,255,255,0.12);
  --color-ink:      #FFFFFF;
  --color-muted:    rgba(255,255,255,0.6);
  --color-ai-from:  #6366F1;
  --color-ai-to:    #EC4899;
  --color-radius:   24px;

  body {
    background: linear-gradient(135deg, var(--color-bg-from), var(--color-bg-to));
    color: var(--color-ink);
    min-height: 100vh;
  }

  :focus-visible {
    outline: 2px solid rgba(255,255,255,0.6);
    outline-offset: 2px;
  }

  .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
  }
  ```

  Acceptance: Body has gradient bg. `grep -r "bg-white\|background.*#fff\|background: white" src/components --include="*.tsx"` → empty.
  Files: `src/app/globals.css`

---

- [ ] **TASK-003** | Est: 45m
  **TypeScript types**
  All domain types. `tsc --noEmit` exits 0.

  ```typescript
  export type Platform = 'mac' | 'windows' | 'ios' | 'android'

  export interface BrowserFeature {
    id: string; title: string; description: string
    imageAlt: string; aiGlow?: boolean
  }

  export interface DownloadTarget {
    platform: Platform; label: string
    downloadUrl: string; ariaLabel: string
    isAutoDetected?: boolean
  }

  export interface SpaceProfile {
    id: string; name: string
    color: string; description: string
  }
  ```

  Files: `src/types/index.ts`

---

- [ ] **TASK-004** | Est: 30m
  **Static data files**
  Mock features and download targets.

  Acceptance: `features.ts` exports 5 `BrowserFeature` objects, at least 2 with `aiGlow: true`. `downloads.ts` exports 4 `DownloadTarget` objects (one per platform). `spaces.ts` exports 4 `SpaceProfile` objects. `tsc --noEmit` clean.
  Files: `src/lib/features.ts`, `src/lib/downloads.ts`, `src/lib/spaces.ts`

---

## Phase 1 — Navigation

---

- [ ] **TASK-005** | Est: 1h
  **SiteNav**
  Glassmorphic nav with platform download CTA.

  Acceptance: `backdrop-blur-md` + `var(--color-glass)` bg + `1px solid var(--color-border)`. Logo left Inter 700 white. Links: Features, Spaces, AI, Download. `DownloadCTAButton.tsx` is `'use client'`: auto-detects platform via `navigator.userAgent`, shows "Download for [Platform]" with `var(--color-radius)` radius white bg black text. `44px` height. Server Component wrapper.
  Files: `src/components/layout/SiteNav.tsx`, `src/components/ui/DownloadCTAButton.tsx`

---

## Phase 2 — Hero and Features

---

- [ ] **TASK-006** | Est: 1.5h
  **ProvocativeHero**
  Bold one-line value prop with floating browser mockup.

  Acceptance: Centered `max-w-[1100px]`. Inter 800 `clamp(36px,6vw,80px)` all-caps white headline. Inter 400 `18px` muted sub-headline. `FloatingMockup.tsx` is `'use client'`: browser frame (sidebar + pane + address bar) built from divs with `var(--color-glass)` bg + `var(--color-border)` border. CSS `animation: float 4s ease-in-out infinite` — `prefers-reduced-motion`: remove float animation. `VibrantGlow.tsx`: absolute positioned blurred gradient div (`var(--color-ai-from)` → `var(--color-ai-to)`) behind hero — `aria-hidden="true"`. Server Component wrapper.
  Files: `src/components/home/ProvocativeHero.tsx`, `src/components/home/FloatingMockup.tsx`, `src/components/ui/VibrantGlow.tsx`

---

- [ ] **TASK-007** | Est: 1.5h
  **GlassFeatureCards**
  5-feature glass card grid.

  Acceptance: CSS Grid `repeat(3,1fr)` desktop first 3, then `repeat(2,1fr)` for last 2 → `1fr` mobile. Each `GlassCard.tsx` (server): `var(--color-glass)` bg, `backdrop-blur-xl`, `1px solid var(--color-glow)` border, `var(--color-radius)` radius. Feature title Inter 700 `18px` white, description Inter 400 `14px` muted. If `aiGlow: true`: `VibrantGlow` positioned behind card (smaller, `aria-hidden="true"`). Feature image `alt={feature.imageAlt}`.
  Files: `src/components/home/GlassFeatureCards.tsx`, `src/components/home/GlassCard.tsx`

---

- [ ] **TASK-008** | Est: 1.5h
  **SplitViewVisualizer**
  Interactive layout demo using Framer Motion.

  Acceptance: `'use client'`. Two-panel layout toggle: "Single Tab" → "Split View". `AnimatePresence` with `layout` prop on panels — panels animate width change. Active panel: `var(--color-glow)` border glow. `useReducedMotion()` guard — skip layout animation, switch instantly. `aria-label="Split view demonstration"` on section. Panel content: mock browser content divs — NOT actual iframes.
  Files: `src/components/home/SplitViewVisualizer.tsx`

---

## Phase 3 — Platform Acquisition

---

- [ ] **TASK-009** | Est: 1h
  **PlatformDownloadPortal**
  Multi-platform download hub.

  Acceptance: `app/download/page.tsx`. `PlatformDetector.tsx` is `'use client'`: detects platform, highlights auto-detected option. 4 platform `DownloadButton.tsx` components, each: platform icon SVG with `aria-label={target.ariaLabel}`, platform label Inter 600, "Download →" link. Auto-detected platform shown first with "Recommended for you" badge. `<a href={target.downloadUrl}>` — direct download link. Server Component wrapper.
  Files: `src/app/download/page.tsx`, `src/components/download/PlatformDetector.tsx`, `src/components/download/DownloadButton.tsx`

---

## Phase 4 — QA

---

- [ ] **TASK-010** | Est: 1h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== No white backgrounds ===" && \
    grep -r "bg-white\|background.*#fff\|background: white" src/components --include="*.tsx" \
    && echo "FAIL — dark gradient only" || echo "PASS"

  echo "=== DownloadCTAButton is use client ===" && \
    grep -r "'use client'" src/components/ui/DownloadCTAButton.tsx && echo "PASS" || echo "FAIL"

  echo "=== FloatingMockup is use client ===" && \
    grep -r "'use client'" src/components/home/FloatingMockup.tsx && echo "PASS" || echo "FAIL"

  echo "=== VibrantGlow is aria-hidden ===" && \
    grep -r "aria-hidden" src/components/ui/VibrantGlow.tsx && echo "PASS" || echo "FAIL"

  echo "=== SplitViewVisualizer handles reduced motion ===" && \
    grep -r "useReducedMotion\|reducedMotion" src/components/home/SplitViewVisualizer.tsx \
    && echo "PASS" || echo "FAIL"

  echo "=== PlatformDetector is use client ===" && \
    grep -r "'use client'" src/components/download/PlatformDetector.tsx && echo "PASS" || echo "FAIL"

  echo "=== DownloadButton has aria-label ===" && \
    grep -r "ariaLabel\|aria-label" src/components/download/DownloadButton.tsx && echo "PASS" || echo "FAIL"

  echo "=== No hex in component files ===" && \
    grep -r "#[0-9A-Fa-f]\{3,6\}" src/components --include="*.tsx" \
    && echo "FAIL — use CSS variables" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥85, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
