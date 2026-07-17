# 07 — Guide
## Engineering Standards · pcpp_platform_14

### 1. AnalyticalKen Checklist
- **Insight:** Is the Nutgraph summary visible above the fold on all articles?
- **Color:** Is Ken Red (#E31E24) used only for functional highlights?
- **Speed:** Does the visual story slide transition in under 300ms?
- **Ads:** Are there ZERO third-party trackers or ad-slots in the UI?

### 2. Coding Conventions
- **State:** Use Zustand for the `activeSlideIndex` to ensure smooth gesture-to-UI synchronization.
- **Images:** Caricatures and data-viz must be rendered as SVGs or high-end WebP with `priority` for heros.
- **Search:** Strictly use Algolia for search to maintain executive-standard speed for 1000s of articles.
- **Typography:** Strictly use the `ch` width for the article body to ensure optimal reading rhythm.

### 3. File Structure
```
src/
  app/
    (feed)/         # Homepage, Latest stories, Subjects
    stories/        # Long-form deep-dives
    visuals/        # Interactive slide-story engine
    audio/          # Podcast hub and player
  components/
    editorial/      # Nutgraph, BodyText, Caricature, DataViz
    slides/         # SlideDeck, ProgressIndicator, SlideItem
    membership/     # GiftLinkGenerator, PaywallCTA, CorporatePortal
    layout/         # MinimalNav, PaperFooter, AudioBar
  store/            # useSlideStore, useReadStore
  lib/              # sanity-client, algolia-config, mux-utils
```

### 4. Definition of Done
- Daily deep-dive correctly renders the Nutgraph summary and custom infographics.
- Visual Story Engine handles horizontal swiping and progress tracking flawlessly.
- Gifting logic generates unique, verifiable tokens for non-member access.
- Mobile view maintains "Analytical Mastery" with high-contrast, responsive editorial blocks.
