import { useState, useEffect } from 'react';

// Hook for managing cart items in localStorage
export const useLocalCart = () => {
  const [localCart, setLocalCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('localCart');
    if (savedCart) {
      try {
        setLocalCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse local cart:', error);
        setLocalCart([]);
      }
    }
  }, []);

    const addToLocalCart = (productId, quantity = 1) => {
      const existingItem = localCart.find(item => item.productId === productId);
      let newCart;
      if (existingItem) {
        newCart = localCart.map(item =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        newCart = [...localCart, { 
          productId, 
          quantity, 
          addedAt: Date.now()
        }];
      }
      setLocalCart(newCart);
      localStorage.setItem('localCart', JSON.stringify(newCart));
      return newCart;
    };

  const removeFromLocalCart = (productId) => {
    const newCart = localCart.filter(item => item.productId !== productId);
    setLocalCart(newCart);
    localStorage.setItem('localCart', JSON.stringify(newCart));
    return newCart;
  };

  const updateLocalCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      return removeFromLocalCart(productId);
    }
    
    const newCart = localCart.map(item =>
      item.productId === productId
        ? { ...item, quantity }
        : item
    );
    
    setLocalCart(newCart);
    localStorage.setItem('localCart', JSON.stringify(newCart));
    return newCart;
  };

  const clearLocalCart = () => {
    setLocalCart([]);
    localStorage.removeItem('localCart');
  };

  const isInLocalCart = (productId) => {
    return localCart.some(item => item.productId === productId);
  };

  const getLocalCartCount = () => {
    return localCart.reduce((total, item) => total + item.quantity, 0);
  };

  const getLocalCartTotal = () => {
    return localCart.reduce((total, item) => {
      // For local cart, we need to fetch product prices
      // This is a simplified version - in real app you'd fetch product details
      return total + (item.quantity * (item.price || 0));
    }, 0);
  };

  return {
    localCart,
    addToLocalCart,
    removeFromLocalCart,
    updateLocalCartQuantity,
    clearLocalCart,
    isInLocalCart,
    getLocalCartCount,
    getLocalCartTotal
  };
};

// Hook for managing wishlist items in localStorage
export const useLocalWishlist = () => {
  const [localWishlist, setLocalWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist = localStorage.getItem('localWishlist');
    if (savedWishlist) {
      try {
        setLocalWishlist(JSON.parse(savedWishlist));
      } catch (error) {
        console.error('Failed to parse local wishlist:', error);
        setLocalWishlist([]);
      }
    }
  }, []);

  const addToLocalWishlist = (productId) => {
    if (!localWishlist.includes(productId)) {
      const newWishlist = [...localWishlist, productId];
      setLocalWishlist(newWishlist);
      localStorage.setItem('localWishlist', JSON.stringify(newWishlist));
      return newWishlist;
    }
    return localWishlist;
  };

  const removeFromLocalWishlist = (productId) => {
    const newWishlist = localWishlist.filter(id => id !== productId);
    setLocalWishlist(newWishlist);
    localStorage.setItem('localWishlist', JSON.stringify(newWishlist));
    return newWishlist;
  };

  const toggleLocalWishlist = (productId) => {
    if (localWishlist.includes(productId)) {
      return removeFromLocalWishlist(productId);
    } else {
      return addToLocalWishlist(productId);
    }
  };

  const clearLocalWishlist = () => {
    setLocalWishlist([]);
    localStorage.removeItem('localWishlist');
  };

  const isInLocalWishlist = (productId) => {
    return localWishlist.includes(productId);
  };

  return {
    localWishlist,
    addToLocalWishlist,
    removeFromLocalWishlist,
    toggleLocalWishlist,
    clearLocalWishlist,
    isInLocalWishlist
  };
};
