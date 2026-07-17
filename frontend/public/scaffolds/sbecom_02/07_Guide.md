# 07 — Guide
## Engineering Standards · sbecom_platform_02

### 1. Modern Indian Checklist
- **Color:** Is the primary button Deep Green (#004B23)?
- **Aesthetic:** Does the page feel "warm" rather than "clinical"? (Check background hex).
- **Mobile:** Are carousels used for product grids on mobile?
- **Naming:** Are categories ritual-based (e.g., "Quick Fix")?

### 2. Coding Conventions
- **Payments:** All subscription transactions must follow the Reserve Bank of India (RBI) e-mandate guidelines via Razorpay/Stripe.
- **AOV Logic:** Use `Zustand` to calculate cart rewards in real-time on the client side.
- **Data:** All currency values must be stored as integers (Cents/Paise) to avoid floating-point errors.
- **Images:** Use WebP format for product shots to ensure fast loading on 4G networks.

### 3. File Structure
```
src/
  app/
    (marketplace)/  # Home, Collections, Product Pages
    (account)/      # My Rituals Dashboard, Saved Addresses
  components/
    home/           # Bestsellers, RitualBlocks, LifestyleHero
    pantry/         # ProductCard, SubscribeToggle, CategoryGrid
    cart/           # CartDrawer, GiftProgressBar, Summary
  store/            # useCartStore, useSubscriptionStore
  lib/              # razorpay-utils, supabase, currency-formatter
```

### 4. Definition of Done
- "Subscribe & Save" toggle correctly reflects the 15% discount in the cart.
- Free gift is automatically added to the cart when the threshold is reached.
- Mobile LCP is under 1.5s for the homepage.
- All primary actions (Add to Cart, Subscribe) have tactile hover/active states.
