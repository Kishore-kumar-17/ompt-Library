# 06 — Tasks
## Journalist Portfolio & Paid Newsletter · pcpp_platform_10

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
  Tech-native minimalism — pure white, deep black, indigo accent.

  ```css
  --color-bg:       #FFFFFF;
  --color-surface:  #F9FAFB;
  --color-border:   #E5E7EB;
  --color-ink:      #000000;
  --color-muted:    #52525B;
  --color-accent:   #4F46E5;
  --color-locked:   #FACC15;

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

  Acceptance: All variables in DevTools. `grep -r "bg-black\|background.*#000" src/components --include="*.tsx"` → empty (light mode only).
  Files: `src/app/globals.css`

---

- [ ] **TASK-003** | Est: 45m
  **TypeScript types**
  All domain types exported. `tsc --noEmit` exits 0.

  ```typescript
  export type ArticleCategory = 'policy' | 'platforms' | 'ai' | 'breaking' | 'analysis'
  export type SubscriptionTier = 'free' | 'paid'

  export interface Article {
    slug: string; title: string; deck: string
    date: string
    category: ArticleCategory; tier: SubscriptionTier
    excerpt: string
    published: boolean
  }

  export interface SubscriptionPlan {
    id: 'monthly' | 'annual'
    price: number; currency: string
    stripePortalUrl: string
  }
  ```

  Files: `src/types/index.ts`

---

- [ ] **TASK-004** | Est: 30m
  **Static data files**
  Mock data for all sections.

  Acceptance: `articles.ts` exports 12 `Article` objects — mix of `free` and `paid` tiers across all 5 categories. `subscriptionPlans.ts` exports 2 `SubscriptionPlan` objects (monthly + annual). `tsc --noEmit` clean.
  Files: `src/lib/articles.ts`, `src/lib/subscriptionPlans.ts`

---

## Phase 1 — Navigation

---

- [ ] **TASK-005** | Est: 1h
  **StickyNav**
  High-authority editorial nav with subscription CTA.

  Acceptance: `position: sticky; top: 0`. `background: var(--color-bg)`. `1px solid var(--color-border)` bottom. Publication wordmark left: Inter 800 `18px` tracking `-0.02em`. Links: Stories, Archive, Podcast — `14px`. "Subscribe →" CTA right: `background: var(--color-accent); color: #fff` `4px` radius `44px` height. On scroll: `box-shadow: 0 1px 4px rgba(0,0,0,0.1)`. `aria-label="Main navigation"`. Server Component.
  Files: `src/components/layout/StickyNav.tsx`

---

## Phase 2 — News Feed and Paywall

---

- [ ] **TASK-006** | Est: 1.5h
  **NewsFeed — information-dense article stream**
  Chronological headlines with deck and metadata.

  Acceptance: `app/page.tsx`. Container `max-width: 800px` centered. `CategoryBar.tsx` is `'use client'`: filter by category — `aria-pressed` on active. `NewsFeedItem.tsx` (server): headline Inter 800 `clamp(20px,3vw,32px)` tracking `-0.02em`. Deck Inter 500 `18px` leading 1.4 `color: var(--color-muted)`. Meta row: date `12px` uppercase bold + category + access badge. If `access: 'paid'`: `PaidBadge.tsx` (server): `color: var(--color-locked)` — text "Paid" with `aria-label="Subscriber only content"` — NOT an icon without label. `1px solid var(--color-border)` bottom separator. `32px` gap between entries.
  Files: `src/app/page.tsx`, `src/components/feed/CategoryBar.tsx`, `src/components/feed/NewsFeedItem.tsx`, `src/components/feed/PaidBadge.tsx`

---

- [ ] **TASK-007** | Est: 2h
  **Article page + paywall gate**
  Free excerpt revealed, then locked content — no real authentication.

  Acceptance: `app/articles/[slug]/page.tsx`. `generateStaticParams()`. `notFound()`. Headline Inter 800 `clamp(28px,4vw,48px)`. Deck `20px` muted. Date + category meta `12px`. Body: first `article.freeExcerptWords` words rendered. If `access: 'paid'`: `PaywallGate.tsx` is `'use client'`: renders remaining body with `background: linear-gradient(to bottom, transparent, var(--color-bg))` overlay over last 3 lines. Below: `SubscribeCTA.tsx` (server): heading Inter 700 `24px`, "Subscribe to keep reading" — links to `/subscribe`. `aria-label="Paywall — subscribe to read full article"` on gate container. NEVER hide content with `display: none` — fade overlay only.
  Files: `src/app/articles/[slug]/page.tsx`, `src/components/article/PaywallGate.tsx`, `src/components/article/SubscribeCTA.tsx`

---

## Phase 3 — Subscribe and Podcast

---

- [ ] **TASK-008** | Est: 1h
  **Subscription page — tier selector**
  Multi-tier subscription display. No real payment processing.

  Acceptance: `app/subscribe/page.tsx`. `TierSelector.tsx` is `'use client'`: 3 tier cards — `aria-pressed` on selected. Selected: `border: 2px solid var(--color-accent)`. Feature list: `<ul>` with `<li>` per feature. "Subscribe →" `<a>` per tier — links to external Substack or mock `href="#"`. NEVER render Stripe `<CardElement>` or any real payment form. `4px` radius. `aria-label="Subscription plan: {tier.label}"` on each card.
  Files: `src/app/subscribe/page.tsx`, `src/components/subscribe/TierSelector.tsx`

---

- [ ] **TASK-009** | Est: 45m
  **Podcast section**
  Audio episodes with minimal embed blocks.

  Acceptance: `app/podcast/page.tsx`. Each `PodcastCard.tsx` (server): title Inter 700 `18px`, date `12px` muted, duration `12px` muted, description `15px`. Embed: `<iframe src={episode.embedUrl} title={episode.title} aria-label={episode.title}>` — no custom player, standard embed only. `1px solid var(--color-border)` card border. `4px` radius. Server Component.
  Files: `src/app/podcast/page.tsx`, `src/components/podcast/PodcastCard.tsx`

---

## Phase 4 — QA

---

- [ ] **TASK-010** | Est: 1h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== No white backgrounds in components ===" && \
    grep -r "bg-white\|background.*#fff\|background: white" src/components --include="*.tsx" \
    && echo "REVIEW — verify intentional" || echo "PASS"

  echo "=== CategoryBar is use client ===" && \
    grep -r "'use client'" src/components/feed/CategoryBar.tsx && echo "PASS" || echo "FAIL"

  echo "=== CategoryBar has aria-pressed ===" && \
    grep -r "aria-pressed" src/components/feed/CategoryBar.tsx && echo "PASS" || echo "FAIL"

  echo "=== PaidBadge has aria-label ===" && \
    grep -r "aria-label" src/components/feed/PaidBadge.tsx && echo "PASS" || echo "FAIL"

  echo "=== PaywallGate not using display none ===" && \
    grep -r "display.*none\|hidden" src/components/article/PaywallGate.tsx \
    && echo "FAIL — use gradient overlay, not display:none" || echo "PASS"

  echo "=== No real payment form ===" && \
    grep -r "CardElement\|stripe\|Stripe\|payment_intent" src --include="*.tsx" \
    && echo "FAIL — mock only, no real payment" || echo "PASS"

  echo "=== TierSelector has aria-pressed ===" && \
    grep -r "aria-pressed" src/components/subscribe/TierSelector.tsx && echo "PASS" || echo "FAIL"

  echo "=== No hex in component files ===" && \
    grep -r "#[0-9A-Fa-f]\{3,6\}" src/components --include="*.tsx" \
    && echo "FAIL — use CSS variables" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
