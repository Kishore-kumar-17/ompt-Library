# 07 — Guide
## Engineering Standards · lp_platform_02

### 1. LeaderShip-X Checklist
- **Dynamics:** Does the agenda hub support at least 3 distinct view modes?
- **Style:** Are all cards and navigation using `backdrop-blur-md` glassmorphism?
- **Rounding:** Are all corners consistently `rounded-xl` (8px)?
- **Hierarchy:** Do session times and venues take visual priority over descriptions?

### 2. Coding Conventions
- **Glass Strategy:** Strictly use `bg-white/5 border-white/10 backdrop-blur-md` for all container cards to ensure enterprise-standard consistency.
- **Agenda Strategy:** Use CSS Grid for the "Venue View" to handle physical Ballroom columns without vertical gaps.
- **State Management:** Use Zustand with `persist` for the `activeView` and `userSchedule` to ensure a seamless "app-like" experience.
- **Data strategy:** All speaker portraits must have a consistent square or 4:5 crop to maintain the professional grid rhythm.

### 3. File Structure
```
src/
  app/
    (main)/         # Homepage, Speakers, Tech Café
    agenda/         # Complex multi-view schedule and My Schedule
    registration/   # Multi-step forum registration
    api/            # Sync webhooks, Algolia discovery hooks
  components/
    agenda/         # Timeline, VenueGrid, ViewToggle, BookmarkButton
    speakers/       # SpeakerDirectory, SpeakerCard, BioModal
    layout/         # GlassNav, DeepFooter, SyncStrip
    ui/             # ThematicPillar, StartupCard, StatsCounter
  store/            # useAgendaStore, useNavStore
  lib/              # sanity-client, algolia-config, sync-utils
```

### 4. Definition of Done
- Multi-view agenda hub handles 50+ sessions with zero layout shift or lag.
- Speaker directory provides instant results for 100+ industry leaders.
- "Innovation X" landing page establishes immediate corporate prestige via motion and glassmorphism.
- Mobile view maintains "Navigational Intelligence" via responsive tabs and bottom-sheet filters.
