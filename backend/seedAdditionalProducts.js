import mongoose from 'mongoose';
import './config/database.js';
import Product from './models/Product.js';

const additionalProducts = [
  // Tech Gadgets
  {
    title: "Smart Home Hub Pro",
    subtitle: "Control your entire home with voice commands",
    description: "The Smart Home Hub Pro is the central command center for your connected home. With advanced AI integration and support for over 10,000 devices, it makes home automation simple and intuitive. Features include voice control, mobile app management, and advanced security protocols.",
    price: 299,
    originalPrice: 399,
    category: "Smart Home",
    subcategory: "Hub Devices",
    brand: "TechFlow",
    sku: "SHH-PRO-001",
    backgroundImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=300&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1573804633927-bfcbcd909acd?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1545987796-200677ee1011?w=500&h=300&fit=crop"
    ],
    features: [
      "Voice Control Support",
      "10,000+ Compatible Devices",
      "Advanced Security",
      "Mobile App Integration",
      "AI-Powered Automation",
      "Energy Monitoring"
    ],
    specifications: {
      "Connectivity": "Wi-Fi 6, Bluetooth 5.0, Zigbee",
      "Voice Assistants": "Alexa, Google Assistant, Siri",
      "Power": "12V DC Adapter",
      "Dimensions": "8 x 8 x 2 inches",
      "Weight": "1.2 lbs",
      "Warranty": "2 years"
    },
    variants: [
      { name: "Standard", price: 299, stock: 50 },
      { name: "Pro with Backup", price: 399, stock: 30 }
    ],
    stock: 80,
    inStock: true,
    rating: { average: 4.7, count: 234 },
    isFeatured: true,
    isActive: true,
    seoUrl: "smart-home-hub-pro",
    metaTitle: "Smart Home Hub Pro - Complete Home Automation",
    metaDescription: "Transform your house into a smart home with our advanced hub supporting 10,000+ devices"
  },
  
  {
    title: "Wireless Charging Station",
    subtitle: "Charge up to 4 devices simultaneously",
    description: "Say goodbye to cable clutter with our premium wireless charging station. Designed with Qi-compatible technology, it can charge smartphones, earbuds, smartwatches, and tablets all at once. The sleek design includes LED indicators and temperature control for safe charging.",
    price: 89,
    originalPrice: 129,
    category: "Electronics",
    subcategory: "Chargers",
    brand: "PowerMax",
    sku: "WCS-QUAD-001",
    backgroundImage: "https://images.unsplash.com/photo-1609692814858-61dd618f7a9b?w=500&h=300&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1609692814858-61dd618f7a9b?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=500&h=300&fit=crop"
    ],
    features: [
      "4-Device Charging",
      "Qi-Compatible",
      "LED Status Indicators",
      "Temperature Control",
      "Non-Slip Base",
      "Fast Charging Support"
    ],
    specifications: {
      "Input": "24V/2A",
      "Output": "15W per device",
      "Compatibility": "Qi-enabled devices",
      "Dimensions": "12 x 6 x 1 inches",
      "Weight": "1.5 lbs",
      "Certification": "FCC, CE, RoHS"
    },
    stock: 120,
    inStock: true,
    rating: { average: 4.4, count: 189 },
    isFeatured: false,
    isActive: true,
    seoUrl: "wireless-charging-station-quad"
  },

  {
    title: "4K Action Camera",
    subtitle: "Capture life's adventures in stunning detail",
    description: "Built for adventure enthusiasts, this 4K action camera delivers professional-quality video and photos in any environment. With advanced image stabilization, waterproof housing, and multiple mounting options, it's perfect for extreme sports, travel, and everyday moments.",
    price: 199,
    originalPrice: 299,
    category: "Cameras",
    subcategory: "Action Cameras",
    brand: "AdventurePro",
    sku: "AC4K-ADV-001",
    backgroundImage: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=300&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&h=300&fit=crop"
    ],
    features: [
      "4K 60fps Video",
      "20MP Photos",
      "Image Stabilization",
      "Waterproof to 30m",
      "Voice Control",
      "Live Streaming",
      "Multiple Mounting Options"
    ],
    specifications: {
      "Video Resolution": "4K@60fps, 2.7K@120fps",
      "Photo Resolution": "20MP",
      "Display": "2-inch touchscreen",
      "Battery": "1350mAh removable",
      "Storage": "microSD up to 512GB",
      "Connectivity": "Wi-Fi, Bluetooth"
    },
    variants: [
      { name: "Basic Bundle", price: 199, stock: 45 },
      { name: "Pro Bundle with Accessories", price: 299, stock: 25 }
    ],
    stock: 70,
    inStock: true,
    rating: { average: 4.6, count: 156 },
    isFeatured: true,
    isActive: true,
    seoUrl: "4k-action-camera-adventurepro"
  },

  // Home & Living
  {
    title: "Smart Air Purifier",
    subtitle: "Breathe cleaner air with intelligent monitoring",
    description: "Our smart air purifier uses advanced HEPA filtration and UV-C light to remove 99.97% of airborne particles, allergens, and bacteria. With smartphone app control, real-time air quality monitoring, and whisper-quiet operation, it's perfect for bedrooms, offices, and living spaces.",
    price: 249,
    originalPrice: 329,
    category: "Home Appliances",
    subcategory: "Air Purifiers",
    brand: "CleanAir",
    sku: "SAP-HEPA-001",
    backgroundImage: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&h=300&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1563298723-dcfebaa392e3?w=500&h=300&fit=crop"
    ],
    features: [
      "HEPA H13 Filter",
      "UV-C Sterilization",
      "Smart App Control",
      "Air Quality Sensor",
      "Sleep Mode",
      "Filter Replacement Indicator",
      "Voice Control Compatible"
    ],
    specifications: {
      "Coverage Area": "500 sq ft",
      "CADR": "300 m³/h",
      "Noise Level": "25-50 dB",
      "Power": "45W",
      "Dimensions": "14 x 14 x 24 inches",
      "Filter Life": "6-12 months"
    },
    stock: 65,
    inStock: true,
    rating: { average: 4.5, count: 203 },
    isFeatured: false,
    isActive: true,
    seoUrl: "smart-air-purifier-hepa"
  },

  {
    title: "Ergonomic Office Chair",
    subtitle: "Premium comfort for all-day productivity",
    description: "Designed by ergonomic experts, this office chair provides superior lumbar support and adjustability for maximum comfort during long work sessions. Features include breathable mesh back, adjustable armrests, and high-quality materials built to last.",
    price: 399,
    originalPrice: 599,
    category: "Furniture",
    subcategory: "Office Chairs",
    brand: "ComfortMax",
    sku: "EOC-MESH-001",
    backgroundImage: "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=500&h=300&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1541558869434-2840d308329a?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=500&h=300&fit=crop"
    ],
    features: [
      "Lumbar Support",
      "Breathable Mesh",
      "Adjustable Armrests",
      "360° Swivel",
      "Height Adjustment",
      "Tilt Mechanism",
      "Weight Capacity 300lbs"
    ],
    specifications: {
      "Seat Height": "17-21 inches",
      "Back Height": "26 inches",
      "Seat Depth": "20 inches",
      "Materials": "Mesh, Aluminum, Foam",
      "Assembly": "Required",
      "Warranty": "5 years"
    },
    variants: [
      { name: "Black Mesh", price: 399, stock: 30 },
      { name: "Gray Mesh", price: 399, stock: 25 },
      { name: "Executive Leather", price: 599, stock: 15 }
    ],
    stock: 70,
    inStock: true,
    rating: { average: 4.8, count: 267 },
    isFeatured: true,
    isActive: true,
    seoUrl: "ergonomic-office-chair-mesh"
  },

  // Fashion & Accessories
  {
    title: "Smartwatch Pro Series",
    subtitle: "Your health and fitness companion",
    description: "The latest smartwatch with advanced health monitoring, GPS tracking, and seamless smartphone integration. Features include ECG monitoring, blood oxygen measurement, sleep tracking, and 7-day battery life. Water-resistant design perfect for active lifestyles.",
    price: 299,
    originalPrice: 399,
    category: "Wearables",
    subcategory: "Smartwatches",
    brand: "TechWear",
    sku: "SW-PRO-001",
    backgroundImage: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=300&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=500&h=300&fit=crop"
    ],
    features: [
      "ECG Monitoring",
      "Blood Oxygen Sensor",
      "GPS Tracking",
      "7-Day Battery",
      "Sleep Tracking",
      "Fitness Modes",
      "Water Resistant",
      "Smart Notifications"
    ],
    specifications: {
      "Display": "1.9-inch AMOLED",
      "Resolution": "484 x 396 pixels",
      "Battery": "7 days typical use",
      "Water Rating": "5ATM + IP68",
      "Connectivity": "Bluetooth 5.0, Wi-Fi",
      "Compatibility": "iOS, Android"
    },
    variants: [
      { name: "Sport Band", price: 299, stock: 40 },
      { name: "Leather Band", price: 349, stock: 30 },
      { name: "Steel Band", price: 399, stock: 20 }
    ],
    stock: 90,
    inStock: true,
    rating: { average: 4.6, count: 341 },
    isFeatured: true,
    isActive: true,
    seoUrl: "smartwatch-pro-series"
  },

  {
    title: "Premium Bluetooth Headphones",
    subtitle: "Studio-quality sound with noise cancellation",
    description: "Experience audio like never before with our premium Bluetooth headphones. Featuring active noise cancellation, high-resolution audio support, and 30-hour battery life. Perfect for music lovers, travelers, and professionals who demand exceptional sound quality.",
    price: 199,
    originalPrice: 299,
    category: "Audio",
    subcategory: "Headphones",
    brand: "AudioMax",
    sku: "BT-PREM-001",
    backgroundImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=300&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=500&h=300&fit=crop"
    ],
    features: [
      "Active Noise Cancellation",
      "30-Hour Battery",
      "Hi-Res Audio",
      "Quick Charge",
      "Multipoint Connection",
      "Voice Assistant",
      "Foldable Design"
    ],
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "4Hz - 40kHz",
      "Battery Life": "30 hours (ANC on)",
      "Charging": "USB-C, 3-hour full charge",
      "Weight": "250g",
      "Codecs": "SBC, AAC, LDAC"
    },
    variants: [
      { name: "Midnight Black", price: 199, stock: 50 },
      { name: "Platinum Silver", price: 219, stock: 35 },
      { name: "Rose Gold", price: 229, stock: 25 }
    ],
    stock: 110,
    inStock: true,
    rating: { average: 4.7, count: 298 },
    isFeatured: false,
    isActive: true,
    seoUrl: "premium-bluetooth-headphones"
  },

  // Sports & Fitness
  {
    title: "Smart Fitness Tracker",
    subtitle: "Track every step of your fitness journey",
    description: "Monitor your daily activities, workouts, and health metrics with our advanced fitness tracker. Features include heart rate monitoring, sleep analysis, smartphone notifications, and 14-day battery life. Water-resistant design suitable for swimming and daily wear.",
    price: 79,
    originalPrice: 129,
    category: "Fitness",
    subcategory: "Activity Trackers",
    brand: "FitLife",
    sku: "FT-SMART-001",
    backgroundImage: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&h=300&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=500&h=300&fit=crop"
    ],
    features: [
      "Heart Rate Monitor",
      "Sleep Tracking",
      "14-Day Battery",
      "50M Water Resistant",
      "Smart Notifications",
      "Multiple Sport Modes",
      "Stress Monitoring"
    ],
    specifications: {
      "Display": "1.1-inch color AMOLED",
      "Sensors": "Heart rate, accelerometer, gyroscope",
      "Battery": "14 days typical use",
      "Water Rating": "5ATM",
      "Connectivity": "Bluetooth 5.0",
      "App": "iOS, Android compatible"
    },
    stock: 150,
    inStock: true,
    rating: { average: 4.3, count: 412 },
    isFeatured: false,
    isActive: true,
    seoUrl: "smart-fitness-tracker"
  },

  // Gaming
  {
    title: "Mechanical Gaming Keyboard",
    subtitle: "Pro-level performance for competitive gaming",
    description: "Elevate your gaming with our premium mechanical keyboard featuring customizable RGB lighting, tactile switches, and programmable macros. Built with aircraft-grade aluminum and designed for millions of keystrokes, it's the perfect choice for serious gamers.",
    price: 159,
    originalPrice: 229,
    category: "Gaming",
    subcategory: "Keyboards",
    brand: "GamePro",
    sku: "MK-GAME-001",
    backgroundImage: "https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?w=500&h=300&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1601445638532-3c6f6c3aa1d6?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&h=300&fit=crop"
    ],
    features: [
      "Mechanical Switches",
      "RGB Backlighting",
      "Programmable Macros",
      "Anti-Ghosting",
      "Aluminum Frame",
      "Detachable Cable",
      "Gaming Mode"
    ],
    specifications: {
      "Switch Type": "Blue/Red/Brown available",
      "Layout": "Full-size 104 keys",
      "Backlighting": "Per-key RGB",
      "Connection": "USB-C to USB-A",
      "Dimensions": "17.3 x 5.1 x 1.4 inches",
      "Weight": "2.8 lbs"
    },
    variants: [
      { name: "Blue Switches", price: 159, stock: 40 },
      { name: "Red Switches", price: 159, stock: 45 },
      { name: "Brown Switches", price: 159, stock: 35 }
    ],
    stock: 120,
    inStock: true,
    rating: { average: 4.8, count: 187 },
    isFeatured: true,
    isActive: true,
    seoUrl: "mechanical-gaming-keyboard"
  },

  {
    title: "Wireless Gaming Mouse",
    subtitle: "Precision and speed for competitive advantage",
    description: "Dominate the competition with our wireless gaming mouse featuring ultra-low latency, customizable DPI settings, and ergonomic design. With 70-hour battery life and premium build quality, it delivers the performance serious gamers demand.",
    price: 89,
    originalPrice: 139,
    category: "Gaming",
    subcategory: "Mice",
    brand: "GamePro",
    sku: "WM-GAME-001",
    backgroundImage: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=300&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=300&fit=crop",
      "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&h=300&fit=crop"
    ],
    features: [
      "Ultra-Low Latency",
      "Customizable DPI",
      "Ergonomic Design",
      "70-Hour Battery",
      "RGB Lighting",
      "Programmable Buttons",
      "Wireless Charging"
    ],
    specifications: {
      "DPI Range": "100-25,600 DPI",
      "Polling Rate": "1000Hz",
      "Battery": "70-hour continuous use",
      "Connectivity": "2.4GHz wireless, USB-C",
      "Buttons": "8 programmable",
      "Weight": "85g"
    },
    stock: 95,
    inStock: true,
    rating: { average: 4.6, count: 223 },
    isFeatured: false,
    isActive: true,
    seoUrl: "wireless-gaming-mouse"
  }
];

const seedAdditionalProducts = async () => {
  try {
    console.log('🌱 Starting to seed additional products...');

    // Clear existing products (optional - remove if you want to keep existing ones)
    // await Product.deleteMany({});
    // console.log('Cleared existing products');

    // Add new products
    const createdProducts = await Product.insertMany(additionalProducts);
    console.log(`✅ Successfully created ${createdProducts.length} additional products`);

    // Display created products
    console.log('\n📦 Created Products:');
    createdProducts.forEach((product, index) => {
      console.log(`${index + 1}. ${product.title} - $${product.price} (${product.category})`);
    });

    console.log('\n🎉 Additional product seeding completed!');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error seeding additional products:', error);
    process.exit(1);
  }
};

// Connect to database and seed
mongoose.connection.once('open', () => {
  console.log('📡 Connected to MongoDB');
  seedAdditionalProducts();
});

mongoose.connection.on('error', (err) => {
  console.error('❌ MongoDB connection error:', err);
  process.exit(1);
});
