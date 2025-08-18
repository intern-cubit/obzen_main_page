import React from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Twitter, 
  Linkedin, 
  Github,
  Shield,
  Truck,
  RotateCcw,
  CreditCard
} from 'lucide-react';

const Footer = () => {
  const footerSections = [
    {
      title: 'Products',
      links: [
        { name: 'IoT Development Kits', href: '/products#iot' },
        { name: 'AI Analytics Engine', href: '/products#ai' },
        { name: 'Custom Electronics', href: '/products#electronics' },
        { name: 'Smart Automation', href: '/products#automation' }
      ]
    },
    {
      title: 'Support',
      links: [
        { name: 'Documentation', href: '/docs' },
        { name: 'API Reference', href: '/api' },
        { name: 'Community', href: '/community' },
        { name: 'Help Center', href: '/help' }
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/#about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Press', href: '/press' },
        { name: 'Partners', href: '/partners' }
      ]
    }
  ];

  const policies = [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'Refund Policy', href: '/refunds' }
  ];

  const trustFeatures = [
    {
      icon: <Shield size={20} />,
      title: '2 Year Warranty',
      description: 'Comprehensive coverage'
    },
    {
      icon: <Truck size={20} />,
      title: 'Free Shipping',
      description: 'On orders over $199'
    },
    {
      icon: <RotateCcw size={20} />,
      title: '30-Day Returns',
      description: 'Hassle-free returns'
    },
    {
      icon: <CreditCard size={20} />,
      title: 'Secure Payment',
      description: 'Bank-level security'
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Trust Features Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {trustFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-thin mb-6">CuBIT Dynamics</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Engineering the future through innovative electronics, software, and AI solutions. 
                We create technology that seamlessly integrates hardware and software for tomorrow's challenges.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center space-x-3">
                  <Phone size={18} className="text-blue-400" />
                  <span className="text-gray-300">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail size={18} className="text-blue-400" />
                  <span className="text-gray-300">hello@cubitdynamics.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin size={18} className="text-blue-400" />
                  <span className="text-gray-300">San Francisco, CA</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300">
                  <Twitter size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300">
                  <Linkedin size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors duration-300">
                  <Github size={18} />
                </a>
              </div>
            </motion.div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold mb-6">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 CuBIT Dynamics. All rights reserved.
            </div>
            
            <div className="flex flex-wrap justify-center lg:justify-end gap-6">
              {policies.map((policy) => (
                <a
                  key={policy.name}
                  href={policy.href}
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-300"
                >
                  {policy.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
