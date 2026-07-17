# 07 — Guide
## Engineering Standards · bw_platform_06

### 1. CoastalJoy Checklist
- **Atmosphere:** Is the background strictly Sunlight Cream (#FFF9F2)? (Avoid clinical White).
- **Mascot:** Is Rocky the Rooster appearing on at least 3 distinct pages?
- **Hierarchy:** Do environmental shots take visual priority over standard product shots?
- **Geometry:** Are all buttons and blocks strictly `rounded-none` (0px)?

### 2. Coding Conventions
- **Bento Strategy:** Use CSS Grid with `aspect-square` for small blocks and `aspect-video` for heros to ensure the modular feel.
- **Mascot Logic:** All mascot illustrations must be SVG to ensure perfect scaling and lightweight animation performance.
- **Data Strategy:** All menu prices must be stored as integers (Paise) and formatted as INR (₹) on the client side.
- **Hub Strategy:** Use a shared `SisterBrandStrip` component that can be injected into any Hunger Inc. property with a single prop change.

### 3. File Structure
```
src/
  app/
    (main)/         # Homepage, Our Story, Heritage
    menus/          # Dynamic text-based digital menus
    happy-times/    # Event carousels and festive blocks
    contact/        # High-touch bungalow inquiry portal
  components/
    bento/          # BentoEngine, BlockItem, HeroBanner
    media/          # RockyMascot, RockyBadge, EnvironmentalShot
    layout/         # MinimalNav, SunlightFooter, HubStrip
    menu/           # MenuList, SectionToggle, DishItem
  store/            # useNavStore, useMascotStore
  lib/              # sanity-client, supabase-client, price-formatter
```

### 4. Definition of Done
- Modular bento grid handles block reconfiguration flawlessly across breakpoints.
- Mascot "Rocky" integrates seamlessly with UI elements and hover interactions.
- Digital menu correctly filters and displays Goan-Portuguese dish descriptions.
- Mobile view maintains "Coastal Joy" via responsive carousels and scannable blocks.
