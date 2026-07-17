# 05 — Epics & Stories
## Work Breakdown · sbecom_platform_04
### BlueChef Culinary Subscription · Meal Kit + Wine Cellar

---

## Epic 1: The Expert Selection Dashboard

### Story 1.1 — Weekly Recipe Browse
**As a** culinary enthusiast,
**I want** to browse this week's recipes with difficulty and technique labels,
**so that** I can select meals that match my current skill level and mood.

**Acceptance criteria:**
- [ ] Dashboard `/account/selection` fetches this week's `recipes` where `delivery_week = current_iso_week()`
- [ ] Recipe card: image (`aspect-ratio: 4 / 3`), name `<h3>` (serif), chef name, difficulty badge, technique tag(s)
- [ ] Difficulty badge values: `'beginner' | 'intermediate' | 'pro'`; rendered with distinct colours: beginner = teal, intermediate = amber, pro = deep navy
- [ ] TypeScript: `type DifficultyLevel = 'beginner' | 'intermediate' | 'pro'`; `Recipe = { id: string; title: string; chefName: string; difficultyLevel: DifficultyLevel; imageUrl: string; videoUrl: string; pairingWineId: string | null }`
- [ ] Recipes fetched server-side in the page component; no client-side loading state on initial render
- [ ] `border-radius: 4px` on all cards (sharp culinary editorial aesthetic); no `border-radius > 4px` on card elements

### Story 1.2 — Chef's Tips Side Modal
**As a** subscriber,
**I want** to peek at chef's tips and ingredient origins before selecting a recipe,
**so that** I can make a more informed and inspiring meal choice.

**Acceptance criteria:**
- [ ] "Preview" button on recipe card opens a Radix `<Dialog>` side panel; `side="right"` slide-in animation
- [ ] Modal content: hero image, chef name + headshot (40px avatar), technique description, 3 chef tips, ingredient origin note
- [ ] Chef tips stored in `recipes.chef_tips text[]`; max 3 tips per recipe; rendered as `<ol>` with italic serif text
- [ ] Ingredient origins stored in `recipes.ingredient_origins jsonb`; e.g., `{ "beef": "Angus, Scotland" }`
- [ ] Modal `aria-label="Recipe preview — {recipe.title}"`; focus trapped on open; Esc closes
- [ ] TypeScript: `RecipePreview = { chefTips: string[]; ingredientOrigins: Record<string, string> }`

### Story 1.3 — Dietary and Wellness Badges
**As a** health-conscious subscriber,
**I want** to see at-a-glance badges like "WW Approved" or "Protein-packed",
**so that** I can quickly identify meals that suit my wellness goals.

**Acceptance criteria:**
- [ ] `recipes.wellness_tags text[]`; valid values: `['ww-approved', 'protein-packed', 'low-carb', 'dairy-free', 'gluten-free']`
- [ ] Badges rendered as compact pills `height: 20px; font-size: 11px; font-weight: 600; border-radius: 2px`
- [ ] Max 2 badges shown on the card; additional badges visible in the preview modal
- [ ] TypeScript: `type WellnessTag = 'ww-approved' | 'protein-packed' | 'low-carb' | 'dairy-free' | 'gluten-free'`
- [ ] `grep -r "border-radius: [^24]" src/components/WellnessBadge` → zero results (max 2px or 4px only)
- [ ] "WW Approved" badge: `background: #EFF6FF; color: #1D4ED8`; all other badges: `background: var(--color-surface-2); color: var(--color-text-primary)`

---

## Epic 2: The Integrated Wine Cellar

### Story 2.1 — Wine Pairing Badge on Recipe Cards
**As a** wine lover,
**I want** to see a wine pairing recommendation on recipe cards that warrant it,
**so that** I know which meals pair with a wine before I select them.

**Acceptance criteria:**
- [ ] Recipe card shows "Pair with {wine.variety}" badge if `recipes.pairing_wine_id` is not null
- [ ] Badge colour: deep navy background `var(--color-navy)`, white text; `border-radius: 2px`
- [ ] Wine data fetched via JOIN: `SELECT r.*, w.name, w.variety FROM recipes r LEFT JOIN wines w ON r.pairing_wine_id = w.id`
- [ ] No wine badge rendered when `pairing_wine_id` is null — conditional JSX, not `hidden` class
- [ ] TypeScript: `Wine = { id: string; name: string; variety: string; notes: string; priceCents: number; inventoryCount: number }`
- [ ] `recipes.pairing_wine_id: string | null` — nullable FK; JOIN returns `null` wine fields for unmatched rows

### Story 2.2 — Add Wine Cellar Subscription
**As a** subscriber,
**I want** to add the Wine Cellar subscription to my plan with a single click,
**so that** my wine arrives with my meal kit without a separate checkout.

**Acceptance criteria:**
- [ ] "Add to Cellar" CTA on recipe cards with a pairing wine; calls `POST /api/subscriptions/wine/enable`
- [ ] `subscriptions.wine_cellar_active = true` updated; `subscriptions` row total recalculated
- [ ] Stripe subscription updated: `stripe.subscriptions.update(subscriptionId, { items: [{ price: WINE_PRICE_ID }] })`
- [ ] `subscriptionStore.wineCellarActive: boolean` in Zustand; toggles CTA label between "Add to Cellar" and "Wine Added ✓"
- [ ] Wine price proration: `prorate: true` on Stripe update so the first partial period is billed correctly
- [ ] TypeScript: `enableWineCellar(subscriptionId: string): Promise<void>`; disabled state if `wine_cellar_active = true`

### Story 2.3 — Tasting Notes in Dashboard
**As a** subscriber,
**I want** to read professional tasting notes for my paired wines in the dashboard,
**so that** I can appreciate each bottle before it arrives.

**Acceptance criteria:**
- [ ] Wine section in `/account/selection` shown only if `subscriptions.wine_cellar_active = true`
- [ ] Wine card: bottle image, name, variety, tasting notes (`wines.notes`), pairing dish name
- [ ] Tasting notes rendered in serif italic, `max-width: 480px`, `line-height: 1.7`
- [ ] Wine card `border-left: 4px solid var(--color-navy)` as editorial accent — no other border treatment
- [ ] If `wine_cellar_active = false`: wine section replaced by "Add the Wine Cellar — $29/month" upsell block
- [ ] TypeScript: `WineCard` component accepts `wine: Wine | null`; renders upsell when `wine` is null

---

## Epic 3: Professional Onboarding

### Story 3.1 — Chef's Profile Quiz
**As a** new user,
**I want** to complete a 5-step quiz about my flavour and technique preferences,
**so that** the platform recommends a plan matched to my culinary ambitions.

**Acceptance criteria:**
- [ ] Quiz steps: cooking frequency, favourite cuisines, highest technique tried, dietary restrictions, goal (learn / impress / relax)
- [ ] Zustand `chefQuizStore`: `{ currentStep: 0 | 1 | 2 | 3 | 4; answers: ChefQuizAnswers; isComplete: boolean }`
- [ ] `persist` middleware: quiz state survives page refresh — user can resume mid-quiz
- [ ] TypeScript: `ChefQuizAnswers = { cookingFrequency: string; favouriteCuisines: string[]; highestTechnique: string; dietaryRestrictions: string[]; goal: string }`
- [ ] `favouriteCuisines` and `dietaryRestrictions` allow multi-select; other steps are single-select
- [ ] Step transition: `200ms ease-out` slide; under `prefers-reduced-motion` — instant transition

### Story 3.2 — Personalised Plan Recommendation
**As a** new user,
**I want** to receive a plan recommendation based on my quiz answers,
**so that** I start with a plan that matches my skill level and goals.

**Acceptance criteria:**
- [ ] Recommendation logic: `recommendPlan(answers: ChefQuizAnswers): 'signature' | 'wellness' | 'gourmet-explorer'`
- [ ] Rules: `goal = 'learn'` → `'gourmet-explorer'`; `dietaryRestrictions.includes('vegetarian')` → `'wellness'`; default → `'signature'`
- [ ] Recommendation displayed as: plan name `<h2>`, one-sentence description, "Sounds perfect — start my plan" CTA
- [ ] "Not what I expected? Browse all plans" link below CTA — allows manual override
- [ ] Recommended plan ID passed into the checkout flow; stored as `subscriptions.meal_plan_id`
- [ ] TypeScript: `type MealPlanId = 'signature-2p' | 'signature-4p' | 'wellness-2p' | 'wellness-4p' | 'gourmet-explorer-2p'`

### Story 3.3 — Sourcing and Chef Narratives
**As a** new user,
**I want** to understand where ingredients come from and who the chefs are,
**so that** the premium price feels justified before I subscribe.

**Acceptance criteria:**
- [ ] Onboarding step 4 (between plan selection and payment): "Our Chefs & Sourcing" screen
- [ ] Screen shows: 2 chef profiles (name, headshot, 1-line bio) and 3 sourcing callouts (e.g., "Angus beef from Scotland")
- [ ] Chef data from `chefs` table: `{ id, name, photoUrl, bio }`; sourcing callouts from `platform_settings.sourcing_highlights jsonb`
- [ ] Screen is static — no loading state; data fetched server-side during onboarding page render
- [ ] "Next — Payment" CTA at bottom; this step cannot be skipped (no "Skip" button)
- [ ] TypeScript: `Chef = { id: string; name: string; photoUrl: string; bio: string }`; `SourcingHighlight = { label: string; origin: string; iconUrl: string }`

---

## Epic 4: In-Kitchen Mastery

### Story 4.1 — Kitchen Mode (Mobile-Optimised)
**As a** subscriber,
**I want** a mobile-optimised "Kitchen Mode" for my current week's recipes,
**so that** I can follow instructions hands-free while cooking.

**Acceptance criteria:**
- [ ] `/kitchen/[recipeId]` route; layout: no navigation header, no footer — full-screen single-column
- [ ] Font sizes enlarged for kitchen reading: step text `font-size: 22px`; ingredient quantities `font-size: 28px; font-weight: 700`
- [ ] Screen sleep prevention: `navigator.wakeLock.request('screen')` on mount; released on unmount
- [ ] `wakeLock` failure (unsupported browser): silent catch — no error shown to user; note in `07_Guide.md`
- [ ] Each step rendered as a full-screen swipeable card; Framer Motion `drag="x"` with `dragConstraints`
- [ ] TypeScript: `RecipeStep = { stepNumber: number; instruction: string; techniqueVideoUrl: string | null; duration: string | null }`

### Story 4.2 — Technique Videos
**As a** subscriber,
**I want** to watch 30-second technique videos within the recipe guide,
**so that** I can learn professional skills as I cook.

**Acceptance criteria:**
- [ ] Technique video shown inline within a recipe step when `step.techniqueVideoUrl` is not null
- [ ] `<video controls preload="none" poster={thumbnailUrl}>` — not an iframe embed
- [ ] Video hosted on Cloudinary; URL format: `https://res.cloudinary.com/{cloud_name}/video/upload/f_auto,q_auto/{assetId}`
- [ ] `<track kind="captions" src="/captions/{recipeId}/{stepNumber}.vtt">` for accessibility
- [ ] Video tap-to-play on mobile; no autoplay — `autoPlay={false}` unconditionally
- [ ] Under `prefers-reduced-motion`: still tap-to-play; video plays normally (motion is user-initiated, not auto)

### Story 4.3 — Mise en Place Checklist
**As a** subscriber,
**I want** an interactive checklist to prepare all my ingredients before I start cooking,
**so that** I don't discover a missing ingredient mid-recipe.

**Acceptance criteria:**
- [ ] "Mise en Place" tab in Kitchen Mode shows all recipe ingredients as checklist items
- [ ] Each ingredient: `<input type="checkbox">` + ingredient name + quantity; checked state stored in `localStorage` keyed by `recipeId`
- [ ] Checked items render with `text-decoration: line-through; opacity: 0.5`
- [ ] "All prepped? Start cooking" CTA enabled only when all items are checked; disabled state: `opacity: 0.4; cursor: not-allowed`
- [ ] `localStorage` key: `mise-en-place-{recipeId}`; value: `string[]` of checked ingredient IDs
- [ ] TypeScript: `Ingredient = { id: string; name: string; quantity: string; unit: string }`; `getMiseEnPlaceState(recipeId: string): string[]`
