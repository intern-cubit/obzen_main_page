import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: 'Let\'s create something extraordinary together.'
  },
  subtitle: {
    type: String,
    required: true,
    default: 'Ready to transform your vision into reality?'
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
    default: '123 Innovation Drive, Tech Valley, CA 94000'
  },
  socialLinks: {
    linkedin: {
      type: String,
      default: 'https://linkedin.com/company/cubit-dynamics'
    },
    twitter: {
      type: String,
      default: 'https://twitter.com/cubitdynamics'
    },
    github: {
      type: String,
      default: 'https://github.com/cubitdynamics'
    }
  }
}, {
  timestamps: true
});

export default mongoose.model('Contact', contactSchema);
