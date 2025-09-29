import express from 'express';
import { protect } from '../middleware/auth.js';
import {
    createSoftwareLicenses,
    getUserSoftwareLicenses,
    activateSoftwareLicense,
    getDevices,
    add_device
} from '../controllers/deviceController.js';

const router = express.Router();

// Software license management routes
router.post('/licenses/create', protect, createSoftwareLicenses);
router.get('/licenses/user', protect, getUserSoftwareLicenses);
router.post('/licenses/activate', protect, activateSoftwareLicense);

// Existing device management routes
router.get('/', protect, getDevices);
router.post('/add', protect, add_device);

export default router;