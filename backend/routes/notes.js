import express from 'express';
import { uploadNote, getNotes, getNoteById, updateNote, deleteNote } from '../controllers/notesController.js';
import { adminMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', adminMiddleware, uploadNote);
router.get('/', getNotes);
router.get('/:id', getNoteById);
router.put('/:id', adminMiddleware, updateNote);
router.delete('/:id', adminMiddleware, deleteNote);

export default router;
