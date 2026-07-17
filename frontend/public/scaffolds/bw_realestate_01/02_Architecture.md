# 02 — Architecture
## Indian Property Listing Portal · bw_realestate_01

---

## TypeScript Types

**File:** `src/types/index.ts`

```typescript
export type SearchMode = 'buy' | 'rent' | 'pg' | 'commercial' | 'plot'
export type BHKType = 'Studio' | '1 BHK' | '2 BHK' | '3 BHK' | '4 BHK' | '4+ BHK'
export type PropertyType = 'Apartment' | 'Independent House' | 'Villa' | 'Plot' | 'PG'
export type ListingSource = 'Owner' | 'Builder' | 'Agent'
export type PossessionStatus = 'Ready to Move' | 'Under Construction' | 'New Launch'
export type FurnishingStatus = 'Furnished' | 'Semi-Furnished' | 'Unfurnished'
export type CommercialType = 'Office Space' | 'Shop' | 'Warehouse' | 'Showroom'
export type PreferredBy = 'Boys' | 'Girls' | 'Any'

export interface Property {
  id: string
  title: string
  bhk: BHKType
  propertyType: PropertyType
  price: number            // raw INR — ALWAYS display via formatPrice()
  pricePerSqft: number     // ₹ per sqft
  superArea: number        // sqft
  carpetArea: number       // sqft
  floor: string            // "8th of 22 Floors" | "Ground + 1"
  locality: string
  city: string
  listingSource: ListingSource
  verified: boolean
  reraRegistered: boolean
  possessionStatus: PossessionStatus
  furnishingStatus: FurnishingStatus
  photos: number
  postedDaysAgo: number
  amenities: string[]
  projectName?: string     // builder listings only
  mode: SearchMode         // 'buy' or 'rent' for residential
}

export interface FeaturedProject {
  id: string
  projectName: string
  builderName: string
  locality: string
  city: string
  priceFrom: number        // raw INR
  priceTo: number          // raw INR
  possessionStatus: PossessionStatus
  reraRegistered: boolean
  photos: number
  unitTypes: string[]      // ["2 BHK", "3 BHK"]
}

export interface TrustStat {
  id: string
  value: string
  label: string
  iconName: string
}

export interface CityLink {
  city: string
  propertyCount: string   // "12,400+ Properties"
  iconName: string
}

export interface SearchFilters {
  bhk: BHKType[]
  possession: PossessionStatus | ''
  propertyType: PropertyType | ''
  furnished: FurnishingStatus | ''
}
```

---

## Mock Data

**File:** `src/lib/data.ts`

### properties — 8 entries

```typescript
import { Property, FeaturedProject, TrustStat, CityLink } from '@/types'

export const properties: Property[] = [
  {
    id: 'prop-01',
    title: '3 BHK Apartment in Brigade Orchards',
    bhk: '3 BHK', propertyType: 'Apartment',
    price: 12_000_000, pricePerSqft: 7500,
    superArea: 1600, carpetArea: 1200,
    floor: '8th of 22 Floors',
    locality: 'Devanahalli', city: 'Bangalore',
    listingSource: 'Builder', verified: true, reraRegistered: true,
    possessionStatus: 'Ready to Move', furnishingStatus: 'Semi-Furnished',
    photos: 18, postedDaysAgo: 2,
    amenities: ['Gym', 'Swimming Pool', 'Clubhouse', 'Children\'s Play Area'],
    projectName: 'Brigade Orchards', mode: 'buy',
  },
  {
    id: 'prop-02',
    title: '2 BHK Apartment — Direct from Owner',
    bhk: '2 BHK', propertyType: 'Apartment',
    price: 4_500_000, pricePerSqft: 5625,
    superArea: 800, carpetArea: 640,
    floor: '3rd of 10 Floors',
    locality: 'Electronic City', city: 'Bangalore',
    listingSource: 'Owner', verified: true, reraRegistered: true,
    possessionStatus: 'Ready to Move', furnishingStatus: 'Unfurnished',
    photos: 9, postedDaysAgo: 5,
    amenities: ['Covered Parking', '24x7 Security', 'Power Backup'],
    mode: 'buy',
  },
  {
    id: 'prop-03',
    title: '4 BHK Villa in Bandra West',
    bhk: '4 BHK', propertyType: 'Villa',
    price: 35_000_000, pricePerSqft: 35000,
    superArea: 1000, carpetArea: 850,
    floor: 'Ground of 3 Floors',
    locality: 'Bandra West', city: 'Mumbai',
    listingSource: 'Agent', verified: true, reraRegistered: true,
    possessionStatus: 'Ready to Move', furnishingStatus: 'Furnished',
    photos: 24, postedDaysAgo: 1,
    amenities: ['Private Terrace', 'Garden', 'Parking × 3'],
    mode: 'buy',
  },
  {
    id: 'prop-04',
    title: '1 BHK Apartment — New Launch',
    bhk: '1 BHK', propertyType: 'Apartment',
    price: 2_500_000, pricePerSqft: 4167,
    superArea: 600, carpetArea: 480,
    floor: '2nd of 18 Floors',
    locality: 'Sector 56', city: 'Gurgaon',
    listingSource: 'Builder', verified: false, reraRegistered: false,
    possessionStatus: 'New Launch', furnishingStatus: 'Unfurnished',
    photos: 5, postedDaysAgo: 14,
    amenities: ['Lift', 'Covered Parking'],
    projectName: 'Emerald Heights', mode: 'buy',
  },
  {
    id: 'prop-05',
    title: '3 BHK Independent House',
    bhk: '3 BHK', propertyType: 'Independent House',
    price: 8_500_000, pricePerSqft: 4250,
    superArea: 2000, carpetArea: 1700,
    floor: 'Ground + 1',
    locality: 'Kondapur', city: 'Hyderabad',
    listingSource: 'Owner', verified: true, reraRegistered: true,
    possessionStatus: 'Ready to Move', furnishingStatus: 'Semi-Furnished',
    photos: 15, postedDaysAgo: 3,
    amenities: ['Garden', 'Covered Parking', 'Generator', 'Bore Well'],
    mode: 'buy',
  },
  {
    id: 'prop-06',
    title: '2 BHK — Under Construction',
    bhk: '2 BHK', propertyType: 'Apartment',
    price: 6_800_000, pricePerSqft: 8500,
    superArea: 800, carpetArea: 650,
    floor: '5th of 12 Floors',
    locality: 'Viman Nagar', city: 'Pune',
    listingSource: 'Builder', verified: true, reraRegistered: true,
    possessionStatus: 'Under Construction', furnishingStatus: 'Unfurnished',
    photos: 11, postedDaysAgo: 7,
    amenities: ['Gym', '24x7 Security', 'Lift', 'Rainwater Harvesting'],
    projectName: 'Paranjape Blue Ridge', mode: 'buy',
  },
  {
    id: 'prop-07',
    title: '2 BHK Furnished Flat for Rent',
    bhk: '2 BHK', propertyType: 'Apartment',
    price: 28_000, pricePerSqft: 35,
    superArea: 800, carpetArea: 660,
    floor: '4th of 8 Floors',
    locality: 'Koramangala', city: 'Bangalore',
    listingSource: 'Owner', verified: true, reraRegistered: false,
    possessionStatus: 'Ready to Move', furnishingStatus: 'Furnished',
    photos: 12, postedDaysAgo: 2,
    amenities: ['WiFi', 'AC in all rooms', 'Covered Parking'],
    mode: 'rent',
  },
  {
    id: 'prop-08',
    title: '3 BHK Apartment — Sarjapur Road',
    bhk: '3 BHK', propertyType: 'Apartment',
    price: 9_500_000, pricePerSqft: 5278,
    superArea: 1800, carpetArea: 1440,
    floor: '10th of 28 Floors',
    locality: 'Sarjapur Road', city: 'Bangalore',
    listingSource: 'Agent', verified: true, reraRegistered: true,
    possessionStatus: 'Under Construction', furnishingStatus: 'Unfurnished',
    photos: 8, postedDaysAgo: 10,
    amenities: ['Swimming Pool', 'Gym', 'Clubhouse', 'Tennis Court'],
    mode: 'buy',
  },
]
```

### featuredProjects — 3 entries

```typescript
export const featuredProjects: FeaturedProject[] = [
  {
    id: 'proj-01', projectName: 'Prestige Lakeside Habitat',
    builderName: 'Prestige Group',
    locality: 'Whitefield', city: 'Bangalore',
    priceFrom: 7_500_000, priceTo: 14_000_000,
    possessionStatus: 'Under Construction',
    reraRegistered: true, photos: 32,
    unitTypes: ['2 BHK', '3 BHK', '4 BHK'],
  },
  {
    id: 'proj-02', projectName: 'Godrej Nurture',
    builderName: 'Godrej Properties',
    locality: 'Electronic City', city: 'Bangalore',
    priceFrom: 4_200_000, priceTo: 6_800_000,
    possessionStatus: 'New Launch',
    reraRegistered: true, photos: 24,
    unitTypes: ['2 BHK', '3 BHK'],
  },
  {
    id: 'proj-03', projectName: 'Sobha Dream Acres',
    builderName: 'Sobha Limited',
    locality: 'Panathur', city: 'Bangalore',
    priceFrom: 5_500_000, priceTo: 9_000_000,
    possessionStatus: 'Ready to Move',
    reraRegistered: true, photos: 18,
    unitTypes: ['1 BHK', '2 BHK'],
  },
]
```

### trustStats — 4 entries

```typescript
export const trustStats: TrustStat[] = [
  { id: 'listings', value: '10 Lakh+', label: 'Active Listings', iconName: 'Building2' },
  { id: 'verified', value: '4 Lakh+', label: 'Verified Properties', iconName: 'ShieldCheck' },
  { id: 'owner', value: '2 Lakh+', label: 'Owner Properties', iconName: 'User' },
  { id: 'rera', value: '1.5 Lakh+', label: 'RERA Registered', iconName: 'BadgeCheck' },
]
```

### cityLinks — 8 entries

```typescript
export const cityLinks: CityLink[] = [
  { city: 'Bangalore',  propertyCount: '2,14,500+ Properties', iconName: 'MapPin' },
  { city: 'Mumbai',     propertyCount: '1,89,200+ Properties', iconName: 'MapPin' },
  { city: 'Delhi NCR',  propertyCount: '1,54,800+ Properties', iconName: 'MapPin' },
  { city: 'Hyderabad',  propertyCount: '98,400+ Properties',   iconName: 'MapPin' },
  { city: 'Pune',       propertyCount: '87,300+ Properties',   iconName: 'MapPin' },
  { city: 'Chennai',    propertyCount: '64,200+ Properties',   iconName: 'MapPin' },
  { city: 'Kolkata',    propertyCount: '42,100+ Properties',   iconName: 'MapPin' },
  { city: 'Ahmedabad',  propertyCount: '38,500+ Properties',   iconName: 'MapPin' },
]
```

---

## Utility Functions

**File:** `src/lib/formatPrice.ts`

```typescript
export function formatPrice(amount: number): string {
  if (amount >= 10_000_000) {
    const cr = amount / 10_000_000
    return `₹${cr % 1 === 0 ? cr.toFixed(0) : cr.toFixed(2)} Cr`
  }
  if (amount >= 100_000) {
    const l = amount / 100_000
    return `₹${l % 1 === 0 ? l.toFixed(0) : l.toFixed(1)} L`
  }
  return `₹${amount.toLocaleString('en-IN')}/mo`
}

export function formatPriceRange(from: number, to: number): string {
  return `${formatPrice(from)} – ${formatPrice(to)}`
}
```

**File:** `src/lib/filterProperties.ts`

```typescript
import { Property, BHKType, PropertyType, PossessionStatus, FurnishingStatus } from '@/types'

export interface FilterState {
  bhk: BHKType[]
  possession: PossessionStatus | ''
  propertyType: PropertyType | ''
  furnished: FurnishingStatus | ''
}

export function filterProperties(
  properties: Property[],
  filters: FilterState
): Property[] {
  return properties.filter(p => {
    if (filters.bhk.length > 0 && !filters.bhk.includes(p.bhk)) return false
    if (filters.possession && p.possessionStatus !== filters.possession) return false
    if (filters.propertyType && p.propertyType !== filters.propertyType) return false
    if (filters.furnished && p.furnishingStatus !== filters.furnished) return false
    return true
  })
}
```

---

## Component Map

| Component | Type | Client? | Key Props / Data |
|-----------|------|---------|-----------------|
| `SiteNav` | layout | No | Logo + nav links + "Post Property Free" |
| `Footer` | layout | No | Dark 4-column nav |
| `HeroSearchWidget` | home | Yes | Manages mode + all search field state |
| `FilterBar` | home | Yes | `properties: Property[]`, manages filter state |
| `PropertyGrid` | home | Yes | Receives `properties`, renders filtered grid |
| `PropertyCard` | home | No | `property: Property` |
| `VerifiedBadge` | ui | No | No props — renders if parent calls it |
| `ReraBadge` | ui | No | No props |
| `ListingSourcePill` | ui | No | `source: ListingSource` |
| `FeaturedProjects` | home | No | `projects: FeaturedProject[]` |
| `TrustBar` | home | No | `stats: TrustStat[]` |
| `CityLinks` | home | No | `cities: CityLink[]` |
| `Button` | ui | No | `variant`, `size`, `href`, `onClick`, `fullWidth` |

---

## Page Assembly (src/app/page.tsx)

```tsx
import SiteNav from '@/components/layout/SiteNav'
import HeroSearchWidget from '@/components/home/HeroSearchWidget'
import PropertyGrid from '@/components/home/PropertyGrid'
import FeaturedProjects from '@/components/home/FeaturedProjects'
import TrustBar from '@/components/home/TrustBar'
import CityLinks from '@/components/home/CityLinks'
import Footer from '@/components/layout/Footer'
import {
  properties, featuredProjects, trustStats, cityLinks
} from '@/lib/data'

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <HeroSearchWidget />
        <PropertyGrid properties={properties} />
        <FeaturedProjects projects={featuredProjects} />
        <TrustBar stats={trustStats} />
        <CityLinks cities={cityLinks} />
      </main>
      <Footer />
    </>
  )
}
```
