# bw_service_03
## Indian Payment Gateway Service Page · Razorpay pattern
### Inspiration: razorpay.com — Indian fintech service page, clear pricing, trust signals

---

## Base Prompt

**Role:** Senior product designer specialising in Indian fintech service pages and payment infrastructure, with expertise in fee transparency UX, interactive calculators, and institutional trust signal design.

**Application Overview:**
PayFlow is an Indian payment gateway SaaS platform targeting Indian SMBs, D2C e-commerce stores, and tech startups integrating payments. Visitors are developers evaluating APIs or business owners comparing gateway options. The primary conversion goal: create a free PayFlow account to start integration — no commitment required.

**Brand Voice & Mood:**
Trustworthy, transparent, technically capable. Blue (`#1D4ED8`) communicates reliability and institutional credibility without the coldness of traditional banking. The site positions PayFlow as honest — fees are shown openly, not buried. Copy is clear and direct: "Accept payments online. ₹0 setup. 2% per transaction." The tone is confident but approachable — a tool for builders, not a bank's marketing brochure. Green is reserved exclusively for "you receive" amounts, reinforcing the brand's financial transparency ethic.

**Core Features:**
1. Sticky navigation — blue logo, nav links (Products / Pricing / Docs / About), "Create Account" blue CTA
2. Hero section — headline + 2-line subhead + CTA pair + 3 inline trust stats (merchants, uptime, success rate)
3. Payment products — 4-card 2×2 grid; highlighted "Payment Gateway" card in blue background
4. Fee calculator — interactive: product selector + amount input + live 3-line breakdown (Amount charged / Transaction fee / You receive)
5. Trust section — 4 certification tiles (PCI-DSS Level 1, ISO 27001, RBI Compliant, SOC 2)
6. Payment methods — 6 method pills: UPI, Credit Card, Debit Card, Net Banking, EMI, Wallet
7. Trust bar — dark background, 4 operational stats
8. Footer — deep dark background, 4-column layout

**Design Specifications:**

Color palette (8 tokens):
- Blue: `#1D4ED8` — brand, nav, CTAs, highlighted product card bg; white on blue = 6.65:1 ✓ AA
- Green: `#15803D` — "You receive" amount display ONLY; on white = 5.02:1 ✓ AA
- Dark: `#111827` — headings and body text
- White: `#FFFFFF` — page background, card backgrounds
- Surface: `#F9FAFB` — section alternates, calculator breakdown background
- Muted: `#6B7280` — metadata, transaction fee display
- Border: `#E5E7EB` — card and input borders
- Footer: `#030712` — deep dark footer background

Critical contrast rules: White on blue = 6.65:1 ✓ AA. Green on white = 5.02:1 ✓ AA. Green is NEVER used as UI chrome — only for positive money amounts.

Typography: Manrope (Google Fonts) weights 400/500/600 only. No weight 700. H1: `clamp(2.5rem, 5vw, 3.5rem)` weight 600. Product name: 1.0625rem weight 600. Calculator price: `clamp(1.5rem, 2vw, 1.875rem)` weight 600. Body: 1rem/1.6 weight 400.

Border radius: 16px on calculator card, 12px on product cards and trust tiles, 8px on inputs and buttons. No `border-radius: 50%`.

Spacing: 8pt grid. Product grid gap: 20px. Section vertical padding: `clamp(60px, 8vw, 120px)`.

**Structure:**
1. SiteNav — sticky, white bg, blue "PayFlow" text logo, nav links (Products / Pricing / Docs / About), "Create Account" blue filled button
2. HeroSection — centered: H1, 2-line subhead, primary CTA (blue) + secondary CTA (outline), 3 inline stat pills (merchants count / uptime / success rate)
3. PaymentProducts — section heading, 2×2 grid of 4 product cards; Payment Gateway card highlighted (blue bg + white text); each shows `formatFeeRate`
4. FeeCalculator — "Calculate your fees" heading; product `<select>`, amount `<input>`, 3-line breakdown in bordered card on surface bg
5. TrustSection — surface bg, 4 certification tiles in 4-col or 2×2 grid (PCI-DSS / ISO 27001 / RBI Compliant / SOC 2)
6. PaymentMethods — white bg, "We support" heading, 6 method pills
7. TrustBar — dark `#030712` bg, 4 stats, Framer Motion stagger
8. Footer — `#030712` bg, 4-column layout

**Technical Specifications:**
- Framework: Next.js 14 App Router, TypeScript strict
- CSS: CSS Modules — zero hex in `.module.css` files, all colors via `var(--color-*)`
- Client boundary: `'use client'` on `FeeCalculator` only — all other sections are Server Components
- State: `amount: number` (default 10000) and `productId: string` (default 'pg') in FeeCalculator — all fee values are derived, never stored in state
- Utilities: `calculateTransactionFee(amount, feeRate, feeFixed)` and `formatFeeRate(feeRate, feeFixed)` — both in `src/lib/`
- Fonts: Manrope via `next/font/google`, weights `['400', '500', '600']`
- Export: static (`output: 'export'`)
- Animation: Framer Motion on section reveals and TrustBar stagger; `viewport={{ once: true }}`; `prefers-reduced-motion` respected

**Implementation Steps:**
1. Types: `PaymentProduct`, `TrustBadge`, `PaymentMethod`, `TrustStat`
2. Utilities: `calculateTransactionFee(amount, feeRate, feeFixed)` and `formatFeeRate(feeRate, feeFixed)` — both tested
3. Mock data: 4 payment products, 4 trust badges, 6 payment methods, 4 trust stats, 3 hero stats
4. FeeCalculator (the primary conversion section — interactive, builds trust through transparency)
5. PaymentProducts (product grid with fee labels)
6. SiteNav + HeroSection (above-the-fold credibility)
7. TrustSection + PaymentMethods (mid-funnel proof)
8. TrustBar + Footer

**User Experience:**
The visitor arrives comparing payment gateway options for their business or app. They scan the hero: the fee rate (2%) and no setup cost are in the headline — PayFlow is transparent about pricing upfront. They scroll to products to understand what they're signing up for. The fee calculator is the critical trust-builder: they enter their expected order value and see exactly what they'll pay and receive — before committing. The certification badges remove any remaining security concerns. The "Create Account" CTA appears in the nav (persistent) and hero — low friction, always visible.

**Constraints:**
- `calculateTransactionFee(amount, feeRate, feeFixed)` is the ONLY fee formula — never `amount * (1 - feeRate)` which breaks for products with `feeFixed > 0`
- `formatFeeRate(feeRate, feeFixed)` always requires both arguments — the conditional is inside the function, not in JSX
- `var(--color-green)` used ONLY for the "You receive" line in FeeCalculator — forbidden on product cards, nav, icons, section headings
- `fee` and `received` are derived values — never stored in `useState` (only `amount` and `productId` are state)
- Highlighted product card: `background: var(--color-blue); color: var(--color-white)` — NEVER `background: var(--color-green)` on any product card
- No `font-weight: 700` anywhere — Manrope 600 is the maximum
- No `border-radius: 50%` anywhere
- No hex values in `.module.css` files — CSS custom properties only
- FeeCalculator `aria-live="polite"` on the breakdown container — screen readers must hear updated values
- Static export — no server-side API routes

---

## Platform Versions

---

### 1 — Lovable

Build **PayFlow** — an Indian payment gateway SaaS service page — using Next.js 14 App Router, TypeScript strict, CSS Modules. No Tailwind. Static export. Font: Manrope 400/500/600 via `next/font/google`. No weight 700.

**Brand: Blue `#1D4ED8`.** Token system in `globals.css`:
```css
--color-blue:    #1D4ED8;  /* brand — white on blue = 6.65:1 ✓ */
--color-green:   #15803D;  /* "you receive" amounts, positive states — 5.02:1 on white ✓ */
--color-dark:    #111827;  /* headings, body text */
--color-white:   #FFFFFF;
--color-surface: #F9FAFB;  /* section alternates */
--color-muted:   #6B7280;
--color-border:  #E5E7EB;
--color-footer:  #030712;  /* deep dark footer */
```

Zero hex in `.module.css`. White on blue = 6.65:1 ✓ AA. Green on white = 5.02:1 ✓ AA.

**This build introduces a transaction fee pricing model — completely different from all prior builds:**
- **Prior builds:** monthly subscription price (bw_service_01) or project budget range (bw_service_02)
- **This build:** per-transaction percentage fee — `2.0%` of each payment processed
- **Fee calculator:** `calculateTransactionFee(amount, feeRate, feeFixed)` — first 3-argument utility in library
- **Tri-line breakdown:** Amount charged · Transaction fee (muted) · You receive (green)
- **`formatFeeRate(feeRate, feeFixed)`** → `'2.0%'` or `'2.0% + ₹3'`
- **`PaymentProduct`** — each product has its own `feeRate` and `feeFixed`; calculator switches products
- **Trust badge section** — security certifications as content (PCI-DSS, ISO 27001, RBI compliance, SOC 2)
- **Payment methods display** — UPI, Credit Card, Debit Card, Net Banking, EMI, Wallet

**New types unique to this build:**
```typescript
export interface PaymentProduct {
  id: string
  name: string
  description: string
  icon: string
  feeRate: number        // e.g. 0.02 = 2%
  feeFixed: number       // fixed INR fee per transaction (0 for most products)
  highlighted: boolean   // true for 'Payment Gateway' (primary product)
}

export interface TrustBadge {
  id: string
  label: string
  icon: string
  description: string    // e.g. 'PCI-DSS Level 1 Certified'
}

export interface PaymentMethod {
  id: string
  name: string           // 'UPI', 'Credit Card', 'Net Banking' etc.
  category: 'digital' | 'card' | 'banking' | 'credit'
}
```

**New utilities:**
```typescript
// calculateTransactionFee.ts
export function calculateTransactionFee(
  amount: number,
  feeRate: number,
  feeFixed: number = 0
): number {
  return Math.round(amount * feeRate + feeFixed)
}
// calculateTransactionFee(10000, 0.02, 0) → 200
// calculateTransactionFee(10000, 0.02, 3) → 203

// formatFeeRate.ts
export function formatFeeRate(feeRate: number, feeFixed: number): string {
  const pct = `${(feeRate * 100).toFixed(1)}%`
  return feeFixed === 0 ? pct : `${pct} + ₹${feeFixed}`
}
// formatFeeRate(0.02, 0) → '2.0%'
// formatFeeRate(0.015, 3) → '1.5% + ₹3'
```

**4 PaymentProduct entries:**
```typescript
[
  { id: 'pg',  name: 'Payment Gateway',  feeRate: 0.02,  feeFixed: 0, highlighted: true  },
  { id: 'pl',  name: 'Payment Links',    feeRate: 0.02,  feeFixed: 0, highlighted: false },
  { id: 'sub', name: 'Subscriptions',    feeRate: 0.02,  feeFixed: 0, highlighted: false },
  { id: 'po',  name: 'Payment Pages',    feeRate: 0.015, feeFixed: 0, highlighted: false },
]
```

**Page sections:**
1. **SiteNav** — blue logo, nav links (Products / Pricing / Docs / About), "Create Account" blue CTA
2. **HeroSection** — headline + subheading + CTA pair + 3 key inline stats (merchants, uptime, success rate)
3. **PaymentProducts** — 4 product cards in 2×2 grid, highlighted card in blue bg + white text
4. **FeeCalculator** — `'use client'`, product selector + amount input + live tri-line breakdown
5. **TrustSection** — 4 TrustBadge tiles (security certifications)
6. **PaymentMethods** — 6 payment method pills in a centred row
7. **TrustBar** — dark bg, 4 stats with Framer Motion stagger
8. **Footer** — deep dark bg

**`FeeCalculator`** — `'use client'`:
```tsx
const [amount, setAmount] = useState(10_000)
const [productId, setProductId] = useState('pg')
const product = PAYMENT_PRODUCTS.find(p => p.id === productId)!
const fee = calculateTransactionFee(amount, product.feeRate, product.feeFixed)
const received = amount - fee

// CRITICAL: received = amount - calculateTransactionFee(...)
// NEVER: received = amount * (1 - product.feeRate)  — wrong for products with feeFixed > 0
```

**Tri-line display:**
```tsx
<div className={styles.line}>
  <span>Amount charged</span>
  <span className={styles.amount}>₹{amount.toLocaleString('en-IN')}</span>
</div>
<div className={styles.line}>
  <span>Transaction fee ({formatFeeRate(product.feeRate, product.feeFixed)})</span>
  <span className={styles.fee}>−₹{fee.toLocaleString('en-IN')}</span>
</div>
<div className={styles.line}>
  <span>You receive</span>
  <span className={styles.received}>₹{received.toLocaleString('en-IN')}</span>
  {/* .received { color: var(--color-green); } — green = positive money amount */}
</div>
```

**Highlighted `PaymentProduct` card:**
```css
.cardHighlighted {
  background: var(--color-blue);  /* white text on blue = 6.65:1 ✓ */
  color: var(--color-white);
}
/* Never: background: var(--color-green) on product cards */
```

**Anti-patterns:**
- Never `received = amount * (1 - feeRate)` — bypasses `calculateTransactionFee` and breaks for `feeFixed > 0`
- Never `color: var(--color-green)` outside the "you receive" / positive-amount context
- Never `formatFeeRate(product.feeRate)` without passing `feeFixed` — 2-arg call is required
- Never `font-weight: 700` anywhere
- Never `border-radius: 50%` anywhere

**`tsc --noEmit` exits 0. `npm run build` produces `/out`.**

---

### 2 — ChatGPT Canvas

Create **PayFlow** — Indian payment gateway SaaS service page — Next.js 14, TypeScript strict, CSS Modules. Static export.

```bash
npx create-next-app@latest payflow --typescript --app --no-tailwind --import-alias "@/*"
npm install lucide-react framer-motion
```

**Tokens:**
```css
:root {
  --color-blue:    #1D4ED8;
  --color-green:   #15803D;
  --color-dark:    #111827;
  --color-white:   #FFFFFF;
  --color-surface: #F9FAFB;
  --color-muted:   #6B7280;
  --color-border:  #E5E7EB;
  --color-footer:  #030712;
}
```

Font: Manrope 400/500/600. No weight 700. Zero hex in `.module.css`.

**Contrast:** White on blue = 6.65:1 ✓. Green on white = 5.02:1 ✓.

**New types** (unique to this build — first payment/fintech build):
- `PaymentProduct { id, name, description, icon, feeRate, feeFixed, highlighted }`
- `TrustBadge { id, label, icon, description }`
- `PaymentMethod { id, name, category }`

**New utilities:**
- `calculateTransactionFee(amount, feeRate, feeFixed?)` → `Math.round(amount * feeRate + feeFixed)`
- `formatFeeRate(feeRate, feeFixed)` → `'2.0%'` or `'2.0% + ₹3'`

**FeeCalculator pattern — 3 derived values from one utility:**
```typescript
const fee = calculateTransactionFee(amount, product.feeRate, product.feeFixed)
const received = amount - fee
// received displayed in var(--color-green)
// fee displayed in var(--color-muted) with minus prefix
```

**Key components:**
- `FeeCalculator` — `'use client'`, product selector (4 products), amount input, live tri-line breakdown
- `PaymentProducts` — 4 product cards, highlighted card in blue bg + white text
- `TrustSection` — 4 TrustBadge tiles in 2×2 or 4-col grid
- `PaymentMethods` — 6 method pills (UPI, Credit Card, Debit Card, Net Banking, EMI, Wallet)

---

### 3 — Bolt

Build **PayFlow** — Indian payment gateway SaaS service page. Next.js 14, TypeScript strict, CSS Modules, no Tailwind. Static export.

```bash
npx create-next-app@latest payflow --typescript --app --no-tailwind --import-alias "@/*"
npm install lucide-react framer-motion
```

**8 tokens:** `--color-blue: #1D4ED8` · `--color-green: #15803D` · `--color-dark: #111827` · `--color-white: #FFFFFF` · `--color-surface: #F9FAFB` · `--color-muted: #6B7280` · `--color-border: #E5E7EB` · `--color-footer: #030712`

Font: Manrope 400/500/600. No weight 700. Zero hex in `.module.css`.

**File structure:**
```
src/
  types/index.ts          — PaymentProduct, TrustBadge, PaymentMethod, TrustStat
  lib/
    data.ts               — PAYMENT_PRODUCTS (4), TRUST_BADGES (4), PAYMENT_METHODS (6), TRUST_STATS (4)
    calculateTransactionFee.ts — Math.round(amount * feeRate + feeFixed)
    formatFeeRate.ts       — '2.0%' or '2.0% + ₹3'
  components/
    layout/SiteNav.tsx + .module.css
    layout/Footer.tsx + .module.css
    home/
      HeroSection.tsx + .module.css      — headline + stats row
      PaymentProducts.tsx + .module.css  — 4 product cards grid
      FeeCalculator.tsx + .module.css    — 'use client', product select + amount + tri-line
      TrustSection.tsx + .module.css     — 4 TrustBadge tiles
      PaymentMethods.tsx + .module.css   — 6 method pills
      TrustBar.tsx + .module.css         — dark bg, Framer Motion stagger
    ui/
      Button.tsx + .module.css           — blue / outlineBlue / ghost
  app/globals.css, layout.tsx, page.tsx
```

**Critical rules:**
1. `received = amount - calculateTransactionFee(amount, product.feeRate, product.feeFixed)` — never `amount * (1 - feeRate)` (wrong when `feeFixed > 0`)
2. `formatFeeRate(product.feeRate, product.feeFixed)` — always pass both arguments
3. `var(--color-green)` for received amount display only — not for UI chrome
4. Highlighted product card: `background: var(--color-blue); color: var(--color-white)` — 6.65:1 ✓
5. Product selector `<select>` is controlled — drives both fee display AND `formatFeeRate` display

**QA checks:**
```bash
grep -r "amount.*feeRate\b\|1 - product\.feeRate" src/components  # empty — use calculateTransactionFee
grep -r "font-weight: 700" src --include="*.module.css"            # empty
grep -r "border-radius: 50%" src --include="*.module.css"          # empty
grep -r "#[0-9A-Fa-f]" src/components --include="*.module.css"    # empty
```

---

### 4 — v0

Design **PayFlow** component CSS system — Indian payment gateway SaaS. Next.js 14, TypeScript, CSS Modules, no Tailwind.

**Tokens:** `--color-blue: #1D4ED8` + 7 others. Manrope 400/500/600. Zero hex in modules.

**FeeCalculator.module.css:**
```css
.calculator {
  background: var(--color-white);
  border: 1.5px solid var(--color-border);
  border-radius: 16px;
  padding: 32px;
  max-width: 480px;
}
.heading { font-size: 1.125rem; font-weight: 600; color: var(--color-dark); margin-bottom: 20px; }

.productSelect {
  width: 100%; border: 1.5px solid var(--color-border); border-radius: 8px;
  padding: 10px 14px; font-family: var(--font-sans);
  font-size: 0.9375rem; color: var(--color-dark);
  margin-bottom: 16px; appearance: none;
}
.productSelect:focus { outline: none; border-color: var(--color-blue); }

.amountLabel { font-size: 0.875rem; color: var(--color-muted); margin-bottom: 6px; }
.amountInput {
  width: 100%; border: 1.5px solid var(--color-border); border-radius: 8px;
  padding: 10px 14px; font-family: var(--font-sans);
  font-size: 1rem; color: var(--color-dark); margin-bottom: 20px;
}
.amountInput:focus { outline: none; border-color: var(--color-blue); }

.breakdown {
  background: var(--color-surface); border-radius: 10px; padding: 16px;
  display: flex; flex-direction: column; gap: 10px;
}
.line {
  display: flex; justify-content: space-between; align-items: center;
  font-size: 0.9375rem;
}
.lineLabel  { color: var(--color-muted); }
.lineAmount { font-weight: 600; color: var(--color-dark); }
.lineFee    { font-weight: 600; color: var(--color-muted); }
.lineReceived {
  font-weight: 600;
  color: var(--color-green);    /* green = positive, money received — 5.02:1 ✓ */
}
.divider { border: none; border-top: 1px solid var(--color-border); margin: 4px 0; }
```

**PaymentProducts.module.css:**
```css
.grid {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px;
  max-width: 900px; margin: 0 auto;
}
@media (max-width: 640px) { .grid { grid-template-columns: 1fr; } }

.card {
  background: var(--color-white); border: 1.5px solid var(--color-border);
  border-radius: 12px; padding: 28px 24px;
  transition: box-shadow 0.2s ease;
}
.card:hover { box-shadow: 0 4px 20px rgba(29,78,216,0.1); }

.cardHighlighted {
  background: var(--color-blue);   /* white text on blue = 6.65:1 ✓ */
  color: var(--color-white);
  border-color: var(--color-blue);
}
/* NEVER: background: var(--color-green) on product cards */

.icon { color: var(--color-blue); margin-bottom: 12px; }
.iconHighlighted { color: var(--color-white); margin-bottom: 12px; }
/* icon on highlighted card must also be white */
.name { font-size: 1.0625rem; font-weight: 600; margin-bottom: 8px; }
.description { font-size: 0.875rem; color: var(--color-muted); }
.descriptionHighlighted { font-size: 0.875rem; color: var(--color-white); opacity: 0.85; }
.fee { font-size: 0.8125rem; font-weight: 600; margin-top: 12px; }
```

**TrustSection.module.css:**
```css
.section { background: var(--color-surface); padding: 64px 24px; }
.grid {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px;
  max-width: 1100px; margin: 0 auto;
}
@media (max-width: 768px) { .grid { grid-template-columns: repeat(2, 1fr); } }

.tile {
  background: var(--color-white); border: 1px solid var(--color-border);
  border-radius: 12px; padding: 24px 20px; text-align: center;
}
.icon { color: var(--color-blue); margin-bottom: 10px; }
.label { font-size: 0.875rem; font-weight: 600; color: var(--color-dark); }
.description { font-size: 0.75rem; color: var(--color-muted); margin-top: 4px; }
```

**Button:** `.blue` → `background: var(--color-blue); color: var(--color-white)` — 6.65:1 ✓. `.outlineBlue` → `color: var(--color-blue); border: 1.5px solid var(--color-blue)`.

---

### 5 — Claude Artifacts

Build **PayFlow** — production-quality Indian payment gateway SaaS service page — Next.js 14 App Router, TypeScript strict, CSS Modules. No Tailwind. Static export. Manrope 400/500/600.

**Four defining constraints for this build:**

**Constraint 1 — `calculateTransactionFee` is the only fee formula:**
```typescript
export function calculateTransactionFee(
  amount: number, feeRate: number, feeFixed: number = 0
): number {
  return Math.round(amount * feeRate + feeFixed)
}

// CORRECT: received = amount - calculateTransactionFee(amount, p.feeRate, p.feeFixed)
// WRONG:   received = amount * (1 - p.feeRate)   ← fails for feeFixed > 0
// WRONG:   received = amount - amount * 0.02     ← hardcoded rate
```
The utility rounds to the nearest rupee (as payment gateways do). The third argument `feeFixed` defaults to 0 so percentage-only products work without passing the third arg — but `formatFeeRate` always needs it.

**Constraint 2 — `formatFeeRate` takes both rate AND fixed:**
```typescript
export function formatFeeRate(feeRate: number, feeFixed: number): string {
  const pct = `${(feeRate * 100).toFixed(1)}%`
  return feeFixed === 0 ? pct : `${pct} + ₹${feeFixed}`
}
// Always pass both args — the conditional is inside the function, not in JSX
```

**Constraint 3 — Green is "you receive" only:**
```css
/* Green = money received — positive financial outcome */
.lineReceived { color: var(--color-green); }

/* Green MUST NOT appear in: */
/* — product card backgrounds */
/* — nav elements */
/* — section headings */
/* — icon tints (use blue for icons) */
```

**Constraint 4 — Product state drives both fee display and rate label:**
```tsx
const product = PAYMENT_PRODUCTS.find(p => p.id === productId)!
const fee = calculateTransactionFee(amount, product.feeRate, product.feeFixed)
const received = amount - fee
// The product selector change cascades to: feeRate, feeFixed, fee, received, formatFeeRate
// All derived — never store fee or received in state
```

**Complete type system:**
```typescript
export interface PaymentProduct {
  id: string; name: string; description: string; icon: string
  feeRate: number     // 0.02 = 2% — used in calculateTransactionFee
  feeFixed: number    // 0 or fixed INR — used in calculateTransactionFee + formatFeeRate
  highlighted: boolean
}

export interface TrustBadge { id: string; label: string; icon: string; description: string }
export interface PaymentMethod { id: string; name: string; category: 'digital' | 'card' | 'banking' | 'credit' }
export interface TrustStat { id: string; icon: string; value: string; label: string }
```

**All QA checks:**
```bash
tsc --noEmit
grep -r "#[0-9A-Fa-f]" src/components --include="*.module.css"   # empty
grep -r "feeRate\b" src/components --include="*.tsx"              # only in FeeCalculator via utility
grep -r "1 - product\.feeRate\|amount \* 0\.0[0-9]" src/components  # empty (use calculateTransactionFee)
grep -r "font-weight: 700" src --include="*.module.css"           # empty
grep -r "border-radius: 50%" src --include="*.module.css"         # empty
npm run build
```

---

### 6 — Grok

Generate all source files for **PayFlow** — Indian payment gateway SaaS service page. Next.js 14, TypeScript strict, CSS Modules. Static export. Manrope 400/500/600.

Generate in order:
1. `src/types/index.ts` — PaymentProduct, TrustBadge, PaymentMethod, TrustStat
2. `src/lib/calculateTransactionFee.ts` — `Math.round(amount * feeRate + feeFixed)`
3. `src/lib/formatFeeRate.ts` — `'2.0%'` or `'2.0% + ₹3'`
4. `src/lib/data.ts` — PAYMENT_PRODUCTS (4), TRUST_BADGES (4), PAYMENT_METHODS (6), TRUST_STATS (4)
5. `src/app/globals.css` — 8 tokens (blue brand + green for received), .sr-only, prefers-reduced-motion
6. `src/app/layout.tsx` — `Manrope` from `next/font/google`, weights `['400','500','600']`
7. `src/components/ui/Button.tsx + .module.css` — blue / outlineBlue / ghost
8. `src/components/layout/SiteNav.tsx + .module.css` — sticky, blue logo
9. `src/components/layout/Footer.tsx + .module.css` — footer bg
10. `src/components/home/HeroSection.tsx + .module.css` — headline + 3 inline stats
11. `src/components/home/PaymentProducts.tsx + .module.css` — 4 product cards (2×2 grid)
12. `src/components/home/FeeCalculator.tsx + .module.css` — 'use client', product select + amount + tri-line
13. `src/components/home/TrustSection.tsx + .module.css` — 4 TrustBadge tiles
14. `src/components/home/PaymentMethods.tsx + .module.css` — 6 method pills
15. `src/components/home/TrustBar.tsx + .module.css` — dark bg, Framer Motion stagger
16. `src/app/page.tsx`

**Rules for every file:**
- No hex in `.module.css`; no `font-weight: 700`; no `border-radius: 50%`
- `calculateTransactionFee(amount, product.feeRate, product.feeFixed)` — always 3 args in FeeCalculator
- `received = amount - fee` — never `amount * (1 - feeRate)`
- `var(--color-green)` for received amount display only
- `formatFeeRate(feeRate, feeFixed)` — always both args

---

### 7 — Gemini

**Project:** PayFlow — Indian payment gateway SaaS service page. Next.js 14 App Router, TypeScript strict, CSS Modules. Static export. Manrope 400/500/600. Framer Motion.

**Design system:**
- `--color-blue: #1D4ED8` — brand; white text = 6.65:1 ✓ AA
- `--color-green: #15803D` — "you receive" amounts ONLY; on white = 5.02:1 ✓ AA
- `--color-dark: #111827` — primary text; on white ≈ 18:1 ✓✓ AAA
- `--color-surface: #F9FAFB` — alternate section bg

**Architecture — 5 layers:**

Layer 1 — Foundation: types (PaymentProduct, TrustBadge, PaymentMethod, TrustStat), utilities (calculateTransactionFee, formatFeeRate), mock data, globals.css, layout.tsx.

Layer 2 — UI Atom: Button (blue / outlineBlue / ghost).

Layer 3 — Layout: SiteNav (blue `PayFlow` logo, "Create Account" blue button), Footer (footer bg).

Layer 4 — Hero + Products:
- `HeroSection` — centered layout, headline, subheading, CTA pair, 3 inline stats (merchants/uptime/success)
- `PaymentProducts` — 2×2 grid, highlighted card in blue bg + white text, each shows `formatFeeRate`

Layer 5 — Calculator + Trust:
- `FeeCalculator` (`'use client'`) — product `<select>`, amount `<input type="number">`, derived fee and received, tri-line breakdown; `received = amount - calculateTransactionFee(amount, p.feeRate, p.feeFixed)`
- `TrustSection` — 4 TrustBadge tiles (PCI-DSS, ISO 27001, RBI Compliant, SOC 2)
- `PaymentMethods` — 6 pills: UPI / Credit Card / Debit Card / Net Banking / EMI / Wallet
- `TrustBar` — dark bg, 4 stats: merchants / daily txns / uptime / success rate

**Critical requirements:**
- `calculateTransactionFee(10000, 0.02, 0)` → `200`
- `calculateTransactionFee(10000, 0.02, 3)` → `203`
- `formatFeeRate(0.02, 0)` → `'2.0%'`
- `formatFeeRate(0.015, 3)` → `'1.5% + ₹3'`
- FeeCalculator `received` in `var(--color-green)` — no other elements use green
- Highlighted PaymentProduct card: `background: var(--color-blue); color: var(--color-white)` — 6.65:1 ✓

**Framer Motion:**
- HeroSection: heading `opacity: 0, y: 24 → visible`
- PaymentProducts cards: stagger 0.08s, `opacity: 0, y: 16 → visible`
- TrustSection tiles: stagger 0.1s
- TrustBar stats: stagger 0.1s
- All `viewport={{ once: true }}`

---

### 8 — Cursor

Build **PayFlow** payment gateway SaaS service page. Next.js 14, TypeScript, CSS Modules. Static export.

**`src/app/layout.tsx`:**
```tsx
import { Manrope } from 'next/font/google'
const manrope = Manrope({
  subsets: ['latin'], weight: ['400', '500', '600'],
  variable: '--font-sans', display: 'swap',
})
// NOT Inter, NOT Space Grotesk, NOT Poppins
```

**`src/lib/calculateTransactionFee.ts`:**
```typescript
export function calculateTransactionFee(
  amount: number,
  feeRate: number,
  feeFixed: number = 0
): number {
  return Math.round(amount * feeRate + feeFixed)
}
// calculateTransactionFee(10000, 0.02)    → 200
// calculateTransactionFee(10000, 0.02, 3) → 203
// Round is intentional — payment gateways charge whole rupees
```

**`src/lib/formatFeeRate.ts`:**
```typescript
export function formatFeeRate(feeRate: number, feeFixed: number): string {
  const pct = `${(feeRate * 100).toFixed(1)}%`
  return feeFixed === 0 ? pct : `${pct} + ₹${feeFixed}`
}
// Always pass both args — conditional is inside, not in JSX
```

**`FeeCalculator.tsx`:**
```tsx
'use client'
import { useState } from 'react'
import { PAYMENT_PRODUCTS } from '@/lib/data'
import { calculateTransactionFee } from '@/lib/calculateTransactionFee'
import { formatFeeRate } from '@/lib/formatFeeRate'
import styles from './FeeCalculator.module.css'

export default function FeeCalculator() {
  const [amount, setAmount] = useState(10_000)
  const [productId, setProductId] = useState('pg')

  const product = PAYMENT_PRODUCTS.find(p => p.id === productId)!
  // All derived — never store fee/received in state
  const fee = calculateTransactionFee(amount, product.feeRate, product.feeFixed)
  const received = amount - fee

  return (
    <div className={styles.calculator}>
      <h2 className={styles.heading}>Calculate your fees</h2>
      <select
        className={styles.productSelect}
        value={productId}
        onChange={e => setProductId(e.target.value)}
        aria-label="Select payment product"
      >
        {PAYMENT_PRODUCTS.map(p => (
          <option key={p.id} value={p.id}>
            {p.name} — {formatFeeRate(p.feeRate, p.feeFixed)}
          </option>
        ))}
      </select>

      <label className={styles.amountLabel} htmlFor="feeAmount">
        Transaction amount (₹)
      </label>
      <input
        id="feeAmount"
        className={styles.amountInput}
        type="number" min={1} step={100}
        value={amount}
        onChange={e => setAmount(Math.max(1, Number(e.target.value)))}
        aria-label="Transaction amount"
      />

      <div className={styles.breakdown} aria-live="polite" aria-label="Fee breakdown">
        <div className={styles.line}>
          <span className={styles.lineLabel}>Amount charged</span>
          <span className={styles.lineAmount}>₹{amount.toLocaleString('en-IN')}</span>
        </div>
        <hr className={styles.divider} />
        <div className={styles.line}>
          <span className={styles.lineLabel}>
            Fee ({formatFeeRate(product.feeRate, product.feeFixed)})
          </span>
          <span className={styles.lineFee}>−₹{fee.toLocaleString('en-IN')}</span>
        </div>
        <div className={styles.line}>
          <span className={styles.lineLabel}>You receive</span>
          <span className={styles.lineReceived}>₹{received.toLocaleString('en-IN')}</span>
          {/* .lineReceived { color: var(--color-green); } — green = positive money received */}
        </div>
      </div>
    </div>
  )
}
```

**Forbidden patterns:**
```bash
grep -r "1 - product\.feeRate\|amount \* 0\.0[0-9]" src/components   # empty
grep -r "color-green" src/components --include="*.module.css" | grep -v "lineReceived\|received"  # empty
grep -r "font-weight: 700" src --include="*.module.css"               # empty
grep -r "border-radius: 50%" src --include="*.module.css"             # empty
grep -r "#[0-9A-Fa-f]" src/components --include="*.module.css"       # empty
```

`tsc --noEmit` exits 0. `npm run build` produces `/out`.
