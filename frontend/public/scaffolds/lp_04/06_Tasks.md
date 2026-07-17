# 06 — Tasks
## Minimal Personal Brand & Content Archive · lp_platform_04

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
  **Font setup — Serif + Mono pairing**
  System serif for narrative, `font-mono` (JetBrains Mono or system-ui mono) for metadata.

  Acceptance: Headings and body prose use serif. Dates, durations, source labels use monospace. `grep -r "Inter\|Montserrat\|Playfair" src` returns empty — system fonts only.
  Files: `src/app/layout.tsx`

---

- [ ] **TASK-003** | Est: 30m
  **Design tokens — CSS variables**
  Strictly black-on-white. Zero decorative color.

  ```css
  --color-bg:       #FFFFFF;
  --color-surface:  #F9FAFB;
  --color-border:   #000000;
  --color-ink:      #000000;
  --color-muted:    #6B7280;

  body { background: var(--color-bg); color: var(--color-ink); }
  * { border-radius: 0 !important; }

  :focus-visible {
    outline: 2px solid var(--color-ink);
    outline-offset: 2px;
  }

  .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { transition-duration: 0.01ms !important; }
  }
  ```

  Acceptance: All variables in DevTools. Body bg is `#FFFFFF`. Zero border-radius anywhere. `grep -r "rounded\|border-radius: [1-9]" src/components --include="*.tsx"` → empty.
  Files: `src/app/globals.css`

---

- [ ] **TASK-004** | Est: 45m
  **TypeScript types**
  All domain types exported. `tsc --noEmit` exits 0.

  ```typescript
  export type ContentType = 'podcast' | 'article' | 'book' | 'tweet'

  export interface ContentItem {
    id: string; slug: string; title: string
    type: ContentType; date: string
    duration?: string; sourceUrl?: string
    excerpt: string; body: string
    topics: string[]
  }

  export interface Topic {
    id: string; slug: string; label: string
    itemCount: number
  }
  ```

  Files: `src/types/index.ts`

---

- [ ] **TASK-005** | Est: 45m
  **MDX content pipeline**
  MDX files as the content source for all items.

  Acceptance: `src/content/` directory with 6 `.mdx` files (mix of podcast/article/book types). `src/lib/content.ts` exports `getAllItems(): ContentItem[]` and `getItemBySlug(slug): ContentItem | undefined` using `fs.readdirSync` + gray-matter. `tsc --noEmit` clean. `notFound()` used for unknown slugs.
  Files: `src/lib/content.ts`, `src/content/*.mdx`

---

## Phase 1 — Chronological Feed

---

- [ ] **TASK-006** | Est: 45m
  **MinimalHeader**
  Bare text-only navigation — no logo image, no icons.

  Acceptance: Single line: author name left (serif), links right (Start Here, Archive, Topics). Zero icon usage. `1px solid var(--color-border)` bottom border. `max-w-[700px]` centered. Server Component.
  Files: `src/components/layout/MinimalHeader.tsx`

---

- [ ] **TASK-007** | Est: 1h
  **ChronologicalFeed**
  Vertical archive — date + title only.

  Acceptance: `app/page.tsx`. Vertical list of content items. Each row: date in `font-mono` `14px` muted | type label `font-mono` `14px` muted | title in serif `18px`. `1px solid var(--color-border)` bottom divider per row. NO card bg, NO shadow, NO rounded corners. `max-w-[700px]` centered. Clicking title navigates to `/[type]/[slug]`. Server Component.
  Files: `src/app/page.tsx`, `src/components/feed/FeedRow.tsx`

---

## Phase 2 — Transcript Viewer

---

- [ ] **TASK-008** | Est: 1.5h
  **TranscriptPage**
  High-density content page optimized for long reading.

  Acceptance: `app/[type]/[slug]/page.tsx`. `generateStaticParams()` from `getAllItems()`. `notFound()` for unknown slug. Layout: `max-w-[700px]` centered. Title serif `clamp(22px,3vw,32px)`. Metadata row: date `font-mono` `13px` | duration `font-mono` `13px` | source link `font-mono` `13px`. MDX body: paragraphs `16px` line-height `1.7`, `1px solid` blockquote border-left, `font-mono` for code. NO decorative elements — typography only. Server Component.
  Files: `src/app/[type]/[slug]/page.tsx`

---

## Phase 3 — Search and Topics

---

- [ ] **TASK-009** | Est: 1.5h
  **WisdomSearch**
  Full-text search across all content items.

  Acceptance: `app/search/page.tsx`. `WisdomSearchInput.tsx` is `'use client'`: debounced input (`300ms`), filters `ContentItem[]` client-side against title+excerpt+topics. Results: same `FeedRow` component, no styling changes. "No results" state: "Nothing found for [query]" in serif `18px`. Zero animations. Zero icons. `useReducedMotion` irrelevant here — no animations.
  Files: `src/app/search/page.tsx`, `src/components/search/WisdomSearchInput.tsx`

---

- [ ] **TASK-010** | Est: 45m
  **TopicArchive**
  Topic-filtered content list.

  Acceptance: `app/topics/[slug]/page.tsx`. `generateStaticParams()` from unique topic slugs in content. `notFound()` for unknown topic. Renders filtered `FeedRow` list. Topic label as `<h1>` serif. Item count `font-mono` `13px` muted. Server Component.
  Files: `src/app/topics/[slug]/page.tsx`

---

## Phase 4 — QA

---

- [ ] **TASK-011** | Est: 1h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== Zero border-radius ===" && \
    grep -r "rounded\|border-radius: [1-9]" src/components --include="*.tsx" \
    && echo "FAIL — 0px radius only" || echo "PASS"

  echo "=== No Inter or Montserrat font ===" && \
    grep -r "Inter\|Montserrat\|Playfair" src --include="*.tsx" \
    && echo "FAIL — system serif + mono only" || echo "PASS"

  echo "=== WisdomSearchInput is use client ===" && \
    grep -r "'use client'" src/components/search/WisdomSearchInput.tsx && echo "PASS" || echo "FAIL"

  echo "=== No decorative colors ===" && \
    grep -r "color.*blue\|color.*green\|color.*red\|color.*purple" src/components --include="*.tsx" \
    && echo "FAIL — black and grey only" || echo "PASS"

  echo "=== No icons ===" && \
    grep -r "lucide-react\|HeroIcon\|IconSvg" src/components --include="*.tsx" \
    && echo "FAIL — zero icons allowed" || echo "PASS"

  echo "=== Feed uses max-w 700px ===" && \
    grep -r "700px\|max-w-\[700" src/app/page.tsx && echo "PASS" || echo "FAIL"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
