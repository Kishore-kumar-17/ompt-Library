---
prompt_id: lp_saas_01
sub_category: Landing Pages
sub_type: SaaS landing page
title: Precision Dark — Engineering-First SaaS
reference_patterns: premium_saas_conventions, minimal_premium_aesthetic
inspiration: linear.app
quality_score:
status: draft
notes:
---

## Base Prompt

### Section 1 — Role

You are a senior product designer with 12+ years of experience building interface-first SaaS products for software development teams. You have a strong point of view on dark-mode precision design, information density, and keyboard-first product thinking. You have built multiple tools in the project management and developer productivity space where speed and clarity are the primary design values — not decoration.

---

### Section 2 — Application Overview

This is a project management and issue tracking platform built for software engineering teams at high-growth startups and mid-size tech companies. The user is a software engineer, product manager, or engineering lead who has been burned by slow, bloated tools and wants something that feels as fast and precise as their code editor. The primary action is to start a free trial — the page must earn that action by demonstrating speed, depth, and quality of craft before asking for anything.

---

### Section 3 — Brand Voice & Mood

The feeling is quiet confidence — the kind that does not need to shout. This is a tool built by people who care deeply about craft, and the site should feel like proof of that. Not a startup trying to look premium. Actually premium.

It is not bold, not warm, not playful, not corporate. It does not have motivational language. It does not have stock photography. It does not use exclamation marks. The copy is short, precise, and slightly austere — written for people who are tired of marketing speak.

Brand voice: direct, minimal, engineer-adjacent. Headlines are declarative statements, not questions or hype. The vibe word: precise.

---

### Section 4 — Core Features & Functionality

1. Issue tracking — create, assign, prioritise, and track individual issues with status workflows, labels, and priority levels
2. Cycle planning — time-boxed work periods with automatic rollover of incomplete issues
3. Project and initiative view — group issues into projects, group projects into initiatives for roadmap-level visibility
4. AI-powered triage — automatically categorise, prioritise, and route incoming requests without manual intervention
5. Insights and analytics — real-time burndown, velocity, and throughput metrics for any team or project
6. Customer requests intake — capture user feedback and link it directly to issues being built
7. Mobile app — full issue management from mobile with offline support

---

### Section 5 — Design Specifications

**Visual style:** Dark, precise, minimal. Interface-first — the product screenshots do the visual work. Zero decorative elements. Every pixel is intentional.

**Color mode:** Dark only.

**Color palette:**
- Background: `#08090A` (near-black — not pure black, has warmth)
- Surface / card: `#141517` (one step up from background)
- Border / divider: `rgba(255, 255, 255, 0.06)` (barely visible, not decorative)
- Primary text: `#E4E5E9` (warm off-white — not pure white)
- Secondary text: `rgba(255, 255, 255, 0.48)` (dimmed, used for metadata and labels)
- Tertiary text: `rgba(255, 255, 255, 0.28)` (near-invisible, used for placeholders)
- Accent: `#5E6AD2` (muted purple — confident, not electric)
- Accent hover: `#6E7AE2` (slightly lighter on hover)
- Destructive: `#E85D4A` (used only for errors, never decoration)
- Success: `#4AB87A` (used only for status, never decoration)

**Total colors: 9 values, 5 functional categories. No additional colors.**

**Typography:** Inter Variable throughout.
- Display / hero heading: `clamp(40px, 5vw, 64px)`, weight 500, letter-spacing `-0.03em`, line-height 1.1
- Section heading (H2): `clamp(28px, 3.5vw, 40px)`, weight 500, letter-spacing `-0.02em`, line-height 1.15
- Sub-heading (H3): `20px`, weight 500, letter-spacing `-0.01em`, line-height 1.3
- Body text: `16px`, weight 400, letter-spacing `0`, line-height 1.6
- Small / metadata: `14px`, weight 400, letter-spacing `0`, line-height 1.5
- Micro / label: `12px`, weight 500, letter-spacing `0.02em`, line-height 1.4
- Max line length body text: 68 characters

**Spacing:** 8pt base unit.
- Section vertical spacing: `128px` desktop, `80px` mobile
- Component internal padding: `24px` standard, `16px` compact
- Gap between major elements: `32px`

**Border radius:**
- Cards and containers: `12px`
- Buttons: `8px`
- Chips / badges: `6px`
- Inputs: `8px`

**Responsive:** Mobile-first. Breakpoints: `640px`, `768px`, `1024px`, `1280px`. Grid: 12-column, `1280px` max-width, `24px` gutters.

**Accessibility:** WCAG AA minimum. All text on `#08090A` must pass 4.5:1 contrast. Focus rings: `2px solid #5E6AD2` with `2px` offset. Full keyboard navigation.

**Motion:**
- Fade-in on scroll: `opacity 0 → 1`, `400ms ease-out`
- Hover transitions: `150ms ease`
- Staggered grid entrance: `2800–3200ms` total, staggered per cell
- Forbidden: parallax, autoplay video, continuous loops, bounce easing
- All animations respect `prefers-reduced-motion: reduce`

---

### Section 6 — Structure

**Architecture:** Single-page marketing site. Separate pages exist for Features, Pricing, Changelog, Customers — this prompt covers the homepage only.

**Sections top to bottom:**

1. **Navigation bar** — sticky, dark, logo left, nav links center (Product, Resources, Customers, Pricing, Changelog, Contact), "Log in" text link + "Get started" filled button right. `60px` height. `1px` bottom border `rgba(255,255,255,0.06)`. No hamburger on desktop.

2. **Hero** — centered, full-width. Declarative headline max 8 words. Supporting subhead max 16 words. Two CTAs: "Get started" (accent fill) + "Talk to sales" (ghost). Social proof stat below CTAs: "25,000+ teams" in tertiary text. Full-width product screenshot at `90%` container width below, `12px` radius, subtle shadow. No carousel. One image only.

3. **Logo trust bar** — "Trusted by" label + 6–8 company wordmarks at `rgba(255,255,255,0.35)`. Monochrome only. Horizontally scrolling on mobile.

4. **Feature section 1** — text left, product visual right. H2 headline + 2-line subtext. `128px` vertical padding.

5. **Feature section 2** — text right, product visual left. Same spec, reversed layout.

6. **Bento card grid** — 3-column, 6 cards. Each card: `#141517` background, `12px` radius, `1px` border, `24px` padding. Icon + H3 + 2-line description.

7. **Pricing preview** — plan names, prices, one differentiator per tier. Link to full pricing page. Not a full comparison table.

8. **Final CTA section** — dark, full-width. 2-line headline. Same two buttons as hero. No background image.

9. **Footer** — 5 columns: Product, Features, Company, Resources, Legal. Secondary text links. `1px` top border. Copyright bottom. No social icons.

---

### Section 7 — Technical Specifications

- **Framework:** Next.js 14 App Router, React 18, TypeScript strict mode
- **Styling:** Tailwind CSS v3 with CSS variables for all color tokens in `globals.css`
- **Components:** Radix UI primitives for interactive elements. Custom components for all visual sections.
- **Animation:** Framer Motion for scroll-triggered fades. Native CSS transitions for hover states.
- **Icons:** Lucide — `size={16}` `strokeWidth={1.5}` only
- **Images:** Next.js `<Image>` with `priority` on hero. WebP format. No stock photography.
- **State:** None required for marketing site
- **Performance target:** Lighthouse 95+ all metrics, Core Web Vitals green

---

### Section 8 — Implementation Steps

Build in this priority order:

1. Navigation + Hero — first impression, must be pixel-perfect before anything else
2. Logo trust bar — high trust impact, low effort
3. Feature sections 1 and 2 — primary "what it does" content, most visitors leave before scrolling past this
4. Bento grid — secondary features, high visual impact
5. Pricing preview — needed for evaluation-stage visitors
6. Final CTA + Footer — closing surface
7. Testimonials / social proof expansions — lowest conversion impact, add last

**Cut order if scope shrinks:** pricing preview first, then testimonials. Never cut hero or first two feature sections.

---

### Section 9 — User Experience

The visitor is a developer or engineering lead. They arrive skeptical — they have seen too many project management tools that promise speed and deliver sluggishness. They are not excited. They are evaluating.

Within the first 5 seconds they need one answer: does this feel different? The hero must deliver that answer visually — through the precision of the typography, the darkness of the background, and the quality of the product screenshot. If it looks like every other SaaS site, they leave.

If the hero passes, they scroll to understand what it actually does. The feature sections answer this. They scan headlines and look at screenshots — they do not read body copy. Every feature section headline must be a complete, scannable statement.

By the third scroll, a converted visitor is thinking about their team. The bento grid answers "will this work for us?"

The final CTA must feel inevitable, not pushy. They have already decided by the time they reach it.

Friction to remove: no email required to see the product, no video autoplay, no chat widget on first load, no cookie banner covering the hero.

---

### Section 10 — Constraints

- **No generic dark theme** — near-black `#08090A` (not pure `#000000`), Inter weight 500, barely-visible `rgba(255,255,255,0.06)` borders. If it looks like a Bootstrap dark theme, start over.
- **No gradients** — zero. The only exception: one subtle radial glow at `rgba(94,106,210,0.08)` maximum opacity, used once behind the hero headline if needed.
- **No stock photography** — product screenshots only. If unavailable, use UI wireframe placeholders.
- **No oversized buttons** — `40px` height desktop, `36px` mobile. Not `56px` pill buttons.
- **No feature carousels** — static screenshots or tab-switching only. No auto-advancing.
- **No corporate copy** — never write "Empower your team to," "Streamline your workflow," or "Unlock the potential of." Headlines are declarative product statements.
- **No color additions** — the 9 palette values are complete. If a new color is being introduced, reject it.
- **No padding poverty** — sections need `128px` vertical spacing. Do not compress to fit more content.
- **No colored logos** — all customer logos monochrome at `rgba(255,255,255,0.35)`.
- **No visible grid lines** — borders at `rgba(255,255,255,0.06)` are structural, not decorative. Never increase opacity.

---

## Platform Versions

### Claude Artifacts

Build a dark-mode SaaS landing page for an issue tracking and project management platform targeting software engineering teams. Render it as a live React + Tailwind artifact.

**Designer persona:** Senior product designer, precision-first, interface-led, no decoration. Every pixel earns its place.

**Visitor mindset:** Engineering lead who has been burned by bloated tools. Evaluates quality within 5 seconds. Goal: "Get started" click.

**Complete design system to apply:**
```
Background:      #08090A  (near-black, not pure black)
Card surface:    #141517
Borders:         rgba(255,255,255,0.06)
Primary text:    #E4E5E9  (off-white, not pure white)
Secondary text:  rgba(255,255,255,0.48)
Tertiary text:   rgba(255,255,255,0.28)
Accent:          #5E6AD2  (muted purple)
Accent hover:    #6E7AE2
Font:            Inter Variable
```

**Typography rules (non-negotiable):**
- Hero H1: `clamp(40px,5vw,64px)` weight `500` letter-spacing `-0.03em` line-height `1.1`
- Section H2: `clamp(28px,3.5vw,40px)` weight `500` tracking `-0.02em`
- Body: `16px` weight `400` max 68 characters per line
- Labels: `12px` weight `500` tracking `0.02em`
- Weight cap: `500` maximum — no `600`, `700`, `800`

**Build sections in this order:**
1. Sticky nav — `60px` height, `border-b rgba(255,255,255,0.06)`, logo left, 5 nav links center in `rgba(255,255,255,0.48)`, "Log in" text + "Get started" `bg-[#5E6AD2] rounded-lg h-10 px-5` right
2. Hero — centred, `py-32`; declarative headline max 8 words; 2-line subhead; filled + ghost CTA; `"Trusted by 25,000+ engineering teams"` in `rgba(255,255,255,0.28)` 12px; product screenshot placeholder `90%` width `rounded-xl border border-white/5`
3. Logo bar — 7 company wordmarks in `rgba(255,255,255,0.35)` only — no colour
4. Feature section 1 — text left, screenshot right, `py-32 grid grid-cols-2 gap-16`
5. Feature section 2 — reversed
6. Bento grid — `grid grid-cols-3 gap-4`, 6 cards `bg-[#141517] rounded-xl border border-white/5 p-6`; Lucide icon + H3 + 2-line description per card
7. Pricing preview — 3 plans, names and prices only, link to full pricing page — not a full table
8. Final CTA — `py-32`, 2-line headline, same two buttons, no background graphic
9. Footer — `grid grid-cols-5`, links in `rgba(255,255,255,0.40)`, section labels `12px rgba(255,255,255,0.25)` uppercase

**Forbidden:**
- Gradients (zero — one hero radial glow `rgba(94,106,210,0.08)` maximum if used)
- Font weight above 500
- Stock photography — product UI screenshots or wireframe placeholders only
- Carousels or auto-advancing content
- Exclamation marks anywhere in copy
- `bg-black` or `text-white` — use exact hex values
- Buttons taller than `40px`

---

### ChatGPT Canvas

Generate a dark-mode SaaS landing page for an issue tracking and project management platform targeting software engineering teams. Use Canvas for iterative section editing after initial generation.

**Brand voice:** Quiet confidence. Direct. Slightly austere. Engineer-adjacent. Headlines are declarative statements — never questions, never hype. No "Empower your team." No "Streamline your workflow." No exclamation marks.

**Visual system:**
```
--bg:        #08090A   card: #141517
--border:    rgba(255,255,255,0.06)
--text:      #E4E5E9   --muted: rgba(255,255,255,0.48)
--accent:    #5E6AD2   --accent-hover: #6E7AE2
Font: Inter  Max weight: 500
```

**Section-by-section spec:**

*Navigation (sticky, 60px):* logo + centered nav links (Product / Resources / Customers / Pricing / Changelog) + "Log in" text + "Get started" `bg-[#5E6AD2] rounded-lg h-10`. Bottom border `rgba(255,255,255,0.06)`.

*Hero (py-32, centred):* H1 max 8 words, `clamp(40px,5vw,64px)` weight 500 tracking -0.03em. Subhead max 16 words, `16px rgba(255,255,255,0.48)`. Two buttons: accent fill + ghost border. Social proof: `"25,000+ teams"` in `rgba(255,255,255,0.28)`. Full-width screenshot `90%` container, `rounded-xl border border-white/5`.

*Logo bar:* `"Trusted by"` label + 7 monochrome wordmarks at `rgba(255,255,255,0.35)`. No colour. Scroll horizontally on mobile.

*Feature sections (×2, alternating):* `grid-cols-2 gap-16 py-32`. H2 + 2-line body. Screenshot placeholder with `rounded-xl border border-white/5`. Section 1 text-left/image-right; Section 2 reversed.

*Bento grid:* `grid-cols-3 gap-4`. 6 cards: `#141517 rounded-xl border-white/5 p-6`. Lucide icon (16px strokeWidth 1.5) + `16px font-medium` H3 + `14px rgba(255,255,255,0.48)` description.

*Pricing preview:* 3 columns. Plan name, price, one key differentiator. "Compare all features →" link to pricing page.

*Final CTA (py-32):* Same headline + two buttons. No background graphic or image.

*Footer (grid-cols-5):* Product / Features / Company / Resources / Legal. Link colour `rgba(255,255,255,0.40)`, hover to `rgba(255,255,255,0.70)`. No social icons.

**Accessibility:** WCAG AA on all text. Focus ring `2px solid #5E6AD2`. Keyboard nav for all interactive elements.

---

### Gemini

Build a dark-mode SaaS landing page for a project management and issue tracking platform made for software engineering teams.

**Positioning:** The visitor is a developer or engineering lead who is tired of slow, cluttered tools. The page must communicate precision, speed, and craft within 5 seconds. Primary action: free trial signup.

**Design principles:**
- Dark, controlled, interface-first — product screenshots do visual work
- No decorative elements; every component earns its place
- Quiet confidence — not minimal for minimalism's sake, but precise for craft's sake

**Complete token system:**
```
Background:   #08090A        (not #000, slight warmth)
Surface:      #141517        (cards, elevated panels)
Border:       rgba(255,255,255,0.06)   (barely visible)
Text:         #E4E5E9        (off-white, warm)
Muted text:   rgba(255,255,255,0.48)
Faint text:   rgba(255,255,255,0.28)
Accent:       #5E6AD2        (muted purple, confident)
Accent hover: #6E7AE2
```

**Page architecture (top to bottom):**

1. **Navigation** — sticky `60px` `border-b rgba(255,255,255,0.06)`. Logo left. Nav links: Product / Resources / Customers / Pricing / Changelog — `rgba(255,255,255,0.48)` default, `#E4E5E9` hover. "Log in" text link + "Get started" `bg-[#5E6AD2] rounded-lg h-10 px-5 text-sm`.

2. **Hero** — centred `py-32`. H1 `clamp(40px,5vw,64px)` weight 500 tracking -0.03em — 8 words max, declarative statement. Subhead `16px rgba(255,255,255,0.48)` — 16 words max. Two CTAs: `bg-[#5E6AD2] rounded-lg h-10` + ghost `border-white/10 h-10 rounded-lg`. Social proof: `"Trusted by 25,000+ engineering teams"` in `rgba(255,255,255,0.28)` 12px. Product screenshot `w-[90%] mx-auto rounded-xl border border-white/5`.

3. **Logo trust bar** — `"Trusted by"` label + 7–8 company wordmarks at `rgba(255,255,255,0.35)` — monochrome only.

4. **Feature section 1** — `py-32 grid grid-cols-2 gap-16`. Left: H2 `clamp(28px,3.5vw,40px)` weight 500 tracking -0.02em + 2-line body `rgba(255,255,255,0.48)`. Right: screenshot `rounded-xl border border-white/5`.

5. **Feature section 2** — same spec, layout reversed.

6. **Bento grid** — `grid grid-cols-3 gap-4`. 6 cards: `bg-[#141517] rounded-xl border border-white/5 p-6`. Lucide icon `size={16} strokeWidth={1.5} text-white/50` + H3 `16px font-medium #E4E5E9` + 2-line description `14px rgba(255,255,255,0.48)`.

7. **Pricing preview** — 3-column plan tiles. Names, prices, one differentiator each. "See all features" link. Not a full comparison table.

8. **Final CTA** — `py-32`. 2-line headline + same two buttons. No image or graphic.

9. **Footer** — `grid grid-cols-5 gap-8 border-t border-white/5 py-16`. 5 columns. No social icons.

**Animation rules:**
- Scroll reveals: `opacity 0→1 y:20→0 400ms ease-out`
- Hover transitions: `150ms ease`
- All controlled by `prefers-reduced-motion: reduce`
- No parallax, no autoplay, no continuous loops

**Forbidden:** gradients, stock photos, exclamation marks, font weight > 500, carousels, `bg-black`, buttons > 40px height.

---

### Grok

Build a precise dark SaaS landing page. No decoration. No gradients. Product-first.

**Tokens:**
```
bg: #08090A  surface: #141517  border: rgba(255,255,255,0.06)
text: #E4E5E9  muted: rgba(255,255,255,0.48)  faint: rgba(255,255,255,0.28)
accent: #5E6AD2  accent-hover: #6E7AE2
Font: Inter  weight cap: 500
```

**Sections (in order):**

Nav — sticky `60px` height `border-b rgba(255,255,255,0.06)`. Logo left. Links: Product / Resources / Customers / Pricing / Changelog — `rgba(255,255,255,0.48)`. Right: "Log in" text + "Get started" `bg-[#5E6AD2] rounded-lg h-10 px-5 text-sm font-medium`.

Hero — `py-32` centred. H1 `clamp(40px,5vw,64px)` weight 500 tracking -0.03em — declarative, max 8 words. Subhead 16px `rgba(255,255,255,0.48)`. Primary CTA `bg-[#5E6AD2] rounded-lg h-10` + ghost `border border-white/10 rounded-lg h-10`. Stat `"25,000+ teams"` in `rgba(255,255,255,0.28)` 12px. Screenshot `w-[90%] rounded-xl border border-white/5`.

Logo bar — 7 wordmarks `rgba(255,255,255,0.35)` monochrome only.

Feature ×2 — `py-32 grid grid-cols-2 gap-16`. H2 + 2-line subtext + screenshot. Alternate left/right.

Bento — `grid grid-cols-3 gap-4`. 6 cards `bg-[#141517] rounded-xl border border-white/5 p-6`. Lucide icon 16px strokeWidth 1.5 + H3 16px + 14px description.

Pricing — 3 columns, plan name + price + one differentiator. Link to full pricing.

CTA — `py-32` same headline + buttons.

Footer — `grid-cols-5 border-t border-white/5`. 5 columns. `rgba(255,255,255,0.40)` links.

**Hard rules:** no gradients · no font weight > 500 · no carousels · no stock photos · no `!` in copy · buttons exactly `h-10` (40px) · WCAG AA contrast throughout.

---

### v0 by Vercel

Create a Next.js 14 App Router marketing site for a SaaS issue tracking and project management platform targeting software engineering teams. Use shadcn/ui primitives, Tailwind CSS, and Radix UI. Zero hex in JSX — all from CSS custom properties.

**globals.css:**
```css
:root {
  --bg-primary: #08090A; --bg-surface: #141517;
  --border: rgba(255,255,255,0.06);
  --text-primary: #E4E5E9; --text-secondary: rgba(255,255,255,0.48);
  --text-tertiary: rgba(255,255,255,0.28);
  --accent: #5E6AD2; --accent-hover: #6E7AE2;
}
body { background: var(--bg-primary); color: var(--text-primary); }
```

**Component specs:**

`<Navigation />` — sticky, `border-b border-[--border]`, height `60px`. Logo left in `text-[--text-primary]`. shadcn NavigationMenu centre with links at `text-[--text-secondary] hover:text-[--text-primary]`. Right: "Log in" `text-[--text-secondary]` + "Get started" `bg-[--accent] hover:bg-[--accent-hover] text-white rounded-lg h-10 px-5 text-sm font-medium transition-colors duration-150`.

`<Hero />` — `py-32 text-center`. H1 `text-[clamp(40px,5vw,64px)] font-medium tracking-[-0.03em] leading-[1.1] text-[--text-primary]` max 8 words. Subhead `text-base text-[--text-secondary] max-w-[520px] mx-auto`. Buttons row. Social proof `text-xs text-[--text-tertiary]`. Screenshot `<Image priority src="..." alt="..." fill className="object-cover" />` in wrapper `w-[90%] mx-auto aspect-video rounded-xl border border-[--border]`.

`<LogoBar />` — `flex gap-8 items-center justify-center`. All SVG logos `fill-white opacity-35`. Label `text-xs text-[--text-tertiary] mr-4`.

`<FeatureSection reversed?: boolean />` — `grid grid-cols-2 gap-16 py-32`. H2 `text-[clamp(28px,3.5vw,40px)] font-medium tracking-[-0.02em] text-[--text-primary]`. Body `text-base text-[--text-secondary] leading-relaxed max-w-[480px]`. Image `rounded-xl border border-[--border]`. `reversed` flips column order.

`<BentoGrid />` — `grid grid-cols-3 gap-4`. Cards `bg-[--bg-surface] rounded-xl border border-[--border] p-6`. Lucide `size={16} strokeWidth={1.5} className="text-[--text-secondary]"`. H3 `text-base font-medium text-[--text-primary]`. Description `text-sm text-[--text-secondary] mt-1 leading-relaxed`.

`<PricingPreview />` — `grid grid-cols-3 gap-4`. Each tile `bg-[--bg-surface] rounded-xl border border-[--border] p-6`. Plan name `text-sm font-medium text-[--text-secondary] uppercase tracking-wider`. Price `text-3xl font-medium text-[--text-primary]`. One differentiator line. "All plans →" link `text-[--accent] text-sm`.

`<CTASection />` — `py-32 text-center`. Headline + subtext + two buttons. No background graphic or image.

`<Footer />` — `grid grid-cols-5 gap-8 border-t border-[--border] py-16`. Labels `text-xs font-medium text-[--text-tertiary] uppercase tracking-widest mb-4`. Links `text-sm text-[--text-secondary] hover:text-[--text-primary] transition-colors`. Copyright `text-xs text-[--text-tertiary]`.

**Global rules:** Framer Motion `whileInView={{ opacity: 1, y: 0 }} initial={{ opacity: 0, y: 20 }} transition={{ duration: 0.4, ease: 'easeOut' }}` on all sections. Gate with `const reduced = useReducedMotion(); if (reduced) skip`. All `whileInView` use `viewport={{ once: true }}`.

---

### Lovable

Build the **Precision Dark** SaaS landing page as a series of precise component prompts. Apply every design token exactly — no approximations.

**Design system for all components:**
```
bg: #08090A  surface: #141517  border: rgba(255,255,255,0.06)
text: #E4E5E9  muted: rgba(255,255,255,0.48)  faint: rgba(255,255,255,0.28)
accent: #5E6AD2  accent-hover: #6E7AE2
Font: Inter Variable  max-weight: 500  (never 600, 700, 800)
```

---

**Build the Navigation:**
Sticky. `60px` height. Background `#08090A`. `1px` bottom border `rgba(255,255,255,0.06)`. Logo text left in `#E4E5E9` `14px font-medium`. Centre nav links: Product · Resources · Customers · Pricing · Changelog — `rgba(255,255,255,0.48)` default, `#E4E5E9` on hover, `150ms` transition. Right side: "Log in" text link `rgba(255,255,255,0.48)`, then "Get started" button: `background #5E6AD2`, `border-radius 8px`, `height 40px`, `padding 0 20px`, `font-size 14px`, `font-weight 500`, white text. Mobile: hide centre links behind hamburger, keep both right CTAs visible.

---

**Build the Hero section:**
Centred layout. Max-width `1280px`, `24px` side padding. Vertical padding `128px` desktop / `80px` mobile. Optional hero glow: `radial-gradient` behind headline at `rgba(94,106,210,0.08)` maximum — or omit entirely. Headline: declarative statement max 8 words, `clamp(40px,5vw,64px)` Inter weight `500` tracking `-0.03em` line-height `1.1` colour `#E4E5E9`. Subhead: max 16 words, `16px` weight `400` colour `rgba(255,255,255,0.48)` max-width `520px` centred. Two CTAs in a row with `12px` gap: "Get started" filled `#5E6AD2 rounded-lg h-[40px]` + "Talk to sales" ghost `border: 1px solid rgba(255,255,255,0.12) h-[40px] rounded-lg text-[rgba(255,255,255,0.70)]`. Below CTAs: social proof text "Trusted by 25,000+ engineering teams" `12px rgba(255,255,255,0.28)`. Below that: full-width product screenshot placeholder `90%` container width, `border-radius 12px`, `border: 1px solid rgba(255,255,255,0.06)`.

---

**Build the Logo trust bar:**
`"Trusted by"` label `12px rgba(255,255,255,0.28)` left. 7–8 company wordmark SVGs in `rgba(255,255,255,0.35)` — monochrome only, no colour. `flex items-center gap-8`. Horizontal scroll on mobile `640px`.

---

**Build the two Feature sections:**
Two sections with alternating layout. Each: `128px` vertical padding. Two-column grid `64px` gap. Section 1: text left / screenshot placeholder right. Section 2: screenshot placeholder left / text right. Text side: H2 `clamp(28px,3.5vw,40px)` weight `500` tracking `-0.02em` colour `#E4E5E9`. Below H2: 2 lines of body `16px rgba(255,255,255,0.48)` max `68` characters. Screenshot placeholder side: dark rectangle `rounded-xl border border-[rgba(255,255,255,0.06)]` — no stock image. Mobile: stack vertically, text always above image.

---

**Build the Bento card grid:**
`3-column grid` `16px` gap. 6 cards. Each card: `#141517` background, `border-radius 12px`, `1px solid rgba(255,255,255,0.06)` border, `24px` padding. Card content (top to bottom): Lucide icon `16px` `strokeWidth 1.5` `rgba(255,255,255,0.48)` colour — 12px margin-bottom. H3 `16px` weight `500` `#E4E5E9` — 4px margin-bottom. Description: 2 lines `14px rgba(255,255,255,0.48)` `line-height 1.5`. Static cards — no hover animation. Mobile: 1 column. Tablet: 2 columns.

---

**Build the Final CTA and Footer:**
Final CTA: `py-32` centred. 2-line headline `clamp(28px,3.5vw,40px)` weight `500`. Same two CTA buttons as hero. No background image. No graphic. Footer: `5-column grid` `32px` gap. `1px` top border `rgba(255,255,255,0.06)`. `64px` top padding. Column labels `11px` weight `500` `rgba(255,255,255,0.25)` uppercase `tracking-[0.08em]` margin-bottom `16px`. Links `14px rgba(255,255,255,0.40)` hover `rgba(255,255,255,0.70)` `150ms transition`. Copyright `12px rgba(255,255,255,0.25)` bottom. No social icons.

---

### Bolt.new

Build a Vite + React + TypeScript + Tailwind + Framer Motion marketing site for a dark SaaS project management platform.

**Tailwind config tokens:**
```ts
// tailwind.config.ts
colors: {
  'bg-primary': '#08090A', 'bg-surface': '#141517',
  'text-primary': '#E4E5E9',
  'accent': '#5E6AD2', 'accent-hover': '#6E7AE2',
},
borderColor: { DEFAULT: 'rgba(255,255,255,0.06)' },
```

**File structure:**
```
src/
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── LogoBar.tsx
│   ├── FeatureSection.tsx        ← accepts reversed?: boolean
│   ├── BentoGrid.tsx
│   ├── PricingPreview.tsx
│   ├── CTASection.tsx
│   └── Footer.tsx
├── lib/
│   └── motion.ts                 ← fadeInUp variant + useScrollAnimation hook
└── App.tsx
```

**`lib/motion.ts`:**
```ts
import { useReducedMotion, Variants } from 'framer-motion';
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};
export function useScrollAnimation() {
  const reduced = useReducedMotion();
  return {
    initial: reduced ? 'visible' : 'hidden',
    whileInView: 'visible' as const,
    viewport: { once: true },
    variants: fadeInUp,
  };
}
```

**Component contracts:**
- `<Navbar />` — sticky, `border-b border-white/5`, `h-[60px]`, logo left, nav links centre `text-white/50 hover:text-white`, "Log in" `text-white/50` + "Get started" `bg-accent rounded-lg h-10 px-5 text-sm font-medium`
- `<Hero />` — `py-32 text-center`; H1 `text-[clamp(40px,5vw,64px)] font-medium tracking-[-0.03em]`; `<Image priority>` for screenshot
- `<FeatureSection reversed={false|true} headline body image />` — `py-32 grid grid-cols-2 gap-16`; `reversed` flips order
- `<BentoGrid items={BentoItem[]} />` — `grid-cols-3 gap-4`; 6 cards `bg-bg-surface rounded-xl border border-white/5 p-6`
- All Lucide icons: `size={16} strokeWidth={1.5} className="text-white/50"`

**Motion rules:** All sections use `useScrollAnimation()` hook. Gate in `FeatureSection` and `BentoGrid`. No gradients, no carousels, no inline style colour values.

---

### Cursor

In `src/app/page.tsx`, implement the Precision Dark SaaS landing page. Next.js 14 App Router + TypeScript + Tailwind + Framer Motion.

**File structure:**
```
src/
├── app/
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── sections/
│       ├── Hero.tsx
│       ├── LogoBar.tsx
│       ├── FeatureSection.tsx
│       ├── BentoGrid.tsx
│       ├── PricingPreview.tsx
│       └── CTASection.tsx
└── lib/
    └── motion.ts
```

**`globals.css` (complete token block):**
```css
:root {
  --bg-primary: #08090A;
  --bg-surface: #141517;
  --border: rgba(255,255,255,0.06);
  --text-primary: #E4E5E9;
  --text-secondary: rgba(255,255,255,0.48);
  --text-tertiary: rgba(255,255,255,0.28);
  --accent: #5E6AD2;
  --accent-hover: #6E7AE2;
}
body { background: var(--bg-primary); font-family: 'Inter Variable', Inter, sans-serif; }
```

**`lib/motion.ts`:**
```ts
import { useReducedMotion, Variants } from 'framer-motion';
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};
export function useScrollAnimation() {
  const reduced = useReducedMotion();
  return { initial: reduced ? 'visible' : 'hidden',
    whileInView: 'visible' as const, viewport: { once: true }, variants: fadeInUp };
}
```

**Full `Hero.tsx` implementation:**
```tsx
'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useScrollAnimation } from '@/lib/motion';

export function Hero() {
  const anim = useScrollAnimation();
  return (
    <section className="py-32 text-center px-6">
      <motion.div {...anim} className="max-w-[1280px] mx-auto">
        <h1 className="text-[clamp(40px,5vw,64px)] font-medium tracking-[-0.03em]
                       leading-[1.1] text-[var(--text-primary)] mb-5 max-w-[720px] mx-auto">
          Software moves fast. Track it precisely.
        </h1>
        <p className="text-base text-[var(--text-secondary)] max-w-[520px] mx-auto mb-8 leading-relaxed">
          Issue tracking and project planning built for engineering teams who
          care about speed, clarity, and nothing else.
        </p>
        <div className="flex items-center justify-center gap-3 mb-4">
          <a href="/signup"
            className="bg-[var(--accent)] hover:bg-[var(--accent-hover)] text-white
                       rounded-lg h-10 px-5 text-sm font-medium transition-colors duration-150
                       focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]">
            Get started
          </a>
          <a href="/demo"
            className="border border-white/10 text-white/70 hover:border-white/20
                       hover:text-white rounded-lg h-10 px-5 text-sm transition-colors duration-150">
            Talk to sales
          </a>
        </div>
        <p className="text-xs text-[var(--text-tertiary)]">Trusted by 25,000+ engineering teams</p>
        <div className="mt-16 w-[90%] mx-auto rounded-xl border border-[var(--border)]
                        overflow-hidden shadow-[0_-1px_40px_rgba(0,0,0,0.6)]">
          <Image src="/screenshot-hero.webp" alt="Product interface" width={1280} height={720}
            priority className="w-full h-auto" />
        </div>
      </motion.div>
    </section>
  );
}
```

**`FeatureSection` props + implementation:**
```tsx
interface FeatureSectionProps {
  headline: string; body: string;
  image: string; imageAlt: string;
  reversed?: boolean;
}
export function FeatureSection({ headline, body, image, imageAlt, reversed = false }: FeatureSectionProps) {
  const anim = useScrollAnimation();
  return (
    <section className="py-32 px-6">
      <motion.div {...anim}
        className={`max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center
          ${reversed ? 'lg:[&>*:first-child]:order-2' : ''}`}>
        <div className="space-y-5">
          <h2 className="text-[clamp(28px,3.5vw,40px)] font-medium tracking-[-0.02em]
                         text-[var(--text-primary)] leading-[1.15]">{headline}</h2>
          <p className="text-base text-[var(--text-secondary)] leading-relaxed max-w-[440px]">{body}</p>
        </div>
        <div className="rounded-xl border border-[var(--border)] overflow-hidden bg-[var(--bg-surface)]">
          <Image src={image} alt={imageAlt} width={640} height={400} className="w-full h-auto" />
        </div>
      </motion.div>
    </section>
  );
}
```

**`BentoGrid` items type:**
```tsx
import { LucideIcon } from 'lucide-react';
interface BentoItem { icon: LucideIcon; title: string; description: string; }
```

**Absolute rules:**
- `bg-[var(--bg-primary)]` not `bg-black` — never `#000000`
- `text-[var(--text-primary)]` not `text-white`
- `font-medium` (weight 500) max — never `font-semibold`, `font-bold`
- `py-32` desktop section padding, `py-20` mobile
- Lucide icons: `size={16} strokeWidth={1.5} className="text-[var(--text-secondary)]"`
- All `whileInView` → `viewport={{ once: true }}`
- `useReducedMotion()` via `useScrollAnimation()` hook on every animated element
- One hero glow maximum: `radial-gradient` at `rgba(94,106,210,0.08)` — or zero

**QA grep commands:**
```bash
# No font-weight > 500 (no semibold/bold)
grep -rn 'font-semibold\|font-bold\|font-extrabold\|font-black' src/components/ src/app/

# No bg-black or text-white (must use CSS variables)
grep -rn 'bg-black\|text-white\b' src/components/ src/app/ --include='*.tsx'

# Confirm all whileInView have once:true
grep -rn 'whileInView' src/ --include='*.tsx' | grep -v 'once.*true\|once: true'

# No hardcoded hex in component files
grep -rn '#[0-9A-Fa-f]\{3,6\}' src/components/ --include='*.tsx'

# Verify reduced motion guard exists
grep -rn 'useReducedMotion\|useScrollAnimation' src/components/ --include='*.tsx'

# No buttons taller than 40px
grep -rn 'h-\[5[0-9]px\]\|h-\[6[0-9]px\]\|h-12\|h-14\|h-16' src/components/ --include='*.tsx'
```

---

## Review Notes

- Claude Artifacts:
- ChatGPT Canvas:
- Gemini:
- Grok:
- v0 by Vercel:
- Lovable:
- Bolt.new:
- Cursor:
- Overall score: /5
- What to fix:
