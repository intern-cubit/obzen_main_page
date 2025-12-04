import React from 'react';
import { Mail, Phone, MapPin, Twitter, Linkedin, Github, Instagram } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logoBlack from '../../assets/images/logo-black.png';

const FooterApple = () => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const quickLinks = [
    { name: 'Home', href: '/', isRoute: true },
    { name: 'About', href: '/about', isRoute: true },
    { name: 'Products', href: '/products', isRoute: true },
    { name: 'Services', href: '#services', isRoute: false },
    { name: 'Contact', href: '#contact', isRoute: false }
  ];

  const services = [
    'Custom Development',
    'AI Integration',
    'System Integration',
    'Security Solutions',
    '24/7 Support'
  ];

  const socialLinks = [
    { icon: <Twitter className="w-4 h-4" />, href: '#', name: 'Twitter' },
    { icon: <Linkedin className="w-4 h-4" />, href: '#', name: 'LinkedIn' },
    { icon: <Github className="w-4 h-4" />, href: '#', name: 'GitHub' },
    { icon: <Instagram className="w-4 h-4" />, href: '#', name: 'Instagram' }
  ];

  const handleLinkClick = (href, isRoute = false) => {
    if (isRoute) {
      navigate(href);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
  <footer className="bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-10">
            
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <img 
                  src={logoBlack} 
                  alt="Obzen Technolabs" 
                  className="h-16 w-auto mb-4 object-contain"
                />
                <p className="text-sm text-gray-500 font-light leading-relaxed max-w-md">
                  Pushing the boundaries of innovation through technology 
                  that works beautifully.
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-gray-500">
                  <Mail className="w-3 h-3 mr-2" />
                  <span className="text-xs font-light">connect@obzentechnolabs.com</span>
                </div>
                <div className="flex items-center text-gray-500">
                  <Phone className="w-3 h-3 mr-2" />
                  <span className="text-xs font-light">+91 86185 09818</span>
                </div>
                <div className="flex items-start text-gray-500">
                  <MapPin className="w-3 h-3 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-xs font-light">
                    Bangalore, karnataka, India
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-normal text-gray-900 mb-4">Site</h4>
              <ul className="space-y-2">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleLinkClick(link.href, link.isRoute)}
                      className="text-xs text-gray-500 hover:text-gray-700 transition-colors duration-200 font-light"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-sm font-normal text-gray-900 mb-4">Services</h4>
              <ul className="space-y-2">
                {services.map((service, index) => (
                  <li key={index}>
                    <span className="text-xs text-gray-500 hover:text-gray-700 transition-colors duration-200 cursor-pointer font-light">
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Social Links */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
              
              <div className="text-xs text-gray-500 font-light">
                Stay connected
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-4 border-t border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0">
            <div className="text-xs text-gray-500 font-light">
              Copyright © {currentYear} CuBIT Dynamics Inc. All rights reserved.
            </div>
            
            <div className="flex space-x-4 text-xs">
              <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors duration-200 font-light">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors duration-200 font-light">
                Terms of Use
              </a>
              <a href="#" className="text-gray-500 hover:text-gray-700 transition-colors duration-200 font-light">
                Legal
              </a>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default FooterApple;