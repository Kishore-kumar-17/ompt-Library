# 02 — Architecture
## Tech Stack & Data Flow · dpecom_platform_04

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **Scheduling Logic:** Custom logic with `date-fns` (Availability calculation)
- **Styling:** Tailwind CSS (Focus on high-contrast professional themes)
- **Database/Auth:** Supabase (PostgreSQL + GoTrue)
- **Payments:** Stripe (Global payment support)
- **Integrations:** Zoom/Google Calendar API for meeting links and invites.

### 2. Data Model
```sql
-- Creator Profiles
table profiles (
  id uuid primary key,
  username text unique,
  display_name text,
  bio text,
  avatar_url text,
  calendar_connected boolean default false
);

-- Services (1:1s, Webinars, Products)
table services (
  id uuid primary key,
  creator_id uuid references profiles(id),
  title text,
  description text,
  type text, -- 'session', 'webinar', 'product'
  duration_minutes integer, -- for sessions
  price_cents integer,
  currency text default 'INR'
);

-- Bookings
table bookings (
  id uuid primary key,
  service_id uuid references services(id),
  mentee_email text,
  start_time timestamp,
  end_time timestamp,
  meeting_link text,
  status text -- 'confirmed', 'cancelled', 'completed'
);
```

### 3. "Meeting Automation" Flow
1. Mentee selects slot and pays via Stripe.
2. Webhook triggers on success.
3. System calls Zoom/Google Meet API using the Creator's connected token.
4. System creates a calendar event on the Creator's Google/Outlook calendar.
5. Confirmation email sent to both parties with the `meeting_link`.
