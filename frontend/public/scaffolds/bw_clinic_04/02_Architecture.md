# 02 — Architecture
## Modern Indian Diagnostic Marketplace · bw_clinic_04

---

## TypeScript Types

**File:** `src/types/index.ts`

```typescript
export type ServiceCategory =
  | 'full-body'
  | 'senior'
  | 'women'
  | 'cardiac'
  | 'diabetes'
  | 'vitamin'
  | 'organ'
  | 'immunity'

export interface HealthPackage {
  id: string
  name: string
  category: ServiceCategory
  originalPrice: number       // in INR, full price
  discountedPrice: number     // in INR, offer price
  discountPercent: number     // integer, e.g. 50
  testsIncluded: number       // count of individual tests
  turnaroundHours: number     // report delivery time in hours
  popular: boolean            // shows "POPULAR" badge
  homeCollection: boolean     // shows home collection indicator
  keyTests: string[]          // exactly 3 items — shown as checklist on card
}

export interface ProcessStep {
  id: string
  step: number                // 1, 2, 3
  title: string
  description: string
  iconName: string            // Lucide icon name
}

export interface TrustSignal {
  id: string
  iconName: string            // Lucide icon name
  title: string
  description: string
}

export interface Testimonial {
  id: string
  quote: string
  patientName: string
  packageName: string         // which package they booked
  rating: number              // 4 or 5
}
```

---

## Mock Data

**File:** `src/lib/data.ts`

### packages — 8 entries

One per ServiceCategory. 2 marked `popular: true`, all have `homeCollection: true`.

```typescript
import {
  HealthPackage, ProcessStep, TrustSignal, Testimonial
} from '@/types'

export const packages: HealthPackage[] = [
  {
    id: 'complete-health',
    name: 'Complete Health Profile',
    category: 'full-body',
    originalPrice: 3999,
    discountedPrice: 1999,
    discountPercent: 50,
    testsIncluded: 80,
    turnaroundHours: 24,
    popular: true,
    homeCollection: true,
    keyTests: ['CBC & ESR', 'Lipid Profile', 'Thyroid (T3, T4, TSH)'],
  },
  {
    id: 'senior-wellness',
    name: 'Senior Wellness Package',
    category: 'senior',
    originalPrice: 5499,
    discountedPrice: 2749,
    discountPercent: 50,
    testsIncluded: 95,
    turnaroundHours: 24,
    popular: true,
    homeCollection: true,
    keyTests: ['Bone Density Markers', 'Cardiac Risk Panel', 'Kidney Function'],
  },
  {
    id: 'womens-health',
    name: "Women's Health Checkup",
    category: 'women',
    originalPrice: 2999,
    discountedPrice: 1499,
    discountPercent: 50,
    testsIncluded: 65,
    turnaroundHours: 24,
    popular: false,
    homeCollection: true,
    keyTests: ['Hormone Panel (6 tests)', 'Iron & Ferritin', 'Pelvic Ultrasound Markers'],
  },
  {
    id: 'cardiac-risk',
    name: 'Cardiac Risk Assessment',
    category: 'cardiac',
    originalPrice: 1999,
    discountedPrice: 999,
    discountPercent: 50,
    testsIncluded: 35,
    turnaroundHours: 24,
    popular: false,
    homeCollection: true,
    keyTests: ['ECG Interpretation', 'Troponin I', 'Homocysteine'],
  },
  {
    id: 'diabetes-panel',
    name: 'Diabetes Management Panel',
    category: 'diabetes',
    originalPrice: 1499,
    discountedPrice: 749,
    discountPercent: 50,
    testsIncluded: 28,
    turnaroundHours: 24,
    popular: false,
    homeCollection: true,
    keyTests: ['HbA1c', 'Fasting & PP Glucose', 'Insulin Resistance Index'],
  },
  {
    id: 'vitamin-screen',
    name: 'Vitamin Deficiency Screen',
    category: 'vitamin',
    originalPrice: 1299,
    discountedPrice: 649,
    discountPercent: 50,
    testsIncluded: 15,
    turnaroundHours: 24,
    popular: false,
    homeCollection: true,
    keyTests: ['Vitamin D (25-OH)', 'Vitamin B12', 'Folate'],
  },
  {
    id: 'kidney-liver',
    name: 'Kidney & Liver Profile',
    category: 'organ',
    originalPrice: 1799,
    discountedPrice: 899,
    discountPercent: 50,
    testsIncluded: 32,
    turnaroundHours: 24,
    popular: false,
    homeCollection: true,
    keyTests: ['LFT (11 parameters)', 'KFT (8 parameters)', 'Uric Acid'],
  },
  {
    id: 'immunity-panel',
    name: 'Immunity Booster Panel',
    category: 'immunity',
    originalPrice: 1299,
    discountedPrice: 649,
    discountPercent: 50,
    testsIncluded: 18,
    turnaroundHours: 48,
    popular: false,
    homeCollection: true,
    keyTests: ['CBC with Differential', 'CRP (high sensitivity)', 'IgG & IgM'],
  },
]
```

### processSteps — 3 entries

```typescript
export const processSteps: ProcessStep[] = [
  {
    id: 'step-01',
    step: 1,
    title: 'Choose Your Package',
    description: 'Browse our curated test packages and select the one that fits your health needs.',
    iconName: 'ClipboardList',
  },
  {
    id: 'step-02',
    step: 2,
    title: 'Book a Home Slot',
    description: 'Pick a convenient time — our certified phlebotomist arrives at your door.',
    iconName: 'CalendarCheck',
  },
  {
    id: 'step-03',
    step: 3,
    title: 'Get Your Reports',
    description: 'Receive certified digital reports in 24 hours via email and the VitalCheck app.',
    iconName: 'FileText',
  },
]
```

### trustSignals — 4 entries

```typescript
export const trustSignals: TrustSignal[] = [
  {
    id: 'who',
    iconName: 'ShieldCheck',
    title: 'WHO-Certified Professionals',
    description: 'Every phlebotomist is WHO-trained and uses sterile, single-use equipment.',
  },
  {
    id: 'nabl',
    iconName: 'Award',
    title: 'NABL-Accredited Labs',
    description: 'All samples processed at government-accredited partner laboratories.',
  },
  {
    id: 'reports',
    iconName: 'Clock',
    title: '24-Hour Reports',
    description: 'Most panels delivered within 24 hours — some same-day.',
  },
  {
    id: 'collection',
    iconName: 'Home',
    title: 'Free Home Collection',
    description: 'Book before 10am for same-day collection at no extra charge.',
  },
]
```

### testimonials — 3 entries

```typescript
export const testimonials: Testimonial[] = [
  {
    id: 'test-01',
    quote: 'The phlebotomist arrived exactly on time and the reports were in my inbox by evening. Incredibly smooth.',
    patientName: 'Ananya R.',
    packageName: 'Complete Health Profile',
    rating: 5,
  },
  {
    id: 'test-02',
    quote: 'Booked the Senior Wellness package for my father. The doctor said the report format was excellent — very detailed.',
    patientName: 'Vikram S.',
    packageName: 'Senior Wellness Package',
    rating: 5,
  },
  {
    id: 'test-03',
    quote: 'Compared three labs before finding VitalCheck. Best price by far and the home collection is genuinely free.',
    patientName: 'Deepa M.',
    packageName: 'Vitamin Deficiency Screen',
    rating: 5,
  },
]
```

---

## Filter Utility

**File:** `src/lib/filterPackages.ts`

```typescript
import { HealthPackage, ServiceCategory } from '@/types'

export function filterPackages(
  packages: HealthPackage[],
  category: ServiceCategory | 'all'
): HealthPackage[] {
  if (category === 'all') return packages
  return packages.filter(p => p.category === category)
}
```

**File:** `src/lib/formatINR.ts`

```typescript
export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`
}
// formatINR(1999)  → "₹1,999"
// formatINR(2749)  → "₹2,749"
// formatINR(649)   → "₹649"
```

---

## Component Map

| Component | Type | Client? | Key Props / Data |
|-----------|------|---------|-----------------|
| `SiteNav` | layout | No | Static links, location pill, "Book Now" |
| `Footer` | layout | No | 4-column dark nav |
| `HeroSection` | home | No | Static hero copy + stats |
| `CategoryTabs` | home | Yes | `packages: HealthPackage[]`, manages `active` state |
| `PackageCard` | home | No | `pkg: HealthPackage` |
| `HowItWorks` | home | No | `steps: ProcessStep[]` |
| `WhyChooseUs` | home | No | `signals: TrustSignal[]` |
| `Testimonials` | home | No | `testimonials: Testimonial[]` |
| `Button` | ui | No | `variant`, `size`, `href`, `onClick`, `fullWidth` |

---

## Category Tab Data

```typescript
// Defined in CategoryTabs.tsx — not in data.ts (UI constant, not data)
export const CATEGORIES: { label: string; value: ServiceCategory | 'all' }[] = [
  { label: 'All',           value: 'all' },
  { label: 'Full Body',     value: 'full-body' },
  { label: 'Senior Care',   value: 'senior' },
  { label: "Women's Health",value: 'women' },
  { label: 'Cardiac',       value: 'cardiac' },
  { label: 'Diabetes',      value: 'diabetes' },
  { label: 'Vitamins',      value: 'vitamin' },
  { label: 'Organ Profile', value: 'organ' },
  { label: 'Immunity',      value: 'immunity' },
]
```

---

## Lucide Icon Map

```typescript
// For WhyChooseUs trust signals + HowItWorks steps
import {
  ShieldCheck, Award, Clock, Home,    // trustSignals
  ClipboardList, CalendarCheck, FileText,  // processSteps
  CheckCircle,                         // PackageCard key tests
} from 'lucide-react'

const lucideIconMap: Record<string, LucideIcon> = {
  ShieldCheck, Award, Clock, Home,
  ClipboardList, CalendarCheck, FileText,
  CheckCircle,
}
```

---

## Page Assembly (src/app/page.tsx)

```tsx
import SiteNav from '@/components/layout/SiteNav'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/home/HeroSection'
import CategoryTabs from '@/components/home/CategoryTabs'
import HowItWorks from '@/components/home/HowItWorks'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import Testimonials from '@/components/home/Testimonials'
import { packages, processSteps, trustSignals, testimonials } from '@/lib/data'

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <HeroSection />
        <CategoryTabs packages={packages} />
        <HowItWorks steps={processSteps} />
        <WhyChooseUs signals={trustSignals} />
        <Testimonials testimonials={testimonials} />
      </main>
      <Footer />
    </>
  )
}
```
