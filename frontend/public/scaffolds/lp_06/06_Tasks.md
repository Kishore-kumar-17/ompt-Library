# 06 — Tasks
## Multi-Product Creator Business & Hub · lp_platform_06

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
  Light mode only. White foundation with Ali Blue accent.

  ```css
  --color-bg:       #FFFFFF;
  --color-surface:  #F9FAFB;
  --color-border:   #E5E7EB;
  --color-ink:      #111827;
  --color-muted:    #6B7280;
  --color-accent:   #3B82F6;
  --color-yellow:   #FBBF24;
  --color-radius:   16px;

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

  Acceptance: All variables in DevTools. `grep -r "bg-black\|background.*#000\|bg-gray-900" src/components --include="*.tsx"` → empty — light mode only.
  Files: `src/app/globals.css`

---

- [ ] **TASK-003** | Est: 45m
  **TypeScript types**
  All domain types exported. `tsc --noEmit` exits 0.

  ```typescript
  export type ProductType = 'course' | 'book' | 'newsletter' | 'tool'
  export type OutcomeTag = 'free' | 'live' | 'bestseller' | 'digital' | 'community'

  export interface CreatorProduct {
    id: string; slug: string; name: string
    type: ProductType; outcomeTags: OutcomeTag[]
    description: string; price?: number; currency?: string
    trailerUrl?: string; imageAlt: string; isHighlighted?: boolean
  }

  export interface IntentPathway {
    id: string; label: string; description: string
    targetAudience: string; link: string
  }

  export interface ContentItem {
    id: string; slug: string; title: string
    type: 'video' | 'article' | 'book_note'
    date: string; readingTime?: number; topics: string[]
  }
  ```

  Files: `src/types/index.ts`

---

- [ ] **TASK-004** | Est: 45m
  **Static data files**
  Mock data for all sections.

  Acceptance: `products.ts` exports 6 `CreatorProduct` objects across at least 3 types. `pathways.ts` exports 4 `IntentPathway` objects (e.g., Start YouTube, Study Better). `content.ts` exports 8 `ContentItem` objects. `tsc --noEmit` clean.
  Files: `src/lib/products.ts`, `src/lib/pathways.ts`, `src/lib/content.ts`

---

## Phase 1 — Hub and Pathways

---

- [ ] **TASK-005** | Est: 1h
  **SiteNav**
  Friendly nav with rounded CTA and deep-link dropdowns.

  Acceptance: White bg, `1px solid var(--color-border)` bottom. Logo left Inter 700 ink. Links: Academy, Archive, Newsletter, About. "Start Here →" accent bg `var(--color-radius)` radius CTA, `44px` height. Hover dropdowns: surface bg, `16px` radius, `1px solid var(--color-border)`. Mobile hamburger `aria-expanded`. Server Component.
  Files: `src/components/layout/SiteNav.tsx`

---

- [ ] **TASK-006** | Est: 1.5h
  **HubHero + PathwaysGrid**
  "Hey, how can I help you?" entry with intent routing.

  Acceptance: `HubHero`: personal photo `alt="[Creator name]"`, Inter 700 `clamp(28px,4vw,48px)` headline. Sub-headline Inter 400 `18px` muted. `PathwaysGrid`: CSS Grid `repeat(2,1fr)` desktop → `1fr` mobile. Each `IntentCard.tsx` (server): pathway label Inter 600, description Inter `14px` muted, "→" accent-color link. Card bg surface, `var(--color-radius)` radius, `1px solid var(--color-border)`. Hover: `scale(1.02)` — `prefers-reduced-motion`: skip scale.
  Files: `src/components/home/HubHero.tsx`, `src/components/home/PathwaysGrid.tsx`, `src/components/home/IntentCard.tsx`

---

## Phase 2 — Product Catalog

---

- [ ] **TASK-007** | Est: 1.5h
  **ProductGridCard + Academy page**
  Outcome-labeled product catalog with trailer previews.

  Acceptance: `app/academy/page.tsx`. `ProductFilterBar.tsx` is `'use client'`: product type tabs. `ProductGridCard.tsx` (server): `OutcomeBadge` chips per `outcomeTags`, product name Inter 600, description Inter `14px` muted, price Inter 700 accent-color if paid, "Free" label if no price. If `trailerUrl`: play button overlay — opens `<video>` inline on click (client sub-component). `var(--color-radius)` radius on cards. CSS Grid `repeat(3,1fr)` desktop → `repeat(2,1fr)` tablet → `1fr` mobile.
  Files: `src/app/academy/page.tsx`, `src/components/products/ProductGridCard.tsx`, `src/components/products/ProductFilterBar.tsx`, `src/components/ui/OutcomeBadge.tsx`

---

## Phase 3 — Wisdom Archive and Newsletter

---

- [ ] **TASK-008** | Est: 1.5h
  **WisdomArchive**
  Searchable 1000+ item directory.

  Acceptance: `app/archive/page.tsx`. `WisdomSearchInput.tsx` is `'use client'`: debounced `300ms` search across title+topics. `ContentMetadataCard.tsx` (server): type icon + `aria-label`, title Inter 600, date+reading time Inter `13px` mono muted, topic tags. `TopicCloud.tsx` is `'use client'`: proportional tag sizing based on `itemCount`. `var(--color-radius)` radius on cards and tags.
  Files: `src/app/archive/page.tsx`, `src/components/archive/WisdomSearchInput.tsx`, `src/components/archive/ContentMetadataCard.tsx`, `src/components/archive/TopicCloud.tsx`

---

- [ ] **TASK-009** | Est: 1h
  **NewsletterBlock**
  High-conversion email signup with subscriber count.

  Acceptance: `'use client'`. "Join 400k+ friends" subscriber count Inter 600. "Sunday Snippets — what's inside:" preview list Inter `14px` muted. Email input `var(--color-radius)` radius + "Subscribe →" accent bg button. Success: "You're in! Check your inbox." — replaces form in-place. `role="alert"` on success. `aria-label="Newsletter signup"` on form.
  Files: `src/components/newsletter/NewsletterBlock.tsx`

---

## Phase 4 — QA

---

- [ ] **TASK-010** | Est: 1h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== No dark backgrounds ===" && \
    grep -r "bg-black\|background.*#000\|bg-gray-900\|bg-zinc-900" src/components --include="*.tsx" \
    && echo "FAIL — light mode only" || echo "PASS"

  echo "=== ProductFilterBar is use client ===" && \
    grep -r "'use client'" src/components/products/ProductFilterBar.tsx && echo "PASS" || echo "FAIL"

  echo "=== WisdomSearchInput is use client ===" && \
    grep -r "'use client'" src/components/archive/WisdomSearchInput.tsx && echo "PASS" || echo "FAIL"

  echo "=== TopicCloud is use client ===" && \
    grep -r "'use client'" src/components/archive/TopicCloud.tsx && echo "PASS" || echo "FAIL"

  echo "=== NewsletterBlock is use client ===" && \
    grep -r "'use client'" src/components/newsletter/NewsletterBlock.tsx && echo "PASS" || echo "FAIL"

  echo "=== IntentCard uses var(--color-radius) ===" && \
    grep -r "color-radius\|16px" src/components/home/IntentCard.tsx && echo "PASS" || echo "REVIEW"

  echo "=== No hex in component files ===" && \
    grep -r "#[0-9A-Fa-f]\{3,6\}" src/components --include="*.tsx" \
    && echo "FAIL — use CSS variables" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
