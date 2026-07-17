# 07 — Guide
## Engineering Standards · pcpp_platform_21

### 1. ConfigStyle Checklist
- **Motion:** Is the video hero loading within 2 seconds? Does it have a poster image?
- **Color:** Are Kelly Green (#10B981) and Pure Black used as the primary brand anchors?
- **Hierarchy:** Does the "Register" CTA take visual priority in the sticky header?
- **Precision:** Are all borders and lines crisp 1px? Are all corners 0px or 2px?

### 2. Coding Conventions
- **Video Strategy:** Strictly use `playsInline`, `muted`, and `loop` for all hero videos to ensure autoplay across all browsers.
- **Scheduling Logic:** Use `date-fns-tz` to ensure all start times are correctly calculated based on the user's `Intl.DateTimeFormat().resolvedOptions().timeZone`.
- **Search Strategy:** Use Algolia for speaker and session discovery to maintain "software-grade" response times.
- **Accessibility:** All video loops must respect the `prefers-reduced-motion` CSS query.

### 3. File Structure
```
src/
  app/
    (main)/         # Homepage, Speakers, Commons
    schedule/       # Interactive timeline and My Config
    register/       # Multi-tier ticket selection
    api/            # Algolia webhooks, Registration hooks
  components/
    event/          # VideoHero, UrgencyTicker, SpeakerCard
    schedule/       # Timeline, TrackFilter, MyScheduleToggle
    logistics/      # VenueMap, WatchPartyPortal, FAQ
    layout/         # MinimalNav, DarkFooter, HubHeader
  store/            # useScheduleStore, useNavStore
  lib/              # sanity-client, algolia-config, date-utils
```

### 4. Definition of Done
- Video hero engine operates flawlessly across breakpoints with zero stutter.
- Speaker directory handles 100+ cards with smooth hover transitions and no lag.
- Schedule hub allows for instant filtering and "My Config" persistence.
- Mobile view maintains "Creative Momentum" via responsive tickers and scannable timelines.
