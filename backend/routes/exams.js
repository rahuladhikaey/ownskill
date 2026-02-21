import express from 'express';
import { createExam, getExams, getExamById, updateExam, deleteExam } from '../controllers/examsController.js';
import { adminMiddleware, authMiddleware } from '../middleware/authMiddleware.js';
import supabase from '../config/supabase.js';

const router = express.Router();

// Admin: Create exam with questions
router.post('/create', adminMiddleware, async (req, res) => {
  try {
    const { title, description, subjectId, totalQuestions, duration, passingScore, examType, questions } = req.body;

    if (!title || !questions || questions.length === 0) {
      return res.status(400).json({ error: 'Title and questions are required' });
    }

    // Create questions first
    let questionIds = [];
    for (const q of questions) {
      const { data, error } = await supabase
        .from('questions')
        .insert([
          {
            question: q.question,
            option_a: q.option_a,
            option_b: q.option_b,
            option_c: q.option_c,
            option_d: q.option_d,
            correct_answer: q.correctAnswer,
            marks: q.marks || 1,
            type: 'exam',
            created_at: new Date()
          }
        ])
        .select();

      if (!error && data) {
        questionIds.push(data[0].id);
      }
    }

    // Create exam
    const { data: examData, error: examError } = await supabase
      .from('exams')
      .insert([
        {
          title,
          description,
          subject_id: subjectId,
          total_questions: totalQuestions || questions.length,
          duration_minutes: duration,
          passing_percentage: passingScore,
          exam_type: examType,
          question_ids: questionIds,
          created_by: req.user.id,
          created_at: new Date()
        }
      ])
      .select();

    if (examError) {
      return res.status(400).json({ error: examError.message });
    }

    res.status(201).json({
      message: 'Exam created successfully',
      exam: examData[0],
      questionCount: questionIds.length
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', adminMiddleware, createExam);
router.get('/', authMiddleware, getExams);
router.get('/:id', authMiddleware, getExamById);
router.put('/:id', adminMiddleware, updateExam);
router.delete('/:id', adminMiddleware, deleteExam);

export default router;
