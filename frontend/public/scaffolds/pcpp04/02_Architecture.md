# 02 — Architecture
## Tech Stack & Data Flow · pcpp_platform_04

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **Multi-tenancy:** Middleware-based routing for different domains/subdomains.
- **Styling:** Tailwind CSS (Focus on high-readability editorial systems).
- **CMS:** Sanity.io or Contentlayer (For complex multi-project relationships).
- **Animation:** Framer Motion (For portal transitions and staggered sequences).
- **Database:** Supabase (For News, Press, and Analytics).

### 2. Data Model
```sql
-- Project Planets (The Hub)
table planets (
  id uuid primary key,
  domain text unique, -- e.g., 'matrimania.in'
  title text not null,
  summary_md text,
  cover_image_url text
);

-- Story Blocks (The Sequence Engine)
table story_blocks (
  id uuid primary key,
  planet_id uuid references planets(id),
  type text, -- 'single', 'pair', 'triptych', 'text'
  media_urls text[], -- Array for sequences
  content_md text, -- For text blocks
  order_index integer
);

-- Journal (The Diaries)
table journal_entries (
  id uuid primary key,
  planet_id uuid references planets(id),
  title text,
  body_md text,
  date timestamp
);
```

### 3. "Universe Portal" Flow
1. Middleware detects the incoming `hostname` (e.g., `matrimania.in`).
2. App Router redirects internally to `/(planets)/[planet_id]`.
3. `PlanetLayout` fetches the specific theme and navigation for that "Universe."
4. `SequenceEngine` fetches `story_blocks` in order and renders the long-scroll essay.
5. `UniverseSwitcher` component provides a consistent link back to the central hub (`maheshshantaram.com`).
