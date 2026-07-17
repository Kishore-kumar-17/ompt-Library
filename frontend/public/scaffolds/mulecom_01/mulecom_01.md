---
prompt_id: mulecom_01
sub_category: Multi-Vendor E-commerce Marketplace
sub_type: Handmade & Vintage Two-Sided Marketplace
title: Crafted Discovery — Trust-First Multi-Seller Marketplace
reference_patterns: search_first_discovery, trust_badge_resolution_flow, seller_buyer_dual_journeys
inspiration: etsy.com
quality_score:
status: draft
notes:
---

## Base Prompt

### Section 1 — Role

You are a senior marketplace product designer with 10+ years of experience building two-sided e-commerce products. You design systems that work for both buyers and sellers: search quality, listing trust, checkout reliability, post-purchase support, seller economics, and dispute resolution.

You understand that marketplace UX is not only “browse and buy.” It is also policy comprehension, expectation management, and transparent issue handling at scale.

---

### Section 2 — Application Overview

This is a multi-vendor marketplace for handmade, vintage, and custom goods. Buyers discover products through search and category browsing, evaluate listings from independent shops, place orders, and receive post-purchase support through help requests and case workflows.

Sellers create listings, manage inventory and fulfillment, communicate with buyers, and track orders, fees, and payout status. Marketplace operators need moderation controls and clear operational audit trails.

The platform covers: Homepage, Search/PLP, Listing Detail Page (LDP), Cart, Checkout, Buyer Account, Seller Dashboard, and Trust/Case workflows.

Primary goal: successful purchase with high buyer confidence. Secondary goal: high seller retention via predictable tools, clear fee visibility, and fair protection systems.

---

### Section 3 — Brand Voice & Mood

Voice is warm, human, and maker-centered. It should feel personal and discovery-friendly without becoming chaotic or noisy.

Copy should be concise and practical in transactional areas (cart, checkout, support), and more expressive in discovery/editorial surfaces.

Trust language should be plain and direct. Avoid legalistic jargon where possible. Buyers need to understand what happens if something goes wrong.

Vibe word: human.

---

### Section 4 — Core Features & Functionality

1. **Homepage** — search-first hero, gift hubs, editorial category clusters, trending listings, trust explainer strip
2. **Search/PLP** — keyword search, faceted filters (price, shipping speed, location, item type, rating), sort controls, paginated loading strategy
3. **Listing Detail Page (LDP)** — media gallery, variation selectors, seller profile trust card, shipping estimate, return policy, review excerpts, add to cart/favorites
4. **Cart** — grouped by seller/shop, shipping estimates per shop, tax and subtotal visibility, mixed-shop checkout prep
5. **Checkout** — guest and account flows, address/payment collection, grouped shop totals, confirmation state
6. **Buyer Account** — order history, tracking, favorites, help request entry, case escalation and timeline
7. **Seller Dashboard** — listing creation/edit, stock and price updates, order lifecycle, shipping dispatch, fees and payout summary
8. **Trust & Resolution** — purchase protection criteria visibility, help request waiting period rules, case statuses, resolution outcomes

---

### Section 5 — Design Specifications

**Visual style:** discovery-rich, marketplace-neutral, image-first. Warm neutrals in global surfaces; product cards and listing imagery remain primary.

**Color mode:** Light.

**Color palette:**
- Background: `#FFFDF9`
- Surface: `#FFFFFF`
- Section tint: `#F8F2E8`
- Primary text: `#22201D`
- Secondary text: `#66625D`
- Tertiary text: `rgba(34,32,29,0.48)`
- Border: `rgba(34,32,29,0.14)`
- Action: `#3B2F2A`
- Action hover: `#241D1A`
- Accent warm: `#C9782D`
- Trust success: `#2E7D32`
- Warning: `#A86A1C`

**Typography:**
- Display: `clamp(34px, 4.8vw, 60px)`, weight 600, line-height 1.1
- H2: `clamp(24px, 3.6vw, 40px)`, weight 600, line-height 1.15
- H3: `20px`, weight 500, line-height 1.25
- Body: `16px`, weight 400, line-height 1.6
- Small/meta: `14px`, weight 400, line-height 1.5
- Label/badge: `11px`, weight 600, uppercase tracking `0.05em`

**Spacing:** 8pt scale. Section spacing `88px` desktop / `56px` mobile. Grid gaps `20px` desktop / `14px` mobile.

**Border radius:** Buttons `999px`, cards `10px`, inputs `8px`, badges `999px`.

**Responsive:** Mobile-first breakpoints `640`, `768`, `1024`, `1280`.
- Search results grid: 4 desktop / 2 tablet / 2 mobile
- Filter drawer on mobile; sticky sidebar on desktop

**Accessibility:** WCAG AA, strong focus states, keyboardable filters/dialogs, semantic labels on options and seller actions.

**Motion:**
- Drawers/modals under `280ms`
- Hover transitions under `180ms`
- Case timeline expand/collapse under `200ms`
- Respect `prefers-reduced-motion`

---

### Section 6 — Structure

**Homepage:**
1. Utility strip + primary nav
2. Search-first hero
3. Seasonal/gift discovery modules
4. Editorial interest rails
5. Popular category grid
6. Trust and purchase protection strip
7. Footer with help and policy links

**Search/PLP:**
- Sticky search input + filter controls
- Facet groups (price, shipping, location, rating, handmade/vintage/custom)
- Listing cards with seller name, star rating, shipping ETA hint, price/sale state
- Sort controls and paginated loading

**LDP:**
- Left: media gallery
- Right: title, price, options, estimated delivery, seller trust card, return/policy highlights
- Reviews and related listings below fold

**Cart:**
- Group line items by seller
- Show shipping notes per seller group
- Show subtotal per seller and final combined total

**Checkout:**
- Keep grouped seller sections visible in order summary
- Guest checkout option visible by default
- Clear path from payment success to order confirmation

---

### Section 7 — Technical Specifications

- **Framework:** Next.js 14 App Router + TypeScript strict
- **Styling:** Tailwind + CSS variables
- **State:** Zustand (cart, local UI prefs)
- **Backend:** PostgreSQL/Supabase (users, shops, listings, orders, cases, payouts)
- **Search:** facet-capable indexed search abstraction
- **Payments:** Stripe Connect-style marketplace split payout model
- **Messaging:** buyer-seller thread model
- **Performance target:** LCP <2.5s, CLS <0.1, Lighthouse 95+

---

### Section 8 — Implementation Steps

1. Global shell + search-first nav
2. Listing and shop domain schema
3. Search results + facet filter behavior
4. LDP trust and conversion modules
5. Multi-shop cart and grouped totals
6. Checkout + quote + payment reconciliation
7. Buyer help request/case lifecycle
8. Seller dashboard (listings/orders/fees)
9. QA on trust, payouts, and dispute edge cases

Cut order if scope shrinks: editorial homepage extras, deep recommendation modules, advanced seller analytics. Never cut grouped checkout correctness, trust clarity, or support escalation flows.

---

### Section 9 — User Experience

Buyers start broad and narrow fast. Search and filtering must reduce noise quickly. Listing pages must answer trust questions before purchase: who is the seller, when will this arrive, can I return it, and what protection exists.

Sellers need predictable operations: listing controls, order updates, fee clarity, and dispute visibility. Marketplace trust depends on transparent, auditable case resolution.

Friction to remove: unclear shipping windows, hidden policy terms, confusing multi-shop totals, opaque case-state transitions.

---

### Section 10 — Constraints

- No hidden policy language around protection/cases
- No opaque seller fee presentation
- No client-authoritative totals for multi-shop checkout
- No inaccessible filter patterns
- No dark-pattern urgency (fake countdowns, deceptive stock warnings)
- No single-seller assumptions in cart/checkout architecture

---

## Platform Versions

### Category A — Lovable

Build **Crafted Discovery**, a warm two-sided marketplace for handmade and vintage goods. Image-first, discovery-rich, trust-transparent.

**Design tokens (paste into theme):**
```css
--bg: #FFFDF9;
--surface: #FFFFFF;
--surface-tint: #F8F2E8;
--text-primary: #22201D;
--text-secondary: #66625D;
--text-tertiary: rgba(34,32,29,0.48);
--border: rgba(34,32,29,0.14);
--action: #3B2F2A;
--action-hover: #241D1A;
--accent: #C9782D;
--trust: #2E7D32;
--warning: #A86A1C;
--radius-btn: 999px;
--radius-card: 10px;
--radius-input: 8px;
```

**Build in this order:**
1. `<MarketplaceNav>` — sticky, search input centred, account + cart icons right; search expands full-width on focus
2. `<SearchHero>` — large search bar on `--surface-tint`, category pill chips below (Handmade / Vintage / Custom / Supplies)
3. `<CategoryRails>` — horizontal scroll on mobile, 6-col grid desktop; icon + label tiles, `--surface-tint` background
4. `<TrustStrip>` — 4 badges: "Buyer Protection", "Real Independent Sellers", "Secure Checkout", "Easy Returns"; `--trust` icon colour
5. `<FacetSidebar>` (desktop sticky) + `<FacetDrawer>` (mobile sheet) — price range slider, item type toggles (Handmade/Vintage), star rating filter, shipping speed (Any/Free/Fast), location text input
6. `<ListingGrid>` — 4-col desktop → 2-col tablet + mobile; each `<ListingCard>` shows seller name in `--accent`, star rating, shipping ETA hint, price; sale badge if `compareAtPrice` present
7. `<ListingDetailPage>` — left media gallery with thumbnail strip; right: title, price, options, estimated delivery, `<SellerTrustCard>`, return policy summary, Add to Cart button (`--action` bg, `--radius-btn`)
8. `<ShopGroupedCart>` — line items visually grouped by shop header; per-shop subtotal + shipping line; combined order total at bottom; never merge items across shops
9. `<CheckoutFlow>` — grouped shop summary stays visible in order summary column; guest checkout option first; address → payment → confirm
10. `<HelpRequestPanel>` + `<CaseTimeline>` — open help request form (subject, description, attach evidence); case events rendered as timeline with coloured status dots

**Critical constraints:**
- `--action` (`#3B2F2A`) for all primary CTAs; `--accent` (`#C9782D`) is accent only — never use as button background with white text (contrast 2.9:1 fails WCAG AA for normal text)
- Cart MUST show per-shop subtotals and shipping; the combined total is a sum of shop groups, never a single flat total
- Return policy block must appear on LDP above the fold, before Add to Cart
- `SellerTrustCard` always shows: avatar, shop name, star rating, total sales, "Star Seller" badge if `isStarSeller`, processing days copy ("Ships in 1–3 days")
- No dark-pattern urgency: no fake countdown timers, no "Only 2 left!" unless `stockCount <= 2` is real data

---

### Category A — ChatGPT Canvas

Build the full two-sided marketplace. Stack: React + TypeScript strict + Tailwind + Zustand + Vite.

**Setup:**
```bash
npm create vite@latest crafted-discovery -- --template react-ts
npm install zustand @tanstack/react-query tailwindcss react-router-dom date-fns
```

**Routes:** `/` · `/search` · `/listing/:slug` · `/cart` · `/checkout` · `/account/orders` · `/account/help` · `/seller/dashboard`

**Full type system (`src/types/marketplace.ts`):**
```typescript
export type CaseStatus =
  | 'help_requested' | 'case_open' | 'under_review' | 'resolved' | 'closed';
export type ItemType = 'handmade' | 'vintage' | 'supplies' | 'custom';
export type SortOption = 'relevance' | 'newest' | 'price_asc' | 'price_desc' | 'top_rated';

export interface Listing {
  id: string;
  slug: string;
  title: string;
  price: number;                 // cents USD
  compareAtPrice: number | null; // cents, null = not on sale
  shippingPrice: number;         // cents, 0 = free
  images: string[];
  shopId: string;
  shopName: string;
  itemType: ItemType;
  stockCount: number;
  estimatedShipDays: number;
  returnsAccepted: boolean;
  averageRating: number;
  reviewCount: number;
}

export interface Shop {
  id: string; slug: string; name: string;
  ownerName: string; avatarUrl: string;
  salesCount: number; rating: number; reviewCount: number;
  isStarSeller: boolean; processingDays: number; onVacation: boolean;
}

export interface CartItem {
  listingId: string; shopId: string; shopName: string;
  title: string; imageUrl: string;
  price: number; shippingPrice: number;
  quantity: number; maxQuantity: number;
}

export interface ShopGroup {
  shopId: string; shopName: string;
  items: CartItem[];
  subtotal: number; // sum(price * qty), cents
  shipping: number; // cents
}

export interface SearchFilters {
  query: string; priceMin: number | null; priceMax: number | null;
  itemType: ItemType | null; minRating: number | null;
  freeShipping: boolean; location: string | null; sort: SortOption;
}

export interface CaseEvent {
  status: CaseStatus; message: string;
  actorType: 'buyer' | 'seller' | 'system'; createdAt: string;
}

export interface Case {
  id: string; orderId: string; status: CaseStatus;
  openedAt: string; events: CaseEvent[];
}
```

**Utilities (`src/lib/marketplace.ts`):**
```typescript
export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD',
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

export function groupCartByShop(items: CartItem[]): ShopGroup[] {
  const map = new Map<string, ShopGroup>();
  for (const item of items) {
    if (!map.has(item.shopId)) {
      map.set(item.shopId, { shopId: item.shopId, shopName: item.shopName,
        items: [], subtotal: 0, shipping: 0 });
    }
    const g = map.get(item.shopId)!;
    g.items.push(item);
    g.subtotal += item.price * item.quantity;
    g.shipping = Math.max(g.shipping, item.shippingPrice);
  }
  return Array.from(map.values());
}

export function cartTotal(groups: ShopGroup[]): number {
  return groups.reduce((sum, g) => sum + g.subtotal + g.shipping, 0);
}

export function getCaseStatusLabel(s: CaseStatus): string {
  return { help_requested: 'Help Requested', case_open: 'Case Open',
    under_review: 'Under Review', resolved: 'Resolved', closed: 'Closed' }[s];
}

export const CASE_NEXT: Partial<Record<CaseStatus, CaseStatus>> = {
  help_requested: 'case_open', case_open: 'under_review',
  under_review: 'resolved', resolved: 'closed',
};
```

**Zustand cart store (`src/store/cartStore.ts`):**
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, ShopGroup } from '@/types/marketplace';
import { groupCartByShop, cartTotal } from '@/lib/marketplace';

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  updateQuantity: (listingId: string, qty: number) => void;
  removeItem: (listingId: string) => void;
  clearCart: () => void;
  groups: () => ShopGroup[];
  total: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((s) => {
        const existing = s.items.find((i) => i.listingId === item.listingId);
        if (existing) {
          return { items: s.items.map((i) => i.listingId === item.listingId
            ? { ...i, quantity: Math.min(i.quantity + 1, i.maxQuantity) } : i) };
        }
        return { items: [...s.items, { ...item, quantity: 1 }] };
      }),
      updateQuantity: (listingId, qty) => set((s) => ({
        items: qty <= 0
          ? s.items.filter((i) => i.listingId !== listingId)
          : s.items.map((i) => i.listingId === listingId ? { ...i, quantity: qty } : i),
      })),
      removeItem: (id) => set((s) => ({ items: s.items.filter((i) => i.listingId !== id) })),
      clearCart: () => set({ items: [] }),
      groups: () => groupCartByShop(get().items),
      total: () => cartTotal(groupCartByShop(get().items)),
    }),
    { name: 'crafted-cart' }
  )
);
```

**Business rules:**
- Cart grouped by shop is mandatory; `ShopGroup[]` is the unit, never flat `CartItem[]`
- Quote/tax/shipping totals resolved server-side at `/api/quote`
- `CaseStatus` transitions follow `CASE_NEXT` map; no arbitrary jumps
- Seller fee events stored as append-only ledger rows, auditable in dashboard

---

### Category A — Bolt

Build the Crafted Discovery marketplace as a Vite React SPA.

**File structure:**
```
src/
├── components/
│   ├── MarketplaceNav.tsx
│   ├── SearchHero.tsx
│   ├── CategoryRails.tsx
│   ├── TrustStrip.tsx
│   ├── FacetSidebar.tsx          ← desktop sticky sidebar
│   ├── FacetDrawer.tsx           ← mobile Sheet, closes on apply
│   ├── ListingCard.tsx
│   ├── ListingGrid.tsx
│   ├── SellerTrustCard.tsx
│   ├── CartDrawer.tsx            ← slides from right, not a Dialog
│   ├── ShopGroupedCart.tsx       ← receives ShopGroup[], not CartItem[]
│   ├── CheckoutGroupSummary.tsx
│   ├── HelpRequestPanel.tsx
│   └── CaseTimeline.tsx
├── store/
│   ├── cartStore.ts
│   └── searchStore.ts
├── types/marketplace.ts
├── lib/marketplace.ts            ← formatPrice, groupCartByShop, cartTotal
└── App.tsx
```

**Component contracts:**
- `<ShopGroupedCart groups={ShopGroup[]} />` — never accepts raw `CartItem[]`; renders per-shop section with shop header, line items, per-shop subtotal + shipping, divider, then combined total footer
- `<SellerTrustCard shop={Shop} />` — avatar, name, `{salesCount.toLocaleString()} sales`, star rating, processing days, "Star Seller" badge if `isStarSeller === true`
- `<CaseTimeline events={CaseEvent[]} />` — events in chronological order; status dot colours: `help_requested` = `#A86A1C`, `case_open` = `#C9782D`, `under_review` = `#C9782D`, `resolved` = `#2E7D32`, `closed` = `#66625D`
- `<FacetDrawer />` — renders below `768px` only; controlled by `useSearchStore`; apply button commits filters and closes
- `<CartDrawer />` — `x: '100%' → 0` Framer Motion slide, 280ms; wraps `ShopGroupedCart`

**Critical rules:**
- `formatPrice` from `src/lib/marketplace.ts`; no inline `$` string construction
- All motion wrapped in `const shouldReduce = useReducedMotion(); if (shouldReduce) skip animation`
- Minimum tap target `44px` height on all interactive elements
- `ListingCard` image: `aspect-square`, `object-cover`; hover scale on image only (not card border)

---

### Category A — v0

Create a Next.js 14 App Router marketplace with shadcn/ui + Tailwind. All colour values from CSS custom properties — zero hex literals in JSX.

**globals.css additions:**
```css
:root {
  --bg: #FFFDF9; --surface: #FFFFFF; --surface-tint: #F8F2E8;
  --text-primary: #22201D; --text-secondary: #66625D;
  --text-tertiary: rgba(34,32,29,0.48); --border: rgba(34,32,29,0.14);
  --action: #3B2F2A; --action-hover: #241D1A;
  --accent: #C9782D; --trust: #2E7D32; --warning: #A86A1C;
}
```

**ListingCard component:**
```tsx
export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <div className="group rounded-[10px] overflow-hidden border border-[--border]
                    bg-[--surface] hover:shadow-md transition-shadow duration-[180ms]">
      <div className="relative aspect-square overflow-hidden">
        <Image src={listing.images[0]} alt={listing.title} fill
          className="object-cover group-hover:scale-105 transition-transform duration-300" />
        {listing.itemType === 'handmade' && (
          <span className="absolute top-2 left-2 text-[11px] font-semibold uppercase
                           tracking-[0.05em] bg-[--surface] text-[--accent] px-2 py-0.5
                           rounded-full border border-[--border]">Handmade</span>
        )}
      </div>
      <div className="p-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.05em]
                      text-[--accent] truncate">{listing.shopName}</p>
        <h3 className="text-[14px] text-[--text-primary] line-clamp-2 mt-0.5 leading-snug">
          {listing.title}
        </h3>
        <div className="flex items-center gap-1 mt-1">
          <StarRating rating={listing.averageRating} size={12} />
          <span className="text-[12px] text-[--text-secondary]">({listing.reviewCount})</span>
        </div>
        <div className="flex items-baseline gap-2 mt-1.5 flex-wrap">
          <span className="font-semibold text-[--text-primary]">{formatPrice(listing.price)}</span>
          {listing.compareAtPrice && (
            <span className="text-[12px] text-[--text-secondary] line-through">
              {formatPrice(listing.compareAtPrice)}
            </span>
          )}
          {listing.shippingPrice === 0 && (
            <span className="text-[11px] text-[--trust] font-semibold uppercase
                             tracking-[0.04em]">Free shipping</span>
          )}
        </div>
        <p className="text-[12px] text-[--text-secondary] mt-0.5">
          Ships in {listing.estimatedShipDays}–{listing.estimatedShipDays + 2} days
        </p>
      </div>
    </div>
  );
}
```

**Components to build:** `<SearchHeader />` · `<FacetFilters />` · `<ListingGrid />` · `<ListingDetailPanel />` · `<SellerTrustCard />` · `<ShopGroupedCart />` · `<ProtectionExplainer />` · `<CaseTimeline />`

**Rules:** trust/return policy block above Add to Cart on LDP; checkout order summary column always shows grouped shop sections; no hex in JSX className strings.

---

### Category B — Claude Artifacts

Implement **Crafted Discovery** in Next.js 14 + TypeScript strict + Supabase + Stripe Connect. CSS Modules for all component styling; Tailwind utility classes forbidden in component files (use only in `globals.css` for resets).

**Four defining constraints:**

**1. Multi-shop cart is a first-class domain model.**
`CartItem.shopId` is non-optional. `groupCartByShop(items)` runs in `src/lib/cart.ts` and returns `ShopGroup[]`. Every downstream function — quote API, checkout confirmation, order creation — accepts `ShopGroup[]` as the top-level structure. No code path ever works with a flat list of items when grouping matters.

**2. Server-authoritative pricing.**
Client sends `POST /api/quote` with `{ items: { listingId: string; quantity: number }[] }`. Server fetches current prices from Supabase, applies per-shop shipping rules, computes tax (Stripe Tax or internal lookup), and writes a `QuoteSnapshot` row: `{ id, groups: QuoteGroup[], totalCents, expiresAt: now + 15min }`. Client receives `snapshotId`. Checkout `POST /api/checkout/confirm` body must include `snapshotId`; server re-validates snapshot is unexpired and re-checks totals before creating Stripe PaymentIntents. Client-computed totals are never trusted.

**3. Case lifecycle is an immutable event log.**
`case_events` table is append-only (no UPDATE/DELETE). Valid transitions are encoded in `CASE_NEXT` map in `src/lib/cases.ts`. Server action `advanceCaseStatus(caseId, newStatus)` checks `CASE_NEXT[currentStatus] === newStatus` and throws if invalid. Buyer, seller, and marketplace operator see the same event stream; there is no separate "internal" case state.

**4. Stripe Connect split payouts.**
Each `ShopGroup` in a checkout maps to a separate Stripe PaymentIntent with `transfer_data.destination = shop.stripeAccountId` and `application_fee_amount = Math.round(group.subtotal * PLATFORM_FEE_RATE)`. Webhook `payment_intent.succeeded` triggers per-shop transfer; `payment_intent.payment_failed` calls a compensating action to cancel all sibling intents for the same `orderId` via `transfer_group`.

**Folder structure:**
```
src/
├── app/
│   ├── (marketplace)/
│   │   ├── page.tsx                     ← homepage: SearchHero, CategoryRails, TrustStrip
│   │   ├── search/page.tsx              ← FacetSidebar + ListingGrid (RSC)
│   │   ├── listing/[slug]/page.tsx      ← LDP: gallery, SellerTrustCard, return policy, AddToCart
│   │   ├── cart/page.tsx                ← ShopGroupedCart with per-group + combined totals
│   │   ├── checkout/page.tsx            ← QuoteSnapshot display + payment collection
│   │   └── account/
│   │       ├── orders/page.tsx
│   │       └── help/page.tsx            ← HelpRequestPanel + CaseTimeline
│   ├── seller/dashboard/page.tsx        ← listings / orders / fees / payout summary
│   └── api/
│       ├── quote/route.ts               ← POST: server pricing authority
│       ├── checkout/confirm/route.ts    ← POST: validates snapshotId, creates PaymentIntents
│       ├── cases/route.ts               ← GET list / POST create
│       ├── cases/[id]/advance/route.ts  ← POST: status transition with CASE_NEXT guard
│       └── webhooks/stripe/route.ts     ← payment_intent.succeeded / payment_failed handlers
├── lib/
│   ├── cart.ts                          ← groupCartByShop, cartTotal
│   ├── marketplace.ts                   ← formatPrice, getCaseStatusLabel, CASE_NEXT
│   └── stripe-connect.ts               ← createSplitPaymentIntents, cancelOrderIntents
├── store/
│   ├── cartStore.ts                     ← Zustand persist
│   └── searchStore.ts
└── types/marketplace.ts
```

**Build phases:**
1. Domain types + Supabase schema migrations
2. `/api/quote` server pricing + `QuoteSnapshot` model
3. Cart store + `ShopGroupedCart` component
4. LDP: `SellerTrustCard`, return policy block, `AddToCart` action
5. Checkout: QuoteSnapshot display → Stripe Connect PaymentIntents → confirmation
6. Case lifecycle: `HelpRequestPanel` → `CaseTimeline` → `advanceCaseStatus` server action
7. Seller dashboard: listing CRUD, order lifecycle, fee ledger, payout status
8. Webhook handler for Stripe split payout confirmation

---

### Category B — Grok

Generate in this order:

```
1.  src/types/marketplace.ts            — Listing, Shop, CartItem, ShopGroup, SearchFilters,
                                           CaseStatus, CaseEvent, Case
2.  src/lib/marketplace.ts              — formatPrice, groupCartByShop, cartTotal,
                                           getCaseStatusLabel, CASE_NEXT map
3.  src/store/cartStore.ts              — Zustand persist: addItem (qty guard), updateQuantity,
                                           removeItem, clearCart, groups(), total()
4.  src/store/searchStore.ts            — Zustand: SearchFilters state + setFilter + resetFilters
5.  src/app/api/quote/route.ts          — POST handler: fetch prices from Supabase, compute
                                           ShopGroups + totals, write QuoteSnapshot, return snapshotId
6.  src/app/api/cases/route.ts          — GET (list by orderId) + POST (create with help_requested)
7.  src/app/api/cases/[id]/advance/route.ts — POST: CASE_NEXT guard + append event row
8.  src/app/api/webhooks/stripe/route.ts — payment_intent.succeeded → mark order paid +
                                            trigger per-shop transfer
9.  src/app/page.tsx                    — SearchHero + CategoryRails + TrustStrip
10. src/app/search/page.tsx             — RSC: fetch listings server-side, pass to ListingGrid;
                                           FacetSidebar client island
11. src/app/listing/[slug]/page.tsx     — RSC: fetch listing + shop; client AddToCart island
12. src/app/cart/page.tsx               — ShopGroupedCart + proceed to checkout button
13. src/app/checkout/page.tsx           — POST to /api/quote, display QuoteSnapshot, Stripe Elements
14. src/app/account/orders/page.tsx     — order list with status chips
15. src/app/account/help/page.tsx       — HelpRequestPanel + CaseTimeline
16. src/app/seller/dashboard/page.tsx   — listing CRUD + order list + fee ledger + payout status
17. src/components/ListingCard.tsx
18. src/components/SellerTrustCard.tsx
19. src/components/ShopGroupedCart.tsx  — receives ShopGroup[], not CartItem[]
20. src/components/CaseTimeline.tsx     — append-only event log, coloured status dots
```

No single-shop assumptions anywhere. No client-authoritative totals. No hidden case state.

---

### Category B — Gemini

Build **Crafted Discovery**, a two-sided handmade/vintage marketplace.

**Architecture layers:**
- **Discovery layer** — `SearchHero` (keyword), `CategoryRails` (curated), `FacetSidebar/Drawer` (price/type/rating/shipping)
- **Trust layer** — `SellerTrustCard` (rating/sales/star-seller/processing days), return policy block (above CTA on LDP), `TrustStrip` (homepage protection badges)
- **Transaction layer** — `groupCartByShop` → `ShopGroupedCart` → `/api/quote` snapshot → Stripe Connect split PaymentIntents → `CheckoutConfirmation`
- **Support layer** — `HelpRequestPanel` → append-only `CaseEvent` rows → `CaseTimeline` → resolution outcome

**Data flow:**
1. `ListingCard` → LDP: listing + shop fetched server-side (SSR, Supabase, cached 60s)
2. AddToCart → `useCartStore.addItem(item)` (client Zustand, persisted)
3. Cart → `POST /api/quote`: server groups by shopId, fetches live prices, returns `QuoteSnapshot`
4. Checkout → Stripe Connect: per-shop PaymentIntents with `transfer_data.destination`
5. Webhook confirms payment → order row updated → seller notified → buyer confirmation email

**Motion rules:**
- `<CartDrawer>` — `x: '100%' → 0`, 280ms ease-out; never a Dialog/modal
- `<FacetDrawer>` (mobile) — `x: '-100%' → 0`, 240ms ease-out
- `<ListingCard>` hover — scale 1.0 → 1.05 on `img` only, 180ms; card border stays static
- `<CaseTimeline>` event expand — `height: 0 → auto`, 200ms ease
- All `whileInView` must use `viewport={{ once: true }}`
- Every Framer Motion block: `const reduced = useReducedMotion(); if (reduced) skip`

**Responsive breakpoints:** 640 (mobile) / 768 (tablet) / 1024 (desktop) / 1280 (wide)
- Listing grid: `grid-cols-4` → `grid-cols-2` at 768 → `grid-cols-2` at 640
- Facet panel: sidebar (≥1024) → drawer triggered by filter button (< 1024)

---

### Category B — Cursor

In `src/app/`, implement in this exact order:

**Phase 1 — Shell and search**
- `src/types/marketplace.ts` — all domain types
- `src/lib/marketplace.ts` — `formatPrice`, `groupCartByShop`, `cartTotal`, `getCaseStatusLabel`, `CASE_NEXT`
- `(marketplace)/page.tsx` — `SearchHero` + `CategoryRails` + `TrustStrip`
- `search/page.tsx` — RSC with `FacetSidebar` (client island) + `ListingGrid`

**Phase 2 — Listing detail and cart**
- `listing/[slug]/page.tsx` — RSC; left gallery, right trust + policy + `AddToCart` client island

**Full `AddToCart` implementation:**
```tsx
'use client';
import { useCartStore } from '@/store/cartStore';
import { Listing } from '@/types/marketplace';
export function AddToCart({ listing }: { listing: Listing }) {
  const addItem = useCartStore((s) => s.addItem);
  return (
    <button
      onClick={() => addItem({
        listingId: listing.id, shopId: listing.shopId, shopName: listing.shopName,
        title: listing.title, imageUrl: listing.images[0],
        price: listing.price, shippingPrice: listing.shippingPrice,
        quantity: 1, maxQuantity: listing.stockCount,
      })}
      className="w-full h-[52px] rounded-full bg-[--action] text-white font-semibold
                 hover:bg-[--action-hover] transition-colors duration-150
                 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--action]">
      Add to Cart
    </button>
  );
}
```

- `cart/page.tsx` — `<ShopGroupedCart groups={groups()} total={total()} />`

**Full `ShopGroupedCart` implementation:**
```tsx
import { ShopGroup } from '@/types/marketplace';
import { formatPrice } from '@/lib/marketplace';
export function ShopGroupedCart({ groups, total }: { groups: ShopGroup[]; total: number }) {
  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <section key={group.shopId} className="border border-[--border] rounded-[10px] overflow-hidden">
          <header className="px-4 py-3 bg-[--surface-tint] border-b border-[--border]">
            <span className="text-[14px] font-semibold text-[--text-primary]">{group.shopName}</span>
          </header>
          <div className="divide-y divide-[--border]">
            {group.items.map((item) => (
              <CartLineItem key={item.listingId} item={item} />
            ))}
          </div>
          <footer className="px-4 py-3 bg-[--surface-tint] border-t border-[--border] text-[14px]
                             text-[--text-secondary] flex justify-between">
            <span>Shop subtotal</span>
            <span className="font-semibold text-[--text-primary]">
              {formatPrice(group.subtotal + group.shipping)}
            </span>
          </footer>
        </section>
      ))}
      <div className="flex justify-between text-[18px] font-semibold text-[--text-primary] pt-4
                      border-t border-[--border]">
        <span>Order total</span>
        <span>{formatPrice(total)}</span>
      </div>
    </div>
  );
}
```

**Phase 3 — Checkout and support**
- `checkout/page.tsx` — `POST /api/quote` on mount; render `QuoteSnapshot` groups; Stripe Elements for payment
- `account/help/page.tsx` — `HelpRequestPanel` + `CaseTimeline`

**Phase 4 — Seller dashboard**
- `seller/dashboard/page.tsx` — listing CRUD + order lifecycle + fee ledger + payout status cards

**Absolute rules:**
- No client-side final pricing authority — all totals from `QuoteSnapshot`
- No `CartItem[]` passed directly to checkout — always `ShopGroup[]`
- Policy visibility (return policy + protection explainer) must appear on LDP before CTA
- All filters/drawers/dialogs keyboard-accessible with visible `focus-visible` ring
- `stockCount <= 0` → button disabled + "Out of stock" text; never `stockCount <= 2` fake urgency unless real

**QA grep commands:**
```bash
# Verify no hex literals in component className strings
grep -rn '#[0-9A-Fa-f]\{3,6\}' src/components/ src/app/ --include='*.tsx'

# Confirm every CartItem has shopId (not optional)
grep -n 'shopId?' src/types/marketplace.ts

# Check all quote calls go through /api/quote not client-computed
grep -rn 'cartTotal\(\)' src/app/ --include='*.tsx'

# Verify case events are never updated, only inserted
grep -rn '\.update.*case_events' src/ --include='*.ts'

# Confirm useReducedMotion guard on all motion components
grep -rn 'whileInView\|whileHover\|animate=' src/components/ | grep -v 'useReducedMotion'
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
