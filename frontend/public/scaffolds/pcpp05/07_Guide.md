# 07 — Guide
## Engineering Standards · pcpp_platform_05

### 1. StoryBookOpulence Checklist
- **Accents:** Are Antique Gold (#B59410) lines used to separate sections?
- **Typography:** Are couples' names always using the elegant Playfair Display font?
- **Vibrancy:** Do images maintain high-vibrancy color and deep RAW-processed contrast?
- **Video:** Does the hero video load and play within 2 seconds of page entry?

### 2. Coding Conventions
- **Video Delivery:** Strictly use Mux with the `@mux/mux-player-react` component to handle high-bitrate adaptive streaming.
- **CMS Logic:** Use the Sanity `portable-text` package for narrative introductions to support rich formatting and quotes.
- **Images:** All gallery shots must use `sizes` attributes that optimize for both mobile diptychs and desktop full-bleeds.
- **Forms:** Use `react-hook-form` with custom gold-stroke input components for the inquiry flow.

### 3. File Structure
```
src/
  app/
    (main)/         # Homepage, Films, Prestige areas
    stories/        # Dynamic wedding story chapters
    inquiry/        # "Your Story" lead capture
    music/          # Original soundtrack archive
  components/
    media/          # CinemaHero, PhotoGrid, MuxPlayer
    story/          # ChapterHeader, Snippet, NarrativeBlock
    layout/         # RoyalNav, MaroonFooter, GoldDivider
    forms/          # YourStoryForm, GoldInput
  store/            # useTheaterStore, useInquiryStore
  lib/              # sanity-client, mux-utils, lead-manager
```

### 4. Definition of Done
- Wedding stories reveal a seamless mix of 4K video and high-vibrancy photography.
- The inquiry form successfully saves detailed "Story" data to Supabase.
- Mobile view captures the "Opulent" feel via large imagery and responsive video heros.
- Page speed scores 90+ despite the high density of media content.
