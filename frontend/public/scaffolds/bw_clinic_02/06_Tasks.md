# 06 — Tasks
## Doctor Discovery + Booking Platform · bw_clinic_02

---

## Task Index

| ID | Title | Day | Depends On |
|----|-------|-----|------------|
| TASK-001 | Scaffold Next.js project | 1 | — |
| TASK-002 | Install dependencies | 1 | TASK-001 |
| TASK-003 | TypeScript types | 1 | TASK-001 |
| TASK-004 | Mock data | 1 | TASK-003 |
| TASK-005 | Global CSS tokens | 1 | TASK-001 |
| TASK-006 | Root layout + Lato font | 1 | TASK-005 |
| TASK-007 | Button component (3 variants) | 1 | TASK-005 |
| TASK-008 | StickyNav | 1 | TASK-007 |
| TASK-009 | OmniSearch | 2 | TASK-005 |
| TASK-010 | Hero section | 2 | TASK-009 |
| TASK-011 | DiscoveryCards | 2 | TASK-004 |
| TASK-012 | SymptomCards | 3 | TASK-004 |
| TASK-013 | SpecialtyCarousel | 3 | TASK-004 |
| TASK-014 | DoctorCard | 3 | TASK-004, TASK-007 |
| TASK-015 | DoctorGrid | 3 | TASK-014 |
| TASK-016 | Testimonials | 4 | TASK-004 |
| TASK-017 | Footer | 4 | TASK-007 |
| TASK-018 | Framer Motion entrances | 4 | All sections |
| TASK-019 | Static export config | 4 | TASK-001 |
| TASK-020 | QA pass + launch checklist | 4 | All tasks |

---

## TASK-001 — Scaffold

```bash
npx create-next-app@latest medfind \
  --typescript --no-tailwind --app --src-dir --import-alias "@/*"
cd medfind
```

---

## TASK-002 — Install dependencies

```bash
npm install framer-motion lucide-react
```

---

## TASK-003 — TypeScript types

**File:** `src/types/index.ts`

```typescript
export type ConsultMode = 'clinic' | 'video' | 'both'

export interface Doctor {
  id: string; name: string; specialty: string; qualifications: string
  experience: number; locality: string; city: string; rating: number
  reviewCount: number; consultFee: number; availableToday: boolean
  consultMode: ConsultMode; photo: string; verified: boolean
}
export interface SymptomCard { id: string; label: string; emoji: string }
export interface SpecialtyChip { id: string; label: string; icon: string; doctorCount: number }
export interface DiscoveryCard { id: string; title: string; description: string; bgColor: string; href: string }
export interface Testimonial { id: string; quote: string; patientName: string; context: string }
```

**Acceptance:** `tsc --noEmit` exits 0.

---

## TASK-004 — Mock data

**File:** `src/lib/data.ts`

Copy all arrays from `02_Architecture.md`. Verify:
- 8 doctors — distribution: 3 `clinic`, 2 `video`, 3 `both`; 5 `availableToday: true`, 3 false
- 8 symptomCards
- 10 specialtyChips
- 4 discoveryCards
- 3 testimonials

---

## TASK-005 — Global CSS tokens

**File:** `src/app/globals.css`

8 tokens + `.sr-only` + prefers-reduced-motion.

**Verify:** `grep -r "rgba\|#[0-9A-Fa-f]" src --include="*.module.css"` returns empty.

---

## TASK-006 — Root layout + Lato

```typescript
import { Lato } from 'next/font/google'
import './globals.css'

const lato = Lato({
  subsets: ['latin'],
  weight: ['400', '700'],   // ONLY these two weights
  variable: '--font-sans',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={lato.variable}>
      <body>{children}</body>
    </html>
  )
}
```

**Acceptance:** Computed font-family shows Lato. No Nunito Sans, no Plus Jakarta.

---

## TASK-007 — Button component

**Files:** `src/components/ui/Button.tsx`, `Button.module.css`

```typescript
interface Props {
  variant: 'primary' | 'secondary' | 'outlineNavy'
  size?: 'md' | 'sm'
  children: React.ReactNode
  href?: string
  onClick?: () => void
  fullWidth?: boolean
  disabled?: boolean
}
```

CSS critical rules:
```css
.btn { border-radius: 4px; }
.primary { background: var(--color-cyan); color: var(--color-navy); }  /* navy text on cyan */
.secondary { background: var(--color-navy); color: var(--color-white); }
.outlineNavy { background: transparent; color: var(--color-navy); border: 1.5px solid var(--color-navy); }
```

**Acceptance:** DevTools confirms `.primary` has `color: rgb(40, 50, 140)` (navy). NOT white.

---

## TASK-008 — StickyNav

**Files:** `src/components/layout/StickyNav.tsx`, `StickyNav.module.css`

No `'use client'`. Server component.

```tsx
<nav className={styles.nav} role="navigation" aria-label="Main navigation">
  <div className={styles.inner}>
    <Link href="/" className={styles.logo}>MedFind</Link>
    <ul className={styles.links}>
      <li><Link href="#doctor-grid" className={styles.link}>Find Doctors</Link></li>
      <li><Link href="#" className={styles.link}>Video Consult</Link></li>
      <li><Link href="#" className={styles.link}>Surgeries</Link></li>
    </ul>
    <div className={styles.rightGroup}>
      <Link href="#" className={styles.forDoctors}>For Doctors</Link>
      <Link href="#" className={styles.loginBtn}>Login</Link>
    </div>
  </div>
</nav>
```

**Acceptance:**
- Nav always white
- "Login" uses `styles.loginBtn` — navy outline, navy text, 4px radius
- No red link, no emergency link
- No `'use client'`

---

## TASK-009 — OmniSearch

**Files:** `src/components/home/OmniSearch.tsx`, `OmniSearch.module.css`

`'use client'`. Two `<input type="text">` fields. NOT `<select>`.

```tsx
'use client'
import { useState } from 'react'
import { MapPin, Search } from 'lucide-react'

export default function OmniSearch() {
  const [locality, setLocality] = useState('')
  const [keyword, setKeyword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    document.getElementById('doctor-grid')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <form className={styles.widget} onSubmit={handleSubmit}
          role="search" aria-label="Find doctors by location and specialty">
      <div className={styles.fields}>
        <div className={styles.field}>
          <label htmlFor="locality" className="sr-only">Enter locality</label>
          <div className={styles.inputWrapper}>
            <MapPin size={16} className={styles.inputIcon} aria-hidden="true" />
            <input id="locality" type="text" className={styles.input}
              placeholder="Enter locality, e.g. Koramangala"
              value={locality} onChange={e => setLocality(e.target.value)} />
          </div>
        </div>
        <div className={styles.divider} aria-hidden="true" />
        <div className={styles.field}>
          <label htmlFor="keyword" className="sr-only">Search doctors or symptoms</label>
          <div className={styles.inputWrapper}>
            <Search size={16} className={styles.inputIcon} aria-hidden="true" />
            <input id="keyword" type="text" className={styles.input}
              placeholder="Search doctors, clinics, symptoms..."
              value={keyword} onChange={e => setKeyword(e.target.value)} />
          </div>
        </div>
        <button type="submit" className={styles.submit}>Search</button>
      </div>
    </form>
  )
}
```

**Acceptance:**
- Two text inputs (verify with DevTools Elements: `type="text"`, not `type="select"`)
- Submit: cyan bg, navy text
- Box shadow on widget; NO shadow on hero section itself

---

## TASK-010 — Hero

**Files:** `src/components/home/Hero.tsx`, `Hero.module.css`

Server component. Renders `<OmniSearch />` as child (client boundary contained within).

Structure: eyebrow → H1 → subheading → `<OmniSearch />` → stats row.

---

## TASK-011 — DiscoveryCards

**Files:** `src/components/home/DiscoveryCards.tsx`, `DiscoveryCards.module.css`

Server component. Map `discoveryCards` array.

Background class mapping:
```tsx
const bgMap: Record<string, string> = {
  'bg-blue': styles.bgBlue,
  'bg-purple': styles.bgPurple,
  'bg-green': styles.bgGreen,
  'bg-orange': styles.bgOrange,
}
```

**Acceptance:** 4 tiles, colored bgs, NO shadow, `border-radius: 4px`.

---

## TASK-012 — SymptomCards

**Files:** `src/components/home/SymptomCards.tsx`, `SymptomCards.module.css`

Server component. 8 cards, 4-col grid.

```tsx
<button className={styles.cta} aria-label={`Consult now for ${symptom.label}`}>
  CONSULT NOW
</button>
```

CSS: `.cta { color: var(--color-navy); }` — never cyan.

**Acceptance:** "CONSULT NOW" computed color = navy.

---

## TASK-013 — SpecialtyCarousel

**Files:** `src/components/home/SpecialtyCarousel.tsx`, `SpecialtyCarousel.module.css`

`'use client'`. `useRef` on track element.

```tsx
const trackRef = useRef<HTMLDivElement>(null)
const scroll = (dir: 'left' | 'right') => {
  trackRef.current?.scrollBy({ left: dir === 'right' ? 240 : -240, behavior: 'smooth' })
}
```

Chip radius: `border-radius: 4px` — NOT 20px (chips are card-style, not pill-style).

---

## TASK-014 — DoctorCard

**Files:** `src/components/home/DoctorCard.tsx`, `DoctorCard.module.css`

No `'use client'`. Server component.

```tsx
const showClinic = doctor.consultMode === 'clinic' || doctor.consultMode === 'both'
const showVideo  = doctor.consultMode === 'video'  || doctor.consultMode === 'both'
```

Photo:
```tsx
<img src={doctor.photo} alt={`Photo of ${doctor.name}`}
     className={styles.photo} width={80} height={80} />
```
CSS: `.photo { border-radius: 4px; object-fit: cover; object-position: top; }` — NOT `50%`.

Availability badge (conditional JSX, not `display: none`):
```tsx
{doctor.availableToday && (
  <span className={styles.availabilityBadge}>
    <span className={styles.availabilityDot} aria-hidden="true" />
    Available Today
  </span>
)}
```

Star: amber `#F59E0B` via CSS `fill` — one-off decorative, no WCAG text contrast issue (it's an icon, not text).

**Acceptance:** See Epic 7 story list for 12 specific checks.

---

## TASK-015 — DoctorGrid

**Files:** `src/components/home/DoctorGrid.tsx`, `DoctorGrid.module.css`

`'use client'`. City `<input>` + specialty `<select>`. `useMemo`. ARIA live region.

Section: `id="doctor-grid"` (OmniSearch scrolls here).

---

## TASK-016 — Testimonials

**Files:** `src/components/home/Testimonials.tsx`, `Testimonials.module.css`

Server component. 3 text-only cards. No `<img>` in component.

---

## TASK-017 — Footer

**Files:** `src/components/layout/Footer.tsx`, `Footer.module.css`

Server component. Navy `var(--color-navy)` bg. Cyan link hover.

```tsx
© {new Date().getFullYear()} MedFind Technologies Pvt. Ltd.
```

---

## TASK-018 — Framer Motion

```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6, ease: 'easeOut' }}
>
```

All major sections wrapped. `once: true` prevents re-trigger.

---

## TASK-019 — Static export

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
grep -r "#[0-9A-Fa-f]\{3,6\}" src --include="*.module.css"
grep -r "rgba(" src --include="*.module.css"
grep -r "border-radius: 50%" src/components
grep -r "9999px" src
grep -r "box-shadow" src/components --include="*.module.css"  # should return ONLY OmniSearch
```

Run Lighthouse. Verify 07_Guide launch checklist.
