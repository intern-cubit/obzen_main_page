import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowLeft, 
    Package, 
    Calendar, 
    MapPin, 
    CreditCard, 
    Truck,
    Eye,
    ShoppingBag,
    Clock,
    CheckCircle,
    XCircle,
    RefreshCw
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { orderAPI } from '../services/ecommerceAPI';
import { formatPrice } from '../utils/priceUtils';
import Navbar from '../components/LandingPage/Navbar';
import FooterApple from '../components/LandingPage/FooterApple';

const MyOrdersPage = () => {
    const { user, isAuthenticated, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showOrderModal, setShowOrderModal] = useState(false);
    const fetchingRef = useRef(false); // Prevent multiple concurrent fetches
    const [filters, setFilters] = useState({
        status: '',
        page: 1,
        limit: 10
    });
    const [pagination, setPagination] = useState({
        current: 1,
        pages: 1,
        total: 0,
        hasNext: false,
        hasPrev: false
    });

    useEffect(() => {
        // Don't redirect while auth is still loading
        if (authLoading) {
            return;
        }
        
        if (!isAuthenticated) {
            navigate('/');
            return;
        }
        fetchOrders();
    }, [isAuthenticated, authLoading, navigate, filters]);

    const fetchOrders = async () => {
        // Prevent multiple concurrent fetches
        if (fetchingRef.current) {
            console.log('Fetch already in progress, skipping...');
            return;
        }

        try {
            fetchingRef.current = true;
            setLoading(true);
            setError(''); // Clear previous errors
            console.log('Fetching orders with filters:', filters);
            
            const response = await orderAPI.getUserOrders(filters);
            console.log('Orders API response:', response);
            
            if (response && response.data && response.data.data) {
                console.log('Orders data:', response.data.data.orders);
                console.log('Pagination data:', response.data.data.pagination);
                setOrders(response.data.data.orders || []);
                setPagination(response.data.data.pagination || {});
            } else {
                console.log('Invalid response format:', response);
                setError('Invalid response format from server');
            }
        } catch (error) {
            console.error('Failed to fetch orders:', error);
            console.error('Error details:', error.response?.data || error.message);
            
            if (error.response?.status === 401) {
                setError('Authentication required. Please log in again.');
                // Optionally redirect to login
                navigate('/');
            } else if (error.response?.status === 403) {
                setError('Access denied. Please check your permissions.');
            } else if (error.response?.data?.message) {
                setError(`Failed to load orders: ${error.response.data.message}`);
            } else {
                setError('Failed to load your orders. Please try again.');
            }
        } finally {
            setLoading(false);
            fetchingRef.current = false;
        }
    };

    const handleViewOrder = async (orderId) => {
        try {
            const response = await orderAPI.getOrder(orderId);
            setSelectedOrder(response.data.order);
            setShowOrderModal(true);
        } catch (error) {
            console.error('Failed to fetch order details:', error);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending':
                return <Clock className="w-5 h-5 text-yellow-600" />;
            case 'confirmed':
                return <CheckCircle className="w-5 h-5 text-blue-600" />;
            case 'processing':
                return <RefreshCw className="w-5 h-5 text-orange-600" />;
            case 'shipped':
                return <Truck className="w-5 h-5 text-purple-600" />;
            case 'delivered':
                return <CheckCircle className="w-5 h-5 text-green-600" />;
            case 'cancelled':
                return <XCircle className="w-5 h-5 text-red-600" />;
            default:
                return <Clock className="w-5 h-5 text-gray-600" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending':
                return 'text-yellow-800 bg-yellow-100 border-yellow-200';
            case 'confirmed':
                return 'text-blue-800 bg-blue-100 border-blue-200';
            case 'processing':
                return 'text-orange-800 bg-orange-100 border-orange-200';
            case 'shipped':
                return 'text-purple-800 bg-purple-100 border-purple-200';
            case 'delivered':
                return 'text-green-800 bg-green-100 border-green-200';
            case 'cancelled':
                return 'text-red-800 bg-red-100 border-red-200';
            default:
                return 'text-gray-800 bg-gray-100 border-gray-200';
        }
    };

    if (authLoading || loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                        <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-gray-600">
                            {authLoading ? 'Checking authentication...' : 'Loading your orders...'}
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => navigate(-1)}
                                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
                                <p className="text-sm text-gray-600">Track and manage your order history</p>
                            </div>
                        </div>
                        <Link
                            to="/shop"
                            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <ShoppingBag className="w-4 h-4" />
                            <span>Continue Shopping</span>
                        </Link>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                    <div className="flex items-center space-x-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Filter by Status
                            </label>
                            <select
                                value={filters.status}
                                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value, page: 1 }))}
                                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="">All Orders</option>
                                <option value="pending">Pending</option>
                                <option value="confirmed">Confirmed</option>
                                <option value="processing">Processing</option>
                                <option value="shipped">Shipped</option>
                                <option value="delivered">Delivered</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                        <div className="flex items-end">
                            <button
                                onClick={fetchOrders}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                            >
                                Refresh
                            </button>
                        </div>
                    </div>
                </div>

                {/* Orders List */}
                {error ? (
                    <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                        <XCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Orders</h3>
                        <p className="text-gray-600 mb-4">{error}</p>
                        <button
                            onClick={fetchOrders}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                ) : orders.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                        <Package className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">No Orders Found</h3>
                        <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
                        <Link
                            to="/shop"
                            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Start Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <motion.div
                                key={order._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-white rounded-lg shadow-sm overflow-hidden"
                            >
                                <div className="p-6">
                                    {/* Order Header */}
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="flex items-center space-x-4">
                                            <div>
                                                <h3 className="font-bold text-lg text-gray-900">
                                                    Order #{order.orderNumber}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    <Calendar className="inline w-4 h-4 mr-1" />
                                                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-3">
                                            <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                                                {getStatusIcon(order.status)}
                                                <span className="capitalize">{order.status}</span>
                                            </div>
                                            <button
                                                onClick={() => handleViewOrder(order._id)}
                                                className="flex items-center space-x-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                            >
                                                <Eye className="w-4 h-4" />
                                                <span>View</span>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Order Items Preview */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-2">Items Ordered</h4>
                                            <div className="space-y-2">
                                                {order.items.slice(0, 2).map((item, index) => (
                                                    <div key={index} className="flex items-center space-x-3">
                                                        <img
                                                            src={item.product?.backgroundImage}
                                                            alt={item.product?.title}
                                                            className="w-12 h-12 object-cover rounded-lg"
                                                        />
                                                        <div className="flex-1">
                                                            <p className="font-medium text-gray-900">{item.product?.title}</p>
                                                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                                                        </div>
                                                        <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                                                    </div>
                                                ))}
                                                {order.items.length > 2 && (
                                                    <p className="text-sm text-gray-500">
                                                        +{order.items.length - 2} more items
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        <div>
                                            <h4 className="font-semibold text-gray-900 mb-2">Order Summary</h4>
                                            <div className="space-y-1 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Subtotal:</span>
                                                    <span>{formatPrice(order.subtotal)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Shipping:</span>
                                                    <span>{order.shippingCost === 0 ? 'Free' : formatPrice(order.shippingCost)}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Tax:</span>
                                                    <span>{formatPrice(order.tax)}</span>
                                                </div>
                                                <div className="border-t pt-1 mt-2">
                                                    <div className="flex justify-between font-bold text-lg">
                                                        <span>Total:</span>
                                                        <span className="text-blue-600">{formatPrice(order.totalAmount)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payment & Delivery Info */}
                                    <div className="flex items-center justify-between pt-4 border-t">
                                        <div className="flex items-center space-x-6">
                                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                                <CreditCard className="w-4 h-4" />
                                                <span className="capitalize">
                                                    {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Card Payment'}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                                                <MapPin className="w-4 h-4" />
                                                <span>{order.shippingAddress?.city}, {order.shippingAddress?.state}</span>
                                            </div>
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            Payment: <span className={`font-medium ${order.paymentStatus === 'completed' ? 'text-green-600' : order.paymentStatus === 'failed' ? 'text-red-600' : 'text-yellow-600'}`}>
                                                {order.paymentStatus === 'completed' ? 'Paid' : order.paymentStatus === 'failed' ? 'Failed' : 'Pending'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {pagination.pages > 1 && (
                    <div className="flex items-center justify-between mt-8">
                        <div className="text-sm text-gray-600">
                            Showing page {pagination.current} of {pagination.pages} 
                            ({pagination.total} total orders)
                        </div>
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
                                disabled={!pagination.hasPrev}
                                className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                            >
                                Previous
                            </button>
                            <span className="px-3 py-1">
                                {pagination.current}
                            </span>
                            <button
                                onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
                                disabled={!pagination.hasNext}
                                className="px-3 py-1 border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Order Details Modal */}
            <AnimatePresence>
                {showOrderModal && selectedOrder && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
                        onClick={() => setShowOrderModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-96 overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        Order Details #{selectedOrder.orderNumber}
                                    </h2>
                                    <button
                                        onClick={() => setShowOrderModal(false)}
                                        className="p-2 hover:bg-gray-100 rounded-lg"
                                    >
                                        ×
                                    </button>
                                </div>

                                {/* Order Items */}
                                <div className="mb-6">
                                    <h3 className="font-semibold text-gray-900 mb-3">Items Ordered</h3>
                                    <div className="space-y-3">
                                        {selectedOrder.items.map((item, index) => (
                                            <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg">
                                                <img
                                                    src={item.product?.backgroundImage}
                                                    alt={item.product?.title}
                                                    className="w-16 h-16 object-cover rounded-lg"
                                                />
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-gray-900">{item.product?.title}</h4>
                                                    <p className="text-sm text-gray-600">{item.product?.subtitle}</p>
                                                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                                                    <p className="text-sm text-gray-600">{formatPrice(item.price)} each</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Shipping Address */}
                                <div className="mb-6">
                                    <h3 className="font-semibold text-gray-900 mb-3">Shipping Address</h3>
                                    <div className="p-3 bg-gray-50 rounded-lg">
                                        <p className="font-medium">{selectedOrder.shippingAddress?.fullName}</p>
                                        <p className="text-sm text-gray-600">{selectedOrder.shippingAddress?.address}</p>
                                        <p className="text-sm text-gray-600">
                                            {selectedOrder.shippingAddress?.city}, {selectedOrder.shippingAddress?.state} - {selectedOrder.shippingAddress?.pincode}
                                        </p>
                                        <p className="text-sm text-gray-600">Phone: {selectedOrder.shippingAddress?.mobile}</p>
                                    </div>
                                </div>

                                {/* Order Summary */}
                                <div className="border-t pt-4">
                                    <h3 className="font-semibold text-gray-900 mb-3">Order Summary</h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Subtotal:</span>
                                            <span>{formatPrice(selectedOrder.subtotal)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Shipping:</span>
                                            <span>{selectedOrder.shippingCost === 0 ? 'Free' : formatPrice(selectedOrder.shippingCost)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Tax:</span>
                                            <span>{formatPrice(selectedOrder.tax)}</span>
                                        </div>
                                        <div className="border-t pt-2">
                                            <div className="flex justify-between font-bold text-lg">
                                                <span>Total:</span>
                                                <span className="text-blue-600">{formatPrice(selectedOrder.totalAmount)}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <FooterApple />
        </div>
    );
};

export default MyOrdersPage;