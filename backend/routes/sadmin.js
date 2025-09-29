import { Router } from 'express';
// import authMiddleware from '../middleware/auth.js'
import { activate, checkActivation } from '../controllers/SAdminController.js';

const router = Router();

// Route for software to check if it's activated on a system
router.post('/check-activation', checkActivation);

// Route for software to activate using activation key
router.post('/activate', activate);

export default router;