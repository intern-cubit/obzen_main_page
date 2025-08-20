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
import { cartAPI, orderAPI, addressAPI } from '../services/ecommerceAPI';
import { formatPrice } from '../utils/priceUtils';
import Navbar from '../components/LandingPage/Navbar';
import FooterApple from '../components/LandingPage/FooterApple';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState(1); // 1: Cart, 2: Address, 3: Payment, 4: Confirmation
  const [orderData, setOrderData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/shop');
      return;
    }
    fetchCartAndAddresses();
  }, [isAuthenticated]);

  const fetchCartAndAddresses = async () => {
    try {
      setLoading(true);
      const [cartResponse, addressResponse] = await Promise.all([
        cartAPI.getCart(),
        user.addresses ? Promise.resolve({ success: true, data: user.addresses }) : addressAPI.getAddresses()
      ]);

      if (cartResponse.success) {
        setCartItems(cartResponse.data.data.cart);
      }

      if (addressResponse.success) {
        setAddresses(user.addresses || []);
        if (user.addresses && user.addresses.length > 0) {
          const defaultAddress = user.addresses.find(addr => addr.isDefault) || user.addresses[0];
          setSelectedAddress(defaultAddress);
        }
      }
    } catch (error) {
      console.error('Failed to fetch cart and addresses:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateCartQuantity = async (itemId, newQuantity) => {
    try {
      await cartAPI.updateCartItem(itemId, { quantity: newQuantity });
      fetchCartAndAddresses();
    } catch (error) {
      console.error('Failed to update cart:', error);
    }
  };

  const calculateTotal = () => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
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
      const order = {
        items: cartItems.map(item => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.price,
          variant: item.variant
        })),
        shippingAddress: selectedAddress,
        paymentMethod,
        subtotal: totals.subtotal,
        shipping: totals.shipping,
        tax: totals.tax,
        total: totals.total
      };

      const response = await orderAPI.createOrder(order);
      
      if (response.success) {
        setOrderData(response.data);
        setStep(4);
        // Clear cart after successful order
        await cartAPI.clearCart();
      }
    } catch (error) {
      console.error('Failed to place order:', error);
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

  if (cartItems.length === 0 && step === 1) {
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
      
      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            {[
              { number: 1, label: 'Cart', icon: ShoppingCart },
              { number: 2, label: 'Address', icon: MapPin },
              { number: 3, label: 'Payment', icon: CreditCard },
              { number: 4, label: 'Confirmation', icon: Check }
            ].map(({ number, label, icon: Icon }) => (
              <div key={number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  step >= number ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {step > number ? <Check size={20} /> : <Icon size={20} />}
                </div>
                <span className={`ml-2 font-medium ${
                  step >= number ? 'text-blue-600' : 'text-gray-600'
                }`}>
                  {label}
                </span>
                {number < 4 && (
                  <div className={`w-16 h-1 mx-4 ${
                    step > number ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Step 1: Cart Review */}
        {step === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Review Your Cart</h2>
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item._id} className="bg-white p-6 rounded-lg shadow">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.product.backgroundImage}
                        alt={item.product.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{item.product.title}</h3>
                        <p className="text-gray-600">{item.product.subtitle}</p>
                        {item.variant && (
                          <p className="text-sm text-blue-600">Variant: {item.variant.name}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => updateCartQuantity(item._id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-1 border rounded disabled:opacity-50"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item._id, item.quantity + 1)}
                          className="p-1 border rounded"
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg">{formatPrice(item.price * item.quantity)}</div>
                        <div className="text-sm text-gray-600">{formatPrice(item.price)} each</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="bg-white p-6 rounded-lg shadow h-fit">
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(totals.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{totals.shipping === 0 ? 'Free' : formatPrice(totals.shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>{formatPrice(totals.tax)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>{formatPrice(totals.total)}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setStep(2)}
                className="w-full bg-blue-600 text-white py-3 rounded-lg mt-6 hover:bg-blue-700"
              >
                Continue to Address
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Order Confirmation */}
        {step === 4 && orderData && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check size={40} className="text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h2>
            <p className="text-gray-600 mb-2">Thank you for your purchase</p>
            <p className="text-sm text-gray-500 mb-8">
              Order #{orderData.orderNumber} | Total: {formatPrice(totals.total)}
            </p>
            <div className="space-y-4">
              <button
                onClick={() => navigate('/orders')}
                className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 mr-4"
              >
                View Order Details
              </button>
              <button
                onClick={() => navigate('/shop')}
                className="border border-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-50"
              >
                Continue Shopping
              </button>
            </div>
          </motion.div>
        )}

        {/* Steps 2 & 3: Simplified for demo */}
        {(step === 2 || step === 3) && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-center py-16"
          >
            <div className="bg-white p-8 rounded-lg shadow max-w-md mx-auto">
              <h2 className="text-2xl font-bold mb-4">
                {step === 2 ? 'Select Address' : 'Choose Payment Method'}
              </h2>
              <p className="text-gray-600 mb-6">
                {step === 2 
                  ? 'Using default address for demo' 
                  : 'Mock payment processing for demo'}
              </p>
              <div className="space-y-4">
                <button
                  onClick={() => step === 2 ? setStep(3) : handlePlaceOrder()}
                  disabled={processing}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {processing ? 'Processing...' : step === 2 ? 'Continue to Payment' : 'Place Order'}
                </button>
                <button
                  onClick={() => setStep(step - 1)}
                  className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50"
                >
                  Back
                </button>
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
