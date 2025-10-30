import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import type { CartItem, Product } from '@/types/schema';
import { mockProducts } from '@/data/productsMockData';
import { api } from '@/services/api';


interface CartContextType {
  items: CartItem[];
  itemCount: number;
  total: number;
  addToCart: (productId: string, quantity?: number) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  getCartItemsWithProducts: () => Array<{ product: Product; quantity: number }>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOnline, setIsOnline] = useState(true);

  // Sync with backend cart on mount
  useEffect(() => {
    const syncCart = async () => {
      try {
        const cartData = await api.cart.get();
        // Backend cart structure might be different, adapt as needed
        if (Array.isArray(cartData)) {
          setItems(cartData);
        }
        setIsOnline(true);
      } catch (error) {
        console.warn('Failed to sync cart with backend, using local storage:', error);
        setIsOnline(false);
        // Load from localStorage as fallback
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          try {
            setItems(JSON.parse(savedCart));
          } catch (e) {
            console.warn('Failed to parse saved cart');
          }
        }
      }
    };

    syncCart();
  }, []);

  // Save to localStorage when items change (offline fallback)
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = useCallback(async (productId: string, quantity: number = 1) => {
    // Optimistic update
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.productId === productId);
      
      if (existingItem) {
        return prevItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      
      return [...prevItems, { productId, quantity }];
    });

    // Try to sync with backend
    if (isOnline) {
      try {
        await api.cart.add(productId, quantity);
      } catch (error) {
        console.warn('Failed to sync cart addition with backend:', error);
        setIsOnline(false);
      }
    }
  }, [isOnline]);

  const updateCartItemQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    );
  }, []);

  const removeFromCart = useCallback(async (productId: string) => {
    // Optimistic update
    setItems((prevItems) => prevItems.filter((item) => item.productId !== productId));

    // Try to sync with backend
    if (isOnline) {
      try {
        await api.cart.remove(productId);
      } catch (error) {
        console.warn('Failed to sync cart removal with backend:', error);
        setIsOnline(false);
      }
    }
  }, [isOnline]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const getCartItemsWithProducts = useCallback(() => {
    return items.map((item) => {
      const product = mockProducts.find((p) => p.id === item.productId);
      return {
        product: product!,
        quantity: item.quantity,
      };
    });
  }, [items]);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const total = items.reduce((sum, item) => {
    const product = mockProducts.find((p) => p.id === item.productId);
    return sum + (product?.price || 0) * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        total,
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        clearCart,
        getCartItemsWithProducts,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}