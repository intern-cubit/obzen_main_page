import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Monitor, 
  Star, 
  ArrowRight, 
  Heart, 
  Share2, 
  Shield, 
  Eye, 
  Users, 
  BarChart3,
  Play,
  Download,
  Check,
  X,
  MousePointer,
  Keyboard,
  Camera,
  VideoIcon,
  Clock,
  Globe,
  ChevronLeft,
  ChevronRight,
  FileSpreadsheet,
  Mail,
  MessageSquare,
  Lock,
  Smartphone,
  Laptop,
  Settings,
  AlertTriangle,
  Activity,
  Clipboard,
  Ban,
  Wifi,
  WifiOff,
  Target,
  TrendingUp,
  Calendar,
  Timer,
  MousePointer2,
  Image,
  Video,
  KeyRound,
  ShieldCheck,
  ShieldX,
  Database,
  CloudUpload
} from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/LandingPage/Navbar';
import FooterApple from '../../components/LandingPage/FooterApple';
import { productAPI } from '../../services/ecommerceAPI';

const CubiViewProductPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState('pro');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [activeFeatureTab, setActiveFeatureTab] = useState('monitoring');
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch product data if ID is provided
  useEffect(() => {
    const fetchProduct = async () => {
      if (id) {
        try {
          setLoading(true);
          const response = await productAPI.getProduct(id);
          setProductData(response.data.data);
        } catch (error) {
          console.error('Failed to fetch product:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);

  const product = {
    id: 'cubi-view',
    name: 'CubiView',
    tagline: 'Employee Productivity. Perfected.',
    subtitle: 'Comprehensive Employee Monitoring & Productivity Solution',
    description: 'Transform your workplace productivity with CubiView - the intelligent, secure, and comprehensive employee monitoring platform that provides complete visibility into workforce activities while maintaining privacy and compliance.',
    price: '$89',
    originalPrice: '$149',
    rating: 4.9,
    totalReviews: 1247,
    customers: '5,000+',
    companiesTracked: '500+',
    uptime: '99.9%',
    gallery: [
      'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=1200&h=800&fit=crop',
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&h=800&fit=crop'
    ],
    features: {
      monitoring: [
        {
          icon: Camera,
          title: 'Screen Monitoring',
          description: 'Real-time screenshots and screen recording with intelligent activity detection'
        },
        {
          icon: MousePointer2,
          title: 'Mouse & Click Tracking',
          description: 'Track mouse movements, clicks, and scroll patterns for productivity analysis'
        },
        {
          icon: KeyRound,
          title: 'Keystroke Logging',
          description: 'Secure keylogger with encrypted storage and privacy compliance'
        },
        {
          icon: Timer,
          title: 'Idle Time Detection',
          description: 'Automatic idle time tracking with customizable thresholds'
        }
      ],
      security: [
        {
          icon: Globe,
          title: 'Website Control',
          description: 'Whitelist/blacklist websites with real-time blocking and notifications'
        },
        {
          icon: ShieldX,
          title: 'Incognito & VPN Block',
          description: 'Prevent private browsing and VPN usage for security compliance'
        },
        {
          icon: Laptop,
          title: 'Application Control',
          description: 'Manage allowed/blocked applications with detailed usage reports'
        },
        {
          icon: Ban,
          title: 'Command Restrictions',
          description: 'Block dangerous system commands and unauthorized software installations'
        }
      ],
      analytics: [
        {
          icon: BarChart3,
          title: 'Daily Reports',
          description: 'Comprehensive daily productivity reports with visual analytics'
        },
        {
          icon: Mail,
          title: 'Email Reports',
          description: 'Automated email reports with customizable frequency and recipients'
        },
        {
          icon: MessageSquare,
          title: 'SMS Alerts',
          description: 'Instant SMS notifications for policy violations and critical events'
        },
        {
          icon: CloudUpload,
          title: 'Web Dashboard',
          description: 'Premium cloud dashboard for remote monitoring and management'
        }
      ]
    },
    specifications: [
      { label: 'Platforms', value: 'Windows Only' },
      { label: 'Deployment', value: 'Cloud, On-premise, Hybrid' },
      { label: 'Data Encryption', value: 'AES-256' },
      { label: 'Privacy Compliance', value: 'GDPR, CCPA Ready' },
      { label: 'API Access', value: 'RESTful API' },
      { label: 'Storage', value: 'Unlimited Cloud Storage' }
    ]
  };

  const plans = [
    {
      name: 'Basic',
      price: '$29',
      originalPrice: '$49',
      period: '/month per user',
      description: 'Essential monitoring for small teams',
      features: [
        'Basic screen monitoring',
        'Activity tracking',
        'Basic website blocking',
        'Daily reports',
        'Email support'
      ],
      limitations: [
        'No screen recording',
        'Limited app control',
        'Basic reporting only'
      ]
    },
    {
      name: 'Professional',
      price: '$89',
      originalPrice: '$149',
      period: '/month per user',
      description: 'Complete monitoring solution for growing businesses',
      features: [
        'Full screen monitoring & recording',
        'Advanced keystroke logging',
        'Complete website & app control',
        'Real-time alerts',
        'Comprehensive daily reports',
        'Email & SMS notifications',
        'Priority support'
      ],
      limitations: [
        'No web dashboard access'
      ],
      popular: true
    },
    {
      name: 'Premium',
      price: '$149',
      originalPrice: '$249',
      period: '/month per user',
      description: 'Enterprise-grade solution with web dashboard',
      features: [
        'Everything in Professional',
        'Web dashboard access',
        'Remote monitoring',
        'Advanced analytics',
        'Custom integrations',
        'API access',
        'Dedicated support',
        'On-premise deployment option'
      ],
      limitations: []
    }
  ];

  const demoFeatures = [
    {
      title: 'Live Screen Monitoring',
      description: 'See real-time employee screens with intelligent blur for sensitive content',
      icon: Monitor,
      color: 'from-blue-500 to-purple-600'
    },
    {
      title: 'Activity Dashboard',
      description: 'Comprehensive overview of productivity metrics and patterns',
      icon: BarChart3,
      color: 'from-green-500 to-teal-600'
    },
    {
      title: 'Security Controls',
      description: 'Manage website access and application permissions',
      icon: Shield,
      color: 'from-red-500 to-pink-600'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'HR Director',
      company: 'TechCorp Inc.',
      content: 'CubiView transformed how we manage remote teams. The insights are incredible and our productivity increased by 40%.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Michael Chen',
      role: 'IT Manager',
      company: 'Digital Solutions',
      content: 'The security features are top-notch. We can finally control web access without compromising employee privacy.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Operations Manager',
      company: 'StartupXYZ',
      content: 'The web dashboard is a game-changer. I can monitor our distributed team from anywhere in the world.',
      rating: 5,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
    }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 lg:pt-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div 
              className="text-center lg:text-left"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center lg:justify-start mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="ml-2 text-gray-600 font-medium">
                  {product.rating} ({product.totalReviews.toLocaleString()} reviews)
                </span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-thin text-gray-900 mb-4 tracking-tight">
                {product.name}
              </h1>
              
              <p className="text-xl lg:text-2xl text-gray-600 font-light mb-6">
                {product.tagline}
              </p>
              
              <p className="text-lg text-gray-600 mb-8 leading-relaxed max-w-xl font-light">
                {product.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <motion.button
                  className="px-8 py-4 bg-gray-900 text-white rounded-full font-medium text-lg hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Free Trial
                </motion.button>
                <motion.button
                  className="px-8 py-4 border border-gray-300 text-gray-700 rounded-full font-medium text-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Play className="w-5 h-5 mr-2" />
                  Watch Demo
                </motion.button>
              </div>

              <div className="flex items-center justify-center lg:justify-start mt-8 space-x-8 text-sm text-gray-500">
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {product.customers} companies
                </div>
                <div className="flex items-center">
                  <Monitor className="w-4 h-4 mr-1" />
                  {product.companiesTracked} deployments
                </div>
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-1" />
                  {product.uptime} uptime
                </div>
              </div>
            </motion.div>

            {/* Right Content - Product Showcase */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="relative">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-gray-200/50">
                  <img
                    src={product.gallery[selectedImageIndex]}
                    alt={product.name}
                    className="w-full h-96 object-cover rounded-2xl"
                  />
                  
                  {/* Floating Feature Cards - More minimalistic */}
                  <motion.div 
                    className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-200/50"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Camera className="w-8 h-8 text-gray-700 mb-2" />
                    <p className="text-sm font-medium text-gray-800">Live Monitoring</p>
                    <p className="text-xs text-gray-500">Real-time capture</p>
                  </motion.div>
                  
                  <motion.div 
                    className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg border border-gray-200/50"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                  >
                    <BarChart3 className="w-8 h-8 text-gray-700 mb-2" />
                    <p className="text-sm font-medium text-gray-800">Analytics</p>
                    <p className="text-xs text-gray-500">Live insights</p>
                  </motion.div>
                </div>
                
                {/* Image Navigation - More minimalistic */}
                <div className="flex justify-center mt-6 space-x-2">
                  {product.gallery.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === selectedImageIndex ? 'bg-gray-800 w-8' : 'bg-gray-300'
                      }`}
                      onClick={() => setSelectedImageIndex(index)}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { label: 'Active Users', value: '50K+', icon: Users },
              { label: 'Data Points/Day', value: '1M+', icon: Database },
              { label: 'Security Prevention', value: '99.9%', icon: Shield },
              { label: 'Productivity Gain', value: '40%', icon: TrendingUp }
            ].map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center"
                variants={fadeInUp}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-gray-700" />
                </div>
                <div className="text-3xl font-light text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600 font-light text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-4xl font-thin text-gray-900 mb-4">
              Complete Employee Monitoring Suite
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Every tool you need to monitor, secure, and optimize your workforce productivity in one intelligent platform.
            </p>
          </motion.div>

          {/* Feature Tabs */}
          <div className="flex justify-center mb-12">
            <div className="bg-gray-100/80 backdrop-blur-sm rounded-full p-2 inline-flex">
              {Object.keys(product.features).map((tab) => (
                <button
                  key={tab}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeFeatureTab === tab
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                  onClick={() => setActiveFeatureTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Feature Grid */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            key={activeFeatureTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {product.features[activeFeatureTab].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-gray-700" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed font-light">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-4xl font-thin text-gray-900 mb-4">
              See CubiView in Action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Experience the power of comprehensive employee monitoring with our interactive demo.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {demoFeatures.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-gray-700" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 mb-6 font-light">{feature.description}</p>
                <button className="text-gray-900 font-medium hover:text-gray-700 transition-colors flex items-center">
                  Try Demo <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Interactive Demo Component */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200/50 overflow-hidden">
              {/* CubiView Demo Dashboard */}
              <div className="p-8">
                <div className="bg-gray-900 rounded-2xl p-6 text-white">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-medium">CubiView Dashboard</h3>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      <span className="text-sm text-gray-300">Live Monitoring</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Screen Monitoring */}
                    <div className="bg-gray-800 rounded-xl p-4">
                      <div className="flex items-center mb-3">
                        <Monitor className="w-5 h-5 text-blue-400 mr-2" />
                        <span className="text-sm font-medium">Screen Activity</span>
                      </div>
                      <div className="bg-gray-700 rounded-lg h-24 mb-3 flex items-center justify-center">
                        <Camera className="w-8 h-8 text-gray-400" />
                      </div>
                      <div className="text-xs text-gray-300">Last capture: 2s ago</div>
                    </div>
                    
                    {/* Productivity Stats */}
                    <div className="bg-gray-800 rounded-xl p-4">
                      <div className="flex items-center mb-3">
                        <BarChart3 className="w-5 h-5 text-green-400 mr-2" />
                        <span className="text-sm font-medium">Productivity</span>
                      </div>
                      <div className="text-2xl font-bold text-green-400 mb-1">87%</div>
                      <div className="text-xs text-gray-300">+12% from yesterday</div>
                    </div>
                    
                    {/* Security Status */}
                    <div className="bg-gray-800 rounded-xl p-4">
                      <div className="flex items-center mb-3">
                        <Shield className="w-5 h-5 text-yellow-400 mr-2" />
                        <span className="text-sm font-medium">Security</span>
                      </div>
                      <div className="text-xs text-gray-300 mb-2">3 blocked sites today</div>
                      <div className="text-xs text-green-400">All policies enforced</div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-gray-700">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-300">Active Employees: 24/25</span>
                      <span className="text-gray-300">Uptime: 99.9%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-4xl font-thin text-gray-900 mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
              Flexible pricing options to match your organization's needs, from small teams to enterprise deployments.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                className={`relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-200/50 ${
                  plan.popular ? 'ring-2 ring-gray-900 scale-105' : ''
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gray-900 text-white text-center py-2 text-sm font-medium">
                    Most Popular
                  </div>
                )}
                
                <div className={`p-8 ${plan.popular ? 'pt-16' : ''}`}>
                  <h3 className="text-2xl font-medium text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6 font-light">{plan.description}</p>
                  
                  <div className="mb-6">
                    <div className="flex items-baseline">
                      <span className="text-4xl font-light text-gray-900">{plan.price}</span>
                      <span className="text-gray-500 ml-1 font-light">{plan.period}</span>
                    </div>
                    <div className="text-sm text-gray-500 line-through font-light">{plan.originalPrice}{plan.period}</div>
                  </div>
                  
                  <button className={`w-full py-4 rounded-full font-medium text-lg transition-colors mb-8 ${
                    plan.popular
                      ? 'bg-gray-900 text-white hover:bg-gray-800'
                      : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                  }`}>
                    Start Free Trial
                  </button>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium text-gray-900">Included features:</h4>
                    {plan.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-gray-600 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 font-light">{feature}</span>
                      </div>
                    ))}
                    
                    {plan.limitations.length > 0 && (
                      <div className="pt-4 border-t border-gray-100">
                        <h4 className="font-medium text-gray-900 mb-3">Limitations:</h4>
                        {plan.limitations.map((limitation, limitationIndex) => (
                          <div key={limitationIndex} className="flex items-start">
                            <X className="w-5 h-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-500 font-light">{limitation}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See what our customers say about transforming their workforce productivity with CubiView.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.role}, {testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            {...fadeInUp}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Technical Specifications
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Enterprise-grade infrastructure with the highest security and compliance standards.
            </p>
          </motion.div>

          <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">System Requirements</h3>
                <div className="space-y-6">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="font-medium text-gray-600">{spec.label}</span>
                      <span className="font-semibold text-gray-900">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-12 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mb-6 mx-auto">
                    <Monitor className="w-16 h-16 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-2">Enterprise Ready</h4>
                  <p className="text-gray-600">Scalable architecture for organizations of any size</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-thin text-white mb-4">
              Ready to Transform Your Workforce?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto font-light">
              Join thousands of companies using CubiView to enhance productivity, ensure security, and gain valuable workforce insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-gray-900 rounded-full font-medium text-lg hover:bg-gray-100 transition-colors shadow-lg">
                Start 30-Day Free Trial
              </button>
              <button className="px-8 py-4 border border-gray-600 text-white rounded-full font-medium text-lg hover:bg-gray-800 transition-colors">
                Schedule Demo
              </button>
            </div>
            <p className="text-gray-400 mt-4 text-sm font-light">No credit card required • Full features included • Cancel anytime</p>
          </motion.div>
        </div>
      </section>

      <FooterApple />
    </div>
  );
};

export default CubiViewProductPage;
