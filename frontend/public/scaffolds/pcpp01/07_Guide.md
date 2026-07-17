# 07 — Guide
## Engineering Standards · pcpp_platform_01

### 1. MuseumDark Checklist
- **Color:** Is the background pure black (#000000)? (No grey allowed).
- **Rounding:** Are all corners sharp (0px)?
- **Scale:** Are hero images spanning the full width of the viewport?
- **Navigation:** Is the UI "invisible" when the user is scrolling through a project?

### 2. Coding Conventions
- **Images:** All large-format images must use Next.js `<Image>` with specific `sizes` and `quality={90}`.
- **State:** Use Zustand for managing the `isTheaterMode` and `activeMedia` states.
- **Transitions:** Use Framer Motion's `AnimatePresence` for quick, cinematic page cuts.
- **Accessibility:** Ensure all video reels have descriptive aria-labels and pause controls on focus.

### 3. File Structure
```
src/
  app/
    (gallery)/      # Homepage, Category grids
    portfolio/      # Dynamic project pages
    director/       # Video reels and theater mode
    shop/           # Print storefront
  components/
    media/          # FullBleedImage, DiptychGrid, VideoLoop
    layout/         # MinimalNav, DarkFooter, Wordmark
    shop/           # PrintCard, CheckoutOverlay
  store/            # useGalleryStore, useShopStore
  lib/              # supabase, stripe, mux-config
```

### 4. Definition of Done
- Project pages load 2000px+ images smoothly without layout shift.
- Video reels auto-play and transition to theater mode flawlessly.
- Shop checkout is integrated and functional in test mode.
- Mobile view maintains the cinematic impact with high-contrast, large-scale imagery.
