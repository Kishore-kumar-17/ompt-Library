# 02 — Architecture
## Indian Mass-Market Fashion Marketplace · pfecomm_platform_03

---

## 1. TypeScript Schema

```typescript
// src/types/index.ts

export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL'

export type Category =
  | 'tshirts'
  | 'jeans'
  | 'dresses'
  | 'kurtas'
  | 'trousers'
  | 'sportswear'
  | 'skirts'
  | 'shirts'
  | 'activewear'

export interface ColorOption {
  name: string    // "Black", "Navy Blue", "Olive Green", "White"
  swatch: string  // hex value — ONLY used as inline style on dot, never in CSS
  inStock: boolean
  sku: string     // unique SKU for this color variant
}

export interface SizeOption {
  size: Size
  inStock: boolean
}

export interface Product {
  id: string
  slug: string
  brand: string           // "Nike", "H&M", "Roadster", "Levi's", "Biba"
  name: string            // "Slim Fit Stretch Jeans", "Training Mesh Tee"
  category: Category
  mrp: number             // Maximum Retail Price (original price, INR)
  price: number           // Selling price — always ≤ mrp. discountPercent is DERIVED.
  images: string[]        // 3–5 images shared across all colors (NOT per-colorway)
  colors: ColorOption[]
  sizes: SizeOption[]
  isNew: boolean
  isTrending: boolean
  featured: boolean
}

export interface CartItem {
  productId: string
  brand: string
  name: string
  price: number
  mrp: number
  color: string           // color name
  colorSwatch: string     // hex
  size: string
  quantity: number
  image: string
}

export interface WishlistItem {
  productId: string
  brand: string
  name: string
  price: number
  mrp: number
  image: string
}
```

---

## 2. File Structure

```
src/
├── app/
│   ├── layout.tsx              # Root: Inter font, PromoBanner + TopNav + CartDrawer
│   ├── globals.css             # 7 CSS tokens + base reset
│   ├── page.tsx                # Homepage
│   ├── products/
│   │   ├── page.tsx            # PLP — 5-col + filter panel
│   │   └── [slug]/
│   │       └── page.tsx        # PDP
│   └── wishlist/
│       └── page.tsx            # Wishlist page
├── components/
│   ├── layout/
│   │   ├── PromoBanner.tsx     # Orange dismissible bar
│   │   ├── TopNav.tsx          # Sticky, search center, wishlist/cart counts
│   │   └── Footer.tsx
│   ├── cart/
│   │   ├── CartDrawer.tsx      # Framer Motion, orange checkout btn
│   │   └── CartItem.tsx
│   └── product/
│       ├── ProductCard.tsx     # Discount badge + wishlist heart + quick-add + brand-first
│       ├── ProductGrid.tsx     # 5-col
│       ├── FilterPanel.tsx     # Brand/category/price/discount + URL params
│       ├── SizeSelector.tsx    # Orange selected, OOS strikethrough
│       ├── SizePicker.tsx      # Mini-overlay for quick-add size selection
│       └── ImageGallery.tsx    # Gallery with arrow navigation
├── store/
│   ├── cart.ts                 # Zustand cart store
│   └── wishlist.ts             # Zustand wishlist store — SEPARATE
├── lib/
│   ├── products.ts             # 12 mock products
│   └── utils.ts                # formatINR + getDiscountPercent
└── types/
    └── index.ts
```

---

## 3. Utility Functions

```typescript
// src/lib/utils.ts

export function formatINR(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`
}

export function getDiscountPercent(mrp: number, price: number): number {
  if (price >= mrp) return 0
  return Math.round(((mrp - price) / mrp) * 100)
}

// Usage:
// getDiscountPercent(2499, 1499) → 40
// getDiscountPercent(1299, 599)  → 54
// getDiscountPercent(799, 799)   → 0 (no badge shown)
```

---

## 4. Zustand Cart Store

```typescript
// src/store/cart.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '@/types'

const FREE_SHIPPING_THRESHOLD = 599  // INR

function itemKey(productId: string, color: string, size: string) {
  return `${productId}::${color}::${size}`
}

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (item: CartItem) => void
  removeItem: (productId: string, color: string, size: string) => void
  updateQuantity: (productId: string, color: string, size: string, qty: number) => void
  openCart: () => void
  closeCart: () => void
  toggleCart: () => void
  readonly subtotal: number
  readonly itemCount: number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (item) => set((state) => {
        const key = itemKey(item.productId, item.color, item.size)
        const existing = state.items.find(
          (i) => itemKey(i.productId, i.color, i.size) === key
        )
        if (existing) {
          return {
            items: state.items.map((i) =>
              itemKey(i.productId, i.color, i.size) === key
                ? { ...i, quantity: i.quantity + 1 }
                : i
            ),
          }
        }
        return { items: [...state.items, { ...item, quantity: 1 }] }
      }),

      removeItem: (productId, color, size) =>
        set((state) => ({
          items: state.items.filter(
            (i) => itemKey(i.productId, i.color, i.size) !== itemKey(productId, color, size)
          ),
        })),

      updateQuantity: (productId, color, size, qty) =>
        set((state) => ({
          items:
            qty <= 0
              ? state.items.filter(
                  (i) => itemKey(i.productId, i.color, i.size) !== itemKey(productId, color, size)
                )
              : state.items.map((i) =>
                  itemKey(i.productId, i.color, i.size) === itemKey(productId, color, size)
                    ? { ...i, quantity: qty }
                    : i
                ),
        })),

      openCart:   () => set({ isOpen: true }),
      closeCart:  () => set({ isOpen: false }),
      toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),

      get subtotal() {
        return get().items.reduce((sum, i) => sum + i.price * i.quantity, 0)
      },
      get itemCount() {
        return get().items.reduce((sum, i) => sum + i.quantity, 0)
      },
    }),
    { name: 'ajio-cart' }
  )
)

export { FREE_SHIPPING_THRESHOLD }
```

---

## 5. Zustand Wishlist Store

```typescript
// src/store/wishlist.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { WishlistItem } from '@/types'

interface WishlistStore {
  items: WishlistItem[]
  toggle: (item: WishlistItem) => void
  isWishlisted: (productId: string) => boolean
  remove: (productId: string) => void
  readonly count: number
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      toggle: (item) => set((state) => {
        const exists = state.items.some((i) => i.productId === item.productId)
        return {
          items: exists
            ? state.items.filter((i) => i.productId !== item.productId)
            : [...state.items, item],
        }
      }),

      isWishlisted: (productId) =>
        get().items.some((i) => i.productId === productId),

      remove: (productId) =>
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        })),

      get count() {
        return get().items.length
      },
    }),
    { name: 'ajio-wishlist' }  // Different key from cart — they are separate
  )
)
```

---

## 6. ProductCard — Discount Badge + Wishlist + Quick-Add

```tsx
// src/components/product/ProductCard.tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import type { Product, WishlistItem } from '@/types'
import { useWishlistStore } from '@/store/wishlist'
import { getDiscountPercent, formatINR } from '@/lib/utils'
import SizePicker from './SizePicker'
import styles from './ProductCard.module.css'

export default function ProductCard({ product }: { product: Product }) {
  const { toggle, isWishlisted } = useWishlistStore()
  const [sizePickerOpen, setSizePickerOpen] = useState(false)

  const discountPct = getDiscountPercent(product.mrp, product.price)
  const isDiscounted = discountPct > 0
  const wishlisted = isWishlisted(product.id)

  const wishlistItem: WishlistItem = {
    productId: product.id,
    brand: product.brand,
    name: product.name,
    price: product.price,
    mrp: product.mrp,
    image: product.images[0],
  }

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        {/* Discount badge — only when discounted */}
        {isDiscounted && (
          <span className={styles.discountBadge} aria-label={`${discountPct}% discount`}>
            {discountPct}% off
          </span>
        )}

        {/* Wishlist heart */}
        <button
          className={`${styles.wishlistBtn} ${wishlisted ? styles.wishlisted : ''}`}
          onClick={(e) => { e.preventDefault(); toggle(wishlistItem) }}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={wishlisted}
        >
          <Heart
            size={16}
            strokeWidth={2}
            fill={wishlisted ? 'currentColor' : 'none'}
          />
        </button>

        <Link href={`/products/${product.slug}`} className={styles.imageLink}>
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 20vw"
            className={styles.image}
          />
        </Link>

        {/* Quick-add pill — appears on hover */}
        <button
          className={styles.quickAdd}
          onClick={(e) => { e.preventDefault(); setSizePickerOpen(true) }}
          aria-label={`Quick add ${product.name} to bag`}
        >
          ADD TO BAG
        </button>
      </div>

      <div className={styles.info}>
        {/* Brand FIRST — always */}
        <p className={styles.brandName}>{product.brand.toUpperCase()}</p>
        <Link href={`/products/${product.slug}`} className={styles.nameLink}>
          <p className={styles.productName}>{product.name}</p>
        </Link>
        <div className={styles.priceRow}>
          <span className={styles.sellingPrice}>{formatINR(product.price)}</span>
          {isDiscounted && (
            <>
              <span className={styles.mrp}>{formatINR(product.mrp)}</span>
              <span className={styles.discountPct}>{discountPct}% off</span>
            </>
          )}
        </div>
        {/* Color dots */}
        <div className={styles.colorDots}>
          {product.colors.map((c) => (
            <span
              key={c.sku}
              className={styles.colorDot}
              style={{ background: c.swatch }}
              title={c.name}
            />
          ))}
        </div>
      </div>

      {/* Size picker mini-overlay */}
      {sizePickerOpen && (
        <SizePicker
          product={product}
          onClose={() => setSizePickerOpen(false)}
        />
      )}
    </article>
  )
}
```

---

## 7. SizePicker Mini-Overlay (Quick-Add)

```tsx
// src/components/product/SizePicker.tsx
'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import type { Product, CartItem } from '@/types'
import { useCartStore } from '@/store/cart'
import { formatINR } from '@/lib/utils'
import styles from './SizePicker.module.css'

export default function SizePicker({
  product,
  onClose,
}: {
  product: Product
  onClose: () => void
}) {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const { addItem, openCart } = useCartStore()

  const handleAddToBag = () => {
    if (!selectedSize) return
    const color = product.colors.find((c) => c.inStock) ?? product.colors[0]
    const cartItem: CartItem = {
      productId: product.id,
      brand: product.brand,
      name: product.name,
      price: product.price,
      mrp: product.mrp,
      color: color.name,
      colorSwatch: color.swatch,
      size: selectedSize,
      quantity: 1,
      image: product.images[0],
    }
    addItem(cartItem)
    openCart()
    onClose()
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.picker} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <span className={styles.title}>Select Size</span>
          <button onClick={onClose} className={styles.closeBtn} aria-label="Close size picker">
            <X size={16} />
          </button>
        </div>
        <div className={styles.sizes}>
          {product.sizes.map(({ size, inStock }) => (
            <button
              key={size}
              className={`${styles.sizeBtn} ${selectedSize === size ? styles.selected : ''} ${!inStock ? styles.oos : ''}`}
              onClick={() => inStock && setSelectedSize(size)}
              disabled={!inStock}
              aria-disabled={!inStock}
            >
              {size}
            </button>
          ))}
        </div>
        <button
          className={styles.addBtn}
          onClick={handleAddToBag}
          disabled={!selectedSize}
        >
          ADD TO BAG
        </button>
      </div>
    </div>
  )
}
```

---

## 8. Mock Product Data — Structure

```typescript
// src/lib/products.ts (structure)
import type { Product } from '@/types'

export const products: Product[] = [
  {
    id: 'nike-training-tee-001',
    slug: 'nike-slim-fit-training-tee',
    brand: 'Nike',
    name: 'Dri-FIT Training Tee',
    category: 'tshirts',
    mrp: 2499,
    price: 1499,           // 40% off
    images: ['/products/nike-tee-1.jpg', '/products/nike-tee-2.jpg', '/products/nike-tee-3.jpg'],
    colors: [
      { name: 'Black',     swatch: '#1a1a1a', inStock: true,  sku: 'NTT-BLK' },
      { name: 'Navy Blue', swatch: '#1a2a5e', inStock: true,  sku: 'NTT-NAV' },
      { name: 'White',     swatch: '#f5f5f5', inStock: false, sku: 'NTT-WHT' },
    ],
    sizes: [
      { size: 'S',   inStock: true  },
      { size: 'M',   inStock: true  },
      { size: 'L',   inStock: false },
      { size: 'XL',  inStock: true  },
      { size: 'XXL', inStock: true  },
    ],
    isNew: false,
    isTrending: true,
    featured: true,
  },
  // 11 more products:
  // Nike, Adidas, H&M, Levi's, Roadster, Biba, W, AJIO own-label
  // Mix of: tshirts, jeans, dresses, kurtas, trousers, activewear
  // Discounts: 30% to 70% off on most products
  // At least 2 products with price === mrp (no discount) to test conditional rendering
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured)
}

export function getTrendingProducts(): Product[] {
  return products.filter((p) => p.isTrending)
}

export function getNewProducts(): Product[] {
  return products.filter((p) => p.isNew)
}

export function getProductsByBrand(brand: string): Product[] {
  return products.filter((p) => p.brand.toLowerCase() === brand.toLowerCase())
}
```

---

## 9. PLP Discount Range Filter

The discount filter is the key differentiator from pfecomm_01 and pfecomm_02's filter panels.

```typescript
// src/app/products/page.tsx (filter logic)
const searchParams     = useSearchParams()
const activeBrands     = searchParams.getAll('brand')
const activeCategories = searchParams.getAll('category')
const activeSizes      = searchParams.getAll('size')
const minDiscount      = Number(searchParams.get('minDiscount') ?? '0')

const filtered = products.filter((p) => {
  if (activeBrands.length     && !activeBrands.includes(p.brand))        return false
  if (activeCategories.length && !activeCategories.includes(p.category)) return false
  if (minDiscount > 0) {
    const pct = getDiscountPercent(p.mrp, p.price)
    if (pct < minDiscount) return false
  }
  if (activeSizes.length) {
    const hasSize = p.sizes.some((s) => s.inStock && activeSizes.includes(s.size))
    if (!hasSize) return false
  }
  return true
})

// Discount filter options in FilterPanel:
// [ ] 30% off and more  → minDiscount=30
// [ ] 40% off and more  → minDiscount=40
// [ ] 50% off and more  → minDiscount=50
// [ ] 60% off and more  → minDiscount=60
// [ ] 70% off and more  → minDiscount=70
```

---

## 10. Build Configuration

```typescript
// next.config.ts
import type { NextConfig } from 'next'
const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
}
export default nextConfig
```

```json
{
  "dependencies": {
    "next": "14.x",
    "react": "18.x",
    "react-dom": "18.x",
    "zustand": "^4.5.0",
    "framer-motion": "^11.0.0",
    "@radix-ui/react-accordion": "^1.2.0",
    "lucide-react": "^0.400.0"
  }
}
```
