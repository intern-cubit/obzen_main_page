import mongoose from 'mongoose';

const aboutSchema = new mongoose.Schema({
  mainHeading: {
    type: String,
    default: 'Designed by engineers.'
  },
  subHeading: {
    type: String,
    default: 'At CuBIT Dynamics, we create technology that works beautifully.'
  },
  description1: {
    type: String,
    default: 'Our name reflects our expertise — Cu (Copper) represents the foundation of electronics, BIT signifies the digital realm, and Dynamics embodies our innovative spirit. We specialize in creating seamless integration between hardware and software, delivering solutions that are both powerful and elegant.'
  },
  description2: {
    type: String,
    default: 'We blend electronics, software, and AI-driven solutions to transform complex challenges into elegant innovations. From IoT devices to smart automation systems, we\'re shaping the future of technology.'
  },
  imageUrl: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

export default mongoose.model('About', aboutSchema);
