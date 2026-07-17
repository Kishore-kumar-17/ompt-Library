---
prompt_id: mulecom_02
sub_category: Multi-Vendor E-commerce Marketplace
sub_type: Curated Artisan Commerce Marketplace
title: Heritage Commerce — Craft-Led Curated Marketplace
reference_patterns: craft_taxonomy_navigation, policy_visible_conversion, pincode_first_fulfillment
inspiration: jaypore.com
quality_score:
status: draft
notes:
---

## Base Prompt

### Section 1 — Role

You are a senior marketplace product designer with 10+ years of experience building two-sided commerce platforms where product storytelling and transaction reliability must coexist. You have built systems with complex fulfillment constraints, per-item return eligibility, mixed payment modes (COD and prepaid), and seller/ops workflows that require auditability.

You design for both shopper confidence and operational correctness. You know that in artisan commerce, trust is built by visible policy clarity, not just beautiful product imagery.

---

### Section 2 — Application Overview

This is a curated artisan marketplace focused on apparel, jewelry, home décor, and handcrafted accessories. The platform combines craft storytelling with modern e-commerce execution.

Buyers discover products through category and craft taxonomy, evaluate listings with delivery and policy clarity, and complete purchases through COD or prepaid paths. Sellers/brands manage listings, inventory, dispatch, return approvals, and payout visibility through role-gated operations screens.

The platform covers Homepage, Search/PLP, Listing Detail Page (LDP), Cart, Checkout, Buyer Account, Seller/Brand Dashboard, and Support/Policy systems.

Primary goal: high-confidence purchase conversion. Secondary goal: predictable seller operations and reduced support friction via explicit policy surfaces.

---

### Section 3 — Brand Voice & Mood

Voice is warm, culturally rooted, and respectful. It should celebrate craft lineage without slowing down critical purchase flows.

Discovery modules can be expressive and editorial. Transaction and support modules must be concise, explicit, and operationally clear.

Avoid exaggerated luxury language. Avoid vague claims about quality or authenticity without substantiation.

Vibe word: rooted.

---

### Section 4 — Core Features & Functionality

1. **Homepage**
- Search-first header
- Category and craft gateways (e.g., Ajrakh, Chikankari, Kalamkari, Banarasi)
- Curated collection blocks
- Trust strip (authenticity, quality checks, secure payment, return window)

2. **Search/PLP**
- Keyword search and taxonomy browsing
- Facets: category, craft, size, color, price, ready-to-ship, return eligibility
- Sorting: newest, price low-high, price high-low, relevance, popularity
- Product cards include craft metadata, dispatch hint, and policy badge

3. **LDP (Listing Detail Page)**
- Multi-image gallery and variant selectors
- Pincode availability checker
- Dispatch days and shipping timeline display
- Return eligibility and policy summary block
- Material, care, and disclosure sections
- Add to Bag + Buy Now

4. **Cart & Checkout**
- Cart summary with shipping/tax visibility
- Payment mode branch: prepaid vs COD
- Guest and account checkout
- Order confirmation with support and return entry points

5. **Buyer Account**
- Orders list and order details
- Return/exchange request flows
- Refund vs store-credit status tracking
- Support ticket history

6. **Seller/Brand Operations**
- Listing creation/edit and inventory controls
- Dispatch SLA updates
- Return approval/rejection and reasons
- Fee and payout summary

7. **Support & Policy Workflow**
- Contact/support form
- Ticket creation and status progression
- Escalation states for unresolved logistics/returns

---

### Section 5 — Design Specifications

**Visual style:** craft-forward editorial commerce. Warm-neutral shell, product-first presentation, clean transactional hierarchy.

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
- Body: `16px`, weight 400, line-height 1.6
- Small/meta: `14px`, weight 400, line-height 1.5
- Label/badge: `11px`, weight 600, uppercase

**Spacing:** 8pt system.
- Section spacing: `88px` desktop, `56px` mobile
- Grid gaps: `20px` desktop, `14px` mobile
- Card content padding: `16px` to `20px`

**Border radius:**
- Buttons: `8px`
- Cards: `10px`
- Inputs: `8px`
- Pills/badges: `999px`

**Responsive:** mobile-first.
- Breakpoints: `640`, `768`, `1024`, `1280`
- Listing grid: 4 desktop, 2 tablet, 2 mobile
- Filters: sidebar desktop, drawer mobile

**Accessibility:**
- WCAG AA
- visible focus (`2px` ring)
- keyboard navigation for filter drawers, accordions, and forms
- semantic labeling for policy status and dispatch indicators

**Motion:**
- Drawers/modals: <= `280ms`
- Card hover/transitions: <= `180ms`
- Reduced-motion fallback mandatory
- No autoplay decorative motion
- Respect: `prefers-reduced-motion: reduce` → disable all animations and transitions.

---

### Section 6 — Structure

**Homepage:**
1. Utility strip (shipping threshold, support link)
2. Sticky navigation + search
3. Hero story block
4. Craft taxonomy modules
5. Category clusters
6. Curated collection row
7. Trust badges strip
8. Footer policy and contact links

**Search/PLP:**
- Search bar + taxonomy chips
- Facet panel (desktop) / drawer (mobile)
- Result cards with:
  - product name
  - craft tag
  - price and sale state
  - dispatch/policy hint
- Sort controls and pagination

**LDP:**
- Left: media gallery
- Right:
  - title/price
  - variants
  - pincode checker
  - dispatch and shipping
  - return eligibility
  - add-to-bag/buy-now
- Below fold:
  - material/care/disclosure
  - related products
  - support links

**Cart/Checkout:**
- Explicit subtotal, shipping, tax, and total
- Payment mode note block (prepaid/COD)
- Refund mode clarity before order placement

**Account & Support:**
- order detail includes return/support actions
- timeline view for return/support progression

---

### Section 7 — Technical Specifications

- **Framework:** Next.js 14 App Router + TypeScript strict
- **Styling:** Tailwind + CSS variables
- **State:** Zustand for cart and UI state
- **Backend:** Supabase/Postgres domain model
- **Search:** facet-capable index abstraction
- **Payments:** Stripe prepaid + COD orchestration logic
- **Support:** ticket and event timeline model
- **Performance target:** Lighthouse 95+, LCP <2.5s, CLS <0.1

---

### Section 8 — Implementation Steps

1. Shell, navigation, taxonomy model
2. Search + PLP + facets
3. LDP conversion module (pincode/dispatch/return)
4. Cart totals and quote endpoint
5. Prepaid checkout path
6. COD checkout path
7. Return/exchange and refund/store-credit flows
8. Support ticket lifecycle
9. Seller ops and payout summaries
10. QA for edge-case policy and fulfillment states

Cut order if scope shrinks: editorial modules and advanced merchandising experiments. Never cut policy clarity, checkout correctness, or support lifecycle integrity.

---

### Section 9 — User Experience

Users arrive either with craft intent or product intent. Discovery must satisfy both quickly.

The key conversion confidence triad is:
1. Can this be delivered to my pincode?
2. When will it dispatch/arrive?
3. Can I return/exchange this specific item?

If any of these are unclear, conversion drops and support load rises.

Post-purchase UX must keep users informed with deterministic statuses and understandable outcomes (refund source method vs store credit).

---

### Section 10 — Constraints

- No hidden return eligibility conditions
- No ambiguous COD/refund behavior
- No client-authoritative pricing or totals
- No inaccessible filter/policy/support interfaces
- No deceptive urgency copy or fake scarcity
- No shipping promise without dispatch context

---

## Platform Versions

### Category A — Lovable

Build **Heritage Commerce**, a curated Indian artisan marketplace with craft taxonomy discovery and policy-transparent conversion. Warm editorial shell, product-first imagery, concise policy near every CTA.

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
--radius-badge: 999px;
```

**Build in this order:**
1. `<CraftNav>` — utility strip (free shipping threshold, support link); sticky nav with search + craft taxonomy chips
2. `<HeroStoryBlock>` — editorial craft story with headline, subtext, CTA; `--surface-tint` background
3. `<CraftTaxonomyRail>` — horizontal scroll of craft-type tiles: Ajrakh · Chikankari · Kalamkari · Banarasi · Ikat · Phulkari; icon + label + count badge
4. `<CategoryClusters>` — 3-col grid of category cards (Apparel / Jewellery / Home / Accessories)
5. `<TrustStrip>` — "Authenticity Checked" · "Quality Verified" · "Secure Payment" · "14-Day Returns on Eligible Items"; `--trust` icon colour
6. `<FacetFilters>` — category, craft type, size, colour, price range, ready-to-ship toggle, return-eligible toggle; desktop sidebar sticky, mobile drawer
7. `<ListingCard>` — product image, craft tag badge (`--accent`), dispatch hint ("Ships in 2–4 days"), return-eligible badge (`--trust`), price; sale state if `compareAtPrice` present
8. `<ListingDetailPage>` — left media gallery; right column:
   - title + price
   - variant selectors (size/colour)
   - `<PincodeChecker>` (enter pincode → show delivery date OR "Not deliverable")
   - `<DispatchInfoPanel>` (dispatch days, carrier, ETA)
   - `<ReturnEligibilityBadge>` — "14-day returns accepted" OR "Non-returnable" with reason
   - Add to Bag / Buy Now buttons
9. `<CartCheckout>` — explicit subtotal, shipping, tax, total; `<PaymentModeNote>` block explaining COD vs prepaid behaviour; refund-mode clarity (bank refund vs store credit) before order placement
10. `<SupportTicketTimeline>` — ticket creation → in-review → resolution; event log with timestamp + actor

**Critical constraints:**
- `<ReturnEligibilityBadge>` must appear ABOVE Add to Bag, never below or hidden in accordion
- `<PincodeChecker>` result must show before Add to Bag is enabled for delivery-dependent items
- COD charges (if applicable) must show in order summary before payment confirmation
- Policy accordion links must be keyboard-accessible (Enter/Space to expand)
- `--action` (`#3D2C1E`) on `--bg` (`#FCF8F2`) = 10.8:1 contrast — safe for all text and CTA

---

### Category A — ChatGPT Canvas

Build the full Heritage Commerce platform. Stack: React + TypeScript strict + Tailwind + Zustand + Vite.

**Setup:**
```bash
npm create vite@latest heritage-commerce -- --template react-ts
npm install zustand @tanstack/react-query tailwindcss react-router-dom date-fns
```

**Routes:** `/` · `/search` · `/listing/:slug` · `/cart` · `/checkout` · `/account/orders` · `/account/returns` · `/support` · `/seller/dashboard`

**Full type system (`src/types/artisan.ts`):**
```typescript
export type CraftType =
  | 'ajrakh' | 'chikankari' | 'kalamkari' | 'banarasi'
  | 'ikat' | 'phulkari' | 'block_print' | 'madhubani' | 'other';

export type PaymentMode = 'prepaid' | 'cod';
export type RefundResolution = 'original_payment' | 'store_credit';
export type ReturnStatus =
  | 'requested' | 'approved' | 'pickup_scheduled' | 'received' | 'refund_initiated' | 'closed';

export interface ArtisanProduct {
  id: string; slug: string; title: string;
  price: number;                  // INR paise
  compareAtPrice: number | null;  // INR paise, null = not on sale
  images: string[];
  craftType: CraftType; categorySlug: string;
  brandId: string; brandName: string;
  readyToShip: boolean;
  dispatchDays: number;           // business days to dispatch
  returnEligible: boolean;
  returnWindowDays: number;       // 0 if not eligible
  averageRating: number; reviewCount: number;
  variants: ProductVariant[];
}

export interface ProductVariant {
  id: string; label: string; // e.g. "Size: M" or "Colour: Indigo"
  available: boolean;
}

export interface PincodeCheckResult {
  pincode: string;
  deliverable: boolean;
  etaDays: number | null;         // null if not deliverable
  codAvailable: boolean;
  carrier: string | null;
}

export interface CartItem {
  productId: string; variantId: string;
  brandId: string; brandName: string;
  title: string; imageUrl: string;
  price: number;                  // INR paise
  quantity: number;
  returnEligible: boolean;
}

export interface CheckoutState {
  paymentMode: PaymentMode;
  pincodeResult: PincodeCheckResult | null;
  agreedToRefundPolicy: boolean;
}

export interface ReturnRequest {
  id: string; orderId: string; productId: string;
  status: ReturnStatus;
  reason: string;
  refundResolution: RefundResolution;
  events: ReturnEvent[];
}

export interface ReturnEvent {
  status: ReturnStatus; note: string;
  actorType: 'buyer' | 'seller' | 'ops'; createdAt: string;
}
```

**Utilities (`src/lib/artisan.ts`):**
```typescript
export function formatINR(paise: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR',
    maximumFractionDigits: 0,
  }).format(paise / 100);
}

export function cartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, i) => sum + i.price * i.quantity, 0);
}

export function getReturnStatusLabel(s: ReturnStatus): string {
  return {
    requested: 'Return Requested', approved: 'Approved',
    pickup_scheduled: 'Pickup Scheduled', received: 'Item Received',
    refund_initiated: 'Refund Initiated', closed: 'Closed',
  }[s];
}

export function getRefundResolutionLabel(r: RefundResolution, paymentMode: PaymentMode): string {
  if (r === 'store_credit') return 'Store credit (Heritage wallet)';
  if (paymentMode === 'cod') return 'Bank transfer (provide IFSC + account)';
  return 'Refund to original payment method';
}
```

**Zustand stores:**
```typescript
// src/store/cartStore.ts
interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQuantity: (productId: string, variantId: string, qty: number) => void;
  removeItem: (productId: string, variantId: string) => void;
  clearCart: () => void;
  subtotal: () => number;
}
export const useCartStore = create<CartState>()(persist(
  (set, get) => ({
    items: [],
    addItem: (item) => set((s) => {
      const key = `${item.productId}-${item.variantId}`;
      const exists = s.items.find((i) => `${i.productId}-${i.variantId}` === key);
      if (exists) return { items: s.items.map((i) =>
        `${i.productId}-${i.variantId}` === key ? { ...i, quantity: i.quantity + 1 } : i) };
      return { items: [...s.items, { ...item, quantity: 1 }] };
    }),
    updateQuantity: (pid, vid, qty) => set((s) => ({
      items: qty <= 0
        ? s.items.filter((i) => !(i.productId === pid && i.variantId === vid))
        : s.items.map((i) => i.productId === pid && i.variantId === vid ? { ...i, quantity: qty } : i),
    })),
    removeItem: (pid, vid) => set((s) => ({
      items: s.items.filter((i) => !(i.productId === pid && i.variantId === vid)) })),
    clearCart: () => set({ items: [] }),
    subtotal: () => cartSubtotal(get().items),
  }),
  { name: 'heritage-cart' }
));

// src/store/checkoutStore.ts
interface CheckoutStoreState {
  paymentMode: PaymentMode;
  pincodeResult: PincodeCheckResult | null;
  agreedToRefundPolicy: boolean;
  setPaymentMode: (mode: PaymentMode) => void;
  setPincodeResult: (result: PincodeCheckResult) => void;
  setAgreed: (v: boolean) => void;
}
export const useCheckoutStore = create<CheckoutStoreState>()((set) => ({
  paymentMode: 'prepaid',
  pincodeResult: null,
  agreedToRefundPolicy: false,
  setPaymentMode: (mode) => set({ paymentMode: mode }),
  setPincodeResult: (result) => set({ pincodeResult: result }),
  setAgreed: (v) => set({ agreedToRefundPolicy: v }),
}));
```

**Business rules:**
- Pincode check is required before cart can proceed if any item is not "ready to ship in all India"
- COD orders: refund defaults to store credit (configurable per seller); must show this before order placement
- Return eligibility: per-product, per-variant; `returnEligible === false` for custom-made items
- Quote endpoint controls final totals; client-computed subtotal is display-only

---

### Category A — Bolt

Build Heritage Commerce as a Vite React SPA with strong policy-aware conversion.

**File structure:**
```
src/
├── components/
│   ├── CraftNav.tsx
│   ├── HeroStoryBlock.tsx
│   ├── CraftTaxonomyRail.tsx
│   ├── CategoryClusters.tsx
│   ├── TrustStrip.tsx
│   ├── FacetSidebar.tsx
│   ├── FacetDrawer.tsx            ← mobile only
│   ├── ListingCard.tsx
│   ├── PincodeChecker.tsx         ← input + check result display
│   ├── DispatchInfoPanel.tsx      ← dispatch days, carrier, ETA
│   ├── ReturnEligibilityBadge.tsx ← eligible / non-returnable
│   ├── PaymentModeSelector.tsx    ← prepaid / COD toggle
│   ├── CheckoutPolicySummary.tsx  ← refund-mode explanation per payment mode
│   ├── ReturnRequestForm.tsx
│   └── SupportTicketTimeline.tsx
├── store/
│   ├── cartStore.ts
│   └── checkoutStore.ts
├── types/artisan.ts
├── lib/artisan.ts                 ← formatINR, cartSubtotal, getReturnStatusLabel
└── App.tsx
```

**Component contracts:**
- `<PincodeChecker onResult={setPincodeResult} />` — controlled input; renders delivery ETA on success, "Not deliverable to this pincode" on failure; COD badge if `codAvailable`
- `<ReturnEligibilityBadge eligible={boolean} windowDays={number} />` — green badge "14-day returns" or red badge "Non-returnable" with tooltip reason; positioned ABOVE Add to Bag button
- `<DispatchInfoPanel dispatchDays={number} />` — "Dispatches in 2–4 business days · Estimated delivery: {date range}"
- `<PaymentModeSelector />` — radio group: "Prepaid (UPI / Card / NetBanking)" vs "Cash on Delivery (COD)"; shows COD disabled state if `pincodeResult.codAvailable === false`
- `<CheckoutPolicySummary paymentMode={PaymentMode} />` — renders refund-resolution explanation: prepaid = "Refund to original payment method"; COD = "Store credit to Heritage wallet"

**Critical rules:**
- `formatINR(paise)` for all price rendering; no raw `₹` string construction
- `ReturnEligibilityBadge` ABOVE Add to Bag in DOM order (accessibility: announced first)
- `PaymentModeSelector` disables COD option if pincode check returned `codAvailable: false`
- Cart subtotal displayed in INR; final total only from server QuoteSnapshot

---

### Category A — v0

Create a Next.js 14 App Router artisan storefront with shadcn/ui + Tailwind. Zero hex literals in JSX — all from CSS custom properties.

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

**PincodeChecker component:**
```tsx
'use client';
import { useState } from 'react';
import { PincodeCheckResult } from '@/types/artisan';
export function PincodeChecker({ onResult }: { onResult: (r: PincodeCheckResult) => void }) {
  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState<PincodeCheckResult | null>(null);
  const [loading, setLoading] = useState(false);
  async function check() {
    if (pincode.length !== 6) return;
    setLoading(true);
    const res = await fetch(`/api/pincode/${pincode}`);
    const data: PincodeCheckResult = await res.json();
    setResult(data); onResult(data); setLoading(false);
  }
  return (
    <div className="space-y-2">
      <label className="text-[13px] font-semibold text-[--text-primary]">
        Check delivery to your pincode
      </label>
      <div className="flex gap-2">
        <input value={pincode} onChange={(e) => setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))}
          placeholder="Enter 6-digit pincode"
          className="flex-1 h-10 px-3 text-[14px] border border-[--border] rounded-[8px]
                     bg-[--surface] text-[--text-primary] focus:outline-2 focus:outline-[--action]" />
        <button onClick={check} disabled={pincode.length !== 6 || loading}
          className="h-10 px-4 text-[13px] font-semibold bg-[--action] text-white rounded-[8px]
                     disabled:opacity-40 hover:bg-[--action-hover] transition-colors">
          {loading ? 'Checking…' : 'Check'}
        </button>
      </div>
      {result && (
        <p className={`text-[13px] font-medium ${result.deliverable ? 'text-[--trust]' : 'text-[--warning]'}`}>
          {result.deliverable
            ? `Delivery in ${result.etaDays} days${result.codAvailable ? ' · COD available' : ''}`
            : 'Sorry, not deliverable to this pincode'}
        </p>
      )}
    </div>
  );
}
```

**Components to build:** `<SearchHeader />` · `<CraftTaxonomyRail />` · `<FacetDrawer />` · `<ListingDetailPolicyPanel />` · `<PincodeChecker />` · `<ReturnEligibilityBadge />` · `<PaymentModeSelector />` · `<ReturnRequestForm />` · `<SupportTicketTimeline />`

**Rules:** policy clarity above fold on LDP; keyboard accessibility on all drawers/accordions; COD option disabled in PaymentModeSelector when pincode check returns `codAvailable: false`.

---

### Category B — Claude Artifacts

Implement **Heritage Commerce** in Next.js 14 + TypeScript strict + Supabase + Stripe (prepaid) + COD orchestration logic.

**Four defining constraints:**

**1. Pincode governs delivery promise AND COD eligibility.**
`GET /api/pincode/[code]` calls the logistics aggregator (Shiprocket/Delhivery API) and returns `PincodeCheckResult`. The LDP client island subscribes to `useCheckoutStore.pincodeResult`. Add to Bag is enabled by default; but if `product.requiresPincodeCheck === true` AND `pincodeResult === null`, the CTA label reads "Check delivery first" and submitting shows an inline nudge. `PaymentModeSelector` reads `pincodeResult.codAvailable` to enable/disable COD radio — this check is client-side UI only; server validates independently at checkout.

**2. COD vs prepaid triggers different refund resolution.**
`CheckoutState.paymentMode` is persisted in `useCheckoutStore`. At `POST /api/checkout/confirm`, server writes `order.paymentMode`. On return approval at `POST /api/returns/[id]/approve`, server reads `order.paymentMode`: if `'cod'` → `refundResolution = 'store_credit'` (credits Heritage wallet); if `'prepaid'` → `refundResolution = 'original_payment'` (initiates Stripe refund). This logic lives entirely server-side; client only displays the resolution label from `getRefundResolutionLabel`.

**3. Return eligibility is per-listing-variant, not per-order.**
`artisan_products.return_eligible: boolean` and `return_window_days: integer` are set at listing creation. `GET /api/listing/[slug]` returns these fields. The LDP renders `<ReturnEligibilityBadge>` from this data. At return request creation `POST /api/returns`, server re-validates `product.returnEligible` against DB (not client payload). No client-submitted return eligibility flag is trusted.

**4. Quote snapshot is immutable once checkout starts.**
`POST /api/quote` writes `quote_snapshots { id, items_json, subtotal_paise, shipping_paise, tax_paise, total_paise, payment_mode, expires_at: now + 15min }`. `POST /api/checkout/confirm` body must include `quoteSnapshotId`; server checks `expires_at > now` and item prices still match. If snapshot expired or prices drifted > 1%, checkout returns `422 Quote Expired` and client prompts user to re-check cart.

**Folder structure:**
```
src/
├── app/
│   ├── (storefront)/
│   │   ├── page.tsx                      ← HeroStory + CraftTaxonomy + CategoryClusters + TrustStrip
│   │   ├── search/page.tsx               ← RSC: fetch listings; FacetSidebar client island
│   │   ├── listing/[slug]/page.tsx       ← RSC: LDP with PincodeChecker + policy + AddToBag
│   │   ├── cart/page.tsx                 ← CartSummary + PaymentModeSelector
│   │   ├── checkout/page.tsx             ← QuoteSnapshot display + Stripe/COD confirm
│   │   └── account/
│   │       ├── orders/page.tsx
│   │       └── returns/page.tsx          ← ReturnRequestForm + ReturnTimeline
│   ├── support/page.tsx                  ← SupportTicketForm + SupportTicketTimeline
│   ├── seller/dashboard/page.tsx         ← listing/inventory/dispatch/returns/payout
│   └── api/
│       ├── pincode/[code]/route.ts        ← logistics API proxy
│       ├── quote/route.ts                 ← POST: QuoteSnapshot writer
│       ├── checkout/confirm/route.ts      ← POST: validate snapshot + create order
│       ├── returns/route.ts               ← POST: create return request
│       ├── returns/[id]/approve/route.ts  ← POST: approve + set refundResolution
│       ├── support/route.ts
│       └── webhooks/stripe/route.ts
├── lib/
│   ├── artisan.ts                         ← formatINR, cartSubtotal, getReturnStatusLabel
│   ├── pincode.ts                         ← checkPincode(code) → PincodeCheckResult
│   └── refund.ts                          ← resolveRefundMode(order) → RefundResolution
├── store/
│   ├── cartStore.ts
│   └── checkoutStore.ts
└── types/artisan.ts
```

---

### Category B — Grok

Generate in this order:

```
1.  src/types/artisan.ts               — CraftType, PaymentMode, RefundResolution, ReturnStatus,
                                          ArtisanProduct, ProductVariant, PincodeCheckResult,
                                          CartItem, CheckoutState, ReturnRequest, ReturnEvent
2.  src/lib/artisan.ts                 — formatINR, cartSubtotal, getReturnStatusLabel,
                                          getRefundResolutionLabel
3.  src/store/cartStore.ts             — Zustand persist: addItem (variant key), updateQuantity,
                                          removeItem, clearCart, subtotal()
4.  src/store/checkoutStore.ts         — paymentMode (default 'prepaid'), pincodeResult,
                                          agreedToRefundPolicy
5.  src/app/api/pincode/[code]/route.ts — GET: proxy to logistics API, return PincodeCheckResult
6.  src/app/api/quote/route.ts         — POST: compute paise totals, write quote_snapshots row
7.  src/app/api/checkout/confirm/route.ts — POST: validate snapshot, create order, branch COD/prepaid
8.  src/app/api/returns/route.ts       — POST: create return_requests row (validate returnEligible)
9.  src/app/api/returns/[id]/approve/route.ts — POST: set refundResolution per paymentMode
10. src/app/api/support/route.ts       — POST: create support ticket
11. src/app/page.tsx                   — HeroStoryBlock + CraftTaxonomyRail + TrustStrip
12. src/app/search/page.tsx            — RSC + FacetSidebar client island
13. src/app/listing/[slug]/page.tsx    — RSC LDP: PincodeChecker + ReturnEligibilityBadge + AddToBag
14. src/app/cart/page.tsx              — CartSummary + PaymentModeSelector
15. src/app/checkout/page.tsx          — QuoteSnapshot + Stripe Elements or COD confirm
16. src/app/account/returns/page.tsx   — ReturnRequestForm + ReturnTimeline
17. src/components/PincodeChecker.tsx
18. src/components/ReturnEligibilityBadge.tsx
19. src/components/PaymentModeSelector.tsx
20. src/components/SupportTicketTimeline.tsx
```

No hidden return eligibility assumptions. No silent COD/prepaid refund switching. No client-authoritative totals.

---

### Category B — Gemini

Build **Heritage Commerce**, an Indian artisan marketplace combining craft storytelling with operational checkout precision.

**Architecture layers:**
- **Discovery layer** — `CraftTaxonomyRail` (craft-type navigation: Ajrakh, Chikankari, etc.), `FacetSidebar/Drawer` (category / craft / size / price / ready-to-ship / return-eligible), `CategoryClusters`
- **Confidence layer** — `PincodeChecker` (delivery date + COD availability), `DispatchInfoPanel` (dispatch SLA in business days), `ReturnEligibilityBadge` (per-product eligibility + window)
- **Transaction layer** — `CartSummary` (INR paise, `formatINR`) → `/api/quote` snapshot → `PaymentModeSelector` (prepaid/COD) → `CheckoutPolicySummary` (refund resolution) → order confirmation
- **Post-purchase layer** — `ReturnRequestForm` → append-only `ReturnEvent` rows → `ReturnTimeline` → refund/store-credit resolution

**INR pricing rules:**
- All prices stored and transmitted as integer INR paise
- `formatINR(paise)` via `Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 })`
- `₹` never hardcoded; always from `formatINR`

**COD/prepaid decision tree:**
```
pincodeResult.codAvailable === false → COD option disabled in UI + server rejects COD checkout
paymentMode === 'prepaid' → Stripe PaymentIntent → on success → order confirmed
paymentMode === 'cod' → order created with status 'pending_cod' → on delivery confirmed → order complete
return approved + paymentMode === 'cod' → refundResolution = 'store_credit'
return approved + paymentMode === 'prepaid' → refundResolution = 'original_payment' → Stripe refund
```

**Motion rules:**
- `<FacetDrawer>` — `x: '-100%' → 0`, 240ms ease-out
- `<ReturnTimeline>` event expand — `height: 0 → auto`, 200ms ease
- `<PincodeChecker>` result — `opacity: 0 → 1`, `y: 4 → 0`, 150ms
- All `whileInView` → `viewport={{ once: true }}`; `useReducedMotion()` guard mandatory

---

### Category B — Cursor

In `src/app/`, implement in this exact order:

**Phase 1 — Discovery and search**
- `src/types/artisan.ts` — all domain types including `CraftType`, `PincodeCheckResult`, `PaymentMode`, `RefundResolution`
- `src/lib/artisan.ts` — `formatINR(paise)`, `cartSubtotal`, `getReturnStatusLabel`, `getRefundResolutionLabel`
- `(storefront)/page.tsx` — `HeroStoryBlock` + `CraftTaxonomyRail` + `TrustStrip`
- `search/page.tsx` — RSC with `FacetSidebar` client island; craft taxonomy filter chips

**Phase 2 — LDP with policy modules**
- `listing/[slug]/page.tsx` — RSC; left gallery; right policy stack (in this exact order top to bottom):
  1. Title + price
  2. Variant selectors
  3. `<PincodeChecker>` — required before dispatch info shows
  4. `<DispatchInfoPanel>` — visible after pincode check
  5. `<ReturnEligibilityBadge>` — ABOVE Add to Bag
  6. Add to Bag / Buy Now

**Full `ReturnEligibilityBadge` implementation:**
```tsx
import { CheckCircle, XCircle } from 'lucide-react';
export function ReturnEligibilityBadge({ eligible, windowDays }: {
  eligible: boolean; windowDays: number;
}) {
  if (eligible) {
    return (
      <div className="flex items-center gap-2 py-2 px-3 rounded-[8px] bg-[--surface-tint]
                      border border-[--border]">
        <CheckCircle size={16} className="text-[--trust] flex-shrink-0" />
        <span className="text-[13px] text-[--text-primary]">
          <strong className="font-semibold">{windowDays}-day returns</strong> accepted on this item
        </span>
      </div>
    );
  }
  return (
    <div className="flex items-center gap-2 py-2 px-3 rounded-[8px] bg-[--surface-tint]
                    border border-[--border]">
      <XCircle size={16} className="text-[--warning] flex-shrink-0" />
      <span className="text-[13px] text-[--text-secondary]">
        This item is <strong className="font-semibold text-[--text-primary]">non-returnable</strong>
        {' '}(custom-made / final sale)
      </span>
    </div>
  );
}
```

**Phase 3 — Cart, checkout, and payment branch**
- `cart/page.tsx` — `CartSummary` (INR paise totals) + `PaymentModeSelector`

**Full `PaymentModeSelector` implementation:**
```tsx
'use client';
import { useCheckoutStore } from '@/store/checkoutStore';
import { PaymentMode } from '@/types/artisan';
export function PaymentModeSelector() {
  const { paymentMode, setPaymentMode, pincodeResult } = useCheckoutStore();
  const codDisabled = pincodeResult !== null && !pincodeResult.codAvailable;
  return (
    <fieldset className="space-y-2">
      <legend className="text-[14px] font-semibold text-[--text-primary]">Payment method</legend>
      {(['prepaid', 'cod'] as PaymentMode[]).map((mode) => (
        <label key={mode} className={`flex items-start gap-3 p-3 rounded-[8px] border cursor-pointer
          ${paymentMode === mode ? 'border-[--action] bg-[--surface-tint]' : 'border-[--border]'}
          ${mode === 'cod' && codDisabled ? 'opacity-40 cursor-not-allowed' : ''}`}>
          <input type="radio" name="paymentMode" value={mode}
            checked={paymentMode === mode}
            disabled={mode === 'cod' && codDisabled}
            onChange={() => setPaymentMode(mode)}
            className="mt-0.5 accent-[--action]" />
          <div>
            <p className="text-[14px] font-medium text-[--text-primary]">
              {mode === 'prepaid' ? 'Prepaid — UPI / Card / NetBanking' : 'Cash on Delivery (COD)'}
            </p>
            <p className="text-[12px] text-[--text-secondary] mt-0.5">
              {mode === 'prepaid'
                ? 'Refund to original payment method if returned'
                : codDisabled
                  ? 'COD not available for this pincode'
                  : 'Refunds credited as Heritage store credit'}
            </p>
          </div>
        </label>
      ))}
    </fieldset>
  );
}
```

- `checkout/page.tsx` — POST to `/api/quote` on load; render `QuoteSnapshot`; branch to Stripe Elements (prepaid) or COD confirm button

**Phase 4 — Returns, support, seller ops**
- `account/returns/page.tsx` — `ReturnRequestForm` + `ReturnTimeline`
- `support/page.tsx` — ticket form + `SupportTicketTimeline`
- `seller/dashboard/page.tsx` — listing CRUD + dispatch SLA + return approvals + payout summary

**Absolute rules:**
- `formatINR(paise)` for all price rendering; never `'₹' + (paise / 100)`
- `ReturnEligibilityBadge` above Add to Bag in DOM order
- COD radio disabled when `pincodeResult.codAvailable === false`
- Server validates `returnEligible` at return creation — never trust client
- `refundResolution` set server-side based on `order.paymentMode`

**QA grep commands:**
```bash
# No raw ₹ string concatenation
grep -rn "'₹'\|\"₹\"\|`₹" src/ --include='*.tsx' --include='*.ts'

# Confirm ReturnEligibilityBadge appears before AddToBag in LDP
grep -n 'ReturnEligibilityBadge\|AddToBag\|Buy Now' src/app/listing/\[slug\]/page.tsx

# Check COD disabled guard exists in PaymentModeSelector
grep -n 'codAvailable\|codDisabled' src/components/PaymentModeSelector.tsx

# Verify refundResolution is set server-side, never from client payload
grep -rn 'refundResolution' src/app/api/ --include='*.ts'

# Confirm no client-computed final totals passed to checkout confirm
grep -rn 'totalPaise\|total_paise' src/app/checkout/ --include='*.tsx'
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
