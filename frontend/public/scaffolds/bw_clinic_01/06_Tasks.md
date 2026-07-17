# 06 — Tasks
## Indian Hospital Network · bw_clinic_01

---

## Task Index

| ID | Title | Day | Depends On |
|----|-------|-----|------------|
| TASK-001 | Scaffold Next.js project | 1 | — |
| TASK-002 | Install dependencies | 1 | TASK-001 |
| TASK-003 | TypeScript types | 1 | TASK-001 |
| TASK-004 | Mock data | 1 | TASK-003 |
| TASK-005 | Global CSS + emergency link class | 1 | TASK-001 |
| TASK-006 | Root layout + Nunito Sans font | 1 | TASK-005 |
| TASK-007 | Button component | 1 | TASK-005 |
| TASK-008 | StickyNav | 1 | TASK-007 |
| TASK-009 | BookingWidget | 2 | TASK-003, TASK-005 |
| TASK-010 | Hero section | 2 | TASK-007, TASK-009 |
| TASK-011 | SpecialtyGrid | 2 | TASK-004 |
| TASK-012 | DoctorCard | 3 | TASK-004, TASK-007 |
| TASK-013 | DoctorDirectory | 3 | TASK-012 |
| TASK-014 | WhyUs + accreditations | 3 | TASK-004 |
| TASK-015 | HealthPackages | 4 | TASK-004, TASK-007 |
| TASK-016 | Testimonials | 4 | TASK-004 |
| TASK-017 | Footer | 4 | TASK-007 |
| TASK-018 | Framer Motion entrances | 4 | All sections |
| TASK-019 | Static export config | 4 | TASK-001 |
| TASK-020 | QA pass + launch checklist | 4 | All tasks |

---

## TASK-001 — Scaffold

```bash
npx create-next-app@latest helioshealth \
  --typescript --no-tailwind --app --src-dir --import-alias "@/*"
cd helioshealth
```

**Acceptance:** `npm run dev` starts. `src/app/` exists.

---

## TASK-002 — Install dependencies

```bash
npm install framer-motion lucide-react
```

---

## TASK-003 — TypeScript types

**File:** `src/types/index.ts`

Copy all types from `02_Architecture.md`:
- `City`, `Specialty` union types
- `Doctor`, `SpecialtyCard`, `HealthPackage`, `Stat`, `Testimonial`, `AccreditationBadge` interfaces

**Acceptance:** `tsc --noEmit` exits 0.

---

## TASK-004 — Mock data

**File:** `src/lib/data.ts`

Copy all arrays from `02_Architecture.md`:
- `doctors` (8 items — 2 with `videoConsult: false`)
- `specialtyCards` (12 items)
- `healthPackages` (3 items, 1 `popular: true`)
- `stats` (4 items)
- `testimonials` (3 items)
- `accreditations` (2 items: NABH + JCI)

**Acceptance:** `tsc --noEmit` still exits 0.

---

## TASK-005 — Global CSS + emergency class

**File:** `src/app/globals.css`

8 CSS tokens + emergency link + sr-only utility + prefers-reduced-motion block.

Critical: `.emergency-link { color: #DC2626; }` — the only hardcoded hex in the entire project, justified as a one-off safety color.

**Acceptance:**
- Exactly 8 `--color-*` custom properties
- `.emergency-link` class exists
- `.sr-only` utility exists

---

## TASK-006 — Root layout + font

**File:** `src/app/layout.tsx`

```typescript
import { Nunito_Sans } from 'next/font/google'
import './globals.css'

const nunito = Nunito_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-sans',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={nunito.variable}>
      <body>{children}</body>
    </html>
  )
}
```

**Acceptance:** DevTools shows Nunito Sans as computed font-family on `body`.

---

## TASK-007 — Button component

**Files:** `src/components/ui/Button.tsx`, `Button.module.css`

Two variants: `primary` (teal bg, white text) and `secondary` (teal border, teal text).

**Critical:** `border-radius: 8px` hardcoded in CSS. No prop. No override.

```typescript
interface Props {
  variant: 'primary' | 'secondary'
  size?: 'md' | 'sm'
  children: React.ReactNode
  href?: string
  onClick?: () => void
  disabled?: boolean
  fullWidth?: boolean
}
```

**Acceptance:** Both variants render. DevTools: `border-radius: 8px`. `fullWidth` fills container. `href` renders `<Link>`.

---

## TASK-008 — StickyNav

**Files:** `src/components/layout/StickyNav.tsx`, `StickyNav.module.css`

No `'use client'`. Server component.

```tsx
<nav className={styles.nav}>
  <div className={styles.inner}>
    <Link href="/" className={styles.logo}>HeliosHealth</Link>
    <ul className={styles.links}>
      <li><Link href="#doctors" className={styles.link}>Find Doctors</Link></li>
      <li><Link href="#specialties" className={styles.link}>Specialties</Link></li>
      <li><Link href="#packages" className={styles.link}>Health Packages</Link></li>
    </ul>
    <div className={styles.rightGroup}>
      <a href="tel:1066" className="emergency-link">Emergency: 1066</a>
      <Link href="#doctors" className={styles.navCta}>Book Appointment</Link>
    </div>
  </div>
</nav>
```

**Acceptance:**
- Nav always white
- "Emergency: 1066" is red (`#DC2626`)
- "Book Appointment" has `border-radius: 8px`
- No `'use client'`

---

## TASK-009 — BookingWidget

**Files:** `src/components/home/BookingWidget.tsx`, `BookingWidget.module.css`

`'use client'`.

```typescript
const [city, setCity] = useState<City | ''>('')
const [specialty, setSpecialty] = useState<Specialty | ''>('')
```

Widget `<form>`:
- `role="search"` and `aria-label="Find doctors"`
- `<label>` for each `<select>`
- Submit button: `border-radius: 8px`, teal

On submit: smooth scroll to `#doctor-directory`.

**Acceptance:**
- Both selects have all options
- Labels associated with selects (`htmlFor` matches `id`)
- Submit button: 8px radius
- Scroll to doctor section on submit

---

## TASK-010 — Hero section

**Files:** `src/components/home/Hero.tsx`, `Hero.module.css`

Server component (renders `<BookingWidget />` as a child — client boundary is in BookingWidget itself).

Structure:
1. Eyebrow — teal, uppercase
2. H1 — Nunito 800, `clamp(2.25rem, 4vw, 3.5rem)`, `--color-text`
3. Subheading — muted
4. `<BookingWidget />`
5. Stats row — 4 stats with dividers

**Acceptance:**
- BookingWidget visible below H1
- Stats row shows 4 stats
- H1: Nunito 800 in DevTools
- Section `min-height: 70vh`

---

## TASK-011 — SpecialtyGrid

**Files:** `src/components/home/SpecialtyGrid.tsx`, `SpecialtyGrid.module.css`

Server component. Map `specialtyCards` array.

Icon map:
```typescript
import { Heart, Microscope, Brain, Bone, Activity, Droplets, Wind, Scan, Baby, Circle, Eye, Ear } from 'lucide-react'
const iconMap: Record<string, React.ComponentType<{ size?: number }>> = {
  Heart, Microscope, Brain, Bone, Activity, Droplets, Wind, Scan, Baby, Circle, Eye, Ear
}
```

**Acceptance:**
- 12 cards, 4-column grid, surface background
- Each card: Lucide icon in teal, specialty name, doctor count
- Hover shows teal border

---

## TASK-012 — DoctorCard

**Files:** `src/components/home/DoctorCard.tsx`, `DoctorCard.module.css`

No `'use client'`. Server component.

Star rating pattern:
```tsx
<Star size={14} className={styles.starIcon} aria-hidden="true" />
```
CSS: `.starIcon { color: var(--color-gold); fill: var(--color-gold); }`

Dual CTA pattern:
```tsx
<Button variant="primary" fullWidth href={`#book-${doctor.id}`}>
  Book Appointment
</Button>
{doctor.videoConsult && (
  <Button variant="secondary" fullWidth href={`#video-${doctor.id}`}>
    <Video size={16} aria-hidden="true" />
    Video Consult
  </Button>
)}
```

**Acceptance:**
- Photo: `border-radius: 50%`, `object-fit: cover`, 96×96px
- "Video Consult" absent for `videoConsult: false` doctors (Dr. Arjun Mehta, Dr. Rajan Sharma)
- Consultation fee visible, teal color
- Star icon is Lucide component with gold fill

---

## TASK-013 — DoctorDirectory

**Files:** `src/components/home/DoctorDirectory.tsx`, `DoctorDirectory.module.css`

`'use client'`. Has `id="doctor-directory"`.

Filter implementation:
```typescript
const filtered = useMemo(() =>
  doctors.filter((d) =>
    (city === 'all' || d.city === city) &&
    (specialty === 'all' || d.specialty === specialty) &&
    d.name.toLowerCase().includes(query.toLowerCase())
  ),
  [city, specialty, query]
)
```

ARIA live region (visually hidden):
```tsx
<p className="sr-only" aria-live="polite" aria-atomic="true">
  Showing {filtered.length} doctor{filtered.length !== 1 ? 's' : ''}
</p>
```

**Acceptance:**
- All 3 filters functional simultaneously
- ARIA live region in DOM with correct classes
- Empty state message when 0 results
- `DoctorCard` rendered inside but remains server component

---

## TASK-014 — WhyUs + accreditations

**Files:** `src/components/home/WhyUs.tsx`, `WhyUs.module.css`

Server component. Map `stats` and `accreditations` arrays.

```tsx
import { UserCheck, Stethoscope, Building2, Heart } from 'lucide-react'
const iconMap = { UserCheck, Stethoscope, Building2, Heart }
```

**Acceptance:**
- 4 stat blocks with teal Lucide icons
- NABH badge AND JCI badge both rendered
- Surface `#F0F7FA` background

---

## TASK-015 — HealthPackages

**Files:** `src/components/home/HealthPackages.tsx`, `HealthPackages.module.css`

Server component. 3 cards.

Strike-through pattern:
```tsx
<del className={styles.originalPrice}>
  ₹{pkg.originalPrice.toLocaleString('en-IN')}
</del>
<span className={styles.discountedPrice}>
  ₹{pkg.discountedPrice.toLocaleString('en-IN')}
</span>
<span className={styles.testCount}>{pkg.testCount} Tests Included</span>
```

Popular ribbon: `position: absolute; top: 0; left: 50%; transform: translateX(-50%)` — teal bg.

**Acceptance:**
- `<del>` in DOM for original price
- Test count visible on each card
- Popular ribbon on "Comprehensive" package
- "Book Now" button: 8px radius

---

## TASK-016 — Testimonials

**Files:** `src/components/home/Testimonials.tsx`, `Testimonials.module.css`

Server component. 3 cards.

```tsx
{Array.from({ length: 5 }).map((_, i) => (
  <Star key={i} size={16} className={styles.star} aria-hidden="true" />
))}
<span className="sr-only">5 out of 5 stars</span>
```

**Acceptance:** 3 cards, stars visible and gold, quote + name + treatment type.

---

## TASK-017 — Footer

**Files:** `src/components/layout/Footer.tsx`, `Footer.module.css`

Server component. 4 columns. `--color-teal-dark` background.

```tsx
© {new Date().getFullYear()} HeliosHealth. All rights reserved.
```

Footer link hover to `var(--color-gold)` — verified in CSS as `color: var(--color-gold)` on hover.

**Acceptance:**
- `#1B6A85` bg (not `#2582A1`)
- Gold link hover (not white)
- NABH + JCI at bottom, 50% opacity

---

## TASK-018 — Framer Motion entrances

Each major section wrapped in:
```tsx
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.7, ease: 'easeOut' }}
>
```

---

## TASK-019 — Static export config

```typescript
// next.config.ts
import type { NextConfig } from 'next'
const config: NextConfig = { output: 'export', images: { unoptimized: true } }
export default config
```

---

## TASK-020 — QA pass

```bash
tsc --noEmit
npm run build
grep -r "#[0-9A-Fa-f]\{3,6\}" src --include="*.module.css"    # must be empty
grep -r "rgba(" src --include="*.module.css"                   # must be empty
grep -r "9999px" src                                           # must be empty
```

Run Lighthouse. Verify all 07_Guide checklist items.
