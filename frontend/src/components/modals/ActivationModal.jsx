import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Key, AlertCircle, Check, Copy } from 'lucide-react';
import { softwareAPI } from '../../services/ecommerceAPI';

const ActivationModal = ({ 
    isOpen, 
    onClose, 
    license, 
    onActivationSuccess 
}) => {
    const [systemId, setSystemId] = useState('');
    const [friendlyName, setFriendlyName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [activatedLicense, setActivatedLicense] = useState(null);

    if (!license) return null;

    const handleActivation = async () => {
        try {
            setLoading(true);
            setError('');

            if (!systemId.trim()) {
                setError('System ID is required');
                return;
            }

            const activationData = {
                licenseId: license._id,
                systemId: systemId.trim(),
                friendlyName: friendlyName.trim() || undefined
            };

            const response = await softwareAPI.activateLicense(activationData);

            if (response.data.license) {
                setActivatedLicense(response.data.license);
                setSuccess(true);
                onActivationSuccess?.(response.data.license);
            } else {
                setError('Activation failed');
            }

        } catch (error) {
            console.error('Activation error:', error);
            setError(error.response?.data?.message || 'Failed to activate license');
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            // Optional: Show a toast or temporary feedback
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
        }
    };

    const handleClose = () => {
        setSystemId('');
        setFriendlyName('');
        setError('');
        setSuccess(false);
        setActivatedLicense(null);
        onClose();
    };

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
                                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                                        <Key className="w-5 h-5 text-green-600" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-900">
                                            Activate License
                                        </h2>
                                        <p className="text-sm text-gray-500">
                                            {license.appName}
                                        </p>
                                    </div>
                                </div>
                                <button
                                    onClick={handleClose}
                                    className="text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Success State */}
                            {success && activatedLicense && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-4"
                                >
                                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3">
                                        <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                                        <div>
                                            <p className="text-green-800 font-medium">
                                                Activation Successful!
                                            </p>
                                            <p className="text-green-600 text-sm">
                                                Your software is now activated.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Activation Details */}
                                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                System ID
                                            </label>
                                            <div className="flex items-center space-x-2">
                                                <div className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm">
                                                    {activatedLicense.systemId}
                                                </div>
                                                <button
                                                    onClick={() => copyToClipboard(activatedLicense.systemId)}
                                                    className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                                                    title="Copy System ID"
                                                >
                                                    <Copy className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        {activatedLicense.name && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Device Name
                                                </label>
                                                <div className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm">
                                                    {activatedLicense.name}
                                                </div>
                                            </div>
                                        )}

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Activation Key
                                            </label>
                                            <div className="flex items-center space-x-2">
                                                <div className="flex-1 px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-mono break-all">
                                                    {activatedLicense.activationKey}
                                                </div>
                                                <button
                                                    onClick={() => copyToClipboard(activatedLicense.activationKey)}
                                                    className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
                                                    title="Copy Activation Key"
                                                >
                                                    <Copy className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Expiry Date
                                            </label>
                                            <div className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm">
                                                {activatedLicense.validityType === 'LIFETIME' 
                                                    ? 'Lifetime' 
                                                    : new Date(activatedLicense.expirationDate).toLocaleDateString()
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleClose}
                                        className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                                    >
                                        Done
                                    </button>
                                </motion.div>
                            )}

                            {/* Activation Form */}
                            {!success && (
                                <>
                                    {/* Error Message */}
                                    {error && (
                                        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
                                            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                            <p className="text-red-700 text-sm">{error}</p>
                                        </div>
                                    )}

                                    {/* License Info */}
                                    <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                                        <h3 className="font-semibold text-gray-900 mb-2">
                                            {license.appName} License
                                        </h3>
                                        <div className="text-sm text-gray-600 space-y-1">
                                            <p>Status: <span className="font-medium">Ready to Activate</span></p>
                                            <p>
                                                Validity: 
                                                <span className="font-medium ml-1">
                                                    {license.validityType === 'LIFETIME' 
                                                        ? 'Lifetime' 
                                                        : `Until ${new Date(license.expirationDate).toLocaleDateString()}`
                                                    }
                                                </span>
                                            </p>
                                        </div>
                                    </div>

                                    {/* System ID Input */}
                                    <div className="mb-4">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            System ID *
                                        </label>
                                        <input
                                            type="text"
                                            value={systemId}
                                            onChange={(e) => setSystemId(e.target.value)}
                                            placeholder="Enter your system/device ID"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                            required
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            This is typically your device's MAC address or unique identifier
                                        </p>
                                    </div>

                                    {/* Friendly Name Input */}
                                    <div className="mb-6">
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Device Name (Optional)
                                        </label>
                                        <input
                                            type="text"
                                            value={friendlyName}
                                            onChange={(e) => setFriendlyName(e.target.value)}
                                            placeholder="e.g., My Personal PC"
                                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            Give this activation a friendly name for easy identification
                                        </p>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={handleClose}
                                            className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                                            disabled={loading}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleActivation}
                                            disabled={loading || !systemId.trim()}
                                            className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
                                        >
                                            {loading ? 'Activating...' : 'Activate License'}
                                        </button>
                                    </div>

                                    <p className="text-xs text-gray-500 text-center mt-4">
                                        Once activated, you'll receive your activation key for use in the software.
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

export default ActivationModal;