---
prompt_id: pcpp13
sub_category: Portfolio
sub_type: Premium Newsletter & Business Analysis
title: AnalystAusterity — High-Value Synthesis & Subscription Engines
reference_patterns: analytic_diagram_signatures, personalized_delivery_ecosystem, austere_typography_layout
inspiration: stratechery.com
quality_score:
status: draft
notes: Focused on high-value business analysis with complex multi-site/podcast subscription logic.
---

## Base Prompt

### Section 1 — Role

You are a senior product designer specializing in premium subscription media, business analysis platforms, and high-trust intellectual brand identity. You understand that for elite analysts, "Content is the Interface." You master the "Austere UI," where visual flair is intentionally suppressed to signal the weight and independence of the analysis. You reject "flashy" dashboard trends in favor of the "Stratechery" philosophy: typography-first single columns, hand-drawn strategic diagrams, and frictionless delivery across Email, RSS, and Podcasts. You design for "Analytic Authority," ensuring that the path from a public essay to a premium "Plus" bundle is fast, professional, and high-conversion.

---

### Section 2 — Application Overview

This is a premium digital publication and portfolio for a leading business analyst. The audience consists of tech executives, investors, and product managers. The goal is to provide a "Knowledge Base" for technology strategy, archived in a minimalist environment that handles complex personalized delivery (RSS/Podcast) for premium members.

The application covers: Analysis Feed (Chronological), Premium "Daily Updates" (Gated), Personalized Member Dashboard (Delivery Preferences), Thematic Concept Index (Aggregation Theory, etc.), and Multi-Site Subscription Bundling (e.g., Stratechery Plus).

---

### Section 3 — Brand Voice & Mood

The mood is "Austere & Rigorous" and "Quietly Revolutionary." It feels like a high-end private intelligence report. It is focused, unadorned, and intellectually dense.

Copy is precise, logical, and authoritative. Headers are clear and descriptive: "Aggregation Theory," "The End of the Beginning," "Company Earnings Analysis." It avoids marketing jargon in favor of "Strategic Frameworks" and "Value Chains."

Vibe word: Analytic.

---

### Section 4 — Core Features & Functionality

1. **"Thompson Diagram" Engine** — A signature visual style using simple, hand-drawn strategic charts (often blue/black) to simplify complex market dynamics.
2. **Personalized Delivery System (Passport)** — A member engine that generates unique RSS/Podcast feeds for each user to prevent sharing and track usage.
3. **Thematic Taxonomy (The Concepts)** — A robust archive system that organizes a decade of work by core strategic frameworks (e.g., Aggregation Theory, Smiling Curve).
4. **Stratechery Plus Bundling** — A subscription layer that handles multiple content streams (Daily Updates, Sharp Tech Podcast, Dithering) under a single billing identity.
5. **Frictionless Onboarding Overlay** — A "Memberful-style" checkout that allows users to subscribe without leaving the current reading context.

---

### Section 5 — Design Specifications

**Visual style:** Analytic Austerity. Single-column text, generous white space, and a total absence of generic icons or distracting sidebar widgets. 

**Color mode:** Primarily Light Mode (High Contrast).

**Color palette:**
- Background: `#FFFFFF` (Pure White)
- Text Primary: `#1A1A1A` (Near Black / Ink)
- Accent (Primary): `#004B87` (Stratechery Blue — for links and diagram highlights)
- Muted: `#757575` (Muted Slate for metadata)
- Border: `#E5E7EB` (Slate-200 — hair-line separators)

**Typography:** Authoritative Serif + Modern Sans.
- Body Text (Serif): `18px` to `20px`, weight 400, leading 1.6 (e.g., Equity, Georgia, or Miller).
- Headlines (Sans): `28px`, weight 700, tight tracking (e.g., Inter or Public Sans).
- UI Labels: `11px`, bold, uppercase, tracking `0.1em`.

**Spacing:** 16px base unit. 
- Column Width: `max-width: 680px` (Optimized for long-form sustain).
- Section Padding: `80px` to `120px` (Letting the logic breathe).
- Paragraph Spacing: `28px`.

**Border radius:** `0px` or `2px` (Subtle). Sharp corners reflect "Logical Precision."

**Responsive:** Desktop-optimized for detailed diagram viewing. Mobile view maintains the large typography and uses responsive SVG for diagrams.

**Accessibility:** WCAG AAA. High-contrast text on white. All diagrams must have detailed "hidden" text descriptions for screen readers.

**Motion:** 
- Quick Cuts: Instant page loads are mandatory.
- Slide-over: For the subscription overlay.
- No "Artsy" fades or parallax.

---

### Section 6 — Structure

**Homepage Layout:**
1. **Nav:** Minimalist. Logo (Left). Right: Archive, Concepts, About, Subscribe (Blue Button).
2. **Lead Analysis:** Large Headline -> Date -> The " Thompson Diagram" (SVG) -> Substantial Excerpt.
3. **The Feed:** Reverse-chronological list of Articles and Daily Update "teasers."
4. **Subscription Strip:** "Join 100k+ tech leaders. Stratechery is one-to-one."

**Analysis Page Layout:**
- **Header:** Date -> Category -> H1 Title.
- **Body:** Single column of text. Interspersed with 2-3 Thompson Diagrams.
- **Footer:** Member login prompt or "Daily Update" subscription CTA.

**Concepts Index:**
- Grid of cards. Each card: [Concept Name] -> [Brief Definition] -> [Link to Foundational Article].

---

### Section 7 — Technical Specifications

- **Framework:** Next.js 14 App Router, React 18, TypeScript strict mode.
- **CMS:** Sanity.io or WordPress (as a headless source) for long-form publishing.
- **Personalization:** Custom "Passport" logic for unique RSS/Podcast feed generation (Node.js/Supabase Edge Functions).
- **Payments:** Stripe (Customer Portal for self-service billing).
- **Search:** Algolia for hierarchical strategic archive searching.

---

### Section 8 — Implementation Steps

1. **The Typography Engine:** Setup `globals.css` with the Equity/Inter palette. Focus on perfect leading and 680px column resets.
2. **Analysis Feed:** Build the chronological homepage with the "Thomson Diagram" SVG support.
3. **Passport Logic:** Implement the secure member engine for generating personalized feed URLs.
4. **Concept CMS:** Set up the hierarchical taxonomy for strategic frameworks and company tagging.
5. **Subscription Overlay:** Build the frictionless checkout modal with Stripe integration.

---

### Section 9 — User Experience

The user is a "Strategic Decision Maker." 
The UI must be "Transparent and High-Value." Don't waste their time with "Artsy" transitions. The faster they get to the insight, the more valuable the platform is.
The "Aha! moment" is the Diagram—where a complex 10,000-word market shift is reduced to 3 circles and 2 arrows.

---

### Section 10 — Constraints

- **No ads or trackers.** Privacy and independence are core values.
- **No pure white/pure black diagrams.** Use the signature Stratechery Blue (#004B87).
- **No infinite scroll.** Every article has a clear beginning and end.
- **No "Read More" click-walls.** If a post is public, show the whole thing. If it's private, show a 300-word excerpt.

---

## Platform Versions

### Category A — v0

Build an "Analytic Austerity" subscription portfolio inspired by Stratechery. 
Style: Pure White background (#FFFFFF), Near Black typography (#1A1A1A), 0px border-radius, and Stratechery Blue (#004B87) accents.
Include:
1. Single-column Reading Layout with a centered 680px column and "Thompson Diagram" SVG placeholders.
2. "The Concepts" Index for browsing strategic frameworks like "Aggregation Theory."
3. Frictionless Subscription Overlay for upgrading to "Plus" tiers.
Use high-end serif typography for body text and a "Private Intel" UI approach. No ads or blurs.

---

### Category B — Cursor

In `src/app/`, implement a "Strategic Analysis & Subscription Hub" (Stratechery style).
Stack: Next.js 14, Tailwind, Sanity CMS, Algolia, Stripe.
Visual Rules: 
- Primary Color: `#1A1A1A` (Ink)
- Accent Color: `#004B87` (Blue)
- Background: `#FFFFFF` (Paper)
- Radius: `rounded-none` (0px)
- Font: Elegant Serif (Equity / Miller).

Implement:
1. `app/page.tsx` - A reverse-chronological stream of long-form strategy essays with hand-drawn SVG diagram blocks.
2. `app/[slug]/page.tsx` - A deep-focus reading page with a 680px centered container and "Daily Update" gated excerpts.
3. `components/membership/PassportEngine.tsx` - A member dashboard for generating personalized RSS and Podcast URLs.
4. `app/concepts/page.tsx` - A structured knowledge-base index for strategic frameworks.

Focus on "Intellectual Authority" and fast-loading text hierarchy. No modern "Web 3.0" fluff. No ads.

---

### Lovable

Build a premium business analysis subscription hub — "Analytic Austerity" — for a leading technology analyst. White (#FFFFFF) canvas, near-black (#1A1A1A) text, Stratechery Blue (#004B87) accent, 0px border-radius.

Must include:
- Analysis feed: single `max-width: 680px` centered column. Reverse-chronological `<article>` list. Each: date `11px` uppercase → H2 `28px` weight 700 → 3-sentence excerpt. Locked articles: excerpt + `#004B87` "Upgrade to read" `<a href>` link (no inline payment).
- "Thompson Diagram" blocks: `<figure><svg aria-labelledby="diagram-title-{id}"><title id="diagram-title-{id}">…</title></svg><figcaption>` text description. SVG stroke color ONLY `#004B87`. Simple geometric shapes — no raster images.
- Concepts index `/concepts`: card grid. Each: concept name `18px` bold → 1-sentence definition → `#004B87` "Read foundational article" link.
- Subscription overlay: annual/monthly plan toggle. `<a href={stripePortalUrl} rel="noopener noreferrer">` upgrade button. No inline payment form.
- Member dashboard hint: "Your personalized RSS feed" and "Your Podcast feed" links (display-only scaffolding).

No ads, no tracking pixels, no distracting sidebars. `prefers-reduced-motion`: overlay appears instantly, no slide animation.

---

### ChatGPT Canvas

Let's build a premium business analysis subscription hub — "Analytic Austerity" — inspired by Stratechery.

**Design system:**
- Background: `#FFFFFF`; Text: `#1A1A1A`; Accent: `#004B87` Stratechery Blue; Muted: `#757575`; Border: `#E5E7EB`
- Border-radius: `0px` everywhere
- Font: Equity/Georgia serif — body `18-20px` weight 400 leading 1.6; Inter headlines `28px` weight 700; UI labels `11px` bold uppercase `letter-spacing: 0.1em`

**Build iteratively:**
1. **Analysis feed** `/` — `max-width: 680px` column, reverse-chronological article list. Lead entry: large H1 → SVG Thompson Diagram → substantial excerpt. Secondary feed: date + title + teaser.
2. **Analysis page** `/[slug]` — single-column prose `max-width: 680px`, interspersed `<figure><svg aria-labelledby>` Thompson Diagrams. Paywall: 300-word excerpt + upgrade `<a href>` link for locked posts.
3. **Concepts index** `/concepts` — card grid: concept name + definition + foundational article link in `#004B87`.
4. **Subscription overlay** — annual/monthly toggle + external Stripe portal `<a>` link. No inline payment form.

Motion: overlay slide `translateY(-20px)→0 250ms ease`. `prefers-reduced-motion`: overlay instant, no animations.

---

### Bolt

Scaffold a premium business analysis subscription hub — austere, typography-first, diagram-driven.

Stack: Next.js 14 App Router + TypeScript + Tailwind CSS

```css
:root {
  --bg: #FFFFFF; --ink: #1A1A1A;
  --blue: #004B87; --muted: #757575;
  --border: #E5E7EB;
}
*, *::before, *::after { border-radius: 0; }
body { background: var(--bg); color: var(--ink); max-width: 680px; margin: 0 auto; }
```

Components:
- `AnalysisFeed` — `<article>` stack. Each: `11px` uppercase date → H2 `28px` 700 → excerpt. Locked: excerpt + `#004B87` "Upgrade" `<a href>` link (no inline payment).
- `ThompsonDiagram` — `<figure>`. `<svg aria-labelledby="diagram-title-{id}"><title id="diagram-title-{id}">…</title></svg>`. Stroke ONLY `var(--blue)`. Simple circles/arrows. `<figcaption>` text description.
- `ConceptCard` — concept name `18px` bold → 1-sentence definition → foundational article link in `var(--blue)`.
- `SubscriptionOverlay` — `position: fixed; inset: 0`. Annual/monthly toggle. `<a href={stripePortalUrl} rel="noopener noreferrer">`. No Stripe Elements inline.

---

### Claude Artifacts

Build a self-contained business analysis subscription hub. Next.js 14 App Router + TypeScript + CSS Modules.

```typescript
// src/types/index.ts
export type ArticleTier = 'public' | 'daily_update' | 'plus'

export interface Analysis {
  slug: string; title: string
  date: string       // ISO 8601
  tier: ArticleTier; excerpt: string  // 300-word preview — always shown
  diagramDescription?: string  // accessible text description for SVG diagrams
  published: boolean
}

export interface Concept {
  id: string; name: string; definition: string
  foundationalSlug: string  // links to an Analysis slug
}
```

Design rules:
- `border-radius: 0` everywhere — no exceptions
- `body { max-width: 680px; margin: 0 auto }` — the global reading column
- `ThompsonDiagram`: `<svg aria-labelledby>` with inline `<title>` — stroke color ONLY `var(--blue)` (#004B87) — `<figcaption>` text description always required
- `SubscriptionOverlay`: `<a href={stripePortalUrl} rel="noopener noreferrer">` — NO Stripe Elements or inline payment form
- `generateStaticParams()` from analysis slugs. `notFound()` for unknown slugs.

---

### Grok

Implement AnalystAusterity — premium business analysis subscription hub.

1. `src/app/globals.css` — `--bg: #FFFFFF; --ink: #1A1A1A; --blue: #004B87; --muted: #757575; --border: #E5E7EB` — `*, *::before, *::after { border-radius: 0; }` — `body { background: var(--bg); color: var(--ink); }`
2. `src/types/index.ts` — `ArticleTier` union (public|daily_update|plus) — `Analysis` interface (slug, title, date, tier, excerpt, optional diagramDescription, published) — `Concept` interface (id, name, definition, foundationalSlug)
3. `src/lib/analyses.ts` — 20 mock `Analysis` objects (mix of tiers) — `src/lib/concepts.ts` — 12 mock `Concept` objects
4. `src/app/page.tsx` — lead `Analysis` (large H1 + ThompsonDiagram + excerpt) → secondary feed list (date + title + teaser) → "Join 100k+ tech leaders" subscription strip
5. `src/app/[slug]/page.tsx` — `generateStaticParams()` — `notFound()` — `max-width: 680px` prose — interspersed `ThompsonDiagram` SVG blocks — paywall CTA (`<a href>` upgrade link) for non-public tiers — NEVER `display: none`
6. `src/app/concepts/page.tsx` — card grid — concept name `18px` bold + definition + foundational article link in `var(--blue)`
7. `src/components/membership/SubscriptionOverlay.tsx` — `position: fixed; inset: 0` — annual/monthly plan toggle — `<a href={stripePortalUrl} rel="noopener noreferrer">` — NO Stripe Elements
8. QA: `grep -r "StripeElements\|loadStripe\|CardElement" src --include="*.tsx"` → empty — `npx tsc --noEmit` → 0 errors — `npm run build` passes

---

### Gemini

Design and implement a premium business analysis subscription hub — "Analytic Austerity" — for a leading technology analyst.

**Design layer:** `#FFFFFF` background, `#1A1A1A` text, `#004B87` Stratechery Blue for links/diagram strokes/CTAs, `#757575` muted, `#E5E7EB` borders. Typography: Equity/Georgia serif — body `18-20px` weight 400 leading 1.6; Inter headlines `28px` weight 700; UI labels `11px` bold uppercase. `border-radius: 0` everywhere. `body { max-width: 680px }` global reading column.

**Data layer:** `ArticleTier` union (public|daily_update|plus). `Analysis` interface (slug, title, date, tier, excerpt, optional diagramDescription). `Concept` interface (id, name, definition, foundationalSlug). `generateStaticParams()` for `[slug]`.

**Component layer:** `AnalysisFeed` (680px column, article stack, locked state with upgrade link). `ThompsonDiagram` (`<svg aria-labelledby>`, `#004B87` strokes ONLY, `<figcaption>` description required). `ConceptCard` (name + definition + `#004B87` foundational link). `SubscriptionOverlay` (fixed inset, annual/monthly toggle, external Stripe `<a>` link — NO inline payment).

**Motion layer:** Subscription overlay: `translateY(-20px)→0 250ms ease`. `prefers-reduced-motion`: overlay instant; no entrance animations; `useReducedMotion()` guard on any Framer Motion used.
