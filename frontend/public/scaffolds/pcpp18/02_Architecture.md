# 02 — Architecture
## Tech Stack & Data Flow · pcpp_platform_18

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **CMS:** Sanity.io or Contentlayer (For structured Curricula, Instructor Bios, and Cohort Data).
- **Search Engine:** Algolia (For real-time marketplace discovery and domain filtering).
- **Styling:** Tailwind CSS (Custom "Professional" theme with per-category accent tokens).
- **State Management:** Zustand (For enrollment data and student progress tracking).
- **Payments:** Stripe (For cohort enrollment fees and corporate billing).

### 2. Data Model
```sql
-- Instructors (The Pedigree)
table instructors (
  id uuid primary key,
  name text not null,
  current_role text, -- 'Ex-Airbnb', 'VP Product at Google'
  headshot_url text,
  bio_short text,
  student_count integer
);

-- Cohorts (The Events)
table cohorts (
  id uuid primary key,
  course_id uuid references courses(id),
  start_date timestamp,
  duration_weeks integer,
  enrollment_deadline timestamp,
  is_active boolean default true
);

-- Courses (The Curricula)
table courses (
  id uuid primary key,
  instructor_id uuid references instructors(id),
  title text not null,
  slug text unique,
  category text, -- 'Product', 'AI', 'Design'
  syllabus_json jsonb, -- [{ 'week': 1, 'lessons': [] }]
  price_cents integer
);

-- Enrollments (The Access)
table enrollments (
  id uuid primary key,
  user_id uuid references auth.users(id),
  cohort_id uuid references cohorts(id),
  stripe_charge_id text,
  is_expensed boolean default false
);
```

### 3. Transformation-First Learning Flow
1. Next.js fetches `trending_cohorts` and `top_instructors` from Sanity using ISR.
2. `MarketplaceGrid` renders cards; `UrgencyHook` calculates the time remaining until the next `enrollment_deadline`.
3. `CurriculumEngine` provides a nested accordion view; clicking a lesson checks if it has a "Public Preview" flag.
4. `ExpenseTool` generates a temporary mail-to link with a pre-populated body using the `course.title` and `course.price`.
5. On enrollment: Stripe Webhook updates the `enrollments` table, granting the student access to the `StudentPortal` for that specific `cohort_id`.
