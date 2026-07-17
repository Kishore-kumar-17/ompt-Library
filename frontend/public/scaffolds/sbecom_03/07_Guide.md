# 07 — Guide
## Engineering Standards · sbecom_platform_03

### 1. Playful & Premium Checklist
- **Rounding:** Is every card and button using at least `rounded-2xl` (16px)?
- **Color:** Are CTAs using the Soft Peony (#F9A8D4)?
- **Quizzes:** Does every quiz step have a "Back" button and a progress indicator?
- **Motion:** Do elements fade and slide gracefully? (Avoid "instant" visibility changes).

### 2. Coding Conventions
- **State:** Use `zustand/middleware/persist` for the quiz to handle page refreshes during onboarding.
- **Images:** All hero and product images must have `placeholder="blur"` to maintain a premium feel during load.
- **Logic:** Link samples to full-size products via a `full_size_sku` foreign key in the database.
- **Accessibility:** Use `aria-live` for the "Analyzing..." loader to inform screen readers of progress.

### 3. File Structure
```
src/
  app/
    (onboarding)/   # Quiz, Plans, Checkout
    (dashboard)/    # My Box, Unboxing reveal
    (shop)/         # Full-size catalog, Product pages
  components/
    quiz/           # VisualOption, ProgressStepper, StepSwitcher
    dashboard/      # BoxGrid, SampleCard, RatingStars
    shop/           # ProductCard, PointsIndicator, FilterSidebar
  store/            # useQuizStore, useBoxStore
  lib/              # supabase, stripe, points-calculator
```

### 4. Definition of Done
- Quiz results are successfully saved to the User's Supabase profile.
- Stripe subscription includes the correct metadata for the commitment period.
- Dashboard reveals 5 samples with a "Reveal" animation on first load.
- Mobile quiz is 100% accessible with thumb-friendly tap targets.
