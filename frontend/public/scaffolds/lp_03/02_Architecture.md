# 02 — Architecture
## Tech Stack & Data Flow · lp_platform_03

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **CMS:** Sanity.io or Contentlayer (For structured Event, Attendee, and Community data).
- **Auth:** Clerk or Auth.js (Integrated for social-first, frictionless registration).
- **Styling:** Tailwind CSS (Custom "Invitation" theme with soft neutral tokens).
- **State Management:** Zustand (For managing registration step-data and modal states).
- **Payments:** Stripe (For simple fixed-price ticket checkouts).

### 2. Data Model
```sql
-- Events (The Invitation)
table events (
  id uuid primary key,
  host_id uuid references communities(id),
  title text not null, -- Serif display
  description_md text,
  start_time timestamp,
  location_name text,
  cover_image_url text,
  max_capacity integer,
  price_cents integer default 0
);

-- Attendees (The Social Proof)
table attendees (
  id uuid primary key,
  event_id uuid references events(id),
  user_id uuid, -- Link to Auth
  full_name text,
  avatar_url text,
  is_public_attendee boolean default true
);

-- Communities (The Hosts)
table communities (
  id uuid primary key,
  owner_id uuid,
  name text not null,
  bio text,
  logo_url text,
  follower_count integer default 0
);

-- Registrations (The Leads)
table registrations (
  id uuid primary key,
  event_id uuid references events(id),
  user_email text,
  status text -- 'rsvp', 'waitlist', 'paid'
);
```

### 3. "Invitation-Social" Data Flow
1. Next.js fetches `event_details` and `attendee_avatars` from Sanity using ISR for the event landing page.
2. `AttendeeStack` component filters for `is_public_attendee` and renders the first 8 avatars; clicking reveals a tooltip or expands to a full list.
3. `RegistrationModal` triggers a Clerk `one-tap` flow; on success, a server action creates a `registrations` entry in Supabase.
4. `CalendarWidget` detects user's local `timeZone` and generates a dynamic `.ics` file or Google Calendar redirect link.
5. On "Follow Host": A Supabase hook increments the `follower_count` and adds the user to the host's mailing list.
