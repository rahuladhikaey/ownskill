import supabase from '../config/supabase.js';

export const createExam = async (req, res) => {
  try {
    const { subject_id, title, duration_minutes, question_ids } = req.body;

    if (!subject_id || !title || !duration_minutes || !question_ids || question_ids.length === 0) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const { data, error } = await supabase
      .from('exams')
      .insert([
        {
          subject_id,
          title,
          duration_minutes,
          question_ids,
          created_at: new Date()
        }
      ])
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: 'Exam created successfully',
      exam: data[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getExams = async (req, res) => {
  try {
    const { subject_id } = req.query;

    let query = supabase.from('exams').select();

    if (subject_id) {
      query = query.eq('subject_id', subject_id);
    }

    const { data, error } = await query;

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ exams: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getExamById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: exam, error: examError } = await supabase
      .from('exams')
      .select()
      .eq('id', id)
      .single();

    if (examError) {
      return res.status(400).json({ error: examError.message });
    }

    // Get all questions for this exam
    if (exam.question_ids && exam.question_ids.length > 0) {
      const { data: questions, error: questionsError } = await supabase
        .from('questions')
        .select()
        .in('id', exam.question_ids);

      if (questionsError) {
        return res.status(400).json({ error: questionsError.message });
      }

      exam.questions = questions;
    }

    res.json({ exam });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateExam = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, duration_minutes, question_ids } = req.body;

    const { data, error } = await supabase
      .from('exams')
      .update({ title, duration_minutes, question_ids })
      .eq('id', id)
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({
      message: 'Exam updated successfully',
      exam: data[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteExam = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('exams')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Exam deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
