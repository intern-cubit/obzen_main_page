import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Public pages
import LandingPage from './pages/LandingPage';

// Admin pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import HeroAdmin from './pages/admin/HeroAdmin';
import AboutAdmin from './pages/admin/AboutAdmin';
import ProductsAdmin from './pages/admin/ProductsAdmin';
import ReviewsAdmin from './pages/admin/ReviewsAdmin';
import ServicesAdmin from './pages/admin/ServicesAdmin';
import ContactAdmin from './pages/admin/ContactAdmin';

const App = () => {
    return (
        <Router>
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
    );
};

export default App;