import express from 'express';
import { signup, login, adminLogin, getProfile } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/admin-login', adminLogin);
router.get('/profile', authMiddleware, getProfile);

export default router;
