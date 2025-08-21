import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingCart, 
  Heart, 
  Star, 
  Minus, 
  Plus, 
  Truck, 
  Shield, 
  RotateCcw, 
  Award,
  Share2,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  MapPin,
  Clock,
  Zap
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCartWishlist } from '../contexts/CartWishlistContext';
import { productAPI } from '../services/ecommerceAPI';
import { formatPrice } from '../utils/priceUtils';
import Navbar from '../components/LandingPage/Navbar';
import FooterApple from '../components/LandingPage/FooterApple';
import LoginModal from '../components/auth/LoginModal';
import RegisterModal from '../components/auth/RegisterModal';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { 
    addToCart, 
    toggleWishlist, 
    isInCart, 
    isInWishlist,
    cartLoading,
    wishlistLoading
  } = useCartWishlist();

  // State for product details
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const response = await productAPI.getProduct(id);
        setProduct(response.data.data.product || null);
        setError(null);
      } catch (err) {
        setError('Failed to fetch product details');
        setProduct(null);
      }
      setLoading(false);
    };
    if (id) fetchProductDetails();
  }, [id]);
  
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(null);
  const [activeTab, setActiveTab] = useState('description');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
  // Removed Redux product fetch and cleanup. Use API fetch logic if needed.
  }, [id]);

  const fetchRelatedProducts = async () => {
    try {
      const response = await productAPI.getProducts({ 
        category: product?.category, 
        limit: 4,
        exclude: id 
      });
      if (response.data && response.data.data) {
        setRelatedProducts(response.data.data.products || []);
      }
    } catch (error) {
      console.error('Failed to fetch related products:', error);
    }
  };

  const handleAddToCart = async () => {
    const productInfo = {
      title: product?.title,
      subtitle: product?.subtitle,
      price: getCurrentPrice(),
      image: product?.backgroundImage || product?.images?.[0]
    };
    
    addToCart(id, quantity, productInfo);
  };

  const handleAddToWishlist = async () => {
    toggleWishlist(id);
  };

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
      return;
    }

    try {
      const response = await cartAPI.buyNow(product._id, { 
        quantity: selectedQuantity,
        variant: selectedVariant 
      });
      if (response.data.success) {
        // Navigate to checkout with buy now data
        navigate('/checkout', { 
          state: { 
            buyNowMode: true, 
            buyNowData: response.data.data 
          } 
        });
      }
    } catch (error) {
      console.error('Failed to process buy now:', error);
    }
  };

  const getCurrentPrice = () => {
    if (selectedVariant && selectedVariant.price) {
      return selectedVariant.price;
    }
    return product?.price || 0;
  };

  const getDiscountPercentage = () => {
    const current = getCurrentPrice();
    const original = product?.originalPrice || current;
    if (original > current) {
      return Math.round(((original - current) / original) * 100);
    }
    return 0;
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

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
            <Link to="/shop" className="text-blue-600 hover:text-blue-800">
              Return to Shop
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600">Home</Link>
            <ChevronRight size={16} />
            <Link to="/shop" className="hover:text-blue-600">Shop</Link>
            <ChevronRight size={16} />
            <span className="text-gray-900">{product.title}</span>
          </nav>
        </div>
      </div>

      {/* Product Details */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="relative bg-white rounded-lg overflow-hidden mb-4">
              <img
                src={product.gallery?.[selectedImageIndex] || product.backgroundImage}
                alt={product.title}
                className="w-full h-96 object-cover"
              />
              {getDiscountPercentage() > 0 && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {getDiscountPercentage()}% OFF
                </div>
              )}
            </div>
            
            {/* Image Thumbnails */}
            {product.gallery && product.gallery.length > 1 && (
              <div className="flex space-x-2">
                {product.gallery.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                      selectedImageIndex === index ? 'border-blue-600' : 'border-gray-200'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
            <p className="text-lg text-gray-600 mb-4">{product.subtitle}</p>

            {/* Rating */}
            <div className="flex items-center space-x-2 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < Math.floor(product.rating?.average || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="text-gray-600">
                {product.rating?.average || 0} ({product.rating?.count || 0} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-4xl font-bold text-gray-900">
                {formatPrice(getCurrentPrice())}
              </span>
              {product.originalPrice && product.originalPrice > getCurrentPrice() && (
                <span className="text-2xl text-gray-500 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              {getDiscountPercentage() > 0 && (
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Save {getDiscountPercentage()}%
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2 mb-6">
              {product.inStock ? (
                <>
                  <Check size={20} className="text-green-600" />
                  <span className="text-green-600 font-medium">In Stock ({product.stock} available)</span>
                </>
              ) : (
                <>
                  <X size={20} className="text-red-600" />
                  <span className="text-red-600 font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Variants</h3>
                <div className="grid grid-cols-2 gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant._id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`p-3 border rounded-lg text-left ${
                        selectedVariant?._id === variant._id
                          ? 'border-blue-600 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="font-medium">{variant.name}</div>
                      <div className="text-sm text-gray-600">{formatPrice(variant.price)}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="flex items-center space-x-4 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="px-4 py-2 min-w-[60px] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 mb-8">
              <button
                onClick={isInCart(id) ? () => navigate('/cart') : handleAddToCart}
                disabled={!product.inStock || cartLoading}
                className={`flex-1 py-3 px-6 rounded-lg flex items-center justify-center space-x-2 ${
                  isInCart(id) 
                    ? 'bg-green-600 text-white hover:bg-green-700' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                } disabled:bg-gray-400`}
              >
                {cartLoading ? (
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                ) : (
                  <ShoppingCart size={20} />
                )}
                <span>{cartLoading ? 'Adding...' : isInCart(id) ? 'Go to Cart' : 'Add to Cart'}</span>
              </button>
              
              <button
                onClick={handleBuyNow}
                disabled={!product.inStock}
                className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 disabled:bg-gray-400"
              >
                Buy Now
              </button>
              
              <button
                onClick={handleAddToWishlist}
                disabled={wishlistLoading}
                className={`p-3 border rounded-lg flex items-center justify-center ${
                  isInWishlist(id) ? 'bg-red-50 border-red-200 text-red-600' : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {wishlistLoading ? (
                  <div className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full"></div>
                ) : (
                  <Heart size={20} className={isInWishlist(id) ? 'fill-current' : ''} />
                )}
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg">
                <Truck className="text-blue-600" size={24} />
                <div>
                  <div className="font-medium">Free Shipping</div>
                  <div className="text-sm text-gray-600">On orders over $200</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg">
                <Shield className="text-green-600" size={24} />
                <div>
                  <div className="font-medium">Warranty</div>
                  <div className="text-sm text-gray-600">1 year coverage</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg">
                <RotateCcw className="text-purple-600" size={24} />
                <div>
                  <div className="font-medium">Easy Returns</div>
                  <div className="text-sm text-gray-600">30-day return policy</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-4 bg-white rounded-lg">
                <Award className="text-yellow-600" size={24} />
                <div>
                  <div className="font-medium">Quality Assured</div>
                  <div className="text-sm text-gray-600">Tested & certified</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8">
              {['description', 'specifications', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-700 text-lg leading-relaxed">{product.description}</p>
                
                {product.features && product.features.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-xl font-bold mb-4">Key Features</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <Check size={16} className="text-green-600 mt-1 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'specifications' && (
              <div>
                {product.specifications && Object.keys(product.specifications).length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(product.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between py-3 border-b border-gray-200">
                        <span className="font-medium text-gray-900">{key}</span>
                        <span className="text-gray-600">{value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No specifications available.</p>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={24}
                          className={i < Math.floor(product.rating?.average || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <span className="text-lg">
                      {product.rating?.average || 0} out of 5 ({product.rating?.count || 0} reviews)
                    </span>
                  </div>
                </div>

                {product.reviews && product.reviews.length > 0 ? (
                  <div className="space-y-6">
                    {product.reviews.map((review, index) => (
                      <div key={index} className="bg-white p-6 rounded-lg border">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                              <span className="font-bold text-gray-600">
                                {review.user?.name?.charAt(0) || 'A'}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium">{review.user?.name || 'Anonymous'}</div>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    size={16}
                                    className={i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-8">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct._id}
                  to={`/product/${relatedProduct._id}`}
                  className="bg-white rounded-lg p-4 border hover:shadow-lg transition-shadow"
                >
                  <img
                    src={relatedProduct.backgroundImage}
                    alt={relatedProduct.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="font-bold text-lg mb-2">{relatedProduct.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{relatedProduct.subtitle}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold">{formatPrice(relatedProduct.price)}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < Math.floor(relatedProduct.rating?.average || 0) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      <FooterApple />

      {/* Login/Register Modals */}
      <AnimatePresence>
        {showLoginModal && (
          <LoginModal
            onClose={() => setShowLoginModal(false)}
            onSwitchToRegister={() => {
              setShowLoginModal(false);
              setShowRegisterModal(true);
            }}
          />
        )}
        {showRegisterModal && (
          <RegisterModal
            onClose={() => setShowRegisterModal(false)}
            onSwitchToLogin={() => {
              setShowRegisterModal(false);
              setShowLoginModal(true);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductDetailPage;
