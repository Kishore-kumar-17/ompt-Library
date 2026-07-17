---
prompt_id: ecomm_01
sub_category: E-commerce
sub_type: Fashion D2C Storefront
title: Natural Comfort — Sustainable Fashion Storefront
reference_patterns: product_first_layout, sustainability_narrative, editorial_grid
inspiration: allbirds.com
quality_score:
status: draft
notes:
---

## Base Prompt

### Section 1 — Role

You are a senior e-commerce product designer with 10+ years of experience building direct-to-consumer storefronts for sustainable fashion and lifestyle brands. You understand how D2C brands win — not through discount mechanics or urgency pressure, but through material storytelling, product photography, and a shopping experience that feels considered. You have designed storefronts for brands where the product itself is the hero, and the interface exists only to get out of the way.

---

### Section 2 — Application Overview

This is a direct-to-consumer e-commerce storefront for a sustainable footwear and apparel brand. The customer is an adult aged 25–45 who cares about what their purchases are made from, values comfort and everyday usability over fashion-trend chasing, and is willing to pay a premium for quality and ethics. They arrive from social or search already curious — the site does not need to explain what sustainability is, it needs to show craft and prove quality.

The store covers four pages: Homepage, Product Listing Page (PLP), Product Detail Page (PDP), and Cart Drawer. The primary goal is an "Add to Cart" action. Secondary goal is email capture for first-time visitors.

---

### Section 3 — Brand Voice & Mood

The feeling is natural, unhurried, and quietly confident. Like a well-made thing that does not need to announce itself. The brand is not loud about sustainability — it does not lecture. It shows through materials, photography, and copy that is short and specific.

Copy is warm but not gushing. Headlines name the material or the feeling — not aspirational abstractions. "Made from merino wool" not "Designed for the modern explorer." Sentences are short. No exclamation marks. No urgency language ("Limited time!" / "Only 3 left!"). No discount-bait.

The visual mood: bright, airy, lots of white space. Natural textures photographed in daylight. Nothing styled to look like a luxury fashion brand — this is premium everyday, not premium occasion.

Vibe word: natural.

---

### Section 4 — Core Features & Functionality

1. **Homepage** — hero with seasonal campaign image + headline, featured collection grid, brand story strip (material callouts), curated "best sellers" product row, sustainability values section, email capture, footer
2. **Product Listing Page (PLP)** — filterable grid (by category, color, size, material), sort dropdown, product cards with hover-to-second-image, color swatch selector per card, quick-add on hover
3. **Product Detail Page (PDP)** — full-bleed image gallery (scroll or tab), size selector with size guide link, color selector, Add to Cart CTA, material callout section, care instructions, "You may also like" row
4. **Cart Drawer** — slide-in from right, line items with image + name + size + color + quantity controls + remove, order subtotal, "Checkout" CTA, free shipping threshold progress bar

---

### Section 5 — Design Specifications

**Visual style:** Light, airy, product-photography-first. White and warm cream surfaces. Earth-tone accents. Zero decorative elements — every visual element is product or material photography.

**Color mode:** Light only.

**Color palette:**
- Background: `#FAFAF8` (warm white — not pure white, slight warmth)
- Surface / card: `#F2EFE9` (warm cream — used for cards and secondary sections)
- Border / divider: `rgba(28, 28, 26, 0.08)` (barely visible warm grey)
- Primary text: `#1C1C1A` (warm near-black — not pure black)
- Secondary text: `#6B6B6B` (mid grey — metadata, labels, descriptions)
- Tertiary text: `rgba(28, 28, 26, 0.35)` (used for placeholders and inactive states)
- Accent (CTA / interactive): `#0F7037` (forest green — brand signature)
- Accent hover: `#0A5C2B` (darker green on hover)
- Accent light (badge backgrounds): `#E8F5EE` (very light green for "New" and "Sustainable" badges)

**Total colors: 9 values, 5 functional categories. No additional colors.**

**Typography:** DM Sans throughout (Google Fonts, free).
- Display / hero heading: `clamp(36px, 5vw, 64px)`, weight 600, letter-spacing `-0.02em`, line-height 1.1
- Section heading (H2): `clamp(24px, 3vw, 36px)`, weight 600, letter-spacing `-0.01em`, line-height 1.15
- Product name (H3): `18px`, weight 500, letter-spacing `0`, line-height 1.3
- Body / description: `16px`, weight 400, letter-spacing `0`, line-height 1.65
- Small / metadata: `14px`, weight 400, letter-spacing `0`, line-height 1.5
- Label / badge: `11px`, weight 600, letter-spacing `0.06em`, line-height 1.4 (uppercase)
- Max line length body text: 64 characters

**Spacing:** 8pt base unit.
- Section vertical spacing: `96px` desktop, `64px` mobile
- Product grid gap: `24px` desktop, `16px` mobile
- Component internal padding: `24px` standard, `16px` compact
- Cart drawer width: `420px`

**Border radius:**
- Product image cards: `0px` (no rounding — images bleed to edge)
- Buttons: `4px` (subtle rounding — not pill, not sharp)
- Badges / chips: `3px`
- Inputs and dropdowns: `4px`

**Responsive:** Mobile-first. Breakpoints: `640px`, `768px`, `1024px`, `1280px`. Grid: 12-column, `1360px` max-width, `24px` gutters. Product grid: 4 columns desktop, 2 columns tablet, 1 column mobile.

**Accessibility:** WCAG AA minimum. All text on `#FAFAF8` must pass 4.5:1 contrast. Focus rings: `2px solid #0F7037` with `2px` offset. Full keyboard navigation on all interactive elements.

**Motion:**
- Cart drawer slide-in: `transform translateX(100%) → translateX(0)`, `300ms ease-out`
- Product image hover swap: `opacity 0.2s ease`
- Scroll-triggered section fade: `opacity 0 → 1`, `400ms ease-out`
- Forbidden: autoplay video, parallax, infinite scroll animations, bounce easing
- All animations respect `prefers-reduced-motion: reduce`

---

### Section 6 — Structure

**Architecture:** Multi-page storefront. This prompt covers: Homepage, PLP, PDP, and Cart Drawer.

**Homepage top to bottom:**

1. **Navigation bar** — sticky, `#FAFAF8` background, `1px` bottom border `rgba(28,28,26,0.08)`. Logo left (wordmark in `#1C1C1A`). Nav links center: Men, Women, Sale, Sustainability. Right: search icon, account icon, cart icon with item count badge. `64px` height desktop. Mobile: hamburger left, logo center, cart right.

2. **Hero** — full-width, `560px` height desktop. Campaign lifestyle image (model wearing product in natural setting). Headline overlaid: max 6 words, `clamp(36px,5vw,64px)` weight 600 `#1C1C1A`. Sub-line: 10 words max. One CTA: "Shop now" `bg-[#0F7037] text-white rounded-[4px] h-11 px-6 text-sm font-semibold`. No carousel. One image, one message.

3. **Featured collection strip** — full-width, `#F2EFE9` background. Section label `11px uppercase tracking-wide #6B6B6B`, H2 headline, 4-column product card grid. Each card: image (no border-radius), product name `18px weight-500`, price `16px`, color swatches row (5px diameter circles).

4. **Brand story strip** — 3-column, icon + headline + 2-line description. Icons are custom SVG (leaf, wool texture, carbon label). Background `#FAFAF8`. This is material education, not corporate values boilerplate.

5. **Best sellers row** — horizontal scroll on mobile, 4 cards desktop. Same card spec as featured collection.

6. **Sustainability section** — 2-column: left text (H2 + 3 lines body + "Learn more" text link), right full-bleed image of material or production process. `96px` vertical padding.

7. **Email capture** — centered, `#F2EFE9` background, `64px` vertical padding. H2 max 6 words. Input field + "Subscribe" button inline. "No spam. Unsubscribe any time." in tertiary text below. No pop-up — inline section only.

8. **Footer** — 4 columns: Shop, Help, Company, Social. Links `14px #6B6B6B` hover to `#1C1C1A`. Bottom row: copyright + payment icons (monochrome). `1px` top border.

**PLP structure:**
- Filter bar sticky below nav: category pills, color dots, size chips, sort dropdown
- 4-column product grid (desktop), 2-column (mobile)
- Product card: image (hover to second image), name, price, color swatches, "Quick add" ghost button on hover
- Load more button (not infinite scroll)

**PDP structure:**
- Left: image gallery (4 images, thumbnail strip below)
- Right: breadcrumb, product name H1, price, color selector (labeled swatches), size selector (button grid), size guide text link, "Add to Cart" primary button full-width, material callout section (accordion), care instructions (accordion), shipping info (accordion)
- Below fold: "You may also like" 4-card row

**Cart Drawer:**
- Overlay backdrop `rgba(0,0,0,0.35)`
- Drawer: `420px` wide, full height, `#FAFAF8` background, slide from right
- Header: "Cart (n)" + close X
- Line items: product image `72px square`, name + variant text, quantity stepper `−  2  +`, remove link
- Free shipping progress bar: `#E8F5EE` track, `#0F7037` fill, "You're $X away from free shipping" label
- Subtotal row + "Checkout" button full-width `bg-[#0F7037]`

---

### Section 7 — Technical Specifications

- **Framework:** Next.js 14 App Router, React 18, TypeScript strict mode
- **Styling:** Tailwind CSS v3 with CSS variables for all color tokens in `globals.css`
- **State:** Zustand for cart state (persisted to localStorage). No Redux.
- **Components:** Radix UI for dropdowns, dialogs, accordions. Custom components for product cards and cart drawer.
- **Images:** Next.js `<Image>` component throughout. All product images WebP. Aspect ratio `3:4` for product cards, `4:3` for lifestyle.
- **Icons:** Lucide — `size={18}` `strokeWidth={1.5}` only. Custom SVG for brand story icons.
- **Fonts:** DM Sans via `next/font/google` — preload weights 400, 500, 600.
- **Animation:** Framer Motion for cart drawer and scroll fades. Native CSS transitions for hover states.
- **Performance target:** Lighthouse 95+ all metrics. LCP under 2.5s. No layout shift from fonts.

---

### Section 8 — Implementation Steps

Build in this priority order:

1. **Design tokens** — set up CSS variables and Tailwind config first. Every color, spacing, and radius token defined before any component.
2. **Navigation + Cart Drawer** — present on every page. Cart state must work before product pages are useful.
3. **Homepage Hero + Featured Collection** — first impression. Pixel-perfect before moving on.
4. **PDP** — highest conversion value page. Size selector, color selector, Add to Cart must work correctly.
5. **PLP** — filter state, grid, hover states, quick-add.
6. **Brand Story + Sustainability sections** — static content, low effort.
7. **Email capture + Footer** — lowest priority, add last.

**Cut order if scope shrinks:** Email capture, sustainability section, PLP filters. Never cut PDP or cart drawer.

---

### Section 9 — User Experience

The visitor arrives from Instagram or a Google search. They already know the brand vaguely — they are not starting from zero. They are comparison-shopping: is this brand worth the price?

The first question they answer in the hero is visual: does this look like quality? The image does that work — the copy just needs to not get in the way.

If the hero passes, they go to the PLP. They scan the grid. They tap a product that catches their eye. The PDP is where the real decision happens. Size and color selection must be frictionless. The material callouts answer "why is this worth $130?" — they must be specific (not "premium materials" but "ZQ-certified merino wool from New Zealand farms").

The cart drawer must be fast and clear. Seeing the free shipping progress bar almost hit the threshold is the one acceptable conversion nudge. Everything else is information, not pressure.

Friction to remove: no size-guide pop-up blocking the page on load, no exit-intent pop-ups, no chat widget on mobile (it covers the Add to Cart button), no "You left something in your cart!" toast on first visit.

---

### Section 10 — Constraints

- **No pure white** — background is `#FAFAF8` (warm white). If it looks like a hospital, start over.
- **No sharp corners** — buttons are `4px` radius. Not `0px`, not `24px` pill.
- **No urgency language** — never write "Only X left in stock," "Sale ends in," or "Limited time offer." Not in the prompt, not in the generated copy.
- **No hero carousel** — one image, one message. Auto-advancing carousels reduce conversion on fashion storefronts.
- **No product images with border-radius** — images bleed to edge of card. Border-radius on cards looks cheap on fashion product photography.
- **No discount-first design** — sale pricing is displayed as strikethrough + new price. Never a big red badge unless in a designated Sale section.
- **No color additions** — 9 palette values are complete. No additional greens, no additional greys.
- **No placeholder Lorem Ipsum** — all text must be realistic product copy. If no real content is provided, use plausible D2C fashion copy ("Wool Runner — Men's", "$110", "Merino wool upper").
- **No infinite scroll** — "Load more" button on PLP. Infinite scroll breaks browser back-button behavior.
- **No mobile chat widget** — it covers the Add to Cart button. Remove or hide on screens below `768px`.

---

## Platform Versions

### Category A — Lovable

Build a sustainable fashion e-commerce storefront inspired by Allbirds. This is a direct-to-consumer footwear and apparel brand.

**Design system:**
Background `#FAFAF8`, card surface `#F2EFE9`, borders `rgba(28,28,26,0.08)`, primary text `#1C1C1A`, secondary text `#6B6B6B`, accent `#0F7037`. Font DM Sans (Google Fonts). Button radius `4px`. Section spacing `96px`. Product images no border-radius — bleed to card edge.

**Build these components in order:**

**Navigation** — sticky, `64px` height, `1px` bottom border. Logo wordmark left. Center links: Men, Women, Sale, Sustainability. Right: search icon, account icon, cart icon with item count. Mobile: hamburger left, logo center, cart right.

**Homepage Hero** — full-width `560px` tall. One lifestyle image (warm outdoor setting). Headline max 6 words `clamp(36px,5vw,64px)` weight 600. Sub-line 10 words. One CTA button: "Shop now" `bg-[#0F7037] text-white rounded-[4px] h-11 px-6 text-sm font-semibold`. No carousel.

**Featured Collection** — `#F2EFE9` background. Section label `11px uppercase tracking-wide #6B6B6B`. 4-column product grid (2 on mobile). Product card: image (3:4 aspect ratio, no border-radius), product name `18px weight-500 #1C1C1A`, price `16px #6B6B6B`, color swatch dots row.

**Brand Story Strip** — 3-column, icon + headline + 2 lines. Material-focused: wool, carbon, comfort. Not generic sustainability copy.

**Cart Drawer** — slide-in from right `420px` wide. Line items: image + name + variant + quantity stepper + remove. Free shipping progress bar (green fill). Subtotal + "Checkout" button.

**PDP** — left image gallery (4 images + thumbnail strip), right: product name H1, price, color selector, size button grid, "Add to Cart" full-width `bg-[#0F7037]`, material accordion, care accordion.

Copy: realistic product text only. No Lorem Ipsum. No urgency language. No carousel. No infinite scroll.

---

### Category A — ChatGPT Canvas

Build a full e-commerce storefront for a sustainable D2C fashion brand. Use React with TypeScript, Tailwind CSS, and Zustand for cart state.

The brand sells footwear and apparel made from natural materials (merino wool, eucalyptus, sugarcane). Target customer: 25–45 year old, values comfort and sustainability, willing to pay premium.

**Design:** Light and airy. Background `#FAFAF8`, surfaces `#F2EFE9`, accent green `#0F7037`, text `#1C1C1A`. Font: DM Sans from Google Fonts. Buttons `4px` radius. Images no border-radius.

**Pages to build:**
- `/` — Homepage: nav, hero, product grid, brand story, email capture, footer
- `/products` — PLP: filter bar, 4-column grid, product cards with hover states
- `/products/[slug]` — PDP: image gallery, size/color selectors, add to cart, material callouts
- Cart drawer component (accessible from any page via nav cart icon)

**Cart state (Zustand):**
```typescript
interface CartItem {
  id: string
  name: string
  price: number
  size: string
  color: string
  quantity: number
  image: string
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: CartItem) => void
  removeItem: (id: string, size: string, color: string) => void
  updateQuantity: (id: string, size: string, color: string, qty: number) => void
  toggleCart: () => void
}
```

Use realistic product data (not Lorem Ipsum). Use plausible names: "Wool Runner", "Tree Dasher", "Natural Dye Tee". Prices `$95`–`$145`. Material descriptions must be specific: "ZQ-certified merino wool" not "premium materials."

Free shipping threshold: `$100`. Show progress bar in cart drawer. No urgency copy. No carousel. No infinite scroll on PLP.

---

### Category A — Bolt

Build a React + TypeScript application using Vite and Tailwind CSS. This is a D2C sustainable fashion storefront.

**Tech:** Vite, React 18, TypeScript, Tailwind CSS, Zustand (cart state), Framer Motion (cart drawer animation).

**Design tokens in tailwind.config.ts:**
```typescript
colors: {
  bg: { primary: '#FAFAF8', surface: '#F2EFE9' },
  text: { primary: '#1C1C1A', secondary: '#6B6B6B', tertiary: 'rgba(28,28,26,0.35)' },
  border: 'rgba(28,28,26,0.08)',
  accent: { DEFAULT: '#0F7037', hover: '#0A5C2B', light: '#E8F5EE' },
}
```

**Components:**

`Navbar` — sticky, `h-16`, `border-b border-[rgba(28,28,26,0.08)]`. Logo left. Links center. Search + account + cart icons right with cart count badge.

`Hero` — `h-[560px]` relative. Background image with object-cover. Text overlay left-aligned. Headline `text-[clamp(36px,5vw,64px)] font-semibold tracking-tight leading-[1.1]`. CTA `bg-[#0F7037] text-white rounded-[4px] h-11 px-6 text-sm font-semibold`.

`ProductCard` — accepts `{ name, price, colors, images: [string, string] }`. Image `aspect-[3/4]` no border-radius. Hover swaps to `images[1]` with `opacity` transition `0.2s`. Color swatches `w-[14px] h-[14px] rounded-full border border-black/10`. Quick-add ghost button appears on hover.

`CartDrawer` — Framer Motion `AnimatePresence`. Drawer `w-[420px] h-screen fixed right-0 top-0 bg-[#FAFAF8]`. Backdrop `bg-black/35`. Free shipping bar: `div` with `bg-[#E8F5EE]` track, `bg-[#0F7037]` fill, width as `${(subtotal/100)*100}%`.

`PDP` — left `grid` image gallery with thumbnails. Right: size buttons `border border-[rgba(28,28,26,0.08)] rounded-[4px] h-10 px-4 text-sm`, selected state `border-[#0F7037] bg-[#E8F5EE]`. Add to Cart `w-full bg-[#0F7037] text-white rounded-[4px] h-12 font-semibold`.

No Lorem Ipsum. No carousel. No urgency copy. No infinite scroll. Gate all Framer Motion with `useReducedMotion()`.

---

### Category A — v0

Create a Next.js 14 App Router sustainable fashion e-commerce storefront. Use Tailwind CSS, shadcn/ui, and Radix UI primitives.

**Globals.css tokens:**
```css
:root {
  --bg-primary: #FAFAF8;
  --bg-surface: #F2EFE9;
  --border: rgba(28, 28, 26, 0.08);
  --text-primary: #1C1C1A;
  --text-secondary: #6B6B6B;
  --text-tertiary: rgba(28, 28, 26, 0.35);
  --accent: #0F7037;
  --accent-hover: #0A5C2B;
  --accent-light: #E8F5EE;
}
```

**Component specs:**

`<Navbar />` — sticky, `h-16 border-b border-[var(--border)] bg-[var(--bg-primary)]`. Logo left. shadcn NavigationMenu center links. Icons right: `<Search />` `<User />` `<ShoppingBag />` all Lucide `size={18} strokeWidth={1.5}`. Cart count: `absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[var(--accent)] text-white text-[10px] flex items-center justify-center`.

`<Hero />` — `relative h-[560px]`. `<Image fill objectFit="cover" priority>`. Text `absolute left-16 bottom-16`. CTA `bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white rounded-[4px] h-11 px-6 text-sm font-semibold transition-colors duration-150`.

`<ProductCard />` — `group cursor-pointer`. Image `aspect-[3/4] overflow-hidden` — no border-radius. Second image on `group-hover:opacity-100 opacity-0 transition-opacity duration-200 absolute inset-0`. Color swatches `flex gap-1.5 mt-2`. Name `text-base font-medium mt-3`. Price `text-sm text-[var(--text-secondary)]`.

`<CartDrawer />` — Radix Dialog. Slide from right with `data-[state=open]:animate-in data-[state=closed]:animate-out slide-in-from-right slide-out-to-right duration-300`. Free shipping progress: `<Progress>` from shadcn with `bg-[var(--accent)]`.

`<SizeSelector />` — `grid grid-cols-4 gap-2`. Each: `border border-[var(--border)] rounded-[4px] h-10 text-sm font-medium`. Selected: `border-[var(--accent)] bg-[var(--accent-light)]`. Disabled: `opacity-40 cursor-not-allowed line-through`.

No hardcoded hex in JSX — CSS variables only. No Lorem Ipsum. No urgency copy. All images via `next/image`. DM Sans via `next/font/google`.

---

### Category B — Claude Artifacts

You are building a D2C sustainable fashion e-commerce storefront. This is a Next.js 14 App Router project with TypeScript strict mode, Tailwind CSS, Zustand, and Framer Motion already installed.

**Project folder structure:**
```
src/
├── app/
│   ├── layout.tsx           # Root layout: Navbar + CartDrawer always mounted
│   ├── page.tsx             # Homepage
│   ├── globals.css          # CSS variables + base styles
│   ├── products/
│   │   ├── page.tsx         # PLP
│   │   └── [slug]/
│   │       └── page.tsx     # PDP
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── cart/
│   │   ├── CartDrawer.tsx
│   │   ├── CartItem.tsx
│   │   └── ShippingProgress.tsx
│   ├── product/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ImageGallery.tsx
│   │   ├── SizeSelector.tsx
│   │   ├── ColorSelector.tsx
│   │   └── AddToCartButton.tsx
│   └── home/
│       ├── Hero.tsx
│       ├── FeaturedCollection.tsx
│       ├── BrandStoryStrip.tsx
│       └── EmailCapture.tsx
├── store/
│   └── cart.ts              # Zustand cart store
├── lib/
│   ├── motion.ts            # Framer Motion variants
│   └── products.ts          # Mock product data
└── types/
    └── index.ts             # Shared types
```

**globals.css (define first, use everywhere):**
```css
:root {
  --bg-primary: #FAFAF8;
  --bg-surface: #F2EFE9;
  --border: rgba(28, 28, 26, 0.08);
  --text-primary: #1C1C1A;
  --text-secondary: #6B6B6B;
  --text-tertiary: rgba(28, 28, 26, 0.35);
  --accent: #0F7037;
  --accent-hover: #0A5C2B;
  --accent-light: #E8F5EE;
}
body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: 'DM Sans', sans-serif;
}
```

**types/index.ts:**
```typescript
export interface Product {
  id: string
  slug: string
  name: string
  price: number
  colors: { name: string; hex: string }[]
  sizes: string[]
  images: string[]
  category: 'footwear' | 'apparel'
  material: string
  materialDetail: string
  badge?: 'new' | 'bestseller'
}

export interface CartItem {
  productId: string
  name: string
  price: number
  size: string
  color: string
  quantity: number
  image: string
}
```

**store/cart.ts:**
```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem } from '@/types'

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: CartItem) => void
  removeItem: (productId: string, size: string, color: string) => void
  updateQuantity: (productId: string, size: string, color: string, qty: number) => void
  toggleCart: () => void
  closeCart: () => void
  get subtotal(): number
  get itemCount(): number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      addItem: (item) => set((state) => {
        const existing = state.items.find(
          i => i.productId === item.productId && i.size === item.size && i.color === item.color
        )
        if (existing) {
          return { items: state.items.map(i =>
            i.productId === item.productId && i.size === item.size && i.color === item.color
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )}
        }
        return { items: [...state.items, item] }
      }),
      removeItem: (productId, size, color) => set((state) => ({
        items: state.items.filter(i => !(i.productId === productId && i.size === size && i.color === color))
      })),
      updateQuantity: (productId, size, color, qty) => set((state) => ({
        items: qty <= 0
          ? state.items.filter(i => !(i.productId === productId && i.size === size && i.color === color))
          : state.items.map(i =>
            i.productId === productId && i.size === size && i.color === color
              ? { ...i, quantity: qty }
              : i
          )
      })),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
      closeCart: () => set({ isOpen: false }),
      get subtotal() { return get().items.reduce((sum, i) => sum + i.price * i.quantity, 0) },
      get itemCount() { return get().items.reduce((sum, i) => sum + i.quantity, 0) },
    }),
    { name: 'cart-storage' }
  )
)
```

**Conventions to follow:**
- All colors via CSS variables — never hardcode hex in components
- Buttons always: `rounded-[4px]` — never `rounded-full` or `rounded-none`
- Product images always: `aspect-[3/4]` with `object-cover` — no border-radius on the image wrapper
- Body text color: `text-[var(--text-primary)]` — never `text-black` or `text-gray-900`
- Section padding: `py-24` desktop, `py-16` mobile (Tailwind responsive)
- Font loading: DM Sans via `next/font/google` in root layout, applied to `body`
- Cart drawer: always rendered in root layout, visibility controlled by Zustand `isOpen`

**Mistakes to avoid:**
- Do not use `bg-white` — use `bg-[var(--bg-primary)]`
- Do not add urgency copy ("Only 3 left!") — it contradicts brand voice
- Do not use `rounded-full` on buttons — this is not a pill-button brand
- Do not put border-radius on product image wrappers
- Do not use `text-gray-*` Tailwind classes — use CSS variables
- Size selector disabled state: `opacity-40 cursor-not-allowed` + strikethrough, never hide
- Cart item quantity minimum is 1, not 0 — use remove button to delete a line item
- Free shipping threshold is `$100` — progress bar fills from 0 to 100

---

### Category B — Grok

Build a D2C sustainable fashion e-commerce storefront using Next.js 14, TypeScript strict, Tailwind CSS, and Zustand.

**Context:** This is a storefront for a sustainable footwear and apparel brand. Products are made from natural materials (merino wool, eucalyptus, sugarcane). Price range $95–$145. Target customer: 25–45, premium-casual buyer.

**What to build:**
- `app/page.tsx` — Homepage: Hero, FeaturedCollection, BrandStoryStrip, EmailCapture
- `app/products/page.tsx` — PLP: FilterBar, ProductGrid
- `app/products/[slug]/page.tsx` — PDP: ImageGallery, SizeSelector, ColorSelector, AddToCart, MaterialAccordion
- `components/cart/CartDrawer.tsx` — Slide-in cart, always mounted in root layout

**Design tokens (globals.css, set up first):**
- `--bg-primary: #FAFAF8` | `--bg-surface: #F2EFE9` | `--border: rgba(28,28,26,0.08)`
- `--text-primary: #1C1C1A` | `--text-secondary: #6B6B6B` | `--accent: #0F7037` | `--accent-hover: #0A5C2B` | `--accent-light: #E8F5EE`

**Cart state:** Zustand store persisted to localStorage. Cart items keyed by `productId + size + color`. Adding existing key increments quantity. Subtotal and itemCount are derived values, not stored state.

**Key component behaviors:**
- ProductCard: hover swaps image via `opacity` transition (not display toggle). Color swatches are `14px` circle buttons, clicking changes the displayed image set.
- SizeSelector: renders all sizes. Out of stock sizes show `opacity-40` with `line-through`, remain clickable to show "notify me" state — never hidden.
- CartDrawer: Framer Motion slide from right `300ms ease-out`. Backdrop closes on click. Free shipping progress bar with `$100` threshold.
- AddToCart: disabled until both size and color are selected. Shows "Select a size" validation text if submitted without size.

**Copy rules:** Product names like "Wool Runner — Men's". Material descriptions must be specific ("ZQ-certified merino wool" not "premium materials"). No urgency copy. No Lorem Ipsum.

**Do not use:** `bg-white`, `text-black`, `rounded-full` on buttons, border-radius on product images, infinite scroll, carousel, hardcoded hex colors in JSX.

---

### Category B — Gemini

Build a sustainable fashion e-commerce storefront. The brand sells footwear and apparel made from natural materials. Products cost $95–$145. Customers value quality and sustainability over trend.

**Tech stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, Zustand for cart state.

**Pages:**
1. Homepage — hero image + headline, 4-column product grid section, 3-column brand story strip (material callouts), email signup, footer
2. Product listing page — filter bar (category, color, size), 4-column grid, product cards
3. Product detail page — image gallery left, product info right (name, price, color selector, size selector, add to cart button, material accordion)
4. Cart drawer — slide-in from right, line items, free shipping progress, checkout button

**Visual system:**
- Background: `#FAFAF8` (warm white)
- Cards and secondary sections: `#F2EFE9` (warm cream)
- Borders: `rgba(28,28,26,0.08)` (barely visible)
- Primary text: `#1C1C1A`
- Secondary text: `#6B6B6B`
- Brand accent / CTA: `#0F7037` (forest green)
- Font: DM Sans (Google Fonts)
- Button radius: `4px` — not pill, not sharp
- Product image aspect ratio: `3:4`, no border-radius on image containers
- Section spacing: `96px` desktop

**Specific behaviors:**
- Color and size selectors on PDP must be functional — selecting triggers image change (color) or highlights selection (size)
- Out-of-stock sizes: visible but disabled with strikethrough, not hidden
- Cart: Zustand store, persisted localStorage, supports quantity update and remove
- Free shipping threshold: $100, shown as progress bar in cart drawer
- Hover on product card: second image fades in with `opacity` transition

**Rules:**
- No Lorem Ipsum — use realistic product copy
- No urgency language anywhere
- No auto-advancing carousels
- No infinite scroll — "Load more" button on PLP
- No pure white (`#FFFFFF`) — use `#FAFAF8` throughout
- All colors via CSS variables, not hardcoded in JSX

---

### Category B — Cursor

In `src/app/`, implement a D2C sustainable fashion storefront. Next.js 14 App Router, TypeScript strict, Tailwind CSS, Zustand already installed.

**Read first:** `src/app/globals.css` for design tokens, `src/types/index.ts` for `Product` and `CartItem` types, `src/store/cart.ts` for Zustand cart store interface.

**File implementation order:**
1. `src/app/globals.css` — CSS variables (do this first, everything else depends on it)
2. `src/store/cart.ts` — Zustand cart store with persist middleware
3. `src/types/index.ts` — Product, CartItem interfaces
4. `src/components/cart/CartDrawer.tsx` — Framer Motion slide-in, always mounted in root layout
5. `src/components/layout/Navbar.tsx` — sticky nav with cart icon + live item count
6. `src/app/layout.tsx` — mount Navbar + CartDrawer
7. `src/components/product/ProductCard.tsx` — image swap on hover, color swatches, quick-add
8. `src/app/page.tsx` — homepage (Hero, FeaturedCollection, BrandStoryStrip, EmailCapture)
9. `src/app/products/page.tsx` — PLP with filter bar + ProductGrid
10. `src/app/products/[slug]/page.tsx` — PDP with ImageGallery + selectors + AddToCart

**CSS variable conventions:**
```css
/* Always use these — never use Tailwind color classes for brand colors */
var(--bg-primary)      /* #FAFAF8 — main background */
var(--bg-surface)      /* #F2EFE9 — cards, secondary sections */
var(--border)          /* rgba(28,28,26,0.08) — all dividers */
var(--text-primary)    /* #1C1C1A — headlines, body */
var(--text-secondary)  /* #6B6B6B — metadata, labels */
var(--accent)          /* #0F7037 — CTA buttons, active states */
var(--accent-hover)    /* #0A5C2B — button hover */
var(--accent-light)    /* #E8F5EE — badge backgrounds, selected state bg */
```

**Component contracts:**
```typescript
// ProductCard
interface ProductCardProps {
  product: Product
  onQuickAdd?: (product: Product) => void
}

// SizeSelector
interface SizeSelectorProps {
  sizes: string[]
  outOfStock: string[]
  selected: string | null
  onChange: (size: string) => void
}

// CartDrawer — receives no props; reads from Zustand
// ImageGallery
interface ImageGalleryProps {
  images: string[]
  alt: string
}
```

**Motion variants (lib/motion.ts):**
```typescript
export const fadeInUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
}
export const cartDrawer = {
  hidden: { x: '100%' },
  visible: { x: 0, transition: { duration: 0.3, ease: 'easeOut' } }
}
```

**Absolute rules:**
- Never use `bg-white`, `bg-gray-*`, `text-black`, `text-gray-*` in components
- Never add border-radius to product image wrapper elements
- Button radius is always `rounded-[4px]` — no exceptions
- Cart quantity minimum display is 1 — use remove button (×) to delete
- Out-of-stock sizes: `opacity-40 line-through cursor-not-allowed` — never `hidden`
- Gate all Framer Motion with `const prefersReduced = useReducedMotion()` — skip animation if true
- `useCartStore()` is the only way to access cart state — never local useState for cart

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
