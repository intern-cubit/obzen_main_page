// Simple test script to debug cart API
import { cartAPI } from './services/ecommerceAPI.js';

// Test function
async function testCartAPI() {
  try {
    console.log('Testing cart API...');
    
    // First check if we have a token
    const token = localStorage.getItem('token');
    console.log('Token exists:', !!token);
    
    if (!token) {
      console.log('No token found - please login first');
      return;
    }
    
    // Test get cart first
    console.log('Testing getCart...');
    const cartResponse = await cartAPI.getCart();
    console.log('Cart response:', cartResponse.data);
    
    // Test add to cart with a sample product
    console.log('Testing addToCart...');
    const addResponse = await cartAPI.addToCart('sample-product-id', { quantity: 1 });
    console.log('Add to cart response:', addResponse.data);
    
  } catch (error) {
    console.error('Cart API test failed:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        headers: error.config?.headers
      }
    });
  }
}

// Export for console testing
window.testCartAPI = testCartAPI;

console.log('Cart API test loaded. Run testCartAPI() in console after logging in.');
