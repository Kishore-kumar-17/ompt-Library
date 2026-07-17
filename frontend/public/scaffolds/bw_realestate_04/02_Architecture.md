# 02 — Architecture
## Modern Indian Rental Discovery · bw_realestate_04

---

## TypeScript Types

```typescript
// src/types/index.ts

export type BHKType = '1 BHK' | '2 BHK' | '3 BHK' | '4 BHK' | '4+ BHK'
export type FurnishingStatus = 'Fully Furnished' | 'Semi-Furnished' | 'Unfurnished'
export type RentalPropertyType = 'Apartment' | 'Independent House' | 'Villa' | 'PG/Co-living'
export type TenantPreference = 'Family' | 'Bachelor' | 'Any'

export interface OwnerProfile {
  id: string
  name: string
  verified: boolean
  responseTime: string      // e.g. 'Within 1 hour'
  propertiesListed: number
}

export interface RentalProperty {
  id: string
  title: string
  bhk: BHKType
  propertyType: RentalPropertyType
  monthlyRent: number       // display via formatPrice() → '₹28,000/mo'
  deposit: number           // display via toLocaleString('en-IN') — NOT formatPrice
  superArea: number
  carpetArea: number
  floor: string             // e.g. '3rd of 12'
  locality: string
  city: string
  verified: boolean
  availableFrom: string     // e.g. 'Immediate' or 'Jun 2025'
  furnishingStatus: FurnishingStatus
  tenantPreference: TenantPreference
  petFriendly: boolean
  photos: number
  postedDaysAgo: number
  amenities: string[]
  owner: OwnerProfile
}

export interface RentalFilterState {
  bhk: BHKType[]
  furnishing: FurnishingStatus | ''
  maxRent: number | null
  petFriendly: boolean | null
  tenantPreference: TenantPreference | ''
}

export interface ServiceTile {
  id: string
  icon: string
  title: string
  description: string
}

export interface TrustStat {
  id: string
  icon: string
  value: string
  label: string
}

export interface CityLink {
  city: string
  slug: string
  count: string
}
```

---

## Mock Data

```typescript
// src/data/rentalProperties.ts
import type { RentalProperty } from '@/types'

export const RENTAL_PROPERTIES: RentalProperty[] = [
  {
    id: 'nb-01',
    title: '2 BHK Apartment in Koramangala',
    bhk: '2 BHK',
    propertyType: 'Apartment',
    monthlyRent: 28000,
    deposit: 56000,
    superArea: 1100,
    carpetArea: 920,
    floor: '4th of 8',
    locality: 'Koramangala',
    city: 'Bangalore',
    verified: true,
    availableFrom: 'Immediate',
    furnishingStatus: 'Fully Furnished',
    tenantPreference: 'Any',
    petFriendly: true,
    photos: 14,
    postedDaysAgo: 2,
    amenities: ['Gym', 'Parking', 'Security', 'Power Backup'],
    owner: { id: 'own-01', name: 'Rajesh Sharma', verified: true, responseTime: 'Within 1 hour', propertiesListed: 2 },
  },
  {
    id: 'nb-02',
    title: '1 BHK in Indiranagar — Pet Friendly',
    bhk: '1 BHK',
    propertyType: 'Apartment',
    monthlyRent: 18000,
    deposit: 36000,
    superArea: 650,
    carpetArea: 540,
    floor: '2nd of 6',
    locality: 'Indiranagar',
    city: 'Bangalore',
    verified: true,
    availableFrom: 'Jun 2025',
    furnishingStatus: 'Semi-Furnished',
    tenantPreference: 'Bachelor',
    petFriendly: true,
    photos: 10,
    postedDaysAgo: 5,
    amenities: ['Parking', 'Security'],
    owner: { id: 'own-02', name: 'Priya Nair', verified: true, responseTime: 'Within 3 hours', propertiesListed: 1 },
  },
  {
    id: 'nb-03',
    title: '3 BHK Independent House in Whitefield',
    bhk: '3 BHK',
    propertyType: 'Independent House',
    monthlyRent: 42000,
    deposit: 126000,
    superArea: 1800,
    carpetArea: 1500,
    floor: 'Ground',
    locality: 'Whitefield',
    city: 'Bangalore',
    verified: true,
    availableFrom: 'Jul 2025',
    furnishingStatus: 'Semi-Furnished',
    tenantPreference: 'Family',
    petFriendly: false,
    photos: 18,
    postedDaysAgo: 1,
    amenities: ['Garden', 'Parking', 'Security', 'Power Backup'],
    owner: { id: 'own-03', name: 'Anand Krishnan', verified: true, responseTime: 'Within 2 hours', propertiesListed: 3 },
  },
  {
    id: 'nb-04',
    title: '2 BHK Apartment in Bandra West',
    bhk: '2 BHK',
    propertyType: 'Apartment',
    monthlyRent: 65000,
    deposit: 195000,
    superArea: 950,
    carpetArea: 800,
    floor: '7th of 14',
    locality: 'Bandra West',
    city: 'Mumbai',
    verified: true,
    availableFrom: 'Immediate',
    furnishingStatus: 'Fully Furnished',
    tenantPreference: 'Family',
    petFriendly: false,
    photos: 20,
    postedDaysAgo: 3,
    amenities: ['Gym', 'Rooftop', 'Parking', 'Security', 'Power Backup'],
    owner: { id: 'own-04', name: 'Kavita Mehta', verified: true, responseTime: 'Within 1 hour', propertiesListed: 2 },
  },
  {
    id: 'nb-05',
    title: '1 BHK Studio in Andheri East',
    bhk: '1 BHK',
    propertyType: 'Apartment',
    monthlyRent: 22000,
    deposit: 44000,
    superArea: 500,
    carpetArea: 420,
    floor: '5th of 10',
    locality: 'Andheri East',
    city: 'Mumbai',
    verified: false,
    availableFrom: 'Immediate',
    furnishingStatus: 'Fully Furnished',
    tenantPreference: 'Bachelor',
    petFriendly: true,
    photos: 8,
    postedDaysAgo: 7,
    amenities: ['Parking', 'Security'],
    owner: { id: 'own-05', name: 'Suresh Patil', verified: false, responseTime: 'Within 6 hours', propertiesListed: 1 },
  },
  {
    id: 'nb-06',
    title: '3 BHK Apartment in Jubilee Hills',
    bhk: '3 BHK',
    propertyType: 'Apartment',
    monthlyRent: 38000,
    deposit: 114000,
    superArea: 1600,
    carpetArea: 1350,
    floor: '6th of 12',
    locality: 'Jubilee Hills',
    city: 'Hyderabad',
    verified: true,
    availableFrom: 'Jun 2025',
    furnishingStatus: 'Unfurnished',
    tenantPreference: 'Family',
    petFriendly: false,
    photos: 16,
    postedDaysAgo: 4,
    amenities: ['Gym', 'Pool', 'Parking', 'Security', 'Power Backup', 'Clubhouse'],
    owner: { id: 'own-06', name: 'Ravi Reddy', verified: true, responseTime: 'Within 2 hours', propertiesListed: 2 },
  },
  {
    id: 'nb-07',
    title: '2 BHK in Koregaon Park — Fully Furnished',
    bhk: '2 BHK',
    propertyType: 'Apartment',
    monthlyRent: 32000,
    deposit: 64000,
    superArea: 1050,
    carpetArea: 880,
    floor: '3rd of 7',
    locality: 'Koregaon Park',
    city: 'Pune',
    verified: true,
    availableFrom: 'Immediate',
    furnishingStatus: 'Fully Furnished',
    tenantPreference: 'Any',
    petFriendly: true,
    photos: 12,
    postedDaysAgo: 2,
    amenities: ['Gym', 'Parking', 'Security', 'Power Backup'],
    owner: { id: 'own-07', name: 'Meera Joshi', verified: true, responseTime: 'Within 1 hour', propertiesListed: 1 },
  },
  {
    id: 'nb-08',
    title: '4 BHK Independent Villa in DLF Phase 2',
    bhk: '4 BHK',
    propertyType: 'Villa',
    monthlyRent: 85000,
    deposit: 255000,
    superArea: 3200,
    carpetArea: 2700,
    floor: 'Ground + 1',
    locality: 'DLF Phase 2',
    city: 'Delhi NCR',
    verified: false,
    availableFrom: 'Aug 2025',
    furnishingStatus: 'Unfurnished',
    tenantPreference: 'Family',
    petFriendly: false,
    photos: 22,
    postedDaysAgo: 1,
    amenities: ['Garden', 'Parking', 'Security', 'Power Backup', 'Servant Quarter'],
    owner: { id: 'own-08', name: 'Vikram Singh', verified: false, responseTime: 'Within 24 hours', propertiesListed: 1 },
  },
]
```

---

## Filter Results (for acceptance criteria)

Using `filterRentals(RENTAL_PROPERTIES, filters)`:

| Filter condition | Matching IDs | Count |
|-----------------|--------------|-------|
| `bhk: ['2 BHK']` | nb-01, nb-04, nb-07 | 3 |
| `furnishing: 'Fully Furnished'` | nb-01, nb-04, nb-05, nb-07 | 4 |
| `maxRent: 30000` | nb-01, nb-02, nb-07 | 3 |
| `petFriendly: true` | nb-01, nb-02, nb-05, nb-07 | 4 |
| `tenantPreference: 'Family'` | nb-03, nb-04, nb-06, nb-08 + nb-01(Any), nb-07(Any) | 6 |
| `bhk: ['1 BHK'], petFriendly: true` | nb-02, nb-05 | 2 |

---

## Utility Functions

```typescript
// src/lib/formatPrice.ts
export function formatPrice(amount: number): string {
  if (amount >= 10_000_000) return `₹${(amount / 10_000_000).toFixed(2)} Cr/mo`
  if (amount >= 100_000)    return `₹${(amount / 100_000).toFixed(2)} L/mo`
  return `₹${amount.toLocaleString('en-IN')}/mo`
}

// src/lib/calculateBrokerSavings.ts
export function calculateBrokerSavings(monthlyRent: number): number {
  return monthlyRent * 2
}

// src/lib/filterRentals.ts
import type { RentalProperty, RentalFilterState } from '@/types'

export function filterRentals(
  properties: RentalProperty[],
  filters: RentalFilterState
): RentalProperty[] {
  return properties.filter(p => {
    if (filters.bhk.length > 0 && !filters.bhk.includes(p.bhk)) return false
    if (filters.furnishing && p.furnishingStatus !== filters.furnishing) return false
    if (filters.maxRent !== null && p.monthlyRent > filters.maxRent) return false
    if (filters.petFriendly === true && !p.petFriendly) return false
    if (
      filters.tenantPreference &&
      p.tenantPreference !== filters.tenantPreference &&
      p.tenantPreference !== 'Any'
    ) return false
    return true
  })
}
```

---

## Component Map

```
src/
  app/
    layout.tsx              ← Plus Jakarta Sans, --font-sans variable
    page.tsx                ← Server component, imports all sections
    globals.css             ← 8 tokens + .sr-only + prefers-reduced-motion
  components/
    home/
      HeroSection.tsx       ← Static, gradient bg, BrokerSavingsStrip embedded
      BrokerSavingsStrip.tsx ← Purple full-width strip (static or child of Hero)
      RentalFilterBar.tsx   ← 'use client', RentalFilterState, useMemo, renders PropertyGrid
      PropertyGrid.tsx      ← Server component, receives filtered array
      RentalPropertyCard.tsx ← Static, ZeroBrokerageBadge, OwnerProfileSnippet, PetFriendlyBadge
      BrokerSavingsWidget.tsx ← 'use client', interactive rent input
      TrustBar.tsx          ← Static, dark bg, Framer Motion stagger
    ui/
      Button.tsx            ← 'purple' | 'outlinePurple' | 'ghost' variants
      ZeroBrokerageBadge.tsx ← Green border + text
      OwnerVerifiedBadge.tsx ← Green check + text
      PetFriendlyBadge.tsx  ← Purple PawPrint + text
      ReraBadge.tsx         ← Same as prior builds
  data/
    rentalProperties.ts
    services.ts
    trustStats.ts
    cityLinks.ts
  lib/
    formatPrice.ts
    calculateBrokerSavings.ts
    filterRentals.ts
  types/
    index.ts
```

---

## Initial RentalFilterState

```typescript
const INITIAL_FILTER_STATE: RentalFilterState = {
  bhk: [],
  furnishing: '',
  maxRent: null,
  petFriendly: null,
  tenantPreference: '',
}
```

All dimensions start empty/null. When all are empty, `filterRentals` returns all 8 properties.
