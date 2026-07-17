# bw_legal_04 — Indian Legal Services Platform (Productized)
## Inspiration: Vakilsearch · vakilsearch.com

---

## Design Identity

**Background:** White `#FFFFFF` + light blue tint sections `#F5FAFF` — opposite of bw_legal_03's dark theme
**Primary:** Navy `#022B50` — nav, headings, primary CTAs
**Accent:** Yellow `#FFD000` — trust badges, "Get Started" highlight, discount labels
**Secondary:** Blue `#007AFF` — links, checkmarks, secondary actions
**Button radius:** `6px` — product-rounded, not pill, not sharp
**Card radius:** `10px` with box shadows
**Font:** Roboto (400/500/600/700) — single sans-serif
**Tone:** Consumer e-commerce for legal services — productized, transparent, outcome-driven

**Defining features:**
- Prices shown with strike-through original + discounted price (`₹1,499 → ₹999`)
- Money-back guarantee ("7-day submission or 100% refund")
- Dual rating display (Google 4.5★ 20K+ reviews + Trustpilot 4.5★ 7.5K+ reviews)
- Tabbed service selector (PVT | LLP | OPC style)
- Green checkmarks on feature lists (vs blue in ClearTax)
- ISO 27001 badge prominently in hero
- Legal services sold as fixed-price SKUs, not hourly/retainer

---

## How This Differs From Other bw_legal Builds

| | bw_legal_01 CAM | bw_legal_02 AZB | bw_legal_03 ClearTax | **bw_legal_04 Vakilsearch** |
|---|---|---|---|---|
| Background | White | White | Dark `#151515` | **White / light blue tint** |
| Primary | Purple | Terracotta | Blue | **Navy + Yellow** |
| Button radius | 9999px | 9999px | 4px | **6px** |
| Card style | Sharp (0px) | Rounded (10px) | Dark ghost (8px) | **White, shadow (10px)** |
| Pricing | Never | Never | Shown (3 tiers) | **Shown with strike-through** |
| Guarantee | None | None | None | **Money-back guarantee** |
| Star ratings | Forbidden | Forbidden | Required | **Required (Google + Trustpilot)** |
| Font | Playfair+Roboto | DM Sans | Plus Jakarta Sans | **Roboto only** |
| Services | Practice areas | Practice areas | Tax plans | **Legal SKUs (fixed price)** |
| Hero CTA | "Contact Us" | Inline text link | Dual path (file/CA) | **"Get Started" + search bar** |

---

## Color System

```css
--color-navy:    #022B50;   /* Nav bg, H1, primary CTAs */
--color-yellow:  #FFD000;   /* Accent, trust badges, highlights */
--color-blue:    #007AFF;   /* Links, checkmarks, secondary */
--color-surface: #F5FAFF;   /* Section tint backgrounds */
--color-text:    #231F20;   /* Primary body text */
--color-muted:   #606162;   /* Secondary text, captions */
--color-border:  #E4E7EB;   /* Card borders */
--color-white:   #FFFFFF;   /* Primary page background */
```

---

## Base Prompt

**Role:** Senior product designer specialising in Indian legaltech platforms, productized legal service UX, and consumer-facing e-commerce patterns applied to professional services.

**Application Overview:** A productized Indian legal services homepage built with Next.js 14 App Router, TypeScript strict mode, CSS Modules, and static export (`output: 'export'`). Inspired by Vakilsearch — legal services sold as fixed-price SKUs (not hourly/retainer), with transparent pricing, money-back guarantees, and dual platform ratings (Google + Trustpilot). Font: Roboto 400/500/600/700 via `next/font/google`. No Tailwind, no serif font anywhere.

**Brand Voice & Mood:** Consumer e-commerce confidence applied to legal services — transparent, outcome-driven, trust-heavy. Navy `#022B50` signals authority; yellow `#FFD000` signals speed, savings, and action (discounts, "Get Started"). This is the opposite of the prestigious-but-opaque tone of bw_legal_01/02. Pricing is always shown; "Contact for quote" is forbidden. ISO 27001 badge and dual star ratings appear in the hero — trust is quantified, not asserted.

**Core Features:**
1. **StickyNav** — white bg, navy logo, horizontal service links, yellow "Get Started" CTA (navy text on yellow, `6px` radius, `40px` height)
2. **HeroSection** — white bg, `min-height: 75vh`; navy H1 (Roboto 700); dual rating row (Google 4.5★ 20K+ + Trustpilot 4.5★ 7.5K+); ISO 27001 badge; money-back guarantee tag; "Register My Business" primary CTA (navy bg, white text) + "Talk to an Expert" secondary (navy outline); service search bar below CTAs
3. **ServiceTabs + ProductCard grid** (`'use client'`) — tab strip (Startup | Business | Compliance | IP & Trademark) with navy underline indicator on active tab; filters `ProductCard` grid; `useMemo` filtering
4. **ProductCard** — white card, `border-radius: 10px`, `box-shadow: 0 4px 18px rgba(0,0,0,0.10)`; service name (Roboto 600, navy); strike-through original price + discounted price with `<del>` tag; yellow discount badge (e.g. "-33% Off"); feature list with Lucide `Check` icons in `--color-blue`; "Get Started" CTA per card (navy bg, white text, `6px` radius)
5. **TrustSignals** — `#F5FAFF` surface bg; 5 signals: ISO 27001, money-back guarantee, Google rating, Trustpilot rating, "50K+ businesses served"
6. **HowItWorks** — 3 steps; navy numbered circles (40px, `border-radius: 50%`); yellow `2px` connector line; step title Roboto 600 navy; step description muted
7. **Testimonials** — white cards, star ratings, client name + company
8. **Footer** — navy bg, white text, 4-column layout, yellow link hover, ISO/Trustpilot badges at bottom

**Design Specifications:**
- **Color tokens** (in `globals.css` only): `--color-navy: #022B50`, `--color-yellow: #FFD000`, `--color-blue: #007AFF`, `--color-surface: #F5FAFF`, `--color-text: #231F20`, `--color-muted: #606162`, `--color-border: #E4E7EB`, `--color-white: #FFFFFF`
- **Contrast:** Navy `#022B50` on yellow `#FFD000` ≈ 9.4:1 ✓✓ AAA — "Get Started" button text. White on navy ≈ 11.5:1 ✓✓ AAA — footer and primary button text. Blue `#007AFF` on white = 4.59:1 ✓ AA (link colour, large elements only — verify small text uses navy instead).
- **Border-radius:** `6px` ALL buttons — no exceptions (not 4px, not 9999px pill). `10px` product/service cards. `50%` ONLY for HowItWorks numbered circles (decorative element). No pill buttons anywhere.
- **Zero hex in `.module.css`** — CSS custom properties only; exception: `rgba()` in `box-shadow`
- **No dark sections** — this is an all-white/light site; no dark backgrounds except the navy footer
- **Typography:** Roboto 400/500/600/700 only — NO serif font anywhere, NO Playfair Display, NO DM Sans

**Structure:**
```
src/
  app/globals.css, layout.tsx, page.tsx
  types/index.ts       # ServiceTab, LegalService, TrustSignal, ProcessStep, Testimonial
  lib/
    data.ts            # services (by tab), trustSignals, processSteps, testimonials
    filterServices.ts  # filterServices(services, tab)
  components/
    layout/StickyNav/ Footer/
    home/
      HeroSection/         # server, dual ratings, search bar
      ServiceTabs/         # 'use client', tab state + useMemo
      ProductCard/         # server, <del> pricing, feature list
      TrustSignals/        # server, surface bg
      HowItWorks/          # server, navy circles + yellow connector
      Testimonials/        # server, star ratings
    ui/
      Button/              # primary (navy bg white text), secondary (navy outline), yellow (yellow bg navy text)
      RatingBadge/         # reusable: Google / Trustpilot logo + star + count
      DiscountBadge/       # yellow bg, navy text, "-XX% Off"
```

**Technical Specifications:**
- Next.js 14 App Router, TypeScript strict mode, CSS Modules, static export (`output: 'export'`)
- `tsc --noEmit` must exit 0; `npm run build` must produce `/out`
- `ServiceTab = 'startup' | 'business' | 'compliance' | 'ip-trademark'`
- Strike-through pricing: `<del>₹{originalPrice.toLocaleString('en-IN')}</del>` tag (semantic HTML) — NOT CSS `text-decoration: line-through` on a `<span>`
- Prices formatted with `toLocaleString('en-IN')` — `₹1,499` not `₹1499`
- `ServiceTabs` manages tab state + filters service cards — `'use client'`; `useMemo` wraps `filterServices`

**Implementation Steps:**
1. Scaffold with `create-next-app` (TypeScript, App Router, no Tailwind, `@/*` alias), install `lucide-react`, `framer-motion`
2. Define types: `ServiceTab`, `LegalService` (with `originalPrice`, `discountedPrice`, `discountPercent`, `features[]`, `tab`), `TrustSignal`, `ProcessStep`, `Testimonial`
3. Write `globals.css` with 8 color tokens; `layout.tsx` with Roboto `weight: ['400','500','600','700']`
4. Create mock `LegalService` data: 8–12 services distributed across 4 tabs, all with realistic Indian legal pricing
5. Build `Button` with 3 variants — verify `yellow` variant uses `color: var(--color-navy)` (dark on yellow)
6. Build `RatingBadge` (reusable for Google + Trustpilot) and `DiscountBadge`
7. Build `ProductCard` with `<del>` strike-through pricing and conditional feature list
8. Build `ServiceTabs` (`'use client'`) — tab strip with `useMemo` filtering
9. Build remaining sections: HeroSection, TrustSignals, HowItWorks, Testimonials, Footer
10. Verify: no pill buttons (9999px), no serif font, no hidden pricing, `tsc --noEmit` clean

**User Experience:**
- Dual ratings in hero immediately establish trust before the user reads a single word of copy
- ISO 27001 + money-back guarantee removes the primary objections (data safety + delivery risk) at the fold
- Tabbed service selector keeps the page compact while showing a broad service catalog
- Transparent pricing with strike-through discount makes the value proposition immediate and scannable
- Fixed-price SKU cards with "Get Started" CTAs remove sales friction — no consultation needed to understand cost
- HowItWorks with numbered steps and connectors visualises the process for first-time buyers of legal services

**Constraints:**
- ALL buttons: `border-radius: 6px` — NEVER 9999px pill, NEVER 4px, NEVER 0px
- Yellow button text: ALWAYS `color: var(--color-navy)` — never white on yellow (contrast would fail)
- Pricing: ALWAYS show strike-through + discounted — NEVER "Contact for quote" or hidden pricing
- Strike-through: ALWAYS `<del>` tag — NEVER CSS `text-decoration: line-through` on `<span>`
- NO dark background sections (except navy footer) — white/light-surface only, unlike bw_legal_03
- NO serif font anywhere — Roboto only
- NO pill buttons (9999px) — that's the bw_legal_01/02 pattern
- Dual ratings (Google + Trustpilot) ALWAYS appear together in hero — never just one
- Money-back guarantee appears in BOTH hero trust row AND TrustSignals section
- No hex values in `.module.css` (except `rgba()` in shadows)
- `page.tsx` must be a Server Component — no `'use client'` on the page file
- Respect: `prefers-reduced-motion: reduce` → disable all animations and transitions.

---

## Platform Versions

---

### Version 1 — Lovable

Build a productized Indian legal services homepage inspired by Vakilsearch using React, TypeScript, and CSS Modules. White background throughout with navy `#022B50` and yellow `#FFD000` as the brand palette.

**Color system — 8 tokens only:**
```css
--color-navy: #022B50; --color-yellow: #FFD000; --color-blue: #007AFF;
--color-surface: #F5FAFF; --color-text: #231F20; --color-muted: #606162;
--color-border: #E4E7EB; --color-white: #FFFFFF;
```
No hex values in `.module.css` files — only `var(--color-*)` references.

**Typography:** Roboto via Google Fonts, weights 400/500/600/700. No serif font anywhere.

**Button radius: `6px` on all buttons.** Card radius: `10px`. No `9999px` pill. No `0px` sharp.

**StickyNav:** White background, navy logo text, horizontal service links, yellow "Get Started" CTA button (6px radius, navy text on yellow background).

**Hero:**
- White background, `min-height: 75vh`
- Navy H1: Roboto 700, `clamp(2.25rem, 4vw, 3.25rem)`
- Subheading: `#606162`, Roboto 400
- Dual rating row: `⭐ 4.5/5 (Google · 20K+ Reviews) | ⭐ 4.5/5 (Trustpilot · 7.5K+ Reviews)`
- ISO 27001 badge inline in trust row
- "Get Started" primary CTA (navy bg, white text) + "Talk to an Expert" secondary (navy outline)
- Service search bar below CTAs: input with navy border + "Find Service" button

**Service cards — ProductCard component:**
- White card, `border-radius: 10px`, `box-shadow: 0 4px 18px rgba(0,0,0,0.10)`
- Service name (Roboto 600, navy)
- Strike-through original price + discounted price: `<del>₹1,499</del> ₹999`
- Yellow discount badge: `-33% Off`
- Feature list with Lucide `Check` icons in `--color-blue`
- "Get Started" CTA per card: navy bg, white text, 6px radius

**Service tab selector:** 3 tabs (Startup | Business | Compliance) — navy underline indicator on active tab. Filters which service cards display.

**TrustSignals section — `#F5FAFF` background:**
- ISO 27001 certified platform
- Money-back guarantee: "Application submitted in 7 days or 100% refund"
- 4.5★ Google (20K+ reviews)
- 4.5★ Trustpilot (7.5K+ reviews)
- 50K+ businesses served

**HowItWorks:** 3 steps. Navy numbered circles (40px, `border-radius: 50%`). Yellow connector line `2px solid #FFD000`. Step title Roboto 600 navy. Step description muted.

**Footer:** Navy background, white text, 4-column layout. Yellow hover on links. ISO/Trustpilot badges at bottom.

CSS Modules only. No Tailwind. `tsc --noEmit` clean. `npm run build` static export.

---

### Version 2 — ChatGPT Canvas

```
Project: Indian legal services homepage — productized, consumer-first
Stack: Next.js 14 App Router, TypeScript strict, CSS Modules
Inspiration: Vakilsearch (vakilsearch.com)

COLORS (8 tokens in globals.css — no hex in .module.css):
  --color-navy:    #022B50   nav, headings, primary buttons
  --color-yellow:  #FFD000   accent, trust badges, tab indicator
  --color-blue:    #007AFF   links, checkmarks
  --color-surface: #F5FAFF   section backgrounds
  --color-text:    #231F20   body text
  --color-muted:   #606162   secondary text
  --color-border:  #E4E7EB   card borders
  --color-white:   #FFFFFF   page background

FONT: Roboto 400/500/600/700 via next/font/google. No serif.

RADIUS RULES:
  Buttons:   6px — always, no exceptions
  Cards:     10px
  Pill:      NEVER (no 9999px)

SECTIONS (top to bottom):
1. StickyNav — white bg, navy logo, "Get Started" yellow button
2. Hero — white bg, H1 navy Roboto 700, dual star ratings, search bar
3. ServiceTabs — tab selector + ProductCard grid (prices shown, strike-through)
4. TrustSignals — F5FAFF bg, ISO cert, money-back, rating counts
5. HowItWorks — 3 steps, navy circles, yellow connectors
6. Testimonials — white cards, star ratings, client name + company
7. Footer — navy bg, 4 columns, yellow link hover

PRICING RULES:
- Every service card shows: discounted price + struck-through original
- Format: <del>₹1,499</del> ₹999 + Govt. Fee
- Yellow badge: "-33% Off"
- NEVER hide pricing. NEVER "Contact for quote".

STAR RATINGS:
- Dual rating in hero: Google 4.5★ (20K+) AND Trustpilot 4.5★ (7.5K+)
- Both always present. Not optional.

MONEY-BACK:
- "Application submitted within 7 days or 100% Money Back"
- Show in TrustSignals AND in hero trust row

COMPONENTS:
- ProductCard — service name, strike-through price, discount badge, feature list, CTA
- ServiceTabs — tab strip with active underline, filters card grid
- RatingBadge — logo + star + count (reusable for Google and Trustpilot)
- TrustBadge — icon + title + description (ISO, guarantee, ratings)
- Button — variant: primary|secondary|yellow, size: md|sm, radius always 6px

ANTI-PATTERNS:
- No dark background sections (this is a white/light site, unlike bw_legal_03)
- No 9999px pill buttons (law firm pattern)
- No hidden pricing
- No serif font
- No purple, terracotta, or gold accent (law firm palettes)

OUTPUT: Static Next.js site. tsc --noEmit clean. npm run build succeeds.
```

---

### Version 3 — Bolt.new

Design and build an Indian legaltech homepage with productized services and transparent pricing, inspired by Vakilsearch.

**Visual identity:**
Navy `#022B50` (headings, nav, buttons) + Yellow `#FFD000` (accent, discounts, highlights) + White page background. Light blue `#F5FAFF` for section tints. Roboto typeface, 400–700 weights. `6px` button radius. `10px` card radius with box shadows. No serif. No pill buttons.

**Navigation:** Sticky, white background. Logo: "LexFlow" in navy Roboto 700. Center links: Services, About, Pricing, Contact. Right: "Get Started" button — yellow background, navy text, `6px` radius, `height: 40px`.

**Hero section:**
- White background, max-width 1200px
- Left column: eyebrow tag ("India's Trusted Legal Platform · Since 2010"), H1 Roboto 700 navy, subheading muted
- Trust row: Google rating badge + Trustpilot rating badge + ISO 27001 chip
- Two CTAs: "Register My Business" (navy bg, white) + "Talk to a CA" (navy outline)
- Right column: floating service card with top 3 services and quick price display

**Service catalog section:**
Tab strip: [Startup] [Business] [Compliance] [IP & Trademark]
Under each tab, 3 ProductCards side-by-side:
```
╔═══════════════════════════╗
║  Private Limited Company  ║
║  ~~₹1,499~~ ₹999          ║
║  -33% OFF  [yellow badge] ║
║  ✓ 4-7 day filing         ║
║  ✓ DSC for 2 directors    ║
║  ✓ MOA & AOA drafting     ║
║  ✓ PAN & TAN included     ║
║  [Get Started]            ║
╚═══════════════════════════╝
```
White card, `10px` radius, `box-shadow: 0 4px 18px rgba(0,0,0,0.10)`.

**TrustSignals band:** `#F5FAFF` background. 4 blocks: ISO 27001 | Money-Back 7 Days | Google 4.5★ | Trustpilot 4.5★.

**HowItWorks:** 3 steps in horizontal row. Navy circle numbers, yellow `2px` connector lines. Titles navy Roboto 600, descriptions muted.

**Testimonials:** 3 white cards with 5-star rating, quote, client name + company. Muted border, 10px radius, shadow.

**Footer:** Navy background `#022B50`. White text. 4-column grid. Links: yellow on hover. Bottom bar: ISO, Trustpilot logos at 50% opacity.

CSS Modules. Zero hex in module files. TypeScript strict. Static export.

---

### Version 4 — v0

Build a productized Indian legal services homepage for a company named "LexFlow".

**Design constraints:**
- Background: white — all sections use `--color-white` or `--color-surface` (#F5FAFF)
- Primary: `--color-navy: #022B50` — headings, buttons, nav
- Accent: `--color-yellow: #FFD000` — badge highlights, active tab underline, secondary CTA
- Radius: `6px` buttons, `10px` cards — exactly these values
- Font: Roboto 400/500/600/700 (Google Fonts)
- No hex in CSS Modules. No Tailwind.

**Sections:**

*StickyNav:* White, 64px, `border-bottom: 1px solid var(--color-border)`. Logo left. Links center. "Get Started" right — yellow bg, navy text, 6px radius.

*Hero:* Split layout — text left 55%, visual panel right 45% on desktop.
- Eyebrow: "India's Trusted Legal Platform"
- H1: Roboto 700, `clamp(2.25rem, 4vw, 3.25rem)`, navy
- Subheading: Roboto 400, muted grey
- Ratings row: Google ⭐4.5 (20K+) + Trustpilot ⭐4.5 (7.5K+) + ISO chip
- CTAs: "Start Registration" (navy, primary) + "Talk to Expert" (navy outline, secondary)
- Right panel: stacked service cards showing 3 most popular services with prices

*ServiceTabs:* 4 tabs. Active tab: navy text + 3px yellow bottom border. Cards below animate in.

*ProductCard* (TypeScript interface):
```typescript
interface ServiceProduct {
  id: string
  name: string
  category: 'startup' | 'business' | 'compliance' | 'ip'
  originalPrice: number
  discountedPrice: number
  discountPercent: number
  deliveryDays: number
  features: string[]
  popular: boolean
  ctaLabel: string
}
```

*TrustRow:* 4 blocks on `--color-surface` background. Each: icon + headline + subtext.

*Testimonials:* 3 cards. Each: StarRating + quote + name + company.

*Footer:* Navy `#022B50` background. 4 columns. Yellow hover. Bottom bar with cert badges at 50% opacity.

TypeScript strict. `tsc --noEmit` clean. `npm run build` static export.

---

### Version 5 — Claude Artifacts

Build `bw_legal_04` — a productized Indian legal services homepage. The reference site is Vakilsearch (vakilsearch.com). Read the full scaffold in `bw_legal_platform_04_scaffold/` before writing any file.

**Core identity:**
- White background throughout (not dark — this differs from bw_legal_03)
- Navy `#022B50` + Yellow `#FFD000` palette
- Roboto font (Google Fonts), weights 400–700
- `6px` button radius, `10px` card radius, `0` pill radius
- Legal services sold as fixed-price products with transparent pricing

**File structure:**
```
src/
  types/index.ts         — ServiceProduct, Testimonial, TrustSignal, Step, TabId
  lib/data.ts            — mock data arrays (services, testimonials, steps)
  app/
    layout.tsx           — Roboto font, globals.css
    page.tsx             — assembles all sections
    globals.css          — 8 color tokens ONLY
  components/
    layout/
      StickyNav.tsx      — server component, white, yellow CTA
      Footer.tsx         — navy background
    home/
      Hero.tsx           — split layout, dual ratings, ISO badge
      ServiceTabs.tsx    — 'use client', tab state, card grid
      ProductCard.tsx    — server component, strike-through price, discount badge
      TrustSignals.tsx   — F5FAFF background, 4 trust blocks
      HowItWorks.tsx     — server component, numbered steps
      Testimonials.tsx   — server component, star ratings
    ui/
      Button.tsx         — variant: primary|secondary|yellow, radius ALWAYS 6px
      StarRating.tsx     — value + count, aria-label
      RatingBadge.tsx    — platform (google|trustpilot) + rating + count
```

**Critical rules:**
1. `border-radius: 6px` on every `<Button>` — not 4px, not 9999px
2. Every section background: white or `#F5FAFF` — no dark sections
3. Prices MUST appear on every ProductCard with strike-through original
4. Both Google AND Trustpilot ratings in hero — both required
5. Money-back guarantee text in TrustSignals section
6. `ServiceTabs.tsx` is the only `'use client'` component — tab selection state
7. Zero hex in any `.module.css` file
8. `tsc --noEmit` exits 0, `npm run build` succeeds

---

### Version 6 — Grok

```markdown
# Task: Build bw_legal_04 — Productized Indian Legal Services Homepage

## Context
Indian legaltech startup homepage. Inspired by Vakilsearch. Legal services sold as
fixed-price products. White-background, consumer-fintech aesthetic. Unlike law firm builds
(bw_legal_01/02), pricing is shown. Unlike bw_legal_03 (dark theme), background is white.

## Tech Stack
- Next.js 14 App Router, TypeScript 5, CSS Modules
- No Tailwind, no styled-components
- Framer Motion for section entrances
- Lucide React for icons

## Design Tokens (globals.css — 8 tokens, no hex in modules)
--color-navy:    #022B50
--color-yellow:  #FFD000
--color-blue:    #007AFF
--color-surface: #F5FAFF
--color-text:    #231F20
--color-muted:   #606162
--color-border:  #E4E7EB
--color-white:   #FFFFFF

## Typography
Roboto, weights 400/500/600/700, loaded via next/font/google.
Variable: --font-sans. Applied on <html>. No serif font anywhere.

## Component Contracts

### Button
props: variant ('primary'|'secondary'|'yellow'), size ('md'|'sm'), children, href?, onClick?
primary:   background navy, text white
secondary: border navy, text navy, transparent bg
yellow:    background yellow, text navy
RADIUS: 6px — hardcoded, never a prop, never overridden

### ProductCard
props: service (ServiceProduct)
Shows: name, originalPrice (strikethrough), discountedPrice, discountPercent badge (yellow),
       deliveryDays, features[] with blue Check icons, CTA button
NEVER hide price. NEVER show "Contact for pricing".

### RatingBadge
props: platform ('google'|'trustpilot'), rating (number), count (string)
Shows platform logo or name, star, rating/5, count string

### ServiceTabs
'use client' — manages active tab state
Tabs: Startup | Business | Compliance | IP & Trademark
Active tab indicator: 3px yellow bottom border, navy text
Filters ProductCard grid by ServiceProduct.category

## Acceptance Criteria
- [ ] npm run build exits 0
- [ ] tsc --noEmit exits 0
- [ ] No hex in *.module.css (grep check)
- [ ] button border-radius = 6px in DevTools
- [ ] card border-radius = 10px in DevTools
- [ ] All ProductCards show discountedPrice AND originalPrice (struck through)
- [ ] Hero contains both Google rating AND Trustpilot rating
- [ ] No dark background on any section
- [ ] No serif font
- [ ] Lighthouse >= 90/90
```

---

### Version 7 — Gemini

Design brief for a productized Indian legal services website homepage.

**Brand:** LexFlow Legal — makes company registration, trademark filing, and compliance as simple as buying an app subscription.

**Visual system:**
White primary background. Navy `#022B50` for authority (headings, nav, main CTAs). Yellow `#FFD000` as the energy accent — applied to discount badges, the active tab underline, and the nav "Get Started" button. Blue `#007AFF` for checkmarks and links. Light blue `#F5FAFF` for alternate section backgrounds. Roboto typeface exclusively, no serif anywhere.

Radius vocabulary: `6px` buttons, `10px` cards. No pill. No sharp.

**Homepage sections:**

1. **Navigation** — sticky, white, 64px. Logo left. "Services / Company Registration / Trademark / Compliance" center. "Get Started" — yellow button right, navy text.

2. **Hero** — split. Left: eyebrow "Trusted by 50,000+ Businesses", H1 "Register Your Business. File Your Trademark. Stay Compliant." (Roboto 700, navy, `clamp(2.25rem, 4vw, 3.25rem)`), muted subheading, dual rating badges (Google 4.5★ 20K+ reviews, Trustpilot 4.5★ 7.5K+ reviews), ISO 27001 badge, two CTAs. Right: floating card showing top 3 services with prices.

3. **ServiceCatalog** — tabs (Startup | Business | Compliance | IP). Each tab shows 3 ProductCards. Cards: white bg, 10px radius, shadow. Each shows: service name, `~~₹1,499~~ ₹999`, yellow `-33% Off` badge, 4 feature bullets with blue checks, "Get Started" navy button.

4. **TrustSignals** — `#F5FAFF` band. 4 blocks: (1) ISO 27001 Only certified platform (2) 7-Day Money-Back Guarantee (3) Google 4.5★ · 20K+ Reviews (4) 50,000+ Businesses Served.

5. **HowItWorks** — 3 steps: "Choose a Service" → "Share Documents" → "We Handle the Rest". Navy numbered circles, yellow 2px connector lines on desktop.

6. **Testimonials** — 3 cards. Star rating, 2-sentence quote, name, company type.

7. **Footer** — navy background. 4 columns: Brand+tagline | Services | Resources | Company. Yellow link hover. ISO + Trustpilot badges at 50% opacity in bottom bar.

**Anti-patterns:** No dark sections. No pill buttons. No pricing gates. No serif. No purple/terracotta.

Output: Next.js 14 + TypeScript + CSS Modules. Static export. Lighthouse ≥90/90.

---

### Version 8 — Cursor

```typescript
/*
 * bw_legal_04 — Productized Indian Legal Services Homepage
 * Reference: Vakilsearch (vakilsearch.com)
 * Stack: Next.js 14 App Router · TypeScript strict · CSS Modules
 *
 * DESIGN RULES (violations = build failure):
 * 1. Background: white or #F5FAFF — NO dark sections
 * 2. Buttons: border-radius 6px — NO 9999px, NO 4px, NO 0px
 * 3. Cards: border-radius 10px + box-shadow
 * 4. Font: Roboto only — NO serif
 * 5. Pricing: ALWAYS shown with strike-through original price
 * 6. Ratings: Google 4.5★ AND Trustpilot 4.5★ — BOTH in hero
 * 7. No hex in *.module.css — only var(--color-*) tokens
 */

// src/types/index.ts

export type TabId = 'startup' | 'business' | 'compliance' | 'ip'

export interface ServiceProduct {
  id: string
  name: string
  category: TabId
  originalPrice: number      // shown struck-through: ₹1,499
  discountedPrice: number    // shown large: ₹999
  discountPercent: number    // shown in yellow badge: 33
  deliveryDays: number       // "Filed in 4-7 days"
  features: string[]         // 4 items max, blue Check icons
  popular: boolean           // "Most Popular" badge on card
  ctaLabel: string           // "Get Started"
}

export interface Testimonial {
  id: string
  name: string
  company: string
  rating: 5 | 4              // always 4 or 5 for display
  quote: string
}

export interface TrustSignal {
  id: string
  icon: string               // lucide icon name
  headline: string           // "ISO 27001 Certified"
  subtext: string            // "Only certified platform in India"
}

export interface Step {
  number: number
  title: string
  description: string
}

// COLOR TOKENS (copy to globals.css — 8 tokens exactly):
// --color-navy:    #022B50
// --color-yellow:  #FFD000
// --color-blue:    #007AFF
// --color-surface: #F5FAFF
// --color-text:    #231F20
// --color-muted:   #606162
// --color-border:  #E4E7EB
// --color-white:   #FFFFFF

// COMPONENT RULES:

// Button.tsx:
// - border-radius: 6px — hardcoded in CSS, never a prop
// - variant 'primary': navy bg, white text
// - variant 'secondary': navy border, navy text, transparent bg
// - variant 'yellow': yellow bg, navy text

// ProductCard.tsx — SERVER COMPONENT:
// - originalPrice in <del> tag
// - discountedPrice bold navy
// - discountPercent in yellow badge
// - features[] with Lucide Check in --color-blue
// - popular=true → "Most Popular" yellow ribbon

// ServiceTabs.tsx — 'use client':
// - useState<TabId> for active tab
// - Active indicator: border-bottom: 3px solid var(--color-yellow)
// - Filters products by category on tab change

// ACCEPTANCE CHECKLIST:
// □ tsc --noEmit exits 0
// □ npm run build exits 0
// □ grep "#" src/**/*.module.css returns empty
// □ Every button computed border-radius = 6px
// □ Every card computed border-radius = 10px
// □ Both Google + Trustpilot ratings in hero
// □ All ProductCards have originalPrice in <del> AND discountedPrice
// □ No section has dark background
// □ Lighthouse Performance ≥90, Accessibility ≥90
```
