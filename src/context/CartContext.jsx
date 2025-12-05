'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch cart on mount
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await fetch('/api/cart');
      const data = await res.json();
      setCart(data);
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      const res = await fetch('/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, quantity }),
      });
      
      if (res.ok) {
        await fetchCart();
        return true;
      }
      console.error('Add to cart failed:', res.status, await res.text());
      return false;
    } catch (error) {
      console.error('Failed to add to cart:', error);
      return false;
    }
  };

  const updateQuantity = async (itemId, quantity) => {
    try {
      const res = await fetch('/api/cart', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId, quantity }),
      });
      
      if (res.ok) {
        await fetchCart();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to update cart:', error);
      return false;
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const res = await fetch(`/api/cart?id=${itemId}`, {
        method: 'DELETE',
      });
      
      if (res.ok) {
        await fetchCart();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Failed to remove from cart:', error);
      return false;
    }
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        loading,
        addToCart,
        updateQuantity,
        removeFromCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
