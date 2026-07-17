# 07 — Guide
## Engineering Standards · lp_platform_06

### 1. CreatorEcosystem Checklist
- **Tone:** Is the greeting strictly "Hey Friend 👋"? (Avoid "Welcome" or "Join us").
- **Labels:** Does every product card have a high-contrast "Outcome Label" (Free vs Premium)?
- **Aesthetic:** Are all corners consistently `rounded-2xl` (12px)?
- **Speed:** Is the Algolia archive search providing results in under 150ms?

### 2. Coding Conventions
- **Annotation Strategy:** Use a shared `HandDrawnSVG` component that accepts `path` data to ensure brand consistency across annotations.
- **Search Strategy:** Strictly use Algolia for the "Wisdom Archive" to handle 1,000+ items with executive speed.
- **State Management:** Use Zustand with `persist` for the user's `interestPathway` to maintain intent context across sessions.
- **Image Strategy:** All "Course Hero" and "Book 3D" shots must use `priority` and `quality={95}` for high-end flagship feel.

### 3. File Structure
```
src/
  app/
    (hub)/          # aliabdaal.com (Central Ecosystem Hub)
    courses/        # Academy and Masterclass discovery
    archive/        # Searchable Wisdom archive (Articles, Video)
    bonuses/        # Book unlock and member-only template hub
  components/
    discovery/      # PathwaysGrid, IntentCard, ProductLabel
    wisdom/         # ContentArchive, MetadataCard, SearchBar
    acquisition/    # LifeNotesHero, BonusModal, ProofStrip
    layout/         # MinimalNav, FriendlyFooter, AnnotationHub
  store/            # usePathwayStore, useAuthStore
  lib/              # sanity-client, algolia-config, mux-utils
```

### 4. Definition of Done
- Ecosystem hub correctly routes users to multi-venture products based on intent.
- Product catalog renders outcome-labeled cards with zero layout shift or lag.
- Wisdom archive indexes and filters 1,000+ items with near-instant search response.
- Mobile view maintains "Feel-Good Productivity" via responsive grids and warm intro headers.
