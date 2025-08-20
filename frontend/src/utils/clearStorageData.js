// Utility to clear all app-related localStorage data
// Run this in browser console if you're experiencing issues with cached product IDs

export const clearAllAppData = () => {
  console.log('Clearing all app localStorage data...');
  
  // Clear authentication data
  localStorage.removeItem('token');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('user');
  localStorage.removeItem('adminToken');
  
  // Clear cart and wishlist data
  localStorage.removeItem('localCart');
  localStorage.removeItem('localWishlist');
  
  // Clear any other app-specific data
  const allKeys = Object.keys(localStorage);
  allKeys.forEach(key => {
    if (key.startsWith('cubit-') || key.startsWith('cart-') || key.startsWith('wishlist-')) {
      localStorage.removeItem(key);
    }
  });
  
  console.log('All app data cleared from localStorage');
  
  // Reload the page to reset all contexts
  window.location.reload();
};

// Function to validate and clean existing cart data
export const validateCartData = () => {
  try {
    const localCart = JSON.parse(localStorage.getItem('localCart') || '[]');
    const localWishlist = JSON.parse(localStorage.getItem('localWishlist') || '[]');
    
    console.log('Current localStorage cart:', localCart);
    console.log('Current localStorage wishlist:', localWishlist);
    
    // Check for invalid product IDs (you can customize this validation)
    const validatedCart = localCart.filter(item => {
      const productId = item.productId || item._id;
      if (!productId || productId.length !== 24) {
        console.warn('Removing invalid cart item:', item);
        return false;
      }
      return true;
    });
    
    const validatedWishlist = localWishlist.filter(id => {
      if (!id || id.length !== 24) {
        console.warn('Removing invalid wishlist item:', id);
        return false;
      }
      return true;
    });
    
    // Update localStorage with validated data
    localStorage.setItem('localCart', JSON.stringify(validatedCart));
    localStorage.setItem('localWishlist', JSON.stringify(validatedWishlist));
    
    console.log('Cart and wishlist data validated and cleaned');
    
    return {
      originalCart: localCart,
      originalWishlist: localWishlist,
      validatedCart,
      validatedWishlist,
      removedItems: localCart.length - validatedCart.length + localWishlist.length - validatedWishlist.length
    };
  } catch (error) {
    console.error('Error validating cart data:', error);
    return null;
  }
};

// Run this in browser console to debug localStorage issues
window.clearAllAppData = clearAllAppData;
window.validateCartData = validateCartData;

console.log('Storage utilities loaded. Run clearAllAppData() or validateCartData() in console if needed.');
