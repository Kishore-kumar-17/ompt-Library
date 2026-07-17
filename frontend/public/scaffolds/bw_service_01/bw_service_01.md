# bw_service_01
## Indian Email Marketing SaaS Landing Page · Mailchimp pattern
### Inspiration: mailchimp.com — Service-as-product, illustrated approach, plan comparison

---

## Base Prompt

**Role:** Senior product designer specialising in Indian SaaS landing pages and conversion-rate optimisation, with deep expertise in pricing table UX, billing toggle patterns, and high-contrast color systems.

**Application Overview:**
MailFlow is an Indian email marketing and automation SaaS platform targeting Indian SMBs, D2C e-commerce brands, and growing startups. Visitors arrive researching tools or switching from generic platforms. The single conversion goal: sign up for the free tier — no credit card required, friction-free entry.

**Brand Voice & Mood:**
Friendly, capable, optimistic — the anti-enterprise SaaS. The bright yellow (`#FFE01B`) signals energy without aggression. Copy is direct and benefit-forward: "Send better emails. Grow your business." The tone is approachable but not casual — a helpful expert, not a startup pitching at you. Opposite of cold fintech grey. Visitors should leave thinking "that feels modern and trustworthy, made for Indian businesses."

**Core Features:**
1. Sticky navigation — white background, yellow "MailFlow" logo text, nav links, "Get Started Free" dark pill CTA
2. Hero section — split layout: headline + subhead + primary CTA + secondary CTA left; illustrated placeholder right
3. Pricing section — monthly/annual billing toggle, 4-tier plan grid, highlighted "Most Popular" tier, INR pricing, yearly savings callout
4. Feature showcase — 3 alternating text-plus-illustration rows covering campaigns, automation, and analytics
5. Social proof section — customer count stat + 3 testimonial cards from named Indian businesses
6. Trust bar — yellow-background section with 4 trust stats (customers, emails sent, uptime, support response)
7. Footer — dark background, 4-column layout

**Design Specifications:**

Color palette (8 tokens — exact values):
- Brand yellow: `#FFE01B` — logo, highlights, TrustBar bg, highlighted plan bg
- Dark: `#241C15` — all text on yellow backgrounds (12.77:1 contrast), primary headings
- White: `#FFFFFF` — page background, card backgrounds
- Surface: `#F5F5F5` — section backgrounds, filter chip bg
- Yellow tint: `#FFFBDC` — subtle yellow areas, secondary highlights
- Muted: `#6B7280` — secondary text, metadata
- Border: `#E5E7EB` — card borders, input borders
- Green: `#15803D` — feature checkmarks, success states (5.02:1 on white ✓)

Critical contrast rule: Dark `#241C15` on yellow `#FFE01B` = 12.77:1 ✓✓. White `#FFFFFF` on yellow = 1.31:1 ✗✗ — forbidden everywhere, no exceptions.

Typography: Inter (Google Fonts) weights 400/500/600 only. No weight 700 anywhere in the codebase. H1: `clamp(2.5rem, 5vw, 3.5rem)` weight 600. H2: `clamp(1.75rem, 3vw, 2.25rem)` weight 600. Body: 1rem/1.6 weight 400. Price display: `clamp(2rem, 3vw, 2.5rem)` weight 600.

Border radius: 12px on plan cards, 8px on buttons and billing toggle, 4px on badges. No `border-radius: 50%` anywhere.

Spacing: 8pt grid base unit. Section vertical padding: `clamp(60px, 8vw, 120px)`. Plan grid gap: 24px.

**Structure:**
1. SiteNav — sticky, white bg, `#FFE01B` "MailFlow" text logo, horizontal links (Features / Pricing / Templates / Blog), "Get Started Free" dark pill button right
2. HeroSection — two-column split: left = H1 + 2-line benefit subhead + primary CTA (dark) + secondary CTA (outline) + social proof count; right = illustration area (styled div, surface bg)
3. PricingSection — section heading, BillingToggle (monthly/yearly pills), 4-card PlanGrid in CSS grid
4. FeatureShowcase — "Everything you need to grow" heading, 3 rows alternating text-left-illustration-right and text-right-illustration-left
5. TestimonialGrid — "Trusted by 50,000+ Indian businesses" subhead, 3 testimonial cards
6. TrustBar — full-width, yellow background (`#FFE01B`), dark text (`#241C15`), 4 stats
7. Footer — dark `#241C15` bg, 4 columns: logo/tagline | Products | Resources | Company

**Technical Specifications:**
- Framework: Next.js 14 App Router, TypeScript strict
- CSS: CSS Modules — zero hex values in `.module.css` files; all colors via `var(--color-*)` tokens
- Styling: No Tailwind, no external UI library
- Client boundary: `'use client'` on `PlanGrid` only — everything else is a Server Component
- State: `useState<BillingPeriod>('monthly')` in PlanGrid, threaded as prop to PlanCard
- Fonts: `next/font/google` Inter, weights `['400', '500', '600']`
- Export: `output: 'export'`, `images: { unoptimized: true }`
- Animation: Framer Motion — section fade-up on scroll, PlanCard stagger 0.1s, TrustBar stats stagger 0.08s; all with `viewport={{ once: true }}`; respect `prefers-reduced-motion`

**Implementation Steps:**
Priority: highest-conversion surface first.
1. Types: `BillingPeriod`, `PricingTier`, `Testimonial`, `FeatureItem`, `TrustStat` — in `src/types/index.ts`
2. Utilities: `formatPlanPrice(tier, period)` and `calculateYearlySavings(tier)` — in `src/lib/`
3. Mock data: 4 pricing tiers, 3 features, 3 testimonials, 4 trust stats — in `src/lib/data.ts`
4. PlanCard + PlanGrid + BillingToggle (the primary conversion component — build first)
5. SiteNav + HeroSection (above-the-fold credibility)
6. FeatureShowcase (mid-funnel persuasion)
7. TestimonialGrid + TrustBar (lower-funnel proof)
8. Footer + layout.tsx + page.tsx composition

**User Experience:**
The visitor arrives from a search ad or referral, price-sensitive and skeptical of enterprise tools. They scan the hero: the yellow brand and friendly tone say "this isn't Salesforce." They scroll directly to pricing — Indian buyers evaluate cost before features. The billing toggle shows they can save 20% annually; they click "yearly" to see the savings. The highlighted "Most Popular" plan removes decision paralysis. Feature checkmarks build functional confidence. Testimonials from named Indian businesses answer the implicit question "does this work for companies like mine?" The TrustBar (50,000+ customers, 99.9% uptime) provides the final trust signal before clicking "Get Started Free."

**Constraints:**
- Yellow background (`#FFE01B`) always requires `color: var(--color-dark)` — white text on yellow = 1.31:1, catastrophically fails WCAG AA — forbidden everywhere without exception
- No `font-weight: 700` anywhere — Inter 600 is the maximum weight in this system
- No `border-radius: 50%` anywhere — this brand uses rectangular and rounded-rectangle shapes
- No hex values in `.module.css` files — CSS custom properties only
- `formatPlanPrice(tier, period)` must be used in all pricing displays — never access `tier.monthlyPrice` or `tier.yearlyPrice` directly in JSX
- Yearly savings line uses conditional JSX rendering — never `display: none` or `visibility: hidden`
- BillingToggle uses `aria-pressed` buttons — NOT `<input type="radio">` elements
- `PlanCard` receives `period` as prop from `PlanGrid` — it does not manage billing state
- INR pricing only — no dollar signs, no international pricing fallback
- No dark mode toggle — this is a light-mode-only design

---

## Platform Versions

---

### 1 — Lovable

Build **MailFlow** — an Indian email marketing and automation SaaS landing page — using Next.js 14 App Router, TypeScript strict, CSS Modules. No Tailwind. Static export. Font: Inter 400/500/600 via `next/font/google`. No weight 700.

**Brand: Yellow `#FFE01B`.** Token system in `globals.css`:
```css
--color-yellow:      #FFE01B;  /* brand — DARK TEXT ONLY — white on yellow = 1.31:1 ✗✗ */
--color-dark:        #241C15;  /* headings, body text — dark on yellow = 12.77:1 ✓✓ */
--color-white:       #FFFFFF;
--color-surface:     #F5F5F5;  /* neutral section bg */
--color-yellow-tint: #FFFBDC;  /* highlighted plan bg, subtle yellow areas */
--color-muted:       #6B7280;
--color-border:      #E5E7EB;
--color-green:       #15803D;  /* checkmarks, success states — 5.02:1 on white ✓ */
```

Zero hex in `.module.css`. **Yellow constraint: `var(--color-dark)` text on all yellow backgrounds — NEVER `var(--color-white)`.**

**This build is a new domain — SaaS pricing page, not real estate:**
- **Service-as-product:** email marketing presented with feature comparison, plan tiers, illustrated sections
- **Billing toggle:** `BillingPeriod = 'monthly' | 'yearly'` — the primary interactive state
- **Plan comparison:** 4 pricing tiers, highlighted "Most Popular" plan in yellow bg with dark text
- **Indian pricing:** all prices in INR (₹749/mo, ₹1,499/mo etc.)
- **No property data:** entirely new domain — contacts, campaigns, automations

**New types unique to this build:**
```typescript
export type BillingPeriod = 'monthly' | 'yearly'

export interface PricingTier {
  id: string
  name: string
  monthlyPrice: number      // price when billed monthly (0 = Free)
  yearlyPrice: number       // effective per-month price when billed yearly
  description: string
  contacts: string          // e.g. 'Up to 500 contacts'
  emailsPerMonth: string    // e.g. '1,000 emails/mo' or 'Unlimited'
  features: string[]        // included features list
  highlighted: boolean      // true = 'Most Popular' — yellow card bg, dark text
  cta: string               // CTA button text
}

export interface Testimonial {
  id: string
  name: string
  company: string
  role: string
  quote: string
}

export interface FeatureItem {
  id: string
  title: string
  description: string
  icon: string
}
```

**New utilities:**
```typescript
// formatPlanPrice.ts
export function formatPlanPrice(tier: PricingTier, period: BillingPeriod): string {
  const price = period === 'monthly' ? tier.monthlyPrice : tier.yearlyPrice
  return price === 0 ? 'Free' : `₹${price.toLocaleString('en-IN')}/mo`
}

// calculateYearlySavings.ts
export function calculateYearlySavings(tier: PricingTier): number {
  return (tier.monthlyPrice - tier.yearlyPrice) * 12
}
// calculateYearlySavings({ monthlyPrice: 1499, yearlyPrice: 1199 }) → 3600
```

**4 pricing tiers (mock data):**
```typescript
export const PRICING_TIERS: PricingTier[] = [
  { id: 'free', name: 'Free', monthlyPrice: 0, yearlyPrice: 0,
    contacts: 'Up to 500 contacts', emailsPerMonth: '1,000 emails/mo',
    description: 'Perfect to get started',
    features: ['Email campaigns', 'Basic templates (5)', 'Campaign reports'],
    highlighted: false, cta: 'Get Started Free' },
  { id: 'essentials', name: 'Essentials', monthlyPrice: 749, yearlyPrice: 599,
    contacts: 'Up to 5,000 contacts', emailsPerMonth: '50,000 emails/mo',
    description: 'For growing businesses',
    features: ['Everything in Free', 'A/B testing', 'Custom branding', '24/7 email support', 'Remove MailFlow branding'],
    highlighted: false, cta: 'Start Free Trial' },
  { id: 'standard', name: 'Standard', monthlyPrice: 1499, yearlyPrice: 1199,
    contacts: 'Up to 25,000 contacts', emailsPerMonth: 'Unlimited emails',
    description: 'Most popular for scaling teams',
    features: ['Everything in Essentials', 'Marketing automation', 'Retargeting ads', 'Advanced analytics', 'Priority chat support'],
    highlighted: true, cta: 'Start Free Trial' },
  { id: 'premium', name: 'Premium', monthlyPrice: 4999, yearlyPrice: 3999,
    contacts: 'Up to 1,00,000 contacts', emailsPerMonth: 'Unlimited emails',
    description: 'For enterprise-scale sending',
    features: ['Everything in Standard', 'Dedicated sending IP', 'Phone + account manager', 'Custom onboarding', 'SLA uptime guarantee'],
    highlighted: false, cta: 'Contact Sales' },
]
```

**Page sections:**
1. **SiteNav** — white bg, yellow logo "MailFlow", nav links (Features / Pricing / Templates / Blog), "Get Started Free" dark button
2. **HeroSection** — illustrated split layout: left = headline + CTA pair; right = illustration placeholder (div with bg gradient)
3. **PricingSection** — `BillingToggle` (monthly/yearly) + `PlanGrid` (4 `PlanCard`s)
4. **FeatureShowcase** — 3 alternating text+illustration rows
5. **SocialProof** — customer count stat + 3 `TestimonialCard`s
6. **TrustBar** — **yellow bg** (`var(--color-yellow)`), **dark text** (`var(--color-dark)`) ← demonstrates the yellow-bg/dark-text rule in section context
7. **Footer** — dark bg

**`PlanGrid`** — `'use client'` boundary for billing toggle:
```tsx
'use client'
const [period, setPeriod] = useState<BillingPeriod>('monthly')
// Highlighted plan: background: var(--color-yellow) → color: var(--color-dark) — 12.77:1 ✓✓
// NEVER: color: var(--color-white) on --color-yellow background
```

**`BillingToggle`** — inside PlanGrid:
```tsx
<div role="group" aria-label="Billing period">
  <button aria-pressed={period === 'monthly'} onClick={() => setPeriod('monthly')}>Monthly</button>
  <button aria-pressed={period === 'yearly'} onClick={() => setPeriod('yearly')}>
    Yearly <span>(Save up to 20%)</span>
  </button>
</div>
```

**`PlanCard`** highlighted variant:
```css
.cardHighlighted {
  background: var(--color-yellow);   /* dark text on yellow = 12.77:1 ✓✓ */
  color: var(--color-dark);          /* NEVER var(--color-white) on yellow */
}
/* Non-highlighted: background: var(--color-white) */
```

**Anti-patterns:**
- Never `color: var(--color-white)` on any yellow background — 1.31:1 ✗✗ forbidden
- Never `font-weight: 700` anywhere
- Never `border-radius: 50%` anywhere
- Never hardcode `#FFE01B` in `.module.css` (use `var(--color-yellow)`)
- Never display yearly price without the "per month" context label

**`tsc --noEmit` exits 0. `npm run build` produces `/out`.**

---

### 2 — ChatGPT Canvas

Create **MailFlow** — Indian email marketing SaaS landing page — Next.js 14, TypeScript strict, CSS Modules. Static export.

```bash
npx create-next-app@latest mailflow --typescript --app --no-tailwind --import-alias "@/*"
npm install lucide-react framer-motion
```

**Tokens:**
```css
:root {
  --color-yellow:      #FFE01B;
  --color-dark:        #241C15;
  --color-white:       #FFFFFF;
  --color-surface:     #F5F5F5;
  --color-yellow-tint: #FFFBDC;
  --color-muted:       #6B7280;
  --color-border:      #E5E7EB;
  --color-green:       #15803D;
}
```

Font: Inter 400/500/600. No weight 700. Zero hex in `.module.css`.

**Contrast — the critical yellow rule:**
- Dark `#241C15` on yellow `#FFE01B` = 12.77:1 ✓✓ — use for ALL yellow-bg elements
- White `#FFFFFF` on yellow `#FFE01B` = 1.31:1 ✗✗ — FORBIDDEN everywhere
- Green `#15803D` on white = 5.02:1 ✓ — checkmarks, feature ticks

**New types** (unique to this build — first SaaS/pricing build in the library):
- `BillingPeriod = 'monthly' | 'yearly'`
- `PricingTier { id, name, monthlyPrice, yearlyPrice, contacts, emailsPerMonth, features: string[], highlighted, cta }`
- `Testimonial { id, name, company, role, quote }`
- `FeatureItem { id, title, description, icon }`

**New utilities:**
- `formatPlanPrice(tier, period)` → `'Free'` or `'₹749/mo'`
- `calculateYearlySavings(tier)` → `(monthlyPrice - yearlyPrice) * 12`

**4 pricing tiers** — Free (₹0), Essentials (₹749/₹599), Standard (₹1,499/₹1,199 — highlighted), Premium (₹4,999/₹3,999)

**Key components:**
- `PlanGrid` — `'use client'`, `BillingPeriod` state, renders 4 `PlanCard`s
- `BillingToggle` — monthly/yearly switch with `aria-pressed`
- `PlanCard` — highlighted variant uses yellow bg + dark text (12.77:1 ✓✓)
- `FeatureShowcase` — 3 alternating layout rows (text + illustration div)
- `TrustBar` — yellow bg + dark text (demonstrates yellow section pattern)

---

### 3 — Bolt

Build **MailFlow** — Indian email marketing SaaS landing page. Next.js 14, TypeScript strict, CSS Modules, no Tailwind. Static export.

```bash
npx create-next-app@latest mailflow --typescript --app --no-tailwind --import-alias "@/*"
npm install lucide-react framer-motion
```

**8 tokens:** `--color-yellow: #FFE01B` · `--color-dark: #241C15` · `--color-white: #FFFFFF` · `--color-surface: #F5F5F5` · `--color-yellow-tint: #FFFBDC` · `--color-muted: #6B7280` · `--color-border: #E5E7EB` · `--color-green: #15803D`

Font: Inter 400/500/600. No weight 700. Zero hex in `.module.css`.

**File structure:**
```
src/
  types/index.ts          — BillingPeriod, PricingTier, Testimonial, FeatureItem, TrustStat
  lib/
    data.ts               — PRICING_TIERS (4), FEATURES (3), TESTIMONIALS (3), TRUST_STATS (4)
    formatPlanPrice.ts    — formatPlanPrice(tier, period): string
    calculateYearlySavings.ts — (monthly - yearly) * 12
  components/
    layout/SiteNav.tsx + .module.css      — sticky, yellow logo, dark CTA button
    layout/Footer.tsx + .module.css       — dark bg
    home/
      HeroSection.tsx + .module.css       — split layout, illustration placeholder
      PlanGrid.tsx + .module.css          — 'use client', BillingPeriod state
      BillingToggle.tsx + .module.css     — monthly/yearly pills
      PlanCard.tsx + .module.css          — highlighted = yellow bg, dark text
      FeatureShowcase.tsx + .module.css   — 3 alternating rows
      TestimonialGrid.tsx + .module.css   — 3 cards
      TrustBar.tsx + .module.css          — YELLOW bg, dark text
    ui/
      Button.tsx + .module.css            — 'dark' | 'outlineDark' | 'ghost' variants
      FeatureCheckmark.tsx                — green check icon + feature text
  app/globals.css, layout.tsx, page.tsx
```

**Critical rules:**
1. Yellow bg → ALWAYS `color: var(--color-dark)` — white on yellow = 1.31:1 ✗✗ forbidden
2. Highlighted `PlanCard`: `background: var(--color-yellow); color: var(--color-dark)` — 12.77:1 ✓✓
3. `TrustBar`: `background: var(--color-yellow)` — all text must be `var(--color-dark)`
4. `formatPlanPrice(tier, period)` — always pass both args; never access `tier.monthlyPrice` directly in JSX
5. Yearly savings shown only when `period === 'yearly'` — conditional JSX, not CSS `display: none`
6. `calculateYearlySavings(tier)` = `(tier.monthlyPrice - tier.yearlyPrice) * 12`
7. Feature checkmarks: `color: var(--color-green)` — 5.02:1 on white ✓
8. No `border-radius: 50%`, no `font-weight: 700`

**QA checks:**
```bash
grep -r "color.*white.*yellow\|var(--color-white).*yellow" src/components  # empty
grep -r "border-radius: 50%" src --include="*.module.css"                   # empty
grep -r "font-weight: 700" src --include="*.module.css"                     # empty
grep -r "#[0-9A-Fa-f]" src/components --include="*.module.css"             # empty
```

---

### 4 — v0

Design **MailFlow** component CSS system — Indian email marketing SaaS. Next.js 14, TypeScript, CSS Modules, no Tailwind.

**Tokens:** `--color-yellow: #FFE01B` + 7 others. Inter 400/500/600. Zero hex in modules.

**PlanCard.module.css:**
```css
.card {
  background: var(--color-white);
  border: 1.5px solid var(--color-border);
  border-radius: 12px;
  padding: 32px 28px;
  display: flex; flex-direction: column; gap: 20px;
  transition: box-shadow 0.2s;
}
.card:hover { box-shadow: 0 4px 24px rgba(0,0,0,0.08); }

/* Highlighted plan — yellow bg, DARK text — 12.77:1 ✓✓ */
.cardHighlighted {
  background: var(--color-yellow);
  color: var(--color-dark);
  border-color: var(--color-yellow);
  box-shadow: 0 8px 32px rgba(36,28,21,0.15);
}
/* CRITICAL: cardHighlighted NEVER sets color: var(--color-white) */

.badge {
  display: inline-block;
  background: var(--color-dark);   /* dark bg for badge on yellow card */
  color: var(--color-yellow);      /* yellow on dark = 12.77:1 ✓✓ */
  font-size: 0.6875rem; font-weight: 600;
  padding: 3px 10px; border-radius: 4px;
  letter-spacing: 0.04em; text-transform: uppercase;
}
.planName { font-size: 1.25rem; font-weight: 600; }
.price { font-size: 2.5rem; font-weight: 600; line-height: 1; }
.pricePeriod { font-size: 0.875rem; font-weight: 400; color: var(--color-muted); }
/* Note: on highlighted card, .pricePeriod should use var(--color-dark) with opacity */
.description { font-size: 0.9375rem; color: var(--color-muted); }
.featureList { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
.cta { margin-top: auto; }
```

**BillingToggle.module.css:**
```css
.toggle {
  display: inline-flex;
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 4px;
  gap: 4px;
}
.option {
  padding: 8px 20px; border-radius: 6px;
  font-size: 0.9375rem; font-weight: 500;
  font-family: var(--font-sans);
  cursor: pointer; border: none;
  background: transparent; color: var(--color-muted);
  transition: all 0.15s;
}
.optionActive {
  background: var(--color-white);
  color: var(--color-dark);
  box-shadow: 0 1px 4px rgba(0,0,0,0.12);
}
.savingsPill {
  font-size: 0.75rem; font-weight: 600;
  background: var(--color-yellow);
  color: var(--color-dark);         /* dark on yellow = 12.77:1 ✓✓ */
  padding: 2px 6px; border-radius: 4px;
  margin-left: 6px;
}
```

**TrustBar.module.css (yellow section):**
```css
.section {
  background: var(--color-yellow);   /* YELLOW bg */
  padding: 60px 24px;
}
.stat  { color: var(--color-dark); }  /* dark text on yellow = 12.77:1 ✓✓ */
.value { font-size: 2.25rem; font-weight: 600; color: var(--color-dark); }
.label { font-size: 0.9375rem; color: var(--color-dark); opacity: 0.75; }
/* NEVER: color: var(--color-white) anywhere in TrustBar */
```

**FeatureCheckmark.module.css:**
```css
.item { display: flex; align-items: flex-start; gap: 10px; }
.icon { color: var(--color-green); flex-shrink: 0; margin-top: 2px; }
/* green on white = 5.02:1 ✓; on yellow-tint = ~4.8:1 (marginal — use on white only) */
.text { font-size: 0.9375rem; color: inherit; }
```

**Button:** dark variant → `background: var(--color-dark); color: var(--color-white)` — 12.77:1 ✓✓. Outline: `color: var(--color-dark); border: 1.5px solid var(--color-dark)`. Ghost: `color: var(--color-muted); border: 1.5px solid var(--color-border)`.

---

### 5 — Claude Artifacts

Build **MailFlow** — production-quality Indian email marketing SaaS landing page — Next.js 14 App Router, TypeScript strict, CSS Modules. No Tailwind. Static export. Inter 400/500/600.

**Four defining constraints for this build:**

**Constraint 1 — Yellow requires dark text everywhere:**
Yellow `#FFE01B` has L = 0.749, making it nearly as bright as white. White text on yellow = 1.31:1 — catastrophically fails. Dark `#241C15` on yellow = 12.77:1 ✓✓.
```css
/* Any element with yellow background */
.section    { background: var(--color-yellow); color: var(--color-dark); }
.highlighted { background: var(--color-yellow); color: var(--color-dark); }
/* NEVER: { background: var(--color-yellow); color: var(--color-white); } */
```
This affects: `PlanCard` highlighted variant, `TrustBar` section, `BillingToggle` savings pill.

**Constraint 2 — `formatPlanPrice` takes both tier and period:**
```typescript
export function formatPlanPrice(tier: PricingTier, period: BillingPeriod): string {
  const price = period === 'monthly' ? tier.monthlyPrice : tier.yearlyPrice
  return price === 0 ? 'Free' : `₹${price.toLocaleString('en-IN')}/mo`
}
// WRONG: <span>{tier.monthlyPrice}</span>
// RIGHT: <span>{formatPlanPrice(tier, period)}</span>
```
The `period` prop must be threaded from `PlanGrid` state down to every `PlanCard`. `PlanCard` does not manage its own billing state.

**Constraint 3 — Yearly savings conditional JSX:**
```tsx
{period === 'yearly' && tier.monthlyPrice > 0 && (
  <p className={styles.savings}>
    Save ₹{calculateYearlySavings(tier).toLocaleString('en-IN')}/yr
  </p>
)}
```
Never use CSS `display: none` to hide/show the savings line. Conditional rendering only.

**Constraint 4 — Billing toggle uses `aria-pressed`, not radio inputs:**
```tsx
<button
  role="button"
  aria-pressed={period === 'monthly'}
  onClick={() => setPeriod('monthly')}
>Monthly</button>
```
Not `<input type="radio">` — the toggle is a two-state switch, not a form group.

**Complete type system:**
```typescript
export type BillingPeriod = 'monthly' | 'yearly'

export interface PricingTier {
  id: string; name: string
  monthlyPrice: number      // INR per month billed monthly (0 = Free)
  yearlyPrice: number       // INR per month billed yearly
  description: string
  contacts: string          // 'Up to 500 contacts'
  emailsPerMonth: string    // 'Unlimited' or '50,000 emails/mo'
  features: string[]        // displayed with FeatureCheckmark
  highlighted: boolean      // yellow card bg
  cta: string
}

export interface Testimonial {
  id: string; name: string; company: string; role: string; quote: string
}

export interface FeatureItem {
  id: string; title: string; description: string; icon: string
}

export interface TrustStat {
  id: string; icon: string; value: string; label: string
}
```

**All QA checks:**
```bash
tsc --noEmit
grep -r "#[0-9A-Fa-f]" src/components --include="*.module.css"    # empty
grep -r "color-white.*yellow\|white.*color-yellow" src/components  # empty
grep -r "border-radius: 50%" src --include="*.module.css"          # empty
grep -r "font-weight: 700" src --include="*.module.css"            # empty
grep -r "tier\.monthlyPrice\|tier\.yearlyPrice" src/components     # empty (use formatPlanPrice)
npm run build
```

---

### 6 — Grok

Generate all source files for **MailFlow** — Indian email marketing SaaS landing page. Next.js 14, TypeScript strict, CSS Modules. Static export. Inter 400/500/600.

Generate in order:
1. `src/types/index.ts` — BillingPeriod, PricingTier, Testimonial, FeatureItem, TrustStat
2. `src/lib/formatPlanPrice.ts` — `formatPlanPrice(tier, period): string`
3. `src/lib/calculateYearlySavings.ts` — `(monthlyPrice - yearlyPrice) * 12`
4. `src/lib/data.ts` — PRICING_TIERS (4), FEATURES (3), TESTIMONIALS (3), TRUST_STATS (4)
5. `src/app/globals.css` — 8 tokens (yellow brand), .sr-only, prefers-reduced-motion
6. `src/app/layout.tsx` — `Inter` from `next/font/google`, weights `['400','500','600']`
7. `src/components/ui/Button.tsx + .module.css` — dark / outlineDark / ghost variants
8. `src/components/ui/FeatureCheckmark.tsx + .module.css` — green check icon + text
9. `src/components/layout/SiteNav.tsx + .module.css` — sticky, yellow logo
10. `src/components/layout/Footer.tsx + .module.css` — dark bg
11. `src/components/home/HeroSection.tsx + .module.css` — split layout
12. `src/components/home/BillingToggle.tsx + .module.css` — monthly/yearly pills, aria-pressed
13. `src/components/home/PlanCard.tsx + .module.css` — highlighted = yellow bg + dark text
14. `src/components/home/PlanGrid.tsx + .module.css` — 'use client', BillingPeriod state
15. `src/components/home/FeatureShowcase.tsx + .module.css` — 3 alternating rows
16. `src/components/home/TestimonialCard.tsx + .module.css`
17. `src/components/home/TestimonialGrid.tsx + .module.css` — 3 cards
18. `src/components/home/TrustBar.tsx + .module.css` — yellow bg, dark text, Framer Motion stagger
19. `src/app/page.tsx`

**Rules for every file:**
- No hex in `.module.css`; no `font-weight: 700`; no `border-radius: 50%`
- Yellow background → always `color: var(--color-dark)` — never white on yellow
- `formatPlanPrice(tier, period)` — never access `tier.monthlyPrice`/`tier.yearlyPrice` directly in JSX
- Green checkmarks: `color: var(--color-green)` on white bg only — not on yellow-tint
- Yearly savings shown via conditional JSX, not CSS visibility

---

### 7 — Gemini

**Project:** MailFlow — Indian email marketing SaaS landing page. Next.js 14 App Router, TypeScript strict, CSS Modules. Static export. Inter 400/500/600. Framer Motion.

**Design system:**
- `--color-yellow: #FFE01B` — brand; L = 0.749 (very high brightness — DARK TEXT ONLY)
- `--color-dark: #241C15` — primary text; on yellow = 12.77:1 ✓✓; on white = ~13.5:1 ✓✓
- `--color-green: #15803D` — checkmarks, success; on white = 5.02:1 ✓ AA
- `--color-yellow-tint: #FFFBDC` — highlighted plan bg when yellow is too intense
- `--color-muted: #6B7280` — secondary text on white = ~4.5:1 ✓

**Architecture — 5 layers:**

Layer 1 — Foundation: types (BillingPeriod, PricingTier, Testimonial, FeatureItem, TrustStat), utilities (formatPlanPrice, calculateYearlySavings), mock data, globals.css, layout.tsx.

Layer 2 — UI Atoms: Button (dark / outlineDark / ghost), FeatureCheckmark (green Check icon + text).

Layer 3 — Layout: SiteNav (sticky, yellow `MailFlow` logo text, dark CTA), Footer (dark bg).

Layer 4 — Hero + Plans:
- `HeroSection` — split layout: left text + right illustration area (styled div with surface bg)
- `PlanGrid` (`'use client'`) — BillingPeriod state, BillingToggle, 4 PlanCards in CSS Grid
- `PlanCard` — highlighted tier gets `background: var(--color-yellow); color: var(--color-dark)`
- Savings pill in BillingToggle: `background: var(--color-yellow); color: var(--color-dark)` — 12.77:1 ✓✓

Layer 5 — Features + Social Proof + Trust:
- `FeatureShowcase` — 3 rows alternating: left text + right illustration; right illustration + left text
- `TestimonialGrid` — 3 cards, quote + name + company
- `TrustBar` — **yellow bg section**, dark text stats (4 items) — demonstrates yellow-section pattern

**Critical requirements:**
- `formatPlanPrice({ monthlyPrice: 1499, yearlyPrice: 1199 }, 'yearly')` → `'₹1,199/mo'`
- `calculateYearlySavings({ monthlyPrice: 1499, yearlyPrice: 1199 })` → `3600`
- Highlighted card: `background: var(--color-yellow); color: var(--color-dark)` — 12.77:1 ✓✓
- BillingPeriod state lives in `PlanGrid`, passed as prop to each `PlanCard`
- Yearly savings line: conditional JSX only — not `visibility: hidden`

**Framer Motion:**
- HeroSection: `opacity: 0, y: 24 → visible`
- PlanCard: stagger 0.1s, `scale: 0.97 → 1`
- FeatureShowcase rows: `opacity: 0, x: ±40 → 0` alternating per row
- TrustBar stats: stagger 0.08s
- All `viewport={{ once: true }}`

---

### 8 — Cursor

Build **MailFlow** email marketing SaaS landing page. Next.js 14, TypeScript, CSS Modules. Static export.

**`next.config.ts`:** `output: 'export'`, `images: { unoptimized: true }`

**`src/app/layout.tsx`:**
```tsx
import { Inter } from 'next/font/google'
const inter = Inter({
  subsets: ['latin'], weight: ['400', '500', '600'],
  variable: '--font-sans', display: 'swap',
})
// weight '700' must NOT appear
```

**`src/lib/formatPlanPrice.ts`:**
```typescript
import type { PricingTier, BillingPeriod } from '@/types'
export function formatPlanPrice(tier: PricingTier, period: BillingPeriod): string {
  const price = period === 'monthly' ? tier.monthlyPrice : tier.yearlyPrice
  return price === 0 ? 'Free' : `₹${price.toLocaleString('en-IN')}/mo`
}
// formatPlanPrice({ monthlyPrice: 1499, yearlyPrice: 1199 }, 'yearly') → '₹1,199/mo'
// formatPlanPrice({ monthlyPrice: 0, yearlyPrice: 0 }, 'monthly') → 'Free'
```

**`src/lib/calculateYearlySavings.ts`:**
```typescript
import type { PricingTier } from '@/types'
export function calculateYearlySavings(tier: PricingTier): number {
  return (tier.monthlyPrice - tier.yearlyPrice) * 12
}
// calculateYearlySavings({ monthlyPrice: 1499, yearlyPrice: 1199 }) → 3600
```

**`PlanGrid.tsx` (billing toggle + grid):**
```tsx
'use client'
import { useState } from 'react'
import type { BillingPeriod } from '@/types'
import { PRICING_TIERS } from '@/lib/data'
import BillingToggle from './BillingToggle'
import PlanCard from './PlanCard'
import styles from './PlanGrid.module.css'

export default function PlanGrid() {
  const [period, setPeriod] = useState<BillingPeriod>('monthly')
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Simple, transparent pricing</h2>
      <BillingToggle period={period} onChange={setPeriod} />
      <div className={styles.grid}>
        {PRICING_TIERS.map(tier => (
          <PlanCard key={tier.id} tier={tier} period={period} />
        ))}
      </div>
    </section>
  )
}
```

**`PlanCard.tsx` (highlighted pattern):**
```tsx
import type { PricingTier, BillingPeriod } from '@/types'
import { formatPlanPrice, calculateYearlySavings } from '@/lib'
import FeatureCheckmark from '@/components/ui/FeatureCheckmark'
import Button from '@/components/ui/Button'
import styles from './PlanCard.module.css'

interface Props { tier: PricingTier; period: BillingPeriod }

export default function PlanCard({ tier, period }: Props) {
  return (
    <article className={`${styles.card} ${tier.highlighted ? styles.cardHighlighted : ''}`}>
      {tier.highlighted && <span className={styles.badge}>Most Popular</span>}
      <h3 className={styles.planName}>{tier.name}</h3>
      <p className={styles.description}>{tier.description}</p>
      <p className={styles.price}>{formatPlanPrice(tier, period)}</p>
      {/* Yearly savings — conditional JSX, not CSS display: none */}
      {period === 'yearly' && tier.monthlyPrice > 0 && (
        <p className={styles.savings}>
          Save ₹{calculateYearlySavings(tier).toLocaleString('en-IN')}/yr
        </p>
      )}
      <p className={styles.contacts}>{tier.contacts} · {tier.emailsPerMonth}</p>
      <Button variant={tier.highlighted ? 'dark' : 'outlineDark'} fullWidth>
        {tier.cta}
      </Button>
      <ul className={styles.featureList}>
        {tier.features.map(f => <FeatureCheckmark key={f} text={f} />)}
      </ul>
    </article>
  )
}
// .cardHighlighted { background: var(--color-yellow); color: var(--color-dark); }
// dark on yellow = 12.77:1 ✓✓ — NEVER color: var(--color-white) on yellow
```

**Forbidden patterns:**
```bash
grep -r "color-white.*yellow\|white.*color-yellow" src/components   # empty
grep -r "border-radius: 50%" src --include="*.module.css"           # empty
grep -r "font-weight: 700" src --include="*.module.css"             # empty
grep -r "#[0-9A-Fa-f]" src/components --include="*.module.css"     # empty
grep -r "tier\.monthlyPrice\b\|tier\.yearlyPrice\b" src/components  # empty (use formatPlanPrice)
```

`tsc --noEmit` exits 0. `npm run build` produces `/out`.
