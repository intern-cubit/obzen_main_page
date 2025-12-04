import mongoose from 'mongoose';

const contentSectionSchema = new mongoose.Schema({
  sectionId: {
    type: String,
    required: true
  },
  heading: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    default: 0
  }
}, { _id: false });

const aboutSchema = new mongoose.Schema({
  mainHeading: {
    type: String,
    default: 'Who We Are'
  },
  subHeading: {
    type: String,
    default: 'Obzen Technolabs is a deep-tech company focused on revolutionizing the future of tracking and safety.'
  },
  introDescription: {
    type: String,
    default: 'We are building intelligent, globally scalable solutions that protect people, pets and assets through a powerful blend of advanced hardware design and smart software architectures.'
  },
  contentSections: [contentSectionSchema],
  closingStatement: {
    type: String,
    default: 'We\'re driven by the belief that safety should be universal, effortless and always within reach.'
  },
  imageUrl: {
    type: String,
    default: ''
  },
  // Keep legacy fields for backward compatibility
  description1: {
    type: String,
    default: ''
  },
  description2: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

export default mongoose.model('About', aboutSchema);
