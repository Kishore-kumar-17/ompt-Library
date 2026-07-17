---
prompt_id: ecomm_03
sub_category: E-commerce
sub_type: Functional Beverage D2C Storefront
title: Better-For-You Soda — Flavor-First Functional Beverage Storefront
reference_patterns: flavor_first_merchandising, functional_health_education, subscription_reorder_loop
inspiration: drinkolipop.com
quality_score:
status: draft
notes:
---

## Base Prompt

### Section 1 — Role

You are a senior e-commerce product designer with 10+ years of experience building direct-to-consumer storefronts for packaged food and beverage brands. You understand how modern functional beverage brands win: bold flavor-led merchandising, clear health positioning without medical overreach, and a low-friction reorder journey built around subscriptions and bundles.

---

### Section 2 — Application Overview

This is a direct-to-consumer storefront for a better-for-you soda brand. The products are canned beverages positioned as delicious soda alternatives with functional benefits such as fiber and gut-friendly ingredients. The user is a health-aware shopper aged 22–42 who wants familiar soda taste with cleaner nutrition.

The store covers: Homepage, Product Listing Page (PLP), Product Detail Page (PDP), Subscription flow, and Cart Drawer. Primary goal is Add to Cart and Checkout. Secondary goal is Subscribe & Save for repeat purchases.

---

### Section 3 — Brand Voice & Mood

The tone is playful, flavor-forward, and confident. The brand is optimistic and colorful, but never childish. Health messaging is clear and plain-language, not clinical. Copy should feel snackable and energetic.

Headlines are short and declarative. Product names and flavor descriptors do most of the persuasive work. Claims are factual and restrained.

Vibe word: refreshing.

---

### Section 4 — Core Features & Functionality

1. **Homepage** — hero with core value proposition, flavor spotlight rail, variety pack highlight, ingredient/benefit explainer, social proof, email signup, footer
2. **PLP** — filterable product grid (flavors, packs, caffeine/no-caffeine, dietary tags), quick add buttons, comparison labels, subscription option visibility
3. **PDP** — flavor gallery, nutrition facts summary, ingredient transparency panel, quantity/pack selector, `PurchaseModelToggle` (`one_time | subscribe`), add to cart
4. **Subscription module** — subscribe-and-save pricing, delivery cadence (e.g., 2/4/8 weeks), skip/pause/cancel messaging, account management access
5. **Cart Drawer** — line items with flavor/pack details, quantity controls, savings callout, free shipping progress bar, checkout CTA

---

### Section 5 — Design Specifications

**Visual style:** Bright, flavor-driven, package-forward, energetic. Product cans and color blocks carry identity.

**Color mode:** Light with bold accents.

**Color palette:**
- Background: `#FFFDF8`
- Surface: `#FFFFFF`
- Soft section tint: `#F7F2E8`
- Primary text: `#1E1E1E`
- Secondary text: `#606060`
- Border: `rgba(30,30,30,0.10)`
- CTA primary: `#FF6A3D`
- CTA hover: `#E8572D`
- Accent cool: `#3E7BFA`
- Accent mint: `#27B88A`

**Typography:**
- Display: `clamp(40px, 6vw, 76px)`, weight 700, line-height 1.0
- H2: `clamp(28px, 4vw, 48px)`, weight 700, line-height 1.1
- H3/product name: `20px`, weight 600, line-height 1.25
- Body: `16px`, weight 400, line-height 1.6
- Small/meta: `14px`, weight 400, line-height 1.5

**Spacing:** 8pt scale. Section spacing `88px` desktop / `56px` mobile. Grid gap `20px` desktop / `14px` mobile.

**Border radius:** Buttons `999px`, cards `14px`, inputs `10px`, badges `999px`.

**Responsive:** Mobile-first. Breakpoints: `640px`, `768px`, `1024px`, `1280px`. Product grid: 4 desktop / 2 tablet / 2 mobile.

**Accessibility:** WCAG AA, clear focus states `2px solid #FF6A3D` with offset, keyboard nav for all controls.

**Motion:**
- Cart drawer: `translateX(100%) -> translateX(0)`, `280ms ease-out`
- Product card hover: `150ms` elevation/overlay transition
- Section reveal: `opacity + y` transition `300ms`
- Respect `prefers-reduced-motion`

---

### Section 6 — Structure

**Homepage order:**
1. Promo bar with shipping/savings message
2. Sticky nav (Shop, Flavors, Learn, Subscribe, Locator)
3. Hero with brand claim + CTA + product visual
4. Flavor rail (best sellers)
5. Variety pack/Starter pack highlight
6. Functional benefits section (fiber/sugar/ingredients)
7. Testimonials/UGC quotes
8. Subscription benefits strip
9. Email signup block
10. Footer (shop, learn, support, social)

**PLP:**
- Sticky filter row
- Product cards with pack count, price, quick add
- One-time vs subscription price hint
- Load more pagination, no infinite scroll

**PDP:**
- Left: image gallery + thumbnails
- Right: flavor title, price, `PurchaseModelToggle`, pack selector, add to cart, shipping note
- Ingredient transparency panel always visible above fold
- Nutrition facts and FAQ accordions below

**Cart drawer:**
- 420px desktop, full-width mobile
- Free shipping threshold tracker
- Savings badge for subscription selections
- Primary checkout CTA + wallet options in checkout flow

---

### Section 7 — Technical Specifications

- **Framework:** Next.js 14 App Router, TypeScript strict
- **Styling:** Tailwind CSS v3 + CSS variables in `globals.css`
- **State:** Zustand for cart/subscription selection
- **Backend:** Supabase for products, subscriptions metadata, customer profile
- **Payments:** Stripe primary with subscriptions enabled
- **Components:** Radix UI for drawer, tabs/toggle, accordion
- **Images:** `next/image`, WebP, optimized responsive sizes
- **Fonts:** One expressive display face + one clean sans for body
- **Performance target:** LCP <2.5s, CLS <0.1, Lighthouse 95+

---

### Section 8 — Implementation Steps

1. Design tokens and typography setup
2. Global nav + promo bar + cart drawer shell
3. Product card + PLP quick-add interactions
4. PDP `PurchaseModelToggle` + pack selector
5. Subscription pricing/cadence logic
6. Ingredient transparency + nutrition sections
7. Homepage storytelling sections
8. Email capture + footer + QA pass

Cut order if scope shrinks: testimonials, press strip, secondary learn modules. Never cut purchase model toggle or ingredient transparency.

---

### Section 9 — User Experience

The user arrives curious but skeptical: “Will this taste good, and is it actually better?” The first scroll should answer both. Flavor visuals and concise benefit copy do the heavy lifting.

On PLP, the user should be able to compare packs and add fast. On PDP, they need pricing clarity and confidence in ingredients before purchase. Subscription should feel like convenience, not commitment pressure.

Friction to remove: hidden fees, unclear serving counts, hard-to-find nutrition details, forced account creation before checkout.

---

### Section 10 — Constraints

- No medical claims or disease-treatment language
- No cluttered health jargon blocks
- No autoplay videos with sound
- No hidden ingredient transparency behind deep clicks
- No aggressive countdown urgency tactics
- No infinite scroll on PLP
- No hardcoded colors in JSX (CSS variables only)
- No tiny tap targets; buttons minimum 44px touch height

---

## Platform Versions

### Category A — Lovable

Build **Better-For-You Soda**, a bright flavor-forward D2C storefront. Flavor identity blocks and product photography carry the visual energy; the UI stays clean and supportive.

**Design tokens (paste into theme):**
```css
--bg: #FFFDF8;
--surface: #FFFFFF;
--surface-tint: #F7F2E8;
--text-primary: #1E1E1E;
--text-secondary: #606060;
--border: rgba(30,30,30,0.10);
--cta: #FF6A3D;
--cta-hover: #E8572D;
--accent-cool: #3E7BFA;
--accent-mint: #27B88A;
--radius-btn: 999px;
--radius-card: 14px;
--radius-input: 10px;
```

**Build in this order:**
1. `<PromoBar>` — free shipping threshold message + subscription savings callout; dismissible; `#FF6A3D` background, white text
2. `<Navbar>` — sticky; logo left; nav links (Shop / Flavors / Learn / Subscribe / Find a Store); cart icon with item count badge right
3. `<Hero>` — strong brand headline (max 8 words), flavor-forward subtext, "Shop Now" pill CTA (`--cta`), product can image right or centered
4. `<FlavorRail>` — horizontal scroll on mobile; each `<FlavorCard>` shows can image, flavor name, 2-word descriptor, price, "Add to Cart" pill; flavor-specific background tint from `colorHex`
5. `<VarietyPackHighlight>` — pack product card with "Best Value" badge, price breakdown per can, subscribe savings callout, single Add to Cart CTA
6. `<BenefitsSection>` — 3 benefit pillars: "Low Sugar", "Gut-Friendly Fiber", "Real Ingredients"; each with icon, short headline, 1-line plain-language description; NO medical claims
7. `<Testimonials>` — 3 UGC-style quote cards; name, short quote (max 20 words), star rating
8. `<SubscriptionStrip>` — horizontal band: "Save 15% on every order" + "Skip, pause, or cancel anytime" + Subscribe CTA
9. `<EmailSignup>` — "Try before you subscribe" heading, email input + pill CTA, privacy reassurance line
10. `<Footer>` — shop, learn, support, social links

**PDP specifics:**
- `<PurchaseModelToggle>` — segmented control: "One-Time" vs "Subscribe & Save 15%"; switching immediately updates displayed price and `<CartDrawer>` payload
- `<IngredientPanel>` — ALWAYS visible above fold, never behind accordion; shows first 5 ingredients prominently, "See full list" expands inline
- `<PackSelector>` — 4-can / 8-can / 12-can / Variety; each shows per-can price to aid comparison
- `<NutritionSummary>` — calories, total sugar, fiber, prebiotic grams; 4 tiles in a row; expandable full nutrition facts

**Critical constraints:**
- `PurchaseModelToggle` selected state must update displayed price AND cart item `purchaseType` and `cadence` fields
- `IngredientPanel` cannot be behind accordion — it must render by default
- No medical claims: "supports gut health" = OK; "cures IBS" = never
- `--cta` (`#FF6A3D`) on `--bg` (`#FFFDF8`) = 3.1:1 — passes for large text (24px+) only; use `#E8572D` for 16px body CTA text
- All pill buttons minimum `44px` height

---

### Category A — ChatGPT Canvas

Build the full functional beverage storefront. Stack: React + TypeScript strict + Tailwind + Zustand + Vite.

**Setup:**
```bash
npm create vite@latest bfy-soda -- --template react-ts
npm install zustand @tanstack/react-query tailwindcss react-router-dom
```

**Routes:** `/` · `/collections/all` · `/products/:slug` + global `<CartDrawer>`

**Full type system (`src/types/beverage.ts`):**
```typescript
export type PurchaseType = 'one_time' | 'subscribe';
export type SubscriptionCadence = 2 | 4 | 8; // weeks

export interface Flavor {
  id: string; name: string; slug: string;
  description: string;   // 2–3 words: e.g. "Strawberry Vanilla"
  colorHex: string;      // flavor identity color for card bg tint
  tagline: string;       // e.g. "Classic soda taste, 9g fiber"
}

export interface Product {
  id: string; slug: string;
  flavorId: string; flavorName: string;
  packSize: number;            // 4 | 8 | 12 | 24 (cans)
  price: number;               // cents USD
  subscribePrice: number;      // cents USD (save ~15%)
  inStock: boolean;
  images: string[];
  nutritionSummary: NutritionSummary;
  ingredients: string;         // comma-separated full list
  functionalBenefits: string[];
}

export interface NutritionSummary {
  calories: number;
  totalSugarGrams: number;
  fiberGrams: number;
  prebioticGrams: number;
}

export interface CartItem {
  productId: string; flavorId: string; flavorName: string;
  packSize: number; imageUrl: string;
  purchaseType: PurchaseType;
  cadence: SubscriptionCadence | null; // null for one_time
  price: number;   // cents — reflects purchaseType selection
  quantity: number;
}

export type CartItemKey = `${string}-${PurchaseType}`;
```

**Utilities (`src/lib/beverage.ts`):**
```typescript
export const FREE_SHIPPING_THRESHOLD = 3500; // cents ($35)

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD',
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

export function formatPricePerCan(cents: number, packSize: number): string {
  return `${formatPrice(Math.round(cents / packSize))}/can`;
}

export function calculateSavingsCents(oneTime: number, subscribe: number): number {
  return oneTime - subscribe;
}

export function shippingProgress(subtotalCents: number): number {
  return Math.min(subtotalCents / FREE_SHIPPING_THRESHOLD, 1);
}

export function getCartItemKey(item: CartItem): CartItemKey {
  return `${item.productId}-${item.purchaseType}`;
}
```

**Zustand cart store (`src/store/cartStore.ts`):**
```typescript
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, CartItemKey } from '@/types/beverage';
import { getCartItemKey, shippingProgress } from '@/lib/beverage';

interface CartState {
  items: CartItem[]; isOpen: boolean;
  addItem: (item: CartItem) => void;
  updateQuantity: (key: CartItemKey, qty: number) => void;
  removeItem: (key: CartItemKey) => void;
  openCart: () => void; closeCart: () => void;
  total: () => number;
  itemCount: () => number;
  shippingProgress: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [], isOpen: false,
      addItem: (item) => set((s) => {
        const key = getCartItemKey(item);
        const exists = s.items.find((i) => getCartItemKey(i) === key);
        if (exists) {
          return { items: s.items.map((i) => getCartItemKey(i) === key
            ? { ...i, quantity: i.quantity + 1 } : i), isOpen: true };
        }
        return { items: [...s.items, { ...item, quantity: 1 }], isOpen: true };
      }),
      updateQuantity: (key, qty) => set((s) => ({
        items: qty <= 0
          ? s.items.filter((i) => getCartItemKey(i) !== key)
          : s.items.map((i) => getCartItemKey(i) === key ? { ...i, quantity: qty } : i),
      })),
      removeItem: (key) => set((s) => ({
        items: s.items.filter((i) => getCartItemKey(i) !== key) })),
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),
      total: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
      shippingProgress: () => shippingProgress(
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0)),
    }),
    { name: 'bfy-cart', partialize: (s) => ({ items: s.items }) }
  )
);
```

**Business rules:**
- Cart item key = `${productId}-${purchaseType}`; same product as one-time vs subscribe = two distinct cart lines
- Subscription items carry `cadence` field; one-time items have `cadence: null`
- Free shipping threshold: `$35` = `3500` cents; progress bar tracks toward this
- No medical claims in product copy — only factual nutrient claims

---

### Category A — Bolt

Build the BFY soda storefront as a Vite React SPA.

**File structure:**
```
src/
├── components/
│   ├── PromoBar.tsx
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── FlavorRail.tsx
│   ├── FlavorCard.tsx
│   ├── VarietyPackHighlight.tsx
│   ├── BenefitsSection.tsx
│   ├── SubscriptionStrip.tsx
│   ├── ProductCard.tsx               ← PLP quick-add card
│   ├── PurchaseModelToggle.tsx       ← segments: one_time / subscribe
│   ├── SubscriptionCadenceSelector.tsx
│   ├── PackSizeSelector.tsx
│   ├── IngredientPanel.tsx           ← always visible, never accordion
│   ├── NutritionSummary.tsx
│   └── CartDrawer.tsx
├── store/cartStore.ts
├── types/beverage.ts
└── lib/beverage.ts
```

**Component contracts:**
- `<PurchaseModelToggle value={PurchaseType} onChange={...} product={Product} />` — segmented pill; displays live price for each option (`formatPrice(product.price)` vs `formatPrice(product.subscribePrice)`); emits new `PurchaseType` on change
- `<SubscriptionCadenceSelector cadence={2|4|8} onChange={...} />` — visible only when `purchaseType === 'subscribe'`; radio group "Every 2 weeks / Every 4 weeks / Every 8 weeks"
- `<IngredientPanel ingredients={string} />` — renders first 5 ingredients in large text, "View full list" expands remaining inline (no accordion/modal); ALWAYS rendered on PDP above Add to Cart
- `<CartDrawer>` — `x: '100%' → 0` Framer Motion slide-in, 280ms; shows `<ShippingProgressBar>` at top; lists items with `purchaseType` badge; checkout CTA at bottom
- `<ProductCard product={Product} onQuickAdd={...} />` — shows flavor name, pack size label, one-time price, subscribe price in smaller text, "Add" pill button; quick-add calls `addItem` with `purchaseType: 'one_time'` and `cadence: null`

**Critical rules:**
- `formatPrice(cents)` from `lib/beverage.ts` — no inline `$` construction
- Cart item key: `getCartItemKey(item)` — never `item.productId` alone
- Minimum `44px` touch height on all CTA buttons
- `IngredientPanel` cannot be wrapped in accordion

---

### Category A — v0

Create a Next.js 14 App Router D2C beverage storefront with shadcn/ui + Tailwind. Zero hex in JSX.

**globals.css additions:**
```css
:root {
  --bg: #FFFDF8; --surface: #FFFFFF; --surface-tint: #F7F2E8;
  --text-primary: #1E1E1E; --text-secondary: #606060;
  --border: rgba(30,30,30,0.10);
  --cta: #FF6A3D; --cta-hover: #E8572D;
  --accent-cool: #3E7BFA; --accent-mint: #27B88A;
}
```

**PurchaseModelToggle component:**
```tsx
'use client';
import { PurchaseType } from '@/types/beverage';
import { Product } from '@/types/beverage';
import { formatPrice } from '@/lib/beverage';
export function PurchaseModelToggle({ value, onChange, product }: {
  value: PurchaseType; onChange: (v: PurchaseType) => void; product: Product;
}) {
  return (
    <div className="flex rounded-full border border-[--border] overflow-hidden bg-[--surface-tint] p-1 gap-1">
      {(['one_time', 'subscribe'] as PurchaseType[]).map((type) => (
        <button key={type} onClick={() => onChange(type)}
          className={`flex-1 py-2 px-3 rounded-full text-[13px] font-semibold transition-colors duration-150
            ${value === type
              ? 'bg-[--cta] text-white shadow-sm'
              : 'text-[--text-secondary] hover:text-[--text-primary]'}`}>
          {type === 'one_time' ? (
            <span>{formatPrice(product.price)}</span>
          ) : (
            <span className="flex flex-col items-center leading-tight">
              <span>{formatPrice(product.subscribePrice)}</span>
              <span className="text-[10px] font-medium opacity-80">Save 15% · Subscribe</span>
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
```

**Components to build:** `<PromoBar />` · `<Navbar />` · `<Hero />` · `<FlavorRail />` · `<ProductCard />` · `<PurchaseModelToggle />` · `<PackSizeSelector />` · `<IngredientPanel />` · `<NutritionSummary />` · `<CartDrawer />` (Radix Sheet)

**Rules:** ingredient panel visible above fold on PDP; quick-add on PLP cards (defaults to `one_time`); subscription cadence control appears only when `subscribe` selected; no hex in JSX.

---

### Category B — Claude Artifacts

Implement the BFY Soda storefront in Next.js 14 + TypeScript strict + Tailwind + Zustand + Supabase + Stripe.

**Four defining constraints:**

**1. Cart item uniqueness includes `purchaseType`.**
`getCartItemKey(item) = '${productId}-${purchaseType}'`. The same 12-pack ordered as one-time and as a subscription are two distinct line items in the cart. `useCartStore.addItem` checks by `CartItemKey`; if the user toggles from subscribe to one-time on PDP and re-adds, they get a new line item. Checkout reads `item.purchaseType` to determine whether to create a Stripe subscription or a one-time PaymentIntent.

**2. `IngredientPanel` is always visible — never behind a click.**
`IngredientPanel` is a required child of the PDP layout, positioned between `PackSizeSelector` and the Add to Cart button. It has no conditional rendering, no accordion wrapper. The first 5 ingredients render at full size; an inline `<details>` element expands the full list (native, no JavaScript required). If a product has 0 ingredients, the listing creation API returns 400.

**3. Subscription pricing is server-computed — not `price * 0.85` on the client.**
`subscribe_price` is a separate column on the `products` table, set at listing creation. `POST /api/cart/quote` returns `CartQuote { items: { price, subscribePrice }[], total }` from the DB; client receives the authoritative price. The client's `useCartStore` stores the resolved `item.price` (already the correct subscribe or one-time price), so the cart total is always correct without re-derivation.

**4. Free shipping threshold is a server constant, not a frontend magic number.**
`GET /api/config` returns `{ freeShippingThresholdCents: 3500 }`. The `CartDrawer` fetches this once on mount via SWR and uses it for `shippingProgress`. No hardcoded `3500` anywhere in components — the source of truth is `lib/config.ts → FREE_SHIPPING_THRESHOLD`.

**Folder structure:**
```
src/
├── app/
│   ├── page.tsx                          ← homepage
│   ├── collections/all/page.tsx          ← PLP
│   ├── products/[slug]/page.tsx          ← PDP
│   ├── cart/page.tsx                     ← cart page (mobile fallback)
│   └── api/
│       ├── cart/quote/route.ts           ← server-authoritative prices
│       ├── config/route.ts               ← freeShippingThresholdCents
│       ├── checkout/session/route.ts     ← Stripe session creation
│       └── webhooks/stripe/route.ts
├── components/
│   ├── product/
│   │   ├── ProductCard.tsx
│   │   ├── PurchaseModelToggle.tsx
│   │   ├── PackSizeSelector.tsx
│   │   ├── IngredientPanel.tsx           ← never in accordion
│   │   └── NutritionSummary.tsx
│   ├── cart/
│   │   ├── CartDrawer.tsx
│   │   └── ShippingProgressBar.tsx
│   └── layout/
│       ├── Navbar.tsx
│       └── PromoBar.tsx
├── store/cartStore.ts
├── lib/
│   ├── beverage.ts                       ← formatPrice, getCartItemKey, shippingProgress
│   └── config.ts                         ← FREE_SHIPPING_THRESHOLD
└── types/beverage.ts
```

---

### Category B — Grok

Generate in this order:

```
1.  src/types/beverage.ts              — PurchaseType, SubscriptionCadence, Flavor, Product,
                                          NutritionSummary, CartItem, CartItemKey
2.  src/lib/beverage.ts                — formatPrice, formatPricePerCan, calculateSavingsCents,
                                          shippingProgress, getCartItemKey
3.  src/lib/config.ts                  — FREE_SHIPPING_THRESHOLD = 3500
4.  src/store/cartStore.ts             — Zustand persist: addItem (key = productId+purchaseType),
                                          updateQuantity, removeItem, total(), shippingProgress()
5.  src/app/api/cart/quote/route.ts    — POST: fetch product prices from Supabase, return CartQuote
6.  src/app/api/checkout/session/route.ts — POST: branch Stripe subscription vs one-time PaymentIntent
7.  src/app/api/webhooks/stripe/route.ts
8.  src/app/page.tsx                   — PromoBar + Navbar + Hero + FlavorRail + VarietyPack +
                                          BenefitsSection + SubscriptionStrip + EmailSignup
9.  src/app/collections/all/page.tsx   — RSC product list + client FilterBar island
10. src/app/products/[slug]/page.tsx   — RSC: PurchaseModelToggle client island +
                                          IngredientPanel (always rendered)
11. src/components/product/ProductCard.tsx
12. src/components/product/PurchaseModelToggle.tsx — updates price display + cadence visibility
13. src/components/product/IngredientPanel.tsx     — never accordion, always rendered
14. src/components/product/PackSizeSelector.tsx
15. src/components/product/NutritionSummary.tsx
16. src/components/cart/CartDrawer.tsx             — ShippingProgressBar at top
17. src/components/cart/ShippingProgressBar.tsx    — fetches threshold from /api/config
```

No hardcoded colors. No infinite scroll. `IngredientPanel` not in accordion. Cart key includes `purchaseType`.

---

### Category B — Gemini

Build **Better-For-You Soda**, a bright D2C storefront for a functional beverage brand.

**Architecture layers:**
- **Discovery layer** — `FlavorRail` (flavor-identity-tinted cards), `ProductCard` (quick-add, pack comparison), `FilterBar` (dietary tags, pack size, caffeine toggle)
- **Conversion layer** — `PurchaseModelToggle` (live price switch), `PackSizeSelector` (per-can price), `IngredientPanel` (always visible), `NutritionSummary`, Add to Cart button
- **Cart layer** — `CartDrawer` (slide-right 280ms), `ShippingProgressBar` (progress toward $35 free shipping), subscribe-mode badge on subscribe items
- **Retention layer** — `SubscriptionStrip` (homepage), email capture, "Manage Subscription" link in account

**Purchase model decision tree:**
```
PurchaseModelToggle = 'one_time'
  → CartItem.price = product.price
  → CartItem.cadence = null
  → Stripe: one-time PaymentIntent at checkout

PurchaseModelToggle = 'subscribe'
  → CartItem.price = product.subscribePrice
  → CartItem.cadence = selectedCadence (default: 4 weeks)
  → SubscriptionCadenceSelector visible
  → Stripe: Subscription object at checkout
```

**Motion rules:**
- `CartDrawer` — `x: '100%' → 0`, 280ms ease-out; never Dialog/modal
- `FlavorCard` hover — `scale 1.0 → 1.02`, 150ms ease; subtle `box-shadow` elevation
- Section reveal — `opacity 0 → 1`, `y: 16 → 0`, 300ms ease-out
- All `whileInView` → `viewport={{ once: true }}`
- `useReducedMotion()` guard on all Framer Motion components
- No autoplay video with sound anywhere

**Health copy rules (must be enforced in content, not UI):**
- Allowed: "9g prebiotic fiber per can", "2g total sugar", "Plant-based ingredients"
- Forbidden: "cures", "treats", "prevents", "clinically proven" (without FDA backing), disease names

---

### Category B — Cursor

In `src/app/`, implement the functional beverage storefront in this exact order:

**Phase 1 — Foundation**
- `src/types/beverage.ts` — all types including `CartItemKey`, `SubscriptionCadence`
- `src/lib/beverage.ts` — `formatPrice`, `formatPricePerCan`, `getCartItemKey`, `shippingProgress`
- `src/lib/config.ts` — `FREE_SHIPPING_THRESHOLD`
- `src/store/cartStore.ts` — Zustand persist with `CartItemKey` for item uniqueness
- `globals.css` — CSS custom properties for all brand tokens

**Phase 2 — PDP core (most critical page)**

Full `PurchaseModelToggle` + `IngredientPanel` + `AddToCart` wiring:
```tsx
// app/products/[slug]/page.tsx (client island portion)
'use client';
import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { Product, PurchaseType, SubscriptionCadence } from '@/types/beverage';
import { PurchaseModelToggle } from '@/components/product/PurchaseModelToggle';
import { SubscriptionCadenceSelector } from '@/components/product/SubscriptionCadenceSelector';
import { PackSizeSelector } from '@/components/product/PackSizeSelector';
import { IngredientPanel } from '@/components/product/IngredientPanel';

export function PDPControls({ products }: { products: Product[] }) {
  const [selectedProduct, setSelectedProduct] = useState(products[0]);
  const [purchaseType, setPurchaseType] = useState<PurchaseType>('one_time');
  const [cadence, setCadence] = useState<SubscriptionCadence>(4);
  const addItem = useCartStore((s) => s.addItem);

  const price = purchaseType === 'subscribe'
    ? selectedProduct.subscribePrice
    : selectedProduct.price;

  return (
    <div className="space-y-5">
      <PackSizeSelector products={products} selected={selectedProduct} onSelect={setSelectedProduct} />
      <PurchaseModelToggle value={purchaseType} onChange={setPurchaseType} product={selectedProduct} />
      {purchaseType === 'subscribe' && (
        <SubscriptionCadenceSelector cadence={cadence} onChange={setCadence} />
      )}
      {/* IngredientPanel ALWAYS rendered — never conditional */}
      <IngredientPanel ingredients={selectedProduct.ingredients} />
      <button
        onClick={() => addItem({
          productId: selectedProduct.id, flavorId: selectedProduct.flavorId,
          flavorName: selectedProduct.flavorName, packSize: selectedProduct.packSize,
          imageUrl: selectedProduct.images[0], purchaseType,
          cadence: purchaseType === 'subscribe' ? cadence : null,
          price, quantity: 1,
        })}
        className="w-full h-[52px] rounded-full bg-[--cta] text-white font-bold text-[15px]
                   hover:bg-[--cta-hover] transition-colors duration-150
                   focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[--cta]">
        Add to Cart — {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
          .format(price / 100)}
      </button>
    </div>
  );
}
```

**Phase 3 — CartDrawer**
```tsx
// components/cart/CartDrawer.tsx (key logic)
import { useCartStore } from '@/store/cartStore';
import { FREE_SHIPPING_THRESHOLD } from '@/lib/config';
import { formatPrice } from '@/lib/beverage';

export function CartDrawer() {
  const { items, isOpen, closeCart, total, updateQuantity, removeItem } = useCartStore();
  const subtotal = total();
  const progressPct = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);
  // ... render slide panel with ShippingProgressBar + line items + checkout CTA
}
```

**Phase 4 — PLP and homepage**
- `collections/all/page.tsx` — RSC with `FilterBar` client island; no infinite scroll; load-more pagination
- `page.tsx` — PromoBar + Navbar + Hero + FlavorRail + VarietyPackHighlight + BenefitsSection

**Absolute rules:**
- `getCartItemKey(item)` for all cart operations — never `item.productId` alone
- `IngredientPanel` rendered unconditionally in PDP, not inside any `{condition && ...}` or accordion
- `FREE_SHIPPING_THRESHOLD` from `lib/config.ts` — no hardcoded `3500` in components
- All pill buttons `min-height: 44px` (mobile tap targets)
- No hardcoded hex in components — CSS custom properties only

**QA grep commands:**
```bash
# Confirm no hardcoded hex colors in components
grep -rn '#[0-9A-Fa-f]\{3,6\}' src/components/ src/app/ --include='*.tsx'

# Verify IngredientPanel is not conditional on PDP
grep -n 'IngredientPanel' src/app/products/\[slug\]/page.tsx
grep -n '&&.*IngredientPanel\|IngredientPanel.*&&' src/app/products/\[slug\]/page.tsx

# Confirm cart key includes purchaseType
grep -n 'getCartItemKey\|CartItemKey' src/store/cartStore.ts

# Check FREE_SHIPPING_THRESHOLD only in lib/config.ts
grep -rn '3500' src/ --include='*.ts' --include='*.tsx'

# Validate no medical claims in copy files
grep -rn 'cures\|treats\|prevents\|clinically proven' src/ --include='*.tsx' --include='*.ts'
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
