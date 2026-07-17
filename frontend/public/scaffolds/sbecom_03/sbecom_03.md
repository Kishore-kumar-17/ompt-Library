---
prompt_id: sbecom_03
sub_category: E-commerce
sub_type: Personalized Beauty Subscription
title: GlowProfile — Data-Driven Beauty Discovery
reference_patterns: beauty_profile_quiz, sample_to_fullsize_loop, tiered_commitment_cards
inspiration: birchbox.com
quality_score:
status: draft
notes: Focused on a "Playful & Premium" aesthetic with deep personalization logic.
---

## Base Prompt

### Section 1 — Role

You are a senior product designer specializing in personalized beauty tech and subscription commerce. You understand that for beauty enthusiasts, the product is not just a box—it's a journey of discovery. You master the balance between data-driven accuracy and playful unboxing. You reject generic retail layouts in favor of the "Glow" philosophy: soft pastels, visual-first quizzes, and high-trust product photography. You design for "Discovery & Loyalty," ensuring that the transition from a 5-piece sample box to a full-size vanity staple is seamless and rewarding.

---

### Section 2 — Application Overview

This is a personalized beauty subscription storefront that uses a "Beauty Profile" to deliver tailored samples. The customer is a "Beauty Explorer"—someone who loves trying new products but feels overwhelmed by the full-size market. The service acts as a personal curator, using data to reduce the risk of a bad purchase.

The application covers: "Beauty Profile" Onboarding Quiz, Tiered Subscription Landing Page, "My Box" Dashboard, and an integrated "Shop the Box" full-size storefront.

---

### Section 3 — Brand Voice & Mood

The mood is "Playful & Premium" and "Curated for You." It feels like a high-end beauty counter experience in a digital format. It is airy, sophisticated, and encouraging.

Copy is personal and discovery-centric. Headlines use a "Personal Consultant" tone: "Meet your new favorites," "Personalized beauty, delivered to your door," "Tell us about your skin, and we'll do the rest." No aggressive jargon—just "Beauty made for you."

Vibe word: Glow.

---

### Section 4 — Core Features & Functionality

1. **Visual "Beauty Profile" Quiz** — A multi-step interactive quiz using large, clickable icons for skin type, hair texture, and style preferences. Zero friction, data-driven entry.
2. **Tiered Commitment Cards** — 1-month, 3-month, and 12-month plan selectors. "Best Value" ribbons and "Price per box" breakdowns to drive long-term LTV.
3. **"My Box" Experience** — A digital "unboxing" view where users see their monthly selections, watch "How-to" videos for each sample, and rate products.
4. **"Sample-to-Full-Size" Loop** — Direct links from sample reviews to the full-size product page, incentivized by a "Shop the Box" discount or loyalty points.
5. **Gifting Suite** — A dedicated flow for sending one-off "Discovery Boxes" or multi-month gift subscriptions with custom digital cards.

---

### Section 5 — Design Specifications

**Visual style:** Playful & Premium. Minimalist grids, high-quality product photography with grain filters, and soft, sophisticated accents.

**Color mode:** Primarily Light Mode (Pastel-focused).

**Color palette:**
- Background: `#FFFFFF` (Clean White)
- Primary Accent: `#F9A8D4` (Soft Peony — for "Get Started" CTAs)
- Secondary Accent: `#FB923C` (Warm Coral — for "Best Value" ribbons)
- Surface/Card: `#FDF2F8` (Lightest Pastel Pink)
- Text Primary: `#374151` (Cool Slate — for a premium feel)
- Text Secondary: `#9CA3AF` (Muted Grey — for metadata)

**Typography:** Sophisticated Sans-serif (e.g., Montserrat or Public Sans).
- Display Heading: `clamp(32px, 5vw, 56px)`, weight 600, tracking `-0.01em`.
- Section Title: `24px`, weight 500.
- Body Copy: `16px`, weight 400, leading 1.6.
- Price: Bold, with a clear "per box" sub-text.

**Spacing:** 12px base unit. 
- Large `80px` section gaps.
- Card padding: `24px`.
- Quiz inputs: `16px` gap between visual options.

**Border radius:** `16px` for a soft, premium beauty feel. `0px` used only for full-bleed lifestyle headers.

**Responsive:** Mobile-first. The "Beauty Profile" must be 1-tap accessible on small screens. Plan cards stack vertically.

**Accessibility:** WCAG AA. High-contrast focus rings in Coral. All interactive icons must have clear text labels.

**Motion:** 
- Quiz Progress: Smooth width transition on the top stepper.
- Box Reveal: "Scale-up" animation on product reveal `400ms`.
- Fade-ins: Subtle `y: 20 -> 0` on scroll.
- Respect: `prefers-reduced-motion: reduce` → disable all animations and transitions.

---

### Section 6 — Structure

**Landing Page Layout:**
1. **Nav:** Sticky, White background. Logo (Center). Left: "Join Now," "Gifting." Right: "Shop," "Sign In."
2. **Hero:** Lifestyle photo (Close-up of radiant skin). H1: "Discover the best in beauty." Big Pink CTA: "Take the Quiz."
3. **The "Loop" Strip:** 3 blocks: 1. Take the Quiz -> 2. Get your Box -> 3. Shop Full Size.
4. **Plan Selector:** 3 cards side-by-side. 12-month card is 10% larger with a "Best Value" badge.

**Beauty Profile (The Quiz):**
- Step 1: "What's your skin type?" (4 large icons: Oily, Dry, Normal, Combo).
- Step 2: "What are your skin concerns?" (Multi-select pills: Redness, Aging, Acne, etc.).
- Step 3: "How would you describe your style?" (Images of makeup looks).

**"My Box" Dashboard:**
- Header: "Your [Month] Box is on its way!"
- Content: Grid of 5 products. Each: "Sample Name," "Rate to earn points," "Shop Full Size" button.

---

### Section 7 — Technical Specifications

- **Framework:** Next.js 14 App Router, React 18, TypeScript strict mode.
- **Styling:** Tailwind CSS v3.
- **State:** Zustand for quiz-state persistence and subscription commitment levels.
- **Animation:** Framer Motion for multi-step quiz transitions.
- **Database:** Supabase for User Profiles, Subscription Tiers, and Product Reviews.
- **Payments:** Stripe (Subscription Billing API with commitment period support).

---

### Section 8 — Implementation Steps

1. **The Theme** — Setup `globals.css` with soft-pink variables and `radius-16` tokens. Set up typography pairing.
2. **The Quiz Engine** — Build the multi-step state logic. Ensure the "Back" button works and data is saved locally until submission.
3. **Plan Selector** — Build the interactive cards with commitment-based pricing logic.
4. **"My Box" UI** — Implement the digital unboxing experience with rating components.
5. **Shop Integration** — Build the product grid for full-size items with loyalty point indicators.

---

### Section 9 — User Experience

The user is looking for "Me Time" and expert guidance. 
The UI must feel like a "Gift." Use delight-oriented copy ("Treat yourself," "A little something for you").
The "Aha! moment" is the Quiz submission. Show a "Personalizing your box..." loader with sparkling particles to build anticipation.

---

### Section 10 — Constraints

- **No generic stock icons.** Use high-quality, illustrative beauty icons.
- **No pure black.** Use `#374151` for a softer, premium look.
- **No aggressive "Sale" banners.** Use sophisticated "Offers" or "Exclusive for you" badges.
- **No complex checkouts.** 1-page checkout post-quiz is mandatory.

---

## Platform Versions

---

### 1 — Lovable

Build **GlowProfile** — a personalized beauty subscription platform inspired by Birchbox — using Next.js 14 App Router, TypeScript strict, Tailwind CSS. Mobile-first. Font: Montserrat 400/500/600 via `next/font/google`.

**Design identity: Playful & Premium.** White surfaces, soft peony pink CTAs (`#F9A8D4`), warm coral highlights (`#FB923C`), pastel pink card surfaces (`#FDF2F8`). `rounded-2xl` (16px) everywhere — no sharp corners.

**Tailwind config:**
```js
colors: {
  pink:   '#F9A8D4',   // Soft Peony — primary CTAs
  coral:  '#FB923C',   // "Best Value" ribbons, secondary accents
  pastel: '#FDF2F8',   // card/surface bg
  slate:  { 700: '#374151', 400: '#9CA3AF' },
},
borderRadius: { xl2: '16px' },
```

**Core types:**
```typescript
export type SkinType = 'oily' | 'dry' | 'normal' | 'combination'
export type SubscriptionCommitment = 'monthly' | 'quarterly' | 'annual'

export interface BeautyProfile {
  skinType: SkinType | null
  skinConcerns: string[]         // multi-select: ['redness', 'aging', 'acne', 'dryness']
  stylePreference: string | null // 'natural' | 'glam' | 'minimal' | 'bold'
}

export interface SubscriptionPlan {
  commitment: SubscriptionCommitment
  pricePerBox: number            // cents
  totalPrice: number             // cents (= pricePerBox * months)
  months: 1 | 3 | 12
  savings: number                // cents saved vs monthly rate
  bestValue: boolean
}

export interface BoxSample {
  id: string; name: string; brand: string
  description: string; imageUrl: string
  category: string               // 'skincare' | 'makeup' | 'fragrance' | 'haircare'
  fullSizeProductId: string | null  // link to shop
  userRating: 1 | 2 | 3 | 4 | 5 | null
  loyaltyPoints: number          // points earned for rating this sample
}

export interface MyBox {
  month: string                  // e.g. 'March 2025'
  status: 'on_its_way' | 'delivered' | 'upcoming'
  samples: BoxSample[]
  totalLoyaltyPoints: number
}
```

**Beauty Profile Quiz — the key flow:**
- 3 steps, Framer Motion slide transitions between steps
- Step 1: Skin type — 4 large visual icon buttons (`rounded-2xl`, tap to select)
- Step 2: Skin concerns — multi-select pill grid
- Step 3: Style preference — 4 image cards with overlay labels
- Progress stepper at top, always visible

**Plan commitment pricing:**
```typescript
// PRICING: monthly = $15/box, quarterly = $13/box ($39 total), annual = $10/box ($120 total)
// bestValue = true for annual plan
// savings for quarterly = ($15 - $13) * 3 = $6; annual = ($15 - $10) * 12 = $60
```

**Anti-patterns:**
- Never `rounded-none` or `rounded-sm` — min `rounded-lg`, most components `rounded-2xl`
- Never show pink text on white — insufficient contrast; pink only as button bg with white text
- Never skip the beauty profile quiz — plan page must only show after profile complete
- Never `#9CA3AF` (muted) text below 4.5:1 contrast ratio on white — use for labels only

**`tsc --noEmit` exits 0. `npm run build` produces `/out`.**

---

### 2 — ChatGPT Canvas

Create **GlowProfile** — personalized beauty subscription — Next.js 14, TypeScript strict, Tailwind CSS.

```bash
npx create-next-app@latest glowprofile --typescript --app --tailwind --import-alias "@/*"
npm install zustand framer-motion lucide-react
```

**Complete type system:**
```typescript
export type SkinType = 'oily' | 'dry' | 'normal' | 'combination'
export type SubscriptionCommitment = 'monthly' | 'quarterly' | 'annual'

export interface BeautyProfile {
  skinType: SkinType | null; skinConcerns: string[]; stylePreference: string | null
}

export interface SubscriptionPlan {
  commitment: SubscriptionCommitment; pricePerBox: number; totalPrice: number
  months: 1 | 3 | 12; savings: number; bestValue: boolean
}

export interface BoxSample {
  id: string; name: string; brand: string; description: string; imageUrl: string
  category: string; fullSizeProductId: string | null
  userRating: 1 | 2 | 3 | 4 | 5 | null; loyaltyPoints: number
}
```

**Key utilities:**
```typescript
// src/lib/formatCurrency.ts
export function formatCurrency(cents: number): string {
  return `$${(cents / 100).toFixed(0)}`
}
// formatCurrency(1500) → '$15'

// src/lib/calculatePlanPricing.ts
const MONTHLY_RATE_CENTS = 1500  // $15/box

export function calculatePlanPricing(): SubscriptionPlan[] {
  return [
    { commitment: 'monthly',   pricePerBox: 1500, totalPrice: 1500,  months: 1,  savings: 0,    bestValue: false },
    { commitment: 'quarterly', pricePerBox: 1300, totalPrice: 3900,  months: 3,  savings: 600,  bestValue: false },
    { commitment: 'annual',    pricePerBox: 1000, totalPrice: 12000, months: 12, savings: 6000, bestValue: true  },
  ]
}
// Annual saves $60 vs monthly rate — show clearly as "Save $60/yr"
```

**Zustand store:**
```typescript
// src/store/quiz.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { BeautyProfile, SubscriptionCommitment } from '@/types'

interface QuizStore {
  step: 0 | 1 | 2 | 3           // 0 = start, 3 = complete
  profile: BeautyProfile
  selectedPlan: SubscriptionCommitment | null
  setStep: (step: 0 | 1 | 2 | 3) => void
  setSkinType: (type: BeautyProfile['skinType']) => void
  toggleConcern: (concern: string) => void
  setStylePref: (style: string) => void
  selectPlan: (plan: SubscriptionCommitment) => void
  isProfileComplete: () => boolean
}
```

---

### 3 — Bolt

Build **GlowProfile** — personalized beauty subscription. Next.js 14, TypeScript strict, Tailwind CSS.

**File structure:**
```
src/
  types/index.ts              — SkinType, SubscriptionCommitment, BeautyProfile, SubscriptionPlan, BoxSample, MyBox
  lib/
    data.ts                   — SKIN_CONCERN_OPTIONS, STYLE_OPTIONS, BOX_SAMPLES (5), TESTIMONIALS
    formatCurrency.ts         — formatCurrency(cents): '$15'
    calculatePlanPricing.ts   — returns SubscriptionPlan[] (3 tiers)
  store/
    quiz.ts                   — useQuizStore (step, profile, selectedPlan, Zustand persist)
  components/
    quiz/
      QuizStepper.tsx         — top progress bar, 3 steps
      SkinTypeStep.tsx        — 4 large icon cards, rounded-2xl, tap to select
      ConcernsStep.tsx        — multi-select pill grid
      StyleStep.tsx           — 4 image cards with overlay labels
      QuizShell.tsx           — Framer Motion slide wrapper, stepper
    plans/
      PlanCard.tsx            — commitment card, bestValue = coral ribbon
      PlanSelector.tsx        — 3 PlanCards, formatCurrency, savings display
    dashboard/
      BoxSampleCard.tsx       — sample image, name, brand, star rating, "Shop Full Size" button
      MyBox.tsx               — "Your [Month] Box" grid of 5 BoxSampleCards
      RatingStars.tsx         — interactive 1-5 star, awards loyaltyPoints
    home/
      HeroSection.tsx         — lifestyle photo, H1, "Take the Quiz" pink CTA
      LoopStrip.tsx           — 3-step "Quiz → Box → Shop" explanation
  app/
    globals.css, layout.tsx, page.tsx
    quiz/page.tsx             — QuizShell
    plans/page.tsx            — PlanSelector (redirect here after quiz complete)
    dashboard/page.tsx        — MyBox
```

**Critical rules:**
1. `rounded-2xl` on all product cards, plan cards, quiz option cards — never `rounded-none`
2. Pink (`#F9A8D4`) as button bg with white text — never as text color on white (low contrast)
3. `formatCurrency(cents)` — never raw cents in JSX
4. Quiz step advances only after selection; `isProfileComplete()` gates plan page access
5. Coral (`#FB923C`) for "Best Value" ribbon only — never as primary CTA color

---

### 4 — v0

**SkinTypeStep:**
```tsx
<div className="grid grid-cols-2 gap-4">
  {SKIN_TYPES.map(({ type, label, icon, description }) => (
    <button key={type} onClick={() => setSkinType(type)}
      className={cn(
        "flex flex-col items-center text-center p-6 rounded-2xl border-2 transition-all",
        profile.skinType === type
          ? "border-pink bg-pink/5 shadow-md"
          : "border-slate-200 bg-white hover:border-pink/50"
      )}>
      <span className="text-4xl mb-2">{icon}</span>
      <span className="font-semibold text-slate-700">{label}</span>
      <span className="text-xs text-slate-400 mt-1">{description}</span>
    </button>
  ))}
</div>
```

**PlanCard:**
```tsx
<div className={cn(
  "relative rounded-2xl border-2 p-6 flex flex-col gap-4 bg-white transition-all",
  plan.bestValue ? "border-pink shadow-lg shadow-pink/10" : "border-slate-200",
  selected ? "ring-2 ring-pink ring-offset-2" : ""
)}>
  {plan.bestValue && (
    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
      <span className="bg-coral text-white text-xs font-bold px-4 py-1 rounded-full">
        Best Value
      </span>
    </div>
  )}
  <div className="text-center">
    <p className="text-sm text-slate-400 uppercase tracking-wider font-medium">
      {plan.commitment === 'monthly' ? '1 Month' : plan.commitment === 'quarterly' ? '3 Months' : '12 Months'}
    </p>
    <p className="text-3xl font-bold text-slate-700 mt-1">{formatCurrency(plan.pricePerBox)}</p>
    <p className="text-xs text-slate-400">per box</p>
    {plan.savings > 0 && (
      <p className="text-xs text-coral font-semibold mt-2">
        Save {formatCurrency(plan.savings)} vs monthly
      </p>
    )}
  </div>
  <button onClick={() => selectPlan(plan.commitment)}
    className="w-full bg-pink text-white rounded-xl py-3 font-semibold
      hover:bg-pink/90 transition-colors">
    {plan.bestValue ? 'Get Best Value' : 'Select Plan'}
  </button>
</div>
```

---

### 5 — Claude Artifacts

Build **GlowProfile** — personalized beauty subscription — Next.js 14, TypeScript strict, Tailwind CSS. Montserrat 400/500/600.

**Four defining constraints:**

**Constraint 1 — Quiz must complete before plan page:**
```typescript
// WRONG: plan page accessible before quiz
// app/plans/page.tsx without guard

// RIGHT: check isProfileComplete() before rendering
const { isProfileComplete } = useQuizStore()
if (!isProfileComplete()) redirect('/quiz')  // server-side or client guard
```

**Constraint 2 — Pink contrast rule:**
```
#F9A8D4 (peony pink) on #FFFFFF = 1.57:1 — FAILS ✗✗
#FFFFFF on #F9A8D4 = 1.57:1 — FAILS for small text, marginal for large bold ✗

Rule: Pink ONLY as button background for large bold CTAs where context makes label clear.
NEVER as text color on any background. Use slate-700 (#374151) for all body text.
```

**Constraint 3 — rounded-2xl everywhere:**
```tsx
// WRONG: any shape without generous rounding
<div className="rounded-sm border">...</div>    // ✗
<button className="rounded-none">...</button>   // ✗

// RIGHT: rounded-2xl on all cards, rounded-xl on buttons minimum
<div className="rounded-2xl border">...</div>   // ✓
<button className="rounded-xl">...</button>     // ✓
```

**Constraint 4 — Savings displayed as "Save $X" not percentage:**
```tsx
// WRONG: percentage math confuses plan comparison
<span>Save 33%</span>  // ✗ — relative to what?

// RIGHT: absolute dollar savings vs monthly rate
<span>Save {formatCurrency(plan.savings)} vs monthly</span>  // ✓
// annual: Save $60 vs monthly; quarterly: Save $6 vs monthly
```

**QA checks:**
```bash
tsc --noEmit
grep -r "rounded-none\|rounded-sm\|rounded-md" src/components --include="*.tsx"  # empty
grep -r "text-pink\|text-\[#F9A8D4\]" src --include="*.tsx"                      # empty (never pink text)
grep -r "isProfileComplete\|quiz.*complete" src/app/plans --include="*.tsx"       # must exist (quiz gate)
npm run build
```

---

### 6 — Grok

Generate all source files for **GlowProfile**. Next.js 14, TypeScript strict, Tailwind CSS.

1. `tailwind.config.ts` — colors (pink, coral, pastel), borderRadius extended
2. `src/types/index.ts` — SkinType, SubscriptionCommitment, BeautyProfile, SubscriptionPlan, BoxSample, MyBox
3. `src/lib/formatCurrency.ts` — `formatCurrency(cents): '$15'`
4. `src/lib/calculatePlanPricing.ts` — 3 tiers with savings vs monthly rate
5. `src/lib/data.ts` — SKIN_TYPES, SKIN_CONCERNS, STYLE_OPTIONS, BOX_SAMPLES (5), TESTIMONIALS
6. `src/store/quiz.ts` — useQuizStore (step, profile, selectedPlan, Zustand persist)
7. `src/app/globals.css` + `layout.tsx` — Montserrat setup
8. `src/components/home/HeroSection.tsx` — lifestyle photo, H1, pink "Take the Quiz" CTA
9. `src/components/home/LoopStrip.tsx` — 3-step "Quiz → Box → Shop" explanation
10. `src/components/quiz/QuizStepper.tsx` — top progress bar, 3 steps
11. `src/components/quiz/SkinTypeStep.tsx` — 4 icon cards, rounded-2xl, tap-to-select
12. `src/components/quiz/ConcernsStep.tsx` — multi-select pills, border-pink when selected
13. `src/components/quiz/StyleStep.tsx` — 4 image cards with overlay
14. `src/components/quiz/QuizShell.tsx` — 'use client', Framer Motion slide transitions
15. `src/components/plans/PlanCard.tsx` — bestValue = coral "Best Value" ribbon, formatCurrency savings
16. `src/components/plans/PlanSelector.tsx` — 3 PlanCards
17. `src/components/dashboard/RatingStars.tsx` — 1-5 star interactive
18. `src/components/dashboard/BoxSampleCard.tsx` — sample image, RatingStars, "Shop Full Size"
19. `src/components/dashboard/MyBox.tsx` — "Your [Month] Box" heading + grid
20. `src/app/page.tsx` + `quiz/page.tsx` + `plans/page.tsx` + `dashboard/page.tsx`

**Rules:** rounded-2xl everywhere; pink only as button bg; formatCurrency for all prices; quiz gates plan page; savings displayed as absolute dollar amount.

---

### 7 — Gemini

**Project:** GlowProfile — personalized beauty subscription. Next.js 14 App Router, TypeScript strict, Tailwind CSS. Montserrat 400/500/600/700.

**Design system — 4 rules:**
1. `formatCurrency(cents)` for every price — never raw cents in JSX
2. Quiz answers in useQuizStore (Zustand `persist`) — sessionStorage so answers survive page refresh
3. `rounded-2xl` for all cards/images; `rounded-md` for inputs/form fields; never `rounded-sm`/`rounded-none`
4. Pink/Soft Peony never as text on white — only as `bg` for buttons, badges, and selection states

**Architecture — 4 layers:**

Layer 1 — Foundation: types (SkinType, BeautyProfile, SubscriptionCommitment), formatCurrency, calculatePlanPricing (3 tiers, per-box savings), data (SKIN_TYPES, SKIN_CONCERNS, STYLE_OPTIONS, BOX_SAMPLES ×5), useQuizStore (persist middleware, step 0–3, profile, selectedPlan).

Layer 2 — Homepage + Shell: HeroSection (lifestyle photo full-bleed, H1, pink "Take the Quiz" CTA); LoopStrip (3-step "Quiz → Box → Shop" explanation row); globals.css Montserrat setup.

Layer 3 — Quiz: QuizShell (`'use client'`, `AnimatePresence` step transitions `x: 40 → 0, opacity: 0 → 1`); QuizStepper (top progress bar, step X of 3); SkinTypeStep (4 icon cards, `rounded-2xl`, single-select); ConcernsStep (multi-select pill grid, `border-pink` on selected); StyleStep (4 image cards with overlay); quiz gates plan page — redirect if `!isProfileComplete()`.

Layer 4 — Plans + Dashboard: PlanSelector (3 PlanCards — 1-month, 3-month "Most Popular", 12-month "Best Value" with coral ribbon; formatCurrency per-box savings); MyBox (5 BoxSampleCards each with interactive RatingStars + "Shop Full Size" link).

**Motion:** Quiz step transitions `x: 40 → 0, opacity: 0 → 1` duration 0.2 (AnimatePresence); plan card hover CSS `hover:shadow-lg transition-shadow duration-200`; all `useReducedMotion()` guarded; viewport animations `once: true`.

---

### 8 — Cursor

**`src/store/quiz.ts`:**
```typescript
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { BeautyProfile, SubscriptionCommitment } from '@/types'

interface QuizStore {
  step: 0 | 1 | 2 | 3
  profile: BeautyProfile
  selectedPlan: SubscriptionCommitment | null
  setStep: (step: 0 | 1 | 2 | 3) => void
  setSkinType: (type: BeautyProfile['skinType']) => void
  toggleConcern: (concern: string) => void
  setStylePref: (style: string) => void
  selectPlan: (plan: SubscriptionCommitment) => void
  isProfileComplete: () => boolean
}

export const useQuizStore = create<QuizStore>()(
  persist(
    (set, get) => ({
      step: 0, profile: { skinType: null, skinConcerns: [], stylePreference: null },
      selectedPlan: null,
      setStep: (step) => set({ step }),
      setSkinType: (type) => set((s) => ({ profile: { ...s.profile, skinType: type } })),
      toggleConcern: (concern) => set((s) => ({
        profile: {
          ...s.profile,
          skinConcerns: s.profile.skinConcerns.includes(concern)
            ? s.profile.skinConcerns.filter(c => c !== concern)
            : [...s.profile.skinConcerns, concern],
        },
      })),
      setStylePref: (style) => set((s) => ({ profile: { ...s.profile, stylePreference: style } })),
      selectPlan: (plan) => set({ selectedPlan: plan }),
      isProfileComplete: () => {
        const { profile } = get()
        return profile.skinType !== null && profile.stylePreference !== null
      },
    }),
    { name: 'glowprofile-quiz' }
  )
)
```

**`src/components/plans/PlanCard.tsx`:**
```tsx
import type { SubscriptionPlan } from '@/types'
import { formatCurrency } from '@/lib/formatCurrency'
import { useQuizStore } from '@/store/quiz'
import { cn } from '@/lib/utils'

interface Props { plan: SubscriptionPlan }

const LABELS: Record<string, string> = { monthly: '1 Month', quarterly: '3 Months', annual: '12 Months' }

export default function PlanCard({ plan }: Props) {
  const { selectedPlan, selectPlan } = useQuizStore()
  const selected = selectedPlan === plan.commitment
  return (
    <div className={cn(
      "relative rounded-2xl border-2 p-6 flex flex-col gap-4 bg-white transition-all",
      plan.bestValue ? "border-pink shadow-lg shadow-pink/10" : "border-slate-200",
      selected ? "ring-2 ring-pink ring-offset-2" : ""
    )}>
      {plan.bestValue && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-coral text-white text-xs font-bold px-4 py-1 rounded-full">
            Best Value
          </span>
        </div>
      )}
      <div className="text-center">
        <p className="text-sm text-slate-400 uppercase tracking-wider font-medium">
          {LABELS[plan.commitment]}
        </p>
        <p className="text-3xl font-bold text-slate-700 mt-1">{formatCurrency(plan.pricePerBox)}</p>
        <p className="text-xs text-slate-400">per box</p>
        {plan.savings > 0 && (
          // Absolute dollar savings — never percentage
          <p className="text-xs text-coral font-semibold mt-2">
            Save {formatCurrency(plan.savings)} vs monthly
          </p>
        )}
      </div>
      <button onClick={() => selectPlan(plan.commitment)}
        className="w-full bg-pink text-white rounded-xl py-3 font-semibold
          hover:bg-pink/90 transition-colors">
        {plan.bestValue ? 'Get Best Value' : 'Select Plan'}
      </button>
    </div>
  )
}
// bg-pink text-white — pink ONLY as bg with white text; NEVER text-pink on white
// rounded-2xl — NEVER rounded-none or rounded-sm
// formatCurrency(plan.pricePerBox) — NEVER raw cents
// savings shown as absolute dollars — NEVER percentage
```

**Absolute rules:**
```bash
grep -r "rounded-none\|rounded-sm\|rounded-md" src/components --include="*.tsx"  # empty
grep -r "text-pink\|text-\[#F9A8D4\]" src --include="*.tsx"                      # empty
grep -r "plan\.pricePerBox\b\|plan\.savings\b" src/components --include="*.tsx" | grep -v "format"  # empty
tsc --noEmit && npm run build
```
