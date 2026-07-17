# 05 — Epics & Stories
## Work Breakdown · sbecom_platform_03
### GlowProfile Beauty Discovery · Quiz-Driven Subscription Box

---

## Epic 1: High-Trust Personalization

### Story 1.1 — Multi-Step Visual Quiz
**As a** beauty enthusiast,
**I want** to navigate a personalization quiz using only icon-based selections,
**so that** the experience feels like a consultation, not a form.

**Acceptance criteria:**
- [ ] Quiz: 5 steps — skin type, skin concerns, hair texture, style preference, coverage level
- [ ] Each step renders 3–5 visual option tiles (icon + label); selection sets `quizStore.answers[step]`
- [ ] `quizStore`: `{ currentStep: number; answers: Record<string, string>; isComplete: boolean }` in Zustand with `persist` middleware
- [ ] Step transition: Framer Motion `<AnimatePresence>`; `initial={{ opacity: 0, x: 40 }}` → `animate={{ opacity: 1, x: 0 }}` — `200ms ease-out`
- [ ] Under `prefers-reduced-motion`: transitions skipped; steps change instantly at full opacity
- [ ] TypeScript: `QuizAnswers = { skinType: string; skinConcerns: string; hairTexture: string; stylePreference: string; coverageLevel: string }`

### Story 1.2 — Beauty Profile Summary
**As a** user,
**I want** to see my Beauty Profile Summary before I create an account,
**so that** I can verify the quiz captured my needs correctly before committing.

**Acceptance criteria:**
- [ ] Summary screen renders after step 5 of quiz, before the account creation prompt
- [ ] Summary shows: skin type, key concerns, hair texture, style — sourced from `quizStore.answers`
- [ ] "Edit" link next to each trait returns user to that quiz step with `quizStore.currentStep` set accordingly
- [ ] "This looks right — continue" CTA advances to account creation / plan selection
- [ ] Summary is a client component only; no API call at this step — data lives in Zustand
- [ ] TypeScript: `BeautyProfileSummary` is a presentational component accepting `answers: QuizAnswers` as props

### Story 1.3 — Analyzing Animation
**As a** user,
**I want** to see an "Analyzing your profile..." animation after completing the quiz,
**so that** the curation feels intelligent and personalised, not instant-generic.

**Acceptance criteria:**
- [ ] Animation plays for exactly 2000ms before transitioning to the Beauty Profile Summary
- [ ] Animation: pulsing logo mark or progress dots; implemented with Framer Motion `animate={{ opacity: [1, 0.3, 1] }}` looping
- [ ] "Analyzing your profile..." text below animation; copy is verbatim — do not rephrase
- [ ] Under `prefers-reduced-motion`: animation duration reduced to 0ms; text shows briefly (500ms) then transitions
- [ ] The 2000ms delay is `setTimeout`-based, not tied to a real API call in v1
- [ ] `quizStore.isComplete` set to `true` after the animation completes — not after the last question

---

## Epic 2: Commitment-Based Plans

### Story 2.1 — Plan Comparison (1 / 3 / 12 Months)
**As a** value-conscious shopper,
**I want** to compare 1-, 3-, and 12-month plans with "price per box" math,
**so that** I can see exactly how much I save by committing longer.

**Acceptance criteria:**
- [ ] Three plan cards fetched from `plans` table: `duration_months IN (1, 3, 12)`
- [ ] "Price per box" displayed: `plan.price_per_month_cents / 100` formatted as "$/month"
- [ ] Savings calculation for 3-month: `(1-month price - 3-month price) * 3` shown as "Save $X total"
- [ ] Savings calculation for 12-month: `(1-month price - 12-month price) * 12` shown as "Save $X total"
- [ ] TypeScript: `Plan = { id: string; durationMonths: 1 | 3 | 12; pricePerMonthCents: number; stripePriceId: string }`
- [ ] `calculateSavings(monthlyPrice: number, planPrice: number, months: number): number` — returns total savings in cents

### Story 2.2 — Best Value Highlight
**As a** shopper,
**I want** the best-value plan visibly highlighted,
**so that** I immediately see which option gives me the most for my money.

**Acceptance criteria:**
- [ ] 12-month plan card has "Best Value" badge: pastel pink background, dark text — positioned above the card border
- [ ] "Best Value" card: `border: 2px solid var(--color-accent)`; sibling cards: `border: 1px solid var(--color-border)`
- [ ] `border-radius: 16px` on all plan cards (playful premium aesthetic)
- [ ] "Best Value" badge: `position: absolute; top: -12px; left: 50%; transform: translateX(-50%)`
- [ ] No red/urgent colour on any plan badge — playful, not pressure-based
- [ ] Selected plan: card gains `box-shadow: 0 0 0 3px var(--color-accent)` — no `outline` used

### Story 2.3 — Renewal Terms Disclosure
**As a** shopper,
**I want** to understand renewal terms and the cancellation window before I pay,
**so that** I feel safe committing to a longer plan.

**Acceptance criteria:**
- [ ] Below plan cards: "Your plan auto-renews on {renewalDate}. Cancel anytime from your account before then."
- [ ] Renewal date: `new Date()` + `durationMonths * 30` days; formatted as "Jun 15, 2026"
- [ ] "Cancel anytime" is a `<button>` that opens a modal explaining the cancellation process (not a link to a page)
- [ ] Modal content: steps to cancel, what happens to current month's box, no penalty confirmed
- [ ] Cancel-anytime modal uses Radix `<Dialog>`; `aria-label="Cancellation policy"`
- [ ] TypeScript: `renewalDate(planDurationMonths: number): Date` — `addMonths(new Date(), planDurationMonths)` using `date-fns`

---

## Epic 3: The Unboxing Delight

### Story 3.1 — Digital Box Reveal
**As a** subscriber,
**I want** to view my Digital Reveal on the 1st of each month,
**so that** I feel the excitement of discovering my curated samples before the box arrives.

**Acceptance criteria:**
- [ ] Dashboard `/account/box` shows current month's `boxes` row; locked until `delivery_month = CURRENT_DATE`'s first of month
- [ ] Before reveal date: card shows "Your box reveals on {date}" with a blurred/obscured product image
- [ ] After reveal date: each sample shown with product name, brand, `<img>` and "How to Use" video thumbnail
- [ ] Blurred pre-reveal: CSS `filter: blur(12px); pointer-events: none` on product images — not a placeholder image swap
- [ ] TypeScript: `Box = { id: string; deliveryMonth: string; productSamples: string[]; isRated: boolean }`
- [ ] `isRevealDate(deliveryMonth: string): boolean` — returns `true` if `today >= first day of deliveryMonth`

### Story 3.2 — Rate Samples for Glow Points
**As a** subscriber,
**I want** to rate each sample and earn Glow Points,
**so that** I'm rewarded for engagement and my feedback improves future curation.

**Acceptance criteria:**
- [ ] Star rating input (1–5) per sample; rendered as 5 `<button>` star icons with `aria-label="Rate {n} stars"`
- [ ] `POST /api/reviews`: inserts into `sample_reviews`; triggers DB function that adds 10 Glow Points to `users.glow_points`
- [ ] Glow Points updated atomically: `UPDATE users SET glow_points = glow_points + 10 WHERE id = $1` — no race condition
- [ ] After rating: star buttons `disabled`; "Rated ✓" label shown; Points toast "+10 Glow Points earned"
- [ ] `boxes.is_rated` set to `true` when all samples in the box have been rated
- [ ] TypeScript: `SampleReview = { id: string; boxId: string; productId: string; rating: number; createdAt: Date }`

### Story 3.3 — How-To Tutorial Video
**As a** subscriber,
**I want** to watch a short "How to use" video matched to my skin type,
**so that** I get the best results from samples tailored to my profile.

**Acceptance criteria:**
- [ ] Each sample product may have a `tutorial_video_url`; if null, no video section rendered for that sample
- [ ] Video rendered as `<video controls preload="none" poster={thumbnailUrl}>`; not embedded YouTube (privacy concern)
- [ ] Video hosted on Cloudinary; URL includes transformation `f_auto,q_auto` for optimised delivery
- [ ] Video `aria-label="{productName} — how to use"` and `<track kind="captions">` for accessibility
- [ ] Under `prefers-reduced-motion`: video does not autoplay; `autoPlay={false}` unconditionally
- [ ] TypeScript: `Product` extended: `tutorialVideoUrl: string | null`; `null` renders "No tutorial available"

---

## Epic 4: The Commerce Loop

### Story 4.1 — Buy Full Size from Sample
**As a** happy subscriber,
**I want** to click "Buy Full Size" directly from a sample I've rated,
**so that** I can purchase the product I loved without searching the shop.

**Acceptance criteria:**
- [ ] Each sample card has a "Buy Full Size" CTA button; links to `products.full_size_product_id` in the shop
- [ ] If `full_size_product_id` is null: button hidden — not disabled; no "unavailable" state
- [ ] CTA triggers add-to-cart for the full-size product; buyer taken to `/checkout` with item pre-filled
- [ ] TypeScript: `products.fullSizeProductId: string | null` — the JOIN `products AS full WHERE full.is_sample = false`
- [ ] "Buy Full Size" button style: `background: var(--color-accent); color: #FFFFFF; border-radius: 999px` (pill — playful premium)
- [ ] Clicking "Buy Full Size" on a rated sample fires a PostHog event `sample_to_full_size_clicked` with `productId` and `rating`

### Story 4.2 — Glow Points Redemption
**As a** subscriber,
**I want** to automatically apply my Glow Points at checkout to reduce my total,
**so that** my engagement is directly rewarded with savings.

**Acceptance criteria:**
- [ ] Checkout page shows "Glow Points Balance: {points}" if user has points > 0
- [ ] "Apply Glow Points" toggle; 100 points = ₹10 / $1 discount (configurable in `platform_settings`)
- [ ] `applyGlowPoints(orderTotal: number, points: number, rate: number): { discount: number; pointsUsed: number }` — never reduces order below $0
- [ ] Discount applied as Stripe coupon with `amount_off` set dynamically; Glow Points deducted atomically in the webhook after payment
- [ ] Points deducted atomically: `UPDATE users SET glow_points = glow_points - $pointsUsed WHERE id = $1 AND glow_points >= $pointsUsed`
- [ ] TypeScript: `GlowPointsResult = { discount: number; pointsUsed: number; remainingPoints: number }`

### Story 4.3 — Personalised Shop Recommendations
**As a** subscriber,
**I want** to see shop recommendations based on my Beauty Profile quiz data,
**so that** I don't have to browse hundreds of products manually.

**Acceptance criteria:**
- [ ] Shop `/shop` page: top section "Picked for You" based on `profiles.skin_type` and `profiles.skin_concerns`
- [ ] Recommendation query: `SELECT p.* FROM products p WHERE p.skin_type_tags @> ARRAY[$skinType] AND p.is_sample = false ORDER BY p.rating_avg DESC LIMIT 8`
- [ ] `products.skin_type_tags text[]`: e.g., `['oily', 'combination']`; tagged by content team
- [ ] Unauthenticated visitors: "Picked for You" section hidden; replaced with bestsellers — no quiz prompt in the shop
- [ ] TypeScript: `getRecommendations(skinType: string, skinConcerns: string[]): Promise<Product[]>`
- [ ] "Picked for You" section label: `font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em` — subdued label, not a hero heading
