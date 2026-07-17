# 07 — Guide
## Engineering Standards · bw_platform_01

### 1. HeritageLuxury Checklist
- **Whitespace:** Are section margins at least 120px on desktop?
- **Geometry:** Are all buttons and cards strictly `rounded-none` (0px)?
- **Color:** Is the primary CTA always Antique Gold (#D4AF37) on White?
- **Typography:** Is the Serif heading font used for all prestige titles?

### 2. Coding Conventions
- **Video Strategy:** Use `muted`, `loop`, and `playsInline` for all artisanal background videos to ensure high performance.
- **CMS Strategy:** Every product from Shopify must be manually mapped to a Sanity `Craft` object to surface narrative content.
- **Image Strategy:** All detail shots must use `quality={100}` and specific `unoptimized={true}` settings for RAW-level fabric clarity.
- **Concierge Logic:** Use the `whatsapp-link` pattern with pre-filled message templates including product name and SKU.

### 3. File Structure
```
src/
  app/
    (main)/         # Homepage, Collection heros, About
    collections/    # Seasonal couture and bridal edits
    craft/          # Technique-based discovery hubs
    grassroot/      # Sustainable label standalone section
    product/        # Detailed high-res PDPs
  components/
    atelier/        # CollectionHero, StoryBlock, PrestigeStrip
    craft/          # CraftGrid, BehindTheCraftVideo, DetailZoom
    layout/         # AtelierNav, GoldDivider, LuxuryFooter
    service/        # ConciergeButton, AppointmentForm, RegionSelector
  store/            # useConciergeStore, useBagStore
  lib/              # sanity-client, shopify-client, mux-utils
```

### 4. Definition of Done
- Collection heros load and play smoothly with poster-image fallbacks.
- Craft Discovery navigation correctly filters products by artisanal technique.
- Product Detail pages reveal deep-dive craftsmanship videos with zero layout shift.
- Mobile view captures the "Modern Heritage" feel with high-contrast, prestigious branding.
