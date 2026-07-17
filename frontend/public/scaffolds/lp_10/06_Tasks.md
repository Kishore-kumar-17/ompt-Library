# 06 — Tasks
## Product Waitlist & Form-Builder Teaser · lp_platform_10

Tasks are ordered by dependency. Complete each task fully before starting the next.

---

## Phase 0 — Foundation

---

- [ ] **TASK-001** | Est: 1h
  **Initialise project**
  Next.js 14 App Router, TypeScript strict, Tailwind CSS v3.

  ```bash
  npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"
  npm install framer-motion lucide-react zod zustand
  ```

  Acceptance: `npm run dev` starts. `tsc --noEmit` exits 0.
  Files: `package.json`, `tsconfig.json`, `next.config.ts`

---

- [ ] **TASK-002** | Est: 30m
  **Design tokens — CSS variables**
  Document purity. White foundation, strictly 1px borders, black text.

  ```css
  --color-bg:       #FFFFFF;
  --color-surface:  #F7F7F7;
  --color-border:   #E5E7EB;
  --color-ink:      #000000;
  --color-muted:    #6B7280;

  body { background: var(--color-bg); color: var(--color-ink); }

  :focus-visible {
    outline: 2px solid var(--color-ink);
    outline-offset: 2px;
  }

  .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
  }
  ```

  Acceptance: All variables in DevTools. `grep -r "rounded-xl\|rounded-2xl\|rounded-full" src --include="*.tsx"` → empty — max `4px` radius.
  Files: `src/app/globals.css`

---

- [ ] **TASK-003** | Est: 1h
  **TypeScript types**
  Block editor and product types. `tsc --noEmit` exits 0.

  ```typescript
  export type BlockType = 'text' | 'short_answer' | 'long_answer' | 'multiple_choice' | 'date' | 'file'

  export interface Block {
    id: string; type: BlockType; label: string
    placeholder?: string; required?: boolean
    options?: string[]  // for multiple_choice
  }

  export interface Draft {
    id: string; title: string; blocks: Block[]
    createdAt: string; lastSavedAt: string
  }

  export interface Template {
    id: string; name: string; category: string
    blocks: Block[]; imageAlt: string
    useCount: number
  }

  export interface RoadmapItem {
    id: string; title: string
    status: 'shipped' | 'in_progress' | 'planned'
    votes: number
  }
  ```

  Files: `src/types/index.ts`

---

- [ ] **TASK-004** | Est: 45m
  **Static data files**
  Mock data for all sections.

  Acceptance: `templates.ts` exports 6 `Template` objects across 3+ categories. `roadmap.ts` exports 8 `RoadmapItem` objects across all 3 statuses. `tsc --noEmit` clean.
  Files: `src/lib/templates.ts`, `src/lib/roadmap.ts`

---

## Phase 1 — Navigation and Hero

---

- [ ] **TASK-005** | Est: 1h
  **SiteNav**
  Minimal nav — black CTA, no decorative elements.

  Acceptance: White bg, `1px solid var(--color-border)` bottom. Logo left Inter 700. Links: Templates, Pricing, Roadmap, Login. "Create for Free →" CTA: black bg, white text, `4px` radius, `44px` height. Mobile hamburger `aria-expanded`. Server Component.
  Files: `src/components/layout/SiteNav.tsx`

---

- [ ] **TASK-006** | Est: 1h
  **HubHero**
  Document-first hero with "Build-First" routing.

  Acceptance: Centered `max-w-[800px]`. Inter 800 `clamp(28px,4vw,52px)` headline. Inter 400 `18px` muted sub-headline. "Create for Free →" CTA opens `/create` (unauthenticated). `StatsStrip.tsx`: 3 transparency stats (users, forms, submissions) in Inter 700 `24px`. Server Component.
  Files: `src/components/home/HubHero.tsx`, `src/components/home/StatsStrip.tsx`

---

## Phase 2 — Block Editor

---

- [ ] **TASK-007** | Est: 2h
  **Zustand store for activeDraft**
  Local-first draft with IndexedDB/LocalStorage persistence.

  Acceptance: `'use client'`. Zustand store: `activeDraft: Draft`, `addBlock(type)`, `removeBlock(id)`, `updateBlock(id, changes)`, `setTitle(title)`. Persist to `localStorage` under key `tally_draft_[id]`. Rehydrate on mount. `tsc --noEmit` clean.
  Files: `src/store/draftStore.ts`

---

- [ ] **TASK-008** | Est: 2h
  **Block Editor — /create page**
  Unauthenticated functional editor.

  Acceptance: `app/create/page.tsx`. `'use client'`. Title `<input>` editable inline — `contentEditable` div or controlled input. `SlashMenu.tsx`: triggered by `/` key, keyboard navigable (arrow up/down, Enter to select, Escape to close), lists block types. `BaseBlock.tsx`: hover shows `+ Add Block` above, drag handle `aria-label="Drag to reorder"`. Block types: `TextBlock`, `ShortAnswerBlock`, `MultipleChoiceBlock` — each fully functional with editing. `WorkspaceSaveModal.tsx`: on "Save" click if not authenticated, modal prompts email signup (Clerk placeholder). `role="dialog"` with `aria-modal="true"`.
  Files: `src/app/create/page.tsx`, `src/components/editor/SlashMenu.tsx`, `src/components/editor/BaseBlock.tsx`, `src/components/editor/WorkspaceSaveModal.tsx`

---

## Phase 3 — Template Discovery and Roadmap

---

- [ ] **TASK-009** | Est: 1.5h
  **TemplateGrid**
  Template discovery with use-template clone logic.

  Acceptance: `app/templates/page.tsx`. `TemplateFilter.tsx` is `'use client'`: category tabs. `TemplateCard.tsx` (server): image `alt={template.imageAlt}`, template name Inter 600, use count Inter `13px` muted, "Use Template →" black CTA. "Use Template" action: loads template `blocks` into `draftStore` and navigates to `/create`. CSS Grid `repeat(3,1fr)` desktop → `repeat(2,1fr)` tablet → `1fr` mobile. `4px` radius on cards.
  Files: `src/app/templates/page.tsx`, `src/components/templates/TemplateCard.tsx`, `src/components/templates/TemplateFilter.tsx`

---

- [ ] **TASK-010** | Est: 1h
  **PublicRoadmap**
  Transparent build-in-public roadmap.

  Acceptance: `app/roadmap/page.tsx`. MDX or static data. Three columns: Shipped, In Progress, Planned. Each `RoadmapItem`: title Inter 600, status badge, vote count Inter `13px` muted. "Vote →" button: `'use client'`, increments `votes` in local state (optimistic). Shipped items: checkmark `aria-label="Shipped"`. Server Component with client vote wrapper.
  Files: `src/app/roadmap/page.tsx`, `src/components/roadmap/RoadmapVoteButton.tsx`

---

## Phase 4 — QA

---

- [ ] **TASK-011** | Est: 1h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== draftStore is client-side only ===" && \
    grep -r "'use client'" src/store/draftStore.ts && echo "PASS" || echo "FAIL"

  echo "=== SlashMenu keyboard navigation ===" && \
    grep -r "ArrowUp\|ArrowDown\|keyDown\|onKeyDown" src/components/editor/SlashMenu.tsx && echo "PASS" || echo "FAIL"

  echo "=== WorkspaceSaveModal has aria-modal ===" && \
    grep -r "aria-modal" src/components/editor/WorkspaceSaveModal.tsx && echo "PASS" || echo "FAIL"

  echo "=== TemplateFilter is use client ===" && \
    grep -r "'use client'" src/components/templates/TemplateFilter.tsx && echo "PASS" || echo "FAIL"

  echo "=== RoadmapVoteButton is use client ===" && \
    grep -r "'use client'" src/components/roadmap/RoadmapVoteButton.tsx && echo "PASS" || echo "FAIL"

  echo "=== No border-radius above 4px ===" && \
    grep -r "rounded-xl\|rounded-2xl\|rounded-full\|rounded-lg" src --include="*.tsx" \
    && echo "FAIL — max 4px radius" || echo "PASS"

  echo "=== No hex in component files ===" && \
    grep -r "#[0-9A-Fa-f]\{3,6\}" src/components --include="*.tsx" \
    && echo "FAIL — use CSS variables" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
