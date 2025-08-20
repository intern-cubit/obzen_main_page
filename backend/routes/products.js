import express from 'express';
import {
  getProducts,
  getProduct,
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

const router = express.Router();

// Public routes
router.get('/', optionalAuth, getProducts);
router.get('/categories', getCategories);
router.get('/featured', getFeaturedProducts);
router.get('/search', searchProducts);
router.get('/:id', optionalAuth, getProduct);

// Protected routes
router.use(protect);

// Wishlist routes
router.post('/:productId/wishlist', addToWishlist);
router.get('/user/wishlist', getWishlist);

// Cart routes
router.post('/:productId/cart', addToCart);
router.post('/:productId/buy-now', buyNow);
router.put('/cart/:itemId', updateCartItem);
router.delete('/cart/product/:productId', removeFromCartByProduct);
router.put('/cart/product/:productId', updateCartQuantityByProduct);
router.get('/user/cart', getCart);
router.delete('/user/cart', clearCart);

// Review routes
router.post('/:productId/reviews', addReview);

export default router;
