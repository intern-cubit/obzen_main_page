import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, ArrowRight, Heart, Share2, Zap, Shield, Award, X, Search, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { productService } from '../services/contentService';
import Navbar from '../components/LandingPage/Navbar';
import FooterApple from '../components/LandingPage/FooterApple';

const ProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([
    {
      id: 1,
      title: 'CuBIT IoT Pro',
      subtitle: 'Professional IoT Development Kit',
      price: '$299',
      originalPrice: '$349',
      rating: 4.8,
      reviews: 142,
      backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop&crop=center',
      gallery: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop'
      ],
      description: 'Complete IoT development solution with advanced sensors, wireless connectivity, and cloud integration capabilities.',
      features: ['WiFi & Bluetooth 5.0', 'Multiple Sensors', 'Cloud Ready', 'Open Source'],
      category: 'IoT Development',
      inStock: true,
      badge: 'Best Seller'
    },
    {
      id: 2,
      title: 'WA-Bomb',
      subtitle: 'WhatsApp Marketing Automation',
      price: '$49',
      originalPrice: '$99',
      rating: 4.9,
      reviews: 847,
      backgroundImage: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=800&fit=crop&crop=center',
      gallery: [
        'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop'
      ],
      description: 'Professional WhatsApp campaign management tool for safe, effective marketing automation with CSV import and real-time tracking.',
      features: ['Account Safety', 'CSV Import', 'Real-time Tracking', 'Smart Messaging'],
      category: 'Marketing',
      inStock: true,
      badge: 'Best Seller',
      link: '/products/wa-bomb'
    },
    {
      id: 3,
      title: 'Custom PCB Design',
      subtitle: 'Professional Circuit Board Solutions',
      price: '$149',
      originalPrice: '$199',
      rating: 4.7,
      reviews: 234,
      backgroundImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop&crop=center',
      gallery: [
        'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop'
      ],
      description: 'Custom-designed PCB solutions for prototyping and production with professional-grade components.',
      features: ['Custom Design', 'Fast Prototyping', 'Production Ready', 'Quality Assured'],
      category: 'Electronics',
      inStock: true,
      badge: null
    },
    {
      id: 4,
      title: 'Smart Automation Hub',
      subtitle: 'Complete Home Automation System',
      price: '$449',
      originalPrice: '$549',
      rating: 4.6,
      reviews: 167,
      backgroundImage: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=800&fit=crop&crop=center',
      gallery: [
        'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&h=600&fit=crop'
      ],
      description: 'Comprehensive home automation solution with smart sensors, controllers, and mobile app integration.',
      features: ['Voice Control', 'Mobile App', 'Smart Sensors', 'Easy Setup'],
      category: 'Automation',
      inStock: false,
      badge: 'Coming Soon'
    },
    {
      id: 5,
      title: 'Mail Storm',
      subtitle: 'Email Marketing Automation Platform',
      price: '$39',
      originalPrice: '$79',
      rating: 4.8,
      reviews: 1247,
      backgroundImage: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=1200&h=800&fit=crop&crop=center',
      gallery: [
        'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1553028826-f4804151e596?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop'
      ],
      description: 'Professional email campaign automation platform with CSV import, secure SMTP integration, and advanced analytics for modern businesses.',
      features: ['CSV Import', 'SMTP Integration', 'Email Builder', 'Real-time Analytics'],
      category: 'Marketing',
      inStock: true,
      badge: 'New',
      link: '/products/mail-storm'
    },
    {
      id: 6,
      title: 'CubiView',
      subtitle: 'Employee Monitoring & Productivity Platform',
      price: '$89',
      originalPrice: '$149',
      rating: 4.9,
      reviews: 1247,
      backgroundImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop&crop=center',
      gallery: [
        'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=600&fit=crop'
      ],
      description: 'Comprehensive employee monitoring solution with screen tracking, productivity analytics, and security controls for modern workplaces.',
      features: ['Screen Monitoring', 'Keystroke Logging', 'Website Control', 'Real-time Analytics'],
      category: 'Productivity',
      inStock: true,
      badge: 'Enterprise',
      link: '/products/cubi-view'
    }
  ]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState('All');
  
  const categories = ['All', 'IoT Development', 'Marketing', 'Electronics', 'Automation', 'Productivity'];
  const priceRanges = ['All', 'Under $200', '$200 - $500', 'Over $500'];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productService.getProducts();
      if (response.success && response.data.length > 0) {
        // Map API data to include additional e-commerce fields
        const mappedProducts = response.data.map((product, index) => ({
          ...products[index], // Keep default values for e-commerce fields
          ...product, // Override with API data
        }));
        setProducts(mappedProducts);
      }
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const addToCart = (product) => {
    setCartItems(prev => [...prev, product.id]);
    // Simple notification - could be enhanced with a toast library
    alert(`${product.title} added to cart!`);
  };

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const openProductModal = (product) => {
    // If product has a dedicated page, navigate to it
    if (product.link && product.link.startsWith('/products/')) {
      navigate(product.link);
    } else {
      // Otherwise, open modal
      setSelectedProduct(product);
      setSelectedImageIndex(0);
    }
  };

  const closeProductModal = () => {
    setSelectedProduct(null);
    setSelectedImageIndex(0);
  };

  // Filter products based on search term, category, and price range
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    
    const price = parseInt(product.price.replace('$', ''));
    const matchesPrice = priceRange === 'All' ||
                        (priceRange === 'Under $200' && price < 200) ||
                        (priceRange === '$200 - $500' && price >= 200 && price <= 500) ||
                        (priceRange === 'Over $500' && price > 500);
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-black overflow-hidden pt-16 lg:pt-20 pb-16 lg:pb-20" style={{ minHeight: 'calc(60vh + 4rem)' }}>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 flex items-center justify-center h-full text-center px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl lg:text-7xl font-thin text-white mb-6 leading-tight tracking-tight">
              Our Products
            </h1>
            <p className="text-xl lg:text-2xl text-gray-300 font-light max-w-3xl mx-auto">
              Innovative solutions engineered for the future
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Trust Indicators */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center items-center space-x-8 mb-12 text-gray-600"
          >
            <div className="flex items-center space-x-2">
              <Zap size={20} />
              <span className="text-sm font-medium">Fast Shipping</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield size={20} />
              <span className="text-sm font-medium">2 Year Warranty</span>
            </div>
            <div className="flex items-center space-x-2">
              <Award size={20} />
              <span className="text-sm font-medium">Premium Quality</span>
            </div>
          </motion.div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
              {/* Search Bar */}
              <div className="relative w-full lg:w-96">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-4">
                {/* Category Filter */}
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>

                {/* Price Filter */}
                <select
                  value={priceRange}
                  onChange={(e) => setPriceRange(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  {priceRanges.map(range => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>

                {/* Results Count */}
                <div className="flex items-center px-4 py-2 bg-gray-100 rounded-full">
                  <span className="text-sm text-gray-600">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Products Grid or No Results */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
              >
                {/* Product Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.backgroundImage}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Badge */}
                  {product.badge && (
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${
                      product.badge === 'Best Seller' ? 'bg-orange-500 text-white' :
                      product.badge === 'New' ? 'bg-green-500 text-white' :
                      'bg-blue-500 text-white'
                    }`}>
                      {product.badge}
                    </div>
                  )}

                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className={`p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
                        wishlist.includes(product.id)
                          ? 'bg-red-500 text-white'
                          : 'bg-white/80 text-gray-700 hover:bg-white'
                      }`}
                    >
                      <Heart size={16} fill={wishlist.includes(product.id) ? 'currentColor' : 'none'} />
                    </button>
                    <button className="p-2 rounded-full bg-white/80 backdrop-blur-md text-gray-700 hover:bg-white transition-all duration-300">
                      <Share2 size={16} />
                    </button>
                  </div>

                  {/* Stock Status */}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <span className="text-white font-medium">Out of Stock</span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="mb-3">
                    <span className="text-sm text-blue-600 font-medium">{product.category}</span>
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                    {product.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {product.description}
                  </p>

                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {product.features.slice(0, 2).map((feature, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg">
                        {feature}
                      </span>
                    ))}
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">
                      {product.rating} ({product.reviews} reviews)
                    </span>
                  </div>

                  {/* Price and Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-gray-900">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-500 line-through">{product.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3 mt-4">
                    <button
                      onClick={() => openProductModal(product)}
                      className="flex-1 bg-blue-600 text-white py-3 rounded-full font-medium hover:bg-blue-700 transition-all duration-300 flex items-center justify-center space-x-2"
                    >
                      <span>View Details</span>
                      <ArrowRight size={16} />
                    </button>
                    
                    {product.inStock && (
                      <button
                        onClick={() => addToCart(product)}
                        className="px-4 py-3 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300"
                      >
                        <ShoppingCart size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search size={32} className="text-gray-400" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">No products found</h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your search terms or filters to find what you're looking for.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                  setPriceRange('All');
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition-colors duration-300"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Image Gallery */}
              <div className="p-6">
                <img
                  src={selectedProduct.gallery[selectedImageIndex]}
                  alt={selectedProduct.title}
                  className="w-full h-80 object-cover rounded-2xl mb-4"
                />
                <div className="flex space-x-2">
                  {selectedProduct.gallery.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-16 h-16 rounded-lg overflow-hidden border-2 ${
                        selectedImageIndex === index ? 'border-blue-500' : 'border-gray-200'
                      }`}
                    >
                      <img src={image} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Details */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-sm text-blue-600 font-medium">{selectedProduct.category}</span>
                    <h2 className="text-3xl font-bold text-gray-900 mt-1">{selectedProduct.title}</h2>
                    <p className="text-lg text-gray-600 mt-2">{selectedProduct.subtitle}</p>
                  </div>
                  <button
                    onClick={closeProductModal}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
                  >
                    <X size={24} />
                  </button>
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  {selectedProduct.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-3">Key Features</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedProduct.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center space-x-2 mb-6">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < Math.floor(selectedProduct.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {selectedProduct.rating} out of 5 ({selectedProduct.reviews} reviews)
                  </span>
                </div>

                {/* Price and Purchase */}
                <div className="border-t pt-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <div className="flex items-center space-x-3">
                        <span className="text-3xl font-bold text-gray-900">{selectedProduct.price}</span>
                        {selectedProduct.originalPrice && (
                          <span className="text-xl text-gray-500 line-through">{selectedProduct.originalPrice}</span>
                        )}
                      </div>
                      <span className="text-sm text-gray-600">Free shipping included</span>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    {selectedProduct.inStock ? (
                      <>
                        <button
                          onClick={() => addToCart(selectedProduct)}
                          className="flex-1 bg-blue-600 text-white py-4 rounded-full font-medium hover:bg-blue-700 transition-all duration-300 flex items-center justify-center space-x-2"
                        >
                          <ShoppingCart size={20} />
                          <span>Add to Cart</span>
                        </button>
                        <button className="px-6 py-4 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition-all duration-300">
                          Buy Now
                        </button>
                      </>
                    ) : (
                      <button className="flex-1 bg-gray-400 text-white py-4 rounded-full font-medium cursor-not-allowed">
                        Out of Stock
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <FooterApple />
    </div>
  );
};

export default ProductsPage;
