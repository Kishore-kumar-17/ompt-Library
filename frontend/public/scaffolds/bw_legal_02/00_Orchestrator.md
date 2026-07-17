# 00 — Orchestrator
## Top-Tier Indian Law Firm · bw_legal_platform_02

You are building an AZB & Partners-style top-tier Indian law firm website. Read this file first.

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

## How This Differs From bw_legal_01 (CAM)

If you have built bw_legal_01, reset the following assumptions explicitly:

| Dimension | bw_legal_01 (CAM) | bw_legal_02 (AZB) |
|-----------|-------------------|-------------------|
| Primary accent | Gold `#d0a56d` (decorative) | Terracotta `#B57560` (functional) |
| Font system | Playfair Display + Roboto (serif + sans) | DM Sans only (single sans-serif) |
| Card border-radius | `0px` — sharp corners | `10px` — slightly rounded |
| People photos | Grayscale → color on hover | Full color always |
| Hero pattern | Full-screen prose + gold rule | Tabbed narrative (4 tabs) |
| Dark section bg | Rare (footer only) | Major design element (hero + practice areas) |
| Scroll behavior | Nav bg switches on scroll position | Nav bg switches when dark section in viewport |
| People cards | Formal bio excerpt | Quote-led ("What drives me...") |
| Prestige signal | Gold L-bracket corner | Terracotta dot + dark navy section |
| Heading color | Black on white, white on dark | Terracotta on hero, black on white, white on dark |
| Section alternation | White + purple strip | White + navy alternating full-width |

---

## What Makes This Build Unique

**1. Scroll-triggered section background switching**
The most important architectural feature. Dark navy sections (hero, practice areas, footer) alternate with white sections. When a navy section enters the viewport (≥30% visible), the sticky nav switches from its white state to a dark navy state. This uses IntersectionObserver on `[data-dark-section]` elements — NOT a scroll position threshold.

**2. Tabbed hero**
The hero does not open with a prose statement. It opens with 4 clickable tabs representing the firm's value proposition: "Energy" / "Expertise" / "Execution" / "Unmatched". Each tab reveals a distinct headline in terracotta and supporting content. This is the site's most distinctive UX pattern.

**3. Quote-driven people profiles**
Every person card leads with a personal quote: "What drives my practice is..." This signals the firm's investment in individual personality — contrasting with CAM's purely credential-based profiles.

**4. Ghost cards on dark background**
Practice area cards use `rgba(255,255,255,0.04)` background on the navy section — barely-there ghost cards. Hover adds `rgba(255,255,255,0.08)` and a terracotta border tint. This is a dark-background card pattern, not a white card on dark.

**5. Single font throughout**
DM Sans at all weights. No Playfair Display, no serif anywhere. The authority comes from structural layout and color, not typographic contrast.

---

## Color System at a Glance

```css
--color-navy:       #002346;  /* Dark navy — primary dark surface */
--color-terracotta: #B57560;  /* Terracotta — accent, headings, CTAs */
--color-blue:       #00539B;  /* Secondary blue — links, tags */
--color-text:       #6B6B6B;  /* Body text grey */
--color-heading:    #000000;  /* Black headings on light backgrounds */
--color-surface:    #ffffff;  /* Light section backgrounds */
--color-border:     #e5e7eb;  /* Card borders on white sections */
```

**Contrast audit:**
- White on `#002346` = 15.3:1 ✓ (WCAG AAA)
- `#000` on white = 21:1 ✓
- `#6B6B6B` on white = 5.7:1 ✓ (WCAG AA)
- `#B57560` on white = 2.8:1 ✗ — use only on elements ≥18px or decorative
- `#B57560` on `#002346` = 4.6:1 ✓ (passes AA for large text on dark bg)

---

## Dark Section Rule

Sections with `background: var(--color-navy)` must have the attribute `data-dark-section` on their root element. This is what the `StickyNav` IntersectionObserver targets to switch its appearance.

```tsx
// CORRECT — nav will switch dark when this section is in view
<section className={styles.practiceSection} data-dark-section>

// WRONG — nav stays white even over this dark section
<section className={styles.practiceSection}>
```

---

## When to Stop and Ask

Stop and ask the user if:
- You are about to add a serif font (Playfair Display, Cormorant, etc.)
- You are about to use `border-radius: 0` on cards (AZB uses 10px)
- You are about to make people photos grayscale by default
- You are about to use a GoldCorner L-bracket (that's bw_legal_01's signature)
- You are about to switch the nav on scroll position instead of IntersectionObserver on sections
- You are about to display terracotta text smaller than 18px (contrast fails AA)
- You are about to add star ratings, pricing, or countdown timers
- You are about to replace the tabbed hero with a full-screen prose hero (different site)
- You are about to use warm ivory background (wrong brand — white only)
