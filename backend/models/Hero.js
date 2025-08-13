import mongoose from 'mongoose';

const heroSchema = new mongoose.Schema({
  videoUrl: {
    type: String,
    required: true,
    default: './TraceLink.mp4'
  }
}, {
  timestamps: true
});

export default mongoose.model('Hero', heroSchema);
