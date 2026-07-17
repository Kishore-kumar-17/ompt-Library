# 07 — Guide
## Engineering Standards · pcpp_platform_06

### 1. Sophisticated Editorial Checklist
- **Tracking:** Are all UI labels and nav links using `tracking-widest` (0.2em)?
- **Borders:** Are all cards and buttons strictly `rounded-none` (0px)?
- **Scale:** Does the masonry grid maintain generous whitespace on 4K displays?
- **Color:** Are the only colors present the ones in the actual photographs? (UI must be B/W).

### 2. Coding Conventions
- **Grid Strategy:** Use `react-masonry-css` for the portfolio grid to ensure perfect image stacking without vertical gaps.
- **Image Optimization:** Use Cloudinary's `f_auto,q_auto` with Next.js `<Image>` for global-standard performance.
- **State Management:** Use Zustand for the "Education Filter" state and the "Lightbox" gallery mode.
- **Forms:** Use `react-hook-form` with custom minimalist black-and-white input components.

### 3. File Structure
```
src/
  app/
    (main)/         # Homepage, Prestige areas, Inquiry
    journal/        # Long-scroll vertical stories
    education/      # PEP Conferences, Workshops, Mentorship
    work/           # Masonry portfolio categories
  components/
    grid/           # MasonryEngine, WorkCard, SequenceItem
    education/      # EventList, EventCard, RegistrationForm
    layout/         # MinimalNav, PrestigeStrip, WideFooter
  store/            # useEventStore, useGalleryStore
  lib/              # sanity-client, supabase-client, stripe-utils
```

### 4. Definition of Done
- Masonry grid handles mixed aspect ratios flawlessly with zero layout shift.
- Journal stories reveal "Iconic Single Images" in a cinematic vertical scroll.
- Education Hub registration flow is functional and context-aware.
- Mobile view maintains "Iconic Excellence" with high-contrast, prestigious branding.
