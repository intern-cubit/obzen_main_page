import React, { useState, useEffect } from 'react';
import { Menu, X, User, ChevronDown, LogOut, Settings, Package } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

// NOTE: Make sure the import paths for your modal components are correct.
import LoginModal from '../auth/LoginModal';
import RegisterModal from '../auth/RegisterModal';
import { useAuth } from '../../contexts/AuthContext';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    
    // State for managing login and register modals
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();
    const { user, isAuthenticated, logout } = useAuth();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { name: 'Home', href: '#home', isRoute: false },
        { name: 'About Us', href: '#about', isRoute: false },
        { name: 'Contact Us', href: '#contact', isRoute: false }
    ];

    const handleNavClick = (href, isRoute = false) => {
        setIsMobileMenuOpen(false);
        
        if (isRoute) {
            navigate(href);
        } else {
            if (location.pathname !== '/') {
                navigate('/');
                setTimeout(() => {
                    const element = document.querySelector(href);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 100);
            } else {
                const element = document.querySelector(href);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }
        }
    };

    return (
        // Use a React Fragment to render modals alongside the navbar
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                isScrolled 
                ? 'bg-black/70 backdrop-blur-2xl border-b border-white/10 shadow-sm' 
                : 'bg-black/70 backdrop-blur-md'
            }`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* Logo */}
                        <button 
                            onClick={() => handleNavClick('/', true)}
                            className="flex items-center hover:opacity-80 transition-opacity duration-300"
                        >
                            <img 
                                src={logo} 
                                alt="Obzen Technolabs" 
                                className="h-12 w-auto lg:h-16 xl:h-20 object-contain"
                            />
                        </button>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:block">
                            <div className="flex items-center space-x-8">
                                {navItems.map((item) => (
                                    <button
                                        key={item.name}
                                        onClick={() => handleNavClick(item.href, item.isRoute)}
                                        className={`font-medium transition-colors duration-300 ${
                                            isScrolled 
                                                ? 'text-white hover:text-blue-600' 
                                                : 'text-white hover:text-white'
                                        }`}
                                    >
                                        {item.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Auth Buttons - Hidden for now
                        <div className="hidden lg:flex items-center space-x-4">
                            {isAuthenticated ? (
                                <div className="relative">
                                    <button
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        className="flex items-center gap-2 text-white hover:text-blue-600 transition-colors duration-300"
                                    >
                                        <User size={24} />
                                        <span className="hidden sm:block font-medium">{user?.firstName}</span>
                                        <ChevronDown size={16} />
                                    </button>

                                    {/* User Dropdown Menu */}
                                    {showUserMenu && (
                                        <div className="absolute right-0 mt-3 w-48 bg-black/80 backdrop-blur-lg border border-white/20 rounded-lg shadow-xl py-2 z-50">
                                            <button
                                                onClick={() => {
                                                    navigate('/profile');
                                                    setShowUserMenu(false);
                                                }}
                                                className="flex items-center w-full text-left px-4 py-2 text-white hover:bg-white/10 transition-colors duration-200"
                                            >
                                                <Settings size={16} className="mr-2" />
                                                Profile
                                            </button>
                                            <button
                                                onClick={() => {
                                                    navigate('/orders');
                                                    setShowUserMenu(false);
                                                }}
                                                className="flex items-center w-full text-left px-4 py-2 text-white hover:bg-white/10 transition-colors duration-200"
                                            >
                                                <Package size={16} className="mr-2" />
                                                Orders
                                            </button>
                                            <button
                                                onClick={() => {
                                                    logout();
                                                    setShowUserMenu(false);
                                                }}
                                                className="flex items-center w-full text-left px-4 py-2 text-white hover:bg-white/10 transition-colors duration-200"
                                            >
                                                <LogOut size={16} className="mr-2" />
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <>
                                    <button 
                                        onClick={() => setShowLoginModal(true)}
                                        className={`font-medium transition-colors duration-300 ${
                                            isScrolled 
                                                ? 'text-white hover:text-blue-600' 
                                                : 'text-white hover:text-white'
                                        }`}
                                    >
                                        Sign In
                                    </button>
                                    <button 
                                        onClick={() => setShowRegisterModal(true)}
                                        className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300"
                                    >
                                        Sign Up
                                    </button>
                                </>
                            )}
                        </div>
                        */}

                        {/* Mobile menu button */}
                        <div className="lg:hidden">
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className={`transition-colors duration-300 ${
                                    isScrolled 
                                        ? 'text-white hover:text-blue-600' 
                                        : 'text-white/90 hover:text-white'
                                }`}
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className={`lg:hidden transition-all duration-300 ${
                    isMobileMenuOpen 
                        ? 'max-h-screen opacity-100' 
                        : 'max-h-0 opacity-0 overflow-hidden'
                }`}>
                    <div className="bg-white/95 backdrop-blur-2xl border-t border-white/10">
                        <div className="px-4 py-6 space-y-4">
                            {navItems.map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => handleNavClick(item.href, item.isRoute)}
                                    className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-200"
                                >
                                    {item.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Render Modals */}
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
        </>
    );
};

export default Navbar;