// Test database connection and user lookup
import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config();

async function testUserLookup() {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to database');
    
    const userId = '68a5e71811e95775bbeef3a9';
    console.log('Looking for user with ID:', userId);
    
    // Test findById
    const user = await User.findById(userId).select('-password');
    console.log('User found:', !!user);
    
    if (user) {
      console.log('User details:', {
        _id: user._id,
        email: user.email,
        firstName: user.firstName,
        isActive: user.isActive
      });
    } else {
      console.log('User not found in database');
      
      // Let's see what users exist
      const allUsers = await User.find({}, { email: 1, firstName: 1, _id: 1 });
      console.log('All users in database:', allUsers);
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.disconnect();
  }
}

testUserLookup();
