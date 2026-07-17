# 02 — Architecture
## Tech Stack & Data Flow · pcpp_platform_15

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **CMS:** Sanity.io or Contentlayer (For structured Post, Section, and Tag data).
- **Authentication:** NextAuth.js or Clerk (Supporting "Magic Link" passwordless entry).
- **Payments:** Stripe (For recurring billing, proration, and customer portal).
- **Styling:** Tailwind CSS (Custom "Indie" theme with serif-sans hierarchy).
- **State:** Zustand (For managing "Welcome Overlay" and "Read History").

### 2. Data Model
```sql
-- Publications (The Site)
table publications (
  id uuid primary key,
  title text not null,
  wordmark_url text,
  cover_photo_url text,
  accent_color_hex text default '#FF6719',
  homepage_mode text -- 'magazine', 'newspaper', 'feature'
);

-- Posts (The Content)
table posts (
  id uuid primary key,
  publication_id uuid references publications(id),
  title text not null,
  slug text unique,
  body_md text,
  excerpt_plaintext text,
  visibility text, -- 'public', 'paid', 'founder'
  type text, -- 'essay', 'podcast', 'video'
  published_at timestamp
);

-- Members (The Audience)
table members (
  id uuid primary key,
  email text unique,
  tier text, -- 'free', 'paid', 'founder'
  stripe_customer_id text,
  is_subscribed_to_email boolean default true
);

-- Notes (The Community)
table notes (
  id uuid primary key,
  author_id uuid references members(id),
  content text,
  created_at timestamp
);
```

### 3. Conversion-to-Content Flow
1. User requests `/[slug]`.
2. Server Component fetches the `post` and checks the `visibility` status.
3. If `public`: Render full body via MDX.
4. If `paid`: Verify session + `member.tier`.
5. If invalid: Fetch `excerpt_plaintext` + render `PaywallCTA` component with the fade-overlay.
6. `PaywallCTA` triggers the Stripe Checkout flow; on success, the page is revalidated.
