import express from 'express';
import {
  createOrder,
  verifyPaymentAndConfirmOrder,
  getUserOrders,
  getOrder,
  cancelOrder,
  trackOrder,
  requestReturn,
  getOrderSummary
} from '../controllers/orderController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// All routes require authentication
router.use(protect);

// Order management
router.post('/', createOrder);
router.post('/verify-payment', verifyPaymentAndConfirmOrder);
router.get('/', getUserOrders);
router.get('/summary', getOrderSummary);
router.get('/:orderId', getOrder);
router.put('/:orderId/cancel', cancelOrder);
router.get('/:orderId/track', trackOrder);
router.post('/:orderId/return', requestReturn);

export default router;
