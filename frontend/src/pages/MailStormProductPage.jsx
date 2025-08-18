import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Mail, 
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
  Upload,
  Settings,
  Eye,
  Clock,
  Globe,
  ChevronLeft,
  ChevronRight,
  FileSpreadsheet,
  Image,
  Lock,
  Send,
  Target,
  TrendingUp
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/LandingPage/Navbar';
import FooterApple from '../components/LandingPage/FooterApple';
import InteractiveDemo from '../components/InteractiveDemo';

const MailStormProductPage = () => {
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [activeFeatureTab, setActiveFeatureTab] = useState('dashboard');

  const product = {
    id: 'mail-storm',
    name: 'Mail Storm',
    tagline: 'Email Marketing. Perfected.',
    subtitle: 'Professional Email Campaign Automation Platform',
    description: 'Transform your email marketing with Mail Storm - the powerful, secure, and intelligent campaign management platform that helps businesses reach thousands of customers with personalized emails.',
    price: '$39',
    originalPrice: '$79',
    rating: 4.8,
    totalReviews: 1247,
    customers: '5,200+',
    emailsSent: '50M+',
    deliveryRate: '98.7%',
    
    hero: {
      image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=1200&h=800&fit=crop',
      video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
    },

    gallery: [
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&h=600&fit=crop',
        title: 'Email Dashboard',
        description: 'Comprehensive campaign management dashboard'
      },
      {
        type: 'image', 
        url: 'https://images.unsplash.com/photo-1553028826-f4804151e596?w=800&h=600&fit=crop',
        title: 'CSV Upload Interface',
        description: 'Simple drag-and-drop contact import system'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop',
        title: 'Email Builder',
        description: 'Drag-and-drop email template designer'
      },
      {
        type: 'image',
        url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        title: 'Analytics Dashboard',
        description: 'Real-time email performance tracking'
      },
      {
        type: 'video',
        url: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        thumbnail: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&h=600&fit=crop',
        title: 'Product Demo',
        description: 'See Mail Storm in action'
      }
    ],

    keyFeatures: [
      {
        icon: <FileSpreadsheet size={24} />,
        title: 'CSV Import',
        description: 'Bulk upload thousands of contacts instantly with smart validation',
        highlight: true
      },
      {
        icon: <Lock size={24} />,
        title: 'App Password Setup',
        description: 'Secure integration with Gmail, Outlook, and custom SMTP servers',
        highlight: true
      },
      {
        icon: <Mail size={24} />,
        title: 'Email Builder',
        description: 'Drag-and-drop editor with templates and media attachments',
        highlight: true
      },
      {
        icon: <Send size={24} />,
        title: 'Auto-Send Engine',
        description: 'Intelligent sending with delivery optimization and timing',
        highlight: true
      },
      {
        icon: <Image size={24} />,
        title: 'Media Attachments',
        description: 'Add images, PDFs, and documents to your campaigns'
      },
      {
        icon: <BarChart3 size={24} />,
        title: 'Real-time Analytics',
        description: 'Track opens, clicks, bounces, and conversions instantly'
      }
    ],

    featureScreenshots: {
      dashboard: {
        title: 'Campaign Dashboard',
        description: 'Get a complete overview of your email campaigns, delivery rates, and performance metrics in one unified dashboard.',
        image: 'https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=1200&h=800&fit=crop',
        highlights: [
          'Campaign overview and statistics',
          'Real-time delivery tracking',
          'Performance analytics',
          'Quick campaign actions'
        ]
      },
      builder: {
        title: 'Visual Email Builder',
        description: 'Create stunning emails with our drag-and-drop editor featuring professional templates and media support.',
        image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1200&h=800&fit=crop',
        highlights: [
          'Drag-and-drop interface',
          'Professional templates',
          'Custom HTML support',
          'Mobile-responsive design'
        ]
      },
      analytics: {
        title: 'Advanced Analytics',
        description: 'Monitor every aspect of your email campaigns with detailed analytics and actionable insights.',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
        highlights: [
          'Open and click tracking',
          'Bounce rate monitoring',
          'Conversion analytics',
          'A/B testing results'
        ]
      }
    },

    testimonials: [
      {
        id: 1,
        name: 'Jennifer Martinez',
        role: 'Marketing Director',
        company: 'E-Commerce Plus',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b865?w=100&h=100&fit=crop&crop=face',
        rating: 5,
        content: 'Mail Storm revolutionized our email marketing. We sent 25,000 emails in our first campaign with a 42% open rate. The automation saved us 20 hours per week.',
        metrics: {
          emails: '25K+',
          open_rate: '42%',
          time_saved: '20h/week'
        }
      },
      {
        id: 2,
        name: 'David Kim',
        role: 'Sales Manager',
        company: 'Tech Solutions Inc.',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        rating: 5,
        content: 'The CSV upload feature is incredible. I can import 10,000 contacts in seconds, and the email builder makes creating professional campaigns effortless.',
        metrics: {
          contacts: '10K+',
          campaigns: '50+',
          delivery: '99.1%'
        }
      },
      {
        id: 3,
        name: 'Lisa Thompson',
        role: 'Digital Marketer',
        company: 'Creative Agency',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
        rating: 5,
        content: 'The analytics are game-changing. Real-time open rates, click tracking, and conversion data help me optimize campaigns on the fly. ROI increased by 150%.',
        metrics: {
          roi_increase: '150%',
          click_rate: '18%',
          conversions: '12%'
        }
      }
    ],

    plans: [
      {
        id: 'starter',
        name: 'Starter',
        price: '$19',
        period: '/month',
        description: 'Perfect for small businesses',
        features: [
          'Up to 5,000 emails/month',
          'CSV import (1,000 contacts)',
          'Basic email templates',
          'Email support',
          'Basic analytics'
        ],
        limitations: [
          'No custom SMTP',
          'No A/B testing'
        ]
      },
      {
        id: 'pro',
        name: 'Professional',
        price: '$39',
        period: '/month',
        description: 'Most popular for growing businesses',
        popular: true,
        features: [
          'Up to 25,000 emails/month',
          'CSV import (unlimited)',
          'Advanced email builder',
          'Custom SMTP support',
          'Advanced analytics',
          'A/B testing',
          'Media attachments',
          'Priority support'
        ],
        limitations: []
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        price: '$79',
        period: '/month',
        description: 'For large-scale operations',
        features: [
          'Unlimited emails',
          'Advanced API access',
          'White-label options',
          'Dedicated account manager',
          'Custom integrations',
          'Advanced automation',
          'Custom reporting',
          'SLA guarantee'
        ],
        limitations: []
      }
    ],

    demoSteps: [
      {
        id: 'setup',
        title: 'Configure Email Settings',
        description: 'Connect your Gmail, Outlook, or custom SMTP with secure app passwords',
        image: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&h=600&fit=crop',
        duration: 3,
        features: ['App Password Setup', 'SMTP Configuration', 'Security Validation']
      },
      {
        id: 'upload',
        title: 'Upload Contact CSV',
        description: 'Import your contact list with automatic validation and duplicate detection',
        image: 'https://images.unsplash.com/photo-1553028826-f4804151e596?w=800&h=600&fit=crop',
        duration: 2,
        features: ['CSV Validation', 'Duplicate Detection', 'Contact Segmentation']
      },
      {
        id: 'design',
        title: 'Design Your Email',
        description: 'Create beautiful emails with our drag-and-drop builder and add media',
        image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop',
        duration: 4,
        features: ['Visual Editor', 'Template Library', 'Media Attachments']
      },
      {
        id: 'launch',
        title: 'Launch Campaign',
        description: 'Send emails automatically with intelligent timing and track performance',
        image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        duration: 3,
        features: ['Auto-Send Engine', 'Performance Tracking', 'Real-time Analytics']
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
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
                <div className="inline-flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-blue-700 text-sm font-medium">5,200+ Active Users</span>
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
                  <div className="text-2xl font-bold text-blue-600">{product.emailsSent}</div>
                  <div className="text-sm text-gray-600">Emails Sent</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">{product.deliveryRate}</div>
                  <div className="text-sm text-gray-600">Delivery Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">{product.customers}</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
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
                  <Shield size={16} className="text-blue-500" />
                  <span>GDPR Compliant</span>
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
                  alt="Mail Storm Dashboard"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                
                {/* Play Button Overlay */}
                <button
                  onClick={() => setIsVideoPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-all duration-300 group"
                >
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play size={24} className="text-blue-600 ml-1" />
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
              Why Choose Mail Storm?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powerful email marketing automation designed for modern businesses.
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
                  feature.highlight ? 'ring-2 ring-blue-200 bg-gradient-to-br from-blue-50/80 to-white/80' : ''
                }`}
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-6 ${
                  feature.highlight ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
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
              Explore the features that make Mail Storm the preferred choice for email marketing.
            </p>
          </motion.div>

          {/* Feature Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100/80 backdrop-blur-sm p-2 rounded-full">
              {Object.keys(product.featureScreenshots).map((key) => (
                <button
                  key={key}
                  onClick={() => setActiveFeatureTab(key)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeFeatureTab === key
                      ? 'bg-white/90 backdrop-blur-sm text-gray-900 shadow-sm'
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
                    <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                      <Check size={12} className="text-blue-600" />
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
              See Mail Storm in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Experience how simple it is to create and launch professional email campaigns
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Demo Steps */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-900 mb-8">
                How It Works
              </h3>
              
              {product.demoSteps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {step.title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-3">
                        {step.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {step.features.map((feature, i) => (
                          <span
                            key={i}
                            className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Demo Visualization */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative rounded-3xl overflow-hidden shadow-2xl bg-white/90 backdrop-blur-sm"
              >
                <div className="bg-gray-100/80 backdrop-blur-sm px-4 py-3 flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                  </div>
                  <div className="flex-1 bg-white/90 backdrop-blur-sm rounded px-3 py-1 text-sm text-gray-600">
                    mail-storm.app/dashboard
                  </div>
                </div>
                
                <img
                  src="https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=800&h=600&fit=crop"
                  alt="Mail Storm Demo"
                  className="w-full h-80 object-cover"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

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
              Real results from real businesses using Mail Storm.
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
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" />
                  ))}
                </div>

                <p className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                <div className="grid grid-cols-3 gap-2 mb-6 p-4 bg-white/50 backdrop-blur-sm rounded-lg">
                  {Object.entries(testimonial.metrics).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-sm font-bold text-gray-900">{value}</div>
                      <div className="text-xs text-gray-600 capitalize">{key.replace('_', ' ')}</div>
                    </div>
                  ))}
                </div>

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
                  plan.popular ? 'ring-2 ring-blue-200 scale-105' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
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
                      <Check size={16} className="text-blue-600" />
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
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
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

export default MailStormProductPage;
