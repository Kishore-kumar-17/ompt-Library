# 06 — Tasks
## Premium Newsletter & Business Analysis · pcpp_platform_13

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
  Analytic austerity — pure white, stratechery blue accent, zero decorative chrome.

  ```css
  --color-bg:       #FFFFFF;
  --color-surface:  #F9FAFB;
  --color-border:   #E5E7EB;
  --color-ink:      #1A1A1A;
  --color-muted:    #757575;
  --color-accent:   #004B87;

  body {
    background: var(--color-bg);
    color: var(--color-ink);
    font-size: 18px;
    max-width: 680px;
    margin: 0 auto;
    padding: 0 24px;
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

  Acceptance: Body `max-width: 680px` enforced. No sidebars, no decorative elements. `grep -r "aside\|sidebar" src/components --include="*.tsx"` → empty.
  Files: `src/app/globals.css`

---

- [ ] **TASK-003** | Est: 45m
  **TypeScript types**
  All domain types exported. `tsc --noEmit` exits 0.

  ```typescript
  export type ArticleTier = 'public' | 'daily_update' | 'plus'

  export interface Analysis {
    slug: string; title: string
    date: string
    tier: ArticleTier; excerpt: string
    diagramDescription?: string
    published: boolean
  }

  export interface Concept {
    id: string; name: string; definition: string
    foundationalSlug: string
  }
  ```

  Files: `src/types/index.ts`

---

- [ ] **TASK-004** | Est: 30m
  **Static data files**
  Mock data for all sections.

  Acceptance: `analyses.ts` exports 20 `Analysis` objects — mix of all 3 `ArticleTier` values. At least 4 with `diagramDescription`. `concepts.ts` exports 8 `Concept` objects — each `foundationalSlug` references a valid analysis slug. `tsc --noEmit` clean.
  Files: `src/lib/analyses.ts`, `src/lib/concepts.ts`

---

## Phase 1 — Navigation

---

- [ ] **TASK-005** | Est: 45m
  **AustereNav**
  Minimal single-line navigation — no decorative elements.

  Acceptance: Top-bar `position: sticky; top: 0`. `background: var(--color-bg)`. `1px solid var(--color-border)` bottom. Publication name left: Inter 700 `18px` `color: var(--color-accent)`. Links: Archive, Concepts, Subscribe — `14px` muted. "Subscribe →" right: `color: var(--color-accent)` text link — NOT a filled button. `aria-label="Main navigation"`. Server Component.
  Files: `src/components/layout/AustereNav.tsx`

---

## Phase 2 — Analysis Feed

---

- [ ] **TASK-006** | Est: 1.5h
  **AnalysisFeed — chronological articles**
  Typography-first single-column feed.

  Acceptance: `app/page.tsx`. Container `max-width: 680px` centered (from body token). Each `FeedItem.tsx` (server): type label `11px` uppercase tracking `0.1em` `color: var(--color-accent)` bold. Date `11px` muted. Headline Inter 700 `22px`. If `tier: 'plus'`: `PlusBadge.tsx` inline "Plus" `11px` uppercase muted `border: 1px solid var(--color-muted)` — has `aria-label="Subscriber only"`. `1px solid var(--color-border)` bottom separator. `32px` gap. No cards, no backgrounds — pure text list.
  Files: `src/app/page.tsx`, `src/components/feed/FeedItem.tsx`, `src/components/feed/PlusBadge.tsx`

---

- [ ] **TASK-007** | Est: 2h
  **Analysis page + diagram + paywall**
  Long-form reading with strategic diagrams and gated access.

  Acceptance: `app/analyses/[slug]/page.tsx`. `generateStaticParams()`. `notFound()`. Headline Inter 700 `28px` tracking tight. Date `11px` uppercase muted. Body Georgia `18px` leading 1.6 `max-width: 680px`. If `diagramDescription`: `StrategyDiagram.tsx` (server): `<figure>`. `<figcaption>` with `analysis.diagramDescription` — visible text description for accessibility. `aria-describedby` links figure to description. If `tier: 'plus'`: `PaywallFade.tsx` is `'use client'`: excerpt visible, remaining blurred via `filter: blur(4px); user-select: none`. Below: "Subscribe to read →" `<a>` link to `/subscribe`. NEVER `display: none` on gated content — blur only.
  Files: `src/app/analyses/[slug]/page.tsx`, `src/components/analysis/StrategyDiagram.tsx`, `src/components/analysis/PaywallFade.tsx`

---

## Phase 3 — Concepts and Subscribe

---

- [ ] **TASK-008** | Est: 1h
  **Concept thematic index**
  Strategic framework taxonomy.

  Acceptance: `app/concepts/page.tsx`. Heading Inter 700 `24px`. Each `ConceptEntry.tsx` (server): name Inter 600 `18px`, description `15px` muted, analysis count `11px` uppercase muted. `app/concepts/[slug]/page.tsx`: filtered analyses for that concept. `generateStaticParams()`. Server Component.
  Files: `src/app/concepts/page.tsx`, `src/app/concepts/[slug]/page.tsx`, `src/components/concepts/ConceptEntry.tsx`

---

- [ ] **TASK-009** | Est: 1h
  **Subscribe page — bundle selector**
  Subscription bundles display. No real payment.

  Acceptance: `app/subscribe/page.tsx`. Each `BundleCard.tsx` (server): bundle name Inter 700 `20px`, price Inter `18px`, billing period `12px` muted, feature list `<ul>` `15px`. "Subscribe →" `<a href="#" aria-label="Subscribe to {bundle.name}">` — external link mock. NEVER render payment form inline. `0px` or `2px` border-radius. `1px solid var(--color-border)` card border. Server Component.
  Files: `src/app/subscribe/page.tsx`, `src/components/subscribe/BundleCard.tsx`

---

## Phase 4 — QA

---

- [ ] **TASK-010** | Est: 1h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== Max-width 680px column enforced ===" && \
    grep -r "max-width.*680\|max-w-.*2xl" src/app/globals.css \
    && echo "PASS" || echo "FAIL — body column must be 680px"

  echo "=== No sidebars ===" && \
    grep -r "aside\|sidebar" src/components --include="*.tsx" \
    && echo "FAIL — single column only" || echo "PASS"

  echo "=== PaywallFade uses blur not display none ===" && \
    grep -r "display.*none\|hidden" src/components/analysis/PaywallFade.tsx \
    && echo "FAIL — use blur, not display:none" || echo "PASS"

  echo "=== StrategyDiagram has aria-describedby ===" && \
    grep -r "aria-describedby\|figcaption\|diagramDescription" src/components/analysis/StrategyDiagram.tsx \
    && echo "PASS" || echo "FAIL"

  echo "=== PlusBadge has aria-label ===" && \
    grep -r "aria-label" src/components/feed/PlusBadge.tsx && echo "PASS" || echo "FAIL"

  echo "=== No payment form in subscribe ===" && \
    grep -r "stripe\|CardElement\|payment" src/components/subscribe --include="*.tsx" \
    && echo "FAIL — external link only" || echo "PASS"

  echo "=== No hex in component files ===" && \
    grep -r "#[0-9A-Fa-f]\{3,6\}" src/components --include="*.tsx" \
    && echo "FAIL — use CSS variables" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
