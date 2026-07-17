---
prompt_id: sbecom_04
sub_category: E-commerce
sub_type: Premium Culinary Subscription
title: BlueChef — Professional Meal Kits & Wine Pairings
reference_patterns: educational_onboarding, integrated_wine_subscription, chef_led_narrative
inspiration: blueapron.com
quality_score:
status: draft
notes: Focused on a "Chef-Quality" aesthetic with integrated wine pairing logic.
---

## Base Prompt

### Section 1 — Role

You are a senior product designer specializing in premium food-tech and culinary subscription platforms. You understand that for BlueChef users, cooking is an act of mastery, not just a time-saving chore. You master the balance between technical precision and editorial storytelling. You reject "cartoonish" or overly "bubbly" layouts in favor of the "Culinary Professional" aesthetic: deep navy blues, elegant serif-sans typography pairings, and rustic, farm-to-table photography. You design for "The Complete Experience," ensuring that meal selection, wine pairings, and culinary education feel like an invitation to a private masterclass.

---

### Section 2 — Application Overview

This is a high-end meal kit platform that delivers chef-designed recipes and sustainably sourced ingredients. A key differentiator is the integrated "Wine Cellar" subscription, where wines are curated to pair perfectly with the weekly menu. The customer is a "Culinary Enthusiast"—someone who values ingredient quality and wants to learn restaurant-level cooking techniques at home.

The application covers: "Chef-Led" Educational Onboarding, Meal & Wine Selection Dashboard, Seasonal Market (Add-ons), and a Detailed Recipe & Pairing Guide UI.

---

### Section 3 — Brand Voice & Mood

The mood is "Premium & Precise" and "Culinary Authority." It feels like a high-end cookbook come to life. It is sophisticated, trustworthy, and educational.

Copy is aspirational and instructional. Headlines use a "Chef-First" tone: "Cook like a pro," "Sustainably sourced, chef-designed," "The perfect pour for every plate." It emphasizes "Technique" and "Origin" over mere "Convenience."

Vibe word: Culinary.

---

### Section 4 — Core Features & Functionality

1. **"Chef-Led" Onboarding** — An educational flow that asks about culinary skill levels and taste preferences (e.g., "Bold Flavors," "Classic Techniques") before selecting a plan.
2. **Integrated Wine Pairing UI** — Recipe cards that feature "Recommended Pairing" badges. Users can toggle a "Complete my Meal" option to add the paired wine bottle to their monthly cellar subscription.
3. **Seasonal Market Add-ons** — A dedicated e-commerce layer for purchasing professional kitchen tools (knives, pans) and "Celebration" one-off kits (e.g., Holiday Roasts).
4. **Interactive Recipe Guide** — A post-purchase UI that provides step-by-step instructional videos, *mise en place* checklists, and "Chef's Tips" for plating.
5. **Subscription Hub** — Advanced management for "Subscription Tiers" (2-person, 4-person) and the "Wine Cellar" frequency, with a unified billing summary.

---

### Section 5 — Design Specifications

**Visual style:** Culinary Editorial. High-contrast, moody photography, clean white spaces, and structural deep blue accents.

**Color mode:** Primarily Light Mode with Deep Navy sections.

**Color palette:**
- Primary Brand: `#0F3460` (Blue Apron Blue — deep navy for authority)
- Secondary Accent: `#FFD369` (Golden Harvest — for wine highlights and premium tags)
- Background: `#FFFFFF` (Pure White)
- Surface/UI: `#F3F4F6` (Cool Slate Grey)
- Text Primary: `#1F2937` (Rich Charcoal)
- Success/Eco: `#064E3B` (Forest Green — for sustainable sourcing tags)

**Typography:** Sophisticated Serif + Geometric Sans.
- Display Heading (Serif): `clamp(32px, 5vw, 48px)`, weight 600 (e.g., Playfair Display).
- Body Text (Sans): `16px`, weight 400 (e.g., Inter or Montserrat).
- UI Labels: `12px`, uppercase, tracking `0.1em`, bold.

**Spacing:** 16px base unit. 
- Editorial-style padding: `120px` for hero sections.
- Card padding: `32px`.
- High use of "Mise en place" grids (tightly organized item lists).

**Border radius:** `4px` (Sharp and professional) to `8px` (Max). Avoid "pill" shapes.

**Responsive:** Desktop-optimized for the complex meal/wine selection dashboard. Mobile-first for the "In-kitchen" recipe guide.

**Accessibility:** WCAG AA. Deep Navy on White for all primary text. Focus rings: `2px solid #0F3460` with `4px` offset.

**Motion:** 
- "Storytelling" Fades: `400ms` opacity transitions.
- Accordion Reveals: Smooth height transitions for "Chef's Tips."
- Parallax: Subtle scroll effect on hero ingredient shots.
- Respect: `prefers-reduced-motion: reduce` → disable all animations and transitions.

---

### Section 6 — Structure

**Onboarding Landing Page Layout:**
1. **Nav:** Centered logo. Left: "Our Vision," "Pricing." Right: "Market," "Login."
2. **Hero:** Full-bleed photo of a chef plating a dish. H1: "Chef-designed meals, delivered." Big Navy CTA: "See the Menu."
3. **The "Why" Section:** 3-column grid: 1. Sourcing -> 2. The Chef -> 3. The Pairing.
4. **Plan Selector:** 2-person vs 4-person cards. Focus on "Recipes per week."

**Meal & Wine Dashboard:**
- Sidebar: Current Box Status, Delivery Date, Next 4 Weeks Calendar.
- Main: Recipe Grid. Card: High-end dish photo, "Wine Pairing" icon, "Chef's Technique" label.
- Interaction: Click recipe -> Opens side panel with ingredients, nutrition, and "Add to Box."

**Wine Cellar Component:**
- Header: "Complete your culinary experience."
- List: "This week's pairings." Each wine has a "Pair with [Dish Name]" link.

---

### Section 7 — Technical Specifications

- **Framework:** Next.js 14 App Router, React 18, TypeScript strict mode.
- **Styling:** Tailwind CSS v3.
- **State:** Zustand for the "Dual Subscription" logic (Meal + Wine) and "Add-on Market" cart.
- **Animation:** Framer Motion for side-panel reveals and recipe hover effects.
- **Database:** Supabase for Recipe CMS (with foreign keys to Wine cellar SKUs).
- **Payments:** Stripe (Subscription API with "Optional Add-ons" and "Prorated Billing").

---

### Section 8 — Implementation Steps

1. **The Theme** — Setup `globals.css` with `deep-navy` and `golden-harvest` tokens. Configure the Serif-Sans font pairing.
2. **The Dashboard Shell** — Build the complex sidebar-and-grid layout for meal selection.
3. **Meal/Wine Connector** — Implement the logic that links recipes to specific wine SKUs in the UI.
4. **Educational Onboarding** — Build the step-by-step quiz with a "Culinary Result" summary.
5. **Recipe Guide** — Build the mobile-first kitchen mode with checklist and video player.

---

### Section 9 — User Experience

The user is looking to "Level Up" their home cooking. 
The UI must feel "Expert and Curated." Use first-person "Chef's Voice" in tooltips.
The "Aha! moment" is seeing the wine pairing. Use visual cues that explain *why* the pairing works (e.g., "The acidity of this Pinot Grigio cuts through the richness of the Salmon").

---

### Section 10 — Constraints

- **No generic cooking icons.** Use professional culinary illustrations or photos.
- **No pure black.** Use `#1F2937` for a more sophisticated, "ink" feel.
- **No urgency/pressure copy.** Focus on "Limited Seasonal Availability" instead of "Sales ending."
- **No cluttered screens.** If a recipe has too much info, use a "side-peek" modal.

---

## Platform Versions

---

### 1 — Lovable

Build **BlueChef** — a premium culinary meal kit + wine pairing subscription platform inspired by Blue Apron — using Next.js 14 App Router, TypeScript strict, Tailwind CSS. Desktop-first for dashboard, mobile-first for recipe guide. Font: Playfair Display 400/600 (headings) + Inter 400/500 (body) via `next/font/google`.

**Design identity: Culinary Professional.** White surfaces, deep navy authority (`#0F3460`), golden harvest highlights (`#FFD369`), `rounded-sm` (4px) — professional precision. Serif headings signal editorial craft.

**Tailwind config:**
```js
colors: {
  navy:   '#0F3460',   // primary authority — headings, CTA bg, sidebar
  gold:   '#FFD369',   // wine pairing badges, premium tags, seasonal highlights
  forest: '#064E3B',   // sustainable sourcing tags
  slate:  { 100: '#F3F4F6', 800: '#1F2937' },
},
fontFamily: {
  serif: ['Playfair Display', 'serif'],
  sans:  ['Inter', 'sans-serif'],
},
```

**Core types:**
```typescript
export type CulinarySkill = 'beginner' | 'home_cook' | 'advanced' | 'chef'
export type TasteProfile = 'bold' | 'classic' | 'adventurous' | 'vegetarian'
export type ServingSize = 2 | 4

export interface MealPlan {
  servingSize: ServingSize; recipesPerWeek: 2 | 3 | 4; wineSubscription: boolean
}

export interface Recipe {
  id: string; title: string; description: string; imageUrl: string
  prepTimeMinutes: number; difficulty: CulinarySkill; tags: string[]
  winePairing: WinePairing | null; chefTip: string; sustainablySourced: boolean
}

export interface WinePairing {
  id: string; name: string; winery: string; region: string
  description: string   // ALWAYS displayed — the "why" of the pairing
  bottleImageUrl: string; price: number  // cents
}

export interface ActiveBox {
  weekOf: string; selectedRecipes: string[]
  maxRecipes: number; addedWines: string[]
}
```

**Key features:**
- **Onboarding** — 3 educational steps: culinary skill level → taste profile → plan + wine add-on
- **Dashboard** — sidebar (active box, delivery date, calendar) + recipe grid
- **RecipeDetailPanel** — Framer Motion `x: '100%' → 0` side panel (not modal) with ChefTip accordion and WinePairingCard
- **Wine Cellar** — per-recipe toggle "Add to Cellar"; wine always shows `description` rationale

**Anti-patterns:**
- Never `font-sans` for H1/H2/H3 — always `font-serif` (Playfair Display)
- Never `rounded-xl` or `rounded-2xl` — max `rounded-md` (8px); buttons `rounded-sm` (4px)
- Never show wine pairing without `wine.description` (the rationale)
- Never `formatCurrency` omitted — wine price always `formatCurrency(wine.price)` not raw cents

**`tsc --noEmit` exits 0. `npm run build` produces `/out`.**

---

### 2 — ChatGPT Canvas

Create **BlueChef** — premium culinary subscription — Next.js 14, TypeScript strict, Tailwind CSS.

```bash
npx create-next-app@latest bluechef --typescript --app --tailwind --import-alias "@/*"
npm install zustand framer-motion lucide-react
```

**Key utilities:**
```typescript
// src/lib/formatCurrency.ts
export function formatCurrency(cents: number): string {
  return `$${(cents / 100).toFixed(0)}`
}
// formatCurrency(2400) → '$24'

// src/lib/formatPrepTime.ts
export function formatPrepTime(minutes: number): string {
  if (minutes < 60) return `${minutes} min`
  const h = Math.floor(minutes / 60), m = minutes % 60
  return m > 0 ? `${h}h ${m}min` : `${h}h`
}

// src/lib/calculateWeeklyPrice.ts
export function calculateWeeklyPrice(plan: MealPlan): number {
  const BASE_PER_SERVING = 1000  // $10/serving in cents
  return BASE_PER_SERVING * plan.servingSize * plan.recipesPerWeek
}
// calculateWeeklyPrice({ servingSize: 2, recipesPerWeek: 3, wineSubscription: false }) → 6000
```

**Zustand store:**
```typescript
// src/store/dashboard.ts
interface DashboardStore {
  onboarding: OnboardingState
  activeBox: ActiveBox | null
  detailPanelRecipeId: string | null
  toggleRecipe: (recipeId: string) => void
  toggleWine: (wineId: string) => void
  openDetailPanel: (recipeId: string) => void
  closeDetailPanel: () => void
  completeOnboarding: (plan: MealPlan) => void
}
```

**Routes:**
- `/onboarding` — 3-step educational flow
- `/dashboard` — meal selection grid + active box sidebar
- `/market` — kitchen tools + seasonal add-ons

---

### 3 — Bolt

Build **BlueChef** — premium culinary subscription. Next.js 14, TypeScript strict, Tailwind CSS.

**File structure:**
```
src/
  types/index.ts
  lib/
    data.ts                   — RECIPES (12, 4 with wine), WINE_CELLAR (8), MARKET_ITEMS (6)
    formatCurrency.ts
    formatPrepTime.ts
    calculateWeeklyPrice.ts
  store/dashboard.ts          — useDashboardStore
  components/
    onboarding/
      SkillStep.tsx + TasteStep.tsx + PlanStep.tsx + OnboardingShell.tsx
    dashboard/
      DashboardSidebar.tsx    — active box status, delivery date
      RecipeGrid.tsx          — server component
      RecipeCard.tsx          — serif title, gold wine badge, formatPrepTime
      RecipeDetailPanel.tsx   — 'use client', Framer Motion x: 100% → 0
      WinePairingCard.tsx     — bottle image + description (rationale) + cellar toggle
      ChefTip.tsx             — accordion
    market/MarketGrid.tsx
  app/
    globals.css, layout.tsx
    onboarding/page.tsx + dashboard/page.tsx + market/page.tsx
```

**Critical rules:**
1. `font-serif` for ALL H1/H2/H3 — never `font-sans` for headings
2. `formatCurrency(wine.price)` — never raw cents; never `/ 100` in JSX
3. `wine.description` always shown alongside wine name — rationale is mandatory
4. `rounded-md` max on cards; `rounded-sm` on buttons — never `rounded-xl`
5. RecipeDetailPanel: `x: '100%' → 0` side panel, not Dialog/modal

---

### 4 — v0

**RecipeCard:**
```tsx
<article className="bg-white border border-slate-100 rounded-md overflow-hidden
  hover:shadow-lg transition-shadow cursor-pointer group"
  onClick={() => openDetailPanel(recipe.id)}>
  <div className="relative aspect-[4/3] overflow-hidden">
    <img src={recipe.imageUrl} alt={recipe.title}
      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
    {recipe.winePairing && (
      <span className="absolute top-3 right-3 bg-gold text-slate-800 text-xs font-bold
        uppercase tracking-wide px-2 py-1 rounded-sm">
        Wine Pairing
      </span>
    )}
    {recipe.sustainablySourced && (
      <span className="absolute top-3 left-3 bg-forest text-white text-xs font-bold
        px-2 py-1 rounded-sm">
        Sustainably Sourced
      </span>
    )}
  </div>
  <div className="p-5">
    {/* Playfair Display — font-serif required */}
    <h3 className="font-serif text-lg font-semibold text-slate-800 leading-tight">
      {recipe.title}
    </h3>
    <div className="flex items-center justify-between mt-3">
      <span className="text-xs text-slate-400">{formatPrepTime(recipe.prepTimeMinutes)}</span>
      <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">
        {recipe.difficulty.replace('_', ' ')}
      </span>
    </div>
  </div>
</article>
```

**WinePairingCard:**
```tsx
<div className="border border-gold/30 rounded-md p-4 bg-gold/5">
  <div className="flex gap-3">
    <div className="w-12 shrink-0 bg-white rounded-sm border border-slate-200 p-1">
      <img src={wine.bottleImageUrl} alt={wine.name} className="w-full h-20 object-contain" />
    </div>
    <div className="flex-1">
      <p className="font-semibold text-slate-800 text-sm">{wine.name}</p>
      <p className="text-xs text-slate-400">{wine.winery} · {wine.region}</p>
      {/* description (rationale) — ALWAYS shown */}
      <p className="text-xs text-slate-500 mt-2 italic">"{wine.description}"</p>
      <div className="flex items-center justify-between mt-3">
        <span className="font-bold text-slate-800 text-sm">{formatCurrency(wine.price)}/bottle</span>
        <button onClick={() => onToggle()}
          className={cn(
            "text-xs font-semibold px-3 py-1.5 rounded-sm border transition-colors",
            isAdded ? "bg-navy text-white border-navy" : "bg-white text-navy border-navy hover:bg-navy/5"
          )}>
          {isAdded ? 'In Cellar ✓' : 'Add to Cellar'}
        </button>
      </div>
    </div>
  </div>
</div>
```

---

### 5 — Claude Artifacts

Build **BlueChef** — premium culinary subscription — Next.js 14, TypeScript strict, Tailwind CSS. Playfair Display + Inter.

**Four defining constraints:**

**Constraint 1 — Serif headings, always:**
```tsx
// WRONG: sans heading
<h2 className="font-sans text-2xl font-bold">This Week's Menu</h2>  // ✗
// RIGHT: serif heading
<h2 className="font-serif text-2xl font-semibold text-slate-800">This Week's Menu</h2>  // ✓
```

**Constraint 2 — Wine pairing always shows description:**
```tsx
// WRONG: wine name only
<p>{wine.name}</p>  // ✗ no pairing rationale
// RIGHT: name + description
<p className="font-semibold">{wine.name}</p>
<p className="text-sm italic text-slate-500">"{wine.description}"</p>  // ✓
```

**Constraint 3 — Detail panel from right, not modal:**
```tsx
// WRONG
<Dialog open={!!detailPanelRecipeId}>...</Dialog>  // ✗
// RIGHT: side panel preserves dashboard context
<motion.div x="100%" → 0 className="fixed inset-y-0 right-0 w-[480px] bg-white ...">
```

**Constraint 4 — Max rounded-md:**
```tsx
// WRONG
<div className="rounded-xl">...</div>  // ✗
// RIGHT
<div className="rounded-md">...</div>  // ✓ cards max
<button className="rounded-sm">...</button>  // ✓ buttons
```

**QA checks:**
```bash
tsc --noEmit
grep -r "font-sans" src/components --include="*.tsx" | grep -E "<h[1-3]"              # empty
grep -r "rounded-xl\|rounded-2xl\|rounded-full" src --include="*.tsx"                # empty
grep -r "wine\.price\b" src/components --include="*.tsx" | grep -v "formatCurrency"  # empty
grep -r "wine\.description\b" src/components --include="*.tsx" | wc -l              # must be > 0
npm run build
```

---

### 6 — Grok

Generate all source files for **BlueChef**. Next.js 14, TypeScript strict, Tailwind CSS.

1. `tailwind.config.ts` — colors (navy, gold, forest), fontFamily (serif: Playfair, sans: Inter), no rounded-xl
2. `src/types/index.ts` — CulinarySkill, TasteProfile, ServingSize, MealPlan, Recipe, WinePairing, ActiveBox
3. `src/lib/formatCurrency.ts` + `formatPrepTime.ts` + `calculateWeeklyPrice.ts`
4. `src/lib/data.ts` — RECIPES (12, 4 with wine), WINE_CELLAR (8), MARKET_ITEMS (6)
5. `src/store/dashboard.ts` — useDashboardStore
6. `src/app/globals.css` + `layout.tsx` — dual font setup (Playfair + Inter)
7. `src/components/onboarding/` — SkillStep, TasteStep, PlanStep, OnboardingShell
8. `src/components/dashboard/RecipeCard.tsx` — font-serif title, gold wine badge, formatPrepTime
9. `src/components/dashboard/RecipeGrid.tsx` — server component
10. `src/components/dashboard/DashboardSidebar.tsx` — active box status, delivery date
11. `src/components/dashboard/WinePairingCard.tsx` — bottle image + description (always) + cellar toggle + formatCurrency
12. `src/components/dashboard/ChefTip.tsx` — accordion with chef's technique tip
13. `src/components/dashboard/RecipeDetailPanel.tsx` — 'use client', Framer Motion x: 100% → 0, not Dialog
14. `src/components/market/MarketGrid.tsx` — add-on items
15. `src/app/onboarding/page.tsx` + `dashboard/page.tsx` + `market/page.tsx`

**Rules:** serif headings; wine description always shown; max rounded-md; formatCurrency for prices; formatPrepTime for durations; detail panel from right not modal.

---

### 7 — Gemini

**Project:** BlueChef — premium culinary subscription. Next.js 14 App Router, TypeScript strict, Tailwind CSS. Playfair Display (serif) + Inter (sans). Navy + Gold palette. `rounded-sm`/`rounded-md` max — never `rounded-xl`/`rounded-2xl`/`rounded-full`.

**Design system — 4 rules:**
1. `font-serif` (Playfair Display) for all `h1`–`h3` — `font-sans` (Inter) for body only; never swap
2. `formatCurrency(cents)` for all prices; `formatPrepTime(minutes)` for all durations — never raw numbers in JSX
3. `WinePairingCard` always renders `wine.description` — never hidden behind a conditional or toggle
4. `rounded-xl`, `rounded-2xl`, `rounded-full` never appear anywhere — max is `rounded-md` project-wide

**Architecture — 4 layers:**

Layer 1 — Foundation: types (CulinarySkill, TasteProfile, MealPlan, Recipe, WinePairing, ActiveBox), formatCurrency, formatPrepTime, calculateWeeklyPrice, data (RECIPES ×12 with 4 wine pairings, WINE_CELLAR ×8, MARKET_ITEMS ×6), useDashboardStore.

Layer 2 — Onboarding: OnboardingShell with 3-step ChefProfileQuiz; SkillStep (4 cooking-style option cards), TasteStep (dietary preference toggles), PlanStep (plan cards + wine add-on toggle below plan); Framer Motion `AnimatePresence` on step transitions; navy CTA buttons throughout.

Layer 3 — Dashboard: DashboardLayout (`grid-cols-[1fr_320px]` desktop, sticky ActiveBoxSidebar; mobile: sidebar collapses to sticky footer bar); RecipeGrid (server component, 2-col); RecipeCard (serif `font-serif` title, `aspect-ratio: 4/3` image, gold wine badge only when `recipe.winePairingId` is set).

Layer 4 — Detail panel: RecipeDetailPanel (`'use client'`, Framer Motion `x: '100%' → 0` with overlay backdrop — not Dialog or modal); ChefTip (accordion CSS `max-height` transition — not Framer Motion); WinePairingCard (`wine.description` always rendered unconditionally, cellar add/remove toggle).

**Motion:** RecipeDetailPanel backdrop `opacity: 0 → 1` + panel `x: '100%' → 0` duration 0.3 `ease-out`; ChefTip accordion CSS `max-height transition-all duration-200`; RecipeCard hover CSS only; all `useReducedMotion()` guarded.

---

### 8 — Cursor

**`src/components/dashboard/RecipeDetailPanel.tsx`:**
```tsx
'use client'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useDashboardStore } from '@/store/dashboard'
import { RECIPES } from '@/lib/data'
import WinePairingCard from './WinePairingCard'
import ChefTip from './ChefTip'

export default function RecipeDetailPanel() {
  const { detailPanelRecipeId, closeDetailPanel, toggleWine, activeBox } = useDashboardStore()
  const shouldReduce = useReducedMotion()
  const recipe = RECIPES.find(r => r.id === detailPanelRecipeId)

  return (
    <AnimatePresence>
      {recipe && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-40" onClick={closeDetailPanel} />
          <motion.div
            initial={{ x: shouldReduce ? 0 : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: shouldReduce ? 0 : '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-lg
              bg-white border-l border-slate-200 overflow-y-auto shadow-2xl">
            <div className="p-6 border-b border-slate-100">
              {/* Playfair Display serif heading — never font-sans */}
              <h2 className="font-serif text-xl font-semibold text-slate-800">{recipe.title}</h2>
            </div>
            <div className="p-6 space-y-6">
              {recipe.chefTip && <ChefTip tip={recipe.chefTip} />}
              {recipe.winePairing && (
                <section>
                  <h3 className="font-serif text-base font-semibold text-slate-700 mb-3">
                    Wine Pairing
                  </h3>
                  {/* WinePairingCard ALWAYS shows wine.description */}
                  <WinePairingCard
                    wine={recipe.winePairing}
                    isAdded={activeBox?.addedWines.includes(recipe.winePairing.id) ?? false}
                    onToggle={() => toggleWine(recipe.winePairing!.id)} />
                </section>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
```

**`src/lib/formatCurrency.ts`:**
```typescript
export function formatCurrency(cents: number): string {
  return `$${(cents / 100).toFixed(0)}`
}
// formatCurrency(2400) → '$24'
// NEVER: `$${wine.price}` or `$${wine.price / 100}`
```

**Absolute rules:**
```bash
grep -r "font-sans" src/components --include="*.tsx" | grep -E "h[1-3]|font-serif"   # empty (always serif)
grep -r "rounded-xl\|rounded-2xl\|rounded-full" src --include="*.tsx"                # empty
grep -r "wine\.price\b" src/components --include="*.tsx" | grep -v "formatCurrency"  # empty
grep -r "wine\.description\b" src/components --include="*.tsx"                       # must show > 0 results
tsc --noEmit && npm run build
```
