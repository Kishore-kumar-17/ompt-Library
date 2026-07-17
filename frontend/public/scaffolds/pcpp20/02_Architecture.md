# 02 — Architecture
## Tech Stack & Data Flow · pcpp_platform_20

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **CMS:** Sanity.io or Contentful (For structured Program, University, and Mentor data).
- **Data Visualization:** Recharts (For salary-hike and outcome-statistics charts).
- **Lead Capture:** React Hook Form + Zod (Multi-step inquiry routing).
- **Database/Auth:** Supabase (Lead storage, User profiles, and Admission expert tracking).
- **Payments:** Stripe or Razorpay (For high-AOV degree/certificate payments).

### 2. Data Model
```sql
-- Universities (The Trust Anchors)
table universities (
  id uuid primary key,
  name text not null, -- 'IIT Bangalore', 'Duke University'
  slug text unique,
  logo_url text,
  ranking_label text -- 'Top 1% in India'
);

-- Programs (The Outcome Engines)
table programs (
  id uuid primary key,
  university_id uuid references universities(id),
  title text not null, -- 'Executive PGP in Data Science'
  slug text unique,
  domain text, -- 'AI', 'Data Science', 'MBA'
  duration_months integer,
  avg_salary_hike_percent integer,
  syllabus_pdf_url text,
  hiring_partners text[] -- Logo URLs
);

-- Leads (The Business Core)
table leads (
  id uuid primary key,
  program_id uuid references programs(id),
  full_name text,
  email text,
  phone text,
  nationality text, -- 'Indian', 'Foreign'
  status text default 'new',
  expert_assigned_id uuid
);

-- Success Stories (The Evidence)
table success_stories (
  id uuid primary key,
  learner_name text,
  previous_role text,
  current_role text,
  current_company text,
  video_url text,
  ctc_growth_percent integer
);
```

### 3. Career-ROI Data Flow
1. Next.js fetches `featured_programs` and `university_partners` from Sanity using ISR.
2. `OutcomeViz` component calculates count-up animations for `total_learners` and `avg_hike` from the Supabase analytics table.
3. `LeadGenPortal` detects the user's `program_id` and mounts a multi-step form; on submission, the lead is created in Supabase.
4. `SyllabusEngine` triggers a secure download of the `syllabus_pdf_url` only after the `leads` entry is verified.
5. Inquiries are routed to admission experts based on the `nationality` and `domain` fields in the `leads` table.
