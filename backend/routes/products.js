import express from 'express';
import {
  getProducts,
  getProductsAdmin,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
  getFeaturedProducts,
  searchProducts,
  addToWishlist,
  getWishlist,
  addToCart,
  updateCartItem,
  removeFromCartByProduct,
  updateCartQuantityByProduct,
  getCart,
  clearCart,
  addReview,
  buyNow
} from '../controllers/productController.js';
import { protect, optionalAuth } from '../middleware/auth.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Admin routes (must be first and most specific)
router.get('/admin', authMiddleware, getProductsAdmin);
router.post('/', authMiddleware, createProduct);
router.put('/:id', authMiddleware, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct);

// Public routes
router.get('/', optionalAuth, getProducts);
router.get('/categories', getCategories);
router.get('/featured', getFeaturedProducts);
router.get('/search', searchProducts);

// Protected routes with specific paths (must be before /:id route)
// Wishlist routes
router.post('/:productId/wishlist', protect, addToWishlist);
router.get('/user/wishlist', protect, getWishlist);

// Cart routes
router.post('/:productId/cart', protect, addToCart);
router.post('/:productId/buy-now', protect, buyNow);
router.put('/cart/:itemId', protect, updateCartItem);
router.delete('/cart/product/:productId', protect, removeFromCartByProduct);
router.put('/cart/product/:productId', protect, updateCartQuantityByProduct);
router.get('/user/cart', protect, getCart);
router.delete('/user/cart', protect, clearCart);

// Review routes
router.post('/:productId/reviews', protect, addReview);

// Note: /:id route must be LAST among all routes since it's a catch-all
router.get('/:id', optionalAuth, getProduct);

// Review routes
router.post('/:productId/reviews', addReview);

export default router;
