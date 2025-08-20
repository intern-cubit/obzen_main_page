import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const GuestCartWishlistContext = createContext();

export const GuestCartWishlistProvider = ({ children }) => {
  // Initialize from localStorage
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('localCart'))?.map(item => item.productId) || [];
    } catch {
      return [];
    }
  });
  const [wishlist, setWishlist] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('localWishlist')) || [];
    } catch {
      return [];
    }
  });

  // Sync cart to localStorage
  useEffect(() => {
    const localCart = cart.map(productId => ({ productId, quantity: 1, addedAt: Date.now() }));
    localStorage.setItem('localCart', JSON.stringify(localCart));
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    localStorage.setItem('localWishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Add/remove functions
  const addToCart = useCallback((productId) => {
    setCart(prev => prev.includes(productId) ? prev : [...prev, productId]);
  }, []);
  const removeFromCart = useCallback((productId) => {
    setCart(prev => prev.filter(id => id !== productId));
  }, []);
  const addToWishlist = useCallback((productId) => {
    setWishlist(prev => prev.includes(productId) ? prev : [...prev, productId]);
  }, []);
  const removeFromWishlist = useCallback((productId) => {
    setWishlist(prev => prev.filter(id => id !== productId));
  }, []);

  return (
    <GuestCartWishlistContext.Provider value={{ cart, wishlist, addToCart, removeFromCart, addToWishlist, removeFromWishlist }}>
      {children}
    </GuestCartWishlistContext.Provider>
  );
};

export const useGuestCartWishlist = () => useContext(GuestCartWishlistContext);
