import express from 'express';
import { body, validationResult } from 'express-validator';
import Contact from '../models/Contact.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/contact
// @desc    Get contact section data
// @access  Public
router.get('/', async (req, res) => {
  try {
    let contact = await Contact.findOne();
    
    // If no contact data exists, create default
    if (!contact) {
      contact = new Contact({});
      await contact.save();
    }

    res.json({
      success: true,
      data: contact
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/contact
// @desc    Update contact section data
// @access  Private
router.put('/', [
  authMiddleware,
  body('title').optional().isLength({ min: 1 }).withMessage('Title cannot be empty'),
  body('subtitle').optional().isLength({ min: 1 }).withMessage('Subtitle cannot be empty'),
  body('email').optional().isEmail().withMessage('Email must be valid'),
  body('phone').optional().isLength({ min: 1 }).withMessage('Phone cannot be empty'),
  body('address').optional().isLength({ min: 1 }).withMessage('Address cannot be empty')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Invalid input',
        errors: errors.array()
      });
    }

    let contact = await Contact.findOne();
    
    if (!contact) {
      contact = new Contact(req.body);
    } else {
      // Update fields
      Object.keys(req.body).forEach(key => {
        if (key === 'socialMedia' && typeof req.body[key] === 'object') {
          contact.socialMedia = { ...contact.socialMedia, ...req.body[key] };
        } else {
          contact[key] = req.body[key];
        }
      });
    }

    await contact.save();

    res.json({
      success: true,
      message: 'Contact section updated successfully',
      data: contact
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

export default router;
