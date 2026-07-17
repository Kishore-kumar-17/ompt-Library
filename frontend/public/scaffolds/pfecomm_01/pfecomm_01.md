---
prompt_id: pfecomm_01
sub_category: E-commerce
sub_type: Premium Fashion Retail Storefront
title: Editorial Luxury — Premium Multi-Brand Fashion Storefront
reference_patterns: editorial_photography_first, multi_brand_architecture, swatch_driven_image_change, monochromatic_ui_system
inspiration: aritzia.com
quality_score:
status: draft
notes:
---

## Base Prompt

### Section 1 — Role

You are a senior e-commerce product designer with deep experience building premium fashion storefronts. You understand the premium fashion paradigm: the photography does the selling, the UI gets out of the way. You design for a customer who arrives already curious about the brand — they are evaluating quality, not being convinced to spend. Your instinct is extreme restraint: no decorative elements, no accent colors, no visual noise. Black text on white. The product photography is the entire visual system.

---

### Section 2 — Application Overview

This is a premium fashion e-commerce storefront for a multi-brand women's fashion retailer. The brand operates five house labels under a parent brand identity: a main line and four sub-brands with distinct positioning (casual/sports, feminine/flowing, occasion wear, accessories). Products span tops, bottoms, dresses, outerwear, knitwear, shoes, and accessories. Price range: $60–$350.

The store covers five views: Homepage, Product Listing Page (PLP), Product Detail Page (PDP), Cart Drawer, and a Search experience. The sub-brand architecture affects navigation, product cards (brand badge), and filtering.

---

### Section 3 — Brand Voice & Mood

The feeling is quietly aspirational. Confident without showing off. The brand does not announce its quality — it demonstrates it through product photography and copy that names rather than hypes.

Copy is minimal and precise. Product names are clean and specific: "Effortless Pant", "TNA Boyfriend Tee", "Wilfred Babaton Dress". Prices listed without ceremony. No sale badges unless genuinely on sale. No urgency language ("Selling fast!", "Limited time!"). No lifestyle copy boilerplate ("crafted for the modern woman").

Visual mood: editorial. White space is generous. Typography is tight and controlled. Photography is the hero — every product page is an editorial moment.

Vibe word: editorial restraint.

---

### Section 4 — Core Features & Functionality

1. **Homepage** — dismissible promo banner, mega-nav, editorial hero (full-bleed, no text overlay), featured collections by sub-brand, new arrivals grid, editorial campaign strip, footer
2. **Product Listing Page (PLP)** — left filter panel (desktop), bottom sheet filter (mobile), product grid, color swatch hover changes product image, sub-brand filter, size filter, sort
3. **Product Detail Page (PDP)** — image gallery (left, with thumbnail strip), product info right (sub-brand label, name, price, color selector with swatch hover preview, size selector, add to cart, product details accordion, care accordion, delivery accordion)
4. **Cart Drawer** — slide-in from right, black backdrop, line items with colorway image, quantity stepper, sub-brand label, remove, subtotal, checkout CTA, free shipping threshold note
5. **Search** — search input activates full-screen overlay, live suggestions from product names

---

### Section 5 — Design Specifications

**Visual style:** White canvas. Product photography drives all visual interest. Zero decorative elements. Maximum restraint.

**Color mode:** Light only. No dark mode.

**Color palette (6 values — complete, no additions):**
- Background: `hsl(0deg 0% 100%)` — pure white
- Subtle surface: `hsl(0deg 0% 97%)` — barely-there gray for secondary sections
- Primary text: `hsl(0deg 0% 7%)` — near-black (not pure black — avoids harshness)
- Muted text: `hsl(0deg 0% 42%)` — metadata, sub-brand labels, price secondary
- Border: `hsl(0deg 0% 88%)` — light gray for all dividers and input borders
- Sale: `hsl(0deg 72% 45%)` — the ONLY chromatic color, used exclusively for sale pricing

**CTA color:** Near-black (`hsl(0deg 0% 7%)`). Buttons are filled black with white text. No brand accent color. The restraint IS the brand.

**Typography:** Inter (Google Fonts), all weights via `next/font/google`.
- Promo banner: `11px`, weight 500, letter-spacing `0.08em`, uppercase
- Nav links: `13px`, weight 400, letter-spacing `0.01em`
- Hero callout (if used): `clamp(28px, 4vw, 56px)`, weight 400, letter-spacing `-0.02em` — editorial serif feel in a sans
- Section label: `11px`, weight 600, letter-spacing `0.1em`, uppercase, muted
- Product name (card): `14px`, weight 400, letter-spacing `0`
- Product name (PDP): `22px`, weight 400, letter-spacing `-0.01em`
- Price: `14px`, weight 400 (regular) / `14px` weight 500 (sale)
- Body (descriptions): `14px`, weight 400, line-height 1.65
- Sub-brand badge: `10px`, weight 500, letter-spacing `0.06em`, uppercase
- Button text: `13px`, weight 500, letter-spacing `0.03em`

**Spacing:** 4pt base unit (tighter than the sustainable fashion brand).
- Promo banner height: `40px`
- Nav height: `60px` desktop, `52px` mobile
- Product card gap: `16px` desktop, `8px` mobile
- Section vertical spacing: `80px` desktop, `56px` mobile
- PDP image / info split: `55% / 45%`
- Cart drawer width: `400px`

**Border radius:**
- Product image cards: `0px` — no rounding. Fashion photography should not have rounded corners.
- Buttons: `0px` — sharp corners. Premium fashion uses sharp geometry.
- Inputs: `0px`
- Swatches: `50%` — circles only for color swatches

**Responsive:** Mobile-first. Breakpoints: `640px`, `900px`, `1280px`. Product grid: 4 col desktop → 3 col tablet → 2 col mobile. Max-width: `1440px`.

**Accessibility:** WCAG AA. All text on white must pass 4.5:1 (primary text hsl 0,0%,7% on white = ~16:1 ✓). Focus rings: `2px solid hsl(0deg 0% 7%)` offset `2px`. Keyboard navigation on all interactive elements.

**Motion:**
- Cart drawer: `transform translateX(100%) → translateX(0)`, `280ms ease-out`
- Image hover swap: `opacity 0s` — instant swap, no cross-fade (fashion photography feels premium at instant swap)
- Swatch hover → image change: instant
- Filter panel (mobile): `transform translateY(100%) → translateY(0)`, `260ms ease-out`
- Promo banner dismiss: `max-height 0`, `200ms ease-out`
- All motion gates: `prefers-reduced-motion: reduce`

---

### Section 6 — Structure

**Sub-brand taxonomy:**
| Sub-brand | Positioning | Color swatch label style |
|-----------|-------------|--------------------------|
| Aritzia | Main line — sophisticated, elevated basics | — (no badge) |
| TNA | Casual, sports, lounge | Badge: "TNA" |
| Wilfred | Feminine, flowing, occasion-adjacent | Badge: "Wilfred" |
| Sunday Best | Party, occasion, elevated going-out | Badge: "Sunday Best" |
| Auxiliary | Bags, shoes, accessories | Badge: "Auxiliary" |

**TypeScript schema:**
```typescript
export type Brand = 'Aritzia' | 'TNA' | 'Wilfred' | 'Sunday Best' | 'Auxiliary'
export type Category = 'tops' | 'bottoms' | 'dresses' | 'outerwear' | 'knitwear' | 'shoes' | 'accessories'

export interface ColorVariant {
  name: string       // "Bone", "Black", "Ecru"
  swatch: string     // hex value — used ONLY as inline style on swatch element, never in CSS
  images: string[]   // 3-4 images for this colorway
  inStock: boolean
  sizes: SizeVariant[]
}

export interface SizeVariant {
  size: string      // "XXS" | "XS" | "S" | "M" | "L" | "XL" | "XXL"
  inStock: boolean
  sku: string
}

export interface Product {
  id: string
  slug: string
  name: string
  brand: Brand
  category: Category
  subcategory?: string
  description: string
  price: number
  salePrice?: number
  colors: ColorVariant[]
  isNew: boolean
  isSale: boolean
  featured: boolean
}
```

**Homepage top to bottom:**
1. **PromoBanner** — `40px`, black bg, white text, `11px` uppercase centered. Dismiss X on right. Collapses via `max-height` animation on dismiss. Message: "Free shipping on orders over $200"
2. **MegaNav** — sticky, `60px` height, `1px` bottom border. Logo left (wordmark). Center: nav categories (New, Clothing, Shoes, Accessories, Brands, Sale). Sub-brand logos appear in mega dropdown. Right: Search icon, Account icon, Cart icon + count.
3. **Hero** — full-bleed, `90vh` height. Campaign image (model in editorial setting). Minimal or no text overlay. If text: `clamp(28px,4vw,56px)`, weight 400, letter-spacing `-0.02em`.
4. **Collection strip** — 4 featured collections in a 2×2 grid of large square images with collection name overlay. Background white.
5. **New arrivals** — Section label "NEW IN", 4-col product grid (3 rows). Standard product cards.
6. **Campaign strip** — full-width editorial image with sub-brand name + "Shop now" text link.
7. **Footer** — 4 columns: Help, Customer Care, Company, Follow Us. `13px` links. `1px` top border.

**Product card spec:**
- Image: `aspect-[3/4]`, no border-radius, `object-cover`
- Primary image: first image in `colors[selectedColor].images`
- On card hover: swaps to `images[1]` — instant, no transition
- Color swatches: row of `12px` circles below image, `4px` gap. Hovering a swatch changes the card image to that colorway's first image — instant swap
- Sub-brand badge: if `brand !== 'Aritzia'` — `10px uppercase` above product name, `muted` color
- Product name: `14px` weight 400, 2-line max (clamp with ellipsis)
- Price: `14px`. If sale: `color: sale-red` + strikethrough original
- No quick-add overlay (Aritzia doesn't use it — drives PDP visits)

**PDP structure:**
- Left column (55%): image gallery — large current image + thumbnail strip of all colorway images. Clicking thumbnail changes main image. No carousel arrows.
- Right column (45%): sub-brand badge (if applicable), product name H1, price (regular or sale + original strikethrough), color selector (swatch circles + color name label on hover/active), size selector (button grid, selected = black fill, out-of-stock = text strikethrough `opacity-40`), "Add to Cart" button (full-width, black, `48px` height, `0px` radius), Product Details accordion, Care accordion, Delivery & Returns accordion.

**Cart Drawer:**
- Black semi-transparent backdrop (`rgba(0,0,0,0.5)`)
- Drawer: `400px` wide, full height, white bg, slide from right
- Header: "Your bag (n)" + close
- Line items: colorway-specific image (`64px` square), sub-brand label + name, color + size, quantity stepper (`−  2  +`), remove
- Free shipping note: "Spend $X more for free shipping" if below $200 threshold
- Subtotal + "Proceed to Checkout" button full-width black

**Filter panel (desktop left sidebar):**
- Sub-brand checkboxes
- Category checkboxes
- Size buttons (toggle)
- Color swatches (toggle)
- Price range
- "Sale only" toggle

---

### Section 7 — Technical Specifications

- **Framework:** Next.js 14 App Router, React 18, TypeScript strict
- **Styling:** CSS Modules + CSS custom properties. No Tailwind (the monochromatic system is too specific for Tailwind's default palette).
- **State:** Zustand for cart and search overlay. No Redux.
- **Components:** Radix UI for accordions and dialog (cart drawer). Custom for everything else.
- **Images:** `next/image` throughout. Product images `aspect-[3/4]`, lifestyle `aspect-[16/9]`. WebP.
- **Icons:** Lucide `size={18}` `strokeWidth={1.5}`. Search, User, ShoppingBag, X, ChevronDown.
- **Fonts:** Inter via `next/font/google`. Weights 400, 500, 600.
- **Animation:** Native CSS transitions for swatch hover. Framer Motion for cart drawer and mobile filter panel.
- **Performance:** Lighthouse 95+ all metrics. LCP under 2.5s. No layout shift from fonts.

---

### Section 8 — Implementation Steps

Build in this order:

1. **Design tokens** — CSS custom properties in `globals.css`. All 6 color values. No additions.
2. **PromoBanner + MegaNav + CartDrawer** — present on every page. Cart state must work first.
3. **ProductCard + color swatch hover** — the core interaction. Get the instant image swap right.
4. **PDP** — color swatch selector changes gallery images; size selector; Add to Cart.
5. **Homepage** — hero, collection grid, new arrivals row.
6. **PLP** — filter panel + product grid + URL-based filter state.
7. **Footer + Campaign strip** — last.

**Cut order if scope shrinks:** Campaign strip, search overlay, filter panel (show unfiltered grid). Never cut PDP or cart drawer.

---

### Section 9 — User Experience

The visitor arrives from Instagram or a friend's recommendation. They already know the brand is premium. The question they are answering is: "Is this specific product right for me?"

The hero does not need to explain the brand. It establishes mood. The collection strips give context. The product card is where the first yes/no happens — the thumbnail image and price must be immediately readable. The swatch hover is the key micro-interaction: seeing the colorway you want before clicking drives higher click-through to the PDP.

On the PDP, the decision is: color, size, buy. The UI friction must be zero. Color selector should visually preview via the same gallery images. Size selection must show availability clearly — sold-out sizes visible but struck through. The Add to Cart button must be the dominant element on the right column.

The cart drawer must confirm the decision, not interrupt it. Black backdrop signals: "you're in a focused task." The line item shows exactly what they added. The checkout button is the only next step.

---

### Section 10 — Constraints

- **No accent color** — there are no greens, blues, or brand colors. Black and white only. Sale red is the single exception.
- **No border-radius on buttons** — `border-radius: 0`. Sharp corners are the aesthetic.
- **No border-radius on images** — fashion photography must bleed to the edge.
- **No text overlay on product photography** — editorial images are not disrupted by copy.
- **No urgency language** — no countdown timers, no "Only 2 left!" copy.
- **No hero carousel** — one editorial image. The scroll is the navigation.
- **Instant image swap** — swatch hover does not animate. It swaps instantly. The animation is the editorial choice.
- **Sub-brand badges only for non-Aritzia products** — Aritzia's own line carries no badge.
- **Prices without currency decorations** — "$125" not "$125.00". No ".00".
- **Cart quantity minimum is 1** — never 0. Remove button deletes the line item.
- **CSS custom properties only** — no hardcoded hex in component files. Color swatch backgrounds are the only exception (inline style from data).

---

## Platform Versions

### Category A — Lovable

Build a premium fashion e-commerce storefront inspired by Aritzia. This is a multi-brand women's fashion retailer with extreme visual restraint.

**Design system:**
Background `hsl(0deg 0% 100%)` (pure white). Subtle surfaces `hsl(0deg 0% 97%)`. Primary text `hsl(0deg 0% 7%)` (near-black). Muted text `hsl(0deg 0% 42%)`. Borders `hsl(0deg 0% 88%)`. Sale color `hsl(0deg 72% 45%)` (red — only for sale prices). **No accent color.** CTA buttons are black with white text. Border-radius on buttons and images: `0px`. Font: Inter (Google Fonts).

**Sub-brand taxonomy:** Aritzia (main), TNA (casual), Wilfred (feminine), Sunday Best (occasion), Auxiliary (accessories). Non-Aritzia products show a small sub-brand badge above the name.

**Build these components in order:**

**PromoBanner** — `40px` height, `hsl(0deg 0% 7%)` background, white `11px` uppercase centered text. Dismiss X. Collapses on dismiss with `max-height` animation.

**MegaNav** — sticky, `60px` height, `1px` bottom border. Logo wordmark left. Center nav: New, Clothing, Shoes, Accessories, Brands, Sale. Right: Search, Account, Cart icons (Lucide, `size={18} strokeWidth={1.5}`) + cart count badge. Mobile: hamburger + logo center + cart.

**ProductCard** — `aspect-[3/4]` image, no border-radius. Color swatches: `12px` circles in a row below image. Hovering a swatch swaps the card image to that colorway's image — INSTANT (no transition). Swatch hover also shows color name tooltip. Sub-brand badge (`10px` uppercase) if not Aritzia. Name `14px` weight 400. Price `14px` (sale price in red, original strikethrough). No quick-add button.

**CartDrawer** — Framer Motion slide from right, `400px` width. Black backdrop `rgba(0,0,0,0.5)`. Line items: colorway image, sub-brand + name, color + size, `−  n  +` stepper, remove. Free shipping note if below $200. "Proceed to Checkout" full-width black button.

**PDP** — Left 55%: image gallery (large image + row of thumbnails). Right 45%: sub-brand badge, `<h1>` name `22px` weight 400, price, color selector (swatches + active color name), size selector (button grid — `0px` radius, selected = black fill, OOS = strikethrough `opacity-40`), "Add to Cart" full-width `48px` black button, 3 Radix accordions (Details, Care, Delivery).

No urgency copy. No carousels. Instant swatch image swap. `0px` border-radius everywhere except swatches. All colors via CSS custom properties.

---

### Category A — ChatGPT Canvas

Build a premium fashion retail storefront. Next.js 14 App Router, TypeScript strict, CSS Modules + CSS custom properties. No Tailwind.

Brand: Aritzia-style multi-brand women's fashion. Five labels: Aritzia (main), TNA, Wilfred, Sunday Best, Auxiliary. Price range $60–$350.

**tokens.css:**
```css
:root {
  --color-bg: hsl(0deg 0% 100%);
  --color-bg-subtle: hsl(0deg 0% 97%);
  --color-text: hsl(0deg 0% 7%);
  --color-text-muted: hsl(0deg 0% 42%);
  --color-border: hsl(0deg 0% 88%);
  --color-sale: hsl(0deg 72% 45%);
}
/* No accent color. CTA is var(--color-text) = near-black. */
```

**Types:**
```typescript
type Brand = 'Aritzia' | 'TNA' | 'Wilfred' | 'Sunday Best' | 'Auxiliary'
interface ColorVariant { name: string; swatch: string; images: string[]; inStock: boolean; sizes: { size: string; inStock: boolean; sku: string }[] }
interface Product { id: string; slug: string; name: string; brand: Brand; category: string; price: number; salePrice?: number; colors: ColorVariant[]; isNew: boolean; isSale: boolean; featured: boolean }
```

**Pages:**
- `/` — PromoBanner + MegaNav, editorial hero (full-bleed `90vh`), 2×2 collection grid, new arrivals 4-col grid, footer
- `/products` — left filter panel (desktop), product grid
- `/products/[slug]` — image gallery + color/size selectors + add to cart
- Cart drawer always mounted in root layout

**Critical interactions:**
- `ProductCard`: hovering a color swatch = instant image swap to that colorway's images[0]. No transition. No animation.
- `PDP ColorSelector`: selecting a color changes the gallery images to that colorway's image array.
- Size selector: OOS sizes show strikethrough + `opacity: 0.4`. Never hidden.
- Cart drawer: Framer Motion, `280ms ease-out` from right.

**Absolute constraints:**
- Border-radius on buttons: `0px`
- Border-radius on product images: `0px`
- No accent color in the design system
- Sub-brand badge: only for TNA, Wilfred, Sunday Best, Auxiliary — not for Aritzia main line
- Swatch hex values are inline styles from data — never hardcode them in CSS
- No urgency language anywhere

---

### Category A — Bolt

Build a React + TypeScript premium fashion storefront. Vite, React 18, TypeScript, CSS Modules, Zustand, Framer Motion.

Reference aesthetic: Aritzia — pure white surfaces, near-black text, zero chromatic accent, instant swatch image swap.

**CSS custom properties in index.css:**
```css
:root {
  --color-bg: hsl(0deg 0% 100%);
  --color-bg-subtle: hsl(0deg 0% 97%);
  --color-text: hsl(0deg 0% 7%);
  --color-text-muted: hsl(0deg 0% 42%);
  --color-border: hsl(0deg 0% 88%);
  --color-sale: hsl(0deg 72% 45%);
}
```

**Components:**

`PromoBanner` — `height: 40px`, `background: var(--color-text)`, white `11px` uppercase text. `useState(dismissed)`. On dismiss: `max-height: 0; overflow: hidden` transition.

`ProductCard({ product })` — `aspect-ratio: 3/4`, no border-radius. State: `hoveredColor` (index). Color swatches: `12px` circles, `onMouseEnter` sets `hoveredColor`. Card image is `product.colors[hoveredColor ?? 0].images[0]` — no transition, instant update. Sub-brand badge if `product.brand !== 'Aritzia'`. Name `14px`. Price: if `salePrice` → red sale price + strikethrough original.

`CartDrawer` — Framer Motion `AnimatePresence`. `initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ duration: 0.28, ease: 'easeOut' }}`. Black backdrop. Free shipping: "$X more for free shipping" if subtotal < 200.

`ColorSelector({ colors, selected, onChange })` — swatch circles `24px`, active: `outline: 2px solid var(--color-text); outline-offset: 2px`. Hovering shows color name.

`SizeSelector({ sizes, selected, onChange })` — button grid. Selected: `background: var(--color-text); color: #fff`. OOS: `opacity: 0.4; text-decoration: line-through`. Border-radius: `0`.

`ImageGallery({ images })` — large image + thumbnail row. Click thumbnail updates main image. No carousel arrows, no auto-advance.

No Tailwind color classes. No `border-radius` on images or buttons. No urgency copy.

---

### Category A — v0

Create a Next.js 14 App Router premium fashion storefront. CSS Modules + CSS custom properties. No Tailwind, no shadcn. This is a custom design system.

**Design identity:** Aritzia — white canvas, near-black text, black CTAs, zero chromatic accent. Sharp corners everywhere. Fashion photography bleeds to the edge.

**globals.css:**
```css
:root {
  --color-bg: hsl(0deg 0% 100%);
  --color-bg-subtle: hsl(0deg 0% 97%);
  --color-text: hsl(0deg 0% 7%);
  --color-text-muted: hsl(0deg 0% 42%);
  --color-border: hsl(0deg 0% 88%);
  --color-sale: hsl(0deg 72% 45%);
}
* { box-sizing: border-box; margin: 0; }
body { background: var(--color-bg); color: var(--color-text); font-family: var(--font-inter); }
```

**Types (src/types/index.ts):**
```typescript
export type Brand = 'Aritzia' | 'TNA' | 'Wilfred' | 'Sunday Best' | 'Auxiliary'
export interface ColorVariant { name: string; swatch: string; images: string[]; inStock: boolean; sizes: { size: string; inStock: boolean; sku: string }[] }
export interface Product { id: string; slug: string; name: string; brand: Brand; category: string; price: number; salePrice?: number; colors: ColorVariant[]; isNew: boolean; isSale: boolean; featured: boolean }
export interface CartItem { productId: string; name: string; brand: Brand; price: number; color: ColorVariant; size: string; quantity: number; image: string }
```

**Key component CSS patterns:**

ProductCard:
```css
.card { position: relative; }
.imageWrapper { aspect-ratio: 3/4; overflow: hidden; }
.image { width: 100%; height: 100%; object-fit: cover; display: block; }
/* No border-radius anywhere */
.swatch { width: 12px; height: 12px; border-radius: 50%; border: 1px solid var(--color-border); cursor: pointer; }
.swatch.active { outline: 2px solid var(--color-text); outline-offset: 2px; }
.brandBadge { font-size: 10px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; color: var(--color-text-muted); }
.salePrice { color: var(--color-sale); }
.originalPrice { text-decoration: line-through; color: var(--color-text-muted); }
```

Button (add to cart, checkout):
```css
.button { background: var(--color-text); color: #fff; border: none; border-radius: 0; height: 48px; width: 100%; font-size: 13px; font-weight: 500; letter-spacing: 0.03em; cursor: pointer; }
.button:hover { background: hsl(0deg 0% 20%); }
```

Swatch image swap: handle in React state — `hoveredColor` index. JSX: `src={product.colors[hoveredColor ?? 0].images[0]}`. No CSS transition.

Build: src/app/page.tsx, src/app/products/page.tsx, src/app/products/[slug]/page.tsx. Zustand cart store. PromoBanner, MegaNav, CartDrawer always in root layout.

---

### Category B — Claude Artifacts

Build a premium fashion retail storefront. Next.js 14 App Router, TypeScript strict, CSS Modules + CSS custom properties, Zustand (cart), Framer Motion (animations).

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
│       ├── ColorSelector.tsx
│       ├── SizeSelector.tsx
│       └── ImageGallery.tsx
├── store/
│   └── cart.ts           # Zustand + persist
├── lib/
│   └── products.ts       # Mock product data (12 products)
└── types/
    └── index.ts
```

**globals.css (implement first):**
```css
:root {
  --color-bg:         hsl(0deg 0% 100%);
  --color-bg-subtle:  hsl(0deg 0% 97%);
  --color-text:       hsl(0deg 0% 7%);
  --color-text-muted: hsl(0deg 0% 42%);
  --color-border:     hsl(0deg 0% 88%);
  --color-sale:       hsl(0deg 72% 45%);
}
*, *::before, *::after { box-sizing: border-box; margin: 0; }
body { background: var(--color-bg); color: var(--color-text); font-family: var(--font-inter, Inter, sans-serif); }
```

**types/index.ts:**
```typescript
export type Brand = 'Aritzia' | 'TNA' | 'Wilfred' | 'Sunday Best' | 'Auxiliary'
export type Category = 'tops' | 'bottoms' | 'dresses' | 'outerwear' | 'knitwear' | 'shoes' | 'accessories'
export interface ColorVariant { name: string; swatch: string; images: string[]; inStock: boolean; sizes: SizeVariant[] }
export interface SizeVariant { size: string; inStock: boolean; sku: string }
export interface Product { id: string; slug: string; name: string; brand: Brand; category: Category; subcategory?: string; description: string; price: number; salePrice?: number; colors: ColorVariant[]; isNew: boolean; isSale: boolean; featured: boolean }
export interface CartItem { productId: string; name: string; brand: Brand; price: number; color: string; colorSwatch: string; size: string; quantity: number; image: string }
```

**store/cart.ts:** Zustand with `persist`. Items keyed by `productId + color + size`. `addItem` increments quantity if key exists. `subtotal` and `itemCount` as getters, not stored state.

**Critical interaction — swatch hover image swap:**
```typescript
// ProductCard.tsx
const [hoveredColorIndex, setHoveredColorIndex] = useState(0)
const displayImage = product.colors[hoveredColorIndex].images[0]

// On swatch mouseEnter: setHoveredColorIndex(index)
// Image src: displayImage — NO CSS transition on the img element
// Instant swap is the correct behavior
```

**Conventions:**
- All colors via CSS variables — never hardcode hex in component files
- Color swatch `background`: `style={{ background: color.swatch }}` — only place hex appears is as inline style from data
- Buttons: `border-radius: 0` — always
- Images: no border-radius on wrapper elements
- Sub-brand badge: render only if `product.brand !== 'Aritzia'`
- OOS sizes: `opacity: 0.4; text-decoration: line-through` — never `display: none`
- Cart minimum quantity: 1 — use remove button to delete, never decrement to 0
- No urgency copy anywhere

---

### Category B — Grok

Build a premium fashion storefront. Next.js 14 App Router, TypeScript strict, CSS Modules, Zustand. Reference: Aritzia.

**What to implement:**

`src/app/globals.css` — CSS tokens. Pure white bg, near-black text, 0 chromatic accents. Only sale red as color.

`src/types/index.ts` — `Brand` type, `ColorVariant`, `SizeVariant`, `Product`, `CartItem` interfaces.

`src/store/cart.ts` — Zustand cart, persisted, keyed by productId+color+size composite.

`src/components/layout/PromoBanner.tsx` — 40px black bar, dismissible, `max-height` collapse animation.

`src/components/layout/MegaNav.tsx` — 60px sticky. Logo + nav links + search/account/cart icons. Mobile: hamburger drawer.

`src/components/product/ProductCard.tsx` — Key behavior: `hoveredColorIndex` state. `onMouseEnter` swatch → update index. Image src = `product.colors[hoveredColorIndex].images[0]`. No img transition. Sub-brand badge if not Aritzia. Sale price in `var(--color-sale)` + strikethrough original.

`src/components/cart/CartDrawer.tsx` — Framer Motion, `280ms ease-out` from right. Black semi-transparent backdrop. Line items + quantity stepper + remove. Free shipping note.

`src/app/products/[slug]/page.tsx` — `generateStaticParams` from products data. `ColorSelector`: clicking color changes gallery images to that colorway's array. `SizeSelector`: all sizes shown, OOS = strikethrough opacity-40. "Add to Cart" disabled until color + size selected.

`src/lib/products.ts` — 12 mock products: at least 2 per sub-brand, covering 4+ categories. Each product: 2-3 colors, 3-4 images per color. Realistic names: "Effortless Pant", "TNA Boyfriend Tee", "Wilfred Wrap Dress".

Constraints: `border-radius: 0` on buttons and images. All colors via CSS variables. No urgency copy. No carousel.

---

### Category B — Gemini

Build a premium fashion e-commerce storefront. Framework: Next.js 14 App Router, TypeScript, CSS Modules + CSS custom properties. No Tailwind.

**Visual system:** Aritzia aesthetic — absolute monochromatic restraint. The photography is the design. The UI is nearly invisible.

6 color tokens total:
- `--color-bg: hsl(0deg 0% 100%)` — pure white
- `--color-bg-subtle: hsl(0deg 0% 97%)` — barely-there gray
- `--color-text: hsl(0deg 0% 7%)` — near-black (also: CTA button background)
- `--color-text-muted: hsl(0deg 0% 42%)` — metadata, labels
- `--color-border: hsl(0deg 0% 88%)` — all dividers
- `--color-sale: hsl(0deg 72% 45%)` — only for sale pricing

**Multi-brand data model:**
5 sub-brands: Aritzia (main, no badge), TNA (casual), Wilfred (feminine), Sunday Best (occasion), Auxiliary (accessories). Each product has a `brand` field and a `colors` array. Each color has its own image array (3-4 images showing that colorway on model).

**Pages:**

`/` — PromoBanner (dismissible, 40px black bar), MegaNav (60px sticky, logo + links + icons), editorial hero (full-bleed `90vh`, no text overlay or minimal overlay), 2×2 collection grid, new arrivals 4-col grid, footer.

`/products` — Left filter panel (desktop) with brand/category/size/color filters. Product grid 4-col. ProductCard with color swatch hover → instant image swap.

`/products/[slug]` — Image gallery (large + thumbnails, no carousel). Color selector (swatches + color name). Size selector (all sizes, OOS = strikethrough). "Add to Cart" button full-width black `48px`. Accordions: Details, Care, Delivery.

**Two rules above all others:**
1. `border-radius: 0` on all buttons and all image containers
2. Swatch hover on product cards changes the image **instantly** (no CSS transition, no opacity fade) — this is the premium fashion convention

Zustand cart store, persisted localStorage. Framer Motion cart drawer. `tsc --noEmit` zero errors.

---

### Category B — Cursor

In `src/`, implement a premium fashion storefront. Next.js 14, TypeScript strict, CSS Modules, Zustand already installed.

**Read first:** `src/app/globals.css` (6 color tokens), `src/types/index.ts` (Brand, ColorVariant, Product, CartItem), `src/store/cart.ts` (Zustand cart interface).

**Implement in this order:**
1. `src/app/globals.css` — 6 token variables, base reset, body font
2. `src/types/index.ts` — all interfaces
3. `src/store/cart.ts` — Zustand + persist, subtotal/itemCount as getters
4. `src/components/layout/PromoBanner.tsx` — dismissible black banner
5. `src/components/layout/MegaNav.tsx` — sticky 60px, logo/links/icons
6. `src/app/layout.tsx` — mount PromoBanner + MegaNav + CartDrawer
7. `src/components/product/ProductCard.tsx` — swatch hover image swap (instant, state-driven)
8. `src/components/cart/CartDrawer.tsx` — Framer Motion, backdrop
9. `src/app/page.tsx` — hero + collections + new arrivals
10. `src/app/products/page.tsx` — filter panel + grid
11. `src/app/products/[slug]/page.tsx` — gallery + selectors + add to cart

**ProductCard swatch hover — the key interaction:**
```typescript
const [activeColorIdx, setActiveColorIdx] = useState(0)
// src of main image:
const src = product.colors[activeColorIdx].images[0]
// On swatch mouseEnter:
// setActiveColorIdx(idx)
// NO transition on img element — instant swap
```

**PDP ColorSelector — syncs gallery:**
```typescript
const [selectedColor, setSelectedColor] = useState(product.colors[0])
// When color changes: setGalleryImages(selectedColor.images)
```

**CSS module conventions:**
```css
/* Always 0 radius on these: */
.productImageWrapper { aspect-ratio: 3/4; overflow: hidden; border-radius: 0; }
.button { border-radius: 0; background: var(--color-text); color: #fff; }
/* Swatches are the only circles: */
.swatch { border-radius: 50%; }
```

**12 seed products in `src/lib/products.ts`:** Cover all 5 sub-brands, 4+ categories, 2-3 colors each. Realistic names: "Effortless Pant", "Wilfred Babaton Cardigan", "TNA Boyfriend Tee". Prices $60–$350.

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
