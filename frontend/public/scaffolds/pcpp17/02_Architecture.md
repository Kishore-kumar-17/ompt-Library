# 02 — Architecture
## Tech Stack & Data Flow · pcpp_platform_17

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **CMS:** Sanity.io or Contentlayer (For structured Course, Module, and Artifact metadata).
- **Search Engine:** Algolia (For full-text indexing of the massive document library).
- **Styling:** Tailwind CSS (Custom "Professional" theme with high-signal typography resets).
- **Authentication:** Clerk or Auth.js (Integrated with Stripe membership status).
- **Payments:** Stripe (For tiered membership and team-based billing).

### 2. Data Model
```sql
-- Artifacts (The Value Anchors)
table artifacts (
  id uuid primary key,
  title text not null,
  company_name text,
  company_logo_url text,
  doc_type text, -- 'PRD', 'Roadmap', 'Strategy'
  preview_image_url text,
  is_premium boolean default true,
  tags text[]
);

-- Courses (The Curricula)
table courses (
  id uuid primary key,
  title text not null,
  slug text unique,
  host_ids uuid[], -- Many-to-many
  status text, -- 'Live', 'On-Demand'
  modules jsonb -- [{ 'name': '...', 'lessons': [] }]
);

-- Hosts (The Operators)
table operators (
  id uuid primary key,
  name text not null,
  current_role text, -- 'CPO at Toggl'
  portrait_url text,
  expertise_tags text[]
);

-- Members (The Network)
table members (
  id uuid primary key,
  user_id uuid references auth.users(id),
  access_tier text, -- 'free_trial', 'full_membership'
  stripe_subscription_id text,
  last_active timestamp
);
```

### 3. Evidence-Based Learning Flow
1. Next.js fetches `featured_artifacts` and `live_courses` from Sanity using ISR.
2. `ArtifactEngine` provides an instant search interface; clicking an artifact card triggers a `MembershipCheck` server action.
3. `CurriculumRenderer` maps the JSONB modules into a dense, hierarchical list with linked artifact previews.
4. On checkout success: Stripe Webhook updates the `members` table, granting full-unlock status for the `ArtifactLibrary` and `CoursePlayer`.
