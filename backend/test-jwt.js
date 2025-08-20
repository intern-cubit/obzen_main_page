// Test JWT verification directly
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OGE1ZTcxODExZTk1Nzc1YmJlZWYzYTkiLCJpYXQiOjE3NTU3MDMyNzIsImV4cCI6MTc1ODI5NTI3Mn0.9NYqLgnqNFrFuExX59gjlMhSj4RRR7cbWGpvPvNPv30';

console.log('JWT_SECRET exists:', !!process.env.JWT_SECRET);
console.log('JWT_SECRET length:', process.env.JWT_SECRET?.length);

try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  console.log('Token verification successful:', decoded);
} catch (error) {
  console.error('Token verification failed:', error.message);
}
