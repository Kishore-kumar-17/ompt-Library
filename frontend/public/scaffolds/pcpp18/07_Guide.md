# 07 — Guide
## Engineering Standards · pcpp_platform_18

### 1. CohortHub Checklist
- **Pedigree:** Are instructor headshots and roles the primary visual focus on all cards?
- **Urgency:** Is the "Starts [Date]" logistical data clearly visible above the fold?
- **Readability:** Are curriculum accordions scannable and easy to navigate on mobile?
- **Trust:** Are verified student professional titles included in all testimonial carousels?

### 2. Coding Conventions
- **Search Strategy:** Use Algolia for the marketplace to ensure instant results for professional users.
- **State Management:** Use Zustand with `persist` for the enrollment multi-step data to handle page refreshes.
- **Data Strategy:** All start dates must be stored in UTC and formatted using a client-side hook for time-zone awareness.
- **Image Strategy:** Use `priority` and specific `sizes` for the large-scale instructor heros in the course detail view.

### 3. File Structure
```
src/
  app/
    (marketplace)/  # Homepage, Category grids, Instructor list
    courses/        # Detailed course syllabi and cohort info
    portal/         # Student dashboard and material access
    enroll/         # Multi-step checkout and enrollment
  components/
    grid/           # MarketplaceEngine, InstructorCard, UrgencyBadge
    learning/       # SyllabusAccordion, LessonPreview, ProgressTracker
    layout/         # CategoryNav, ProfessionalFooter, StickyPricing
    service/        # ExpenseTool, EnrollmentModal, CalendarSync
  store/            # useEnrollStore, useStudentStore
  lib/              # sanity-client, algolia-config, stripe-utils
```

### 4. Definition of Done
- Marketplace grid correctly filters hundreds of expert-led cohorts instantly.
- Course pages reveal detailed, week-by-week curricula with zero layout shift.
- Enrollment flow handles high-AOV transactions and automated corporate templates.
- Mobile view maintains "Professional Transformation" via responsive accordions and clear labels.
