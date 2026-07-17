# 07 — Guide
## Engineering Standards · bw_platform_04

### 1. TropicalMinimalist Checklist
- **Whitespace:** Are vertical margins between sections at least 120px?
- **Hierarchy:** Are all major headers and nav links in All-Caps Montserrat?
- **Color:** Is the primary accent color consistent Citrus Yellow (#FDB913)?
- **Speed:** Does the primary homepage hero load with `priority` and under 1s?

### 2. Coding Conventions
- **Cross-Category Logic:** Every product in the CMS must be tagged with a `collection_id` to enable automatic "Pair it with" discovery.
- **Audio Strategy:** Ensure all music embeds are lazy-loaded to prevent slowing down the initial page render.
- **Image Strategy:** All high-res lifestyle shots must use `quality={90}` and specific `sizes` for responsive full-bleed displays.
- **Concierge Logic:** All gifting inquiries should be captured in Supabase and optionally routed to the brand's WhatsApp business API.

### 3. File Structure
```
src/
  app/
    (main)/         # Homepage, Lifestyle heros, About
    journal/        # Editorial narratives and Nico Radio
    collections/    # Thematic product hubs (Ganga, etc.)
    gift-shop/      # Gifting Concierge and curated grids
    product/        # Detailed high-res PDPs with pairing engine
  components/
    lifestyle/      # LifestyleHero, DiscoveryTile, JournalBlock
    discovery/      # PairingCarousel, ShopTheLook, SetBuilder
    navigation/     # AtelierNav, SkyFooter, StatusTicker
    forms/          # GiftingForm, ConciergeInquiry
  store/            # useGiftStore, useDiscoveryStore
  lib/              # sanity-client, shopify-client, algolia-utils
```

### 4. Definition of Done
- Cross-category discovery engine correctly surfaces related home items on fashion pages.
- Nico Journal stories reveal a seamless mix of audio, text, and interactive buy-points.
- Gifting Concierge hub provides instant, high-speed filtering across price points.
- Mobile view maintains "Airy Scale" via responsive carousels and clear all-caps typography.
