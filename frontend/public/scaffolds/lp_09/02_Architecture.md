# 02 — Architecture
## Tech Stack & Data Flow · lp_platform_09

### 1. Core Stack
- **Framework:** Next.js 14 (App Router) - Static Site Generation for speed.
- **Database:** Supabase (For "Waitlist" leads and "SiteStats" counters).
- **Styling:** Tailwind CSS (Core flex/grid centering and typography).
- **Animations:** Framer Motion (For "Momentum" entry slides and count-ups).
- **Validation:** Zod (Schema-based email verification).

### 2. Data Model
```sql
-- Waitlist (The Growth)
table waitlist (
  id uuid primary key,
  email text unique not null,
  join_date timestamp default now(),
  referrer text, -- e.g., 'product_hunt', 'twitter'
  status text default 'waiting' -- 'waiting', 'beta_invited'
);

-- Stats (The Social Proof)
table global_stats (
  id uuid primary key,
  beta_user_count integer default 0,
  spots_remaining integer,
  last_updated timestamp
);
```

### 3. "High-Velocity" Data Flow
1. **The Hit:** Next.js serves a pre-rendered HTML shell with the Inverted Pyramid layout.
2. **Real-Time Hydration:** Supabase `subscribe()` hook fetches the latest `beta_user_count` and triggers the Framer Motion count-up animation.
3. **Lead Capture:** User submits form -> Server Action validates email via Zod -> Insert into Supabase `waitlist` table.
4. **Instant Feedback:** On success, the `ValueProp` component state changes to `SUCCESS`, triggering a cross-fade to the "Check your inbox" message.
5. **Redirect (Optional):** After 3 seconds of success, users can be redirected to a "Share on Twitter" secondary goal.
