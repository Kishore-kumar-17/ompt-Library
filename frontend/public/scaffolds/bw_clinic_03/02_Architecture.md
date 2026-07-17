# 02 — Architecture
## Global Hospital Authority Portal · bw_clinic_03

---

## TypeScript Types

**File:** `src/types/index.ts`

```typescript
export type AppointmentType = 'in-person' | 'virtual' | 'second-opinion'
export type AcceptingStatus = 'accepting' | 'limited' | 'not-accepting'
export type ConditionCategory =
  | 'heart-vascular'
  | 'cancer'
  | 'brain-spine'
  | 'digestive'
  | 'orthopedics'
  | 'lung'
  | 'kidney-urinary'
  | 'endocrine'

export interface ProviderLocation {
  name: string   // "Main Campus", "Weston Hospital"
  city: string   // "Cleveland", "Weston"
}

export interface Provider {
  id: string
  name: string
  credentials: string          // "MD, FACC" | "MD, PhD"
  specialty: string            // primary specialty label
  subspecialties: string[]     // e.g. ["Interventional Cardiology", "Heart Failure"]
  conditionsTreated: string[]  // searchable — drives condition-first search
  locations: ProviderLocation[]
  languages: string[]
  rating: number               // 4.6–4.9 range; one decimal place
  reviewCount: number
  photo: string                // "/photos/[id].jpg"
  appointmentTypes: AppointmentType[]  // array — any combination
  acceptingStatus: AcceptingStatus
}

export interface Condition {
  id: string
  name: string
  category: ConditionCategory
  articleCount: number
}

export interface OutcomeMetric {
  id: string
  label: string    // short label for aria / screen readers
  value: string    // "#1" | "35,000+" | "1,800+" | "300+" | "6.2M+"
  context: string  // "US News & World Report" | "Heart procedures annually"
}

export interface HealthArticle {
  id: string
  title: string
  category: string
  readTimeMinutes: number
}
```

---

## Mock Data

**File:** `src/lib/data.ts`

### providers — 8 entries

Distribution: `acceptingStatus` — 3 accepting, 3 limited, 2 not-accepting. `appointmentTypes` — all three types covered across the 8.

```typescript
import { Provider, Condition, OutcomeMetric, HealthArticle } from '@/types'

export const providers: Provider[] = [
  {
    id: 'dr-sarah-blackstone',
    name: 'Sarah Blackstone',
    credentials: 'MD, FACC',
    specialty: 'Cardiology',
    subspecialties: ['Interventional Cardiology', 'Heart Failure'],
    conditionsTreated: ['Heart Failure', 'Coronary Artery Disease', 'Atrial Fibrillation'],
    locations: [{ name: 'Main Campus', city: 'Cleveland' }],
    languages: ['English'],
    rating: 4.9,
    reviewCount: 312,
    photo: '/photos/blackstone.jpg',
    appointmentTypes: ['in-person', 'virtual', 'second-opinion'],
    acceptingStatus: 'accepting',
  },
  {
    id: 'dr-james-kowalski',
    name: 'James Kowalski',
    credentials: 'MD, PhD',
    specialty: 'Oncology',
    subspecialties: ['Breast Cancer', 'Targeted Therapy'],
    conditionsTreated: ['Breast Cancer', 'Triple-Negative Breast Cancer', 'HER2+ Cancer'],
    locations: [{ name: 'Taussig Cancer Institute', city: 'Cleveland' }],
    languages: ['English', 'Polish'],
    rating: 4.8,
    reviewCount: 187,
    photo: '/photos/kowalski.jpg',
    appointmentTypes: ['in-person', 'second-opinion'],
    acceptingStatus: 'limited',
  },
  {
    id: 'dr-priya-nair',
    name: 'Priya Nair',
    credentials: 'MD',
    specialty: 'Neurology',
    subspecialties: ['Multiple Sclerosis', 'Neuroimmunology'],
    conditionsTreated: ['Multiple Sclerosis', 'Neuromyelitis Optica', 'Migraine'],
    locations: [
      { name: 'Main Campus', city: 'Cleveland' },
      { name: 'Beachwood Family Health Center', city: 'Beachwood' },
    ],
    languages: ['English', 'Malayalam'],
    rating: 4.9,
    reviewCount: 224,
    photo: '/photos/nair.jpg',
    appointmentTypes: ['in-person', 'virtual'],
    acceptingStatus: 'accepting',
  },
  {
    id: 'dr-michael-torres',
    name: 'Michael Torres',
    credentials: 'MD',
    specialty: 'Orthopedic Surgery',
    subspecialties: ['Hip Replacement', 'Knee Replacement'],
    conditionsTreated: ['Hip Osteoarthritis', 'Knee Osteoarthritis', 'Hip Fracture'],
    locations: [{ name: 'Weston Hospital', city: 'Weston' }],
    languages: ['English', 'Spanish'],
    rating: 4.7,
    reviewCount: 403,
    photo: '/photos/torres.jpg',
    appointmentTypes: ['in-person'],
    acceptingStatus: 'accepting',
  },
  {
    id: 'dr-linda-chen',
    name: 'Linda Chen',
    credentials: 'MD, FACE',
    specialty: 'Endocrinology',
    subspecialties: ['Diabetes', 'Thyroid Disorders'],
    conditionsTreated: ['Type 1 Diabetes', 'Type 2 Diabetes', 'Hypothyroidism'],
    locations: [{ name: 'Main Campus', city: 'Cleveland' }],
    languages: ['English', 'Mandarin'],
    rating: 4.8,
    reviewCount: 156,
    photo: '/photos/chen.jpg',
    appointmentTypes: ['in-person', 'virtual'],
    acceptingStatus: 'accepting',
  },
  {
    id: 'dr-robert-hayes',
    name: 'Robert Hayes',
    credentials: 'MD, AGAF',
    specialty: 'Gastroenterology',
    subspecialties: ['IBD', 'Colorectal Cancer Screening'],
    conditionsTreated: ["Crohn's Disease", 'Ulcerative Colitis', 'Colorectal Cancer'],
    locations: [{ name: 'Digestive Disease Institute', city: 'Cleveland' }],
    languages: ['English'],
    rating: 4.6,
    reviewCount: 289,
    photo: '/photos/hayes.jpg',
    appointmentTypes: ['in-person', 'virtual'],
    acceptingStatus: 'limited',
  },
  {
    id: 'dr-aisha-patel',
    name: 'Aisha Patel',
    credentials: 'MD, FCCP',
    specialty: 'Pulmonology',
    subspecialties: ['COPD', 'Pulmonary Hypertension'],
    conditionsTreated: ['COPD', 'Pulmonary Hypertension', 'Sleep Apnea'],
    locations: [
      { name: 'Main Campus', city: 'Cleveland' },
      { name: 'Strongsville Family Health Center', city: 'Strongsville' },
    ],
    languages: ['English', 'Gujarati'],
    rating: 4.8,
    reviewCount: 198,
    photo: '/photos/patel.jpg',
    appointmentTypes: ['in-person', 'virtual'],
    acceptingStatus: 'limited',
  },
  {
    id: 'dr-david-kim',
    name: 'David Kim',
    credentials: 'MD, FASN',
    specialty: 'Nephrology',
    subspecialties: ['Transplant Nephrology', 'CKD'],
    conditionsTreated: ['Chronic Kidney Disease', 'Kidney Transplant', 'Glomerulonephritis'],
    locations: [{ name: 'Glickman Urological & Kidney Institute', city: 'Cleveland' }],
    languages: ['English', 'Korean'],
    rating: 4.9,
    reviewCount: 141,
    photo: '/photos/kim.jpg',
    appointmentTypes: ['in-person', 'second-opinion'],
    acceptingStatus: 'not-accepting',
  },
]
```

### conditions — 8 entries (one per ConditionCategory)

```typescript
export const conditions: Condition[] = [
  { id: 'heart-vascular', name: 'Heart & Vascular', category: 'heart-vascular', articleCount: 312 },
  { id: 'cancer',         name: 'Cancer Care',       category: 'cancer',         articleCount: 247 },
  { id: 'brain-spine',    name: 'Brain & Spine',     category: 'brain-spine',    articleCount: 189 },
  { id: 'digestive',      name: 'Digestive Health',  category: 'digestive',      articleCount: 156 },
  { id: 'orthopedics',    name: 'Bones & Joints',    category: 'orthopedics',    articleCount: 203 },
  { id: 'lung',           name: 'Lung & Breathing',  category: 'lung',           articleCount: 134 },
  { id: 'kidney-urinary', name: 'Kidney & Urinary',  category: 'kidney-urinary', articleCount: 98 },
  { id: 'endocrine',      name: 'Diabetes & Thyroid',category: 'endocrine',      articleCount: 167 },
]
```

### outcomeMetrics — 5 entries

```typescript
export const outcomeMetrics: OutcomeMetric[] = [
  { id: 'ranking',    label: 'US News ranking',            value: '#1',      context: 'US News & World Report' },
  { id: 'heart',      label: 'Heart procedures annually',  value: '35,000+', context: 'Heart procedures annually' },
  { id: 'physicians', label: 'Specialist physicians',      value: '1,800+',  context: 'Specialist physicians' },
  { id: 'locations',  label: 'Worldwide locations',        value: '300+',    context: 'Locations worldwide' },
  { id: 'patients',   label: 'Patients seen annually',     value: '6.2M+',   context: 'Patients seen annually' },
]
```

### healthArticles — 6 entries

```typescript
export const healthArticles: HealthArticle[] = [
  { id: 'art-01', title: 'What Is Heart Failure? Symptoms, Causes & Treatment', category: 'Heart & Vascular', readTimeMinutes: 8 },
  { id: 'art-02', title: 'Managing Type 2 Diabetes: A Complete Guide',           category: 'Diabetes & Thyroid', readTimeMinutes: 12 },
  { id: 'art-03', title: 'Understanding Multiple Sclerosis: Early Signs',        category: 'Brain & Spine',     readTimeMinutes: 7 },
  { id: 'art-04', title: 'COPD vs Asthma: Key Differences Explained',            category: 'Lung & Breathing',  readTimeMinutes: 6 },
  { id: 'art-05', title: 'Crohn\'s Disease Diet: Foods to Eat and Avoid',        category: 'Digestive Health',  readTimeMinutes: 9 },
  { id: 'art-06', title: 'When to See an Orthopedic Surgeon for Knee Pain',      category: 'Bones & Joints',    readTimeMinutes: 5 },
]
```

---

## Filter Utilities

**File:** `src/lib/filterProviders.ts`

```typescript
import { Provider, AppointmentType } from '@/types'

export function filterProviders(
  providers: Provider[],
  query: string,
  city: string,
  apptType: AppointmentType | ''
): Provider[] {
  return providers.filter(p => {
    if (query) {
      const q = query.toLowerCase()
      const matchName      = p.name.toLowerCase().includes(q)
      const matchSpecialty = p.specialty.toLowerCase().includes(q)
      const matchCondition = p.conditionsTreated.some(c => c.toLowerCase().includes(q))
      if (!matchName && !matchSpecialty && !matchCondition) return false
    }
    if (city && !p.locations.some(l => l.city === city)) return false
    if (apptType && !p.appointmentTypes.includes(apptType)) return false
    return true
  })
}

export function getUniqueCities(providers: Provider[]): string[] {
  return [...new Set(providers.flatMap(p => p.locations.map(l => l.city)))].sort()
}
```

---

## Component Map

| Component | Type | Client? | Key Props / Data |
|-----------|------|---------|-----------------|
| `TopBar` | layout | No | Static phone + MyChart + Help links |
| `SiteNav` | layout | No | Logo + nav links + "Schedule Now" button |
| `Footer` | layout | No | 4-column links, navy bg |
| `HeroSearch` | home | Yes | `suggestedConditions: string[]` |
| `OutcomesStrip` | home | No | `metrics: OutcomeMetric[]` |
| `ConditionBrowser` | home | No | `conditions: Condition[]` |
| `ProviderSearch` | home | Yes | `providers: Provider[]` (all) |
| `ProviderCard` | home | No | `provider: Provider` |
| `HealthLibraryPreview` | home | No | `articles: HealthArticle[]` |
| `AppointmentBanner` | home | No | Static CTA section |
| `Button` | ui | No | `variant`, `size`, `href`, `onClick`, `fullWidth`, `disabled` |
| `AppointmentBadge` | ui | No | `type: AppointmentType` |
| `AcceptingBadge` | ui | No | `status: AcceptingStatus` |

---

## Lucide Icon Map (ConditionBrowser)

```typescript
import { Heart, Ribbon, Brain, Activity, Bone, Wind, Droplets, Zap } from 'lucide-react'
import { ConditionCategory } from '@/types'
import { LucideIcon } from 'lucide-react'

export const conditionIconMap: Record<ConditionCategory, LucideIcon> = {
  'heart-vascular':  Heart,
  'cancer':          Ribbon,
  'brain-spine':     Brain,
  'digestive':       Activity,
  'orthopedics':     Bone,
  'lung':            Wind,
  'kidney-urinary':  Droplets,
  'endocrine':       Zap,
}
```

---

## Page Assembly (src/app/page.tsx)

```tsx
import TopBar from '@/components/layout/TopBar'
import SiteNav from '@/components/layout/SiteNav'
import HeroSearch from '@/components/home/HeroSearch'
import OutcomesStrip from '@/components/home/OutcomesStrip'
import ConditionBrowser from '@/components/home/ConditionBrowser'
import ProviderSearch from '@/components/home/ProviderSearch'
import HealthLibraryPreview from '@/components/home/HealthLibraryPreview'
import AppointmentBanner from '@/components/home/AppointmentBanner'
import Footer from '@/components/layout/Footer'
import { providers, conditions, outcomeMetrics, healthArticles } from '@/lib/data'

export default function Home() {
  return (
    <>
      <TopBar />
      <SiteNav />
      <main>
        <HeroSearch suggestedConditions={['Heart Failure', 'Multiple Sclerosis', 'Type 2 Diabetes', 'COPD']} />
        <OutcomesStrip metrics={outcomeMetrics} />
        <ConditionBrowser conditions={conditions} />
        <ProviderSearch providers={providers} />
        <HealthLibraryPreview articles={healthArticles} />
        <AppointmentBanner />
      </main>
      <Footer />
    </>
  )
}
```
