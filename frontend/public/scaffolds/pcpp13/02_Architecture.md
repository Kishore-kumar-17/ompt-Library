# 02 — Architecture
## Tech Stack & Data Flow · pcpp_platform_13

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **CMS:** Sanity.io or Headless WordPress (For long-form analysis and taxonomy management).
- **Personalization:** Node.js Edge Functions (For dynamic RSS/Podcast XML generation).
- **Search:** Algolia (For hierarchical strategic framework and company indexing).
- **Payments:** Stripe (For complex multi-site bundling and proration).
- **State Management:** Zustand (For session-based delivery preferences).

### 2. Data Model
```sql
-- Analysis (The Feed)
table analysis (
  id uuid primary key,
  title text not null,
  slug text unique,
  body_md text, -- Long-form content
  type text, -- 'article', 'daily-update'
  visibility text, -- 'public', 'plus'
  publish_date timestamp,
  diagram_svgs jsonb -- Array of Thompson Diagram data
);

-- Concepts (The Frameworks)
table concepts (
  id uuid primary key,
  name text unique, -- 'Aggregation Theory'
  definition text,
  foundational_essay_id uuid references analysis(id)
);

-- Passport (The Delivery)
table member_feeds (
  id uuid primary key,
  user_id uuid references auth.users(id),
  feed_type text, -- 'rss', 'podcast'
  secure_token text unique,
  is_active boolean default true
);

-- Bundles (The Plus Layer)
table subscription_bundles (
  id uuid primary key,
  name text, -- 'Stratechery Plus'
  included_stream_ids text[], -- ['daily-updates', 'sharp-tech', 'dithering']
  stripe_price_id text
);
```

### 3. Secure Delivery Flow
1. User requests their unique RSS feed: `/feeds/rss/[secure_token]`.
2. Edge Function verifies the `secure_token` against the `member_feeds` and `subscriptions` tables.
3. Function fetches the latest `analysis` entries allowed by the member's tier.
4. Function generates a dynamic XML response with personalized tracking markers.
5. Content is streamed to the user's RSS reader (e.g., NetNewsWire) with zero caching for the secure XML.
