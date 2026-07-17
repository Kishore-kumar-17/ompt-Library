# 06 — Tasks
## Indian Wedding Films & Photography Production House · pcpp_platform_08

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
  Production modern — white base, light grey surface, goldenrod accent.

  ```css
  --color-bg:       #FFFFFF;
  --color-surface:  #F3F4F6;
  --color-border:   #E5E7EB;
  --color-ink:      #111827;
  --color-muted:    #4B5563;
  --color-gold:     #DAA520;
  --color-theater:  #000000;

  body { background: var(--color-bg); color: var(--color-ink); }

  :focus-visible {
    outline: 2px solid var(--color-gold);
    outline-offset: 2px;
  }

  .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0,0,0,0); }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after { transition-duration: 0.01ms !important; animation-duration: 0.01ms !important; }
  }
  ```

  Acceptance: All variables in DevTools. `grep -r "bg-white\|background.*#fff" src/components --include="*.tsx"` → empty.
  Files: `src/app/globals.css`

---

- [ ] **TASK-003** | Est: 45m
  **TypeScript types**
  All domain types exported. `tsc --noEmit` exits 0.

  ```typescript
  export type ServiceType = 'photography' | 'films' | 'pre_wedding' | 'lifestyle'
  export type FilterTag = 'destination' | 'celebrity' | 'candid' | 'traditional'

  export interface CrewMember {
    id: string; name: string; role: string
    imageSrc: string; imageAlt: string
  }

  export interface Project {
    id: string; slug: string; title: string
    service: ServiceType; tags: FilterTag[]
    coverSrc: string; coverAlt: string
    videoUrl?: string; year: number
  }

  export interface Testimonial {
    id: string; clientName: string; quote: string
    imageSrc: string; imageAlt: string; rating: number
  }
  ```

  Files: `src/types/index.ts`

---

- [ ] **TASK-004** | Est: 30m
  **Static data files**
  Mock data for all sections.

  Acceptance: `projects.ts` exports 10 `Project` objects across all 4 `ServiceType` values — at least 3 with `videoUrl`, at least 2 tagged `celebrity`. `crew.ts` exports 6 `CrewMember` objects. `testimonials.ts` exports 6 `Testimonial` objects. `tsc --noEmit` clean.
  Files: `src/lib/projects.ts`, `src/lib/crew.ts`, `src/lib/testimonials.ts`

---

## Phase 1 — Navigation

---

- [ ] **TASK-005** | Est: 1h
  **StudioNav**
  High-density production nav with service categories.

  Acceptance: Top-bar `position: sticky; top: 0`. `background: var(--color-bg)`. `1px solid var(--color-border)` bottom. Logo left: Montserrat 800 `18px`. Service links: Cinematography, Photography, Pre-Wedding — `13px` uppercase tracking `0.1em`. "Book Us →" CTA right: `background: var(--color-gold); color: var(--color-ink)` `8px` radius `44px` height. Mobile: hamburger `aria-expanded`. `aria-label="Main navigation"`. Server Component.
  Files: `src/components/layout/StudioNav.tsx`

---

## Phase 2 — Hero and Gallery

---

- [ ] **TASK-006** | Est: 1.5h
  **ProductionHero — cinematic video loop**
  Full-bleed muted video with poster fallback.

  Acceptance: `VideoHero.tsx` (server): `<video autoPlay muted loop playsInline poster={posterSrc}>`. Poster loads immediately — zero layout shift. `height: 100svh`. Dark overlay `rgba(0,0,0,0.4)`. Over overlay: Inter 800 `clamp(32px,5vw,60px)` tracking `-0.01em` white heading. Stat row below heading: "500+ Weddings · 50+ Cities · 15 Years" Inter 700 `16px` white. `prefers-reduced-motion`: poster `<img>` only, no `<video>`. `aria-label="Wedding cinematography highlights"` on video. Server Component.
  Files: `src/components/home/VideoHero.tsx`

---

- [ ] **TASK-007** | Est: 2h
  **MosaicGrid — categorized production gallery**
  High-density mosaic with service type filter.

  Acceptance: `app/page.tsx`. `ServiceFilterBar.tsx` is `'use client'`: filter by service type — All, Cinematography, Photography, Pre-Wedding. `aria-pressed` on active. Framer `AnimatePresence` on filtered cards — `opacity 0→1` `200ms`. `prefers-reduced-motion`: instant filter, no animation. `MosaicGrid.tsx` (server): CSS Grid `repeat(3,1fr)` desktop → `repeat(2,1fr)` mobile. Gap `12px`. `ProductionCard.tsx` (server): `aspect-ratio: 4/3`, cover `<img alt={production.coverImageAlt}>`. `background: var(--color-surface)` on card. Service badge: `8px` radius `12px` uppercase `color: var(--color-gold)`. "Film Available" chip if `hasFilm`. `8px` radius everywhere. Server Component wrapper.
  Files: `src/app/page.tsx`, `src/components/gallery/ServiceFilterBar.tsx`, `src/components/gallery/MosaicGrid.tsx`, `src/components/gallery/ProductionCard.tsx`

---

## Phase 3 — Team and Testimonials

---

- [ ] **TASK-008** | Est: 1h
  **CrewGrid — meet the team**
  Team section with portrait and role labels.

  Acceptance: CSS Grid `repeat(4,1fr)` desktop → `repeat(2,1fr)` mobile. Each `CrewCard.tsx` (server): portrait `<img alt={member.imageAlt}>` `aspect-ratio: 3/4`. Name Inter 700 `16px`. Role `12px` uppercase muted. If `citiesCount`: `"{citiesCount} Cities"` `11px` `color: var(--color-gold)`. `background: var(--color-surface)` card. `8px` radius. Server Component.
  Files: `src/components/home/CrewGrid.tsx`, `src/components/home/CrewCard.tsx`

---

- [ ] **TASK-009** | Est: 1h
  **TestimonialSlider**
  Auto-advancing client testimonials with ratings.

  Acceptance: `TestimonialSlider.tsx` is `'use client'`. Auto-advances every `5000ms`. Previous/Next buttons: `aria-label="Previous testimonial"` / `"Next testimonial"`. Active dot indicator: `aria-label="Go to testimonial N"` `aria-current="true"` on active. Each slide: client `<img alt={testimonial.imageAlt}>`, rating displayed as `"{rating}/5"` text — NOT as SVG stars (avoid rendering complexity). Quote Inter 400 `18px` italic. Platform label `11px` uppercase muted. `useReducedMotion()` guard: stop auto-advance, show first testimonial. Source platform (e.g., WedMeGood) displayed as text only — NOT as logo image.
  Files: `src/components/home/TestimonialSlider.tsx`

---

## Phase 4 — QA

---

- [ ] **TASK-010** | Est: 1h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== VideoHero has muted and playsInline ===" && \
    grep -r "muted\|playsInline" src/components/home/VideoHero.tsx && echo "PASS" || echo "FAIL"

  echo "=== VideoHero has poster ===" && \
    grep -r "poster=" src/components/home/VideoHero.tsx && echo "PASS" || echo "FAIL"

  echo "=== VideoHero handles reduced motion ===" && \
    grep -r "prefers-reduced-motion\|useReducedMotion\|reducedMotion" src/components/home/VideoHero.tsx \
    && echo "PASS" || echo "FAIL"

  echo "=== ServiceFilterBar is use client ===" && \
    grep -r "'use client'" src/components/gallery/ServiceFilterBar.tsx && echo "PASS" || echo "FAIL"

  echo "=== ServiceFilterBar has aria-pressed ===" && \
    grep -r "aria-pressed" src/components/gallery/ServiceFilterBar.tsx && echo "PASS" || echo "FAIL"

  echo "=== TestimonialSlider is use client ===" && \
    grep -r "'use client'" src/components/home/TestimonialSlider.tsx && echo "PASS" || echo "FAIL"

  echo "=== TestimonialSlider handles reduced motion ===" && \
    grep -r "useReducedMotion\|reducedMotion" src/components/home/TestimonialSlider.tsx \
    && echo "PASS" || echo "FAIL"

  echo "=== No hex in component files ===" && \
    grep -r "#[0-9A-Fa-f]\{3,6\}" src/components --include="*.tsx" \
    && echo "FAIL — use CSS variables" || echo "PASS"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
