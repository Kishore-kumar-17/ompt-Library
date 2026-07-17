# bw_legal_01 — Premier Indian Law Firm
## Reference: Cyril Amarchand Mangaldas · cyrilshroff.com

---

## Base Prompt

**Role:** Senior brand designer and visual strategist specialising in prestige Indian law firm websites, institutional authority positioning, and serif/sans-serif typographic identity systems.

Design a premier Indian law firm website — authority-first, prestige-forward, with a deep purple and gold color system that signals institutional trust. The firm is India's largest full-service law firm, with 9 offices across India and international presence. The site must convey decades of authority through restrained luxury, not minimalism. Every design decision — typography weight, spacing, color use, corner decoration — should read as "India's top-tier legal institution."

**Brand color system (exact):**
- Primary purple: `#621755` — CTAs, section headers, sticky nav background
- Accent gold: `#d0a56d` — decorative corner borders, accent lines, secondary highlights
- Body text: `#2b3d44` — all paragraph text, dark charcoal not pure black
- Background: `#ffffff` — pure white content areas
- Dark surface: `#1a1a2e` — footer, dark section backgrounds
- Text on dark: `#ffffff`
- Muted text: `#6b7280`

**Typography system:**
- Primary font: "Playfair Display" (closest widely-available match to Kohinoor's authority feel), weights 400/700 — headings, hero text, section titles
- Body font: "Roboto", weight 300 for body, 400 for UI labels, 500 for emphasis — all paragraph text, nav, buttons
- Hero H1: `clamp(2.5rem, 5vw, 4rem)`, Playfair Display 700
- Section H2: `clamp(1.5rem, 3vw, 2.25rem)`, Playfair Display 700
- Card heading: `1.125rem`, Playfair Display 400
- Body: `1rem / 1.75`, Roboto 300
- Nav links: `0.875rem`, Roboto 500, uppercase, `0.08em` letter-spacing
- Button label: `0.875rem`, Roboto 500, uppercase, `0.1em` letter-spacing

**Layout system:**
- Container: `min(90%, 1400px)`, centered
- Desktop grid: 12 columns, `24px` gutters
- Section padding: `clamp(60px, 8vw, 120px)` vertical
- Practice area grid: 3 columns desktop, 2 tablet (768px+), 1 mobile
- Leadership grid: 4 columns desktop, 2 tablet, 1 mobile
- Max content width for body text columns: `720px`

**Component specifications:**

*Sticky navigation:*
- Height `80px` at rest, `64px` on scroll
- Transparent at top; `background: rgba(98, 23, 85, 0.95)` on scroll (>200px)
- Logo left, nav links center-right, CTA "Contact Us" right
- Active link: gold underline `2px solid #d0a56d`
- Mega-dropdown for Practice Areas: full-width, purple background, 4-column link grid

*Hero section:*
- Full-viewport-height
- Left-aligned content, 55% width on desktop
- Background: dark abstract image or deep purple gradient (`#621755` → `#3d0e35`)
- H1 in Playfair Display 700, white
- Subheading: Roboto 300, white, max 80 chars
- Primary CTA: white background, `#621755` text, pill-shaped `border-radius: 9999px`, `48px` height, `32px` horizontal padding
- Secondary CTA: transparent, white border, pill-shaped — same dimensions
- Gold horizontal rule `2px, 80px wide` above H1

*Practice area cards:*
- White background with `1px solid #e5e7eb` border
- Hover: left border becomes `4px solid #621755`, shadow `0 8px 32px rgba(98,23,85,0.12)`
- Icon top (SVG, purple fill), title Playfair Display 400, description Roboto 300 14px
- "Learn more →" link in purple, no underline by default, underlines on hover
- NO border-radius on cards — sharp corners signal legal formality

*Decorative corner element:*
- L-shaped double-line border in gold `#d0a56d` applied to section headings and featured content blocks
- Implementation: `::before` pseudo-element, `border-top: 2px solid #d0a56d; border-left: 2px solid #d0a56d`, `width: 24px; height: 24px`, positioned top-left of the heading wrapper
- This is the brand's prestige signature — apply to every major section heading

*Stat counters (firm credentials):*
- Row of 4 metrics: "75+ Years", "750+ Lawyers", "9 Offices", "Top-Ranked in 50+ Practices"
- Each: large number in Playfair Display 700 `3rem`, label in Roboto 300 `0.875rem` uppercase
- Purple background strip, white text, gold dividers between stats

*Leadership section:*
- Monochrome (desaturated) portrait photos, color restores on hover
- Name: Playfair Display 500 `1rem`
- Title: Roboto 300 `0.8rem`, muted, uppercase
- NO stars, NO testimonial quotes with attribution in casual format
- Formal bio excerpt only — "Senior Partner, 30 years of practice in M&A"

*Case study / insights cards:*
- Large image top, category tag in purple (pill shape), date in muted text
- Title Playfair Display 700 `1.25rem`, 2-line clamp
- "Read more" in purple with arrow
- NO bold promotional language — "Legal Update", "Client Alert", "Thought Leadership" only

*Buttons:*
- Primary: `background: #621755; color: #fff; border-radius: 9999px; height: 48px; padding: 0 32px`
- Secondary: `background: transparent; color: #621755; border: 2px solid #621755; border-radius: 9999px; height: 48px`
- Ghost (on dark bg): `background: transparent; color: #fff; border: 2px solid #fff; border-radius: 9999px`
- ALL buttons pill-shaped — this is the brand's distinctive CTA form

*Footer:*
- Dark purple background `#3d0e35`
- 4-column layout: logo + tagline | Practice Areas | Offices | Connect
- Thin gold horizontal rule at top of footer
- White text, gold accent links on hover
- Office city list in Roboto 300 small text

**Motion and animation:**
- Nav background transition: `500ms ease-in-out` on scroll
- Card hover border + shadow: `300ms ease`
- Photo desaturate → color: `filter: grayscale(100%)` → `grayscale(0)`, `400ms ease`
- Stat counters: count-up animation on intersection (0 → final value, `1200ms`)
- Page sections: `opacity: 0; transform: translateY(20px)` → visible on scroll, `600ms ease`, staggered `100ms`
- `prefers-reduced-motion`: disable all transforms and count-up; opacity transitions cut to `1ms`

**Accessibility:**
- WCAG AA throughout: white on `#621755` = 9.6:1 ✓; gold `#d0a56d` on white = 2.7:1 (decorative only — never used as text)
- Focus ring: `2px solid #d0a56d; outline-offset: 3px` — gold ring visible on both white and purple surfaces
- `aria-label` on all icon-only links
- Mega-dropdown: full keyboard navigation, `Escape` closes, focus trap within
- Leadership photos: `alt="[Name], [Title], Cyril Amarchand Mangaldas"`
- Skip to main content link (visually hidden, visible on focus)

**Anti-patterns — never include:**
- Orange, green, blue, or any non-purple/gold accent color
- Star ratings or NPS scores — unprofessional for law
- Pricing or fee structures on public pages
- Countdown timers or urgency elements
- Casual chat widgets (Intercom-style)
- Rounded card corners — law firms use sharp geometry
- Gradient text effects
- Testimonials with star icons — use pull quotes with formal attribution only
- Sans-serif-only typography — the serif/sans split is essential
- Color on photos by default — monochrome-until-hover signals restraint

---

## Platform Versions

---

### Version 1 — Lovable

Build a premier Indian law firm website using React with Tailwind CSS. This is for Cyril Amarchand Mangaldas — India's largest full-service law firm.

**Exact colors:**
```
Purple primary: #621755
Gold accent: #d0a56d
Body text: #2b3d44
Footer dark: #3d0e35
```

**Fonts:** Import Playfair Display (400, 700) and Roboto (300, 400, 500) from Google Fonts.

**Components to build:**

1. **StickyNav** — transparent at top, `bg-[#621755]/95` on scroll >200px. Logo left, links center-right, "Contact Us" pill CTA right. Use `useEffect` + `window.scroll` listener.

2. **Hero** — full viewport height, deep purple background `bg-[#621755]` or gradient to `#3d0e35`. Left-aligned content 55% width. Gold `h-0.5 w-20 bg-[#d0a56d]` line above H1. H1 in Playfair Display 700 white `text-5xl`. Two pill CTAs: white-bg + ghost-white.

3. **StatsStrip** — 4 stats on purple background: "75+ Years", "750+ Lawyers", "9 Offices", "50+ Top Rankings". Large Playfair Display numbers, gold dividers.

4. **PracticeAreas** — 3-column grid. Each card: white, 1px border, sharp corners (no border-radius), purple left-border + shadow on hover. Gold decorative corner L-bracket on section heading.

5. **LeadershipGrid** — 4-column. Monochrome photos, restore color on hover. Formal name/title below.

6. **InsightsRow** — horizontal scroll on mobile, 3-col desktop. Category pill in purple, Playfair title, "Read more →".

7. **Footer** — dark purple `bg-[#3d0e35]`, gold top border, 4-column layout.

**Critical rules:**
- ALL buttons: `rounded-full` (pill shape) — non-negotiable
- Cards: `rounded-none` (sharp corners) — non-negotiable
- Gold `#d0a56d` is decorative only — never use as text color (2.7:1 contrast fails WCAG)
- Monochrome photos: `grayscale hover:grayscale-0 transition-all duration-400`
- No stars, no pricing, no chat widget, no countdown timers

---

### Version 2 — ChatGPT Canvas

Create a Next.js 14 app router project for a premier Indian law firm website. Stack: Next.js, TypeScript, CSS Modules, Framer Motion.

**Brand:** Purple `#621755`, Gold `#d0a56d`, Charcoal `#2b3d44`, Dark footer `#3d0e35`
**Fonts:** `next/font/google` — Playfair_Display (400, 700) + Roboto (300, 400, 500)

**File structure:**
```
src/
  app/
    layout.tsx          ← fonts + metadata
    page.tsx            ← homepage sections
    globals.css         ← 6 CSS token variables
  components/
    layout/
      StickyNav.tsx     ← scroll-triggered purple bg
      Footer.tsx
    home/
      Hero.tsx
      StatsStrip.tsx
      PracticeAreas.tsx
      LeadershipGrid.tsx
      Insights.tsx
    ui/
      GoldCorner.tsx    ← reusable decorative corner element
      PillButton.tsx    ← border-radius: 9999px
```

**`globals.css` tokens:**
```css
:root {
  --color-brand: #621755;
  --color-gold: #d0a56d;
  --color-text: #2b3d44;
  --color-surface: #ffffff;
  --color-dark: #3d0e35;
  --color-muted: #6b7280;
}
```

**`GoldCorner` component:**
```tsx
// Reusable L-bracket corner decoration in gold
// Usage: wrap section heading in <div className={styles.headingWrapper}><GoldCorner /><h2>...</h2></div>
// CSS: ::before pseudo with border-top + border-left in var(--color-gold)
```

**Key behaviors:**
- `StickyNav`: `useState(scrolled)`, `useEffect` scroll listener, `transition: background 500ms ease-in-out`
- `LeadershipGrid`: CSS `filter: grayscale(1)` default, `grayscale(0)` on hover, `transition: filter 400ms`
- `StatsStrip`: Framer Motion `useInView` + counter animation from 0 to final value
- Framer Motion `whileInView` fade-up on all sections, `staggerChildren: 0.1`

**Non-negotiables:** `border-radius: 9999px` on buttons; `border-radius: 0` on cards; gold is decorative never text.

---

### Version 3 — Bolt

Build a law firm website for Cyril Amarchand Mangaldas. Use Vite + React + TypeScript + plain CSS.

**Design rules (strict):**

Colors — only these 6:
- `--purple: #621755` — buttons, nav, headers
- `--gold: #d0a56d` — corner decorations, dividers (never text)
- `--text: #2b3d44` — all body copy
- `--bg: #ffffff` — page background
- `--dark: #3d0e35` — footer
- `--muted: #6b7280` — secondary text

Fonts — Google Fonts import:
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Roboto:wght@300;400;500&display=swap" rel="stylesheet">
```

**Components:**

`Navbar.jsx` — position fixed, height 80px, transparent → `rgba(98,23,85,0.95)` on scroll. Purple pill "Contact" button right side.

`Hero.jsx` — full-vh, purple background, left-aligned. Gold rule `height:2px; width:80px; background:var(--gold)` above H1. H1 Playfair Display 700 60px white. Two buttons: white-bg pill + white-border pill.

`Stats.jsx` — purple strip, 4 columns. CountUp component triggered by IntersectionObserver.

`PracticeGrid.jsx` — CSS grid 3 cols. Cards: white, `border: 1px solid #e5e7eb`, `border-radius: 0`. Hover: `border-left: 4px solid var(--purple)`, `box-shadow: 0 8px 32px rgba(98,23,85,0.12)`.

`GoldCorner` — shared component:
```jsx
// <div style={{ position:'relative', paddingTop:16, paddingLeft:16 }}>
//   <span style={{ position:'absolute',top:0,left:0,width:24,height:24,
//     borderTop:`2px solid #d0a56d`,borderLeft:`2px solid #d0a56d` }} />
//   {children}
// </div>
```

`Leadership.jsx` — 4-col grid, `img { filter: grayscale(1); transition: filter 400ms }`, `img:hover { filter: grayscale(0) }`.

`Footer.jsx` — `background: #3d0e35`, 4 columns, gold top border `2px solid #d0a56d`.

**Forbidden:** rounded card corners, gold as text, star ratings, pricing, countdown timers, chat widgets.

---

### Version 4 — v0

Create a law firm homepage for India's premier legal institution — Cyril Amarchand Mangaldas.

**Exact design specification:**

Color tokens:
```
brand: #621755  (deep purple — authority)
gold: #d0a56d   (warm gold — prestige accent, decorative only)
text: #2b3d44   (charcoal body text)
dark: #3d0e35   (footer / dark sections)
muted: #6b7280
bg: #ffffff
```

Font pairing: **Playfair Display** (headings) + **Roboto 300** (body)

Layout: `max-width: 1400px; margin: 0 auto; padding: 0 5%`

**Sections in order:**
1. Fixed nav — transparent → semi-transparent purple on scroll, pill "Contact Us" CTA
2. Hero — full height, purple BG, gold line above H1, left-aligned, two pill CTAs
3. Stats strip — purple BG, `75+ Years | 750+ Lawyers | 9 Offices | 50+ Rankings`
4. Practice areas — 3-col grid, sharp-cornered cards, hover left-border purple
5. Leadership — 4-col, grayscale → color on hover
6. Insights/publications — 3-col cards, category pill tag, Playfair title
7. Footer — dark purple, gold top rule, 4 columns

**Gold corner decoration on section headings:**
```css
.sectionHeading {
  position: relative;
  padding-top: 20px;
  padding-left: 20px;
}
.sectionHeading::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 24px;
  height: 24px;
  border-top: 2px solid #d0a56d;
  border-left: 2px solid #d0a56d;
}
```

**Button pattern (ALL buttons must be pill-shaped):**
```css
.btnPrimary {
  background: #621755;
  color: #fff;
  border-radius: 9999px;
  height: 48px;
  padding: 0 32px;
  font-family: 'Roboto', sans-serif;
  font-weight: 500;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  border: none;
  cursor: pointer;
}
```

**Card pattern (sharp corners, hover left-border):**
```css
.practiceCard {
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0;          /* Law firm — no rounded corners on cards */
  padding: 32px;
  transition: border-left 300ms ease, box-shadow 300ms ease;
}
.practiceCard:hover {
  border-left: 4px solid #621755;
  box-shadow: 0 8px 32px rgba(98, 23, 85, 0.12);
}
```

Do not add: star ratings, pricing tables, countdown timers, chat widgets, orange/blue/green accents.

---

### Version 5 — Claude Artifacts

Build `bw_legal_01` — a premier Indian law firm website. Next.js 14 App Router, TypeScript strict, CSS Modules, Framer Motion. Static export (`output: 'export'`).

**Color tokens in `globals.css`:**
```css
:root {
  --color-brand: #621755;      /* Deep purple — primary */
  --color-gold: #d0a56d;       /* Warm gold — decorative accent only */
  --color-text: #2b3d44;       /* Charcoal — all body text */
  --color-muted: #6b7280;      /* Secondary text */
  --color-surface: #ffffff;    /* Page background */
  --color-dark: #3d0e35;       /* Footer / dark sections */
}
```

**`src/types/index.ts`:**
```typescript
export interface PracticeArea {
  id: string
  title: string
  description: string
  icon: string  // SVG path string
  slug: string
}

export interface Leader {
  id: string
  name: string
  title: string
  image: string
  bioExcerpt: string
}

export interface Insight {
  id: string
  title: string
  category: 'Legal Update' | 'Client Alert' | 'Thought Leadership' | 'Publication'
  date: string
  image: string
  slug: string
}

export interface Office {
  city: string
  country: string
  address: string
}
```

**`src/lib/data.ts`:** Mock data — 8 practice areas (M&A, Banking & Finance, Disputes, Capital Markets, Competition Law, Tax, Real Estate, Technology), 8 leaders, 6 insights, 9 offices.

**Components to build (in order):**

`src/components/layout/StickyNav.tsx`:
- `'use client'` — `useState(scrolled)`, `useEffect` scroll listener at 200px
- CSS Module: `height: 80px` → `64px` on scroll, `background: transparent` → `rgba(98,23,85,0.95)`, `transition: all 500ms ease-in-out`
- Logo left, nav links (Practice Areas, People, Insights, About, Offices) center-right, pill CTA right

`src/components/ui/GoldCorner.tsx`:
- Wrapper `div` with `::before` pseudo-element: `border-top: 2px solid var(--color-gold); border-left: 2px solid var(--color-gold); width: 24px; height: 24px; position: absolute; top: 0; left: 0`
- Usage: `<GoldCorner><h2>Our Practices</h2></GoldCorner>`

`src/components/ui/PillButton.tsx`:
- Props: `variant: 'primary' | 'secondary' | 'ghost'`, `children`, `href?`, `onClick?`
- `border-radius: 9999px; height: 48px; padding: 0 32px; font-size: 0.875rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.1em`
- Primary: `background: var(--color-brand); color: #fff`
- Secondary: `background: transparent; border: 2px solid var(--color-brand); color: var(--color-brand)`
- Ghost: `background: transparent; border: 2px solid #fff; color: #fff`

`src/components/home/Hero.tsx`:
- Full viewport height, purple/dark-purple background
- Gold rule `height: 2px; width: 80px; background: var(--color-gold)` before H1
- H1 Playfair Display 700 `clamp(2.5rem,5vw,4rem)` white
- Two PillButtons: primary (white bg, purple text) + ghost

`src/components/home/StatsStrip.tsx`:
- Purple background, 4 stats with Framer Motion `useInView` count-up
- Gold vertical dividers between stats
- Numbers: Playfair Display 700 `3rem` white; Labels: Roboto 300 `0.875rem` uppercase white muted

`src/components/home/PracticeAreas.tsx`:
- 3-col CSS grid; `GoldCorner` on section heading
- Cards: `border: 1px solid #e5e7eb; border-radius: 0; padding: 32px`
- Hover: `border-left: 4px solid var(--color-brand); box-shadow: 0 8px 32px rgba(98,23,85,0.12)`
- Framer Motion `whileInView` stagger

`src/components/home/LeadershipGrid.tsx`:
- 4-col grid, monochrome photos (`filter: grayscale(1)`), color on hover (`grayscale(0)`)
- Formal name + title below, no stars

`src/components/home/Insights.tsx`:
- 3-col, category pill in purple, Playfair title 2-line clamp, "Read more →"

`src/components/layout/Footer.tsx`:
- `background: var(--color-dark)`, gold top border `2px solid var(--color-gold)`
- 4-column: logo/tagline | Practice Areas | Offices | Connect

**Non-negotiables:**
- `border-radius: 9999px` on all PillButtons
- `border-radius: 0` on all cards
- `--color-gold` never as text color
- No stars, pricing, timers, chat widget

---

### Version 6 — Grok

Implement `bw_legal_01`: Indian law firm website. Next.js 14 + TypeScript + CSS Modules + Framer Motion. Static export.

**Tokens (`globals.css`):** `--color-brand: #621755`, `--color-gold: #d0a56d`, `--color-text: #2b3d44`, `--color-muted: #6b7280`, `--color-surface: #fff`, `--color-dark: #3d0e35`

**Architecture:**
```
src/
  types/index.ts          ← PracticeArea, Leader, Insight, Office interfaces
  lib/data.ts             ← mock data arrays
  app/layout.tsx          ← Playfair_Display + Roboto from next/font/google
  app/page.tsx            ← section composition
  app/globals.css         ← tokens + reset
  components/
    layout/StickyNav.tsx  ← scroll-aware, CSS Module
    layout/Footer.tsx
    ui/GoldCorner.tsx     ← ::before L-bracket in gold
    ui/PillButton.tsx     ← border-radius: 9999px, 3 variants
    home/Hero.tsx
    home/StatsStrip.tsx   ← Framer Motion count-up
    home/PracticeAreas.tsx
    home/LeadershipGrid.tsx ← grayscale CSS filter
    home/Insights.tsx
```

**Scroll nav implementation:**
```typescript
'use client'
const [scrolled, setScrolled] = useState(false)
useEffect(() => {
  const handler = () => setScrolled(window.scrollY > 200)
  window.addEventListener('scroll', handler, { passive: true })
  return () => window.removeEventListener('scroll', handler)
}, [])
```
CSS: `.nav { transition: background 500ms ease-in-out, height 300ms ease }` `.scrolled { background: rgba(98,23,85,0.95); height: 64px; }` (default height 80px, transparent)

**Card CSS (no border-radius):**
```css
.card { border: 1px solid #e5e7eb; border-radius: 0; padding: 32px; transition: border-left 300ms, box-shadow 300ms; }
.card:hover { border-left: 4px solid var(--color-brand); box-shadow: 0 8px 32px rgba(98,23,85,0.12); }
```

**Photo grayscale:**
```css
.photo { filter: grayscale(1); transition: filter 400ms ease; }
.photo:hover { filter: grayscale(0); }
```

**Stat counter (Framer Motion):**
```tsx
const { scrollYProgress } = useScroll()
// Use useInView + animate from 0 to value over 1200ms
```

Enforce: pill buttons, sharp cards, gold decorative-only, no stars/pricing/timers.

---

### Version 7 — Gemini

Design and implement a prestigious Indian law firm website for Cyril Amarchand Mangaldas.

**Visual identity:**
- Deep purple `#621755` commands authority — used for navigation, CTAs, section fills
- Warm gold `#d0a56d` signals heritage and premium quality — used only as a decorative accent (L-bracket corner borders, dividers, top footer line). Never as text.
- Playfair Display serif for all headings — communicates institutional gravitas
- Roboto 300 for body — clean, modern, readable
- Pill-shaped buttons (`border-radius: 9999px`) — the brand's distinctive CTA form despite the formal context
- Sharp-cornered cards (`border-radius: 0`) — geometric precision appropriate for legal work

**Page structure:**
```
Fixed StickyNav
  → transparent → rgba(98,23,85,0.95) on 200px scroll
  → pill "Contact Us" CTA
Hero
  → full vh, purple BG, left-aligned
  → gold line + Playfair H1 + subtitle + 2 pill CTAs
StatsStrip
  → purple BG, 4 credentials, count-up on enter
PracticeAreas
  → 3-col grid, GoldCorner heading decoration
  → cards: sharp, hover left-border purple + shadow
LeadershipGrid
  → grayscale default, color on hover
  → 4 columns, formal attribution only
Insights
  → 3-col, category pill, serif title
Footer
  → dark purple #3d0e35, gold top rule
```

**The GoldCorner decoration (brand signature):**
Every major section heading has a gold L-bracket in the top-left corner of its wrapper. This is a `::before` pseudo-element with `border-top: 2px solid #d0a56d` and `border-left: 2px solid #d0a56d`, `24×24px`. It signals "premium, curated, institutional."

**Accessibility:** White on `#621755` = 9.6:1 ✓. Gold on white = 2.7:1 — fails AA, so gold is never used as text. Focus ring in gold on all interactive elements.

**Do not include:** rounded card corners, gold text, star ratings, pricing, countdown urgency, casual chat widgets, bright accent colors.

---

### Version 8 — Cursor

**Project:** `bw_legal_01` — Indian law firm website (Cyril Amarchand Mangaldas reference)
**Stack:** Next.js 14 App Router + TypeScript + CSS Modules + Framer Motion
**Export:** Static (`output: 'export'`)

**CLAUDE.md for this build:**
```
Color tokens (globals.css):
  --color-brand: #621755   ← Purple — CTAs, nav, headers
  --color-gold: #d0a56d    ← Gold — decorative only (never text)
  --color-text: #2b3d44    ← Charcoal body text
  --color-muted: #6b7280
  --color-surface: #fff
  --color-dark: #3d0e35    ← Footer background

Fonts: Playfair Display (400, 700) + Roboto (300, 400, 500) via next/font/google

Card rule: border-radius: 0 on ALL cards
Button rule: border-radius: 9999px on ALL buttons
Gold rule: --color-gold is NEVER used as text color
Nav rule: transparent at top → rgba(98,23,85,0.95) at scroll > 200px
Photo rule: grayscale(1) default → grayscale(0) on hover for leadership portraits
```

**Types (`src/types/index.ts`):**
- `PracticeArea`: id, title, description, icon, slug
- `Leader`: id, name, title, image, bioExcerpt
- `Insight`: id, title, category (union of 4 types), date, image, slug
- `Office`: city, country, address

**Build sequence:**
1. `globals.css` — 6 tokens + reset
2. `layout.tsx` — both fonts loaded
3. `GoldCorner.tsx` — reusable L-bracket component
4. `PillButton.tsx` — 3 variants (primary/secondary/ghost)
5. `StickyNav.tsx` — scroll listener, CSS transition
6. `Hero.tsx` — full vh, purple BG, gold rule, two CTAs
7. `StatsStrip.tsx` — 4 stats, count-up, gold dividers
8. `PracticeAreas.tsx` — 3-col grid, sharp cards, hover state
9. `LeadershipGrid.tsx` — grayscale filter, 4-col
10. `Insights.tsx` — 3-col, category pill, serif title
11. `Footer.tsx` — dark purple, gold top rule, 4-col
12. `page.tsx` — compose all sections
13. Mock data in `lib/data.ts` — 8 practices, 8 leaders, 6 insights, 9 offices

**Gate:** `tsc --noEmit` clean, `npm run build` succeeds, no hex in CSS module files, pill buttons confirmed, sharp card corners confirmed, no gold text anywhere.
```
