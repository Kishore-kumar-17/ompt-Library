# 02 — Architecture
## Tech Stack & Data Flow · lp_platform_08

### 1. Core Stack
- **Framework:** Next.js 14 (App Router) - Static export for maximum speed.
- **Database:** Supabase (For high-speed "Leads" storage).
- **Styling:** Tailwind CSS (Core layout and precise typography only).
- **Animations:** Framer Motion (For success-state transitions).
- **Validation:** Zod (Strict email-format validation).

### 2. Data Model
```sql
-- Leads (The Waitlist)
table leads (
  id uuid primary key,
  email text unique not null,
  source_path text, -- e.g., 'twitter', 'github'
  joined_at timestamp default now(),
  status text default 'pending' -- 'pending', 'invited'
);

-- Meta (The Hype Counter)
table site_stats (
  id uuid primary key,
  waitlist_count integer default 0,
  current_version text -- 'VER 1.0.4'
);
```

### 3. "Frictionless Capture" Data Flow
1. **Initial Hit:** Next.js serves a pre-rendered static HTML shell with zero images.
2. **Global State:** Zustand (optional) or React `useState` manages the `inputState` (idle, loading, success, error).
3. **Capture:** User submits email -> Client-side Zod validation -> Supabase Edge Function call.
4. **Counter Sync:** Supabase `onSnapshot` (Real-time) updates the `MonoLabel` count if specified, creating "social energy."
5. **Success Loop:** On 200 OK -> Framer Motion triggers the `SubmissionFade` component to swap UI elements.
6. **No-JS Fallback:** The page remains readable and the form remains functional (standard HTML form) even without React hydration.
