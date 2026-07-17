---
prompt_id: mulecom_03
sub_category: Multi-Vendor E-commerce Marketplace
sub_type: Indian Craft & Fabric Marketplace
title: Artisan Depth — Fabric-First Craft Commerce Marketplace
reference_patterns: craft_lineage_discovery, pincode_dispatch_visibility, policy_branching_checkout
inspiration: itokri.com
quality_score:
status: draft
notes:
---

## Base Prompt

### Section 1 — Role

You are a senior marketplace product designer with 10+ years of experience building two-sided commerce systems for handcrafted and culturally rooted products. You design both discovery and operations: buyer trust, checkout correctness, return policy clarity, and seller/ops execution.

You understand that craft commerce conversion depends on operational confidence as much as aesthetics.

---

### Section 2 — Application Overview

This is a curated Indian craft marketplace spanning fabrics, sarees, apparel, handcrafted home products, and accessories. Buyers discover by category and craft, evaluate dispatch and policy details, then purchase via prepaid or COD flows.

Sellers/brand ops manage listings, inventory, dispatch timelines, return approvals, and payout visibility. Buyer support includes help tickets, returns/exchanges, and resolution timelines.

Platform scope: Homepage, Search/PLP, Listing Detail Page (LDP), Cart, Checkout, Buyer Account, Seller/Ops Dashboard, Support and Policy workflows.

Primary goal: high-confidence purchase completion. Secondary goal: reduced support friction through explicit policy surfaces and deterministic post-purchase states.

---

### Section 3 — Brand Voice & Mood

Voice is warm, grounded, and craft-respectful. Discovery copy can be story-rich; transaction surfaces must stay concise and unambiguous.

The interface should feel earthy and premium without heaviness. Trust is conveyed through clarity: dispatch promises, return eligibility, payment-mode behavior, and human support access.

Vibe word: authentic.

---

### Section 4 — Core Features & Functionality

1. **Homepage**
- Search-led entry
- Craft/culture category rails
- Curated edits and seasonal collections
- Trust and support strip

2. **Search/PLP**
- Keyword + taxonomy discovery
- Facets: category, craft, size, color, price, ready-to-ship, return eligibility
- Sort: relevance, newest, price low-high, price high-low
- Listing cards include dispatch hint and policy marker

3. **LDP (Listing Detail Page)**
- Gallery and variant selectors
- Pincode availability checker
- Dispatch timeline
- Return/exchange eligibility block
- Material/fabric disclosure
- Add to Bag / Buy Now

4. **Cart & Checkout**
- Transparent totals (subtotal, shipping, tax, final)
- Payment mode branch (prepaid/COD)
- Guest and account checkout
- Order confirmation with support and returns links

5. **Buyer Account**
- Order history and tracking
- Return/exchange request flows
- Refund/store-credit status visibility
- Ticket timeline

6. **Seller/Ops Dashboard**
- Listing and inventory updates
- Dispatch SLA controls
- Return request review and decision logs
- Fee and payout summary views

7. **Support & Policy Engine**
- Ticket creation and escalation
- Case timeline states
- Policy-driven resolution behavior

---

### Section 5 — Design Specifications

**Visual style:** craft-editorial with operational precision on conversion surfaces.

**Color mode:** Light.

**Color palette:**
- Background: `#FCF8F2`
- Surface: `#FFFFFF`
- Section tint: `#F4E9D8`
- Primary text: `#2A241D`
- Secondary text: `#6B645A`
- Tertiary text: `rgba(42,36,29,0.46)`
- Border: `rgba(42,36,29,0.14)`
- Action: `#3D2C1E`
- Action hover: `#291C12`
- Accent saffron: `#B9782D`
- Trust green: `#2E7D32`
- Warning amber: `#A86A1C`

**Typography:**
- Display: `clamp(34px, 4.6vw, 58px)`, weight 600, line-height 1.1
- H2: `clamp(24px, 3.4vw, 40px)`, weight 600, line-height 1.15
- H3: `20px`, weight 500, line-height 1.25
- Body: `16px`, line-height 1.6
- Small/meta: `14px`, line-height 1.5
- Label/badge: `11px`, uppercase

**Spacing:** 8pt grid.
- Section spacing: `88px` desktop / `56px` mobile
- Grid gap: `20px` desktop / `14px` mobile

**Border radius:**
- Buttons `8px`
- Cards `10px`
- Inputs `8px`
- Pills/badges `999px`

**Responsive:** mobile-first, breakpoints `640`, `768`, `1024`, `1280`.

**Accessibility:** WCAG AA, keyboardable filters/forms/dialogs, semantic state labels.

**Motion:**
- drawers/modals <= 280ms
- hover <= 180ms
- reduced-motion support mandatory
- Respect: `prefers-reduced-motion: reduce` → disable all animations and transitions.

---

### Section 6 — Structure

**Homepage**
1. Utility strip (shipping threshold/support)
2. Sticky navigation and search
3. Hero craft story
4. Craft taxonomy bands
5. Category clusters
6. Curated collection modules
7. Trust strip
8. Footer policy/support links

**Search/PLP**
- Search and taxonomy chips
- Facet panel/drawer
- Listing cards: craft tag, dispatch info, return marker, price
- Sort + pagination

**LDP**
- Left: gallery
- Right: title, price, variant selector, pincode checker, dispatch, return eligibility, CTA
- Below fold: material/care, support and policy references, related listings

**Cart/Checkout**
- explicit cost breakdown
- payment-mode note block
- refund behavior reference link

**Account/Support**
- order details include return/support actions
- timeline view for requests and outcomes

---

### Section 7 — Technical Specifications

- Next.js 14 App Router + TypeScript strict
- Tailwind + CSS vars
- Zustand (cart + UI state)
- Supabase/Postgres domain model
- Facet-capable search abstraction
- Stripe prepaid + COD branch orchestration
- Support ticket and case event model
- Target: Lighthouse 95+, LCP <2.5s, CLS <0.1

---

### Section 8 — Implementation Steps

1. shell, nav, taxonomy
2. search + facets + listing cards
3. LDP pincode/dispatch/return modules
4. cart totals and quote endpoint
5. prepaid checkout branch
6. COD checkout branch and order states
7. returns/exchanges and refund/store-credit logic
8. support ticket lifecycle and timeline
9. seller/ops dashboard + payout summary
10. QA for policy and fulfillment edge cases

Cut order: editorial enhancements and advanced recommendations. Never cut policy transparency or checkout correctness.

---

### Section 9 — User Experience

Users need confidence in three questions before purchase:
1. Can this deliver to my pincode?
2. When will it dispatch?
3. Is this item return/exchange eligible?

If any answer is hidden or ambiguous, support tickets increase and conversion drops.

Post-purchase UX must keep users informed through deterministic statuses and clear resolution outcomes.

---

### Section 10 — Constraints

- No hidden return eligibility conditions
- No ambiguous COD vs prepaid refund behavior
- No client-authoritative totals
- No inaccessible policy/filter/support interactions
- No deceptive urgency language

---

## Platform Versions

### Category A — Lovable

Build **Artisan Depth**, a fabric-first Indian craft marketplace. The differentiator from generic artisan stores is that **fabric and weave identity** is primary navigation — buyers shop by weave technique before category.

**Design tokens (paste into theme):**
```css
--bg: #FCF8F2;
--surface: #FFFFFF;
--surface-tint: #F4E9D8;
--text-primary: #2A241D;
--text-secondary: #6B645A;
--text-tertiary: rgba(42,36,29,0.46);
--border: rgba(42,36,29,0.14);
--action: #3D2C1E;
--action-hover: #291C12;
--accent: #B9782D;
--trust: #2E7D32;
--warning: #A86A1C;
--radius-btn: 8px;
--radius-card: 10px;
--radius-input: 8px;
```

**Build in this order:**
1. `<FabricNav>` — sticky; search; weave/craft taxonomy chips prominent (Chanderi · Maheshwari · Kanjivaram · Tussar · Jamdani · Muga); category secondary
2. `<HeroCraftStory>` — editorial hero with craft name, origin region, artisan count; `--surface-tint` bg
3. `<WeaveDiscoveryBands>` — 2-row layout: top row = fabric type (Silk / Cotton / Linen / Khadi), second row = weave technique; each chip shows listing count
4. `<CuratedEdits>` — seasonal and occasion-based collections (Wedding Season / Handloom Day / Festive Picks)
5. `<TrustStrip>` — "Handloom Verified" · "Authentic Craft Certificate" · "Secure Payments" · "Return Policy on Eligible Items"
6. `<FacetFilters>` — fabric type, weave technique, occasion, price, ready-to-ship, return eligible, dispatch window (any / ≤3 days / ≤7 days)
7. `<ListingCard>` — product image, weave tag (`--accent`), fabric type badge, dispatch window label ("Ships in 2–3 days" OR "Ships in 7–10 days for handwoven"), price
8. `<ListingDetailPage>` — left gallery; right:
   - Title + price
   - Fabric details chip row (weave, fabric type, width, weight)
   - Variant selectors
   - `<PincodeChecker>`
   - `<DispatchWindowPanel>` — dispatch days, carrier, ETA; for handwoven shows extended window with explanation
   - `<CraftLineageBlock>` — artisan community, origin region, technique description (required on all LDPs)
   - `<FabricCareInstructions>` — dry clean / hand wash / no-tumble guidance
   - `<ReturnEligibilityBadge>` — ABOVE Add to Bag; custom yardage orders always non-returnable
   - Add to Bag / Buy Now
9. `<CartCheckout>` — subtotal + shipping + tax in INR paise via `formatINR`; `<PaymentModeNote>` (COD vs prepaid refund logic); order confirmation with support link
10. `<SupportTimeline>` — ticket → resolution event log

**Critical constraints:**
- `<CraftLineageBlock>` is MANDATORY on every LDP — never optional or hidden in accordion
- Dispatch window for handwoven items: 7–10 business days; copy must explain WHY ("Made fresh by artisan after order")
- Custom yardage orders: `returnEligible === false`; badge must read "Custom order — non-returnable" with icon
- `formatINR(paise)` for all prices; never `₹` string concatenation

---

### Category A — ChatGPT Canvas

Build the Artisan Depth platform. Stack: React + TypeScript strict + Tailwind + Zustand + Vite.

**Routes:** `/` · `/search` · `/listing/:slug` · `/cart` · `/checkout` · `/account/orders` · `/account/returns` · `/support` · `/seller/dashboard`

**Full type system (`src/types/fabric.ts`):**
```typescript
export type FabricType = 'silk' | 'cotton' | 'linen' | 'khadi' | 'wool' | 'blended';
export type WeaveTechnique =
  | 'chanderi' | 'maheshwari' | 'kanjivaram' | 'tussar'
  | 'jamdani' | 'muga' | 'banarasi' | 'pochampally' | 'sambalpuri' | 'other';
export type DispatchCategory = 'ready_to_ship' | 'handwoven_made_to_order' | 'custom_yardage';
export type PaymentMode = 'prepaid' | 'cod';
export type RefundResolution = 'original_payment' | 'store_credit';

export interface FabricProduct {
  id: string; slug: string; title: string;
  price: number;                  // INR paise
  compareAtPrice: number | null;
  images: string[];
  fabricType: FabricType;
  weaveTechnique: WeaveTechnique;
  craftLineage: CraftLineage;     // mandatory
  fabricWidth: string;            // e.g. "44 inches"
  fabricWeight: string;           // e.g. "120 GSM"
  careInstructions: string[];
  dispatchCategory: DispatchCategory;
  dispatchDays: number;           // business days
  returnEligible: boolean;        // always false for custom_yardage
  returnWindowDays: number;
  variants: FabricVariant[];
  averageRating: number; reviewCount: number;
}

export interface CraftLineage {
  community: string;              // e.g. "Kanjivaram weavers, Tamil Nadu"
  originRegion: string;
  techniqueDescription: string;   // 1–2 sentences
  certifiedBy: string | null;     // e.g. "GI Tag: Kanjivaram Silk"
}

export interface FabricVariant {
  id: string; colourName: string; colourHex: string;
  available: boolean; yardageOptions?: number[]; // for custom_yardage
}

export interface PincodeCheckResult {
  pincode: string; deliverable: boolean;
  etaDays: number | null; codAvailable: boolean; carrier: string | null;
}

export interface CartItem {
  productId: string; variantId: string; yardage?: number;
  title: string; imageUrl: string;
  price: number; quantity: number;
  dispatchCategory: DispatchCategory;
  returnEligible: boolean;
}
```

**Utilities (`src/lib/fabric.ts`):**
```typescript
export function formatINR(paise: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0,
  }).format(paise / 100);
}

export function getDispatchLabel(product: FabricProduct): string {
  if (product.dispatchCategory === 'ready_to_ship') {
    return `Ships in ${product.dispatchDays}–${product.dispatchDays + 1} business days`;
  }
  if (product.dispatchCategory === 'handwoven_made_to_order') {
    return `Handwoven fresh — ships in ${product.dispatchDays}–${product.dispatchDays + 2} business days`;
  }
  return `Custom yardage — ships in ${product.dispatchDays} business days after confirmation`;
}

export function getReturnLabel(product: FabricProduct): string {
  if (product.dispatchCategory === 'custom_yardage') return 'Custom order — non-returnable';
  if (!product.returnEligible) return 'Non-returnable';
  return `${product.returnWindowDays}-day returns accepted`;
}
```

**Zustand stores:** same pattern as mulecom_02 (`useCartStore` with variant + optional yardage key; `useCheckoutStore` for paymentMode + pincodeResult).

**Business rules:**
- `custom_yardage` dispatch category: `returnEligible` is always `false`; server enforces this at return creation
- Dispatch window must differ between `ready_to_ship` (2–3 days) and `handwoven_made_to_order` (7–10 days) with explanatory copy
- `CraftLineage` block is non-optional — server returns 400 if listing created without `craftLineage`
- COD refund → `store_credit`; prepaid refund → `original_payment` (same as mulecom_02)

---

### Category A — Bolt

Build Artisan Depth as a Vite React SPA.

**File structure:**
```
src/
├── components/
│   ├── FabricNav.tsx
│   ├── HeroCraftStory.tsx
│   ├── WeaveDiscoveryBands.tsx
│   ├── CuratedEdits.tsx
│   ├── TrustStrip.tsx
│   ├── FacetSidebar.tsx
│   ├── FacetDrawer.tsx
│   ├── ListingCard.tsx
│   ├── PincodeChecker.tsx
│   ├── DispatchWindowPanel.tsx    ← shows extended window with explanation for handwoven
│   ├── CraftLineageBlock.tsx      ← mandatory on every LDP
│   ├── FabricCareInstructions.tsx
│   ├── ReturnEligibilityBadge.tsx
│   ├── PaymentModeSelector.tsx
│   └── SupportTimeline.tsx
├── store/
│   ├── cartStore.ts
│   └── checkoutStore.ts
├── types/fabric.ts
└── lib/fabric.ts                  ← formatINR, getDispatchLabel, getReturnLabel
```

**Component contracts:**
- `<WeaveDiscoveryBands>` — two horizontal scroll rows: fabric type chips + weave technique chips; each chip navigates to `/search?weaveTechnique=chanderi` etc.
- `<DispatchWindowPanel dispatchCategory={DispatchCategory} dispatchDays={number} />` — for `handwoven_made_to_order`, render explanatory note: "This saree is woven to order by the artisan. Please allow 7–10 business days before dispatch."
- `<CraftLineageBlock lineage={CraftLineage} />` — community origin, technique description, GI tag badge if `certifiedBy` present; CANNOT be hidden in accordion
- `<ReturnEligibilityBadge product={FabricProduct} />` — derives label from `getReturnLabel(product)`; `custom_yardage` always gets warning badge

**Critical rules:**
- `getDispatchLabel(product)` from `lib/fabric.ts` — never hardcoded dispatch strings
- `CraftLineageBlock` must appear on LDP regardless of screen size — not collapsible
- Yardage selector visible only when `variant.yardageOptions` is non-null
- Cart item key: `${productId}-${variantId}-${yardage ?? 0}` (yardage creates distinct cart lines)

---

### Category A — v0

Create a Next.js 14 App Router fabric marketplace with shadcn/ui + Tailwind. Zero hex in JSX.

**globals.css additions:**
```css
:root {
  --bg: #FCF8F2; --surface: #FFFFFF; --surface-tint: #F4E9D8;
  --text-primary: #2A241D; --text-secondary: #6B645A;
  --text-tertiary: rgba(42,36,29,0.46); --border: rgba(42,36,29,0.14);
  --action: #3D2C1E; --action-hover: #291C12;
  --accent: #B9782D; --trust: #2E7D32; --warning: #A86A1C;
}
```

**CraftLineageBlock component:**
```tsx
import { CraftLineage } from '@/types/fabric';
export function CraftLineageBlock({ lineage }: { lineage: CraftLineage }) {
  return (
    <div className="py-4 px-4 rounded-[10px] bg-[--surface-tint] border border-[--border] space-y-2">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h4 className="text-[13px] font-semibold uppercase tracking-[0.05em] text-[--accent]">
          Craft Lineage
        </h4>
        {lineage.certifiedBy && (
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full
                           bg-[--trust] bg-opacity-10 text-[--trust] border border-[--trust]">
            {lineage.certifiedBy}
          </span>
        )}
      </div>
      <p className="text-[14px] font-medium text-[--text-primary]">{lineage.community}</p>
      <p className="text-[13px] text-[--text-secondary] leading-relaxed">
        {lineage.techniqueDescription}
      </p>
    </div>
  );
}
```

**Components to build:** `<SearchHeader />` · `<WeaveDiscoveryBands />` · `<FacetDrawer />` · `<DispatchWindowPanel />` · `<CraftLineageBlock />` · `<PincodeChecker />` · `<ReturnEligibilityBadge />` · `<PaymentModeSelector />` · `<ReturnRequestForm />` · `<SupportTicketTimeline />`

**Rules:** `CraftLineageBlock` always visible (not in accordion); `DispatchWindowPanel` explains extended window for handwoven; `ReturnEligibilityBadge` above Add to Bag.

---

### Category B — Claude Artifacts

Implement **Artisan Depth** in Next.js 14 + TypeScript strict + Supabase + Stripe/COD. The fabric-first differentiator requires `CraftLineage` as a mandatory listing field and dispatch windows that vary by `DispatchCategory`.

**Four defining constraints:**

**1. CraftLineage is a mandatory listing field — not optional metadata.**
The `fabric_products` table has `craft_lineage JSONB NOT NULL`. Listing creation API `POST /api/seller/listings` returns 400 if `craftLineage` is missing or if `techniqueDescription` is under 20 characters. The LDP RSC fetches `craftLineage` and passes it to `<CraftLineageBlock>` which is rendered unconditionally in the page layout — no conditional rendering, no accordion gating.

**2. Dispatch window is determined by `DispatchCategory`, not seller input.**
`dispatchCategory: 'ready_to_ship' | 'handwoven_made_to_order' | 'custom_yardage'` is set at listing creation. `getDispatchLabel(product)` in `lib/fabric.ts` returns the authoritative dispatch copy: ready-to-ship = 2–3 days, handwoven = 7–10 days (with "woven to order" explanation), custom yardage = days after confirmation. Sellers cannot override dispatch days beyond their category SLA without ops approval.

**3. Custom yardage orders are permanently non-returnable.**
`dispatchCategory === 'custom_yardage'` → `returnEligible` is set to `false` by the server at listing creation, regardless of seller input. `POST /api/returns` checks DB value of `return_eligible` — if `false`, returns 422 with body `{ error: 'NON_RETURNABLE_PRODUCT' }`. `getReturnLabel` reflects this in UI. No client override possible.

**4. Yardage creates distinct cart line items.**
Cart item key is `${productId}-${variantId}-${yardage ?? 0}`. Two entries of the same fabric in different yardage are separate `CartItem` rows, each priced independently. `POST /api/quote` recomputes price per yardage unit from `pricePerMetre` on the listing. Buyer cannot merge yardage quantities into one line item.

**Folder structure:**
```
src/
├── app/
│   ├── (storefront)/
│   │   ├── page.tsx                     ← HeroCraftStory + WeaveDiscoveryBands + CuratedEdits
│   │   ├── search/page.tsx              ← RSC + FacetSidebar island
│   │   ├── listing/[slug]/page.tsx      ← RSC LDP: CraftLineageBlock (mandatory) + policy stack
│   │   ├── cart/page.tsx
│   │   ├── checkout/page.tsx
│   │   └── account/
│   │       ├── orders/page.tsx
│   │       └── returns/page.tsx
│   ├── support/page.tsx
│   ├── seller/dashboard/page.tsx
│   └── api/
│       ├── pincode/[code]/route.ts
│       ├── quote/route.ts               ← handles yardage pricing
│       ├── checkout/confirm/route.ts
│       ├── returns/route.ts             ← validates returnEligible from DB
│       ├── returns/[id]/approve/route.ts
│       ├── seller/listings/route.ts     ← validates craftLineage presence
│       └── webhooks/stripe/route.ts
├── lib/
│   ├── fabric.ts                        ← formatINR, getDispatchLabel, getReturnLabel
│   ├── pincode.ts
│   └── refund.ts
├── store/
│   ├── cartStore.ts                     ← item key includes yardage
│   └── checkoutStore.ts
└── types/fabric.ts
```

---

### Category B — Grok

Generate in this order:

```
1.  src/types/fabric.ts                — FabricType, WeaveTechnique, DispatchCategory,
                                          CraftLineage, FabricProduct, FabricVariant,
                                          PincodeCheckResult, CartItem, PaymentMode, RefundResolution
2.  src/lib/fabric.ts                  — formatINR, getDispatchLabel (by DispatchCategory),
                                          getReturnLabel, cartSubtotal
3.  src/store/cartStore.ts             — Zustand persist: key = productId+variantId+yardage
4.  src/store/checkoutStore.ts         — paymentMode (default 'prepaid'), pincodeResult
5.  src/app/api/pincode/[code]/route.ts
6.  src/app/api/quote/route.ts         — handles yardage unit pricing from pricePerMetre
7.  src/app/api/checkout/confirm/route.ts
8.  src/app/api/returns/route.ts       — 422 if product.returnEligible === false
9.  src/app/api/seller/listings/route.ts — validates craftLineage non-null + techniqueDescription ≥ 20 chars
10. src/app/page.tsx                   — HeroCraftStory + WeaveDiscoveryBands + CuratedEdits
11. src/app/search/page.tsx            — RSC + FacetSidebar island (add dispatchWindow facet)
12. src/app/listing/[slug]/page.tsx    — RSC LDP: CraftLineageBlock always rendered
13. src/app/cart/page.tsx
14. src/app/checkout/page.tsx
15. src/app/account/returns/page.tsx
16. src/components/CraftLineageBlock.tsx   — never in accordion, always visible
17. src/components/DispatchWindowPanel.tsx — extended-window explanation for handwoven
18. src/components/ReturnEligibilityBadge.tsx
19. src/components/WeaveDiscoveryBands.tsx
20. src/components/PaymentModeSelector.tsx
```

No optional `CraftLineage`. No client-overridable dispatch days. `custom_yardage` always non-returnable in DB.

---

### Category B — Gemini

Build **Artisan Depth**, distinguishing itself from generic craft stores through fabric-first discovery and dispatch transparency.

**Architecture layers:**
- **Discovery layer** — `WeaveDiscoveryBands` (primary: fabric type + weave technique), `FacetSidebar/Drawer` (dispatch window filter, return-eligible toggle), `CuratedEdits` (seasonal collections)
- **Confidence layer** — `PincodeChecker`, `DispatchWindowPanel` (dispatch days by `DispatchCategory`), `CraftLineageBlock` (community, origin, GI tag), `FabricCareInstructions`, `ReturnEligibilityBadge`
- **Transaction layer** — `CartSummary` (INR paise, yardage line items) → `/api/quote` (handles `pricePerMetre * yardage`) → `PaymentModeSelector` → `CheckoutPolicySummary` → confirmation
- **Support layer** — `ReturnRequestForm` (blocked for `custom_yardage`) → `ReturnTimeline` → refund resolution

**Dispatch window logic:**
```
DispatchCategory 'ready_to_ship'          → "Ships in 2–3 business days"
DispatchCategory 'handwoven_made_to_order' → "Woven to order — ships in 7–10 business days"
                                             (show explanatory note)
DispatchCategory 'custom_yardage'          → "Ships in {dispatchDays} days after yardage confirmation"
```

**Yardage cart rules:**
- Cart item key includes yardage: `${productId}-${variantId}-${yardage}`
- Different yardage amounts = different line items
- `/api/quote` multiplies `pricePerMetre` (paise per metre) by `yardage` for custom items

**Motion rules:** same as mulecom_02 (FacetDrawer x-slide, ReturnTimeline height expand, PincodeChecker opacity fade, `useReducedMotion()` guard).

---

### Category B — Cursor

In `src/app/`, implement in this exact order:

**Phase 1 — Shell and fabric discovery**
- `src/types/fabric.ts` — all domain types including `DispatchCategory`, `CraftLineage`, `FabricProduct`
- `src/lib/fabric.ts` — `formatINR`, `getDispatchLabel`, `getReturnLabel`, `cartSubtotal`
- `(storefront)/page.tsx` — `HeroCraftStory` + `WeaveDiscoveryBands` + `CuratedEdits` + `TrustStrip`
- `search/page.tsx` — RSC; facets include dispatch-window filter (`≤3 days` / `≤7 days` / `any`)

**Phase 2 — LDP with fabric-specific modules**

LDP right column order (top to bottom):
1. Title + price + `formatINR`
2. Fabric detail chips (weave technique, fabric type, width, weight)
3. Variant / colour selector
4. Yardage selector (only if `variant.yardageOptions`)
5. `<PincodeChecker>`
6. `<DispatchWindowPanel>` — shows after pincode check
7. `<CraftLineageBlock>` — always visible, never in accordion
8. `<FabricCareInstructions>`
9. `<ReturnEligibilityBadge>` — ABOVE Add to Bag
10. Add to Bag / Buy Now

**Full `DispatchWindowPanel` implementation:**
```tsx
import { DispatchCategory } from '@/types/fabric';
import { getDispatchLabel } from '@/lib/fabric';
import { Truck } from 'lucide-react';
export function DispatchWindowPanel({ product }: { product: FabricProduct }) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center gap-2">
        <Truck size={15} className="text-[--trust]" />
        <span className="text-[13px] font-semibold text-[--text-primary]">
          {getDispatchLabel(product)}
        </span>
      </div>
      {product.dispatchCategory === 'handwoven_made_to_order' && (
        <p className="text-[12px] text-[--text-secondary] pl-[23px] leading-relaxed">
          This saree is woven to order by the artisan community. The extended timeline
          ensures authentic handloom quality and supports fair artisan livelihoods.
        </p>
      )}
      {product.dispatchCategory === 'custom_yardage' && (
        <p className="text-[12px] text-[--text-secondary] pl-[23px]">
          Timeline begins after yardage confirmation by seller.
        </p>
      )}
    </div>
  );
}
```

**Phase 3 — Cart, checkout, returns**
- `cart/page.tsx` — cart with yardage line items; INR totals via `formatINR`
- `checkout/page.tsx` — QuoteSnapshot; PaymentModeSelector (COD disabled if pincode fails)
- `account/returns/page.tsx` — ReturnRequestForm (shows "Non-returnable" block for `custom_yardage` items, no form rendered)

**Phase 4 — Seller dashboard and support**
- `seller/dashboard/page.tsx` — listing CRUD (CraftLineage required), dispatch SLA, return approvals, payout summary
- `support/page.tsx` — SupportTicketForm + SupportTicketTimeline

**Absolute rules:**
- `CraftLineageBlock` is never inside a collapsible accordion — always rendered
- `getDispatchLabel(product)` for all dispatch strings — no hardcoded day numbers
- `ReturnEligibilityBadge` above Add to Bag in DOM
- `custom_yardage` items render "Non-returnable" badge AND disable return form
- `formatINR(paise)` throughout; no `₹` concatenation

**QA grep commands:**
```bash
# Confirm CraftLineageBlock is not inside accordion/collapsible
grep -n 'CraftLineageBlock' src/app/listing/\[slug\]/page.tsx
grep -rn 'Accordion\|Collapsible' src/app/listing/\[slug\]/page.tsx

# Verify no raw ₹ string concat
grep -rn "'₹'\|\"₹\"\|`₹" src/ --include='*.tsx' --include='*.ts'

# Check returns API validates returnEligible from DB
grep -n 'returnEligible\|return_eligible' src/app/api/returns/route.ts

# Confirm yardage in cart item key
grep -n 'yardage' src/store/cartStore.ts

# Validate dispatch label uses getDispatchLabel not hardcoded strings
grep -rn '"Ships in\|dispatches in\|Dispatches in' src/components/ src/app/ --include='*.tsx'
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
