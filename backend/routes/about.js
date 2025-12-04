import express from 'express';
import { body, validationResult } from 'express-validator';
import About from '../models/About.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/about
// @desc    Get about section data
// @access  Public
router.get('/', async (req, res) => {
  try {
    let about = await About.findOne();

    // If no about data exists, create default with explicit values
    if (!about) {
      about = new About({
        mainHeading: 'Beyond Boundaries. Beyond Infinity.',
        subHeading: 'At Obzen Technolabs, we are driven by a singular vision — to build world-class technological solutions that push the limits of innovation and solve real-world challenges across automation, tracking, and asset management.',
        introDescription: 'We believe technology should simplify complexity. With this belief at our core, we design and deliver end-to-end systems that merge intelligence, precision, and reliability — empowering businesses to operate smarter and move faster.',
        contentSections: [
          {
            sectionId: 'subventure',
            heading: 'Our Subventure: CuBIT Dynamics',
            content: 'CuBIT Dynamics, a proud subventure of Obzen Technolabs, is dedicated to pioneering the future of high-precision asset tracking. By integrating cutting-edge hardware and software with satellite-based SOS networks, CuBIT Dynamics delivers next-generation solutions that redefine accuracy, connectivity, and safety on a global scale.',
            order: 1
          },
          {
            sectionId: 'services',
            heading: 'What We Do',
            content: 'At Obzen, our expertise spans across:\n\n• Artificial Intelligence & Machine Learning\n\n• Automation & Process Optimization\n\n• Hardware and Software Design & Development\n\n• Rapid Prototyping & Production\n\nFrom concept to creation, we partner with clients to transform ideas into powerful, scalable technologies that make a lasting impact.',
            order: 2
          }
        ],
        closingStatement: 'Because at Obzen Technolabs, innovation doesn\'t stop at infinity — it begins there.',
        imageUrl: ''
      });
      await about.save();
    }

    console.log('About data being returned:', about);

    res.json({
      success: true,
      data: about
    });
  } catch (error) {
    console.error('Error fetching about data:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch about section data. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// @route   PUT /api/about
// @desc    Update about section data
// @access  Private
router.put('/', [
  authMiddleware,
  body('mainHeading')
    .optional()
    .isLength({ min: 1, max: 200 })
    .withMessage('Main heading must be between 1 and 200 characters')
    .trim(),
  body('subHeading')
    .optional()
    .isLength({ min: 1, max: 500 })
    .withMessage('Sub heading must be between 1 and 500 characters')
    .trim(),
  body('introDescription')
    .optional()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Intro description must be between 1 and 1000 characters')
    .trim(),
  body('closingStatement')
    .optional()
    .isLength({ min: 1, max: 300 })
    .withMessage('Closing statement must be between 1 and 300 characters')
    .trim(),
  body('contentSections')
    .optional()
    .isArray({ min: 0, max: 10 })
    .withMessage('Content sections must be an array with maximum 10 sections'),
  body('contentSections.*.heading')
    .optional()
    .isLength({ min: 1, max: 100 })
    .withMessage('Section heading must be between 1 and 100 characters')
    .trim(),
  body('contentSections.*.content')
    .optional()
    .isLength({ min: 1, max: 2000 })
    .withMessage('Section content must be between 1 and 2000 characters')
    .trim(),
  body('contentSections.*.sectionId')
    .optional()
    .isLength({ min: 1, max: 50 })
    .withMessage('Section ID must be between 1 and 50 characters')
    .trim(),
  body('contentSections.*.order')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('Section order must be a number between 0 and 100'),
  body('imageUrl')
    .optional({ nullable: true, checkFalsy: true })
    .custom((value) => {
      // Allow empty strings, null, or undefined
      if (!value || value.trim() === '') {
        return true;
      }
      // Only validate if value is provided
      if (!value.match(/^https?:\/\/.+/)) {
        throw new Error('Image URL must be a valid HTTP/HTTPS URL');
      }
      return true;
    })
    .trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      const errorMessages = errors.array().map(error => ({
        field: error.path || error.param,
        message: error.msg,
        value: error.value
      }));
      
      return res.status(400).json({
        success: false,
        message: 'Validation failed. Please check your input and try again.',
        errors: errorMessages,
        invalidFields: errors.array().map(error => error.path || error.param)
      });
    }

    console.log('Updating about with data:', req.body);

    let about = await About.findOne();
    
    if (!about) {
      about = new About(req.body);
    } else {
      // Update fields
      Object.keys(req.body).forEach(key => {
        about[key] = req.body[key];
      });
    }

    await about.save();
    
    console.log('About saved successfully:', about);

    res.json({
      success: true,
      message: 'About section updated successfully',
      data: about
    });
  } catch (error) {
    console.error('Error updating about:', error);
    
    // Handle specific MongoDB/Mongoose errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message,
        value: err.value
      }));
      
      return res.status(400).json({
        success: false,
        message: 'Data validation failed. Please check your input.',
        errors: validationErrors,
        type: 'validation_error'
      });
    }
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid data format provided.',
        error: `Invalid ${error.path}: ${error.value}`,
        type: 'cast_error'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to update about section. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      type: 'server_error'
    });
  }
});

// @route   POST /api/about
// @desc    Create about section data
// @access  Private
router.post('/', [
  authMiddleware,
  body('mainHeading')
    .optional()
    .isLength({ min: 1, max: 200 })
    .withMessage('Main heading must be between 1 and 200 characters')
    .trim(),
  body('subHeading')
    .optional()
    .isLength({ min: 1, max: 500 })
    .withMessage('Sub heading must be between 1 and 500 characters')
    .trim(),
  body('introDescription')
    .optional()
    .isLength({ min: 1, max: 1000 })
    .withMessage('Intro description must be between 1 and 1000 characters')
    .trim(),
  body('closingStatement')
    .optional()
    .isLength({ min: 1, max: 300 })
    .withMessage('Closing statement must be between 1 and 300 characters')
    .trim(),
  body('contentSections')
    .optional()
    .isArray({ min: 0, max: 10 })
    .withMessage('Content sections must be an array with maximum 10 sections'),
  body('contentSections.*.heading')
    .optional()
    .isLength({ min: 1, max: 100 })
    .withMessage('Section heading must be between 1 and 100 characters')
    .trim(),
  body('contentSections.*.content')
    .optional()
    .isLength({ min: 1, max: 2000 })
    .withMessage('Section content must be between 1 and 2000 characters')
    .trim(),
  body('contentSections.*.sectionId')
    .optional()
    .isLength({ min: 1, max: 50 })
    .withMessage('Section ID must be between 1 and 50 characters')
    .trim(),
  body('contentSections.*.order')
    .optional()
    .isInt({ min: 0, max: 100 })
    .withMessage('Section order must be a number between 0 and 100'),
  body('imageUrl')
    .optional({ nullable: true, checkFalsy: true })
    .custom((value) => {
      // Allow empty strings, null, or undefined
      if (!value || value.trim() === '') {
        return true;
      }
      // Only validate if value is provided
      if (!value.match(/^https?:\/\/.+/)) {
        throw new Error('Image URL must be a valid HTTP/HTTPS URL');
      }
      return true;
    })
    .trim()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      const errorMessages = errors.array().map(error => ({
        field: error.path || error.param,
        message: error.msg,
        value: error.value
      }));
      
      return res.status(400).json({
        success: false,
        message: 'Validation failed. Please check your input and try again.',
        errors: errorMessages,
        invalidFields: errors.array().map(error => error.path || error.param)
      });
    }

    console.log('Creating about with data:', req.body);

    // Check if about already exists
    let about = await About.findOne();
    if (about) {
      return res.status(409).json({
        success: false,
        message: 'About section already exists. Use the update option instead.',
        type: 'conflict_error',
        suggestion: 'Try updating the existing about section instead of creating a new one.'
      });
    }

    about = new About(req.body);
    await about.save();

    console.log('About created successfully:', about);

    res.json({
      success: true,
      message: 'About section created successfully',
      data: about
    });
  } catch (error) {
    console.error('Error creating about:', error);
    
    // Handle specific MongoDB/Mongoose errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message,
        value: err.value
      }));
      
      return res.status(400).json({
        success: false,
        message: 'Data validation failed. Please check your input.',
        errors: validationErrors,
        type: 'validation_error'
      });
    }
    
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        message: 'Invalid data format provided.',
        error: `Invalid ${error.path}: ${error.value}`,
        type: 'cast_error'
      });
    }
    
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'About section already exists.',
        type: 'duplicate_error',
        suggestion: 'Try updating the existing about section instead.'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Failed to create about section. Please try again later.',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined,
      type: 'server_error'
    });
  }
});

export default router;
