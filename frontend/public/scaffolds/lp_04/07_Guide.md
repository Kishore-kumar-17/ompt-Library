# 07 — Guide
## Engineering Standards · lp_platform_04

### 1. ZenContent Checklist
- **Noise:** Is there any shadow, gradient, or rounded corner? (If yes, delete).
- **Typography:** Is the narrative body font strictly Serif? Is the data font strictly Mono?
- **Hierarchy:** Does the content start above the fold without any large hero image?
- **Speed:** Does the page load and become readable in under 200ms?

### 2. Coding Conventions
- **Purity Strategy:** Use raw HTML elements (`h1`, `p`, `a`, `input`) with minimal Tailwind classes to maintain the "Document" feel.
- **SSG Strategy:** All archive pages must be pre-rendered using `generateStaticParams` for 0ms server processing.
- **Link Strategy:** All external links must use simple `underline` on hover to signal interactivity without "Button" metaphors.
- **JS Strategy:** Avoid using `framer-motion` or heavy client libraries. All transitions should be instant or browser-native.

### 3. File Structure
```
src/
  app/
    (feed)/         # Homepage (Chronological stream of posts)
    posts/          # Dynamic transcript and article pages ([slug])
    search/         # Text-only wisdom search portal
    about/          # Minimal text-only bio
  components/
    content/        # MarkdownRenderer, TranscriptGrid, MetadataBox
    navigation/     # MinimalNav, TextPagination
    ui/             # UnderlineLink, MonoLabel, SimpleInput
    search/         # AlgoliaOverlay, TextResults
  lib/              # contentlayer-utils, algolia-config, md-parsers
  content/          # .md files (the source of truth)
```

### 4. Definition of Done
- Feed correctly renders 1,000+ entries with zero performance degradation.
- Transcript pages provide a distraction-free deep-reading environment.
- Search indexes every paragraph of wisdom and returns results instantly.
- Mobile view is identical to desktop (Single Column) with perfect readability.
