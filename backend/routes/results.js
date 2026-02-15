import express from 'express';
import { submitExam, getResults, getResultById, getUserStats } from '../controllers/resultsController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, submitExam);
router.get('/', authMiddleware, getResults);
router.get('/stats/:user_id', authMiddleware, getUserStats);
router.get('/:id', authMiddleware, getResultById);

export default router;
