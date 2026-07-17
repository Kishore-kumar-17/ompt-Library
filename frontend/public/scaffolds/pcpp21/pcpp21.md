---
prompt_id: pcpp21
sub_category: Portfolio
sub_type: Premium Event Landing Page & Schedule Hub
title: ConfigStyle — High-Impact Design Events & Community Hubs
reference_patterns: video_hero_immersion, black_and_white_speaker_portraiture, interactive_track_navigation
inspiration: config.figma.com
quality_score:
status: draft
notes: Focused on high-performance event branding with integrated speaker discovery and multi-track scheduling.
---

## Base Prompt

### Section 1 — Role

You are a senior product designer specializing in high-end event landing pages, design-conference identities, and community-centric digital hubs. You understand that for premier design events, the website is the "First Impression of Quality." You master the "High-Impact UI," where cinematic motion, bold typography, and interactive discovery are the primary engagement drivers. You reject "corporate" event templates in favor of the "Config" philosophy: high-contrast dark modes, vibrant brand accents (e.g., Kelly Green), and a focus on "Finding Your People." You design for "Creative Momentum," ensuring that the path from a high-energy trailer to a personalized schedule build is fluid, future-forward, and aesthetically precise.

---

### Section 2 — Application Overview

This is a premium digital hub for a global design and technology conference. The audience consists of product designers, developers, creative leads, and startup founders. The goal is to provide a "Hype & Logistics" engine that handles high-volume registration, showcases a directory of 100+ speakers, and manages a complex multi-track schedule across different time zones.

The application covers: High-Impact Video Landing, Interactive Speaker Directory, Multi-Track Schedule Hub, Venue & "Commons" Logistics, and a Community "Watch Party" Portal.

---

### Section 3 — Brand Voice & Mood

The mood is "Future-Forward & Enthusiastic" and "Technically Precise." It feels like a high-end design studio or a visionary tech keynote. It is dark, energetic, and community-centric.

Copy is inspiring, community-focused, and direct. Headers focus on "The Collective Future": "Shaping the future of design," "Find your people," "The leading edge of building products." It avoids generic event fluff in favor of "High-Production Mastery" and "Visionary Content."

Vibe word: Momentum.

---

### Section 4 — Core Features & Functionality

1. **Cinematic Hero Loop** — A high-performance, video-first hero section using "picture-in-picture" animations and looping brand gestures to establish immediate energy.
2. **B&W Speaker Discovery** — A sophisticated directory featuring black-and-white headshots that transition to full-color on hover, with deep-link bio pages.
3. **Multi-Track Schedule Engine** — An interactive timeline UI allowing users to filter sessions by track (Design, Dev, AI) and build a personalized "My Config" schedule.
4. **"The Commons" Hub** — A dedicated logistics area for badge pickup, networking zones, and "Watch Party" map integration for virtual attendees.
5. **Urgency-Driven Ticker** — A persistent top-bar banner for "Ticket Alerts" and "Live Now" updates using bold, all-caps typography.

---

### Section 5 — Design Specifications

**Visual style:** Design-Forward Minimalism. High-contrast (Bright accents on Deep Black), precise geometric lines, and heavy use of "Motion as Texture."

**Color mode:** Strictly Dark Mode (Pure Black foundations).

**Color palette:**
- Background: `#000000` (Pure Black)
- Surface/Cards: `#121212` (Deep Charcoal)
- Accent (Primary): `#10B981` (Kelly Green — for primary CTAs and active states)
- Text Primary: `#FFFFFF` (Pure White)
- Text Secondary: `#A1A1AA` (Zinc-400 for metadata)
- Border: `#27272A` (Zinc-800 — subtle separators)

**Typography:** Proprietary Geometric Sans.
- Display Headings: `clamp(36px, 6vw, 72px)`, weight 800, tight tracking (e.g., Whyte, Inter, or SF Pro).
- Body/Logistics: `16px`, weight 400, leading 1.6.
- Technical/Tags: `12px`, Monospace (JetBrains Mono) for times and tracks.

**Spacing:** 12px base unit. 
- Section Padding: `100px` to `140px` (Expansive scale).
- Grid Gaps: `24px` for speakers, `16px` for schedule items.
- Container Max-width: `1440px` (Wide-screen focus).

**Border radius:** `2px` (Crisp) or `0px` (Sharp). No soft "Bubbly" rounding.

**Responsive:** Mobile-first approach. Speaker carousels use horizontal snap-scrolling. The "Schedule" becomes a vertical list with sticky "Date" headers on mobile.

**Accessibility:** WCAG AA. High-contrast green on black (passing 4.5:1 for UI elements). Video heros must have "Reduce Motion" fallbacks.

**Motion:** 
- "Spring" Reveal: Snappy `opacity 0 -> 1` and `scale 0.95 -> 1` for speaker cards.
- Horizontal Tickers: Endless CSS marquee for urgency banners.
- Smooth Scroll: Anchor-link navigation for multi-section landing pages.

---

### Section 6 — Structure

**Homepage Layout:**
1. **Nav:** Minimal. Logo (Left). Right: Speakers, Schedule, Watch Parties, Register (Green Button).
2. **Hero:** Full-bleed Video Background -> Centered H1 -> "Moscone Center · June 23-25" metadata.
3. **The "Why" Strip:** 3-column value prop: What you'll learn, What to expect, Who you'll meet.
4. **Speaker Carousel:** Horizontal scroll of B&W cards. Each: Headshot -> Name -> Company.
5. **Urgency Banner:** Persistent "Tickets selling fast" all-caps ticker.

**Schedule Hub Layout:**
- **Header:** Date Selector Tabs (Day 1, Day 2).
- **Filter Bar:** Multi-select pills for "Track" and "Skill Level."
- **Timeline:** Vertical list of session cards. Each: [Time] [Track Label] [Title] [Add to My Schedule].

**Logistics/Travel Page:**
- High-res map of the Moscone Center and surrounding "Config Commons" zones.

---

### Section 7 — Technical Specifications

- **Framework:** Next.js 14 App Router, React 18, TypeScript strict mode.
- **Styling:** Tailwind CSS v3 with custom "Kelly Green" tokens.
- **Media:** Next.js `<video>` with `playsInline` and `muted` for high-performance heros.
- **State:** Zustand for managing "My Schedule" persistence and domain filtering.
- **CMS:** Sanity.io or Contentlayer (to handle hundreds of speakers and dynamic session times).
- **Search:** Algolia for near-instant speaker and session discovery.

---

### Section 8 — Implementation Steps

1. **The Dark Shell:** Setup `globals.css` with the Pure Black theme and define the bold sans-serif hierarchy.
2. **Video Hero Engine:** Build the high-performance background loop component with poster-image fallbacks.
3. **Speaker Directory:** Implement the B&W-to-color hover cards and the responsive masonry grid.
4. **Interactive Schedule:** Build the timeline component with track-filtering logic and Zustand persistence.
5. **Urgency Ticker:** Create the infinite-scroll marquee component using CSS animations.

---

### Section 9 — User Experience

The user is a "Design Professional." 
The UI must be "Inspiring and Frictionless." The site itself should feel like a piece of high-end software. 
The "Aha! moment" is the Schedule Filter—where the user realizes they can curate a 100% personalized learning path in seconds.

---

### Section 10 — Constraints

- **No generic stock photos of "happy people."** Use high-end photography of the actual venue or previous attendees.
- **No pure white heros.** Stick to the Dark Gallery aesthetic.
- **No slow/clunky transitions.** Performance is a core design signal for a tech conference.
- **No hidden prices.** Ticket costs must be clear before clicking "Register."

---

## Platform Versions

### Category A — v0

Build a "Design-Forward" event landing page inspired by Config. 
Style: Pure Black background (#000000), Kelly Green (#10B981) accents, 2px border-radius, and bold modern Sans-serif fonts.
Include:
1. High-Impact Video Hero with centered date/location metadata.
2. B&W Speaker Carousel featuring headshots that reveal color on hover.
3. Interactive Multi-Track Schedule with category filter pills and timeline session cards.
Use cinematic motion and an "Elite Tech Conference" UI approach. No ads allowed.

---

### Category B — Cursor

In `src/app/`, implement an "Event Identity Hub & Personalized Schedule" (Config style).
Stack: Next.js 14, Tailwind, Sanity CMS, Algolia, Zustand.
Visual Rules: 
- Primary Color: `#FFFFFF` (Text)
- Accent Color: `#10B981` (Green)
- Background: `#000000` (Canvas)
- Radius: `rounded-sm` (2px)
- Font: Bold Geometric Sans (e.g., Inter/Whyte).

Implement:
1. `app/page.tsx` - A high-energy landing page with a cinematic video hero and urgency tickers.
2. `app/schedule/page.tsx` - An interactive timeline hub with track-filtering and "Add to Schedule" logic.
3. `components/media/VideoHero.tsx` - A high-performance video component with poster-fallback and smooth opacity reveals.
4. `components/speakers/SpeakerCard.tsx` - A B&W portrait component with elegant hover state transitions.

Focus on "Creative Momentum" and fast-loading information density. No modern gradients or blurs. No ads.

---

### Lovable

Build a high-impact design conference landing page — "Config" — dark mode only, cinematic and community-centric. Pure Black (#000000) canvas, Kelly Green (#10B981) accent, white (#FFFFFF) text, 2px border-radius.

Must include:
- Video hero: `<video autoPlay muted loop playsInline poster="/hero-poster.jpg">`. `prefers-reduced-motion` → render `<img alt="Config 2025 — Moscone Center, June 23-25">` poster ONLY — no video. Centered H1 `clamp(36px, 6vw, 72px)` over video. Date/location metadata in JetBrains Mono `12px` uppercase.
- Speaker section: `<section aria-label="Speakers">`. Each `SpeakerCard`: portrait `<img alt="[name], [company]">` with CSS `filter: grayscale(1)` default → hover `filter: none`. `prefers-reduced-motion` → always `filter: none` (no grayscale transition applied).
- Schedule `/schedule`: day selector `role="tablist"` tabs. Track filter `aria-pressed` pills. Session cards: JetBrains Mono `12px` time + `#10B981` track label + title + `<button aria-label="Add [session title] to my schedule">`. Zustand `useScheduleStore()` for "My Config" persistence.
- UrgencyTicker: CSS `@keyframes marquee { to { transform: translateX(-50%) } }` 20s linear infinite. `prefers-reduced-motion` → `animation-play-state: paused`.
- Registration: ticket tier prices visible on page → `<a href={registrationUrl} rel="noopener noreferrer">` Register button — NO inline payment form.

Critical: body `background: #000000` — NEVER override to white or any light color in any component.

---

### ChatGPT Canvas

Let's build a high-impact design conference hub — "ConfigStyle" — for a premier design and technology event. Inspired by Figma Config.

**Design system:**
- Background: `#000000` (DARK ONLY — never override); Surface: `#121212`; Text: `#FFFFFF`; Muted: `#A1A1AA`; Green: `#10B981`; Border: `#27272A`
- Border-radius: `2px` crisp; `0px` layout sections
- Font: Inter/Whyte weight 800 `clamp(36px, 6vw, 72px)` display; body `16px` weight 400 leading 1.6; JetBrains Mono `12px` for times and track labels

**Build iteratively:**
1. **Conference homepage** — `UrgencyTicker` (CSS marquee, `prefers-reduced-motion` → `animation-play-state: paused`) + `VideoHero` (`<video autoPlay muted loop playsInline poster>` / `prefers-reduced-motion` → poster `<img>` only) + speaker B&W carousel + "Why Config" 3-col strip
2. **Speaker directory** `/speakers` — `SpeakerCard` grid: `filter: grayscale(1)` default → hover `filter: none`. `<img alt="[name], [company]">`. `prefers-reduced-motion` → always full color, no CSS transition
3. **Schedule hub** `/schedule` — `role="tablist"` day tabs + `aria-pressed` track filter pills + session timeline cards (JetBrains Mono `12px` time + `#10B981` track + title) + `<button aria-label="Add [title] to my schedule">` + Zustand `useScheduleStore()`
4. **Registration** — ticket tier cards with prices visible → `<a href={registrationUrl} rel="noopener noreferrer">` Register — NO inline payment

Motion: speaker cards `scale 0.95→1 opacity 0→1 300ms ease-out` stagger. Ticker: CSS `translateX(-50%)` 20s linear infinite. `prefers-reduced-motion`: cards instant, ticker `animation-play-state: paused`.

---

### Bolt

Scaffold a design conference landing page — dark mode only, cinematic, community-driven.

Stack: Next.js 14 App Router + TypeScript + Tailwind CSS + Zustand + Framer Motion

```css
:root {
  --bg: #000000; --surface: #121212;
  --text: #FFFFFF; --muted: #A1A1AA;
  --green: #10B981; --border: #27272A;
  --radius: 2px;
}
body { background: var(--bg); color: var(--text); }
/* NEVER override --bg to white or any light color */
```

Components:
- `VideoHero` — `<video autoPlay muted loop playsInline poster>`. `useReducedMotion()` → render poster `<img alt>` only, no video element. Centered H1 over video.
- `SpeakerCard` — `<img alt="[name], [company]">` with CSS `filter: grayscale(1)` default → hover `filter: none`. `useReducedMotion()` → always `filter: none`, no CSS `transition` applied.
- `UrgencyTicker` — `@keyframes marquee { to { transform: translateX(-50%) } }` 20s linear infinite. `useReducedMotion()` → `animation-play-state: paused`.
- `ScheduleTimeline` — `role="tablist"` day tabs + `aria-pressed` track filter pills + session cards (JetBrains Mono `12px` time + `#10B981` track label) + Zustand `useScheduleStore()`.
- Registration: `<a href={registrationUrl} rel="noopener noreferrer">` — ticket prices visible before click — NO inline payment form.

---

### Claude Artifacts

Build a self-contained design conference hub. DARK MODE ONLY. Next.js 14 App Router + TypeScript + CSS Modules.

```typescript
// src/types/index.ts
export type SessionTrack = 'design' | 'dev' | 'ai' | 'leadership'

export interface Speaker {
  slug: string; name: string; company: string
  avatarSrc: string; avatarAlt: string  // alt format: "[name], [company]"
}

export interface Session {
  id: string; title: string
  speakerSlug: string; track: SessionTrack
  day: 1 | 2; time: string  // e.g. "10:00 AM"
  registrationUrl: string   // external — never inline payment
}
```

Design rules:
- `body { background: #000000 }` — NEVER override in any component — QA grep required
- `border-radius: 2px` cards; `0px` layout sections
- `VideoHero`: `useReducedMotion()` → render poster `<img>` ONLY — no `<video>` element rendered
- `SpeakerCard`: CSS `filter: grayscale(1)` default; hover `filter: none`; `useReducedMotion()` → always `filter: none` (no CSS transition class applied)
- `UrgencyTicker`: CSS `@keyframes marquee` only — `useReducedMotion()` → `animation-play-state: paused`
- `ScheduleTimeline`: `role="tablist"` day tabs + `aria-pressed` track pills + Zustand `useScheduleStore()` required
- Registration: `<a href={session.registrationUrl} rel="noopener noreferrer">` — NO inline payment form

---

### Grok

Implement ConfigStyle — high-impact design conference hub. DARK MODE ONLY.

1. `src/app/globals.css` — `--bg: #000000; --surface: #121212; --text: #FFFFFF; --muted: #A1A1AA; --green: #10B981; --border: #27272A; --radius: 2px` — `body { background: var(--bg); color: var(--text); }` — NEVER override background to white or light color
2. `src/types/index.ts` — `SessionTrack` union (design|dev|ai|leadership) — `Speaker` interface (slug, name, company, avatarSrc, avatarAlt) — `Session` interface (id, title, speakerSlug, track, day: 1|2, time, registrationUrl)
3. `src/lib/speakers.ts` — 12 mock `Speaker` objects — `src/lib/sessions.ts` — 20 mock `Session` objects across 2 days and 4 tracks
4. `src/app/page.tsx` — `UrgencyTicker` (CSS marquee, `prefers-reduced-motion` → `animation-play-state: paused`) + `VideoHero` (`useReducedMotion()` → poster `<img>`) + speaker B&W carousel + "Why Config" 3-col strip
5. `src/app/speakers/[slug]/page.tsx` — `generateStaticParams()` — `notFound()` — full-color portrait + bio + sessions list
6. `src/app/schedule/page.tsx` — `role="tablist"` day tabs — `aria-pressed` track filter pills — session timeline cards: JetBrains Mono `12px` time + `#10B981` track label + title + `<button aria-label="Add [title] to my schedule">` — Zustand `useScheduleStore()`
7. `src/components/speakers/SpeakerCard.tsx` — CSS `filter: grayscale(1)` default → hover `filter: none` — `useReducedMotion()` → always `filter: none`, no CSS `transition` property applied
8. QA: `grep -r "background.*#[Ff][Ff][Ff]\|background.*white\|bg-white\|bg-gray-50" src --include="*.tsx" --include="*.css"` → empty (dark mode enforced) — `npx tsc --noEmit` → 0 errors — `npm run build` passes

---

### Gemini

Design and implement a design conference hub — "ConfigStyle" — for a premier global design and tech event. DARK MODE ONLY.

**Design layer:** `#000000` background (DARK ONLY — never override), `#121212` surface, `#FFFFFF` text, `#A1A1AA` muted, `#10B981` Kelly Green for CTAs/active states/track labels, `#27272A` borders. Typography: Inter/Whyte weight 800 `clamp(36px, 6vw, 72px)` display; body `16px` weight 400 leading 1.6; JetBrains Mono `12px` for times and track labels. `border-radius: 2px` cards; `0px` layout.

**Data layer:** `SessionTrack` union (4 values). `Speaker` interface (slug, name, company, avatarSrc, avatarAlt). `Session` interface (id, title, speakerSlug, track, day: 1|2, time, registrationUrl). `generateStaticParams()` for `[slug]`.

**Component layer:** `VideoHero` (`<video autoPlay muted loop playsInline poster>`, `useReducedMotion()` → poster `<img>` only — no video rendered). `SpeakerCard` (CSS `filter: grayscale(1)` → hover `filter: none`; `useReducedMotion()` → always full color, no transition). `UrgencyTicker` (CSS `@keyframes marquee` 20s linear; `useReducedMotion()` → `animation-play-state: paused`). `ScheduleTimeline` (`role="tablist"` days + `aria-pressed` tracks + Zustand `useScheduleStore()`). Registration: external `<a href rel="noopener noreferrer">` — NO inline payment.

**Motion layer:** Speaker cards: `scale 0.95→1 opacity 0→1 300ms ease-out` stagger. Ticker: CSS `translateX(-50%)` 20s linear infinite. `prefers-reduced-motion`: cards visible immediately, ticker `animation-play-state: paused`; `useReducedMotion()` guard on all Framer Motion components.
