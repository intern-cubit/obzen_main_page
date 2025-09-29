import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import { initiatePayment, verifyPayment } from '../utils/paymentService.js';

export const createOrder = async (req, res) => {
  try {
    const {
      items,
      shippingAddress,
      billingAddress,
      paymentMethod,
      couponCode,
      subtotal: frontendSubtotal,
      shippingCost: frontendShippingCost,
      tax: frontendTax,
      totalAmount: frontendTotal
    } = req.body;
    const userId = req.user.id;

    // Validate items and calculate totals
    let subtotal = 0;
    const validatedItems = [];

    for (const item of items) {
      // Handle both productId (old format) and product (new format)
      const productId = item.productId || item.product;
      const product = await Product.findById(productId);
      
      if (!product) {
        return res.status(400).json({
          success: false,
          message: `Product ${productId} not found`
        });
      }

      // For now, skip stock validation for software products or if not specified
      if (product.isSoftware !== true && product.stock !== undefined) {
        if (!product.inStock || product.stock < item.quantity) {
          return res.status(400).json({
            success: false,
            message: `Product ${product.title} is out of stock or insufficient quantity`
          });
        }
      }

      const itemTotal = item.price * item.quantity; // Use price from frontend (may include discounts)
      subtotal += itemTotal;

      validatedItems.push({
        product: product._id,
        quantity: item.quantity,
        price: item.price, // Use price from frontend
        variant: item.variant
      });
    }

    // Use frontend calculations if provided, otherwise calculate here
    const finalSubtotal = frontendSubtotal || subtotal;
    const shippingCost = frontendShippingCost !== undefined ? frontendShippingCost : (subtotal > 500 ? 0 : 50);
    const tax = frontendTax !== undefined ? frontendTax : (subtotal * 0.08); // 8% tax to match frontend

    // Apply discount if coupon provided
    let discount = { amount: 0 };
    if (couponCode) {
      // Implement coupon logic here
      // For now, just a simple discount
      if (couponCode === 'FIRST10') {
        discount = {
          amount: subtotal * 0.1,
          code: couponCode,
          type: 'percentage'
        };
      }
    }

    const totalAmount = frontendTotal || (finalSubtotal + shippingCost + tax - discount.amount);

    // Create order with generated order number
    const orderCount = await Order.countDocuments();
    const orderNumber = `CUB${String(orderCount + 1).padStart(6, '0')}`;
    
    const order = new Order({
      orderNumber,
      user: userId,
      items: validatedItems,
      subtotal: finalSubtotal,
      shippingCost,
      tax,
      discount,
      totalAmount,
      shippingAddress,
      billingAddress: billingAddress || shippingAddress,
      paymentMethod
    });

    await order.save();
    console.log('Order created successfully:', order.orderNumber);

    // If payment method is not COD, initiate payment
    if (paymentMethod !== 'cod') {
      try {
        const paymentResponse = await initiatePayment({
          orderId: order.orderNumber,
          amount: totalAmount,
          currency: 'INR',
          customerEmail: req.user.email,
          customerPhone: shippingAddress.mobile
        });

        order.paymentId = paymentResponse.id;
        await order.save();

        return res.json({
          success: true,
          message: 'Order created successfully',
          data: {
            order,
            paymentDetails: paymentResponse
          }
        });
      } catch (paymentError) {
        // Delete order if payment initiation fails
        await Order.findByIdAndDelete(order._id);
        throw paymentError;
      }
    }

    // For COD orders
    order.paymentStatus = 'pending';
    order.status = 'confirmed';
    await order.save();

    // Update product stock
    for (const item of validatedItems) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: -item.quantity } }
      );
    }

    // Clear user's cart
    const user = await User.findById(userId);
    user.cart = [];
    await user.save();

    res.json({
      success: true,
      message: 'Order placed successfully',
      data: { order }
    });

  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create order'
    });
  }
};

export const verifyPaymentAndConfirmOrder = async (req, res) => {
  try {
    const { orderId, paymentId, signature } = req.body;

    const order = await Order.findOne({ orderNumber: orderId });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Verify payment with payment gateway
    const isPaymentValid = await verifyPayment({
      orderId,
      paymentId,
      signature
    });

    if (!isPaymentValid) {
      order.paymentStatus = 'failed';
      await order.save();

      return res.status(400).json({
        success: false,
        message: 'Payment verification failed'
      });
    }

    // Update order status
    order.paymentStatus = 'completed';
    order.status = 'confirmed';
    order.transactionId = paymentId;
    await order.save();

    // Update product stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: -item.quantity } }
      );
    }

    // Clear user's cart
    const user = await User.findById(order.user);
    user.cart = [];
    await user.save();

    res.json({
      success: true,
      message: 'Payment verified and order confirmed',
      data: { order }
    });

  } catch (error) {
    console.error('Verify payment error:', error);
    res.status(500).json({
      success: false,
      message: 'Payment verification failed'
    });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      startDate,
      endDate
    } = req.query;
    const userId = req.user.id;

    // Build query
    const query = { user: userId };

    if (status) {
      query.status = status;
    }

    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt.$gte = new Date(startDate);
      if (endDate) query.createdAt.$lte = new Date(endDate);
    }

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { createdAt: -1 },
      populate: {
        path: 'items.product',
        select: 'title subtitle backgroundImage'
      }
    };

    const orders = await Order.paginate(query, options);

    res.json({
      success: true,
      data: {
        orders: orders.docs,
        pagination: {
          current: orders.page,
          pages: orders.totalPages,
          total: orders.totalDocs,
          hasNext: orders.hasNextPage,
          hasPrev: orders.hasPrevPage
        }
      }
    });

  } catch (error) {
    console.error('Get user orders error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const getOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.id;

    const order = await Order.findOne({
      $or: [{ _id: orderId }, { orderNumber: orderId }],
      user: userId
    }).populate({
      path: 'items.product',
      select: 'title subtitle backgroundImage'
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.json({
      success: true,
      data: { order }
    });

  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { reason } = req.body;
    const userId = req.user.id;

    const order = await Order.findOne({
      $or: [{ _id: orderId }, { orderNumber: orderId }],
      user: userId
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    if (!order.canBeCancelled()) {
      return res.status(400).json({
        success: false,
        message: 'Order cannot be cancelled at this stage'
      });
    }

    order.status = 'cancelled';
    order.cancellationReason = reason;
    order.cancelledAt = new Date();

    // If payment was completed, initiate refund
    if (order.paymentStatus === 'completed') {
      order.refundStatus = 'pending';
      order.refundAmount = order.totalAmount;
    }

    await order.save();

    // Restore product stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(
        item.product,
        { $inc: { stock: item.quantity } }
      );
    }

    res.json({
      success: true,
      message: 'Order cancelled successfully',
      data: { order }
    });

  } catch (error) {
    console.error('Cancel order error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to cancel order'
    });
  }
};

export const trackOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.id;

    const order = await Order.findOne({
      $or: [{ _id: orderId }, { orderNumber: orderId }],
      user: userId
    }).select('orderNumber status statusHistory tracking expectedDelivery deliveredAt');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Define tracking statuses
    const trackingStatuses = [
      { status: 'pending', label: 'Order Placed', completed: true },
      { status: 'confirmed', label: 'Order Confirmed', completed: false },
      { status: 'processing', label: 'Processing', completed: false },
      { status: 'shipped', label: 'Shipped', completed: false },
      { status: 'out_for_delivery', label: 'Out for Delivery', completed: false },
      { status: 'delivered', label: 'Delivered', completed: false }
    ];

    // Mark completed statuses
    const statusHistory = order.statusHistory.map(h => h.status);
    trackingStatuses.forEach(ts => {
      if (statusHistory.includes(ts.status) || 
          (ts.status === order.status)) {
        ts.completed = true;
      }
    });

    res.json({
      success: true,
      data: {
        orderNumber: order.orderNumber,
        currentStatus: order.status,
        trackingStatuses,
        statusHistory: order.statusHistory,
        tracking: order.tracking,
        expectedDelivery: order.expectedDelivery,
        deliveredAt: order.deliveredAt
      }
    });

  } catch (error) {
    console.error('Track order error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

export const requestReturn = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { reason, items } = req.body;
    const userId = req.user.id;

    const order = await Order.findOne({
      $or: [{ _id: orderId }, { orderNumber: orderId }],
      user: userId
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    if (!order.canBeReturned()) {
      return res.status(400).json({
        success: false,
        message: 'Order cannot be returned'
      });
    }

    // For now, we'll just mark as return requested
    // In a real app, you'd create a separate Return model
    order.status = 'returned';
    order.notes = `Return requested: ${reason}`;
    await order.save();

    res.json({
      success: true,
      message: 'Return request submitted successfully',
      data: { order }
    });

  } catch (error) {
    console.error('Request return error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process return request'
    });
  }
};

export const getOrderSummary = async (req, res) => {
  try {
    const userId = req.user.id;

    const summary = await Order.aggregate([
      { $match: { user: userId } },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          totalAmount: { $sum: '$totalAmount' }
        }
      }
    ]);

    const totalOrders = await Order.countDocuments({ user: userId });
    const totalSpent = await Order.aggregate([
      { $match: { user: userId, paymentStatus: 'completed' } },
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    res.json({
      success: true,
      data: {
        totalOrders,
        totalSpent: totalSpent[0]?.total || 0,
        statusBreakdown: summary
      }
    });

  } catch (error) {
    console.error('Get order summary error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
