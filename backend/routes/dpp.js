import express from 'express';
import { adminMiddleware, authMiddleware } from '../middleware/authMiddleware.js';
import supabase from '../config/supabase.js';

const router = express.Router();

// Admin: Create new DPP
router.post('/create', adminMiddleware, async (req, res) => {
  try {
    const { title, description, chapterId, subjectId, difficulty, dpp_file } = req.body;

    if (!title || !difficulty) {
      return res.status(400).json({ error: 'Title and difficulty are required' });
    }

    const { data, error } = await supabase
      .from('dpp')
      .insert([
        {
          title,
          description,
          chapter_id: chapterId,
          subject_id: subjectId,
          difficulty,
          file_path: dpp_file ? `dpp/${Date.now()}_${title}` : null,
          created_by: req.user.id,
          created_at: new Date()
        }
      ])
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: 'DPP created successfully',
      dpp: data[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all DPPs for a chapter
router.get('/chapter/:chapterId', async (req, res) => {
  try {
    const { chapterId } = req.params;

    const { data, error } = await supabase
      .from('dpp')
      .select()
      .eq('chapter_id', chapterId)
      .order('created_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({
      count: data.length,
      dpp: data
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single DPP by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('dpp')
      .select()
      .eq('id', id)
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Delete DPP
router.delete('/:id', adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('dpp')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: 'DPP deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
