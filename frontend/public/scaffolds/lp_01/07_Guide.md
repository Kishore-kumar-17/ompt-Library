# 07 — Guide
## Engineering Standards · lp_platform_01

### 1. EventImpact Checklist
- **Motion:** Is the video hero loading within 2 seconds? Does it have a poster image?
- **Color:** Are Neon Green (#00FF85) and Pure Black used as the primary brand anchors?
- **Hierarchy:** Does the "Ticket CTA" take visual priority in the sticky header?
- **Precision:** Are all borders and lines crisp 1px? Are all corners 0px or 4px?

### 2. Coding Conventions
- **Video Strategy:** Strictly use `playsInline`, `muted`, and `loop` for all hero videos to ensure autoplay across all browsers.
- **Search Strategy:** Use Algolia for speaker and session discovery to maintain "executive-standard" response times.
- **State Management:** Use Zustand with `persist` for the `countdownTarget` to ensure urgency is maintained across refreshes.
- **Accessibility:** Ensure all marquee tickers have `aria-hidden` on the cloned content and are readable by screen readers.

### 3. File Structure
```
src/
  app/
    (main)/         # Homepage, Speakers, Startups
    tickets/        # Tier selection and checkout redirection
    schedule/       # Interactive timeline and My Tracks
    api/            # Algolia hooks, Scarcity webhooks
  components/
    event/          # VideoHero, UrgencyMarquee, StatsStrip
    grid/           # SpeakerSearch, StartupGrid, MasonryCard
    ticketing/      # TierGrid, ScarcityBadge, Countdown
    layout/         # MinimalNav, DarkFooter, HubHeader
  store/            # useTickerStore, useNavStore
  lib/              # sanity-client, algolia-config, stripe-utils
```

### 4. Definition of Done
- Video hero engine operates flawlessly across breakpoints with zero stutter.
- Speaker directory handles 500+ cards with instant Algolia filtering and no lag.
- Ticketing hub correctly renders scarcity badges based on real-time inventory.
- Mobile view maintains "Global Impact" via responsive marquees and dense vertical stacks.
