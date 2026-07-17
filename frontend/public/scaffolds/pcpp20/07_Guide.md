# 07 — Guide
## Engineering Standards · pcpp_platform_20

### 1. ROIMaster Checklist
- **Evidence:** Are salary hike and career impact stats visible on every program page?
- **Hierarchy:** Does the university badge take visual priority over the course category?
- **Speed:** Is the program finder and lead form opening in under 150ms?
- **Purity:** Are all corporate partner logos grayscaled to maintain the professional palette?

### 2. Coding Conventions
- **Lead Strategy:** Strictly use `zod` for lead-form validation to ensure high-quality CRM data.
- **Analytics:** Every "Syllabus Download" must be tracked as a custom event for conversion analysis.
- **State Management:** Use Zustand with `persist` for the "Goal Selection" state to maintain career context.
- **Image Strategy:** All high-res university seals and campus portraits must use `priority` for heros.

### 3. File Structure
```
src/
  app/
    (marketplace)/  # Homepage, Success Stories, Enterprise
    courses/        # Domain-specific hubs (/ai, /mba)
    programs/       # Detailed university-certified program pages
    inquiry/        # Region-aware expert lead capture
  components/
    roi/            # OutcomeViz, SalaryChart, SuccessStory
    lead-gen/       # InquiryForm, SyllabusTrigger, ExpertCard
    layout/         # ProgramNav, UniversityStrip, CorporateFooter
    ui/             # RedButton, TrustBadge, ComparisonTable
  store/            # useLeadStore, useProgramStore
  lib/              # sanity-client, supabase-client, recharts-utils
```

### 4. Definition of Done
- Program marketplace correctly filters and displays hundreds of high-AOV programs instantly.
- ROI blocks render with accurate, data-backed count-up success metrics.
- Multi-step lead form handles regional validation and routes data to Supabase flawlessly.
- Mobile view maintains "Professional Authority" via responsive grids and scannable career stats.
