# 07 — Guide
## Engineering Standards · sbecom_platform_04

### 1. Culinary Editorial Checklist
- **Color:** Is the primary action color consistent Deep Navy (#0F3460)?
- **Typography:** Are all recipe titles and section headers using the Serif font?
- **Layout:** Does the dashboard use a sidebar for real-time box status?
- **Aesthetic:** Are images high-contrast and moody? (Avoid generic bright studio lighting).

### 2. Coding Conventions
- **Add-on Logic:** Subscription items must be managed as individual units in the database to support partial skipping (e.g., skip wine but keep meals).
- **Data Safety:** All financial values (Market + Subscription) must be handled in Cents to avoid floating-point errors.
- **Media:** Use `placeholder="blur"` and `priority` for the main Hero dish image in the dashboard.
- **State:** Zustand state should be cleared only after a successful Stripe checkout confirmation.

### 3. File Structure
```
src/
  app/
    (dashboard)/    # Meal selection, Wine cellar, Box status
    (onboarding)/   # Chef's Profile, Plan Selector, Initial Checkout
    (market)/       # Tools, Celebration kits
  components/
    recipes/        # SelectionGrid, RecipeCard, SidePanel
    wine/           # CellarIntegration, PairingBadge, TastingNotes
    guide/          # KitchenMode, VideoPlayer, MiseEnPlaceList
    ui/             # SerifHeader, NavyButton, GoldBadge
  store/            # useBoxStore, useMarketStore
  lib/              # supabase, stripe, media-optimizer
```

### 4. Definition of Done
- User can select a meal and its linked wine pairing is correctly reflected in the sidebar.
- Onboarding quiz results accurately map to a plan recommendation.
- Mobile "Kitchen Mode" provides a seamless, distraction-free cooking experience.
- Payout and add-on billing logic verified via Stripe Test Mode.
