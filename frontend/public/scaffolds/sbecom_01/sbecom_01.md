---
prompt_id: sbecom_01
sub_category: E-commerce
sub_type: Subscription Meal-Kit Storefront
title: FreshZest — Vibrant Subscription & Meal Onboarding
reference_patterns: multi_step_onboarding, subscription_plan_selector, reward_based_checkout
inspiration: hellofresh.com
quality_score:
status: draft
notes: High-conversion subscription flow with a focus on "Zest" design system principles.
---

## Base Prompt

### Section 1 — Role

You are a senior product designer specializing in subscription-based e-commerce and meal-kit logistics. You understand that for subscription services, the onboarding flow *is* the product. You master the balance between low-friction entry and high-fun reward. You reject clinical, "tech-heavy" layouts in favor of the "Zest" philosophy: vibrant, edible colors, high-quality food photography, and "cooking gesture" illustrations. You design for "Sustainable Subscription," ensuring that plan selection, payment, and meal customization feel like an exciting culinary journey rather than a logistics form.

---

### Section 2 — Application Overview

This is a meal-kit subscription platform where users sign up for weekly boxes of fresh ingredients and recipes. The customer is a busy professional or a family looking to eat healthy, home-cooked meals without the mental load of grocery shopping. The service must feel reliable, premium, and "fresh."

The application covers: Landing Page (Value Prop), Multi-Step Onboarding (Plan Selection -> Account -> Delivery -> Payment), and a post-payment "Meal Picker" (The Aha! moment).

---

### Section 3 — Brand Voice & Mood

The mood is "Fresh & Vibrant" and "Wholesome & Reliable." It feels like a sunny kitchen on a Saturday morning. It is energetic, clean, and appetizing.

Copy is friendly and encouraging. Headlines use a "Reward-First" tone: "Dinner is solved," "Fresh ingredients delivered to your door," "Your first box is $X off." It uses "quirky" stickers and handwritten script callouts to signal a "homemade" feel.

Vibe word: Fresh.

---

### Section 4 — Core Features & Functionality

1. **Multi-Step Plan Selector** — Interactive cards for "Meat & Veggies," "Family Friendly," "Quick & Easy." Toggle for "Number of people" and "Meals per week" that updates pricing in real-time.
2. **Persistent Progress Indicator** — A clean stepper at the top of the onboarding flow to manage the "subscription anxiety" of a multi-screen process.
3. **Progressive Disclosure Checkout** — Address, delivery window, and payment broken into micro-steps. High-contrast "Salem Green" CTAs for the next step.
4. **The "Reward" Meal Picker** — High-vibrancy recipe cards with dietary tags (Low-carb, Protein-packed, Veggie). Grid-based selection with a "Box is Full" status bar.
5. **Subscription Manager** — A post-onboarding dashboard for "Skipping a week," "Managing Box Size," and "Viewing Past Deliveries."

---

### Section 5 — Design Specifications

**Visual style:** Vibrant Culinary. Large photography, shifting grid layouts, and "Zest" illustrative gestures.

**Color mode:** Primarily Light Mode.

**Color palette:**
- Primary Brand: `#067A46` (Salem Green — high-trust, edible green)
- Accent: `#9ECE1A` (Summer Lime — for highlights and "New" tags)
- Background: `#FFFFFF` (Pure White)
- Surface/Card: `#F8F8F8` (Lightest Grey)
- Text Primary: `#242424` (Mine Shaft — soft off-black)
- Info: `#3AA4CB` (Peacock Blue)
- Payout/Loyalty: `#2455C2` (Special Navy)

**Typography:** Custom Sans + Quirky Script.
- Brand Sans: Geometric Sans-serif (e.g., Montserrat or Public Sans). Weight 700 for headings, 400 for body.
- Script/Stickers: Handwritten script font (e.g., Caveat or Indie Flower) for "Chef's Choice" or "50% Off" callouts.
- Display H1: `48px`, Weight 800, tracking `-0.01em`.
- Recipe Title: `18px`, Weight 700.

**Spacing:** 8px base unit. 
- Large `80px` section padding.
- Card padding: `24px`.
- Input spacing: `16px`.

**Border radius:** `8px` for buttons and cards. `16px` for large lifestyle images.

**Responsive:** Mobile-first. Onboarding cards stack vertically on small screens. Progress bar remains fixed at the top.

**Accessibility:** WCAG AA. All CTAs on `#FFFFFF` must use `#067A46`. Focus rings: `2px solid #067A46` with `2px` offset.

**Motion:** 
- Step Transitions: Slide-in/Slide-out `300ms ease-out`.
- Recipe Hover: Subtle zoom `scale(1.02)`.
- Progress Bar: Smooth width transition.
- All animations respect `prefers-reduced-motion`.

---

### Section 6 — Structure

**Onboarding Landing Page Layout:**
1. **Nav:** Minimal. Logo left. Right: "Sign In," "View Menu." 
2. **Hero:** Lifestyle photo (Happy family cooking). H1 centered. Big CTA: "Select Your Plan."
3. **Plan Grid:** 3 cards. Each card: Icon, Name, Short description, "Select" button.

**Plan Configuration (Step 1):**
- Top: Progress Stepper (1. Plan -> 2. Account -> 3. Delivery -> 4. Payment).
- Left: "Personalize your plan" options.
- Right: "Order Summary" card that stays sticky (Subtotal, Shipping, Discount).

**Meal Picker (Post-Payment):**
- Header: "Pick your meals for [Date]."
- Box Status: `X of 3 meals selected` progress bar.
- Grid: Recipe cards. Card: Image, Title, Tags (Dietary), "Add to Box" button.

---

### Section 7 — Technical Specifications

- **Framework:** Next.js 14, React 18, TypeScript strict.
- **Styling:** Tailwind CSS. 
- **State:** Zustand or React Context for the multi-step form state and "Meal Box" selection.
- **Animation:** Framer Motion for the multi-step transitions and progress bar.
- **Images:** High-resolution WebP for recipe photos. Next.js `<Image>` for optimization.
- **Validation:** Zod + React Hook Form for delivery/payment steps.

---

### Section 8 — Implementation Steps

1. **The Tokens:** Define the `salem-green` and `summer-lime` colors in Tailwind. Set up the dual-font system (Sans + Script).
2. **The Stepper Shell:** Build the layout for the multi-step onboarding with the persistent progress bar and sticky summary card.
3. **Plan Selector:** Build the interactive logic for updating prices based on people/meal count.
4. **Meal Picker:** Implement the "Add to Box" grid with the persistent status bar.
5. **Marketing Landing:** Build the Hero and social proof sections.

---

### Section 9 — User Experience

The user is making a financial commitment (subscription). 
The UI must provide "Constant Reassurance." Use social proof ("1M+ Reviews") and "Cancel Anytime" messaging near every CTA.
The Meal Picker is the "Dopamine Hit." Make it colorful and satisfying to "fill the box."

---

### Section 10 — Constraints

- **No dark patterns.** "Cancel anytime" must be clear.
- **No pure black.** Use `#242424`.
- **No generic icons.** Use "Cooking Gesture" or culinary-themed SVGs.
- **No technical jargon.** Use "Box," "Recipe," "Ingredients"—not "Package," "SKU," "Components."
- **No hidden costs.** Order Summary must be visible throughout the flow.

---

## Platform Versions

---

### 1 — Lovable

Build **FreshZest** — a vibrant meal-kit subscription onboarding platform inspired by HelloFresh — using Next.js 14 App Router, TypeScript strict, Tailwind CSS. Mobile-first. Font: Montserrat 400/700/800 (primary) + Caveat 700 (script stickers) via `next/font/google`.

**Design identity: Fresh & Vibrant.** White surfaces, Salem Green CTAs (`#067A46`), lime accent (`#9ECE1A`), Caveat script for "Chef's Choice" and discount stickers. The multi-step onboarding *is* the product — it must feel like a fun culinary journey, not a form.

**Tailwind config extension:**
```js
theme: {
  extend: {
    colors: {
      green:  '#067A46',    // Salem Green — primary CTAs, focus rings
      lime:   '#9ECE1A',    // Summer Lime — highlights, tags, "New" badges
      navy:   '#2455C2',    // loyalty/payout accents
      slate:  '#242424',    // primary text (never pure black)
    },
    fontFamily: {
      sans:   ['Montserrat', 'sans-serif'],
      script: ['Caveat', 'cursive'],        // sticker labels only
    },
  },
}
```

**Core types unique to this build:**
```typescript
export type MealPlan = 'meat_and_veggies' | 'family_friendly' | 'quick_and_easy' | 'veggie'
export type OnboardingStep = 'plan' | 'account' | 'delivery' | 'payment' | 'meals'

export interface PlanConfig {
  planType: MealPlan
  servings: 2 | 4 | 6       // people count
  mealsPerWeek: 2 | 3 | 4 | 5
}

export interface PlanPricing {
  pricePerServing: number    // cents per serving
  totalWeeklyPrice: number   // cents = pricePerServing * servings * mealsPerWeek
  originalPrice: number      // before subscription discount
  savingsPercent: number     // e.g. 18 = 18% off
}

export interface Recipe {
  id: string; title: string; description: string
  imageUrl: string; prepTimeMinutes: number
  tags: string[]             // ['Low-carb', 'Quick', 'Family-friendly', 'Protein-packed']
  chefPick: boolean          // true = Caveat "Chef's Choice" sticker
  calorieStat: string        // e.g. '650 cal/serving'
}

export interface BoxSelection {
  selectedRecipeIds: string[]
  maxRecipes: number         // = PlanConfig.mealsPerWeek
}
```

**The stepper constraint** — progress stepper is sticky at top during all onboarding steps. `OrderSummary` sidebar is sticky on desktop. Both update reactively from Zustand.

**Page sections (build in this order):**
1. **LandingPage** — lifestyle hero image, H1, "Select Your Plan" green CTA, social proof strip
2. **OnboardingShell** — persistent top stepper + sticky OrderSummary sidebar
3. **PlanStep** — 3-4 plan type cards; servings toggle (2/4/6); meals/week toggle; price updates live
4. **AccountStep** — email + password (minimal form)
5. **DeliveryStep** — address + delivery window selector
6. **PaymentStep** — Stripe placeholder + order summary confirmation
7. **MealPickerStep** — recipe grid with `BoxStatus` progress bar ("2 of 3 meals selected")

**"Chef's Choice" sticker — the defining visual:**
```tsx
// Caveat font, absolute positioned on recipe card
<span className="font-script text-lg absolute -top-2 -right-2 rotate-12
  bg-lime text-slate px-2 py-0.5 rounded-sm z-10">
  Chef's Choice
</span>
```

**Anti-patterns:**
- Never advance step without completing current step's required fields
- Never display `pricePerServing * 100` raw — always `formatCurrency(cents)` for INR/USD
- Never use `font-script` (Caveat) for body text or labels — sticker context only
- Never show subscription price without "per serving" context

**`tsc --noEmit` exits 0. `npm run build` produces `/out`.**

---

### 2 — ChatGPT Canvas

Create **FreshZest** — vibrant meal-kit subscription onboarding — Next.js 14, TypeScript strict, Tailwind CSS. Static export.

```bash
npx create-next-app@latest freshzest --typescript --app --tailwind --import-alias "@/*"
npm install zustand framer-motion lucide-react zod react-hook-form
```

**Complete type system:**
```typescript
export type MealPlan = 'meat_and_veggies' | 'family_friendly' | 'quick_and_easy' | 'veggie'
export type OnboardingStep = 'plan' | 'account' | 'delivery' | 'payment' | 'meals'

export interface PlanConfig {
  planType: MealPlan; servings: 2 | 4 | 6; mealsPerWeek: 2 | 3 | 4 | 5
}

export interface PlanPricing {
  pricePerServing: number    // cents
  totalWeeklyPrice: number   // cents
  originalPrice: number      // pre-discount cents
  savingsPercent: number
}

export interface Recipe {
  id: string; title: string; description: string; imageUrl: string
  prepTimeMinutes: number; tags: string[]
  chefPick: boolean; calorieStat: string
}

export interface BoxSelection {
  selectedRecipeIds: string[]; maxRecipes: number
}
```

**Key utilities:**
```typescript
// src/lib/calculatePricing.ts
export function calculatePricing(config: PlanConfig): PlanPricing {
  // Base price per serving in cents (varies by plan type)
  const BASE: Record<MealPlan, number> = {
    meat_and_veggies: 1099, family_friendly: 999,
    quick_and_easy: 1199,  veggie: 949,
  }
  const pricePerServing = BASE[config.planType]
  const totalWeeklyPrice = pricePerServing * config.servings * config.mealsPerWeek
  const savingsPercent = config.mealsPerWeek >= 4 ? 20 : config.mealsPerWeek >= 3 ? 15 : 10
  const originalPrice = Math.round(totalWeeklyPrice / (1 - savingsPercent / 100))
  return { pricePerServing, totalWeeklyPrice, originalPrice, savingsPercent }
}
// calculatePricing({ planType: 'quick_and_easy', servings: 2, mealsPerWeek: 3 })
// → { pricePerServing: 1199, totalWeeklyPrice: 7194, originalPrice: ~8463, savingsPercent: 15 }

// src/lib/formatCurrency.ts
export function formatCurrency(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`
}
// formatCurrency(1099) → '$10.99'
```

**Zustand store:**
```typescript
// src/store/onboarding.ts
import { create } from 'zustand'
import type { PlanConfig, BoxSelection, OnboardingStep, Recipe } from '@/types'

interface OnboardingStore {
  step: OnboardingStep
  config: PlanConfig
  selectedRecipes: string[]
  email: string
  setStep: (step: OnboardingStep) => void
  updateConfig: (partial: Partial<PlanConfig>) => void
  toggleRecipe: (id: string) => void
  setEmail: (email: string) => void
  canSelectMore: () => boolean
}

export const useOnboardingStore = create<OnboardingStore>((set, get) => ({
  step: 'plan',
  config: { planType: 'meat_and_veggies', servings: 2, mealsPerWeek: 3 },
  selectedRecipes: [],
  email: '',
  setStep: (step) => set({ step }),
  updateConfig: (partial) =>
    set((s) => ({ config: { ...s.config, ...partial } })),
  toggleRecipe: (id) => set((s) => {
    const selected = s.selectedRecipes
    const max = s.config.mealsPerWeek
    if (selected.includes(id)) return { selectedRecipes: selected.filter(x => x !== id) }
    if (selected.length >= max) return s  // box full
    return { selectedRecipes: [...selected, id] }
  }),
  setEmail: (email) => set({ email }),
  canSelectMore: () => {
    const { selectedRecipes, config } = get()
    return selectedRecipes.length < config.mealsPerWeek
  },
}))
```

**Routes:**
- `/` — Landing page
- `/onboarding/plan` — Plan type + servings + meals/week
- `/onboarding/account` — Email + password
- `/onboarding/delivery` — Address + delivery window
- `/onboarding/payment` — Stripe + order confirmation
- `/onboarding/meals` — Recipe picker grid (the "aha moment")

---

### 3 — Bolt

Build **FreshZest** — vibrant meal-kit subscription onboarding. Next.js 14, TypeScript strict, Tailwind CSS. Static export.

```bash
npx create-next-app@latest freshzest --typescript --app --tailwind --import-alias "@/*"
npm install zustand framer-motion lucide-react zod react-hook-form
```

**File structure:**
```
src/
  types/index.ts               — MealPlan, OnboardingStep, PlanConfig, PlanPricing, Recipe, BoxSelection
  lib/
    calculatePricing.ts        — calculatePricing(config): PlanPricing
    formatCurrency.ts          — formatCurrency(cents): string
    data.ts                    — PLAN_TYPES (4), RECIPES (12, 2 chef picks), SERVINGS_OPTIONS, MEALS_OPTIONS
  store/
    onboarding.ts              — useOnboardingStore (step, config, selectedRecipes, toggleRecipe)
  components/
    layout/
      OnboardingShell.tsx      — sticky stepper + sticky OrderSummary sidebar
      OnboardingStepper.tsx    — step indicator, 5 steps
      OrderSummary.tsx         — reactive pricing display from store, calculatePricing
    home/
      LandingHero.tsx          — lifestyle image, H1, green CTA
      SocialProofStrip.tsx     — "1M+ customers" stats bar
    onboarding/
      PlanCard.tsx             — plan type selector card
      PlanStep.tsx             — 'use client', PlanCards + servings/meals toggles
      ServingsToggle.tsx       — 2/4/6 pill selector
      MealsToggle.tsx          — 2/3/4/5 pill selector
      AccountStep.tsx          — email + password (react-hook-form + zod)
      DeliveryStep.tsx         — address form + window selector
      PaymentStep.tsx          — Stripe placeholder + final summary
    meals/
      RecipeCard.tsx           — image, title, tags, chef pick sticker, "Add to Box" button
      RecipeGrid.tsx           — 'use client', grid of RecipeCards
      BoxStatus.tsx            — "X of N meals selected" progress bar
  app/
    globals.css, layout.tsx, page.tsx
    onboarding/layout.tsx      — OnboardingShell
    onboarding/plan/page.tsx
    onboarding/account/page.tsx
    onboarding/delivery/page.tsx
    onboarding/payment/page.tsx
    onboarding/meals/page.tsx
```

**Critical rules:**
1. `calculatePricing(config)` — pricing always computed from config, never hardcoded
2. `formatCurrency(cents)` — never raw cents or `/ 100` in JSX
3. `toggleRecipe(id)` — no-op when box is full (`selectedRecipes.length >= mealsPerWeek`)
4. Stepper is sticky — `position: sticky; top: 0` in OnboardingShell layout
5. `font-script` (Caveat) — chef pick stickers ONLY, never body or label text
6. Step navigation: forward only after validation; back is always allowed

**QA checks:**
```bash
grep -r "font-script\|font-caveat" src/components --include="*.tsx" | grep -v "chef\|sticker\|ChefPick"  # empty
grep -r "pricePerServing\|totalWeeklyPrice" src/components --include="*.tsx" | grep -v "format"           # empty
grep -r "selectedRecipes\.length.*mealsPerWeek" src/store --include="*.ts"                                # must exist (box-full guard)
tsc --noEmit && npm run build
```

---

### 4 — v0

Design **FreshZest** component system — vibrant meal-kit subscription. Next.js 14, TypeScript, Tailwind CSS.

**PlanCard:**
```tsx
<button
  onClick={() => updateConfig({ planType: plan.type })}
  className={cn(
    "border-2 rounded-lg p-6 text-left transition-all w-full",
    config.planType === plan.type
      ? "border-green bg-green/5 shadow-md"
      : "border-slate-200 bg-white hover:border-green/50"
  )}>
  <div className="text-3xl mb-2">{plan.emoji}</div>
  <h3 className="font-bold text-slate-font-semibold text-lg">{plan.name}</h3>
  <p className="text-slate-500 text-sm mt-1">{plan.description}</p>
  {config.planType === plan.type && (
    <span className="mt-3 inline-flex items-center gap-1 text-green text-sm font-semibold">
      <CheckCircle2 size={14} /> Selected
    </span>
  )}
</button>
```

**ServingsToggle:**
```tsx
<div className="flex gap-2">
  {([2, 4, 6] as const).map((n) => (
    <button key={n} onClick={() => updateConfig({ servings: n })}
      className={cn(
        "flex-1 py-3 rounded-lg text-sm font-semibold border-2 transition-colors",
        config.servings === n
          ? "border-green bg-green text-white"
          : "border-slate-200 text-slate-600 hover:border-green"
      )}>
      {n} people
    </button>
  ))}
</div>
```

**OrderSummary (reactive, sticky):**
```tsx
<div className="sticky top-20 bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
  <h3 className="font-bold text-slate font-semibold text-base mb-4">Your order</h3>
  <div className="space-y-2 text-sm">
    <div className="flex justify-between">
      <span className="text-slate-500">Plan</span>
      <span className="font-medium">{PLAN_LABELS[config.planType]}</span>
    </div>
    <div className="flex justify-between">
      <span className="text-slate-500">Servings</span>
      <span className="font-medium">{config.servings} people</span>
    </div>
    <div className="flex justify-between">
      <span className="text-slate-500">Meals/week</span>
      <span className="font-medium">{config.mealsPerWeek}</span>
    </div>
  </div>
  <div className="border-t border-slate-200 mt-4 pt-4">
    <div className="flex justify-between text-sm">
      <span className="text-slate-400 line-through">{formatCurrency(pricing.originalPrice)}</span>
      <span className="text-lime font-semibold">-{pricing.savingsPercent}%</span>
    </div>
    <div className="flex justify-between font-bold text-lg mt-1">
      <span>Weekly total</span>
      <span className="text-green">{formatCurrency(pricing.totalWeeklyPrice)}</span>
    </div>
    <p className="text-xs text-slate-400 mt-1">
      {formatCurrency(pricing.pricePerServing)}/serving
    </p>
  </div>
</div>
```

**RecipeCard:**
```tsx
<article className="relative bg-white rounded-xl overflow-hidden border border-slate-100
  hover:shadow-md transition-shadow">
  {recipe.chefPick && (
    <span className="font-script text-base absolute -top-1 -right-1 rotate-6 z-10
      bg-lime text-slate px-2 py-0.5 rounded-sm shadow-sm">
      Chef's Choice
    </span>
  )}
  <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
    <img src={recipe.imageUrl} alt={recipe.title}
      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
  </div>
  <div className="p-4">
    <div className="flex flex-wrap gap-1 mb-2">
      {recipe.tags.slice(0, 2).map(tag => (
        <span key={tag} className="text-xs bg-green/10 text-green px-2 py-0.5 rounded-full">
          {tag}
        </span>
      ))}
    </div>
    <h3 className="font-semibold text-slate font-medium">{recipe.title}</h3>
    <div className="flex items-center justify-between mt-3">
      <span className="text-xs text-slate-400">{recipe.prepTimeMinutes} min · {recipe.calorieStat}</span>
      <button disabled={isSelected || !canSelectMore()}
        onClick={() => toggleRecipe(recipe.id)}
        className={cn(
          "text-sm font-semibold px-3 py-1.5 rounded-lg transition-colors",
          isSelected
            ? "bg-green text-white"
            : canSelectMore()
              ? "bg-green text-white hover:bg-green/90"
              : "bg-slate-100 text-slate-400 cursor-not-allowed"
        )}>
        {isSelected ? 'Added ✓' : 'Add to box'}
      </button>
    </div>
  </div>
</article>
```

**BoxStatus:**
```tsx
<div className="sticky bottom-0 bg-white border-t border-slate-200 p-4">
  <div className="flex items-center justify-between mb-2">
    <span className="text-sm font-medium">{selected} of {max} meals selected</span>
    {selected === max && (
      <span className="text-xs text-green font-semibold">Box is full!</span>
    )}
  </div>
  <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
    <div
      className="h-full bg-green transition-all duration-300 rounded-full"
      style={{ width: `${(selected / max) * 100}%` }} />
  </div>
</div>
```

---

### 5 — Claude Artifacts

Build **FreshZest** — production-quality vibrant meal-kit subscription onboarding — Next.js 14 App Router, TypeScript strict, Tailwind CSS. Montserrat 400/700/800 + Caveat 700.

**Four defining constraints:**

**Constraint 1 — Pricing always computed, never hardcoded:**
```typescript
// WRONG: hardcoded or manual calculation in JSX
<span>$10.99/serving</span>  // ✗

// RIGHT: calculatePricing from current config
const pricing = calculatePricing(config)
<span>{formatCurrency(pricing.pricePerServing)}/serving</span>  // ✓
// OrderSummary re-renders automatically when config changes via Zustand
```

**Constraint 2 — Box-full guard in toggleRecipe:**
```typescript
// WRONG: allows adding past the meal limit
toggleRecipe: (id) => set((s) => {
  if (s.selectedRecipes.includes(id)) return { selectedRecipes: s.selectedRecipes.filter(x => x !== id) }
  return { selectedRecipes: [...s.selectedRecipes, id] }  // ✗ no max check
})

// RIGHT: enforces mealsPerWeek limit
toggleRecipe: (id) => set((s) => {
  if (s.selectedRecipes.includes(id))
    return { selectedRecipes: s.selectedRecipes.filter(x => x !== id) }
  if (s.selectedRecipes.length >= s.config.mealsPerWeek) return s  // ✓ box full = no-op
  return { selectedRecipes: [...s.selectedRecipes, id] }
})
```

**Constraint 3 — Caveat font sticker context only:**
```tsx
// WRONG: Caveat in non-sticker context
<h1 className="font-script text-4xl">FreshZest</h1>  // ✗

// RIGHT: Caveat only for sticker labels
<span className="font-script text-lg rotate-6">Chef's Choice</span>  // ✓
// Sticker = absolute-positioned, rotated, bg-lime, inside a recipe card
```

**Constraint 4 — Stepper is always sticky at top:**
```tsx
// WRONG: stepper scrolls away
<div className="mb-8"><OnboardingStepper /></div>  // ✗

// RIGHT: sticky in layout, z-50
<header className="sticky top-0 z-50 bg-white border-b border-slate-200">
  <OnboardingStepper currentStep={step} />
</header>  // ✓
// Users must always know where they are in the 5-step flow
```

**Folder structure:**
```
src/
  types/index.ts
  lib/
    calculatePricing.ts  — calculatePricing(config): PlanPricing
    formatCurrency.ts    — formatCurrency(cents): string
    data.ts              — PLAN_TYPES[], RECIPES[], SERVINGS_OPTIONS, MEALS_OPTIONS
  store/
    onboarding.ts        — useOnboardingStore
  components/
    layout/
      OnboardingShell.tsx    — sticky header + 2-col layout desktop
      OnboardingStepper.tsx  — 5-step progress indicator
      OrderSummary.tsx       — sticky sidebar, reactive from store
    home/LandingHero.tsx + SocialProofStrip.tsx
    onboarding/
      PlanCard.tsx + PlanStep.tsx + ServingsToggle.tsx + MealsToggle.tsx
      AccountStep.tsx + DeliveryStep.tsx + PaymentStep.tsx
    meals/
      RecipeCard.tsx   — chef pick sticker (font-script), Add to Box button, box-full disabled state
      RecipeGrid.tsx   — 'use client', grid of RecipeCards
      BoxStatus.tsx    — sticky bottom bar, progress bar, "X of N meals selected"
  app/
    globals.css, layout.tsx, page.tsx
    onboarding/layout.tsx + plan/page.tsx + account/page.tsx + delivery/page.tsx + payment/page.tsx + meals/page.tsx
```

**QA checks:**
```bash
tsc --noEmit
grep -r "font-script" src/components --include="*.tsx" | grep -v "Chef\|sticker\|chefPick"  # empty
grep -r "/ 100\b\|pricePerServing\b" src/components --include="*.tsx" | grep -v "format"    # empty
grep -r "selectedRecipes\.push\|selectedRecipes\[" src/store --include="*.ts"               # empty (use filter/spread)
npm run build
```

---

### 6 — Grok

Generate all source files for **FreshZest** — meal-kit subscription onboarding. Next.js 14, TypeScript strict, Tailwind CSS.

Generate in order:
1. `tailwind.config.ts` — colors (green, lime, navy, slate), fontFamily (sans: Montserrat, script: Caveat)
2. `src/types/index.ts` — MealPlan, OnboardingStep, PlanConfig, PlanPricing, Recipe, BoxSelection
3. `src/lib/calculatePricing.ts` — `calculatePricing(config): PlanPricing`
4. `src/lib/formatCurrency.ts` — `formatCurrency(cents): string`
5. `src/lib/data.ts` — PLAN_TYPES (4), RECIPES (12 with 2 chef picks), SERVINGS_OPTIONS, MEALS_OPTIONS
6. `src/store/onboarding.ts` — useOnboardingStore with box-full guard in toggleRecipe
7. `src/app/globals.css` — Montserrat + Caveat import, base reset
8. `src/app/layout.tsx` — dual font setup
9. `src/components/layout/OnboardingStepper.tsx` — 5 steps, sticky, currentStep prop
10. `src/components/layout/OrderSummary.tsx` — sticky sidebar, calculatePricing reactive display
11. `src/components/layout/OnboardingShell.tsx` — sticky stepper header + 2-col layout
12. `src/components/home/LandingHero.tsx` — lifestyle image placeholder, H1, green CTA
13. `src/components/onboarding/PlanCard.tsx` — plan type card, selected state border-green
14. `src/components/onboarding/ServingsToggle.tsx` — 2/4/6 pill buttons
15. `src/components/onboarding/MealsToggle.tsx` — 2/3/4/5 pill buttons
16. `src/components/onboarding/PlanStep.tsx` — 'use client', PlanCards + ServingsToggle + MealsToggle
17. `src/components/onboarding/AccountStep.tsx` — email + password (react-hook-form + zod)
18. `src/components/onboarding/DeliveryStep.tsx` — address form + window selector
19. `src/components/onboarding/PaymentStep.tsx` — Stripe placeholder + summary
20. `src/components/meals/RecipeCard.tsx` — chef pick sticker (font-script), tags, Add to Box
21. `src/components/meals/BoxStatus.tsx` — sticky bottom progress bar
22. `src/components/meals/RecipeGrid.tsx` — 'use client', grid + BoxStatus
23. `src/app/page.tsx` — LandingHero + SocialProofStrip
24. `src/app/onboarding/layout.tsx` — OnboardingShell wrapper
25. `src/app/onboarding/plan/page.tsx` through `meals/page.tsx` — step pages

**Rules for every file:**
- `calculatePricing(config)` — never hardcode prices in JSX
- `toggleRecipe`: enforce mealsPerWeek box-full limit
- `font-script` (Caveat) — recipe sticker labels only
- `formatCurrency(cents)` — never raw cents or division in JSX

---

### 7 — Gemini

**Project:** FreshZest — vibrant meal-kit subscription onboarding. Next.js 14 App Router, TypeScript strict, Tailwind CSS. Montserrat 400/700/800 + Caveat 700.

**Design system — 4 rules:**
1. Salem Green (`#067A46`) for all primary CTAs and selected states
2. Lime (`#9ECE1A`) for "Chef's Choice" stickers, badges, highlight pills
3. Caveat font (`font-script`) exclusively for sticker/badge labels — never body
4. Pricing always via `calculatePricing(config)` — never hardcoded numbers

**Architecture — 4 layers:**

Layer 1 — Foundation: types, calculatePricing, formatCurrency, recipe data, Zustand onboarding store (step, config, selectedRecipes with box-full guard).

Layer 2 — Shell: OnboardingShell (sticky stepper header + 2-col desktop layout), OnboardingStepper (5 steps, active/completed/upcoming states), OrderSummary (sticky sidebar, reactive pricing from store).

Layer 3 — Onboarding steps:
- `PlanStep` (`'use client'`) — 4 PlanCards + ServingsToggle (2/4/6) + MealsToggle (2/3/4/5); pricing updates live
- `AccountStep` — email + password via react-hook-form + zod
- `DeliveryStep` — address + delivery window selection
- `PaymentStep` — Stripe placeholder + final OrderSummary confirmation

Layer 4 — Meal Picker:
- `RecipeCard` — image, tags (bg-green/10 text-green pills), title, prep time, "Add to Box" button (disabled when box full); chef pick sticker (Caveat, rotate-6, bg-lime)
- `RecipeGrid` (`'use client'`) — maps RECIPES from data.ts
- `BoxStatus` — sticky bottom bar, `selectedRecipes.length / mealsPerWeek` progress bar, "Box is full!" confirmation

**Motion (Framer Motion):**
- Step transitions: `x: 40 → 0, opacity: 0 → 1` as user advances, `x: -40 ← 0` on back
- PlanCard selection: CSS `transition-all duration-200` — not Framer Motion
- RecipeCard Add to Box: CSS `transition-colors duration-150`
- BoxStatus progress bar: CSS `transition-all duration-300 ease-out`
- All Framer Motion `useReducedMotion()` guarded

---

### 8 — Cursor

Build **FreshZest** meal-kit subscription onboarding. Next.js 14, TypeScript strict, Tailwind CSS. Static export.

**`src/types/index.ts`:**
```typescript
export type MealPlan = 'meat_and_veggies' | 'family_friendly' | 'quick_and_easy' | 'veggie'
export type OnboardingStep = 'plan' | 'account' | 'delivery' | 'payment' | 'meals'

export interface PlanConfig {
  planType: MealPlan; servings: 2 | 4 | 6; mealsPerWeek: 2 | 3 | 4 | 5
}
export interface PlanPricing {
  pricePerServing: number; totalWeeklyPrice: number
  originalPrice: number; savingsPercent: number
}
export interface Recipe {
  id: string; title: string; description: string; imageUrl: string
  prepTimeMinutes: number; tags: string[]
  chefPick: boolean; calorieStat: string
}
```

**`src/lib/calculatePricing.ts`:**
```typescript
import type { PlanConfig, PlanPricing } from '@/types'

const BASE_PRICE_CENTS: Record<string, number> = {
  meat_and_veggies: 1099, family_friendly: 999,
  quick_and_easy: 1199, veggie: 949,
}

export function calculatePricing(config: PlanConfig): PlanPricing {
  const pricePerServing = BASE_PRICE_CENTS[config.planType]
  const totalWeeklyPrice = pricePerServing * config.servings * config.mealsPerWeek
  const savingsPercent = config.mealsPerWeek >= 4 ? 20 : config.mealsPerWeek >= 3 ? 15 : 10
  const originalPrice = Math.round(totalWeeklyPrice / (1 - savingsPercent / 100))
  return { pricePerServing, totalWeeklyPrice, originalPrice, savingsPercent }
}
// calculatePricing({ planType: 'quick_and_easy', servings: 2, mealsPerWeek: 3 })
// → { pricePerServing: 1199, totalWeeklyPrice: 7194, savingsPercent: 15, originalPrice: ~8463 }
// NEVER: hardcode any of these values in JSX
```

**`src/store/onboarding.ts`:**
```typescript
import { create } from 'zustand'
import type { PlanConfig, OnboardingStep } from '@/types'

interface OnboardingStore {
  step: OnboardingStep; config: PlanConfig
  selectedRecipes: string[]; email: string
  setStep: (step: OnboardingStep) => void
  updateConfig: (partial: Partial<PlanConfig>) => void
  toggleRecipe: (id: string) => void
  setEmail: (email: string) => void
  canSelectMore: () => boolean
}

export const useOnboardingStore = create<OnboardingStore>((set, get) => ({
  step: 'plan',
  config: { planType: 'meat_and_veggies', servings: 2, mealsPerWeek: 3 },
  selectedRecipes: [],
  email: '',
  setStep: (step) => set({ step }),
  updateConfig: (partial) => set((s) => ({ config: { ...s.config, ...partial } })),
  toggleRecipe: (id) => set((s) => {
    if (s.selectedRecipes.includes(id))
      return { selectedRecipes: s.selectedRecipes.filter(x => x !== id) }
    if (s.selectedRecipes.length >= s.config.mealsPerWeek) return s  // box full — no-op
    return { selectedRecipes: [...s.selectedRecipes, id] }
  }),
  setEmail: (email) => set({ email }),
  canSelectMore: () => {
    const { selectedRecipes, config } = get()
    return selectedRecipes.length < config.mealsPerWeek
  },
}))
```

**`src/components/meals/RecipeCard.tsx`:**
```tsx
import type { Recipe } from '@/types'
import { useOnboardingStore } from '@/store/onboarding'

interface Props { recipe: Recipe }

export default function RecipeCard({ recipe }: Props) {
  const { selectedRecipes, toggleRecipe, canSelectMore } = useOnboardingStore()
  const isSelected = selectedRecipes.includes(recipe.id)
  const disabled = !isSelected && !canSelectMore()

  return (
    <article className="relative bg-white rounded-xl overflow-hidden border border-slate-100
      hover:shadow-md transition-shadow">
      {recipe.chefPick && (
        // font-script (Caveat) — sticker context ONLY, never for body text
        <span className="font-script text-base absolute -top-1 -right-1 rotate-6 z-10
          bg-lime text-slate px-2 py-0.5 rounded-sm shadow-sm">
          Chef's Choice
        </span>
      )}
      <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
        <img src={recipe.imageUrl} alt={recipe.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-4">
        <div className="flex flex-wrap gap-1 mb-2">
          {recipe.tags.slice(0, 2).map(tag => (
            <span key={tag} className="text-xs bg-green/10 text-green px-2 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <h3 className="font-semibold text-slate font-medium text-sm leading-tight">{recipe.title}</h3>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-slate-400">
            {recipe.prepTimeMinutes} min · {recipe.calorieStat}
          </span>
          <button onClick={() => toggleRecipe(recipe.id)} disabled={disabled}
            className={[
              "text-sm font-semibold px-3 py-1.5 rounded-lg transition-colors",
              isSelected
                ? "bg-green text-white"
                : disabled
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                  : "bg-green text-white hover:bg-green/90",
            ].join(' ')}>
            {isSelected ? 'Added ✓' : 'Add to box'}
          </button>
        </div>
      </div>
    </article>
  )
}
// toggleRecipe: box-full guard in store — card button disabled when !canSelectMore() && !isSelected
// font-script (Caveat): ONLY on chefPick sticker span — never on title or tags
```

**Absolute rules:**
```bash
grep -r "font-script" src/components --include="*.tsx" | grep -v "chefPick\|Chef\|sticker"  # empty
grep -r "pricePerServing\|totalWeeklyPrice\|/ 100" src/components --include="*.tsx"           # must use formatCurrency
grep -r "selectedRecipes\.push" src/store --include="*.ts"                                    # empty (use spread)
grep -r "useState.*OnboardingStep\|useState.*step" src/components --include="*.tsx"           # empty (use store)
tsc --noEmit && npm run build
```
