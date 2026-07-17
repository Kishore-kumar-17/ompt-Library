---
prompt_id: pcpp19
sub_category: Portfolio
sub_type: Exam-Prep Edtech Discovery & Detail Pages
title: ExamMaster — High-Trust Goal-Based Learning & Subscriptions
reference_patterns: goal_selection_modals, educator_authority_branding, tiered_subscription_comparison
inspiration: unacademy.com
quality_score:
status: draft
notes: Focused on a high-trust "Exam-Prep" aesthetic with integrated goal discovery and premium subscription logic.
---

## Base Prompt

### Section 1 — Role

You are a senior product designer specializing in competitive exam-prep platforms, massive-scale edtech discovery systems, and high-conversion subscription architectures. You understand that for Indian "Aspirants," the platform is more than a site—it is a hope-machine. You master the "Trust & Success UI," where educator credentials, student testimonials, and clear "Cracking the Exam" pathways are the primary conversion drivers. You reject "generic" school-like layouts in favor of the "Exam-Prep" philosophy: goal-based navigation, celebrity-style educator branding, and high-contrast subscription tiers (Plus vs. Iconic). You design for "Academic Confidence," ensuring that the path from selecting a UPSC goal to an annual "Iconic" enrollment is fast, authoritative, and professionally reassuring.

---

### Section 2 — Application Overview

This is a premium digital hub for a leading competitive exam preparation platform. The audience consists of millions of Indian students (Aspirants) targeting exams like UPSC, IIT-JEE, and NEET. The goal is to provide a "Single Destination for Success" that handles goal-based routing across 200+ exams, showcases "Top Educators," and manages high-volume multi-tier subscription billing.

The application covers: Goal-Selection Portal, Exam-Specific Landing Pages, "Top Educator" Directory, Subscription Comparison Hub (Plus vs. Iconic), and a Live Class Interaction UI.

---

### Section 3 — Brand Voice & Mood

The mood is "Ambitious & Reliable" and "Aspirant-Centric." It feels like a high-tech university campus or a world-class coaching institute. It is energetic, clean, and results-oriented.

Copy is encouraging, data-driven, and authoritative. Headers focus on "The Result": "Crack UPSC with the best," "Over 10 Crore learners trust us," "Your dream rank starts here." It avoids academic fluff in favor of "Strategic Preparation" and "Proven Pedigree."

Vibe word: Success.

---

### Section 4 — Core Features & Functionality

1. **Goal-Selection Search & Modal** — A clean, high-performance interface allowing users to find their specific exam goal from a catalog of 200+ categories instantly.
2. **"Top Educator" Pedigree Cards** — Component cards featuring high-quality portraits, experience years, subject expertise, and follower counts to humanize the massive platform.
3. **Plus vs. Iconic Comparison Module** — A side-by-side feature grid highlighting differentiators like "1:1 Mentorship," "Physical Notes," and "Live Doubt Solving" for the premium tier.
4. **Live Class "Classroom" UI** — A specialized interaction layout featuring a video player, live chat with moderation, and "Raise a Hand" classroom gestures.
5. **Exam-Success Statistics Strip** — A social-proof section showcasing "Minutes Watched," "Verified Toppers," and "Daily Active Learners" to establish platform scale.

---

### Section 5 — Design Specifications

**Visual style:** Academic Modernism. Clean white/grey surfaces, vibrant success-oriented accents, and a focus on "Clarity and Scannability." The UI uses "Success Indicators" (checkmarks, progress bars) as primary decorative elements.

**Color mode:** Primarily Light Mode (High Contrast).

**Color palette:**
- Background: `#FFFFFF` (Pure White)
- Surface/UI: `#F7F7F7` (Lightest Paper Grey)
- Accent (Primary): `#08BD80` (Unacademy Green — for primary CTAs and success)
- Accent (Premium): `#FBB03B` (Iconic Gold — for high-tier badges and mentorship)
- Text Primary: `#1A1A1A` (Near Black)
- Text Muted: `#757575` (Muted Slate for secondary metadata)

**Typography:** Functional Sans-Serif.
- Display Headlines: `clamp(32px, 5vw, 48px)`, weight 800, tracking `-0.01em` (e.g., Inter, Montserrat, or SF Pro).
- Body/Class Details: `16px`, weight 400, leading 1.6.
- Exam Tags: `12px`, bold, all-caps, tracking `0.05em`.

**Spacing:** 16px base unit. 
- Section Padding: `80px` to `112px`.
- Grid Gaps: `24px`.
- Container Max-width: `1280px` (Optimized for discovery grids).

**Border radius:** `8px` (Standard) to `12px` (Soft cards).

**Responsive:** Mobile-first approach. Goal-selection cards are oversized for thumb-taps. Subscription tables collapse into high-impact "Select Tier" cards on mobile.

**Accessibility:** WCAG AA. High-contrast text on white. All educator portraits must have "Pedigree and Subject" ARIA labels.

**Motion:** 
- Progress Transitions: Smooth width transitions for learning progress bars.
- Modal Entrance: Centered scale-up `200ms` for goal selection.
- Countdown Tickers: For live class start times.

---

### Section 6 — Structure

**Homepage Layout:**
1. **Nav:** Minimal. Logo (Left). Right: Search, Goal Switcher, Sign In, Join for Free.
2. **Hero:** Goal-based CTA ("Select your exam") + Massive Social Proof ("3.2B+ Mins watched").
3. **Category Strip:** Horizontal row of 6-8 top exams (UPSC, NEET, JEE, etc.).
4. **Educator Spotlight:** Grid of 3 large cards: "Top Educators in [Selected Goal]."
5. **Subscription Preview:** Side-by-side Plus and Iconic summary cards.

**Exam Landing Page:**
- **Header:** Goal Name -> "Get Subscription" Green Button.
- **Top Content:** Horizontal scroll of "Special Classes" (Free).
- **Core Grid:** "Structured Batches" showing start dates and educator line-ups.

**Subscription Comparison Hub:**
- Header: "Choose the plan that's right for you."
- Comparison Table: Column for "Plus" vs Column for "Iconic" with checked/unchecked feature lists.

---

### Section 7 — Technical Specifications

- **Framework:** Next.js 14 App Router, React 18, TypeScript strict mode.
- **Styling:** Tailwind CSS v3 with custom "Unacademy" palette.
- **State:** Zustand for managing "Global Goal" state and subscription step-flow.
- **Media:** Mux or custom HLS player for live and recorded class streaming.
- **CMS:** Sanity.io or Contentlayer (to handle thousands of exam-specific landing pages and batches).
- **Payments:** Razorpay or Stripe (supporting Indian recurring mandates for long-term plans).

---

### Section 8 — Implementation Steps

1. **The Success Palette:** Setup `globals.css` with the Green/Gold variables and define the Inter-font hierarchy.
2. **Goal-Selection Engine:** Build the searchable goal-modal and the middleware that redirects users to their specific exam sub-site.
3. **Educator & Batch CMS:** Set up the data model for top-tier educators and their associated "Batch" start dates.
4. **Subscription Hub:** Implement the side-by-side comparison cards and the pricing-tier toggle logic.
5. **Classroom UI:** Build the video-centric layout with integrated live chat and poll components.

---

### Section 9 — User Experience

The user is an "Aspirant on a Mission." 
The UI must be "Efficient and Reassuring." Don't hide the "Start Learning" button—every screen should remind the user of their potential success.
The "Aha! moment" is the Top Educator list—where the student sees the expertise of the person who will help them "Crack the Exam."

---

### Section 10 — Constraints

- **No cluttered "Edu-Speak."** Use "Crack," "Batch," and "Goal" rather than "Course," "Class," or "Grade."
- **No pure black text.** Use `#1A1A1A` for a professional, academic feel.
- **No slow/laggy search.** Finding a goal among 200+ must be near-instant.
- **No hidden pricing.** Show the "Monthly cost" even for annual plans to show value.

---

## Platform Versions

### Category A — v0

Build an "Exam-Prep Mastery" edtech hub inspired by Unacademy. 
Style: Pure White background (#FFFFFF), Unacademy Green (#08BD80) and Iconic Gold (#FBB03B) accents, 8px border-radius, and bold modern Sans-serif fonts (Inter).
Include:
1. Goal-Based Discovery Portal allowing users to select from a catalog of 200+ exams.
2. "Top Educator" Grid with high-impact portraits and pedigree metadata.
3. "Plus vs. Iconic" Subscription Comparison module with side-by-side feature lists.
Use high-trust branding and an "Aspirant-Success" UI approach. No ads allowed.

---

### Category B — Cursor

In `src/app/`, implement an "Indian Edtech Discovery & Subscription Hub" (Unacademy style).
Stack: Next.js 14, Tailwind, Sanity CMS, Zustand, Razorpay.
Visual Rules: 
- Primary Color: `#08BD80` (Green)
- Accent Color: `#FBB03B` (Gold)
- Background: `#FFFFFF` (Canvas)
- Radius: `rounded-lg` (8px)
- Font: Bold Sans (e.g., Inter).

Implement:
1. `app/page.tsx` - A goal-discovery hub featuring exam category strips and massive success stats.
2. `app/(exams)/[goal]/page.tsx` - A dynamic exam sub-site with "Top Educator" cards and upcoming "Special Classes."
3. `components/subscription/PlanComparison.tsx` - A high-conversion table comparing "Plus" and "Iconic" membership tiers.
4. `components/ui/GoalModal.tsx` - A searchable overlay for switching between 200+ competitive exam goals.

Focus on "Academic Confidence" and fast-loading information density. No modern gradients or blurs. No ads.

---

### Lovable

Build an exam-prep edtech hub — "Aspirant-First, Goal-Driven" — for competitive exam students. White (#FFFFFF) canvas, Unacademy Green (#08BD80) and Iconic Gold (#FBB03B) accents, 8px border-radius.

Must include:
- Homepage: Goal switcher `<button aria-label="Change exam goal">` → opens `GoalModal`. Exam category strip: horizontal scroll `<a>` pills (UPSC, NEET, JEE, CAT, GATE, Banking) with `aria-label="Browse [exam] preparation"`. Success stats banner: `aria-label` on each stat ("3.2B+ Minutes Watched", "Over 10 Crore Learners").
- GoalModal: `position: fixed; inset: 0`. `<input type="search" placeholder="Search your exam...">`. `<ul role="listbox">` of 200+ exam options. Zustand `useGoalStore()` global state. Close via `<button aria-label="Close goal selector">` or Escape key.
- Educator grid: `<section aria-label="Top educators">`. Each: portrait `<img alt="[name], [subject] educator, [experience] years experience">` + name + subject badge + `#08BD80` follower count.
- Plan comparison `/plans`: "Plus" vs "Iconic" side-by-side cards. Feature rows: `#08BD80` checkmark for included, `#757575` dash for excluded. Subscribe links: `<a href={subscriptionUrl} rel="noopener noreferrer">` — NEVER inline Razorpay or payment form.
- Exam landing `/[goal]`: top educator cards + "Special Classes" horizontal scroll + "Structured Batches" grid with start date badges.

`prefers-reduced-motion`: modal appears instantly (no scale animation), progress bars instantly at final width. No hidden pricing — show monthly cost for all plans.

---

### ChatGPT Canvas

Let's build an exam-prep edtech platform — "ExamMaster" — for Indian competitive exam aspirants. Unacademy aesthetic.

**Design system:**
- Background: `#FFFFFF`; Surface: `#F7F7F7`; Text: `#1A1A1A`; Muted: `#757575`; Green: `#08BD80`; Gold: `#FBB03B`
- Border-radius: `8px` standard; `12px` soft educator cards
- Font: Inter weight 800 `clamp(32px, 5vw, 48px)` display tracking `-0.01em`; body `16px` weight 400 leading 1.6; exam tags `12px` bold all-caps `letter-spacing: 0.05em`

**Build iteratively:**
1. **Goal discovery homepage** — sticky nav with `GoalModal` trigger + hero ("Crack UPSC with the best") + success stats strip + exam category horizontal scroll + educator spotlight grid (3 cards)
2. **GoalModal** — `position: fixed; inset: 0` overlay + `<input type="search">` + `<ul role="listbox">` of exam options + Zustand `useGoalStore()` global state + Escape-to-close
3. **Exam landing** `/[goal]` — `generateStaticParams()` + `notFound()` — top educator cards + "Special Classes" horizontal scroll + "Structured Batches" grid with start date badges
4. **Plan comparison** `/plans` — "Plus" vs "Iconic" side-by-side. Feature rows with `#08BD80` checkmarks. External subscribe `<a href={subscriptionUrl} rel="noopener noreferrer">` buttons — NO inline payment form

Motion: GoalModal scale `0.95→1 200ms ease-out`. Progress bars width `0→final 400ms`. `prefers-reduced-motion`: modal instant, progress bars at final width immediately; `useReducedMotion()` guard.

---

### Bolt

Scaffold an exam-prep edtech platform — aspirant-first, goal-based.

Stack: Next.js 14 App Router + TypeScript + Tailwind CSS + Zustand

```css
:root {
  --bg: #FFFFFF; --surface: #F7F7F7;
  --green: #08BD80; --gold: #FBB03B;
  --ink: #1A1A1A; --muted: #757575;
  --radius: 8px;
}
body { background: var(--bg); color: var(--ink); }
```

Components:
- `GoalModal` — `position: fixed; inset: 0` + `<input type="search">` + `<ul role="listbox">` exam list + Zustand `useGoalStore()` + Escape-to-close. Scale `0.95→1 200ms`. `useReducedMotion()` → instant appearance.
- `EducatorCard` — portrait `<img alt="[name], [subject], [exp] years">` + name + `#757575` subject + `#08BD80` follower count badge.
- `PlanComparison` — Plus vs Iconic side-by-side cards. `#08BD80` check / `#757575` dash per feature row. `<a href={subscriptionUrl} rel="noopener noreferrer">` subscribe button — NO inline Razorpay or payment form.
- `ExamStrip` — horizontal scroll `<a>` pills per `ExamCategory`. `aria-label="Browse [exam] preparation"` on each link.

---

### Claude Artifacts

Build a self-contained exam-prep edtech platform. Next.js 14 App Router + TypeScript + CSS Modules.

```typescript
// src/types/index.ts
export type ExamCategory = 'upsc' | 'neet' | 'jee' | 'cat' | 'gate' | 'banking'

export interface Educator {
  id: string; name: string; subject: string
  experience: number  // years
  followers: number
  avatarSrc: string; avatarAlt: string
}

export interface Batch {
  id: string; title: string; educatorId: string
  examCategory: ExamCategory
  startDate: string  // ISO 8601
  isFree: boolean
}

export interface SubscriptionPlan {
  id: 'plus' | 'iconic'
  name: string; monthlyPrice: number; annualPrice: number
  features: { label: string; included: boolean }[]
  subscriptionUrl: string  // external — never render as inline payment
}
```

Design rules:
- `border-radius: 8px` standard; `12px` educator hero cards
- `GoalModal`: `position: fixed; inset: 0` — `<ul role="listbox">` for exam options — Zustand `useGoalStore()` required — Escape key closes modal
- `EducatorCard`: `<img alt={`${name}, ${subject} educator, ${experience} years experience`}>` — exact alt format required
- `PlanComparison`: `<a href={plan.subscriptionUrl} rel="noopener noreferrer">` subscribe button — NO Razorpay or Stripe Elements inline
- `generateStaticParams()` from ExamCategory values. `notFound()` for unknown goal slugs.

---

### Grok

Implement ExamMaster — exam-prep edtech hub for Indian competitive exam aspirants.

1. `src/app/globals.css` — `--bg: #FFFFFF; --surface: #F7F7F7; --green: #08BD80; --gold: #FBB03B; --ink: #1A1A1A; --muted: #757575; --radius: 8px` — `body { background: var(--bg); color: var(--ink); }`
2. `src/types/index.ts` — `ExamCategory` union (upsc|neet|jee|cat|gate|banking) — `Educator` interface (id, name, subject, experience, followers, avatarSrc, avatarAlt) — `Batch` interface (id, title, educatorId, examCategory, startDate, isFree) — `SubscriptionPlan` interface (id, name, monthlyPrice, annualPrice, features, subscriptionUrl)
3. `src/lib/educators.ts` — 10 mock `Educator` objects — `src/lib/plans.ts` — 2 `SubscriptionPlan` objects (plus, iconic) with feature arrays
4. `src/app/page.tsx` — sticky nav with `GoalModal` trigger + hero + success stats strip ("3.2B+ Mins Watched") + exam category horizontal scroll + educator spotlight (3 cards)
5. `src/app/[goal]/page.tsx` — `generateStaticParams()` from ExamCategory values — `notFound()` for unknown goals — top educator cards + "Special Classes" horizontal scroll + batch grid with start date badges
6. `src/components/ui/GoalModal.tsx` — `position: fixed; inset: 0` — `<input type="search">` — `<ul role="listbox">` — Zustand `useGoalStore()` — Escape-to-close — scale `0.95→1 200ms` with `useReducedMotion()` guard
7. `src/app/plans/page.tsx` — Plus vs Iconic side-by-side comparison — `#08BD80` checks / `#757575` dashes — `<a href={subscriptionUrl} rel="noopener noreferrer">` — NO inline Razorpay or Stripe Elements
8. QA: `grep -r "Razorpay\|StripeElements\|loadStripe\|CardElement" src --include="*.tsx"` → empty — `grep -r "role=\"listbox\"" src --include="*.tsx"` → GoalModal only — `npx tsc --noEmit` → 0 errors — `npm run build` passes

---

### Gemini

Design and implement an exam-prep edtech platform — "ExamMaster" — for Indian competitive exam aspirants.

**Design layer:** `#FFFFFF` background, `#F7F7F7` surface, `#1A1A1A` text, `#757575` muted, `#08BD80` Unacademy Green for CTAs/success/checkmarks, `#FBB03B` Iconic Gold for premium badges. Typography: Inter weight 800 `clamp(32px, 5vw, 48px)` display tracking `-0.01em`; body `16px` weight 400 leading 1.6; exam tags `12px` bold all-caps. `border-radius: 8px` standard, `12px` cards.

**Data layer:** `ExamCategory` union (6 values). `Educator` interface (id, name, subject, experience, followers, avatarSrc, avatarAlt). `Batch` interface (id, title, educatorId, examCategory, startDate, isFree). `SubscriptionPlan` interface (id, name, monthlyPrice, annualPrice, features, subscriptionUrl). `generateStaticParams()` for `[goal]`.

**Component layer:** `GoalModal` (`position: fixed; inset: 0`, `<ul role="listbox">`, Zustand `useGoalStore()`, Escape-to-close). `EducatorCard` (`<img alt={pedigree-format}>` + name + subject + `#08BD80` follower badge). `ExamStrip` (horizontal scroll `<a>` pills per category with `aria-label`). `PlanComparison` (Plus vs Iconic side-by-side, external subscribe `<a href rel="noopener noreferrer">` — NO inline payment). `BatchGrid` (start date badges + educator byline).

**Motion layer:** GoalModal: scale `0.95→1 200ms ease-out`. Progress bars: width `0→final 400ms`. `prefers-reduced-motion`: modal instant, progress bars at final width immediately; `useReducedMotion()` guard on all Framer Motion components.
