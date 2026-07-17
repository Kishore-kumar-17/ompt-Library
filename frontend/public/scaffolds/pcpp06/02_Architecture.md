# 02 — Architecture
## Tech Stack & Data Flow · pcpp_platform_06

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **Grid Engine:** CSS Grid + `react-masonry-css` (For mixed aspect ratio performance).
- **Styling:** Tailwind CSS (Custom luxury theme with wide-tracking utility).
- **CMS:** Sanity.io (Structured Work, Journal, and Workshop data).
- **Database/Auth:** Supabase (Workshop registrations and lead management).
- **Payments:** Stripe (Event registration and deposits).

### 2. Data Model
```sql
-- Work (Iconic Projects)
table work (
  id uuid primary key,
  title text not null,
  slug text unique,
  category text, -- 'Wedding', 'Portrait', 'Travel'
  cover_image_url text,
  is_featured boolean default false
);

-- Events (Workshops/Conferences)
table events (
  id uuid primary key,
  title text not null, -- 'PEPx 2026', 'Masterclass'
  type text,
  start_date timestamp,
  end_date timestamp,
  location text,
  price_cents integer,
  registration_url text
);

-- Journal (Narrative Stories)
table journal_stories (
  id uuid primary key,
  title text,
  body_md text, -- Minimal editorial text
  featured_image_url text,
  image_sequence text[] -- Order of vertical scroll images
);
```

### 3. Luxury Data Flow
1. Next.js fetches `work` and `journal` entries from Sanity using ISR (Incremental Static Regeneration).
2. `MasonryGrid` component calculates optimal column placement for mixed horizontal/vertical images.
3. `EducationHub` fetches `events` from Supabase and renders a filtered list based on user selection.
4. `StripeCheckout` handles the deposit for masterclasses and saves attendee data to the `registrations` table in Supabase.
