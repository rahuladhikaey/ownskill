import express from 'express';
import { signup, login, adminLogin, adminSignup, getProfile } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/admin-login', adminLogin);
router.post('/admin-signup', adminSignup);
router.get('/profile', authMiddleware, getProfile);

export default router;
