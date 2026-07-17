# 02 — Architecture
## Tech Stack & Data Flow · pcpp_platform_11

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **CMS:** Sanity.io or Contentlayer (For structured Article, Book, and Award data).
- **Styling:** Tailwind CSS (Custom "Editorial" theme with serif-sans hierarchy).
- **State Management:** Zustand (For portfolio filtering and region-based buy links).
- **Database:** Supabase (For Inquiry storage and analytics tracking).

### 2. Data Model
```sql
-- Articles (The Portfolio)
table articles (
  id uuid primary key,
  title text not null,
  slug text unique,
  publication_name text, -- e.g., 'The Guardian'
  publication_logo_url text,
  publish_date date,
  excerpt text,
  category text, -- 'Politics', 'Youth', 'Investigation'
  link_url text
);

-- Books (The Centerpieces)
table books (
  id uuid primary key,
  title text not null,
  cover_image_url text,
  synopsis_md text,
  awards text[],
  buy_links jsonb -- { 'US': '...', 'India': '...' }
);

-- Awards (Social Proof)
table awards (
  id uuid primary key,
  year integer,
  title text not null, -- 'PEN America Finalist'
  institution text,
  category text
);
```

### 3. Authorial Data Flow
1. Next.js fetches `featured_book` and `prestige_logos` from Sanity for the homepage.
2. `ArticlePortfolio` component fetches paginated `articles` from the CMS with category-based filtering logic.
3. `BuyLinkEngine` detects the user's region (or uses a toggle) to surface the correct purchase URL for books.
4. Inquiry data is captured in Supabase and triggers a professional auto-responder to the client.
