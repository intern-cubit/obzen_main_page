import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  ShoppingCart, 
  Star, 
  ArrowLeft,
  X,
  Trash2
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCartWishlist } from '../contexts/CartWishlistContext';
import { wishlistAPI, cartAPI, productAPI } from '../services/ecommerceAPI';
import Navbar from '../components/LandingPage/Navbar';
import FooterApple from '../components/LandingPage/FooterApple';
import LoginModal from '../components/auth/LoginModal';
import RegisterModal from '../components/auth/RegisterModal';

const WishlistPage = () => {
  const { user, isAuthenticated } = useAuth();
  const {
    wishlist: contextWishlist,
    addToCart: contextAddToCart,
    removeFromWishlist: contextRemoveFromWishlist,
    clearWishlist: contextClearWishlist,
    isInCart: contextIsInCart,
    cartLoading,
    wishlistLoading
  } = useCartWishlist();
  const navigate = useNavigate();
  
  const [enrichedWishlist, setEnrichedWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState({});
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  useEffect(() => {
    // Fetch product details for wishlist items
    const fetchWishlistProducts = async () => {
      if (contextWishlist.length === 0) {
        setEnrichedWishlist([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const productPromises = contextWishlist.map(async (productId) => {
          try {
            const response = await productAPI.getProduct(productId);
            return response.data.data?.product || response.data;
          } catch (error) {
            console.error(`Failed to fetch product ${productId}:`, error);
            return null;
          }
        });

        const products = await Promise.all(productPromises);
        const validProducts = products.filter(p => p !== null);
        setEnrichedWishlist(validProducts);
      } catch (error) {
        console.error('Failed to fetch wishlist products:', error);
        setEnrichedWishlist([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlistProducts();
  }, [contextWishlist]);

  const removeFromWishlistHandler = async (productId) => {
    contextRemoveFromWishlist(productId);
  };

  const addToCartHandler = async (product) => {
    const productInfo = {
      title: product.title,
      subtitle: product.subtitle,
      price: product.price,
      image: product.backgroundImage
    };
    contextAddToCart(product._id || product.productId, 1, productInfo);
  };

  const buyNow = async (product) => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    try {
      setProcessing(prev => ({ ...prev, [product._id]: 'buy' }));
      const response = await cartAPI.buyNow(product._id, { quantity: 1 });
      if (response.data.success) {
        navigate('/checkout', { 
          state: { 
            buyNowMode: true, 
            buyNowData: response.data.data 
          } 
        });
      }
    } catch (error) {
      console.error('Failed to process buy now:', error);
    } finally {
      setProcessing(prev => ({ ...prev, [product._id]: false }));
    }
  };

  const clearWishlistHandler = async () => {
    contextClearWishlist();
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
            <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm">
              {enrichedWishlist.length} {enrichedWishlist.length === 1 ? 'item' : 'items'}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {enrichedWishlist.length === 0 ? (
          <div className="text-center py-16">
            <Heart size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-600 mb-6">Save items you love to your wishlist for easy shopping later.</p>
            <Link
              to="/shop"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ShoppingCart size={20} />
              Start Shopping
            </Link>
          </div>
        ) : (
          <div>
            {/* Header Actions */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Saved Items</h2>
              <button
                onClick={clearWishlistHandler}
                className="text-red-600 hover:text-red-700 text-sm font-medium"
              >
                Clear All
              </button>
            </div>

            {/* Wishlist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {enrichedWishlist.map((item) => {
                  const product = item.product || item;
                  const productId = product._id || item.productId;
                  
                  return (
                    <motion.div
                      key={productId}
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="relative">
                        <Link to={`/product/${productId}`}>
                          <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-gray-100">
                            <img
                              src={product.backgroundImage}
                              alt={product.title}
                              className="h-48 w-full object-cover object-center hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        </Link>
                        
                        {/* Remove from Wishlist */}
                        <button
                          onClick={() => removeFromWishlistHandler(productId)}
                          disabled={processing[productId]}
                          className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm hover:bg-red-50 transition-colors"
                        >
                          <Heart 
                            size={18} 
                            className="text-red-500 fill-current" 
                          />
                        </button>

                        {/* Badge */}
                        {product.badge && (
                          <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
                            {product.badge}
                          </div>
                        )}
                      </div>

                      <div className="p-4">
                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={
                                i < (product.rating?.average || 0)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }
                            />
                          ))}
                          <span className="text-xs text-gray-600 ml-1">
                            ({product.rating?.count || 0})
                          </span>
                        </div>

                        {/* Title */}
                        <Link to={`/product/${productId}`}>
                          <h3 className="font-semibold text-gray-900 mb-1 hover:text-blue-600 transition-colors line-clamp-2">
                            {product.title}
                          </h3>
                        </Link>
                        
                        {/* Subtitle */}
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {product.subtitle}
                        </p>

                        {/* Price */}
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-lg font-bold text-gray-900">
                            ₹{product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              ₹{product.originalPrice}
                            </span>
                          )}
                          {product.discountPercentage && (
                            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                              {product.discountPercentage}% off
                            </span>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-2">
                          <button
                            onClick={() => addToCartHandler(product)}
                            disabled={cartLoading || !product.inStock}
                            className={`w-full py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                              !product.inStock
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : cartLoading
                                ? 'bg-blue-400 text-white'
                                : contextIsInCart(productId)
                                ? 'bg-green-600 text-white hover:bg-green-700'
                                : 'bg-blue-600 text-white hover:bg-blue-700'
                            }`}
                          >
                            {cartLoading && (
                              <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                            )}
                            {!product.inStock 
                              ? 'Out of Stock'
                              : cartLoading
                              ? 'Adding...'
                              : contextIsInCart(productId)
                              ? 'In Cart'
                              : 'Add to Cart'
                            }
                          </button>
                          
                          <button
                            onClick={() => buyNow(product)}
                            disabled={processing[productId] || !product.inStock}
                            className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
                              !product.inStock
                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                : processing[productId] === 'buy'
                                ? 'bg-orange-400 text-white'
                                : 'bg-orange-600 text-white hover:bg-orange-700'
                            }`}
                          >
                            {!product.inStock 
                              ? 'Out of Stock'
                              : processing[productId] === 'buy'
                              ? 'Processing...'
                              : 'Buy Now'
                            }
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
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

export default WishlistPage;
