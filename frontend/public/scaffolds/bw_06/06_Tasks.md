# 06 — Tasks
## Tropical Portuguese-Goan Restaurant Flagship · bw_platform_06

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
  **Font setup — Lora + Montserrat**
  Lora weight 600 for headings. Montserrat weight 400 and 600 for body and menu labels.

  Acceptance: DevTools shows Lora 600 on `h1–h3` and dish names, Montserrat on body text.
  Files: `src/app/layout.tsx`

---

- [ ] **TASK-003** | Est: 30m
  **Design tokens — 6 CSS variables**
  All 6 color values as CSS custom properties. Cream bg globally.

  Tokens (exact values):
  ```css
  --color-cream:      #FFF9F2;
  --color-terracotta: #CD5C5C;
  --color-teal:       #5F9EA0;
  --color-khaki:      #F0E68C;
  --color-ink:        #1A1A1A;
  --color-sand:       #F3E5D8;

  body { background: var(--color-cream); }
  ```

  Acceptance: All 6 variables in DevTools. `grep -r "background.*#fff\|bg-white" src/components --include="*.tsx"` → empty.
  Files: `src/app/globals.css`

---

- [ ] **TASK-004** | Est: 20m
  **Accessibility utilities**
  `.sr-only`, `prefers-reduced-motion` reset. Rocky mascot alt text pattern enforced.

  Acceptance: `.sr-only` hides text visually. `@media (prefers-reduced-motion: reduce)` sets `transition-duration: 0.01ms`. Hover scale effects respect reduced motion.
  Files: `src/app/globals.css`

---

- [ ] **TASK-005** | Est: 45m
  **TypeScript types**
  All domain types exported. `tsc --noEmit` exits 0.

  ```typescript
  export type MenuCategory = 'food' | 'bar' | 'desserts'
  export type DietaryType = 'veg' | 'non_veg'

  export interface MenuItem {
    id: string; name: string; description: string
    category: MenuCategory; dietary: DietaryType
    price: number; isRockyFav?: boolean
  }

  export interface BentoBlock {
    id: string; label: string; imageSrc: string; href: string
  }

  export interface Event {
    id: string; name: string; date: string
    image: string; isRockyFav?: boolean
  }

  // RockyMascot props — alt is required
  export interface RockyMascotProps {
    alt: string; size?: number; className?: string
  }
  ```

  Files: `src/types/index.ts`

---

- [ ] **TASK-006** | Est: 45m
  **Static data files**
  Mock data for all sections.

  Acceptance: `menu.ts` exports 12 `MenuItem` objects across all 3 categories, at least 3 with `isRockyFav: true`. `bento.ts` exports exactly 4 `BentoBlock` objects. `events.ts` exports 4 `Event` objects. All `tsc --noEmit` clean.
  Files: `src/lib/menu.ts`, `src/lib/bento.ts`, `src/lib/events.ts`

---

## Phase 1 — Navigation and Hero

---

- [ ] **TASK-007** | Est: 1h
  **SiteNav**
  Minimalist centered logo navigation.

  Acceptance: Cream bg, `1px solid var(--color-sand)` bottom border. Logo center "CoastalJoy" Lora 600. Links: Menus, Story, Order Online, Contact. `4px` radius on interactive elements. Server Component.
  Files: `src/components/layout/SiteNav.tsx`

---

- [ ] **TASK-008** | Est: 1h
  **EnvironmentalHero**
  Full-bleed interior photo with Lora text overlay.

  Acceptance: Full-bleed image, `min-height: 80vh`. Centered Lora 600 `clamp(26px, 4vw, 44px)` white overlay text: "A Goan State of Mind." No CTA button. Dark gradient bottom half. Server Component.
  Files: `src/components/home/EnvironmentalHero.tsx`

---

## Phase 2 — Bento Grid and Mascot

---

- [ ] **TASK-009** | Est: 1.5h
  **BentoGrid**
  2×2 CSS Grid homepage — the primary discovery mechanism.

  Acceptance: CSS Grid `grid-template-columns: 1fr 1fr` — NOT flex layout. 4 `BentoBlock` components. Each block: environmental photo background, dark overlay, Lora 600 white label, "Explore →" teal text link. `4px` radius. Hover: `scale(1.02)`. `prefers-reduced-motion`: skip scale. 1-col mobile (`grid-template-columns: 1fr`). Server Component.
  Files: `src/components/home/BentoGrid.tsx`

---

- [ ] **TASK-010** | Est: 1h
  **RockyMascot + OurStory**
  Mascot component and brand narrative section.

  Acceptance: `RockyMascot` component: renders `<img>` or `<svg>` with `alt` prop — TypeScript interface requires `alt: string`. Empty `alt=""` is a dev warning. `OurStory`: 2-col layout — left: `RockyMascot` (`alt="Rocky the Rooster welcoming guests to the Goan bungalow"`) + narrative text; right: 2×2 environmental interior grid. Server Component.
  Files: `src/components/ui/RockyMascot.tsx`, `src/components/home/OurStory.tsx`

---

- [ ] **TASK-011** | Est: 1h
  **HappyTimesStrip**
  Horizontal event carousel.

  Acceptance: Horizontal `overflow-x: auto`, `scrollbar-width: none`, `scroll-snap-type: x mandatory`. 4 event cards: environmental photo, Lora 600 event name, Montserrat `11px` date, "Rocky's Fav" khaki badge if `isRockyFav: true`. Server Component.
  Files: `src/components/home/HappyTimesStrip.tsx`

---

## Phase 3 — Menu Page and Footer

---

- [ ] **TASK-012** | Est: 1.5h
  **Menu Page**
  Category-filtered text-based digital menu.

  Acceptance: `app/menu/page.tsx`. `MenuToggle.tsx` is `'use client'`: 3 tab buttons (Food | Bar | Desserts), active = terracotta bg `var(--color-terracotta)` white text. `DishListItem.tsx` (server): Lora 600 dish name, Montserrat `15px` description, ₹XXX price (monospace), "Rocky's Fav" khaki badge if `isRockyFav: true`. Vertical editorial list — NOT a table or grid layout.
  Files: `src/app/menu/page.tsx`, `src/components/menu/MenuToggle.tsx`, `src/components/menu/DishListItem.tsx`

---

- [ ] **TASK-013** | Est: 30m
  **SisterBrandStrip + SiteFooter**
  Hunger Inc. cross-brand hub and footer.

  Acceptance: `SisterBrandStrip`: horizontal row of 3–4 sister brand logos (grayscale, hover to color). Cream bg. `SiteFooter`: 3 cols, cream bg, warm "Sussegad" copy. Montserrat 400 `14px`. Server Components.
  Files: `src/components/layout/SisterBrandStrip.tsx`, `src/components/layout/SiteFooter.tsx`

---

## Phase 4 — QA

---

- [ ] **TASK-014** | Est: 1h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== No white backgrounds ===" && \
    grep -r "background.*#fff\|bg-white\|background.*white" src/components --include="*.tsx" \
    && echo "FAIL — use cream #FFF9F2" || echo "PASS"

  echo "=== BentoGrid uses CSS Grid not flex ===" && \
    grep -r "grid-template-columns" src/components/home/BentoGrid.tsx && echo "PASS" || echo "FAIL"

  echo "=== No flex on BentoGrid ===" && \
    grep -r "flex\b" src/components/home/BentoGrid.tsx \
    && echo "REVIEW — BentoGrid should be CSS Grid" || echo "PASS"

  echo "=== Rocky mascot has alt attribute ===" && \
    grep -r "alt=" src/components/ui/RockyMascot.tsx && echo "PASS" || echo "FAIL"

  echo "=== MenuToggle is use client ===" && \
    grep -r "'use client'" src/components/menu/MenuToggle.tsx && echo "PASS" || echo "FAIL"

  echo "=== No border-radius above 4px ===" && \
    grep -r "rounded-md\|rounded-lg\|rounded-xl\|rounded-full\|border-radius: [5-9]px" \
    src/components --include="*.tsx" \
    && echo "FAIL — 4px or 0px only" || echo "PASS"

  echo "=== No hex in component files ===" && \
    grep -r "#[0-9A-Fa-f]\{3,6\}" src/components --include="*.tsx" \
    && echo "FAIL — use CSS variables" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
