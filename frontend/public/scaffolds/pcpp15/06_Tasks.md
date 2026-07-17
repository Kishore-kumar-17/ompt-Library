# 06 — Tasks
## Modern Newsletter Landing Page & Creator Hub · pcpp_platform_15

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
  Minimalist publishing — white paper, vibrant orange CTA, `2px` radius max.

  ```css
  --color-bg:       #FFFFFF;
  --color-surface:  #FDFDFD;
  --color-border:   #E5E5E5;
  --color-ink:      #1A1A1A;
  --color-muted:    #666666;
  --color-accent:   #FF6719;

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

  Acceptance: All variables in DevTools. `grep -r "bg-orange\|#FF6" src/components --include="*.tsx"` → empty (use `var(--color-accent)`).
  Files: `src/app/globals.css`

---

- [ ] **TASK-003** | Est: 45m
  **TypeScript types**
  All domain types exported. `tsc --noEmit` exits 0.

  ```typescript
  export type SubscriptionTier = 'free' | 'paid' | 'founder'
  export type PostStatus = 'public' | 'paid' | 'founder_only'

  export interface Post {
    slug: string; title: string
    date: string
    status: PostStatus; excerpt: string
    coverSrc?: string; coverAlt?: string
    readTimeMinutes: number; published: boolean
  }

  export interface SubscriptionPlan {
    tier: SubscriptionTier
    priceMonthly: number; priceAnnual: number; currency: string
    features: string[]
    stripePortalUrl: string
  }
  ```

  Files: `src/types/index.ts`

---

- [ ] **TASK-004** | Est: 30m
  **Static data files**
  Mock data for all sections.

  Acceptance: `posts.ts` exports 16 `Post` objects — mix of all 3 `PostStatus` values. `subscriptionPlans.ts` exports 3 `SubscriptionPlan` objects (one per tier). `tsc --noEmit` clean.
  Files: `src/lib/posts.ts`, `src/lib/subscriptionPlans.ts`

---

## Phase 1 — Welcome Page (Email Gateway)

---

- [ ] **TASK-005** | Est: 1.5h
  **WelcomePage — email capture gateway**
  First entry point — publication cover + single email field.

  Acceptance: `app/welcome/page.tsx`. Full-viewport centered layout. Cover image `<img alt="[Publication name] cover">` above text. Publication wordmark Inter 700 `clamp(32px,5vw,54px)`. Tagline `18px` muted. `EmailCaptureForm.tsx` is `'use client'`: single `<input type="email" aria-label="Enter your email address">` + "Subscribe →" `<button>`. Button `background: var(--color-accent); color: #fff` — wait, use inline style or CSS variable. Correct: `background: var(--color-accent); color: white` `2px` radius `44px` height. On submit: show `<p role="status">Thanks — check your email!</p>`. Below form: "No spam. Unsubscribe anytime." `12px` muted. "Or browse the archive →" `<a href="/">`. `prefers-reduced-motion`: no fade animation.
  Files: `src/app/welcome/page.tsx`, `src/components/welcome/EmailCaptureForm.tsx`

---

## Phase 2 — Publication Homepage

---

- [ ] **TASK-006** | Est: 1.5h
  **PublicationNav + FeedSwitcher**
  Minimal nav with homepage layout toggle.

  Acceptance: `PublicationNav.tsx` (server): `position: sticky; top: 0`. `background: var(--color-bg)`. `1px solid var(--color-border)` bottom. Publication name left Inter 600 `16px`. Links: Archive, About, Subscribe. "Subscribe →" `<a>` `color: var(--color-accent)`. `aria-label="Main navigation"`. `FeedSwitcher.tsx` is `'use client'`: toggle between Feature / Magazine / Newspaper display modes (UI state only — not a typed domain value). `aria-pressed` on active. Stores mode in `useState`. Server Component wrapper.
  Files: `src/components/layout/PublicationNav.tsx`, `src/components/home/FeedSwitcher.tsx`

---

- [ ] **TASK-007** | Est: 2h
  **Multi-mode homepage feed**
  Three layout modes for different content volumes.

  Acceptance: `app/page.tsx`. Receives display mode string from `FeedSwitcher` (local UI state). Three `PostGrid` modes:
  - `feature`: 1 large hero post `<img src={post.coverSrc} alt={post.coverAlt}>` `aspect-ratio: 16/9` + 4 smaller cards below in `repeat(2,2fr)` grid.
  - `magazine`: CSS Grid `repeat(3,1fr)` + `repeat(2,1fr)` for rows — 5 posts with cover images.
  - `newspaper`: plain `<ul>` list — title + date + excerpt `15px`. No images.
  All modes: if `status: 'paid'` or `status: 'founder_only'`: inline label `11px` uppercase muted `border: 1px solid var(--color-border)` `aria-label="Paid subscribers only"`. `FadeIn.tsx` is `'use client'`: `opacity 0→1` `400ms` on mount for post entries. `prefers-reduced-motion`: no fade. Container `max-width: 1200px`.
  Files: `src/app/page.tsx`, `src/components/home/FadeIn.tsx`

---

## Phase 3 — Post Reading and Archive

---

- [ ] **TASK-008** | Est: 1.5h
  **Post reading page + paywall overlay**
  Article reading with free/paid access control.

  Acceptance: `app/posts/[slug]/page.tsx`. `generateStaticParams()`. `notFound()`. Reading container `max-width: 720px` centered. Title Inter 700 `clamp(24px,4vw,40px)`. Date + read time `12px` muted. If `coverSrc`: full-width `<img src={post.coverSrc} alt={post.coverAlt}>` above title. Excerpt Georgia `18px` leading 1.8. If `status: 'paid'` or `status: 'founder_only'`: `PaywallOverlay.tsx` is `'use client'`: renders excerpt. Below: `linear-gradient(to bottom, transparent, var(--color-bg))` overlay, then `TierCards.tsx` showing `SubscriptionPlan` objects. NEVER `display: none` on gated content.
  Files: `src/app/posts/[slug]/page.tsx`, `src/components/post/PaywallOverlay.tsx`

---

- [ ] **TASK-009** | Est: 1h
  **Archive index + subscription tiers**
  Year/month browsable archive and tier selector.

  Acceptance: `app/archive/page.tsx`. Posts grouped by year — years descending. Each year: heading `20px`. Month rows: month label + count as `<a>` links. `app/subscribe/page.tsx`. `TierCards.tsx` (server): 3 plan cards side by side desktop → stacked mobile — sourced from `subscriptionPlans.ts`. Each: tier Inter 700 `20px`, `priceMonthly`/`priceAnnual` `24px`, `currency` `12px` muted, `features` `<ul>` `14px`. "Subscribe →" `<a href={plan.stripePortalUrl}>` `background: var(--color-accent)` `2px` radius `44px`. NEVER inline payment form.
  Files: `src/app/archive/page.tsx`, `src/app/subscribe/page.tsx`, `src/lib/archive.ts`, `src/components/subscribe/TierCards.tsx`

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

  echo "=== EmailCaptureForm is use client ===" && \
    grep -r "'use client'" src/components/welcome/EmailCaptureForm.tsx && echo "PASS" || echo "FAIL"

  echo "=== EmailCaptureForm has role=status on success ===" && \
    grep -r "role.*status" src/components/welcome/EmailCaptureForm.tsx && echo "PASS" || echo "FAIL"

  echo "=== FeedSwitcher is use client ===" && \
    grep -r "'use client'" src/components/home/FeedSwitcher.tsx && echo "PASS" || echo "FAIL"

  echo "=== FeedSwitcher has aria-pressed ===" && \
    grep -r "aria-pressed" src/components/home/FeedSwitcher.tsx && echo "PASS" || echo "FAIL"

  echo "=== PaywallOverlay not using display none ===" && \
    grep -r "display.*none\|hidden" src/components/post/PaywallOverlay.tsx \
    && echo "FAIL — gradient overlay only" || echo "PASS"

  echo "=== No payment form in subscribe ===" && \
    grep -r "stripe\|CardElement\|payment" src/app/subscribe --include="*.tsx" \
    && echo "FAIL — external link only" || echo "PASS"

  echo "=== Posts use status not access ===" && \
    grep -r "status:" src/lib/posts.ts && echo "PASS" || echo "FAIL"

  echo "=== generateStaticParams in post page ===" && \
    grep -r "generateStaticParams" src/app/posts --include="*.tsx" && echo "PASS" || echo "FAIL"

  echo "=== No hex in component files ===" && \
    grep -r "#[0-9A-Fa-f]\{3,6\}" src/components --include="*.tsx" \
    && echo "FAIL — use CSS variables" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
