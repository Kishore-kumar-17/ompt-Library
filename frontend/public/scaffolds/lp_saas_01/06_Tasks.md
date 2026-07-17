# 06 — Tasks
## Precision Dark SaaS Landing Page · lp_saas_platform_01

Tasks are ordered by dependency. Complete each task fully before starting the next.

---

## Phase 0 — Foundation

---

- [ ] **TASK-001** | Est: 1h
  **Initialise project**
  Next.js 14 App Router, TypeScript strict, Tailwind v3, static export.

  ```bash
  npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"
  ```

  `next.config.ts`: `output: 'export'`, `images: { unoptimized: true }`.

  Acceptance: `npm run dev` starts. `tsc --noEmit` exits 0. `npm run build` produces `/out` directory.
  Files: `package.json`, `tsconfig.json`, `next.config.ts`

---

- [ ] **TASK-002** | Est: 30m
  **Inter Variable font setup**
  Inter Variable only — weights 400 and 500. No weight 600, no weight 700.

  Acceptance: DevTools shows Inter on `<body>`. `grep -r "font-weight: 700\|fontWeight: 700" src` returns empty. `Inter_Variable` imported from `next/font/google` with `subsets: ['latin']`.
  Files: `src/app/layout.tsx`

---

- [ ] **TASK-003** | Est: 45m
  **Design tokens — 9 CSS variables**
  All 9 color values as CSS custom properties in `globals.css`. Zero hex values allowed in component files.

  Tokens (exact values):
  ```css
  --color-bg:              #08090A;
  --color-surface:         #141517;
  --color-border:          rgba(255, 255, 255, 0.06);
  --color-text:            #E4E5E9;
  --color-text-secondary:  rgba(255, 255, 255, 0.48);
  --color-text-tertiary:   rgba(255, 255, 255, 0.28);
  --color-accent:          #5E6AD2;
  --color-accent-hover:    #6E7AE2;
  --color-destructive:     #E85D4A;
  ```

  Acceptance: All 9 variables accessible in DevTools. `grep -r "#[0-9A-Fa-f]" src/components --include="*.tsx"` → empty (no raw hex in component code).
  Files: `src/app/globals.css`

---

- [ ] **TASK-004** | Est: 15m
  **Accessibility utilities**
  `.sr-only` and `prefers-reduced-motion` reset in `globals.css`.

  Acceptance: `.sr-only` hides text visually while preserving screen reader access (`position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap`). `@media (prefers-reduced-motion: reduce)` block sets `transition-duration: 0.01ms` on all animated elements.
  Files: `src/app/globals.css`

---

- [ ] **TASK-005** | Est: 30m
  **TypeScript types**
  `NavLink`, `FeatureSectionProps`, `BentoCard`, `LogoItem`, `PricingPlan` exported. `tsc --noEmit` exits 0.

  ```typescript
  export interface NavLink { label: string; href: string }
  export interface FeatureSectionProps {
    layout: 'text-left' | 'text-right'
    headline: string; subtext: string; imageSrc: string; imageAlt: string
  }
  export interface BentoCard { id: string; icon: string; title: string; description: string }
  export interface LogoItem { id: string; name: string; src: string }
  export interface PricingPlan {
    id: string; name: string; price: string; differentiator: string
    highlighted: boolean; cta: string
  }
  ```

  Files: `src/types/index.ts`

---

- [ ] **TASK-006** | Est: 45m
  **Static data files**
  Mock data for all page sections.

  Acceptance: `features.ts` exports 2 `FeatureSectionProps` objects. `bento.ts` exports 6 `BentoCard` objects with Lucide icon name strings. `logos.ts` exports 6–8 `LogoItem` objects. `pricing.ts` exports 3 `PricingPlan` objects — exactly one has `highlighted: true`. All `tsc --noEmit` clean.
  Files: `src/lib/features.ts`, `src/lib/bento.ts`, `src/lib/logos.ts`, `src/lib/pricing.ts`

---

## Phase 1 — Navigation and Hero

---

- [ ] **TASK-007** | Est: 1.5h
  **SiteNav**
  Sticky navigation with scroll-triggered border.

  Acceptance: `60px` height, `var(--color-bg)` background. Logo text left. Nav links center at `var(--color-text-secondary)`, hover `var(--color-text)`. "Log in" text link + "Get started" filled accent button (`8px` radius, `40px` height, `var(--color-accent)` bg) right. On scroll >0: `1px solid var(--color-border)` bottom border appears via `'use client'` scroll listener. No hamburger required — desktop only in scope.
  Files: `src/components/layout/SiteNav.tsx`

---

- [ ] **TASK-008** | Est: 2h
  **HeroSection**
  First impression — full-width centered hero with product screenshot.

  Acceptance: Declarative headline max 8 words (Inter 500 `clamp(40px,5vw,64px)` letter-spacing `-0.03em`). Subhead max 16 words (Inter 400 `16px`). Two CTAs: "Get started" (accent fill, `8px` radius, `40px` height) + "Talk to sales" (ghost border `1px solid var(--color-border)`, same height). Social proof `"25,000+ teams"` below CTAs in `var(--color-text-tertiary)`. Product screenshot via `<Image priority>` at `90%` container width, `12px` radius, subtle shadow. Optional single radial glow `rgba(94,106,210,0.08)` behind headline — max this opacity, no stronger.
  Files: `src/components/home/HeroSection.tsx`

---

## Phase 2 — Trust and Feature Sections

---

- [ ] **TASK-009** | Est: 1h
  **LogoTrustBar**
  Company trust signal below hero.

  Acceptance: "Trusted by" label in `var(--color-text-tertiary)`. 6–8 logo wordmarks at `rgba(255,255,255,0.35)` opacity — never full white, never coloured. Horizontal scroll on mobile (`overflow-x: auto`, `scrollbar-width: none`). Server Component — no `'use client'`. Logo images render as `<Image>` elements styled to `filter: grayscale(1) brightness(2)`.
  Files: `src/components/home/LogoTrustBar.tsx`

---

- [ ] **TASK-010** | Est: 1.5h
  **FeatureSection component**
  Reusable left/right alternating feature layout.

  Acceptance: `layout: 'text-left' | 'text-right'` prop controls column order. H2 headline (Inter 500 `clamp(28px,3.5vw,40px)` letter-spacing `-0.02em`), 2-line subtext (Inter 400 `16px`). Product visual placeholder or screenshot with `12px` radius. `128px` vertical padding desktop, `80px` mobile. Column reversal on mobile for both layouts. Server Component.
  Files: `src/components/home/FeatureSection.tsx`

---

- [ ] **TASK-011** | Est: 30m
  **Assemble Feature sections in page.tsx**
  Two FeatureSection instances with different data and layouts.

  Acceptance: Feature 1 uses `layout="text-left"`, Feature 2 uses `layout="text-right"`. Data sourced from `features.ts`. Both render correctly at all breakpoints with responsive column reversal.
  Files: `src/app/page.tsx`

---

## Phase 3 — Bento Grid and Pricing

---

- [ ] **TASK-012** | Est: 1.5h
  **BentoGrid**
  6-card feature grid with surface cards.

  Acceptance: 3-col desktop (`1024px+`), 2-col tablet (`768px`), 1-col mobile (`640px`). Cards: `var(--color-surface)` bg, `12px` radius, `1px solid var(--color-border)` border, `24px` padding. Lucide icon (`size={16}` `strokeWidth={1.5}`) + H3 (Inter 500 `20px`) + 2-line description (Inter 400 `14px` `var(--color-text-secondary)`). No hover effects (cards are informational, not interactive).
  Files: `src/components/home/BentoGrid.tsx`, `src/components/home/BentoCard.tsx`

---

- [ ] **TASK-013** | Est: 45m
  **BentoGrid Framer Motion stagger**
  Scroll-triggered entrance animation on card grid.

  Acceptance: Each `BentoCard` wrapped in `<motion.div>` with `initial={{ opacity: 0, y: 16 }}` → `whileInView={{ opacity: 1, y: 0 }}`. `viewport={{ once: true }}`. `transition={{ delay: index * 0.07, ease: 'easeOut' }}`. `useReducedMotion()` guard: when true, skip all motion. No bounce easing. No continuous loops.
  Files: `src/components/home/BentoGrid.tsx`

---

- [ ] **TASK-014** | Est: 1h
  **PricingPreview**
  Simplified 3-tier pricing overview (not a full comparison table).

  Acceptance: 3 plan cards from `pricing.ts`. Highlighted plan: `1px solid var(--color-accent)` border, slightly elevated surface. Each card: plan name (Inter 500 `20px`), price string, one differentiator sentence (Inter 400 `14px`), CTA button. "See full pricing →" link below grid. No feature comparison table — that lives on `/pricing`.
  Files: `src/components/home/PricingPreview.tsx`

---

## Phase 4 — CTA and Footer

---

- [ ] **TASK-015** | Est: 45m
  **FinalCTASection**
  Closing conversion surface.

  Acceptance: 2-line headline (same Inter 500 sizing as hero `clamp(40px,5vw,64px)`). Same two CTAs: "Get started" (accent fill) + "Talk to sales" (ghost). `var(--color-bg)` background — no image, no gradient. `128px` vertical padding. Section feels conclusive — identical CTA pair to hero creates visual closure.
  Files: `src/components/home/FinalCTASection.tsx`

---

- [ ] **TASK-016** | Est: 1h
  **SiteFooter**
  5-column footer with top border.

  Acceptance: 5 columns: Product / Features / Company / Resources / Legal. Link text at `var(--color-text-secondary)`, hover → `var(--color-text)` (`150ms ease`). `1px solid var(--color-border)` top border. Copyright line in `var(--color-text-tertiary)`. No social icons. 4-col tablet, 2-col mobile, 1-col smallest. Column headings: Inter 500 `12px` uppercase letter-spacing `0.08em`.
  Files: `src/components/layout/SiteFooter.tsx`

---

## Phase 5 — Animation and QA

---

- [ ] **TASK-017** | Est: 1h
  **Scroll fade-in on major sections**
  Framer Motion scroll entrance on HeroSection, LogoTrustBar, and FeatureSections.

  Acceptance: `initial={{ opacity: 0, y: 16 }}` → `whileInView={{ opacity: 1, y: 0 }}` on section content. `viewport={{ once: true }}`. `useReducedMotion()` guard on every Framer Motion instance: when true, render at final state immediately. No parallax, no autoplay, no continuous loops, no bounce easing — all forbidden.
  Files: `src/components/home/HeroSection.tsx`, `src/components/home/LogoTrustBar.tsx`, `src/components/home/FeatureSection.tsx`

---

- [ ] **TASK-018** | Est: 1h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== No hex values in components ===" && \
    grep -r "#[0-9A-Fa-f]\{3,6\}" src/components --include="*.tsx" \
    && echo "FAIL — use CSS variables" || echo "PASS"

  echo "=== No font-weight 700 ===" && \
    grep -r "font-weight: 700\|fontWeight: 700\|font-bold" src --include="*.tsx" --include="*.css" \
    && echo "FAIL — max weight is 500" || echo "PASS"

  echo "=== No border-radius above 12px ===" && \
    grep -r "rounded-xl\|rounded-2xl\|rounded-full\|border-radius: 1[3-9]px\|border-radius: [2-9][0-9]px\|9999px" \
    src --include="*.tsx" --include="*.css" && echo "FAIL" || echo "PASS"

  echo "=== No gradients except hero glow ===" && \
    grep -r "gradient" src/components --include="*.tsx" --include="*.css" | grep -v "HeroSection" \
    && echo "FAIL — one hero radial glow only" || echo "PASS"

  echo "=== LogoTrustBar is not 'use client' ===" && \
    grep -r "'use client'" src/components/home/LogoTrustBar.tsx \
    && echo "FAIL — must be Server Component" || echo "PASS"

  echo "=== FeatureSection has layout prop ===" && \
    grep -r "text-left\|text-right" src/components/home/FeatureSection.tsx && echo "PASS" || echo "FAIL"

  echo "=== BentoGrid has useReducedMotion guard ===" && \
    grep -r "useReducedMotion" src/components/home/BentoGrid.tsx && echo "PASS" || echo "FAIL"

  echo "=== SiteNav is 'use client' (scroll listener) ===" && \
    grep -r "'use client'" src/components/layout/SiteNav.tsx && echo "PASS" || echo "FAIL"

  echo "=== No autoplay video ===" && \
    grep -r "autoPlay\|autoplay" src --include="*.tsx" \
    && echo "FAIL — no autoplay allowed" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥95, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
