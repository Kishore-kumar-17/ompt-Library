# 02 — Architecture
## Multi-Vendor Marketplace Platform · mulecom_platform_01

---

### 1. Architecture Decision

Monolith on Next.js + Supabase + Stripe Connect-style payouts. V1 prioritizes reliability in buyer checkout, seller economics, and support workflows over microservice decomposition.

---

### 2. Tech Stack

| Layer | Choice | NOT using | Reason |
|------|--------|-----------|--------|
| Framework | Next.js 14 App Router | Pages Router | route/API colocation, RSC |
| Language | TypeScript strict | JavaScript | state and money safety |
| Styling | Tailwind + CSS vars | CSS-in-JS | speed and consistency |
| Data/Auth | Supabase | custom auth stack | DB + Auth + RLS bundle |
| Search | Facet-capable abstraction | ad-hoc client filters only | scalable discovery behavior |
| Payments | Stripe Connect-style | manual payout scripts | marketplace payout model |
| State | Zustand | heavy global stores | simple UI/cart state |

---

### 3. Folder Structure

```text
src/
├── app/
│   ├── search/page.tsx
│   ├── listing/[slug]/page.tsx
│   ├── cart/page.tsx
│   ├── checkout/page.tsx
│   ├── account/orders/page.tsx
│   ├── account/cases/page.tsx
│   ├── seller/dashboard/page.tsx
│   ├── seller/listings/page.tsx
│   ├── seller/orders/page.tsx
│   ├── api/quote/route.ts
│   ├── api/cases/route.ts
│   ├── api/cases/[id]/route.ts
│   └── api/webhooks/stripe/route.ts
├── components/
│   ├── marketplace/*
│   ├── listing/*
│   ├── cart/*
│   ├── support/*
│   └── seller/*
├── store/cart.ts
├── lib/
│   ├── supabase/*
│   ├── search/*
│   ├── payments/*
│   └── utils.ts
└── types/index.ts
```

---

### 4. Database Schema (High Level)

- `users`
- `shops`
- `listings`
- `listing_variants`
- `listing_images`
- `carts`
- `cart_items`
- `orders`
- `order_items`
- `help_requests`
- `cases`
- `case_events`
- `payout_ledger`

Money fields in integer minor units only.

---

### 5. Payment and Payout Flow

1. Buyer cart payload sent to quote endpoint
2. Server validates listings/variants/prices/shipping groups
3. Quote snapshot stored
4. Checkout session created from quote
5. Payment webhook creates order and ledger events
6. Refund/case outcomes adjust payout ledger where required

---

### 6. Security and RLS

- buyer access scoped to own orders/help/cases
- seller access scoped to own shop entities
- admin role required for ops moderation surfaces
- webhook signature verification + idempotency required

---

### 7. Environment Variables

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_DEFAULT_CURRENCY=USD
```

---

### 8. Architecture Decision Records

- ADR-001: keep monolith for V1 transactional reliability
- ADR-002: quote endpoint is sole pricing authority
- ADR-003: payout ledger and case outcomes must be auditable
- ADR-004: case lifecycle status machine enforced server-side
