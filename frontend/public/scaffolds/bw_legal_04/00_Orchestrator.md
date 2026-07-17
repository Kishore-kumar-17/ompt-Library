# 00 — Orchestrator
## Productized Indian Legal Services · bw_legal_platform_04

You are building a Vakilsearch-style Indian legal services platform. Legal services are sold as fixed-price products with transparent pricing — not as a consulting firm. Read this file first.

---

## Reading Sequence

| Order | File | Read when |
|-------|------|-----------|
| 1 | `00_Orchestrator.md` | Always first — this file |
| 2 | `01_PRD.md` | Before writing any component |
| 3 | `02_Architecture.md` | Before writing any TypeScript |
| 4 | `03_Design.md` | Before writing any CSS |
| 5 | `04_Plan.md` | For day-by-day build order |
| 6 | `05_Epics_and_Stories.md` | For acceptance criteria |
| 7 | `06_Tasks.md` | For task-by-task execution |
| 8 | `07_Guide.md` | When stuck or making a mistake |

---

## How This Differs From bw_legal_01, 02, and 03

| Dimension | bw_legal_01 CAM | bw_legal_02 AZB | bw_legal_03 ClearTax | **bw_legal_04 Vakilsearch** |
|-----------|-----------------|-----------------|----------------------|-----------------------------|
| Background | White | White | Dark `#151515` | **White / `#F5FAFF` tint** |
| Primary | Purple | Terracotta | Blue | **Navy `#022B50`** |
| Accent | Gold (decorative) | None | None | **Yellow `#FFD000`** |
| Button radius | 9999px (pill) | 9999px (pill) | 4px | **6px** |
| Card radius | 0px (sharp) | 10px | 8px ghost | **10px + shadow** |
| Card shadow | None | None | None | **`0 4px 18px rgba(0,0,0,0.10)`** |
| Font | Playfair+Roboto | DM Sans | Plus Jakarta Sans | **Roboto only** |
| Pricing | Never shown | Never shown | Shown (3 tiers) | **Shown with strike-through** |
| Guarantee | None | None | None | **Money-back (7 days)** |
| Ratings | Forbidden | Forbidden | Required (1 platform) | **Required (Google + Trustpilot)** |
| Hero layout | Full-width copy | Tabbed hero | Centered + dual CTA | **Split 55/45, visual right** |
| Service model | Practice areas | Practice areas | Tax filing tiers | **Fixed-price legal SKUs** |
| Section bg | White / dark strip | White / dark navy | All dark | **White / light blue tint** |
| ISO badge | None | None | None | **Prominent in hero** |

---

## The Three Defining Constraints

**Constraint 1: White background throughout — productized, not institutional**
Every section is white (`#FFFFFF`) or the light blue tint (`#F5FAFF`). Unlike law firms (institutional dark strips) and unlike bw_legal_03 (fully dark), this site uses light surfaces to communicate approachability and e-commerce clarity. Section separation is achieved via alternating white / `#F5FAFF` backgrounds, not borders.

**Constraint 2: 6px button radius — product-rounded**
Not `0px` (sharp/formal). Not `9999px` (pill/traditional). Not `4px` (ClearTax's SaaS signal). Exactly `6px`. This positions the brand as a modern product company — more approachable than a law firm, more grounded than pure SaaS.

**Constraint 3: Prices must be shown with strike-through originals**
Every service card shows both the original price (struck through, `<del>` tag) and the discounted price. A yellow percentage badge (`-33% Off`) accompanies each card. This creates the e-commerce pricing psychology — visible savings, not opaque consulting fees. "Contact for pricing" is forbidden.

---

## Color System at a Glance

```css
--color-navy:    #022B50;    /* Nav bg, headings, primary buttons */
--color-yellow:  #FFD000;    /* Accent, badges, tab indicator, nav CTA */
--color-blue:    #007AFF;    /* Feature checkmarks, links */
--color-surface: #F5FAFF;    /* Alternate section backgrounds */
--color-text:    #231F20;    /* Primary body text */
--color-muted:   #606162;    /* Secondary text, captions */
--color-border:  #E4E7EB;    /* Card borders */
--color-white:   #FFFFFF;    /* Primary page background */
```

**Contrast audit (body text on white `#FFFFFF`):**
- `#231F20` (text) = 18.1:1 ✓ (AAA)
- `#606162` (muted) = 5.9:1 ✓ (AA)
- White on `#022B50` (navy buttons) = 14.9:1 ✓ (AAA)
- Navy `#022B50` on `#FFD000` (yellow buttons) = 11.2:1 ✓ (AAA)

---

## Content Architecture

```
Homepage
├── StickyNav (white bg, navy logo, yellow "Get Started" CTA)
├── Hero (split layout, dual ratings, ISO badge, dual CTAs)
├── ServiceTabs (tab selector + ProductCard grid, prices shown)
├── TrustSignals (ISO 27001, money-back, Google, Trustpilot)
├── HowItWorks (3 numbered steps, yellow connectors)
├── Testimonials (star ratings, quote cards)
└── Footer (navy bg, 4 columns, yellow link hover)
```

---

## When to Stop and Ask

Stop and ask the user if:
- You are about to use a dark section background (all sections are white or `#F5FAFF`)
- You are about to use `border-radius: 9999px` on any button (pill = law firm pattern)
- You are about to use `border-radius: 4px` on buttons (that's the ClearTax signal, not this build)
- You are about to hide pricing or write "Contact for pricing"
- You are about to remove the money-back guarantee
- You are about to show only one rating source (both Google + Trustpilot are required)
- You are about to use a serif font
- You are about to use purple, terracotta, or dark blue as the primary accent (navy is structural, yellow is the accent)
- You are about to apply card shadows from bw_legal_03 (that build uses borderless ghost cards — this build uses white cards with shadows)
- You are about to use a centered hero (this build uses a 55/45 split layout)
