# bw_service_04
## Indian Stock Broker Service Page · ZeroTrade (Zerodha pattern)

**Pricing model:** Flat fee — ₹0 for delivery, ₹20 flat cap for intraday/F&O
**Key utility:** `calculateBrokerage(flatFee, percentFee, orderValue)` with `Math.min`
**Differentiator:** Comparison calculator showing savings vs traditional broker (0.3%)

---

## Base Prompt

**Role:** Senior product designer specialising in Indian fintech service pages and discount brokerage platforms, with expertise in transparent fee comparison UX, interactive savings calculators, and regulatory trust signal design.

**Application Overview:**
ZeroTrade is an Indian discount stockbroker platform communicating a single USP: ₹0 brokerage on equity delivery, ₹20 flat on everything else. Visitors are traders and investors comparing brokers or evaluating switching from a traditional full-service broker. The primary conversion goal: open a demat account — clicking "Open Account" or filling the account opening form.

**Brand Voice & Mood:**
Direct, honest, jargon-free. Navy (`#1E3A5F`) communicates institutional trust without banking stuffiness. The brand positions itself as the anti-traditional-broker: no hidden fees, no confusing slabs, no percentage tricks. Copy is brutally clear: "₹0 brokerage on equity delivery. ₹20 flat on everything else." Green appears exclusively in the savings comparison — a deliberate signal that choosing ZeroTrade puts money back in the investor's pocket. The design is clean, data-focused, built for people who have already done their research.

**Core Features:**
1. Sticky navigation — navy logo, nav links (Products / Pricing / Learn / About), "Open Account" navy CTA
2. Hero section — headline (fee model), subhead, CTA pair, 3 stat pills (clients, delivery brokerage, track record)
3. Trading products — 3×2 grid of 6 products; Equity Delivery card highlighted in navy; each shows fee tag via `formatBrokerageTag`
4. Brokerage calculator — interactive: product selector + order value input + 3-line comparison (ZeroTrade fee / Traditional broker fee / You save)
5. Trust section — 4 regulatory certification tiles (SEBI Registered, NSE Member, BSE Member, CDSL Depository)
6. Trust bar — dark background, 4 operational stats, Framer Motion stagger
7. Footer — deep dark background, 4-column layout

**Design Specifications:**

Color palette (8 tokens):
- Navy: `#1E3A5F` — brand, nav, primary CTAs, highlighted Equity Delivery card bg; white on navy = 11.50:1 ✓✓ AAA
- Green: `#15803D` — "You save" comparison line ONLY; on white = 5.02:1 ✓ AA; used nowhere else
- Dark: `#111827` — headings and body text
- White: `#FFFFFF` — page background, card backgrounds
- Surface: `#F9FAFB` — section alternates, trust section background
- Muted: `#6B7280` — metadata, traditional fee display (strikethrough context)
- Border: `#E5E7EB` — card and input borders
- Footer: `#030712` — deep dark footer background

Critical contrast: White on navy = 11.50:1 AAA — the highest-contrast primary in the BusiWeb library. Green used ONLY for savings line — never on cards, nav, or icons.

Typography: DM Sans (Google Fonts) weights 400/500/600 only. No weight 700 anywhere. H1: `clamp(2.5rem, 5vw, 3.5rem)` weight 600. Product name: 1rem weight 600. Fee tag: 1.125rem weight 600. Body: 1rem/1.6 weight 400.

Border radius: 12px on product cards and trust tiles, 8px on calculator and inputs. No `border-radius: 50%`.

Spacing: 8pt grid. Product grid: 3-column desktop, gap 20px. Section vertical padding: `clamp(60px, 8vw, 120px)`.

**Structure:**
1. SiteNav — sticky, white bg with scroll shadow, navy "ZeroTrade" text logo, nav links, "Open Account" navy filled button
2. HeroSection — centered layout: H1 (fee model statement), 1-line subhead, primary CTA (navy) + secondary CTA (outline), 3 stat pills
3. TradingProducts — section heading, 3×2 grid; Equity Delivery highlighted (navy bg + white text); `formatBrokerageTag(product.flatFee, product.percentFee)` on each card
4. BrokerageCalculator — section heading, product `<select>`, order value `<input>`, 3-line comparison breakdown with `aria-live="polite"`
5. TrustSection — surface bg, 4 certification tiles in 4-col or 2×2 grid (SEBI / NSE / BSE / CDSL)
6. TrustBar — dark `#030712` bg, 4 stats, Framer Motion stagger
7. Footer — `#030712` bg, 4-column layout

**Technical Specifications:**
- Framework: Next.js 14 App Router, TypeScript strict
- CSS: CSS Modules — zero hex in `.module.css`, all colors via `var(--color-*)`
- Client boundary: `'use client'` on `BrokerageCalculator` only (and `TrustBar` for Framer Motion); `page.tsx` is a Server Component
- State: `orderValue: number` (default 100000) and `productId: string` (default 'delivery') in BrokerageCalculator — `brokerage`, `traditionalFee`, `savings` are ALL derived, never stored in state
- Utilities: `calculateBrokerage(flatFee, percentFee, orderValue)` and `formatBrokerageTag(flatFee, percentFee)` in `src/lib/`
- Constant: `TRADITIONAL_FEE_RATE = 0.003` exported from `data.ts` — used only in BrokerageCalculator for comparison math
- Fonts: DM Sans via `next/font/google`, weights `['400', '500', '600']`
- Export: static (`output: 'export'`)

**Implementation Steps:**
1. Types: `TradingProduct`, `TrustBadge`, `TrustStat`, `HeroStat`
2. Utilities: `calculateBrokerage` and `formatBrokerageTag` — test all 4 cases for each
3. Mock data: 6 trading products (including delivery with `highlighted: true`), 4 trust badges, 4 trust stats, 3 hero stats, `TRADITIONAL_FEE_RATE = 0.003`
4. BrokerageCalculator (the primary trust-builder and conversion driver — build first)
5. TradingProducts grid (core content, drives product selection in calculator)
6. SiteNav + HeroSection (above-the-fold credibility)
7. TrustSection + TrustBar (regulatory proof)
8. Footer + page composition

**User Experience:**
The visitor arrives from a referral or comparison site, already aware of discount brokers. They scan the hero: ₹0 delivery brokerage is the headline claim — they've heard it before, but want proof. They scroll to the trading products grid: Equity Delivery highlighted in navy confirms the hero claim visually. The brokerage calculator is the conversion moment: they enter their typical order value and see exactly how much they'd pay ZeroTrade versus a traditional 0.3% broker. The savings figure in green makes the decision concrete — "₹280 saved on a ₹1 lakh order" is more persuasive than any feature list. Regulatory badges confirm SEBI registration — the critical trust signal for Indian retail investors.

**Constraints:**
- `calculateBrokerage(flatFee, percentFee, orderValue)` is the ONLY brokerage formula — the `Math.min` cap is critical for intraday products: `Math.min(20, Math.ceil(orderValue * 0.0003))` NOT `orderValue * 0.0003` alone
- `formatBrokerageTag(flatFee, percentFee)` always requires both arguments — the 3-case conditional is inside the function
- `brokerage`, `traditionalFee`, `savings` are ALWAYS derived per render — never stored in `useState`
- `var(--color-green)` used ONLY for the "You save" line — forbidden everywhere else (nav, product cards, icons, section headings)
- Equity Delivery card: `background: var(--color-navy); color: var(--color-white)` — NEVER green background on any product card
- `TRADITIONAL_FEE_RATE = 0.003` from `data.ts` — used only in `BrokerageCalculator` for comparison math, nowhere else
- No `font-weight: 700` anywhere — DM Sans 600 is the maximum
- No `border-radius: 50%` anywhere
- No hex values in `.module.css` — CSS custom properties only
- BrokerageCalculator `aria-live="polite"` on breakdown container
- `page.tsx` must be a Server Component — no `'use client'` on the page file
- Respect: `prefers-reduced-motion: reduce` → disable all animations and transitions.

---

## Platform Versions

---

### 1 — Lovable

Build a Next.js 14 App Router stock broker service page for **ZeroTrade** — an Indian discount broker inspired by Zerodha's honest, jargon-free positioning. TypeScript strict mode. CSS Modules only (no Tailwind). Static export.

**Brand:** ZeroTrade. Primary colour navy `#1E3A5F` (white on navy = 11.50:1 ✓✓ AAA). Green `#15803D` for "you save" line ONLY (5.02:1 ✓). Font: DM Sans 400/500/600 from `next/font/google`. Never weight 700.

**8 CSS tokens in `:root` — zero hex in any `.module.css`:**
```
--color-navy: #1E3A5F
--color-green: #15803D
--color-dark: #111827
--color-white: #FFFFFF
--color-surface: #F9FAFB
--color-muted: #6B7280
--color-border: #E5E7EB
--color-footer: #030712
```

**Utility functions (implement exactly):**
```typescript
// calculateBrokerage — Math.min applies ONLY when percentFee is not null
export function calculateBrokerage(
  flatFee: number,
  percentFee: number | null,
  orderValue: number
): number {
  if (flatFee === 0) return 0
  if (percentFee !== null) return Math.min(flatFee, Math.ceil(orderValue * percentFee))
  return flatFee
}
// Test: calculateBrokerage(0, null, 100000)   → 0
// Test: calculateBrokerage(20, null, 50000)   → 20
// Test: calculateBrokerage(20, 0.0003, 10000) → 3
// Test: calculateBrokerage(20, 0.0003, 70000) → 20  (0.03% = ₹21 > ₹20 cap)

// formatBrokerageTag — always 2 args, 3 display cases
export function formatBrokerageTag(flatFee: number, percentFee: number | null): string {
  if (flatFee === 0) return '₹0'
  if (percentFee !== null) return `₹${flatFee} or ${(percentFee * 100).toFixed(2)}%`
  return `₹${flatFee} flat`
}
// Test: formatBrokerageTag(0, null)      → '₹0'
// Test: formatBrokerageTag(20, null)     → '₹20 flat'
// Test: formatBrokerageTag(20, 0.0003)   → '₹20 or 0.03%'
```

**`TRADITIONAL_FEE_RATE = 0.003`** — exported from `data.ts`. Used ONLY in the BrokerageCalculator to compute `traditionalFee = Math.round(orderValue * TRADITIONAL_FEE_RATE)`.

**BrokerageCalculator state model:**
```typescript
// Only 2 values in state
const [orderValue, setOrderValue] = useState<number>(100_000)
const [productId, setProductId]   = useState<string>('delivery')

// All derived — never in useState
const product        = TRADING_PRODUCTS.find(p => p.id === productId)!
const brokerage      = calculateBrokerage(product.flatFee, product.percentFee, orderValue)
const traditionalFee = Math.round(orderValue * TRADITIONAL_FEE_RATE)
const savings        = traditionalFee - brokerage
```

**6 TradingProducts (3×2 grid):**
- Equity Delivery: flatFee:0, percentFee:null, highlighted:true
- Equity Intraday: flatFee:20, percentFee:0.0003
- Futures & Options: flatFee:20, percentFee:null
- Mutual Funds (Direct): flatFee:0, percentFee:null
- Currency: flatFee:20, percentFee:null
- Commodity (MCX): flatFee:20, percentFee:null

**Sections:** SiteNav (sticky, navy logo, scroll shadow) → HeroSection (headline + 3 stats) → TradingProducts (3×2 grid, highlighted delivery card navy/white) → BrokerageCalculator (3-line: ZeroTrade fee / traditional fee strikethrough / you save in green) → TrustSection (SEBI / NSE / BSE / Depository badges) → TrustBar ('use client', Framer Motion stagger, dark bg) → Footer.

**Anti-patterns — never do these:**
- `brokerage`, `traditionalFee`, or `savings` in `useState` — all derived
- Intraday fee = `orderValue * 0.0003` alone — missing `Math.min(20, ...)` cap
- `formatBrokerageTag(product.flatFee)` — always pass both args
- `var(--color-green)` on anything except the "you save" line
- `font-weight: 700` — max is 600
- Hex in `.module.css`

`tsc --noEmit` must exit 0. `npm run build` must produce `/out`.

---

### 2 — ChatGPT Canvas

Create a Next.js 14 App Router project called `zerotrade` for an Indian discount stockbroker service page. TypeScript strict. CSS Modules (no Tailwind). Static export (`output: 'export'`).

**Setup:**
```bash
npx create-next-app@14 zerotrade --typescript --app --no-tailwind --eslint --src-dir --import-alias "@/*"
cd zerotrade
npm install lucide-react framer-motion
```

**Brand identity:** ZeroTrade. Navy `#1E3A5F` primary — 11.50:1 AAA contrast with white. DM Sans from Google Fonts (weights 400, 500, 600). Green `#15803D` reserved exclusively for the "you save" comparison line.

**Core utilities to implement in `src/lib/`:**

`calculateBrokerage.ts` — three-argument function:
```typescript
export function calculateBrokerage(
  flatFee: number,           // 0 (free) or 20 (max)
  percentFee: number | null, // 0.0003 for intraday, null for all others
  orderValue: number
): number {
  if (flatFee === 0) return 0
  if (percentFee !== null) return Math.min(flatFee, Math.ceil(orderValue * percentFee))
  return flatFee
}
```
The `Math.min` cap matters: for intraday orders below ₹66,666, the 0.03% charge is less than ₹20. Above that threshold, the flat cap applies.

`formatBrokerageTag.ts`:
```typescript
export function formatBrokerageTag(flatFee: number, percentFee: number | null): string {
  if (flatFee === 0) return '₹0'
  if (percentFee !== null) return `₹${flatFee} or ${(percentFee * 100).toFixed(2)}%`
  return `₹${flatFee} flat`
}
```

`data.ts` exports `TRADING_PRODUCTS` (6 items), `TRUST_BADGES` (4), `TRUST_STATS` (4), `HERO_STATS` (3), and `TRADITIONAL_FEE_RATE = 0.003`.

**BrokerageCalculator.tsx** — `'use client'`:
- State: `orderValue` (number, default 100000) and `productId` (string, default 'delivery')
- Derived (never state): `brokerage`, `traditionalFee`, `savings`
- 3-line comparison display with `aria-live="polite"`:
  1. "ZeroTrade brokerage" — `₹{brokerage}` dark
  2. "Traditional broker" — `₹{traditionalFee}` muted
  3. "You save" — `₹{savings}` in `var(--color-green)` ← only green use

**Product grid:** `TradingProducts.tsx` — 3×2 grid. Delivery card: `background: var(--color-navy); color: var(--color-white)`. No other card gets a coloured background.

`page.tsx` is a Server Component. No `'use client'` on `page.tsx`.

`tsc --noEmit` exits 0. `npm run build` exits 0.

---

### 3 — Bolt

Build **ZeroTrade** — an Indian discount stockbroker landing page in Next.js 14, TypeScript strict, CSS Modules, static export.

**What makes this build unique:** Two utilities working together — `calculateBrokerage` (handles ₹0 free products, flat ₹20, and intraday's `Math.min(₹20, 0.03%)`) and `formatBrokerageTag` (displays all three cases). The interactive `BrokerageCalculator` compares ZeroTrade's brokerage against a traditional broker's 0.3% fee, showing the user's savings in green.

**CSS tokens** (copy to `globals.css` `:root`, zero hex in `.module.css`):
```css
--color-navy:    #1E3A5F;   /* white on navy = 11.50:1 AAA ✓✓ */
--color-green:   #15803D;   /* you save ONLY — 5.02:1 ✓ */
--color-dark:    #111827;
--color-white:   #FFFFFF;
--color-surface: #F9FAFB;
--color-muted:   #6B7280;
--color-border:  #E5E7EB;
--color-footer:  #030712;
--font-sans:     'DM Sans', sans-serif;
--radius-card:   12px;
```

**layout.tsx:** `DM_Sans` from `next/font/google`, weights `['400', '500', '600']`. Never include `'700'`.

**Implement exactly:**
```typescript
// src/lib/calculateBrokerage.ts
export function calculateBrokerage(flatFee: number, percentFee: number | null, orderValue: number): number {
  if (flatFee === 0) return 0
  if (percentFee !== null) return Math.min(flatFee, Math.ceil(orderValue * percentFee))
  return flatFee
}

// src/lib/formatBrokerageTag.ts
export function formatBrokerageTag(flatFee: number, percentFee: number | null): string {
  if (flatFee === 0) return '₹0'
  if (percentFee !== null) return `₹${flatFee} or ${(percentFee * 100).toFixed(2)}%`
  return `₹${flatFee} flat`
}
```

**TradingProduct type:**
```typescript
export interface TradingProduct {
  id: string; name: string; description: string; icon: string
  flatFee: number; percentFee: number | null; highlighted: boolean
}
```

**BrokerageCalculator state — critical:**
```typescript
const [orderValue, setOrderValue] = useState<number>(100_000)
const [productId, setProductId]   = useState<string>('delivery')
// DERIVED — never setState on these:
const product        = TRADING_PRODUCTS.find(p => p.id === productId)!
const brokerage      = calculateBrokerage(product.flatFee, product.percentFee, orderValue)
const traditionalFee = Math.round(orderValue * TRADITIONAL_FEE_RATE)  // TRADITIONAL_FEE_RATE = 0.003
const savings        = traditionalFee - brokerage
```

**Page sections:** SiteNav → HeroSection → TradingProducts (3×2) → BrokerageCalculator → TrustSection (4 badges) → TrustBar (Framer Motion, dark bg) → Footer.

Verify: `tsc --noEmit` exits 0. `npm run build` produces `/out`.

---

### 4 — v0

Build a Next.js 14 App Router page for **ZeroTrade**, an Indian flat-fee stockbroker. TypeScript strict. CSS Modules. Static export. No Tailwind, no Shadcn.

**Design system:**
- Primary: Navy `#1E3A5F` — white on navy 11.50:1 ✓✓ AAA. Use for: buttons, logo, highlighted product card bg, nav active state.
- Savings: Green `#15803D` — 5.02:1 ✓ on white. Use ONLY for the "you save" line in BrokerageCalculator.
- Typeface: DM Sans (Google Fonts), 400/500/600. `--font-sans: 'DM Sans', sans-serif`.

**Component map:**
```
SiteNav.tsx          'use client' — sticky, scroll shadow, navy "ZeroTrade" logo
HeroSection.tsx      Server — headline + subheading + CTAs + 3 stat pills
TradingProducts.tsx  Server — 3×2 grid, delivery card navy/white (highlighted: true)
BrokerageCalculator.tsx  'use client' — segment select + value input + 3-line comparison
TrustSection.tsx     Server — 4 SEBI/NSE/BSE/Depository tiles, surface bg
TrustBar.tsx         'use client' — Framer Motion stagger, dark bg, 4 stats
Footer.tsx           Server — 4 columns, footer bg
page.tsx             Server Component — assembles all, no 'use client'
```

**BrokerageCalculator — 3-line comparison breakdown:**
```
Line 1: "ZeroTrade brokerage"   ₹{brokerage}      — dark or ₹0 (navy)
Line 2: "Traditional broker"    ₹{traditionalFee}  — muted
Line 3: "You save"              ₹{savings}         — var(--color-green) ← only green
```

`aria-live="polite"` on the breakdown container.

**Utilities:**
- `calculateBrokerage(flatFee, percentFee, orderValue)` — `Math.min(flatFee, Math.ceil(orderValue * percentFee))` for intraday; 0 for delivery/mutual funds; flat for F&O/currency/commodity
- `formatBrokerageTag(flatFee, percentFee)` — `'₹0'` | `'₹20 or 0.03%'` | `'₹20 flat'`
- `TRADITIONAL_FEE_RATE = 0.003` in `data.ts`

**Product grid rules:**
- Delivery card: `background: var(--color-navy); color: var(--color-white)` — 11.50:1 ✓✓ AAA
- All other cards: `background: var(--color-white)` with border
- `formatBrokerageTag(product.flatFee, product.percentFee)` on every card — both args always
- Never: `background: var(--color-green)` on any card

---

### 5 — Claude Artifacts

Build `bw_service_04` — ZeroTrade, an Indian discount stockbroker page. Next.js 14 App Router, TypeScript strict, CSS Modules, static export.

**`next.config.ts`:** `{ output: 'export', images: { unoptimized: true } }`

**Font:** `DM_Sans` from `next/font/google`, weights `['400', '500', '600']`, variable `'--font-sans'`.

**File tree:**
```
src/
  app/layout.tsx globals.css page.tsx
  components/
    layout/SiteNav.tsx(.module.css)  Footer.tsx(.module.css)
    home/
      HeroSection.tsx(.module.css)
      TradingProducts.tsx(.module.css)
      BrokerageCalculator.tsx(.module.css)
      TrustSection.tsx(.module.css)
      TrustBar.tsx(.module.css)
    ui/Button.tsx(.module.css)
  lib/
    calculateBrokerage.ts
    formatBrokerageTag.ts
    data.ts
  types/index.ts
```

**`src/types/index.ts`:**
```typescript
export interface TradingProduct {
  id: string; name: string; description: string; icon: string
  flatFee: number           // 0 or 20
  percentFee: number | null // 0.0003 for intraday, null otherwise
  highlighted: boolean
}
export interface TrustBadge { id: string; label: string; icon: string; description: string }
export interface TrustStat  { id: string; icon: string; value: string; label: string }
export interface HeroStat   { id: string; value: string; label: string }
```

**`src/lib/calculateBrokerage.ts`:**
```typescript
export function calculateBrokerage(
  flatFee: number, percentFee: number | null, orderValue: number
): number {
  if (flatFee === 0) return 0
  if (percentFee !== null) return Math.min(flatFee, Math.ceil(orderValue * percentFee))
  return flatFee
}
// calculateBrokerage(0, null, 100000)    → 0
// calculateBrokerage(20, null, 100000)   → 20
// calculateBrokerage(20, 0.0003, 10000)  → 3
// calculateBrokerage(20, 0.0003, 70000)  → 20
```

**`src/lib/formatBrokerageTag.ts`:**
```typescript
export function formatBrokerageTag(flatFee: number, percentFee: number | null): string {
  if (flatFee === 0) return '₹0'
  if (percentFee !== null) return `₹${flatFee} or ${(percentFee * 100).toFixed(2)}%`
  return `₹${flatFee} flat`
}
// formatBrokerageTag(0, null)      → '₹0'
// formatBrokerageTag(20, null)     → '₹20 flat'
// formatBrokerageTag(20, 0.0003)   → '₹20 or 0.03%'
```

**`data.ts`:** exports `TRADING_PRODUCTS` (6), `TRUST_BADGES` (4), `TRUST_STATS` (4), `HERO_STATS` (3), `TRADITIONAL_FEE_RATE = 0.003`.

**`BrokerageCalculator.tsx`:** `'use client'`. State: `orderValue: number = 100_000`, `productId: string = 'delivery'`. Derived inline (never useState): `product`, `brokerage`, `traditionalFee = Math.round(orderValue * TRADITIONAL_FEE_RATE)`, `savings = traditionalFee - brokerage`. Breakdown: `aria-live="polite"`. Line 3 "You save" uses `var(--color-green)`.

**`TradingProducts.tsx`:** 3×2 grid. `highlighted` card → `.cardHighlighted { background: var(--color-navy); color: var(--color-white) }`. Icon on highlighted → `.iconWhite { color: var(--color-white) }`. Description on highlighted → white, opacity 0.8. `formatBrokerageTag(product.flatFee, product.percentFee)` on every card — both args, always.

**Forbidden:**
- `useState` for `brokerage`, `traditionalFee`, or `savings`
- `orderValue * percentFee` without `Math.min(flatFee, ...)` for intraday
- `formatBrokerageTag(product.flatFee)` — missing second arg
- `var(--color-green)` outside `BrokerageCalculator.module.css`
- `font-weight: 700`
- Hex in `.module.css`

Gate: `tsc --noEmit` exits 0. `npm run build` exits 0, `/out` present.

---

### 6 — Grok

Implement a Next.js 14 static export page for **ZeroTrade**, an Indian flat-fee stockbroker service page. TypeScript strict mode, CSS Modules, no Tailwind.

**Step 1 — Scaffold:**
```bash
npx create-next-app@14 zerotrade --typescript --app --no-tailwind --eslint --src-dir --import-alias "@/*"
npm install lucide-react framer-motion
```
`next.config.ts`: `output: 'export'`, `images.unoptimized: true`.

**Step 2 — Tokens (`globals.css`):**
8 tokens: navy `#1E3A5F`, green `#15803D`, dark `#111827`, white `#FFFFFF`, surface `#F9FAFB`, muted `#6B7280`, border `#E5E7EB`, footer `#030712`. Plus `--font-sans: 'DM Sans', sans-serif`. Zero hex in `.module.css`.

**Step 3 — Types (`src/types/index.ts`):**
```typescript
export interface TradingProduct {
  id: string; name: string; description: string; icon: string
  flatFee: number; percentFee: number | null; highlighted: boolean
}
```

**Step 4 — Utilities:**

`calculateBrokerage(flatFee, percentFee, orderValue)`:
- If `flatFee === 0`: return 0
- If `percentFee !== null`: return `Math.min(flatFee, Math.ceil(orderValue * percentFee))`
- Otherwise: return `flatFee`

`formatBrokerageTag(flatFee, percentFee)`:
- If `flatFee === 0`: `'₹0'`
- If `percentFee !== null`: `'₹{flatFee} or {percentFee*100 toFixed 2}%'`
- Otherwise: `'₹{flatFee} flat'`

Constant in `data.ts`: `export const TRADITIONAL_FEE_RATE = 0.003`

**Step 5 — BrokerageCalculator.tsx** (`'use client'`):
State: `orderValue = 100000`, `productId = 'delivery'`. Computed per render: `product`, `brokerage = calculateBrokerage(...)`, `traditionalFee = Math.round(orderValue * TRADITIONAL_FEE_RATE)`, `savings = traditionalFee - brokerage`. Breakdown div: `aria-live="polite"`. Three lines: (1) ZeroTrade brokerage in dark, (2) traditional fee in muted, (3) savings in green — the only use of `var(--color-green)`.

**Step 6 — TradingProducts.tsx**: 3×2 grid. Equity Delivery is highlighted: `background: var(--color-navy)`, white text (11.50:1 AAA). Other cards: white bg, dark text. Show `formatBrokerageTag(product.flatFee, product.percentFee)` on each card — always both arguments.

**Step 7 — TrustBar.tsx** (`'use client'`): Framer Motion stagger on 4 stats, `viewport={{ once: true }}`, dark footer bg.

**Step 8 — page.tsx**: Server Component, imports all sections. No `'use client'`.

**Verify:** `npx tsc --noEmit && npm run build`

---

### 7 — Gemini

Create a Next.js 14 App Router website for **ZeroTrade** — an Indian discount stock brokerage service page styled after Zerodha's honest, jargon-free brand. Use TypeScript strict mode, CSS Modules (no Tailwind), and static export.

**Brand identity:** ZeroTrade communicates one thing clearly — low fees. Navy `#1E3A5F` is the primary brand colour. White on navy achieves 11.50:1 contrast ratio, which is AAA — the strongest contrast in the BusiWeb service library. DM Sans (400/500/600) reinforces the clean, approachable tone. Green `#15803D` appears exactly once: the "You save" line in the calculator. Nowhere else.

**Page structure:**

*SiteNav* — Sticky top bar. `'use client'`. Navy "ZeroTrade" logo text. Links: Products / Pricing / Learn / About. "Open Account" button (navy bg, white text). Scroll shadow on scroll.

*HeroSection* — "Zero brokerage on equity delivery. ₹20 flat on everything else." Subheading explaining the model in one sentence. "Open Account" + "See Pricing" CTAs. Three stat pills: "1.5 Crore+ Clients" / "₹0 Delivery Brokerage" / "15 Years Track Record".

*TradingProducts* — Six products in a 3×2 grid. Equity Delivery is highlighted: navy background, white text. The grid breaks to 2 columns on tablet and 1 on mobile. Each card shows the fee tag from `formatBrokerageTag(product.flatFee, product.percentFee)`.

*BrokerageCalculator* — `'use client'`. A segment selector and order value input. Only `orderValue` and `productId` are in React state. Everything else is computed: brokerage via `calculateBrokerage`, traditional fee as `Math.round(orderValue × 0.003)`, savings as the difference. The comparison reads as a story: "ZeroTrade charges ₹20. A traditional broker would charge ₹300. You save ₹280." The savings amount is the only element using `var(--color-green)`.

*TrustSection* — Four certification tiles on surface background: SEBI Registered / NSE Member / BSE Member / CDSL Depository. Blue icons on white tiles.

*TrustBar* — Dark footer background. Four stats animate in with Framer Motion stagger when scrolled into view (`viewport={{ once: true }}`). `'use client'`.

*Footer* — `var(--color-footer)` background, four link columns, white text.

**Utility signatures — implement exactly:**
```typescript
calculateBrokerage(flatFee: number, percentFee: number | null, orderValue: number): number
formatBrokerageTag(flatFee: number, percentFee: number | null): string
```

**Never do:**
- Store `brokerage`, `traditionalFee`, or `savings` in `useState`
- Apply `var(--color-green)` to anything except the savings line
- Call `formatBrokerageTag` with one argument
- Write hex values in `.module.css` files
- Use `font-weight: 700`

Both `tsc --noEmit` and `npm run build` must exit 0.

---

### 8 — Cursor

**Project:** ZeroTrade — Indian flat-fee stockbroker page. Next.js 14 App Router + TypeScript strict + CSS Modules + static export.

**New in this build (not in prior service builds):**
- `Math.min` in fee calculation — intraday is `min(₹20, 0.03%)` not a flat rate
- 3-line comparison calculator (ZeroTrade vs traditional) vs 3-line fee deduction (bw_service_03)
- 3×2 product grid
- Navy `#1E3A5F` — 11.50:1 AAA (highest contrast primary in library)
- `TRADITIONAL_FEE_RATE = 0.003` constant — drives comparison math

**Types to define in `src/types/index.ts`:**
```typescript
export interface TradingProduct {
  id: string
  name: string
  description: string
  icon: string
  flatFee: number           // 0 = free, 20 = charged
  percentFee: number | null // 0.0003 for intraday only, null otherwise
  highlighted: boolean
}
```

**Utilities — critical signatures:**
```typescript
// src/lib/calculateBrokerage.ts
// The percentFee branch uses Math.min — this is intentional, matches real Zerodha behaviour
export function calculateBrokerage(
  flatFee: number,
  percentFee: number | null,
  orderValue: number
): number {
  if (flatFee === 0) return 0
  if (percentFee !== null) return Math.min(flatFee, Math.ceil(orderValue * percentFee))
  return flatFee
}

// src/lib/formatBrokerageTag.ts
// 3 display cases — conditional logic lives here, never in JSX
export function formatBrokerageTag(flatFee: number, percentFee: number | null): string {
  if (flatFee === 0) return '₹0'
  if (percentFee !== null) return `₹${flatFee} or ${(percentFee * 100).toFixed(2)}%`
  return `₹${flatFee} flat`
}
```

**BrokerageCalculator.tsx:** Only `orderValue: number` and `productId: string` in useState. Derive per render:
```typescript
const product        = TRADING_PRODUCTS.find(p => p.id === productId)!
const brokerage      = calculateBrokerage(product.flatFee, product.percentFee, orderValue)
const traditionalFee = Math.round(orderValue * TRADITIONAL_FEE_RATE)
const savings        = traditionalFee - brokerage
```
Three output lines in `aria-live="polite"` div. Line 3 ("You save") → `var(--color-green)`. This is the only green in the project.

**Product card rules:** Equity Delivery card (`highlighted: true`) → `background: var(--color-navy); color: var(--color-white)`. No other coloured backgrounds. `formatBrokerageTag(product.flatFee, product.percentFee)` on every card.

**Structural checks:**
```bash
grep -r "useState.*brokerage\|useState.*savings\|useState.*traditional" src  # must be empty
grep -r "color-green" src --include="*.module.css" | grep -v BrokerageCalculator  # must be empty
grep -r "font-weight.*700" src  # must be empty
npx tsc --noEmit && npm run build
```
