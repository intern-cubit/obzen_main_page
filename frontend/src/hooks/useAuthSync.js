import { useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useCartWishlist } from '../contexts/CartWishlistContext';

/**
 * Hook to fetch cart and wishlist data when authentication status changes
 */
export const useAuthSync = () => {
  const { isAuthenticated, loading: authLoading } = useAuth();
  const { fetchUserData, isLoading } = useCartWishlist();
  const prevAuthStatus = useRef(isAuthenticated);
  const hasInitialized = useRef(false);

  useEffect(() => {
    // Only fetch when auth is loaded and user just logged in (changed from false to true)
    if (!authLoading && isAuthenticated && !isLoading) {
      // Check if this is actually a transition from unauthenticated to authenticated
      if (!hasInitialized.current || (!prevAuthStatus.current && isAuthenticated)) {
        console.log('Auth status changed to authenticated, fetching user data...');
        fetchUserData(isAuthenticated);
      }
      hasInitialized.current = true;
    }
    
    // Update previous auth status
    prevAuthStatus.current = isAuthenticated;
  }, [isAuthenticated, authLoading, fetchUserData, isLoading]);

  return {
    isAuthLoading: authLoading,
    isLoading,
    isAuthenticated
  };
};
