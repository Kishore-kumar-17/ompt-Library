# 02 — Architecture
## Tech Stack & Data Flow · pcpp_platform_19

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **CMS:** Sanity.io or Contentlayer (For structured Exam, Educator, and Batch data).
- **Live Streaming:** Mux Video or custom AWS IVS (For low-latency classroom delivery).
- **Search:** Algolia (For near-instant goal and educator discovery).
- **Payments:** Razorpay (For Indian recurring mandates and split-payments).
- **State Management:** Zustand (For managing the active exam goal and classroom interactions).

### 2. Data Model
```sql
-- Goals (The Exams)
table goals (
  id uuid primary key,
  name text not null, -- 'UPSC CSE', 'IIT JEE'
  slug text unique,
  category text, -- 'Civil Services', 'Engineering'
  success_stats jsonb -- { 'learners': '10M+', 'mins': '1.2B' }
);

-- Educators (The Celebrity Teachers)
table educators (
  id uuid primary key,
  name text not null,
  portrait_url text,
  credentials text, -- 'Ex-IAS', 'IIT Bombay'
  follower_count integer,
  subject_tags text[]
);

-- Batches (The Courses)
table batches (
  id uuid primary key,
  goal_id uuid references goals(id),
  title text,
  start_date timestamp,
  educator_ids uuid[], -- Array of teachers in this batch
  is_iconic_exclusive boolean default false
);

-- Subscriptions (The Access)
table subscriptions (
  id uuid primary key,
  user_id uuid references auth.users(id),
  goal_id uuid references goals(id),
  tier text, -- 'plus', 'iconic'
  stripe_subscription_id text,
  expires_at timestamp
);
```

### 3. Goal-to-Success Data Flow
1. Middleware detects the user's `activeGoal` cookie or redirect logic.
2. Next.js fetches `featured_educators` and `upcoming_batches` for that specific `goal_id` from Sanity.
3. `DiscoveryPortal` provides a search interface; clicking a goal updates the global state and revalidates the Exam Landing Page.
4. `LiveClass` component connects to the Mux stream and Supabase real-time for chat/polls.
5. On subscription: Razorpay Webhook updates the `subscriptions` table, unlocking the "Iconic" content layers.
