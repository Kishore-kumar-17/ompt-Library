# 06 — Tasks
## Journalist & Author Portfolio · pcpp_platform_11

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
  Academic white — near-black type, minimal structural accent.

  ```css
  --color-bg:       #FFFFFF;
  --color-surface:  #F7F7F7;
  --color-border:   #D1D1D1;
  --color-ink:      #111111;
  --color-muted:    #555555;

  body { background: var(--color-bg); color: var(--color-ink); }

  :focus-visible {
    outline: 1px solid var(--color-ink);
    outline-offset: 2px;
  }

  .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
  }
  ```

  Acceptance: Body bg `#FFFFFF`. Zero decorative color — academic white only. `grep -r "color-accent\|blue\|red" src/app/globals.css` → empty.
  Files: `src/app/globals.css`

---

- [ ] **TASK-003** | Est: 45m
  **TypeScript types**
  All domain types exported. `tsc --noEmit` exits 0.

  ```typescript
  export type ArticleCategory = 'politics' | 'youth' | 'technology' | 'culture' | 'economy'

  export interface Book {
    id: string; title: string; year: number
    coverSrc: string; coverAlt: string; synopsis: string
    buyLinks: { region: string; url: string }[]
  }

  export interface Article {
    id: string; title: string; publication: string
    date: string
    category: ArticleCategory; excerpt: string
    externalUrl: string; published: boolean
  }

  export interface Award {
    year: number; name: string; institution: string
  }
  ```

  Files: `src/types/index.ts`

---

- [ ] **TASK-004** | Est: 30m
  **Static data files**
  Mock data for all sections.

  Acceptance: `books.ts` exports 4 `Book` objects — each with 2-3 `buyLinks`. `articles.ts` exports 12 `Article` objects across all 5 `ArticleCategory` values. `awards.ts` exports 6 `Award` objects. `tsc --noEmit` clean.
  Files: `src/lib/books.ts`, `src/lib/articles.ts`, `src/lib/awards.ts`

---

## Phase 1 — Navigation

---

- [ ] **TASK-005** | Est: 1h
  **AuthorNav**
  Minimal editorial navigation — serif name, academic links.

  Acceptance: Top-bar `position: sticky; top: 0`. `background: var(--color-bg)`. `1px solid var(--color-border)` bottom. Author name left: Playfair Display 600 `18px` — serif, NOT all-caps. Links: Work, Books, Awards, About, Contact — Inter `14px` `color: var(--color-muted)`. Active: `color: var(--color-ink)`. `aria-label="Main navigation"`. Server Component.
  Files: `src/components/layout/AuthorNav.tsx`

---

## Phase 2 — Book Hero and Publications

---

- [ ] **TASK-006** | Est: 1.5h
  **BookHero — book-centric landing**
  Featured book as primary visual anchor.

  Acceptance: `app/page.tsx`. Two-column desktop: book cover left `400px` wide, acclaim + details right. Book cover `<img alt={book.coverImageAlt}>` — `0px` border-radius. Title Playfair Display 600 `clamp(28px,4vw,42px)`. Acclaim text Inter 400 `18px` italic `color: var(--color-muted)`. Publisher + year `12px` uppercase muted. "Get the Book →" `<a href={book.purchaseUrl} rel="noopener noreferrer">` — `border: 1px solid var(--color-ink)` `0px` radius — NOT a filled button. `0px` or `2px` border-radius everywhere. Mobile: single column, cover full-width.
  Files: `src/app/page.tsx`

---

- [ ] **TASK-007** | Est: 1h
  **Publication logo strip**
  Monochrome press logos for journalistic trust.

  Acceptance: `PublicationStrip.tsx` (server): `<ul role="list">` horizontal row. Each `<li>`: publication `<img alt={pub.logoAlt}>` — `filter: grayscale(1) opacity(0.6)`. Hover: `filter: grayscale(0) opacity(1)` `300ms`. `prefers-reduced-motion`: no filter transition — static state. `aria-label="Publications I've written for"` on container. Server Component.
  Files: `src/components/home/PublicationStrip.tsx`

---

## Phase 3 — Article Archive and Awards

---

- [ ] **TASK-008** | Est: 1.5h
  **Article portfolio — filterable by theme**
  Searchable archive of journalism work.

  Acceptance: `app/work/page.tsx`. `ThemeFilter.tsx` is `'use client'`: filter by theme — Politics, Youth, Technology, Culture. `aria-pressed` on active. `AnimatePresence` on filtered articles — `opacity 0→1` `200ms`. `prefers-reduced-motion`: instant filter. `ArticleListItem.tsx` (server): publication Inter 700 `13px` uppercase muted, date `12px` muted, headline Inter 600 `18px`, excerpt `15px` muted. `<a href={article.publicationUrl} rel="noopener noreferrer" aria-label="{article.headline} — {article.publication}">` on headline. `1px solid var(--color-border)` bottom per entry. Container `max-width: 1000px`. Server Component wrapper.
  Files: `src/app/work/page.tsx`, `src/components/work/ThemeFilter.tsx`, `src/components/work/ArticleListItem.tsx`

---

- [ ] **TASK-009** | Est: 1h
  **Awards & recognition wall**
  Prestigious accolades displayed with editorial weight.

  Acceptance: `app/awards/page.tsx`. Heading Playfair Display 600 `32px`. Each `AwardItem.tsx` (server): title Playfair `20px` weight 600, organization Inter `14px` uppercase muted, year `12px` muted, description Inter 400 `16px`. `1px solid var(--color-border)` bottom separator. NO card backgrounds — plain list only. `<section aria-label="Awards and Fellowships">`. Server Component.
  Files: `src/app/awards/page.tsx`, `src/components/awards/AwardItem.tsx`

---

## Phase 4 — QA

---

- [ ] **TASK-010** | Est: 1h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== No decorative accent color ===" && \
    grep -r "color-accent\|#4F\|#EB\|#00" src/app/globals.css \
    && echo "FAIL — academic white only" || echo "PASS"

  echo "=== No white backgrounds in components ===" && \
    grep -r "bg-white\|background.*#fff\|background: white" src/components --include="*.tsx" \
    && echo "REVIEW — verify intentional" || echo "PASS"

  echo "=== ThemeFilter is use client ===" && \
    grep -r "'use client'" src/components/work/ThemeFilter.tsx && echo "PASS" || echo "FAIL"

  echo "=== ThemeFilter has aria-pressed ===" && \
    grep -r "aria-pressed" src/components/work/ThemeFilter.tsx && echo "PASS" || echo "FAIL"

  echo "=== ArticleListItem has aria-label on external link ===" && \
    grep -r "aria-label" src/components/work/ArticleListItem.tsx && echo "PASS" || echo "FAIL"

  echo "=== Article links have rel noopener ===" && \
    grep -r "rel.*noopener" src/components/work --include="*.tsx" \
    && echo "PASS" || echo "FAIL"

  echo "=== Publication strip is not use client ===" && \
    grep -r "'use client'" src/components/home/PublicationStrip.tsx \
    && echo "FAIL — should be Server Component" || echo "PASS"

  echo "=== No hex in component files ===" && \
    grep -r "#[0-9A-Fa-f]\{3,6\}" src/components --include="*.tsx" \
    && echo "FAIL — use CSS variables" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
