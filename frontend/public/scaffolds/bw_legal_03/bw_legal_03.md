# bw_legal_03 — Indian CA / Tax Filing Service
## Reference: ClearTax · cleartax.in

---

## Base Prompt

**Role:** Senior product designer specialising in Indian fintech and professional services platforms, dark-first consumer UX, and dual-path self-serve vs. expert-assist conversion flows.

Design a consumer-facing Indian tax filing and CA services platform — dark-themed, action-first, benefit-quantified. The product sits at the intersection of fintech and professional services: it has the credibility of certified accountants but the UX velocity of a consumer app. Every design decision should reduce filing anxiety, surface concrete financial outcomes (₹ saved, refunds delivered), and offer two clear paths: self-file vs. CA-assisted.

This is NOT a law firm site. Formal restraint gives way to action-oriented language, social proof with star ratings, and pricing transparency — all elements forbidden in the legal category.

**Brand color system (exact):**
- Dark surface: `#151515` — primary page background, hero, footer
- Deep dark: `#0d0d0d` — slightly darker surface for layering
- Primary blue: `#1678FB` — all CTAs, active states, links, highlights
- Light blue tint: `#B7D5FE` — table headers, subtle accents
- Body text primary: `#EDEFF2` — main readable text on dark
- Body text secondary: `#929FB0` — muted labels, subtext, captions
- Border/divider: `#9BAABD` at `0.5px` opacity — ultra-thin section dividers
- Dark body text (light sections): `#314259`

**Typography system:**
- Font: "Plus Jakarta Sans" (Google Fonts proxy for Gilroy), weights 400/500/600/700/800
- H1 hero: `clamp(2.5rem, 5vw, 3.75rem)`, weight 800
- Section H2: `clamp(1.5rem, 3vw, 2.25rem)`, weight 700
- Card heading: `1.125rem`, weight 600
- Section eyebrow: `0.75rem`, weight 600, uppercase, `0.16em` letter-spacing
- Body: `1rem / 1.7`, weight 400, `#929FB0` on dark
- CTA label: `0.9375rem`, weight 600, uppercase, `0.04em` letter-spacing
- Stat value: `clamp(2rem, 4vw, 3rem)`, weight 800

**Layout system:**
- Container: `min(90%, 1200px)`, centered
- Section padding: `clamp(56px, 7vw, 96px)` vertical
- Service tier grid: 3 columns desktop, 1 column mobile
- Feature grid: 4 columns desktop, 2 tablet, 1 mobile
- Logo strip: horizontal scroll (no grid)

**Component specifications:**

*Sticky navigation:*
- Dark background `#151515`, `border-bottom: 0.5px solid rgba(155,170,189,0.3)`
- Height `64px`
- Logo left, nav links center, "File Now" CTA right
- CTA: blue `#1678FB`, `border-radius: 4px`, height `40px`, white text weight 600
- Nav links: `#929FB0` at rest, `#EDEFF2` on hover, `0.2s` transition
- NO transparent-at-top behavior — always dark

*Hero — dual-path:*
- Full viewport height (or `min-height: 80vh`)
- Dark `#151515` background
- Left-aligned content, max 60% width on desktop
- Eyebrow label: "India's #1 Tax Platform" — `0.75rem` uppercase, blue `#1678FB`, weight 600
- H1: Plus Jakarta Sans 800, `#EDEFF2`, line-height 1.1
- Subheading: weight 400, `#929FB0`, max 80 chars
- Trust row: star rating (4.9★) + review count + vertical divider + lifetime refund stat (₹5,346 Cr+)
- Two parallel CTAs side by side:
  - Primary "File Yourself" — blue `#1678FB` bg, white text, `border-radius: 4px`, height `48px`
  - Secondary "Get CA Help" — transparent bg, `border: 1.5px solid rgba(155,170,189,0.5)`, same height, same radius
- Right side (desktop): animated illustration or dark dashboard mockup

*Trust row — social proof:*
- "Trusted by 8M+ taxpayers"
- Company logos strip: Swiggy, Myntra, Zomato, Flipkart — small, muted, horizontal
- Certification badges row: ISO 27001, SSL 128-bit, SOC 2 — small icons + labels

*Service tier cards (pricing transparency — unlike law firms):*
- 3 tiers: "Self File" (₹0 or low), "Expert Assist" (₹999+), "CA Filing" (₹1,999+)
- Dark card: `background: rgba(255,255,255,0.04); border: 0.5px solid rgba(155,170,189,0.3); border-radius: 8px`
- Recommended tier: `border-color: #1678FB; background: rgba(22,120,251,0.06)`
- Price: large weight 800 `#EDEFF2`, monthly/yearly toggle above
- Feature list: checkmarks in blue, `#929FB0` label text
- CTA button per tier: blue primary or grey secondary, `border-radius: 4px`
- NO `border-radius: 0` (sharp) or `9999px` (pill) — exactly `4px` or `8px`

*Feature highlights (step-process):*
- 3 or 4 steps in a row — numbered circles in blue, step label weight 600 `#EDEFF2`, description `#929FB0`
- Thin blue connector line between circles on desktop
- Section on dark background with subtle divider

*Stats/outcomes strip:*
- Same dark `#151515` background — NOT a colored strip
- 4 large outcome numbers: "₹5,346 Cr+ Refunds", "8M+ Users", "99.9% Uptime", "4.9★ Rating"
- Values: Plus Jakarta Sans 800, `clamp(2rem,4vw,3rem)`, `#EDEFF2`
- Labels: `0.875rem`, weight 400, `#929FB0`
- No border separators — pure spacing

*CA team / expert strip:*
- "Reviewed by certified CAs" — CA badge icons (ICAI logo style)
- Expert count: "500+ CAs on platform"
- Response time: "< 24 hour turnaround"
- This is not an individual profiles section — it's a team-capability callout

*Footer:*
- `#151515` background, `border-top: 0.5px solid rgba(155,170,189,0.2)`
- 4-column layout: logo + tagline | Services | Resources | Company
- Blue link hover
- Certification badge row at bottom: ISO, SSL, SOC 2
- Copyright + legal links in `#929FB0`

**Buttons (exactly 4px radius — the defining constraint):**
- Primary: `background: #1678FB; color: #fff; border-radius: 4px; height: 48px; padding: 0 24px; font-weight: 600`
- Secondary: `background: transparent; border: 1.5px solid rgba(155,170,189,0.5); color: #EDEFF2; border-radius: 4px; height: 48px`
- Disabled: `background: rgba(22,120,251,0.3); cursor: not-allowed`
- Hover: `opacity: 0.88` or blue darkens by 10%
- ALL buttons: `border-radius: 4px` — never pill, never sharp

**Motion and animation:**
- Section entrance: `opacity: 0; translateY(50px)` → visible, `800ms ease-out`, stagger `300ms`
- Stats: count-up on IntersectionObserver, `1000ms ease-out`
- Logo strip: CSS `animation: scroll linear infinite` for marquee effect
- CTA hover: `transform: translateY(-1px)`, `200ms ease`
- `prefers-reduced-motion`: all transforms disabled; count-up skips to final

**Accessibility:**
- WCAG AA: `#EDEFF2` on `#151515` = 15.8:1 ✓; `#929FB0` on `#151515` = 6.1:1 ✓; white on `#1678FB` = 4.6:1 ✓
- Focus ring: `2px solid #1678FB` offset `2px`
- Star ratings: `aria-label="4.9 out of 5 stars, 45,000 reviews"`
- Pricing tier cards: `aria-label` indicates recommended tier
- Skip to main link
- All icons: `aria-hidden="true"` with adjacent text

**Anti-patterns — never include:**
- Serif fonts of any kind
- Pill-shaped buttons (`border-radius: 9999px`) — that's the law firm pattern
- White or light background as the primary page background
- Purple, maroon, or terracotta accents — those are law firm colors
- GoldCorner L-bracket decoration
- Grayscale-until-hover on any photo
- Institutional/formal copy tone — no "we are committed to excellence"
- Hidden pricing — tax service pricing must be visible
- Warm ivory or earthy color palette
- Formal "Contact Us" as primary CTA — use "File Now" or "Get Started"

---

## Platform Versions

---

### Version 1 — Lovable

Build an Indian tax filing service website using React + Tailwind CSS. Reference: ClearTax design language.

**Exact colors:**
```
Dark bg:     #151515
Primary:     #1678FB
Body text:   #EDEFF2
Muted text:  #929FB0
Border:      rgba(155,170,189,0.3)
```

**Font:** Import Plus Jakarta Sans (400/500/600/700/800) from Google Fonts.

**Components to build:**

1. **StickyNav** — `bg-[#151515]` always (no transparent state). Logo left, links center, "File Now" `bg-[#1678FB]` CTA right with `rounded` (4px).

2. **Hero** — `min-h-screen bg-[#151515]`, left-aligned. Eyebrow: "India's #1 Tax Platform" in `text-[#1678FB]` uppercase `text-xs tracking-widest font-semibold`. H1: `text-[#EDEFF2]` weight 800. Trust row: stars + review count + divider + "₹5,346 Cr+ refund". Two CTAs side by side: blue + grey-outline, both `rounded` (4px Tailwind).

3. **TrustStrip** — company logos (Swiggy, Myntra, Zomato, Flipkart) + certification badges (ISO, SSL, SOC 2). Muted, small.

4. **ServiceTiers** — 3 cards on dark bg. Card: `bg-white/4 border border-white/10 rounded-lg`. Recommended: `border-[#1678FB] bg-[#1678FB]/6`. Price: weight 800. Feature checklist: blue checkmarks.

5. **HowItWorks** — 3 steps with blue numbered circles and connector line. Step label weight 600 `text-[#EDEFF2]`, desc `text-[#929FB0]`.

6. **StatsRow** — 4 large outcome numbers on dark bg. Plus Jakarta Sans 800, no colored strip.

7. **Footer** — `bg-[#151515]`, `border-t border-white/10`. 4 columns. Certification badges bottom.

**Critical rules:**
- ALL buttons: `rounded` = `border-radius: 4px` — NOT `rounded-full`
- Dark background throughout — NO white sections
- Blue `#1678FB` for all active/interactive states
- Plus Jakarta Sans weight 800 for large headlines and stat numbers
- Pricing must be displayed (unlike law firm sites)
- Star ratings are allowed and required in hero trust row

---

### Version 2 — ChatGPT Canvas

Create a Next.js 14 app router project for an Indian tax filing service. Stack: Next.js, TypeScript, CSS Modules, Framer Motion.

**Brand:** Dark `#151515`, Blue `#1678FB`, Text `#EDEFF2`, Muted `#929FB0`
**Font:** `next/font/google` — Plus_Jakarta_Sans (400/500/600/700/800) as `--font-sans`

**File structure:**
```
src/
  app/
    layout.tsx
    page.tsx
    globals.css         ← 8 CSS tokens
  components/
    layout/
      StickyNav.tsx     ← always dark, no scroll toggle
      Footer.tsx
    home/
      Hero.tsx          ← dual-path CTAs, trust row
      TrustStrip.tsx    ← company logos + certs
      ServiceTiers.tsx  ← 3 pricing cards
      HowItWorks.tsx    ← numbered steps
      StatsRow.tsx      ← 4 outcome numbers
      ExpertStrip.tsx   ← CA team callout
    ui/
      Button.tsx        ← border-radius: 4px, 2 variants
      StarRating.tsx    ← 4.9★ with count
```

**`globals.css` tokens:**
```css
:root {
  --color-dark:    #151515;
  --color-darker:  #0d0d0d;
  --color-blue:    #1678FB;
  --color-blue-tint: rgba(22, 120, 251, 0.08);
  --color-text:    #EDEFF2;
  --color-muted:   #929FB0;
  --color-border:  rgba(155, 170, 189, 0.3);
  --color-surface: rgba(255, 255, 255, 0.04);
}
```

**Button component:**
```typescript
// border-radius: 4px — the defining constraint
// Primary: background: #1678FB
// Secondary: transparent + border rgba(155,170,189,0.5)
// Props: variant, size, children, href?, onClick?
```

**ServiceTiers:** 3 tiers — Self File / Expert Assist / CA Filing. Pricing shown explicitly. Recommended tier has `border-color: var(--color-blue)`. Feature list with blue checkmarks.

**Non-negotiables:** 4px button radius only; dark bg throughout; blue primary; pricing visible; star ratings in hero.

---

### Version 3 — Bolt

Build a tax service website. Vite + React + TypeScript + plain CSS.

**Colors (strict — 8 tokens):**
```css
--dark:       #151515;
--darker:     #0d0d0d;
--blue:       #1678FB;
--blue-tint:  rgba(22,120,251,0.08);
--text:       #EDEFF2;
--muted:      #929FB0;
--border:     rgba(155,170,189,0.3);
--surface:    rgba(255,255,255,0.04);
```

**Font:** Plus Jakarta Sans via Google Fonts `<link>`. Weight 400/500/600/700/800.

**Components:**

`Navbar.jsx` — `background: var(--dark); border-bottom: 0.5px solid var(--border)`. Always dark. "File Now" button: `background: var(--blue); color: #fff; border-radius: 4px; height: 40px; padding: 0 20px`.

`Hero.jsx` — `min-height: 100vh; background: var(--dark)`. Eyebrow: blue uppercase 12px tracked. H1: 800 weight, `#EDEFF2`. Trust row: `<StarRating value={4.9} count={45000} />` + divider + refund stat. Two CTAs: primary `#1678FB` + secondary transparent border, both `border-radius: 4px`.

`ServiceTiers.jsx` — 3-col grid. Cards:
```css
.card { background: var(--surface); border: 0.5px solid var(--border); border-radius: 8px; padding: 32px; }
.recommended { border-color: var(--blue); background: var(--blue-tint); }
```

`HowItWorks.jsx` — numbered steps with blue circles, connector line CSS:
```css
.step::after { content:''; position:absolute; top:20px; left:calc(50% + 20px); right:calc(-50% + 20px); height:1px; background:var(--blue); opacity:0.3; }
```

`StatsRow.jsx` — 4 stats, weight 800, large size. IntersectionObserver count-up.

`Footer.jsx` — `background: var(--dark); border-top: 0.5px solid var(--border)`. Certification badges row at bottom.

**Forbidden:** Pill buttons, white bg, serif fonts, purple/terracotta colors, hidden pricing.

---

### Version 4 — v0

Create a tax filing service homepage — consumer fintech tone, dark-themed, action-first.

**Design specification:**

Color tokens:
```
dark:      #151515  (page background — all sections)
blue:      #1678FB  (CTAs, active states, highlights)
text:      #EDEFF2  (readable body text on dark)
muted:     #929FB0  (secondary text, labels)
border:    rgba(155,170,189,0.3)  (card borders, dividers)
surface:   rgba(255,255,255,0.04)  (card backgrounds on dark)
```

Font: **Plus Jakarta Sans** — weights 400–800. No serif.

**Section order:**
1. Sticky dark nav — always dark, "File Now" blue button right
2. Hero — dark bg, dual-path, eyebrow label, trust row (stars + ₹ refund stat), two CTAs
3. Trust strip — company logos + ISO/SSL/SOC2 badges
4. Service tiers — 3 pricing cards on dark
5. How it works — 3 numbered steps with blue connector
6. Stats row — 4 large outcome numbers
7. Expert strip — "500+ CAs", turnaround time callout
8. Footer — dark, certification badges

**Button pattern (4px radius — strict):**
```css
.btnPrimary {
  background: #1678FB;
  color: #fff;
  border-radius: 4px;   /* NOT 9999px, NOT 0px */
  height: 48px;
  padding: 0 24px;
  font-weight: 600;
  font-size: 0.9375rem;
}
.btnSecondary {
  background: transparent;
  border: 1.5px solid rgba(155,170,189,0.5);
  color: #EDEFF2;
  border-radius: 4px;
  height: 48px;
}
```

**Service tier card pattern:**
```css
.card {
  background: rgba(255,255,255,0.04);
  border: 0.5px solid rgba(155,170,189,0.3);
  border-radius: 8px;
  padding: 32px;
}
.recommended {
  border-color: #1678FB;
  background: rgba(22,120,251,0.08);
}
```

**Trust row in hero:**
```tsx
<div className="trustRow">
  <span>⭐ 4.9/5</span>
  <span className="count">45K+ Reviews</span>
  <span className="divider" />
  <span>₹5,346 Cr+ Refunds Delivered</span>
</div>
```

Do not include: pill buttons, white/light background, serif fonts, purple/gold/maroon, hidden pricing.

---

### Version 5 — Claude Artifacts

Build `bw_legal_03` — ClearTax-style Indian tax filing service. Next.js 14 App Router, TypeScript strict, CSS Modules, Framer Motion. Static export.

**Color tokens (`globals.css`):**
```css
:root {
  --color-dark:      #151515;   /* Primary background — all sections */
  --color-darker:    #0d0d0d;   /* Slightly deeper surface for layering */
  --color-blue:      #1678FB;   /* Primary action color — CTAs, links, highlights */
  --color-blue-tint: rgba(22, 120, 251, 0.08); /* Blue surface tint — recommended card */
  --color-text:      #EDEFF2;   /* Primary readable text on dark */
  --color-muted:     #929FB0;   /* Secondary text, captions, subtext */
  --color-border:    rgba(155, 170, 189, 0.3); /* Ultra-thin card borders, dividers */
  --color-surface:   rgba(255, 255, 255, 0.04); /* Card background on dark */
}
```

**`src/types/index.ts`:**
```typescript
export interface ServiceTier {
  id: string
  name: string          // "Self File", "Expert Assist", "CA Filing"
  price: number         // 0, 999, 1999
  priceLabel: string    // "Free", "₹999/year", "₹1,999/year"
  recommended: boolean
  features: string[]
  ctaLabel: string
}

export interface Stat {
  value: number
  suffix: string         // "+", "Cr+", "★"
  prefix?: string        // "₹"
  label: string
}

export interface Step {
  number: number
  title: string
  description: string
}

export interface TrustLogo {
  name: string
  logoUrl: string
}

export interface Certification {
  name: string
  iconUrl: string
  subtitle: string    // "ISO 27001", "128-bit Encryption"
}
```

**Build sequence:**
1. `globals.css` — 8 tokens + `--font-sans` + `--container` + reset
2. `layout.tsx` — Plus_Jakarta_Sans from next/font/google, weights 400–800
3. `Button.tsx` — primary/secondary, `border-radius: 4px` only, sizes md/sm
4. `StarRating.tsx` — value + count + `aria-label`
5. `StickyNav.tsx` — always dark (no scroll toggle), blue "File Now" CTA
6. `Hero.tsx` — dual-path, eyebrow, trust row, two CTAs
7. `TrustStrip.tsx` — logo marquee + certification badges
8. `ServiceTiers.tsx` — 3 cards, pricing displayed, recommended highlight
9. `HowItWorks.tsx` — numbered steps, blue connector line
10. `StatsRow.tsx` — 4 stats, Framer Motion count-up on IntersectionObserver
11. `ExpertStrip.tsx` — CA count, turnaround, ICAI badge
12. `Footer.tsx` — dark, certification row, 4 columns
13. `page.tsx` — compose all sections

**Non-negotiables:**
- `border-radius: 4px` on buttons (NEVER 9999px, NEVER 0px)
- `border-radius: 8px` on cards
- Dark `#151515` throughout — no white-background sections
- Pricing displayed on ServiceTiers
- Star ratings rendered in hero
- Plus Jakarta Sans weight 800 for H1 and stat values

---

### Version 6 — Grok

Implement `bw_legal_03`: ClearTax-style tax service site. Next.js 14 + TypeScript + CSS Modules + Framer Motion. Static export.

**Tokens:** `--color-dark: #151515`, `--color-blue: #1678FB`, `--color-text: #EDEFF2`, `--color-muted: #929FB0`, `--color-border: rgba(155,170,189,0.3)`, `--color-surface: rgba(255,255,255,0.04)`, `--color-blue-tint: rgba(22,120,251,0.08)`, `--color-darker: #0d0d0d`

**Architecture:**
```
src/
  types/index.ts       ← ServiceTier, Stat, Step, TrustLogo, Certification
  lib/data.ts          ← all mock data arrays
  app/layout.tsx       ← Plus_Jakarta_Sans next/font
  app/page.tsx         ← section composition
  app/globals.css      ← 8 tokens + reset
  components/
    layout/StickyNav.tsx   ← always dark, no scroll toggle
    layout/Footer.tsx
    ui/Button.tsx          ← border-radius: 4px exactly
    ui/StarRating.tsx
    home/Hero.tsx
    home/TrustStrip.tsx    ← logo marquee CSS animation
    home/ServiceTiers.tsx  ← pricing displayed, recommended card
    home/HowItWorks.tsx    ← numbered steps with connector line
    home/StatsRow.tsx      ← count-up on intersection
    home/ExpertStrip.tsx
```

**Button CSS:**
```css
.btn { border-radius: 4px; font-family: var(--font-sans); font-weight: 600; }
.primary { background: var(--color-blue); color: #fff; }
.secondary { background: transparent; border: 1.5px solid var(--color-border); color: var(--color-text); }
.md { height: 48px; padding: 0 24px; font-size: 0.9375rem; }
.sm { height: 40px; padding: 0 18px; font-size: 0.875rem; }
```

**ServiceTiers card CSS:**
```css
.card { background: var(--color-surface); border: 0.5px solid var(--color-border); border-radius: 8px; padding: 32px; }
.recommended { border-color: var(--color-blue); background: var(--color-blue-tint); }
```

**Logo marquee:**
```css
@keyframes marquee { from { transform: translateX(0) } to { transform: translateX(-50%) } }
.track { animation: marquee 20s linear infinite; display: flex; width: 200%; }
/* `prefers-reduced-motion`: animation: none; */
```

Enforce: 4px buttons; 8px cards; dark bg; pricing visible; no serif; no pill; no warm colors.

---

### Version 7 — Gemini

Design and implement a consumer fintech tax filing platform for India.

**Visual identity:**
- Dark `#151515` as the base — signals a modern, tech-forward product, not a traditional CA office
- Bright blue `#1678FB` as the single action color — all CTAs, all interactive states, all highlights
- `#EDEFF2` primary text, `#929FB0` secondary — high legibility hierarchy on dark
- **4px button radius** — clean, product-like, neither pill nor sharp; signals precision and professionalism
- Plus Jakarta Sans 800 for headlines — geometric, confident, matches "India's #1 platform" tone
- Flat design, ultra-thin `0.5px` borders — modern fintech aesthetic, no shadow depth

**The dual-path hero:**
The hero presents two equal paths side by side: "File Yourself" (primary CTA) and "Get CA Help" (secondary CTA). This is the product's core proposition — it serves both confident DIYers and those who want expert help. Do not merge into a single CTA. Do not make one path smaller than the other.

Trust signals in the hero:
```
⭐ 4.9/5  |  45K+ Reviews  |  ₹5,346 Cr+ Refunds Delivered
```
These are allowed because this is a consumer product, not a law firm. The numbers reduce filing anxiety by proving outcomes.

**Service tier pricing:**
3 tiers with visible pricing (₹0 / ₹999 / ₹1,999 per year). Recommended tier has a blue border + blue tint background. Feature checklist with blue checkmarks. This transparency is a core trust signal — hide pricing only in a law firm context.

**Certification badges (footer):**
ISO 27001, SSL 128-bit, SOC 2 — displayed at footer bottom. These are the fintech equivalent of bar council membership — credibility through compliance, not reputation.

**Accessibility:**
- `#EDEFF2` on `#151515` = 15.8:1 ✓ (AAA)
- `#929FB0` on `#151515` = 6.1:1 ✓ (AA)
- White on `#1678FB` = 4.6:1 ✓ (AA)
- Star ratings: `aria-label="Rated 4.9 out of 5 stars, 45,000 reviews"`
- Focus ring: `2px solid #1678FB` offset `2px`

**Do not include:** Serif fonts, pill buttons, white background sections, purple/terracotta/gold, hidden pricing, formal law firm copy, GoldCorner decorations.

---

### Version 8 — Cursor

**Project:** `bw_legal_03` — ClearTax-style Indian tax service platform
**Stack:** Next.js 14 App Router + TypeScript + CSS Modules + Framer Motion
**Export:** Static (`output: 'export'`)

**CLAUDE.md for this build:**
```
Color tokens (globals.css — 8 tokens):
  --color-dark:      #151515   ← ALL section backgrounds
  --color-darker:    #0d0d0d   ← Slightly deeper for layering
  --color-blue:      #1678FB   ← Every CTA, every active state
  --color-blue-tint: rgba(22,120,251,0.08)  ← Recommended card bg
  --color-text:      #EDEFF2   ← Primary text on dark
  --color-muted:     #929FB0   ← Secondary text, captions
  --color-border:    rgba(155,170,189,0.3)  ← All card borders
  --color-surface:   rgba(255,255,255,0.04) ← Card backgrounds

Font: Plus Jakarta Sans (400/500/600/700/800) — NO serif ever

Button rule: border-radius: 4px on ALL buttons — NOT pill (9999px), NOT sharp (0px)
Card rule: border-radius: 8px on ALL cards
Background rule: #151515 on ALL sections — no white sections
Pricing rule: pricing MUST be shown on service tier cards
Star ratings: ALLOWED — required in hero trust row
```

**Types (`src/types/index.ts`):**
- `ServiceTier`: id, name, price, priceLabel, recommended, features[], ctaLabel
- `Stat`: value (number), suffix, prefix?, label
- `Step`: number, title, description
- `TrustLogo`: name, logoUrl
- `Certification`: name, iconUrl, subtitle

**Build sequence:**
1. `globals.css` — 8 tokens + font variable + reset
2. `layout.tsx` — Plus_Jakarta_Sans from next/font/google, weights 400–800
3. `Button.tsx` — `border-radius: 4px`, primary/secondary variants
4. `StarRating.tsx` — accessible component with aria-label
5. `StickyNav.tsx` — always dark, blue "File Now" CTA, no scroll toggle
6. `Hero.tsx` — dual-path CTAs, eyebrow, trust row with stars + refund stat
7. `TrustStrip.tsx` — logo marquee + certification badges
8. `ServiceTiers.tsx` — 3 cards, pricing shown, recommended highlighted in blue
9. `HowItWorks.tsx` — numbered steps, blue connector line, dark bg
10. `StatsRow.tsx` — 4 large numbers, count-up via IntersectionObserver
11. `ExpertStrip.tsx` — CA capability callout, ICAI badge
12. `Footer.tsx` — dark, 4 columns, certification badges bottom row
13. `page.tsx` — compose all sections; verify dark bg throughout

**Gate:** `tsc --noEmit` clean, `npm run build` succeeds, no hex in CSS module files, `border-radius: 4px` on all buttons confirmed, dark background on ALL sections, pricing visible on service tiers, star rating in hero.
```
