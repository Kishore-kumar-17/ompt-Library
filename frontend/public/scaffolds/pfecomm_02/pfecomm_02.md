---
prompt_id: pfecomm_02
sub_category: E-commerce
sub_type: Indian Heritage Fashion Storefront
title: Warm Craft — Indian Heritage Fashion E-Commerce
reference_patterns: craft_metadata_cards, warm_ivory_system, natural_dye_vocabulary, dual_font_heritage, maroon_cta_system
inspiration: fabindia.com
quality_score:
status: draft
notes:
---

## Base Prompt

### Section 1 — Role

You are a senior e-commerce product designer with deep experience building storefronts for Indian heritage craft brands. You understand that FabIndia-style retail is not luxury minimalism — it is warm, artisan-forward, and educational. The craft technique is as important as the product. The color name "Indigo" carries cultural meaning that "Blue" does not. Your design choices reflect the handmade origin of the products: warm surfaces, warm typography, a brand color that references natural dye traditions rather than corporate identity. The photography shows artisan hands, natural textiles, and living color — the UI must match that warmth without ornamentation.

---

### Section 2 — Application Overview

This is an Indian heritage fashion e-commerce storefront for a craft-first multi-category retailer. Products are handcrafted by artisan communities across India: hand-block printed, handloom woven, natural dyed, embroidered. Primary category: women's ethnic wear (kurtas, sarees, kurta sets, dupattas). Secondary: men's ethnic wear, home textiles. Price range: ₹600–₹12,000.

The store covers five views: Homepage, Product Listing Page (PLP), Product Detail Page (PDP), Cart Drawer, and Search. The craft technique architecture affects product cards (craft badge), filtering (filter by technique), and product metadata.

---

### Section 3 — Brand Voice & Mood

The feeling is warm, celebratory of Indian craft traditions, and quietly educational. This brand does not need to sell heritage — it has it. Product copy names the technique, the fabric, the artisan region without lectures. "Hand-block printed on handloom cotton in Bagru, Rajasthan." That's the entire story.

Copy is precise and honest. Product names name the technique and material: "Indigo Hand-Block Print Cotton Kurta", "Ajrakh Print Linen Kurta Set", "Chikankari Embroidery Tunic". Prices in ₹, no decimals. No urgency language. No percentage-off banners. No "selling fast" copy.

Visual mood: warm, craft-forward, grounded. The white space is generous but warm — ivory, not clinical. Typography mixes a classical serif for display (Cormorant Garamond) with a clean sans-serif for UI text (Inter). The combination feels like a beautiful craft catalogue.

Vibe word: artisan warmth.

---

### Section 4 — Core Features & Functionality

1. **Homepage** — promo banner (maroon bg), mega-nav, editorial hero (artisan + model, full-bleed), craft collection strips ("The Indigo Edit", "Handloom Essentials"), new arrivals grid, "The Artisan Story" editorial strip, footer
2. **Product Listing Page (PLP)** — left filter panel (desktop), bottom sheet filter (mobile), product grid, color swatch hover changes product image, craft technique filter, fabric filter, size filter, sort
3. **Product Detail Page (PDP)** — image gallery (left, with thumbnail strip), product info right (craft badge, name H1, fabric + craft metadata, price, color selector with natural dye names, size selector, add to cart, product details accordion, care accordion, delivery accordion)
4. **Cart Drawer** — slide-in from right, semi-transparent backdrop, line items with colorway image + craft badge, quantity stepper, remove, subtotal, checkout CTA, free shipping threshold note
5. **Search** — search input activates full-screen overlay, live suggestions from product names

---

### Section 5 — Design Specifications

**Visual style:** Warm ivory canvas. Craft photography drives all visual interest. Zero decorative motifs on the UI itself — the products carry the decoration.

**Color mode:** Light only. No dark mode.

**Color palette (7 values — complete, no additions):**
- Background: `hsl(36deg 25% 97%)` — warm ivory (not pure white — the warmth is intentional)
- Warm surface: `hsl(36deg 25% 93%)` — deeper warm beige for secondary sections and cards
- Primary text: `hsl(0deg 0% 10%)` — near-black
- Muted text: `hsl(20deg 6% 45%)` — warm medium gray (slightly warm cast, not neutral)
- Border: `hsl(36deg 15% 85%)` — warm light border (warm cast matches bg)
- Maroon: `hsl(348deg 68% 30%)` — deep FabIndia maroon — CTA buttons, promo banner, active states
- Sale: `hsl(25deg 88% 50%)` — saffron-orange — the ONLY high-saturation color, used exclusively for sale pricing

**CTA color:** Deep maroon (`hsl(348deg 68% 30%)`). Buttons are maroon with white text. This is the brand color. It references Indian textile traditions (madder dye, sindoor, natural vermilion). Unlike Aritzia's black-neutral CTA, FabIndia's CTA carries brand identity.

**Typography:**
- Display font: Cormorant Garamond via `next/font/google` — used ONLY for hero headings, section headlines, campaign text. Weights: 400, 500, 600. This is the craft catalogue serif.
- UI font: Inter via `next/font/google` — all navigation, product cards, body text, buttons, metadata. Weights: 400, 500, 600.
- Promo banner: `11px` Inter, weight 500, letter-spacing `0.08em`, uppercase
- Nav links: `13px` Inter, weight 400, letter-spacing `0.01em`
- Hero headline: `clamp(32px, 5vw, 72px)` Cormorant Garamond, weight 400, letter-spacing `-0.01em`
- Section label: `11px` Inter, weight 600, letter-spacing `0.1em`, uppercase, muted
- Collection name: `clamp(20px, 3vw, 36px)` Cormorant Garamond, weight 500
- Product name (card): `14px` Inter, weight 400, letter-spacing `0`
- Product name (PDP): `24px` Cormorant Garamond, weight 500, letter-spacing `-0.01em`
- Craft badge: `10px` Inter, weight 500, letter-spacing `0.08em`, uppercase
- Price: `14px` Inter, weight 400 (regular) / weight 500 (sale)
- Body (descriptions): `14px` Inter, weight 400, line-height 1.7
- Button text: `13px` Inter, weight 500, letter-spacing `0.03em`

**Spacing:** 4pt base unit.
- Promo banner height: `40px`
- Nav height: `64px` desktop, `56px` mobile
- Product card gap: `16px` desktop, `8px` mobile
- Section vertical spacing: `88px` desktop, `56px` mobile
- PDP image / info split: `55% / 45%`
- Cart drawer width: `400px`

**Border radius:**
- Product image cards: `0px` — handcraft photography should not have rounded corners
- Buttons: `2px` — slightly softer than Aritzia; reflects the organic, handmade quality
- Inputs: `2px`
- Swatches: `50%` — circles only for color swatches

**Responsive:** Mobile-first. Breakpoints: `640px`, `900px`, `1280px`. Product grid: 4 col desktop → 3 col tablet → 2 col mobile. Max-width: `1440px`.

**Accessibility:** WCAG AA. All text on ivory must pass 4.5:1. Maroon on white: `hsl(348deg 68% 30%)` = approximately 7.2:1 on `hsl(36deg 25% 97%)` ✓. Focus rings: `2px solid hsl(348deg 68% 30%)` offset `2px`. Keyboard navigation on all interactive elements.

**Motion:**
- Cart drawer: `transform translateX(100%) → translateX(0)`, `280ms ease-out`
- Swatch hover → image change: instant (no CSS transition — same as Aritzia)
- Filter panel (mobile): `transform translateY(100%) → translateY(0)`, `260ms ease-out`
- Promo banner dismiss: `max-height 0`, `200ms ease-out`
- All motion gates: `prefers-reduced-motion: reduce`

---

### Section 6 — Structure

**Craft technique taxonomy:**
| Technique | Badge label | Description |
|-----------|-------------|-------------|
| `hand-block-print` | "Hand-Block Print" | Wooden block pressed by hand into natural dye |
| `handloom` | "Handloom" | Woven on a manual loom by a weaver |
| `natural-dye` | "Natural Dye" | Dyed with plant-based or mineral dyes |
| `embroidery` | "Hand Embroidery" | Needle-and-thread craft by hand |
| `ajrakh` | "Ajrakh Print" | Intricate resist-print from Kutch/Sindh tradition |
| `ikat` | "Ikat Weave" | Dye-resist weaving technique |
| `chikankari` | "Chikankari" | Fine Lucknowi embroidery tradition |
| `none` | — | No craft badge |

**TypeScript schema:**
```typescript
export type CraftTechnique =
  | 'hand-block-print'
  | 'handloom'
  | 'natural-dye'
  | 'embroidery'
  | 'ajrakh'
  | 'ikat'
  | 'chikankari'
  | 'none'

export type Fabric =
  | 'cotton'
  | 'silk'
  | 'linen'
  | 'khadi'
  | 'chanderi'
  | 'georgette'
  | 'wool'

export type Category =
  | 'kurtas'
  | 'sarees'
  | 'kurta-sets'
  | 'dupattas'
  | 'salwar-suits'
  | 'tops'
  | 'bottoms'
  | 'home'

export interface SizeVariant {
  size: string       // "XS" | "S" | "M" | "L" | "XL" | "XXL"
  inStock: boolean
  sku: string
}

export interface ColorVariant {
  name: string       // Natural dye vocabulary: "Indigo", "Madder Red", "Turmeric", "Natural", "Mud Brown"
  swatch: string     // hex value — ONLY used as inline style on swatch, never in CSS
  images: string[]   // 3–4 image URLs for this colorway
  inStock: boolean
  sizes: SizeVariant[]
}

export interface Product {
  id: string
  slug: string
  name: string
  category: Category
  craftTechnique: CraftTechnique
  fabric: Fabric
  origin?: string              // "Bagru, Rajasthan" | "Kutch, Gujarat" | "Lucknow, UP"
  description: string          // Names technique + material + fit. 2–3 sentences.
  price: number                // INR, no decimals
  salePrice?: number           // present only if currently on sale
  colors: ColorVariant[]       // minimum 2 colors per product
  isNew: boolean
  isSale: boolean
  featured: boolean
}

export interface CartItem {
  productId: string
  name: string
  craftTechnique: CraftTechnique
  price: number                // effective price (salePrice if on sale)
  originalPrice?: number
  color: string                // colorway name
  colorSwatch: string          // hex
  size: string
  quantity: number
  image: string                // first image of selected colorway
}
```

**Homepage top to bottom:**
1. **PromoBanner** — `40px`, maroon bg (`var(--color-maroon)`), white text, `11px` uppercase centered. Dismiss X on right. Message: "Free shipping on orders over ₹999 · Handcrafted in India"
2. **MegaNav** — sticky, `64px` height, `1px` bottom border. Logo left (wordmark in Cormorant Garamond). Center: nav categories (Women, Men, Kids, Home & Living, Food, Sale). Right: Search icon, Account icon, Cart icon + count.
3. **Hero** — full-bleed, `90vh` height. Artisan-shot editorial image. Minimal text overlay: collection name in Cormorant Garamond, single CTA link.
4. **Craft collection strips** — 2 horizontal editorial strips, each featuring one craft technique. "The Indigo Edit" and "Handloom Essentials". Large image left, collection name + product grid right.
5. **New arrivals** — Section label "NEW IN" (`11px` uppercase muted), 4-col product grid.
6. **Artisan Story strip** — full-width editorial image, centered text: "Crafted by 55,000+ artisans across India". No CTA — this is a values statement, not a conversion moment.
7. **Footer** — 4 columns: Shop, Craft, Company, Follow Us. `13px` links. Warm border top.

**Product card spec:**
- Image: `aspect-[3/4]`, no border-radius, `object-cover`
- Primary image: first image in `colors[activeColorIdx].images`
- Color swatches: row of `12px` circles, `4px` gap. Hovering changes card image — **instant, no transition**
- Craft badge: if `craftTechnique !== 'none'` — `10px uppercase` above product name, warm muted color
- Product name: `14px` Inter weight 400, 2-line max
- Fabric label: `12px` Inter muted, e.g., "Cotton · Natural Dye"
- Price: `14px`. If sale: saffron-orange sale price + strikethrough original

**PDP structure:**
- Left column (55%): image gallery — large current image + thumbnail strip. No carousel arrows.
- Right column (45%): craft badge, product name H1 (Cormorant Garamond `24px`), origin line (`12px` muted, e.g., "Hand-block printed in Bagru, Rajasthan"), price, color selector (swatch circles + natural dye name label on active), size selector, "Add to Cart" button (full-width, maroon, `48px`, `2px` radius), Details accordion, Care accordion, Delivery accordion.

**Cart Drawer:**
- Semi-transparent backdrop (`rgba(0,0,0,0.4)`)
- Drawer: `400px` wide, full height, warm ivory bg, slide from right
- Header: "Your cart (n)" + close
- Line items: colorway-specific image (`64px`), craft badge + name, color + size, `−  n  +` stepper, remove
- Free shipping note: "Add ₹X more for free shipping" if below ₹999
- Subtotal + "Proceed to Checkout" button full-width maroon

**Filter panel (desktop left sidebar):**
- Category checkboxes
- Craft technique checkboxes (with technique name, not code)
- Fabric checkboxes
- Size buttons (toggle)
- Color swatches (toggle)
- Sale only toggle

---

### Section 7 — Technical Specifications

- **Framework:** Next.js 14 App Router, React 18, TypeScript strict
- **Styling:** CSS Modules + CSS custom properties. No Tailwind.
- **State:** Zustand for cart and search overlay.
- **Components:** Radix UI for accordions. Custom for everything else.
- **Images:** `next/image`. Product images `aspect-[3/4]`. WebP.
- **Icons:** Lucide `size={18}` `strokeWidth={1.5}`. Search, User, ShoppingBag, X, ChevronDown, Heart.
- **Fonts:** Cormorant Garamond + Inter, both via `next/font/google`.
  - Cormorant Garamond: weights 400, 500, 600. Variable: `--font-display`.
  - Inter: weights 400, 500, 600. Variable: `--font-body`.
- **Animation:** Framer Motion for cart drawer and mobile filter panel.
- **Performance:** Lighthouse 90+ all metrics.

---

### Section 8 — Implementation Steps

Build in this order:
1. **Design tokens** — CSS custom properties in `globals.css`. All 7 color values. No additions.
2. **PromoBanner + MegaNav + CartDrawer** — present on every page. Cart state must work first.
3. **ProductCard + color swatch hover** — instant image swap, craft badge logic.
4. **PDP** — color selector changes gallery; size selector; Add to Cart.
5. **Homepage** — hero, craft collection strips, new arrivals, artisan story strip.
6. **PLP** — filter panel + product grid + URL-based filter state.
7. **Footer** — last.

---

### Section 9 — User Experience

The visitor arrives having seen a friend's kurta or a heritage edit on Instagram. They know Indian fashion. The color name "Indigo" is not a generic blue — it is a specific natural dye tradition from Rajasthan. The product name "Ajrakh Print Cotton Kurta" tells an informed buyer exactly what they are getting.

The swatch hover shows the product in each natural dye colorway before clicking. The craft badge on the card is informational — it helps the buyer understand how the product was made. On the PDP, the origin line ("Hand-block printed in Bagru, Rajasthan") is not marketing copy — it is provenance. The accordion details go deeper: fabric weight, wash care for natural dyes, artisan cooperative credit.

The cart confirms the selection. The maroon button is the brand — it appears here as the most trusted element on the page.

---

### Section 10 — Constraints

- **Craft badge logic:** `craftTechnique !== 'none'` shows badge. All non-trivial crafted products carry the badge.
- **Natural dye color names in data, not CSS:** "Indigo", "Madder Red", "Turmeric", "Natural" are `ColorVariant.name` values — they come from the product record, not from the design system.
- **No border-radius on images:** Craft photography bleeds to the edge. `0px` always.
- **`2px` border-radius on buttons only:** Softer than Aritzia, harder than typical DTC (`4px`).
- **Maroon CTA always:** No black CTAs. The brand color IS the button color.
- **INR pricing always:** ₹2,499 not $2,499. No decimals. No "INR" prefix — just the ₹ symbol.
- **Instant swatch image swap:** Same rule as Aritzia. No CSS transition on the image. The swap is instant.
- **Saffron-orange for sale only:** `hsl(25deg 88% 50%)`. The only high-saturation color in the palette.
- **No urgency copy:** No countdown timers, no "Only 3 left!", no "Selling fast".
- **No motifs in UI CSS:** The textiles carry the patterns. The UI has no decorative borders, no mandala graphics, no ethnic ornament in the chrome. The products provide all the visual richness.
- **Cormorant Garamond for display only:** Not for UI elements, not for product card names, not for buttons. Only for headlines and section labels where editorial weight is needed.

---

## Platform Versions

### Category A — Lovable

Build an Indian heritage fashion e-commerce storefront inspired by FabIndia. Products are handcrafted by Indian artisan communities — hand-block printed, handloom woven, naturally dyed, embroidered.

**Design system:**
Background `hsl(36deg 25% 97%)` (warm ivory — not white). Warm surfaces `hsl(36deg 25% 93%)`. Primary text `hsl(0deg 0% 10%)`. Muted text `hsl(20deg 6% 45%)`. Border `hsl(36deg 15% 85%)`. Maroon CTA `hsl(348deg 68% 30%)` (deep brand maroon — all buttons use this, NOT black). Sale `hsl(25deg 88% 50%)` (saffron-orange — only for sale prices). **No additional colors.**

Two fonts: Cormorant Garamond (display/headlines only) + Inter (all UI text, body, buttons, metadata). Both via Google Fonts.

Buttons: `border-radius: 2px`. Product images: `border-radius: 0`. Color swatches: `border-radius: 50%`.

**Craft technique badge system:** Each product has a `craftTechnique` field. If not `'none'`, display a small badge above the product name: "HAND-BLOCK PRINT", "HANDLOOM", "AJRAKH PRINT", "CHIKANKARI", etc. This replaces the sub-brand badge from typical fashion e-commerce.

**Build these components in order:**

**PromoBanner** — `40px` height, `var(--color-maroon)` background, white `11px` uppercase text. Dismiss X. Collapses on dismiss.

**MegaNav** — sticky, `64px` height, `1px` bottom border. Logo (Cormorant Garamond wordmark) left. Center: Women, Men, Kids, Home, Sale. Right: Search, Account, Cart + badge. Mobile: hamburger + logo + cart.

**ProductCard** — `aspect-[3/4]` image, no border-radius. Color swatches: `12px` circles. Hover = **instant** image swap to that colorway (no CSS transition). Craft badge above name if not `'none'`. Name `14px` Inter. Fabric label `12px` muted. Price in ₹ (sale: saffron-orange + strikethrough original).

**CartDrawer** — Framer Motion slide from right, `400px`. Semi-transparent backdrop. Line items with colorway image + craft badge. Free shipping if below ₹999. "Proceed to Checkout" full-width maroon button.

**PDP** — Left 55%: image gallery + thumbnails. Right 45%: craft badge, `<h1>` name in Cormorant Garamond `24px`, origin provenance line, price, color selector (swatches + natural dye name), size selector (`2px` radius, selected = maroon fill, OOS = strikethrough `opacity-40`), Add to Cart full-width `48px` maroon button, 3 Radix accordions.

INR pricing throughout. No urgency copy. Instant swatch swap. Warm ivory background everywhere.

---

### Category A — ChatGPT Canvas

Build an Indian heritage fashion storefront. Next.js 14 App Router, TypeScript strict, CSS Modules + CSS custom properties. No Tailwind.

Brand: FabIndia-style craft retail. Handloom, hand-block print, natural dye, embroidery products. Price range ₹600–₹12,000.

**globals.css tokens:**
```css
:root {
  --color-bg:         hsl(36deg 25% 97%);   /* warm ivory */
  --color-bg-warm:    hsl(36deg 25% 93%);   /* deeper warm beige */
  --color-text:       hsl(0deg 0% 10%);     /* near-black */
  --color-text-muted: hsl(20deg 6% 45%);    /* warm medium gray */
  --color-border:     hsl(36deg 15% 85%);   /* warm light border */
  --color-maroon:     hsl(348deg 68% 30%);  /* FabIndia brand maroon — CTAs */
  --color-sale:       hsl(25deg 88% 50%);   /* saffron-orange — sale prices only */
}
--font-display: Cormorant Garamond (display/headlines)
--font-body: Inter (all UI)
```

**Types:**
```typescript
type CraftTechnique = 'hand-block-print' | 'handloom' | 'natural-dye' | 'embroidery' | 'ajrakh' | 'ikat' | 'chikankari' | 'none'
type Category = 'kurtas' | 'sarees' | 'kurta-sets' | 'dupattas' | 'salwar-suits' | 'tops' | 'bottoms' | 'home'
interface ColorVariant { name: string; swatch: string; images: string[]; inStock: boolean; sizes: { size: string; inStock: boolean; sku: string }[] }
interface Product { id: string; slug: string; name: string; category: Category; craftTechnique: CraftTechnique; fabric: string; origin?: string; price: number; salePrice?: number; colors: ColorVariant[]; isNew: boolean; isSale: boolean; featured: boolean }
```

**Pages:**
- `/` — PromoBanner + MegaNav, hero (artisan editorial, `90vh`), craft collection strips, new arrivals grid, artisan story strip, footer
- `/products` — left filter panel (craft/category/fabric/size), product grid
- `/products/[slug]` — image gallery + color/size selectors + add to cart
- Cart drawer always in root layout

**Critical interactions:**
- `ProductCard`: hover color swatch = instant image swap. No CSS transition. State-driven.
- `PDP ColorSelector`: selecting color → gallery images update to that colorway's array.
- Sizes: OOS = strikethrough + `opacity: 0.4`. Never hidden.
- Cart drawer: Framer Motion, `280ms ease-out` from right.

**Absolute constraints:**
- Buttons: `border-radius: 2px` (not 0 — slightly softer than Aritzia)
- Product images: `border-radius: 0`
- CTA buttons: `var(--color-maroon)` background — never black
- Craft badge: show if `craftTechnique !== 'none'`
- Prices: ₹ symbol, no decimals (₹2,499 not ₹2499.00)
- No urgency copy anywhere

---

### Category A — Bolt

Build a React + TypeScript Indian heritage fashion storefront. Vite, React 18, TypeScript, CSS Modules, Zustand, Framer Motion.

Reference aesthetic: FabIndia — warm ivory canvas, deep maroon brand color, craft technique metadata on every product, natural dye vocabulary for color names.

**CSS custom properties in index.css:**
```css
:root {
  --color-bg:         hsl(36deg 25% 97%);
  --color-bg-warm:    hsl(36deg 25% 93%);
  --color-text:       hsl(0deg 0% 10%);
  --color-text-muted: hsl(20deg 6% 45%);
  --color-border:     hsl(36deg 15% 85%);
  --color-maroon:     hsl(348deg 68% 30%);
  --color-sale:       hsl(25deg 88% 50%);
}
```

**Components:**

`PromoBanner` — `height: 40px`, `background: var(--color-maroon)`, white `11px` uppercase text. Dismissible, `max-height` collapse.

`ProductCard({ product })` — `aspect-ratio: 3/4`, no border-radius. State: `hoveredColorIndex` (default 0). Swatch `onMouseEnter` → sets index → image src = `product.colors[hoveredColorIndex].images[0]`. **No transition on image.** Craft badge if `product.craftTechnique !== 'none'`: `{CRAFT_LABELS[product.craftTechnique]}`. Sale: saffron-orange (`var(--color-sale)`) + strikethrough original. Price in ₹.

`CartDrawer` — Framer Motion `AnimatePresence`. `initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: 0.28, ease: 'easeOut' }}`. Semi-transparent backdrop. Free shipping: "Add ₹X more for free shipping" if below ₹999.

`ColorSelector({ colors, selected, onChange })` — Swatch circles `24px`, active: `outline: 2px solid var(--color-maroon); outline-offset: 2px`. Show natural dye color name on active/hover.

`SizeSelector({ sizes, selected, onChange })` — Button grid. Selected: `background: var(--color-maroon); color: #fff`. OOS: `opacity: 0.4; text-decoration: line-through`. `border-radius: 2px`.

`ImageGallery({ images, alt })` — Large image + thumbnail row. Click updates main. No carousel arrows.

No Tailwind. No `border-radius` on images. CTA always maroon, never black.

---

### Category A — v0

Create a Next.js 14 App Router Indian heritage fashion storefront. CSS Modules + CSS custom properties. No Tailwind, no shadcn. Custom design system.

**Design identity:** FabIndia — warm ivory canvas, deep maroon CTAs, craft technique badges, natural dye color vocabulary, two-font system (Cormorant Garamond display + Inter body).

**globals.css:**
```css
:root {
  --color-bg:         hsl(36deg 25% 97%);
  --color-bg-warm:    hsl(36deg 25% 93%);
  --color-text:       hsl(0deg 0% 10%);
  --color-text-muted: hsl(20deg 6% 45%);
  --color-border:     hsl(36deg 15% 85%);
  --color-maroon:     hsl(348deg 68% 30%);
  --color-sale:       hsl(25deg 88% 50%);
}
*, *::before, *::after { box-sizing: border-box; margin: 0; }
body { background: var(--color-bg); color: var(--color-text); font-family: var(--font-body); }
```

**Types (src/types/index.ts):**
```typescript
export type CraftTechnique = 'hand-block-print' | 'handloom' | 'natural-dye' | 'embroidery' | 'ajrakh' | 'ikat' | 'chikankari' | 'none'
export interface ColorVariant { name: string; swatch: string; images: string[]; inStock: boolean; sizes: { size: string; inStock: boolean; sku: string }[] }
export interface Product { id: string; slug: string; name: string; category: string; craftTechnique: CraftTechnique; fabric: string; origin?: string; price: number; salePrice?: number; colors: ColorVariant[]; isNew: boolean; isSale: boolean; featured: boolean }
export interface CartItem { productId: string; name: string; craftTechnique: CraftTechnique; price: number; color: string; colorSwatch: string; size: string; quantity: number; image: string }
```

**Key CSS patterns:**

ProductCard:
```css
.imageWrapper { aspect-ratio: 3/4; overflow: hidden; }
.image { width: 100%; height: 100%; object-fit: cover; display: block; }
/* 0 border-radius on images — always */
.swatch { width: 12px; height: 12px; border-radius: 50%; cursor: pointer; }
.swatch.active { outline: 2px solid var(--color-maroon); outline-offset: 2px; }
.craftBadge { font-size: 10px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: var(--color-text-muted); }
.salePrice { color: var(--color-sale); }
.originalPrice { text-decoration: line-through; color: var(--color-text-muted); }
```

Button:
```css
.button { background: var(--color-maroon); color: #fff; border: none; border-radius: 2px; height: 48px; width: 100%; font-family: var(--font-body); font-size: 13px; font-weight: 500; letter-spacing: 0.03em; cursor: pointer; }
.button:hover { background: hsl(348deg 68% 24%); }
```

Craft badge logic: `{product.craftTechnique !== 'none' && <span className={styles.craftBadge}>{CRAFT_LABELS[product.craftTechnique]}</span>}`

Build: src/app/page.tsx, src/app/products/page.tsx, src/app/products/[slug]/page.tsx. Zustand cart store. PromoBanner + MegaNav + CartDrawer in root layout.

---

### Category B — Claude Artifacts

Build an Indian heritage fashion storefront. Next.js 14 App Router, TypeScript strict, CSS Modules + CSS custom properties, Zustand (cart), Framer Motion (animations).

**File structure:**
```
src/
├── app/
│   ├── layout.tsx        # PromoBanner + MegaNav + CartDrawer always mounted
│   ├── globals.css       # CSS tokens + base reset
│   ├── page.tsx          # Homepage
│   ├── products/
│   │   ├── page.tsx      # PLP
│   │   └── [slug]/
│   │       └── page.tsx  # PDP
├── components/
│   ├── layout/
│   │   ├── PromoBanner.tsx
│   │   ├── MegaNav.tsx
│   │   └── Footer.tsx
│   ├── cart/
│   │   ├── CartDrawer.tsx
│   │   └── CartItem.tsx
│   └── product/
│       ├── ProductCard.tsx
│       ├── ProductGrid.tsx
│       ├── FilterPanel.tsx
│       ├── ColorSelector.tsx
│       ├── SizeSelector.tsx
│       └── ImageGallery.tsx
├── store/
│   └── cart.ts           # Zustand + persist
├── lib/
│   └── products.ts       # 12 mock products
└── types/
    └── index.ts
```

**globals.css (implement first):**
```css
:root {
  --color-bg:         hsl(36deg 25% 97%);
  --color-bg-warm:    hsl(36deg 25% 93%);
  --color-text:       hsl(0deg 0% 10%);
  --color-text-muted: hsl(20deg 6% 45%);
  --color-border:     hsl(36deg 15% 85%);
  --color-maroon:     hsl(348deg 68% 30%);
  --color-sale:       hsl(25deg 88% 50%);
}
*, *::before, *::after { box-sizing: border-box; margin: 0; }
body { background: var(--color-bg); color: var(--color-text); font-family: var(--font-body, Inter, sans-serif); }
```

**types/index.ts:**
```typescript
export type CraftTechnique = 'hand-block-print' | 'handloom' | 'natural-dye' | 'embroidery' | 'ajrakh' | 'ikat' | 'chikankari' | 'none'
export type Fabric = 'cotton' | 'silk' | 'linen' | 'khadi' | 'chanderi' | 'georgette' | 'wool'
export type Category = 'kurtas' | 'sarees' | 'kurta-sets' | 'dupattas' | 'salwar-suits' | 'tops' | 'bottoms' | 'home'
export interface SizeVariant { size: string; inStock: boolean; sku: string }
export interface ColorVariant { name: string; swatch: string; images: string[]; inStock: boolean; sizes: SizeVariant[] }
export interface Product { id: string; slug: string; name: string; category: Category; craftTechnique: CraftTechnique; fabric: Fabric; origin?: string; description: string; price: number; salePrice?: number; colors: ColorVariant[]; isNew: boolean; isSale: boolean; featured: boolean }
export interface CartItem { productId: string; name: string; craftTechnique: CraftTechnique; price: number; color: string; colorSwatch: string; size: string; quantity: number; image: string }
```

**store/cart.ts:** Zustand with `persist` to `'pfecomm-craft-cart'`. Items keyed by `productId::color::size`. Free shipping threshold: `999` (INR). `subtotal` and `itemCount` as getters.

**Critical interaction — swatch hover image swap:**
```typescript
// ProductCard.tsx
const [hoveredColorIndex, setHoveredColorIndex] = useState(0)
const displayImage = product.colors[hoveredColorIndex].images[0]
// onMouseEnter on swatch → setHoveredColorIndex(index)
// NO CSS transition on the img element — instant swap
```

**Craft badge logic:**
```typescript
const CRAFT_LABELS: Record<CraftTechnique, string> = {
  'hand-block-print': 'Hand-Block Print',
  'handloom': 'Handloom',
  'natural-dye': 'Natural Dye',
  'embroidery': 'Hand Embroidery',
  'ajrakh': 'Ajrakh Print',
  'ikat': 'Ikat Weave',
  'chikankari': 'Chikankari',
  'none': '',
}
// In ProductCard:
{product.craftTechnique !== 'none' && (
  <span className={styles.craftBadge}>{CRAFT_LABELS[product.craftTechnique]}</span>
)}
```

**Conventions:**
- All colors via CSS variables — never hardcode hex in component files
- Swatch `background`: `style={{ background: color.swatch }}` — only inline style from data
- Buttons: `border-radius: 2px` — always (not 0 — FabIndia is slightly softer than Aritzia)
- Images: `border-radius: 0` — always
- CTA buttons: `background: var(--color-maroon)` — never black
- Prices: format as `₹{price.toLocaleString('en-IN')}` — Indian number formatting
- No urgency copy anywhere

---

### Category B — Grok

Build an Indian heritage fashion storefront. Next.js 14 App Router, TypeScript strict, CSS Modules, Zustand. Reference: FabIndia.

**What to implement:**

`src/app/globals.css` — 7 CSS tokens. Warm ivory bg (`hsl(36deg 25% 97%)`), deep maroon CTA (`hsl(348deg 68% 30%)`), saffron-orange sale (`hsl(25deg 88% 50%)`). No black CTAs.

`src/types/index.ts` — `CraftTechnique` type, `Fabric` type, `Category` type, `ColorVariant`, `SizeVariant`, `Product`, `CartItem` interfaces.

`src/store/cart.ts` — Zustand cart, persisted, keyed by productId::color::size composite. Free shipping threshold ₹999.

`src/components/layout/PromoBanner.tsx` — `40px` maroon bar, dismissible, `max-height` collapse.

`src/components/layout/MegaNav.tsx` — `64px` sticky. Logo (Cormorant Garamond) + nav links + icons. Mobile: hamburger drawer.

`src/components/product/ProductCard.tsx` — Key behavior: `hoveredColorIndex` state. `onMouseEnter` swatch → update index. Image = `product.colors[hoveredColorIndex].images[0]`. No img transition. Craft badge if `craftTechnique !== 'none'`. Sale price in `var(--color-sale)` + strikethrough. INR formatting.

`src/components/cart/CartDrawer.tsx` — Framer Motion, `280ms ease-out` from right. Semi-transparent backdrop. Line items + quantity stepper + remove. Free shipping note (₹999 threshold).

`src/app/products/[slug]/page.tsx` — `generateStaticParams`. `ColorSelector`: selecting color resets gallery to that colorway's images. `SizeSelector`: all sizes shown, OOS = strikethrough opacity-40. "Add to Cart" disabled until valid size. Maroon Add to Cart button.

`src/lib/products.ts` — 12 mock products covering 4+ categories and 4+ craft techniques. Natural dye color names. Realistic names: "Indigo Hand-Block Print Cotton Kurta", "Ajrakh Print Linen Kurta Set", "Chikankari Embroidery Tunic", "Ikat Weave Silk Dupatta".

Constraints: `border-radius: 2px` on buttons, `0` on images. CTA always maroon. INR pricing. No urgency copy.

---

### Category B — Gemini

Build an Indian heritage fashion e-commerce storefront. Framework: Next.js 14 App Router, TypeScript, CSS Modules + CSS custom properties. No Tailwind.

**Visual system:** FabIndia aesthetic — warm ivory background, deep maroon brand color, craft technique as product metadata. The craft is the story.

7 color tokens total:
- `--color-bg: hsl(36deg 25% 97%)` — warm ivory (not pure white)
- `--color-bg-warm: hsl(36deg 25% 93%)` — deeper warm beige for section bands
- `--color-text: hsl(0deg 0% 10%)` — near-black
- `--color-text-muted: hsl(20deg 6% 45%)` — warm medium gray
- `--color-border: hsl(36deg 15% 85%)` — warm light border
- `--color-maroon: hsl(348deg 68% 30%)` — FabIndia brand maroon (CTA buttons, promo banner, active states)
- `--color-sale: hsl(25deg 88% 50%)` — saffron-orange (only for sale prices)

**Craft technique data model:**
Each `Product` has a `craftTechnique` field: `'hand-block-print' | 'handloom' | 'natural-dye' | 'embroidery' | 'ajrakh' | 'ikat' | 'chikankari' | 'none'`. The badge shows if `craftTechnique !== 'none'`. Each product also has `fabric` and optional `origin` (provenance: "Bagru, Rajasthan"). Each color in `ColorVariant` has a name using natural dye vocabulary: "Indigo", "Madder Red", "Turmeric", "Natural", "Mud Brown".

**Pages:**

`/` — PromoBanner (dismissible, `40px` maroon bar), MegaNav (`64px` sticky, Cormorant Garamond logo + links + icons), editorial hero (`90vh`, artisan photography), craft collection strips, new arrivals 4-col grid, artisan story strip ("Crafted by 55,000+ artisans"), footer.

`/products` — Left filter panel (desktop) with craft/category/fabric/size. Product grid 4-col. ProductCard with swatch hover → instant image swap.

`/products/[slug]` — Image gallery (large + thumbnails). Color selector with natural dye names. Size selector (all sizes, OOS = strikethrough). "Add to Cart" full-width `48px` maroon button. Accordions: Details, Care, Delivery.

**Two rules above all others:**
1. CTA buttons are `var(--color-maroon)`, not black. The brand color appears on the most trusted element on the page.
2. Swatch hover changes card image **instantly** — no CSS transition.

Zustand cart store, persisted. Framer Motion cart drawer. `tsc --noEmit` zero errors.

---

### Category B — Cursor

In `src/`, implement an Indian heritage fashion storefront. Next.js 14, TypeScript strict, CSS Modules, Zustand already installed.

**Read first:** `src/app/globals.css` (7 color tokens), `src/types/index.ts` (CraftTechnique, Fabric, Category, ColorVariant, Product, CartItem), `src/store/cart.ts` (Zustand cart interface).

**Implement in this order:**
1. `src/app/globals.css` — 7 token variables, base reset, body font (`--font-body`)
2. `src/types/index.ts` — all interfaces including `CraftTechnique` and `Fabric` types
3. `src/store/cart.ts` — Zustand + persist, subtotal/itemCount as getters, ₹999 free shipping threshold
4. `src/components/layout/PromoBanner.tsx` — dismissible maroon banner
5. `src/components/layout/MegaNav.tsx` — sticky `64px`, Cormorant Garamond logo
6. `src/app/layout.tsx` — mount PromoBanner + MegaNav + CartDrawer
7. `src/components/product/ProductCard.tsx` — swatch hover image swap (instant) + craft badge
8. `src/components/cart/CartDrawer.tsx` — Framer Motion, maroon checkout button
9. `src/app/page.tsx` — hero + craft collection strips + new arrivals
10. `src/app/products/page.tsx` — filter panel + grid
11. `src/app/products/[slug]/page.tsx` — gallery + selectors + add to cart

**ProductCard swatch hover — the key interaction:**
```typescript
const [activeColorIdx, setActiveColorIdx] = useState(0)
const src = product.colors[activeColorIdx].images[0]
// onMouseEnter on swatch → setActiveColorIdx(idx)
// NO transition on img element — instant swap
```

**Craft badge — the key metadata:**
```typescript
const CRAFT_LABELS: Record<CraftTechnique, string> = {
  'hand-block-print': 'Hand-Block Print',
  'handloom': 'Handloom',
  'natural-dye': 'Natural Dye',
  'embroidery': 'Hand Embroidery',
  'ajrakh': 'Ajrakh Print',
  'ikat': 'Ikat Weave',
  'chikankari': 'Chikankari',
  'none': '',
}
// Show badge:
{product.craftTechnique !== 'none' && (
  <span className={styles.craftBadge}>{CRAFT_LABELS[product.craftTechnique]}</span>
)}
```

**CSS module conventions:**
```css
/* Images: always 0 radius */
.productImageWrapper { aspect-ratio: 3/4; overflow: hidden; border-radius: 0; }
/* Buttons: 2px radius (FabIndia is slightly softer than Aritzia's 0px) */
.button { border-radius: 2px; background: var(--color-maroon); color: #fff; }
/* Swatches: circles only */
.swatch { border-radius: 50%; }
```

**12 seed products in `src/lib/products.ts`:** Cover 4+ categories (kurtas, dupattas, kurta-sets, tops), 4+ craft techniques. Natural dye color names. Realistic names: "Indigo Hand-Block Print Cotton Kurta", "Ajrakh Print Linen Kurta Set", "Chikankari Embroidery Tunic". Prices ₹600–₹8,999. Include ₹ formatting function.

Zero hex in CSS files. Zero urgency copy. `tsc --noEmit` clean.

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
