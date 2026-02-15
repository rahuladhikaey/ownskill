import express from 'express';
import { createChapter, getChapters, getChapterById, updateChapter, deleteChapter } from '../controllers/chaptersController.js';
import { adminMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', adminMiddleware, createChapter);
router.get('/', getChapters);
router.get('/:id', getChapterById);
router.put('/:id', adminMiddleware, updateChapter);
router.delete('/:id', adminMiddleware, deleteChapter);

export default router;
