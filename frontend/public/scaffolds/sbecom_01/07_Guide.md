# 07 — Guide
## Engineering Standards · sbecom_platform_01

### 1. Vibrant Culinary Checklist
- **Color:** Is every primary action button Salem Green (#067A46)?
- **Typography:** Are small callouts using the "Script" font (e.g., Caveat)?
- **Onboarding:** Does the "Order Summary" correctly reflect the current plan state?
- **Motion:** Do screens slide in from the right when moving "Forward" in the flow?

### 2. Coding Conventions
- **State Management:** Strictly use Zustand for cross-step data. Do not use local storage directly.
- **Forms:** Use `react-hook-form` with `zod` for all onboarding inputs.
- **Images:** All recipe images must use Next.js `<Image>` with `priority` for the top 4 recipes to optimize LCP.
- **Accessibility:** Multi-step forms must support `Enter` to proceed to the next step.

### 3. File Structure
```
src/
  app/
    (onboarding)/   # Signup flow (Plan, Account, Delivery, Payment)
    (dashboard)/    # Active subscriber area (Manage Box, History)
  components/
    onboarding/     # ProgressBar, OrderSummary, PlanCard
    meals/          # RecipeGrid, RecipeCard, BoxStatus
    shared/         # Navbar, Buttons, Stickers
  store/            # useOnboardingStore, useBoxStore
  lib/              # supabase, stripe, date-utils
```

### 4. Definition of Done
- Onboarding flow preserves data on browser refresh.
- "Meal Picker" is accessible immediately after payment success.
- Mobile view allows for easy "1-tap" recipe selection.
- All pricing logic is handled on the server (Stripe) to prevent client-side manipulation.
