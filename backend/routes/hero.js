import express from 'express';
import { body, validationResult } from 'express-validator';
import Hero from '../models/Hero.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/hero
// @desc    Get hero section data
// @access  Public
router.get('/', async (req, res) => {
  try {
    let hero = await Hero.findOne();
    
    // If no hero data exists, create default
    if (!hero) {
      hero = new Hero({});
      await hero.save();
    }

    console.log('Hero data being returned:', hero);

    res.json({
      success: true,
      data: hero
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/hero
// @desc    Update hero section data
// @access  Private
router.put('/', [
  authMiddleware,
  body('title').optional().isLength({ min: 1 }).withMessage('Title cannot be empty'),
  body('subtitle').optional().isLength({ min: 1 }).withMessage('Subtitle cannot be empty'),
  body('videoUrl').optional().isLength({ min: 1 }).withMessage('Video URL cannot be empty')
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

    console.log('Updating hero with data:', req.body);

    let hero = await Hero.findOne();
    
    if (!hero) {
      hero = new Hero(req.body);
    } else {
      // Update fields
      Object.keys(req.body).forEach(key => {
        hero[key] = req.body[key];
      });
    }

    await hero.save();
    
    console.log('Hero saved successfully:', hero);

    res.json({
      success: true,
      message: 'Hero section updated successfully',
      data: hero
    });
  } catch (error) {
    console.error('Error updating hero:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   POST /api/hero
// @desc    Create hero section data
// @access  Private
router.post('/', [
  authMiddleware,
  body('title').optional().isLength({ min: 1 }).withMessage('Title cannot be empty'),
  body('subtitle').optional().isLength({ min: 1 }).withMessage('Subtitle cannot be empty'),
  body('videoUrl').optional().isLength({ min: 1 }).withMessage('Video URL cannot be empty')
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

    // Check if hero already exists
    let hero = await Hero.findOne();
    if (hero) {
      return res.status(400).json({
        success: false,
        message: 'Hero section already exists. Use PUT to update.'
      });
    }

    hero = new Hero(req.body);
    await hero.save();

    res.json({
      success: true,
      message: 'Hero section created successfully',
      data: hero
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
