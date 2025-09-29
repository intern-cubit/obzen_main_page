import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  CreditCard, 
  Truck, 
  MapPin, 
  Plus,
  Minus,
  ArrowLeft,
  Lock,
  Check,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCartWishlist } from '../contexts/CartWishlistContext';
import { cartAPI, orderAPI, addressAPI, productAPI } from '../services/ecommerceAPI';
import { formatPrice } from '../utils/priceUtils';
import Navbar from '../components/LandingPage/Navbar';
import FooterApple from '../components/LandingPage/FooterApple';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const { cart: contextCart, getCartTotal, getCartCount, clearCart: clearContextCart } = useCartWishlist();
  
  const [cartItems, setCartItems] = useState([]);
  const [enrichedCart, setEnrichedCart] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1); // 1: Cart, 2: Payment, 3: Confirmation
  const [orderData, setOrderData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    // Don't redirect while auth is still loading
    if (authLoading) {
      return;
    }
    
    if (!isAuthenticated) {
      navigate('/shop');
      return;
    }
    fetchCartAndAddresses();
  }, [isAuthenticated, authLoading]);

  const fetchCartAndAddresses = async () => {
    try {
      setLoading(true);
      
      // Use context cart and enrich with product details
      if (contextCart.length === 0) {
        setEnrichedCart([]);
        setCartItems([]);
        setLoading(false);
        return;
      }

      // Enrich cart items with product details
      const enrichedItems = await Promise.all(
        contextCart.map(async (item) => {
          // If item already has all required fields, use it as is
          if (item.title && item.price && (item.backgroundImage || item.image)) {
            return {
              _id: item.productId || item._id,
              product: {
                _id: item.productId || item._id,
                title: item.title,
                subtitle: item.subtitle || 'Product Description',
                backgroundImage: item.backgroundImage || item.image
              },
              quantity: item.quantity || 1,
              price: item.price,
              variant: item.variant
            };
          }
          
          // Otherwise, fetch product details
          try {
            const response = await productAPI.getProduct(item.productId);
            const product = response.data.data.product;
            return {
              _id: item.productId,
              product: {
                _id: product._id,
                title: product.title,
                subtitle: product.subtitle,
                backgroundImage: product.backgroundImage
              },
              quantity: item.quantity || 1,
              price: product.price,
              variant: item.variant
            };
          } catch (error) {
            console.error(`Failed to fetch product ${item.productId}:`, error);
            return {
              _id: item.productId || item._id,
              product: {
                _id: item.productId || item._id,
                title: item.title || 'Product Name',
                subtitle: item.subtitle || 'Product Description',
                backgroundImage: item.backgroundImage || item.image || ''
              },
              quantity: item.quantity || 1,
              price: item.price || 0,
              variant: item.variant
            };
          }
        })
      );

      setEnrichedCart(enrichedItems);
      setCartItems(enrichedItems);

      // Handle addresses
      if (user?.addresses && user.addresses.length > 0) {
        setAddresses(user.addresses);
        const defaultAddress = user.addresses.find(addr => addr.isDefault) || user.addresses[0];
        setSelectedAddress(defaultAddress);
      }

    } catch (error) {
      console.error('Failed to fetch cart and addresses:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateCartQuantity = async (itemId, newQuantity) => {
    try {
      // Update the enriched cart items
      const updatedItems = enrichedCart.map(item => {
        if (item._id === itemId || item.product._id === itemId) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
      
      setEnrichedCart(updatedItems);
      setCartItems(updatedItems);
      
      // Also update context cart if needed
      // Note: This is a simplified approach. In a real app, you'd want to sync properly
    } catch (error) {
      console.error('Failed to update cart:', error);
    }
  };

  const calculateTotal = () => {
    const subtotal = enrichedCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 200 ? 0 : 20; // Free shipping over $200
    const tax = subtotal * 0.08; // 8% tax
    return {
      subtotal,
      shipping,
      tax,
      total: subtotal + shipping + tax
    };
  };

  const handlePlaceOrder = async () => {
    try {
      setProcessing(true);
      
      const totals = calculateTotal();
      
      // Create a default shipping address if user doesn't have one
      const defaultShippingAddress = selectedAddress || {
        fullName: `${user?.firstName || ''} ${user?.lastName || ''}`.trim() || 'Customer',
        mobile: user?.mobile || '0000000000',
        pincode: '000000',
        locality: 'Not provided',
        address: 'Default address',
        city: 'Not specified',
        state: 'Not specified',
        isDefault: true
      };

      const order = {
        items: enrichedCart.map(item => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.price,
          variant: item.variant
        })),
        shippingAddress: defaultShippingAddress,
        paymentMethod,
        subtotal: totals.subtotal,
        shippingCost: totals.shipping,
        tax: totals.tax,
        totalAmount: totals.total
      };

      const response = await orderAPI.createOrder(order);
      
      console.log('Order API Response:', response);
      console.log('Response data:', response.data);
      
      if (response.data && response.data.success) {
        setOrderData(response.data);
        setStep(3); // Go to confirmation step
        // Clear both context cart and API cart after successful order
        clearContextCart();
        try {
          await cartAPI.clearCart();
        } catch (error) {
          console.log('API cart clear failed, but context cart cleared');
        }
      } else {
        console.error('Order creation failed:', response);
        throw new Error(response.data?.message || 'Failed to create order');
      }
    } catch (error) {
      console.error('Failed to place order:', error);
      console.error('Error details:', error.response?.data || error.message);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to place order. Please try again.';
      alert(errorMessage);
    } finally {
      setProcessing(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h2>
            <p className="text-gray-600 mb-6">You need to be logged in to access checkout</p>
            <Link to="/shop" className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700">
              Return to Shop
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (enrichedCart.length === 0 && step === 1 && !loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center py-16">
            <ShoppingCart size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some products to your cart and come back!</p>
            <Link to="/shop" className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const totals = calculateTotal();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        {/* Step 1: Bill/Invoice Style Checkout */}
        {step === 1 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Invoice Section */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-8">
                {/* Invoice Header */}
                <div className="border-b pb-6 mb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Invoice</h2>
                      <p className="text-gray-600 mt-1">Bill To: {user?.firstName} {user?.lastName}</p>
                      <p className="text-sm text-gray-500">{user?.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Invoice #</p>
                      <p className="font-mono text-lg font-semibold">INV-{Date.now()}</p>
                      <p className="text-sm text-gray-500 mt-2">{new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                {/* Items Table */}
                <div className="overflow-x-auto">
                  <table className="w-full mb-6">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 font-semibold text-gray-900">Item</th>
                        <th className="text-center py-3 font-semibold text-gray-900">Qty</th>
                        <th className="text-right py-3 font-semibold text-gray-900">Unit Price</th>
                        <th className="text-right py-3 font-semibold text-gray-900">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enrichedCart.map((item, index) => (
                        <tr key={item._id} className={index !== enrichedCart.length - 1 ? 'border-b' : ''}>
                          <td className="py-4">
                            <div className="flex items-center space-x-4">
                              <img
                                src={item.product.backgroundImage}
                                alt={item.product.title}
                                className="w-16 h-16 object-cover rounded-lg"
                              />
                              <div>
                                <p className="font-semibold text-gray-900">{item.product.title}</p>
                                <p className="text-sm text-gray-600">{item.product.subtitle}</p>
                                {item.variant && (
                                  <p className="text-xs text-blue-600">Variant: {item.variant.name}</p>
                                )}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 text-center">
                            <div className="flex items-center justify-center space-x-2">
                              <button
                                onClick={() => updateCartQuantity(item._id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="p-1 border rounded disabled:opacity-50 hover:bg-gray-100"
                              >
                                <Minus size={14} />
                              </button>
                              <span className="font-medium w-8 text-center">{item.quantity}</span>
                              <button
                                onClick={() => updateCartQuantity(item._id, item.quantity + 1)}
                                className="p-1 border rounded hover:bg-gray-100"
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                          </td>
                          <td className="py-4 text-right font-medium">
                            {formatPrice(item.price)}
                          </td>
                          <td className="py-4 text-right font-semibold">
                            {formatPrice(item.price * item.quantity)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Invoice Totals */}
                <div className="border-t pt-6">
                  <div className="flex justify-end">
                    <div className="w-80">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Subtotal:</span>
                          <span className="font-medium">{formatPrice(totals.subtotal)}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Shipping:</span>
                          <span className="font-medium">
                            {totals.shipping === 0 ? (
                              <span className="text-green-600">Free</span>
                            ) : (
                              formatPrice(totals.shipping)
                            )}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Tax (8%):</span>
                          <span className="font-medium">{formatPrice(totals.tax)}</span>
                        </div>
                        <div className="border-t pt-2">
                          <div className="flex justify-between text-xl font-bold">
                            <span>Total:</span>
                            <span className="text-blue-600">{formatPrice(totals.total)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Payment Summary Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg h-fit">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Lock className="mr-2 text-green-600" size={20} />
                Secure Checkout
              </h3>
              
              {/* Order Summary */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Order Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Items ({enrichedCart.length}):</span>
                    <span className="font-medium">{formatPrice(totals.subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping:</span>
                    <span className="font-medium">
                      {totals.shipping === 0 ? 'Free' : formatPrice(totals.shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax:</span>
                    <span className="font-medium">{formatPrice(totals.tax)}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span className="text-blue-600">{formatPrice(totals.total)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Payment Method</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={paymentMethod === 'card'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <CreditCard size={16} className="mr-2" />
                    <span>Credit/Debit Card</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={paymentMethod === 'cod'}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-3"
                    />
                    <Truck size={16} className="mr-2" />
                    <span>Cash on Delivery</span>
                  </label>
                </div>
              </div>

              {/* Proceed to Payment Button */}
              <button
                onClick={() => setStep(2)}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 px-6 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-200 flex items-center justify-center"
              >
                <Lock size={20} className="mr-2" />
                Proceed to Payment
              </button>
              
              <p className="text-xs text-gray-500 text-center mt-3">
                Your payment information is encrypted and secure
              </p>
            </div>
          </div>
        )}

        {/* Step 3: Order Confirmation */}
        {step === 3 && orderData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="mb-8">
                <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check size={48} className="text-green-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h2>
                <p className="text-gray-600 text-lg mb-2">Thank you for your purchase!</p>
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                  <p className="text-lg font-semibold text-gray-900">
                    Order #{orderData.order?.orderNumber || orderData.orderNumber}
                  </p>
                  <p className="text-2xl font-bold text-green-600 mt-2">
                    Total: {formatPrice(totals.total)}
                  </p>
                </div>
              </div>

              {/* Order Details Summary */}
              <div className="text-left border rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Order Details</h3>
                <div className="space-y-2 text-sm">
                  {enrichedCart.map((item) => (
                    <div key={item._id} className="flex justify-between">
                      <span className="text-gray-600">
                        {item.product.title} × {item.quantity}
                      </span>
                      <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t mt-3 pt-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Payment Method:</span>
                    <span className="font-medium capitalize">{paymentMethod === 'cod' ? 'Cash on Delivery' : 'Card Payment'}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mt-1">
                    <span>Status:</span>
                    <span className="font-medium text-green-600">Confirmed</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={() => navigate('/orders')}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  View My Orders
                </button>
                <button
                  onClick={() => navigate('/shop')}
                  className="w-full border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                >
                  Continue Shopping
                </button>
              </div>

              {/* Additional Info */}
              <div className="mt-6 text-sm text-gray-500">
                <p>You will receive an email confirmation shortly.</p>
                {paymentMethod === 'cod' && (
                  <p className="mt-1">Please keep the exact amount ready for delivery.</p>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* Steps 2: Payment Processing */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-center mb-8">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard size={40} className="text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Complete Payment</h2>
                <p className="text-gray-600">
                  You're about to pay <span className="font-bold text-blue-600">{formatPrice(totals.total)}</span>
                </p>
              </div>

              {/* Payment Method Display */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex items-center justify-center">
                  {paymentMethod === 'card' ? (
                    <div className="flex items-center text-gray-700">
                      <CreditCard size={24} className="mr-3" />
                      <span className="font-medium">Credit/Debit Card Payment</span>
                    </div>
                  ) : (
                    <div className="flex items-center text-gray-700">
                      <Truck size={24} className="mr-3" />
                      <span className="font-medium">Cash on Delivery</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Summary */}
              <div className="border rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
                <div className="space-y-2 text-sm">
                  {enrichedCart.map((item, index) => (
                    <div key={item._id} className="flex justify-between">
                      <span className="text-gray-600">
                        {item.product.title} × {item.quantity}
                      </span>
                      <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium">{formatPrice(totals.subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping:</span>
                      <span className="font-medium">
                        {totals.shipping === 0 ? 'Free' : formatPrice(totals.shipping)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax:</span>
                      <span className="font-medium">{formatPrice(totals.tax)}</span>
                    </div>
                    <div className="border-t pt-2">
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total:</span>
                        <span className="text-blue-600">{formatPrice(totals.total)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-4">
                <button
                  onClick={handlePlaceOrder}
                  disabled={processing}
                  className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 px-6 rounded-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {processing ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-3"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Check size={20} className="mr-2" />
                      {paymentMethod === 'cod' ? 'Place Order' : 'Complete Payment'}
                    </>
                  )}
                </button>
                
                <button
                  onClick={() => setStep(1)}
                  disabled={processing}
                  className="w-full border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Back to Cart
                </button>
              </div>

              {/* Security Notice */}
              <div className="text-center mt-6">
                <div className="flex items-center justify-center text-sm text-gray-500">
                  <Lock size={16} className="mr-2" />
                  <span>Your payment information is encrypted and secure</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <FooterApple />
    </div>
  );
};

export default CheckoutPage;
