---
prompt_id: pcpp10
sub_category: Portfolio
sub_type: Journalist Portfolio & Paid Newsletter
title: InsiderEdge — High-Contrast Tech Editorial & Subscriptions
reference_patterns: premium_paywall_architecture, information_hierarchy_feed, tech_native_typography
inspiration: platformer.news
quality_score:
status: draft
notes: Focused on high-authority tech reporting with integrated multi-tier subscription logic.
---

## Base Prompt

### Section 1 — Role

You are a senior product designer specializing in digital journalism, newsletter-first publications, and the "Creator-Led" media economy. You understand that for high-profile journalists, the website is an engine of trust and conversion. You master the "Information-First UI," where the hierarchy of a headline and the clarity of a summary are more important than visual flair. You reject "clickbait" clutter, heavy ads, and low-contrast palettes in favor of the "Insider" philosophy: stark whites, bold grotesque typography, and frictionless premium paywalls. You design for "Intellectual Authority," ensuring that the path from a breaking news alert to a paid annual subscription is fast, professional, and high-value.

---

### Section 2 — Application Overview

This is a premium digital publication and portfolio for a leading technology journalist. The audience consists of tech executives, policy makers, and silicon-valley professionals. The goal is to provide a "Single Source of Truth" for tech policy news, archived in a scannable, searchable, and multi-tiered subscription environment.

The application covers: Daily News Feed (Homepage), Premium Paywalled Articles, Archive Search Engine, Member Dashboard (Subscription Management), and Integrated Podcast/Audio blocks.

---

### Section 3 — Brand Voice & Mood

The mood is "Urgent & Professional" and "Silicon Valley Insider." It feels like a high-speed intelligence briefing for the tech elite. It is clean, authoritative, and fast-paced.

Copy is direct, witty, and deeply researched. Headers are bold and definitive: "Inside the Platform Power," "Breaking: The Policy Shift," "What the CEO didn't say." It avoids corporate fluff in favor of "hard-hitting independence."

Vibe word: Authoritative.

---

### Section 4 — Core Features & Functionality

1. **Information-Dense News Feed** — A chronological list of reporting where each entry provides a "Headline > Deck > Metadata" stack for instant scannability.
2. **Ghost-Style Premium Paywall** — A layout logic that shows a free excerpt (first 300 words) followed by a high-conversion "Locked" state and subscription CTA.
3. **Multi-Tiered Subscription Logic** — A central membership module allowing users to choose between "Free" (Weekly roundup) and "Paid" (Daily briefings + Community access).
4. **Member "Portal" Modal** — A centered, frictionless overlay for account login and payment management without leaving the current article.
5. **Integrated "Hard Fork" Podcast** — A dedicated audio section featuring minimalist player embeds that match the site's high-contrast aesthetic.

---

### Section 5 — Design Specifications

**Visual style:** Tech-Native Minimalism. Stark white backgrounds, deep black text, and a total absence of generic icons or sidebars. Every element is designed to serve the text.

**Color mode:** Primarily Light Mode (High Contrast).

**Color palette:**
- Background: `#FFFFFF` (Pure White)
- Text Primary: `#000000` (Pure Black / Deep Ink)
- Text Secondary: `#52525B` (Neutral-600 for summaries)
- Accent: `#4F46E5` (Vibrant Indigo — for "Subscribe" CTAs and links)
- Locked State: `#FACC15` (Gold — for "Paid Only" padlock icons)
- Border: `#E5E7EB` (Slate-200 — hair-line separators)

**Typography:** Bold Grotesque Sans-Serif (e.g., Inter, Public Sans, or SF Pro).
- Headline H1: `clamp(32px, 5vw, 64px)`, weight 800, tracking `-0.02em`, line-height 1.1.
- Article Deck: `20px`, weight 500, leading 1.4 (Indigo or Slate).
- Body Text: `17px`, weight 400, leading 1.6.
- Meta (Date/Category): `12px`, bold, uppercase, tracking `0.1em`.

**Spacing:** 16px base unit. 
- Section Padding: `64px` to `96px` (Fast, professional rhythm).
- Feed Gap: `32px` between entries.
- Container Max-width: `800px` for reading, `1200px` for the feed.

**Border radius:** `0px` or `4px` (Very subtle). Focus on sharp, "tech-grid" geometry.

**Responsive:** Mobile-first focus for morning email consumption. Headings remain large and bold on small screens.

**Accessibility:** WCAG AAA. High-contrast typography on white (10:1+ ratio). Padlock icons must have clear screen-reader labels ("Subscriber Only content").

**Motion:** 
- Quick Cuts: Instant page transitions to signal speed.
- Modal Slide: Vertical `translateY` for the subscription portal.
- No "Artsy" fades.

---

### Section 6 — Structure

**Homepage Layout:**
1. **Nav:** Sticky. Logo (Left). Right: Archive, Podcast, About, Subscribe (Indigo Button).
2. **Latest Feature:** Full-width block. Massive H1 -> Bold Deck -> Author Image -> Metadata.
3. **The Stream:** Vertical stack of secondary entries. Title -> 1-sentence Summary -> Metadata.
4. **Floating CTA (Mobile):** "Get the daily briefing" email bar fixed at the bottom.

**Article Page Layout:**
- **Header:** Category tag -> H1 Title -> Author Byline.
- **The Tease:** First 3 paragraphs of text.
- **Paywall:** A faded gradient transition into a centered white card: "This post is for paid subscribers. Join 100k+ pros."
- **CTAs:** Annual vs Monthly selection toggle.

**Archive Page:**
- Simple search bar at top. List of titles and dates grouped by Month/Year.

---

### Section 7 — Technical Specifications

- **Framework:** Next.js 14 App Router, React 18, TypeScript strict mode.
- **Styling:** Tailwind CSS v3.
- **CMS:** Ghost CMS Content API or Sanity.io (configured for newsletter-first data).
- **Authentication:** NextAuth.js or Clerk (integrated with Stripe sub status).
- **Payments:** Stripe (Customer Portal for self-service billing).
- **Search:** Algolia for high-speed reporting archive indexing.

---

### Section 8 — Implementation Steps

1. **The Grid Shell:** Setup `globals.css` with the Inter-font hierarchy and high-contrast palette.
2. **Feed Engine:** Build the chronological homepage feed with the "Headline > Deck" stack.
3. **Paywall Component:** Implement the "Fade-to-CTA" logic for locked posts using server-side session checks.
4. **Subscription Portal:** Build the multi-tiered plan selection modal with Stripe integration.
5. **Search & Filter:** Implement the Algolia search bar and date-based archive filtering.

---

### Section 9 — User Experience

The user is a "Tech Professional." 
The UI must be "Transparent." Don't hide the price, don't hide the "Unsubscribe" button, and don't make them click twice to read.
The "Aha! moment" is the "Paid" badge—where the user realizes the value of the reporting justifies the subscription cost.

---

### Section 10 — Constraints

- **No ads.** Advertisements undermine journalistic authority in this model.
- **No pure black backgrounds.** Use white to maintain the "Editorial Paper" feel.
- **No "infinite scroll" without intent.** Allow users to reach the footer for legal/social links.
- **No generic stock photography.** Use high-contrast logos or original reporting shots.

---

## Platform Versions

### Category A — v0

Build a "Tech Insider" journalist portfolio and newsletter inspired by Platformer.news. 
Style: Pure White background (#FFFFFF), Deep Black typography (#000000), 4px border-radius, and bold modern Sans-serif fonts (Inter).
Include:
1. Information-dense Feed of reporting entries with "Headline > Summary" stacks.
2. Ghost-style Premium Paywall with a "Fade-to-CTA" logic for locked articles.
3. Multi-tiered Subscription Modal with Annual/Monthly pricing toggles.
Use high-contrast branding and an "Editorial Authority" UI approach. No ads allowed.

---

### Category B — Cursor

In `src/app/`, implement a "Journalist Portfolio & Subscription Hub" (Platformer style).
Stack: Next.js 14, Tailwind, Ghost Content API, Algolia, Stripe.
Visual Rules: 
- Primary Color: `#000000` (Text)
- Accent Color: `#4F46E5` (Indigo)
- Background: `#FFFFFF` (Canvas)
- Radius: `rounded-sm` (4px)
- Font: Bold Grotesque Sans (e.g., Inter).

Implement:
1. `app/page.tsx` - A reverse-chronological news feed with a featured "Lead Story" block.
2. `app/[slug]/page.tsx` - A reading page with a "Paywall" logic that checks user subscription status in Supabase.
3. `components/membership/SubscriptionPortal.tsx` - A sleek centered modal for plan selection and account management.
4. `components/search/ArchiveSearch.tsx` - A high-speed search bar that indexes the Ghost publication archive.

Focus on "Intellectual Authority" and fast-loading text hierarchy. No modern blurs. No generic stock imagery.

---

### Lovable

Build a tech journalism portfolio and paid newsletter hub — "Insider Authority" — for a leading technology journalist. White (#FFFFFF) canvas, pure black (#000000) text, indigo (#4F46E5) accent, 4px border-radius on cards.

Must include:
- News feed: reverse-chronological `<article>` list, `gap: 32px`. Each: category tag `12px` bold uppercase → H2 `clamp(32px, 5vw, 64px)` weight 800 `tracking: -0.02em` → deck `20px` weight 500 → `<time>` metadata. `PaidBadge` `#FACC15` with `aria-label="Subscriber only content"` on paid articles.
- Article page `/[slug]`: first 300 words free → `PaywallOverlay` with `linear-gradient(transparent, white)` fade → centered white card "This post is for paid subscribers" + indigo Subscribe CTA. NEVER use `display: none` on locked content.
- Subscription modal: Annual vs Monthly plan toggle. Indigo "Subscribe" `<a href={stripePortalUrl} rel="noopener noreferrer">` button. No inline payment form.
- Nav: sticky, logo left, indigo "Subscribe" button right. `border-bottom: 1px solid #E5E7EB` on scroll.
- Archive `/archive`: `<input type="search">` + `<details>/<summary>` month/year groups + `<time>` on each entry.

`prefers-reduced-motion`: subscription modal appears instantly (no translateY), no entrance animations.

---

### ChatGPT Canvas

Let's build a tech journalism portfolio and newsletter hub — "Editorial Authority" — inspired by Platformer.

**Design system:**
- Background: `#FFFFFF`; Text: `#000000`; Muted: `#52525B`; Accent: `#4F46E5` indigo; Locked: `#FACC15` gold; Border: `#E5E7EB`
- Border-radius: `0px` sections/headers; `4px` cards and buttons
- Font: Inter/Public Sans — headline `clamp(32px, 5vw, 64px)` weight 800 `tracking: -0.02em` line-height 1.1; deck `20px` weight 500; body `17px` leading 1.6; meta `12px` bold uppercase

**Build iteratively:**
1. **News feed** `/` — reverse-chronological article list `gap: 32px` — category badge → H2 headline → deck → `<time>` metadata — `PaidBadge` on paid articles
2. **Article page** `/[slug]` — first 300 words free → `PaywallOverlay` gradient fade (`linear-gradient(transparent, white)`) → white card subscription CTA. NEVER `display: none`.
3. **Subscription modal** — annual/monthly plan toggle, `#4F46E5` Subscribe button → Stripe Customer Portal link (no inline form)
4. **Archive** `/archive` — `<input type="search">` + `<details>/<summary>` month/year groups

Motion: modal `translateY(-20px)→0 300ms ease-out`. `prefers-reduced-motion`: modal instant, no entrance animations.

---

### Bolt

Scaffold a tech journalism portfolio and paid newsletter hub.

Stack: Next.js 14 App Router + TypeScript + Tailwind CSS + Framer Motion

```css
:root {
  --bg: #FFFFFF; --ink: #000000;
  --muted: #52525B; --accent: #4F46E5;
  --locked: #FACC15; --border: #E5E7EB;
}
body { background: var(--bg); color: var(--ink); }
```

Components:
- `NewsFeed` — `<article>` stack `gap: 32px`. Category badge → H2 `clamp(32px, 5vw, 64px)` 800 `tracking: -0.02em` → deck `20px` 500 → `<time>` meta. `PaidBadge` on paid tier.
- `PaywallOverlay` — `position: absolute; bottom: 0; height: 200px; background: linear-gradient(transparent, var(--bg))`. Below: white card with indigo CTA. NEVER `display: none` on content.
- `PaidBadge` — `background: var(--locked)` `#FACC15`, lock icon, `aria-label="Subscriber only content"`.
- `SubscriptionModal` — `position: fixed; inset: 0`. Annual/Monthly toggle. `<a href={stripePortalUrl} rel="noopener noreferrer">` indigo button. No inline payment form.
- `ArchiveSearch` — `<input type="search">` + `<details>/<summary>` month/year grouped title list. `<time>` on each entry.

---

### Claude Artifacts

Build a self-contained tech journalism portfolio. Next.js 14 App Router + TypeScript + CSS Modules.

```typescript
// src/types/index.ts
export type ArticleCategory = 'policy' | 'platforms' | 'ai' | 'breaking' | 'analysis'
export type SubscriptionTier = 'free' | 'paid'

export interface Article {
  slug: string; title: string; deck: string
  date: string       // ISO 8601
  category: ArticleCategory; tier: SubscriptionTier
  excerpt: string    // first 300 words — always shown
  published: boolean
}

export interface SubscriptionPlan {
  id: 'monthly' | 'annual'
  price: number; currency: string
  stripePortalUrl: string  // external link — never rendered as inline form
}
```

Design rules:
- `border-radius: 0` on sections/headers; `4px` on cards/buttons — via CSS custom properties
- `PaywallOverlay`: `linear-gradient(transparent, var(--bg))` — NEVER `display: none` or `visibility: hidden` on locked content
- `PaidBadge`: `aria-label="Subscriber only content"` — required on every padlock element
- `SubscriptionModal`: `<a href={plan.stripePortalUrl} rel="noopener noreferrer">` — NO inline Stripe Elements
- `getArticlesByMonth()` returns `Map<string, Article[]>`
- `generateStaticParams()` from article slugs. `notFound()` for unknown slugs.

---

### Grok

Implement InsiderEdge — tech journalism portfolio and paid newsletter.

1. `src/app/globals.css` — `--bg: #FFFFFF; --ink: #000000; --muted: #52525B; --accent: #4F46E5; --locked: #FACC15; --border: #E5E7EB` — `body { background: var(--bg); color: var(--ink); }`
2. `src/types/index.ts` — `ArticleCategory` union (policy|platforms|ai|breaking|analysis) — `SubscriptionTier` union (free|paid) — `Article` interface (slug, title, deck, date, category, tier, excerpt, published) — `SubscriptionPlan` interface (id: 'monthly'|'annual', price, currency, stripePortalUrl)
3. `src/lib/articles.ts` — 20 mock `Article` objects (mix of free/paid tiers) — `getArticlesByMonth()` returns `Map<string, Article[]>`
4. `src/app/page.tsx` — reverse-chronological feed `gap: 32px` — category badge → H2 → deck → `<time>` — `PaidBadge` (`aria-label="Subscriber only content"`, `#FACC15`) on paid articles
5. `src/app/[slug]/page.tsx` — `generateStaticParams()` — `notFound()` — first 300 words (excerpt) always visible → `PaywallOverlay` gradient fade → subscription CTA card for paid tier — NEVER `display: none`
6. `src/components/membership/SubscriptionModal.tsx` — `position: fixed; inset: 0` — annual/monthly plan toggle — `<a href={stripePortalUrl} rel="noopener noreferrer">` indigo button — NO Stripe Elements inline
7. `src/app/archive/page.tsx` — `<input type="search">` filter — `<details>/<summary>` month/year groups — `<time>` on each entry
8. QA: `grep -r "StripeElements\|CardElement\|loadStripe" src --include="*.tsx"` → empty — `npx tsc --noEmit` → 0 errors — `npm run build` passes

---

### Gemini

Design and implement a tech journalism portfolio — "Editorial Authority" — for a leading technology journalist.

**Design layer:** `#FFFFFF` background, `#000000` text, `#52525B` muted, `#4F46E5` indigo for Subscribe CTAs/links, `#FACC15` gold for locked state `PaidBadge`. Typography: Inter/Public Sans — headline `clamp(32px, 5vw, 64px)` weight 800 `tracking: -0.02em` line-height 1.1; deck `20px` weight 500; body `17px` leading 1.6; meta `12px` bold uppercase. `border-radius: 0` sections, `4px` cards/buttons.

**Data layer:** `ArticleCategory` union (5 values). `SubscriptionTier` union. `Article` interface (slug, title, deck, date, category, tier, excerpt, published). `SubscriptionPlan` interface (id, price, currency, stripePortalUrl). `getArticlesByMonth()` returns `Map<string, Article[]>`. `generateStaticParams()` for `[slug]`.

**Component layer:** `NewsFeed` (32px gap article stack, category badge, `PaidBadge` on paid tier). `PaywallOverlay` (gradient fade, never display:none, indigo CTA card). `PaidBadge` (`#FACC15`, `aria-label="Subscriber only content"`). `SubscriptionModal` (plan toggle, external Stripe portal link, no inline form). `ArchiveSearch` (`<input type="search">` + `<details>/<summary>` month groups, `<time>` on entries).

**Motion layer:** Subscription modal: `translateY(-20px)→0 300ms ease-out` on open. `prefers-reduced-motion`: modal appears instantly; `useReducedMotion()` guard on all Framer Motion components.
