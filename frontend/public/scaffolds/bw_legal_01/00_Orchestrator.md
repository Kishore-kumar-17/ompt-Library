# 00 — Orchestrator
## Premier Indian Law Firm · bw_legal_platform_01

You are building a Cyril Amarchand Mangaldas-style premier Indian law firm website. Read this file first. It tells you what makes this build unique and where to find everything else.

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

## What This Build Is

A prestige institutional website for India's largest full-service law firm. The design language is "restrained luxury" — not minimalist, not maximalist. Every element communicates authority through careful restraint:

- Deep purple commands attention without aggression
- Gold is used sparingly as a geometric accent — never as fill, never as text
- Serif headings signal institutional permanence
- Sharp card corners signal legal precision
- Pill buttons are the one unexpected softness — the brand's distinctive identity mark

This is not a startup site. This is not a portfolio site. It is a institutional authority site for a 75-year-old firm with 750+ lawyers.

---

## The Three Design Rules

**Rule 1: Purple is authority, gold is heritage — keep them separate.**
Purple (`#621755`) fills: navs, hero backgrounds, stat strips, CTA buttons, section headers.
Gold (`#d0a56d`) draws: corner L-brackets, horizontal rules, dividers, footer top border.
Gold is NEVER text. Gold is NEVER a button background. Gold is NEVER a hover state on text.

**Rule 2: Pill buttons, sharp cards — the paradox is intentional.**
`border-radius: 9999px` on every button. `border-radius: 0` on every card.
The pill shape is the firm's distinctive mark — soft CTAs in a sharp professional context.
Do not round the cards. Do not square the buttons.

**Rule 3: Grayscale-until-hover for leadership portraits.**
Leadership photos use `filter: grayscale(1)` by default, restoring to color on hover.
This is restraint — the person's authority comes from their name and title, not their photo color.
Do not skip this. Do not apply it to product/insight images.

---

## Color System at a Glance

```css
--color-brand:   #621755;   /* Deep purple — primary authority */
--color-gold:    #d0a56d;   /* Warm gold — decorative accent only */
--color-text:    #2b3d44;   /* Charcoal — all body text */
--color-muted:   #6b7280;   /* Grey — secondary text, dates, labels */
--color-surface: #ffffff;   /* Pure white — page background */
--color-dark:    #3d0e35;   /* Dark purple — footer, dark sections */
```

**Contrast audit:**
- White on `#621755` = 9.6:1 ✓ (WCAG AAA)
- `#2b3d44` on white = 9.0:1 ✓ (WCAG AAA)
- `#d0a56d` on white = 2.7:1 ✗ (fails AA — decorative use only)

---

## What This Site Is NOT

| Site type | Why it's different |
|-----------|-------------------|
| E-commerce | No products, no cart, no pricing |
| SaaS landing page | No feature grids, no pricing tiers, no free trial CTAs |
| Portfolio/agency | No project showcases, no "we made this" tone |
| Startup site | No growth metrics, no investor language, no urgency |
| Consumer brand | No lifestyle photography, no casual tone, no social proof with stars |

---

## Content Architecture

```
Homepage
├── StickyNav (Practice Areas, People, Insights, About, Offices)
├── Hero (authority statement + 2 CTAs)
├── StatsStrip (75+ Years | 750+ Lawyers | 9 Offices | 50+ Rankings)
├── PracticeAreas (8 areas, 3-col grid)
├── LeadershipGrid (8 leaders, 4-col, grayscale)
├── Insights (6 publications, 3-col)
└── Footer (dark purple, 4 columns)
```

**Practice areas (8):**
M&A, Banking & Finance, Disputes, Capital Markets, Competition Law, Tax, Real Estate, Technology

**Office cities (9):**
Mumbai, Delhi-NCR, Bengaluru, Ahmedabad, Hyderabad, Chennai, GIFT City, Singapore, Abu Dhabi

**Insight categories:**
`'Legal Update' | 'Client Alert' | 'Thought Leadership' | 'Publication'`

---

## When to Stop and Ask

Stop and ask the user if:
- You are about to use gold (`#d0a56d`) as a text color or button background
- You are about to add `border-radius` to a card (sharp corners are non-negotiable)
- You are about to add `border-radius: 0` to a button (pill shape is non-negotiable)
- You are about to add star ratings, NPS scores, or testimonials with stars
- You are about to display pricing or fee structures
- You are about to add a countdown timer or urgency element
- You are about to add a casual live chat widget
- You are about to use a non-purple, non-gold accent color (no orange, blue, green)
- You are about to apply color photos for leadership portraits by default
- You are about to use a sans-serif font for H1 or major section headings
