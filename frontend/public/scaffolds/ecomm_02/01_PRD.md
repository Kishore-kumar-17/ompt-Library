# 01 — Product Requirements Document
## Health Food D2C Platform · ecomm_platform_02

---

### 1. Product Vision

A clean-ingredient food e-commerce platform where the ingredient list is a feature, not a footnote. Every product page leads with what is in the product — not benefits, not lifestyle imagery, not aspirational copy. The shopping experience is fast, honest, and mobile-first.

**North star metric:** A first-time visitor can read the full ingredient list of any product within 10 seconds of landing on a PDP, without clicking anything.

---

### 2. Personas

**Riya — Primary shopper**
- 26, urban professional, Bengaluru
- Health-aware but not a gym person — wants clean everyday food
- Shops on iPhone during commute or lunch break
- Has been misled by "natural flavours" and hidden additives before
- Wants: full ingredient transparency, fast mobile checkout, UPI payment
- Will leave if: she can't find the ingredient list immediately on PDP

**Arjun — Returning customer**
- 32, works in tech, Mumbai
- Has been ordering the same protein bar flavour for 6 months
- Logs in to reorder, check delivery status
- Wants: saved addresses, quick reorder, order history
- Pain point: has to re-select flavour and pack size every time

**Meera — Store admin**
- Operations head at the brand, not technical
- Updates stock counts after new batch arrives at warehouse
- Creates new product listings when a new flavour launches
- Does not want to see code or the database
- Pain point: currently calls the developer to change stock counts

---

### 3. Core Features

#### 3.1 Product Catalog
- Browse by product type: Protein Bars, Protein Powder, Healthy Snacks
- Filter by: flavour, dietary tag (Vegan, Gluten-Free, High Protein), price range
- Sort by: bestsellers, newest, price low-high, high-low
- Product cards: image, name, flavour selector, price (changes by pack size), quick-add

#### 3.2 Product Detail Page (PDP)
- Image gallery: 3–5 images per flavour, updates on flavour change
- Flavour selector: pill buttons with flavour name (not just color swatches)
- Pack size selector: "Single (₹150)", "6-Pack (₹840)", "12-Pack (₹1,560)" — price updates on select
- Add to Cart: disabled until flavour selected (pack size defaults to Single)
- **Ingredient Panel (always visible):** full declared ingredient list, plain text, visible by default — not accordion
- Nutrition facts: accordion (collapsible)
- How to use: accordion
- "#nothingtohide" verified badge with link to lab reports page
- Reviews section (below fold)

#### 3.3 Cart
- Zustand + localStorage — works without login
- Cart drawer: flavour + pack size per line item, quantity controls, delivery progress bar
- Free delivery threshold: ₹499
- COD option visible in cart footer: "COD available at checkout"

#### 3.4 Checkout
- Guest checkout: phone number + shipping address (Indian address format: line1, line2, city, state, pincode)
- Logged-in: pre-fill from saved address
- Payment options:
  - Razorpay Payment Element (UPI, cards, netbanking, wallets)
  - Cash on Delivery (COD)
- GST: 18% on protein supplements, 5% on food items — show separately
- On Razorpay success: clear cart, order confirmation page, confirmation SMS + email
- On COD: create order with status `cod_pending`, show confirmation, send SMS

#### 3.5 User Accounts
- Supabase Auth: phone OTP (primary, Indian mobile) + email/password (secondary)
- Account: Profile, Orders, Addresses
- Order history with status: Pending, Processing, Shipped, Delivered, Cancelled, Returned
- "Reorder" button on past orders — pre-fills cart with same flavour and pack size
- Saved addresses: add, edit, set default, delete

#### 3.6 Admin Panel (`/admin`)
- Role: `admin` in profiles table
- **Products:** create/edit product, manage flavours, manage pack sizes, upload images per flavour
- **Orders:** list all orders, view detail, update status, add tracking (Delhivery / Shiprocket link)
- **Inventory:** quick stock update by SKU, search by flavour + product
- **Lab Reports:** upload PDF reports per product (shown in "#nothingtohide" badge link)

---

### 4. User Journeys

#### Journey 1 — First purchase (guest, mobile)
1. Land on homepage
2. Tap product in best sellers → PDP
3. Read ingredient list immediately (no tap needed)
4. Select flavour → select pack size → "Add to Cart"
5. Cart drawer → Checkout
6. Enter phone number + address → Pay via UPI
7. Order confirmation SMS + screen

#### Journey 2 — Reorder (logged in)
1. Open app → Log in via phone OTP
2. Order history → find last order → "Reorder"
3. Cart pre-filled → Checkout (address pre-filled)
4. Pay → done

#### Journey 3 — Admin adds new flavour
1. Log in as admin → `/admin/products`
2. Find "Protein Bar" → Edit → Add Flavour "Hazelnut"
3. Upload 4 images for Hazelnut flavour
4. Set pack sizes + prices + SKUs for Hazelnut
5. Publish → Hazelnut appears in PLP and PDP flavour selector

#### Journey 4 — COD order
1. Guest checkout
2. Select "Cash on Delivery"
3. Order created with `cod_pending` status
4. Admin sees order in orders tab → dispatches → marks "Shipped"
5. Customer gets SMS with tracking

---

### 5. Non-Goals

| # | Non-goal | Why |
|---|----------|-----|
| NG1 | Subscription/recurring orders | Future phase |
| NG2 | Marketplace / multi-brand | Single brand only |
| NG3 | International shipping | India only for now |
| NG4 | Loyalty points / rewards | Future phase |
| NG5 | Product reviews with star ratings | Testimonials only (curated), no user-generated stars |
| NG6 | Live chat | Use third-party (Intercom/Freshchat) |
| NG7 | Discount codes / coupons | Future phase |
| NG8 | Wishlist | Future phase |
| NG9 | Gift wrapping | Not applicable for food |
| NG10 | Revenue analytics dashboard | Admins see orders only |

---

### 6. Constraints

- **Mobile first:** 80%+ of traffic is mobile (India). Every layout decision optimises for 390px viewport first.
- **Phone OTP auth:** Most Indian users do not have a password manager. Phone OTP is primary login.
- **COD is a business requirement:** Approximately 40% of orders are COD. It cannot be deprioritised.
- **Pincode-based delivery check:** Before checkout, validate pincode is serviceable (static list or Shiprocket API).
- **GST compliance:** Show GST breakdown at checkout. Invoice must include GSTIN.
- **Ingredient list never hidden:** This is a brand-level constraint, not just a UX preference.

---

### 7. Page Map

| Route | Page | Auth |
|-------|------|------|
| `/` | Homepage | No |
| `/collections/[type]` | PLP | No |
| `/products/[slug]` | PDP | No |
| `/checkout` | Checkout | No (guest) |
| `/checkout/success` | Order confirmation | No |
| `/account` | Account dashboard | Yes |
| `/account/orders` | Order history | Yes |
| `/account/orders/[id]` | Order detail | Yes |
| `/account/addresses` | Addresses | Yes |
| `/admin` | Admin home | Admin |
| `/admin/products` | Product list | Admin |
| `/admin/products/[id]/edit` | Edit product | Admin |
| `/admin/orders` | Order list | Admin |
| `/admin/orders/[id]` | Order detail | Admin |
| `/admin/inventory` | Stock updater | Admin |
| `/admin/lab-reports` | Upload lab PDFs | Admin |
| `/pages/nothingtohide` | Lab reports page | No |
| `/pages/about` | About page | No |
| `/privacy` | Privacy policy | No |
| `/terms` | Terms of service | No |
