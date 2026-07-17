# 07 — Guide
## Engineering Standards · pcpp_platform_10

### 1. InsiderEdge Checklist
- **Headlines:** Are headlines bold enough (Inter Black)?
- **Summaries:** Are article summaries (decks) distinctly styled in Indigo or Grey?
- **Speed:** Does the site load in under 1s? (Minimal JS, optimized text).
- **Paywall:** Is the transition from teaser to CTA smooth and high-conversion?

### 2. Coding Conventions
- **Data Fetching:** Use `generateStaticParams` for all post routes to ensure instant performance.
- **Access Control:** All paywall checks must be performed in Server Components for security.
- **Typography:** Strictly use `ch` (character) widths for reading columns to prevent long, unreadable lines.
- **Stripe:** Use Stripe "Price IDs" directly from environment variables to manage plan switching.

### 3. File Structure
```
src/
  app/
    (feed)/         # Homepage, Category streams, Archive
    [slug]/         # Dynamic news articles (public & paid)
    account/        # Member settings, Billing
    api/            # Stripe webhooks, Ghost hooks
  components/
    feed/           # NewsFeed, FeedItem, CategoryBar
    membership/     # MemberPortal, PaywallCTA, PlanToggle
    editorial/      # TypographyEngine, PodcastBlock, AuthorByline
    layout/         # StickyNav, InsiderFooter
  store/            # useNavStore, useAuthStore
  lib/              # ghost-client, algolia-config, stripe-utils
```

### 4. Definition of Done
- News feed correctly renders public vs subscriber content.
- Paywall "Fade-to-CTA" logic is functional and secure.
- Member Portal allows for seamless checkout and account login.
- Search indexes the full Ghost publication and provides instant results.
