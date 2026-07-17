# 07 — Guide
## Engineering Standards · lp_platform_07

### 1. WarikooStyle Checklist
- **Honesty:** Is the "Failure Resume" accessible within 1 scroll of the homepage?
- **Pricing:** Is the course price (INR) clearly visible on the grid card?
- **Typo:** Are headlines using strictly Montserrat 900 (or the "Book" font equivalent)?
- **Speed:** Is the mobile FCP (First Contentful Paint) under 800ms?

### 2. Coding Conventions
- **Narrative Strategy:** Use a custom `TimelineProvider` to manage the scroll-spy state of the Failure Resume.
- **Pricing Strategy:** Store all prices in base units (Cents/Paise) in Sanity and format using `Intl.NumberFormat('en-IN')`.
- **Search Strategy:** Strictly use Algolia for the "Wanderings Archive" to handle 100+ editions with executive speed.
- **Image Strategy:** All "3D Book Renders" must use `.webp` with `priority` and `quality={95}` for high-end flagship feel.

### 3. File Structure
```
src/
  app/
    (hub)/          # warikoo.com (Central Authority Hub)
    courses/        # WebVeda marketplace and cohorts
    books/          # 3D book showcase and affiliate retailer portal
    newsletter/     # Searchable "Wanderings" archive and acquisition
  components/
    narrative/      # FailureLog, TimelineItem, LessonCard
    marketplace/    # CourseGrid, CourseCard, PriceChip
    legacy/         # BookShowcase, 3DRender, AffiliateLink
    layout/         # MinimalNav, AuthorityFooter, SocialStrip
  store/            # useTimelineStore, useCartStore
  lib/              # sanity-client, algolia-config, posthog-utils
```

### 4. Definition of Done
- Authority hub correctly establishes creator scale via high-impact heros and stats.
- Failure Resume timeline renders with zero layout shift and provides deep emotional resonance.
- WebVeda marketplace filters and displays INR-priced courses instantly.
- Mobile view maintains "Academic Clarity" via high-contrast typography and oversized tap-targets.
