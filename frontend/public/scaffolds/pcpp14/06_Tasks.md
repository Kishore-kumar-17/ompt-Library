# 06 — Tasks
## Premium Business Journalism & Newsletter · pcpp_platform_14

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
  Analytical modernism — paper grey base, Ken Red accent, zero ads.

  ```css
  --color-bg:       #F9F9F7;
  --color-surface:  #FFFFFF;
  --color-border:   #EEEEEE;
  --color-ink:      #1A1A1B;
  --color-muted:    #555555;
  --color-accent:   #E31E24;
  --color-chart:    #3498DB;

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

  Acceptance: All variables in DevTools. `grep -r "background.*#fff\b" src/components --include="*.tsx"` → empty (use `var(--color-surface)`).
  Files: `src/app/globals.css`

---

- [ ] **TASK-003** | Est: 45m
  **TypeScript types**
  All domain types exported. `tsc --noEmit` exits 0.

  ```typescript
  export type StoryTier = 'public' | 'subscriber'
  export type ContentType = 'article' | 'visual_story' | 'podcast'

  export interface Story {
    slug: string; title: string; deck: string
    date: string
    tier: StoryTier; type: ContentType
    excerpt: string
    nutgraph: [string, string, string]
    illustrationSrc: string; illustrationAlt: string
    published: boolean
  }

  export interface VisualSlide {
    imageSrc: string; imageAlt: string; caption: string
  }

  export interface VisualStory extends Story {
    slides: VisualSlide[]
  }
  ```

  Files: `src/types/index.ts`

---

- [ ] **TASK-004** | Est: 30m
  **Static data files**
  Mock data for all sections.

  Acceptance: `stories.ts` exports 12 `Story` objects — mix of tiers and content types. At least 2 `VisualStory` objects with `slides` arrays of 4+ items. `tsc --noEmit` clean.
  Files: `src/lib/stories.ts`

---

## Phase 1 — Navigation

---

- [ ] **TASK-005** | Est: 1h
  **KenNav**
  Red-accented editorial nav — bold logo, sticky.

  Acceptance: `position: sticky; top: 0`. `background: var(--color-surface)`. `1px solid var(--color-border)` bottom. Logo left: Inter 800 `20px` tracking `-0.01em` `color: var(--color-accent)`. Links: Stories, Visual Stories, Podcast — `14px` muted. "Subscribe →" right: `background: var(--color-accent); color: #fff` — wait, use CSS variable. `color: var(--color-surface)` `2px` radius `44px` height. `aria-label="Main navigation"`. Server Component.
  Files: `src/components/layout/KenNav.tsx`

---

## Phase 2 — Story Feed and Article

---

- [ ] **TASK-006** | Est: 1.5h
  **Story feed + Nutgraph component**
  Analytical story stream with 3-point summaries.

  Acceptance: `app/page.tsx`. Container `max-width: 700px` centered. Each `StoryCard.tsx` (server): `background: var(--color-surface)`. Title Inter 800 `24px` tracking `-0.01em`. Deck `14px` muted. Date `12px` muted. `Nutgraph.tsx` (server): `border-left: 3px solid var(--color-accent)` `padding-left: 16px`. Heading "Key Points" `12px` uppercase `color: var(--color-accent)`. `<ol>` with 3 `<li>` Georgia `16px` leading 1.6 (tuple — always exactly 3). If `tier: 'subscriber'`: "Subscriber" badge `11px` uppercase muted border. `2px` radius on card. `32px` gap.
  Files: `src/app/page.tsx`, `src/components/feed/StoryCard.tsx`, `src/components/feed/Nutgraph.tsx`

---

- [ ] **TASK-007** | Est: 2h
  **Story article page + premium gate**
  Long-form reading with paywall fade.

  Acceptance: `app/stories/[slug]/page.tsx`. `generateStaticParams()`. `notFound()`. `<img src={story.illustrationSrc} alt={story.illustrationAlt}>` full width above title. Title Inter 800 `clamp(24px,4vw,36px)`. Deck `18px` muted. `Nutgraph` component at top (renders tuple directly — 3 items always). Excerpt Georgia `19px` leading 1.7 `max-width: 700px`. If `tier: 'subscriber'`: `PremiumGate.tsx` is `'use client'`: shows excerpt. Remaining: `filter: blur(5px); pointer-events: none; user-select: none`. Below gate: `UpgradeCTA.tsx` (server): "Unlock full story →" `<a>` accent bg `2px` radius `44px`. NEVER `display: none` on gated content.
  Files: `src/app/stories/[slug]/page.tsx`, `src/components/story/PremiumGate.tsx`, `src/components/story/UpgradeCTA.tsx`

---

## Phase 3 — Visual Stories

---

- [ ] **TASK-008** | Est: 2h
  **VisualStorySlideDeck**
  Mobile-first horizontal slide narrative.

  Acceptance: `app/visual/[slug]/page.tsx`. `generateStaticParams()` from `VisualStory` objects (type extends `Story`). `SlideDeck.tsx` is `'use client'`. Horizontal slides, swipe + arrow key navigation. `SlideProgress.tsx`: `position: fixed; top: 0; left: 0; height: 3px; background: var(--color-accent)` — width tracks progress. Each `Slide.tsx` (server): `<img src={slide.imageSrc} alt={slide.imageAlt}>` full viewport width. Caption Georgia `16px` centered. Prev/Next `<button>` with `aria-label`. `aria-live="polite"` on slide counter "Slide N of M". `prefers-reduced-motion`: disable swipe animation, instant jump.
  Files: `src/app/visual/[slug]/page.tsx`, `src/components/visual/SlideDeck.tsx`, `src/components/visual/SlideProgress.tsx`

---

## Phase 4 — QA

---

- [ ] **TASK-009** | Est: 1h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== No white backgrounds in components ===" && \
    grep -r "bg-white\|background.*#fff\|background: white" src/components --include="*.tsx" \
    && echo "REVIEW — use var(--color-surface)" || echo "PASS"

  echo "=== PremiumGate uses blur not display none ===" && \
    grep -r "display.*none\|hidden" src/components/story/PremiumGate.tsx \
    && echo "FAIL — blur only, not display:none" || echo "PASS"

  echo "=== SlideDeck is use client ===" && \
    grep -r "'use client'" src/components/visual/SlideDeck.tsx && echo "PASS" || echo "FAIL"

  echo "=== SlideDeck handles reduced motion ===" && \
    grep -r "useReducedMotion\|reducedMotion" src/components/visual/SlideDeck.tsx \
    && echo "PASS" || echo "FAIL"

  echo "=== SlideDeck has aria-live on counter ===" && \
    grep -r "aria-live" src/components/visual/SlideDeck.tsx && echo "PASS" || echo "FAIL"

  echo "=== Visual slides use imageSrc ===" && \
    grep -r "imageSrc" src/components/visual --include="*.tsx" \
    && echo "PASS" || echo "FAIL"

  echo "=== No payment form ===" && \
    grep -r "stripe\|CardElement\|payment_intent" src --include="*.tsx" \
    && echo "FAIL — mock only" || echo "PASS"

  echo "=== No hex in component files ===" && \
    grep -r "#[0-9A-Fa-f]\{3,6\}" src/components --include="*.tsx" \
    && echo "FAIL — use CSS variables" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
