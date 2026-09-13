import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { StoreProvider, useStore } from './store/StoreContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import QuickView from './components/QuickView'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Success from './pages/Success'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function QuickViewHost() {
  const { quick, setQuick } = useStore()
  return <AnimatePresence>{quick && <QuickView product={quick} onClose={() => setQuick(null)} />}</AnimatePresence>
}

export default function App() {
  return (
    <StoreProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <div className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/success" element={<Success />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </div>
          <Footer />
        </div>
        <QuickViewHost />
      </BrowserRouter>
    </StoreProvider>
  )
}
