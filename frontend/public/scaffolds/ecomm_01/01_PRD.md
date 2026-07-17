# 01 — Product Requirements Document
## E-commerce Platform · ecomm_platform_01

---

### 1. Product Vision

A direct-to-consumer e-commerce platform for a sustainable fashion brand. The store must feel as fast and considered as the products it sells. Shopping is unhurried — no pop-ups, no fake urgency, no dark patterns. The experience is clean, the checkout is frictionless, and the product photography does all the persuasion work.

**Success metric:** A shopper who lands on a product page can complete a purchase in under 3 minutes on mobile without creating an account.

---

### 2. Personas

**Maya — First-time shopper (primary)**
- 28 years old, urban professional
- Discovered the brand on Instagram
- Shopping on iPhone during commute
- Wants: fast load, easy size selection, trusted checkout (Apple Pay / Google Pay)
- Concern: "Will it fit? What if I need to return it?"
- She will leave if: the page takes more than 3 seconds to load, or the size guide is hard to find

**Rahul — Returning customer**
- 35 years old, has ordered twice before
- Wants to reorder his favourite shoe in a new colour
- Logs in to see past orders, save address, track current delivery
- Concern: "Is my size still in stock in the new colour?"
- He will use: saved addresses, order history, same payment method

**Priya — Store admin**
- Operations manager at the brand
- Manages product listings, updates inventory after stock arrives, marks orders as fulfilled
- Not technical — needs a clear admin UI, not direct database access
- Pain point: currently updates stock by emailing the developer

---

### 3. Core Features

#### 3.1 Product Catalog
- Browse products by category (Men, Women, Kids, Sale)
- Filter by: color, size (availability), price range, material
- Sort by: newest, price low-high, price high-low, bestsellers
- Product cards show: name, price, color swatches, hover-to-second-image
- "Quick add" on hover — adds default size if only one, else opens size picker
- Pagination: Load more button (not infinite scroll)

#### 3.2 Product Detail Page (PDP)
- Image gallery: 4–6 images, thumbnail strip, zoom on click
- Color selector: visual swatches with color name on hover, switching color changes image set
- Size selector: button grid, out-of-stock sizes shown with strikethrough + disabled, size guide link opens modal
- Add to Cart: disabled until size selected; shows "Select a size" validation if submitted without
- Material callout section: accordion, specific material descriptions (not generic)
- Care instructions: accordion
- Shipping and returns: accordion
- "You may also like" — 4 related products by category

#### 3.3 Cart
- Persistent cart via Zustand + localStorage (no login required)
- Cart drawer slides in from right — accessible on every page
- Line items: image, name, color, size, quantity stepper (min 1), remove
- Free shipping progress bar: threshold $100
- Order subtotal (excluding tax and shipping)
- "Checkout" button — proceeds to Stripe checkout or guest checkout flow

#### 3.4 Checkout
- Guest checkout: email + shipping address + payment (no account required)
- Logged-in checkout: pre-fill email, saved address selector, new address option
- Payment: Stripe Payment Element (card, Apple Pay, Google Pay)
- Order summary sidebar: line items, shipping estimate, subtotal, total
- On success: clear cart, show order confirmation page, send confirmation email via Resend
- On failure: surface Stripe error message, do not clear cart

#### 3.5 User Accounts
- Sign up / log in via Supabase Auth (email + password, Google OAuth)
- Account page sections: Profile, Order History, Saved Addresses, Password
- Order history: list of past orders with status (Processing, Shipped, Delivered, Returned)
- Order detail: line items, tracking link (if available), return request button
- Saved addresses: add, edit, set default, delete
- Password change: current password required

#### 3.6 Admin Panel (route: `/admin`)
- Protected by Supabase role — only users with `role = 'admin'` can access
- **Products tab:** list all products, add/edit product, manage variants (size + color + stock + SKU + price), upload images
- **Orders tab:** list all orders (filterable by status), view order detail, update status (Processing → Shipped with tracking number → Delivered)
- **Inventory tab:** quick stock update per variant — search by SKU, enter new stock count
- No revenue analytics, no customer management, no marketing tools — out of scope

---

### 4. User Journeys

#### Journey 1 — First purchase (guest)
1. Land on homepage from Instagram ad
2. Click product in featured section → PDP
3. Select color → select size → "Add to Cart"
4. Cart drawer opens → review → "Checkout"
5. Enter email + shipping address + card details
6. Order confirmation page + email
7. Total time target: under 3 minutes

#### Journey 2 — Returning customer reorder
1. Land on homepage
2. Log in → go to Order History
3. Find past order → "Buy again" (adds same items to cart if in stock)
4. Cart → Checkout (pre-filled address + saved payment)
5. Confirm order

#### Journey 3 — Admin updates inventory
1. Log in as admin → `/admin`
2. Go to Inventory tab
3. Search SKU "WR-NAT-BLK-10" → update stock to 45
4. Save → confirmation toast
5. Stock count updates immediately in PDP size selector

#### Journey 4 — Shopper returns an item
1. Log in → Order History → find order
2. "Request return" → select items + reason
3. Submit → confirmation email with return label instructions
4. Admin sees return request in order detail → processes manually

---

### 5. Non-Goals

These are explicitly out of scope. Do not implement or design for these.

| # | Non-goal | Why |
|---|----------|-----|
| NG1 | Multi-vendor marketplace | Single brand only |
| NG2 | Subscription / recurring orders | Not in brand roadmap |
| NG3 | B2B / wholesale ordering | Separate platform if needed |
| NG4 | Gift cards | Future phase |
| NG5 | Loyalty / points system | Future phase |
| NG6 | Live chat / support inbox | Use third-party (Intercom) |
| NG7 | Product reviews and ratings | Future phase |
| NG8 | Wishlist / save for later | Future phase |
| NG9 | Multi-currency | INR and USD only — currency switching not needed |
| NG10 | Revenue analytics dashboard | Admin sees orders only |

---

### 6. Constraints

**Technical:**
- All pages must pass Lighthouse 95+ on mobile and desktop
- LCP under 2.5s on 4G mobile
- No client-side data fetching on first page load for catalog pages — use Next.js `generateStaticParams` or server components
- Cart state in localStorage only — no server-side cart session

**Business:**
- Free shipping threshold: $100 (configurable in environment variable)
- Return window: 30 days from delivery
- Guest checkout must be available — do not force account creation
- All prices in USD to start

**Legal:**
- Privacy policy and terms of service pages required (static, placeholder content is fine)
- Cookie consent banner required — minimal, non-blocking

---

### 7. Acceptance Criteria (Top Level)

Before launch, all of the following must pass:

- [ ] Guest user can complete a purchase without creating an account
- [ ] Logged-in user can complete checkout with pre-filled address in under 60 seconds
- [ ] Out-of-stock variant shows as disabled in size selector — cannot be added to cart
- [ ] Cart persists across page refresh and browser close/reopen
- [ ] Admin can update stock count for any variant — change reflects in PDP within 30 seconds
- [ ] Stripe webhook processes `payment_intent.succeeded` and creates order in database
- [ ] Order confirmation email sent within 2 minutes of successful payment
- [ ] All pages WCAG AA compliant — tested with axe-core
- [ ] No PII logged to console in production

---

### 8. Appendix A — Product Data Model (high level)

```
Product
  → has many ProductVariants (size × color combinations)
  → has many ProductImages (ordered, tagged by color)
  → belongs to Category

ProductVariant
  → has SKU (unique)
  → has stock_count
  → has price (can differ from base product price for upsell variants)
  → belongs to Product

Order
  → has many OrderItems (snapshot of variant at time of purchase)
  → belongs to User (nullable — guest orders have email only)
  → has Stripe payment_intent_id

OrderItem
  → snapshot: product_name, variant_name, price_at_purchase, quantity
  → references ProductVariant (for reorder lookup, not for price recalculation)
```

---

### 9. Appendix B — Page Map

| Route | Page | Auth required |
|-------|------|--------------|
| `/` | Homepage | No |
| `/collections/[category]` | PLP | No |
| `/products/[slug]` | PDP | No |
| `/cart` | Cart page (fallback if drawer blocked) | No |
| `/checkout` | Checkout | No (guest allowed) |
| `/checkout/success` | Order confirmation | No |
| `/account` | Account dashboard | Yes |
| `/account/orders` | Order history | Yes |
| `/account/orders/[id]` | Order detail | Yes |
| `/account/addresses` | Saved addresses | Yes |
| `/admin` | Admin dashboard | Yes (admin role) |
| `/admin/products` | Product management | Yes (admin role) |
| `/admin/products/new` | Add product | Yes (admin role) |
| `/admin/products/[id]/edit` | Edit product | Yes (admin role) |
| `/admin/orders` | Order management | Yes (admin role) |
| `/admin/orders/[id]` | Order detail | Yes (admin role) |
| `/admin/inventory` | Inventory quick-update | Yes (admin role) |
| `/privacy` | Privacy policy | No |
| `/terms` | Terms of service | No |
