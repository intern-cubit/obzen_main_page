import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    required: true
  },
  features: [{
    type: String
  }],
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

export default mongoose.model('Service', serviceSchema);
