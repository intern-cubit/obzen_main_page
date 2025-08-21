import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { cartAPI, wishlistAPI, productAPI } from '../services/ecommerceAPI';

const CartWishlistContext = createContext();

const initialState = {
  cart: [],
  wishlist: [],
  isLoading: false,
  isAuthenticated: false,
  cartLoading: false,
  wishlistLoading: false
};

const cartWishlistReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    case 'SET_CART_LOADING':
      return {
        ...state,
        cartLoading: action.payload
      };
    case 'SET_WISHLIST_LOADING':
      return {
        ...state,
        wishlistLoading: action.payload
      };
    case 'SET_AUTH_STATUS':
      return {
        ...state,
        isAuthenticated: action.payload
      };
    case 'SET_CART':
      return {
        ...state,
        cart: action.payload,
        isLoading: false
      };
    case 'SET_WISHLIST':
      return {
        ...state,
        wishlist: action.payload,
        isLoading: false
      };
    case 'INIT_CART_WISHLIST':
      return {
        ...state,
        cart: action.payload.cart,
        wishlist: action.payload.wishlist,
        isLoading: false
      };
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.productId === action.payload.productId);
      let newCart;
      if (existingItem) {
        newCart = state.cart.map(item =>
          item.productId === action.payload.productId
            ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
            : item
        );
      } else {
        newCart = [...state.cart, {
          productId: action.payload.productId,
          quantity: action.payload.quantity || 1,
          addedAt: Date.now(),
          ...action.payload.productInfo
        }];
      }
      return {
        ...state,
        cart: newCart
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cart: state.cart.filter(item => item.productId !== action.payload)
      };
    case 'UPDATE_CART_QUANTITY':
      if (action.payload.quantity <= 0) {
        return {
          ...state,
          cart: state.cart.filter(item => item.productId !== action.payload.productId)
        };
      }
      return {
        ...state,
        cart: state.cart.map(item =>
          item.productId === action.payload.productId
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    case 'ADD_TO_WISHLIST':
      if (state.wishlist.includes(action.payload)) {
        return state;
      }
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload]
      };
    case 'REMOVE_FROM_WISHLIST':
      return {
        ...state,
        wishlist: state.wishlist.filter(id => id !== action.payload)
      };
    case 'TOGGLE_WISHLIST':
      const isInWishlist = state.wishlist.includes(action.payload);
      return {
        ...state,
        wishlist: isInWishlist
          ? state.wishlist.filter(id => id !== action.payload)
          : [...state.wishlist, action.payload]
      };
    case 'CLEAR_CART':
      return {
        ...state,
        cart: []
      };
    case 'CLEAR_WISHLIST':
      return {
        ...state,
        wishlist: []
      };
    default:
      return state;
  }
};

export const CartWishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartWishlistReducer, initialState);

  // Initialize from localStorage
  useEffect(() => {
    const initData = () => {
      try {
        const savedCart = JSON.parse(localStorage.getItem('localCart') || '[]');
        const savedWishlist = JSON.parse(localStorage.getItem('localWishlist') || '[]');
        
        // Validate and clean cart items - remove items with invalid product IDs
        const validCart = savedCart.filter(item => {
          const productId = item.productId || item._id;
          if (!productId || typeof productId !== 'string' || productId.length !== 24) {
            console.warn('Removing invalid cart item with productId:', productId);
            return false;
          }
          return true;
        });
        
        // Validate and clean wishlist items - remove invalid product IDs
        const validWishlist = savedWishlist.filter(id => {
          if (!id || typeof id !== 'string' || id.length !== 24) {
            console.warn('Removing invalid wishlist item with id:', id);
            return false;
          }
          return true;
        });
        
        // Update localStorage with cleaned data if items were removed
        if (validCart.length !== savedCart.length) {
          localStorage.setItem('localCart', JSON.stringify(validCart));
          console.log(`Cleaned cart: removed ${savedCart.length - validCart.length} invalid items`);
        }
        
        if (validWishlist.length !== savedWishlist.length) {
          localStorage.setItem('localWishlist', JSON.stringify(validWishlist));
          console.log(`Cleaned wishlist: removed ${savedWishlist.length - validWishlist.length} invalid items`);
        }
        
        dispatch({
          type: 'INIT_CART_WISHLIST',
          payload: {
            cart: validCart,
            wishlist: validWishlist
          }
        });
      } catch (error) {
        console.error('Error loading cart/wishlist from localStorage:', error);
        dispatch({
          type: 'INIT_CART_WISHLIST',
          payload: { cart: [], wishlist: [] }
        });
      }
    };

    initData();
  }, []);

  // Sync localStorage for non-authenticated users
  useEffect(() => {
    if (!state.isAuthenticated && !state.isLoading) {
      localStorage.setItem('localCart', JSON.stringify(state.cart));
    }
  }, [state.cart, state.isAuthenticated, state.isLoading]);

  useEffect(() => {
    if (!state.isAuthenticated && !state.isLoading) {
      localStorage.setItem('localWishlist', JSON.stringify(state.wishlist));
    }
  }, [state.wishlist, state.isAuthenticated, state.isLoading]);

  // Fetch data from database when user logs in
  const fetchUserData = useCallback(async (isAuthenticated) => {
    dispatch({ type: 'SET_AUTH_STATUS', payload: isAuthenticated });
    
    if (isAuthenticated) {
      console.log('User logged in, fetching data from database...');
      dispatch({ type: 'SET_LOADING', payload: true });
      
      try {
        // Fetch cart and wishlist from database
        const [cartResponse, wishlistResponse] = await Promise.all([
          cartAPI.getCart(),
          wishlistAPI.getWishlist()
        ]);

        if (cartResponse.data && cartResponse.data.success) {
          const cartData = cartResponse.data.data.cart || [];
          // Normalize cart data structure to match frontend expectations
          const normalizedCart = cartData.map(item => ({
            _id: item._id,
            productId: item.product._id,
            quantity: item.quantity,
            addedAt: item.addedAt,
            // Include product info for display
            title: item.product.title,
            price: item.product.price,
            backgroundImage: item.product.backgroundImage,
            image: item.product.image,
            subtitle: item.product.subtitle,
            product: item.product // Keep the full product object too
          }));
          // Overwrite localStorage with database data
          localStorage.setItem('localCart', JSON.stringify(normalizedCart));
          dispatch({ type: 'SET_CART', payload: normalizedCart });
        }

        if (wishlistResponse.data && wishlistResponse.data.success) {
          const wishlistData = wishlistResponse.data.data.wishlist || [];
          // Normalize wishlist data - extract product IDs if it's an array of objects
          const normalizedWishlist = wishlistData.map(item => {
            // If item is just a product ID string, return it
            if (typeof item === 'string') {
              return item;
            }
            // If item is an object with product info, extract the product ID
            if (item.product && item.product._id) {
              return item.product._id;
            }
            // If item has _id directly
            if (item._id) {
              return item._id;
            }
            return item;
          });
          // Overwrite localStorage with database data  
          localStorage.setItem('localWishlist', JSON.stringify(normalizedWishlist));
          dispatch({ type: 'SET_WISHLIST', payload: normalizedWishlist });
        }
        
        console.log('Data fetched and local storage updated successfully');
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        dispatch({ type: 'SET_LOADING', payload: false });
      }
    }
  }, []);

  // Cart functions
  const addToCart = useCallback(async (productId, quantity = 1, productInfo = {}) => {
    console.log('Adding to cart:', { productId, quantity, productInfo, isAuthenticated: state.isAuthenticated });
    dispatch({ type: 'SET_CART_LOADING', payload: true });
    
    if (state.isAuthenticated) {
      // For authenticated users, add to database and update state
      try {
        console.log('Calling cartAPI.addToCart...');
        const response = await cartAPI.addToCart(productId, { quantity });
        console.log('addToCart response:', response);
        
        if (response.data && response.data.success) {
          // Fetch updated cart from database
          console.log('Fetching updated cart...');
          const cartResponse = await cartAPI.getCart();
          console.log('getCart response:', cartResponse);
          
          if (cartResponse.data && cartResponse.data.success) {
            const cartData = cartResponse.data.data.cart || [];
            // Normalize cart data structure to match frontend expectations
            const normalizedCart = cartData.map(item => ({
              _id: item._id,
              productId: item.product._id,
              quantity: item.quantity,
              addedAt: item.addedAt,
              // Include product info for display
              title: item.product.title,
              price: item.product.price,
              backgroundImage: item.product.backgroundImage,
              image: item.product.image,
              subtitle: item.product.subtitle,
              product: item.product // Keep the full product object too
            }));
            // Update local storage and state
            localStorage.setItem('localCart', JSON.stringify(normalizedCart));
            dispatch({ type: 'SET_CART', payload: normalizedCart });
            console.log('Cart updated successfully:', normalizedCart);
          }
        }
      } catch (error) {
        console.error('Failed to add to cart:', error);
      } finally {
        dispatch({ type: 'SET_CART_LOADING', payload: false });
      }
    } else {
      // For non-authenticated users, update local state
      console.log('Adding to local cart for guest user');
      dispatch({
        type: 'ADD_TO_CART',
        payload: { productId, quantity, productInfo }
      });
      dispatch({ type: 'SET_CART_LOADING', payload: false });
    }
  }, [state.isAuthenticated]);

  const removeFromCart = useCallback(async (productId) => {
    if (state.isAuthenticated) {
      try {
        const response = await cartAPI.removeFromCartByProduct(productId);
        if (response.data && response.data.success) {
          // Fetch updated cart from database
          const cartResponse = await cartAPI.getCart();
          if (cartResponse.data && cartResponse.data.success) {
            const cartData = cartResponse.data.data.cart || [];
            // Normalize cart data structure
            const normalizedCart = cartData.map(item => ({
              _id: item._id,
              productId: item.product._id,
              quantity: item.quantity,
              addedAt: item.addedAt,
              title: item.product.title,
              price: item.product.price,
              backgroundImage: item.product.backgroundImage,
              image: item.product.image,
              subtitle: item.product.subtitle,
              product: item.product
            }));
            // Update local storage and state
            localStorage.setItem('localCart', JSON.stringify(normalizedCart));
            dispatch({ type: 'SET_CART', payload: normalizedCart });
          }
        }
      } catch (error) {
        console.error('Failed to remove from cart:', error);
      }
    } else {
      dispatch({
        type: 'REMOVE_FROM_CART',
        payload: productId
      });
    }
  }, [state.isAuthenticated]);

  const updateCartQuantity = useCallback(async (productId, quantity) => {
    if (state.isAuthenticated) {
      try {
        const response = await cartAPI.updateCartQuantityByProduct(productId, { quantity });
        if (response.data && response.data.success) {
          // Fetch updated cart from database
          const cartResponse = await cartAPI.getCart();
          if (cartResponse.data && cartResponse.data.success) {
            const cartData = cartResponse.data.data.cart || [];
            // Normalize cart data structure
            const normalizedCart = cartData.map(item => ({
              _id: item._id,
              productId: item.product._id,
              quantity: item.quantity,
              addedAt: item.addedAt,
              title: item.product.title,
              price: item.product.price,
              backgroundImage: item.product.backgroundImage,
              image: item.product.image,
              subtitle: item.product.subtitle,
              product: item.product
            }));
            // Update local storage and state
            localStorage.setItem('localCart', JSON.stringify(normalizedCart));
            dispatch({ type: 'SET_CART', payload: normalizedCart });
          }
        }
      } catch (error) {
        console.error('Failed to update cart quantity:', error);
      }
    } else {
      dispatch({
        type: 'UPDATE_CART_QUANTITY',
        payload: { productId, quantity }
      });
    }
  }, [state.isAuthenticated]);

  const clearCart = useCallback(async () => {
    if (state.isAuthenticated) {
      try {
        const response = await cartAPI.clearCart();
        if (response.data && response.data.success) {
          // Update local storage and state
          localStorage.setItem('localCart', JSON.stringify([]));
          dispatch({ type: 'CLEAR_CART' });
        }
      } catch (error) {
        console.error('Failed to clear cart:', error);
      }
    } else {
      dispatch({ type: 'CLEAR_CART' });
    }
  }, [state.isAuthenticated]);

  // Wishlist functions
  const addToWishlist = useCallback(async (productId) => {
    dispatch({ type: 'SET_WISHLIST_LOADING', payload: true });
    
    if (state.isAuthenticated) {
      try {
        const response = await wishlistAPI.addToWishlist(productId);
        console.log('addToWishlist response:', response);
        if (response.data && response.data.success) {
          // Fetch updated wishlist from database
          const wishlistResponse = await wishlistAPI.getWishlist();
          console.log('getWishlist response:', wishlistResponse);
          if (wishlistResponse.data && wishlistResponse.data.success) {
            const wishlistData = wishlistResponse.data.data.wishlist || [];
            // Normalize wishlist data - extract product IDs
            const normalizedWishlist = wishlistData.map(item => {
              // If item is just a product ID string, return it
              if (typeof item === 'string') {
                return item;
              }
              // If item is an object with product info, extract the product ID
              if (item.product && item.product._id) {
                return item.product._id;
              }
              // If item has _id directly
              if (item._id) {
                return item._id;
              }
              return item;
            });
            // Update local storage and state
            localStorage.setItem('localWishlist', JSON.stringify(normalizedWishlist));
            dispatch({ type: 'SET_WISHLIST', payload: normalizedWishlist });
            console.log('Wishlist updated successfully:', normalizedWishlist);
          }
        }
      } catch (error) {
        console.error('Failed to add to wishlist:', error);
      } finally {
        dispatch({ type: 'SET_WISHLIST_LOADING', payload: false });
      }
    } else {
      dispatch({
        type: 'ADD_TO_WISHLIST',
        payload: productId
      });
      dispatch({ type: 'SET_WISHLIST_LOADING', payload: false });
    }
  }, [state.isAuthenticated]);

  const removeFromWishlist = useCallback(async (productId) => {
    if (state.isAuthenticated) {
      try {
        const response = await wishlistAPI.removeFromWishlist(productId);
        console.log('removeFromWishlist response:', response);
        if (response.data && response.data.success) {
          // Fetch updated wishlist from database
          const wishlistResponse = await wishlistAPI.getWishlist();
          console.log('getWishlist response:', wishlistResponse);
          if (wishlistResponse.data && wishlistResponse.data.success) {
            const wishlistData = wishlistResponse.data.data.wishlist || [];
            // Normalize wishlist data - extract product IDs
            const normalizedWishlist = wishlistData.map(item => {
              // If item is just a product ID string, return it
              if (typeof item === 'string') {
                return item;
              }
              // If item is an object with product info, extract the product ID
              if (item.product && item.product._id) {
                return item.product._id;
              }
              // If item has _id directly
              if (item._id) {
                return item._id;
              }
              return item;
            });
            // Update local storage and state
            localStorage.setItem('localWishlist', JSON.stringify(normalizedWishlist));
            dispatch({ type: 'SET_WISHLIST', payload: normalizedWishlist });
            console.log('Wishlist updated successfully:', normalizedWishlist);
          }
        }
      } catch (error) {
        console.error('Failed to remove from wishlist:', error);
      }
    } else {
      dispatch({
        type: 'REMOVE_FROM_WISHLIST',
        payload: productId
      });
    }
  }, [state.isAuthenticated]);

  const toggleWishlist = useCallback(async (productId) => {
    const isInWishlistNow = state.wishlist.includes(productId);
    if (isInWishlistNow) {
      await removeFromWishlist(productId);
    } else {
      await addToWishlist(productId);
    }
  }, [state.wishlist, addToWishlist, removeFromWishlist]);

  const clearWishlist = useCallback(async () => {
    if (state.isAuthenticated) {
      try {
        // Clear all items from backend wishlist one by one
        const currentWishlistItems = state.wishlist;
        await Promise.all(
          currentWishlistItems.map(productId => 
            wishlistAPI.removeFromWishlist(productId)
          )
        );
        
        // Update local storage and state
        localStorage.setItem('localWishlist', JSON.stringify([]));
        dispatch({ type: 'CLEAR_WISHLIST' });
      } catch (error) {
        console.error('Failed to clear wishlist:', error);
      }
    } else {
      dispatch({ type: 'CLEAR_WISHLIST' });
    }
  }, [state.isAuthenticated, state.wishlist]);

  // Helper functions
  const isInCart = useCallback((productId) => {
    return state.cart.some(item => item.productId === productId);
  }, [state.cart]);

  const isInWishlist = useCallback((productId) => {
    return state.wishlist.includes(productId);
  }, [state.wishlist]);

  const getCartCount = useCallback(() => {
    return state.cart.reduce((total, item) => total + item.quantity, 0);
  }, [state.cart]);

  const getCartTotal = useCallback(() => {
    return state.cart.reduce((total, item) => {
      const price = item.price || 0;
      return total + (item.quantity * price);
    }, 0);
  }, [state.cart]);

  const getCartItem = useCallback((productId) => {
    return state.cart.find(item => item.productId === productId);
  }, [state.cart]);

  const value = {
    // State
    cart: state.cart,
    wishlist: state.wishlist,
    isLoading: state.isLoading,
    cartLoading: state.cartLoading,
    wishlistLoading: state.wishlistLoading,
    isAuthenticated: state.isAuthenticated,
    
    // Cart functions
    addToCart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    
    // Wishlist functions
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    clearWishlist,
    
    // Helper functions
    isInCart,
    isInWishlist,
    getCartCount,
    getCartTotal,
    getCartItem,
    
    // Fetch function
    fetchUserData
  };

  return (
    <CartWishlistContext.Provider value={value}>
      {children}
    </CartWishlistContext.Provider>
  );
};

export const useCartWishlist = () => {
  const context = useContext(CartWishlistContext);
  if (!context) {
    throw new Error('useCartWishlist must be used within a CartWishlistProvider');
  }
  return context;
};
