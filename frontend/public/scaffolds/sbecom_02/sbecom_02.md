---
prompt_id: sbecom_02
sub_category: E-commerce
sub_type: High-Frequency FMCG Subscription
title: ChaiRitual — Modern Indian Tea & Pantry Subscription
reference_patterns: ritual_based_navigation, subscribe_and_save_toggle, bundle_experience_selector
inspiration: chaipoint.com
quality_score:
status: draft
notes: Focused on a "Modern Indian" aesthetic with high-frequency repeat purchase logic.
---

## Base Prompt

### Section 1 — Role

You are a senior product designer specializing in high-frequency FMCG (Fast Moving Consumer Goods) and beverage-tech platforms. You understand that for an Indian audience, chai is not just a drink—it is a ritual, an emotion, and a daily necessity. Your work is "Modern Indian," blending earthy, traditional cues with high-performance e-commerce. You reject generic, sterile layouts in favor of the "Home Cafe" philosophy: warm tones, rich product photography, and a focus on "pantry staple" repeat purchasing. You design for "Seamless Daily Rituals," ensuring that subscribing to a monthly chai box or a "Work-from-Home" combo feels as natural as brewing a fresh cup.

---

### Section 2 — Application Overview

This is an omnichannel "Home Cafe" subscription storefront for a premium Indian tea brand. The customer is a daily tea drinker—ranging from the WFH professional to the large Indian family—who values consistency, quality, and convenience. The platform must transition users from one-off purchases to recurring "Subscribe & Save" memberships.

The application covers: "Home Cafe" Landing Page, "Subscribe & Save" Product Pages, Ritual-based Collection Grid, and a Loyalty-integrated Shopping Bag (with "Free Gift" progress).

---

### Section 3 — Brand Voice & Mood

The mood is "Warmly Professional" and "Authentically Modern." It feels like a contemporary Indian home. It is inviting, aromatic, and premium.

Copy is evocative and ritual-centric. Headlines use a "Community-First" tone: "Brightening lives, one cup at a time," "Your daily ritual, delivered," "India's first Home Cafe." It uses terms like "Assam Masala," "Ginger Instant," and "Gur Pare" to signal cultural authenticity.

Vibe word: Ritual.

---

### Section 4 — Core Features & Functionality

1. **"Subscribe & Save" Toggle** — A prominent UI component on product pages that offers a discount (e.g., 10-15%) for recurring monthly deliveries.
2. **Ritual-Based Navigation** — Filter products by "Morning Kickstart" (Loose Leaf), "Quick Fix" (Instant Sachets), or "Tea Time Snacks" (Collections).
3. **High-AOV Bundle Selector** — Custom UI for building "Experience Boxes" (e.g., "The Cookie Monster Collection" or "30-Day Instant Chai Combo").
4. **Incentivized Shopping Bag** — A sliding cart with a "Free Gift" progress bar (e.g., "Add ₹200 more for a free ceramic mug").
5. **Subscription Dashboard** — A "My Rituals" section for users to pause, skip, or swap flavors in their upcoming monthly box.

---

### Section 5 — Design Specifications

**Visual style:** Modern Indian. Earthy textures (wood, ceramic), high-contrast product shots on warm neutrals, and vibrant tea-leaf green accents.

**Color mode:** Primarily Light Mode with deep earthy accents.

**Color palette:**
- Primary Brand: `#004B23` (Deep Tea Green — for authority and freshness)
- Accent: `#D4A373` (Earthy Terracotta — for snacks and warm callouts)
- Background: `#FFFDF6` (Warm Paper — off-white, not clinical)
- Surface/Card: `#FFFFFF`
- Text Primary: `#1A1A1A` (Near Black)
- Progress Fill: `#FFD338` (Vivid Yellow — for gifting/urgency)

**Typography:** Sophisticated Sans-serif (e.g., Gotham or Plus Jakarta Sans).
- Display Heading: `clamp(36px, 5vw, 56px)`, weight 800, tracking `-0.02em`.
- Section Title: `24px`, weight 700.
- Body Copy: `16px`, weight 400, leading 1.6.
- Price: Bold, high-contrast, with a smaller `₹` symbol.

**Spacing:** 12px base unit. 
- Large `96px` section padding.
- Card padding: `20px`.
- High use of "lifestyle blocks" that bleed edge-to-edge.

**Border radius:** `4px` (Slightly sharp, professional) to `12px` (Soft, friendly for snacks).

**Responsive:** Mobile-first. Product carousels for "Bestsellers." Floating "Subscribe" button on mobile product pages.

**Accessibility:** WCAG AA. Focus states use a `#004B23` border. All text on warm-white must maintain 4.5:1 contrast.

**Motion:** 
- "Steam" effect: Subtle parallax on hero images.
- Cart Drawer: Smooth slide from right with "Gift progress" animation.
- "Subscribe" Pulse: A gentle scale animation on the repeat-order toggle.
- Respect: `prefers-reduced-motion: reduce` → disable all animations and transitions.

---

### Section 6 — Structure

**Home Cafe Landing Page Layout:**
1. **Header:** Slim top-bar ("Free Shipping on orders above ₹499"). Sticky nav with Logo (Center) and "Download App" (Right).
2. **Hero:** Full-bleed lifestyle video/photo of brewing tea. H1 left-aligned. "Bring the Cafe home."
3. **Bestseller Carousel:** Horizontal scroll of high-frequency products with "Quick Add" buttons.
4. **"Your Ritual" Section:** Grid of 3 categories: Loose Leaf, Instant, Snacks. Large image with text overlay.
5. **Subscription Promo Strip:** "Never run out. Subscribe & Save 15%." Large CTA button.

**Product Page Structure:**
- Left: Vertical thumbnail strip + Main product shot.
- Right: Title, Star Rating, Description.
- Interaction: "Subscribe & Save" (Selected by default) vs. "One-time Purchase" radio buttons.
- Quantity: "30 Sachets" (Monthly) vs. "10 Sachets" (Trial).

**Shopping Bag:**
- Header: "My Shopping Bag (n)".
- Gifting Progress: "₹150 away from a Free Jute Bag".
- Items: Product image, Variant, Price, Quantity stepper.
- Footer: "Secure Checkout" button.

---

### Section 7 — Technical Specifications

- **Framework:** Next.js 14, React 18, TypeScript.
- **Styling:** Tailwind CSS.
- **State:** Zustand for subscription preferences and "Gift Progress" logic.
- **Backend:** Supabase for Product Metadata, User Subscriptions, and Saved Addresses.
- **Payments:** Razorpay or Stripe (Supporting Indian recurring mandates / e-mandates).
- **Icons:** Custom SVG (Tea leaves, ceramic cups, traditional snacks).

---

### Section 8 — Implementation Steps

1. **The Palette:** Define the `tea-green` and `warm-paper` tokens. Set up the typography hierarchy.
2. **The "Ritual" Layout:** Build the Home Cafe shell with lifestyle-centric sections.
3. **Subscribe & Save Component:** Build the radio-button logic for one-time vs. subscription pricing.
4. **Intelligent Cart:** Implement the "Free Gift" progress bar logic in Zustand.
5. **Experience Bundles:** Build the UI for selecting multiple items in a single collection box.

---

### Section 9 — User Experience

The user is looking for their "Daily Fix." 
The UI must feel "Predictable and Reliable." Show clear delivery dates for subscriptions (e.g., "Arrives on the 1st of every month").
The "Aha! moment" is the ease of the "Instant" product. Use GIFs showing the "1-minute prep" process on the product page.

---

### Section 10 — Constraints

- **No cold/corporate blues.** Stick to the warm Indian palette.
- **No generic stock photography.** Must feature Indian tea-drinking culture.
- **No complex multi-step checkout.** 1-page "Safe Checkout" is mandatory.
- **No hidden pricing.** Show the "Subscribed Price" vs "Regular Price" clearly.

---

## Platform Versions

---

### 1 — Lovable

Build **ChaiRitual** — a modern Indian tea & FMCG subscription storefront inspired by Chai Point — using Next.js 14 App Router, TypeScript strict, Tailwind CSS. Mobile-first. Font: Plus Jakarta Sans 400/700/800 via `next/font/google`.

**Design identity: Modern Indian.** Warm paper surfaces (`#FFFDF6`), deep tea green CTAs (`#004B23`), earthy terracotta accents (`#D4A373`). Product photography is the hero — chai brewing, ceramic cups, snacks in natural light.

**Tailwind config:**
```js
colors: {
  green:      '#004B23',   // Deep Tea Green — CTAs, subscribe toggle active, badges
  terracotta: '#D4A373',   // snack section accents, warm callouts
  paper:      '#FFFDF6',   // main bg
  yellow:     '#FFD338',   // gift progress bar fill
}
```

**Core types:**
```typescript
export type PurchaseMode = 'subscribe' | 'one_time'
export type RitualCategory = 'loose_leaf' | 'instant' | 'snacks' | 'bundle'

export interface TeaProduct {
  id: string; slug: string; title: string
  description: string; imageUrl: string
  price: number           // one-time price in INR paise (1 rupee = 100 paise)
  subscribePrice: number  // price when subscribed (= price * 0.85 for 15% off)
  category: RitualCategory
  weightOptions: string[] // e.g. ['100g', '250g', '500g']
  featured: boolean; bestSeller: boolean
}

export interface CartItem {
  productId: string; title: string; imageUrl: string
  quantity: number; selectedWeight: string
  mode: PurchaseMode; unitPrice: number  // paise
}

export interface CartState {
  items: CartItem[]
  drawerOpen: boolean
  freeGiftThreshold: number   // paise — e.g. 49900 (₹499)
  freeGiftLabel: string       // e.g. 'Free Jute Bag'
}
```

**The Subscribe & Save toggle — the defining feature:**
```tsx
// Radio group: 'subscribe' | 'one_time'
// Subscribe = selected by default; shows "₹X/mo · 15% off" price
// One-time = shows full price with strikethrough on subscribe price
// Price updates reactively without page navigation
```

**Free Gift progress bar:**
```typescript
// cartTotal = sum of (item.unitPrice * item.quantity) for all items
// progress = Math.min(cartTotal / freeGiftThreshold, 1)  — 0 to 1
// "Add ₹{formatINR(freeGiftThreshold - cartTotal)} more for a free {freeGiftLabel}"
// When progress === 1: "Free Jute Bag added!"
```

**Anti-patterns:**
- Never use `₹` symbol with paise values — always `formatINR(paise)` → `'₹49'`
- Never show subscribe price as default for one-time purchase mode
- Never hide the "Subscribe & Save" option — it must be visible on every product page
- Never `rounded-full` (pill shapes) on main CTAs — max `rounded-md` (4px) for professional feel

**`tsc --noEmit` exits 0. `npm run build` produces `/out`.**

---

### 2 — ChatGPT Canvas

Create **ChaiRitual** — modern Indian tea subscription storefront — Next.js 14, TypeScript strict, Tailwind CSS.

```bash
npx create-next-app@latest chairitual --typescript --app --tailwind --import-alias "@/*"
npm install zustand framer-motion lucide-react
```

**Complete type system:**
```typescript
export type PurchaseMode = 'subscribe' | 'one_time'
export type RitualCategory = 'loose_leaf' | 'instant' | 'snacks' | 'bundle'

export interface TeaProduct {
  id: string; slug: string; title: string; description: string; imageUrl: string
  price: number; subscribePrice: number  // INR paise
  category: RitualCategory; weightOptions: string[]
  featured: boolean; bestSeller: boolean
}

export interface CartItem {
  productId: string; title: string; imageUrl: string; quantity: number
  selectedWeight: string; mode: PurchaseMode; unitPrice: number
}

export interface CartState {
  items: CartItem[]; drawerOpen: boolean
  freeGiftThreshold: number; freeGiftLabel: string
}
```

**Key utilities:**
```typescript
// src/lib/formatINR.ts
export function formatINR(paise: number): string {
  const rupees = Math.round(paise / 100)
  return `₹${rupees.toLocaleString('en-IN')}`
}
// formatINR(49900) → '₹499'
// formatINR(149000) → '₹1,490'

// src/lib/calculateSubscribePrice.ts
export function calculateSubscribePrice(originalPaise: number, discountPercent = 15): number {
  return Math.round(originalPaise * (1 - discountPercent / 100))
}
// calculateSubscribePrice(10000, 15) → 8500

// src/lib/cartProgress.ts
export function cartProgress(totalPaise: number, thresholdPaise: number): number {
  return Math.min(totalPaise / thresholdPaise, 1)
}
// cartProgress(25000, 49900) → 0.501... → 50.1% filled
```

**Zustand store:**
```typescript
// src/store/cart.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, PurchaseMode } from '@/types'

interface CartStore {
  items: CartItem[]; drawerOpen: boolean
  addItem: (item: CartItem) => void
  updateQuantity: (productId: string, quantity: number) => void
  removeItem: (productId: string) => void
  openDrawer: () => void; closeDrawer: () => void
  cartTotal: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [], drawerOpen: false,
      addItem: (item) => set((s) => {
        const existing = s.items.find(i => i.productId === item.productId && i.selectedWeight === item.selectedWeight && i.mode === item.mode)
        if (existing) return { items: s.items.map(i => i.productId === item.productId ? { ...i, quantity: i.quantity + 1 } : i) }
        return { items: [...s.items, item] }
      }),
      updateQuantity: (id, qty) => set((s) => ({
        items: qty <= 0 ? s.items.filter(i => i.productId !== id) : s.items.map(i => i.productId === id ? { ...i, quantity: qty } : i)
      })),
      removeItem: (id) => set((s) => ({ items: s.items.filter(i => i.productId !== id) })),
      openDrawer: () => set({ drawerOpen: true }),
      closeDrawer: () => set({ drawerOpen: false }),
      cartTotal: () => get().items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0),
    }),
    { name: 'chairitual-cart' }
  )
)
```

---

### 3 — Bolt

Build **ChaiRitual** — modern Indian tea subscription storefront. Next.js 14, TypeScript strict, Tailwind CSS.

**File structure:**
```
src/
  types/index.ts            — TeaProduct, CartItem, CartState, PurchaseMode, RitualCategory
  lib/
    data.ts                 — PRODUCTS (12, 3 featured), RITUAL_CATEGORIES, FREE_GIFT_CONFIG
    formatINR.ts            — formatINR(paise): '₹499'
    calculateSubscribePrice.ts — originalPaise * (1 - discount%)
    cartProgress.ts         — Math.min(total / threshold, 1)
  store/
    cart.ts                 — useCartStore (Zustand persist)
  components/
    layout/
      SiteNav.tsx           — slim top-bar + sticky main nav + logo center
      CartDrawer.tsx        — 'use client', Framer Motion x: 100% → 0
      GiftProgress.tsx      — progress bar + "₹X more for {gift}" label
      Footer.tsx
    home/
      HeroSection.tsx       — full-bleed tea lifestyle, H1 left, green CTA
      BestsellerCarousel.tsx — horizontal scroll, Quick Add buttons
      RitualGrid.tsx        — 3-category grid: Loose Leaf / Instant / Snacks
      SubscriptionPromoStrip.tsx — "Never run out. Subscribe & Save 15%"
    product/
      ProductGallery.tsx    — vertical thumbnail strip + main image
      SubscribeToggle.tsx   — 'use client', radio: subscribe vs one_time, reactive price
      WeightSelector.tsx    — pill selector for weight options
    subscription/
      MyRitualsPage.tsx     — subscriber dashboard: upcoming orders, Pause/Skip/Swap
  app/
    globals.css, layout.tsx, page.tsx
    products/[slug]/page.tsx
    my-rituals/page.tsx
```

**Critical rules:**
1. `formatINR(paise)` — never render paise raw; never `price / 100` in JSX
2. `subscribePrice` always shown as "₹X/mo · 15% off" vs one-time at full price
3. Subscribe toggle defaults to `'subscribe'` selected — one-time is the opt-out
4. Cart total in `cartStore.cartTotal()` — never computed locally in components
5. `GiftProgress` renders `cartProgress(total, threshold)` — never hardcode `0.5` etc.

---

### 4 — v0

**SubscribeToggle:**
```tsx
<div role="radiogroup" aria-label="Purchase mode" className="border border-slate-200 rounded-md overflow-hidden">
  <label className={cn(
    "flex items-center justify-between p-4 cursor-pointer border-b border-slate-200",
    mode === 'subscribe' ? "bg-green/5 border-l-4 border-l-green" : "bg-white hover:bg-slate-50"
  )}>
    <div>
      <input type="radio" name="mode" value="subscribe" className="sr-only"
        checked={mode === 'subscribe'} onChange={() => setMode('subscribe')} />
      <span className="font-semibold text-sm">Subscribe & Save 15%</span>
      <p className="text-xs text-slate-500 mt-0.5">Delivered every month. Cancel anytime.</p>
    </div>
    <div className="text-right">
      <span className="font-bold text-green text-lg">{formatINR(product.subscribePrice)}</span>
      <p className="text-xs text-slate-400 line-through">{formatINR(product.price)}</p>
    </div>
  </label>
  <label className={cn(
    "flex items-center justify-between p-4 cursor-pointer",
    mode === 'one_time' ? "bg-slate-50" : "bg-white hover:bg-slate-50"
  )}>
    <div>
      <input type="radio" name="mode" value="one_time" className="sr-only"
        checked={mode === 'one_time'} onChange={() => setMode('one_time')} />
      <span className="font-medium text-sm">One-time purchase</span>
    </div>
    <span className="font-bold text-slate-800 text-lg">{formatINR(product.price)}</span>
  </label>
</div>
```

**GiftProgress in CartDrawer:**
```tsx
const total = cartTotal()
const threshold = 49900  // ₹499
const progress = cartProgress(total, threshold)
const remaining = threshold - total

{progress < 1 ? (
  <div className="bg-amber-50 border border-amber-200 rounded-md p-3 mb-4">
    <p className="text-xs font-medium text-amber-800">
      Add {formatINR(remaining)} more for a free {freeGiftLabel}
    </p>
    <div className="mt-2 h-2 bg-amber-200 rounded-full overflow-hidden">
      <div className="h-full bg-yellow transition-all duration-500 rounded-full"
        style={{ width: `${progress * 100}%` }} />
    </div>
  </div>
) : (
  <div className="bg-green/10 border border-green/30 rounded-md p-3 mb-4">
    <p className="text-xs font-semibold text-green">🎁 Free {freeGiftLabel} added!</p>
  </div>
)}
```

---

### 5 — Claude Artifacts

Build **ChaiRitual** — modern Indian tea subscription storefront — Next.js 14, TypeScript strict, Tailwind CSS. Plus Jakarta Sans 400/700/800.

**Four defining constraints:**

**Constraint 1 — All prices in paise, all display via formatINR:**
```typescript
// WRONG: rupee arithmetic, raw number in JSX
<span>₹{product.price}</span>           // ✗ shows paise as rupees
<span>₹{product.price / 100}</span>     // ✗ float arithmetic

// RIGHT: integer paise, formatINR for display
<span>{formatINR(product.price)}</span> // ✓ → '₹499'
```

**Constraint 2 — Subscribe selected by default:**
```typescript
// WRONG: one_time as default
const [mode, setMode] = useState<PurchaseMode>('one_time')  // ✗

// RIGHT: subscribe as default
const [mode, setMode] = useState<PurchaseMode>('subscribe')  // ✓
// Conversion goal is subscription — one_time is the opt-out
```

**Constraint 3 — Cart total computed in store, not components:**
```typescript
// WRONG: local calculation
const total = items.reduce((s, i) => s + i.unitPrice * i.quantity, 0)  // ✗ in component

// RIGHT: via store method
const total = useCartStore(s => s.cartTotal())  // ✓ single source of truth
```

**Constraint 4 — No pill/rounded-full shapes on primary CTAs:**
```tsx
// WRONG: pill button
<button className="rounded-full px-8 py-3">Subscribe & Save</button>  // ✗

// RIGHT: professional rounded-md
<button className="rounded-md px-6 py-3">Subscribe & Save</button>  // ✓
// rounded-full allowed only for category filter chips, never primary CTAs
```

**QA checks:**
```bash
tsc --noEmit
grep -r "\.price\b\|/ 100" src/components --include="*.tsx" | grep -v "formatINR"  # empty
grep -r "useState.*one_time" src/components --include="*.tsx"                       # empty (default is subscribe)
grep -r "rounded-full" src/components --include="*.tsx" | grep -v "chip\|pill\|tag" # empty
npm run build
```

---

### 6 — Grok

Generate all source files for **ChaiRitual**. Next.js 14, TypeScript strict, Tailwind CSS.

1. `tailwind.config.ts` — colors (green, terracotta, paper, yellow)
2. `src/types/index.ts` — PurchaseMode, RitualCategory, TeaProduct, CartItem, CartState
3. `src/lib/formatINR.ts` — `formatINR(paise): '₹499'`
4. `src/lib/calculateSubscribePrice.ts` — `originalPaise * (1 - discountPercent / 100)`
5. `src/lib/cartProgress.ts` — `Math.min(total / threshold, 1)`
6. `src/lib/data.ts` — PRODUCTS (12), RITUAL_CATEGORIES, FREE_GIFT_CONFIG
7. `src/store/cart.ts` — useCartStore (Zustand persist, cartTotal method)
8. `src/app/globals.css` + `layout.tsx` — Plus Jakarta Sans setup
9. `src/components/layout/SiteNav.tsx` — slim top-bar + sticky nav
10. `src/components/layout/CartDrawer.tsx` — 'use client', slide-in, GiftProgress
11. `src/components/layout/GiftProgress.tsx` — cartProgress bar + label
12. `src/components/home/HeroSection.tsx` — full-bleed bg, H1, green CTA
13. `src/components/home/BestsellerCarousel.tsx` — horizontal scroll, Quick Add
14. `src/components/home/RitualGrid.tsx` — 3-category grid
15. `src/components/home/SubscriptionPromoStrip.tsx` — dark strip, Subscribe CTA
16. `src/components/product/SubscribeToggle.tsx` — 'use client', radio, reactive price via formatINR
17. `src/components/product/WeightSelector.tsx` — pill options (chip style — rounded-full OK here)
18. `src/components/product/ProductGallery.tsx` — thumbnail strip + main image
19. `src/app/page.tsx` + `app/products/[slug]/page.tsx` + `app/my-rituals/page.tsx`

**Rules:** formatINR for all prices; subscribe default; cartTotal from store; no pill CTAs.

---

### 7 — Gemini

**Project:** ChaiRitual — modern Indian tea subscription. Next.js 14 App Router, TypeScript strict, Tailwind CSS. Plus Jakarta Sans 400/500/600/700.

**Design system — 4 rules:**
1. `formatINR(paise)` for every price — never raw paise, never `toLocaleString` directly
2. Subscribe mode is default — `useState<PurchaseMode>('subscribe')` on SubscribeToggle; one_time is opt-out
3. `calculateSubscribePrice(originalPaise, discountPercent)` drives reactive pricing — never hardcode discount multiplier
4. `rounded-full` only for WeightSelector chips — CTAs and cards use `rounded-md` max

**Architecture — 4 layers:**

Layer 1 — Foundation: types (PurchaseMode, TeaProduct, CartItem), formatINR, calculateSubscribePrice, cartProgress, data (PRODUCTS ×12, RITUAL_CATEGORIES, FREE_GIFT_CONFIG), useCartStore (Zustand persist, cartTotal computed method).

Layer 2 — Shell: SiteNav (slim announcement top-bar + sticky nav with cart count badge); CartDrawer (`'use client'`, Framer Motion `x: '100%' → 0`, `duration: 0.25`, GiftProgress bar driven by `cartProgress(cartTotal, threshold)`, locked gift section when below threshold).

Layer 3 — Homepage: HeroSection (full-bleed paper-bg, H1, Deep Tea Green CTA); BestsellerCarousel (`'use client'`, `overflow-x: auto`, CSS `scroll-smooth`, Quick Add button per card); RitualGrid (3 ritual category cards, server component); SubscriptionPromoStrip (dark bg, white text, Subscribe CTA).

Layer 4 — Product page: ProductGallery (thumbnail strip + main image, active thumbnail terracotta border); SubscribeToggle (`'use client'`, `role="radiogroup"`, subscribe default, formatINR for reactive price); WeightSelector (`rounded-full` pills — only place in project); Add to Cart dispatches to useCartStore.

**Motion:** CartDrawer `x: '100%' → 0` duration 0.25; GiftProgress bar CSS `transition-all duration-500`; BestsellerCarousel CSS `scroll-smooth`; HeroSection no animation (photography primary); all Framer Motion `useReducedMotion()` guarded.

---

### 8 — Cursor

**`src/lib/formatINR.ts`:**
```typescript
export function formatINR(paise: number): string {
  return `₹${Math.round(paise / 100).toLocaleString('en-IN')}`
}
// formatINR(49900) → '₹499'
// formatINR(149900) → '₹1,499'
// NEVER: `₹${paise}` or `₹${paise / 100}`
```

**`src/components/product/SubscribeToggle.tsx`:**
```tsx
'use client'
import { useState } from 'react'
import type { PurchaseMode, TeaProduct } from '@/types'
import { formatINR } from '@/lib/formatINR'
import { cn } from '@/lib/utils'

export default function SubscribeToggle({ product, onModeChange }: {
  product: TeaProduct; onModeChange: (mode: PurchaseMode, price: number) => void
}) {
  const [mode, setMode] = useState<PurchaseMode>('subscribe')  // subscribe by default

  const select = (m: PurchaseMode) => {
    setMode(m)
    onModeChange(m, m === 'subscribe' ? product.subscribePrice : product.price)
  }

  return (
    <div role="radiogroup" className="border border-slate-200 rounded-md overflow-hidden">
      <label className={cn(
        "flex justify-between p-4 cursor-pointer border-b border-slate-200",
        mode === 'subscribe' ? "bg-green/5 border-l-4 border-l-green" : "bg-white"
      )}>
        <input type="radio" className="sr-only" name="mode" checked={mode === 'subscribe'}
          onChange={() => select('subscribe')} />
        <div>
          <p className="font-semibold text-sm">Subscribe & Save 15%</p>
          <p className="text-xs text-slate-500 mt-0.5">Delivered monthly. Cancel anytime.</p>
        </div>
        <div className="text-right">
          <p className="font-bold text-green text-lg">{formatINR(product.subscribePrice)}</p>
          <p className="text-xs text-slate-400 line-through">{formatINR(product.price)}</p>
        </div>
      </label>
      <label className={cn("flex justify-between p-4 cursor-pointer", mode === 'one_time' ? "bg-slate-50" : "bg-white")}>
        <input type="radio" className="sr-only" name="mode" checked={mode === 'one_time'}
          onChange={() => select('one_time')} />
        <p className="font-medium text-sm">One-time purchase</p>
        <p className="font-bold text-slate-800 text-lg">{formatINR(product.price)}</p>
      </label>
    </div>
  )
}
// Subscribe selected by default — one_time is opt-out
// formatINR(product.subscribePrice) — NEVER product.subscribePrice raw
// NEVER rounded-full on this component — rounded-md max
```

**Absolute rules:**
```bash
grep -r "product\.price\b\|subscribePrice\b" src/components --include="*.tsx" | grep -v "formatINR"  # empty
grep -r "useState.*'one_time'" src/components --include="*.tsx"                                        # empty (subscribe default)
grep -r "rounded-full" src/components --include="*.tsx" | grep -v "WeightSelector\|chip\|filter"      # empty
tsc --noEmit && npm run build
```
