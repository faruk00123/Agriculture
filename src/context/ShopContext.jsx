import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { products, getProduct } from '../data/products'
import { demoRules } from '../config/brand'

const ShopContext = createContext(null)

/* Only product ids + quantities are ever persisted. Never customer data. */
const CART_KEY = 'kp_cart_v1'
const WISHLIST_KEY = 'kp_wishlist_v1'

const read = (key, fallback) => {
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : fallback
  } catch {
    return fallback
  }
}

const write = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* storage unavailable (private mode) — cart still works in memory */
  }
}

const sanitizeCart = (raw) =>
  (Array.isArray(raw) ? raw : [])
    .filter((line) => line && typeof line.id === 'string' && getProduct(line.id))
    .map((line) => ({
      id: line.id,
      qty: Math.min(99, Math.max(1, Math.floor(Number(line.qty) || 1))),
    }))

const sanitizeWishlist = (raw) =>
  (Array.isArray(raw) ? raw : []).filter((id) => typeof id === 'string' && getProduct(id))

export function ShopProvider({ children }) {
  const [lines, setLines] = useState(() => sanitizeCart(read(CART_KEY, [])))
  const [wishlist, setWishlist] = useState(() => sanitizeWishlist(read(WISHLIST_KEY, [])))

  useEffect(() => {
    write(
      CART_KEY,
      lines.map((l) => ({ id: l.id, qty: l.qty }))
    )
  }, [lines])

  useEffect(() => {
    write(WISHLIST_KEY, wishlist)
  }, [wishlist])

  const addItem = useCallback((id, qty = 1) => {
    if (!getProduct(id)) return
    setLines((prev) => {
      const found = prev.find((l) => l.id === id)
      if (found) {
        return prev.map((l) =>
          l.id === id ? { ...l, qty: Math.min(99, l.qty + Math.max(1, Math.floor(qty))) } : l
        )
      }
      return [...prev, { id, qty: Math.min(99, Math.max(1, Math.floor(qty) || 1)) }]
    })
  }, [])

  const setQty = useCallback((id, qty) => {
    const next = Math.min(99, Math.max(1, Math.floor(Number(qty) || 1)))
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, qty: next } : l)))
  }, [])

  const increase = useCallback(
    (id) => setLines((prev) => prev.map((l) => (l.id === id ? { ...l, qty: Math.min(99, l.qty + 1) } : l))),
    []
  )

  const decrease = useCallback(
    (id) =>
      setLines((prev) =>
        prev.flatMap((l) =>
          l.id === id ? (l.qty > 1 ? [{ ...l, qty: l.qty - 1 }] : []) : [l]
        )
      ),
    []
  )

  const removeItem = useCallback((id) => setLines((prev) => prev.filter((l) => l.id !== id)), [])
  const clearCart = useCallback(() => setLines([]), [])

  const toggleWishlist = useCallback(
    (id) =>
      setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])),
    []
  )

  const removeWishlist = useCallback(
    (id) => setWishlist((prev) => prev.filter((x) => x !== id)),
    []
  )

  const cartCount = useMemo(() => lines.reduce((sum, l) => sum + l.qty, 0), [lines])

  const detailedLines = useMemo(
    () =>
      lines
        .map((l) => {
          const product = products.find((p) => p.id === l.id)
          return product ? { ...l, product, lineTotal: product.price * l.qty } : null
        })
        .filter(Boolean),
    [lines]
  )

  const totals = useMemo(() => {
    const subtotal = detailedLines.reduce((sum, l) => sum + l.lineTotal, 0)
    const discount =
      subtotal >= demoRules.discount.minSubtotal
        ? Math.round((subtotal * demoRules.discount.percent) / 100)
        : 0
    const afterDiscount = subtotal - discount
    const delivery =
      subtotal === 0 || afterDiscount >= demoRules.freeDeliveryOver ? 0 : demoRules.deliveryFee
    const total = afterDiscount + delivery
    return { subtotal, discount, delivery, total, freeDeliveryOver: demoRules.freeDeliveryOver }
  }, [detailedLines])

  const value = useMemo(
    () => ({
      lines: detailedLines,
      rawLines: lines,
      cartCount,
      totals,
      addItem,
      setQty,
      increase,
      decrease,
      removeItem,
      clearCart,
      isInCart: (id) => lines.some((l) => l.id === id),
      /* wishlist */
      wishlist,
      wishlistCount: wishlist.length,
      wishlistProducts: wishlist.map((id) => getProduct(id)).filter(Boolean),
      toggleWishlist,
      removeWishlist,
      inWishlist: (id) => wishlist.includes(id),
    }),
    [
      detailedLines,
      lines,
      cartCount,
      totals,
      addItem,
      setQty,
      increase,
      decrease,
      removeItem,
      clearCart,
      wishlist,
      toggleWishlist,
      removeWishlist,
    ]
  )

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}

export function useShop() {
  const ctx = useContext(ShopContext)
  if (!ctx) throw new Error('useShop must be used inside <ShopProvider>')
  return ctx
}

export default ShopContext
