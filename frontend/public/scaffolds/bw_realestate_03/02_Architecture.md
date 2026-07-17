# 02 — Architecture
## Indian Premium Property Portal · bw_realestate_03

---

## TypeScript Types

**File:** `src/types/index.ts`

```typescript
export type PropertyCategory = 'all' | 'luxury' | 'ready' | 'new-launch' | 'high-yield'
export type BHKType = 'Studio' | '1 BHK' | '2 BHK' | '3 BHK' | '4 BHK' | '4+ BHK'
export type PropertyType = 'Apartment' | 'Independent House' | 'Villa' | 'Penthouse' | 'Plot'
export type ListingSource = 'Owner' | 'Builder' | 'Agent'
export type PossessionStatus = 'Ready to Move' | 'Under Construction' | 'New Launch'
export type FurnishingStatus = 'Furnished' | 'Semi-Furnished' | 'Unfurnished'
export type DeveloperReputation = 'A+' | 'A' | 'B+'

export interface PremiumProperty {
  id: string
  title: string
  bhk: BHKType
  propertyType: PropertyType
  price: number               // raw INR — always formatPrice()
  pricePerSqft: number
  superArea: number           // sqft
  floor: string
  locality: string
  city: string
  listingSource: ListingSource
  verified: boolean           // SqVerifiedBadge (teal)
  reraRegistered: boolean     // ReraBadge (green)
  possessionStatus: PossessionStatus
  furnishingStatus: FurnishingStatus
  photos: number
  postedDaysAgo: number
  rentalYield: number         // % — always formatYield()
  capitalAppreciation: number // % annual — display as `{n.toFixed(1)}%`
  developerReputation?: DeveloperReputation
  mode: 'buy' | 'rent'
}

export interface Agent {
  id: string
  name: string
  verified: boolean
  rating: number              // e.g. 4.8 — display as `{n.toFixed(1)} ★`
  reviewCount: number
  transactionsCompleted: number
  specializations: string[]   // e.g. ['Luxury Apartments', 'NRI Services']
  languages: string[]
  city: string
  yearsOfExperience: number
}

export interface NewLaunch {
  id: string
  projectName: string
  builderName: string
  locality: string
  city: string
  priceFrom: number
  priceTo: number
  launchDate: string          // 'Jun 2025'
  reraRegistered: boolean
  photos: number
  unitTypes: string[]
}

export interface ServiceTile {
  id: string
  title: string
  description: string
  iconName: string            // Lucide icon name
  ctaText: string
}

export interface TrustStat {
  id: string
  value: string
  label: string
  iconName: string
}

export interface CityLink {
  city: string
  propertyCount: string
  iconName: string
  international?: boolean     // true for Dubai, London
}
```

---

## Mock Data

**File:** `src/lib/data.ts`

### premiumProperties — 6 entries

```typescript
import { PremiumProperty, Agent, NewLaunch, ServiceTile, TrustStat, CityLink } from '@/types'

export const premiumProperties: PremiumProperty[] = [
  {
    id: 'sq-01',
    title: '4 BHK Penthouse — Bandra Waterfront',
    bhk: '4 BHK', propertyType: 'Penthouse',
    price: 35_000_000, pricePerSqft: 83_333,
    superArea: 4200, floor: 'Top Floor of 32 Floors',
    locality: 'Bandra West', city: 'Mumbai',
    listingSource: 'Builder', verified: true, reraRegistered: true,
    possessionStatus: 'Ready to Move', furnishingStatus: 'Furnished',
    photos: 32, postedDaysAgo: 1,
    rentalYield: 2.8, capitalAppreciation: 12.5,
    developerReputation: 'A+', mode: 'buy',
  },
  {
    id: 'sq-02',
    title: '3 BHK Luxury Apartment — Jubilee Enclave',
    bhk: '3 BHK', propertyType: 'Apartment',
    price: 12_000_000, pricePerSqft: 5_714,
    superArea: 2100, floor: '12th of 28 Floors',
    locality: 'Jubilee Hills', city: 'Hyderabad',
    listingSource: 'Builder', verified: true, reraRegistered: true,
    possessionStatus: 'Ready to Move', furnishingStatus: 'Semi-Furnished',
    photos: 24, postedDaysAgo: 3,
    rentalYield: 4.2, capitalAppreciation: 9.8,
    developerReputation: 'A', mode: 'buy',
  },
  {
    id: 'sq-03',
    title: '2 BHK Apartment — Direct Owner',
    bhk: '2 BHK', propertyType: 'Apartment',
    price: 8_500_000, pricePerSqft: 6_800,
    superArea: 1250, floor: '5th of 15 Floors',
    locality: 'Whitefield', city: 'Bangalore',
    listingSource: 'Owner', verified: true, reraRegistered: true,
    possessionStatus: 'Ready to Move', furnishingStatus: 'Unfurnished',
    photos: 12, postedDaysAgo: 6,
    rentalYield: 3.9, capitalAppreciation: 8.1,
    mode: 'buy',
  },
  {
    id: 'sq-04',
    title: 'Studio Apartment — Cyber Greens',
    bhk: 'Studio', propertyType: 'Apartment',
    price: 4_500_000, pricePerSqft: 8_182,
    superArea: 550, floor: '3rd of 20 Floors',
    locality: 'DLF Cyber City', city: 'Gurgaon',
    listingSource: 'Builder', verified: true, reraRegistered: false,
    possessionStatus: 'New Launch', furnishingStatus: 'Unfurnished',
    photos: 8, postedDaysAgo: 14,
    rentalYield: 5.2, capitalAppreciation: 11.0,
    developerReputation: 'A+', mode: 'buy',
  },
  {
    id: 'sq-05',
    title: '4 BHK Independent Villa',
    bhk: '4 BHK', propertyType: 'Villa',
    price: 22_000_000, pricePerSqft: 5_789,
    superArea: 3800, floor: 'Ground + 2 Floors',
    locality: 'Adyar', city: 'Chennai',
    listingSource: 'Agent', verified: true, reraRegistered: true,
    possessionStatus: 'Ready to Move', furnishingStatus: 'Semi-Furnished',
    photos: 20, postedDaysAgo: 4,
    rentalYield: 3.1, capitalAppreciation: 7.5,
    developerReputation: 'A', mode: 'buy',
  },
  {
    id: 'sq-06',
    title: '3 BHK Premium Apartment — Koregaon Heights',
    bhk: '3 BHK', propertyType: 'Apartment',
    price: 11_000_000, pricePerSqft: 5_946,
    superArea: 1850, floor: '7th of 18 Floors',
    locality: 'Koregaon Park', city: 'Pune',
    listingSource: 'Builder', verified: true, reraRegistered: true,
    possessionStatus: 'New Launch', furnishingStatus: 'Unfurnished',
    photos: 16, postedDaysAgo: 8,
    rentalYield: 4.5, capitalAppreciation: 10.2,
    developerReputation: 'A', mode: 'buy',
  },
]
```

**Category filter results:**
- `all` → 6 properties
- `luxury` (≥₹1 Cr = 10_000_000) → sq-01 (₹3.5 Cr), sq-02 (₹1.2 Cr), sq-05 (₹2.2 Cr), sq-06 (₹1.1 Cr) = 4
- `ready` → sq-01, sq-02, sq-03, sq-05 = 4
- `new-launch` → sq-04, sq-06 = 2
- `high-yield` (rentalYield ≥ 4.0) → sq-02 (4.2%), sq-04 (5.2%), sq-06 (4.5%) = 3

### agents — 3 entries

```typescript
export const agents: Agent[] = [
  {
    id: 'ag-01', name: 'Arjun Mehta',
    verified: true, rating: 4.8, reviewCount: 312,
    transactionsCompleted: 340,
    specializations: ['Luxury Apartments', 'NRI Services', 'Premium Villas'],
    languages: ['English', 'Hindi', 'Marathi'],
    city: 'Mumbai', yearsOfExperience: 11,
  },
  {
    id: 'ag-02', name: 'Priya Nair',
    verified: true, rating: 4.6, reviewCount: 198,
    transactionsCompleted: 280,
    specializations: ['Residential', 'Ready to Move', '2–3 BHK'],
    languages: ['English', 'Malayalam', 'Tamil'],
    city: 'Hyderabad', yearsOfExperience: 8,
  },
  {
    id: 'ag-03', name: 'Vikram Shah',
    verified: true, rating: 4.9, reviewCount: 427,
    transactionsCompleted: 500,
    specializations: ['Commercial Properties', 'Investment Portfolio', 'High Yield'],
    languages: ['English', 'Hindi', 'Gujarati'],
    city: 'Bangalore', yearsOfExperience: 15,
  },
]
```

### newLaunches — 3 entries

```typescript
export const newLaunches: NewLaunch[] = [
  {
    id: 'nl-01', projectName: 'Lodha Bellissimo Sky',
    builderName: 'Lodha Group',
    locality: 'Worli', city: 'Mumbai',
    priceFrom: 35_000_000, priceTo: 80_000_000,
    launchDate: 'Jun 2025',
    reraRegistered: true, photos: 28,
    unitTypes: ['3 BHK', '4 BHK', 'Penthouse'],
  },
  {
    id: 'nl-02', projectName: 'Prestige Primrose Hills',
    builderName: 'Prestige Group',
    locality: 'Kanakpura Road', city: 'Bangalore',
    priceFrom: 8_000_000, priceTo: 15_000_000,
    launchDate: 'Aug 2025',
    reraRegistered: true, photos: 18,
    unitTypes: ['2 BHK', '3 BHK'],
  },
  {
    id: 'nl-03', projectName: 'DLF The Arbour',
    builderName: 'DLF Limited',
    locality: 'Sector 63', city: 'Gurgaon',
    priceFrom: 12_000_000, priceTo: 20_000_000,
    launchDate: 'Oct 2025',
    reraRegistered: true, photos: 22,
    unitTypes: ['3 BHK', '4 BHK'],
  },
]
```

### services, trustStats, cityLinks

```typescript
export const services: ServiceTile[] = [
  { id: 'svc-01', title: 'Home Loans', description: 'Get pre-approved in 24 hours. Best rates from 15+ banks.', iconName: 'Briefcase', ctaText: 'Check Eligibility' },
  { id: 'svc-02', title: 'Legal Services', description: 'RERA experts for every transaction. Document verification.', iconName: 'Scale', ctaText: 'Get Legal Help' },
  { id: 'svc-03', title: 'Interior Design', description: 'Turn-key solutions for new homes. 500+ design experts.', iconName: 'PaintBucket', ctaText: 'Explore Designs' },
  { id: 'svc-04', title: 'NRI Services', description: 'Dedicated desk for international buyers. End-to-end support.', iconName: 'Globe', ctaText: 'Talk to Expert' },
]

export const trustStats: TrustStat[] = [
  { id: 'listings',  value: '2 Lakh+',  label: 'Curated Listings',     iconName: 'Building2' },
  { id: 'agents',    value: '15,000+',  label: 'Verified Agents',       iconName: 'Users' },
  { id: 'cities',    value: '50+',      label: 'Cities Covered',        iconName: 'MapPin' },
  { id: 'launches',  value: '800+',     label: 'Exclusive New Launches', iconName: 'Rocket' },
]

export const cityLinks: CityLink[] = [
  { city: 'Bangalore',  propertyCount: '85,400+ Properties',  iconName: 'MapPin' },
  { city: 'Mumbai',     propertyCount: '72,200+ Properties',  iconName: 'MapPin' },
  { city: 'Delhi NCR',  propertyCount: '61,800+ Properties',  iconName: 'MapPin' },
  { city: 'Hyderabad',  propertyCount: '48,300+ Properties',  iconName: 'MapPin' },
  { city: 'Pune',       propertyCount: '34,100+ Properties',  iconName: 'MapPin' },
  { city: 'Chennai',    propertyCount: '28,600+ Properties',  iconName: 'MapPin' },
  { city: 'Kolkata',    propertyCount: '19,400+ Properties',  iconName: 'MapPin' },
  { city: 'Ahmedabad',  propertyCount: '16,200+ Properties',  iconName: 'MapPin' },
  { city: 'Dubai',      propertyCount: '12,500+ Properties',  iconName: 'MapPin', international: true },
  { city: 'London',     propertyCount: '4,800+ Properties',   iconName: 'MapPin', international: true },
]
```

---

## Utility Functions

**File:** `src/lib/formatPrice.ts` — identical to bw_realestate_01.

**File:** `src/lib/formatYield.ts`
```typescript
export function formatYield(percent: number): string {
  return `${percent.toFixed(1)}% p.a.`
}
// formatYield(4.2) → '4.2% p.a.'
// formatYield(2.8) → '2.8% p.a.'
```

**File:** `src/lib/filterByCategory.ts`
```typescript
import { PremiumProperty, PropertyCategory } from '@/types'

export function filterByCategory(
  properties: PremiumProperty[],
  category: PropertyCategory
): PremiumProperty[] {
  if (category === 'all')        return properties
  if (category === 'luxury')     return properties.filter(p => p.price >= 10_000_000)
  if (category === 'ready')      return properties.filter(p => p.possessionStatus === 'Ready to Move')
  if (category === 'new-launch') return properties.filter(p => p.possessionStatus === 'New Launch')
  if (category === 'high-yield') return properties.filter(p => p.rentalYield >= 4.0)
  return properties
}
```

---

## Component Map

| Component | Type | Client? | Key Props |
|-----------|------|---------|-----------|
| `SiteNav` | layout | Yes | Scroll shadow |
| `Footer` | layout | No | 5-column dark |
| `HeroSection` | home | No | Static — search inputs are decorative |
| `CategoryFilter` | home | Yes | `properties`, manages filter state + renders `PropertyGrid` |
| `PropertyGrid` | home | No | `properties: PremiumProperty[]` |
| `PremiumPropertyCard` | home | No | `property: PremiumProperty` |
| `AgentDirectory` | home | No | `agents: Agent[]` |
| `AgentCard` | home | No | `agent: Agent` |
| `NewLaunches` | home | No | `launches: NewLaunch[]` |
| `NewLaunchCard` | home | No | `launch: NewLaunch` |
| `Services` | home | No | `tiles: ServiceTile[]` |
| `ServiceTile` | home | No | `tile: ServiceTile` |
| `CityLinks` | home | No | `cities: CityLink[]` |
| `TrustBar` | home | No | `stats: TrustStat[]` |
| `Button` | ui | No | `variant: 'teal'|'gold'|'outlineTeal'` |
| `SqVerifiedBadge` | ui | No | No props — TEAL text |
| `ReraBadge` | ui | No | No props — green text + border |
| `YieldBadge` | ui | No | `yield: number` — GOLD bg, dark text |
| `ListingSourcePill` | ui | No | `source: ListingSource` |

---

## Page Assembly (`src/app/page.tsx`)

```tsx
import SiteNav from '@/components/layout/SiteNav'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/home/HeroSection'
import CategoryFilter from '@/components/home/CategoryFilter'
import AgentDirectory from '@/components/home/AgentDirectory'
import NewLaunches from '@/components/home/NewLaunches'
import Services from '@/components/home/Services'
import CityLinks from '@/components/home/CityLinks'
import TrustBar from '@/components/home/TrustBar'
import { premiumProperties, agents, newLaunches, services, trustStats, cityLinks } from '@/lib/data'

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <HeroSection />
        <CategoryFilter properties={premiumProperties} />
        <AgentDirectory agents={agents} />
        <NewLaunches launches={newLaunches} />
        <Services tiles={services} />
        <CityLinks cities={cityLinks} />
        <TrustBar stats={trustStats} />
      </main>
      <Footer />
    </>
  )
}
```

**Note:** `CategoryFilter` is `'use client'` and manages its own filter state + renders `PropertyGrid` internally — it receives all properties and is responsible for both the filter UI and the filtered results.
