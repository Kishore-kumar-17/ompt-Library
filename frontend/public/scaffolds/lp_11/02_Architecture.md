# 02 — Architecture
## Tech Stack & Data Flow · lp_platform_11

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **CMS:** Sanity.io or Contentlayer (For structured Template, Creator, and Category data).
- **Search Engine:** Algolia (For high-speed template discovery and metadata filtering).
- **Styling:** Tailwind CSS (Custom "Neutral" theme with precise typography resets).
- **State Management:** Zustand (For managing "Category" filters and "View Mode" settings).
- **Analytics:** Integrated event tracking for "Preview" and "Remix" actions.

### 2. Data Model
```sql
-- Templates (The Core Asset)
table templates (
  id uuid primary key,
  title text not null,
  slug text unique,
  creator_id uuid references creators(id),
  price_cents integer, -- 0 for Free
  thumbnail_url text,
  hover_video_url text,
  preview_site_url text,
  category_ids uuid[],
  features text[] -- ['CMS', 'SEO', 'Responsive']
);

-- Creators (The Authors)
table creators (
  id uuid primary key,
  name text not null,
  avatar_url text,
  bio text,
  portfolio_url text
);

-- Categories (The Filter Logic)
table categories (
  id uuid primary key,
  name text unique, -- 'Portfolio', 'SaaS', 'Dark'
  parent_id uuid -- For sub-categories
);
```

### 3. "Creative Momentum" Data Flow
1. Next.js fetches `featured_templates` and `active_categories` from Sanity using ISR.
2. `MasonryGrid` renders template cards; `Zustand` store manages the current `activeFilters`.
3. `Algolia` index is queried in real-time as users type or toggle filters, updating the grid without page reloads.
4. `TemplateDetail` fetches page snapshots and creator metadata on click, mounting the modal overlay.
5. On "Remix": A Server Action generates a secure session token and redirects the user to the `editor.com/remix?id=[T_ID]` endpoint.
