# 07 — Guide
## Engineering Standards · bw_platform_07

### 1. PrestigeMinimalism Checklist
- **Contrast:** Is the background strictly Deep Charcoal (#121212) on heros? (Avoid clinical White).
- **Rounding:** Are all buttons and cards strictly `rounded-none` (0px)?
- **Accolades:** Are international awards displayed prominently and in grayscale?
- **Speed:** Does the location switcher transition in under 400ms?

### 2. Coding Conventions
- **Routing Strategy:** Use Next.js `middleware` for hostname-based or geo-based location redirects to save user clicks.
- **Image Strategy:** All food shots must use `priority` and `quality={95}` to ensure Michelin-standard detail.
- **CMS Strategy:** Every menu item must be manually linked to a `chef_note` field to provide analytical value.
- **Booking Logic:** Ensure OpenTable scripts are only loaded when the "Reservations" button is clicked to maintain LCP.

### 3. File Structure
```
src/
  app/
    (hub)/          # indianaccent.com (Central Hub)
    (locations)/    # Delhi, NYC, Mumbai sub-sites
    gifting/        # Prestige gift shop and vouchers
    press/          # Global award and media archives
  components/
    portal/         # GlobalSwitcher, CityDropdown, LocationHero
    culinary/       # TastingMenuGrid, ChefNote, AccoladeStrip
    hospitality/    # PolicyBox, BookingOverlay, PrivateEventsForm
    layout/         # MinimalNav, CharcoalFooter, BrassButton
  store/            # useLocationStore, useBookingStore
  lib/              # sanity-client, opentable-utils, geo-routing
```

### 4. Definition of Done
- Global hub switcher flawlessly portals users into city-specific sub-sites.
- Tasting menu correctly renders high-res course photography with zero layout shift.
- Reservation engine mandatorily collects policy acceptance before triggering the widget.
- Mobile view maintains "Michelin Prestige" with high-contrast, responsive architectural blocks.
