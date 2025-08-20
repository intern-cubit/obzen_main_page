import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft,
  Heart,
  Star,
  X
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCartWishlist } from '../contexts/CartWishlistContext';
import { cartAPI, productAPI } from '../services/ecommerceAPI';
import Navbar from '../components/LandingPage/Navbar';
import FooterApple from '../components/LandingPage/FooterApple';
import LoginModal from '../components/auth/LoginModal';
import RegisterModal from '../components/auth/RegisterModal';

const CartPage = () => {
  const { user, isAuthenticated } = useAuth();
  const {
    cart: contextCart,
    updateCartQuantity,
    removeFromCart: removeFromContextCart,
    clearCart: clearContextCart,
    getCartTotal,
    getCartCount
  } = useCartWishlist();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState({});
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [enrichedCart, setEnrichedCart] = useState([]);

  // Calculate totals from context cart
  const totals = {
    subtotal: getCartTotal(),
    items: getCartCount(),
    total: getCartTotal()
  };

  useEffect(() => {
    // Enrich cart items with product details if needed
    const enrichCart = async () => {
      if (contextCart.length === 0) {
        setEnrichedCart([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const enrichedItems = await Promise.all(
          contextCart.map(async (item) => {
            // If item already has all required fields, use it as is
            if (item.title && item.price && (item.backgroundImage || item.image)) {
              return {
                ...item,
                backgroundImage: item.backgroundImage || item.image,
                subtitle: item.subtitle || 'Product Description'
              };
            }
            // Otherwise, fetch product details if needed
            try {
              const response = await productAPI.getProduct(item.productId);
              const product = response.data.data.product;
              return {
                ...item,
                title: product.title,
                subtitle: product.subtitle,
                price: product.price,
                backgroundImage: product.backgroundImage,
                originalPrice: product.originalPrice
              };
            } catch (error) {
              console.error(`Failed to fetch product ${item.productId}:`, error);
              // Return with default values if fetch fails
              return {
                ...item,
                title: item.title || 'Product Name',
                subtitle: item.subtitle || 'Product Description',
                price: item.price || 0,
                backgroundImage: item.backgroundImage || item.image || '',
                originalPrice: item.originalPrice
              };
            }
          })
        );
        
        setEnrichedCart(enrichedItems);
      } catch (error) {
        console.error('Failed to enrich cart:', error);
        setEnrichedCart(contextCart);
      } finally {
        setLoading(false);
      }
    };

    enrichCart();
  }, [contextCart]);

  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromContextCart(itemId);
      return;
    }

    updateCartQuantity(itemId, newQuantity);
  };

  const removeItem = async (itemId) => {
    removeFromContextCart(itemId);
  };

  const clearCartHandler = async () => {
    clearContextCart();
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    navigate('/checkout');
  };

  const proceedToCheckout = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }
    navigate('/checkout');
  };

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-4">
            <Link 
              to="/shop" 
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
            >
              <ArrowLeft size={20} />
              Continue Shopping
            </Link>
            <div className="h-6 w-px bg-gray-300"></div>
            <h1 className="text-2xl font-bold text-gray-900">Shopping Cart</h1>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {isAuthenticated ? totals.items : enrichedCart.reduce((total, item) => total + item.quantity, 0)} {(isAuthenticated ? totals.items : enrichedCart.reduce((total, item) => total + item.quantity, 0)) === 1 ? 'item' : 'items'}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {enrichedCart.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ShoppingCart size={20} />
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b">
                  <div className="flex justify-between items-center">
                    <h2 className="text-lg font-semibold">Cart Items</h2>
                    <button
                      onClick={clearCartHandler}
                      className="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
                
                <div className="divide-y">
                  <AnimatePresence>
                    {(isAuthenticated ? contextCart : enrichedCart).map((item) => (
                      <motion.div
                        key={item._id || item.productId}
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, height: 0 }}
                        className="p-6"
                      >
                        <div className="flex gap-4">
                          <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={item.product?.backgroundImage || item.backgroundImage || item.image || '/placeholder-image.jpg'}
                              alt={item.product?.title || item.title || 'Product'}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjgwIiBoZWlnaHQ9IjgwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik00MCA0MEM0Mi4yMDkxIDQwIDQ0IDM4LjIwOTEgNDQgMzZDNDQgMzMuNzkwOSA0Mi4yMDkxIDMyIDQwIDMyQzM3Ljc5MDkgMzIgMzYgMzMuNzkwOSAzNiAzNkMzNiAzOC4yMDkxIDM3Ljc5MDkgNDAgNDAgNDBaIiBmaWxsPSIjOUM5Qzk3Ii8+CjxwYXRoIGQ9Ik0yNC44IDUySDU1LjJDNTUuNjQxOCA1Mi4wMDA0IDU2LjA2ODkgNTEuODUwOSA1Ni40MjA0IDUxLjU3MzhDNTYuNzcxOSA1MS4yOTY3IDU3LjAyOTQgNTAuOTEzIDU3LjE1NjkgNTAuNDgyNEM1Ny4yODQ0IDUwLjA1MTggNTcuMjc1IDQ5LjU5NTggNTcuMTMwMiA0OS4xNzA4QzU2Ljk4NTQgNDguNzQ1OCA1Ni43MTI0IDQ4LjM3NDQgNTYuMzQ2MyA0OC4xMDhMNDkuNDI2MyAzOC40MDhDNDkuMTQyNiAzOC4xNDI5IDQ4Ljc5MDggMzcuOTU2OCA0OC40MDQzIDM3Ljg3MjNDNDguMDE3NyAzNy43ODc3IDQ3LjYxNTMgMzcuODA4IDQ3LjI0IDM3LjkzMDRMNDAuMDEzMyA0NS4xNzJMMzIuNzg2NyAzNy45M0MzMi40MTE0IDM3LjgwNzYgMzIuMDA5IDM3Ljc4NzMgMzEuNjIyNCAzNy44NzE5QzMxLjIzNTggMzcuOTU2NSAzMC44ODQgMzguMTQyNiAzMC42MDAzIDM4LjQwOEwyMy42ODAzIDQ4LjEwOEMyMy4zMTQyIDQ4LjM3NDQgMjMuMDQxMiA0OC43NDU4IDIyLjg5NjQgNDkuMTcwOEMyMi43NTE2IDQ5LjU5NTggMjIuNzQyMiA1MC4wNTE4IDIyLjg2OTcgNTAuNDgyNEMyMi45OTcyIDUwLjkxMyAyMy4yNTQ3IDUxLjI5NjcgMjMuNjA2MiA1MS41NzM4QzIzLjk1NzcgNTEuODUwOSAyNC4zODQ4IDUyLjAwMDQgMjQuOCA1MloiIGZpbGw9IiM5QzlDOTciLz4KPC9zdmc+';
                              }}
                            />
                          </div>
                          
                          <div className="flex-1">
                            <Link
                              to={`/product/${item.product?._id || item.productId}`}
                              className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors block"
                            >
                              {item.product?.title || item.title || 'Product Name'}
                            </Link>
                            <p className="text-gray-600 text-sm mb-2">
                              {item.product?.subtitle || item.subtitle || 'Product Description'}
                            </p>
                            
                            {/* Variant Info */}
                            {item.variant && Object.keys(item.variant).length > 0 && (
                              <div className="text-sm text-gray-500 mb-2">
                                {Object.entries(item.variant).map(([key, value]) => (
                                  <span key={key} className="mr-3">
                                    {key}: {value}
                                  </span>
                                ))}
                              </div>
                            )}
                            
                            {/* Price */}
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-lg font-bold text-gray-900">
                                ₹{item.product?.price || item.price || 0}
                              </span>
                              {(item.product?.originalPrice || item.originalPrice) && (
                                <span className="text-sm text-gray-500 line-through">
                                  ₹{item.product?.originalPrice || item.originalPrice}
                                </span>
                              )}
                            </div>
                            
                            {/* Quantity Controls */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center border rounded-lg">
                                <button
                                  onClick={() => updateQuantity(item._id || item.productId, item.quantity - 1)}
                                  disabled={updating[item._id || item.productId] || item.quantity <= 1}
                                  className="p-2 hover:bg-gray-100 disabled:opacity-50"
                                >
                                  <Minus size={16} />
                                </button>
                                <span className="px-4 py-2 font-medium">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item._id || item.productId, item.quantity + 1)}
                                  disabled={updating[item._id || item.productId]}
                                  className="p-2 hover:bg-gray-100 disabled:opacity-50"
                                >
                                  <Plus size={16} />
                                </button>
                              </div>
                              
                              <button
                                onClick={() => removeItem(item._id || item.productId)}
                                disabled={updating[item._id || item.productId]}
                                className="text-red-600 hover:text-red-700 p-2"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
                <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal ({totals.items} items)</span>
                    <span>₹{totals.subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span>₹{totals.total || totals.subtotal}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={proceedToCheckout}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors mb-4"
                >
                  Proceed to Checkout
                </button>
                
                <Link
                  to="/shop"
                  className="block text-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <FooterApple />

      {/* Login/Register Modals */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)}
        onSwitchToRegister={() => {
          setShowLoginModal(false);
          setShowRegisterModal(true);
        }}
      />
      <RegisterModal 
        isOpen={showRegisterModal} 
        onClose={() => setShowRegisterModal(false)}
        onSwitchToLogin={() => {
          setShowRegisterModal(false);
          setShowLoginModal(true);
        }}
      />
    </div>
  );
};

export default CartPage;
