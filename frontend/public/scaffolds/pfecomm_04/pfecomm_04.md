---
prompt_id: pfecomm_04
sub_category: E-commerce
sub_type: Indian D2C Youth Fashion Brand
title: Bold Yellow — Indian D2C Graphic Fashion Storefront
reference_patterns: print_style_badges, combo_deal_system, yellow_black_cta, bewakoof_coins, montserrat_youth_type, shadow_card_system
inspiration: bewakoof.com
quality_score:
status: draft
notes: Brand color is yellow (#FFD232), NOT teal. CTA text is black-on-yellow (not white). Montserrat primary font. 8px button radius, 16px card radius.
---

## Base Prompt

### Section 1 — Role

You are a senior e-commerce product designer with deep experience in Indian D2C youth fashion. You understand Bewakoof-style retail: young shoppers (18–28), impulse-friendly price points (₹299–₹999), graphic prints as the core product identity, and a brand personality that is deliberately loud and irreverent. The CTA button is bright yellow with black text — this is not a mistake, this is the brand. You design for speed, discovery, and fun. The 3-for-₹1,199 combo deal is not a gimmick — it is the primary sales mechanism and must be woven into every touchpoint.

---

### Section 2 — Application Overview

This is a D2C graphic fashion brand targeting Indian Gen-Z and millennials. Single brand, own-label products: graphic T-shirts, hoodies, sweatshirts, joggers, shorts, and casual dresses. Products are differentiated by print style (Hyperprint, Minimal, Acid Wash, Typography, Solid) and licensed fan collections (Star Wars, Marvel, Friends, Anime, Gaming). Price range: ₹299–₹1,199. Most T-shirts are combo-eligible ("Any 3 T-shirts for ₹1,199").

The store covers five views: Homepage, Product Listing Page (PLP), Product Detail Page (PDP), Cart Drawer, and a Combo Deal tracker. A Bewakoof Coins loyalty display appears in the nav and cart.

---

### Section 3 — Brand Voice & Mood

The feeling is loud, playful, and unapologetically youth-first. Bewakoof literally means "fool" in Hindi — the brand leans into irreverence. Copy is casual, self-aware, sometimes meme-adjacent. Product names are direct: "Darth Vader Quote Tee", "Friends Logo Hoodie", "Heisenberg Silhouette Tee". The graphic IS the product identity.

Visual mood: high-energy, bold, warm. The yellow brand color reads as energetic and approachable. Cards have shadows — not the flat austerity of premium fashion. Typography is Montserrat — rounded, strong, friendly at all weights. The combo deal banner is never subtle.

Vibe word: graphic energy.

---

### Section 4 — Core Features & Functionality

1. **Homepage** — promo banner (yellow), sticky nav with search + coins display, editorial hero (lifestyle/model photography), combo deal callout strip, print style collection rows (Hyperprints, Typography, Minimal), fan collection strip (Star Wars, Marvel, Anime), new drops grid, footer
2. **PLP** — filter panel (print style, collection, product type, size, price), 4-col product grid, print style badges on cards, combo deal indicator per card
3. **PDP** — product image gallery with print zoom on hover, print style badge, fan collection label if applicable, combo deal progress tracker ("Add 2 more tees for the combo"), color selector (tee base color), size selector, Add to Bag (yellow button, black text), Bewakoof Coins earn display, size chart link, UGC community looks section, product details accordion
4. **Cart Drawer** — line items, combo deal savings row if applicable, Bewakoof Coins earned on this order, subtotal, "Proceed to Checkout" yellow button
5. **Combo Deal Tracker** — a persistent mini-banner showing combo progress: "You have N tees — add X more for ₹1,199"

---

### Section 5 — Design Specifications

**Visual style:** Bright white canvas. Bold yellow CTAs. Rounded cards with subtle shadow. Print photography is product photography.

**Color mode:** Light only. No dark mode.

**Color palette (7 values — complete, no additions):**
- Background: `hsl(0deg 0% 100%)` — pure white
- Surface: `hsl(0deg 0% 98%)` — `#fafafa` — card backgrounds, subtle sections
- Primary text: `hsl(0deg 0% 13%)` — `#212121` — near-black
- Muted text: `hsl(0deg 0% 46%)` — `#757575` — metadata, secondary labels
- Border: `hsl(0deg 0% 88%)` — `#e0e0e0` — all dividers and input borders
- Brand: `hsl(47deg 100% 60%)` — `#FFD232` — Bewakoof yellow — all primary CTAs, active states, highlights
- Deal: `hsl(26deg 100% 50%)` — `#ff6f00` — combo deal orange — exclusively for combo pricing callouts

**CTA text color: BLACK on YELLOW.** `hsl(0deg 0% 13%)` on `hsl(47deg 100% 60%)` = ~14:1 contrast ✓. White text on yellow = ~1.5:1 ✗. Never use white text on a yellow button.

**Combo deal color: ORANGE text on white.** `hsl(26deg 100% 50%)` = `#ff6f00`. Used for combo price display and progress indicators. Distinct from yellow brand color.

**Typography:** Montserrat via `next/font/google`. Weights 400, 500, 600, 700, 800.
- Promo banner: `12px`, weight 700, uppercase, letter-spacing `0.05em`
- Nav links: `13px`, weight 600
- Hero headline: `clamp(32px, 5vw, 64px)`, weight 800, letter-spacing `-0.02em`
- Section label: `12px`, weight 700, letter-spacing `0.08em`, uppercase, muted
- Print style badge: `10px`, weight 700, letter-spacing `0.08em`, uppercase
- Product name (card): `14px`, weight 600
- Product name (PDP): `20px`, weight 700
- Price (card): `15px`, weight 700
- Price (PDP): `24px`, weight 700
- Body text / descriptions: `14px`, weight 400, line-height 1.6
- Button text: `14px`, weight 700, uppercase, letter-spacing `0.04em`
- Combo deal text: `13px`, weight 700, `var(--color-deal)`

**Spacing:** 4pt base unit.
- Promo banner: `40px`
- Nav height: `60px` desktop, `56px` mobile
- Product card gap: `16px`
- Section padding: `72px` desktop, `48px` mobile
- PDP split: `55% / 45%`
- Cart drawer: `400px`

**Border radius:**
- Primary CTA buttons: `8px` — friendly, not sharp, not pill
- Product image cards: `16px` — notably rounded, youth brand aesthetic
- Filter chips / tags: `100px` — full pill
- Print style badge: `4px`
- Inputs: `8px`
- Combo deal banner: `8px`
- Secondary/outline buttons: `8px`

**Card shadow:**
```css
box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
/* Hover: */
box-shadow: 0 4px 16px rgba(0, 0, 0, 0.14);
```
All product cards have a subtle shadow — this is a Bewakoof design signature. No flat cards.

**Responsive:** Mobile-first. Breakpoints: `640px`, `1024px`, `1280px`. Product grid: 4 col desktop → 3 col tablet → 2 col mobile. Max-width: `1536px` (Bewakoof uses wider layouts).

**Accessibility:** WCAG AA. Black on yellow: ~14:1 ✓. Black on white: ~17:1 ✓. Focus rings: `2px solid hsl(47deg 100% 60%)` offset `2px` — yellow focus ring.

**Motion:**
- Cart drawer: `transform translateX(100%) → 0`, `260ms ease-out`
- Card hover: shadow transitions `box-shadow 200ms ease`, image subtle scale `1.02`, `300ms`
- Combo tracker: count updates with a brief scale pop (`transform: scale(1.1) → 1`, `150ms`)
- All motion gates: `prefers-reduced-motion: reduce`

---

### Section 6 — Structure

**Print style taxonomy:**
| Value | Badge label | Description |
|-------|-------------|-------------|
| `hyperprint` | "Hyperprint" | High-detail, full-coverage graphic prints |
| `minimal` | "Minimal" | Clean, simple graphic with negative space |
| `acid-wash` | "Acid Wash" | Washed/distressed dye effect |
| `typography` | "Typography" | Text-forward designs, quote prints |
| `solid` | "Solid" | Plain colours, no print |
| `graphic` | "Graphic" | Bold illustrated prints |
| `licensed` | "Licensed" | Official IP: Star Wars, Marvel, etc. |

**TypeScript schema:**
```typescript
export type PrintStyle =
  | 'hyperprint'
  | 'minimal'
  | 'acid-wash'
  | 'typography'
  | 'solid'
  | 'graphic'
  | 'licensed'

export type ProductType =
  | 'tshirt'
  | 'hoodie'
  | 'sweatshirt'
  | 'joggers'
  | 'shorts'
  | 'dress'
  | 'crop-top'

export interface ColorOption {
  name: string      // "White", "Black", "Navy Blue", "Olive"
  swatch: string    // hex
  images: string[]  // per-color images — same graphic, different base tee color
  inStock: boolean
  sku: string
}

export interface SizeOption {
  size: string       // "XS" | "S" | "M" | "L" | "XL" | "XXL"
  inStock: boolean
}

export interface Product {
  id: string
  slug: string
  name: string              // "Darth Vader Quote Tee"
  printDescription?: string // "The Dark Side Force Quote Print" — describes the graphic
  printStyle: PrintStyle
  collection?: string       // "Star Wars", "Marvel", "Friends", "Anime" — licensed only
  productType: ProductType
  mrp: number
  price: number             // may equal mrp (Bewakoof has some non-discounted products)
  comboEligible: boolean    // true for tshirts, crop-tops — eligible for 3-for-₹1,199
  colors: ColorOption[]     // per-color images — changing tee color changes the look
  sizes: SizeOption[]
  coinsEarned: number       // Bewakoof Coins earned on purchase
  isNew: boolean
  isTrending: boolean
  featured: boolean
}

export interface CartItem {
  productId: string
  name: string
  printStyle: PrintStyle
  price: number
  mrp: number
  color: string
  colorSwatch: string
  size: string
  quantity: number
  image: string
  comboEligible: boolean
}

export const PRINT_LABELS: Record<PrintStyle, string> = {
  'hyperprint':  'Hyperprint',
  'minimal':     'Minimal',
  'acid-wash':   'Acid Wash',
  'typography':  'Typography',
  'solid':       'Solid',
  'graphic':     'Graphic',
  'licensed':    'Licensed',
}

// Combo deal constants
export const COMBO_QTY = 3
export const COMBO_PRICE = 1199  // INR — "3 for ₹1,199"
```

**Combo deal logic:**
```typescript
// src/lib/utils.ts
export function getComboSavings(comboEligibleItems: CartItem[]): number {
  const totalQty = comboEligibleItems.reduce((sum, i) => sum + i.quantity, 0)
  const combosApplied = Math.floor(totalQty / COMBO_QTY)
  if (combosApplied === 0) return 0

  const comboItems = comboEligibleItems.slice(0, combosApplied * COMBO_QTY)
  const regularTotal = comboItems.reduce((sum, i) => sum + i.price, 0)
  const comboTotal = combosApplied * COMBO_PRICE
  return Math.max(0, regularTotal - comboTotal)
}

export function getComboProgress(comboEligibleCount: number): {
  inCurrentCombo: number
  neededForNext: number
} {
  const inCurrentCombo = comboEligibleCount % COMBO_QTY
  const neededForNext = inCurrentCombo === 0 ? COMBO_QTY : COMBO_QTY - inCurrentCombo
  return { inCurrentCombo, neededForNext }
}
```

**Homepage top to bottom:**
1. **PromoBanner** — `40px`, yellow bg, black text, "Free delivery above ₹499 | Earn Bewakoof Coins on every order"
2. **Nav** — sticky, `60px`. Logo left. Search center. Right: Coins icon (user's balance), Account, Bag count.
3. **Category strip** — secondary row: Men | Women | Hoodies | Joggers | Graphic Tees | Licensed | Sale
4. **Hero** — editorial, `70vh`. Lifestyle shot. Yellow CTA "Shop Now" with black text.
5. **Combo Deal strip** — full-width yellow band: "3 T-Shirts for ₹1,199 — Mix & Match any styles"
6. **Print collection rows** — two horizontal rows: "Hyperprints" and "Typography & Quotes"
7. **Fan Collections** — horizontal scroll of collection cards: Star Wars, Marvel, Friends, Anime, Gaming
8. **New Drops** — section label + 4-col grid
9. **Bewakoof Vault** — curated/limited editions section
10. **Footer**

**Product card spec:**
- Image: `aspect-[3/4]`, `border-radius: 16px`, `object-cover`, subtle shadow
- Hover: shadow deepens, image scales `1.02`
- Print style badge: top-left, `4px` radius. Only show if `printStyle !== 'solid'`
- Collection label: if `collection` exists — tiny text above name ("Star Wars")
- Product name: `14px` Montserrat weight 600
- Price row: selling price + (if discounted) strikethrough MRP
- Combo tag: if `comboEligible` — small tag below price: "Combo eligible"
- No per-colorway swatch hover (unlike Aritzia) — instead, color dots below, clicking dot changes image

**PDP structure:**
- Left (55%): image gallery, per-color images, print zoom button (click to see graphic close-up)
- Right (45%): collection label (if licensed), product name (`20px` Montserrat bold), print description, price block, combo progress ("Add 2 more tees for the ₹1,199 combo"), color selector, size selector, "Add to Bag" (full-width, yellow, black text, `48px`, `8px` radius), coins earn display ("Earn 50 coins"), size chart link, details accordion, UGC strip (4 community photos, "Wear it. Click it.")

**Cart Drawer:**
- Line items with print style badge on each
- Combo savings row: "Combo Savings: −₹{savings}" (if applicable)
- Coins earned: "You'll earn {N} Bewakoof Coins"
- Free shipping note: ₹499 threshold
- "Proceed to Checkout" yellow button, black text

---

### Section 7 — Technical Specifications

- **Framework:** Next.js 14 App Router, React 18, TypeScript strict
- **Styling:** CSS Modules + CSS custom properties. No Tailwind.
- **State:** Zustand — `cartStore` with combo-aware subtotal.
- **Components:** Radix UI for accordions. Custom for everything else.
- **Images:** `next/image`. `aspect-[3/4]`. WebP.
- **Icons:** Lucide `size={18}` `strokeWidth={1.5}`. ShoppingBag, Search, User, X, Coins (custom or Star icon for coins), Heart.
- **Fonts:** Montserrat via `next/font/google`. Weights 400, 500, 600, 700, 800.
- **Animation:** Framer Motion for cart drawer. CSS transitions for card hover.
- **Performance:** Lighthouse 90+ all metrics.

---

### Section 8 — Implementation Steps

1. **Design tokens** — 7 CSS custom properties. No additions.
2. **PromoBanner + Nav + CartDrawer** — yellow banner, coins in nav.
3. **Combo deal utils** — `getComboSavings`, `getComboProgress` in `lib/utils.ts`.
4. **ProductCard** — print badge, shadow, combo tag.
5. **PDP** — gallery, print zoom, combo progress, UGC strip.
6. **Homepage** — hero, combo strip, print rows, fan collections.
7. **PLP** — filter panel, print style filter.

---

### Section 9 — User Experience

The shopper is 22, has seen the tee on Instagram. They tap the link, land on the PDP. The graphic is immediately visible — big, clear, high-quality. The combo tracker says "Add 2 more tees for ₹1,199" — suddenly buying one tee for ₹499 feels like leaving money on the table. They open a second tab, browse the Hyperprints, add two more to their bag. The combo savings show in the cart. The coins earn display is a secondary motivator — "I'll get points for this."

The add-to-bag is yellow and unmissable. The checkout button is yellow too. There is no ambiguity about what the next action is.

---

### Section 10 — Constraints

- **Yellow CTAs always have black text.** Never white text on yellow — fails contrast.
- **Combo deal is the pricing hero.** The combo strip appears on homepage, PDP, and cart. It is never hidden or de-emphasized.
- **Print style badge shows for all non-solid products.** `printStyle !== 'solid'` is the condition.
- **Combo price is ₹1,199 for 3 eligible items.** `comboEligible: true` on tshirts, crop-tops only.
- **Cards have `box-shadow`.** This is a visual signature — do not flatten the cards.
- **Border-radius: `16px` on image containers.** Not 0, not 4px. Notable rounding.
- **Border-radius: `8px` on buttons.** Not 0 (luxury), not 4px (mainstream), not pill.
- **Montserrat only** — no Inter, no Cormorant. Single font, all weights.
- **Per-color images on tees.** A white tee version and a black tee version of the same graphic look different — they are different photos.
- **Coins display is informational only.** Show `product.coinsEarned` and cart total coins. No coins redemption logic needed.
- **Prices in INR.** `₹X,XXX` format, `toLocaleString('en-IN')`, no decimals.

---

## Platform Versions

### Category A — Lovable

Build an Indian D2C graphic fashion storefront inspired by Bewakoof.com. Products are graphic tees, hoodies, and casual wear. The signature mechanic is a "3 for ₹1,199" combo deal on T-shirts.

**Design system:**
Background `hsl(0deg 0% 100%)`. Surface `hsl(0deg 0% 98%)`. Text `hsl(0deg 0% 13%)`. Muted `hsl(0deg 0% 46%)`. Border `hsl(0deg 0% 88%)`. Brand `hsl(47deg 100% 60%)` (Bewakoof yellow). Deal `hsl(26deg 100% 50%)` (combo orange). Font: Montserrat, weights 400/500/600/700/800. CTA button: yellow background, **black** text. Never white text on yellow.

`border-radius: 8px` on buttons. `border-radius: 16px` on product image cards. `border-radius: 4px` on badges. All product cards have `box-shadow: 0 2px 8px rgba(0,0,0,0.08)`.

**Print style badge system:** Each product has `printStyle`. If `printStyle !== 'solid'`, show a badge: "HYPERPRINT", "TYPOGRAPHY", "ACID WASH", "MINIMAL", "GRAPHIC", "LICENSED". Licensed products also show their `collection` label (e.g., "Star Wars").

**Combo deal constants:** `COMBO_QTY = 3`, `COMBO_PRICE = 1199`. Items where `comboEligible: true` (tshirts, crop-tops) participate. Show combo progress everywhere: "Add X more tees for ₹1,199 combo".

**Build these components in order:**

**PromoBanner** — `40px` yellow bg, black `12px` uppercase text.

**Nav** — sticky `60px`. Logo left. Search center. Right: Coins (balance from `coinsStore`), Account, ShoppingBag + count.

**Combo Deal Strip** — full-width yellow band (not a banner — a dedicated marketing section). "3 T-Shirts for ₹1,199 — Mix & Match". Always visible on homepage.

**ProductCard** — `aspect-[3/4]` image, `16px` radius, `box-shadow`. Print style badge top-left (if not solid). Collection label if licensed. Name (`14px` Montserrat `weight: 600`). Price. "Combo eligible" tag if applicable.

**CartDrawer** — Framer Motion slide from right, `400px`. Combo savings row when 3+ eligible items. "Proceed to Checkout" yellow button, black text.

**PDP** — Gallery with per-color images. Combo progress bar: "You need X more tees for the ₹1,199 deal". Color selector. Size selector. "Add to Bag" full-width yellow `48px`. Coins earn: "Earn {N} Bewakoof Coins". UGC strip: "Community Looks — 4 photos".

---

### Category A — ChatGPT Canvas

Build an Indian D2C graphic fashion brand storefront. Next.js 14 App Router, TypeScript strict, CSS Modules + CSS custom properties. No Tailwind.

Brand: Bewakoof-style graphic tees. Combo deal: 3 eligible tees for ₹1,199. Print styles: hyperprint, minimal, typography, graphic, acid-wash, solid, licensed.

**globals.css tokens:**
```css
:root {
  --color-bg:         hsl(0deg 0% 100%);
  --color-surface:    hsl(0deg 0% 98%);
  --color-text:       hsl(0deg 0% 13%);
  --color-text-muted: hsl(0deg 0% 46%);
  --color-border:     hsl(0deg 0% 88%);
  --color-brand:      hsl(47deg 100% 60%);   /* Bewakoof yellow — black text ON this */
  --color-deal:       hsl(26deg 100% 50%);   /* combo deal orange */
}
```

**Types:**
```typescript
type PrintStyle = 'hyperprint' | 'minimal' | 'acid-wash' | 'typography' | 'solid' | 'graphic' | 'licensed'
type ProductType = 'tshirt' | 'hoodie' | 'sweatshirt' | 'joggers' | 'shorts' | 'dress' | 'crop-top'
interface ColorOption { name: string; swatch: string; images: string[]; inStock: boolean; sku: string }
interface Product { id: string; slug: string; name: string; printDescription?: string; printStyle: PrintStyle; collection?: string; productType: ProductType; mrp: number; price: number; comboEligible: boolean; colors: ColorOption[]; sizes: { size: string; inStock: boolean }[]; coinsEarned: number; isNew: boolean; isTrending: boolean; featured: boolean }
```

**Combo constants and utils:**
```typescript
export const COMBO_QTY = 3
export const COMBO_PRICE = 1199
export function getComboSavings(eligibleItems: CartItem[]): number { /* compute */ }
export function getComboProgress(eligibleCount: number): { neededForNext: number }
```

**Pages:** `/` (hero, combo strip, print rows), `/products` (4-col grid + filter by print style/collection), `/products/[slug]` (gallery + combo progress + add to bag)

**Critical rules:**
- `border-radius: 8px` on buttons — not 0, not 4px
- `border-radius: 16px` on image cards
- `box-shadow` on all product cards
- Yellow buttons: BLACK text always
- Print badge: if `printStyle !== 'solid'`
- Combo progress: on PDP when `product.comboEligible`
- INR pricing throughout

---

### Category A — Bolt

Build React + TypeScript graphic fashion D2C storefront. Vite, React 18, TypeScript, CSS Modules, Zustand.

Reference: Bewakoof — bright yellow brand color (black text), graphic print-forward cards with shadow, combo deal mechanic.

**CSS custom properties:**
```css
:root {
  --color-bg: hsl(0deg 0% 100%);
  --color-surface: hsl(0deg 0% 98%);
  --color-text: hsl(0deg 0% 13%);
  --color-text-muted: hsl(0deg 0% 46%);
  --color-border: hsl(0deg 0% 88%);
  --color-brand: hsl(47deg 100% 60%);
  --color-deal: hsl(26deg 100% 50%);
}
```

**Components:**

`PromoBanner` — `40px`, `background: var(--color-brand)`, **black** `12px` uppercase text.

`ProductCard({ product })` — `aspect-ratio: 3/4`, `border-radius: 16px`, `box-shadow: 0 2px 8px rgba(0,0,0,0.08)`. Hover: `box-shadow: 0 4px 16px rgba(0,0,0,0.14)` + `scale(1.02)`. Print badge: if `printStyle !== 'solid'` → `{PRINT_LABELS[printStyle]}`. Collection label if `product.collection`. Combo tag if `product.comboEligible`. Name `14px` Montserrat `weight: 600`. Price in ₹.

`ComboStrip` — full-width yellow band. "3 T-Shirts for ₹1,199 — Mix & Match any styles". Shows on homepage and above PDP info panel for combo-eligible products.

`ComboProgress({ eligibleCount })` — "You have {N} combo tees. Add {X} more for ₹1,199 deal." Progress dots or bar. Shows in cart when `eligibleCount >= 1`.

`CartDrawer` — Framer Motion. Shows combo savings row. Shows Bewakoof Coins to be earned. Yellow "Proceed to Checkout" with black text. ₹499 free shipping.

No Tailwind. Montserrat for all text. Yellow = black-text-only.

---

### Category A — v0

Create a Next.js 14 App Router D2C graphic fashion storefront. CSS Modules + CSS custom properties. No Tailwind, no shadcn.

**Design identity:** Bewakoof — bright yellow CTAs with black text, rounded cards with shadow, print style badges, combo deal as primary sales mechanic.

**globals.css:**
```css
:root {
  --color-bg:         hsl(0deg 0% 100%);
  --color-surface:    hsl(0deg 0% 98%);
  --color-text:       hsl(0deg 0% 13%);
  --color-text-muted: hsl(0deg 0% 46%);
  --color-border:     hsl(0deg 0% 88%);
  --color-brand:      hsl(47deg 100% 60%);
  --color-deal:       hsl(26deg 100% 50%);
}
```

**Key CSS patterns:**

Product card:
```css
.card { border-radius: 16px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); overflow: hidden; transition: box-shadow 200ms ease; }
.card:hover { box-shadow: 0 4px 16px rgba(0,0,0,0.14); }
.imageWrapper { aspect-ratio: 3/4; position: relative; overflow: hidden; }
.image { object-fit: cover; transition: transform 300ms ease; }
.card:hover .image { transform: scale(1.02); }
.printBadge { background: var(--color-text); color: #fff; font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 3px 7px; border-radius: 4px; position: absolute; top: 10px; left: 10px; }
.comboTag { color: var(--color-deal); font-size: 11px; font-weight: 700; }
```

CTA button (yellow, black text):
```css
.btn { background: var(--color-brand); color: var(--color-text); border: none; border-radius: 8px; height: 48px; width: 100%; font-family: var(--font-montserrat); font-size: 14px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; cursor: pointer; }
.btn:hover { background: hsl(47deg 100% 54%); }
/* DO NOT use white text on yellow — fails WCAG AA */
```

Combo progress:
```css
.comboProgress { padding: 12px 16px; background: hsl(47deg 100% 95%); border: 1px solid var(--color-brand); border-radius: 8px; font-size: 13px; font-weight: 700; color: var(--color-deal); }
```

Build: src/app/page.tsx, src/app/products/page.tsx, src/app/products/[slug]/page.tsx. Zustand cart. Print badge + combo tracker throughout.

---

### Category B — Claude Artifacts

Build a D2C graphic fashion storefront. Next.js 14 App Router, TypeScript strict, CSS Modules + CSS custom properties, Zustand (cart), Framer Motion.

**File structure:**
```
src/
├── app/
│   ├── layout.tsx          # PromoBanner + Nav + CartDrawer
│   ├── globals.css         # 7 CSS tokens
│   ├── page.tsx            # Homepage
│   ├── products/
│   │   ├── page.tsx        # PLP — 4-col + print style filter
│   │   └── [slug]/
│   │       └── page.tsx    # PDP
├── components/
│   ├── layout/
│   │   ├── PromoBanner.tsx # Yellow bar, black text
│   │   ├── Nav.tsx         # Sticky 60px, search, coins, cart
│   │   ├── ComboStrip.tsx  # Homepage combo deal section
│   │   └── Footer.tsx
│   ├── cart/
│   │   ├── CartDrawer.tsx  # Yellow checkout, combo savings, coins
│   │   └── CartItem.tsx
│   └── product/
│       ├── ProductCard.tsx # Shadow + print badge + combo tag
│       ├── ProductGrid.tsx
│       ├── FilterPanel.tsx # Print style + collection + type + size
│       ├── ColorSelector.tsx
│       ├── SizeSelector.tsx
│       ├── ImageGallery.tsx
│       └── ComboProgress.tsx  # PDP + cart combo tracker
├── store/
│   └── cart.ts             # Zustand with combo-aware computed values
├── lib/
│   ├── products.ts         # 12 mock products
│   └── utils.ts            # formatINR, getComboSavings, getComboProgress
└── types/
    └── index.ts            # includes PRINT_LABELS, COMBO_QTY, COMBO_PRICE
```

**globals.css:**
```css
:root {
  --color-bg:         hsl(0deg 0% 100%);
  --color-surface:    hsl(0deg 0% 98%);
  --color-text:       hsl(0deg 0% 13%);
  --color-text-muted: hsl(0deg 0% 46%);
  --color-border:     hsl(0deg 0% 88%);
  --color-brand:      hsl(47deg 100% 60%);
  --color-deal:       hsl(26deg 100% 50%);
}
```

**Combo utils in lib/utils.ts:**
```typescript
export const COMBO_QTY = 3
export const COMBO_PRICE = 1199

export function getComboSavings(items: CartItem[]): number {
  const eligible = items.filter(i => i.comboEligible)
  const totalQty = eligible.reduce((sum, i) => sum + i.quantity, 0)
  const combosApplied = Math.floor(totalQty / COMBO_QTY)
  if (combosApplied === 0) return 0
  const comboItemsTotal = eligible
    .slice(0, combosApplied * COMBO_QTY)
    .reduce((sum, i) => sum + i.price, 0)
  return Math.max(0, comboItemsTotal - combosApplied * COMBO_PRICE)
}

export function getComboProgress(items: CartItem[]): { count: number; neededForNext: number } {
  const count = items.filter(i => i.comboEligible).reduce((s, i) => s + i.quantity, 0)
  const neededForNext = count % COMBO_QTY === 0 ? COMBO_QTY : COMBO_QTY - (count % COMBO_QTY)
  return { count, neededForNext }
}
```

**ProductCard key patterns:**
```tsx
// Print badge — only if not solid
{product.printStyle !== 'solid' && (
  <span className={styles.printBadge}>{PRINT_LABELS[product.printStyle]}</span>
)}
// Collection label — only if licensed
{product.collection && (
  <span className={styles.collectionLabel}>{product.collection}</span>
)}
// Combo tag
{product.comboEligible && (
  <span className={styles.comboTag}>Combo eligible</span>
)}
```

**CTA button convention:**
```tsx
// CORRECT — black text on yellow
<button style={{ background: 'var(--color-brand)', color: 'var(--color-text)' }}>
  Add to Bag
</button>

// WRONG — white text on yellow (contrast failure)
<button style={{ background: 'var(--color-brand)', color: '#fff' }}>
```

12 seed products: mix of tshirts (combo-eligible), hoodies, sweatshirts. Print styles: 4+ types. Licensed: Star Wars, Marvel, Friends. Originals. Prices ₹299–₹999. `coinsEarned` on each product.

---

### Category B — Grok

Build a D2C graphic fashion storefront. Next.js 14 App Router, TypeScript strict, CSS Modules, Zustand. Reference: Bewakoof.

**What to implement:**

`src/app/globals.css` — 7 tokens. Bewakoof yellow brand, combo orange deal.

`src/types/index.ts` — `PrintStyle` (7 values), `ProductType` (7 values), `ColorOption` (with `images: string[]`), `SizeOption`, `Product` (with `printStyle`, `collection?`, `comboEligible`, `coinsEarned`), `CartItem` (with `comboEligible`), `PRINT_LABELS` record, `COMBO_QTY = 3`, `COMBO_PRICE = 1199`.

`src/lib/utils.ts` — `formatINR`, `getComboSavings`, `getComboProgress`.

`src/store/cart.ts` — Zustand, persisted `'bewakoof-cart'`. Items keyed by `productId::color::size`. `comboSavings` as computed getter using `getComboSavings`.

`src/components/layout/PromoBanner.tsx` — `40px`, yellow bg, **black** text.

`src/components/layout/Nav.tsx` — Sticky `60px`. Center search. Right: coins display (number), Account, ShoppingBag + count.

`src/components/product/ProductCard.tsx` — `16px` radius, `box-shadow`, print badge (if not solid), collection label (if licensed), combo tag, yellow CTA convention.

`src/components/product/ComboProgress.tsx` — Shows: "You have N combo tees. Add X more for ₹1,199." Yellow `border` border-radius `8px` callout box.

`src/components/cart/CartDrawer.tsx` — Combo savings row, coins earned line, yellow checkout button (black text), ₹499 free shipping.

`src/app/products/[slug]/page.tsx` — Gallery, combo progress callout, color selector (per-color images), size selector, Add to Bag yellow button, coins earn display.

`src/lib/products.ts` — 12 products covering 4+ print styles, 3+ licensed collections, 3+ product types.

Border-radius `8px` buttons, `16px` images. Shadow on all product cards. Montserrat only. INR formatting.

---

### Category B — Gemini

Build a D2C graphic fashion storefront. Next.js 14 App Router, TypeScript, CSS Modules + CSS custom properties. No Tailwind.

**Visual system:** Bewakoof — bright yellow CTAs with black text, rounded cards with shadow, print style as product identity, combo deal as primary sales mechanic.

7 color tokens:
- `--color-bg: hsl(0deg 0% 100%)`
- `--color-surface: hsl(0deg 0% 98%)`
- `--color-text: hsl(0deg 0% 13%)`
- `--color-text-muted: hsl(0deg 0% 46%)`
- `--color-border: hsl(0deg 0% 88%)`
- `--color-brand: hsl(47deg 100% 60%)` — Bewakoof yellow. CTA text: black. Never white.
- `--color-deal: hsl(26deg 100% 50%)` — combo deal orange. Only for combo pricing callouts.

**Print style system:**
`PrintStyle` = 7 values. `PRINT_LABELS` record maps to display names. Badge shown on card when `printStyle !== 'solid'`. Licensed products additionally show `collection` (Star Wars, Marvel, etc.).

**Combo deal system:**
`COMBO_QTY = 3`, `COMBO_PRICE = 1199`. Items where `comboEligible === true` participate. `getComboSavings(cartItems)` computes discount. `getComboProgress(items)` returns `{ count, neededForNext }`. Show progress on PDP (if product is combo-eligible) and in cart (if any combo items present).

**Per-color images:**
`ColorOption.images: string[]` — same graphic on different tee colors (white base vs black base). Selecting a color dot updates the gallery to that color's images.

**Pages:**

`/` — Yellow PromoBanner, sticky Nav, hero, ComboStrip ("3 for ₹1,199"), print rows, fan collections, new drops grid.

`/products` — Print style filter, collection filter, product type filter, size. 4-col grid. Cards with print badges.

`/products/[slug]` — Gallery (per-color images). ComboProgress if `product.comboEligible`. Color selector → gallery updates. Size selector (orange selected fill). "Add to Bag" yellow button, black text, `48px`, `8px` radius. Coins earn display. UGC strip.

**Three rules:**
1. Yellow buttons = black text. Always.
2. Cards = `16px` radius + `box-shadow`. Always.
3. Combo deal = visible at homepage, PDP (if eligible), cart. Never hidden.

Zustand cart, persisted. Framer Motion drawer. `tsc --noEmit` clean. INR throughout.

---

### Category B — Cursor

In `src/`, implement a D2C graphic fashion storefront. Next.js 14, TypeScript strict, CSS Modules, Zustand.

**Read first:** `src/app/globals.css` (7 tokens), `src/types/index.ts` (`PrintStyle`, `PRINT_LABELS`, `COMBO_QTY`, `COMBO_PRICE`), `src/lib/utils.ts` (`formatINR`, `getComboSavings`, `getComboProgress`), `src/store/cart.ts`.

**Implement in order:**
1. `src/app/globals.css` — 7 tokens, base reset, Montserrat body
2. `src/types/index.ts` — all types, `PRINT_LABELS`, combo constants
3. `src/lib/utils.ts` — `formatINR` + combo functions
4. `src/store/cart.ts` — Zustand, `'bewakoof-cart'`, `comboSavings` getter
5. `src/components/layout/PromoBanner.tsx` — yellow bg, black text
6. `src/components/layout/Nav.tsx` — sticky `60px`, search, coins, cart count
7. `src/app/layout.tsx` — PromoBanner + Nav + CartDrawer
8. `src/components/product/ProductCard.tsx` — shadow + print badge + combo tag
9. `src/components/product/ComboProgress.tsx` — combo tracker component
10. `src/components/cart/CartDrawer.tsx` — combo savings row, yellow checkout (black text)
11. `src/app/page.tsx` — hero + ComboStrip + print rows
12. `src/app/products/page.tsx` — filter + 4-col grid
13. `src/app/products/[slug]/page.tsx` — gallery + ComboProgress + add to bag

**CTA button — yellow, black text:**
```tsx
<button className={styles.addToBag}>Add to Bag</button>
```
```css
.addToBag {
  background: var(--color-brand);
  color: var(--color-text);  /* BLACK — never white on yellow */
  border-radius: 8px;
  height: 48px;
  font-weight: 700;
  text-transform: uppercase;
}
```

**Print badge:**
```tsx
{product.printStyle !== 'solid' && (
  <span className={styles.printBadge}>{PRINT_LABELS[product.printStyle]}</span>
)}
```

**Combo progress on PDP:**
```tsx
const { count, neededForNext } = getComboProgress(cartItems)
{product.comboEligible && (
  <div className={styles.comboBox}>
    {count >= COMBO_QTY
      ? `Combo active! ${count} tees @ ₹${COMBO_PRICE}`
      : `Add ${neededForNext} more tee${neededForNext > 1 ? 's' : ''} for ₹${formatINR(COMBO_PRICE)} combo`
    }
  </div>
)}
```

**CSS conventions:**
```css
.imageWrapper { border-radius: 16px; }   /* Cards: always 16px */
.button { border-radius: 8px; }          /* Buttons: always 8px */
.card { box-shadow: 0 2px 8px rgba(0,0,0,0.08); }  /* Always shadow */
.chip { border-radius: 100px; }          /* Filter chips: full pill */
```

12 products: tshirts (combo-eligible), hoodies, sweatshirts. Print styles: hyperprint, typography, minimal, graphic, licensed. Collections: Star Wars, Marvel, Friends. Prices ₹299–₹999.

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
