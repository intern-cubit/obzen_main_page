import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: 'Get in touch.'
  },
  subtitle: {
    type: String,
    required: true,
    default: 'Ready to build something extraordinary?'
  },
  description: {
    type: String,
    default: 'Our team is available 24/7 to discuss your project needs. We typically respond within 2 hours during business days.'
  },
  email: {
    type: String,
    required: true,
    default: 'hello@cubitdynamics.com'
  },
  phone: {
    type: String,
    required: true,
    default: '+1 (555) 123-4567'
  },
  address: {
    type: String,
    required: true,
    default: 'Innovation Hub\nTech District, San Francisco'
  },
  workingHours: {
    type: String,
    default: 'Monday - Friday: 9:00 AM - 6:00 PM'
  },
  socialMedia: {
    linkedin: {
      type: String,
      default: 'https://linkedin.com/company/cubit-dynamics'
    },
    twitter: {
      type: String,
      default: 'https://twitter.com/cubitdynamics'
    },
    instagram: {
      type: String,
      default: ''
    },
    facebook: {
      type: String,
      default: ''
    }
  }
}, {
  timestamps: true
});

export default mongoose.model('Contact', contactSchema);
