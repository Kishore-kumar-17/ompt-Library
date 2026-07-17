---
prompt_id: ecomm_02
sub_category: E-commerce
sub_type: Health Food D2C Storefront
title: Nothing To Hide — Clean Ingredient Food Brand
reference_patterns: radical_transparency, bold_playful_palette, ingredient_first_pdp
inspiration: thewholetruthfoods.com
quality_score:
status: draft
notes:
---

## Base Prompt

### Section 1 — Role

You are a senior e-commerce product designer with 10+ years of experience building direct-to-consumer storefronts for health and wellness food brands. You understand how clean-food D2C brands win — not through clinical nutrition charts or gym-adjacent aesthetics, but through radical ingredient transparency, a brand voice that feels like a friend who happens to know a lot about food, and a shopping experience that makes buying protein bars feel honest and uncomplicated. You have designed storefronts where the ingredient list is the hero, and the product speaks for itself.

---

### Section 2 — Application Overview

This is a direct-to-consumer e-commerce storefront for a clean-ingredient food brand. The brand sells protein bars, protein powders, and healthy snacks made with declared, recognisable ingredients — no hidden additives, no proprietary blends, no BS. The customer is a health-aware adult aged 22–38 who has been burned by misleading food labels and wants to actually know what they are eating. They are not necessarily a gym-goer — they are an everyday person who wants food they can trust.

The store covers four pages: Homepage, Product Listing Page (PLP), Product Detail Page (PDP), and Cart Drawer. The primary goal is "Add to Cart." The secondary goal is newsletter signup for new customers. The brand philosophy — "#nothingtohide" — must be felt at every touchpoint.

---

### Section 3 — Brand Voice & Mood

The feeling is honest, direct, and unexpectedly fun. This brand does not take itself seriously in the way health food brands usually do. No aspirational athlete imagery. No clinical language. No green-leaf-on-white-background wellness clichés.

Copy is conversational, occasionally cheeky, and always specific. "Protein bar. 20g protein. 0g added sugar. 11 ingredients. No BS." — not "Fuel your day with clean nutrition." Sentences are short. Punctuation is used for rhythm, not grammar. The brand talks like a person, not a company.

Brand voice: transparent, irreverent, warm. The vibe: a friend who has read every label so you don't have to.

Visual mood: Bold, colourful, slightly maximalist. This is not minimal — it uses large type, bright section backgrounds, and personality-forward layout. Each product category can have its own background colour. The site feels energetic but not chaotic.

Vibe word: honest.

---

### Section 4 — Core Features & Functionality

1. **Homepage** — hero with bold brand statement, product category tiles, "what's in it" transparency section, customer love wall (testimonials), press bar, newsletter signup, footer
2. **Product Listing Page (PLP)** — filterable grid by product type (bars, powders, snacks), flavour, dietary tag (vegan, gluten-free); product cards with flavour selector, quick-add
3. **Product Detail Page (PDP)** — image gallery, flavour selector, pack size selector, "Add to Cart," ingredient list panel (primary feature — full declared ingredient list, not an accordion), nutrition facts table, how-to-use section, customer reviews
4. **Cart Drawer** — slide-in from right, line items with flavour + pack size, quantity controls, free delivery threshold progress bar, checkout CTA

---

### Section 5 — Design Specifications

**Visual style:** Bold, honest, and colourful. Large type. Distinctive section background colours. Product photography on white or brand-colour backgrounds. No lifestyle stock photography — product-forward always.

**Color mode:** Light only.

**Color palette:**
- Background: `#FFFFFF` (pure white — hero and PDP)
- Section warm: `#F4EBEF` (soft pink-beige — alternating sections, nav dropdowns)
- Section lavender: `#E5E4F2` (muted purple — product category sections)
- Primary text: `#0D0D0D` (near-black)
- Secondary text: `#6B6B6B` (mid grey — metadata, descriptions)
- Tertiary text: `rgba(13, 13, 13, 0.35)` (placeholders, inactive)
- CTA / interactive: `#5048D5` (brand purple — primary buttons, links, icons)
- CTA hover: `#3D38C2` (deeper purple)
- Accent: `#93385D` (mauve — secondary actions, badges, highlights)
- Accent light: `#F8DEE7` (pale pink — badge backgrounds, hover fills)

**Total colors: 10 values. No additional colors.**

**Typography:** Space Grotesk (Google Fonts) for display and headings; DM Sans for body and UI. Both free.
- Display / hero: `clamp(40px, 6vw, 80px)`, weight 700, letter-spacing `-0.03em`, line-height 1.0
- Section heading (H2): `clamp(28px, 4vw, 48px)`, weight 700, letter-spacing `-0.02em`, line-height 1.1
- Product name (H3): `20px`, weight 600, letter-spacing `-0.01em`, line-height 1.25
- Body / description: `16px` DM Sans weight 400, letter-spacing `0`, line-height 1.65
- Small / metadata: `14px` DM Sans weight 400, line-height 1.5
- Label / badge: `11px` DM Sans weight 700, letter-spacing `0.06em`, uppercase
- Ingredient text: `14px` DM Sans weight 400, line-height 1.8 (needs breathing room)
- Max line length body text: 60 characters

**Spacing:** 8pt base unit.
- Section vertical spacing: `80px` desktop, `56px` mobile
- Product grid gap: `20px` desktop, `16px` mobile
- Card padding: `20px`
- Cart drawer width: `400px`

**Border radius:**
- Buttons: `100px` (full pill — this brand uses pill buttons)
- Product cards: `16px`
- Badges: `100px` (pill)
- Inputs: `12px`
- Ingredient list container: `16px`

**Responsive:** Mobile-first. Breakpoints: `640px`, `768px`, `1024px`, `1280px`. Grid: 12-column, `1280px` max-width, `24px` gutters. Product grid: 3 columns desktop, 2 tablet, 2 mobile.

**Accessibility:** WCAG AA. Purple `#5048D5` on white must pass 4.5:1 (it does — ratio 5.1:1). Focus rings: `2px solid #5048D5` with `2px` offset. Full keyboard navigation.

**Motion:**
- Cart drawer slide: `translateX(100%) → translateX(0)`, `280ms ease-out`
- Section fade on scroll: `opacity 0 → 1`, `y 20 → 0`, `350ms ease-out`
- Flavour switch image transition: `opacity 0.15s ease`
- Forbidden: autoplay video, parallax, continuous loops
- All animations respect `prefers-reduced-motion: reduce`

---

### Section 6 — Structure

**Architecture:** Multi-page storefront. This prompt covers Homepage, PLP, PDP, and Cart Drawer.

**Homepage top to bottom:**

1. **Announcement bar** — full-width, `#5048D5` background, white text. "Free delivery on orders above ₹499 · COD available · #nothingtohide" — scrolling marquee on mobile, static centered on desktop.

2. **Navigation bar** — sticky, white background, `1px` bottom border `rgba(13,13,13,0.08)`. Logo left (wordmark, bold). Nav links center: Shop, About, Blog, #nothingtohide. Right: search icon, account icon, cart icon with count. `64px` height. Mobile: hamburger left, logo center, cart right.

3. **Hero** — full-width, white background. Left column: large display headline (brand statement, max 8 words), 2-line subhead, one CTA pill button "Shop now" `bg-[#5048D5]`. Right column: product flatlay image or pack shot. Not a lifestyle photo — the product is the hero. `120px` vertical padding.

4. **Product category tiles** — `#E5E4F2` background, 4-column grid (Protein Bars, Protein Powder, Healthy Snacks, BYOB). Each tile: product image, category name `20px weight-600`, "Shop →" link. `80px` vertical padding.

5. **"What's in it" transparency section** — `#F4EBEF` background. H2: "Every. Single. Ingredient. Declared." Left: brand statement copy (3–4 short lines). Right: ingredient list of a real product displayed as plain text in a `#FFFFFF` rounded card. `#nothingtohide` badge. `80px` vertical padding.

6. **Best sellers row** — white background. H2 "Our favourites." 3-column product card grid. Same card spec as PLP.

7. **Customer love wall** — `#F4EBEF` background. H2 "Real people. Real results." 3-column testimonial cards: avatar, name, product purchased, quote. No star ratings — quotes only.

8. **Press bar** — white background. "As seen in" + publication logos in `rgba(13,13,13,0.30)`. Monochrome only.

9. **Newsletter section** — `#5048D5` background, white text. H2 max 5 words. Subline 1 sentence. Email input + "Join" pill button (white bg, purple text). No pop-up — inline only.

10. **Footer** — white background. 4 columns: Shop, Company, Help, Connect. Links `14px #6B6B6B`. Copyright bottom. `1px` top border.

**PLP structure:**
- Filter bar: product type pills, flavour dots, dietary tags (Vegan, Gluten-free, High Protein)
- 3-column product grid (2 on mobile)
- Product card: image `16px` radius, name, flavour, price, flavour swatch row, "Add to Cart" pill button on hover
- Load more button

**PDP structure:**
- Left: image gallery (3–4 images per flavour, changes on flavour select)
- Right:
  - Product name H1, short tagline
  - Flavour selector (labelled pills, not dots)
  - Pack size selector (single / 6-pack / 12-pack)
  - Price (pack-size-dependent)
  - "Add to Cart" full-width pill button
  - Ingredient list panel — NOT an accordion. Always visible. Full declared ingredient list in a white card with `16px` radius, `20px` padding, `14px` line-height 1.8. Header: "What's in it. Everything. No exceptions."
  - Nutrition facts table — accordion (collapsible)
  - How to use — accordion
  - Reviews — section below fold

**Cart Drawer:**
- Slide-in right, `400px` wide, white background
- Header: "Your cart (n)" + close
- Line items: product image `72px`, name, flavour, pack size, quantity stepper, remove
- Free delivery bar: threshold ₹499 (or $50 for USD), green fill when reached
- "Checkout" full-width pill button `bg-[#5048D5]`

---

### Section 7 — Technical Specifications

- **Framework:** Next.js 14 App Router, TypeScript strict
- **Styling:** Tailwind CSS v3 with CSS variables in `globals.css`
- **State:** Zustand cart store, persisted to localStorage
- **Components:** Radix UI for dropdowns, accordions. Custom for all product-specific components.
- **Images:** Next.js `<Image>` throughout. Product images WebP, `4:4` square ratio (food photography is square). Announcement bar: no images.
- **Icons:** Lucide — `size={18}` `strokeWidth={1.5}` only
- **Fonts:** Space Grotesk + DM Sans via `next/font/google`
- **Animation:** Framer Motion for cart drawer. Native CSS for hover/flavour transitions.
- **Performance:** Lighthouse 95+ all metrics

---

### Section 8 — Implementation Steps

Build in this order:

1. **Design tokens + fonts** — CSS variables, Tailwind config, Space Grotesk + DM Sans loaded
2. **Navbar + Announcement bar** — present on every page, set the brand tone immediately
3. **Cart Drawer + Zustand store** — must work before any product page is useful
4. **Homepage Hero + Category tiles** — first impression
5. **PDP** — ingredient list panel is the most important feature, build this carefully
6. **PLP** — product grid, filter bar
7. **Transparency section + Testimonials** — brand story content
8. **Newsletter + Footer** — last

**Cut order if scope shrinks:** Newsletter section, press bar, testimonials. Never cut PDP ingredient list — it is the core brand feature.

---

### Section 9 — User Experience

The visitor arrives sceptical — they have been lied to by food labels before. They want to trust something. The brand's job is to prove it deserves that trust within the first scroll.

The hero must communicate the core promise instantly: this brand hides nothing. The headline does not sell a feeling — it states a fact about the product. The "What's in it" section is the emotional centre of the site — when a visitor sees a real ingredient list with real ingredient names (not "proprietary blend"), something clicks.

On the PDP, the ingredient list must not be hidden behind an accordion. It is the first thing after Add to Cart. The visitor who is on the fence about buying is there to read that list. If they have to click to find it, they leave.

The cart and checkout must be fast. This customer is not impulse-buying — they have made a considered decision. Once they click Add to Cart, get out of the way and let them complete the purchase. No upsell pop-ups. No "wait, before you go" modals.

Friction to remove: no "complete your profile" prompts, no forced account creation, no video autoplaying in the hero, no announcement bar that takes 3 clicks to close.

---

### Section 10 — Constraints

- **No gym-bro aesthetic** — no before/after imagery, no shirtless models, no "gains" language. This brand is for everyday people.
- **No green-leaf wellness clichés** — no leaf icons on white backgrounds, no "natural" as a badge word, no clean eating moralising.
- **No pill buttons on product images** — pill radius is for buttons only. Product cards use `16px` radius. Images no border-radius.
- **No hidden ingredient lists** — the ingredient panel on PDP is always visible, never inside an accordion. This is non-negotiable.
- **No fake health claims** — copy must be factual. "20g protein per bar" yes. "Transforms your metabolism" no.
- **No stock photography** — product pack shots only. If no real images, use flat-colour placeholder with product name text.
- **No star ratings in testimonials section** — quotes only. Stars feel manufactured.
- **No extra colours** — 10 palette values complete. No additional purples, pinks, or greens.
- **No auto-advancing carousels** — product image gallery is static tab/click. No timer.
- **No forced account creation** — guest checkout must always be available.

---

## Platform Versions

### Category A — Lovable

Build a clean-ingredient health food D2C storefront inspired by brands like The Whole Truth Foods.

**Design system:**
Background `#FFFFFF`, warm section bg `#F4EBEF`, lavender section `#E5E4F2`, primary text `#0D0D0D`, secondary text `#6B6B6B`, CTA purple `#5048D5` hover `#3D38C2`, accent mauve `#93385D`. Font: Space Grotesk (display, headings) + DM Sans (body). Buttons: `rounded-full` (pill). Product cards: `16px` radius. Section spacing `80px`.

**Build these in order:**

**Announcement bar** — full-width, `#5048D5` bg, white text `14px DM Sans`. "Free delivery on orders above ₹499 · COD available · #nothingtohide" centered.

**Navigation** — sticky, white, `1px` bottom border. Logo left (wordmark bold). Center links: Shop, About, Blog. Right: search, account, cart icons + count badge. Mobile: hamburger + logo + cart.

**Hero** — 2-column, white bg, `120px` vertical padding. Left: display headline max 8 words `clamp(40px,6vw,80px)` Space Grotesk weight 700 tracking `-0.03em` `#0D0D0D`. Subline 2 lines `16px DM Sans #6B6B6B`. CTA pill: `bg-[#5048D5] text-white rounded-full h-12 px-8 text-sm font-semibold`. Right: product pack shot image.

**Category tiles** — `#E5E4F2` background, 4-column grid. Each tile: product image, category name `20px Space Grotesk weight-600`, "Shop →" link in `#5048D5`.

**"What's in it" section** — `#F4EBEF` background. H2 "Every. Single. Ingredient. Declared." Left: short brand copy. Right: ingredient list in white card `16px` radius, `20px` padding, `14px DM Sans` line-height `1.8`. `#nothingtohide` pill badge `bg-[#5048D5] text-white rounded-full px-3 py-1 text-xs`.

**Product card** — `16px` radius, white bg, border `rgba(13,13,13,0.08)`. Image (square 1:1) at top. Below: product name `18px Space Grotesk weight-600`, flavour `14px DM Sans #6B6B6B`, price `16px weight-600 #5048D5`. Flavour pill swatches row. "Add to Cart" pill button on hover.

**PDP — Ingredient list panel** — always visible below Add to Cart. White card `16px` radius, `1px` border `rgba(13,13,13,0.08)`, `20px` padding. Header: "What's in it. Everything. No exceptions." `14px DM Sans` ingredient text, `1.8` line-height. This is NOT an accordion — always open.

**Cart drawer** — slide right, `400px`, white bg. Line items: image + name + flavour + pack + quantity stepper. Free delivery bar (`#5048D5` fill). "Checkout" full-width pill `bg-[#5048D5]`.

No gym imagery. No star ratings. No auto-carousels. No hidden ingredient lists. No fake health claims in copy.

---

### Category A — ChatGPT Canvas

Build a full health food D2C e-commerce storefront. React + TypeScript + Tailwind CSS + Zustand for cart.

The brand sells clean-ingredient protein bars, powders, and snacks. Core identity: "#nothingtohide" — every ingredient declared. Customer: 22–38, health-aware, label-reader.

**Design:** Bold and honest. Background `#FFFFFF`, section backgrounds `#F4EBEF` and `#E5E4F2`, CTA purple `#5048D5`. Fonts: Space Grotesk (display) + DM Sans (body) from Google Fonts. Buttons `rounded-full`. Cards `16px` radius. Section spacing `80px`.

**Pages:**
- `/` — Homepage: announcement bar, nav, hero, category tiles, transparency section, best sellers, testimonials, newsletter, footer
- `/collections/all` — PLP: filter bar, 3-column product grid
- `/products/[slug]` — PDP: image gallery, flavour selector, pack size selector, ingredient list panel (always visible), nutrition accordion, add to cart
- Cart drawer component (global)

**Cart state (Zustand):**
```typescript
interface CartItem {
  id: string
  name: string
  price: number       // in paise (Indian) or cents
  flavour: string
  packSize: string    // "Single" | "6-Pack" | "12-Pack"
  quantity: number
  image: string
}
```

**Key rules:**
- Ingredient list on PDP: always visible, never in accordion
- No gym-bro imagery or copy — everyday food, not fitness supplement
- Pack size changes price — single: ₹150, 6-pack: ₹840, 12-pack: ₹1560 (example)
- Flavour selector changes product image
- Free delivery threshold: ₹499 — show progress bar in cart
- Use ₹ for currency throughout (Indian market)
- No Lorem Ipsum — use realistic food product copy: "Dark Chocolate Almond", "Peanut Butter", "Oats & Honey"

---

### Category A — Bolt

Build a React + TypeScript + Vite + Tailwind CSS + Framer Motion health food D2C storefront.

**Design tokens in tailwind.config.ts:**
```typescript
colors: {
  bg: { primary: '#FFFFFF', warm: '#F4EBEF', lavender: '#E5E4F2' },
  text: { primary: '#0D0D0D', secondary: '#6B6B6B', tertiary: 'rgba(13,13,13,0.35)' },
  border: 'rgba(13,13,13,0.08)',
  cta: { DEFAULT: '#5048D5', hover: '#3D38C2' },
  accent: { DEFAULT: '#93385D', light: '#F8DEE7' },
}
```

**Components:**

`AnnouncementBar` — `bg-[#5048D5] text-white text-sm text-center py-2`. Static text. Dismissible with X button (localStorage flag).

`Navbar` — sticky, white, `border-b border-[rgba(13,13,13,0.08)]`, `h-16`. Logo (Space Grotesk bold). Nav links. Cart count badge `bg-[#5048D5]`.

`Hero` — `grid grid-cols-2 gap-16 py-[120px]`. H1 `text-[clamp(40px,6vw,80px)] font-bold tracking-[-0.03em] leading-none font-[Space_Grotesk]`. CTA `bg-[#5048D5] hover:bg-[#3D38C2] text-white rounded-full h-12 px-8 text-sm font-semibold`.

`ProductCard` — `rounded-2xl border border-[rgba(13,13,13,0.08)] bg-white overflow-hidden`. Image `aspect-square object-cover` — no border-radius on image itself. Below: `p-5` for content. Flavour pill swatches `rounded-full w-5 h-5`. "Add to Cart" `rounded-full` ghost pill on hover.

`IngredientPanel` — ALWAYS VISIBLE on PDP. Never inside accordion.
```tsx
<div className="rounded-2xl border border-[rgba(13,13,13,0.08)] bg-white p-5">
  <p className="text-sm font-bold text-[#0D0D0D] mb-3">
    What's in it. Everything. No exceptions.
  </p>
  <p className="text-sm text-[#6B6B6B] leading-[1.8]">{product.ingredients}</p>
</div>
```

`CartDrawer` — Framer Motion slide from right `280ms ease-out`. `w-[400px]`. Free delivery bar: `bg-[#E5E4F2]` track, `bg-[#5048D5]` fill. Checkout `rounded-full`.

`FlavourSelector` — pill buttons not dots:
```tsx
<button className={cn(
  'rounded-full px-4 h-9 text-sm font-medium border transition-colors',
  selected === flavour
    ? 'bg-[#5048D5] text-white border-[#5048D5]'
    : 'bg-white text-[#0D0D0D] border-[rgba(13,13,13,0.12)] hover:border-[#5048D5]'
)}>
  {flavour}
</button>
```

No gym imagery. No star ratings. No auto-carousels. Gate Framer Motion with `useReducedMotion()`.

---

### Category A — v0

Create a Next.js 14 App Router clean food D2C storefront. Tailwind CSS, shadcn/ui, Radix UI.

**globals.css tokens:**
```css
:root {
  --bg-primary: #FFFFFF;
  --bg-warm: #F4EBEF;
  --bg-lavender: #E5E4F2;
  --border: rgba(13, 13, 13, 0.08);
  --text-primary: #0D0D0D;
  --text-secondary: #6B6B6B;
  --text-tertiary: rgba(13, 13, 13, 0.35);
  --cta: #5048D5;
  --cta-hover: #3D38C2;
  --accent: #93385D;
  --accent-light: #F8DEE7;
}
```

**Component specs:**

`<AnnouncementBar />` — `bg-[var(--cta)] text-white text-sm py-2 text-center`. Dismissible.

`<Navbar />` — sticky `h-16 border-b border-[var(--border)] bg-white`. Space Grotesk logo. shadcn `NavigationMenu`. Cart Lucide `ShoppingBag` `size={18}` with count badge `bg-[var(--cta)] text-white rounded-full w-4 h-4 text-[10px]`.

`<Hero />` — `grid grid-cols-2 gap-16 py-[120px] max-w-[1280px] mx-auto px-6`. H1 Space Grotesk `text-[clamp(40px,6vw,80px)] font-bold tracking-[-0.03em] leading-none text-[var(--text-primary)]`. CTA `bg-[var(--cta)] hover:bg-[var(--cta-hover)] text-white rounded-full h-12 px-8 text-sm font-semibold transition-colors`.

`<ProductCard />` — `rounded-2xl border border-[var(--border)] bg-white overflow-hidden group`. Image `aspect-square object-cover w-full`. Content `p-5`. Name `text-lg font-semibold font-[Space_Grotesk]`. Price `text-base font-semibold text-[var(--cta)]`. Flavour pills `rounded-full h-5 w-5 border border-black/10`. Quick-add `group-hover:opacity-100 opacity-0 rounded-full` transition.

`<IngredientPanel />` — standalone component, NOT inside Accordion.
```tsx
<div className="rounded-2xl border border-[var(--border)] bg-white p-5 mt-4">
  <p className="text-sm font-bold mb-3">What's in it. Everything. No exceptions.</p>
  <p className="text-sm text-[var(--text-secondary)] leading-[1.8]">{ingredients}</p>
</div>
```

`<FlavourSelector />` — pill buttons. Selected: `bg-[var(--cta)] text-white border-[var(--cta)]`. Unselected: `border-[var(--border)] hover:border-[var(--cta)]`.

`<CartDrawer />` — Radix `Sheet` from shadcn. Free delivery `<Progress className="h-1" indicatorClassName="bg-[var(--cta)]" />`. Checkout `rounded-full bg-[var(--cta)]`.

`<NutritionAccordion />` — Radix `Accordion` — this one IS collapsible (nutrition facts, not ingredient list).

No hardcoded hex. No gym imagery. No star ratings. Space Grotesk loaded via `next/font/google`. DM Sans loaded as secondary.

---

### Category B — Claude Artifacts

You are building a clean-ingredient health food D2C e-commerce storefront. Next.js 14 App Router, TypeScript strict, Tailwind CSS, Zustand, Framer Motion installed.

**Project folder structure:**
```
src/
├── app/
│   ├── layout.tsx            # Root layout: AnnouncementBar + Navbar + CartDrawer
│   ├── page.tsx              # Homepage
│   ├── globals.css           # CSS variables + base
│   ├── collections/
│   │   └── [type]/
│   │       └── page.tsx      # PLP
│   └── products/
│       └── [slug]/
│           └── page.tsx      # PDP
├── components/
│   ├── layout/
│   │   ├── AnnouncementBar.tsx
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── cart/
│   │   ├── CartDrawer.tsx
│   │   ├── CartItem.tsx
│   │   └── DeliveryProgress.tsx
│   ├── product/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ImageGallery.tsx
│   │   ├── FlavourSelector.tsx
│   │   ├── PackSizeSelector.tsx
│   │   ├── IngredientPanel.tsx   # NEVER inside accordion
│   │   ├── NutritionAccordion.tsx
│   │   └── AddToCartButton.tsx
│   └── home/
│       ├── Hero.tsx
│       ├── CategoryTiles.tsx
│       ├── TransparencySection.tsx
│       ├── BestSellers.tsx
│       ├── Testimonials.tsx
│       └── NewsletterSection.tsx
├── store/
│   └── cart.ts
├── lib/
│   ├── supabase/client.ts
│   ├── supabase/server.ts
│   ├── utils.ts              # formatPrice (₹), cn()
│   └── motion.ts
└── types/index.ts
```

**globals.css:**
```css
:root {
  --bg-primary: #FFFFFF;
  --bg-warm: #F4EBEF;
  --bg-lavender: #E5E4F2;
  --border: rgba(13, 13, 13, 0.08);
  --text-primary: #0D0D0D;
  --text-secondary: #6B6B6B;
  --text-tertiary: rgba(13, 13, 13, 0.35);
  --cta: #5048D5;
  --cta-hover: #3D38C2;
  --accent: #93385D;
  --accent-light: #F8DEE7;
}
body { font-family: 'DM Sans', sans-serif; color: var(--text-primary); background: var(--bg-primary); }
.font-display { font-family: 'Space Grotesk', sans-serif; }
```

**types/index.ts:**
```typescript
export interface Product {
  id: string
  slug: string
  name: string
  tagline: string
  type: 'bar' | 'powder' | 'snack'
  flavours: Flavour[]
  packSizes: PackSize[]
  ingredients: string       // plain text, full declared list
  nutritionFacts: NutritionFact[]
  howToUse?: string
  images: ProductImage[]    // grouped by flavour
  badge?: 'new' | 'bestseller'
  tags: string[]            // 'vegan', 'gluten-free', 'high-protein'
}

export interface Flavour {
  name: string
  colorHex: string
}

export interface PackSize {
  label: string             // "Single" | "6-Pack" | "12-Pack"
  priceInPaise: number      // in paise (₹150 = 15000)
  sku: string
  stockCount: number
}

export interface ProductImage {
  url: string
  flavour: string | null    // null = shown for all flavours
  position: number
}

export interface CartItem {
  productId: string
  name: string
  flavour: string
  packSize: string
  priceInPaise: number
  quantity: number
  image: string
}
```

**Key conventions:**
- All prices in paise. Display with `formatPrice(paise)` → "₹150"
- `formatPrice`: `new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(paise / 100)`
- `IngredientPanel` is a standalone visible component on PDP — never wrapped in Accordion
- `NutritionAccordion` IS collapsible — different from ingredient list
- Buttons: always `rounded-full` — this brand uses pills, not rectangles
- Product card images: `aspect-square object-cover` — square ratio for food photography
- Section backgrounds alternate: white → `var(--bg-warm)` → white → `var(--bg-lavender)`
- Free delivery threshold: `49900` paise (₹499)

**Mistakes to avoid:**
- Do not put ingredient list inside an accordion — it must be visible by default
- Do not use `rounded-lg` on buttons — always `rounded-full`
- Do not use gym/fitness imagery or copy ("gains", "performance", "fuel")
- Do not show star ratings in testimonials — quotes only
- Do not hardcode ₹ symbol — use `formatPrice()` always
- Do not use `text-gray-*` Tailwind classes — use CSS variables
- Do not use `bg-purple-*` — use `bg-[var(--cta)]`

---

### Category B — Grok

Build a clean-ingredient health food D2C e-commerce storefront. Next.js 14, TypeScript strict, Tailwind CSS, Zustand.

**Brand context:** "#nothingtohide" — every ingredient declared. Sells protein bars, powders, snacks. Indian market (₹ currency, COD, UPI). Customer: 22–38, health-aware, label-reader. Not a gym brand — everyday food.

**Pages to build:**
- `app/page.tsx` — Homepage: AnnouncementBar, Hero (2-col), CategoryTiles, TransparencySection, BestSellers, Testimonials, Newsletter
- `app/collections/[type]/page.tsx` — PLP: filter bar, 3-col product grid
- `app/products/[slug]/page.tsx` — PDP: ImageGallery, FlavourSelector, PackSizeSelector, AddToCart, IngredientPanel (visible), NutritionAccordion
- `components/cart/CartDrawer.tsx` — global, mounted in root layout

**Design tokens:** `--bg-primary: #FFFFFF` | `--bg-warm: #F4EBEF` | `--bg-lavender: #E5E4F2` | `--cta: #5048D5` | `--cta-hover: #3D38C2` | `--accent: #93385D` | `--text-primary: #0D0D0D` | `--text-secondary: #6B6B6B`

**Currency:** All prices in paise. `formatPrice(49900)` → "₹499". Use `en-IN` locale.

**Product data model:**
- Product has `flavours[]` (name + colorHex) and `packSizes[]` (label + priceInPaise + sku + stockCount)
- Selecting a flavour changes image gallery
- Selecting a pack size changes price displayed
- Cart item stores: productId + name + flavour + packSize + priceInPaise + quantity

**Critical PDP rule:** `IngredientPanel` shows full ingredient text always visible — never inside accordion. `NutritionAccordion` is collapsible (that's fine).

**Button rule:** All buttons `rounded-full`. No `rounded-lg`. No `rounded-md`.

**Do not use:** Gym/fitness imagery or language, star ratings in testimonials, `bg-purple-*` Tailwind classes, `rounded-lg` on buttons, hidden ingredient lists, `text-gray-*` colors.

---

### Category B — Gemini

Build a health food D2C storefront for a clean-ingredient brand. The brand's identity is radical transparency — every ingredient in every product is declared. "#nothingtohide."

**Tech:** Next.js 14 App Router, TypeScript, Tailwind CSS, Zustand for cart.

**Brand:** Indian clean food company. Sells protein bars, protein powder, healthy snacks. ₹ currency. Free delivery above ₹499. COD available.

**Pages:**
1. Homepage — announcement bar, nav, 2-column hero, product category tiles, transparency section with ingredient list display, best sellers grid, testimonials, newsletter, footer
2. PLP — filter bar (type, flavour, dietary tag), 3-column grid, product cards
3. PDP — image gallery, flavour selector (pill buttons), pack size selector, add to cart, ingredient panel (always visible, full text), nutrition table (accordion), how to use (accordion)
4. Cart drawer — slide-in right, line items, delivery progress bar, checkout button

**Visual system:**
- Background: `#FFFFFF`, sections alternate to `#F4EBEF` and `#E5E4F2`
- Text: `#0D0D0D` primary, `#6B6B6B` secondary
- CTA buttons: `#5048D5` (purple), hover `#3D38C2`, always `rounded-full` (pill shape)
- Accent: `#93385D` (mauve)
- Fonts: Space Grotesk (bold headings, display) + DM Sans (body, UI)
- Product cards: `16px` border-radius, square image ratio (1:1)
- Buttons: `rounded-full` always — pill shape is non-negotiable for this brand

**Specific behaviors:**
- Flavour selector: pill buttons (not color dots). Selecting changes image gallery.
- Pack size selector: pill buttons. Selecting changes price.
- IngredientPanel: full text, always open on PDP — never an accordion
- NutritionAccordion: collapsible — this is fine
- Cart: free delivery bar shows progress to ₹499 threshold

**Rules:**
- No gym imagery, no fitness/gains language
- No star ratings in testimonials — quotes only
- No auto-carousels
- All prices formatted as ₹ with `en-IN` Intl locale
- No Lorem Ipsum — use realistic flavour names: "Dark Chocolate", "Peanut Butter", "Oats & Honey"

---

### Category B — Cursor

In `src/app/`, implement a clean-ingredient health food D2C storefront. Next.js 14 App Router, TypeScript strict, Tailwind CSS, Zustand already installed.

**Read first:** `src/app/globals.css` for design tokens, `src/types/index.ts` for `Product`, `Flavour`, `PackSize`, `CartItem` types, `src/store/cart.ts` for Zustand cart store.

**Implementation order:**
1. `src/app/globals.css` — CSS variables (both font families declared in body)
2. `src/lib/utils.ts` — `formatPrice(paise: number): string` using `en-IN` locale
3. `src/store/cart.ts` — Zustand + persist, keyed by `productId + flavour + packSize`
4. `src/types/index.ts` — Product, Flavour, PackSize, ProductImage, CartItem, NutritionFact
5. `src/components/cart/CartDrawer.tsx` — Framer Motion slide, always mounted in root layout
6. `src/components/layout/AnnouncementBar.tsx` + `Navbar.tsx`
7. `src/app/layout.tsx` — mount all global components
8. `src/components/product/ProductCard.tsx` + `IngredientPanel.tsx`
9. `src/app/page.tsx` — Homepage
10. `src/app/collections/[type]/page.tsx` — PLP
11. `src/app/products/[slug]/page.tsx` — PDP

**CSS variable conventions:**
```css
/* Use these — never Tailwind color classes for brand colors */
var(--bg-primary)    /* #FFFFFF */
var(--bg-warm)       /* #F4EBEF */
var(--bg-lavender)   /* #E5E4F2 */
var(--cta)           /* #5048D5 — all primary buttons */
var(--cta-hover)     /* #3D38C2 */
var(--accent)        /* #93385D */
var(--accent-light)  /* #F8DEE7 */
var(--text-primary)  /* #0D0D0D */
var(--text-secondary)/* #6B6B6B */
```

**Component contracts:**
```typescript
// ProductCard
interface ProductCardProps {
  product: Product
  selectedFlavour?: string
}

// IngredientPanel — no props variation, always fully visible
interface IngredientPanelProps {
  ingredients: string
}

// FlavourSelector
interface FlavourSelectorProps {
  flavours: Flavour[]
  selected: string
  onChange: (flavour: string) => void
}

// PackSizeSelector
interface PackSizeSelectorProps {
  packSizes: PackSize[]
  selected: string
  onChange: (label: string) => void
}
```

**Absolute rules:**
- `IngredientPanel` is NEVER wrapped in an Accordion — it is always rendered open
- All buttons: `rounded-full` — no exceptions, no `rounded-lg`, no `rounded-md`
- Product card images: `aspect-square` — square ratio, no border-radius on image element
- Prices: always `formatPrice(paise)` — never manually type "₹" symbol
- Font classes: `font-display` (Space Grotesk) on H1/H2/H3, default (DM Sans) on body/UI
- Cart uniqueness key: `${productId}:${flavour}:${packSize}` — same product in different flavour = separate line item
- Free delivery threshold: `49900` paise (₹499)
- `useCartStore()` — only way to access cart state

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
