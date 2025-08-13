import express from 'express';
import { body, validationResult } from 'express-validator';
import Review from '../models/Review.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/reviews
// @desc    Get all reviews
// @access  Public
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find({ isActive: true }).sort({ order: 1 });
    
    res.json({
      success: true,
      data: reviews
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   GET /api/reviews/admin
// @desc    Get all reviews for admin (including inactive)
// @access  Private
router.get('/admin', authMiddleware, async (req, res) => {
  try {
    const reviews = await Review.find().sort({ order: 1 });
    
    res.json({
      success: true,
      data: reviews
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/reviews
// @desc    Create new review
// @access  Private
router.post('/', [
  authMiddleware,
  body('name').isLength({ min: 1 }).withMessage('Name is required'),
  body('position').isLength({ min: 1 }).withMessage('Position is required'),
  body('company').isLength({ min: 1 }).withMessage('Company is required'),
  body('content').isLength({ min: 1 }).withMessage('Content is required'),
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5')
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

    const review = new Review(req.body);
    await review.save();

    res.status(201).json({
      success: true,
      message: 'Review created successfully',
      data: review
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/reviews/:id
// @desc    Update review
// @access  Private
router.put('/:id', [
  authMiddleware,
  body('name').optional().isLength({ min: 1 }).withMessage('Name cannot be empty'),
  body('position').optional().isLength({ min: 1 }).withMessage('Position cannot be empty'),
  body('company').optional().isLength({ min: 1 }).withMessage('Company cannot be empty'),
  body('content').optional().isLength({ min: 1 }).withMessage('Content cannot be empty'),
  body('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5')
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

    const review = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    res.json({
      success: true,
      message: 'Review updated successfully',
      data: review
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/reviews/:id
// @desc    Delete review
// @access  Private
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    res.json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/reviews/:id/toggle
// @desc    Toggle review active status
// @access  Private
router.put('/:id/toggle', authMiddleware, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    review.isActive = !review.isActive;
    await review.save();

    res.json({
      success: true,
      message: `Review ${review.isActive ? 'activated' : 'deactivated'} successfully`,
      data: review
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
