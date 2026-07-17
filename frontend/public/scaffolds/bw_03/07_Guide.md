# 07 — Guide
## Engineering Standards · bw_platform_03

### 1. SutaStyle Checklist
- **Rounding:** Are all buttons and cards using the `rounded-xl` (12px) standard?
- **Color:** Are Suta Red (#E31E24) and Teal (#3AA4CB) used for all functional highlights?
- **Reels:** Do horizontal product reels snap to the grid correctly on mobile?
- **Inclusion:** Are out-of-stock sizes visible but disabled? (Do not hide).

### 2. Coding Conventions
- **Offer Logic:** All bundle discounts (Buy 3 Get 1) must be calculated in the Zustand store to ensure real-time UI updates.
- **Image Strategy:** Use `priority` for the first 2 items in every horizontal reel to optimize perceived performance.
- **CMS Strategy:** Use the Sanity `portable-text` package to allow for seamless embedding of `BuyPoint` components within stories.
- **Communication:** Every order confirmation should include a "Help via WhatsApp" link with pre-filled order context.

### 3. File Structure
```
src/
  app/
    (marketplace)/  # Homepage, Reels, Categories
    suta-book/      # Story-led collection narratives
    community/      # Customer testimonials and influencer picks
    account/        # Profile and community preferences
  components/
    reels/          # ReelEngine, ProductCard, QuickBuy
    narrative/      # StoryRenderer, BuyPoint, EvocativeTitle
    cart/           # CartDrawer, OfferProgressBar, Summary
    layout/         # CommunityNav, VibrantHero, TealFooter
  store/            # useCartStore, useOfferStore
  lib/              # sanity-client, whatsapp-api, offer-utils
```

### 4. Definition of Done
- Horizontal reels operate smoothly with momentum and snap-scrolling.
- "Suta Book" stories seamlessly integrate narrative and instant purchase logic.
- Cart offer engine correctly calculates complex bundle discounts in real-time.
- Mobile view maintains "Homely Vibe" with responsive, high-vibrancy editorial blocks.
