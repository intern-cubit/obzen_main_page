import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingCart, Heart } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const GlobalNavbar = ({ cartCount = 0, wishlistCount = 0 }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/', isRoute: true },
    { name: 'Products', href: '/products', isRoute: true },
    { name: 'About', href: '/#about', isRoute: false },
    { name: 'Services', href: '/#services', isRoute: false },
    { name: 'Contact', href: '/#contact', isRoute: false }
  ];

  const handleNavClick = (href, isRoute = false) => {
    setIsMobileMenuOpen(false);
    
    if (isRoute) {
      if (href.includes('#')) {
        const [path, hash] = href.split('#');
        navigate(path);
        setTimeout(() => {
          const element = document.querySelector(`#${hash}`);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      } else {
        navigate(href);
      }
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-2xl border-b border-gray-200/20 shadow-sm' 
        : 'bg-white/80 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <button 
            onClick={() => navigate('/')}
            className="font-thin text-gray-900 text-2xl lg:text-3xl font-sans hover:text-blue-600 transition-colors duration-300"
          >
            CuBIT Dynamics
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.href, item.isRoute)}
                  className={`font-medium transition-colors duration-300 ${
                    location.pathname === item.href || 
                    (item.href === '/' && location.pathname === '/')
                      ? 'text-blue-600' 
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Cart and Wishlist */}
            <div className="flex items-center space-x-3">
              <button className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors duration-300">
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>
              <button className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors duration-300">
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
            
            <div className="h-6 w-px bg-gray-300"></div>
            
            <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-300">
              Sign In
            </button>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300">
              Sign Up
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center space-x-3">
            {/* Mobile Cart/Wishlist */}
            <button className="relative p-2 text-gray-700">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-300"
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
        <div className="bg-white/95 backdrop-blur-2xl border-t border-gray-200/20">
          <div className="px-4 py-6 space-y-4">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavClick(item.href, item.isRoute)}
                className={`block w-full text-left font-medium py-2 transition-colors duration-200 ${
                  location.pathname === item.href || 
                  (item.href === '/' && location.pathname === '/')
                    ? 'text-blue-600' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.name}
              </button>
            ))}
            <div className="pt-4 border-t border-gray-200/20 space-y-4">
              <button className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium py-2 transition-colors duration-200">
                Sign In
              </button>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-200 w-full">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default GlobalNavbar;
