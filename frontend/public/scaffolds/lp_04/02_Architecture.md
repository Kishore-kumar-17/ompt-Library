# 02 — Architecture
## Tech Stack & Data Flow · lp_platform_04

### 1. Core Stack
- **Framework:** Next.js 14 (App Router) - Static Site Generation (SSG) for all archives.
- **Content Engine:** Contentlayer or MDX-Remote (Processing Markdown files into structured React components).
- **Search:** Algolia (For full-text indexing of the Markdown transcripts).
- **Styling:** Tailwind CSS (Core utility-first typography and margins only).
- **Analytics:** Plausible or simple Server-side logs (Privacy-first, zero-JS tracking).

### 2. Data Model
```sql
-- Posts (The Markdown Source)
type Post = {
  id: string,
  title: string, -- Serif
  date: string,  -- Monospaced
  category: 'Article' | 'Podcast' | 'Book',
  platforms: { apple: string, spotify: string, youtube: string }, -- Mono Links
  content: markdown_body,
  tags: string[]
};

-- Wisdom Nuggets (The Index)
type WisdomNugget = {
  id: string,
  post_id: uuid,
  paragraph_text: text,
  search_vectors: jsonb
};
```

### 3. "Digital Paper" Data Flow
1. **Content Capture:** Thoughts are written in `.md` files. Contentlayer watches the folder and generates a typed `allPosts` JSON.
2. **Static Generation:** Next.js re-validates at build time, generating static HTML for every post to ensure 0ms server latency.
3. **Typography Injection:** The `MarkdownRenderer` applies `font-serif` to body text and `font-mono` to blockquotes and metadata.
4. **Search Indexing:** A build-script pushes Markdown paragraph chunks to Algolia for instant "nugget" retrieval.
5. **No-JS Render:** The initial HTML contains the full single-column layout and text; React only hydrates for Search and Newsletter interactions.
