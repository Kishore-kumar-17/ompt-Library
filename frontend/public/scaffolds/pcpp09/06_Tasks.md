# 06 — Tasks
## Writer Portfolio & Literary Publication · pcpp_platform_09

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
  Warm paper palette — cream background, deep ink, goldenrod CTA. No clinical white.

  ```css
  --color-bg:       #FAF9F6;
  --color-surface:  #F5F4F1;
  --color-border:   #E7E5E4;
  --color-ink:      #1C1917;
  --color-muted:    #57534E;
  --color-gold:     #EAB308;

  body { background: var(--color-bg); color: var(--color-ink); font-size: 18px; }

  :focus-visible {
    outline: 2px solid var(--color-ink);
    outline-offset: 2px;
  }

  .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
  }
  ```

  Acceptance: Body bg `#FAF9F6` — warm paper, NOT white. `grep -r "background.*#fff\|background.*white" src/app/globals.css` → empty.
  Files: `src/app/globals.css`

---

- [ ] **TASK-003** | Est: 45m
  **TypeScript types**
  All domain types exported. `tsc --noEmit` exits 0.

  ```typescript
  export type Subject = 'science' | 'art' | 'poetry' | 'philosophy' | 'love' | 'creativity'

  export interface Essay {
    slug: string; title: string
    date: string       // ISO 8601
    subject: Subject; excerpt: string
    illustrationSrc: string; illustrationAlt: string
    published: boolean; complementSlugs: string[]
  }
  ```

  Files: `src/types/index.ts`

---

- [ ] **TASK-004** | Est: 30m
  **Static data files**
  Mock data for all sections.

  Acceptance: `essays.ts` exports 20 `Essay` objects across 6 `Subject` values — each with 2-3 `complementSlugs` pointing to valid slugs within the array. `getEssaysBySubject()` returns `Map<Subject, Essay[]>`. `tsc --noEmit` clean.
  Files: `src/lib/essays.ts`

---

## Phase 1 — Navigation

---

- [ ] **TASK-005** | Est: 1h
  **LibraryNav**
  Serif-flavored minimalist navigation — bookish, not corporate.

  Acceptance: Top-bar `position: sticky; top: 0`. `background: var(--color-bg)`. `1px solid var(--color-border)` bottom. Logo left: Georgia serif `20px` weight 600 — publication name. Links: Essays, Subjects, About, Support — Inter 400 `14px` `color: var(--color-muted)`. Active: `color: var(--color-ink)`. "Support →" link: `color: var(--color-gold)`. `aria-label="Main navigation"`. Server Component.
  Files: `src/components/layout/LibraryNav.tsx`

---

## Phase 2 — Essay Feed

---

- [ ] **TASK-006** | Est: 1.5h
  **EssayFeed + FadeReveal**
  Chronological literary essay stream with slow scroll fades.

  Acceptance: `app/page.tsx`. Single column `max-width: 720px` centered `margin: 0 auto`. Each `EssayItem.tsx` (server): if `illustrationAlt`: `<img alt={essay.illustrationAlt}>` full width `aspect-ratio: 3/2` above text. Title Georgia `clamp(32px,4vw,48px)` weight 600. Subjects list: `11px` uppercase tracking `0.1em` muted — links to subject pages. Excerpt Inter 400 `18px` leading 1.8. Date `14px` muted italic. "Continue Reading →" plain `<a>` link — NOT a button. `120px–160px` gap between entries. `FadeReveal.tsx` is `'use client'`: `IntersectionObserver` → `opacity: 0→1` `800ms ease` on entry. `prefers-reduced-motion`: always visible, no fade.
  Files: `src/app/page.tsx`, `src/components/feed/EssayItem.tsx`, `src/components/feed/FadeReveal.tsx`

---

- [ ] **TASK-007** | Est: 1.5h
  **Essay reading page + complementary threads**
  Long-form reading with "complement this" related essays.

  Acceptance: `app/essays/[slug]/page.tsx`. `generateStaticParams()`. `notFound()`. Reading container `max-width: 720px` centered. Title Georgia `clamp(32px,4vw,48px)` weight 600. Body Inter 400 `18px` leading 1.8. Paragraph margin `24px–32px`. `ReadingThread.tsx` (server): after body — heading "More like this" serif `20px`. Renders essays from `complementSlugs` as `EssayCard[]` — title + excerpt + date. Horizontal scroll on mobile. `prefers-reduced-motion`: static row, no scroll animation.
  Files: `src/app/essays/[slug]/page.tsx`, `src/components/essay/ReadingThread.tsx`

---

## Phase 3 — Subject Index and Support

---

- [ ] **TASK-008** | Est: 1h
  **Subject thematic index**
  Hierarchical browse by topic.

  Acceptance: `app/subjects/page.tsx`. Heading Georgia `32px`. Subject list: each `SubjectCard.tsx` (server): name Georgia `20px` weight 600, description Inter `16px` muted, essay count `11px` uppercase muted. `1px solid var(--color-border)` bottom separator. `app/subjects/[id]/page.tsx`: filtered essay list for that subject. `generateStaticParams()`. Server Component.
  Files: `src/app/subjects/page.tsx`, `src/app/subjects/[id]/page.tsx`, `src/components/subjects/SubjectCard.tsx`

---

- [ ] **TASK-009** | Est: 1h
  **Support / donation module + SurpriseMe**
  Reader-supported model and random essay discovery — no real payment.

  Acceptance: `SupportModule.tsx` (server): `background: var(--color-surface)`. Heading Georgia `24px`. Body `16px` leading 1.7. Two tier options from `NewsletterTier[]`: label + frequency + description. "Support →" `<a>` link `background: var(--color-gold); color: var(--color-ink)` `2px` radius — links to external Substack/Patreon (mock `href="#"`). NEVER render an actual payment form inline. `SurpriseMe.tsx` is `'use client'`: `<button aria-label="Discover a random essay">`. On click: selects random essay from loaded essays array, `router.push('/essays/[slug]')`. `useReducedMotion()`: skip transition animation.
  Files: `src/components/support/SupportModule.tsx`, `src/components/ui/SurpriseMe.tsx`

---

## Phase 4 — QA

---

- [ ] **TASK-010** | Est: 1h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== Warm paper background (not white) ===" && \
    grep -r "background.*#ffffff\|background.*#FFFFFF\|background: white" src/app/globals.css \
    && echo "FAIL — must be #FAF9F6 cream paper" || echo "PASS"

  echo "=== No white backgrounds in components ===" && \
    grep -r "bg-white\|background.*#fff\|background: white" src/components --include="*.tsx" \
    && echo "REVIEW — verify intentional" || echo "PASS"

  echo "=== FadeReveal is use client ===" && \
    grep -r "'use client'" src/components/feed/FadeReveal.tsx && echo "PASS" || echo "FAIL"

  echo "=== FadeReveal handles reduced motion ===" && \
    grep -r "useReducedMotion\|reducedMotion\|prefers-reduced-motion" src/components/feed/FadeReveal.tsx \
    && echo "PASS" || echo "FAIL"

  echo "=== SurpriseMe is use client ===" && \
    grep -r "'use client'" src/components/ui/SurpriseMe.tsx && echo "PASS" || echo "FAIL"

  echo "=== No payment form in SupportModule ===" && \
    grep -r "stripe\|payment\|card\|checkout" src/components/support --include="*.tsx" \
    && echo "FAIL — external link only, no inline payment" || echo "PASS"

  echo "=== generateStaticParams in essay page ===" && \
    grep -r "generateStaticParams" src/app/essays --include="*.tsx" && echo "PASS" || echo "FAIL"

  echo "=== No hex in component files ===" && \
    grep -r "#[0-9A-Fa-f]\{3,6\}" src/components --include="*.tsx" \
    && echo "FAIL — use CSS variables" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
