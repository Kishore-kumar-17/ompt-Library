---
prompt_id: dpecom_02
sub_category: E-commerce
sub_type: SaaS & Software Storefront
title: Squeezed — Polished Digital Commerce & Subscriptions
reference_patterns: saas_aesthetic, merchant_of_record_flow, glassmorphism_ui
inspiration: lemonsqueezy.com
quality_score:
status: draft
notes: Focused on a modern, high-trust SaaS aesthetic for software and subscription sellers.
---

## Base Prompt

### Section 1 — Role

You are a senior product designer specializing in SaaS and fintech platforms. You understand that for software creators, the interface is a proxy for trust. Your work is "Clean & Friendly" but technically robust. You reject the "raw" or "brutalist" look in favor of high-polish modern tech: soft gradients, subtle shadows, perfect border radii, and sophisticated typography. You design for "Peace of Mind," ensuring that complex tasks like tax compliance and subscription management feel "Easy Peasy."

---

### Section 2 — Application Overview

This is an all-in-one platform for software creators to sell digital downloads, SaaS subscriptions, and license keys. The customer is a professional or business user looking for a reliable tool. The creator is a developer or founder who needs the platform to handle global tax (MoR), affiliate marketing, and licensing so they can focus on building.

The application covers: Marketing Landing Page, Creator Dashboard (Revenue focus), Product Creation Suite, and a Conversion-Optimized Checkout Modal.

---

### Section 3 — Brand Voice & Mood

The mood is "Modern Tech Polish" and "Friendly Professionalism." It feels like a high-end productivity tool. It is bright, airy, and structured.

Copy is encouraging and simple. Headlines use a "Freshly Squeezed" tone: "Payments, tax, and subscriptions made easy," "The all-in-one platform for software companies." It balances technical authority with human warmth.

Vibe word: Polished.

---

### Section 4 — Core Features & Functionality

1. **SaaS Marketing Home** — Feature-rich landing page with a modular grid (e.g., Ecommerce, Marketing, Reporting). High-quality SVG icons and social proof sections.
2. **Merchant of Record (MoR) Logic** — UI elements showing global tax handling, VAT compliance, and fraud prevention.
3. **Subscription Management** — Dashboard views for MRR (Monthly Recurring Revenue), Churn Rate, and LTV (Lifetime Value). Support for tiers (Basic, Pro, Enterprise).
4. **License Key System** — Functional UI for issuing, tracking, and deactivating license keys for software.
5. **Native Checkout Modal** — A clean, multi-step (but fast) overlay. Supports 20+ payment methods, local currency conversion, and a "Securely Signed" confirmation.

---

### Section 5 — Design Specifications

**Visual style:** Modern SaaS. Soft surfaces, rounded corners, and subtle depth. Use of white space to create a "breathable" interface.

**Color mode:** Primarily Light Mode with a "Clean Dark" variant for dashboards.

**Color palette:**
- Background: `#FFFFFF` or `#F9FAFB` (Soft Grey)
- Surface/Cards: `#FFFFFF`
- Primary Accent: `#FFEF5E` (Lemon Yellow - used for CTAs and highlights)
- Secondary Accent: `#7047EB` (Vivid Purple - used for links and secondary actions)
- Text Primary: `#111827` (Deep Slate)
- Text Secondary: `#6B7280` (Cool Grey)
- Border: `#E5E7EB` (Soft Grey - 1px weight)
- Success: `#10B981` (Emerald)

**Typography:** Sophisticated Sans-Serif (e.g., Inter or Plus Jakarta Sans).
- Hero Heading: `clamp(48px, 6vw, 72px)`, Weight 800, tracking `-0.02em`, line-height 1.1.
- Section Heading: `36px`, Weight 700.
- Body: `16px`, Weight 400, line-height 1.6.
- Code/Price: Monospace (JetBrains Mono) for license keys and API snippets.

**Spacing:** 8px base unit. 
- Large `64px` section gaps.
- Cards use `p-8` for a spacious feel.

**Border radius:** `12px` to `16px` (Generous rounding for a friendly, approachable feel).

**Responsive:** Desktop-first for the Dashboard (complex data), Mobile-first for the Checkout.

**Accessibility:** WCAG AA. High-contrast focus states using `#7047EB`.

**Motion:** 
- "Springy" transitions: `0.3s ease-in-out`. 
- Subtle hover lifts: `transform: translateY(-2px)` with a soft shadow increase.
- Layout shifts: Smooth entry for modal overlays.
- Respect: `prefers-reduced-motion: reduce` → disable all animations and transitions.

---

### Section 6 — Structure

**Marketing Homepage Layout:**
1. **Nav:** Sticky, semi-transparent background (`backdrop-blur`). Logo left (Yellow/Purple combo). Links: "Products," "Pricing," "Documentation." Right: "Sign in," "Get started for free" (Yellow Button).
2. **Hero:** Centered layout. Large H1. Animated "Revenue Graph" illustration. "Start selling in minutes."
3. **Feature Grid:** Numbered blocks (e/1, e/2) with icons and 2-line descriptions.

**Creator Dashboard Layout:**
1. **Sidebar:** Navigation icons for "Overview," "Products," "Orders," "Affiliates," "Licenses."
2. **Header:** MRR stats and "Quick Actions" button.
3. **Main:** Multi-column stats grid + Recent Orders table.

---

### Section 7 — Technical Specifications

- **Framework:** Next.js 14, React 18, TypeScript.
- **Styling:** Tailwind CSS + Shadcn/UI for consistent primitives.
- **State:** React Query for data fetching (Revenue stats) and Zustand for modal states.
- **Charts:** Recharts or Chart.js for MRR/Churn visualizations.
- **Animation:** Framer Motion for modal transitions and "Staggered" feature reveals.

---

### Section 8 — Implementation Steps

1. **The Foundation:** Set up the theme in `globals.css` with soft shadows and rounded tokens.
2. **Dashboard Shell:** Build the sidebar and header layout.
3. **Stats Components:** Implement the revenue cards with sparkline charts.
4. **Checkout Modal:** Focus on the payment method selector and conversion-optimized layout.
5. **Marketing Sections:** Build the modular feature grid.

---

### Section 9 — User Experience

The user wants to feel that their business is in safe hands. 
The creator needs a "one-stop-shop" that feels cohesive. 
The UI should feel "Expensive" and "High-End" to justify the platform fee. Use pixel-perfect alignment and high-quality iconography.

---

### Section 10 — Constraints

- **No pure black borders.** Use `#E5E7EB`.
- **No sharp corners.** Use `12px+` radius.
- **No generic illustrations.** Use custom-styled, clean tech SVGs.
- **No cluttered screens.** If a dashboard view is too busy, split it into tabs.

---

## Platform Versions

---

### 1 — Lovable

Build **Squeezed** — a polished SaaS digital commerce platform inspired by Lemon Squeezy — using Next.js 14 App Router, TypeScript strict, Tailwind CSS + shadcn/ui. Static export for marketing pages; `/dashboard` uses client-side rendering. Font: Inter 400/600/700 via `next/font/google`.

**Design identity: Modern SaaS polish.** Rounded surfaces, soft borders, lemon-yellow CTA, purple secondary. Opposite of brutalism — everything has `rounded-xl` (12px) or `rounded-2xl` (16px).

**Tailwind config extension:**
```js
theme: {
  extend: {
    colors: {
      lemon:  '#FFEF5E',
      purple: '#7047EB',
      slate:  { 50: '#F9FAFB', 200: '#E5E7EB', 700: '#374151', 900: '#111827' },
    },
    borderRadius: {
      card: '12px',
      modal: '16px',
    },
  },
}
```

**Core types unique to this build:**
```typescript
export type ProductCategory = 'software' | 'ebook' | 'course' | 'membership' | 'license'
export type SubscriptionInterval = 'monthly' | 'yearly' | 'one_time'

export interface SaaSProduct {
  id: string
  name: string
  description: string
  price: number             // cents; 0 = free tier
  interval: SubscriptionInterval
  category: ProductCategory
  licenseEnabled: boolean   // true = generates license keys post-purchase
  featured: boolean
  features: string[]        // bullet list for pricing card
}

export interface RevenueStats {
  mrr: number              // Monthly Recurring Revenue in cents
  arr: number              // Annual Run Rate in cents
  churnRate: number        // percentage (0-100)
  ltv: number              // average LTV in cents
  totalCustomers: number
  activeSubscriptions: number
}

export interface LicenseKey {
  id: string
  productId: string
  key: string              // format: XXXX-XXXX-XXXX-XXXX
  activations: number
  maxActivations: number
  status: 'active' | 'expired' | 'deactivated'
  createdAt: string
}

export interface Order {
  id: string
  productName: string
  customerEmail: string
  amount: number           // cents
  interval: SubscriptionInterval
  status: 'completed' | 'refunded' | 'pending'
  createdAt: string
}
```

**Page sections (build in this order):**
1. **SiteNav** — `backdrop-blur-sm bg-white/80 border-b border-slate-200`, lemon "Get started" button `rounded-lg`
2. **HeroSection** — centered, H1 `clamp(48px,6vw,72px)` Inter 700, purple animated revenue graph `div`, subtext + CTA pair
3. **FeatureGrid** — 3-col + 2-col asymmetric layout; each card `border border-slate-200 rounded-xl p-8`
4. **PricingSection** — 3 plan cards, highlighted plan gets `border-2 border-purple` + `shadow-lg`
5. **Dashboard Shell** — sidebar nav (`w-64 border-r border-slate-200`), header, stats grid
6. **RevenueCard** — MRR/ARR/Churn stats with sparkline (div placeholder); `rounded-xl bg-white border border-slate-200`
7. **LicenseTable** — `font-mono` for key display; copy-to-clipboard button
8. **NativeCheckout** — Dialog from shadcn/ui; progress stepper; payment method selector

**Anti-patterns:**
- Never `border-black` or hard shadows — use `border-slate-200` and `shadow-sm`/`shadow-lg`
- Never `rounded-none` — minimum `rounded-lg`, cards use `rounded-xl`
- Never `#FFEF5E` lemon as text color on white — use as background with dark text only
- Never display raw cent values — always `formatCurrency(cents)` → `'$29.00'`
- Never store MRR as float arithmetic — all values in integer cents

**`tsc --noEmit` exits 0. `npm run build` produces `/out`.**

---

### 2 — ChatGPT Canvas

Create **Squeezed** — polished SaaS digital commerce platform — Next.js 14, TypeScript strict, Tailwind CSS + shadcn/ui. Static export.

```bash
npx create-next-app@latest squeezed --typescript --app --tailwind --import-alias "@/*"
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card dialog tabs badge progress
npm install zustand recharts framer-motion lucide-react
```

**Token system in `tailwind.config.ts`:**
```js
colors: {
  lemon: '#FFEF5E',    // CTA bg — DARK TEXT ONLY (black on lemon = good contrast)
  purple: '#7047EB',   // secondary, links, highlighted plan border
}
```

**Complete type system:**
```typescript
// src/types/index.ts
export type ProductCategory = 'software' | 'ebook' | 'course' | 'membership' | 'license'
export type SubscriptionInterval = 'monthly' | 'yearly' | 'one_time'

export interface SaaSProduct {
  id: string; name: string; description: string
  price: number            // cents
  interval: SubscriptionInterval; category: ProductCategory
  licenseEnabled: boolean; featured: boolean; features: string[]
}
export interface RevenueStats {
  mrr: number; arr: number; churnRate: number
  ltv: number; totalCustomers: number; activeSubscriptions: number
}
export interface LicenseKey {
  id: string; productId: string; key: string
  activations: number; maxActivations: number
  status: 'active' | 'expired' | 'deactivated'; createdAt: string
}
export interface Order {
  id: string; productName: string; customerEmail: string
  amount: number; interval: SubscriptionInterval
  status: 'completed' | 'refunded' | 'pending'; createdAt: string
}
```

**Key utilities:**
```typescript
// src/lib/formatCurrency.ts
export function formatCurrency(cents: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency, minimumFractionDigits: 0,
  }).format(cents / 100)
}
// formatCurrency(2900) → '$29'
// formatCurrency(99900) → '$999'

// src/lib/formatMRR.ts — for dashboard display
export function formatMRR(cents: number): string {
  if (cents >= 100000) return `$${(cents / 100000).toFixed(1)}k`
  return formatCurrency(cents)
}
// formatMRR(4250000) → '$42.5k'

// src/lib/generateLicenseKey.ts
export function generateLicenseKey(): string {
  const seg = () => Math.random().toString(36).substring(2, 6).toUpperCase()
  return `${seg()}-${seg()}-${seg()}-${seg()}`
}
```

**Zustand store:**
```typescript
// src/store/dashboard.ts
import { create } from 'zustand'
import type { Order } from '@/types'

interface DashboardStore {
  activeTab: 'overview' | 'products' | 'orders' | 'licenses'
  checkoutOpen: boolean
  selectedProductId: string | null
  setTab: (tab: DashboardStore['activeTab']) => void
  openCheckout: (productId: string) => void
  closeCheckout: () => void
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  activeTab: 'overview',
  checkoutOpen: false,
  selectedProductId: null,
  setTab: (tab) => set({ activeTab: tab }),
  openCheckout: (id) => set({ checkoutOpen: true, selectedProductId: id }),
  closeCheckout: () => set({ checkoutOpen: false, selectedProductId: null }),
}))
```

**Routes:**
- `/` — Marketing homepage (Hero, FeatureGrid, Pricing)
- `/dashboard` — Dashboard shell (sidebar + main content area)
- `/dashboard/products` — Product list with license indicators
- `/dashboard/orders` — Order table with status badges

---

### 3 — Bolt

Build **Squeezed** — SaaS digital commerce platform. Next.js 14, TypeScript strict, Tailwind CSS + shadcn/ui. Static export.

```bash
npx create-next-app@latest squeezed --typescript --app --tailwind --import-alias "@/*"
npx shadcn-ui@latest init && npx shadcn-ui@latest add button card dialog tabs badge progress table
npm install zustand recharts framer-motion lucide-react
```

**File structure:**
```
src/
  types/index.ts          — SaaSProduct, RevenueStats, LicenseKey, Order, types
  lib/
    data.ts               — PRODUCTS (6), MOCK_STATS, MOCK_ORDERS (10), MOCK_LICENSES (8)
    formatCurrency.ts     — formatCurrency(cents): string
    formatMRR.ts          — formatMRR(cents): string
    generateLicenseKey.ts — XXXX-XXXX-XXXX-XXXX format
  store/
    dashboard.ts          — useDashboardStore (activeTab, checkoutOpen, selectedProduct)
  components/
    layout/
      SiteNav.tsx         — backdrop-blur, lemon CTA
      DashboardSidebar.tsx — 64px icon nav + expanded labels
      Footer.tsx
    marketing/
      HeroSection.tsx     — centered, animated revenue graph placeholder
      FeatureGrid.tsx     — asymmetric 3+2 col layout
      PricingCard.tsx     — plan card, highlighted = border-purple
      PricingSection.tsx  — 3 PricingCards
    dashboard/
      RevenueCard.tsx     — stat + sparkline area (Recharts AreaChart)
      StatsGrid.tsx       — 4 RevenueCards
      OrdersTable.tsx     — shadcn Table, status Badge, formatCurrency
      LicenseTable.tsx    — font-mono key display, copy button
    checkout/
      NativeCheckout.tsx  — 'use client', shadcn Dialog, 3-step stepper
      CheckoutStepper.tsx — step indicator
      PaymentMethodSelector.tsx
  app/
    globals.css, layout.tsx, page.tsx
    dashboard/
      layout.tsx          — DashboardSidebar + main content
      page.tsx            — StatsGrid + OrdersTable
      products/page.tsx   — product list with license toggle indicator
      orders/page.tsx     — full OrdersTable
```

**Critical rules:**
1. Lemon `#FFEF5E` as CTA background — always `text-slate-900` on lemon (never white)
2. Purple `#7047EB` for links, highlighted plan border, and focus rings — `focus:ring-purple`
3. `formatCurrency(cents)` — never render raw cent numbers; never float arithmetic
4. License keys in `font-mono` always — never regular font for keys
5. `rounded-none` is FORBIDDEN — minimum `rounded-lg`; dashboard cards use `rounded-xl`
6. Dashboard sidebar: `w-64 border-r border-slate-200` — not fixed pixel height hack

**QA checks:**
```bash
grep -r "rounded-none" src --include="*.tsx"                    # empty (forbidden)
grep -r "border-black\|shadow.*4px.*4px" src --include="*.tsx" # empty (no brutalism)
grep -r "\.mrr\b\|\.arr\b" src/components --include="*.tsx"    # must use formatMRR()
tsc --noEmit && npm run build
```

---

### 4 — v0

Design **Squeezed** component system — SaaS digital commerce platform. Next.js 14, TypeScript, Tailwind + shadcn/ui.

**PricingCard (highlighted plan):**
```tsx
<div className={cn(
  "rounded-xl border p-8 flex flex-col gap-6 bg-white",
  plan.featured
    ? "border-2 border-purple shadow-lg shadow-purple/10"
    : "border-slate-200 shadow-sm"
)}>
  {plan.featured && (
    <span className="self-start text-xs font-semibold uppercase tracking-widest
      bg-lemon text-slate-900 px-3 py-1 rounded-full">
      Most popular
    </span>
  )}
  <div>
    <h3 className="text-xl font-bold text-slate-900">{plan.name}</h3>
    <p className="text-slate-500 mt-1 text-sm">{plan.description}</p>
  </div>
  <div className="flex items-end gap-1">
    <span className="text-4xl font-bold text-slate-900">{formatCurrency(plan.price)}</span>
    <span className="text-slate-500 mb-1">/{plan.interval}</span>
  </div>
  <ul className="space-y-3">
    {plan.features.map(f => (
      <li key={f} className="flex items-center gap-2 text-sm">
        <CheckCircle2 size={16} className="text-purple shrink-0" />
        {f}
      </li>
    ))}
  </ul>
  <Button className={cn(
    "mt-auto rounded-lg font-semibold",
    plan.featured ? "bg-purple text-white hover:bg-purple/90" : "bg-lemon text-slate-900 hover:bg-lemon/90"
  )}>
    Get started
  </Button>
</div>
```

**RevenueCard (dashboard stat):**
```tsx
<Card className="rounded-xl border-slate-200 p-6">
  <CardHeader className="p-0 mb-4">
    <p className="text-sm text-slate-500 font-medium">{label}</p>
    <p className="text-3xl font-bold text-slate-900 mt-1">{formatMRR(value)}</p>
    <Badge variant="outline" className={cn(
      "mt-2 text-xs rounded-full",
      change > 0 ? "border-green-200 text-green-700 bg-green-50" : "border-red-200 text-red-700 bg-red-50"
    )}>
      {change > 0 ? '↑' : '↓'} {Math.abs(change)}% vs last month
    </Badge>
  </CardHeader>
  <div className="h-12">
    {/* Recharts AreaChart sparkline */}
  </div>
</Card>
```

**LicenseTable row:**
```tsx
<TableRow>
  <TableCell className="font-mono text-sm tracking-widest">{license.key}</TableCell>
  <TableCell>
    <Badge variant={license.status === 'active' ? 'default' : 'secondary'}>
      {license.status}
    </Badge>
  </TableCell>
  <TableCell className="text-slate-500 text-sm">
    {license.activations}/{license.maxActivations} activations
  </TableCell>
  <TableCell>
    <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(license.key)}>
      <Copy size={14} />
    </Button>
  </TableCell>
</TableRow>
```

**NativeCheckout (shadcn Dialog):**
```tsx
<Dialog open={checkoutOpen} onOpenChange={() => closeCheckout()}>
  <DialogContent className="rounded-2xl max-w-md">
    <CheckoutStepper currentStep={step} steps={['Details', 'Payment', 'Confirm']} />
    {step === 0 && <DetailsStep />}
    {step === 1 && <PaymentMethodSelector />}
    {step === 2 && <ConfirmStep />}
  </DialogContent>
</Dialog>
```

---

### 5 — Claude Artifacts

Build **Squeezed** — production-quality SaaS digital commerce platform — Next.js 14 App Router, TypeScript strict, Tailwind CSS + shadcn/ui. Inter 400/600/700.

**Four defining constraints:**

**Constraint 1 — All money in integer cents, all display via formatCurrency:**
```typescript
// WRONG: float arithmetic anywhere
const monthlyRevenue = mrr * 0.12  // ✗ float multiplication

// WRONG: raw number in JSX
<span>{plan.price}</span>  // ✗ displays cents as dollars

// RIGHT: integer cents, display via utility
const monthlyRevenue = Math.round(mrr * 12)  // integer only
<span>{formatCurrency(plan.price)}</span>    // ✓
```

**Constraint 2 — Lemon yellow contrast (same rule as yellow in dpecom_01):**
```
#FFEF5E (lemon) on #FFFFFF (white) = ~1.4:1 — FAILS WCAG ✗✗
#111827 (slate-900) on #FFEF5E = ~12:1 — passes ✓✓
Rule: lemon only as background with dark text. Never lemon text on any background.
```

**Constraint 3 — License key format is always MONO:**
```tsx
// WRONG: license key in regular font
<span>{license.key}</span>  // ✗ unreadable

// RIGHT: font-mono + tracking
<code className="font-mono text-sm tracking-widest">{license.key}</code>  // ✓
```

**Constraint 4 — Dashboard state in Zustand, not URL query params:**
```typescript
// WRONG: reading active tab from URL
const searchParams = useSearchParams()
const tab = searchParams.get('tab')  // ✗

// RIGHT: tab state in useDashboardStore
const { activeTab, setTab } = useDashboardStore()  // ✓
```

**Complete folder structure:**
```
src/
  types/index.ts
  lib/
    data.ts
    formatCurrency.ts  — formatCurrency(cents, currency?): string
    formatMRR.ts       — formatMRR(cents): string (abbreviates to $42.5k)
    generateLicenseKey.ts
  store/
    dashboard.ts       — useDashboardStore (activeTab, checkoutOpen, selectedProductId)
  components/
    layout/SiteNav.tsx + DashboardSidebar.tsx + Footer.tsx
    marketing/HeroSection.tsx + FeatureGrid.tsx + PricingCard.tsx + PricingSection.tsx
    dashboard/
      RevenueCard.tsx       — stat + Recharts sparkline
      StatsGrid.tsx         — 4 RevenueCards
      OrdersTable.tsx       — shadcn Table + Badge + formatCurrency
      LicenseTable.tsx      — font-mono keys + copy button
    checkout/
      NativeCheckout.tsx    — 'use client', shadcn Dialog, step state
      PaymentMethodSelector.tsx
  app/
    globals.css, layout.tsx, page.tsx
    dashboard/layout.tsx + page.tsx
    dashboard/products/page.tsx
    dashboard/orders/page.tsx
```

**QA checks:**
```bash
tsc --noEmit
grep -r "rounded-none" src --include="*.tsx"                              # empty (forbidden)
grep -r "\.price\b\|\.mrr\b\|\.arr\b" src/components --include="*.tsx"  # must use format utilities
grep -r "FFEF5E\|7047EB" src --include="*.tsx"                           # empty (use Tailwind aliases)
grep -r "license\.key\b" src/components --include="*.tsx" | grep -v "font-mono"  # empty
npm run build
```

---

### 6 — Grok

Generate all source files for **Squeezed** — SaaS digital commerce platform. Next.js 14, TypeScript strict, Tailwind + shadcn/ui.

Generate in order:
1. `tailwind.config.ts` — add colors (lemon, purple), extend borderRadius (card: 12px, modal: 16px)
2. `src/types/index.ts` — ProductCategory, SubscriptionInterval, SaaSProduct, RevenueStats, LicenseKey, Order
3. `src/lib/formatCurrency.ts` — Intl.NumberFormat, integer cents only
4. `src/lib/formatMRR.ts` — abbreviate to `$42.5k` format
5. `src/lib/generateLicenseKey.ts` — XXXX-XXXX-XXXX-XXXX format
6. `src/lib/data.ts` — PRODUCTS (6), MOCK_STATS (RevenueStats), MOCK_ORDERS (10), MOCK_LICENSES (8)
7. `src/store/dashboard.ts` — useDashboardStore (activeTab, checkoutOpen, selectedProductId)
8. `src/app/globals.css` — Inter import, base reset
9. `src/app/layout.tsx` — Inter font, SiteNav
10. `src/components/layout/SiteNav.tsx` — backdrop-blur, lemon Get Started button
11. `src/components/layout/DashboardSidebar.tsx` — icon + label nav, 5 routes
12. `src/components/marketing/HeroSection.tsx` — centered, animated revenue graph div, CTA pair
13. `src/components/marketing/FeatureGrid.tsx` — asymmetric 3+2 col, border-slate-200 cards
14. `src/components/marketing/PricingCard.tsx` — featured = border-purple shadow-lg; formatCurrency
15. `src/components/marketing/PricingSection.tsx` — 3 PricingCards
16. `src/components/dashboard/RevenueCard.tsx` — formatMRR, Recharts AreaChart sparkline
17. `src/components/dashboard/StatsGrid.tsx` — 4 RevenueCards (MRR, ARR, Churn, LTV)
18. `src/components/dashboard/OrdersTable.tsx` — shadcn Table, status Badge, formatCurrency per row
19. `src/components/dashboard/LicenseTable.tsx` — font-mono keys, copy-to-clipboard
20. `src/components/checkout/PaymentMethodSelector.tsx` — 4 method options (card, PayPal, etc.)
21. `src/components/checkout/NativeCheckout.tsx` — 'use client', shadcn Dialog, 3 steps
22. `src/app/page.tsx` — HeroSection + FeatureGrid + PricingSection
23. `src/app/dashboard/layout.tsx` — DashboardSidebar + content area
24. `src/app/dashboard/page.tsx` — StatsGrid + OrdersTable
25. `src/app/dashboard/products/page.tsx` — product list with license toggle
26. `src/app/dashboard/orders/page.tsx` — full OrdersTable

**Rules for every file:**
- No `rounded-none`; no hard black shadows; no raw cent values in JSX
- Lemon only as bg with dark text; purple only for accents and interactive elements
- All money via `formatCurrency(cents)` or `formatMRR(cents)` — no raw numbers
- License keys always in `font-mono tracking-widest`
- Dashboard state via `useDashboardStore()` — no local useState for navigation

---

### 7 — Gemini

**Project:** Squeezed — SaaS digital commerce platform. Next.js 14 App Router, TypeScript strict, Tailwind CSS + shadcn/ui. Inter 400/600/700. Recharts + Framer Motion.

**Design system — 4 rules:**
1. `rounded-xl` (12px) for cards, `rounded-2xl` (16px) for modals — never `rounded-none`
2. `border border-slate-200 shadow-sm` — soft borders and shadows only
3. Lemon `#FFEF5E` as CTA background + dark text; purple `#7047EB` for featured elements
4. All money via `formatCurrency(cents)` — integer cents, no floats

**Architecture — 4 layers:**

Layer 1 — Foundation: types (SaaSProduct, RevenueStats, LicenseKey, Order), utilities (formatCurrency, formatMRR, generateLicenseKey), mock data, Zustand dashboard store.

Layer 2 — Layout: SiteNav (backdrop-blur, lemon CTA button), DashboardSidebar (icon nav), Footer.

Layer 3 — Marketing:
- `HeroSection` — centered layout, oversized heading, purple animated revenue graph placeholder div, lemon + outline CTA pair
- `FeatureGrid` — asymmetric 3-col + 2-col rows; each card `border border-slate-200 rounded-xl p-8`
- `PricingCard` — featured plan: `border-2 border-purple shadow-lg shadow-purple/10`; `formatCurrency(plan.price)` per plan
- Framer Motion stagger: `whileInView`, `viewport={{ once: true }}`, stagger 0.1s

Layer 4 — Dashboard + Checkout:
- `RevenueCard` — stat value via `formatMRR`, Recharts AreaChart sparkline, change badge
- `OrdersTable` — shadcn Table; each amount via `formatCurrency`; status Badge with color variant
- `LicenseTable` — `font-mono tracking-widest` keys; copy-to-clipboard via `navigator.clipboard`
- `NativeCheckout` — shadcn Dialog `rounded-2xl`; 3-step (details → payment → confirm); step state in Zustand

**Motion rules:**
- Hero elements: `opacity: 0, y: 20 → visible`, `duration: 0.5`
- Feature cards: stagger `0.1s`, `opacity: 0, y: 16 → visible`
- Checkout Dialog: shadcn's built-in animation (no Framer Motion override)
- Pricing card hover: CSS `transition-shadow duration-200 hover:shadow-lg` — not Framer Motion
- All `viewport={{ once: true }}` to prevent re-trigger

---

### 8 — Cursor

Build **Squeezed** SaaS digital commerce platform. Next.js 14, TypeScript strict, Tailwind + shadcn/ui. Static export.

**`src/types/index.ts`:**
```typescript
export type ProductCategory = 'software' | 'ebook' | 'course' | 'membership' | 'license'
export type SubscriptionInterval = 'monthly' | 'yearly' | 'one_time'

export interface SaaSProduct {
  id: string; name: string; description: string
  price: number            // cents — use formatCurrency() for display
  interval: SubscriptionInterval; category: ProductCategory
  licenseEnabled: boolean; featured: boolean; features: string[]
}

export interface RevenueStats {
  mrr: number; arr: number; churnRate: number
  ltv: number; totalCustomers: number; activeSubscriptions: number
}

export interface LicenseKey {
  id: string; productId: string; key: string
  activations: number; maxActivations: number
  status: 'active' | 'expired' | 'deactivated'; createdAt: string
}
```

**`src/lib/formatCurrency.ts`:**
```typescript
export function formatCurrency(cents: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency, minimumFractionDigits: 0,
  }).format(cents / 100)
}
// formatCurrency(2900) → '$29'
// formatCurrency(99900) → '$999'
// NEVER: `$${cents / 100}` — use Intl.NumberFormat
```

**`src/lib/formatMRR.ts`:**
```typescript
import { formatCurrency } from './formatCurrency'
export function formatMRR(cents: number): string {
  if (cents >= 1_000_000) return `$${(cents / 100_000).toFixed(1)}k`
  return formatCurrency(cents)
}
// formatMRR(4_250_000) → '$42.5k'
// formatMRR(29_900) → '$299'
```

**`src/components/dashboard/RevenueCard.tsx`:**
```tsx
import { formatMRR } from '@/lib/formatMRR'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

interface Props {
  label: string; value: number; change: number
  sparklineData: number[]
}

export default function RevenueCard({ label, value, change, sparklineData }: Props) {
  const positive = change >= 0
  return (
    <Card className="rounded-xl border-slate-200">
      <CardContent className="p-6">
        <p className="text-sm text-slate-500 font-medium">{label}</p>
        <p className="text-3xl font-bold text-slate-900 mt-1">{formatMRR(value)}</p>
        <Badge variant="outline" className={cn(
          "mt-2 text-xs rounded-full border",
          positive
            ? "border-green-200 text-green-700 bg-green-50"
            : "border-red-200 text-red-700 bg-red-50"
        )}>
          {positive ? '↑' : '↓'} {Math.abs(change)}%
        </Badge>
        {/* Recharts AreaChart sparkline — height 48px */}
      </CardContent>
    </Card>
  )
}
// formatMRR(value) — NEVER render value directly
// rounded-xl — NEVER rounded-none
```

**`src/components/checkout/NativeCheckout.tsx`:**
```tsx
'use client'
import { useState } from 'react'
import { Dialog, DialogContent } from '@/components/ui/dialog'
import { useDashboardStore } from '@/store/dashboard'
import CheckoutStepper from './CheckoutStepper'

const STEPS = ['Your details', 'Payment', 'Confirm'] as const
type Step = 0 | 1 | 2

export default function NativeCheckout() {
  const { checkoutOpen, closeCheckout } = useDashboardStore()
  const [step, setStep] = useState<Step>(0)
  return (
    <Dialog open={checkoutOpen} onOpenChange={() => { closeCheckout(); setStep(0) }}>
      <DialogContent className="rounded-2xl max-w-md">
        <CheckoutStepper steps={[...STEPS]} currentStep={step} />
        {step === 0 && <DetailsStep onNext={() => setStep(1)} />}
        {step === 1 && <PaymentMethodSelector onNext={() => setStep(2)} />}
        {step === 2 && <ConfirmStep onDone={() => { closeCheckout(); setStep(0) }} />}
      </DialogContent>
    </Dialog>
  )
}
```

**Absolute rules:**
```bash
grep -r "rounded-none" src --include="*.tsx"                           # must be empty
grep -r "border-black\|border-2 border-black" src --include="*.tsx"   # must be empty
grep -r "\.mrr\b\|\.arr\b\|\.price\b" src/components --include="*.tsx" | \
  grep -v "format"                                                       # must be empty
grep -r "license\.key\b" src/components --include="*.tsx" | \
  grep -v "font-mono"                                                    # must be empty
tsc --noEmit && npm run build
```
