// Simple test to check if API is working
import { productAPI } from '../services/ecommerceAPI';

export const testProductsAPI = async () => {
  try {
    console.log('Testing products API...');
    const response = await productAPI.getProducts();
    console.log('API Response:', response);
    console.log('Products count:', response.data?.data?.products?.length);
    console.log('First product:', response.data?.data?.products?.[0]);
    return response.data;
  } catch (error) {
    console.error('API Test Error:', error);
    return null;
  }
};

// Test directly if needed
// testProductsAPI();
