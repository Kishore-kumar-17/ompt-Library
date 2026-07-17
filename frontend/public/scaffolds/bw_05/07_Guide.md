# 07 — Guide
## Engineering Standards · bw_platform_05

### 1. CulinaryNarrative Checklist
- **Atmosphere:** Is the background strictly Parchment (#FFFDF6)? (Avoid clinical White).
- **Icons:** Are all menu categories represented by their custom illustrative icons?
- **Hierarchy:** Do dish stories take visual priority over price tags?
- **Booking:** Is the reservation drawer accessible from any point on the homepage?

### 2. Coding Conventions
- **Asset Strategy:** Use SVG for all custom menu icons to ensure perfect scaling across all screen sizes.
- **CMS Strategy:** Use the Sanity `orderable-list` plugin to allow chefs to manually sequence seasonal menu items.
- **Image Strategy:** All food photography must use `quality={90}` and `placeholder="blur"` for Appetizing load times.
- **Accessibility:** Ensure the booking drawer has proper focus-trapping and keyboard "Esc" to close support.

### 3. File Structure
```
src/
  app/
    (main)/         # Homepage, Narrative scroll, About
    menu/           # Dynamic icon-led digital menu
    stories/        # Canteen blog and community events
    shop/           # Merch and Gift Card storefront
    contact/        # Private event and career inquiries
  components/
    hospitality/    # NarrativeCard, IconTab, DishList
    reservations/   # BookingDrawer, WidgetEmbed, StatusHeader
    layout/         # StickyNav, ParchmentFooter, HighlightStrip
    merch/          # ShopGrid, ProductCard, GiftCheckout
  store/            # useBookingStore, useCartStore
  lib/              # sanity-client, reservation-utils, shopify-client
```

### 4. Definition of Done
- Narrative homepage scroll reveals a seamless mix of philosophy and hero imagery.
- Digital menu correctly anchors to categories with charming illustrative icons.
- Reservation drawer handles third-party widget embeds with zero layout shift.
- Mobile view maintains "Communal Delight" via responsive carousels and sticky booking bars.
