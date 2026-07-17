# 02 — Architecture
## Tech Stack & Data Flow · lp_platform_06

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **CMS:** Sanity.io or Contentlayer (For structured Venture, Product, Course, and Wisdom data).
- **Search Engine:** Algolia (For full-text indexing of 1,000+ archive items).
- **Styling:** Tailwind CSS (Custom "Feel-Good" theme with rounded-2xl utility resets).
- **State Management:** Zustand (For managing user "Interest Pathways" and acquisition funnel states).
- **Media:** YouTube API / Mux (For high-performance video trailer delivery).

### 2. Data Model
```sql
-- Ventures (The Business Units)
table ventures (
  id uuid primary key,
  name text not null, -- 'The Academy', 'Software Tools', 'Books'
  slug text unique,
  accent_color text, -- 'Ali Blue', 'Productivity Yellow'
  description text
);

-- Products (The Offerings)
table products (
  id uuid primary key,
  venture_id uuid references ventures(id),
  title text not null,
  outcome_label text, -- 'Free Crash Course', 'Bestseller'
  price_cents integer,
  thumbnail_url text,
  trailer_video_id text,
  features text[]
);

-- Wisdom (The Content)
table content_items (
  id uuid primary key,
  type text, -- 'Article', 'Book Note', 'Video'
  title text not null,
  slug text unique,
  metadata jsonb, -- { 'reading_time': '5 min', 'source': 'YouTube' }
  content_md text,
  tags text[]
);

-- Leads (The Growth)
table subscribers (
  id uuid primary key,
  email text unique,
  source_pathway text, -- 'YouTube', 'Productivity'
  interest_tags text[]
);
```

### 3. Pathway-to-Growth Data Flow
1. Next.js fetches `featured_ventures` and the `intent_grid` from Sanity using ISR.
2. `PathwaysGrid` sets the user's "Interests" in the Zustand store; this context is passed to the `ProductCatalog` to highlight relevant items.
3. `SearchProvider` (Algolia) ensures the "Wisdom Archive" results are updated in real-time as the user types.
4. `NewsletterEngine` captures leads and sends a "Welcome Bonus" based on the user's `source_pathway` context.
5. On "Bonus Unlock": Server Action verifies the `book_order_id` against a third-party API and grants "Member" status in the session.
