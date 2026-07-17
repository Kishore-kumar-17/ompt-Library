# 07 — Guide
## Engineering Standards · bw_platform_02

### 1. DramaticLuxury Checklist
- **Color:** Is the background strictly Vintage Sepia (#F4F1EA)? (Avoid pure White).
- **Hierarchy:** Are all headers using the wide-tracked Serif font (0.15em)?
- **Geometry:** Are all buttons and cards strictly `rounded-none` (0px)?
- **Interaction:** Does the site replace "Buy" with "Explore/Inquire" for luxury items?

### 2. Coding Conventions
- **Asset Strategy:** Every portrait must have an explicit `aspect-ratio` to prevent layout shift during the cinematic scroll.
- **CMS Strategy:** Use "Chapter" based tagging in Sanity to group media into chronological story sequences.
- **Image Strategy:** All heros and portraits must use `priority` and `quality={100}` for professional editorial clarity.
- **Routing:** Use Next.js Middleware to manage different language/region entry points if required.

### 3. File Structure
```
src/
  app/
    (main)/         # Homepage, Stores, Heritage
    stories/        # Thematic collection deep-dives
    high-jewellery/ # Specialized jewellery archives
    contact/        # High-touch boutique inquiry hub
  components/
    cinematic/      # PortraitHero, PortraitGrid, PoeticIntro
    retail/         # FlagshipCard, StoreLocator, InquiryForm
    layout/         # MinimalNav, SepiaFooter, SpacedHeader
    ui/             # LuxuryBarrier, GoldBadge, NeutralModal
  store/            # useNavStore, useInquiryStore
  lib/              # sanity-client, supabase-client, lead-router
```

### 4. Definition of Done
- Vertical portrait grids load and reveal smoothly with zero layout shift.
- "Luxury Barrier" logic correctly triggers inquiry flows instead of standard checkout.
- Retail Hub locator correctly identifies and displays global flagship details.
- Mobile view maintains "Dramatic Aura" with high-contrast, prestigious branding.
