import { useState } from 'react';
import './App.css';
import Navbar from './sections/Navbar';
import HeroSection from './sections/HeroSection';
import Announcement from './sections/Announcement';
import AboutSection from './sections/AboutSection';
import FreshPearsSection from './sections/FreshPearsSection';
import ProcessedProductsSection from './sections/ProcessedProductsSection';
import AIRecommendationSection from './sections/AIRecommendationSection';
import TourismSection from './sections/TourismSection';
import PromotionsSection from './sections/PromotionsSection';
import NewsSection from './sections/NewsSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';
import CartDrawer from './components/CartDrawer';
import ScrollToTop from './components/ScrollToTop';

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface AddToCartProduct {
  id: number;
  name: string;
  image?: string;
  price: number;
}

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (product: AddToCartProduct) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          image: product.image || import.meta.env.BASE_URL + 'images/pear-product.jpg',
          price: product.price,
          quantity: 1,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, quantity } : item))
      );
    }
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen">
      <Navbar cartCount={cartCount} onCartClick={() => setIsCartOpen(true)} />
      <main>
        <HeroSection />
        <Announcement />
        <AboutSection />
        <FreshPearsSection onAddToCart={handleAddToCart} />
        <ProcessedProductsSection onAddToCart={handleAddToCart} />
        <AIRecommendationSection onAddToCart={handleAddToCart} />
        <TourismSection />
        <PromotionsSection />
        <NewsSection />
        <ContactSection />
      </main>
      <Footer />
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
      />
      <ScrollToTop />
    </div>
  );
}

export default App;