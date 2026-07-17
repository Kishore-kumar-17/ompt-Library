# 06 — Tasks
## E-commerce Platform · ecomm_platform_01

Tasks are ordered by dependency. Complete each task fully before starting the next. Each task should result in working, committed code.

---

## Phase 0 — Foundation

---

- [ ] **TASK-001** | STORY-001-01 | Est: 2h
  **Initialise project**
  Create Next.js 14 App Router project with TypeScript strict, Tailwind CSS, and all dependencies.

  ```bash
  npx create-next-app@latest . --typescript --tailwind --app --src-dir --import-alias "@/*"
  npm install zustand @supabase/ssr @supabase/supabase-js stripe @stripe/stripe-js @stripe/react-stripe-js resend framer-motion lucide-react @radix-ui/react-dialog @radix-ui/react-accordion @radix-ui/react-select clsx tailwind-merge
  ```

  Acceptance: `npm run dev` starts, `npm run build` succeeds with zero errors.
  Files: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `.env.example`

---

- [ ] **TASK-002** | STORY-001-06 | Est: 1h
  **Set up design tokens**
  Add all CSS variables to `globals.css` and configure Tailwind to use them.

  Acceptance: Background is `#FAFAF8` (not white) when you open `localhost:3000`. CSS variables inspectable in devtools.
  Files: `src/app/globals.css`, `tailwind.config.ts`

---

- [ ] **TASK-003** | STORY-001-06 | Est: 0.5h
  **Load DM Sans font**
  Configure `next/font/google` in root layout with weights 400, 500, 600.

  Acceptance: DM Sans visible in devtools computed styles on body. No FOUT (flash of unstyled text).
  Files: `src/app/layout.tsx`

---

- [ ] **TASK-004** | STORY-001-02 | Est: 3h
  **Run database migrations**
  Execute the full SQL schema from `02_Architecture.md` in Supabase SQL editor. Apply all RLS policies.

  Acceptance: All 9 tables visible in Supabase table editor. RLS enabled icon shows on each table. Test policy: anon user can SELECT from `products` where `is_published = true`, cannot INSERT.
  Files: `supabase/migrations/001_initial_schema.sql` (save migration for version control)

---

- [ ] **TASK-005** | STORY-001-03 | Est: 3h
  **Set up Supabase client utilities**
  Create browser, server, and admin Supabase clients.

  Acceptance: `createClient()` importable from `@/lib/supabase/client`, `@/lib/supabase/server`, `@/lib/supabase/admin`. No TypeScript errors.
  Files: `src/lib/supabase/client.ts`, `src/lib/supabase/server.ts`, `src/lib/supabase/admin.ts`

---

- [ ] **TASK-006** | STORY-001-03 | Est: 4h
  **Build auth pages**
  Create signup, login, and OAuth callback pages.

  Acceptance: User can sign up with email/password, log in, log out. Google OAuth button present (may not work until configured in Supabase dashboard). Profile created automatically on signup via trigger.
  Files: `src/app/auth/login/page.tsx`, `src/app/auth/signup/page.tsx`, `src/app/auth/callback/route.ts`

---

- [ ] **TASK-007** | STORY-001-04 | Est: 2h
  **Configure middleware for route protection**
  Protect `/account/*` and `/admin/*` routes.

  Acceptance: Visiting `/account` without login redirects to `/auth/login?next=/account`. Logging in redirects back to `/account`. Non-admin user visiting `/admin` is redirected to `/`.
  Files: `src/middleware.ts`

---

- [ ] **TASK-008** | STORY-001-05 | Est: 2h
  **Build Zustand cart store**
  Implement cart store with localStorage persistence.

  Acceptance: Add item → cart count increments. Refresh page → cart still populated. Add same variant twice → quantity becomes 2, not 2 separate items. `subtotal` correct for mixed quantities.
  Files: `src/store/cart.ts`

---

- [ ] **TASK-009** | STORY-001-01 | Est: 1h
  **Define all TypeScript types**
  Create `types/index.ts` with all shared interfaces.

  Acceptance: All types importable from `@/types`. No `any` in type definitions.
  Files: `src/types/index.ts`

---

## Phase 1 — Catalog

---

- [ ] **TASK-010** | STORY-002-08 | Est: 3h
  **Seed product data**
  Insert realistic product data into Supabase.

  Minimum: 3 categories, 12 products, each with 2 colors × 5 sizes = 10 variants, varied stock counts (some 0, some 3, some 45+), placeholder product images (use any 3:4 ratio placeholder URL until real images).

  Acceptance: Supabase table editor shows 12 rows in `products`, 120 rows in `product_variants`. At least 10 variants have `stock_count = 0`.
  Files: `supabase/seeds/products.sql`

---

- [ ] **TASK-011** | STORY-002-01 | Est: 4h
  **Build Navbar component**
  Sticky navigation with logo, links, and cart icon.

  Acceptance: Navbar renders on all pages. Cart badge shows correct count from Zustand. Mobile hamburger opens overlay menu. Links navigate correctly.
  Files: `src/components/layout/Navbar.tsx`, `src/app/layout.tsx`

---

- [ ] **TASK-012** | STORY-002-07 | Est: 4h
  **Build CartDrawer component**
  Slide-in cart with Framer Motion animation.

  Acceptance: Opens on cart icon click. Line items render correctly. Quantity stepper works. Remove button removes item. Shipping progress bar fills correctly. Accessible: focus trapped, escape closes, `role="dialog"`.
  Files: `src/components/cart/CartDrawer.tsx`, `src/components/cart/CartItem.tsx`, `src/components/cart/ShippingProgress.tsx`

---

- [ ] **TASK-013** | STORY-002-01 | Est: 1h
  **Build Footer component**

  Acceptance: 4 columns with links. Copyright row. 1px top border. Matches design spec exactly.
  Files: `src/components/layout/Footer.tsx`

---

- [ ] **TASK-014** | STORY-002-04 | Est: 3h
  **Build ProductCard component**
  Card with image swap, color swatches, quick-add.

  Acceptance: Hover swaps to second image via opacity transition. Color swatch click changes displayed images. Quick-add button appears on hover. Badge renders if product has badge field. No border-radius on image wrapper.
  Files: `src/components/product/ProductCard.tsx`

---

- [ ] **TASK-015** | STORY-002-02 | Est: 4h
  **Build Homepage**
  Hero, featured collection, brand story strip, email capture, footer.

  Acceptance: Products fetched server-side from Supabase (Server Component). Hero renders with image and CTA. Featured collection shows 4 products. Brand story strip has 3 columns. Email capture form submits and shows success.
  Files: `src/app/page.tsx`, `src/components/home/Hero.tsx`, `src/components/home/FeaturedCollection.tsx`, `src/components/home/BrandStoryStrip.tsx`, `src/components/home/EmailCapture.tsx`

---

- [ ] **TASK-016** | STORY-002-03 | Est: 5h
  **Build Product Listing Page (PLP)**
  Category route with filter bar and product grid.

  Acceptance: `/collections/mens-shoes` renders 12 products from Supabase. URL params update on filter change. Filter by color reduces grid to matching products. Sort dropdown reorders. Load more button fetches next 12. 404 if category slug invalid.
  Files: `src/app/collections/[category]/page.tsx`, `src/components/product/ProductGrid.tsx`

---

- [ ] **TASK-017** | STORY-002-05 | Est: 5h
  **Build Product Detail Page (PDP)**
  Full product page with gallery, selectors, accordions.

  Acceptance: All product data renders from Supabase. Color selector changes gallery. Out-of-stock sizes show disabled with strikethrough, cannot be clicked. Accordions open/close. Size guide modal opens. Related products row shows 4 items.
  Files: `src/app/products/[slug]/page.tsx`, `src/components/product/ImageGallery.tsx`, `src/components/product/SizeSelector.tsx`, `src/components/product/ColorSelector.tsx`, `src/components/product/MaterialAccordion.tsx`, `src/components/product/SizeGuideModal.tsx`

---

- [ ] **TASK-018** | STORY-002-06 | Est: 2h
  **Build AddToCartButton with cart integration**
  CTA button that validates size selection and adds to Zustand.

  Acceptance: Clicking without size shows "Please select a size" below button. With size selected, adds to cart + opens drawer. Same variant already in cart → increments quantity. Button shows loading state for 300ms.
  Files: `src/components/product/AddToCartButton.tsx`

---

- [ ] **TASK-019** | STORY-006-04 | Est: 2h
  **Add loading and error states for catalog routes**

  Acceptance: `loading.tsx` exists for `/`, `/collections/[category]`, `/products/[slug]` — shows skeleton matching layout. `error.tsx` exists with recovery UI. `not-found.tsx` exists.
  Files: `src/app/loading.tsx`, `src/app/error.tsx`, `src/app/not-found.tsx`, `src/app/collections/[category]/loading.tsx`, `src/app/products/[slug]/loading.tsx`

---

## Phase 2 — Cart and Checkout

---

- [ ] **TASK-020** | STORY-003-01 | Est: 4h
  **Build Checkout page — address and summary**
  Shipping address form + order summary sidebar.

  Acceptance: Line items from Zustand render in order summary. Subtotal and shipping calculated correctly. All address form fields validated before proceeding. Logged-in user sees pre-filled email. Guest sees email input.
  Files: `src/app/checkout/page.tsx`, `src/components/checkout/AddressForm.tsx`, `src/components/checkout/OrderSummary.tsx`

---

- [ ] **TASK-021** | STORY-003-01 | Est: 2h
  **Pre-fill checkout for logged-in users**
  Load saved addresses and pre-select default.

  Acceptance: Logged-in user's default address pre-selected. "Use a new address" option available. Address selection radio buttons work correctly.
  Files: `src/app/checkout/page.tsx`, `src/components/checkout/AddressForm.tsx`

---

- [ ] **TASK-022** | STORY-003-02 | Est: 2h
  **Create PaymentIntent API route**
  Server-side PaymentIntent creation.

  Acceptance: `POST /api/stripe/create-payment-intent` returns `client_secret`. Amount calculated server-side from cart items (re-fetch prices from Supabase — never trust client total). Metadata includes serialized cart snapshot.
  Files: `src/app/api/stripe/create-payment-intent/route.ts`, `src/lib/stripe.ts`

---

- [ ] **TASK-023** | STORY-003-02 | Est: 4h
  **Mount Stripe Payment Element**
  Embed Stripe UI in checkout page.

  Acceptance: Payment Element renders card input, Apple Pay, Google Pay (where supported). "Place order" button disabled until payment details entered. Stripe errors surface as readable messages. Loading state during processing.
  Files: `src/components/checkout/PaymentElement.tsx`, `src/app/checkout/page.tsx`

---

- [ ] **TASK-024** | STORY-003-03 | Est: 5h
  **Build Stripe webhook handler**
  Process `payment_intent.succeeded` event.

  Acceptance: Webhook signature verified. Idempotency checked. Order + order_items rows created. Variant stock_count decremented. Returns 200 within 3 seconds. Duplicate webhook call does not create duplicate order.
  Files: `src/app/api/stripe/webhook/route.ts`

---

- [ ] **TASK-025** | STORY-003-04 | Est: 3h
  **Build order confirmation page and email**
  Success page + Resend confirmation email.

  Acceptance: On successful payment → redirect to `/checkout/success`. Cart cleared. Order summary displayed. Confirmation email received within 2 minutes. Email has correct order number, items, address, total.
  Files: `src/app/checkout/success/page.tsx`, `src/lib/resend.ts`, `src/emails/OrderConfirmation.tsx`

---

## Phase 3 — Accounts

---

- [ ] **TASK-026** | STORY-004-01 | Est: 2h
  **Build account layout and dashboard**
  Account section with sidebar navigation.

  Acceptance: `/account` redirects to `/account/orders`. Sidebar renders. Mobile tab bar at bottom. User name and email shown.
  Files: `src/app/account/layout.tsx`, `src/app/account/page.tsx`, `src/components/account/AccountSidebar.tsx`

---

- [ ] **TASK-027** | STORY-004-02 | Est: 2h
  **Build order history page**
  List of past orders with status.

  Acceptance: All orders for logged-in user shown. Status chips correct color. Empty state renders. Orders sorted newest first. RLS: only logged-in user's orders visible.
  Files: `src/app/account/orders/page.tsx`, `src/components/account/OrderList.tsx`

---

- [ ] **TASK-028** | STORY-004-03 | Est: 3h
  **Build order detail page**
  Full order with line items, tracking, return request.

  Acceptance: All order data renders. Tracking link shown if available. "Request return" only shown if delivered + within 30 days. Clicking request return updates order status + sends email. "Buy again" adds in-stock items, shows toast for skipped items.
  Files: `src/app/account/orders/[id]/page.tsx`

---

- [ ] **TASK-029** | STORY-004-04 | Est: 2h
  **Build saved addresses page**
  Address management with add, edit, delete, set default.

  Acceptance: All user's addresses listed. Add form works. Edit pre-fills form. Delete requires confirmation. "Set as default" updates default flag (clears previous default). Max 5 addresses enforced.
  Files: `src/app/account/addresses/page.tsx`, `src/components/account/AddressList.tsx`

---

- [ ] **TASK-030** | STORY-004-05 | Est: 1h
  **Build password change form**

  Acceptance: Current password validated via Supabase. New password minimum 8 characters. Success toast. Form resets after success.
  Files: `src/app/account/password/page.tsx`

---

## Phase 4 — Admin Panel

---

- [ ] **TASK-031** | STORY-005-01 | Est: 2h
  **Build admin layout**
  Admin shell with sidebar navigation.

  Acceptance: `/admin` accessible only to admin role. Sidebar: Products, Orders, Inventory. Layout visually distinct from storefront.
  Files: `src/app/admin/layout.tsx`, `src/app/admin/page.tsx`, `src/components/admin/AdminSidebar.tsx`

---

- [ ] **TASK-032** | STORY-005-02 | Est: 4h
  **Build product management table and form**
  List, create, and edit products.

  Acceptance: Products table shows all products (published + unpublished). Create product form works. Slug auto-generates from name + is editable. Edit pre-fills form. Delete requires confirmation dialog.
  Files: `src/app/admin/products/page.tsx`, `src/app/admin/products/new/page.tsx`, `src/app/admin/products/[id]/edit/page.tsx`, `src/components/admin/ProductForm.tsx`

---

- [ ] **TASK-033** | STORY-005-03 | Est: 3h
  **Build variant manager**
  Add, edit, delete product variants inline.

  Acceptance: Variant table on product edit page. Add row for new variant. Inline editing works. SKU unique validated. Delete blocked with warning if stock > 0. Saving triggers ISR revalidation.
  Files: `src/components/admin/VariantManager.tsx`, `src/app/api/revalidate/route.ts`

---

- [ ] **TASK-034** | STORY-005-04 | Est: 4h
  **Build image uploader**
  Drag-drop upload to Supabase Storage.

  Acceptance: Drag-drop or file picker. Accepts JPEG, PNG, WebP. Rejects files > 5MB with error message. Upload completes → URL saved to `product_images`. Images reorderable. Primary image toggleable. Delete removes from storage + database.
  Files: `src/components/admin/ImageUploader.tsx`

---

- [ ] **TASK-035** | STORY-005-05 | Est: 4h
  **Build order management**
  Admin order list and status updates.

  Acceptance: Orders table with filter by status. Order detail shows all info. Status dropdown + update button works. Shipping tracking number input → status changes to "Shipped" → shipping email sent to customer.
  Files: `src/app/admin/orders/page.tsx`, `src/app/admin/orders/[id]/page.tsx`, `src/components/admin/OrderTable.tsx`

---

- [ ] **TASK-036** | STORY-005-06 | Est: 3h
  **Build inventory quick-update**
  Fast stock count editing by SKU.

  Acceptance: Search by SKU or product name works. Inline stock input editable. Save updates database. Toast confirms success. ISR revalidation fires. PDP reflects change within 30 seconds.
  Files: `src/app/admin/inventory/page.tsx`, `src/components/admin/InventoryEditor.tsx`

---

## Phase 5 — Polish and Launch

---

- [ ] **TASK-037** | STORY-006-01 | Est: 3h
  **Add SEO metadata and sitemap**

  Acceptance: `generateMetadata` on homepage, PLP, PDP. PDP title: `{product name} | Brand`. OG image = product primary image. Sitemap generated at `/sitemap.xml`. `robots.txt` blocks `/admin`, `/account`, `/api`.
  Files: `src/app/sitemap.ts`, `src/app/robots.ts`, updated `page.tsx` files with `generateMetadata`

---

- [ ] **TASK-038** | STORY-006-02 | Est: 3h
  **Performance optimisation pass**
  Audit and fix Core Web Vitals issues.

  Acceptance: Lighthouse Performance 95+ on PDP mobile (Chrome DevTools audit). LCP < 2.5s. CLS < 0.1. Hero image has `priority` prop. All images have explicit width and height.
  Files: Multiple — wherever `<Image>` is used without `priority` or dimensions

---

- [ ] **TASK-039** | STORY-006-03 | Est: 3h
  **Accessibility audit and fixes**
  Run axe-core and fix all critical violations.

  Acceptance: axe-core shows zero critical violations on homepage, PDP, checkout. Cart drawer focus trap tested. All form fields have labels. Color swatches have `aria-label`. Size selector uses `aria-pressed` and `aria-disabled`.
  Files: Multiple

---

- [ ] **TASK-040** | All stories | Est: 4h
  **End-to-end launch checklist**
  Final verification before switching to production Stripe keys.

  Acceptance: All items in Phase 5 ship gate in `04_Plan.md` checked. Live Stripe keys set in Vercel. Webhook registered in Stripe dashboard (production mode). Custom domain configured. Guest purchase completed end-to-end with live keys. Admin can update product and see change on storefront.
  Files: Vercel environment variables, Stripe webhook configuration (no code changes expected)
