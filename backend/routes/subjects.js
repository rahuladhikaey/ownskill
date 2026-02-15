import express from 'express';
import { createSubject, getSubjects, getSubjectById, updateSubject, deleteSubject } from '../controllers/subjectsController.js';
import { adminMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', adminMiddleware, createSubject);
router.get('/', getSubjects);
router.get('/:id', getSubjectById);
router.put('/:id', adminMiddleware, updateSubject);
router.delete('/:id', adminMiddleware, deleteSubject);

export default router;
