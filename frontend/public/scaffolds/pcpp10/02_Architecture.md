# 02 — Architecture
## Tech Stack & Data Flow · pcpp_platform_10

### 1. Core Stack
- **Framework:** Next.js 14 (App Router)
- **CMS:** Ghost Content API (For newsletter-first content and member metadata).
- **Search:** Algolia (For full-text indexing of the reporting archive).
- **Payments:** Stripe (For multi-tier subscription billing and customer portal).
- **Authentication:** NextAuth.js or Clerk (Synced with Ghost member status).
- **Styling:** Tailwind CSS (Custom "Editorial" theme with Inter-font resets).

### 2. Data Model
```sql
-- Posts (From Ghost API)
table posts (
  id string primary key,
  title text not null,
  slug text unique,
  html text, -- Full content
  plaintext text, -- For excerpt generation
  visibility text, -- 'public', 'members', 'paid'
  published_at timestamp,
  primary_author_id string
);

-- Members (Subscription Status)
table members (
  id uuid primary key,
  email text unique,
  name text,
  status text, -- 'free', 'paid', 'comped'
  stripe_customer_id text,
  subscription_tier text, -- 'monthly', 'annual'
  expires_at timestamp
);

-- Search Index (Algolia Schema)
table search_index (
  object_id string primary key,
  title text,
  excerpt text,
  tags text[],
  timestamp integer
);
```

### 3. Subscription Verification Flow
1. User requests `/[slug]`.
2. Server-side component fetches the `post` and checks the `visibility` field.
3. If `paid`: NextAuth/Ghost session is verified.
4. If session is valid AND member status is `paid`: Render full `html` from Ghost.
5. If session is invalid or status is `free`: Render `plaintext` excerpt (first 300 words) + `PaywallCTA` component.
6. `PaywallCTA` triggers the `MemberPortal` modal for checkout or login.
