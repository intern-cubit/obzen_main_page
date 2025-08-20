import { userAPI } from './api';

// Authentication APIs
export const authAPI = {
  register: (userData) => userAPI.post('/users/register', userData),
  login: (credentials) => userAPI.post('/users/login', credentials),
  forgotPassword: (email) => userAPI.post('/users/forgot-password', { email }),
  resetPassword: (token, newPassword) => userAPI.post('/users/reset-password', { token, newPassword }),
  verifyEmail: (token) => userAPI.post('/users/verify-email', { token }),
  getProfile: () => userAPI.get('/users/profile'),
  updateProfile: (userData) => userAPI.put('/users/profile', userData),
  changePassword: (passwords) => userAPI.put('/users/change-password', passwords),
  refreshToken: (refreshToken) => userAPI.post('/users/refresh-token', { refreshToken })
};

// Address APIs
export const addressAPI = {
  addAddress: (addressData) => userAPI.post('/users/addresses', addressData),
  updateAddress: (addressId, addressData) => userAPI.put(`/users/addresses/${addressId}`, addressData),
  deleteAddress: (addressId) => userAPI.delete(`/users/addresses/${addressId}`)
};

// Product APIs
export const productAPI = {
  getProducts: (params = {}) => userAPI.get('/ecommerce/products', { params }),
  getProduct: (id) => userAPI.get(`/ecommerce/products/${id}`),
  getProductById: (id) => userAPI.get(`/ecommerce/products/${id}`),
  getCategories: () => userAPI.get('/ecommerce/products/categories'),
  getFeaturedProducts: (limit = 8) => userAPI.get('/ecommerce/products/featured', { params: { limit } }),
  searchProducts: (query, limit = 10) => userAPI.get('/ecommerce/products/search', { params: { q: query, limit } })
};

// Wishlist APIs
export const wishlistAPI = {
  addToWishlist: (productId) => userAPI.post(`/ecommerce/products/${productId}/wishlist`),
  removeFromWishlist: (productId) => userAPI.post(`/ecommerce/products/${productId}/wishlist`),
  getWishlist: () => userAPI.get('/ecommerce/products/user/wishlist')
};

// Cart APIs
export const cartAPI = {
  addToCart: (productId, data) => userAPI.post(`/ecommerce/products/${productId}/cart`, data),
  buyNow: (productId, data) => userAPI.post(`/ecommerce/products/${productId}/buy-now`, data),
  updateCartItem: (itemId, data) => userAPI.put(`/ecommerce/products/cart/${itemId}`, data),
  removeFromCart: (itemId) => userAPI.delete(`/ecommerce/products/cart/${itemId}`),
  getCart: () => userAPI.get('/ecommerce/products/user/cart'),
  clearCart: () => userAPI.delete('/ecommerce/products/user/cart')
};

// Order APIs
export const orderAPI = {
  createOrder: (orderData) => userAPI.post('/orders', orderData),
  verifyPayment: (paymentData) => userAPI.post('/orders/verify-payment', paymentData),
  getUserOrders: (params = {}) => userAPI.get('/orders', { params }),
  getOrder: (orderId) => userAPI.get(`/orders/${orderId}`),
  cancelOrder: (orderId, reason) => userAPI.put(`/orders/${orderId}/cancel`, { reason }),
  trackOrder: (orderId) => userAPI.get(`/orders/${orderId}/track`),
  requestReturn: (orderId, data) => userAPI.post(`/orders/${orderId}/return`, data),
  getOrderSummary: () => userAPI.get('/orders/summary')
};

// Review APIs
export const reviewAPI = {
  addReview: (productId, reviewData) => userAPI.post(`/ecommerce/products/${productId}/reviews`, reviewData)
};
