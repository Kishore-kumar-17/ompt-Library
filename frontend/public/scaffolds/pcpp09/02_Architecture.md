# 02 — Architecture
## Tech Stack & Data Flow · pcpp_platform_09

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **CMS:** Sanity.io (For hierarchical tagging and long-form MDX storage).
- **Search:** Algolia or Fuse.js (For full-text indexing of thousands of essays).
- **Styling:** Tailwind CSS (Custom "Paper" theme with editorial typography plugins).
- **Donations:** Stripe (Checkout for one-time and recurring support).
- **Email:** Resend or Substack API (Newsletter integration).

### 2. Data Model
```sql
-- Essays (The Publications)
table essays (
  id uuid primary key,
  title text not null,
  slug text unique,
  body_md text, -- Long-form MDX content
  publish_date timestamp,
  cover_image_url text, -- Vintage illustrations
  lead_excerpt text
);

-- Subjects (The Intellectual Categories)
table subjects (
  id uuid primary key,
  name text unique, -- e.g., 'On Love', 'On Science'
  description_md text,
  essay_count integer
);

-- Threads (The "Complement This" Links)
table threads (
  source_essay_id uuid references essays(id),
  target_essay_id uuid references essays(id),
  context_note text -- Why these are related
);

-- Donations (The Support)
table donations (
  id uuid primary key,
  donor_email text,
  amount_cents integer,
  interval text, -- 'one-time', 'monthly'
  stripe_subscription_id text
);
```

### 3. Literary Discovery Flow
1. Next.js dynamic route `/[slug]` fetches the `essay` and its `complementary_threads` from Sanity.
2. `TypographyEngine` applies the 1.8 leading and Hoefler font variables to the `body_md`.
3. `SearchEngine` provides a custom-filtered view of the `essays` table based on `subject_id`.
4. `DonationModule` checks for session-based contribution status to potentially adjust the visibility of the Goldenrod support block.
