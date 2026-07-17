# 06 — Tasks
## High-Authority Creator Brand & Monetization Hub · lp_platform_05

Tasks are ordered by dependency. Complete each task fully before starting the next.

---

## Phase 0 — Foundation

---

- [ ] **TASK-001** | Est: 1h
  **Initialise project**
  Next.js 14 App Router, TypeScript strict, Tailwind CSS v3, static export.

  ```bash
  npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"
  npm install framer-motion lucide-react gray-matter
  ```

  Acceptance: `npm run dev` starts. `tsc --noEmit` exits 0. `npm run build` produces `/out` directory.
  Files: `package.json`, `tsconfig.json`, `next.config.ts`

---

- [ ] **TASK-002** | Est: 30m
  **Design tokens — CSS variables**
  Light academic foundation. Professional blue accent.

  ```css
  --color-bg:       #FFFFFF;
  --color-surface:  #F8F9FA;
  --color-border:   #E5E7EB;
  --color-ink:      #111827;
  --color-muted:    #6B7280;
  --color-accent:   #1D4ED8;
  --color-sidebar:  #F8F9FA;

  body { background: var(--color-bg); color: var(--color-ink); }

  :focus-visible {
    outline: 2px solid var(--color-accent);
    outline-offset: 2px;
  }

  .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { transition-duration: 0.01ms !important; }
  }
  ```

  Acceptance: All variables in DevTools. `grep -r "bg-white\|background.*#fff" src/components --include="*.tsx"` → empty.
  Files: `src/app/globals.css`

---

- [ ] **TASK-003** | Est: 45m
  **TypeScript types**
  All domain types exported. `tsc --noEmit` exits 0.

  ```typescript
  export type ContentType = 'podcast' | 'article'

  export interface ShowNotesItem {
    id: string; slug: string; title: string
    type: ContentType; date: string; duration?: string
    guestName?: string; excerpt: string
    affiliateLinks: AffiliateLink[]
    resourceMentions: ResourceMention[]
    topics: string[]
  }

  export interface AffiliateLink {
    label: string; url: string; disclosure: string
  }

  export interface ResourceMention {
    type: 'person' | 'book' | 'tool'
    name: string; url?: string
  }

  export interface NewsletterSignup {
    email: string; source: string
  }
  ```

  Files: `src/types/index.ts`

---

- [ ] **TASK-004** | Est: 45m
  **Static data files**
  Mock data for archive and show notes.

  Acceptance: `content.ts` exports 8 `ShowNotesItem` objects — at least 4 `type: 'podcast'` with `affiliateLinks`. `topics.ts` exports 6 topic strings. All `tsc --noEmit` clean.
  Files: `src/lib/content.ts`, `src/lib/topics.ts`

---

## Phase 1 — Navigation and Feed

---

- [ ] **TASK-005** | Est: 1h
  **SiteNav + SidebarLayout**
  Wide nav with sidebar widget system.

  Acceptance: `SiteNav`: white bg, `1px solid var(--color-border)` bottom. Logo left Inter 700. Links: Archive, Start Here, Search, Newsletter. `SidebarLayout.tsx`: CSS Grid `grid-template-columns: 1fr 300px` desktop → `1fr` mobile. Right col: `var(--color-sidebar)` bg. Server Component.
  Files: `src/components/layout/SiteNav.tsx`, `src/components/layout/SidebarLayout.tsx`

---

- [ ] **TASK-006** | Est: 1.5h
  **ChronologicalArchive**
  High-volume vertical feed with type icons.

  Acceptance: `app/page.tsx`. Vertical stack of `ArchiveItem.tsx` (server): `TypeIcon` (Mic SVG = podcast, Pen SVG = article — each with `aria-label`), date Inter `13px` muted, title Inter 600 `18px` ink, guest name Inter `14px` muted if podcast, topics tags Inter `12px`. `1px solid var(--color-border)` dividers. Wide layout `max-w-[1140px]`. `ArchiveFilter.tsx` is `'use client'`: topic pill filter. Server Component for list.
  Files: `src/app/page.tsx`, `src/components/archive/ArchiveItem.tsx`, `src/components/archive/ArchiveFilter.tsx`

---

## Phase 2 — Show Notes Page

---

- [ ] **TASK-007** | Est: 2h
  **ShowNotesPage**
  Podcast post template with affiliate-integrated resource lists.

  Acceptance: `app/[type]/[slug]/page.tsx`. `generateStaticParams()` from `content.ts`. `notFound()` for unknown slug. Layout sections in order:
  1. Episode player placeholder `<div role="region" aria-label="Audio player">` with poster and play button.
  2. Title Inter 700 `clamp(22px,3vw,36px)`, date + duration Inter `14px` muted.
  3. Guest block if `guestName`: headshot placeholder + name Inter 600.
  4. Timestamped show notes list — `<ul>` with Inter `15px`.
  5. `PeopleBooksMentioned` section: grouped by type (Person / Book / Tool), each with `ResourceMention.name` + optional link. Affiliate links: `<a href={link.url} rel="nofollow sponsored">` with inline disclosure `<span>` in muted `12px` — disclosure ALWAYS visible inline, NEVER hidden.
  6. Affiliate disclosure block at bottom: Inter `13px` muted, always visible.
  Files: `src/app/[type]/[slug]/page.tsx`, `src/components/content/PeopleBooksMentioned.tsx`

---

## Phase 3 — Newsletter and Start Here

---

- [ ] **TASK-008** | Est: 1h
  **NewsletterAcquisitionBlock**
  High-conversion email capture — placed at top, sidebar, and footer.

  Acceptance: `'use client'` wrapper. "Join 2M+ readers" social proof count Inter 600. "5-Bullet Friday" label Inter 400 `14px` muted. Email input + "Subscribe →" CTA accent bg `4px` radius. Inline success state: "You're in!" in same block — no page navigation. Error state with `role="alert"`. `aria-label="Email newsletter signup"` on form. All instances share same component — different placement props only.
  Files: `src/components/newsletter/NewsletterAcquisitionBlock.tsx`

---

- [ ] **TASK-009** | Est: 1h
  **StartHerePage**
  Curated onboarding hub — organized by category.

  Acceptance: `app/start-here/page.tsx`. CSS Grid `repeat(3,1fr)` desktop → `1fr` mobile. Each category card: category name Inter 700 `20px`, 3–4 curated links (`ShowNotesItem.title`) with Inter `15px` ink. "Best for: [audience]" Inter `13px` muted tag. Card bg `var(--color-surface)`, `1px solid var(--color-border)`, `4px` radius. Server Component. All links go to actual show notes pages.
  Files: `src/app/start-here/page.tsx`

---

## Phase 4 — QA

---

- [ ] **TASK-010** | Est: 1h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== Affiliate disclosure always visible ===" && \
    grep -r "accordion\|collapse\|hidden\|display.*none" src/components/content --include="*.tsx" \
    && echo "REVIEW — disclosure must always be visible" || echo "PASS"

  echo "=== Affiliate links have rel nofollow ===" && \
    grep -r "nofollow\|sponsored" src/app --include="*.tsx" && echo "PASS" || echo "FAIL"

  echo "=== TypeIcon has aria-label ===" && \
    grep -r "aria-label" src/components/archive/ArchiveItem.tsx && echo "PASS" || echo "FAIL"

  echo "=== ArchiveFilter is use client ===" && \
    grep -r "'use client'" src/components/archive/ArchiveFilter.tsx && echo "PASS" || echo "FAIL"

  echo "=== NewsletterAcquisitionBlock is use client ===" && \
    grep -r "'use client'" src/components/newsletter/NewsletterAcquisitionBlock.tsx && echo "PASS" || echo "FAIL"

  echo "=== Newsletter form has aria-label ===" && \
    grep -r "aria-label" src/components/newsletter/NewsletterAcquisitionBlock.tsx && echo "PASS" || echo "FAIL"

  echo "=== No hex in component files ===" && \
    grep -r "#[0-9A-Fa-f]\{3,6\}" src/components --include="*.tsx" \
    && echo "FAIL — use CSS variables" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
