# 04 — Build Plan
## Premier Indian Law Firm · bw_legal_platform_01

4-day plan. Each day ends with a demonstrable working state.

---

## Day 1 — Foundation + Shell

**Goal:** Project setup, CSS tokens, both fonts wired, StickyNav and Footer working, global layout solid.

| # | Task | Done when |
|---|------|-----------|
| 1 | `npx create-next-app@latest` — TypeScript, App Router, CSS Modules, src/ dir, no Tailwind | `npm run dev` starts |
| 2 | Install deps: `framer-motion @radix-ui/react-accordion lucide-react` | Installed |
| 3 | `src/types/index.ts` — `PracticeArea`, `Leader`, `Insight`, `InsightCategory`, `Office`, `Stat` | `tsc --noEmit` clean |
| 4 | `src/app/globals.css` — 6 CSS tokens + `--font-display` + `--font-body` + `--container` + `--section-pad` + base reset | Page body is white; no default browser spacing |
| 5 | `src/lib/data.ts` — all mock data: 8 practice areas, 8 leaders, 6 insights, 9 offices, 4 stats | Data imports compile |
| 6 | `src/app/layout.tsx` — Playfair_Display + Roboto from `next/font/google`, both as CSS variables | Both fonts load; DevTools shows Playfair + Roboto in computed styles |
| 7 | `src/components/ui/PillButton.tsx` + CSS Module — 3 variants (primary, secondary, ghost), 2 sizes | Renders; `border-radius: 9999px` confirmed in DevTools |
| 8 | `src/components/ui/GoldCorner.tsx` + CSS Module — `::before` L-bracket in gold | Gold corner visible when wrapping test text |
| 9 | `src/components/layout/StickyNav.tsx` — scroll listener, transparent → purple `rgba(98,23,85,0.95)` at 200px | Nav transparent at top; turns purple-semi-transparent on scroll |
| 10 | `src/components/layout/Footer.tsx` — dark purple bg, gold top border, 4-column layout | Footer renders with gold top border |
| 11 | `src/app/layout.tsx` — StickyNav + Footer mounted | Both appear on every page |

**Gate:** Scroll the test page 200px → nav turns semi-transparent purple. Gold top border visible on footer. PillButton renders as pill (no square corners). GoldCorner shows L-bracket.

---

## Day 2 — Hero + StatsStrip + Practice Areas

**Goal:** Above-the-fold sections complete. Authority established visually on first load.

| # | Task | Done when |
|---|------|-----------|
| 1 | `src/components/home/Hero.tsx` — full viewport height, purple gradient bg, left-aligned content | Hero fills viewport |
| 2 | Hero: gold rule (`2px × 80px`) above H1 | Gold rule visible above headline |
| 3 | Hero: H1 in Playfair Display 700 `clamp(2.5rem,5vw,4rem)` white | Confirmed in DevTools |
| 4 | Hero: subheading in Roboto 300, white | Two-line max |
| 5 | Hero: two PillButton CTAs — primary (white bg, purple text) + ghost (white border, white text) | Both render; correct colors on dark bg |
| 6 | `src/components/home/StatsStrip.tsx` — purple strip, 4 stats, gold dividers | Strip renders |
| 7 | StatsStrip: IntersectionObserver count-up animation | Count animates from 0 on first entry |
| 8 | `src/components/home/PracticeAreas.tsx` — 3-col grid | Grid renders, 8 cards |
| 9 | PracticeAreas: GoldCorner on section heading | Gold bracket visible |
| 10 | PracticeAreas: card hover — left border purple + shadow | Hover works, no border-radius on cards |
| 11 | Compose Hero + StatsStrip + PracticeAreas in `page.tsx` | All visible on homepage |

**Gate:** Above fold: hero with gold rule + Playfair H1. Scroll: stats strip with count-up animation. Practice cards hover with purple left-border, no rounded corners.

---

## Day 3 — Leadership + Insights + Animations

**Goal:** All homepage sections complete. Scroll animations working.

| # | Task | Done when |
|---|------|-----------|
| 1 | `src/components/home/LeadershipGrid.tsx` — 4-col grid, grayscale photos | Photos render in grayscale |
| 2 | LeadershipGrid: hover restores color (`filter: grayscale(0)`) | Color restores on hover |
| 3 | LeadershipGrid: GoldCorner on section heading | Gold bracket visible |
| 4 | `src/components/home/Insights.tsx` — 3-col grid, category pill, Playfair title | Insights render |
| 5 | Insights: category pill in purple, pill-shaped (`border-radius: 9999px`) | Category pill confirmed pill-shaped |
| 6 | Insights: date in muted text, formatted (e.g., "20 March 2025") | Formatted date visible |
| 7 | Framer Motion `whileInView` fade-up on: PracticeAreas, LeadershipGrid, Insights | Sections animate in on scroll |
| 8 | Stagger `0.1s` between children in animated grids | Cards enter sequentially |
| 9 | `prefers-reduced-motion` check: disable all transforms, snap opacity instantly | Verified in DevTools motion settings |
| 10 | Compose all sections in `page.tsx` | Full homepage renders |

**Gate:** Full homepage visible. Leadership photos grayscale at rest, color on hover. Insights section has category pills. Scroll animations work. Reduced-motion user sees no transforms.

---

## Day 4 — Audit + Polish

**Goal:** `tsc` clean, build passes, all design rules verified.

| # | Task | Done when |
|---|------|-----------|
| 1 | `tsc --noEmit` → fix any errors | Zero errors |
| 2 | `npm run build` | Build succeeds |
| 3 | Grep: no hex in CSS Module files | Zero results |
| 4 | DevTools: ALL pill buttons `border-radius: 9999px` | Confirmed |
| 5 | DevTools: ALL cards `border-radius: 0` | Confirmed |
| 6 | DevTools: computed color of any button label — must be `#fff` or `#621755` (never gold) | No gold text anywhere |
| 7 | DevTools: `--color-gold` used only in `::before` (GoldCorner), dividers, footer border | Confirmed decorative-only |
| 8 | Scroll nav: transparent at top, purple semi-transparent at 200px | Works on live dev server |
| 9 | Leadership grayscale-until-hover verified | Confirmed |
| 10 | StatsStrip count-up verified | Counts from 0 on entry |
| 11 | No star ratings, no pricing, no countdown timers, no chat widget | Visual inspection |
| 12 | Lighthouse ≥90/90 | Run and confirm |

**Gate checklist:**
- [ ] Pill buttons everywhere (`border-radius: 9999px`)
- [ ] Sharp cards everywhere (`border-radius: 0`)
- [ ] Gold never used as text color
- [ ] Playfair Display on all headings
- [ ] Roboto 300 on all body text
- [ ] Nav turns purple on scroll >200px
- [ ] Hero full viewport with gold rule above H1
- [ ] Stats count-up on intersection
- [ ] Leadership photos grayscale by default
- [ ] GoldCorner on all major section headings
- [ ] Footer dark purple with gold top border
- [ ] No star ratings, no pricing, no timers
- [ ] `tsc --noEmit` clean
- [ ] Lighthouse ≥90/90

---

### Cut Order

**Never cut:**
- Hero section with full-viewport purple gradient + gold rule above H1 (first impression critical)
- PracticeAreas grid with GoldCorner L-brackets (core authority content)
- LeadershipGrid with grayscale-to-colour hover effect (brand differentiator)

**Cut first if time-constrained:**
- Insights section
- Office locations list
- StatsStrip count-up animation (keep strip, remove animation)

---

### Risk Register

| Risk | Likelihood | Impact | Mitigation |
|------|-----------|--------|-----------|
| Gold used as text color on any element | High | High | `var(--color-gold)` is decorative only — L-brackets, dividers, footer border; `grep -r "color.*gold" src/components --include="*.module.css"` → decorative selectors only |
| Pill button given `border-radius: 0` or `8px` | Medium | High | All buttons must be `border-radius: 9999px`; verify with DevTools on every button variant |
| Cards given rounded corners | Medium | Medium | All cards must be `border-radius: 0` (sharp = prestige law aesthetic); `grep -r "border-radius" src/components --include="*.module.css"` |
| Scroll nav transition not triggering at 200px | Medium | Medium | `rgba(98,23,85,0.95)` applied on scroll >200px — test manually; scroll listener must attach in `useEffect` |
| Leader photos not grayscale at rest | Low | Medium | `filter: grayscale(1)` at rest, `grayscale(0)` on hover — verify computed style in DevTools |
| Playfair Display not loading on headings | Low | High | Both Playfair Display + Roboto must load from `next/font/google`; check DevTools computed font-family |
| CSS token leak (hex in .module.css) | Medium | Medium | Run `grep -r "#[0-9A-Fa-f]" src --include="*.module.css"` before every commit |
