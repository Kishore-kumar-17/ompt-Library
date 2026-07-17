---
prompt_id: mulecom_04
sub_category: Multi-Vendor E-commerce Marketplace
sub_type: Artisan Empowerment Fashion Marketplace
title: Handmade Confidence — Policy-Clear Craft Marketplace
reference_patterns: artisan_impact_storytelling, pincode_dispatch_clarity, payment_mode_resolution_rules
inspiration: okhai.org
quality_score:
status: draft
notes:
---

## Base Prompt

### Section 1 — Role

You are a senior marketplace product designer with 10+ years of experience building artisan and social-impact commerce systems. You design for trust, conversion, and operational fairness across buyers, sellers, and support teams.

---

### Section 2 — Application Overview

This is an artisan-led marketplace for handcrafted clothing, accessories, and lifestyle products. The platform combines mission-driven storytelling with practical e-commerce execution.

Buyers discover by category and craft, check delivery via pincode, review dispatch and return eligibility, and checkout using prepaid or COD modes. Sellers/ops manage listings, inventory, dispatch, returns, and support resolution.

Platform scope: Homepage, Search/PLP, Listing Detail Page (LDP), Cart, Checkout, Buyer Account, Seller/Ops Dashboard, and Support/Policy workflows.

Primary goal: confident purchase completion. Secondary goal: lower support friction through explicit policy and deterministic status flows.

---

### Section 3 — Brand Voice & Mood

Voice is warm, empowering, and craft-respectful. Discovery surfaces can carry community and artisan narrative; transactional surfaces must remain concise and clear.

Vibe should be humane and credible, not overly promotional.

Vibe word: empowering.

---

### Section 4 — Core Features & Functionality

1. **Homepage** — search-first access, handcrafted category rails, artisan impact stories, featured collections, trust strip
2. **Search/PLP** — facets (category, craft, size, color, price, ready-to-ship, return eligibility), sorting, policy-aware listing cards
3. **LDP** — gallery, variant options, pincode checker, dispatch window, return/replacement eligibility, add to bag/buy now
4. **Cart & Checkout** — transparent totals, shipping logic, prepaid/COD flow branch, order confirmation
5. **Buyer Account** — orders, tracking, return/exchange requests, support ticket history
6. **Seller/Ops Dashboard** — listing/inventory, dispatch updates, return review, fee and payout states
7. **Support & Policy** — returns/cancellation policy, shipping policy, payment policy, escalation timeline

---

### Section 5 — Design Specifications

**Visual style:** handcrafted editorial with operational clarity.

**Color mode:** Light.

**Color palette:**
- Background: `#FCF8F2`
- Surface: `#FFFFFF`
- Section tint: `#F2E8D9`
- Primary text: `#2B241E`
- Secondary text: `#6E665B`
- Tertiary text: `rgba(43,36,30,0.46)`
- Border: `rgba(43,36,30,0.14)`
- Action: `#3E2E21`
- Action hover: `#2A1D14`
- Accent terracotta: `#B56E3B`
- Trust green: `#2F7D32`
- Warning amber: `#A76C1D`

**Typography:**
- Display: `clamp(34px, 4.6vw, 58px)`
- H2: `clamp(24px, 3.4vw, 40px)`
- H3: `20px`
- Body: `16px`
- Small/meta: `14px`

**Spacing:** 8pt base. Section spacing `88px` desktop / `56px` mobile.

**Radius:** Buttons `8px`, cards `10px`, inputs `8px`, badges `999px`.

**Responsive:** breakpoints 640/768/1024/1280.

**Accessibility:** WCAG AA, keyboard support for filters/forms/dialogs.

**Motion:** transitions under 280ms, reduced motion fallback.
- Respect: `prefers-reduced-motion: reduce` → disable all animations and transitions.

---

### Section 6 — Structure

**Homepage**
1. Utility strip (support + offers)
2. Sticky nav + search
3. Hero story
4. Craft/category rails
5. Featured handmade modules
6. Impact/trust strip
7. Footer policies

**Search/PLP**
- Search bar + taxonomy chips
- Facet panel/drawer
- Listing card with craft tag, dispatch hint, return marker
- Sort and pagination

**LDP**
- Left: media gallery
- Right: title/price/variants, pincode checker, dispatch info, return eligibility, CTA
- Below fold: details/care/policy and related items

**Cart/Checkout**
- Cost breakdown
- Payment mode note block
- Refund behavior reference

---

### Section 7 — Technical Specifications

- Next.js 14 + TypeScript strict
- Tailwind + CSS vars
- Zustand cart state
- Supabase/Postgres domain model
- Facet-capable search abstraction
- Stripe + COD orchestration
- Support ticket timeline system
- Lighthouse 95+ target

---

### Section 8 — Implementation Steps

1. global shell and taxonomy nav
2. search and filter system
3. LDP conversion + policy modules
4. quote endpoint and totals
5. prepaid checkout branch
6. COD checkout branch
7. return/exchange and support workflows
8. seller ops and payout views
9. QA for policy and fulfillment edge cases

Cut order: editorial modules and advanced recommendations. Never cut policy clarity, checkout correctness, or support traceability.

---

### Section 9 — User Experience

Conversion-critical confidence checks:
1. pincode deliverability
2. dispatch expectation
3. return/replacement eligibility
4. payment mode implications

If any are unclear, support escalations rise.

Post-purchase UX should provide deterministic state updates and transparent outcomes.

---

### Section 10 — Constraints

- no hidden return eligibility criteria
- no ambiguous COD/prepaid refund behavior
- no client-authoritative final totals
- no inaccessible policy and support interfaces
- no deceptive urgency patterns

---

## Platform Versions

### Category A — Lovable

Build **Handmade Confidence**, an artisan empowerment marketplace where every product carries the story of the artisan who made it. The differentiator: **artisan attribution is mandatory and visible on every product**, making mission visible at the point of purchase.

**Design tokens (paste into theme):**
```css
--bg: #FCF8F2;
--surface: #FFFFFF;
--surface-tint: #F2E8D9;
--text-primary: #2B241E;
--text-secondary: #6E665B;
--text-tertiary: rgba(43,36,30,0.46);
--border: rgba(43,36,30,0.14);
--action: #3E2E21;
--action-hover: #2A1D14;
--accent: #B56E3B;
--trust: #2F7D32;
--warning: #A76C1D;
--radius-btn: 8px;
--radius-card: 10px;
--radius-input: 8px;
--radius-badge: 999px;
```

**Build in this order:**
1. `<ImpactNav>` — sticky; search; category chips; mission tag "Empowering {N} Artisans"
2. `<HeroImpactBlock>` — headline "Handmade with care. Bought with purpose."; artisan count, villages covered, product count stats
3. `<ArtisanSpotlight>` — 3-col grid of artisan cards: photo, name, village, craft, products count; links to artisan profile page
4. `<CraftCategoryRails>` — handcrafted categories (Apparel / Jewellery / Accessories / Home Décor / Bags); icon + label
5. `<FeaturedHandmadeModules>` — curated collections ("Festival Picks" / "Gifting" / "Everyday Handmade")
6. `<ImpactTrustStrip>` — "Directly Supports Artisans" · "Authenticity Guaranteed" · "Secure Payments" · "14-Day Returns on Eligible Items"
7. `<FacetFilters>` — category, craft, artisan collective, size, colour, price, ready-to-ship, return eligible; desktop sidebar, mobile drawer
8. `<ListingCard>` — product image, artisan name + village (`--accent`), craft tag, dispatch hint, price
9. `<ListingDetailPage>` — left gallery; right column:
   - Title + price
   - Variant selectors
   - `<ArtisanAttributionCard>` — artisan photo, name, village, craft description, collective name; MANDATORY above CTA
   - `<PincodeChecker>`
   - `<DispatchInfoPanel>`
   - `<ReturnEligibilityBadge>` — ABOVE Add to Bag
   - Add to Bag / Buy Now
10. `<CartCheckout>` — INR paise totals via `formatINR`; `<PaymentModeNote>` (prepaid/COD refund logic); order confirmation

**Critical constraints:**
- `<ArtisanAttributionCard>` is MANDATORY on every LDP — never optional or in accordion
- `<ReturnEligibilityBadge>` ABOVE Add to Bag in DOM
- `<PincodeChecker>` result (deliverable/not) shows before dispatch info
- COD option disabled in `PaymentModeSelector` when `pincodeResult.codAvailable === false`
- `formatINR(paise)` for all prices; never `₹` string concatenation

---

### Category A — ChatGPT Canvas

Build the Handmade Confidence platform. Stack: React + TypeScript strict + Tailwind + Zustand + Vite.

**Routes:** `/` · `/search` · `/listing/:slug` · `/artisan/:id` · `/cart` · `/checkout` · `/account/orders` · `/account/returns` · `/support` · `/seller/dashboard`

**Full type system (`src/types/empowerment.ts`):**
```typescript
export type CraftType =
  | 'block_print' | 'embroidery' | 'weaving' | 'pottery'
  | 'jewellery' | 'leather' | 'woodwork' | 'metalwork' | 'other';
export type PaymentMode = 'prepaid' | 'cod';
export type RefundResolution = 'original_payment' | 'store_credit';
export type ReturnStatus =
  | 'requested' | 'approved' | 'pickup_scheduled'
  | 'received' | 'refund_initiated' | 'closed';

export interface ArtisanProfile {
  id: string; name: string; village: string; state: string;
  craftType: CraftType; collectiveName: string;
  bio: string;        // 1–3 sentences
  photoUrl: string;
  productCount: number;
  impactMetrics: ArtisanImpactMetrics;
}

export interface ArtisanImpactMetrics {
  yearsOnPlatform: number;
  ordersCompleted: number;
  familiesSupportedCount: number; // set by ops, not seller
}

export interface HandmadeProduct {
  id: string; slug: string; title: string;
  price: number;                  // INR paise
  compareAtPrice: number | null;
  images: string[];
  artisan: Pick<ArtisanProfile, 'id' | 'name' | 'village' | 'craftType' | 'collectiveName' | 'photoUrl'>;
  categorySlug: string; craftType: CraftType;
  readyToShip: boolean; dispatchDays: number;
  returnEligible: boolean; returnWindowDays: number;
  variants: ProductVariant[];
  averageRating: number; reviewCount: number;
}

export interface ProductVariant {
  id: string; label: string; available: boolean;
}

export interface PincodeCheckResult {
  pincode: string; deliverable: boolean;
  etaDays: number | null; codAvailable: boolean; carrier: string | null;
}

export interface CartItem {
  productId: string; variantId: string;
  title: string; imageUrl: string; artisanName: string;
  price: number; quantity: number; returnEligible: boolean;
}

export interface ImpactStats {
  artisanCount: number; villageCount: number;
  productCount: number; ordersCompleted: number;
}
```

**Utilities (`src/lib/empowerment.ts`):**
```typescript
export function formatINR(paise: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0,
  }).format(paise / 100);
}

export function cartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
}

export function getReturnLabel(product: HandmadeProduct): string {
  if (!product.returnEligible) return 'Non-returnable';
  return `${product.returnWindowDays}-day returns accepted`;
}

export function getRefundLabel(mode: PaymentMode): string {
  return mode === 'cod'
    ? 'Refunded as store credit to your Handmade wallet'
    : 'Refunded to your original payment method';
}
```

**Zustand stores:**
```typescript
// src/store/cartStore.ts — same pattern as mulecom_02/03
// src/store/checkoutStore.ts — paymentMode + pincodeResult + agreedToRefundPolicy

// Additional: src/store/impactStore.ts
interface ImpactState {
  stats: ImpactStats | null;
  setStats: (s: ImpactStats) => void;
}
export const useImpactStore = create<ImpactState>()((set) => ({
  stats: null,
  setStats: (stats) => set({ stats }),
}));
```

**Business rules:**
- `ArtisanProfile` linked to listing at creation — not optional; server validates `artisanId` exists
- `ArtisanImpactMetrics.familiesSupportedCount` is ops-set only; sellers cannot modify
- COD refund → `store_credit`; prepaid refund → `original_payment`
- Return eligibility: per-product; `returnEligible === false` for bespoke/personalised items
- Quote snapshot controls final totals; client subtotal is display-only

---

### Category A — Bolt

Build Handmade Confidence as a Vite React SPA.

**File structure:**
```
src/
├── components/
│   ├── ImpactNav.tsx
│   ├── HeroImpactBlock.tsx
│   ├── ArtisanSpotlight.tsx
│   ├── CraftCategoryRails.tsx
│   ├── FeaturedHandmadeModules.tsx
│   ├── ImpactTrustStrip.tsx
│   ├── FacetSidebar.tsx
│   ├── FacetDrawer.tsx
│   ├── ListingCard.tsx              ← includes artisan name + village
│   ├── ArtisanAttributionCard.tsx   ← mandatory on LDP
│   ├── PincodeChecker.tsx
│   ├── DispatchInfoPanel.tsx
│   ├── ReturnEligibilityBadge.tsx
│   ├── PaymentModeSelector.tsx
│   ├── ImpactStatsBar.tsx           ← artisan/village/order counts
│   └── SupportTimeline.tsx
├── store/
│   ├── cartStore.ts
│   ├── checkoutStore.ts
│   └── impactStore.ts
├── types/empowerment.ts
└── lib/empowerment.ts
```

**Component contracts:**
- `<ArtisanAttributionCard artisan={ArtisanProfile} />` — photo (circular, 48px), name, village + state, craft tag, collective name, `"{N} orders completed"` from `impactMetrics`; renders ABOVE pincode checker on LDP
- `<ImpactStatsBar stats={ImpactStats} />` — "{N} artisans" · "{N} villages" · "{N} products" · "{N} orders completed"; `--accent` number colour, `--text-secondary` label; shown in `HeroImpactBlock` and footer
- `<ListingCard>` — must show artisan name + village below product title in `--accent` colour; distinguishes from generic marketplace cards
- `<HeroImpactBlock>` — headline + `<ImpactStatsBar>` + "Shop Now" CTA + artisan collective logos strip

**Critical rules:**
- `ArtisanAttributionCard` is never inside an accordion; always rendered in LDP
- `impactMetrics.familiesSupportedCount` displayed as-read from data; no editable field in seller UI
- `formatINR(paise)` for all price rendering
- Tap targets minimum `44px` height on all interactive elements

---

### Category A — v0

Create a Next.js 14 App Router artisan empowerment storefront with shadcn/ui + Tailwind. Zero hex in JSX.

**globals.css additions:**
```css
:root {
  --bg: #FCF8F2; --surface: #FFFFFF; --surface-tint: #F2E8D9;
  --text-primary: #2B241E; --text-secondary: #6E665B;
  --text-tertiary: rgba(43,36,30,0.46); --border: rgba(43,36,30,0.14);
  --action: #3E2E21; --action-hover: #2A1D14;
  --accent: #B56E3B; --trust: #2F7D32; --warning: #A76C1D;
}
```

**ArtisanAttributionCard component:**
```tsx
import Image from 'next/image';
import { ArtisanProfile } from '@/types/empowerment';
export function ArtisanAttributionCard({ artisan }: {
  artisan: Pick<ArtisanProfile, 'name' | 'village' | 'state' | 'craftType' |
    'collectiveName' | 'photoUrl' | 'impactMetrics'>
}) {
  return (
    <div className="flex items-start gap-3 p-3 rounded-[10px] bg-[--surface-tint]
                    border border-[--border]">
      <Image src={artisan.photoUrl} alt={artisan.name} width={48} height={48}
        className="rounded-full object-cover flex-shrink-0 w-12 h-12" />
      <div className="flex-1 min-w-0">
        <p className="text-[14px] font-semibold text-[--text-primary]">{artisan.name}</p>
        <p className="text-[12px] text-[--text-secondary]">{artisan.village}, {artisan.state}</p>
        <p className="text-[11px] text-[--accent] font-semibold uppercase tracking-[0.05em] mt-0.5">
          {artisan.collectiveName}
        </p>
        <p className="text-[12px] text-[--text-secondary] mt-1">
          {artisan.impactMetrics.ordersCompleted.toLocaleString('en-IN')} orders completed
        </p>
      </div>
    </div>
  );
}
```

**Components to build:** `<SearchHeader />` · `<ArtisanSpotlight />` · `<CraftCategoryRails />` · `<ImpactStatsBar />` · `<FacetDrawer />` · `<ArtisanAttributionCard />` · `<PincodeChecker />` · `<ReturnEligibilityBadge />` · `<PaymentModeSelector />` · `<SupportTimeline />`

**Rules:** `ArtisanAttributionCard` not in accordion; `ReturnEligibilityBadge` above Add to Bag; COD disabled when `codAvailable === false`.

---

### Category B — Claude Artifacts

Implement **Handmade Confidence** in Next.js 14 + TypeScript strict + Supabase + Stripe/COD. The artisan empowerment model adds artisan attribution and impact metrics as system-level constraints.

**Four defining constraints:**

**1. Artisan attribution is mandatory on every product listing.**
`handmade_products.artisan_id REFERENCES artisan_profiles(id) NOT NULL`. `POST /api/seller/listings` returns 400 if `artisanId` is missing or does not resolve to an active artisan profile. The LDP RSC fetches `artisan` (joined from `artisan_profiles`) and passes it to `<ArtisanAttributionCard>` which is rendered unconditionally — no conditional rendering. Artisan attribution is not a "detail" field; it is part of the product identity.

**2. Impact metrics are ops-owned, not seller-writable.**
`artisan_impact_metrics` table is writable only by users with `role = 'ops_admin'`. Sellers cannot modify `familiesSupportedCount`, `yearsOnPlatform`, or `ordersCompleted` through any API route. `GET /api/artisan/[id]` returns the full profile including metrics; this endpoint is public and cached. The seller dashboard shows read-only impact metric tiles; no edit controls.

**3. COD availability is pincode-gated with independent server validation.**
`POST /api/checkout/confirm` validates COD availability by calling `checkPincode(pincode)` server-side regardless of what the client sent. If the logistics API returns `codAvailable: false` for the buyer's pincode and `order.paymentMode === 'cod'`, the server returns `422 { error: 'COD_NOT_AVAILABLE' }`. The client `PaymentModeSelector` pre-disables COD based on the pincode check, but the server check is the authority.

**4. Returns default to exchange-first resolution for empowerment products.**
`artisan_products.return_resolution_preference: 'exchange' | 'refund'` is set per listing (default `'exchange'` to minimise returns and support artisan income stability). When buyer opens a return request, `ReturnRequestForm` shows "Would you like to exchange or get a refund?" — exchange is the default-selected option. If refund selected: COD → `store_credit`, prepaid → `original_payment`. Exchange flow creates a new order for the replacement item.

**Folder structure:**
```
src/
├── app/
│   ├── (storefront)/
│   │   ├── page.tsx                     ← HeroImpactBlock + ArtisanSpotlight + CraftCategoryRails
│   │   ├── search/page.tsx              ← RSC + FacetSidebar island
│   │   ├── listing/[slug]/page.tsx      ← RSC: ArtisanAttributionCard (mandatory) + policy stack
│   │   ├── artisan/[id]/page.tsx        ← ArtisanProfile page + listing grid
│   │   ├── cart/page.tsx
│   │   ├── checkout/page.tsx
│   │   └── account/
│   │       ├── orders/page.tsx
│   │       └── returns/page.tsx         ← exchange-first form
│   ├── support/page.tsx
│   ├── seller/dashboard/page.tsx        ← impact metrics read-only, listing CRUD
│   └── api/
│       ├── artisan/[id]/route.ts        ← GET artisan profile + products
│       ├── pincode/[code]/route.ts
│       ├── quote/route.ts
│       ├── checkout/confirm/route.ts    ← server validates COD availability
│       ├── returns/route.ts             ← exchange-first logic
│       ├── seller/listings/route.ts     ← validates artisanId required
│       └── webhooks/stripe/route.ts
├── lib/
│   ├── empowerment.ts                   ← formatINR, getReturnLabel, getRefundLabel
│   ├── pincode.ts
│   └── returns.ts                       ← resolveReturnPath(order, preference)
├── store/
│   ├── cartStore.ts
│   ├── checkoutStore.ts
│   └── impactStore.ts
└── types/empowerment.ts
```

---

### Category B — Grok

Generate in this order:

```
1.  src/types/empowerment.ts           — CraftType, PaymentMode, RefundResolution, ReturnStatus,
                                          ArtisanProfile, ArtisanImpactMetrics, HandmadeProduct,
                                          ProductVariant, PincodeCheckResult, CartItem, ImpactStats
2.  src/lib/empowerment.ts             — formatINR, cartSubtotal, getReturnLabel, getRefundLabel
3.  src/store/cartStore.ts             — Zustand persist: addItem with variant key
4.  src/store/checkoutStore.ts         — paymentMode (default 'prepaid'), pincodeResult
5.  src/store/impactStore.ts           — ImpactStats cache
6.  src/app/api/pincode/[code]/route.ts
7.  src/app/api/quote/route.ts
8.  src/app/api/checkout/confirm/route.ts — server validates COD via checkPincode()
9.  src/app/api/returns/route.ts       — exchange-first: resolveReturnPath(order, preference)
10. src/app/api/artisan/[id]/route.ts  — GET with impact metrics
11. src/app/api/seller/listings/route.ts — validates artisanId required
12. src/app/page.tsx                   — HeroImpactBlock + ArtisanSpotlight + CraftCategoryRails
13. src/app/search/page.tsx            — RSC + FacetSidebar island
14. src/app/listing/[slug]/page.tsx    — RSC: ArtisanAttributionCard always rendered
15. src/app/artisan/[id]/page.tsx      — artisan profile + listing grid
16. src/app/cart/page.tsx
17. src/app/checkout/page.tsx
18. src/app/account/returns/page.tsx   — exchange-first ReturnRequestForm
19. src/components/ArtisanAttributionCard.tsx
20. src/components/ArtisanSpotlight.tsx
21. src/components/ImpactStatsBar.tsx
22. src/components/PaymentModeSelector.tsx
```

Artisan attribution never optional. Impact metrics ops-only write. COD server-validated at checkout confirm.

---

### Category B — Gemini

Build **Handmade Confidence**, distinguishing through artisan attribution integrated into the shopping experience.

**Architecture layers:**
- **Mission layer** — `HeroImpactBlock` (artisan count, village count, orders stats), `ArtisanSpotlight` (3 featured artisans), `ImpactTrustStrip`
- **Discovery layer** — `CraftCategoryRails`, `FacetSidebar/Drawer` (includes artisan-collective filter), `FeaturedHandmadeModules`
- **Attribution layer** — `ArtisanAttributionCard` (mandatory on LDP), `ListingCard` artisan byline, artisan profile page
- **Confidence layer** — `PincodeChecker`, `DispatchInfoPanel`, `ReturnEligibilityBadge`
- **Transaction layer** — `CartSummary` (INR paise) → `/api/quote` → `PaymentModeSelector` → COD server validation → confirmation
- **Support layer** — exchange-first `ReturnRequestForm` → `ReturnTimeline`

**Artisan attribution data flow:**
1. `artisan_profiles` row linked via `handmade_products.artisan_id`
2. LDP RSC joins artisan in SQL query — never a second fetch
3. `<ArtisanAttributionCard>` receives `artisan` prop — no optional chaining needed (always present)
4. `artisan/[id]/page.tsx` shows full artisan bio + their product grid + impact stats

**Impact metrics rules:**
- `impactMetrics.familiesSupportedCount` — ops-set only; shown in `ArtisanAttributionCard` and artisan profile
- `impactMetrics.ordersCompleted` — derived from order rows by DB view, not seller-entered
- `ImpactStatsBar` on homepage shows platform-wide aggregates (sum across all artisans)

**Motion rules:** same as mulecom_02 (FacetDrawer x-slide, ReturnTimeline height, PincodeChecker opacity, `useReducedMotion()` guard everywhere).

---

### Category B — Cursor

In `src/app/`, implement in this exact order:

**Phase 1 — Shell, mission, and discovery**
- `src/types/empowerment.ts` — all domain types including `ArtisanProfile`, `ArtisanImpactMetrics`, `ImpactStats`
- `src/lib/empowerment.ts` — `formatINR`, `cartSubtotal`, `getReturnLabel`, `getRefundLabel`
- `(storefront)/page.tsx` — `HeroImpactBlock` (with `ImpactStatsBar`) + `ArtisanSpotlight` + `CraftCategoryRails` + `ImpactTrustStrip`
- `search/page.tsx` — RSC; facets include artisan-collective filter

**Phase 2 — LDP with artisan attribution**
LDP right column order:
1. Title + price + `formatINR`
2. Variant selectors
3. `<ArtisanAttributionCard>` — MANDATORY, always rendered, never conditional
4. `<PincodeChecker>`
5. `<DispatchInfoPanel>` (after pincode check)
6. `<ReturnEligibilityBadge>` — ABOVE Add to Bag
7. Add to Bag / Buy Now

**Full `ArtisanAttributionCard` + artisan profile page:**
```tsx
// components/ArtisanAttributionCard.tsx
import Image from 'next/image';
import Link from 'next/link';
import { ArtisanProfile } from '@/types/empowerment';
export function ArtisanAttributionCard({ artisan }: { artisan: Pick<ArtisanProfile,
  'id' | 'name' | 'village' | 'state' | 'craftType' | 'collectiveName' | 'photoUrl' | 'impactMetrics'>
}) {
  return (
    <Link href={`/artisan/${artisan.id}`}
      className="flex items-start gap-3 p-3 rounded-[10px] bg-[--surface-tint]
                 border border-[--border] hover:border-[--action] transition-colors
                 group focus-visible:outline-2 focus-visible:outline-[--action]">
      <Image src={artisan.photoUrl} alt={artisan.name} width={52} height={52}
        className="rounded-full object-cover flex-shrink-0 w-[52px] h-[52px]" />
      <div className="flex-1 min-w-0">
        <p className="text-[13px] uppercase tracking-[0.05em] font-semibold text-[--accent]">
          Made by
        </p>
        <p className="text-[15px] font-semibold text-[--text-primary] group-hover:underline">
          {artisan.name}
        </p>
        <p className="text-[12px] text-[--text-secondary]">
          {artisan.village}, {artisan.state} · {artisan.collectiveName}
        </p>
        <p className="text-[12px] text-[--trust] mt-1">
          {artisan.impactMetrics.ordersCompleted.toLocaleString('en-IN')} orders completed
          {artisan.impactMetrics.familiesSupportedCount > 0 &&
            ` · ${artisan.impactMetrics.familiesSupportedCount} families supported`}
        </p>
      </div>
    </Link>
  );
}
```

**Phase 3 — Cart, checkout, exchange-first returns**
- `cart/page.tsx` — cart summary with INR paise totals; artisan name shown per line item
- `checkout/page.tsx` — QuoteSnapshot + `PaymentModeSelector` (COD server-validated)

**Full `PaymentModeSelector` note for COD refund policy:**
The `<PaymentModeSelector>` must show under COD option: *"Returns on COD orders are credited as store credit to your Handmade wallet."* This must be visible before the user selects COD — not in a tooltip, not in fine print.

- `account/returns/page.tsx` — exchange-first form: "Exchange for another item" (default selected) OR "Request refund"; refund sub-form shows `getRefundLabel(paymentMode)`

**Phase 4 — Artisan profile and seller ops**
- `artisan/[id]/page.tsx` — full artisan bio, impact stats, product grid
- `seller/dashboard/page.tsx` — listing CRUD (artisanId required), dispatch SLA, return approvals, payout summary; impact metrics shown read-only (no edit)

**Absolute rules:**
- `ArtisanAttributionCard` always rendered; never inside `{condition && <...>}` conditional
- `impactMetrics.familiesSupportedCount` has no edit UI in seller dashboard
- COD server-validated at `/api/checkout/confirm` regardless of client state
- `getRefundLabel(paymentMode)` for all refund-mode copy; never hardcoded
- `formatINR(paise)` for all price rendering

**QA grep commands:**
```bash
# Confirm ArtisanAttributionCard is not conditionally rendered on LDP
grep -n 'ArtisanAttributionCard' src/app/listing/\[slug\]/page.tsx
grep -n '&& <ArtisanAttributionCard\|? <ArtisanAttributionCard' src/app/listing/\[slug\]/page.tsx

# Verify no edit UI for familiesSupportedCount in seller dashboard
grep -n 'familiesSupportedCount' src/app/seller/dashboard/page.tsx

# Confirm COD validation in checkout API (not just client-side)
grep -n 'codAvailable\|checkPincode\|COD_NOT_AVAILABLE' src/app/api/checkout/confirm/route.ts

# Verify exchange-first default in returns form
grep -n 'exchange\|default.*refund\|refund.*default' src/app/account/returns/page.tsx

# No raw ₹ string concat
grep -rn "'₹'\|\"₹\"\|`₹" src/ --include='*.tsx' --include='*.ts'
```

---

## Review Notes

- Lovable:
- ChatGPT Canvas:
- Bolt:
- v0:
- Claude Artifacts:
- Grok:
- Gemini:
- Cursor:
- Overall score: /5
- What to fix:
