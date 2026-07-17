# 00 — Orchestrator
## Indian CA / Tax Filing Service · bw_legal_platform_03

You are building a ClearTax-style Indian tax filing and CA services platform. Read this file first.

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

## How This Differs From bw_legal_01 and bw_legal_02

This is NOT a law firm. Reset every assumption from the law firm builds.

| Dimension | bw_legal_01 (CAM) | bw_legal_02 (AZB) | bw_legal_03 (ClearTax) |
|-----------|-------------------|-------------------|------------------------|
| Background | White | White | **Dark `#151515`** |
| Primary accent | Purple | Terracotta | **Blue `#1678FB`** |
| Button radius | 9999px (pill) | 9999px (pill) | **4px (rectangle)** |
| Card radius | 0px | 10px | **8px** |
| Font | Serif + sans | DM Sans (sans) | **Plus Jakarta Sans** |
| Star ratings | Forbidden | Forbidden | **Required** |
| Pricing | Never shown | Never shown | **Must be shown** |
| Tone | Formal/institutional | Formal/warm | **Action/consumer** |
| Primary CTA | "Contact Us" | "Contact" | **"File Now" / "Get Started"** |
| Section style | White / dark strip | White / dark navy | **Dark throughout** |
| Trust signals | Rankings only | Rankings only | **Stars, ₹ amounts, certs** |
| Logo strip | None | None | **Client company logos** |

---

## The Three Defining Constraints

**Constraint 1: Dark throughout — no white sections**
Every section background is `#151515`. There are no white or light-background sections (unlike all law firm builds). Section separation uses ultra-thin borders `0.5px solid rgba(155,170,189,0.3)` and spacing, not background color changes.

**Constraint 2: 4px button radius — exactly**
Not `0px` (CAM's sharpness). Not `9999px` (law firm pill). Exactly `4px`. This signals product precision: "we are a software company, not a traditional firm." Cards use `8px`. These two values (4px, 8px) are the only radius values in this build.

**Constraint 3: Consumer trust signals are required**
Star ratings, ₹ refund amounts, company logos, certification badges — all of these are forbidden in law firm builds but required here. They exist specifically to reduce filing anxiety for first-time or fearful users. Without them the hero feels empty and untrustworthy for this audience.

---

## Color System at a Glance

```css
--color-dark:      #151515;              /* Every section background */
--color-darker:    #0d0d0d;              /* Deeper surface for nav, footer */
--color-blue:      #1678FB;              /* Every CTA, every active state */
--color-blue-tint: rgba(22,120,251,0.08); /* Recommended card soft highlight */
--color-text:      #EDEFF2;              /* Primary text on dark */
--color-muted:     #929FB0;              /* Secondary text, captions */
--color-border:    rgba(155,170,189,0.3); /* Ultra-thin card borders */
--color-surface:   rgba(255,255,255,0.04); /* Card bg on dark */
```

**Contrast audit (all on `#151515`):**
- `#EDEFF2` = 15.8:1 ✓ (AAA)
- `#929FB0` = 6.1:1 ✓ (AA)
- White on `#1678FB` = 4.6:1 ✓ (AA)

---

## Content Architecture

```
Homepage
├── StickyNav (always dark, "File Now" blue CTA)
├── Hero (eyebrow + H1 + trust row + dual CTAs)
├── TrustStrip (company logos marquee + certifications)
├── ServiceTiers (3 pricing cards, visible pricing)
├── HowItWorks (3 numbered steps)
├── StatsRow (₹5,346 Cr+, 8M+ Users, 99.9%, 4.9★)
├── ExpertStrip (500+ CAs, <24hr turnaround)
└── Footer (dark, cert badges, 4 columns)
```

---

## When to Stop and Ask

Stop and ask the user if:
- You are about to add a white or light-background section
- You are about to use `border-radius: 9999px` on any button (pill = law firm pattern)
- You are about to hide pricing from the service tier cards
- You are about to remove star ratings from the hero
- You are about to use a serif font
- You are about to use purple, terracotta, maroon, or gold as an accent
- You are about to add a GoldCorner or L-bracket decoration
- You are about to make the nav transparent at top (always dark — no scroll toggle)
- You are about to write formal institutional copy ("We are committed to excellence...")
- You are about to remove the dual-path hero (both "File Yourself" + "Get CA Help" must be present)
