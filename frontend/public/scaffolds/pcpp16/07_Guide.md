# 07 — Guide
## Engineering Standards · pcpp_platform_16

### 1. BuilderGarden Checklist
- **Insight:** Does every book note start with a summary box?
- **Rounding:** Are all corners crisp and consistent at 4px?
- **Typography:** Is the Inter-font used for all functional UI and Tiempos for reading?
- **Speed:** Is the Algolia search providing results without visible lag?

### 2. Coding Conventions
- **Search Strategy:** Every new Sanity post must automatically trigger a re-indexing webhook to Algolia.
- **State Management:** Use Zustand with `persist` middleware for lesson progress to handle guest-to-member transitions.
- **Video Logic:** Use Mux `signed_urls` to ensure course content is never shared outside the Pro portal.
- **Accessibility:** All code blocks must include a `language` tag for proper syntax highlighting and screen reader context.

### 3. File Structure
```
src/
  app/
    (garden)/       # Homepage, Articles, Note archive
    notes/          # Detailed book notes archive
    courses/        # Course landing and lesson player
    dashboard/      # Pro member hub and billing
  components/
    notes/          # NoteSummary, NoteGrid, RatingPill
    courses/        # LessonPlayer, CurriculumList, ProgressTracker
    library/        # SearchModal, FilterBar, CategoryLinks
    layout/         # MinimalNav, Footer, StartHerePath
  store/            # useProgressStore, useGardenStore
  lib/              # sanity-client, algolia-config, mux-utils, stripe-sdk
```

### 4. Definition of Done
- Note archive correctly indexes and filters hundreds of Evergreen posts.
- Course player handles video delivery and progress tracking flawlessly.
- Pro membership wall correctly gates training based on Stripe subscription status.
- Mobile view maintains "Intellectual Velocity" with fast-loading, scannable layouts.
