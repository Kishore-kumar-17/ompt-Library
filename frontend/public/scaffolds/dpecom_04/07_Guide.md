# 07 — Guide
## Engineering Standards · dpecom_platform_04

### 1. Professional Expert Checklist
- **Headings:** Are headings bold and authoritative? (Weight 700).
- **Accents:** Is the primary action color consistent Blue? (#3B82F6).
- **Mobile targets:** Are all buttons at least 44px tall?
- **Readability:** Is the line height for descriptions generous enough (leading-relaxed)?

### 2. Coding Conventions
- **Scheduling:** All date manipulations must be done using `date-fns` for consistency.
- **Integrations:** Use the official Node.js SDKs for Zoom/Google APIs.
- **State Management:** Use Zustand for tracking multi-step booking state.
- **Security:** Ensure creator calendar tokens are stored securely in Supabase and never exposed to the client.

### 3. File Structure
```
src/
  app/          # Routes (Next.js App Router)
  components/
    profile/    # Bio, Social Links, Testimonials
    services/   # Service Cards, Category Switcher
    booking/    # Calendar, TimeSlotGrid, InfoForm
  lib/          # date-fns utils, Supabase, Meeting APIs
  store/        # useBookingStore
  hooks/        # useAvailability
```

### 4. Definition of Done
- Booking a slot successfully triggers a meeting link generation API call.
- Profile page scores 95+ on Lighthouse Performance/SEO.
- All service cards are perfectly responsive and accessible.
- Calendar sync handles time-zone differences between creator and mentee correctly.
