import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, AlertCircle, Check } from 'lucide-react';
import { softwareAPI } from '../../services/ecommerceAPI';
import { useAuth } from '../../contexts/AuthContext';

const SoftwarePurchaseModal = ({ 
    isOpen, 
    onClose, 
    product, 
    onPurchaseSuccess 
}) => {
    const { user } = useAuth();
    const [quantity, setQuantity] = useState(1);
    const [validityType, setValidityType] = useState('LIFETIME');
    const [customValidityDate, setCustomValidityDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    if (!product || !product.isSoftware) return null;

    const calculateTotal = () => {
        const basePrice = product.price * quantity;
        return basePrice.toFixed(2);
    };

    const handlePurchase = async () => {
        try {
            setLoading(true);
            setError('');

            // Validate inputs
            if (quantity < 1) {
                setError('Quantity must be at least 1');
                return;
            }

            if (validityType === 'CUSTOM_DATE' && !customValidityDate) {
                setError('Please select a validity date for custom period');
                return;
            }

            if (validityType === 'CUSTOM_DATE' && new Date(customValidityDate) <= new Date()) {
                setError('Validity date must be in the future');
                return;
            }

            const purchaseData = {
                productId: product._id,
                quantity,
                validityType,
                totalAmount: parseFloat(calculateTotal())
            };

            if (validityType === 'CUSTOM_DATE') {
                purchaseData.customValidityDate = customValidityDate;
            }

            const response = await softwareAPI.purchaseSoftware(purchaseData);

            if (response.data.success) {
                setSuccess(true);
                setTimeout(() => {
                    onPurchaseSuccess?.(response.data);
                    onClose();
                    setSuccess(false);
                }, 2000);
            } else {
                setError(response.data.message || 'Purchase failed');
            }

        } catch (error) {
            console.error('Purchase error:', error);
            setError(error.response?.data?.message || 'Failed to complete purchase');
        } finally {
            setLoading(false);
        }
    };

    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 1);
    const minDateString = minDate.toISOString().split('T')[0];

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
                    >
                        <div className="p-6">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center space-x-3">
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <ShoppingBag className="w-5 h-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">
                                            Purchase Software
                                        </h2>
                                        <p className="text-sm text-gray-500">
                                            {product.title}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Success State */}
                            {success && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3"
                                >
                                    <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                                    <div>
                                        <p className="text-green-800 font-medium">
                                            Purchase Successful!
                                        </p>
                                        <p className="text-green-600 text-sm">
                                            Your software licenses are ready for activation.
                                        </p>
                                    </div>
                                </motion.div>
                            )}

                            {/* Error Message */}
                            {error && (
                                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
                                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                    <p className="text-red-700 text-sm">{error}</p>
                                </div>
                            )}

                            {!success && (
                                <>
                                    {/* Product Info */}
                                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                        <div className="flex items-center space-x-4">
                                            <img
                                                src={product.backgroundImage}
                                                alt={product.title}
                                                className="w-16 h-16 object-cover rounded-lg"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-gray-900">
                                                    {product.title}
                                                </h3>
                                                <p className="text-sm text-gray-600">
                                                    {product.softwareType} - {product.licenseType} License
                                                </p>
                                                <p className="text-lg font-bold text-blue-600 mt-1">
                                                    ${product.price.toFixed(2)} per license
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Quantity Selection */}
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Number of Licenses
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="10"
                                            value={quantity}
                                            onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            Maximum 10 licenses per purchase
                                        </p>
                                    </div>

                                    {/* Validity Type - Only for Cubi-View */}
                                    {product.softwareType === 'Cubi-View' && (
                                        <div className="mb-6">
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                License Duration
                                            </label>
                                            <div className="space-y-2">
                                                <label className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        value="LIFETIME"
                                                        checked={validityType === 'LIFETIME'}
                                                        onChange={(e) => setValidityType(e.target.value)}
                                                        className="mr-2"
                                                    />
                                                    <span>Lifetime License</span>
                                                </label>
                                                <label className="flex items-center">
                                                    <input
                                                        type="radio"
                                                        value="CUSTOM_DATE"
                                                        checked={validityType === 'CUSTOM_DATE'}
                                                        onChange={(e) => setValidityType(e.target.value)}
                                                        className="mr-2"
                                                    />
                                                    <span>Custom Duration</span>
                                                </label>
                                            </div>

                                            {validityType === 'CUSTOM_DATE' && (
                                                <div className="mt-3">
                                                    <label className="block text-sm text-gray-600 mb-1">
                                                        Valid Until
                                                    </label>
                                                    <input
                                                        type="date"
                                                        min={minDateString}
                                                        value={customValidityDate}
                                                        onChange={(e) => setCustomValidityDate(e.target.value)}
                                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {/* Price Summary */}
                                    <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-gray-600">Price per license:</span>
                                            <span className="font-medium">${product.price.toFixed(2)}</span>
                                        </div>
                                        <div className="flex justify-between items-center mb-2">
                                            <span className="text-gray-600">Quantity:</span>
                                            <span className="font-medium">{quantity}</span>
                                        </div>
                                        <div className="border-t border-blue-200 pt-2">
                                            <div className="flex justify-between items-center">
                                                <span className="text-lg font-bold text-gray-900">Total:</span>
                                                <span className="text-xl font-bold text-blue-600">
                                                    ${calculateTotal()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={onClose}
                                            className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                            disabled={loading}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handlePurchase}
                                            disabled={loading}
                                            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                                        >
                                            {loading ? 'Processing...' : 'Confirm Purchase'}
                                        </button>
                                    </div>

                                    <p className="text-xs text-gray-500 text-center mt-4">
                                        Your licenses will be available for activation immediately after purchase.
                                    </p>
                                </>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default SoftwarePurchaseModal;