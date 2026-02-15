import express from 'express';
import { createQuestion, getQuestions, getQuestionById, updateQuestion, deleteQuestion } from '../controllers/questionsController.js';
import { adminMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', adminMiddleware, createQuestion);
router.get('/', getQuestions);
router.get('/:id', getQuestionById);
router.put('/:id', adminMiddleware, updateQuestion);
router.delete('/:id', adminMiddleware, deleteQuestion);

export default router;
