---
prompt_id: dpecom_03
sub_category: E-commerce
sub_type: Audience-First Creator Storefront
title: Kit-Style — Clean Creative Commerce & Newsletters
reference_patterns: audience_first_commerce, integrated_list_growth, elegant_serif_ui
inspiration: kit.com (formerly convertkit.com/commerce)
quality_score:
status: draft
notes: High-conversion layouts that blend digital sales with email list growth.
---

## Base Prompt

### Section 1 — Role

You are a senior product designer specializing in creator marketing and audience-growth platforms. You understand that for creators, a sale is more than a transaction—it's a deepening of a relationship. You prioritize "Audience-First" commerce, where list-building is as important as revenue. Your work is "Clean & Human," favoring elegant serif typography, warm neutrals, and soft brand greens over cold corporate aesthetics. You design for "Creator Independence," ensuring that selling digital products, tip jars, and paid newsletters feels like a natural extension of a creator's voice.

---

### Section 2 — Application Overview

This is an integrated commerce and email-marketing platform for creators. The customer is a "superfan" or "subscriber" looking to support their favorite creator. The creator is a writer, artist, or educator who wants to sell ebooks, presets, or memberships while simultaneously growing their email list.

The application covers: Minimalist Landing Page, Integrated Tip Jar, Digital Product Page, and a Post-Purchase Automation Flow. The primary goal is a "Purchase + Subscription" dual-conversion.

---

### Section 3 — Brand Voice & Mood

The mood is "Clean Creative" and "Approachable Authority." It feels like a well-designed personal newsletter. It is warm, unhurried, and highly legible.

Copy is personal and direct. Headlines use an "Audience-First" tone: "Open the doors to your digital store," "Build your audience while you sell." It rejects aggressive urgency in favor of "quiet confidence."

Vibe word: Human.

---

### Section 4 — Core Features & Functionality

1. **Integrated Landing Page** — Simple, centered layout that captures emails *before* pitching the product. Focus on lead magnets and "Value-First" selling.
2. **Virtual Tip Jar** — A dedicated "support me" component with pre-set amounts and a custom message field for fans.
3. **Digital Product Delivery** — Frictionless setup for ebooks, PDFs, and presets. Automated fulfillment with "Securely Signed" download links.
4. **Paid Newsletters** — UI for free vs. paid tier selection. Integration with automated "Pitch" sequences based on subscriber tags.
5. **Growth-Integrated Checkout** — A 1-page checkout that includes a "Subscribe to my newsletter" checkbox (defaulted to checked).

---

### Section 5 — Design Specifications

**Visual style:** Clean Creative. Minimalist, centered layouts. Use of elegant serif fonts for headings and high-quality photography for creator portraits.

**Color mode:** Light Mode (Warm/Cream-focused).

**Color palette:**
- Background: `#FAF9F6` (Warm Off-White/Cream)
- Surface: `#FFFFFF` (Pure white for cards)
- Primary Accent: `#11AD8D` (Kit Green — used for conversion CTAs)
- Secondary Accent: `#FF6D60` (Soft Coral — for secondary highlights/badges)
- Text Primary: `#1E293B` (Slate-800 — warm charcoal)
- Text Secondary: `#64748B` (Slate-500 — labels and descriptions)
- Border: `#E2E8F0` (Slate-200 — very subtle)

**Typography:** Elegant Serif for headings; modern Sans-serif for body.
- Display Heading (Serif): `clamp(40px, 5vw, 64px)`, weight 600, serif (e.g., Playfair Display or EB Garamond).
- Section Heading: `28px`, weight 500, serif.
- Body Text: `16px`, weight 400, sans-serif (e.g., Inter or Public Sans).
- Input/Label: `14px`, weight 600, uppercase tracking-wide.

**Spacing:** 12px base unit. 
- Centered container max-width: `720px` for high readability.
- Vertical section spacing: `120px`.

**Border radius:** `8px` (Subtle, professional rounding).

**Responsive:** Mobile-first focus for newsletter consumption.

**Accessibility:** WCAG AA. Focus states use a `2px` solid `#11AD8D` border.

**Motion:** 
- Subtle fade-ins: `opacity 0 -> 1` over `400ms`. 
- Staggered entry for form fields.
- "Heart" animation on Tip Jar contribution.
- Respect: `prefers-reduced-motion: reduce` → disable all animations and transitions.

---

### Section 6 — Structure

**Landing Page Layout:**
1. **Nav:** Minimalist. Logo left. Right: "Newsletter," "Products," "Support" (Text links).
2. **Hero:** Centered Creator Portrait + H1. "Subscribe to the newsletter and get [Lead Magnet]."
3. **Product Row:** 2-column or 3-column grid of digital assets. Each card: Thumbnail, Title, Price, "Learn More."

**Tip Jar Layout:**
1. **Header:** "Support my work."
2. **Grid:** $5, $10, $25, Custom.
3. **CTA:** "Send a Tip" (Kit Green Button).

**Checkout Structure:**
- Left: Order Summary (PDF Thumbnail + Name).
- Right: Email field -> "Subscribe to Newsletter" (Checkbox) -> Payment.

---

### Section 7 — Technical Specifications

- **Framework:** Next.js 14 App Router, React 18, TypeScript strict mode.
- **Styling:** Tailwind CSS v3.
- **Email:** Resend (For automated fulfillment and newsletter delivery).
- **Database:** Supabase for Product Metadata and Subscriber Tags.
- **State:** Zustand for "Added to cart" and "Subscriber" status.
- **Icons:** Lucide — `size={18}` `strokeWidth={1.5}`.

---

### Section 8 — Implementation Steps

1. **The Theme** — Setup `globals.css` with CSS variables for `kit-green` and `warm-cream`. Configure font-family to prioritize Serif for headings.
2. **Audience Logic** — Build the email capture form first. All commerce flows must check for "subscriber" status.
3. **Tip Jar Component** — Implement the preset amount grid and custom input logic.
4. **Product Grid** — Build a clean, high-readability grid for digital downloads.
5. **Checkout Flow** — Integrate Stripe with the "Subscription" opt-in logic.

---

### Section 9 — User Experience

The user is a fan who wants to support the creator's journey. 
The creator wants to "sell while they sleep" without feeling "salesy." 
The UI should feel "Human" and "Personal." Use first-person copy ("Send me a tip," "Download my book") to maintain the relationship.

---

### Section 10 — Constraints

- **No aggressive pop-ups.** Use inline forms or slide-ins.
- **No pure black.** Use `#1E293B`.
- **No generic Stock Photos.** Use grain-filtered, creator-focused imagery.
- **No hard-selling copy.** Use "Invite" rather than "Demand."
- **No complex multi-page checkouts.** Keep it to 1-page.

---

## Platform Versions

---

### 1 — Lovable

Build **KitStore** — an audience-first creator commerce platform inspired by Kit.com — using Next.js 14 App Router, TypeScript strict, Tailwind CSS. Font: EB Garamond 400/600 (headings) + Inter 400/500 (body) via `next/font/google`.

**Design identity: Clean Creative.** Warm cream surfaces (`#FAF9F6`), serif headings, Kit Green CTAs. Max-width `720px` centered for newsletter-style readability. The creator's portrait and voice come first — commerce is quiet but present.

**Tailwind config extension:**
```js
theme: {
  extend: {
    colors: {
      cream:  '#FAF9F6',
      green:  '#11AD8D',  // Kit Green — CTAs and focus rings
      coral:  '#FF6D60',  // secondary highlights, badge accents
      slate:  { 800: '#1E293B', 500: '#64748B', 200: '#E2E8F0' },
    },
    fontFamily: {
      serif: ['EB Garamond', 'serif'],
      sans:  ['Inter', 'sans-serif'],
    },
    maxWidth: { readable: '720px' },
  },
}
```

**Core types unique to this build:**
```typescript
export type ProductType = 'ebook' | 'preset' | 'template' | 'membership'
export type TipAmount = 5 | 10 | 25 | 'custom'

export interface CreatorProduct {
  id: string; slug: string; title: string; description: string
  price: number          // cents; 0 = free download
  productType: ProductType
  downloadUrl: string    // pre-signed URL or placeholder
  thumbnailUrl: string
  featured: boolean
}

export interface TipState {
  selectedAmount: TipAmount
  customAmount: string   // string for controlled input
  message: string
}

export interface CheckoutState {
  email: string
  subscribeToNewsletter: boolean  // defaults to true — opt-out, not opt-in
  productId: string | null
  tipAmount: number | null        // cents, for tip jar flow
  step: 'details' | 'payment' | 'success'
}

export interface Subscriber {
  email: string
  subscribedAt: string
  tags: string[]          // e.g. ['buyer', 'newsletter', 'tipjar']
}
```

**The newsletter-first constraint** — `subscribeToNewsletter` defaults to `true` in CheckoutState. Checkbox is shown pre-checked. Never opt-in silently — checkbox must be visible and unlabeled.

**Page sections (build in this order):**
1. **SiteNav** — `max-w-readable mx-auto`, text links only, no button in nav
2. **HeroSection** — centered portrait (round, `border-2 border-slate-200`), serif H1, email capture form, lead magnet mention
3. **ProductGrid** — 2-col or 3-col, each `ProductCard` with thumbnail + serif title + green price
4. **TipJar** — `bg-white border border-slate-200 rounded-lg p-8`; preset grid ($5/$10/$25/Custom); "Send a Tip" green button
5. **CheckoutOverlay** — Framer Motion slide-up; email → newsletter checkbox → payment → success

**TipJar component — the unique element:**
```tsx
// Preset amounts: 5, 10, 25, 'custom'
// Selected amount gets bg-green text-white; others get border-slate-200 bg-white text-slate-800
// Custom amount: text input appears only when 'custom' is selected
// "Send a Tip" button: bg-green text-white rounded-lg — only enabled when amount resolved
```

**Anti-patterns:**
- Never `font-sans` for H1/H2 — headings must use `font-serif` (EB Garamond)
- Never show `$0` for free products — use "Free" or "Download free"
- Never pre-populate email with placeholder text — empty input
- Never `newsletter checkbox` hidden or missing from checkout — must always be visible
- Never `color: #11AD8D` as text on cream bg — insufficient contrast (3.7:1 AA fails for small text)

**`tsc --noEmit` exits 0. `npm run build` produces `/out`.**

---

### 2 — ChatGPT Canvas

Create **KitStore** — audience-first creator commerce platform — Next.js 14, TypeScript strict, Tailwind CSS. Static export.

```bash
npx create-next-app@latest kitstore --typescript --app --tailwind --import-alias "@/*"
npm install zustand framer-motion lucide-react @resend/node
```

**Tailwind config:** extend colors with `cream: '#FAF9F6'`, `green: '#11AD8D'`, `coral: '#FF6D60'`; extend fontFamily with `serif: ['EB Garamond']` and `sans: ['Inter']`.

**Complete type system:**
```typescript
// src/types/index.ts
export type ProductType = 'ebook' | 'preset' | 'template' | 'membership'
export type TipAmount = 5 | 10 | 25 | 'custom'

export interface CreatorProduct {
  id: string; slug: string; title: string; description: string
  price: number          // cents; 0 = free
  productType: ProductType; downloadUrl: string
  thumbnailUrl: string; featured: boolean
}

export interface TipState {
  selectedAmount: TipAmount; customAmount: string; message: string
}

export interface CheckoutState {
  email: string
  subscribeToNewsletter: boolean  // true by default
  productId: string | null; tipAmount: number | null
  step: 'details' | 'payment' | 'success'
}
```

**Key utilities:**
```typescript
// src/lib/formatPrice.ts
export function formatPrice(cents: number): string {
  if (cents === 0) return 'Free'
  return `$${(cents / 100).toFixed(0)}`
}
// formatPrice(0) → 'Free'  (never '$0')
// formatPrice(2900) → '$29'

// src/lib/resolveTipAmount.ts
export function resolveTipAmount(state: TipState): number | null {
  if (state.selectedAmount === 'custom') {
    const val = parseFloat(state.customAmount)
    return isNaN(val) || val <= 0 ? null : Math.round(val * 100)
  }
  return state.selectedAmount * 100
}
// resolveTipAmount({ selectedAmount: 10, ... }) → 1000
// resolveTipAmount({ selectedAmount: 'custom', customAmount: '17.50', ... }) → 1750
```

**Zustand store:**
```typescript
// src/store/checkout.ts
import { create } from 'zustand'
import type { CheckoutState } from '@/types'

interface CheckoutStore extends CheckoutState {
  setEmail: (email: string) => void
  setSubscribe: (val: boolean) => void
  setStep: (step: CheckoutState['step']) => void
  setProductId: (id: string) => void
  setTipAmount: (cents: number | null) => void
  reset: () => void
}

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  email: '', subscribeToNewsletter: true,
  productId: null, tipAmount: null, step: 'details',
  setEmail: (email) => set({ email }),
  setSubscribe: (val) => set({ subscribeToNewsletter: val }),
  setStep: (step) => set({ step }),
  setProductId: (id) => set({ productId: id }),
  setTipAmount: (cents) => set({ tipAmount: cents }),
  reset: () => set({ email: '', subscribeToNewsletter: true, productId: null, tipAmount: null, step: 'details' }),
}))
```

**Routes:**
- `/` — Creator homepage (portrait, email capture, product grid, tip jar)
- `/products/[slug]` — Product detail + checkout overlay trigger
- `/api/checkout` — Stripe + Resend post-purchase email (server route)

---

### 3 — Bolt

Build **KitStore** — audience-first creator commerce platform. Next.js 14, TypeScript strict, Tailwind CSS. Static export.

```bash
npx create-next-app@latest kitstore --typescript --app --tailwind --import-alias "@/*"
npm install zustand framer-motion lucide-react
```

**File structure:**
```
src/
  types/index.ts          — CreatorProduct, TipState, CheckoutState, Subscriber, ProductType, TipAmount
  lib/
    data.ts               — PRODUCTS (5 items, 1 free), CREATOR_PROFILE
    formatPrice.ts        — formatPrice(cents): 'Free' or '$29'
    resolveTipAmount.ts   — resolveTipAmount(state): number | null
  store/
    checkout.ts           — useCheckoutStore
  components/
    layout/
      SiteNav.tsx         — max-w-readable text links only
      Footer.tsx          — minimal, cream bg
    home/
      HeroSection.tsx     — portrait + serif H1 + email form + lead magnet
      ProductGrid.tsx     — 2 or 3 col, ProductCards
      ProductCard.tsx     — thumbnail + serif title + formatPrice
      TipJar.tsx          — 'use client', preset grid + custom input + Send button
    product/
      ProductDetail.tsx   — large thumbnail, description, green Buy/Download button
    checkout/
      CheckoutOverlay.tsx — 'use client', Framer Motion slide-up, 3 steps
      DetailsStep.tsx     — email + newsletter checkbox (default checked)
      PaymentStep.tsx     — Stripe placeholder
      SuccessStep.tsx     — download link or confirmation
  app/
    globals.css, layout.tsx, page.tsx
    products/[slug]/page.tsx
```

**Critical rules:**
1. `font-serif` (EB Garamond) for ALL H1, H2, H3 — never `font-sans` for headings
2. `formatPrice(0)` → `'Free'` — never `'$0'` anywhere
3. `subscribeToNewsletter: true` default — checkbox shown, pre-checked, with opt-out label
4. `#11AD8D` green: CTA buttons + focus rings only — never as text color on cream/white (3.7:1 ✗ small text)
5. `TipJar` is `'use client'` — it has interactive state; `ProductGrid` is server component

**QA checks:**
```bash
grep -r "font-sans" src/components --include="*.tsx" | grep -E "h[1-3]|H[1-3]"  # empty (serif headings)
grep -r "\\\$0\|cents === 0" src/components --include="*.tsx"                     # empty (use formatPrice)
grep -r "subscribeToNewsletter.*false" src/store --include="*.ts"                 # empty (must default true)
tsc --noEmit && npm run build
```

---

### 4 — v0

Design **KitStore** component system — audience-first creator commerce. Next.js 14, TypeScript, Tailwind CSS.

**HeroSection:**
```tsx
<section className="max-w-readable mx-auto px-4 py-24 text-center">
  {/* Creator portrait */}
  <div className="w-24 h-24 rounded-full border-2 border-slate-200 mx-auto mb-6 bg-slate-100 overflow-hidden">
    <img src={creator.avatarUrl} alt={creator.name} className="w-full h-full object-cover" />
  </div>
  <h1 className="font-serif text-[clamp(40px,5vw,64px)] font-semibold text-slate-800 leading-tight">
    {creator.tagline}
  </h1>
  <p className="mt-4 text-slate-500 max-w-md mx-auto leading-relaxed">{creator.bio}</p>
  {/* Email capture */}
  <form className="mt-8 flex gap-2 max-w-sm mx-auto">
    <input
      type="email" placeholder="Your email address"
      className="flex-1 border border-slate-200 rounded-lg px-4 py-2.5 text-sm
        focus:outline-none focus:ring-2 focus:ring-green/50 focus:border-green" />
    <button className="bg-green text-white rounded-lg px-5 py-2.5 text-sm font-semibold
      hover:bg-green/90 transition-colors">
      Subscribe
    </button>
  </form>
  <p className="mt-3 text-xs text-slate-400">Get [lead magnet] free when you subscribe</p>
</section>
```

**TipJar:**
```tsx
<div className="max-w-readable mx-auto bg-white border border-slate-200 rounded-lg p-8">
  <h2 className="font-serif text-2xl font-semibold text-slate-800 mb-2">Support my work</h2>
  <p className="text-slate-500 text-sm mb-6">Every contribution helps me create more.</p>
  {/* Preset grid */}
  <div className="grid grid-cols-4 gap-3 mb-4">
    {([5, 10, 25, 'custom'] as const).map((amt) => (
      <button key={String(amt)}
        className={cn(
          "border rounded-lg py-3 text-sm font-semibold transition-colors",
          selected === amt
            ? "bg-green text-white border-green"
            : "bg-white text-slate-800 border-slate-200 hover:border-green"
        )}>
        {amt === 'custom' ? 'Custom' : `$${amt}`}
      </button>
    ))}
  </div>
  {/* Custom amount input — only shows when 'custom' selected */}
  {selected === 'custom' && (
    <input type="number" min="1" step="1" placeholder="Enter amount"
      className="w-full border border-slate-200 rounded-lg px-4 py-2.5 mb-4
        focus:ring-2 focus:ring-green/50 focus:border-green outline-none" />
  )}
  <button className="w-full bg-green text-white rounded-lg py-3 font-semibold
    hover:bg-green/90 transition-colors disabled:opacity-50"
    disabled={!resolvedAmount}>
    Send a tip
  </button>
</div>
```

**ProductCard:**
```tsx
<article className="bg-white border border-slate-200 rounded-lg overflow-hidden
  hover:-translate-y-0.5 hover:shadow-md transition-all duration-200">
  <div className="aspect-video bg-cream overflow-hidden">
    <img src={product.thumbnailUrl} alt={product.title}
      className="w-full h-full object-cover" />
  </div>
  <div className="p-5">
    <h3 className="font-serif text-lg font-semibold text-slate-800 leading-tight">
      {product.title}
    </h3>
    <p className="text-slate-500 text-sm mt-1 line-clamp-2">{product.description}</p>
    <div className="flex items-center justify-between mt-4">
      <span className="font-semibold text-slate-800">{formatPrice(product.price)}</span>
      <button className="bg-green text-white rounded-lg px-4 py-1.5 text-sm font-medium
        hover:bg-green/90 transition-colors">
        {product.price === 0 ? 'Download free' : 'Buy now'}
      </button>
    </div>
  </div>
</article>
```

---

### 5 — Claude Artifacts

Build **KitStore** — production-quality audience-first creator commerce — Next.js 14 App Router, TypeScript strict, Tailwind CSS. EB Garamond (serif) + Inter (sans).

**Four defining constraints:**

**Constraint 1 — Serif headings, always:**
```tsx
// WRONG: sans heading
<h1 className="font-sans text-4xl font-bold">...</h1>  // ✗

// RIGHT: serif heading
<h1 className="font-serif text-[clamp(40px,5vw,64px)] font-semibold">...</h1>  // ✓
// All H1, H2, H3 use font-serif (EB Garamond). Body and UI text use font-sans (Inter).
```

**Constraint 2 — Newsletter checkbox defaults to true:**
```typescript
// WRONG: opt-in default (hides the ask)
subscribeToNewsletter: false  // ✗

// RIGHT: opt-out default (transparent, pre-checked)
subscribeToNewsletter: true   // ✓
// Checkbox MUST be visible in checkout with label: "Subscribe to newsletter (uncheck to skip)"
```

**Constraint 3 — Free products use 'Free', never '$0':**
```typescript
// WRONG
<span>{`$${product.price / 100}`}</span>  // → '$0' ✗

// RIGHT
<span>{formatPrice(product.price)}</span>  // → 'Free' ✓
```

**Constraint 4 — Kit Green contrast rule:**
```
#11AD8D on #FAF9F6 (cream) = 3.7:1 — fails WCAG AA for small text ✗
#11AD8D on #FFFFFF (white) = 3.7:1 — fails WCAG AA for small text ✗
#FFFFFF on #11AD8D = 3.7:1 — marginal for button text (OK for large bold text only)

Rule: Green only for buttons (large bold text) and focus rings.
NEVER as body text, label text, or description text color.
```

**Complete folder structure:**
```
src/
  types/index.ts
  lib/
    data.ts              — PRODUCTS[], CREATOR_PROFILE
    formatPrice.ts       — formatPrice(cents): 'Free' | '$N'
    resolveTipAmount.ts  — resolveTipAmount(state): number | null
  store/
    checkout.ts          — useCheckoutStore
  components/
    layout/SiteNav.tsx + Footer.tsx
    home/
      HeroSection.tsx    — portrait, serif H1, email capture form
      ProductGrid.tsx    — server component
      ProductCard.tsx    — thumbnail, serif title, formatPrice
      TipJar.tsx         — 'use client', preset + custom input
    checkout/
      CheckoutOverlay.tsx — 'use client', Framer Motion y: 100% → 0
      DetailsStep.tsx    — email, newsletter checkbox (default checked)
      PaymentStep.tsx
      SuccessStep.tsx
  app/
    globals.css, layout.tsx, page.tsx
    products/[slug]/page.tsx
```

**QA:**
```bash
tsc --noEmit
grep -r "font-sans" src/components --include="*.tsx" | grep -E "<h[1-3]"         # empty
grep -r "product\.price.*100\|price / 100" src/components --include="*.tsx"      # empty (use formatPrice)
grep -r "subscribeToNewsletter.*false" src/store --include="*.ts"                 # empty (must default true)
grep -r "color.*11AD8D\|text-\[#11AD8D\]" src --include="*.tsx"                  # empty (no green text)
npm run build
```

---

### 6 — Grok

Generate all source files for **KitStore** — audience-first creator commerce. Next.js 14, TypeScript strict, Tailwind CSS.

Generate in order:
1. `tailwind.config.ts` — colors (cream, green, coral, slate shades), fontFamily (serif: EB Garamond, sans: Inter), maxWidth (readable: 720px)
2. `src/types/index.ts` — ProductType, TipAmount, CreatorProduct, TipState, CheckoutState, Subscriber
3. `src/lib/formatPrice.ts` — `formatPrice(cents)`: `0 → 'Free'`, else `'$N'`
4. `src/lib/resolveTipAmount.ts` — handles preset + custom string input
5. `src/lib/data.ts` — PRODUCTS (5, 1 free), CREATOR_PROFILE object
6. `src/store/checkout.ts` — useCheckoutStore (subscribeToNewsletter defaults true)
7. `src/app/globals.css` — EB Garamond + Inter imports, cream bg default
8. `src/app/layout.tsx` — dual font setup, SiteNav
9. `src/components/layout/SiteNav.tsx` — max-w-readable, text links, no button
10. `src/components/home/HeroSection.tsx` — portrait, serif H1, email form, lead magnet note
11. `src/components/home/ProductCard.tsx` — thumbnail, font-serif title, formatPrice, conditional CTA text
12. `src/components/home/ProductGrid.tsx` — server component, 2-3 col grid
13. `src/components/home/TipJar.tsx` — 'use client', preset amounts, custom input, green CTA
14. `src/components/checkout/DetailsStep.tsx` — email input + newsletter checkbox (checked by default)
15. `src/components/checkout/PaymentStep.tsx` — Stripe placeholder
16. `src/components/checkout/SuccessStep.tsx` — confirmation + download link
17. `src/components/checkout/CheckoutOverlay.tsx` — 'use client', Framer Motion slide-up
18. `src/app/page.tsx` — HeroSection + ProductGrid + TipJar
19. `src/app/products/[slug]/page.tsx` — static params, product detail + checkout trigger

**Rules for every file:**
- H1/H2/H3: always `font-serif` — never `font-sans` for headings
- `formatPrice(product.price)` — never raw cents in JSX
- `subscribeToNewsletter` defaults `true` in store
- Green only for interactive elements and focus rings — never body text

---

### 7 — Gemini

**Project:** KitStore — audience-first creator commerce. Next.js 14 App Router, TypeScript strict, Tailwind CSS. EB Garamond (serif) + Inter (sans).

**Design system — 3 rules:**
1. Serif headings (EB Garamond) for H1/H2/H3; sans for body and UI
2. `max-w-readable` (720px) centered container — newsletter-reading width
3. Kit Green (`#11AD8D`) only for CTAs and focus rings — not as text color

**Architecture — 3 layers:**

Layer 1 — Foundation: types, formatPrice (0 → 'Free'), resolveTipAmount, creator data, checkout store (subscribeToNewsletter defaults true).

Layer 2 — Homepage:
- `HeroSection` — cream bg, portrait in circle, serif H1, email capture form with green subscribe button, lead magnet copy
- `ProductGrid` — server component, 2-3 col, `ProductCard`s with serif title and formatPrice
- `TipJar` — `'use client'`, preset grid (4 buttons), conditional custom input, "Send a tip" green button

Layer 3 — Checkout + Product:
- `CheckoutOverlay` — `motion.div` `y: '100%' → 0`; 3 steps via `useCheckoutStore`
- `DetailsStep` — email input + newsletter checkbox pre-checked; `setSubscribe()` on change
- `PaymentStep` — Stripe Elements placeholder
- `SuccessStep` — thank you + download link (or confirmation for subscriptions)
- `ProductDetail` — full description, green Buy/Download button, `formatPrice(product.price)`

**Motion:**
- Checkout overlay: `y: '100%' → 0`, `duration: 0.2`, tween
- Hero elements: `opacity: 0, y: 16 → visible`, `duration: 0.5`
- ProductCard hover: CSS `hover:-translate-y-0.5 hover:shadow-md` — not Framer Motion
- TipJar preset buttons: CSS `transition-colors duration-150`
- All Framer Motion `viewport={{ once: true }}` + `useReducedMotion()` guard

---

### 8 — Cursor

Build **KitStore** creator commerce platform. Next.js 14, TypeScript strict, Tailwind CSS. Static export.

**`src/types/index.ts`:**
```typescript
export type ProductType = 'ebook' | 'preset' | 'template' | 'membership'
export type TipAmount = 5 | 10 | 25 | 'custom'

export interface CreatorProduct {
  id: string; slug: string; title: string; description: string
  price: number; productType: ProductType
  downloadUrl: string; thumbnailUrl: string; featured: boolean
}

export interface TipState {
  selectedAmount: TipAmount; customAmount: string; message: string
}

export interface CheckoutState {
  email: string
  subscribeToNewsletter: boolean  // always defaults true
  productId: string | null; tipAmount: number | null
  step: 'details' | 'payment' | 'success'
}
```

**`src/lib/formatPrice.ts`:**
```typescript
export function formatPrice(cents: number): string {
  if (cents === 0) return 'Free'
  return `$${(cents / 100).toFixed(0)}`
}
// formatPrice(0) → 'Free'  (never '$0')
// formatPrice(2900) → '$29'
```

**`src/lib/resolveTipAmount.ts`:**
```typescript
import type { TipState } from '@/types'
export function resolveTipAmount(state: TipState): number | null {
  if (state.selectedAmount === 'custom') {
    const val = parseFloat(state.customAmount)
    return isNaN(val) || val <= 0 ? null : Math.round(val * 100)
  }
  return state.selectedAmount * 100
}
// resolveTipAmount({ selectedAmount: 10, ... }) → 1000
// resolveTipAmount({ selectedAmount: 'custom', customAmount: '17.50', ... }) → 1750
// resolveTipAmount({ selectedAmount: 'custom', customAmount: '', ... }) → null
```

**`src/components/home/TipJar.tsx`:**
```tsx
'use client'
import { useState } from 'react'
import { type TipAmount } from '@/types'
import { resolveTipAmount } from '@/lib/resolveTipAmount'

const PRESET_AMOUNTS: TipAmount[] = [5, 10, 25, 'custom']

export default function TipJar() {
  const [selected, setSelected] = useState<TipAmount>(10)
  const [customAmount, setCustomAmount] = useState('')
  const [message, setMessage] = useState('')

  const resolved = resolveTipAmount({ selectedAmount: selected, customAmount, message })

  return (
    <div className="max-w-readable mx-auto bg-white border border-slate-200 rounded-lg p-8">
      <h2 className="font-serif text-2xl font-semibold text-slate-800 mb-2">
        Support my work
      </h2>
      <div className="grid grid-cols-4 gap-3 mb-4">
        {PRESET_AMOUNTS.map((amt) => (
          <button key={String(amt)} onClick={() => setSelected(amt)}
            className={[
              "border rounded-lg py-3 text-sm font-semibold transition-colors",
              selected === amt
                ? "bg-green text-white border-green"
                : "bg-white text-slate-800 border-slate-200 hover:border-green"
            ].join(' ')}>
            {amt === 'custom' ? 'Custom' : `$${amt}`}
          </button>
        ))}
      </div>
      {selected === 'custom' && (
        <input type="number" min="1" value={customAmount}
          onChange={(e) => setCustomAmount(e.target.value)}
          placeholder="Enter amount"
          className="w-full border border-slate-200 rounded-lg px-4 py-2.5 mb-4
            focus:ring-2 focus:ring-green/50 focus:border-green outline-none" />
      )}
      <button disabled={!resolved}
        className="w-full bg-green text-white rounded-lg py-3 font-semibold
          hover:bg-green/90 transition-colors disabled:opacity-50">
        Send a tip
      </button>
    </div>
  )
}
// bg-green (button) with text-white: contrast OK for large bold text
// Custom amount: only renders when selected === 'custom'
// Button disabled when resolveTipAmount returns null
```

**`src/components/checkout/DetailsStep.tsx`:**
```tsx
'use client'
import { useCheckoutStore } from '@/store/checkout'

export default function DetailsStep({ onNext }: { onNext: () => void }) {
  const { email, setEmail, subscribeToNewsletter, setSubscribe } = useCheckoutStore()
  return (
    <div className="space-y-4">
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com" required
        className="w-full border border-slate-200 rounded-lg px-4 py-2.5
          focus:ring-2 focus:ring-green/50 focus:border-green outline-none" />
      {/* Newsletter checkbox — always visible, defaults checked */}
      <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
        <input type="checkbox" checked={subscribeToNewsletter}
          onChange={(e) => setSubscribe(e.target.checked)}
          className="rounded border-slate-300 text-green focus:ring-green" />
        Subscribe to newsletter (uncheck to skip)
      </label>
      <button onClick={onNext} disabled={!email}
        className="w-full bg-green text-white rounded-lg py-3 font-semibold
          hover:bg-green/90 disabled:opacity-50 transition-colors">
        Continue to payment
      </button>
    </div>
  )
}
// subscribeToNewsletter ALWAYS defaults true in store
// Checkbox ALWAYS shown — never hidden or conditional
```

**Absolute rules:**
```bash
grep -r "font-sans\|font-body" src/components --include="*.tsx" | grep -E "h[1-3]|H[1-3]"  # empty
grep -r "'\$0'\|\"\$0\"" src --include="*.tsx"                                                # empty
grep -r "subscribeToNewsletter.*false" src/store --include="*.ts"                             # empty
grep -r "text-\[#11AD8D\]\|color.*11AD8D" src/components --include="*.tsx"                   # empty
tsc --noEmit && npm run build
```
