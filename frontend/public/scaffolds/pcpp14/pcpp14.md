---
prompt_id: pcpp14
sub_category: Portfolio
sub_type: Premium Business Journalism & Newsletter
title: AnalyticalKen — High-Trust Business Reporting & Visual Stories
reference_patterns: nutgraph_summary_blocks, interactive_visual_stories, analytical_data_visualization
inspiration: the-ken.com
quality_score:
status: draft
notes: Focused on premium, subscription-only business journalism with a strong emphasis on data-viz and readability.
---

## Base Prompt

### Section 1 — Role

You are a senior product designer specializing in premium subscription-based journalism, business media platforms, and data-visualization-heavy editorial. You understand that for elite business readers, "Attention is the Scarcest Resource." You master the "Analytical UI," where the speed of insight is as important as the depth of reporting. You reject the "cluttered newsroom" look in favor of the "Ken" philosophy: bold red accents, high-contrast typography, and "Nutgraph" summaries that respect the reader's time. You design for "Intelligent Authority," ensuring that the path from a daily briefing to an interactive visual story is fast, exclusive, and high-value.

---

### Section 2 — Application Overview

This is a premium digital publication and portfolio for a leading business journalism firm. The audience consists of startup founders, corporate executives, and venture capitalists in India and Southeast Asia. The goal is to provide a "Single Source of Truth" for business trends, archived in a minimalist, ad-free environment that balances long-form narrative with interactive visual storytelling.

The application covers: Daily Story Feed (Homepage), Interactive "Visual Stories" (Slide-based), Premium Deep-Dives (Gated), Podcast Audio Hub, and an integrated "Gift a Story" / Corporate Membership portal.

---

### Section 3 — Brand Voice & Mood

The mood is "Analytical & Original" and "Boldly Independent." It feels like a high-speed intelligence report mixed with a boutique business journal. It is authoritative, factual, and unhurried.

Copy is incisive, deeply researched, and evidence-led. Headers are direct and analytical: "The Fintech Pivot," "Why the IPO failed," "Beyond the Hype." It avoids generic clickbait in favor of "Nutgraph" summaries and bespoke infographics.

Vibe word: Analytical.

---

### Section 4 — Core Features & Functionality

1. **"Beyond the Nutgraph" Summaries** — A signature UI component at the top of every story that provides a 3-point bulleted summary of the "why" and "so what" of the reporting.
2. **Interactive Visual Stories** — A mobile-first, slide-based narrative engine that distills complex business trends into 10-12 visual frames with high-impact data-viz.
3. **Bespoke Infographic System** — A layout engine designed to handle custom-built charts, caricatures, and data callouts that match the brand's palette.
4. **Multi-Track Subscription Hub** — A membership area that manages access to Daily Stories, Visual Stories, and Premium Podcasts under one unified "Ken" identity.
5. **"Gift a Story" Social Logic** — A referral mechanism allowing subscribers to share individual premium links with non-members, driving viral discovery in a high-trust way.

---

### Section 5 — Design Specifications

**Visual style:** Analytical Modernism. Stark whites or off-whites, bold "Ken Red" accents, and a total absence of third-party ads. Every element is designed to serve the clarity of the analysis.

**Color mode:** Primarily Light Mode (High Contrast).

**Color palette:**
- Background: `#FFFFFF` (Pure White) or `#F9F9F7` (Paper Grey)
- Text Primary: `#1A1A1B` (Deep Slate — softer than black)
- Accent (Primary): `#E31E24` (Ken Red — for logo, CTAs, and active headers)
- Infographic Blue: `#3498DB` (Peacock Blue — for secondary data lines)
- Border: `#EEEEEE` (Light Grey hair-lines)

**Typography:** Authoritative Serif + Functional Sans.
- Body Text (Serif): `19px`, weight 400, leading 1.7 (e.g., Tiempos Text or Georgia).
- Headlines (Sans): `30px`, weight 800, tracking `-0.01em` (e.g., Graphik or Inter).
- Nutgraph Labels: `12px`, bold, uppercase, Ken Red.

**Spacing:** 16px base unit. 
- Main Column: `max-width: 700px` (Reading focus).
- Section Padding: `64px` to `96px`.
- Visual Story Cards: `3:4` aspect ratio for the mobile grid.

**Border radius:** `2px` (Subtle) or `0px`. Sharp corners reflect "Fact-Based Rigor."

**Responsive:** Mobile-first focus for "The Morning Read." Visual stories use 100% of the viewport width with horizontal swiping.

**Accessibility:** WCAG AAA. High-contrast text on paper. All infographics must have accessible data tables or descriptions.

**Motion:** 
- Visual Story Transitions: Smooth `300ms` horizontal slides.
- Nutgraph Reveal: Staggered entry for bullet points.
- No "Artsy" distractions.

---

### Section 6 — Structure

**Homepage Layout:**
1. **Nav:** Sticky. Logo (Left - Red). Right: Stories, Visual Stories, Podcasts, Search, Account.
2. **The Daily Story:** Massive H1 -> Byline/Read Time -> Large Illustration (Caricature) -> "Read the Nutgraph."
3. **Latest Stream:** Vertical list of secondary reports. Title -> Publication Source -> Metadata.
4. **Visual Story Grid:** Horizontal scroll of high-impact cards with "Visual Story" badges in Red.

**Analysis Page Layout:**
- **The Nutgraph:** Centered Red-bordered box at the top with 3 bullet points.
- **Body:** Single column of serif text. Interspersed with 2-3 custom charts.
- **Audio:** Sticky floating "Listen to this story" bar for mobile users.

**Visual Story Engine:**
- Full-screen slide deck. Progress indicator at the top. Large text overlays on visual charts.

---

### Section 7 — Technical Specifications

- **Framework:** Next.js 14 App Router, React 18, TypeScript strict mode.
- **Styling:** Tailwind CSS v3 with custom "Ken" typography plugins.
- **CMS:** Sanity.io or Contentlayer (to handle structured Daily and Visual story data).
- **Search:** Algolia for high-speed reporting archive indexing.
- **State:** Zustand for managing "Reading Progress" and "Visual Story" slide indices.
- **Audio:** Mux or Vimeo for hosting premium podcast snippets.

---

### Section 8 — Implementation Steps

1. **The Grid Shell:** Setup `globals.css` with the Tiempos/Inter hierarchy and the Ken Red palette.
2. **Nutgraph Component:** Build the signature summary block with bullet-point logic and red-bordered styling.
3. **Daily Feed Engine:** Implement the chronological homepage feed with custom caricature placeholders.
4. **Visual Story Engine:** Create the interactive slide-based layout with horizontal scroll/swipe support.
5. **Subscription Gateway:** Build the high-trust paywall and "Gift a Story" referral link generator.

---

### Section 9 — User Experience

The user is a "Knowledge-Obsessed Professional." 
The UI must be "Efficient and Respectful." Don't waste their time with fluff. Give them the Nutgraph immediately so they can decide if the full read is worth their 10 minutes.
The "Aha! moment" is the Visual Story—where a complex macro-economic trend is summarized into 10 beautiful, interactive slides.

---

### Section 10 — Constraints

- **No advertisements.** Ad-free is a moral and design commitment to the reader.
- **No generic stock imagery.** Use custom illustrations, caricatures, or high-end data-viz only.
- **No pure black text.** Use Deep Slate (#1A1A1B) to maintain the premium editorial feel.
- **No intrusive pop-ups.** Use subtle "Floating Bars" for membership nudges.

---

## Platform Versions

### Category A — v0

Build an "Analytical Business" publication portfolio inspired by The Ken. 
Style: White/Paper background (#F9F9F7), Ken Red (#E31E24) accents, 0px border-radius, and authoritative Serif headings.
Include:
1. "Beyond the Nutgraph" summary blocks at the top of long-form articles.
2. Mobile-first "Visual Stories" grid using 3:4 aspect ratio cards.
3. Information-dense Homepage Feed highlighting a primary "Daily Story" with a custom caricature.
Use high-end data-viz and a "Private Business Journal" UI approach. No ads allowed.

---

### Category B — Cursor

In `src/app/`, implement a "Premium Business Reporting & Visual Engine" (The Ken style).
Stack: Next.js 14, Tailwind, Sanity CMS, Algolia, Zustand.
Visual Rules: 
- Primary Color: `#E31E24` (Ken Red)
- Text Color: `#1A1A1B` (Slate)
- Background: `#F9F9F7` (Paper)
- Radius: `rounded-none` (0px)
- Font: Elegant Serif (Tiempos) + Sans (Graphik).

Implement:
1. `components/editorial/Nutgraph.tsx` - A red-bordered summary component for story intros.
2. `app/visual-stories/page.tsx` - A horizontal slide engine for interactive data-driven narratives.
3. `app/page.tsx` - A high-trust homepage feed with scannable headers and caricatures.
4. `components/membership/GiftLink.tsx` - A utility that generates unique, sharable story links for non-subscribers.

Focus on "Analytical Authority" and fast-loading information density. No modern blurs. No ads.

---

### Lovable

Build a premium business journalism platform — "Analytical Business Journal" — inspired by The Ken. Paper grey (#F9F9F7) canvas, deep slate (#1A1A1B) text, Ken Red (#E31E24) accent, 0px border-radius.

Must include:
- Daily story homepage: sticky red logo nav → massive H1 `30px` weight 800 → byline + read time → custom illustration `<img alt>` → "Read the Nutgraph" anchor link. Secondary feed below: title + byline + metadata.
- Nutgraph block: centered `border: 2px solid #E31E24` card. 3 bullet points: `12px` bold uppercase `#E31E24` label → body text `19px` Tiempos/Georgia serif. `aria-label="Story summary"`.
- Visual Stories grid: `3:4` aspect ratio cards with `#E31E24` "Visual Story" badge. Horizontal scroll on mobile. `aria-label` per card.
- Article page `/stories/[slug]`: Nutgraph at top → `max-width: 700px` serif prose → custom `<figure>` chart blocks → "Gift this story" `<button>` generating unique sharable URL.
- Paywall: excerpt always visible → `linear-gradient(transparent, var(--bg))` fade overlay → white card "This story is for subscribers" + red Subscribe CTA. NEVER `display: none` on content.

No ads, no generic stock. `prefers-reduced-motion`: nutgraph stagger instant, all visible immediately.

---

### ChatGPT Canvas

Let's build a premium business journalism platform — "Analytical Modernism" — inspired by The Ken.

**Design system:**
- Background: `#F9F9F7` paper grey; Text: `#1A1A1B`; Accent: `#E31E24` Ken Red; Data Blue: `#3498DB`; Border: `#EEEEEE`
- Border-radius: `0px` everywhere
- Font: Tiempos/Georgia serif — body `19px` weight 400 leading 1.7; Graphik/Inter headlines `30px` weight 800 `tracking: -0.01em`; Nutgraph labels `12px` bold uppercase `#E31E24`

**Build iteratively:**
1. **Homepage** — sticky red nav + DailyStoryHero (H1 + illustration + Nutgraph link) + latest stories list + Visual Stories horizontal grid (`3:4` cards with red badge)
2. **Story page** `/stories/[slug]` — `NutgraphBlock` at top → `max-width: 700px` serif prose → custom `<figure>` chart blocks → Gift Story link → `PaywallGradient` for subscriber-only content
3. **Visual Story engine** `/visual-stories/[slug]` — full-screen horizontal slide deck, progress indicator, `aria-label` per slide, keyboard navigation
4. **Paywall** — `linear-gradient(transparent, var(--bg))` gradient fade + subscription card. NEVER `display: none`.

Motion: nutgraph bullets stagger `opacity 0→1 200ms` per item. Slide: `300ms` ease horizontal. `prefers-reduced-motion`: all instant.

---

### Bolt

Scaffold a premium business journalism platform — analytic, red-accented, information-dense.

Stack: Next.js 14 App Router + TypeScript + Tailwind CSS + Zustand

```css
:root {
  --bg: #F9F9F7; --ink: #1A1A1B;
  --red: #E31E24; --blue: #3498DB;
  --border: #EEEEEE;
}
*, *::before, *::after { border-radius: 0; }
body { background: var(--bg); color: var(--ink); }
```

Components:
- `NutgraphBlock` — `border: 2px solid var(--red)` card. 3 bullet points: `12px` bold uppercase `var(--red)` label + `19px` body. `aria-label="Story summary"`. Stagger `opacity 0→1 200ms` per bullet. `useReducedMotion()` guard.
- `DailyStoryHero` — H1 `30px` 800 `tracking: -0.01em` + byline + custom illustration `<img alt>` + Nutgraph anchor link.
- `VisualStorySlider` — `position: relative; overflow: hidden`. Horizontal slides, touch/swipe + keyboard arrow support. Progress indicator top. `aria-label` per slide.
- `PaywallGradient` — `position: absolute; bottom: 0; background: linear-gradient(transparent, var(--bg))`. White card CTA below. NEVER `display: none` on locked content.
- `GiftStoryLink` — `<button aria-label="Gift this story">`. Generates unique sharable URL on click.

---

### Claude Artifacts

Build a self-contained premium business journalism platform. Next.js 14 App Router + TypeScript + CSS Modules.

```typescript
// src/types/index.ts
export type StoryTier = 'public' | 'subscriber'
export type ContentType = 'article' | 'visual_story' | 'podcast'

export interface Story {
  slug: string; title: string; deck: string
  date: string       // ISO 8601
  tier: StoryTier; type: ContentType
  excerpt: string    // always visible free preview
  nutgraph: [string, string, string]  // exactly 3 bullet points
  illustrationSrc: string; illustrationAlt: string
  published: boolean
}

export interface VisualSlide {
  imageSrc: string; imageAlt: string; caption: string
}

export interface VisualStory extends Story {
  slides: VisualSlide[]
}
```

Design rules:
- `border-radius: 0` everywhere — no exceptions
- `NutgraphBlock`: `border: 2px solid var(--red)` — bullet labels `12px` bold uppercase `var(--red)` — `aria-label="Story summary"` — `useReducedMotion()` guard on stagger
- `PaywallGradient`: `linear-gradient(transparent, var(--bg))` — NEVER `display: none` or `visibility: hidden` on locked content
- `VisualStorySlider`: `aria-label` per slide, keyboard arrow navigation, touch swipe via pointer events
- `generateStaticParams()` from story slugs. `notFound()` for unknown slugs.

---

### Grok

Implement AnalyticalKen — premium business journalism platform.

1. `src/app/globals.css` — `--bg: #F9F9F7; --ink: #1A1A1B; --red: #E31E24; --blue: #3498DB; --border: #EEEEEE` — `*, *::before, *::after { border-radius: 0; }` — `body { background: var(--bg); color: var(--ink); }`
2. `src/types/index.ts` — `StoryTier` union (public|subscriber) — `ContentType` union (article|visual_story|podcast) — `Story` interface (slug, title, deck, date, tier, type, excerpt, nutgraph: `[string, string, string]`, illustrationSrc, illustrationAlt, published) — `VisualStory` extends Story with `slides: VisualSlide[]`
3. `src/lib/stories.ts` — 15 mock `Story` objects (mix of tiers/types) — 5 `VisualStory` objects with 10 slides each
4. `src/app/page.tsx` — sticky `#E31E24` nav + DailyStoryHero (H1 + illustration + Nutgraph link) + stories list + VisualStories horizontal grid (`3:4` cards, red badge)
5. `src/app/stories/[slug]/page.tsx` — `generateStaticParams()` — `notFound()` — `NutgraphBlock` top → `max-width: 700px` prose → custom chart `<figure>` blocks → `PaywallGradient` for subscriber tier — NEVER `display: none` — `GiftStoryLink`
6. `src/app/visual-stories/[slug]/page.tsx` — full-screen `VisualStorySlider` — `aria-label` per slide — keyboard + touch navigation — progress indicator
7. `src/components/editorial/NutgraphBlock.tsx` — `border: 2px solid var(--red)` — 3-bullet stagger `opacity 0→1 200ms` — `aria-label="Story summary"` — `useReducedMotion()` guard
8. QA: `grep -r "display.*none\|visibility.*hidden" src/components --include="*.tsx"` → no paywall-related results — `npx tsc --noEmit` → 0 errors — `npm run build` passes

---

### Gemini

Design and implement a premium business journalism platform — "Analytical Modernism" — for a leading business media firm.

**Design layer:** `#F9F9F7` paper background, `#1A1A1B` deep slate text, `#E31E24` Ken Red for logo/CTAs/nutgraph labels, `#3498DB` peacock blue for data charts. Typography: Tiempos/Georgia serif — body `19px` weight 400 leading 1.7; Graphik/Inter headlines `30px` weight 800 `tracking: -0.01em`; nutgraph labels `12px` bold uppercase `#E31E24`. `border-radius: 0` everywhere.

**Data layer:** `StoryTier` union (public|subscriber). `ContentType` union (article|visual_story|podcast). `Story` interface (slug, title, deck, date, tier, type, excerpt, nutgraph tuple `[string,string,string]`, illustrationSrc). `VisualStory` extends Story with slides. `generateStaticParams()` for `[slug]`.

**Component layer:** `DailyStoryHero` (H1 + custom illustration + Nutgraph anchor). `NutgraphBlock` (`border: 2px solid var(--red)`, 3-bullet stagger, `aria-label="Story summary"`). `VisualStorySlider` (horizontal slides, progress indicator, keyboard + touch navigation). `PaywallGradient` (gradient fade, never display:none, subscribe CTA). `GiftStoryLink` (unique URL generation button).

**Motion layer:** Nutgraph bullets: stagger `opacity 0→1 200ms` per item. Slide transition: `300ms` ease horizontal. `prefers-reduced-motion`: all instant; `useReducedMotion()` guard on Framer Motion.
