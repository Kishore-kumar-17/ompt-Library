# 07 — Guide
## Engineering Standards · lp_platform_15

### 1. ElectricYouth Checklist
- **Vibe:** Is the background strictly Pitch Black? Is the accent strictly Electric Red?
- **FOMO:** Is there a visible countdown timer or "Stock Alert" on every product section?
- **Celebrity:** Is the personality shot the largest element in the launch section?
- **Mobile:** Do all grids support horizontal swiping/snapping? (Check Swiper.js config).

### 2. Coding Conventions
- **Countdown Strategy:** Use a single `useTimer` hook in Zustand to drive all on-screen clocks to ensure perfect synchronization.
- **Density Strategy:** Use 12px padding and 20px gaps to maintain high information density without clutter.
- **State Management:** Use `persist` in Zustand for the `rewardsPoints` state to maintain gamified momentum across sessions.
- **Image Strategy:** All lifestyle banners must use `priority` and `quality={90}` to maintain "High-Energy" visual pop.

### 3. File Structure
```
src/
  app/
    (hub)/          # boat-lifestyle.com (Central Launch Hub)
    tribe/          # Celebrity collections and personality pages
    launches/       # New product drops and promotional stories
    deals/          # Flash-sale archives and daily deal grids
  components/
    launch/         # HeroSlider, LaunchBadge, CelebrityPromo
    commerce/       # DailyDeals, CountdownTimer, FOMOTicker
    discovery/      # VibeGrid, VisualNav, CategorySlider
    layout/         # RobustNav, ElectricFooter, RewardsWidget
  store/            # useTimerStore, useRewardsStore, useCartStore
  lib/              # sanity-client, swiper-config, fomo-utils
```

### 4. Definition of Done
- Launch hub correctly establishes "Cultural Momentum" via high-impact sliders and celebrity shots.
- Flash-sale engine provides synchronized real-time timers across multiple components.
- Celebrity grids flawlessly link ambassadors to curated product collections.
- Mobile view maintains "Electric Energy" via responsive carousels and high-contrast badges.
