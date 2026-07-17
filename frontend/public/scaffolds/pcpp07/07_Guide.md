# 07 — Guide
## Engineering Standards · pcpp_platform_07

### 1. Atmospheric Minimalism Checklist
- **Scale:** Are all heros and landscapes spanning the full width of the viewport?
- **Color:** Is the UI strictly White/Stone/Black? (Let photography provide the color).
- **Geometry:** Are all corners strictly sharp (0px)?
- **Typography:** Is the Serif heading font used consistently for all story titles?

### 2. Coding Conventions
- **Image Strategy:** Use `unoptimized={true}` for select ultra-wide landscapes to ensure absolute technical clarity and grain preservation.
- **State:** Use a simple `timeState` to handle the active chronology section during the story scroll.
- **Transitions:** All page transitions must use the slow "Aero" fade (1s) to maintain the brand's atmospheric mood.
- **Accessibility:** Ensure all "Time of Day" markers are correct heading levels (H3) for screen reader navigation.

### 3. File Structure
```
src/
  app/
    (gallery)/      # Homepage, Location grids
    stories/        # Chronological destination narratives
    about/          # The Pilot's Perspective bio
    inquiry/        # Global lead capture
  components/
    media/          # AeroHero, LandscapeReveal, PhotoChronology
    navigation/     # MinimalNav, SkyFooter, TimeMarker
    forms/          # InternationalForm, StoneInput
  store/            # useStoryStore
  lib/              # sanity-client, supabase-client, resend-utils
```

### 4. Definition of Done
- AeroHero slideshow operates with zero stutter and smooth 1.5s fades.
- Chronology engine correctly groups media by the time-of-day tag from the CMS.
- Inquiry form captures detailed international data and saves to Supabase.
- Mobile view maintains the "Atmospheric" scale via responsive landscapes and clear markers.
