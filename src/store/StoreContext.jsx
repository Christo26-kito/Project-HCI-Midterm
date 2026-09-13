import { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react'
import { dict } from '../i18n/dict'
import { PRODUCTS } from '../data/products'
import { setSoundEnabled } from '../lib/sound'

const StoreContext = createContext(null)

const read = (key, fallback) => {
  try {
    const v = localStorage.getItem(key)
    return v === null ? fallback : JSON.parse(v)
  } catch {
    return fallback
  }
}

export function StoreProvider({ children }) {
  const [lang, setLang] = useState(() => read('sa-lang', 'id'))
  const [theme, setTheme] = useState(() => read('sa-theme', 'light'))
  const [soundOn, setSoundOn] = useState(() => read('sa-sound', true))
  const [query, setQuery] = useState('')
  const [quick, setQuick] = useState(null)
  const [cart, setCart] = useState(() =>
    read('sa-cart', []).filter((i) => PRODUCTS.some((p) => p.id === i.id && p.sizes.includes(i.size))),
  )
  const [promo, setPromo] = useState(null)
  const [cartBump, setCartBump] = useState(0)
  const [lastOrder, setLastOrder] = useState(null)

  useEffect(() => {
    localStorage.setItem('sa-lang', JSON.stringify(lang))
    document.documentElement.lang = lang
  }, [lang])

  useEffect(() => {
    localStorage.setItem('sa-theme', JSON.stringify(theme))
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  useEffect(() => {
    localStorage.setItem('sa-sound', JSON.stringify(soundOn))
    setSoundEnabled(soundOn)
  }, [soundOn])

  useEffect(() => {
    localStorage.setItem('sa-cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    if (cart.length === 0 && promo) setPromo(null)
  }, [cart.length, promo])

  const t = useCallback((key) => dict[lang][key] ?? key, [lang])

  const addToCart = useCallback((productId, size, qty = 1) => {
    setCart((prev) => {
      const idx = prev.findIndex((i) => i.id === productId && i.size === size)
      if (idx >= 0) {
        const next = [...prev]
        next[idx] = { ...next[idx], qty: next[idx].qty + qty }
        return next
      }
      return [...prev, { id: productId, size, qty }]
    })
    setCartBump((n) => n + 1)
  }, [])

  const setQty = useCallback((productId, size, qty) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((i) => !(i.id === productId && i.size === size))
        : prev.map((i) => (i.id === productId && i.size === size ? { ...i, qty } : i)),
    )
  }, [])

  const removeItem = useCallback((productId, size) => {
    setCart((prev) => prev.filter((i) => !(i.id === productId && i.size === size)))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const cartCount = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart])

  const cartDetailed = useMemo(
    () =>
      cart
        .map((i) => {
          const product = PRODUCTS.find((p) => p.id === i.id)
          return product ? { ...i, product } : null
        })
        .filter(Boolean),
    [cart],
  )

  const subtotal = useMemo(
    () => cartDetailed.reduce((s, i) => s + i.product.price * i.qty, 0),
    [cartDetailed],
  )
  const discount = useMemo(() => (promo ? Math.round(subtotal * promo.rate) : 0), [promo, subtotal])
  const shipping = useMemo(
    () => (cartDetailed.length === 0 || subtotal - discount >= 2000000 ? 0 : 25000),
    [cartDetailed.length, subtotal, discount],
  )
  const total = subtotal - discount + shipping

  const value = useMemo(
    () => ({
      lang,
      setLang,
      theme,
      toggleTheme: () => setTheme((v) => (v === 'dark' ? 'light' : 'dark')),
      soundOn,
      setSoundOn,
      query,
      setQuery,
      quick,
      setQuick,
      cart,
      cartDetailed,
      cartCount,
      cartBump,
      addToCart,
      setQty,
      removeItem,
      clearCart,
      promo,
      setPromo,
      subtotal,
      discount,
      shipping,
      total,
      lastOrder,
      setLastOrder,
      t,
    }),
    [
      lang,
      theme,
      soundOn,
      query,
      quick,
      cart,
      cartDetailed,
      cartCount,
      cartBump,
      addToCart,
      setQty,
      removeItem,
      clearCart,
      promo,
      subtotal,
      discount,
      shipping,
      total,
      lastOrder,
      t,
    ],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside StoreProvider')
  return ctx
}
