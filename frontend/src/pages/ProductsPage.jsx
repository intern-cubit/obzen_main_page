import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ShoppingCart,
    Star,
    Heart,
    Search,
    Filter,
    Grid,
    List,
    ChevronDown,
    User,
    LogOut,
    Package,
    Settings,
    X,
    ArrowLeft,
    Key
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCartWishlist } from '../contexts/CartWishlistContext';
import { productAPI, cartAPI } from '../services/ecommerceAPI';
import LoginModal from '../components/auth/LoginModal';
import RegisterModal from '../components/auth/RegisterModal';
import SoftwarePurchaseModal from '../components/modals/SoftwarePurchaseModal';

const ProductsPage = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const {
        cart,
        wishlist,
        addToCart,
        toggleWishlist,
        isInCart,
        isInWishlist,
        getCartCount,
        cartLoading,
        wishlistLoading
    } = useCartWishlist();
    const navigate = useNavigate();
    const cartItemCount = getCartCount();
    const [products, setProducts] = useState([]);
    const [productsLoading, setProductsLoading] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        category: '',
        minPrice: '',
        maxPrice: '',
        rating: '',
        sort: 'createdAt',
        order: 'desc',
        search: ''
    });
    const [viewMode, setViewMode] = useState('grid');
    const [showFilters, setShowFilters] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showSoftwarePurchaseModal, setShowSoftwarePurchaseModal] = useState(false);
    const [selectedSoftwareProduct, setSelectedSoftwareProduct] = useState(null);
    const [pagination, setPagination] = useState({
        current: 1,
        pages: 1,
        total: 0
    });

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const fetchProductsData = async () => {
            setProductsLoading(true);
            try {
                const response = await productAPI.getProducts(filters);
                setProducts(response.data.data.products || []);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
            setProductsLoading(false);
        };
        fetchProductsData();
        fetchCategories();
    }, [filters]);

    const fetchCategories = async () => {
        try {
            const response = await productAPI.getCategories();
            setCategories(response.data.data.categories);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    };

    const handleAddToCart = async (productId) => {
        const product = products.find(p => p._id === productId);
        const productInfo = {
            title: product?.title,
            subtitle: product?.subtitle,
            price: product?.price,
            image: product?.backgroundImage || product?.images?.[0]
        };

        addToCart(productId, 1, productInfo);
    };

    const handleBuyNow = async (productId) => {
        const product = products.find(p => p._id === productId);
        
        // Check if it's a software product
        if (product && product.isSoftware) {
            if (!isAuthenticated) {
                setShowLoginModal(true);
                return;
            }
            setSelectedSoftwareProduct(product);
            setShowSoftwarePurchaseModal(true);
            return;
        }

        if (!isAuthenticated) {
            // For non-authenticated users, store in cart and redirect to login
            const productInfo = {
                title: product?.title,
                subtitle: product?.subtitle,
                price: product?.price,
                image: product?.backgroundImage || product?.images?.[0]
            };
            addToCart(productId, 1, productInfo);
            setShowLoginModal(true);
            return;
        }

        try {
            const response = await cartAPI.buyNow(productId, { quantity: 1 });
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

    const handleAddToWishlist = async (productId) => {
        toggleWishlist(productId);
    };

    const handleSoftwarePurchaseSuccess = (purchaseData) => {
        setShowSoftwarePurchaseModal(false);
        setSelectedSoftwareProduct(null);
        // Optional: Show success message or redirect to My Software page
        console.log('Software purchase successful:', purchaseData);
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    // Helper function to get the correct route for a product
    const getProductRoute = (product) => {
        if (!product.customPageRoute || product.customPageRoute === 'productDetailPage') {
            return `/product/${product._id}`;
        }
        
        switch (product.customPageRoute) {
            case 'waBombProductPage':
                return `/wa-bomb/${product._id}`;
            case 'cubiViewProductPage':
                return `/cubi-view/${product._id}`;
            case 'mailStormProductPage':
                return `/mail-storm/${product._id}`;
            default:
                return `/product/${product._id}`;
        }
    };

    const ProductCard = ({ product }) => {
        const productRoute = getProductRoute(product);
        
        return (
            <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
            >
                <div className="relative">
                    <Link to={productRoute}>
                        <img
                            src={product.backgroundImage}
                            alt={product.title}
                            className="w-full h-64 object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                        />
                    </Link>
                    {product.badge && (
                        <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            {product.badge}
                        </span>
                    )}
                    {product.discountPercentage > 0 && (
                        <span className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded text-sm font-semibold">
                            -{product.discountPercentage}%
                        </span>
                    )}
                    <button
                        onClick={() => handleAddToWishlist(product._id)}
                        disabled={wishlistLoading}
                        className={`absolute bottom-4 right-4 p-2 rounded-full transition-colors flex items-center justify-center ${isInWishlist(product._id)
                            ? 'bg-red-500 text-white'
                            : 'bg-white text-gray-600 hover:bg-red-500 hover:text-white'
                            }`}
                    >
                        {wishlistLoading ? (
                            <div className="animate-spin h-5 w-5 border-2 border-current border-t-transparent rounded-full"></div>
                        ) : (
                            <Heart size={20} fill={isInWishlist(product._id) ? 'currentColor' : 'none'} />
                        )}
                    </button>
                </div>

                <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    size={16}
                                    className={i < product.rating.average ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                                />
                            ))}
                        </div>
                        <span className="text-sm text-gray-600">({product.rating.count})</span>
                    </div>

                    <Link to={productRoute}>
                        <h3 className="text-xl font-bold text-gray-900 mb-1 hover:text-blue-600 transition-colors cursor-pointer">
                            {product.title}
                        </h3>
                    </Link>
                    <p className="text-gray-600 text-sm mb-3">{product.subtitle}</p>

                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
                        {product.originalPrice && (
                            <span className="text-lg text-gray-500 line-through">₹{product.originalPrice}</span>
                        )}
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                        {product.features.slice(0, 2).map((feature, index) => (
                            <span key={index} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                                {feature}
                            </span>
                        ))}
                    </div>

                    <div className="flex gap-2">
                        {/* Show different buttons for software vs regular products */}
                        {product.isSoftware ? (
                            // Software products - only show Buy Now
                            <button
                                onClick={() => handleBuyNow(product._id)}
                                disabled={!product.inStock}
                                className={`w-full py-3 px-4 rounded-lg font-semibold transition-colors ${!product.inStock
                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    : 'bg-green-600 text-white hover:bg-green-700'
                                    }`}
                            >
                                {!product.inStock ? 'Out of Stock' : 'Buy Software License'}
                            </button>
                        ) : (
                            // Regular products - show both Add to Cart and Buy Now
                            <>
                                <button
                                    onClick={() => isInCart(product._id) ? navigate('/cart') : handleAddToCart(product._id)}
                                    disabled={!product.inStock || cartLoading}
                                    className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${!product.inStock
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : isInCart(product._id)
                                            ? 'bg-green-500 text-white hover:bg-green-600'
                                            : 'bg-blue-600 text-white hover:bg-blue-700'
                                        }`}
                                >
                                    {cartLoading && (
                                        <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                                    )}
                                    {cartLoading
                                        ? 'Adding...'
                                        : !product.inStock
                                            ? 'Out of Stock'
                                            : isInCart(product._id)
                                                ? 'Go to Cart'
                                                : 'Add to Cart'
                                    }
                                </button>

                                <button
                                    onClick={() => handleBuyNow(product._id)}
                                    disabled={!product.inStock}
                                    className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-colors ${!product.inStock
                                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        : 'bg-orange-600 text-white hover:bg-orange-700'
                                        }`}
                                >
                                    {!product.inStock ? 'Out of Stock' : 'Buy Now'}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </motion.div>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className={`transition-all duration-500 bg-gradient-to-l from-black/70 via-black/80 to-black/70`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate('/')}
                                className="text-neutral-300 hover:text-white transition-colors p-2 rounded-lg hover:bg-neutral-800/50"
                                title="Back to Home"
                            >
                                <ArrowLeft size={24} />
                            </button>
                            <Link to="/" className="text-2xl font-bold">
                                <span className="font-thin text-white text-3xl font-sans">CuBIT Dynamics</span>
                            </Link>
                        </div>

                        {/* Search Bar - Styled for the new dark theme */}
                        <div className="flex-1 max-w-lg mx-8">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={filters.search}
                                    onChange={(e) => handleFilterChange('search', e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 bg-neutral-800/50 border border-neutral-600 text-neutral-200 rounded-lg placeholder:text-neutral-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-neutral-800 transition-colors"
                                />
                            </div>
                        </div>

                        {/* User Menu - Icons updated for better visibility */}
                        <div className="flex items-center gap-6">
                            {/* Wishlist */}
                            <Link to="/wishlist" className="relative">
                                <Heart size={24} className="text-neutral-300 hover:text-red-500 transition-colors" />
                                {wishlist.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                        {wishlist.length}
                                    </span>
                                )}
                            </Link>

                            {/* Cart */}
                            <Link to="/cart" className="relative">
                                <ShoppingCart size={24} className="text-neutral-300 hover:text-blue-500 transition-colors" />
                                {cartItemCount > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                        {cartItemCount}
                                    </span>
                                )}
                            </Link>

                            {/* User Account */}
                            {isAuthenticated ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors"
                                    >
                                        <User size={24} />
                                        <span className="hidden sm:block font-medium">{user?.firstName}</span>
                                        <ChevronDown size={16} />
                                    </button>

                                    {/* Dropdown Menu - Restyled to match the glassy theme */}
                                    {showUserMenu && (
                                        <div className="absolute right-0 mt-3 w-48 bg-neutral-800/80 backdrop-blur-lg border border-neutral-700 rounded-lg shadow-xl py-2 z-50">
                                            <Link to="/profile" className="flex items-center px-4 py-2 text-neutral-300 hover:bg-neutral-700/50">
                                                <Settings size={16} className="mr-2" />
                                                Profile
                                            </Link>
                                            <Link to="/orders" className="flex items-center px-4 py-2 text-neutral-300 hover:bg-neutral-700/50">
                                                <Package size={16} className="mr-2" />
                                                Orders
                                            </Link>
                                            <Link to="/my-software" className="flex items-center px-4 py-2 text-neutral-300 hover:bg-neutral-700/50">
                                                <Key size={16} className="mr-2" />
                                                My Software
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    logout();
                                                    setShowUserMenu(false);
                                                }}
                                                className="flex items-center w-full text-left px-4 py-2 text-neutral-300 hover:bg-neutral-700/50"
                                            >
                                                <LogOut size={16} className="mr-2" />
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setShowLoginModal(true)}
                                        className="px-4 py-2 text-neutral-300 font-medium hover:text-white transition-colors"
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => setShowRegisterModal(true)}
                                        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Sign Up
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 ">
                {/* Filters and Controls */}
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        >
                            <Filter size={20} />
                            Filters
                        </button>

                        <select
                            value={filters.category}
                            onChange={(e) => handleFilterChange('category', e.target.value)}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">All Categories</option>
                            {categories.map((category) => (
                                <option key={category._id} value={category._id}>
                                    {category._id} ({category.count})
                                </option>
                            ))}
                        </select>

                        <select
                            value={`${filters.sort}-${filters.order}`}
                            onChange={(e) => {
                                const [sort, order] = e.target.value.split('-');
                                handleFilterChange('sort', sort);
                                handleFilterChange('order', order);
                            }}
                            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="createdAt-desc">Newest First</option>
                            <option value="price-asc">Price: Low to High</option>
                            <option value="price-desc">Price: High to Low</option>
                            <option value="rating.average-desc">Highest Rated</option>
                            <option value="title-asc">Name: A to Z</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
                        >
                            <Grid size={20} />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-600'}`}
                        >
                            <List size={20} />
                        </button>
                    </div>
                </div>

                {/* Advanced Filters Panel */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="bg-white rounded-lg shadow-sm border p-6 mb-8"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Min Price</label>
                                    <input
                                        type="number"
                                        value={filters.minPrice}
                                        onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder="₹0"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
                                    <input
                                        type="number"
                                        value={filters.maxPrice}
                                        onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        placeholder="₹10000"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Rating</label>
                                    <select
                                        value={filters.rating}
                                        onChange={(e) => handleFilterChange('rating', e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Any Rating</option>
                                        <option value="4">4+ Stars</option>
                                        <option value="3">3+ Stars</option>
                                        <option value="2">2+ Stars</option>
                                    </select>
                                </div>
                                <div className="flex items-end">
                                    <button
                                        onClick={() => setFilters({
                                            category: '',
                                            minPrice: '',
                                            maxPrice: '',
                                            rating: '',
                                            sort: 'createdAt',
                                            order: 'desc',
                                            search: ''
                                        })}
                                        className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Products Grid */}
                {productsLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(12)].map((_, i) => (
                            <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                                <div className="h-64 bg-gray-300"></div>
                                <div className="p-6">
                                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                                    <div className="h-6 bg-gray-300 rounded mb-4"></div>
                                    <div className="h-8 bg-gray-300 rounded"></div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        <div className={`grid gap-6 ${viewMode === 'grid'
                            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                            : 'grid-cols-1'
                            }`}>
                            {products.map((product) => (
                                <ProductCard
                                    key={product._id}
                                    product={product}
                                />
                            ))}
                        </div>

                        {/* Pagination */}
                        {pagination.pages > 1 && (
                            <div className="flex justify-center mt-12">
                                <div className="flex items-center gap-2">
                                    {[...Array(pagination.pages)].map((_, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleFilterChange('page', i + 1)}
                                            className={`px-4 py-2 rounded-lg ${pagination.current === i + 1
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-white text-gray-700 hover:bg-gray-50'
                                                }`}
                                        >
                                            {i + 1}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Modals */}
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
            <SoftwarePurchaseModal
                isOpen={showSoftwarePurchaseModal}
                onClose={() => {
                    setShowSoftwarePurchaseModal(false);
                    setSelectedSoftwareProduct(null);
                }}
                product={selectedSoftwareProduct}
                onPurchaseSuccess={handleSoftwarePurchaseSuccess}
            />
        </div>
    );
};

export default ProductsPage;
