import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingCart, 
  Star, 
  ArrowRight, 
  Heart, 
  Share2, 
  Shield, 
  Zap, 
  Users, 
  BarChart3,
  Play,
  Download,
  Check,
  X,
  MessageCircle,
  Upload,
  Settings,
  Eye,
  Clock,
  Globe,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/LandingPage/Navbar';
import FooterApple from '../../components/LandingPage/FooterApple';
import InteractiveDemo from '../../components/InteractiveDemo';

const WaBombProductPage = () => {
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [activeFeatureTab, setActiveFeatureTab] = useState('dashboard');

  const product = {
    id: 'wa-bomb',
    name: 'WA-Bomb',
    tagline: 'WhatsApp Marketing. Simplified.',
    subtitle: 'Professional WhatsApp Campaign Management Tool',
    description: 'Transform your WhatsApp marketing with WA-Bomb - the safe, powerful, and intelligent campaign management platform that helps businesses reach thousands of customers without account bans.',
    price: '$49',
    originalPrice: '$99',
    rating: 4.9,
    totalReviews: 847,
    customers: '2,500+',
    messagesSent: '10M+',
    successRate: '99.2%',
    
    hero: {
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=800&fit=crop',
      video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
    },

    gallery: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
        title: 'Dashboard Overview',
        description: 'Clean, intuitive dashboard for campaign management'
      },
      {
        type: 'image', 
        url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop',
        title: 'CSV Upload',
        description: 'Simple drag-and-drop CSV contact import'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        title: 'Message Editor',
        description: 'Rich message customization with variables'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
        title: 'Real-time Analytics',
        description: 'Live message delivery tracking and statistics'
      },
      {
        type: 'video',
        url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
        title: 'Product Demo',
        description: 'Watch WA-Bomb in action'
      }
    ],

    keyFeatures: [
      {
        icon: <Shield size={24} />,
        title: 'Account Safety',
        description: 'Advanced anti-ban technology keeps your WhatsApp account secure',
        highlight: true
      },
      {
        icon: <Upload size={24} />,
        title: 'CSV Import',
        description: 'Upload thousands of contacts instantly with our smart CSV processor',
        highlight: true
      },
      {
        icon: <MessageCircle size={24} />,
        title: 'Smart Messaging',
        description: 'Personalized messages with dynamic variables and templates',
        highlight: true
      },
      {
        icon: <BarChart3 size={24} />,
        title: 'Real-time Tracking',
        description: 'Monitor delivery status, read receipts, and engagement metrics',
        highlight: true
      },
      {
        icon: <Clock size={24} />,
        title: 'Smart Scheduling',
        description: 'Schedule campaigns for optimal delivery times'
      },
      {
        icon: <Users size={24} />,
        title: 'Contact Management',
        description: 'Organize contacts into groups and segments'
      }
    ],

    featureScreenshots: {
      dashboard: {
        title: 'Intuitive Dashboard',
        description: 'Get a complete overview of your campaigns, delivery rates, and performance metrics at a glance.',
        image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=800&fit=crop',
        highlights: [
          'Campaign overview and statistics',
          'Real-time delivery tracking',
          'Performance analytics',
          'Quick action buttons'
        ]
      },
      messaging: {
        title: 'Smart Message Editor',
        description: 'Create personalized messages with our advanced editor featuring variables, templates, and media support.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
        highlights: [
          'Dynamic variable insertion',
          'Pre-built message templates',
          'Media attachment support',
          'Message preview and testing'
        ]
      },
      analytics: {
        title: 'Advanced Analytics',
        description: 'Track every aspect of your campaigns with detailed analytics and real-time reporting.',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop',
        highlights: [
          'Delivery status tracking',
          'Read receipt monitoring',
          'Click-through rates',
          'Campaign performance reports'
        ]
      }
    },

    testimonials: [
      {
        id: 1,
        name: 'Sarah Chen',
        role: 'Marketing Director',
        company: 'TechStart Inc.',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b865?w=100&h=100&fit=crop&crop=face',
        rating: 5,
        content: 'WA-Bomb transformed our customer outreach. We reached 10,000 customers in one campaign without a single account issue. The ROI has been incredible.',
        metrics: {
          customers: '10,000+',
          conversion: '23%',
          roi: '340%'
        }
      },
      {
        id: 2,
        name: 'Michael Rodriguez',
        role: 'Sales Manager',
        company: 'Local Business Co.',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        rating: 5,
        content: 'The safety features are amazing. We\'ve been using it for 6 months with zero account bans. Customer support is top-notch too.',
        metrics: {
          campaigns: '50+',
          uptime: '99.9%',
          support: '5★'
        }
      },
      {
        id: 3,
        name: 'Emma Thompson',
        role: 'E-commerce Owner',
        company: 'Boutique Fashion',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        rating: 5,
        content: 'The analytics are incredibly detailed. I can see exactly when messages are read and track conversions in real-time. Game changer!',
        metrics: {
          messages: '25,000+',
          open_rate: '94%',
          response: '67%'
        }
      }
    ],

    plans: [
      {
        id: 'starter',
        name: 'Starter',
        price: '$29',
        period: '/month',
        description: 'Perfect for small businesses',
        features: [
          'Up to 1,000 messages/month',
          'CSV import (500 contacts)',
          'Basic templates',
          'Email support',
          'Campaign scheduling'
        ],
        limitations: [
          'No advanced analytics',
          'No API access'
        ]
      },
      {
        id: 'pro',
        name: 'Professional',
        price: '$49',
        period: '/month',
        description: 'Most popular for growing businesses',
        popular: true,
        features: [
          'Up to 10,000 messages/month',
          'CSV import (unlimited)',
          'Advanced message editor',
          'Real-time analytics',
          'Priority support',
          'Custom variables',
          'Delivery scheduling',
          'Read receipts tracking'
        ],
        limitations: []
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        price: '$99',
        period: '/month',
        description: 'For large-scale operations',
        features: [
          'Unlimited messages',
          'Advanced API access',
          'Custom integrations',
          'Dedicated account manager',
          'White-label options',
          'Advanced security features',
          'Custom reporting',
          'SLA guarantee'
        ],
        limitations: []
      }
    ]
  };

  const nextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === product.gallery.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? product.gallery.length - 1 : prev - 1
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden pt-16 lg:pt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent"></div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 h-full flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full items-center py-12">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 bg-green-100 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-green-700 text-sm font-medium">2,500+ Active Users</span>
                </div>
                
                <h1 className="text-5xl lg:text-7xl font-thin text-gray-900 leading-tight">
                  {product.name}
                </h1>
                
                <p className="text-2xl lg:text-3xl text-gray-600 font-light">
                  {product.tagline}
                </p>
                
                <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                  {product.description}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">{product.messagesSent}</div>
                  <div className="text-sm text-gray-600">Messages Sent</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">{product.successRate}</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{product.customers}</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-green-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Start Free Trial
                </button>
                <button 
                  onClick={() => setIsVideoPlaying(true)}
                  className="flex items-center justify-center space-x-2 border border-gray-300 text-gray-700 px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-50 transition-all duration-300"
                >
                  <Play size={20} />
                  <span>Watch Demo</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center space-x-2">
                  <Shield size={16} className="text-green-500" />
                  <span>100% Safe</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star size={16} className="text-yellow-500" />
                  <span>{product.rating}/5 ({product.totalReviews} reviews)</span>
                </div>
              </div>
            </motion.div>

            {/* Right Content - Hero Image/Video */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src={product.hero.image}
                  alt="WA-Bomb Dashboard"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                
                {/* Play Button Overlay */}
                <button
                  onClick={() => setIsVideoPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-all duration-300 group"
                >
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play size={24} className="text-green-600 ml-1" />
                  </div>
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-thin text-gray-900 mb-6">
              Why Choose WA-Bomb?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with advanced technology to ensure your campaigns are effective, safe, and scalable.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {product.keyFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 ${
                  feature.highlight ? 'ring-2 ring-green-200 bg-gradient-to-br from-green-50/80 to-white/80' : ''
                }`}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-6 ${
                  feature.highlight ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Screenshots Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-thin text-gray-900 mb-6">
              See It In Action
            </h2>
            <p className="text-xl text-gray-600">
              Explore the features that make WA-Bomb the preferred choice for professionals.
            </p>
          </motion.div>

          {/* Feature Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100 p-2 rounded-full">
              {Object.keys(product.featureScreenshots).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveFeatureTab(key)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeFeatureTab === key
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {product.featureScreenshots[key].title}
                </button>
              ))}
            </div>
          </div>

          {/* Active Feature Display */}
          <motion.div
            key={activeFeatureTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div className="space-y-6">
              <h3 className="text-3xl font-semibold text-gray-900">
                {product.featureScreenshots[activeFeatureTab].title}
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                {product.featureScreenshots[activeFeatureTab].description}
              </p>
              <ul className="space-y-3">
                {product.featureScreenshots[activeFeatureTab].highlights.map((highlight, index) => (
                  <li key={index} className="flex items-center space-x-3">
                    <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                      <Check size={12} className="text-green-600" />
                    </div>
                    <span className="text-gray-700">{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="relative">
              <img
                src={product.featureScreenshots[activeFeatureTab].image}
                alt={product.featureScreenshots[activeFeatureTab].title}
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <InteractiveDemo product={product} />

      {/* Customer Testimonials */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-thin text-gray-900 mb-6">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600">
              Real results from real businesses using WA-Bomb.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {product.testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                {/* Rating */}
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 mb-6 p-4 bg-white/50 backdrop-blur-sm rounded-lg">
                  {Object.entries(testimonial.metrics).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-sm font-bold text-gray-900">{value}</div>
                      <div className="text-xs text-gray-600 capitalize">{key.replace('_', ' ')}</div>
                    </div>
                  ))}
                </div>

                {/* Author */}
                <div className="flex items-center space-x-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-sm text-gray-500">{testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-thin text-gray-900 mb-6">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600">
              Start free, scale as you grow. No hidden fees.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {product.plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 ${
                  plan.popular ? 'ring-2 ring-green-200 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-3">
                      <Check size={16} className="text-green-600" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                  {plan.limitations.map((limitation, i) => (
                    <li key={i} className="flex items-center space-x-3">
                      <X size={16} className="text-gray-400" />
                      <span className="text-gray-500">{limitation}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full py-3 rounded-full font-medium transition-all duration-300 ${
                    plan.popular
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {plan.popular ? 'Start Free Trial' : 'Choose Plan'}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {isVideoPlaying && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="relative max-w-4xl w-full"
          >
            <button
              onClick={() => setIsVideoPlaying(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200"
            >
              <X size={32} />
            </button>
            <div className="relative rounded-2xl overflow-hidden">
              <video
                controls
                autoPlay
                className="w-full h-auto"
                src={product.hero.video}
              >
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        </div>
      )}

      <FooterApple />
    </div>
  );
};

export default WaBombProductPage;
