# 02 — Architecture
## Tech Stack & Data Flow · lp_platform_05

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **CMS:** Sanity.io (For complex multi-relation Guest, Book, Product, and Episode data).
- **Search Engine:** Algolia (For full-text indexing of 800+ transcripts and show notes).
- **Styling:** Tailwind CSS (Custom "Authority" theme with academic typography resets).
- **Audio Integration:** Podbean/Libsyn/Spotify SDK (For player embeds and analytics).
- **Monetization Middleware:** Node.js Edge Functions (For appending affiliate IDs to outgoing URLs).

### 2. Data Model
```sql
-- Episodes (The Podcast)
table episodes (
  id uuid primary key,
  title text not null,
  slug text unique,
  guest_name text,
  audio_url text,
  transcript_md text,
  publish_date timestamp,
  download_count_label text, -- '700M+'
  sponsor_ids uuid[] -- Link to sponsors
);

-- Show Notes (The Resources)
table show_notes (
  id uuid primary key,
  episode_id uuid references episodes(id),
  people_mentioned text[],
  books_mentioned jsonb, -- [{ 'title': '...', 'amazon_link': '...' }]
  links_mentioned jsonb, -- [{ 'label': '...', 'url': '...' }]
  timestamps jsonb -- [{ 'time': '12:34', 'topic': '...' }]
);

-- Topics (The Curation)
table topics (
  id uuid primary key,
  name text unique, -- 'Entrepreneurship', 'Health'
  description text,
  featured_episode_ids uuid[]
);

-- Affiliates (The Monetization)
table affiliate_products (
  id uuid primary key,
  name text,
  base_url text,
  affiliate_tag text,
  click_count integer
);
```

### 3. Resource-Rich Data Flow
1. Next.js fetches `episode` and its `show_notes` from Sanity using ISR.
2. `AffiliateMiddleware` scans outgoing `amazon.com` or `tool.com` links and appends the host's tracking tag.
3. `SearchProvider` (Algolia) ensures the "Browse by Topic" sidebar is updated with latest tags and counts.
4. `NewsletterEngine` (Resend or Mailchimp) captures signups and checks for duplicate entries across the multi-entry heros.
5. On post-render: `AnalyticsEngine` tracks "Affiliate Click-Throughs" and "Resource Engagement" metrics.
