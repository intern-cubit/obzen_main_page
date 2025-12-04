import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

import connectDB from './config/database.js';
import Admin from './models/Admin.js';

// Import routes
import authRoutes from './routes/auth.js';
import heroRoutes from './routes/hero.js';
import aboutRoutes from './routes/about.js';
import serviceRoutes from './routes/services.js';
import reviewRoutes from './routes/reviews.js';
import contactRoutes from './routes/contact.js';
import uploadRoutes from './routes/upload.js';

// Import e-commerce routes
import userRoutes from './routes/users.js';
import productsRoutes from './routes/products.js';
import orderRoutes from './routes/orders.js';
import deviceRoutes from './routes/devices.js';
import sadminRoutes from './routes/sadmin.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB(); 

// Middleware
app.use(helmet());
app.use(cors({
  origin: [
    'https://obzentechnolabs.com',
    'https://www.obzentechnolabs.com',
    'http://localhost:5173',
    'http://localhost:3000'
  ],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 100 : 1000 // More lenient in development
});
app.use(limiter);

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Request logging middleware (for debugging)
app.use((req, res, next) => {
  console.log(`${req.method} ${req.originalUrl} - ${new Date().toISOString()}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/hero', heroRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/upload', uploadRoutes);

// E-commerce routes
app.use('/api/users', userRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/devices', deviceRoutes);
app.use('/api/sadmin', sadminRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Server is healthy',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!'
  });
});

// 404 handler
app.use('*', (req, res) => {
  console.log(`404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
    availableRoutes: [
      'GET /api/products',
      'GET /api/products/categories', 
      'GET /api/products/featured',
      'GET /api/products/search',
      'GET /api/products/:id',
      'POST /api/sadmin/check-activation',
      'POST /api/sadmin/activate'
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
