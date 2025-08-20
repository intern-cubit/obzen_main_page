import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';

const AuthContext = createContext();

const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: true,
  cart: [], // array of product ids for guest cart
  wishlist: [] // array of product ids for guest wishlist
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        isAuthenticated: true,
        loading: false
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    case 'STOP_LOADING':
      return {
        ...state,
        loading: false
      };

    case 'SET_CART':
      return {
        ...state,
        cart: action.payload
      };
    case 'SET_WISHLIST':
      return {
        ...state,
        wishlist: action.payload
      };
    default:
      return state;
  }
};


export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth, cart, and wishlist from localStorage
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const localCart = JSON.parse(localStorage.getItem('localCart') || '[]');
    const localWishlist = JSON.parse(localStorage.getItem('localWishlist') || '[]');

    dispatch({ type: 'SET_CART', payload: localCart.map(item => item.productId) });
    dispatch({ type: 'SET_WISHLIST', payload: localWishlist });

    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        dispatch({
          type: 'LOGIN_SUCCESS',
          payload: {
            user: parsedUser,
            token
          }
        });
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        dispatch({ type: 'STOP_LOADING' });
      }
    } else {
      dispatch({ type: 'STOP_LOADING' });
    }
  }, []);

  // Update cart in context and localStorage
  const setCart = useCallback((cartIds) => {
    dispatch({ type: 'SET_CART', payload: cartIds });
    // Also update localStorage for guest
    const localCart = JSON.parse(localStorage.getItem('localCart') || '[]');
    const updatedCart = cartIds.map(id => {
      const found = localCart.find(item => item.productId === id);
      return found || { productId: id, quantity: 1 };
    });
    localStorage.setItem('localCart', JSON.stringify(updatedCart));
  }, []);

  // Update wishlist in context and localStorage
  const setWishlist = useCallback((wishlistIds) => {
    dispatch({ type: 'SET_WISHLIST', payload: wishlistIds });
    localStorage.setItem('localWishlist', JSON.stringify(wishlistIds));
  }, []);

  const login = useCallback((userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    dispatch({
      type: 'LOGIN_SUCCESS',
      payload: {
        user: userData,
        token
      }
    });
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('refreshToken');
    dispatch({ type: 'LOGOUT' });
  }, []);

  const updateUser = useCallback((userData) => {
    localStorage.setItem('user', JSON.stringify(userData));
    dispatch({
      type: 'UPDATE_USER',
      payload: userData
    });
  }, []);

  const value = {
    ...state,
    login,
    logout,
    updateUser,
    setCart,
    setWishlist
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
