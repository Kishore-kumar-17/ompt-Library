# 07 — Guide
## Engineering Standards · pcpp_platform_09

### 1. MarginaliaTimeless Checklist
- **Color:** Is the background warm paper (#FAF9F6)? (Avoid pure #FFFFFF).
- **Reading:** Is the text container strictly 720px max-width?
- **Leading:** Is the body text line-height at least 1.8?
- **Ads:** Are there ZERO ads, pop-ups, or sponsor banners in the UI?

### 2. Coding Conventions
- **CMS Management:** Every essay must be tagged with at least one "Subject" and at least two "Complementary" links to maintain the thread engine.
- **Typography:** Strictly use the `prose-xl` class with custom serif overrides for the essay body.
- **Search:** Use `Algolia` for the deep-archive indexing to ensure sub-100ms response times for 1000s of posts.
- **Stripe:** All donation transactions must support `tax_id` collection for professional donors if required.

### 3. File Structure
```
src/
  app/
    (feed)/         # Homepage chronological stream
    essay/          # Long-form narrative deep-dives
    subjects/       # Thematic index and topic pages
    donate/         # One-time and recurring support
  components/
    reading/        # TypographyEngine, Marginalia, ThreadEngine
    discovery/      # ComplementaryCard, SurpriseMe, DeepSearch
    donations/      # LovingModule, StripeCheckout, SupporterBadge
    layout/         # BookishNav, PaperFooter, VintageHero
  store/            # useSearchStore, useReadStore
  lib/              # sanity-client, stripe-utils, algolia-config
```

### 4. Definition of Done
- 3,000-word essays load and render with perfect bookish typography.
- "Complementary Threads" correctly link to intellectually related content.
- Search indexes 20 years of work and provides instant results.
- Donation module successfully processes Stripe payments in a high-trust, ad-free environment.
