---
prompt_id: dpecom_01
sub_category: E-commerce
sub_type: Creator Digital Storefront
title: Neo-Creator — Bold Digital Goods Marketplace
reference_patterns: neo_brutalism, creator_first_onboarding, hard_shadow_components
inspiration: gumroad.com
quality_score:
status: draft
notes: Based on Gumroad's Neo-Brutalist aesthetic and creator-centric workflow.
---

## Base Prompt

### Section 1 — Role

You are a senior product designer specializing in creator-economy platforms. You understand that for creators, the tool must feel like an extension of their craft—authentic, raw, and high-performance. You reject "corporate" design (soft shadows, gradients, rounded pills) in favor of Neo-Brutalism: high contrast, thick borders, and bold typography. You design for "0 to $1" conversion, where the distance between a creator's idea and a buyer's download is as short as possible.

---

### Section 2 — Application Overview

This is a digital storefront for creators to sell products (PDFs, videos, software, memberships). The customer is a "knowledge seeker" or "fan" who values direct support and immediate access. The creator is an independent artist, developer, or writer who needs a platform that gets out of the way.

The application covers: Homepage (Landing/Marketplace), Creator Shop Page, Product Detail Page (PDP), and a 1-page Checkout Overlay. The primary goal is a successful "Purchase" of a digital asset.

---

### Section 3 — Brand Voice & Mood

The mood is "Neo-Brutalist" and "Authentic." It feels like a high-end indie zine. It is loud, unapologetic, and utilitarian. There is zero fluff.

Copy is direct and empowering. Headlines focus on action: "Start selling," "Get paid," "Own your audience." No corporate jargon. No "holistic solutions." Just "Sell your stuff."

Vibe word: Raw.

---

### Section 4 — Core Features & Functionality

1. **Marketplace Homepage** — Category-based grid of digital products. High-contrast cards. Focus on "What's new" and "Trending creators."
2. **Creator Shop Page** — A simple, customizable profile for a creator. Header, bio, and a grid of their products.
3. **Product Detail Page (PDP)** — Hero section with product cover (video or image), "Pay what you want" price input (min price enforced), "Buy this" primary CTA, product description with markdown support, and "What you get" list.
4. **Checkout Overlay** — A 1-page slide-up or modal. Email field, payment (Stripe/Paypal), and immediate download link upon success. No multi-step forms.

---

### Section 5 — Design Specifications

**Visual style:** Neo-Brutalism. Flat surfaces with hard, offset shadows. Heavy black borders. High-saturation accent colors.

**Color mode:** High-contrast Light Mode.

**Color palette:**
- Background: `#FFFFFF` (Pure White)
- Surface: `#FFFFFF`
- Borders/Lines: `#000000` (Pure Black, 2px–4px weight)
- Primary Accent: `#FF90E8` (Gumroad Pink)
- Secondary Accent: `#FFD338` (Vivid Yellow)
- Text Primary: `#000000`
- Text Secondary: `#666666`
- Hard Shadow: `#000000`

**Typography:** Bold Grotesque Sans-Serif (e.g., Public Sans or Archivo).
- Display H1: `clamp(40px, 8vw, 96px)`, Weight 800, tracking `-0.04em`, line-height 0.9.
- Section H2: `32px`, Weight 700, tracking `-0.02em`.
- Body: `18px`, Weight 400, line-height 1.5.
- Monospace: `14px` for prices and meta-tags.

**Spacing:** 16px base unit. 
- All components have a `2px` black border.
- Buttons and cards use a `4px` black offset shadow (`box-shadow: 4px 4px 0px 0px #000000`).

**Border radius:** `0px` (Strictly sharp corners for the Brutalist feel).

**Responsive:** Fluid grid. Sections use `border-b` and `border-r` to create a modular "window" effect.

**Accessibility:** WCAG AAA for text contrast. Focus states use a thick `#FFD338` border.

**Motion:** 
- "Pressed" effect on click: `translate(2px, 2px)` with shadow reducing to `2px`.
- Page transitions: Hard cuts or quick `200ms` slides. No "gentle" fades.
- Respect: `prefers-reduced-motion: reduce` → disable all animations and transitions.

---

### Section 6 — Structure

**Homepage Layout:**
1. **Nav:** Thick bottom border. Logo left (Bold Black Text). Links: "Discover," "Pricing," "Learn." Right: "Login," "Start Selling" (Pink Button).
2. **Hero:** `border-b`. Massive H1 left. "Sell anything" with a scrolling list of product types (PDFs, Courses, etc.).
3. **Product Grid:** Modular blocks. Each card has a `border`, `shadow`, and `hover:translate` effect.

**PDP Layout:**
1. **Header:** Product name + Creator name.
2. **Main:** 2-column. Left: Cover image/video. Right: Price input + "Buy this" button.
3. **Description:** Simple text with heavy-weight H3 headers.

---

### Section 7 — Technical Specifications

- **Framework:** Next.js 14, React 18, TypeScript.
- **Styling:** Tailwind CSS. Custom "neo" shadow classes.
- **State:** Zustand for checkout modal and cart.
- **Components:** Custom "Box" component that wraps everything with `border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`.
- **Payment:** Stripe Element Integration for the Checkout Overlay.

---

### Section 8 — Implementation Steps

1. **The Grid:** Build the layout using CSS borders and flexbox. The "window" effect is the most important visual cue.
2. **Shadow System:** Create a Tailwind plugin or utility for the hard black shadows.
3. **Creator Shop:** Build the shop page first—it's the core of the experience.
4. **Checkout Overlay:** Implement the 1-page slide-up modal.
5. **Product Detail:** Add the "Pay what you want" logic.

---

### Section 9 — User Experience

The user wants to buy a digital asset and get it *now*. 
The creator wants to set up a shop in 5 minutes.
The UI should feel "fast" not through animations, but through a lack of friction. Large buttons, clear text, and zero distracting visuals.

---

### Section 10 — Constraints

- **No soft shadows.**
- **No border-radius.**
- **No gradients.**
- **No generic icons.** Use bold, thick-stroke SVGs.
- **No white-on-white.** Use borders to separate all elements.

---

## Platform Versions

---

### 1 — Lovable

Build **NeoCrafter** — a Neo-Brutalist digital goods marketplace inspired by Gumroad — using Next.js 14 App Router, TypeScript strict, Tailwind CSS. Static export. Font: Archivo 400/700/800 via `next/font/google`.

**Design identity: Neo-Brutalism.** The entire visual language rests on three rules: (1) `border-2 border-black` on every surface, (2) `shadow-[4px_4px_0px_0px_#000]` on every card and button, (3) `rounded-none` everywhere. No exceptions.

**Tailwind config extension:**
```js
// tailwind.config.ts
theme: {
  extend: {
    colors: {
      pink:   '#FF90E8',
      yellow: '#FFD338',
    },
    boxShadow: {
      'hard':    '4px 4px 0px 0px #000000',
      'hard-lg': '8px 8px 0px 0px #000000',
      'hard-sm': '2px 2px 0px 0px #000000',
    },
    fontFamily: {
      sans: ['Archivo', 'sans-serif'],
    },
  },
}
```

**Zero hex in JSX.** All colors via Tailwind config aliases (`bg-pink`, `bg-yellow`, `text-black`). No inline `style={{ color: '#FF90E8' }}`.

**Core types unique to this build:**
```typescript
export type ProductType = 'pdf' | 'video' | 'software' | 'membership'
export type CheckoutStep = 'email' | 'payment' | 'success'

export interface DigitalProduct {
  id: string
  creatorId: string
  title: string
  description: string
  price: number        // cents; 0 = pay-what-you-want
  minPrice: number     // minimum cents for PWYW; 0 if fixed
  productType: ProductType
  featured: boolean
  tags: string[]
  salesCount: number
}

export interface Creator {
  id: string
  name: string
  bio: string
  twitterHandle: string
  totalSales: number
  productCount: number
  verified: boolean
}
```

**The PWYW (Pay What You Want) constraint** — `price: 0` means the buyer enters any amount ≥ `minPrice`. `formatPrice(0)` returns `'Pay what you want'`. Never show `$0` anywhere.

**Page sections (build in this order):**
1. **SiteNav** — `border-b-2 border-black`, logo "NeoCrafter" in `font-black`, "Start Selling" pink button with hard shadow
2. **HeroSection** — oversized H1 `clamp(48px, 8vw, 96px)` tracking-tight, scrolling product-type list (PDFs / Courses / Software / Music / Templates), yellow CTA pair
3. **ProductGrid** — masonry-style 3-col grid; each `ProductCard` has `border-2 border-black shadow-hard`
4. **ProductCard** — cover image, creator name, title (weight 700), price or "Pay what you want", category tag in pink; `hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm` pressed transition
5. **FeaturedCreators** — yellow bg strip, 4 creator chips `border-2 border-black shadow-hard-sm`
6. **CheckoutOverlay** — Framer Motion `y: '100%' → 0` slide-up; email step → payment step → success step; `border-t-2 border-black`

**Anti-patterns:**
- Never `rounded-*` (not even `rounded-sm`) — hard `0px` only
- Never soft `box-shadow` with rgba blur — hard offset black only
- Never gradients on any surface
- Never `font-weight: 400` for headings — minimum `font-bold` (700), hero uses `font-black` (900)
- Never `$0` for PWYW products — use `formatPrice(0)` → `'Pay what you want'`

**`tsc --noEmit` exits 0. `npm run build` produces `/out`.**

---

### 2 — ChatGPT Canvas

Create **NeoCrafter** — Neo-Brutalist digital goods marketplace — Next.js 14, TypeScript strict, Tailwind CSS. Static export.

```bash
npx create-next-app@latest neocrafter --typescript --app --tailwind --import-alias "@/*"
npm install zustand framer-motion lucide-react
```

**Tailwind config** — extend `colors` with `pink: '#FF90E8'` and `yellow: '#FFD338'`; extend `boxShadow` with `hard: '4px 4px 0px 0px #000000'` and `hard-lg: '8px 8px 0px 0px #000000'`; extend `fontFamily` with `sans: ['Archivo']`.

**Complete type system:**
```typescript
// src/types/index.ts
export type ProductType = 'pdf' | 'video' | 'software' | 'membership'
export type CheckoutStep = 'email' | 'payment' | 'success'

export interface DigitalProduct {
  id: string; creatorId: string; title: string; description: string
  price: number        // cents; 0 = PWYW
  minPrice: number     // minimum for PWYW; 0 if fixed price
  productType: ProductType; featured: boolean
  tags: string[]; salesCount: number
}

export interface Creator {
  id: string; name: string; bio: string
  twitterHandle: string; totalSales: number
  productCount: number; verified: boolean
}

export interface CartItem {
  productId: string; title: string
  price: number        // resolved price in cents
  creatorName: string
}

export interface CheckoutState {
  step: CheckoutStep; email: string
  items: CartItem[]
  customPrices: Record<string, number>  // productId → buyer-entered price (cents)
}
```

**Key utilities:**
```typescript
// src/lib/formatPrice.ts
export function formatPrice(cents: number): string {
  if (cents === 0) return 'Pay what you want'
  return `$${(cents / 100).toFixed(0)}`
}
// formatPrice(0) → 'Pay what you want'
// formatPrice(2900) → '$29'

// src/lib/resolvePrice.ts
export function resolvePrice(
  product: DigitalProduct,
  customPrices: Record<string, number>
): number {
  if (product.price > 0) return product.price
  return customPrices[product.id] ?? product.minPrice
}
```

**Zustand store:**
```typescript
// src/store/checkout.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CheckoutState, CartItem, CheckoutStep } from '@/types'

interface CheckoutStore extends CheckoutState {
  addItem: (item: CartItem) => void
  setEmail: (email: string) => void
  setStep: (step: CheckoutStep) => void
  setCustomPrice: (productId: string, price: number) => void
  reset: () => void
}

export const useCheckoutStore = create<CheckoutStore>()(
  persist(
    (set) => ({
      step: 'email', email: '', items: [], customPrices: {},
      addItem: (item) => set((s) => ({ items: [...s.items, item] })),
      setEmail: (email) => set({ email }),
      setStep: (step) => set({ step }),
      setCustomPrice: (id, price) =>
        set((s) => ({ customPrices: { ...s.customPrices, [id]: price } })),
      reset: () => set({ step: 'email', email: '', items: [], customPrices: {} }),
    }),
    { name: 'neocrafter-checkout' }
  )
)
```

**Routes:**
- `/` — Marketplace homepage (ProductGrid + FeaturedCreators)
- `/products/[id]` — PDP with PWYW input and CheckoutOverlay trigger
- `/creators/[id]` — Creator shop page

---

### 3 — Bolt

Build **NeoCrafter** — Neo-Brutalist digital goods marketplace. Next.js 14, TypeScript strict, Tailwind CSS. Static export.

```bash
npx create-next-app@latest neocrafter --typescript --app --tailwind --import-alias "@/*"
npm install zustand framer-motion lucide-react
```

**File structure:**
```
src/
  types/index.ts            — DigitalProduct, Creator, CartItem, CheckoutState, ProductType, CheckoutStep
  lib/
    data.ts                 — PRODUCTS (6), CREATORS (4), FEATURED_TAGS (8)
    formatPrice.ts          — formatPrice(cents): string
    resolvePrice.ts         — resolvePrice(product, customPrices): number
  store/
    checkout.ts             — useCheckoutStore (Zustand persist)
  components/
    layout/
      SiteNav.tsx           — border-b-2, pink "Start Selling" button
      Footer.tsx            — border-t-2, dark bg
    home/
      HeroSection.tsx       — oversized H1, scrolling type list, yellow CTA
      ProductGrid.tsx       — 3-col grid of ProductCards
      ProductCard.tsx       — border-2 shadow-hard, hover pressed effect
      FeaturedCreators.tsx  — yellow bg strip, creator chips
    product/
      PWYWInput.tsx         — 'use client', custom price entry for PWYW products
      ProductGallery.tsx    — cover image + metadata
    checkout/
      CheckoutOverlay.tsx   — 'use client', Framer Motion slide-up, 3 steps
      EmailStep.tsx
      PaymentStep.tsx
      SuccessStep.tsx
  app/
    globals.css             — Archivo import, base resets
    layout.tsx              — SiteNav + Footer shell
    page.tsx                — HeroSection + ProductGrid + FeaturedCreators
    products/[id]/page.tsx  — ProductGallery + PWYWInput + CheckoutOverlay
    creators/[id]/page.tsx  — Creator profile + product list
```

**Hard shadow system — the defining constraint:**
```
border-2 border-black shadow-hard rounded-none   ← every card, every button, every input
hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm   ← hover lift-to-press
active:translate-x-[4px] active:translate-y-[4px] active:shadow-none   ← click = pressed
```

**`ProductCard` class list:**
```tsx
<article className="border-2 border-black shadow-hard rounded-none bg-white
  hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm
  transition-all duration-75 cursor-pointer">
  <div className="border-b-2 border-black aspect-video bg-yellow" />
  <div className="p-4">
    <span className="text-xs font-bold uppercase tracking-widest border border-black px-2 py-0.5">
      {product.productType}
    </span>
    <h3 className="font-bold text-lg mt-2">{product.title}</h3>
    <p className="text-sm text-gray-600 mt-1">{creatorName}</p>
    <p className="font-black text-xl mt-3">{formatPrice(product.price)}</p>
  </div>
</article>
```

**`PWYWInput` — PWYW price entry:**
```tsx
'use client'
// Only renders when product.price === 0
// Input: border-2 border-black rounded-none, prefix '$'
// Validates: value >= product.minPrice (show error if below minimum)
// On submit: calls setCustomPrice(product.id, valueInCents)
```

**QA checks:**
```bash
grep -r "rounded-" src/components --include="*.tsx" | grep -v "rounded-none"  # empty
grep -r "shadow-" src/components --include="*.tsx" | grep -v "shadow-hard"    # empty (no soft shadows)
grep -r "style={{" src/components --include="*.tsx"                           # empty (no inline hex)
tsc --noEmit && npm run build
```

---

### 4 — v0

Design **NeoCrafter** component system — Neo-Brutalist digital goods marketplace. Next.js 14, TypeScript, Tailwind CSS.

**Tailwind aliases:** `bg-pink` = `#FF90E8` · `bg-yellow` = `#FFD338` · `shadow-hard` = `4px 4px 0px 0px #000` · `shadow-hard-lg` = `8px 8px 0px 0px #000`.

**ProductCard:**
```tsx
<article className="border-2 border-black shadow-hard rounded-none bg-white
  hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm
  transition-all duration-75">
  {/* Cover — yellow placeholder, border-b-2 */}
  <div className="border-b-2 border-black aspect-video bg-yellow flex items-center justify-center">
    <span className="font-black text-2xl">{product.productType.toUpperCase()}</span>
  </div>
  {/* Meta */}
  <div className="p-4 space-y-2">
    <span className="inline-block border border-black text-xs font-bold uppercase tracking-widest px-2 py-0.5">
      {product.productType}
    </span>
    <h3 className="font-bold text-lg leading-tight">{product.title}</h3>
    <p className="text-sm text-gray-500">{creatorName}</p>
    <div className="flex items-center justify-between mt-3 pt-3 border-t-2 border-black">
      <span className="font-black text-xl">{formatPrice(product.price)}</span>
      <button className="border-2 border-black shadow-hard-sm rounded-none px-3 py-1
        font-bold text-sm bg-pink
        hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none
        active:translate-x-[2px] active:translate-y-[2px] active:shadow-none
        transition-all duration-75">
        Buy this
      </button>
    </div>
  </div>
</article>
```

**HeroSection:**
```tsx
<section className="border-b-2 border-black px-6 py-20">
  <h1 className="text-[clamp(48px,8vw,96px)] font-black leading-none tracking-[-0.04em]">
    Sell anything.<br />
    <span className="bg-yellow px-2">Get paid.</span>
  </h1>
  <p className="mt-6 text-lg font-medium max-w-md">
    PDFs · Courses · Software · Music · Templates
  </p>
  <div className="flex gap-4 mt-8">
    <button className="border-2 border-black shadow-hard rounded-none bg-pink
      px-6 py-3 font-black text-lg
      hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm">
      Start selling
    </button>
    <button className="border-2 border-black shadow-hard rounded-none bg-white
      px-6 py-3 font-black text-lg
      hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm">
      Discover products
    </button>
  </div>
</section>
```

**CheckoutOverlay (Framer Motion slide-up):**
```tsx
<motion.div
  initial={{ y: '100%' }}
  animate={{ y: 0 }}
  exit={{ y: '100%' }}
  transition={{ type: 'tween', duration: 0.2 }}
  className="fixed inset-x-0 bottom-0 z-50 bg-white border-t-2 border-black shadow-[0_-4px_0px_0px_#000]
    max-h-[90vh] overflow-y-auto p-6">
  {/* EmailStep | PaymentStep | SuccessStep */}
</motion.div>
```

**PWYWInput (for price === 0 products):**
```tsx
<div className="flex border-2 border-black rounded-none">
  <span className="border-r-2 border-black px-3 py-2 font-black bg-yellow">$</span>
  <input
    type="number"
    min={product.minPrice / 100}
    className="flex-1 px-3 py-2 font-bold rounded-none outline-none"
    placeholder={`${product.minPrice / 100}+ (you choose)`}
  />
</div>
```

**Anti-pattern enforcement:**
- `rounded-none` on ALL inputs, buttons, cards — never `rounded-*`
- Hard shadows only — never `shadow-md`, `shadow-lg`, or rgba blur
- Pink on black bg for "Most Popular" tag — never pink on white (check contrast: #FF90E8 on white = 1.8:1 ✗)
- Use `font-black` (900) for prices, `font-bold` (700) for card titles — never `font-normal` on key data

---

### 5 — Claude Artifacts

Build **NeoCrafter** — production-quality Neo-Brutalist digital goods marketplace — Next.js 14 App Router, TypeScript strict, Tailwind CSS. Static export. Archivo 400/700/900.

**Four defining constraints:**

**Constraint 1 — The hard shadow system (never approximate):**
```
/* tailwind.config.ts */
boxShadow: {
  'hard':    '4px 4px 0px 0px #000000',  // cards, buttons, inputs
  'hard-lg': '8px 8px 0px 0px #000000',  // featured/hero elements
  'hard-sm': '2px 2px 0px 0px #000000',  // hover state (reduced)
}
/* Hover = translate + shadow reduce. Click = full translate, shadow-none */
/* WRONG: box-shadow: 0 4px 24px rgba(0,0,0,0.15) — soft shadow, never */
/* RIGHT: shadow-hard with translate-hover pattern */
```

**Constraint 2 — PWYW price resolution:**
```typescript
// WRONG: display product.price directly when price === 0
<span>{product.price === 0 ? 'Free' : `$${product.price}`}</span>

// RIGHT: always use formatPrice and resolvePrice
import { formatPrice } from '@/lib/formatPrice'
<span>{formatPrice(product.price)}</span>
// formatPrice(0) → 'Pay what you want' — never 'Free', never '$0'
```

**Constraint 3 — Checkout state in Zustand, not component state:**
```typescript
// WRONG: useState in CheckoutOverlay for email/step/items
const [step, setStep] = useState<CheckoutStep>('email')  // ✗

// RIGHT: all checkout state in persisted Zustand store
const { step, setStep, email, setEmail } = useCheckoutStore()
// Persisted so state survives overlay close/reopen
```

**Constraint 4 — Pink accent contrast rule:**
```
#FF90E8 (pink) on #FFFFFF (white) = 1.8:1 — FAILS WCAG ✗✗
#FF90E8 (pink) on #000000 (black) = 11.6:1 — passes ✓✓
#000000 on #FF90E8 = 11.6:1 — passes ✓✓

Rule: pink ONLY as background with black text, or black background with pink text.
NEVER pink text on white background.
```

**Complete folder structure:**
```
src/
  types/index.ts
  lib/
    data.ts           — PRODUCTS[], CREATORS[], FEATURED_TAGS[]
    formatPrice.ts    — formatPrice(cents: number): string
    resolvePrice.ts   — resolvePrice(product, customPrices): number
  store/
    checkout.ts       — useCheckoutStore (Zustand + persist)
  components/
    layout/SiteNav.tsx + Footer.tsx
    home/
      HeroSection.tsx
      ProductGrid.tsx
      ProductCard.tsx       — 'use client' for hover state
      FeaturedCreators.tsx
    product/
      PWYWInput.tsx         — 'use client'
      ProductGallery.tsx
    checkout/
      CheckoutOverlay.tsx   — 'use client', AnimatePresence
      EmailStep.tsx
      PaymentStep.tsx       — Stripe Elements placeholder
      SuccessStep.tsx
  app/
    globals.css             — Archivo font-face, base reset (border-box)
    layout.tsx
    page.tsx
    products/[id]/page.tsx
    creators/[id]/page.tsx
```

**`src/app/globals.css`:**
```css
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;700;900&display=swap');
*, *::before, *::after { box-sizing: border-box; }
body { font-family: 'Archivo', sans-serif; background: #FFFFFF; color: #000000; }
/* No border-radius anywhere — enforced via Tailwind rounded-none */
/* No gradients — no background-image, no linear-gradient */
```

**QA checks:**
```bash
tsc --noEmit
grep -r "rounded-" src/components --include="*.tsx" | grep -v "rounded-none"  # empty
grep -r "style={{" src/components --include="*.tsx"                            # empty
grep -r "rgba(" src/components --include="*.tsx"                               # empty
grep -r "FF90E8\|FFD338" src --include="*.tsx"                                 # empty (use Tailwind aliases)
npm run build
```

---

### 6 — Grok

Generate all source files for **NeoCrafter** — Neo-Brutalist digital goods marketplace. Next.js 14, TypeScript strict, Tailwind CSS. Static export.

Generate in order:
1. `tailwind.config.ts` — extend colors (pink, yellow), boxShadow (hard, hard-lg, hard-sm), fontFamily (Archivo)
2. `src/types/index.ts` — ProductType, CheckoutStep, DigitalProduct, Creator, CartItem, CheckoutState
3. `src/lib/formatPrice.ts` — `formatPrice(cents): string` — `0` → `'Pay what you want'`
4. `src/lib/resolvePrice.ts` — `resolvePrice(product, customPrices): number`
5. `src/lib/data.ts` — PRODUCTS (6 items, 2 PWYW), CREATORS (4), FEATURED_TAGS (8)
6. `src/store/checkout.ts` — useCheckoutStore with Zustand persist
7. `src/app/globals.css` — Archivo, base reset, no border-radius
8. `src/app/layout.tsx` — metadata, SiteNav, Footer
9. `src/components/layout/SiteNav.tsx` — border-b-2, pink button, shadow-hard
10. `src/components/layout/Footer.tsx` — border-t-2, dark bg
11. `src/components/home/ProductCard.tsx` — border-2, shadow-hard, hover translate, formatPrice
12. `src/components/home/ProductGrid.tsx` — 3-col, maps PRODUCTS
13. `src/components/home/HeroSection.tsx` — oversized H1, yellow highlight span, CTA pair
14. `src/components/home/FeaturedCreators.tsx` — yellow bg section, creator chips
15. `src/components/product/PWYWInput.tsx` — 'use client', price entry, minPrice validation
16. `src/components/product/ProductGallery.tsx` — cover image, metadata, tags
17. `src/components/checkout/EmailStep.tsx` — email input, border-2, next step trigger
18. `src/components/checkout/PaymentStep.tsx` — payment placeholder, Stripe integration note
19. `src/components/checkout/SuccessStep.tsx` — confirmation, download link placeholder
20. `src/components/checkout/CheckoutOverlay.tsx` — 'use client', Framer Motion slide-up, step switching
21. `src/app/page.tsx` — HeroSection + ProductGrid + FeaturedCreators
22. `src/app/products/[id]/page.tsx` — static params, ProductGallery + PWYWInput + CheckoutOverlay
23. `src/app/creators/[id]/page.tsx` — creator profile + product list

**Rules for every file:**
- No `rounded-*` except `rounded-none`; no soft shadows; no gradients; no inline hex
- Pink (`bg-pink`) only with black text — never pink text on white
- `formatPrice(product.price)` — never access `product.price` directly in JSX
- PWYW input only renders when `product.price === 0`
- Checkout state via `useCheckoutStore()` — no local useState for step/email/items

---

### 7 — Gemini

**Project:** NeoCrafter — Neo-Brutalist digital goods marketplace. Next.js 14 App Router, TypeScript strict, Tailwind CSS. Static export. Archivo 400/700/900.

**Design system — 4 rules that define everything:**
1. `border-2 border-black` on every card, every button, every input
2. `shadow-hard` (`4px 4px 0px #000`) on every interactive surface
3. `rounded-none` everywhere — no exceptions
4. Hover = `translate-x-[2px] translate-y-[2px]` + `shadow-hard-sm`; Click = full translate + `shadow-none`

**Color rules:**
- `bg-pink` (`#FF90E8`) — always with `text-black` (11.6:1 ✓✓); NEVER `text-white` on pink
- `bg-yellow` (`#FFD338`) — always with `text-black` (10.6:1 ✓✓)
- `bg-white text-black` — default surface
- No soft colors, no muted grays for primary text

**Architecture — 4 layers:**

Layer 1 — Foundation: types, formatPrice, resolvePrice, data, Zustand checkout store.

Layer 2 — Layout: SiteNav (border-b-2, pink CTA), Footer (border-t-2 dark).

Layer 3 — Marketplace:
- `HeroSection` — font-black H1 with yellow highlight span, 2 CTA buttons (pink + white), both `border-2 shadow-hard`
- `ProductCard` — `border-2 border-black shadow-hard rounded-none`; cover area `border-b-2 border-black bg-yellow`; price via `formatPrice(product.price)`
- `ProductGrid` — 3-col grid; `gap-6`; maps PRODUCTS array
- `FeaturedCreators` — `bg-yellow border-y-2 border-black`; creator chips `border-2 border-black shadow-hard-sm bg-white`

Layer 4 — Product + Checkout:
- `ProductGallery` — 2-col layout desktop; cover `border-2 border-black`; metadata right column
- `PWYWInput` — renders only when `product.price === 0`; `$` prefix `border-r-2 border-black bg-yellow`; validates ≥ minPrice
- `CheckoutOverlay` — `motion.div` `y: '100%' → 0`; `border-t-2 border-black shadow-[0_-4px_0_#000]`; 3 steps via Zustand

**Motion:**
- Overlay: `y: '100%' → 0`, `duration: 0.2`, tween — no spring bounce
- ProductCard hover: CSS `transition-all duration-75` — not Framer Motion
- SuccessStep: `motion.div` `scale: 0.95 → 1`, `opacity: 0 → 1`
- All Framer Motion guarded by `useReducedMotion()`

**Functional requirements:**
- `formatPrice(0)` → `'Pay what you want'`; `formatPrice(2900)` → `'$29'`
- `resolvePrice(product, customPrices)` — returns fixed price if `product.price > 0`, else `customPrices[id] ?? product.minPrice`
- Checkout steps transition: email → payment → success via `useCheckoutStore().setStep()`

---

### 8 — Cursor

Build **NeoCrafter** digital goods marketplace. Next.js 14, TypeScript strict, Tailwind CSS. Static export.

**`tailwind.config.ts`:**
```typescript
import type { Config } from 'tailwindcss'
const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: { pink: '#FF90E8', yellow: '#FFD338' },
      boxShadow: {
        'hard':    '4px 4px 0px 0px #000000',
        'hard-lg': '8px 8px 0px 0px #000000',
        'hard-sm': '2px 2px 0px 0px #000000',
      },
      fontFamily: { sans: ['Archivo', 'sans-serif'] },
    },
  },
}
export default config
```

**`src/types/index.ts`:**
```typescript
export type ProductType = 'pdf' | 'video' | 'software' | 'membership'
export type CheckoutStep = 'email' | 'payment' | 'success'

export interface DigitalProduct {
  id: string; creatorId: string; title: string; description: string
  price: number        // cents; 0 = PWYW
  minPrice: number     // minimum cents for PWYW; 0 if fixed
  productType: ProductType; featured: boolean
  tags: string[]; salesCount: number
}
export interface Creator {
  id: string; name: string; bio: string
  twitterHandle: string; totalSales: number
  productCount: number; verified: boolean
}
export interface CartItem {
  productId: string; title: string
  price: number; creatorName: string
}
```

**`src/lib/formatPrice.ts`:**
```typescript
export function formatPrice(cents: number): string {
  if (cents === 0) return 'Pay what you want'
  return `$${(cents / 100).toFixed(0)}`
}
// formatPrice(0) → 'Pay what you want'
// formatPrice(2900) → '$29'
// formatPrice(500) → '$5'
```

**`src/store/checkout.ts`:**
```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, CheckoutStep } from '@/types'

interface CheckoutStore {
  step: CheckoutStep; email: string
  items: CartItem[]; customPrices: Record<string, number>
  addItem: (item: CartItem) => void
  setEmail: (email: string) => void
  setStep: (step: CheckoutStep) => void
  setCustomPrice: (productId: string, price: number) => void
  reset: () => void
}

export const useCheckoutStore = create<CheckoutStore>()(
  persist(
    (set) => ({
      step: 'email', email: '', items: [], customPrices: {},
      addItem: (item) => set((s) => ({ items: [...s.items, item] })),
      setEmail: (email) => set({ email }),
      setStep: (step) => set({ step }),
      setCustomPrice: (id, price) =>
        set((s) => ({ customPrices: { ...s.customPrices, [id]: price } })),
      reset: () => set({ step: 'email', email: '', items: [], customPrices: {} }),
    }),
    { name: 'neocrafter-checkout' }
  )
)
```

**`src/components/home/ProductCard.tsx`:**
```tsx
import type { DigitalProduct } from '@/types'
import { formatPrice } from '@/lib/formatPrice'

interface Props { product: DigitalProduct; creatorName: string }

export default function ProductCard({ product, creatorName }: Props) {
  return (
    <article className="border-2 border-black shadow-hard rounded-none bg-white
      hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-hard-sm
      active:translate-x-[4px] active:translate-y-[4px] active:shadow-none
      transition-all duration-75 cursor-pointer">
      <div className="border-b-2 border-black aspect-video bg-yellow
        flex items-center justify-center">
        <span className="font-black text-2xl uppercase">{product.productType}</span>
      </div>
      <div className="p-4">
        <span className="inline-block border border-black text-xs font-bold
          uppercase tracking-widest px-2 py-0.5">
          {product.productType}
        </span>
        <h3 className="font-bold text-lg leading-tight mt-2">{product.title}</h3>
        <p className="text-sm text-gray-500 mt-1">{creatorName}</p>
        <div className="flex items-center justify-between mt-3 pt-3 border-t-2 border-black">
          <span className="font-black text-xl">{formatPrice(product.price)}</span>
          <button className="border-2 border-black shadow-hard-sm rounded-none
            px-3 py-1 font-bold text-sm bg-pink text-black
            hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none
            transition-all duration-75">
            Buy this
          </button>
        </div>
      </div>
    </article>
  )
}
// border-2 border-black on EVERY element — no exceptions
// bg-pink text-black — NEVER bg-pink text-white (1.8:1 ✗✗)
// formatPrice(product.price) — NEVER product.price directly in JSX
```

**`src/components/checkout/CheckoutOverlay.tsx`:**
```tsx
'use client'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useCheckoutStore } from '@/store/checkout'
import EmailStep from './EmailStep'
import PaymentStep from './PaymentStep'
import SuccessStep from './SuccessStep'

interface Props { isOpen: boolean; onClose: () => void }

export default function CheckoutOverlay({ isOpen, onClose }: Props) {
  const shouldReduce = useReducedMotion()
  const { step } = useCheckoutStore()
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: shouldReduce ? 0 : '100%' }}
          animate={{ y: 0 }}
          exit={{ y: shouldReduce ? 0 : '100%' }}
          transition={{ type: 'tween', duration: 0.2 }}
          className="fixed inset-x-0 bottom-0 z-50 bg-white
            border-t-2 border-black shadow-[0_-4px_0px_0px_#000]
            max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between p-4 border-b-2 border-black">
            <span className="font-black text-lg">Checkout</span>
            <button onClick={onClose}
              className="border-2 border-black shadow-hard-sm rounded-none
                px-3 py-1 font-bold text-sm hover:bg-yellow transition-colors">
              ✕ Close
            </button>
          </div>
          <div className="p-6">
            {step === 'email'   && <EmailStep />}
            {step === 'payment' && <PaymentStep />}
            {step === 'success' && <SuccessStep />}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
```

**Absolute rules:**
```bash
grep -r "rounded-" src/components --include="*.tsx" | grep -v "rounded-none"  # must be empty
grep -r "shadow-md\|shadow-lg\|shadow-xl" src --include="*.tsx"               # must be empty
grep -r "text-white.*bg-pink\|bg-pink.*text-white" src --include="*.tsx"      # must be empty
grep -r "product\.price\b" src/components --include="*.tsx"                   # must be empty (use formatPrice)
tsc --noEmit && npm run build
```
