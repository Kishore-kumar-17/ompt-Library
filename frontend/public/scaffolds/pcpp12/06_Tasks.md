# 06 — Tasks
## Structured Writer/Creator Profile · pcpp_platform_12

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
  Warm off-white base, modern blue accent, `12px` radius throughout.

  ```css
  --color-bg:       #FAF9F6;
  --color-surface:  #FFFFFF;
  --color-border:   #E5E7EB;
  --color-ink:      #1A1A1A;
  --color-muted:    #71717A;
  --color-accent:   #3B82F6;
  --color-radius:   12px;

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

  Acceptance: All variables in DevTools. `--color-radius` token used for all border-radius — `grep -r "border-radius: [0-9]" src/components --include="*.tsx"` → empty (use token).
  Files: `src/app/globals.css`

---

- [ ] **TASK-003** | Est: 45m
  **TypeScript types**
  All domain types exported. `tsc --noEmit` exits 0.

  ```typescript
  export interface WorkEntry {
    id: string; company: string; role: string
    startDate: string; endDate?: string
    logoSrc: string; logoAlt: string; summary: string
    caseStudy?: {
      images: { src: string; alt: string }[]
      techStack: string[]; description: string
    }
  }

  export interface SideProject {
    id: string; name: string; description: string
    coverSrc: string; coverAlt: string
    techStack: string[]; url?: string
  }

  export interface WritingEntry {
    slug: string; title: string
    date: string
    excerpt: string; readTimeMinutes: number
  }
  ```

  Files: `src/types/index.ts`

---

- [ ] **TASK-004** | Est: 30m
  **Static data files**
  Mock data for all sections.

  Acceptance: `work.ts` exports 4 `WorkEntry` objects — at least 2 with `caseStudy`. `sideProjects.ts` exports 6 `SideProject` objects — at least 2 with `url`. `writing.ts` exports 6 `WritingEntry` objects. `tsc --noEmit` clean.
  Files: `src/lib/work.ts`, `src/lib/sideProjects.ts`, `src/lib/writing.ts`

---

## Phase 1 — Profile Shell

---

- [ ] **TASK-005** | Est: 1.5h
  **ProfileHeader + StatusScroller**
  Profile identity and real-time status chips.

  Acceptance: `app/page.tsx`. `ProfileHeader.tsx` (server): avatar `<img alt="[Name] profile photo">` `80px` circle (avatar is circle — use `border-radius: 50%` as intentional exception, not covered by global `0px`). Name Inter 600 `28px`. One-line bio `15px` muted. Social links row: plain `<a>` links with `aria-label="[Platform] profile"`. `StatusScroller.tsx` is `'use client'`: horizontal scroll row of `StatusItem` chips. Each chip: `background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--color-radius)`. Category `11px` uppercase muted, label `13px` ink. `scrollbar-width: none`. Server Component wrapper for page.
  Files: `src/app/page.tsx`, `src/components/profile/ProfileHeader.tsx`, `src/components/profile/StatusScroller.tsx`

---

## Phase 2 — Career Timeline

---

- [ ] **TASK-006** | Est: 2h
  **CareerTimeline + ProjectLayer**
  Vertical work history with expandable case studies.

  Acceptance: `CareerTimeline.tsx` (server): `<ol>` list. Each `WorkCard.tsx` (server): `background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--color-radius); padding: 24px`. Company Inter 600 `16px`. Role `14px` `color: var(--color-accent)`. Dates Inter Mono `12px` muted. `<img alt={entry.logoAlt}>` company logo. Summary `15px` leading 1.6. Tech stack from `caseStudy.techStack`: `<ul>` chips `11px` uppercase muted border. "View Case Study →" `<button>` if `caseStudy` present. `ProjectLayer.tsx` is `'use client'`: Framer `height: 0→auto AnimatePresence` on click. Inside: `caseStudy.images` gallery + description. `useReducedMotion()`: expand instantly. `aria-expanded` on trigger button.
  Files: `src/components/timeline/CareerTimeline.tsx`, `src/components/timeline/WorkCard.tsx`, `src/components/timeline/ProjectLayer.tsx`

---

- [ ] **TASK-007** | Est: 1h
  **Side project grid**
  Non-commercial work showcase.

  Acceptance: `app/projects/page.tsx`. `ProjectTypeFilter.tsx` is `'use client'`: filter by type — All, Side. `aria-pressed` on active. CSS Grid `repeat(3,1fr)` desktop → `repeat(2,1fr)` tablet → `1fr` mobile. Gap `24px`. `ProjectCard.tsx` (server): `border-radius: var(--color-radius)`, `border: 1px solid var(--color-border)`. Cover `<img alt={project.coverAlt}>` `aspect-ratio: 16/9`. Title Inter 600 `16px`. Tech stack tags `11px` muted. If `url`: `<a href={project.url} rel="noopener noreferrer">`. Server Component wrapper.
  Files: `src/app/projects/page.tsx`, `src/components/projects/ProjectTypeFilter.tsx`, `src/components/projects/ProjectCard.tsx`

---

## Phase 3 — Writing

---

- [ ] **TASK-008** | Est: 1h
  **Writing list + reading page**
  Personal journal and case studies.

  Acceptance: `app/writing/page.tsx`. Each `WritingItem.tsx` (server): title Georgia `20px` weight 500, date `12px` muted, excerpt `15px` muted, reading time `12px` muted. `1px solid var(--color-border)` bottom separator. `app/writing/[slug]/page.tsx`: `generateStaticParams()`. `notFound()`. Reading container `max-width: 800px`. Title Georgia `clamp(24px,3vw,36px)`. Body `15px` Inter leading 1.6. Server Component.
  Files: `src/app/writing/page.tsx`, `src/app/writing/[slug]/page.tsx`, `src/components/writing/WritingItem.tsx`

---

## Phase 4 — QA

---

- [ ] **TASK-009** | Est: 1h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== No white backgrounds in components (use --color-surface) ===" && \
    grep -r "bg-white\|background.*#fff\|background: white" src/components --include="*.tsx" \
    && echo "REVIEW — use var(--color-surface)" || echo "PASS"

  echo "=== ProjectLayer is use client ===" && \
    grep -r "'use client'" src/components/timeline/ProjectLayer.tsx && echo "PASS" || echo "FAIL"

  echo "=== ProjectLayer handles reduced motion ===" && \
    grep -r "useReducedMotion\|reducedMotion" src/components/timeline/ProjectLayer.tsx \
    && echo "PASS" || echo "FAIL"

  echo "=== ProjectLayer has aria-expanded ===" && \
    grep -r "aria-expanded" src/components/timeline/ProjectLayer.tsx && echo "PASS" || echo "FAIL"

  echo "=== StatusScroller is use client ===" && \
    grep -r "'use client'" src/components/profile/StatusScroller.tsx && echo "PASS" || echo "FAIL"

  echo "=== ProjectTypeFilter has aria-pressed ===" && \
    grep -r "aria-pressed" src/components/projects/ProjectTypeFilter.tsx && echo "PASS" || echo "FAIL"

  echo "=== generateStaticParams in writing page ===" && \
    grep -r "generateStaticParams" src/app/writing --include="*.tsx" && echo "PASS" || echo "FAIL"

  echo "=== No hex in component files ===" && \
    grep -r "#[0-9A-Fa-f]\{3,6\}" src/components --include="*.tsx" \
    && echo "FAIL — use CSS variables" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
