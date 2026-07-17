# 07 — Guide
## Engineering Standards · pcpp_platform_11

### 1. AuthorialInsight Checklist
- **Trust:** Are the publication logos grayscale and clearly visible?
- **Hierarchy:** Does the book showcase take visual priority over single articles?
- **Typography:** Is the Serif heading font used for all intellectual titles?
- **Speed:** Does the site load in under 1s? (Text-heavy content target).

### 2. Coding Conventions
- **CMS Logic:** Use Sanity `draft-mode` to allow the author to preview book launches before they go live.
- **Image Strategy:** All book covers and portraits must use `priority` and `quality={100}` for premium detail.
- **State Management:** Use `Zustand` to handle the global "Region" state for localized book links.
- **Forms:** Use `react-hook-form` with custom minimalist black-and-white components for inquiries.

### 3. File Structure
```
src/
  app/
    (main)/         # Homepage, Books, Awards
    portfolio/      # Filterable article archive
    about/          # Narrative bio and portraits
    contact/        # Professional inquiry portal
  components/
    portfolio/      # ArticleList, SubjectFilter, PublicationMarker
    books/          # BookHero, BuyLinkEngine, AcclaimBadge
    layout/         # MinimalNav, PrestigeStrip, PaperFooter
    forms/          # InquiryForm, NeutralInput
  store/            # usePortfolioStore, useRegionStore
  lib/              # sanity-client, supabase-client, resend-utils
```

### 4. Definition of Done
- Article portfolio correctly filters and displays thousands of CMS entries instantly.
- Book showcase handles regional purchase URLs flawlessly.
- Awards wall presents years of accolades in a clean, authoritative list.
- Mobile view maintains "Authorial Prestige" with high-contrast, responsive editorial blocks.
