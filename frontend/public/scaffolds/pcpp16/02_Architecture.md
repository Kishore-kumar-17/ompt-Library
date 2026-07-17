# 02 — Architecture
## Tech Stack & Data Flow · pcpp_platform_16

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **CMS:** Sanity.io or Contentlayer (For structured Book Notes, Articles, and Course Content).
- **Search:** Algolia (For full-text indexing of the massive note archive).
- **Video Pipeline:** Mux Video (For hosting and streaming secure course content).
- **State Management:** Zustand (For course progress, library filters, and session tracking).
- **Payments:** Stripe (For course sales and the "Builder Pro" recurring membership).

### 2. Data Model
```sql
-- Notes (The Digital Garden)
table notes (
  id uuid primary key,
  title text not null,
  slug text unique,
  type text, -- 'article', 'book-note'
  book_author text,
  rating integer, -- 1-10
  top_takeaways text[], -- Array of 3 points
  body_md text,
  publish_date timestamp,
  category_id uuid references categories(id)
);

-- Courses (The Products)
table courses (
  id uuid primary key,
  title text,
  description text,
  price_cents integer,
  curriculum_json jsonb -- [{ 'module': '...', 'lessons': [] }]
);

-- Pro Membership (The Access)
table member_access (
  id uuid primary key,
  user_id uuid references auth.users(id),
  stripe_customer_id text,
  access_tier text, -- 'free', 'course-only', 'pro'
  active_course_ids uuid[]
);

-- Progress (The Journey)
table lesson_progress (
  user_id uuid references auth.users(id),
  lesson_id text,
  is_completed boolean default false,
  updated_at timestamp
);
```

### 3. Knowledge-to-Learning Flow
1. User requests a Book Note: `/notes/[slug]`.
2. Server Component fetches the note + its `rating` and `takeaways` from Sanity.
3. `SearchProvider` (Algolia) ensures the "Related Notes" sidebar is populated with contextually relevant content.
4. At the end of the note, a `CourseCTA` component checks the `note.category` and pitches a relevant course (e.g., a "Productivity" note pitches the "Roam" course).
5. On course purchase: Stripe Webhook updates the `member_access` table, granting the user entry to the `CoursePlayer` UI.
