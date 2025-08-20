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
    backgroundImage: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=800&fit=crop&crop=center',
    gallery: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1563770660941-20978e870e26?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop'
    ],
    features: ['WiFi & Bluetooth 5.0', 'Multiple Sensors', 'Cloud Ready', 'Open Source'],
    stock: 50,
    rating: { average: 4.8, count: 142 },
    badge: 'Best Seller',
    isFeatured: true
  },
  {
    title: 'WA-Bomb Pro',
    subtitle: 'WhatsApp Marketing Automation',
    description: 'Professional WhatsApp campaign management tool for safe, effective marketing automation with CSV import and real-time tracking.',
    price: 49,
    originalPrice: 99,
    category: 'Marketing',
    brand: 'CuBIT',
    sku: 'CUBIT-WA-001',
    backgroundImage: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=1200&h=800&fit=crop&crop=center',
    gallery: [
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop'
    ],
    features: ['Account Safety', 'CSV Import', 'Real-time Tracking', 'Smart Messaging'],
    stock: 100,
    rating: { average: 4.9, count: 847 },
    badge: 'Best Seller',
    isFeatured: true
  },
  {
    title: 'CubiView Dashboard',
    subtitle: 'Analytics & Monitoring Platform',
    description: 'Comprehensive analytics and monitoring solution for IoT devices with real-time data visualization and smart alerts.',
    price: 199,
    originalPrice: 249,
    category: 'Analytics',
    brand: 'CuBIT',
    sku: 'CUBIT-VIEW-001',
    backgroundImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&crop=center',
    gallery: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop'
    ],
    features: ['Real-time Analytics', 'Custom Dashboards', 'Smart Alerts', 'Data Export'],
    stock: 75,
    rating: { average: 4.7, count: 234 },
    badge: 'New',
    isFeatured: true
  },
  {
    title: 'MailStorm Enterprise',
    subtitle: 'Email Marketing Automation',
    description: 'Advanced email marketing platform with automation workflows, A/B testing, and detailed analytics.',
    price: 89,
    originalPrice: 129,
    category: 'Marketing',
    brand: 'CuBIT',
    sku: 'CUBIT-MAIL-001',
    backgroundImage: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=1200&h=800&fit=crop&crop=center',
    gallery: [
      'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop'
    ],
    features: ['Automation Workflows', 'A/B Testing', 'Analytics', 'Template Library'],
    stock: 60,
    rating: { average: 4.6, count: 156 },
    badge: '',
    isFeatured: false
  },
  // Add more products to reach 30+
  {
    title: 'Smart Sensor Kit',
    subtitle: 'Complete Sensor Collection',
    description: 'Comprehensive collection of sensors for IoT projects including temperature, humidity, motion, and light sensors.',
    price: 79,
    originalPrice: 99,
    category: 'IoT Development',
    brand: 'CuBIT',
    sku: 'CUBIT-SENSOR-001',
    backgroundImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1200&h=800&fit=crop',
    features: ['Temperature Sensor', 'Humidity Sensor', 'Motion Detector', 'Light Sensor'],
    stock: 120,
    rating: { average: 4.5, count: 89 },
    badge: '',
    isFeatured: false
  },
  {
    title: 'Development Board Pro',
    subtitle: 'Advanced Microcontroller Board',
    description: 'High-performance development board with built-in WiFi, Bluetooth, and extensive GPIO pins for complex projects.',
    price: 159,
    originalPrice: 199,
    category: 'IoT Development',
    brand: 'CuBIT',
    sku: 'CUBIT-BOARD-001',
    backgroundImage: 'https://images.unsplash.com/photo-1518109715646-8b4b7b5be3a7?w=1200&h=800&fit=crop',
    features: ['WiFi Built-in', 'Bluetooth 5.0', '40 GPIO Pins', 'USB-C Power'],
    stock: 85,
    rating: { average: 4.7, count: 167 },
    badge: '',
    isFeatured: false
  },
  {
    title: 'Cloud Connect Module',
    subtitle: 'IoT Cloud Integration',
    description: 'Easy-to-use cloud connectivity module for seamless IoT device integration with major cloud platforms.',
    price: 45,
    originalPrice: 59,
    category: 'IoT Development',
    brand: 'CuBIT',
    sku: 'CUBIT-CLOUD-001',
    backgroundImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop',
    features: ['Multi-Cloud Support', 'Secure Connection', 'Easy Setup', 'Real-time Sync'],
    stock: 200,
    rating: { average: 4.4, count: 78 },
    badge: '',
    isFeatured: false
  },
  // Continue adding more products...
];

// Add more products to reach 30+ total
const additionalProducts = [];

// Generate more IoT products
for (let i = 1; i <= 10; i++) {
  additionalProducts.push({
    title: `IoT Starter Kit ${i}`,
    subtitle: `Beginner IoT Development Kit ${i}`,
    description: `Perfect starter kit for IoT beginners with essential components and easy-to-follow tutorials. Kit ${i} focuses on specific IoT applications.`,
    price: 39 + (i * 5),
    originalPrice: 59 + (i * 5),
    category: 'IoT Development',
    brand: 'CuBIT',
    sku: `CUBIT-START-${String(i).padStart(3, '0')}`,
    backgroundImage: `https://images.unsplash.com/photo-15181${ (i % 5) + 1}0000000-${Math.random().toString(36).substr(2, 9)}?w=1200&h=800&fit=crop`,
    features: ['Beginner Friendly', 'Complete Kit', 'Tutorials Included', 'Support Available'],
    stock: Math.floor(Math.random() * 100) + 20,
    rating: { average: parseFloat((4.0 + Math.random()).toFixed(1)), count: Math.floor(Math.random() * 200) + 10 },
    badge: i % 3 === 0 ? 'Sale' : '',
    isFeatured: i <= 3
  });
}

// Generate marketing tools
for (let i = 1; i <= 8; i++) {
  additionalProducts.push({
    title: `Marketing Tool ${i}`,
    subtitle: `Advanced Marketing Solution ${i}`,
    description: `Comprehensive marketing automation tool designed for modern businesses. Tool ${i} specializes in specific marketing channels.`,
    price: 29 + (i * 10),
    originalPrice: 49 + (i * 10),
    category: 'Marketing',
    brand: 'CuBIT',
    sku: `CUBIT-MKT-${String(i).padStart(3, '0')}`,
    backgroundImage: `https://images.unsplash.com/photo-15630${ (i % 4) + 1}0000000-${Math.random().toString(36).substr(2, 9)}?w=1200&h=800&fit=crop`,
    features: ['Automation', 'Analytics', 'Multi-Channel', 'Easy Integration'],
    stock: Math.floor(Math.random() * 150) + 30,
    rating: { average: parseFloat((4.0 + Math.random()).toFixed(1)), count: Math.floor(Math.random() * 300) + 20 },
    badge: i % 4 === 0 ? 'Limited' : '',
    isFeatured: i <= 2
  });
}

// Generate analytics products
for (let i = 1; i <= 7; i++) {
  additionalProducts.push({
    title: `Analytics Pro ${i}`,
    subtitle: `Data Analytics Platform ${i}`,
    description: `Professional data analytics and visualization platform. Pro ${i} offers specialized analytics for different business needs.`,
    price: 99 + (i * 20),
    originalPrice: 149 + (i * 20),
    category: 'Analytics',
    brand: 'CuBIT',
    sku: `CUBIT-ANALYTICS-${String(i).padStart(3, '0')}`,
    backgroundImage: `https://images.unsplash.com/photo-15512${ (i % 6) + 1}0000000-${Math.random().toString(36).substr(2, 9)}?w=1200&h=800&fit=crop`,
    features: ['Advanced Analytics', 'Custom Reports', 'Real-time Data', 'AI Insights'],
    stock: Math.floor(Math.random() * 80) + 15,
    rating: { average: parseFloat((4.2 + Math.random() * 0.7).toFixed(1)), count: Math.floor(Math.random() * 150) + 25 },
    badge: i % 5 === 0 ? 'New' : '',
    isFeatured: i <= 1
  });
}

const allProducts = [...sampleProducts, ...additionalProducts];

const seedProducts = async () => {
  try {
    await connectDB();
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Existing products cleared');
    
    // Insert new products
    await Product.insertMany(allProducts);
    console.log(`${allProducts.length} products inserted successfully`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding products:', error);
    process.exit(1);
  }
};

seedProducts();
