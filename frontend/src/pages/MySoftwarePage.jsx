import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowLeft, 
    Package, 
    Key, 
    Calendar, 
    Shield, 
    ShoppingBag,
    AlertCircle,
    CheckCircle,
    Clock,
    Copy
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { softwareAPI } from '../services/ecommerceAPI';
import ActivationModal from '../components/modals/ActivationModal';

const MySoftwarePage = () => {
    const { user, isAuthenticated, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [softwareGroups, setSoftwareGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [showActivationModal, setShowActivationModal] = useState(false);
    const [selectedLicense, setSelectedLicense] = useState(null);

    useEffect(() => {
        // Don't redirect while auth is still loading
        if (authLoading) {
            return;
        }
        
        if (!isAuthenticated) {
            navigate('/');
            return;
        }
        fetchUserSoftware();
    }, [isAuthenticated, authLoading, navigate]);

    const fetchUserSoftware = async () => {
        try {
            setLoading(true);
            const response = await softwareAPI.getUserSoftwareLicenses();
            setSoftwareGroups(response.data || []);
        } catch (error) {
            console.error('Failed to fetch software licenses:', error);
            setError('Failed to load your software licenses');
        } finally {
            setLoading(false);
        }
    };

    const handleActivateLicense = (license) => {
        setSelectedLicense(license);
        setShowActivationModal(true);
    };

    const handleActivationSuccess = (activatedLicense) => {
        // Update the license in the state
        setSoftwareGroups(prevGroups => 
            prevGroups.map(group => ({
                ...group,
                licenses: group.licenses.map(license => 
                    license._id === activatedLicense._id ? activatedLicense : license
                ),
                activeCount: group.licenses.filter(l => 
                    l._id === activatedLicense._id ? true : l.licenseStatus === 'active'
                ).length,
                availableCount: group.licenses.filter(l => 
                    l._id === activatedLicense._id ? false : l.licenseStatus === 'inactive'
                ).length
            }))
        );
        setShowActivationModal(false);
        setSelectedLicense(null);
    };

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            // Optional: Add toast notification
        } catch (error) {
            console.error('Failed to copy to clipboard:', error);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'active':
                return <CheckCircle className="w-5 h-5 text-green-600" />;
            case 'inactive':
                return <Clock className="w-5 h-5 text-yellow-600" />;
            case 'expired':
                return <AlertCircle className="w-5 h-5 text-red-600" />;
            default:
                return <Clock className="w-5 h-5 text-gray-600" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'active':
                return 'text-green-800 bg-green-100';
            case 'inactive':
                return 'text-yellow-800 bg-yellow-100';
            case 'expired':
                return 'text-red-800 bg-red-100';
            default:
                return 'text-gray-800 bg-gray-100';
        }
    };

    if (authLoading || loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
                    <p className="text-gray-600">
                        {authLoading ? 'Checking authentication...' : 'Loading your software licenses...'}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => navigate(-1)}
                                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                            >
                                <ArrowLeft className="w-6 h-6" />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">My Software</h1>
                                <p className="text-sm text-gray-600">Manage your software licenses and activations</p>
                            </div>
                        </div>
                        <Link
                            to="/products"
                            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <ShoppingBag className="w-4 h-4" />
                            <span>Browse Software</span>
                        </Link>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                        <p className="text-red-700">{error}</p>
                    </div>
                )}

                {softwareGroups.length === 0 ? (
                    <div className="text-center py-12">
                        <Package className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                        <h2 className="text-2xl font-bold text-gray-900 mb-4">No Software Licenses</h2>
                        <p className="text-gray-600 mb-6">
                            You haven't purchased any software licenses yet. Browse our software catalog to get started.
                        </p>
                        <Link
                            to="/products"
                            className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            <ShoppingBag className="w-5 h-5" />
                            <span>Browse Software</span>
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {softwareGroups.map((group, index) => (
                            <motion.div
                                key={group.product._id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: index * 0.1 }}
                                className="bg-white rounded-xl shadow-lg overflow-hidden"
                            >
                                {/* Software Header */}
                                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={group.product.backgroundImage}
                                            alt={group.product.title}
                                            className="w-16 h-16 object-cover rounded-lg border-2 border-white/20"
                                        />
                                        <div className="flex-1">
                                            <h2 className="text-2xl font-bold mb-1">
                                                {group.product.title}
                                            </h2>
                                            <p className="text-blue-100 mb-2">{group.appName}</p>
                                            <div className="flex items-center space-x-4 text-sm">
                                                <span className="flex items-center space-x-1">
                                                    <Package className="w-4 h-4" />
                                                    <span>{group.totalCount} Total Licenses</span>
                                                </span>
                                                <span className="flex items-center space-x-1">
                                                    <CheckCircle className="w-4 h-4" />
                                                    <span>{group.activeCount} Active</span>
                                                </span>
                                                <span className="flex items-center space-x-1">
                                                    <Clock className="w-4 h-4" />
                                                    <span>{group.availableCount} Available</span>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Licenses List */}
                                <div className="p-6">
                                    <div className="grid gap-4 md:grid-cols-2">
                                        {group.licenses.map((license, licenseIndex) => (
                                            <motion.div
                                                key={license._id}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ duration: 0.3, delay: licenseIndex * 0.05 }}
                                                className="border border-gray-200 rounded-lg p-4 hover:border-gray-300 transition-colors"
                                            >
                                                {/* License Header */}
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="flex items-center space-x-2">
                                                        {getStatusIcon(license.licenseStatus)}
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(license.licenseStatus)}`}>
                                                            {license.licenseStatus === 'active' ? 'Active' : 
                                                             license.licenseStatus === 'inactive' ? 'Ready to Activate' : 'Expired'}
                                                        </span>
                                                    </div>
                                                    <span className="text-xs text-gray-500">
                                                        #{license._id.slice(-6)}
                                                    </span>
                                                </div>

                                                {/* License Details */}
                                                <div className="space-y-2">
                                                    {license.licenseStatus === 'active' ? (
                                                        <>
                                                            {license.systemId && (
                                                                <div>
                                                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                                                        System ID
                                                                    </label>
                                                                    <div className="flex items-center space-x-2">
                                                                        <div className="flex-1 text-sm font-mono bg-gray-50 p-2 rounded border">
                                                                            {license.systemId}
                                                                        </div>
                                                                        <button
                                                                            onClick={() => copyToClipboard(license.systemId)}
                                                                            className="p-1 text-gray-500 hover:text-gray-700"
                                                                            title="Copy System ID"
                                                                        >
                                                                            <Copy className="w-4 h-4" />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            )}
                                                            
                                                            {license.name && (
                                                                <div>
                                                                    <label className="block text-xs font-medium text-gray-600 mb-1">
                                                                        Device Name
                                                                    </label>
                                                                    <div className="text-sm bg-gray-50 p-2 rounded border">
                                                                        {license.name}
                                                                    </div>
                                                                </div>
                                                            )}

                                                            <div>
                                                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                                                    Activation Key
                                                                </label>
                                                                <div className="flex items-center space-x-2">
                                                                    <div className="flex-1 text-sm font-mono bg-gray-50 p-2 rounded border break-all">
                                                                        {license.activationKey}
                                                                    </div>
                                                                    <button
                                                                        onClick={() => copyToClipboard(license.activationKey)}
                                                                        className="p-1 text-gray-500 hover:text-gray-700"
                                                                        title="Copy Activation Key"
                                                                    >
                                                                        <Copy className="w-4 h-4" />
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            <div>
                                                                <label className="block text-xs font-medium text-gray-600 mb-1">
                                                                    <Calendar className="w-4 h-4 inline mr-1" />
                                                                    Activated On
                                                                </label>
                                                                <div className="text-sm text-gray-900">
                                                                    {new Date(license.activatedAt).toLocaleDateString()}
                                                                </div>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div className="text-center py-4">
                                                                <Key className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                                                <p className="text-sm text-gray-600 mb-3">
                                                                    This license is ready for activation
                                                                </p>
                                                                <button
                                                                    onClick={() => handleActivateLicense(license)}
                                                                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm"
                                                                >
                                                                    Activate License
                                                                </button>
                                                            </div>
                                                        </>
                                                    )}

                                                    <div className="pt-2 border-t border-gray-100">
                                                        <div className="flex items-center justify-between text-xs text-gray-500">
                                                            <span>
                                                                Expires: {license.validityType === 'LIFETIME' 
                                                                    ? 'Never' 
                                                                    : new Date(license.expirationDate).toLocaleDateString()
                                                                }
                                                            </span>
                                                            <span>
                                                                Purchased: {new Date(license.purchaseDate).toLocaleDateString()}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Activation Modal */}
            <ActivationModal
                isOpen={showActivationModal}
                onClose={() => {
                    setShowActivationModal(false);
                    setSelectedLicense(null);
                }}
                license={selectedLicense}
                onActivationSuccess={handleActivationSuccess}
            />
        </div>
    );
};

export default MySoftwarePage;