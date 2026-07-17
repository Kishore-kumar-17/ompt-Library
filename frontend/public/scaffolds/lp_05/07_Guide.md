# 07 — Guide
## Engineering Standards · lp_platform_05

### 1. AuthorityArchive Checklist
- **Density:** Are there at least 15 content items visible above the fold on desktop?
- **Color:** Is the primary action color consistent Professional Blue (#1D4ED8)?
- **Reading:** Is the body text line-height at least 1.7?
- **Speed:** Is the Algolia guest search providing results in under 150ms?

### 2. Coding Conventions
- **SEO Strategy:** Use JSON-LD `PodcastEpisode` schema for every episode to drive Google Discovery.
- **Link Strategy:** Strictly use the `AffiliateLink` component for all external products to ensure legal disclosure.
- **State Management:** Use Zustand for the `playerState` to maintain audio playback while navigating the archive.
- **Image Strategy:** All guest headshots must use `priority` and specific `sizes` for the feed cards.

### 3. File Structure
```
src/
  app/
    (feed)/         # Homepage, Archive, Topic pages
    podcast/        # Detailed show-notes and player pages ([slug])
    blog/           # Long-form deconstruction articles
    start-here/     # Curated newcomer hub
  components/
    content/        # FeedItem, MeticulousList, TimestampLink
    discovery/      # TopicCloud, SearchOverlay, BestOfCarousel
    acquisition/    # NewsletterHero, SidebarPromo, BonusDownloader
    layout/         # MinimalNav, ProfessionalFooter, StickyPlayer
  store/            # usePlayerStore, useNavStore
  lib/              # sanity-client, algolia-config, affiliate-utils
```

### 4. Definition of Done
- Content hub correctly renders thousands of archive entries instantly.
- Show-notes templates flawlessly link to 100+ resources per page with zero layout shift.
- Affiliate middleware correctly appends tracking IDs to outgoing product links.
- Mobile view maintains "Intellectual Depth" with scannable lists and persistent audio bars.
