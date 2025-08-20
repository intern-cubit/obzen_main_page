import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/Product.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const sampleProducts = [
  {
    title: 'CuBIT IoT Pro',
    subtitle: 'Professional IoT Development Kit',
    description: 'Complete IoT development solution with advanced sensors, wireless connectivity, and cloud integration capabilities. Perfect for prototyping and production-ready IoT applications.',
    price: 299,
    originalPrice: 349,
    category: 'IoT Development',
    brand: 'CuBIT',
    sku: 'CUBIT-IOT-001',
    seoUrl: 'cubit-iot-pro',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop&crop=center',
    gallery: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800&h=600&fit=crop'
    ],
    features: [
      'WiFi & Bluetooth Connectivity',
      'Multiple Sensor Integration',
      'Cloud Platform Access',
      'Real-time Data Monitoring',
      'Mobile App Support',
      'Open Source Software'
    ],
    specifications: {
      'Processor': 'ESP32 Dual-Core',
      'Memory': '520KB SRAM, 4MB Flash',
      'Connectivity': 'WiFi 802.11b/g/n, Bluetooth 4.2',
      'Operating Voltage': '3.3V',
      'GPIO Pins': '30',
      'ADC': '12-bit, 18 channels'
    },
    stock: 50,
    inStock: true,
    rating: {
      average: 4.8,
      count: 124
    },
    badge: 'Best Seller',
    tags: ['iot', 'development', 'sensors', 'wifi', 'bluetooth'],
    shippingClass: 'standard',
    isActive: true,
    isFeatured: true,
    order: 0
  },
  {
    title: 'Smart Home Automation Kit',
    subtitle: 'Complete Home Automation Solution',
    description: 'Transform your home into a smart home with our comprehensive automation kit. Includes smart switches, sensors, and hub for seamless control.',
    price: 199,
    originalPrice: 249,
    category: 'IoT Development',
    brand: 'SmartTech',
    sku: 'ST-HOME-001',
    seoUrl: 'smart-home-automation-kit',
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop&crop=center',
    gallery: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&h=600&fit=crop'
    ],
    features: [
      'Voice Control Compatible',
      'Mobile App Control',
      'Energy Monitoring',
      'Schedule Automation',
      'Remote Access',
      'Easy Installation'
    ],
    specifications: {
      'Hub Connectivity': 'WiFi, Zigbee',
      'Switch Count': '4 Smart Switches',
      'Sensors': '2 Motion, 2 Door/Window',
      'App Support': 'iOS & Android',
      'Voice Assistant': 'Alexa, Google Assistant',
      'Range': 'Up to 100m'
    },
    stock: 35,
    inStock: true,
    rating: {
      average: 4.6,
      count: 89
    },
    badge: 'New',
    tags: ['smart-home', 'automation', 'voice-control'],
    shippingClass: 'standard',
    isActive: true,
    isFeatured: true,
    order: 1
  },
  {
    title: 'Industrial IoT Gateway',
    subtitle: 'Enterprise-Grade IoT Solution',
    description: 'Professional IoT gateway for industrial applications with rugged design, multiple protocol support, and edge computing capabilities.',
    price: 599,
    originalPrice: 699,
    category: 'IoT Development',
    brand: 'IndusTech',
    sku: 'IT-GATEWAY-001',
    seoUrl: 'industrial-iot-gateway',
    backgroundImage: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=1200&h=800&fit=crop&crop=center',
    gallery: [
      'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&h=600&fit=crop'
    ],
    features: [
      'Multiple Protocol Support',
      'Edge Computing',
      'Rugged IP67 Design',
      'Remote Management',
      'Data Analytics',
      '4G/5G Connectivity'
    ],
    specifications: {
      'Processor': 'ARM Cortex-A72',
      'Memory': '4GB RAM, 32GB Storage',
      'Protocols': 'Modbus, MQTT, OPC-UA',
      'Connectivity': '4G/5G, WiFi, Ethernet',
      'Operating Temp': '-40°C to +70°C',
      'Power': '12-48V DC'
    },
    stock: 15,
    inStock: true,
    rating: {
      average: 4.9,
      count: 42
    },
    badge: 'Limited',
    tags: ['industrial', 'gateway', 'enterprise', 'rugged'],
    shippingClass: 'express',
    isActive: true,
    isFeatured: true,
    order: 2
  },
  {
    title: 'MailStorm Pro',
    subtitle: 'Advanced Email Marketing Platform',
    description: 'Powerful email marketing automation tool with advanced analytics, A/B testing, and personalization features for growing businesses.',
    price: 89,
    originalPrice: 129,
    category: 'Marketing Tools',
    brand: 'CuBIT',
    sku: 'CUBIT-MAIL-001',
    seoUrl: 'mailstorm-pro',
    backgroundImage: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=1200&h=800&fit=crop&crop=center',
    gallery: [
      'https://images.unsplash.com/photo-1555421689-491a97ff2040?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&h=600&fit=crop'
    ],
    features: [
      'Drag & Drop Email Builder',
      'Advanced Analytics',
      'A/B Testing',
      'Automation Workflows',
      'Segmentation',
      'API Integration'
    ],
    specifications: {
      'Monthly Emails': 'Up to 50,000',
      'Subscribers': 'Unlimited',
      'Templates': '500+ Professional',
      'Integrations': '200+ Apps',
      'Support': '24/7 Chat & Email',
      'Reports': 'Real-time Analytics'
    },
    stock: 100,
    inStock: true,
    rating: {
      average: 4.7,
      count: 156
    },
    badge: 'Sale',
    tags: ['email-marketing', 'automation', 'analytics'],
    shippingClass: 'standard',
    isActive: true,
    isFeatured: true,
    order: 3
  },
  {
    title: 'WA Bomb Business',
    subtitle: 'WhatsApp Marketing Automation',
    description: 'Revolutionary WhatsApp marketing platform for businesses to reach customers effectively with automated messaging and analytics.',
    price: 149,
    originalPrice: 199,
    category: 'Marketing Tools',
    brand: 'CuBIT',
    sku: 'CUBIT-WA-001',
    seoUrl: 'wa-bomb-business',
    backgroundImage: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=800&fit=crop&crop=center',
    gallery: [
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&h=600&fit=crop'
    ],
    features: [
      'Bulk Message Broadcasting',
      'Contact Management',
      'Message Templates',
      'Delivery Analytics',
      'Auto-Reply System',
      'Group Management'
    ],
    specifications: {
      'Daily Messages': 'Up to 10,000',
      'Contacts': 'Unlimited',
      'Templates': 'Custom & Pre-built',
      'Analytics': 'Detailed Reports',
      'Support': 'WhatsApp & Email',
      'API': 'RESTful API Access'
    },
    stock: 75,
    inStock: true,
    rating: {
      average: 4.5,
      count: 203
    },
    badge: 'Limited',
    tags: ['whatsapp', 'marketing', 'automation', 'messaging'],
    shippingClass: 'standard',
    isActive: true,
    isFeatured: true,
    order: 4
  },
  {
    title: 'CubiView Analytics',
    subtitle: 'Business Intelligence Dashboard',
    description: 'Comprehensive business analytics platform with real-time dashboards, custom reports, and data visualization tools.',
    price: 249,
    originalPrice: 299,
    category: 'Analytics Platforms',
    brand: 'CuBIT',
    sku: 'CUBIT-VIEW-001',
    seoUrl: 'cubiview-analytics',
    backgroundImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&crop=center',
    gallery: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&h=600&fit=crop'
    ],
    features: [
      'Real-time Dashboards',
      'Custom Reports',
      'Data Visualization',
      'Multi-source Integration',
      'Collaborative Features',
      'Mobile Access'
    ],
    specifications: {
      'Data Sources': '100+ Integrations',
      'Users': 'Unlimited',
      'Storage': '1TB Included',
      'Updates': 'Real-time',
      'Export': 'PDF, Excel, CSV',
      'API': 'Full REST API'
    },
    stock: 60,
    inStock: true,
    rating: {
      average: 4.8,
      count: 78
    },
    badge: 'New',
    tags: ['analytics', 'dashboard', 'reporting', 'data-visualization'],
    shippingClass: 'standard',
    isActive: true,
    isFeatured: true,
    order: 5
  },
  {
    title: 'Smart Sensor Network Kit',
    subtitle: 'Wireless Sensor Deployment Solution',
    description: 'Complete wireless sensor network kit for environmental monitoring, asset tracking, and data collection applications.',
    price: 399,
    originalPrice: 449,
    category: 'IoT Development',
    brand: 'SensorTech',
    sku: 'ST-SENSOR-001',
    seoUrl: 'smart-sensor-network-kit',
    backgroundImage: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=1200&h=800&fit=crop&crop=center',
    gallery: [
      'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=800&h=600&fit=crop'
    ],
    features: [
      'Multiple Sensor Types',
      'Long Range Communication',
      'Low Power Design',
      'Cloud Integration',
      'Real-time Monitoring',
      'Easy Deployment'
    ],
    specifications: {
      'Range': 'Up to 10km',
      'Battery Life': '5+ Years',
      'Sensors': 'Temp, Humidity, Motion, Light',
      'Protocol': 'LoRaWAN',
      'Gateway': 'Included',
      'Nodes': '10 Sensor Nodes'
    },
    stock: 25,
    inStock: true,
    rating: {
      average: 4.6,
      count: 45
    },
    tags: ['sensors', 'wireless', 'monitoring', 'lorawan'],
    shippingClass: 'standard',
    isActive: true,
    isFeatured: false,
    order: 6
  },
  {
    title: 'Social Media Manager Pro',
    subtitle: 'All-in-One Social Media Tool',
    description: 'Comprehensive social media management platform for scheduling, analytics, and engagement across all major platforms.',
    price: 79,
    originalPrice: 99,
    category: 'Marketing Tools',
    brand: 'SocialPro',
    sku: 'SP-SOCIAL-001',
    seoUrl: 'social-media-manager-pro',
    backgroundImage: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=800&fit=crop&crop=center',
    gallery: [
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop'
    ],
    features: [
      'Multi-Platform Posting',
      'Content Calendar',
      'Analytics & Reporting',
      'Team Collaboration',
      'Content Library',
      'Hashtag Research'
    ],
    specifications: {
      'Platforms': 'Facebook, Instagram, Twitter, LinkedIn',
      'Posts per Month': 'Unlimited',
      'Accounts': 'Up to 10',
      'Team Members': '5 Users',
      'Storage': '100GB',
      'Support': 'Email & Chat'
    },
    stock: 150,
    inStock: true,
    rating: {
      average: 4.4,
      count: 267
    },
    tags: ['social-media', 'marketing', 'scheduling', 'analytics'],
    shippingClass: 'standard',
    isActive: true,
    isFeatured: false,
    order: 7
  },
  {
    title: 'Data Analytics Suite',
    subtitle: 'Enterprise Data Analysis Platform',
    description: 'Advanced data analytics platform with machine learning capabilities, predictive modeling, and comprehensive reporting tools.',
    price: 499,
    originalPrice: 599,
    category: 'Analytics Platforms',
    brand: 'DataCorp',
    sku: 'DC-ANALYTICS-001',
    seoUrl: 'data-analytics-suite',
    backgroundImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&crop=center',
    gallery: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop'
    ],
    features: [
      'Machine Learning Models',
      'Predictive Analytics',
      'Data Visualization',
      'ETL Pipeline',
      'Custom Algorithms',
      'API Integration'
    ],
    specifications: {
      'Processing': 'Big Data Capable',
      'ML Models': '50+ Pre-built',
      'Visualizations': '100+ Chart Types',
      'Storage': '10TB Included',
      'Users': 'Unlimited',
      'Support': '24/7 Premium'
    },
    stock: 20,
    inStock: true,
    rating: {
      average: 4.9,
      count: 34
    },
    badge: 'Sale',
    tags: ['data-analytics', 'machine-learning', 'enterprise', 'big-data'],
    shippingClass: 'standard',
    isActive: true,
    isFeatured: false,
    order: 8
  }
];

const seedProducts = async () => {
  try {
    await connectDB();
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Existing products cleared');
    
    // Insert sample products
    const insertedProducts = await Product.insertMany(sampleProducts);
    console.log(`${insertedProducts.length} products seeded successfully!`);
    
    // Log some details
    console.log('Products added:');
    insertedProducts.forEach(product => {
      console.log(`- ${product.title} (${product.category}) - $${product.price}`);
    });
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
