# 07 — Guide
## Engineering Standards · pcpp_platform_17

### 1. ReforgeElite Checklist
- **Signal:** Is every host quote anchored by a corporate logo and senior title?
- **Hierarchy:** Does the artifact preview take visual priority over the signup form?
- **Speed:** Is the Algolia search providing results in under 100ms?
- **Purity:** Are all alumni logos grayscaled to maintain the professional palette?

### 2. Coding Conventions
- **Search Strategy:** Strictly use Algolia for the artifact library to ensure executive-standard response times.
- **Access Control:** All artifact gates and "Pro" content checks must be performed in Server Components for security.
- **Image Strategy:** All high-res document previews must use `priority` and specific `sizes` for the card grid.
- **Stripe:** Use Stripe "Product Metadata" to link specific courses to the membership access logic.

### 3. File Structure
```
src/
  app/
    (main)/         # Homepage, Alumni walls, For Teams
    artifacts/      # High-speed document library search
    courses/        # Course landing pages and curricula
    dashboard/      # Member access and billing
  components/
    grid/           # ArtifactEngine, ArtifactCard, CompanyFilter
    curriculum/     # ModuleList, LessonItem, OperatorCard
    layout/         # MinimalNav, AlumniStrip, PaperFooter
    ui/             # TestimonialCard, BlueButton, ArtifactLock
  store/            # useSearchStore, useMemberStore
  lib/              # sanity-client, algolia-config, stripe-utils
```

### 4. Definition of Done
- Artifact library correctly indexes and filters 1,000+ documents from the CMS.
- Course templates render dense, hierarchical curricula with zero layout shift.
- Membership wall correctly gates artifact access based on Stripe status.
- Mobile view maintains "Rigorous Excellence" with scannable lists and responsive logo walls.
