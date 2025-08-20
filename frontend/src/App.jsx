import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { CartWishlistProvider } from './contexts/CartWishlistContext';
import AuthSyncHandler from './components/AuthSyncHandler';

// Load development utilities in dev mode
if (import.meta.env.DEV) {
  import('./utils/clearStorageData.js').catch(() => {
    console.log('Development utilities not loaded');
  });
}

// Public pages
import LandingPage from './pages/LandingPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import WishlistPage from './pages/WishlistPage';
import CheckoutPage from './pages/CheckoutPage';
import WaBombProductPage from './pages/product_pages/WaBombProductPage';
import MailStormProductPage from './pages/product_pages/MailStormProductPage';
import CubiViewProductPage from './pages/product_pages/CubiViewProductPage';

// Admin pages
import AdminLogin from './components/admin/AdminLogin';
import AdminLayout from './components/admin/AdminLayout';
import AdminDashboard from './components/admin/AdminDashboard';
import HeroAdmin from './components/admin/HeroAdmin';
import AboutAdmin from './components/admin/AboutAdmin';
import ProductsAdmin from './components/admin/ProductsAdmin';
import ReviewsAdmin from './components/admin/ReviewsAdmin';
import ServicesAdmin from './components/admin/ServicesAdmin';
import ContactAdmin from './components/admin/ContactAdmin';

const App = () => {
    return (
        <AuthProvider>
            <CartWishlistProvider>
                <AuthSyncHandler>
                    <Router
                        future={{
                            v7_startTransition: true,
                            v7_relativeSplatPath: true,
                        }}
                    >
                <div className="App">
                    <Toaster
                        position="top-right"
                        toastOptions={{
                            duration: 4000,
                            style: {
                                background: '#363636',
                                color: '#fff',
                            },
                            success: {
                                duration: 3000,
                                theme: {
                                    primary: 'green',
                                    secondary: 'black',
                                },
                            },
                        }}
                    />

                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/shop" element={<ProductsPage />} />
                        <Route path="/products" element={<ProductsPage />} />
                        <Route path="/product/:id" element={<ProductDetailPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/wishlist" element={<WishlistPage />} />
                        <Route path="/checkout" element={<CheckoutPage />} />
                        <Route path="/products/wa-bomb" element={<WaBombProductPage />} />
                        <Route path="/products/mail-storm" element={<MailStormProductPage />} />
                        <Route path="/products/cubi-view" element={<CubiViewProductPage />} />

                        {/* Admin Routes */}
                        <Route path="/admin/login" element={<AdminLogin />} />
                        <Route path="/admin" element={<AdminLayout />}>
                            <Route path="dashboard" element={<AdminDashboard />} />
                            <Route path="hero" element={<HeroAdmin />} />
                            <Route path="about" element={<AboutAdmin />} />
                            <Route path="products" element={<ProductsAdmin />} />
                            <Route path="reviews" element={<ReviewsAdmin />} />
                            <Route path="services" element={<ServicesAdmin />} />
                            <Route path="contact" element={<ContactAdmin />} />
                        </Route>
                    </Routes>
                </div>
            </Router>
            </AuthSyncHandler>
            </CartWishlistProvider>
        </AuthProvider>
    );
};

export default App;