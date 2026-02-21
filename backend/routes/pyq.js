import express from 'express';
import { adminMiddleware, authMiddleware } from '../middleware/authMiddleware.js';
import supabase from '../config/supabase.js';

const router = express.Router();

// Admin: Upload PYQ
router.post('/upload', adminMiddleware, async (req, res) => {
  try {
    const { title, description, exam_board, year, subject, pyq_file } = req.body;

    if (!title || !year) {
      return res.status(400).json({ error: 'Title and year are required' });
    }

    const { data, error } = await supabase
      .from('previous_year_questions')
      .insert([
        {
          title,
          description,
          exam_board,
          year,
          subject,
          file_path: pyq_file ? `pyq/${year}_${exam_board}_${title}` : null,
          uploaded_by: req.user.id,
          status: 'approved',
          created_at: new Date()
        }
      ])
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: 'PYQ uploaded successfully',
      pyq: data[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Student: Upload PYQ (requires approval)
router.post('/student-upload', authMiddleware, async (req, res) => {
  try {
    const { title, description, exam_name, year, source_type, pyq_file, student_id } = req.body;

    if (!title || !exam_name || !year) {
      return res.status(400).json({ error: 'Title, exam name, and year are required' });
    }

    const { data, error } = await supabase
      .from('previous_year_questions')
      .insert([
        {
          title,
          description,
          exam_board: exam_name,
          year,
          subject: source_type,
          file_path: pyq_file ? `pyq/student/${Date.now()}_${title}` : null,
          uploaded_by: student_id,
          status: 'pending',
          created_at: new Date()
        }
      ])
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: 'Paper uploaded successfully! Admin will review and approve it.',
      pyq: data[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get approved PYQs
router.get('/', async (req, res) => {
  try {
    const { exam_board, year, subject } = req.query;

    let query = supabase
      .from('previous_year_questions')
      .select()
      .eq('status', 'approved');

    if (exam_board) {
      query = query.eq('exam_board', exam_board);
    }

    if (year) {
      query = query.eq('year', year);
    }

    if (subject) {
      query = query.eq('subject', subject);
    }

    const { data, error } = await query.order('year', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({
      count: data.length,
      pyq: data
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single PYQ
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('previous_year_questions')
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

// Admin: Approve pending PYQ
router.put('/:id/approve', adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('previous_year_questions')
      .update({ status: 'approved' })
      .eq('id', id)
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({
      message: 'PYQ approved successfully',
      pyq: data[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Reject pending PYQ
router.put('/:id/reject', adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('previous_year_questions')
      .update({ status: 'rejected' })
      .eq('id', id)
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({
      message: 'PYQ rejected',
      pyq: data[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin: Delete PYQ
router.delete('/:id', adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('previous_year_questions')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json({ message: 'PYQ deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
