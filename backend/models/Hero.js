import mongoose from 'mongoose';

const heroSchema = new mongoose.Schema({
  mediaUrl: {
    type: String,
    required: true,
    default: './TraceLink.mp4'
  },
  mediaType: {
    type: String,
    enum: ['video', 'image'],
    required: true,
    default: 'video'
  },
  videoUrl: {
    type: String,
    default: './TraceLink.mp4'
  }
}, {
  timestamps: true
});

// Pre-save middleware to maintain backward compatibility
heroSchema.pre('save', function(next) {
  // If mediaUrl is being set and it's a video, also set videoUrl
  if (this.mediaType === 'video' && this.mediaUrl) {
    this.videoUrl = this.mediaUrl;
  }
  next();
});

export default mongoose.model('Hero', heroSchema);
