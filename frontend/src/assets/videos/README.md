# Video Assets

## TraceLink.mp4

Place your TraceLink.mp4 video file in this directory for the hero section background.

### Video Requirements:
- **Format**: MP4 (H.264 codec recommended)
- **Resolution**: 1920x1080 or higher for best quality
- **Duration**: 10-30 seconds (will loop automatically)
- **File Size**: Optimized for web (recommended under 10MB)
- **Content**: Should be suitable for background display with text overlay

### Usage:
The video is referenced in the Hero component at:
`/src/components/Hero.jsx`

The video element uses:
```html
<source src="/src/assets/videos/TraceLink.mp4" type="video/mp4" />
```

### Optimization Tips:
- Use web-optimized video formats
- Consider creating multiple resolutions for different devices
- Add a poster image for better loading experience
- Ensure the video content works well as a background element

### Alternative:
If TraceLink.mp4 is not available, the Hero component will fall back to a black background.
