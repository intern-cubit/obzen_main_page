import express from 'express';
import About from '../models/About.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();

// @route   GET /api/about
// @desc    Get about section data
// @access  Public
router.get('/', async (req, res) => {
  try {
    let about = await About.findOne();
    
    // If no about data exists, create default
    if (!about) {
      about = new About({});
      await about.save();
    }

    console.log('About data being returned:', about);

    res.json({
      success: true,
      data: about
    });
  } catch (error) {
    console.error('Error fetching about data:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   PUT /api/about
// @desc    Update about section data
// @access  Private
router.put('/', authMiddleware, async (req, res) => {
  try {
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
    console.error('Error updating about:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

// @route   POST /api/about
// @desc    Create about section data
// @access  Private
router.post('/', authMiddleware, async (req, res) => {
  try {
    console.log('Creating about with data:', req.body);

    // Check if about already exists
    let about = await About.findOne();
    if (about) {
      return res.status(400).json({
        success: false,
        message: 'About section already exists. Use PUT to update.'
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
    console.error('Error creating about:', error.message);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});

export default router;
