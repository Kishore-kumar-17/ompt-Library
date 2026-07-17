# 06 — Tasks
## Neo-Brutalist Digital Creator Marketplace · dpecom_platform_01

Tasks are ordered by dependency. Complete each task fully before starting the next.

---

## Phase 0 — Foundation

---

- [ ] **TASK-001** | Est: 2h
  **Initialise project**
  Next.js 14 App Router with TypeScript strict. No Tailwind — CSS Modules only (maintains Neo-Brutalist control).

  ```bash
  npx create-next-app@latest . --typescript --app --src-dir --import-alias "@/*" --no-tailwind
  npm install zustand @supabase/ssr @supabase/supabase-js stripe @stripe/stripe-js @stripe/react-stripe-js framer-motion lucide-react zod resend
  ```

  Acceptance: `npm run dev` starts. `tsconfig.json` has `"strict": true`. No Tailwind classes in any file.
  Files: `package.json`, `tsconfig.json`, `.env.example`

---

- [ ] **TASK-002** | Est: 1h
  **Design tokens — strict Neo-Brutalist rules**
  No border-radius anywhere except explicit exemptions.

  Acceptance: `globals.css` defines `--color-ink: #000000`, `--color-bg: #FFFFFF`, `--color-surface: #F4F4F0`, `--color-accent` (platform accent). `grep -r "border-radius" src/components --include="*.module.css"` → empty (no radius anywhere in V1). `grep -r "#[0-9A-Fa-f]{3,6}" src/components --include="*.module.css"` → empty.
  Files: `src/app/globals.css`, `src/app/layout.tsx`

---

- [ ] **TASK-003** | Est: 1h
  **TypeScript types**
  All domain types centralised.

  Acceptance: `SearchResult`, `ProductCategory`, `ListingCard`, `OrderStatus`, `CheckoutStore` exported from `src/types/index.ts`. Zod schema `z.string().min(3).max(30).regex(/^[a-zA-Z0-9_-]+$/)` for username exported from `src/lib/schemas.ts`. `tsc --noEmit` exits 0.
  Files: `src/types/index.ts`, `src/lib/schemas.ts`

---

- [ ] **TASK-004** | Est: 3h
  **Database schema + RLS migrations**
  Full schema: `profiles`, `products`, `orders`, `processed_webhook_events`.

  Acceptance: `profiles.username` has `UNIQUE` index (case-insensitive via `LOWER(username)`). `products.file_url` has RLS: `SELECT` restricted to `shop.owner_id = auth.uid()` only — buyers access via signed-URL endpoint. `orders` has `UNIQUE` on `stripe_payment_intent_id`. `products` has `search_vector tsvector` generated column with DB trigger.
  Files: `supabase/migrations/001_initial_schema.sql`

---

- [ ] **TASK-005** | Est: 2h
  **Supabase client utilities + auth middleware**
  Browser, server, and admin clients; protected route middleware.

  Acceptance: `/[username]/dashboard` and `/[username]/products` redirect to `/auth/login` if not authenticated. Middleware checks `session.user.id` matches `params.username`'s `profiles.id`. Public routes: `/`, `/search`, `/[username]`, `/download/*`.
  Files: `src/lib/supabase/client.ts`, `src/lib/supabase/server.ts`, `src/lib/supabase/admin.ts`, `src/middleware.ts`

---

- [ ] **TASK-006** | Est: 1h
  **Checkout Zustand store**
  Minimal overlay state — product selection only.

  Acceptance: `useCheckoutStore.open(productId)` sets `activeProductId`. `close()` clears it. No price or amount stored client-side. Persisted only for duration of session — no `localStorage`.
  Files: `src/store/checkout.ts`

---

## Phase 1 — Creator Onboarding

---

- [ ] **TASK-007** | STORY-1.1 | Est: 3h
  **Username claim during signup**
  Real-time username availability check with Supabase.

  Acceptance: Username validates against `^[a-zA-Z0-9_-]{3,30}$` with inline Zod error. `POST /api/auth/claim-username` checks uniqueness via case-insensitive `ILIKE` on `profiles.username`. Duplicate → `{ error: 'USERNAME_TAKEN' }` shown without page reload. On success: redirect to `/[username]/dashboard`.
  Files: `src/app/auth/signup/page.tsx`, `src/app/api/auth/claim-username/route.ts`

---

- [ ] **TASK-008** | STORY-1.2 | Est: 2h
  **Creator profile — bio and avatar**
  Profile settings with file upload enforcing Neo-Brutalist style.

  Acceptance: Avatar: JPEG/PNG/WEBP ≤2MB; stored at `avatars/{userId}/avatar`. Rendered at `80px × 80px`; `border: 3px solid #000000; border-radius: 0`. Bio `<textarea>` max 280 chars with `{remaining}/280` counter; `border: 2px solid #000000; border-radius: 0`. Profile `<h1>`: Inter Black 900, `font-size: 40px`, `line-height: 1.0`. `grep -r "border-radius" src/components/CreatorProfile` → zero results.
  Files: `src/app/[username]/settings/page.tsx`, `src/components/creator/ProfileForm.tsx`, `src/app/api/profile/route.ts`

---

- [ ] **TASK-009** | STORY-1.3 | Est: 2h
  **Connect Stripe for payouts**
  Stripe Connect Express OAuth flow.

  Acceptance: `POST /api/connect/init` returns `accountLink.url`. Callback at `/connect/callback?code=...` calls `stripe.oauth.token({ code })` to exchange for `access_token`. `profiles.stripe_account_id` set on success. Dashboard shows "Payouts Active" in `color: #16A34A`. No client-side disconnect — admin panel only. RLS prevents reading `stripe_account_id` of other users.
  Files: `src/app/api/connect/init/route.ts`, `src/app/connect/callback/page.tsx`

---

## Phase 2 — Product Management

---

- [ ] **TASK-010** | STORY-2.1 | Est: 4h
  **Secure file upload (up to 500MB)**
  Presigned URL upload to Supabase Storage with progress bar.

  Acceptance: `POST /api/products/upload-url` returns presigned upload URL. Files >500MB rejected client-side; error: "File must be under 500MB". `<progress aria-label="Uploading file" aria-valuenow={percent}>` updates each tick. `products.file_url` set on success; `is_published` stays `false` until explicit publish. `/api/download?orderId=` validates `orders.status = 'succeeded'` then generates signed URL (3600s TTL). `file_url` SELECT restricted to owning creator by RLS.
  Files: `src/app/api/products/upload-url/route.ts`, `src/app/api/download/route.ts`, `src/components/creator/FileUpload.tsx`

---

- [ ] **TASK-011** | STORY-2.2 | Est: 3h
  **Pay what you want pricing**
  Price floor enforcement on both client and server.

  Acceptance: `products.min_price` in cents; minimum `100` (= $1.00); `0` = free. Free products: checkout skips Stripe; `orders` row created with `status = 'free'` directly. Price input: `amount < min_price` → "Minimum is $X.XX" inline error before submit. `POST /api/checkout` rejects `amount < products.min_price` with 400 `{ error: 'BELOW_MINIMUM' }`. Two product form modes: "Fixed Price" (single input) vs "Pay What You Want" (min + suggested price fields). `validateAmount(amount, minPrice): boolean` in `src/lib/utils.ts`.
  Files: `src/components/creator/ProductForm.tsx`, `src/lib/utils.ts`

---

- [ ] **TASK-012** | STORY-2.3 | Est: 2h
  **Product tags and categories**
  Normalised tag system with Neo-Brutalist pill style.

  Acceptance: `products.tags text[]` max 5 tags; lowercased on save; duplicates deduplicated silently. `type ProductCategory = 'design' | 'code' | 'writing' | 'music' | 'photo' | 'other'`. Tag pills: `background: #000000; color: #FFFFFF; border-radius: 0; padding: 2px 8px`. Comma or Enter key to add tags. Filter uses `.contains('tags', [selectedTag])` — server-side. `grep -r "border-radius" src/components/TagPill` → zero results.
  Files: `src/components/creator/TagInput.tsx`, `src/components/ui/TagPill.tsx`

---

## Phase 3 — Buyer Experience

---

- [ ] **TASK-013** | STORY-4.1 | Est: 3h
  **Homepage trending grid**
  ISR product grid with Neo-Brutalist card style.

  Acceptance: Server Component with `revalidate = 60`. Query: `.select('*').eq('is_published', true).order('created_at', { ascending: false }).limit(24)`. Grid: `grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px`. Card: `border: 2px solid #000000; border-radius: 0; box-shadow: 4px 4px 0 #000000`. Empty state: "No products yet. Be the first to sell something." — no skeletons.
  Files: `src/app/page.tsx`, `src/components/product/ProductCard.tsx`

---

- [ ] **TASK-014** | STORY-4.2 | Est: 2h
  **Keyword search**
  Full-text search via `tsvector` generated column.

  Acceptance: Search input in nav; `placeholder="Search products and creators..."`. Client debounces 300ms before navigating to `/search?q={query}`. Server query: `.textSearch('search_vector', query, { type: 'websearch' })`. Zero-result state: "No results for '{query}'" — no recommendations. `type SearchResult = { id: string; type: 'product' | 'creator'; name: string; url: string }`.
  Files: `src/app/search/page.tsx`, `src/components/layout/SearchInput.tsx`

---

- [ ] **TASK-015** | STORY-4.3 | Est: 1h
  **Free / Paid filter tabs**
  URL-param driven marketplace filter.

  Acceptance: Tabs "All" | "Free" | "Paid" as `<button role="tab" aria-selected={isActive}>`. "Free": `.eq('min_price', 0)`; "Paid": `.gt('min_price', 0)`. Active tab: `background-color: #000000; color: #FFFFFF; border-radius: 0`. URL param `?filter=free|paid|all`. Grid updates in-place — no scroll-to-top.
  Files: `src/app/page.tsx`, `src/components/product/FilterTabs.tsx`

---

- [ ] **TASK-016** | STORY-3.1 | Est: 3h
  **Checkout overlay**
  Slide-up checkout dialog via React portal.

  Acceptance: "Buy" button calls `useCheckoutStore.open(productId)`. Overlay: `transform: translateY(100%) → translateY(0)`, `transition: 300ms ease-out`. `role="dialog"`, `aria-modal="true"`, `aria-label="Checkout"`. Focus trapped; Esc closes + returns focus to trigger. Rendered into `document.body` via `createPortal`; `z-index: 9999`. `grep -r "border-radius" src/components/CheckoutOverlay` → zero results.
  Files: `src/components/checkout/CheckoutOverlay.tsx`, `src/store/checkout.ts`

---

- [ ] **TASK-017** | STORY-3.2 | Est: 3h
  **Stripe Payment Element in overlay**
  Card, Apple Pay, Google Pay in a flat Neo-Brutalist appearance.

  Acceptance: `POST /api/checkout` creates PaymentIntent with server-validated `amount ≥ products.min_price`. Payment Element appearance: `{ theme: 'flat', variables: { borderRadius: '0px', colorPrimary: '#000000' } }`. Apple/Google Pay auto-detected by Stripe. `stripe.confirmPayment` on success → "Download Ready" screen. Stripe error below element; affected input border `#DC2626`.
  Files: `src/app/api/checkout/route.ts`, `src/components/checkout/PaymentForm.tsx`

---

- [ ] **TASK-018** | STORY-3.3 | Est: 3h
  **Idempotent webhook + immediate download link**
  `payment_intent.succeeded` → order row → signed URL.

  Acceptance: Signature verified — unverified → 400. Idempotency: `processed_webhook_events` checked before processing; duplicate → 200 no-op. Order insert: `ON CONFLICT (stripe_payment_intent_id) DO NOTHING`. `/download/[orderId]` validates `orders.status = 'succeeded'` + buyer identity before generating signed URL (3600s). Expired URL renders "Link expired — request a new one" with re-send form.
  Files: `src/app/api/webhooks/stripe/route.ts`, `src/app/download/[orderId]/page.tsx`

---

## Phase 4 — Creator Storefront and QA

---

- [ ] **TASK-019** | Est: 2h
  **Creator public storefront `/[username]`**
  Public-facing creator page with product grid.

  Acceptance: Server Component. `generateMetadata` sets `<title>` to creator's display name. Shows avatar, bio, and published products grid. 404 (`notFound()`) if `profiles.username` does not exist — not `null` return.
  Files: `src/app/[username]/page.tsx`

---

- [ ] **TASK-020** | Est: 2h
  **QA grep suite**

  ```bash
  echo "=== TypeScript ===" && npx tsc --noEmit && echo "PASS"

  echo "=== Zero border-radius in components ===" && \
    grep -r "border-radius" src/components --include="*.module.css" && echo "FAIL" || echo "PASS"

  echo "=== No hex in component CSS ===" && \
    grep -r "#[0-9A-Fa-f]{3,6}" src/components --include="*.module.css" && echo "FAIL" || echo "PASS"

  echo "=== Checkout amount never from client ===" && \
    grep -r "body\.amount\|req\.body\.amount" src/app/api/checkout/route.ts \
    && echo "FAIL — never trust client amount" || echo "PASS"

  echo "=== file_url not exposed via direct SELECT ===" && \
    grep -r "\.select.*file_url" src/app --include="*.tsx" \
    && echo "REVIEW — ensure RLS blocks buyer access" || echo "PASS"

  echo "=== CheckoutOverlay rendered via portal ===" && \
    grep -r "createPortal" src/components/checkout/CheckoutOverlay.tsx && echo "PASS" || echo "FAIL"

  echo "=== Build ===" && npm run build && echo "PASS"
  ```

  Acceptance: All checks pass. Lighthouse Performance ≥90, Accessibility ≥90.
  Files: No code changes — read-only QA pass

---
