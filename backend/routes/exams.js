import express from 'express';
import { createExam, getExams, getExamById, updateExam, deleteExam } from '../controllers/examsController.js';
import { adminMiddleware, authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', adminMiddleware, createExam);
router.get('/', authMiddleware, getExams);
router.get('/:id', authMiddleware, getExamById);
router.put('/:id', adminMiddleware, updateExam);
router.delete('/:id', adminMiddleware, deleteExam);

export default router;
