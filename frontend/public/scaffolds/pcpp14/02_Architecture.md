# 02 — Architecture
## Tech Stack & Data Flow · pcpp_platform_14

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **CMS:** Sanity.io or Contentlayer (For hierarchical story and visual-slide schemas).
- **Animation:** Framer Motion (For horizontal slide transitions and staggered reveals).
- **Search:** Algolia (For deep-dive archive indexing).
- **Payments:** Stripe (For multi-product subscription tiers).
- **State Management:** Zustand (For managing slide indices and reading progress).

### 2. Data Model
```sql
-- Stories (Daily Deep Dives)
table stories (
  id uuid primary key,
  title text not null,
  slug text unique,
  nutgraph_points text[], -- 3 primary points
  body_md text, -- Long-form content
  illustration_url text, -- Caricature/Art
  read_time_minutes integer
);

-- Visual Stories (Slide Decks)
table visual_stories (
  id uuid primary key,
  title text,
  cover_image_url text,
  slides jsonb -- [{ 'text': '...', 'visual_url': '...', 'chart_data': {} }]
);

-- Podcasts (Audio Hub)
table episodes (
  id uuid primary key,
  series_name text, -- 'Daybreak', 'First Principles'
  title text,
  audio_url text,
  duration_seconds integer
);

-- Gifting (Referrals)
table gift_links (
  id uuid primary key,
  story_id uuid references stories(id),
  sender_user_id uuid,
  token text unique,
  expires_at timestamp
);
```

### 3. Visual Story Flow
1. User enters `/visual-stories/[slug]`.
2. `VisualStoryLayout` locks the viewport scroll to prevent vertical movement.
3. `SlideEngine` (Framer Motion) renders the current `index` from the `slides` array.
4. On horizontal swipe/click: `index` updates in Zustand, triggering a horizontal `x: -100%` transition.
5. Final slide triggers a "Recommended Full Story" CTA linking back to the `stories` table.
