# 06 — Tasks
## Global Fine-Dining Restaurant Flagship · bw_platform_07

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
  **Font setup — Playfair Display + Montserrat**
  Playfair Display weight 600 for headings and dish names. Montserrat weight 400 and 500 for body and UI labels.

  Acceptance: DevTools shows Playfair Display 600 on `h1–h3` and course names, Montserrat on body text. `grep -r "font-weight: 700\|font-weight: 800" src` returns empty for Playfair.
  Files: `src/app/layout.tsx`

---

- [ ] **TASK-003** | Est: 30m
  **Design tokens — 6 CSS variables**
  All 6 color values as CSS custom properties. Deep charcoal bg globally — never white or off-white.

  Tokens (exact values):
  ```css
  --color-charcoal: #121212;
  --color-brass:    #D4AF37;
  --color-cream:    #F5F0E8;
  --color-smoke:    #2A2A2A;
  --color-ash:      #6B6B6B;
  --color-border:   #2E2E2E;

  body { background: var(--color-charcoal); color: var(--color-cream); }
  ```

  Acceptance: All 6 variables in DevTools. Body bg is `#121212`. `grep -r "background.*#fff\|background.*white\|bg-white\|background.*#FFF" src/components --include="*.tsx"` → empty.
  Files: `src/app/globals.css`

---

- [ ] **TASK-004** | Est: 20m
  **Accessibility utilities**
  `.sr-only`, `prefers-reduced-motion` reset. Focus ring pattern enforced globally.

  ```css
  :focus-visible {
    outline: 2px solid var(--color-brass);
    outline-offset: 2px;
  }
  ```

  Acceptance: `.sr-only` hides text visually. `@media (prefers-reduced-motion: reduce)` sets `transition-duration: 0.01ms`. Every interactive element shows brass focus ring on keyboard focus. No `outline: none` without replacement visible focus style.
  Files: `src/app/globals.css`

---

- [ ] **TASK-005** | Est: 45m
  **TypeScript types**
  All domain types exported. `tsc --noEmit` exits 0.

  ```typescript
  export type CityLocation = 'new-delhi' | 'new-york' | 'london'
  export type CourseCategory = 'amuse_bouche' | 'starter' | 'main' | 'dessert' | 'beverage'

  export interface TastingCourse {
    id: string; name: string; description: string
    category: CourseCategory; chefNote?: string
    image: string; isSignature?: boolean
  }

  export interface CityBlock {
    id: string; city: string; location: CityLocation
    tagline: string; heroImage: string; href: string
  }

  export interface Accolade {
    id: string; name: string; svgSrc: string
    year: string; ariaLabel: string
  }

  export interface PolicyItem {
    id: string; label: string; detail: string
  }
  ```

  Files: `src/types/index.ts`

---

- [ ] **TASK-006** | Est: 45m
  **Static data files**
  Mock data for all sections.

  Acceptance: `menu.ts` exports 10 `TastingCourse` objects across all 5 categories, at least 3 with `isSignature: true`. `cities.ts` exports exactly 3 `CityBlock` objects (new-delhi, new-york, london). `accolades.ts` exports 5 `Accolade` objects — each with a distinct `ariaLabel`. `policy.ts` exports 4 `PolicyItem` objects (dress code, cancellation, dietary, contact). All `tsc --noEmit` clean.
  Files: `src/lib/menu.ts`, `src/lib/cities.ts`, `src/lib/accolades.ts`, `src/lib/policy.ts`

---

## Phase 1 — Navigation and Global Switcher

---

- [ ] **TASK-007** | Est: 1.5h
  **SiteNav**
  Minimalist dark navigation — no background fill on scroll, always transparent over hero.

  Acceptance: Charcoal bg only when not over hero. Logo center: Playfair Display 600 wordmark. Links: Menus, Reservations, Story, Locations. `2px solid var(--color-brass)` "Reserve a Table" CTA — NOT filled button. `0px` border-radius on all elements. Focus ring `2px solid var(--color-brass)` on all nav links. Server Component.
  Files: `src/components/layout/SiteNav.tsx`

---

- [ ] **TASK-008** | Est: 1.5h
  **GlobalSwitcher**
  3-column CSS Grid city routing — the homepage centrepiece.

  Acceptance: CSS Grid `grid-template-columns: 1fr 1fr 1fr` — NOT flex layout. Each column: full-bleed city hero image, dark overlay, Playfair 600 city name, Montserrat 400 `12px` uppercase tagline, brass `2px border` CTA link. Hover: overlay darkens from `0.5` to `0.7` opacity. 1-col stacked on mobile (`grid-template-columns: 1fr`). `prefers-reduced-motion`: skip overlay transition. `0px` border-radius. Server Component.
  Files: `src/components/home/GlobalSwitcher.tsx`

---

- [ ] **TASK-009** | Est: 1h
  **AccoladeStrip**
  SVG-only awards and recognition — no raster images permitted.

  Acceptance: Horizontal row of 5 accolade SVG logos. Each `<img>` or inline `<svg>` MUST have `aria-label` matching the `Accolade.ariaLabel` field. Grayscale by default: `filter: grayscale(100%) brightness(1.5)`. Hover: `filter: none` + brass `1px` bottom border. No `<img>` with `.png` or `.jpg` src — SVG only. Scrollable on mobile with `scrollbar-width: none`. Server Component.
  Files: `src/components/home/AccoladeStrip.tsx`

---

## Phase 2 — Tasting Menu and Policy

---

- [ ] **TASK-010** | Est: 1.5h
  **TastingMenuGrid**
  Signature dishes and tasting course preview.

  Acceptance: CSS Grid `grid-template-columns: repeat(2, 1fr)` on desktop, `1fr` mobile. Each card: high-contrast food image (Next.js `<Image>`), Playfair 600 course name, Montserrat 400 `14px` description, "Chef's Note" tooltip trigger if `chefNote` present, brass dot badge if `isSignature: true`. Card bg: `var(--color-smoke)`. `0px` border-radius. NO price display — tasting menu is prix fixe enquiry only. Server Component.
  Files: `src/components/home/TastingMenuGrid.tsx`

---

- [ ] **TASK-011** | Est: 1h
  **ChefNoteTooltip**
  Ingredient story tooltip — client component.

  Acceptance: `'use client'` directive at top. Triggered by Montserrat `11px` uppercase "Chef's Note →" link. Tooltip: dark `var(--color-smoke)` bg, Montserrat `13px` italic text, brass `1px` border. `useReducedMotion()` guard — skip fade animation if reduced motion preferred. Closes on Escape key and outside click. `role="tooltip"` with `aria-describedby` linkage. `0px` border-radius on tooltip box.
  Files: `src/components/ui/ChefNoteTooltip.tsx`

---

- [ ] **TASK-012** | Est: 1h
  **PolicyBox**
  Reservation policies — always visible, never in accordion.

  Acceptance: Renders as a static `<section>` with 4 policy rows. Each row: Playfair 600 `16px` label left, Montserrat 400 `14px` detail right. Brass `1px solid` top border per row. NO `<details>`, NO `<summary>`, NO accordion toggle — policy must always be readable. BG: `var(--color-smoke)`. `0px` border-radius.
  Files: `src/components/home/PolicyBox.tsx`

---

- [ ] **TASK-013** | Est: 1h
  **ReservationSection**
  Booking enquiry — embedded widget above PolicyBox.

  Acceptance: `'use client'` directive. Contains iframe placeholder for OpenTable or Resy widget. `PolicyBox` renders immediately BELOW the iframe — never hidden, never inside the drawer. Section bg `var(--color-charcoal)`. Padding `64px 0`. No `/reservations` page route — reservation is always inline. Focus ring `2px solid var(--color-brass)` on all form inputs.
  Files: `src/components/home/ReservationSection.tsx`

---

## Phase 3 — City Pages and Footer

---

- [ ] **TASK-014** | Est: 1.5h
  **City sub-page — `/[city]`**
  Individual location pages — New Delhi, New York, London.

  Acceptance: `app/[city]/page.tsx`. `generateStaticParams()` returns `['new-delhi', 'new-york', 'london']`. `notFound()` for unknown slugs. Each page: full-bleed `LocationHero` with city-specific interior image, city name Playfair 600, Montserrat `12px` address block. Reuses `TastingMenuGrid` with filtered city menu. `0px` border-radius throughout. Server Component.
  Files: `src/app/[city]/page.tsx`, `src/components/location/LocationHero.tsx`

---

- [ ] **TASK-015** | Est: 30m
  **SiteFooter**
  3-column prestige footer.

  Acceptance: 3 cols: left = Playfair 600 wordmark + Montserrat `12px` tagline; center = nav links; right = location addresses. Charcoal bg `var(--color-charcoal)`. Brass `1px` top border. Montserrat 400 `13px` all links. `0px` border-radius. Server Component.
  Files: `src/components/layout/SiteFooter.tsx`

---

## Phase 4 — QA

---

- [ ] **TASK-016** | Est: 1h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== No white backgrounds ===" && \
    grep -r "background.*#fff\|bg-white\|background.*white\|bg-gray\|bg-zinc" src/components --include="*.tsx" \
    && echo "FAIL — use charcoal #121212 or smoke #2A2A2A" || echo "PASS"

  echo "=== GlobalSwitcher uses CSS Grid not flex ===" && \
    grep -r "grid-template-columns" src/components/home/GlobalSwitcher.tsx && echo "PASS" || echo "FAIL"

  echo "=== No flex on GlobalSwitcher ===" && \
    grep -r "flex\b" src/components/home/GlobalSwitcher.tsx \
    && echo "REVIEW — GlobalSwitcher must be CSS Grid 3-col" || echo "PASS"

  echo "=== AccoladeStrip has aria-label ===" && \
    grep -r "aria-label" src/components/home/AccoladeStrip.tsx && echo "PASS" || echo "FAIL"

  echo "=== No raster images in AccoladeStrip ===" && \
    grep -r "\.png\|\.jpg\|\.jpeg\|\.webp" src/components/home/AccoladeStrip.tsx \
    && echo "FAIL — SVG only in AccoladeStrip" || echo "PASS"

  echo "=== PolicyBox has no accordion ===" && \
    grep -r "<details\|<summary\|accordion" src/components/home/PolicyBox.tsx \
    && echo "FAIL — PolicyBox must always be visible, no accordion" || echo "PASS"

  echo "=== ChefNoteTooltip is use client ===" && \
    grep -r "'use client'" src/components/ui/ChefNoteTooltip.tsx && echo "PASS" || echo "FAIL"

  echo "=== No reservations page route ===" && \
    ls src/app/reservations 2>/dev/null \
    && echo "FAIL — no reservations page, booking is inline only" || echo "PASS"

  echo "=== No border-radius above 0px ===" && \
    grep -r "rounded-sm\|rounded-md\|rounded-lg\|rounded-xl\|rounded-full\|border-radius: [1-9]" \
    src/components --include="*.tsx" \
    && echo "FAIL — 0px radius only" || echo "PASS"

  echo "=== No hex in component files ===" && \
    grep -r "#[0-9A-Fa-f]\{3,6\}" src/components --include="*.tsx" \
    && echo "FAIL — use CSS variables" || echo "PASS"

  echo "=== Focus ring uses brass ===" && \
    grep -r "outline.*brass\|focus.*brass\|var(--color-brass)" src/app/globals.css && echo "PASS" || echo "FAIL"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
