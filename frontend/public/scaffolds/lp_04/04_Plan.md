# 04 — Build Plan
## Roadmap & Milestones · lp_platform_04

### Phase 1: The Pure Canvas (Week 1)
- Set up Next.js 14 project with CSS resets that strip all default browser styling.
- Configure Tailwind for Serif/Mono font pairing and 12px grid system.
- Build the `CenteredColumn` component with strict `max-w-[700px]` constraints.
- **Goal:** A perfect white-paper shell.

### Phase 2: Markdown Engine (Week 2)
- Integrate Contentlayer for processing `.md` files.
- Build the `MarkdownRenderer` component with specialized styling for blockquotes and code.
- Implement the metadata parsing logic for dates and podcast links.
- **Goal:** A high-density article and transcript reading experience.

### Phase 3: The Chronological Feed (Week 3)
- Build the main homepage feed using SSG for performance.
- Implement the "Platform Strip" (Mono links) for every post entry.
- Create the "Best Of" curation category filtering (purely text-based).
- **Goal:** A functional, text-only archive stream.

### Phase 4: Wisdom Search & Archive (Week 4)
- Integrate Algolia for full-text indexing of transcripts.
- Build the "Find Wisdom" search overlay with instant results.
- Implement the "Earlier / Later" simple text pagination.
- **Goal:** High-speed retrieval of specific ideas.

### Phase 5: Final Purity Polish (Week 5)
- Remove all unnecessary client-side JavaScript.
- Final accessibility audit for perfect screen-reader support.
- Lighthouse 100/100/100/100 performance verification.
- **Goal:** A complete, timeless digital archive.
