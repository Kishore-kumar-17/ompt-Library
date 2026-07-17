---
prompt_id: pcpp15
sub_category: Portfolio
sub_type: Modern Newsletter Landing Page & Creator Hub
title: SubStackHub — Content-First Indie Publishing & Subscriptions
reference_patterns: email_capture_heros, subscription_tier_cards, post_layout_variations
inspiration: substack.com
quality_score:
status: draft
notes: Focused on high-conversion newsletter landing pages with integrated subscription and community logic.
---

## Base Prompt

### Section 1 — Role

You are a senior product designer specializing in indie publishing, newsletter platforms, and the "Creator-First" media economy. You understand that for modern writers, the homepage is an email-capture engine first and a library second. You master the "Minimalist Conversion UI," where the clarity of a value proposition and the friction of a signup field are perfectly balanced. You reject "corporate" clutter and heavy sidebar distractions in favor of the "Substack" philosophy: high-readability text, iconic "Subscribe" accents, and a focus on community ownership. You design for "Direct Relationships," ensuring that the path from a social media link to a paid annual subscriber is fast, trustworthy, and aesthetically pure.

---

### Section 2 — Application Overview

This is a premium digital publication and creator hub for an independent writer or small editorial team. The audience consists of dedicated readers, industry peers, and paid subscribers. The goal is to provide a "Home for Thought" that prioritizes email list growth, manages multi-tiered subscriptions (Free, Paid, Founder), and hosts multi-media content (Essays, Podcasts, Chat).

The application covers: High-Conversion Welcome Page, Dynamic Publication Homepage (Feature/Magazine/Newspaper modes), Post Detail View (with paywall logic), Archive Index, and a Subscriber Dashboard.

---

### Section 3 — Brand Voice & Mood

The mood is "Personal & Authoritative" and "Intellectually Airy." It feels like a clean, well-lit studio where ideas are refined. It is focused, inviting, and community-centric.

Copy is intimate and direct. Headers focus on the value of the "Unfiltered Truth": "Independent journalism you can trust," "Thinking out loud," "Join 50,000+ curious minds." It avoids generic marketing speak in favor of a "Letter-to-a-Friend" tone.

Vibe word: Unfiltered.

---

### Section 4 — Core Features & Functionality

1. **Email-First "Welcome" Page** — A dedicated landing page with a large cover photo, publication wordmark, and a single centered email field to capture leads before they enter the archive.
2. **Multi-Mode Homepage Engine** — A flexible layout that can switch between "Feature" (one big post), "Magazine" (grid of 5), and "Newspaper" (dense list) based on content volume.
3. **Multi-Tier Subscription Tiers** — A membership module allowing users to choose between "Free" (Public posts), "Paid" (Exclusive archives + community), and "Founder" (Super-supporter).
4. **Post-Level Paywall Logic** — A component that handles the "Locked" state for premium articles, showing a preview excerpt and a clear "Upgrade to Read" CTA.
5. **Community Engagement Tools** — Integrated comment threads with "Member-only" toggles and a social "Notes" feed for short-form updates.

---

### Section 5 — Design Specifications

**Visual style:** Minimalist Publishing. Clean white surfaces, subtle brand accents (one primary color), and a total focus on the rhythm of the text.

**Color mode:** Primarily Light Mode with a "Paper" feel.

**Color palette:**
- Background: `#FFFFFF` (Pure White) or `#FDFDFD` (Very Faint Paper)
- Text Primary: `#1A1A1A` (Near Black)
- Text Muted: `#666666` (Neutral Grey for dates and metadata)
- Accent: `#FF6719` (Vibrant Orange — or any custom brand hex for CTAs/Links)
- Border: `#E5E5E5` (Slate-200 — hair-line separators)
- Bestseller Gold: `#D4AF37` (For "Top Publication" badges)

**Typography:** Classic Modern Pairings.
- Display Headings: `clamp(32px, 5vw, 54px)`, weight 700, sans-serif (e.g., Inter or Helvetica).
- Reading Body: `18px` to `20px`, weight 400, serif (e.g., Georgia or Caslon) for a "Literary" feel.
- Meta Labels: `12px`, bold, uppercase, tracking `0.05em`.

**Spacing:** 16px base unit. 
- Section Padding: `64px` to `80px`.
- Reading Column: `max-width: 720px` (Optimized for focus).
- Feed Gap: `32px` to `48px` between post entries.

**Border radius:** `2px` (Subtle) or `0px` (Sharp). No "Pill" shapes except for "Subscribe" buttons.

**Responsive:** Mobile-first approach. Headers remain large and the "Welcome" email field is always persistent on mobile entry.

**Accessibility:** WCAG AAA. High-contrast text on white. All "Lock" icons and subscription buttons must have clear ARIA labels.

**Motion:** 
- Fade-ins: Subtle `opacity 0 -> 1` for homepage post entry.
- Modal Slide: Vertical `translateY` for the subscription portal.
- No distracting parallax.

---

### Section 6 — Structure

**Welcome Page Layout (The Gateway):**
1. **Wordmark:** Centered high-resolution logo.
2. **Cover:** High-impact lifestyle or thematic photo.
3. **Pitch:** Large H1 headline + 2-line Sub-header.
4. **Capture:** Single email input + "Subscribe" (Accent Button).
5. **Footer:** "No spam, unsubscribe anytime." link.

**Publication Home Layout (Magazine Mode):**
1. **Nav:** Minimal Top-bar. Logo (Left). Right: Archive, About, Search, Sign In.
2. **Featured Hero:** Large 2-column block. Left: Title/Deck. Right: Featured Image.
3. **The Feed:** Grid or List of posts. Each: Title -> 1-line Excerpt -> Metadata -> "Paid" Padlock (if applicable).
4. **Community Bar:** List of "Top Commenters" or "Latest Notes."

**Archive Page:**
- Search bar at top. Simple vertical list of all posts grouped by Year/Month.

---

### Section 7 — Technical Specifications

- **Framework:** Next.js 14 App Router, React 18, TypeScript strict mode.
- **Styling:** Tailwind CSS v3.
- **CMS:** Sanity.io or Contentlayer (to handle thousands of tagged posts and sections).
- **Authentication:** NextAuth.js (supporting "Magic Link" and social login).
- **Payments:** Stripe (Customer Portal for recurring newsletter billing).
- **SEO:** Optimized Meta for each post to drive social discovery (Substack-style previews).

---

### Section 8 — Implementation Steps

1. **The Gateway Shell:** Build the "Welcome" landing page with the persistent email capture logic.
2. **Post Rendering:** Setup the `globals.css` with the Serif-Sans hierarchy. Focus on the 720px reading container.
3. **Feed modes:** Create the flexible homepage grid that supports "Feature," "Magazine," and "Newspaper" templates.
4. **Subscription Logic:** Implement the multi-tier plan selection and the "Lock" component for gated posts.
5. **Discovery Tools:** Build the Algolia-powered archive search and the "Sunday" roundup feed.

---

### Section 9 — User Experience

The user is a "Curious Reader." 
The UI must be "Invisible." The design should disappear to let the author's voice shine through. 
The "Aha! moment" is the Welcome screen—where the clarity of the publication's "Why" makes the decision to subscribe feel inevitable.

---

### Section 10 — Constraints

- **No ads.** Substack is a premium, subscriber-supported model.
- **No sidebars during reading.** 100% focus on the single-column text.
- **No generic stock photography.** Use hand-drawn illustrations or original brand assets.
- **No "Read More" walls without intent.** The transition from teaser to paywall must be clearly messaged.

---

## Platform Versions

### Category A — v0

Build a "Writer-Centric" newsletter landing page inspired by Substack. 
Style: Pure White background (#FFFFFF), Near Black typography (#1A1A1A), 2px border-radius, and Serif/Sans font pairings.
Include:
1. Email-First "Welcome" Page with a centered capture field and cover photo.
2. Flexible Publication Home that can toggle between "Magazine" (grid) and "List" views.
3. Post Paywall Component that fades text and shows a subscription CTA.
Use high-readability typography and an "Indie Publishing" UI approach. No ads allowed.

---

### Category B — Cursor

In `src/app/`, implement a "Creator Hub & Subscription Publication" (Substack style).
Stack: Next.js 14, Tailwind, Sanity CMS, Stripe.
Visual Rules: 
- Primary Color: `#1A1A1A` (Ink)
- Accent Color: `#FF6719` (Orange)
- Background: `#FFFFFF` (Canvas)
- Radius: `rounded-sm` (2px)
- Font: Serif body (Caslon) + Sans headings (Inter).

Implement:
1. `app/welcome/page.tsx` - A high-conversion landing page with wordmark and email capture.
2. `app/page.tsx` - A publication feed featuring a large "Feature" post and a vertical list of archives.
3. `app/posts/[slug]/page.tsx` - A deep-focus reading page with a 720px centered container and premium gating logic.
4. `components/membership/TierCards.tsx` - A component for selecting Free vs Paid vs Founder subscription tiers.

Focus on "Direct Relationship" and content-first information hierarchy. No modern blurs. No generic ads.

---

### Lovable

Build a writer-centric newsletter and subscription platform — "Indie Publishing Hub" — inspired by Substack. White (#FFFFFF) canvas, near-black (#1A1A1A) text, vibrant orange (#FF6719) accent, 2px border-radius.

Must include:
- Welcome page `/welcome`: centered wordmark `<img alt>`, cover `<img alt>`, H1 `clamp(32px, 5vw, 54px)` weight 700 + 2-line sub-header, `<input type="email" required>` + orange "Subscribe" pill button. "No spam, unsubscribe anytime" `<a>` link. `role="status"` on success state.
- Publication homepage `/`: featured hero 2-col (title/deck left, cover image right) → vertical post feed. Each: bold title → 1-line excerpt → `<time>` metadata → `PaidBadge` (`aria-label="Paid subscriber only"`) for locked posts.
- Post page `/posts/[slug]`: `max-width: 720px` Georgia/Caslon serif body → `PaywallOverlay` `linear-gradient(transparent, white)` fade → subscription card CTA for locked posts. NEVER `display: none`.
- Subscription tier cards: Free / Paid / Founder. Each: price, features list, CTA. Paid/Founder: `<a href={stripePortalUrl} rel="noopener noreferrer">`. No inline payment form.
- Archive `/archive`: `<input type="search">` + `<details>/<summary>` month/year groups + `<time>` per entry.

`prefers-reduced-motion`: subscription modal instant, feed fade-ins disabled.

---

### ChatGPT Canvas

Let's build a newsletter and subscription publication platform — "Indie Publishing" — inspired by Substack.

**Design system:**
- Background: `#FFFFFF`; Text: `#1A1A1A`; Muted: `#666666`; Accent: `#FF6719` orange; Gold badge: `#D4AF37`; Border: `#E5E5E5`
- Border-radius: `2px` cards/inputs; `999px` subscribe button pill
- Font: Inter/Helvetica sans — display `clamp(32px, 5vw, 54px)` weight 700; reading body `18-20px` Georgia/Caslon serif leading 1.7; meta `12px` bold uppercase `letter-spacing: 0.05em`

**Build iteratively:**
1. **Welcome page** `/welcome` — centered wordmark + cover image + H1 + 2-line pitch + `<input type="email" required>` + orange pill Subscribe button + "No spam" line. `role="status"` success.
2. **Publication home** `/` — featured 2-col hero + post feed (title + excerpt + metadata + `PaidBadge` with `aria-label`)
3. **Post page** `/posts/[slug]` — `max-width: 720px` serif reading column + `PaywallOverlay` gradient for locked posts. NEVER `display: none`.
4. **Subscription tiers** — Free / Paid / Founder cards + `<a href={stripePortalUrl} rel="noopener noreferrer">` for paid tiers. No inline payment.

Motion: feed `opacity 0→1 300ms ease-out`. Modal `translateY(-20px)→0 300ms`. `prefers-reduced-motion`: all instant.

---

### Bolt

Scaffold a newsletter and subscription publication platform — content-first, conversion-optimized.

Stack: Next.js 14 App Router + TypeScript + Tailwind CSS

```css
:root {
  --bg: #FFFFFF; --ink: #1A1A1A;
  --muted: #666666; --accent: #FF6719;
  --gold: #D4AF37; --border: #E5E5E5;
}
body { background: var(--bg); color: var(--ink); }
```

Components:
- `WelcomePage` — centered. Wordmark → cover `<img alt>` → H1 `clamp(32px, 5vw, 54px)` 700 serif → 2-line pitch → `<form>`: `<input type="email" required>` + `border-radius: 999px` orange pill Subscribe button. `role="status"` on success. "No spam" text link.
- `PostFeed` — featured 2-col hero + vertical post list. `PaidBadge`: `background: #FF6719; aria-label="Paid subscriber only"`. Each: title → excerpt → `<time>`.
- `PaywallOverlay` — `position: absolute; bottom: 0; background: linear-gradient(transparent, var(--bg))`. White card subscription CTA below. NEVER `display: none`.
- `SubscriptionTiers` — 3-card grid (Free / Paid / Founder). `<a href={stripePortalUrl} rel="noopener noreferrer">` for Paid/Founder. No Stripe Elements.
- `ArchiveSearch` — `<input type="search">` + `<details>/<summary>` month/year groups. `<time>` on each entry.

---

### Claude Artifacts

Build a self-contained newsletter publication platform. Next.js 14 App Router + TypeScript + CSS Modules.

```typescript
// src/types/index.ts
export type SubscriptionTier = 'free' | 'paid' | 'founder'
export type PostStatus = 'public' | 'paid' | 'founder_only'

export interface Post {
  slug: string; title: string
  date: string       // ISO 8601
  status: PostStatus; excerpt: string
  coverSrc?: string; coverAlt?: string
  readTimeMinutes: number; published: boolean
}

export interface SubscriptionPlan {
  tier: SubscriptionTier
  priceMonthly: number; priceAnnual: number; currency: string
  features: string[]
  stripePortalUrl: string  // external — never rendered as inline form
}
```

Design rules:
- `border-radius: 2px` cards/inputs; `999px` subscribe button pill
- `PaywallOverlay`: `linear-gradient(transparent, var(--bg))` — NEVER `display: none` or `visibility: hidden` on locked content
- `SubscriptionTiers`: `<a href={plan.stripePortalUrl} rel="noopener noreferrer">` — NO Stripe Elements or inline payment form
- `WelcomePage` form: `<input type="email" required>` + `role="status"` on success state
- `PaidBadge`: `aria-label="Paid subscriber only"` — required on all lock elements
- `generateStaticParams()` from post slugs. `notFound()` for unknown slugs.

---

### Grok

Implement SubStackHub — newsletter and subscription publication platform.

1. `src/app/globals.css` — `--bg: #FFFFFF; --ink: #1A1A1A; --muted: #666666; --accent: #FF6719; --gold: #D4AF37; --border: #E5E5E5` — `body { background: var(--bg); color: var(--ink); }`
2. `src/types/index.ts` — `SubscriptionTier` union (free|paid|founder) — `PostStatus` union (public|paid|founder_only) — `Post` interface (slug, title, date, status, excerpt, optional coverSrc/coverAlt, readTimeMinutes, published) — `SubscriptionPlan` interface (tier, priceMonthly, priceAnnual, currency, features, stripePortalUrl)
3. `src/lib/posts.ts` — 20 mock `Post` objects (mix of statuses) — `src/lib/plans.ts` — 3 `SubscriptionPlan` objects (Free/Paid/Founder)
4. `src/app/welcome/page.tsx` — centered wordmark + cover `<img alt>` + H1 pitch + `<form>`: `<input type="email" required>` + `border-radius: 999px` orange Subscribe button + "No spam" text + `role="status"` success state
5. `src/app/page.tsx` — featured 2-col hero + vertical post feed — `PaidBadge` (`aria-label="Paid subscriber only"`) on paid/founder posts — `<time>` metadata
6. `src/app/posts/[slug]/page.tsx` — `generateStaticParams()` — `notFound()` — `max-width: 720px` Georgia/Caslon serif prose — `PaywallOverlay` gradient for non-public posts — NEVER `display: none`
7. `src/components/membership/SubscriptionTiers.tsx` — 3-card layout (Free/Paid/Founder) — `<a href={plan.stripePortalUrl} rel="noopener noreferrer">` for Paid/Founder — NO Stripe Elements
8. QA: `grep -r "StripeElements\|CardElement\|loadStripe" src --include="*.tsx"` → empty — `npx tsc --noEmit` → 0 errors — `npm run build` passes

---

### Gemini

Design and implement a newsletter publication and subscription platform — "Indie Publishing" — for an independent writer or editorial team.

**Design layer:** `#FFFFFF` background, `#1A1A1A` text, `#666666` muted, `#FF6719` vibrant orange for Subscribe CTAs, `#D4AF37` gold for top-publication badges. Typography: Inter/Helvetica sans — display `clamp(32px, 5vw, 54px)` weight 700; reading body `18-20px` Georgia/Caslon serif leading 1.7; meta `12px` bold uppercase. `border-radius: 2px` cards/inputs, `999px` subscribe button.

**Data layer:** `SubscriptionTier` union (free|paid|founder). `PostStatus` union (public|paid|founder_only). `Post` interface (slug, title, date, status, excerpt, optional coverSrc, readTimeMinutes, published). `SubscriptionPlan` interface (tier, priceMonthly, priceAnnual, features, stripePortalUrl). `generateStaticParams()` for `[slug]`.

**Component layer:** `WelcomePage` (centered wordmark + cover + email form + `role="status"` success). `PostFeed` (featured 2-col hero + list with `PaidBadge aria-label`). `PaywallOverlay` (gradient fade, never display:none, subscription CTA). `SubscriptionTiers` (3-card Free/Paid/Founder, external Stripe `<a>` — no inline form). `ArchiveSearch` (`<input type="search">` + `<details>/<summary>` month groups).

**Motion layer:** Post feed: `opacity 0→1 300ms ease-out` on viewport entry. Subscription modal: `translateY(-20px)→0 300ms`. `prefers-reduced-motion`: all instant; `useReducedMotion()` guard on Framer Motion.
