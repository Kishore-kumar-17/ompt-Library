# 02 — Architecture
## Tech Stack & Data Flow · lp_platform_07

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **CMS:** Sanity.io (For structured Course, Book, FailureLog, and Resource data).
- **Search Engine:** Algolia (For full-text indexing of newsletter archives and resources).
- **Styling:** Tailwind CSS (Custom "Authority" theme with high-contrast typography resets).
- **Analytics:** PostHog (For tracking "Failure Resume" engagement vs. course conversion).
- **Database:** Supabase (For newsletter lead storage and free resource tracking).

### 2. Data Model
```sql
-- Rejections (The Failure Resume)
table failure_logs (
  id uuid primary key,
  year integer,
  title text not null, -- 'Rejected by ISB', 'Startup Shutdown'
  description text,
  lesson_learned text,
  category text -- 'Career', 'Personal', 'Money'
);

-- Courses (The Marketplace)
table courses (
  id uuid primary key,
  title text not null,
  slug text unique,
  price_inr integer,
  outcome_chips text[], -- 'Lifetime Access', 'Certificate'
  thumbnail_url text,
  is_bestseller boolean default false
);

-- Books (The Legacy)
table books (
  id uuid primary key,
  title text not null,
  tagline text,
  cover_3d_url text,
  amazon_url text,
  flipkart_url text,
  bonus_pdf_id uuid
);

-- Leads (The Growth)
table subscribers (
  id uuid primary key,
  email text unique,
  source_page text,
  interests text[]
);
```

### 3. "Authenticity-to-Enroll" Data Flow
1. Next.js fetches `failure_logs` and `active_courses` from Sanity using ISR.
2. `FailureResume` component renders the vertical timeline; `PostHog` tracks which "Rejection" item was read before a conversion click.
3. `WebVedaGrid` calculates savings or "Bundle Deals" on the client side based on global state.
4. `SearchProvider` (Algolia) ensures the "Newsletter Archive" results are updated in real-time.
5. On "Buy Book": User is redirected to a retailer via an `AffiliateTracker` endpoint that logs the intent before portaling.
