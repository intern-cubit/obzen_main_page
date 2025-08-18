import React, { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '#home', isRoute: false },
    { name: 'About Us', href: '#about', isRoute: false },
    { name: 'Products', href: '#products', isRoute: false },
    { name: 'All Products', href: '/products', isRoute: true },
    { name: 'Our Services', href: '#services', isRoute: false },
    { name: 'Contact Us', href: '#contact', isRoute: false }
  ]

  const handleNavClick = (href, isRoute = false) => {
    setIsMobileMenuOpen(false)
    
    if (isRoute) {
      navigate(href)
    } else {
      // If we're not on the home page, navigate to home first
      if (location.pathname !== '/') {
        navigate('/')
        // Wait for navigation to complete, then scroll
        setTimeout(() => {
          const element = document.querySelector(href)
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
          }
        }, 100)
      } else {
        const element = document.querySelector(href)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' })
        }
      }
    }
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-black/70 backdrop-blur-2xl border-b border-white/10 shadow-sm' 
        : 'bg-black/70 backdrop-blur-md'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <span className="font-thin text-white text-3xl font-sans">CuBIT Dynamics</span>

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

          {/* Auth Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className={`font-medium transition-colors duration-300 ${
              isScrolled 
                ? 'text-white hover:text-blue-600' 
                : 'text-white hover:text-white'
            }`}>
              Sign In
            </button>
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors duration-300">
              Sign Up
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`transition-colors duration-300 ${
                isScrolled 
                  ? 'text-gray-700 hover:text-blue-600' 
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
  )
}

export default Navbar
