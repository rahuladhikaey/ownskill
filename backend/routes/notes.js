import express from 'express';
import { uploadNote, getNotes, getNoteById, updateNote, deleteNote } from '../controllers/notesController.js';
import { adminMiddleware } from '../middleware/authMiddleware.js';
import supabase from '../config/supabase.js';

const router = express.Router();

// Admin: Upload notes with enhanced support
router.post('/upload', adminMiddleware, async (req, res) => {
  try {
    const { title, description, subjectId, chapterId, notes_type, notes_file } = req.body;

    if (!title || !notes_type) {
      return res.status(400).json({ error: 'Title and notes type are required' });
    }

    const { data, error } = await supabase
      .from('notes')
      .insert([
        {
          title,
          description,
          subject_id: subjectId,
          chapter_id: chapterId,
          type: notes_type,
          file_path: notes_file ? `notes/${Date.now()}_${title}` : null,
          uploaded_by: req.user.id,
          created_at: new Date()
        }
      ])
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: 'Notes uploaded successfully',
      note: data[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', adminMiddleware, uploadNote);
router.get('/', getNotes);
router.get('/:id', getNoteById);
router.put('/:id', adminMiddleware, updateNote);
router.delete('/:id', adminMiddleware, deleteNote);

export default router;

