import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/sonner';
import { CartProvider } from '@/context/CartContext';
import { Header } from '@/components/Header';
import { AnimatedBackground } from '@/components/AnimatedBackground';
import { BrandShowcase } from '@/components/BrandShowcase';
import { LandingPage } from '@/pages/LandingPage';
import { ProductsGrid } from '@/pages/ProductsGrid';
import { CartPage } from '@/pages/CartPage';
import { CheckoutForm } from '@/pages/CheckoutForm';

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <div className="min-h-screen flex flex-col relative">
          <AnimatedBackground />
          <Header />
          <main className="flex-1 relative z-10">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/brand" element={<BrandShowcase />} />
              <Route path="/products" element={<ProductsGrid />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutForm />} />
              <Route path="*" element={<LandingPage />} />
            </Routes>
          </main>
          <Toaster />
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;