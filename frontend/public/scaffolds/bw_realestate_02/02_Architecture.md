# 02 — Architecture
## Indian Property Detail Page · bw_realestate_02

---

## TypeScript Types

**File:** `src/types/index.ts`

```typescript
export type TabSection = 'overview' | 'floorplan' | 'amenities' | 'locality' | 'pricetrend'
export type ListingSource = 'Owner' | 'Builder' | 'Agent'
export type BHKType = 'Studio' | '1 BHK' | '2 BHK' | '3 BHK' | '4 BHK' | '4+ BHK'
export type PossessionStatus = 'Ready to Move' | 'Under Construction' | 'New Launch'
export type FurnishingStatus = 'Furnished' | 'Semi-Furnished' | 'Unfurnished'
export type Facing = 'East' | 'West' | 'North' | 'South'
export type PropertyAge = 'New Construction' | '0–5 Years' | '5–10 Years' | '10+ Years'
export type PlaceCategory = 'school' | 'hospital' | 'metro' | 'mall' | 'restaurant'

export interface PropertyDetail {
  id: string
  title: string
  bhk: BHKType
  price: number               // raw INR — always via formatPrice()
  pricePerSqft: number
  superArea: number           // sqft
  carpetArea: number          // sqft
  floor: string               // '8th of 22 Floors'
  totalFloors: number
  facing: Facing
  age: PropertyAge
  locality: string
  city: string
  listingSource: ListingSource
  verified: boolean
  reraNumber?: string
  reraExpiryDate?: string
  reraAuthority?: string
  possessionStatus: PossessionStatus
  furnishingStatus: FurnishingStatus
  photos: number
  postedDaysAgo: number
  description: string
  amenities: AmenityGroup[]
  floorPlans: FloorPlan[]
  localityInsights: LocalityInsights
  priceTrends: PriceTrendPoint[]
}

export interface AmenityGroup {
  category: string            // 'Fitness' | 'Recreation' | 'Security' | 'Convenience'
  items: string[]
}

export interface FloorPlan {
  bhk: string                 // '2 BHK' | '3 BHK' | '4 BHK'
  superArea: number           // sqft
  carpetArea: number          // sqft
}

export interface LocalityInsights {
  walkScore: number           // 0–100
  transitScore: number        // 0–100
  nearbyPlaces: NearbyPlace[]
}

export interface NearbyPlace {
  name: string
  category: PlaceCategory
  distance: string            // '1.2 km'
}

export interface PriceTrendPoint {
  month: string               // 'Nov 2024'
  pricePerSqft: number
}

export interface SimilarProperty {
  id: string
  title: string
  price: number
  bhk: BHKType
  locality: string
  listingSource: ListingSource
  photos: number
  superArea: number
}

export interface EMIInputs {
  loanAmount: number
  annualRate: number          // percentage, e.g. 8.5
  tenureYears: number
}
```

---

## Mock Data

**File:** `src/lib/data.ts`

### propertyDetail — 1 entry

```typescript
import { PropertyDetail, SimilarProperty } from '@/types'

export const propertyDetail: PropertyDetail = {
  id: 'prop-wb-01',
  title: '3 BHK Apartment in Brigade Cornerstone Utopia',
  bhk: '3 BHK',
  price: 12_000_000,          // ₹1.20 Cr — formatPrice() → '₹1.20 Cr'
  pricePerSqft: 7_500,
  superArea: 1600,
  carpetArea: 1200,
  floor: '8th of 22 Floors',
  totalFloors: 22,
  facing: 'East',
  age: '0–5 Years',
  locality: 'Whitefield',
  city: 'Bangalore',
  listingSource: 'Builder',
  verified: true,
  reraNumber: 'PRM/KA/RERA/1251/446/PR/171018/002',
  reraExpiryDate: '31 Dec 2026',
  reraAuthority: 'KRERA',
  possessionStatus: 'Ready to Move',
  furnishingStatus: 'Semi-Furnished',
  photos: 18,
  postedDaysAgo: 3,
  description: 'A spacious 3 BHK apartment in the award-winning Brigade Cornerstone Utopia township. Located on the 8th floor with unobstructed east-facing views. The unit features vitrified flooring, modular kitchen, and anti-skid tiles in bathrooms. The township offers over 70 world-class amenities across 50+ acres. Well-connected to ITPL and Whitefield Metro.',
  amenities: [
    {
      category: 'Fitness',
      items: ['Gym', 'Swimming Pool', 'Yoga Deck', 'Jogging Track', 'Badminton Court'],
    },
    {
      category: 'Recreation',
      items: ['Clubhouse', "Children's Play Area", 'Amphitheatre', 'Community Hall', 'Library'],
    },
    {
      category: 'Security',
      items: ['24×7 Security', 'CCTV Surveillance', 'Intercom', 'Gated Community', 'Fire Safety'],
    },
    {
      category: 'Convenience',
      items: ['Power Backup', 'Lift', 'Covered Parking', 'Rainwater Harvesting', 'Waste Management'],
    },
  ],
  floorPlans: [
    { bhk: '2 BHK', superArea: 1100, carpetArea: 880 },
    { bhk: '3 BHK', superArea: 1600, carpetArea: 1200 },
    { bhk: '4 BHK', superArea: 2200, carpetArea: 1650 },
  ],
  localityInsights: {
    walkScore: 72,
    transitScore: 85,
    nearbyPlaces: [
      { name: 'The International School Bangalore (TISB)', category: 'school',    distance: '0.8 km'  },
      { name: 'Apollo Clinic Whitefield',                   category: 'hospital',  distance: '1.2 km'  },
      { name: 'Whitefield Metro Station',                   category: 'metro',     distance: '1.5 km'  },
      { name: 'VR Bengaluru Mall',                          category: 'mall',      distance: '2.1 km'  },
      { name: 'Olive Garden Restaurant',                    category: 'restaurant', distance: '0.4 km' },
    ],
  },
  priceTrends: [
    { month: 'Nov 2024', pricePerSqft: 7_200 },
    { month: 'Dec 2024', pricePerSqft: 7_250 },
    { month: 'Jan 2025', pricePerSqft: 7_300 },
    { month: 'Feb 2025', pricePerSqft: 7_380 },
    { month: 'Mar 2025', pricePerSqft: 7_440 },
    { month: 'Apr 2025', pricePerSqft: 7_500 },
  ],
}
```

### similarProperties — 3 entries

```typescript
export const similarProperties: SimilarProperty[] = [
  {
    id: 'sim-01',
    title: '3 BHK Apartment — Prestige Shantiniketan',
    price: 13_500_000,
    bhk: '3 BHK',
    locality: 'Whitefield',
    listingSource: 'Builder',
    photos: 22,
    superArea: 1750,
  },
  {
    id: 'sim-02',
    title: '3 BHK Independent House — Kadugodi',
    price: 9_500_000,
    bhk: '3 BHK',
    locality: 'Kadugodi',
    listingSource: 'Owner',
    photos: 14,
    superArea: 1800,
  },
  {
    id: 'sim-03',
    title: '4 BHK Apartment — Varthur Road',
    price: 16_000_000,
    bhk: '4 BHK',
    locality: 'Varthur Road',
    listingSource: 'Agent',
    photos: 28,
    superArea: 2100,
  },
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

**File:** `src/lib/calculateEMI.ts`

```typescript
/**
 * Calculates monthly EMI using the standard formula.
 * @param principal - Loan amount in INR
 * @param annualRate - Annual interest rate as percentage (e.g. 8.5 for 8.5%)
 * @param years - Loan tenure in years
 * @returns Monthly EMI in INR (rounded to nearest rupee)
 *
 * Formula: EMI = P × r × (1+r)^n / ((1+r)^n − 1)
 * where r = annualRate/12/100, n = years × 12
 *
 * Example: calculateEMI(9_000_000, 8.5, 20) → 78152
 * Display: formatPrice(78152) → '₹78,152/mo'
 */
export function calculateEMI(
  principal: number,
  annualRate: number,
  years: number
): number {
  if (principal <= 0 || annualRate <= 0 || years <= 0) return 0
  const r = annualRate / 12 / 100
  const n = years * 12
  return Math.round(principal * r * Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1))
}
```

---

## Component Map

| Component | Type | Client? | Key Props / Data |
|-----------|------|---------|--------------------|
| `SiteNav` | layout | Yes (scroll shadow) | Logo + nav + CTA |
| `Footer` | layout | No | Dark 4-column nav |
| `Breadcrumb` | property | No | `crumbs: string[]` |
| `PropertyGallery` | property | Yes (thumb state) | `photos: number`, `title: string` |
| `PropertyHeader` | property | No | `property: PropertyDetail` |
| `PropertyTabs` | property | Yes (tab state) | `property: PropertyDetail` |
| `OverviewTab` | tabs | No | `property: PropertyDetail` |
| `FloorPlanTab` | tabs | No | `plans: FloorPlan[]` |
| `AmenitiesTab` | tabs | No | `groups: AmenityGroup[]` |
| `LocalityTab` | tabs | No | `insights: LocalityInsights` |
| `PriceTrendTab` | tabs | No | `trends: PriceTrendPoint[]` |
| `RERASection` | property | No | `reraNumber`, `reraExpiryDate`, `reraAuthority` |
| `SimilarProperties` | property | No | `properties: SimilarProperty[]` |
| `SimilarPropertyCard` | property | No | `property: SimilarProperty` |
| `SidebarPanel` | sidebar | Yes (toggle) | No props |
| `ContactForm` | sidebar | Yes | No props |
| `EMICalculator` | sidebar | Yes | `defaultPrincipal?: number` |
| `Button` | ui | No | `variant`, `size`, `href`, `onClick` |
| `VerifiedBadge` | ui | No | No props |
| `ReraBadge` | ui | No | No props |
| `ListingSourcePill` | ui | No | `source: ListingSource` |

---

## Page Assembly (`src/app/page.tsx`)

```tsx
import SiteNav from '@/components/layout/SiteNav'
import Footer from '@/components/layout/Footer'
import Breadcrumb from '@/components/property/Breadcrumb'
import PropertyGallery from '@/components/property/PropertyGallery'
import PropertyHeader from '@/components/property/PropertyHeader'
import PropertyTabs from '@/components/property/PropertyTabs'
import RERASection from '@/components/property/RERASection'
import SimilarProperties from '@/components/property/SimilarProperties'
import SidebarPanel from '@/components/sidebar/SidebarPanel'
import { propertyDetail, similarProperties } from '@/lib/data'
import styles from './page.module.css'

const CRUMBS = ['Home', 'Bangalore', 'Apartments', 'Whitefield', 'Brigade Cornerstone Utopia']

export default function Home() {
  return (
    <>
      <SiteNav />
      <main>
        <Breadcrumb crumbs={CRUMBS} />
        <PropertyGallery photos={propertyDetail.photos} title={propertyDetail.title} />
        <div className={styles.contentLayout}>
          <div className={styles.main}>
            <PropertyHeader property={propertyDetail} />
            <PropertyTabs property={propertyDetail} />
            {propertyDetail.reraNumber && (
              <RERASection
                reraNumber={propertyDetail.reraNumber}
                reraExpiryDate={propertyDetail.reraExpiryDate}
                reraAuthority={propertyDetail.reraAuthority}
              />
            )}
          </div>
          <aside className={styles.sidebar}>
            <SidebarPanel defaultPrincipal={propertyDetail.price * 0.75} />
          </aside>
        </div>
        <SimilarProperties properties={similarProperties} />
      </main>
      <Footer />
    </>
  )
}
```

**`src/app/page.module.css`:**
```css
.contentLayout {
  max-width: 1280px; margin: 0 auto; padding: 24px;
  display: grid; grid-template-columns: 1fr 360px; gap: 32px;
  align-items: start;
}
.main { min-width: 0; }
.sidebar { position: sticky; top: 80px; }
@media (max-width: 1024px) {
  .contentLayout { grid-template-columns: 1fr; }
  .sidebar { position: static; }
}
```
