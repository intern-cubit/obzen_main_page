import express from 'express';
import { upload, uploadToCloudinary } from '../middleware/upload.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// Upload single file
router.post('/single', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    console.log('Upload request received');
    console.log('Request file:', req.file ? 'File present' : 'No file');
    console.log('File details:', req.file ? {
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size
    } : 'N/A');

    if (!req.file) {
      console.log('Error: No file uploaded');
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    console.log('Uploading to Cloudinary...');
    
    // Get upload type from request body for folder organization
    const uploadType = req.body.type || 'general';
    const folderName = `cubit-dynamics/${uploadType}`;
    
    // Upload to Cloudinary
    const result = await uploadToCloudinary(req.file.buffer, folderName);
    console.log('Cloudinary upload successful:', result.secure_url);

    res.json({
      success: true,
      data: {
        url: result.secure_url,
        public_id: result.public_id,
        resource_type: result.resource_type,
        format: result.format,
        width: result.width,
        height: result.height,
        bytes: result.bytes
      }
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload file',
      error: error.message
    });
  }
});

// Upload multiple files
router.post('/multiple', authMiddleware, upload.array('files', 5), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No files uploaded'
      });
    }

    const uploadPromises = req.files.map(file => {
      const uploadType = req.body.type || 'general';
      const folderName = `cubit-dynamics/${uploadType}`;
      return uploadToCloudinary(file.buffer, folderName);
    });

    const results = await Promise.all(uploadPromises);

    const uploadedFiles = results.map(result => ({
      url: result.secure_url,
      public_id: result.public_id,
      resource_type: result.resource_type,
      format: result.format,
      width: result.width,
      height: result.height,
      bytes: result.bytes
    }));

    res.json({
      success: true,
      data: uploadedFiles
    });
  } catch (error) {
    console.error('Multiple upload error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to upload files',
      error: error.message
    });
  }
});

export default router;
