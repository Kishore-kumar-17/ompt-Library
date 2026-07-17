# 07 — Developer Guide
## Premium Fashion Retail Storefront · pfecomm_platform_01

Reference while building. The system's identity lives in its restraint and in the instant swatch image swap.

---

## 1. Non-Negotiable Rules

| Rule | Why |
|------|-----|
| Swatch hover = instant image swap | Fashion industry convention. Animated fades look cheap on premium sites. |
| `border-radius: 0` on buttons and images | Sharp corners are the aesthetic signature. `4px` radius says "DTC startup," not "premium retailer." |
| 6 color tokens, no additions | The monochromatic system is the design. Adding an accent breaks it. |
| No accent color — CTAs are black | The button color being the same as the text color makes the UI feel invisible. |
| `--color-sale` is the only chromatic value | Red sale price stands out precisely because nothing else is chromatic. |
| Sub-brand badge only on non-Aritzia products | The main line doesn't announce itself. Sub-brands do. |
| Color swatch hex values are data, not CSS | They're per-product colorway values from the product record, not UI design values. |
| No urgency copy anywhere | The brand's price point signals value. Scarcity tactics contradict it. |

---

## 2. The Swatch Hover Interaction — How and Why

### Implementation

```tsx
const [activeColorIdx, setActiveColorIdx] = useState(0)
const displaySrc = product.colors[activeColorIdx].images[0]

return (
  <div>
    {/* The image src changes synchronously with state */}
    <Image src={displaySrc} alt={...} fill sizes={...} className={styles.image} />

    <div className={styles.swatches}>
      {product.colors.map((color, idx) => (
        <button
          key={color.name}
          style={{ background: color.swatch }}  {/* only hex appearance in JSX */}
          onMouseEnter={() => setActiveColorIdx(idx)}
          aria-label={color.name}
        />
      ))}
    </div>
  </div>
)
```

### Why instant (no transition)?

The premium fashion convention is an **immediate** image swap. Here is why:

1. **Perceived performance:** A fade transition takes 150–300ms. Hovering multiple swatches quickly to compare colorways means waiting for every transition to complete. Instant swap lets users scan all colorways in under a second.

2. **Editorial feel:** Photography in fashion should feel definitive, not animated. A fade from one model shot to another reads as digital — the "wrong" medium for aspirational imagery.

3. **The tell:** Any CSS transition on the product card image is the mark of a developer who reached for a default behavior. Removing it is the deliberate editorial choice.

### What NOT to do

```css
/* WRONG — never add this */
.image {
  transition: opacity 0.3s ease;  /* Do not add */
}
```

```tsx
{/* WRONG — never use opacity cross-fade */}
<Image src={primaryImage} className={isHovered ? styles.hidden : ''} />
<Image src={hoverImage} className={isHovered ? '' : styles.hidden} />
```

### Browser image loading

The first hover on a colorway that hasn't been loaded yet will show a brief blank while the browser fetches the image. This is acceptable — do not add a spinner or transition to mask it. If it becomes a problem, use `rel="preconnect"` to the image CDN or preload images via Next.js `priority` on the above-fold cards.

---

## 3. Per-Colorway Image Arrays — The Key Data Model Decision

Unlike simpler storefronts where a product has one set of images, each `ColorVariant` has its own `images` array. This is how Aritzia (and most premium fashion retailers) work: a black jacket is photographed on a model in black, a beige jacket in beige. They are different editorial shoots.

```typescript
// CORRECT — per-colorway images
const product: Product = {
  colors: [
    {
      name: 'Black',
      swatch: '#1a1a1a',
      images: ['/black-front.jpg', '/black-back.jpg', '/black-detail.jpg'],
    },
    {
      name: 'Bone',
      swatch: '#e8e0d0',
      images: ['/bone-front.jpg', '/bone-back.jpg', '/bone-detail.jpg'],
    },
  ],
}

// WRONG — shared images across colors (doesn't work for fashion)
const product: Product = {
  images: ['/front.jpg', '/back.jpg'],    // These don't change per color
  colors: [{ name: 'Black', swatch: '#1a1a1a' }],
}
```

**PDP implication:** When `selectedColor` changes on the PDP, the entire gallery must reset to the new colorway's images. Gallery index must return to 0 — the thumbnail strip updates with new images.

---

## 4. Sub-Brand Badge Logic

```tsx
// CORRECT — conditional rendering
{product.brand !== 'Aritzia' && (
  <span className={styles.brandBadge}>{product.brand}</span>
)}

// WRONG — rendering for all products
<span className={styles.brandBadge}>{product.brand}</span>

// WRONG — using a lookup table when the condition is simpler
const BRAND_LABELS: Record<Brand, string | null> = {
  Aritzia: null,
  TNA: 'TNA',
  // ...
}
if (BRAND_LABELS[product.brand]) { ... }
```

The simple inequality check is the correct approach. The Aritzia main line carries no badge — the absence is the correct rendering for the primary brand.

---

## 5. Cart Composite Key

Items in the cart are uniquely identified by three fields: product ID, color, and size. The same product in different colors or sizes are separate line items.

```typescript
// Composite key function
function itemKey(productId: string, color: string, size: string) {
  return `${productId}::${color}::${size}`
}

// Adding an item: if key exists, increment quantity
const existing = state.items.find(
  (i) => itemKey(i.productId, i.color, i.size) === itemKey(item.productId, item.color, item.size)
)
```

**Common mistake:** Using only `productId` as the key. A customer who wants the same pant in both black XS and bone S should have two line items.

---

## 6. OOS Size Display

```tsx
// CORRECT — always render, apply visual state for OOS
{color.sizes.map(({ size, inStock }) => (
  <button
    key={size}
    className={`${styles.sizeBtn} ${
      selected === size    ? styles.sizeBtnActive : ''
    } ${
      !inStock ? styles.sizeBtnOos : ''
    }`}
    onClick={inStock ? () => onChange(size) : undefined}
    aria-disabled={!inStock}
    aria-pressed={selected === size}
  >
    {size}
  </button>
))}

// WRONG — hiding OOS sizes
{color.sizes.filter(s => s.inStock).map(...)}
```

Hiding out-of-stock sizes is confusing because the customer doesn't know if the brand carries that size at all or if it's just currently sold out. Showing it with strikethrough communicates "we have this size, it's just out of stock — check back."

---

## 7. Filter State in URL

Filters live in URL search params, not component state. This enables:
- Shareable filter URLs ("all TNA dresses in XS")
- Browser back button restoring filter state
- Server components can filter on the server if needed

```typescript
// Read
const brands = searchParams.getAll('brand')         // ['TNA', 'Wilfred']
const categories = searchParams.getAll('category')  // ['dresses']

// Write — toggle a filter value
function toggleFilter(key: string, value: string) {
  const params = new URLSearchParams(searchParams.toString())
  const current = params.getAll(key)
  params.delete(key)  // remove all values for this key first
  if (current.includes(value)) {
    // Remove this value
    current.filter(v => v !== value).forEach(v => params.append(key, v))
  } else {
    // Add this value
    [...current, value].forEach(v => params.append(key, v))
  }
  router.push(`${pathname}?${params.toString()}`, { scroll: false })
}
```

---

## 8. Common Mistakes

### Mistake 1: CSS transition on card image

```css
/* WRONG */
.image { transition: opacity 0.3s; }

/* CORRECT — no transition property */
.image { object-fit: cover; }
```

### Mistake 2: Adding an accent color

```css
/* WRONG — there is no brand accent */
:root { --color-accent: hsl(220deg 80% 55%); }

/* CORRECT — CTAs use --color-text (near-black) */
.button { background: var(--color-text); color: var(--color-bg); }
```

### Mistake 3: `border-radius` on buttons

```css
/* WRONG */
.button { border-radius: 4px; }

/* CORRECT */
.button { border-radius: 0; }
/* or just don't set border-radius at all — browser default for buttons is 0 in most resets */
```

### Mistake 4: Showing sub-brand badge for Aritzia products

```tsx
/* WRONG */
<span className={styles.brandBadge}>{product.brand}</span>

/* CORRECT */
{product.brand !== 'Aritzia' && (
  <span className={styles.brandBadge}>{product.brand}</span>
)}
```

### Mistake 5: Not resetting gallery on color change

```typescript
// WRONG — gallery keeps showing old colorway images
const handleColorChange = (color: ColorVariant) => {
  setSelectedColor(color)
  // Missing: setGalleryIndex(0)
}

// CORRECT
const handleColorChange = (color: ColorVariant) => {
  setSelectedColor(color)
  setGalleryIndex(0)
  setSelectedSize(null)
}
```

### Mistake 6: Hiding OOS sizes

```tsx
// WRONG
{sizes.filter(s => s.inStock).map(...)}

// CORRECT — all sizes always visible
{sizes.map(({ size, inStock }) => (
  <button className={!inStock ? styles.sizeBtnOos : ''} ...>
    {size}
  </button>
))}
```

### Mistake 7: Using Tailwind classes for colors

```tsx
// WRONG — Tailwind not in this project
<button className="bg-black text-white rounded-none">

// CORRECT — CSS Module classes using custom properties
<button className={styles.addToCart}>
```

```css
/* addToCart.module.css */
.addToCart {
  background: var(--color-text);
  color: var(--color-bg);
  border-radius: 0;
}
```

### Mistake 8: Sale badge instead of price display

```tsx
// WRONG — aggressive sale treatment
<div className={styles.saleBadge}>SALE</div>
<span>{product.salePrice}</span>

// CORRECT — quiet price display
{product.isSale ? (
  <div className={styles.priceRow}>
    <span className={styles.salePrice}>${product.salePrice}</span>
    <span className={styles.originalPrice}>${product.price}</span>
  </div>
) : (
  <span className={styles.price}>${product.price}</span>
)}
```

### Mistake 9: Closing cart on add-to-cart instead of opening

```typescript
// WRONG — no user feedback
const addToCartHandler = () => {
  addItem(cartItem)
  // nothing else
}

// CORRECT — open the cart to confirm the addition
const addToCartHandler = () => {
  addItem(cartItem)
  openCart()
}
```

### Mistake 10: PromoBanner state initialized to visible

```tsx
// WRONG — flash: banner appears and then disappears (reads sessionStorage in useEffect)
const [dismissed, setDismissed] = useState(false)

// CORRECT — start hidden, reveal only if not dismissed
const [dismissed, setDismissed] = useState(true)  // hidden initially
useEffect(() => {
  const wasDismissed = sessionStorage.getItem(STORAGE_KEY) === 'true'
  if (!wasDismissed) setDismissed(false)  // only show if not previously dismissed
}, [])
```

---

## 9. Launch Checklist

- [ ] `tsc --noEmit` zero errors
- [ ] `npm run build` succeeds; all 12 product pages in `/out/products/`
- [ ] DevTools: every `<button>` has `border-radius: 0` (check multiple)
- [ ] DevTools: every product image container has no `border-radius`
- [ ] DevTools CSS: no hex values in any Computed Styles from `.module.css` files
- [ ] Swatch hover: instant image swap on 5 different products — no visible transition
- [ ] Sub-brand badges: TNA, Wilfred, Sunday Best, Auxiliary products all show badge
- [ ] Aritzia products: no badge
- [ ] Sale products: red price + muted strikethrough original
- [ ] OOS sizes: strikethrough + 0.4 opacity, clicking has no effect
- [ ] PDP: selecting color changes gallery images to that colorway
- [ ] PDP: Add to Cart disabled until in-stock size selected
- [ ] PDP: Add to Cart click adds item and opens drawer
- [ ] Cart drawer: Framer Motion slide-in, backdrop clicks to close
- [ ] Cart: stepper + increments, − decrements (min 1), remove deletes line item
- [ ] Cart: free shipping note appears when subtotal < $200
- [ ] PromoBanner: dismisses on X click, stays dismissed within session
- [ ] Filter: brand + category + size combinations produce correct filtered results
- [ ] Filter: URL reflects active filters (`?brand=TNA`)
- [ ] Filter chips: appear for active filters, clicking chip removes it
- [ ] No urgency copy anywhere (grep: "only", "selling", "hurry", "limited")
- [ ] Focus rings visible on keyboard navigation
- [ ] `aria-label` on search, cart, close icon buttons
- [ ] Lighthouse performance ≥ 90
- [ ] Lighthouse accessibility ≥ 90
