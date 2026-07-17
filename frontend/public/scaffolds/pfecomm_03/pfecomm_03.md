---
prompt_id: pfecomm_03
sub_category: E-commerce
sub_type: Indian Mass-Market Fashion Marketplace
title: Bold Discount — Indian Multi-Brand Fashion Marketplace
reference_patterns: discount_badge_system, mrp_price_model, brand_name_card, dense_product_grid, wishlist_quick_add
inspiration: ajio.com
quality_score:
status: draft
notes:
---

## Base Prompt

### Section 1 — Role

You are a senior e-commerce product designer with deep experience building high-volume Indian fashion marketplaces. You understand that AJIO-style retail is optimized for discovery and discount: shoppers arrive knowing they want a deal, and the UI must surface deals clearly, quickly, and at scale. You are comfortable with a visual system that is more assertive than premium fashion — discount percentages are prominent, brand names are top-line identifiers, and the "Add to Bag" interaction must be fast. You do not confuse visual restraint with quality. This site should feel energetic and trustworthy, not clinical. The orange CTA is earned brand recognition for millions of users.

---

### Section 2 — Application Overview

This is a multi-brand Indian fashion marketplace with thousands of products across hundreds of brands. Primary categories: Women's (ethnic, western, sportswear), Men's (casual, formal, sportswear), Kids. International brands (Nike, Adidas, H&M, Levi's) alongside Indian brands (Biba, Roadster, W, AJIO own-label). Price range: ₹199–₹8,999. Most products are discounted — MRP + selling price + discount percentage is the standard pricing model.

The store covers five views: Homepage, Product Listing Page (PLP), Product Detail Page (PDP), Cart (side drawer), and Wishlist. Multi-brand architecture affects product cards (brand name as primary identifier) and filtering (filter by brand, category, price range, discount range).

---

### Section 3 — Brand Voice & Mood

The feeling is energetic, accessible, and deal-forward. AJIO does not whisper. It says "Up to 80% off" with confidence, because that is the honest offer. The brand color is orange — warm, approachable, high-energy. It is not aggressive or garish; it is welcoming.

Copy is direct and utility-first. Product names are descriptive: "Slim Fit Stretch Jeans", "Printed Maxi Dress", "Training Mesh Tee". Brand name appears first on every card — the brand IS the primary product identifier in a marketplace. Prices show both MRP (crossed out) and selling price, with the discount percent in red. This is not urgency theatre — it is transparent Indian retail pricing convention.

Visual mood: clean, bright, high information density. Not cluttered — structured density. The grid is the browsing experience.

Vibe word: accessible energy.

---

### Section 4 — Core Features & Functionality

1. **Homepage** — promo banner (orange), top-nav with search, editorial hero, deal sections ("Up to 60% off"), brand logos strip, new arrivals grid, trending categories, footer
2. **Product Listing Page (PLP)** — left filter panel (desktop), bottom sheet filter (mobile), 5-col product grid, filter by brand/category/price/discount, sort, product count
3. **Product Detail Page (PDP)** — image carousel (multiple product images), product info (brand, name, MRP + price + discount, color dots, size selector, add to bag, wishlist, product details, size chart, delivery, returns)
4. **Cart Drawer** — slide-in, line items with brand + name + size, quantity stepper, remove, subtotal, free shipping note, "Proceed to Checkout" button
5. **Wishlist** — heart toggle on product cards, persisted to localStorage, `/wishlist` page showing saved products

---

### Section 5 — Design Specifications

**Visual style:** Clean white canvas. High product density. Discount information prominently displayed. Brand-forward card design.

**Color mode:** Light only. No dark mode.

**Color palette (7 values — complete, no additions):**
- Background: `hsl(0deg 0% 100%)` — pure white
- Surface: `hsl(0deg 0% 97%)` — very light gray for secondary sections and card hover states
- Primary text: `hsl(0deg 0% 14%)` — near-black charcoal
- Muted text: `hsl(0deg 0% 48%)` — medium gray for MRP, metadata, secondary labels
- Border: `hsl(0deg 0% 90%)` — light gray for all dividers and input borders
- Brand: `hsl(18deg 87% 53%)` — AJIO orange — all CTA buttons, active states, brand accents
- Discount: `hsl(354deg 78% 44%)` — discount badge red — exclusively for discount percentage labels

**Why two reds?** Brand orange (`hsl(18deg 87% 53%)`) is warm amber. Discount red (`hsl(354deg 78% 44%)`) is a distinct cool red. If both were the same color, clicking "Add to Bag" and reading "42% off" would create visual ambiguity — user cannot tell at a glance what the orange means. They must be distinct.

**CTA color:** AJIO orange (`hsl(18deg 87% 53%)`). Buttons are orange with white text. This is 5+ years of brand recognition for Indian shoppers.

**Typography:** Inter (Google Fonts), all weights via `next/font/google`. Single font — no display face.
- Promo banner: `11px`, weight 600, letter-spacing `0.06em`, uppercase
- Nav links: `13px`, weight 500
- Search placeholder: `14px`, weight 400
- Brand name (card): `12px`, weight 700, uppercase, letter-spacing `0.04em`
- Product name (card): `13px`, weight 400, line-height 1.4
- Selling price (card): `15px`, weight 700
- MRP (card): `13px`, weight 400, strikethrough, muted
- Discount % (card): `13px`, weight 600, discount-red
- Product name (PDP): `18px`, weight 600
- Price (PDP selling): `22px`, weight 700
- MRP (PDP): `16px`, weight 400, strikethrough, muted
- Button text: `14px`, weight 600
- Filter section label: `13px`, weight 600

**Spacing:** 4pt base unit.
- Promo banner: `40px`
- Nav: `60px` desktop, `52px` mobile
- Card gap: `12px` desktop, `8px` mobile
- Section padding: `72px` desktop, `48px` mobile
- PDP split: `50% / 50%`
- Cart drawer: `380px`

**Border radius:**
- Buttons: `4px` — approachable, mainstream mass-market
- Product image cards: `4px` — slightly rounded, not sharp luxury
- Inputs: `4px`
- Discount badge: `2px` — tight rectangular badge
- Quick-add pill button: `100px` — full pill
- Swatches (color dots): `50%`

**Responsive:** Mobile-first. Breakpoints: `640px`, `900px`, `1280px`. Product grid: 5 col desktop → 3 col tablet → 2 col mobile. Max-width: `1440px`.

**Accessibility:** WCAG AA. All text on white passes 4.5:1. Orange on white: `hsl(18deg 87% 53%)` = approximately 3.1:1 — does NOT pass for text. Orange is for large CTAs and icons only, never for small text. Focus rings: `2px solid hsl(18deg 87% 53%)` offset `2px`. Keyboard navigation on all interactive elements.

**Motion:**
- Cart drawer: `transform translateX(100%) → translateX(0)`, `260ms ease-out`
- Quick-add button: `opacity 0 → 1`, `150ms ease` on card hover
- Wishlist heart: scale `1 → 1.2 → 1`, `200ms` on toggle
- Filter panel (mobile): `transform translateY(100%) → translateY(0)`, `260ms ease-out`
- All motion gates: `prefers-reduced-motion: reduce`

---

### Section 6 — Structure

**Discount model:**
```typescript
// discountPercent is DERIVED, never stored
function getDiscountPercent(mrp: number, price: number): number {
  return Math.round(((mrp - price) / mrp) * 100)
}
// getDiscountPercent(2499, 1499) → 40
// getDiscountPercent(1299, 599) → 54
```

**TypeScript schema:**
```typescript
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'

export type Category =
  | 'tshirts'
  | 'jeans'
  | 'dresses'
  | 'kurtas'
  | 'trousers'
  | 'sportswear'
  | 'skirts'
  | 'shirts'
  | 'activewear'

export interface ColorOption {
  name: string    // "Black", "Navy Blue", "Olive Green"
  swatch: string  // hex — inline style on dot only
  inStock: boolean
  sku: string     // unique SKU for this color variant
}

export interface SizeOption {
  size: Size
  inStock: boolean
}

export interface Product {
  id: string
  slug: string
  brand: string           // "Nike", "H&M", "Roadster" — top-level identifier
  name: string            // product description: "Slim Fit Stretch Jeans"
  category: Category
  mrp: number             // Maximum Retail Price (original Indian retail pricing)
  price: number           // Selling price — always ≤ mrp
  images: string[]        // 3–5 product images (NOT per-colorway — shared across colors)
  colors: ColorOption[]
  sizes: SizeOption[]
  isNew: boolean
  isTrending: boolean
  featured: boolean
}

export interface CartItem {
  productId: string
  brand: string
  name: string
  price: number
  mrp: number
  color: string
  colorSwatch: string
  size: string
  quantity: number
  image: string
}

export interface WishlistItem {
  productId: string
  brand: string
  name: string
  price: number
  mrp: number
  image: string
}
```

**Homepage top to bottom:**
1. **PromoBanner** — `40px`, AJIO orange bg, white text, `11px` uppercase. "Free delivery on orders above ₹599"
2. **TopNav** — sticky, `60px`. Search bar (center, prominent). Logo left. Icons right: Wishlist (heart + count), Account, Bag + count.
3. **Category nav** — secondary sticky row: Women | Men | Kids | Home | Beauty | Brands | Sale
4. **Hero** — full-bleed `70vh`. Bold promotional headline ("The Big Bold Sale"). Orange CTA button.
5. **Deal sections** — 2 horizontal scroll rows: "Up to 60% Off" and "Trending Now". 8 products each.
6. **Brand logos strip** — scrollable row of brand logos.
7. **New Arrivals** — section label + 5-col grid (2 rows).
8. **Footer** — 4 columns.

**Product card spec:**
- Image: `aspect-[3/4]`, `border-radius: 4px`, `object-cover`
- Wishlist heart: top-right corner, `position: absolute`, `z-index: 1`. Filled = in wishlist, outline = not. Animated scale on toggle.
- Discount badge: top-left, `position: absolute`. `{discountPercent}% off` — only shown if `price < mrp`.
- Quick-add button: bottom of image, shown on hover. `opacity: 0` → `opacity: 1` on `.card:hover`. Pill button. "ADD TO BAG".
- Brand name: `12px` weight 700, uppercase
- Product name: `13px` weight 400, 2-line max
- Price row: Selling price (`15px` weight 700) + MRP (`13px` strikethrough muted) + discount % (`13px` weight 600 red)
- Color dots: row of `10px` circles

**PDP structure:**
- Left column (50%): image gallery — large main image + thumbnail strip. Arrow buttons for navigation.
- Right column (50%): brand name (large, `14px` uppercase), product name H1, price block (selling price + MRP + discount), color dots, size selector (button grid), "Add to Bag" button (full-width orange, `48px`), wishlist button (outline, `48px`), accordion: Product Details, Size & Fit, Delivery & Returns.

**Cart Drawer:**
- Orange CTA "Proceed to Checkout" button
- Line items: image (`64px`), brand + name, color + size, quantity stepper, remove
- Free shipping note at ₹599 threshold
- Subtotal in ₹

**Filter panel:**
- Brand (checkboxes, search-within)
- Category checkboxes
- Price range (slider: ₹0 – ₹10,000)
- Discount range (30%+, 40%+, 50%+, 60%+, 70%+)
- Size toggles

---

### Section 7 — Technical Specifications

- **Framework:** Next.js 14 App Router, React 18, TypeScript strict
- **Styling:** CSS Modules + CSS custom properties. No Tailwind.
- **State:** Zustand — two stores: `cartStore` and `wishlistStore`. Both persisted.
- **Components:** Radix UI for accordions and range slider. Custom for everything else.
- **Images:** `next/image`. `aspect-[3/4]` for products. WebP.
- **Icons:** Lucide `size={18}` `strokeWidth={1.5}`. Heart, HeartFilled, ShoppingBag, Search, User, X, ChevronLeft, ChevronRight.
- **Fonts:** Inter via `next/font/google`. Weights 400, 500, 600, 700.
- **Animation:** CSS transitions for quick-add hover. Framer Motion for cart drawer and mobile filter panel.
- **Performance:** Lighthouse 90+ all metrics.

---

### Section 8 — Implementation Steps

1. **Design tokens** — 7 CSS custom properties. No additions.
2. **TopNav + PromoBanner + CartDrawer** — search bar, wishlist count, bag count.
3. **Wishlist store** — separate from cart, persisted to localStorage.
4. **ProductCard** — discount badge, wishlist heart, quick-add hover, MRP pricing.
5. **PDP** — gallery, color dots, size selector, add to bag, wishlist.
6. **Homepage** — hero, deal sections, brand strip.
7. **PLP** — dense grid, filter panel with discount range, price slider.
8. **Footer** — last.

---

### Section 9 — User Experience

The shopper arrives from Instagram, a deal notification, or a friend's recommendation. They are hunting. Their first question is: "What deals are available?" The discount badge on the card answers before they even read the product name. The brand name answers: "Is this a brand I trust?"

On the PDP, the decision is faster than Aritzia or FabIndia — this is a lower-consideration purchase. The price block must be immediately legible: how much am I paying, what is it worth, how good is the deal? The "Add to Bag" button must be orange, prominent, and unmissable.

The wishlist is essential. At this price range and product density, shoppers save dozens of items to come back to. The heart toggle must be instant, visible, and satisfying.

---

### Section 10 — Constraints

- **Discount % is computed, not stored:** `Math.round(((mrp - price) / mrp) * 100)`. Never hardcode it in data.
- **Show discount badge only if `price < mrp`:** If `price === mrp`, no badge and no MRP display.
- **Brand name is the top identifier:** On cards and in cart, brand name precedes product name.
- **No per-colorway image arrays:** Colors are dots. All product images are shared. Unlike Aritzia/FabIndia, AJIO products have one image set.
- **Wishlist is separate from cart:** `wishlistStore` is a Zustand store separate from `cartStore`. Persisted to separate localStorage keys.
- **Orange is for CTAs only in text contexts:** AJIO orange fails WCAG AA contrast at small text sizes. Use only for buttons, large icons, and elements where size is ≥ 18px.
- **`border-radius: 4px` on buttons and images:** Not 0 (luxury), not 2px (craft), not 0. This brand is mainstream.
- **MRP shows only when discounted:** If `price < mrp`, show MRP strikethrough. If `price === mrp`, show only price.
- **Prices in INR:** `₹X,XXX` format, `toLocaleString('en-IN')`, no decimals.
- **Quick-add size picker:** Clicking "Add to Bag" on card without size selected opens a mini size picker, not a page navigation.
- **5 columns on desktop:** Higher product density than premium sites — this is intentional.

---

## Platform Versions

### Category A — Lovable

Build an Indian multi-brand fashion marketplace inspired by AJIO. This is a discount-forward, high-density storefront where users are deal-hunting.

**Design system:**
Background `hsl(0deg 0% 100%)`. Surface `hsl(0deg 0% 97%)`. Text `hsl(0deg 0% 14%)`. Muted `hsl(0deg 0% 48%)`. Border `hsl(0deg 0% 90%)`. Brand orange `hsl(18deg 87% 53%)` (CTAs, active states). Discount red `hsl(354deg 78% 44%)` (discount percentage labels only). Two chromatic values — keep them distinct.

`border-radius: 4px` on buttons and images. `border-radius: 2px` on discount badges. `border-radius: 100px` on quick-add pill. Font: Inter, single font, weights 400/500/600/700.

**Pricing model — critical:**
Every product has `mrp` (original retail price) and `price` (selling price). Discount percent = `Math.round(((mrp - price) / mrp) * 100)` — computed always, never stored. Show discount badge only when `price < mrp`.

**Build these components in order:**

**PromoBanner** — `40px` orange bg, white `11px` uppercase text. Dismiss X.

**TopNav** — sticky `60px`. Prominent search bar center. Logo left. Icons right: Heart (wishlist count), Account, ShoppingBag (cart count).

**ProductCard** — `aspect-[3/4]` image, `4px` radius. Top-left: `{discountPercent}% off` badge (red, only if discounted). Top-right: heart wishlist toggle (fills on save). Bottom: "ADD TO BAG" pill button that appears on hover (`opacity 0 → 1`, `150ms`). Below image: brand name (`12px` weight 700 uppercase), product name (`13px` weight 400), price row (bold selling price + strikethrough MRP + red discount %).

**Two Zustand stores:** `cartStore` (items + bag open/close + subtotal) and `wishlistStore` (productIds + toggle). Both persisted to localStorage.

**CartDrawer** — Framer Motion slide from right, `380px`. Orange "Proceed to Checkout" button.

**PDP** — Image gallery with arrow nav. Right: brand + H1 name + price block (selling + MRP + discount) + color dots + size selector + orange "Add to Bag" (48px) + outline wishlist button.

5-column product grid on desktop. INR pricing throughout (`toLocaleString('en-IN')`).

---

### Category A — ChatGPT Canvas

Build an Indian fashion marketplace. Next.js 14 App Router, TypeScript strict, CSS Modules + CSS custom properties. No Tailwind.

Brand: AJIO-style multi-brand marketplace. Hundreds of brands, discount-forward pricing, dense product grid.

**globals.css tokens:**
```css
:root {
  --color-bg:         hsl(0deg 0% 100%);
  --color-surface:    hsl(0deg 0% 97%);
  --color-text:       hsl(0deg 0% 14%);
  --color-text-muted: hsl(0deg 0% 48%);
  --color-border:     hsl(0deg 0% 90%);
  --color-brand:      hsl(18deg 87% 53%);   /* AJIO orange — CTAs only */
  --color-discount:   hsl(354deg 78% 44%);  /* discount % labels only */
}
```

**Types:**
```typescript
interface ColorOption { name: string; swatch: string; inStock: boolean; sku: string }
interface SizeOption { size: string; inStock: boolean }
interface Product { id: string; slug: string; brand: string; name: string; category: string; mrp: number; price: number; images: string[]; colors: ColorOption[]; sizes: SizeOption[]; isNew: boolean; isTrending: boolean; featured: boolean }
interface CartItem { productId: string; brand: string; name: string; price: number; mrp: number; color: string; colorSwatch: string; size: string; quantity: number; image: string }
interface WishlistItem { productId: string; brand: string; name: string; price: number; mrp: number; image: string }
```

**Pages:**
- `/` — PromoBanner + TopNav + category strip, hero, deal rows, brand strip, new arrivals
- `/products` — 5-col grid, left filter (brand/category/price/discount)
- `/products/[slug]` — image gallery + color dots + size selector + add to bag
- `/wishlist` — grid of saved products
- Cart drawer always in root layout

**Critical interactions:**
- Discount badge: show if `price < mrp`. Percentage = `Math.round(((mrp - price) / mrp) * 100)`
- Wishlist heart: toggle fills/empties, updates `wishlistStore`. Instant, no page navigation.
- Quick-add: hover card → "ADD TO BAG" pill appears. Click → show size picker mini-overlay.
- Two separate Zustand stores: `cartStore` and `wishlistStore`. Both persisted.

**Constraints:**
- `border-radius: 4px` on buttons and images
- `border-radius: 2px` on discount badge
- `border-radius: 100px` on quick-add pill
- Brand name first on all product cards (top of info section, uppercase, weight 700)
- Orange only on CTAs and large icons — never on small text (WCAG contrast)
- MRP only shown when `price < mrp`

---

### Category A — Bolt

Build a React + TypeScript Indian fashion marketplace. Vite, React 18, TypeScript, CSS Modules, Zustand, Framer Motion.

Reference aesthetic: AJIO — pure white, AJIO orange CTAs, bold discount badges, dense 5-column grid.

**CSS custom properties in index.css:**
```css
:root {
  --color-bg:         hsl(0deg 0% 100%);
  --color-surface:    hsl(0deg 0% 97%);
  --color-text:       hsl(0deg 0% 14%);
  --color-text-muted: hsl(0deg 0% 48%);
  --color-border:     hsl(0deg 0% 90%);
  --color-brand:      hsl(18deg 87% 53%);
  --color-discount:   hsl(354deg 78% 44%);
}
```

**Components:**

`PromoBanner` — `40px`, `background: var(--color-brand)`, white `11px` uppercase text.

`ProductCard({ product })` — `aspect-ratio: 3/4`, `border-radius: 4px`. Discount badge: `position: absolute; top: 8px; left: 8px` — visible only if `product.price < product.mrp`. Wishlist heart: `position: absolute; top: 8px; right: 8px` — `useWishlistStore().toggle(product.id)` on click. Quick-add pill: `position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%); opacity: 0` → on `.card:hover { opacity: 1 }`. Brand name: `12px` weight 700 uppercase first. Price row: bold price + strikethrough MRP + red discount %.

Two Zustand stores:
```typescript
// cartStore: items, isOpen, addItem, removeItem, updateQuantity, subtotal, itemCount
// wishlistStore: productIds: Set<string>, toggle(id), isWishlisted(id), items: WishlistItem[]
```

`CartDrawer` — Framer Motion, `260ms ease-out` from right. Orange "Proceed to Checkout" button. Free shipping at ₹599.

`SizeSelector` — all sizes shown, OOS = strikethrough + opacity 0.4. Selected = orange fill.

No Tailwind. INR pricing with `toLocaleString('en-IN')`.

---

### Category A — v0

Create a Next.js 14 App Router Indian fashion marketplace. CSS Modules + CSS custom properties. No Tailwind, no shadcn.

**Design identity:** AJIO — pure white, orange CTAs, bold discount red badges, dense grid. Not a premium editorial store — this is high-energy discount fashion.

**globals.css:**
```css
:root {
  --color-bg:         hsl(0deg 0% 100%);
  --color-surface:    hsl(0deg 0% 97%);
  --color-text:       hsl(0deg 0% 14%);
  --color-text-muted: hsl(0deg 0% 48%);
  --color-border:     hsl(0deg 0% 90%);
  --color-brand:      hsl(18deg 87% 53%);
  --color-discount:   hsl(354deg 78% 44%);
}
```

**Key CSS patterns:**

ProductCard:
```css
.imageWrapper { aspect-ratio: 3/4; overflow: hidden; border-radius: 4px; position: relative; }
.discountBadge { position: absolute; top: 8px; left: 8px; background: var(--color-discount); color: #fff; font-size: 11px; font-weight: 700; padding: 2px 6px; border-radius: 2px; }
.wishlistBtn { position: absolute; top: 8px; right: 8px; background: #fff; border-radius: 50%; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border: 1px solid var(--color-border); cursor: pointer; }
.quickAdd { position: absolute; bottom: 8px; left: 50%; transform: translateX(-50%); opacity: 0; transition: opacity 150ms ease; white-space: nowrap; background: #fff; border: 1px solid var(--color-border); border-radius: 100px; padding: 6px 16px; font-size: 12px; font-weight: 600; cursor: pointer; }
.card:hover .quickAdd { opacity: 1; }
.brandName { font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; }
.sellingPrice { font-size: 15px; font-weight: 700; }
.mrp { font-size: 13px; text-decoration: line-through; color: var(--color-text-muted); }
.discountPct { font-size: 13px; font-weight: 600; color: var(--color-discount); }
```

Add to Bag button:
```css
.addToBagBtn { background: var(--color-brand); color: #fff; border: none; border-radius: 4px; height: 48px; width: 100%; font-size: 14px; font-weight: 600; cursor: pointer; }
.addToBagBtn:hover { background: hsl(18deg 87% 46%); }
```

Discount computed: `const discountPct = Math.round(((mrp - price) / mrp) * 100)` — never stored.

Build: 5-col PLP grid, TopNav with search bar, CartDrawer + WishlistStore, PDP with gallery carousel.

---

### Category B — Claude Artifacts

Build an Indian multi-brand fashion marketplace. Next.js 14 App Router, TypeScript strict, CSS Modules + CSS custom properties, Zustand (cart + wishlist), Framer Motion.

**File structure:**
```
src/
├── app/
│   ├── layout.tsx          # PromoBanner + TopNav + CartDrawer always mounted
│   ├── globals.css         # CSS tokens + base reset
│   ├── page.tsx            # Homepage
│   ├── products/
│   │   ├── page.tsx        # PLP — 5-col grid + filter panel
│   │   └── [slug]/
│   │       └── page.tsx    # PDP
│   └── wishlist/
│       └── page.tsx        # Wishlist page
├── components/
│   ├── layout/
│   │   ├── PromoBanner.tsx
│   │   ├── TopNav.tsx      # With prominent search bar
│   │   └── Footer.tsx
│   ├── cart/
│   │   ├── CartDrawer.tsx
│   │   └── CartItem.tsx
│   └── product/
│       ├── ProductCard.tsx # Discount badge + wishlist heart + quick-add hover
│       ├── ProductGrid.tsx # 5-col
│       ├── FilterPanel.tsx # brand/category/price/discount filters
│       ├── SizeSelector.tsx
│       └── ImageGallery.tsx
├── store/
│   ├── cart.ts             # Zustand cart
│   └── wishlist.ts         # Zustand wishlist — separate store
├── lib/
│   ├── products.ts         # 12 mock products
│   └── utils.ts            # formatINR, getDiscountPercent
└── types/
    └── index.ts
```

**globals.css:**
```css
:root {
  --color-bg:         hsl(0deg 0% 100%);
  --color-surface:    hsl(0deg 0% 97%);
  --color-text:       hsl(0deg 0% 14%);
  --color-text-muted: hsl(0deg 0% 48%);
  --color-border:     hsl(0deg 0% 90%);
  --color-brand:      hsl(18deg 87% 53%);
  --color-discount:   hsl(354deg 78% 44%);
}
```

**lib/utils.ts:**
```typescript
export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`
}
export function getDiscountPercent(mrp: number, price: number): number {
  return Math.round(((mrp - price) / mrp) * 100)
}
```

**store/wishlist.ts:**
```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { WishlistItem } from '@/types'

interface WishlistStore {
  items: WishlistItem[]
  toggle: (item: WishlistItem) => void
  isWishlisted: (productId: string) => boolean
  remove: (productId: string) => void
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      toggle: (item) => set((state) => {
        const exists = state.items.some((i) => i.productId === item.productId)
        return {
          items: exists
            ? state.items.filter((i) => i.productId !== item.productId)
            : [...state.items, item],
        }
      }),
      isWishlisted: (productId) => get().items.some((i) => i.productId === productId),
      remove: (productId) => set((state) => ({
        items: state.items.filter((i) => i.productId !== productId),
      })),
    }),
    { name: 'ajio-wishlist' }
  )
)
```

**ProductCard — key interaction patterns:**
```tsx
'use client'
import { useState } from 'react'
import { Heart } from 'lucide-react'
import { useWishlistStore } from '@/store/wishlist'
import { getDiscountPercent, formatINR } from '@/lib/utils'

export default function ProductCard({ product }: { product: Product }) {
  const { toggle, isWishlisted } = useWishlistStore()
  const discountPct = product.price < product.mrp
    ? getDiscountPercent(product.mrp, product.price)
    : 0
  const wishlisted = isWishlisted(product.id)

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        {discountPct > 0 && (
          <span className={styles.discountBadge}>{discountPct}% off</span>
        )}
        <button
          className={styles.wishlistBtn}
          onClick={(e) => { e.preventDefault(); toggle({ productId: product.id, brand: product.brand, name: product.name, price: product.price, mrp: product.mrp, image: product.images[0] }) }}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={wishlisted}
        >
          <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} className={wishlisted ? styles.heartFilled : styles.heartEmpty} />
        </button>
        <Image src={product.images[0]} alt={product.name} fill className={styles.image} />
        <button className={styles.quickAdd} onClick={(e) => { e.preventDefault(); /* open size picker */ }}>
          ADD TO BAG
        </button>
      </div>
      <div className={styles.info}>
        <p className={styles.brandName}>{product.brand}</p>
        <p className={styles.productName}>{product.name}</p>
        <div className={styles.priceRow}>
          <span className={styles.sellingPrice}>{formatINR(product.price)}</span>
          {discountPct > 0 && (
            <>
              <span className={styles.mrp}>{formatINR(product.mrp)}</span>
              <span className={styles.discountPct}>{discountPct}% off</span>
            </>
          )}
        </div>
      </div>
    </article>
  )
}
```

---

### Category B — Grok

Build an Indian multi-brand fashion marketplace. Next.js 14 App Router, TypeScript strict, CSS Modules, Zustand (two stores). Reference: AJIO.

**What to implement:**

`src/app/globals.css` — 7 CSS tokens. Pure white bg, AJIO orange brand, discount red. Two distinct chromatic values.

`src/types/index.ts` — `ColorOption`, `SizeOption`, `Product`, `CartItem`, `WishlistItem`.

`src/lib/utils.ts` — `formatINR(amount)` and `getDiscountPercent(mrp, price)`. Discount is always computed.

`src/store/cart.ts` — Zustand, persisted to `'ajio-cart'`. Composite key `productId::color::size`.

`src/store/wishlist.ts` — Zustand, persisted to `'ajio-wishlist'`. `toggle(item)`, `isWishlisted(id)`. Separate from cart.

`src/components/layout/PromoBanner.tsx` — `40px` orange bar, dismissible.

`src/components/layout/TopNav.tsx` — sticky `60px`. Center: search input. Right: Heart (wishlist count), User, ShoppingBag (cart count). Logo left.

`src/components/product/ProductCard.tsx` — Key behaviors:
- Discount badge top-left: only if `product.price < product.mrp`. Badge = `{getDiscountPercent(mrp, price)}% off`
- Wishlist heart top-right: `wishlistStore.toggle()` on click, filled if wishlisted
- Quick-add pill bottom: visible on `.card:hover`
- Brand name: uppercase, weight 700, before product name
- Price row: selling price (bold) + MRP (strikethrough, muted) + discount % (red) — MRP only if discounted

`src/components/cart/CartDrawer.tsx` — Framer Motion, `260ms`. Orange "Proceed to Checkout". Free shipping at ₹599.

`src/app/products/[slug]/page.tsx` — Image gallery (arrows), color dots, size selector (orange selected, OOS strikethrough), "Add to Bag" orange full-width, wishlist button outline.

`src/lib/products.ts` — 12 mock products: min 5 brands (Nike, Adidas, H&M, Levi's, Roadster), 4+ categories, most products discounted (price < mrp). Realistic discounts: 30–70%.

5-col PLP grid. INR formatting everywhere. No urgency copy except discount badges (which are factual, not urgency).

---

### Category B — Gemini

Build an Indian multi-brand fashion marketplace. Next.js 14 App Router, TypeScript, CSS Modules + CSS custom properties. No Tailwind.

**Visual system:** AJIO aesthetic — pure white canvas, orange CTAs, discount badges front and center. This is a deal-forward UI, not editorial restraint.

7 color tokens:
- `--color-bg: hsl(0deg 0% 100%)` — pure white
- `--color-surface: hsl(0deg 0% 97%)` — light gray for hover and sections
- `--color-text: hsl(0deg 0% 14%)` — near-black charcoal
- `--color-text-muted: hsl(0deg 0% 48%)` — for MRP, metadata
- `--color-border: hsl(0deg 0% 90%)` — all dividers
- `--color-brand: hsl(18deg 87% 53%)` — AJIO orange (CTAs and active states)
- `--color-discount: hsl(354deg 78% 44%)` — discount badge and percentage text

**Discount data model:**
`Product` has `mrp: number` and `price: number`. Discount percent = `Math.round(((mrp - price) / mrp) * 100)`. Store and show ONLY when `price < mrp`. No separate `discountPercent` field in the data.

**Two Zustand stores:**
- `cartStore` — items (keyed by `productId::color::size`), open/close, subtotal, itemCount
- `wishlistStore` — items, toggle(item), isWishlisted(id). Persisted separately.

**Pages:**

`/` — orange PromoBanner, TopNav (search center), hero, deal sections (horizontal scroll), brand strip, new arrivals 5-col grid.

`/products` — filter panel (brand checkboxes with search-within, category, price range, discount range). 5-col product grid.

`/products/[slug]` — image gallery with arrows. Color dots (not per-colorway editorial). Size selector (orange selected). "Add to Bag" orange `48px`. Wishlist button (outline).

`/wishlist` — grid of wishlisted products. Remove from wishlist. Add to bag from wishlist.

**Product card non-negotiables:**
1. Discount badge shows `{N}% off` — prominent, top-left, only when discounted
2. Wishlist heart top-right — fills when wishlisted, animates on toggle
3. Brand name FIRST, uppercase, before product name
4. Price row: bold selling price, strikethrough MRP, red discount % (MRP row only if discounted)
5. Quick-add "ADD TO BAG" pill appears on card hover

Zustand persisted. Framer Motion drawer. `tsc --noEmit` clean. INR throughout.

---

### Category B — Cursor

In `src/`, implement an Indian multi-brand fashion marketplace. Next.js 14, TypeScript strict, CSS Modules, Zustand already installed.

**Read first:** `src/app/globals.css` (7 tokens), `src/types/index.ts`, `src/store/cart.ts`, `src/store/wishlist.ts`, `src/lib/utils.ts` (`formatINR`, `getDiscountPercent`).

**Implement in this order:**
1. `src/app/globals.css` — 7 tokens, base reset
2. `src/types/index.ts` — `ColorOption`, `SizeOption`, `Product`, `CartItem`, `WishlistItem`
3. `src/lib/utils.ts` — `formatINR` + `getDiscountPercent`
4. `src/store/cart.ts` — Zustand cart, `'ajio-cart'`
5. `src/store/wishlist.ts` — Zustand wishlist, `'ajio-wishlist'`, `toggle` + `isWishlisted`
6. `src/components/layout/PromoBanner.tsx` — orange dismissible banner
7. `src/components/layout/TopNav.tsx` — sticky `60px`, prominent search, wishlist + cart counts
8. `src/app/layout.tsx` — mount PromoBanner + TopNav + CartDrawer
9. `src/components/product/ProductCard.tsx` — discount badge + wishlist heart + quick-add + price row
10. `src/components/cart/CartDrawer.tsx` — Framer Motion, orange checkout button
11. `src/app/page.tsx` — hero + deal rows + brand strip
12. `src/app/products/page.tsx` — 5-col grid + filter panel
13. `src/app/products/[slug]/page.tsx` — gallery + color dots + size selector + add to bag
14. `src/app/wishlist/page.tsx` — wishlist grid

**Discount badge logic:**
```typescript
// Compute, never store
const discountPct = getDiscountPercent(product.mrp, product.price)
// Show badge only if product.price < product.mrp
{product.price < product.mrp && (
  <span className={styles.discountBadge}>{discountPct}% off</span>
)}
// Show MRP only if discounted
{product.price < product.mrp && (
  <span className={styles.mrp}>{formatINR(product.mrp)}</span>
)}
```

**Wishlist heart:**
```typescript
const wishlisted = isWishlisted(product.id)
<button onClick={(e) => { e.preventDefault(); toggle(wishlistItem) }}>
  <Heart fill={wishlisted ? 'currentColor' : 'none'} />
</button>
```

**CSS conventions:**
```css
.button { background: var(--color-brand); border-radius: 4px; } /* Not 0, not 2px */
.imageWrapper { border-radius: 4px; }                           /* Not 0 */
.discountBadge { background: var(--color-discount); border-radius: 2px; }
.quickAdd { border-radius: 100px; }                             /* Pill */
```

12 seed products: brands Nike/Adidas/H&M/Levi's/Roadster/Biba/AJIO, 4+ categories, most discounted 30–70%. Color options (no per-colorway images). INR pricing. No urgency copy beyond factual discount percentages.

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
