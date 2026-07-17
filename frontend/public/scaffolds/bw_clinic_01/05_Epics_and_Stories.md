# 05 — Epics and Stories
## Indian Hospital Network · bw_clinic_01
### Apollo-style · Teal + Gold · Nunito Sans

---

## Epic 1 — Design System Foundation

**Goal:** Establish the 8-token colour system, Nunito Sans font, 8px radius, and emergency-red class. Everything downstream depends on these being correct.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 1.1 | 8 CSS tokens | `globals.css` has exactly 8 `--color-*` tokens. `grep -r "rgba\|#[0-9A-Fa-f]" src --include="*.module.css"` returns empty. No hex values in component CSS files. |
| 1.2 | Nunito Sans loaded | Font loaded via `next/font/google` with weights `['400','600','700','800']`. `--font-sans` applied on `<html>`. DevTools computed font-family shows Nunito Sans on all body text. |
| 1.3 | Button — 8px radius | `primary` (teal bg, white text) and `secondary` (teal outline) variants render. DevTools: `border-radius: 8px` on both. Not 4px. Not 6px. Not 9999px. |
| 1.4 | Emergency link class | `.emergency-link` class in `globals.css` sets `color: #DC2626`. No `--color-*` token for red — this is a safety-hardcoded one-off. `grep -r "color: #DC2626" src` → exactly one result in `globals.css`. |
| 1.5 | TypeScript types | `src/types/index.ts` defines `Doctor`, `Specialty`, `HealthPackage`, `Testimonial`, `Stat` interfaces. `tsc --noEmit` exits 0. No `any` types. |

---

## Epic 2 — Navigation

**Goal:** Always-white sticky nav with the emergency number always visible in red. No scroll state, no JavaScript in nav.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 2.1 | White nav always | Background `#FFFFFF` at all scroll positions. No `useEffect`, no `useState`, no scroll listener. Server component confirmed: no `'use client'` in `StickyNav.tsx`. |
| 2.2 | Emergency link | "Emergency: 1066" visible in nav at all scroll positions. Computed `color: rgb(220,38,38)` (`#DC2626`). Uses `.emergency-link` class — not inline style. |
| 2.3 | Book Appointment CTA | Teal `var(--color-teal)` button, `border-radius: 8px`, height 42px, positioned right side of nav. Renders as `<Link>`, not `<button>`. |
| 2.4 | Nav server component | `StickyNav.tsx` has no `'use client'` directive. `grep "'use client'" src/components/layout/StickyNav.tsx` returns empty. |

---

## Epic 3 — Hero + Booking Widget

**Goal:** Trust-establishing hero with the BookingWidget embedded as the primary conversion action. Widget state is client-side; hero headline is server-rendered.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 3.1 | H1 typography | Nunito Sans weight 800, `clamp(2.25rem, 4vw, 3.5rem)`, `color: var(--color-text)`. No serif. DevTools font-weight = 800. |
| 3.2 | BookingWidget renders | White card, `border-radius: 12px`, `box-shadow` present. City `<select>` + specialty `<select>` + "Find Doctors" `<button>` — all inside a `<form>` element. |
| 3.3 | City options complete | Exactly 7 cities: Chennai, Hyderabad, Bangalore, Delhi, Mumbai, Pune, Kolkata. No extra or missing options. |
| 3.4 | Specialty options complete | Exactly 12 specialties matching the `Specialty` union type in `src/types/index.ts`. `<option>` values match type literal values exactly. |
| 3.5 | Widget submit scrolls | "Find Doctors" click calls `document.getElementById('doctor-directory')?.scrollIntoView({ behavior: 'smooth' })`. Section anchor `id="doctor-directory"` exists in DOM. |
| 3.6 | Stats row | Four items visible: "5,000+ Doctors", "72 Specialties", "40+ Hospitals", "30M+ Patients" — all 4 with pipe `|` dividers. Sourced from a `STATS` const, not hardcoded JSX strings. |
| 3.7 | BookingWidget is client | `BookingWidget.tsx` has `'use client'` directive. City and specialty `useState` updates on `<select onChange>`. |
| 3.8 | TypeScript: BookingWidget | `BookingState = { city: string; specialty: string }` typed in component. `Specialty` union type imported from `types/index.ts`. |

---

## Epic 4 — Specialty Grid

**Goal:** 12 specialty cards as a server-rendered grid. No interactivity — pure display.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 4.1 | 12 specialties render | All 12 specialty cards from `SPECIALTY_CARDS` const visible. Card count in DOM = 12. |
| 4.2 | Surface background | Section `background: var(--color-surface)` (`#F0F7FA`) — not white, not navy. |
| 4.3 | Icons in teal | Each card has a Lucide icon with `color: var(--color-teal)`. Not emoji. `grep -r "emoji\|🫀\|🧠" src/components/sections/SpecialtyGrid` → empty. |
| 4.4 | Doctor count visible | Each card shows `"{doctorCount} Doctors"` in `color: var(--color-muted)`. TypeScript: `SpecialtyCard = { name: string; icon: LucideIcon; doctorCount: number; slug: string }`. |
| 4.5 | Hover feedback | Cards: `border: 1px solid var(--color-border)` at rest; `border-color: var(--color-teal)` + enhanced `box-shadow` on `:hover`. CSS-only, no JS. |
| 4.6 | Server component | No `'use client'` in `SpecialtyGrid.tsx`. `grep "'use client'" src/components/sections/SpecialtyGrid.tsx` → empty. |

---

## Epic 5 — Doctor Directory

**Goal:** Client-side filtered directory with useMemo, ARIA live region, and specific DoctorCard display rules.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 5.1 | 3 filter controls | City `<select>`, specialty `<select>`, name `<input type="text">` — all 3 present, all 3 functional independently and simultaneously. |
| 5.2 | useMemo filtering | `const filtered = useMemo(() => doctors.filter(...), [city, specialty, query])`. Selecting city "chennai" + specialty "oncology" with no match → empty state shown. |
| 5.3 | ARIA live region | `<p className="sr-only" aria-live="polite">` announces `"{n} doctor{s} found"` after every filter change. |
| 5.4 | Empty state | "No doctors found matching your filters." message when `filtered.length === 0`. Not a blank grid. |
| 5.5 | Component boundary | `DoctorDirectory.tsx` has `'use client'`. `DoctorCard.tsx` does NOT have `'use client'`. |
| 5.6 | Circular doctor photos | `border-radius: 50%` in DevTools on all doctor `<img>`. `object-fit: cover`. Exactly 96×96px. |
| 5.7 | Doctor name + credentials | Name: Nunito 700, `var(--color-text)`. Specialty: `var(--color-teal)`. Qualifications: `var(--color-muted)`. All 3 visible on every card. |
| 5.8 | Experience shown | `"{experienceYears}+ Years Experience"` visible on every card. TypeScript: `Doctor.experienceYears: number`. |
| 5.9 | Star rating | Lucide `Star` icon (filled, gold `var(--color-gold)`) + `{rating}` value + `"({reviewCount} reviews)"`. NOT emoji stars. |
| 5.10 | Consultation fee | `"₹{consultFee} Consult Fee"` in `var(--color-teal)`, Nunito 700 on every card. |
| 5.11 | Dual CTAs — conditional | "Book Appointment" (primary teal) always present. "Video Consult" (secondary) rendered only when `doctor.videoConsult === true`. Conditional JSX — not `display:none`. |
| 5.12 | No video CTA on `false` | Dr. Arjun Mehta (`videoConsult: false`) and Dr. Rajan Sharma (`videoConsult: false`) show zero "Video Consult" buttons. DOM count of `.video-cta` for these cards = 0. |
| 5.13 | TypeScript: Doctor | `Doctor = { name: string; specialty: Specialty; city: string; qualifications: string; experienceYears: number; rating: number; reviewCount: number; consultFee: number; videoConsult: boolean; photoUrl: string }` |

---

## Epic 6 — Why Us + Accreditations

**Goal:** Stats section with Lucide icons and both mandatory accreditation badges.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 6.1 | 4 stat blocks | "5,000+ Doctors", "72 Specialties", "40+ Hospitals", "30M+ Patients" all visible with labels. Sourced from `STATS` const. |
| 6.2 | Lucide icons in teal | Each stat block has a distinct Lucide icon with `color: var(--color-teal)`. No emoji. |
| 6.3 | NABH badge | National Accreditation Board for Hospitals badge visible: icon + "NABH Accredited" name. |
| 6.4 | JCI badge | Joint Commission International badge visible: icon + "JCI Certified" name. |
| 6.5 | Both badges required | DevTools Elements: both NABH and JCI badge elements in DOM. Neither is `display:none`. `grep -r "NABH\|JCI" src/components` → ≥2 results. |
| 6.6 | Surface background | Section `background: var(--color-surface)` — same as SpecialtyGrid, consistent alternation. |

---

## Epic 7 — Health Packages

**Goal:** 3 pricing cards with `<del>` strikethrough, feature checklists, and conditional Popular ribbon.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 7.1 | 3 packages render | Essential, Comprehensive, Full Body — all 3 visible. Sourced from `HEALTH_PACKAGES` const. |
| 7.2 | Strike-through pricing | `<del>` tag wraps original price — not `<span style="text-decoration: line-through">`. DevTools Elements confirms `<del>` tag. |
| 7.3 | Test count | `"{testsIncluded} Tests Included"` visible on each card. TypeScript: `HealthPackage.testsIncluded: number`. |
| 7.4 | Feature list | 4 features per package with Lucide `Check` icon in `var(--color-teal)`. Icons are SVG — not text "✓". |
| 7.5 | Popular ribbon | `package.popular === true` (Comprehensive) → "Most Popular" teal ribbon at `position: absolute; top: 0`. Others: ribbon absent from DOM. |
| 7.6 | Book Now button | `border-radius: 8px`. Primary teal. `fullWidth` prop (100% width). Renders as `<Link>`. |
| 7.7 | TypeScript: HealthPackage | `HealthPackage = { name: string; testsIncluded: number; originalPrice: number; discountedPrice: number; features: string[]; popular: boolean }` |

---

## Epic 8 — Testimonials

**Goal:** 3 patient testimonials. Cards, stars, no photos needed.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 8.1 | 3 testimonials | All 3 visible with: quote text, patient name, treatment type. Sourced from `TESTIMONIALS` const. |
| 8.2 | Star ratings | 5 gold stars on each card. Using Lucide `Star` or equivalent SVG — not emoji `⭐`. |
| 8.3 | Card styling | White `background`, `border-radius: 12px`, `box-shadow` present. No `border` on testimonial cards. |
| 8.4 | TypeScript: Testimonial | `Testimonial = { quote: string; patientName: string; treatmentType: string; rating: number }` |

---

## Epic 9 — Footer

**Goal:** Teal-dark footer with 4 columns, gold link hover, and accreditation badges at bottom.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 9.1 | Teal-dark background | `var(--color-teal-dark)` (`#1B6A85`). Not `--color-teal`. Not black. DevTools computed `background-color: rgb(27,106,133)`. |
| 9.2 | 4 columns | Brand+tagline \| Specialties \| Services \| Company. CSS Grid. Collapses on mobile. |
| 9.3 | Gold link hover | Footer links `color` changes to `var(--color-gold)` on `:hover`. NOT white. Transition `150ms ease`. |
| 9.4 | NABH + JCI in footer | Both badges in footer bottom bar. `opacity: 0.5`. `filter: brightness(0) invert(1)` for white rendering on dark bg. |
| 9.5 | Copyright | `color: var(--color-muted)` or equivalent white-muted. `new Date().getFullYear()` for year. |

---

## Epic 10 — QA and Performance

**Goal:** Build passes, Lighthouse targets met, all design-system rules verifiable by automated grep/DevTools checks.

| Story | Title | Acceptance Criteria |
|-------|-------|---------------------|
| 10.1 | TypeScript clean | `tsc --noEmit` exits 0. No `any` types. No `@ts-ignore` comments. |
| 10.2 | Build succeeds | `npm run build` exits 0. `/out` directory produced (static export). No deprecation warnings. |
| 10.3 | Lighthouse ≥90/90 | Performance ≥90 and Accessibility ≥90 on production build. |
| 10.4 | No hex in modules | `grep -r "rgba\|#[0-9A-Fa-f]" src --include="*.module.css"` returns empty. |
| 10.5 | Button radius audit | Every `<button>` and `<a>` styled as button: `border-radius: 8px` in DevTools. No 4px, no 6px, no 9999px. |
| 10.6 | Photo radius audit | All doctor photos: `border-radius: 50%` in DevTools. `grep -r "border-radius: [^5]" src/components/DoctorCard` → only non-photo elements. |
| 10.7 | Gold contrast audit | `grep -r "color-gold\|#FDB931\|#C9941A" src` → only decorative (non-text) uses. No gold text on white bg. |
| 10.8 | Emergency link always red | "Emergency: 1066" visible and `color: #DC2626` at all scroll positions. Confirmed via computed styles at `scrollY=0` and `scrollY=500`. |
| 10.9 | No dark sections | Every section except Footer: `background-color` resolves to `#FFFFFF` or `#F0F7FA`. No navy, no charcoal. |
| 10.10 | No serif font | All elements: computed font-family shows Nunito Sans. `grep -r "font-family.*serif\|Georgia\|Playfair" src` → empty. |
| 10.11 | Reduced motion | `prefers-reduced-motion: reduce` → all CSS transitions instant, all Framer Motion animations disabled. |
