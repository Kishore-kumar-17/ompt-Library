# 02 — Architecture
## Tech Stack & Data Flow · lp_platform_01

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **CMS:** Sanity.io or Contentlayer (For structured Speaker, Session, and Ticket data).
- **Search Engine:** Algolia (For near-instant 500+ speaker discovery).
- **Styling:** Tailwind CSS (Custom "Neon" theme with Dark Mode defaults).
- **State Management:** Zustand (For managing "My Tracks" persistence and ticket countdowns).
- **Media:** Next.js `<video>` and Cloudinary (For high-performance video heros).

### 2. Data Model
```sql
-- Speakers (The Authority)
table speakers (
  id uuid primary key,
  name text not null,
  role text, -- 'CEO at Notion', 'VP at Meta'
  headshot_url text, -- High-contrast B&W
  industry_tags text[],
  country_code text,
  bio_md text
);

-- Sessions (The Schedule)
table sessions (
  id uuid primary key,
  title text not null,
  start_time timestamp,
  end_time timestamp,
  stage_name text, -- 'Centre Stage', 'SaaS Monster'
  speaker_ids uuid[] -- Array of speakers
);

-- Ticket Tiers (The Conversion)
table ticket_tiers (
  id uuid primary key,
  name text, -- 'General', 'Executive'
  price_cents integer,
  features text[],
  is_sold_out boolean default false,
  remaining_count integer
);

-- Registrations (The Leads)
table registrations (
  id uuid primary key,
  email text unique,
  tier_id uuid references ticket_tiers(id),
  status text -- 'pending', 'paid'
);
```

### 3. "High-Energy" Data Flow
1. Next.js fetches `trending_speakers` and `active_tiers` from Sanity using ISR.
2. `VideoHero` uses the Cloudinary API to deliver adaptive-bitrate background loops with poster-image fallbacks.
3. `UrgencyTicker` component uses a custom `useCountdown` hook to manage the "Price Increase" state globally.
4. `SpeakerSearch` provides an instant Algolia interface; results are rendered in a high-density masonry grid.
5. On "Buy Ticket": User is redirected to a pre-built Stripe Checkout Session linked to the `stripe_price_id` in Sanity.
