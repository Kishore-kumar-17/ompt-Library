# 02 — Architecture
## Tech Stack & Data Flow · lp_platform_15

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **CMS:** Sanity.io (For structured Personality, Launch, Product, and Deal data).
- **State Management:** Zustand (For managing real-time "Global Countdown" and cart states).
- **Styling:** Tailwind CSS (Custom "Electric" theme with high-saturation color tokens).
- **Animations:** Framer Motion (For high-speed sliders and "Urgency" badge pulsing).
- **Media:** Next.js Image + Vercel Image Optimization (for celebrity-heavy banners).

### 2. Data Model
```sql
-- Personalities (The Tribe Ambassadors)
table personalities (
  id uuid primary key,
  name text not null, -- 'Kiara Advani', 'Hardik Pandya'
  avatar_url text,
  bio_snippet text,
  slug text unique
);

-- Launches (The Product Drops)
table launches (
  id uuid primary key,
  title text not null,
  hero_image_url text,
  celebrity_id uuid references personalities(id),
  launch_date timestamp,
  is_live boolean default false
);

-- Deals (The FOMO)
table daily_deals (
  id uuid primary key,
  product_id uuid references products(id),
  discount_percentage integer,
  expiry_time timestamp,
  stock_count integer
);

-- Rewards (The Loyalty)
table tribe_members (
  id uuid primary key,
  email text unique,
  points_balance integer default 0,
  tier text -- 'Bronze', 'Silver', 'Gold'
);
```

### 3. "High-Energy" Data Flow
1. **ISR Mounting:** Next.js fetches `live_launches` and `celebrity_collections` from Sanity using ISR.
2. **Flash-Sale Sync:** `Zustand` initializes a client-side interval that calculates the "Distance to Expiry" for all active deals.
3. **Vibe Hydration:** The `VibeNavigation` component fetches categories based on "Lifestyle Tags" rather than technical types.
4. **Acquisition Flow:** The `RewardsWidget` uses a server-action to check for existing `tribe_member` emails and grant "New Launch" early-access.
5. **Real-Time Ticker:** A WebSocket or Supabase Realtime hook pushes "Selling Fast" notifications to the FOMO strip as stock levels drop.
