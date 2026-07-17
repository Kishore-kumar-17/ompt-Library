# 05 — Epics & Stories
## Work Breakdown · sbecom_platform_01
### FreshZest Meal-Kit Subscription · HelloFresh-style

---

## Epic 1: High-Conversion Onboarding

### Story 1.1 — Real-Time Cost Calculator
**As a** new user,
**I want** to see my weekly cost update instantly as I change people count and recipe count,
**so that** I can configure a plan I'm comfortable paying before I commit.

**Acceptance criteria:**
- [ ] Plan Selector: `peopleCount` stepper (2, 3, 4, 5, 6) and `mealsPerWeek` stepper (2, 3, 4, 5)
- [ ] `calculatePrice(people: number, meals: number): number` — returns total weekly price in cents; sourced from a `pricing_matrix` table, not hardcoded
- [ ] `planStore.basePrice` updated on every stepper change via Zustand `setPlan({ peopleCount, mealsPerWeek })`
- [ ] Price displayed as "/week" with first-box discount crossed out: `<del>$79.99</del> $39.99 first box`
- [ ] `<del>` tag used for original price — not `text-decoration: line-through` on a `<span>`
- [ ] TypeScript: `PlanStore = { peopleCount: number; mealsPerWeek: number; basePrice: number }`

### Story 1.2 — Persistent Order Summary
**As a** new user,
**I want** to see a live Order Summary panel on every onboarding step,
**so that** I always know what I'm committing to before I enter payment.

**Acceptance criteria:**
- [ ] Order Summary sidebar visible on all 4 steps (Plan / Account / Delivery / Payment) at `≥1024px`
- [ ] Mobile (`<1024px`): Order Summary collapsed into a sticky footer bar showing total only; tap to expand
- [ ] Summary items: Plan description, Discount line (green), Shipping ($0 on first box), Weekly Total
- [ ] Summary updates without re-render of the form; Zustand `useCheckoutStore` drives all values
- [ ] Discount line: `color: #16A34A` — no other element on the summary uses this colour
- [ ] TypeScript: `OrderSummary = { planLabel: string; weeklyPrice: number; discount: number; shipping: number; total: number }`

### Story 1.3 — Back Button with State Preservation
**As a** new user,
**I want** to go back to a previous step without losing my selections,
**so that** I can change my plan without restarting the whole flow.

**Acceptance criteria:**
- [ ] Multi-step form managed by `useOnboardingStore`; `currentStep: 0 | 1 | 2 | 3` in Zustand
- [ ] "Back" button calls `useOnboardingStore.prevStep()`; does not clear any store slice
- [ ] On returning to Step 1 (Plan): `peopleCount` and `mealsPerWeek` values restored from `planStore`
- [ ] Browser back button also respects step state: `useEffect(() => { window.history.pushState({ step }, '') }, [step])`; `popstate` event calls `prevStep()`
- [ ] TypeScript: `OnboardingStore = { currentStep: number; nextStep: () => void; prevStep: () => void }`
- [ ] Step 4 (Payment): if user navigates back from here, Stripe PaymentIntent is NOT recreated on re-entry — existing `clientSecret` reused

---

## Epic 2: The Meal Selection Reward

### Story 2.1 — Recipe Filters
**As a** subscriber,
**I want** to filter recipes by dietary type,
**so that** I only see meals that fit my household's preferences.

**Acceptance criteria:**
- [ ] Filter chips: "All" | "Quick (≤20 min)" | "Veggie" | "Family Friendly" rendered as `<button role="tab" aria-selected>`
- [ ] Filter maps to `recipes.dietary_tags` array: "Quick" → `.contains('dietary_tags', ['quick'])`, "Veggie" → `['veggie']`
- [ ] "Family Friendly" → `['family-friendly']`; multiple tags can coexist on a recipe
- [ ] Filter state in `boxStore.activeFilter`; changing filter does not clear already-selected recipes
- [ ] TypeScript: `type RecipeFilter = 'all' | 'quick' | 'veggie' | 'family-friendly'`
- [ ] Zero-result filter: "No {filter} recipes this week" — not a blank grid

### Story 2.2 — Box Progress Bar
**As a** subscriber,
**I want** to see a visual progress bar filling as I add recipes,
**so that** I feel rewarded for completing my box selection.

**Acceptance criteria:**
- [ ] Progress bar: `<progress value={selectedCount} max={mealsPerWeek} aria-label="Box fullness">`
- [ ] Fill colour: Salem green; bar background: light grey — no hex values; `var(--color-brand)` and `var(--color-surface-3)`
- [ ] Label above bar: "2 of 3 meals chosen" — updates reactively via `boxStore.selectedRecipeIds.length`
- [ ] When `selectedCount === mealsPerWeek`: bar turns fully green; label changes to "Box complete! ✓"
- [ ] "Confirm Box" button only enabled when `selectedCount === mealsPerWeek`; otherwise `disabled` with `cursor: not-allowed`
- [ ] TypeScript: `BoxStore = { selectedRecipeIds: string[]; addRecipe: (id: string) => void; removeRecipe: (id: string) => void }`

### Story 2.3 — Recipe Cards with Nutrition
**As a** subscriber,
**I want** to view high-resolution photos and calorie counts before selecting a recipe,
**so that** I can make informed choices for my family.

**Acceptance criteria:**
- [ ] Recipe card: `aspect-ratio: 4 / 3` image (`object-fit: cover`), recipe name `<h3>`, prep time, calories, dietary tag badges
- [ ] Images use Next.js `<Image>` with `sizes="(max-width: 640px) 100vw, 50vw"` — no raw `<img>` tags
- [ ] Calorie badge: `{calories} kcal` in a pill; prep time badge: `{prepTime} min` in a pill — pill style `border-radius: 999px`
- [ ] "Selected" state: card gets a green checkmark overlay and `box-shadow: 0 0 0 3px var(--color-brand)`
- [ ] At-max state (box full): unselected cards show `opacity: 0.5` and "Remove a meal to swap" tooltip on hover
- [ ] TypeScript: `Recipe = { id: string; title: string; imageUrl: string; dietaryTags: string[]; calories: number; prepTimeMinutes: number }`

---

## Epic 3: Subscription Flexibility

### Story 3.1 — Skip a Week
**As a** subscriber,
**I want** to skip next week's delivery with a single click,
**so that** I don't receive a box when I'm travelling or don't need it.

**Acceptance criteria:**
- [ ] Dashboard "Upcoming Deliveries" card shows next delivery date and "Skip this week" button
- [ ] `POST /api/subscriptions/skip` sets `user_boxes.is_skipped = true` for the target `delivery_date`; does not cancel the Stripe subscription
- [ ] Skipped week shows as "Skipped" badge in the delivery list; "Undo Skip" CTA available until 3 days before delivery
- [ ] Stripe subscription billing is NOT paused for a skip — skip is a logistics event only; billing continues
- [ ] Toast on success: "Week of {date} skipped. No box will be delivered." — auto-dismisses at 3s
- [ ] TypeScript: `skipDelivery(userId: string, deliveryDate: string): Promise<void>`

### Story 3.2 — Change Plan Preference
**As a** subscriber,
**I want** to permanently change my plan (e.g., move to Veggie-only meals),
**so that** my subscription adapts as my lifestyle changes.

**Acceptance criteria:**
- [ ] Plan preferences: `dietary_preference text` on `subscriptions` table; values `'omnivore' | 'vegetarian' | 'family'`
- [ ] Change takes effect from the next weekly cycle — not the current in-progress box
- [ ] Stripe subscription `metadata.dietary_preference` updated via `stripe.subscriptions.update()`; used for fulfilment but does not change price
- [ ] TypeScript: `type DietaryPreference = 'omnivore' | 'vegetarian' | 'family'`
- [ ] Effective-date note displayed: "Your new preference will apply from {nextCycleDate}"
- [ ] Confirmation modal before saving: "Are you sure you want to switch to Veggie-only meals?"

### Story 3.3 — Manage Payment and Address
**As a** subscriber,
**I want** to update my payment method and delivery address in the dashboard,
**so that** my subscription keeps working after I move or change cards.

**Acceptance criteria:**
- [ ] Payment method update: Stripe `SetupIntent` flow; new payment method attached to `stripe_customer_id`; old method detached
- [ ] Address update form: street, city, state, postcode, country — validated with Zod; updates `subscriptions.delivery_address jsonb`
- [ ] Address change does not affect current week's delivery if it is already locked (`user_boxes.is_locked = true`)
- [ ] "Delivery address locked" notice shown when `is_locked = true`; new address takes effect next cycle
- [ ] TypeScript: `DeliveryAddress = { street: string; city: string; state: string; postcode: string; country: string }`
- [ ] Current payment method displayed as masked card: "Visa ending in 4242" — via Stripe `paymentMethod.card.last4`

---

## Epic 4: Trust and Reassurance

### Story 4.1 — Verified Reviews on Plan Selector
**As a** sceptical visitor,
**I want** to see verified customer reviews near the Plan Selector,
**so that** I feel confident before entering my credit card.

**Acceptance criteria:**
- [ ] Reviews section positioned directly below the Plan Selector, above the "Start Cooking" CTA
- [ ] Shows: star rating aggregate (e.g., "4.8 ★"), review count ("2,400+ reviews"), 3 review cards
- [ ] Review cards: reviewer name (first name + last initial), rating stars, one-sentence quote, verified badge "Verified Subscriber"
- [ ] Reviews are static CMS content in `v1`; no live Supabase query — hardcoded in a `reviews.json` fixture
- [ ] `reviews.json` note in `07_Guide.md`: "Replace with live Supabase query in v2"
- [ ] Aggregate star rating: `color: #CA8A04` (amber); text contrast against white background ≥ 4.5:1 ✓

### Story 4.2 — Cancel Anytime Messaging
**As a** sceptical visitor,
**I want** to see "Cancel Anytime" messaging clearly during onboarding,
**so that** the subscription commitment feels low-risk.

**Acceptance criteria:**
- [ ] "Cancel Anytime" text appears in the onboarding footer on all 4 steps — not just Step 1
- [ ] Footer copy: "No commitment. Cancel anytime from your dashboard. No fees." — verbatim; do not rephrase
- [ ] Font: `font-size: 13px; color: var(--color-text-muted)`; must not be smaller than 13px
- [ ] Actual cancellation route exists at `POST /api/subscriptions/cancel`; calls `stripe.subscriptions.cancel({ prorate: false })`
- [ ] Cancellation confirmation email sent via Resend within 60 seconds
- [ ] TypeScript: `cancelSubscription(subscriptionId: string): Promise<void>`

### Story 4.3 — Free Shipping First Box
**As a** first-time visitor,
**I want** to see "Free Shipping on your first box" prominently,
**so that** the initial financial barrier feels lower.

**Acceptance criteria:**
- [ ] Free shipping badge on the Plan Selector: green pill "Free shipping on first box" positioned above the price display
- [ ] Order Summary shipping line for new users: "Shipping — FREE" in `color: #16A34A`; line struck through original cost if > 0
- [ ] Discount applied at checkout: Stripe coupon `FIRST_BOX_FREE_SHIP` applied to the first invoice only
- [ ] Coupon applied automatically — not via a user-entered promo code
- [ ] After first box: Stripe coupon removed from subscription; shipping line in Order Summary shows standard rate
- [ ] TypeScript: `isFirstBox(userId: string): Promise<boolean>` — checks `SELECT COUNT(*) FROM user_boxes WHERE user_id = $1`; returns `true` if count = 0
