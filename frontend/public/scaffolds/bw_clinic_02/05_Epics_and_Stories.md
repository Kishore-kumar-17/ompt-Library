# 05 — Epics and Stories
## Doctor Discovery + Booking Platform · bw_clinic_02
### Practo-style · Cyan + Navy · 4px Flat · Lato

---

## Epic 1 — Design System Foundation

**Goal:** 8-token colour system, Lato 400/700 only, flat 4px radius everywhere, and the critical cyan-on-white contrast trap enforced via navy text rule.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 1.1 | 8 CSS tokens | Exactly 8 `--color-*` tokens in `globals.css`. `grep -r "rgba\|#[0-9A-Fa-f]" src --include="*.module.css"` returns empty. |
| 1.2 | Lato 400 + 700 only | `next/font/google` with `weight: ['400', '700']` only. No 600, no 800. Computed font-family shows Lato in DevTools on all elements. |
| 1.3 | Button — 4px, 3 variants | `primary` (cyan bg, navy text), `secondary` (navy bg, white text), `outlineNavy` (navy border, navy text). DevTools: `border-radius: 4px` on all three. |
| 1.4 | Cyan button text is navy | DevTools computed `color` on `.primary` = `rgb(40,50,140)` (navy). NOT `rgb(255,255,255)`. Cyan on white = 1.8:1 fails AA — navy on cyan = 7.2:1 passes. |
| 1.5 | TypeScript types | `Doctor`, `DiscoveryTile`, `SymptomCard`, `Specialty`, `Testimonial` defined in `src/types/index.ts`. `tsc --noEmit` exits 0. |
| 1.6 | ConsultMode is enum, not boolean | `type ConsultMode = 'clinic' \| 'video' \| 'both'` — a union type. NOT `isVideoAvailable: boolean`. `grep -r "isVideo\|videoAvailable" src/types` → empty. |

---

## Epic 2 — Navigation

**Goal:** Always-white server-component nav. No emergency link, no red elements — this is a booking tool, not a hospital.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 2.1 | White nav always | `background-color: rgb(255,255,255)` at all scroll positions. No state, no scroll listener. Server component: no `'use client'` in `StickyNav.tsx`. |
| 2.2 | Login button — navy outline | "Login" button: navy `border: 1px solid var(--color-navy)`, navy text, transparent background, `border-radius: 4px`. NOT cyan border (cyan on white = 1.8:1 fail). |
| 2.3 | Nav links | "Find Doctors", "Video Consult", "Surgeries" present. `color: var(--color-navy)`. Hover: `color: var(--color-cyan)`. |
| 2.4 | No emergency link | No "Emergency" text, no red-coloured element in nav. `grep -r "Emergency\|#DC2626\|color-red" src/components/layout` → empty. |

---

## Epic 3 — Hero + OmniSearch

**Goal:** Two-field text search (NOT selects), with the only box-shadow on the entire page.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 3.1 | H1 typography | Lato 700, `color: var(--color-navy)`, `clamp(2rem, 4vw, 3rem)`. No serif. DevTools font-weight = 700. |
| 3.2 | OmniSearch: two text inputs | Exactly two `<input type="text">` fields in the form. NOT `<select>` elements. DevTools Elements confirms `input[type="text"]` ×2. |
| 3.3 | OmniSearch labels | `<label htmlFor="doctor-input">` and `<label htmlFor="location-input">` present (sr-only acceptable). `htmlFor` matches input `id`. |
| 3.4 | Submit button — cyan bg, navy text | "Search" button: `background: var(--color-cyan)`, computed `color: rgb(40,50,140)` (navy). `border-radius: 4px`. NOT white text. |
| 3.5 | OmniSearch is only shadow | Widget card has `box-shadow`. `grep -r "box-shadow" src/components --include="*.module.css"` → exactly 1 result in `OmniSearch.module.css`. |
| 3.6 | Submit scrolls to directory | "Search" click: `document.getElementById('doctor-grid')?.scrollIntoView({ behavior: 'smooth' })`. `id="doctor-grid"` in DOM. |
| 3.7 | Stats row | "20M+ Patients \| 100K+ Doctors \| 200K+ Clinics" — all 3 with dividers. Sourced from `STATS` const. |

---

## Epic 4 — Discovery Cards

**Goal:** 4 contextual tiles guiding different buyer intents. Flat, no shadow, surface background.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 4.1 | 4 tiles render | All 4 discovery tiles visible with title + description. Sourced from `DISCOVERY_TILES` const. |
| 4.2 | Distinct pastel backgrounds | Each tile has a distinct background via CSS class (e.g., `.tile-blue`, `.tile-green`) — NOT inline hex. `grep -r "#[0-9A-Fa-f]" src/components/sections/DiscoveryCards.tsx` → empty. |
| 4.3 | Surface section bg | Section background: `var(--color-surface)` (`#F0F0F5`). NOT white. |
| 4.4 | Flat, no shadow | Discovery cards: `box-shadow: none`. `border-radius: 4px`. `border: 1px solid var(--color-border)`. |
| 4.5 | TypeScript: DiscoveryTile | `DiscoveryTile = { title: string; description: string; icon: LucideIcon; bgClass: string; ctaHref: string }` |

---

## Epic 5 — Symptom Cards

**Goal:** 8 condition chips. Flat cards, navy "CONSULT NOW" text (cyan text on white fails AA).

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 5.1 | 8 symptom cards | All 8 conditions visible with emoji + label. Sourced from `SYMPTOM_CARDS` const. |
| 5.2 | "CONSULT NOW" — navy text | Computed `color` of "CONSULT NOW" text = `var(--color-navy)`. NOT cyan (cyan on white = 1.8:1 fail). |
| 5.3 | Flat card | White background, `border: 1px solid var(--color-border)`, `border-radius: 4px`, no `box-shadow`. |
| 5.4 | Hover border cyan | Card `:hover` changes `border-color` to `var(--color-cyan)`. CSS only — no JS event handler. |
| 5.5 | TypeScript: SymptomCard | `SymptomCard = { condition: string; emoji: string; ctaHref: string }` |

---

## Epic 6 — Specialty Carousel

**Goal:** Horizontally scrollable chip row, no native scrollbar, arrow-button navigation.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 6.1 | 10 specialty chips | All 10 specialties from `SPECIALTIES` data array visible in carousel. |
| 6.2 | Horizontal scroll + arrows | Track scrolls horizontally. Left/right `<button>` arrows advance by 240px via `track.scrollLeft += 240`. |
| 6.3 | No scrollbar visible | `.track { scrollbar-width: none; }` AND `::-webkit-scrollbar { display: none; }` both applied. |
| 6.4 | Chip radius = 4px | Specialty chips: `border-radius: 4px`. NOT 20px (20px is only for status `availableToday` badge). `grep -r "border-radius: 20px" src/components/sections/SpecialtyCarousel` → empty. |
| 6.5 | Lucide icons in chips | Each chip shows a Lucide icon. Not emoji. `grep -r "emoji" src/components/sections/SpecialtyCarousel` → empty. |

---

## Epic 7 — Doctor Grid + Cards

**Goal:** Client-side filtered grid with two filter types, ARIA live region, and exact consultMode CTA rules.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 7.1 | Filter bar: city + specialty | City `<input type="text">` AND specialty `<select>` both present and functional. Labels with `htmlFor` on each. |
| 7.2 | useMemo filter | `useMemo(() => doctors.filter(...), [cityQuery, specialtyFilter])`. Both criteria applied simultaneously without re-mount. |
| 7.3 | ARIA live region | `<p className="sr-only" aria-live="polite">` announces `"{n} doctor{s} found"` after every filter change. |
| 7.4 | Empty state | `filtered.length === 0` → "No doctors found" message rendered. Not a blank grid. |
| 7.5 | Doctor photos — 4px rect | `border-radius: 4px` on all doctor photos. `object-fit: cover`. `grep -r "border-radius: 50%" src/components/DoctorCard` → empty. |
| 7.6 | Verified badge | `doctor.verified === true` → navy Lucide `ShieldCheck` icon adjacent to name. `doctor.verified === false` → icon absent from DOM. |
| 7.7 | Available Today — conditional | `doctor.availableToday === true` → green pill badge rendered. `false` → badge absent from DOM (not `display:none`). |
| 7.8 | AvailabilityBadge radius | Badge `border-radius: 20px`. This is the ONLY 20px element in DoctorCard. All other elements: 4px. |
| 7.9 | consultMode CTAs | `'clinic'`: exactly 1 button "Book Clinic Visit". `'video'`: exactly 1 button "Consult Online". `'both'`: exactly 2 buttons. |
| 7.10 | Specific doctor checks | Dr. Rahul Mehta (`consultMode: 'clinic'`, `availableToday: false`): 1 CTA, no badge. Dr. Kavita Sharma (`'both'`, `true`): 2 CTAs, green badge. Dr. Sneha Patel (`'video'`, `true`): 1 "Consult Online" button, green badge. |
| 7.11 | DoctorCard server component | No `'use client'` in `DoctorCard.tsx`. `DoctorDirectory.tsx` has `'use client'`. |
| 7.12 | No shadow on doctor cards | `DoctorCard.module.css`: `border: 1px solid var(--color-border)` only. No `box-shadow` on card. |
| 7.13 | TypeScript: Doctor | `Doctor = { name: string; specialty: string; city: string; verified: boolean; availableToday: boolean; consultMode: ConsultMode; rating: number; reviewCount: number; photoUrl: string }` |

---

## Epic 8 — Testimonials

**Goal:** 3 text-only testimonials (no patient photos — Practo pattern). Flat cards, surface background.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 8.1 | 3 testimonials | Quote + patientName + context visible on all 3 cards. Sourced from `TESTIMONIALS` const. |
| 8.2 | No patient photos | No `<img>` tags in testimonial cards. Text-only. `grep -r "<img" src/components/sections/Testimonials.tsx` → empty. |
| 8.3 | Surface section bg | Section background: `var(--color-surface)` (`#F0F0F5`). |
| 8.4 | Flat cards | White card, `border-radius: 4px`, `border: 1px solid var(--color-border)`, no `box-shadow`. |

---

## Epic 9 — Footer

**Goal:** Navy footer, cyan link hover (passes contrast on navy), cyan logo.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 9.1 | Navy background | Footer `background: var(--color-navy)` (`#28328C`). Not teal-dark from `bw_clinic_01`. |
| 9.2 | 4 columns | Grid with Brand+tagline \| Find Care \| Services \| Company. Collapses on mobile (≤768px → 2 cols; ≤480px → 1 col). |
| 9.3 | Cyan link hover | Links hover to `var(--color-cyan)`. Cyan on navy = 6.4:1 — passes AA. Transition `150ms ease`. |
| 9.4 | Logo in cyan | Logo text: computed `color = var(--color-cyan)`. Accessible on navy background. |

---

## Epic 10 — QA and Performance

**Goal:** All platform-specific traps caught by automated grep or DevTools checks.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 10.1 | TypeScript clean | `tsc --noEmit` exits 0. No `any` types. |
| 10.2 | Build succeeds | `npm run build` exits 0. `/out` directory produced. |
| 10.3 | Lighthouse ≥90/90 | Performance and Accessibility both ≥90. |
| 10.4 | No hex in modules | `grep -r "rgba\|#[0-9A-Fa-f]" src --include="*.module.css"` → empty. |
| 10.5 | No 50% on photos | `grep -r "border-radius: 50%" src/components` → empty (no circular photos on this platform). |
| 10.6 | No 9999px anywhere | `grep -r "9999px" src` → empty. |
| 10.7 | OmniSearch only shadow | `grep -r "box-shadow" src/components --include="*.module.css"` → exactly 1 result in `OmniSearch.module.css`. |
| 10.8 | Cyan text audit | `grep -r "color: var(--color-cyan)" src/components` → zero results on elements with white backgrounds. Cyan allowed as border/bg only. |
| 10.9 | No NABH/JCI | `grep -r "NABH\|JCI\|accreditation" src` → empty (hospital accreditations not on this booking platform). |
| 10.10 | No emergency link | `grep -r "Emergency\|#DC2626" src` → empty. |
| 10.11 | Reduced motion | `prefers-reduced-motion: reduce` disables all Framer Motion transitions. |
