# 05 — Epics and Stories
## Work Breakdown · lp_saas_platform_01
### Precision Dark SaaS Landing Page

---

## Epic 1 — Navigation

### Story 1.1 — Sticky Navigation Bar
**As a** visitor,
**I want** the primary CTA to remain accessible as I scroll,
**so that** I can convert at any point on the page without scrolling back to the top.

**Acceptance criteria:**
- [ ] Nav: `position: sticky; top: 0; z-index: 50` — verified in DevTools computed styles
- [ ] Scroll shadow: `box-shadow` applied when `scrollY > 0` via `useEffect` scroll listener; removed when `scrollY === 0`
- [ ] Scroll shadow value: `0 1px 0 0 var(--border)` — matches the design token; no hardcoded colour
- [ ] "Get started" button: `background: var(--accent); height: 36px; padding: 0 16px; border-radius: 8px`
- [ ] "Log in" link: `color: var(--text-secondary)`; no button style
- [ ] All nav links keyboard-focusable; focus ring: `outline: 2px solid var(--accent); outline-offset: 2px`
- [ ] `grep -r "font-weight: 7" src/components/layout/Nav` → zero results (max weight 500 on this scaffold)
- [ ] `grep -r "#[0-9A-Fa-f]" src/components/layout/Nav.tsx` → zero results (all colours via CSS tokens)

---

## Epic 2 — Hero

### Story 2.1 — Hero Section
**As a** visitor,
**I want** an impactful hero that communicates the product's value in under 5 seconds,
**so that** I immediately understand whether the product is for me.

**Acceptance criteria:**
- [ ] Headline: max 8 words; `font-weight: 500`; `font-size: clamp(40px, 5vw, 64px)`; `letter-spacing: -0.03em`
- [ ] Subtext: max 16 words; `font-size: 18px`; `color: var(--text-secondary)`; `max-width: 480px`
- [ ] Two CTAs: "Get started" (filled `var(--accent)`, `height: 40px`) and "Talk to sales" (ghost: `border: 1px solid var(--border)`, `height: 40px`)
- [ ] Social proof line: `"25,000+ teams"` in `var(--text-tertiary)` below CTAs — verbatim; do not rephrase
- [ ] Product screenshot: `width: 90%` of container; `border-radius: 12px`; `border: 1px solid var(--border)`
- [ ] Hero CTA visible without scroll at `768px` viewport height — tested by screenshot with `viewport-height: 768`
- [ ] Radial glow: `background: radial-gradient(ellipse at 50% 0%, rgba(94,106,210,0.08), transparent 70%)` — one instance only; no other `gradient` keyword on the page
- [ ] `grep -r "gradient" src` → exactly one result (the hero glow in `globals.css` or hero component)
- [ ] `grep -r "font-weight: 7" src` → zero results across entire codebase

---

## Epic 3 — Logo Trust Bar

### Story 3.1 — Company Wordmark Strip
**As a** visitor,
**I want** to see recognisable company names that use the product,
**so that** I trust the product before reading any feature claims.

**Acceptance criteria:**
- [ ] "Trusted by" label: `color: var(--text-tertiary); font-size: 13px; text-transform: uppercase; letter-spacing: 0.08em`
- [ ] 6–8 company wordmarks rendered as SVG or `<img>` with `alt="{CompanyName}"`; all tinted `rgba(255,255,255,0.35)` via CSS `filter: brightness(0) invert(1); opacity: 0.35`
- [ ] No coloured logos; `grep -r "filter" src/components/sections/LogoBar` → only the opacity filter result
- [ ] Horizontal scroll on mobile (`< 640px`): `overflow-x: auto; -webkit-overflow-scrolling: touch`; no clipping
- [ ] No carousel, no auto-advance, no JavaScript interaction — static HTML only
- [ ] TypeScript: `Logo = { name: string; svgUrl: string }`; logos defined in a `LOGOS` const, not inline JSX strings

---

## Epic 4 — Feature Sections

### Story 4.1 — Feature Section 1 (Text Left / Visual Right)
**As a** visitor,
**I want** to understand the product's primary capability from a headline and screenshot,
**so that** I can evaluate fit without reading marketing copy.

**Acceptance criteria:**
- [ ] Layout: two-column at `≥1024px` (text left, visual right); single-column stacked below `1024px`
- [ ] `padding-top: 128px; padding-bottom: 128px` on the section — exactly 128px; no other value
- [ ] H2 headline: declarative statement (complete sentence, not a fragment); max 8 words; `font-weight: 500`
- [ ] Subtext: max 2 lines at 1280px container width; `color: var(--text-secondary)`
- [ ] Visual: product UI placeholder or screenshot; `border-radius: 12px`; `border: 1px solid var(--border)`
- [ ] `grep -r "border-radius: 1[3-9]\|border-radius: [2-9][0-9]" src` → zero results (max 12px across all components)

### Story 4.2 — Feature Section 2 (Text Right / Visual Left)
**As a** visitor,
**I want** to learn about a secondary product capability in an alternating layout,
**so that** the page feels varied and each feature gets equal visual weight.

**Acceptance criteria:**
- [ ] Layout mirrors Feature Section 1: visual left, text right at `≥1024px`
- [ ] Separate H2 with a distinct declarative statement — not a variation of Section 1's headline
- [ ] `padding-top: 128px; padding-bottom: 128px` — same value as Section 1; consistent vertical rhythm
- [ ] Both feature sections share a `<FeatureSection>` component; `direction: 'ltr' | 'rtl'` prop controls layout flip
- [ ] TypeScript: `FeatureSectionProps = { headline: string; subtext: string; visualSrc: string; direction: 'ltr' | 'rtl' }`
- [ ] No background colour on either feature section — `background: transparent`; page background shows through

---

## Epic 5 — Bento Grid

### Story 5.1 — Feature Bento Cards
**As a** visitor,
**I want** to see the product's depth in a scannable card grid,
**so that** I discover secondary capabilities without reading long copy.

**Acceptance criteria:**
- [ ] Grid: 3 columns desktop, 2 columns tablet (`< 768px`), 1 column mobile (`< 640px`) — CSS Grid, not Flexbox
- [ ] 6 cards total; each card: `background: var(--surface); border-radius: 12px; border: 1px solid var(--border); padding: 24px`
- [ ] Card content: Lucide icon `size={16} strokeWidth={1.5}` + H3 title + max 2-line description
- [ ] Stagger animation on scroll entry: Framer Motion `whileInView`; each card `delay: index * 0.07s`
- [ ] Under `prefers-reduced-motion`: `@media (prefers-reduced-motion: reduce) { .bento-card { animation: none !important; opacity: 1 !important; transform: none !important; } }` in `globals.css`
- [ ] TypeScript: `BentoCard = { icon: LucideIcon; title: string; description: string }`; cards defined in a `BENTO_CARDS` const

---

## Epic 6 — Pricing Preview

### Story 6.1 — Three-Tier Pricing Overview
**As a** visitor evaluating the product,
**I want** to see pricing tiers on the homepage,
**so that** I can assess affordability without navigating to a separate page.

**Acceptance criteria:**
- [ ] Three plan cards: Free, Pro, Business (or equivalent); each shows: plan name, price, one differentiator sentence
- [ ] Highlighted plan (middle tier): `border: 1px solid var(--accent)` — not a coloured background
- [ ] Non-highlighted plans: `border: 1px solid var(--border)`
- [ ] "See full pricing" link below cards: routes to `/pricing`; plain text link, not a button
- [ ] This is NOT a full feature comparison table — max one line of differentiation per plan
- [ ] TypeScript: `PricingTier = { name: string; price: string; differentiator: string; isHighlighted: boolean }`

---

## Epic 7 — Final CTA and Footer

### Story 7.1 — Final CTA Section
**As a** visitor who has read the whole page,
**I want** a closing call-to-action that mirrors the hero,
**so that** converting at the bottom is as easy as it would have been at the top.

**Acceptance criteria:**
- [ ] Section: `background: transparent` — no background image, gradient, or pattern
- [ ] Headline: 2 lines maximum; same weight/size rules as hero (`font-weight: 500; font-size: clamp(32px, 4vw, 56px)`)
- [ ] Same CTA pair as hero: "Get started" (filled) + "Talk to sales" (ghost); same heights and border-radius
- [ ] No new copy elements — only headline + CTAs; no testimonial, no pricing, no feature mention
- [ ] `grep -r "gradient" src/components/sections/FinalCTA` → zero results

### Story 7.2 — Five-Column Footer
**As a** visitor,
**I want** structured footer navigation across all product areas,
**so that** I can find any relevant page without using search.

**Acceptance criteria:**
- [ ] Footer: 5 columns — "Product", "Features", "Company", "Resources", "Legal"; `border-top: 1px solid var(--border)`
- [ ] Link colour: `color: var(--text-secondary)`; hover: `color: var(--text-primary)`; transition: `color 150ms ease`
- [ ] Copyright line: `color: var(--text-tertiary); font-size: 13px` — below the columns
- [ ] Column headings: `font-weight: 500; font-size: 13px; text-transform: uppercase; letter-spacing: 0.06em`
- [ ] Mobile: 2-column stacked layout (`< 768px`); "Legal" column merges into 5th slot or stacks below
- [ ] TypeScript: `FooterColumn = { heading: string; links: { label: string; href: string }[] }`; all five columns defined in a `FOOTER_COLUMNS` const

---

## Epic 8 — Animation and QA Gates

### Story 8.1 — Reduced Motion and Accessibility
**As a** user with motion sensitivity or a screen reader,
**I want** all animations disabled when I've set my preference, and all interactive elements to be keyboard-accessible,
**so that** the site is usable regardless of my assistive technology or preferences.

**Acceptance criteria:**
- [ ] All scroll fade-ins (`whileInView`) disabled under `prefers-reduced-motion` via `globals.css` — no JS media-query detection required
- [ ] WCAG AA contrast: all body text `≥ 4.5:1` against background; all large text `≥ 3:1` — verified with axe-core
- [ ] Focus rings on all interactive elements: `outline: 2px solid var(--accent); outline-offset: 2px` — keyboard-tab through the full page confirms
- [ ] `<img>` tags have non-empty `alt`; decorative images have `alt=""`
- [ ] `tsc --noEmit` exits 0 — zero TypeScript errors
- [ ] `npm run build` exits 0 — zero build errors

### Story 8.2 — Token and Weight Compliance Gates
**As a** developer,
**I want** automated grep checks to enforce design token discipline,
**so that** no hex value or forbidden weight slips into the codebase.

**Acceptance criteria:**
- [ ] `grep -r "font-weight: 7" src` → zero results (max weight 500 across all components and CSS)
- [ ] `grep -r "#[0-9A-Fa-f]{3,6}" src --include="*.tsx" --include="*.css"` → zero results (all colours via CSS tokens)
- [ ] `grep -r "border-radius" src --include="*.module.css" --include="*.css"` → all values ≤ 12px
- [ ] `grep -r "gradient" src` → exactly one result: the hero radial glow in `globals.css` or the hero component
- [ ] Lighthouse mobile score: Performance ≥ 95, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95 — all four metrics
- [ ] Hero CTA visible at `768px` viewport height without scroll — verified by Playwright screenshot at that viewport
