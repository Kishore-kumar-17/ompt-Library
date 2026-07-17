# 07 — Guide
## Engineering Standards · pcpp_platform_13

### 1. AnalystAusterity Checklist
- **Reading:** Is the text container strictly 680px max-width?
- **Color:** Is Stratechery Blue (#004B87) used consistently for all strategic accents?
- **Diagrams:** Are diagrams rendered as SVGs (not raster images) to ensure 4K clarity?
- **Delivery:** Do all member feeds use unique, tracked tokens for security?

### 2. Coding Conventions
- **RSS/Podcast:** All private feeds must be generated on the fly via Edge Functions to ensure real-time access control.
- **CMS Management:** Every earnings analysis must be linked to both a "Company" and a "Concept" framework in the CMS.
- **Typography:** Strictly use the `prose-lg` class with custom serif overrides for the long-form analysis body.
- **Privacy:** Never include third-party trackers or ad-retargeting pixels in the member-only area.

### 3. File Structure
```
src/
  app/
    (feed)/         # Homepage chronological stream
    analysis/       # Long-form strategy essays
    concepts/       # Framework index and detail pages
    dashboard/      # Passport delivery and billing
    api/            # Edge functions for RSS/Podcast XML
  components/
    reading/        # TypographyEngine, ThompsonDiagram, ConceptHeader
    delivery/       # PassportEngine, FeedCard, DeliverySettings
    membership/     # PlusBundleCard, SubscriptionOverlay, StripePortal
    layout/         # MinimalNav, PaperFooter, Wordmark
  store/            # useNavStore, useMemberStore
  lib/              # sanity-client, stripe-utils, algolia-config
```

### 4. Definition of Done
- Strategy essays load instantly and render with perfect authoritative typography.
- "Thompson Diagrams" are responsive and display correctly within the text flow.
- Personalized RSS/Podcast feeds are functional and secure.
- "Stratechery Plus" bundling logic correctly handles multi-stream access and billing.
