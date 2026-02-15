import supabase from '../config/supabase.js';

export const createQuestion = async (req, res) => {
  try {
    const { chapter_id, question_text, option_a, option_b, option_c, option_d, correct_answer, type } = req.body;

    if (!chapter_id || !question_text || !option_a || !option_b || !option_c || !option_d || !correct_answer) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const { data, error } = await supabase
      .from('questions')
      .insert([
        {
          chapter_id,
          question_text,
          option_a,
          option_b,
          option_c,
          option_d,
          correct_answer,
          type: type || 'dpp', // 'dpp' or 'exam'
          created_at: new Date()
        }
      ])
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: 'Question created successfully',
      question: data[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getQuestions = async (req, res) => {
  try {
    const { chapter_id, type } = req.query;

    let query = supabase.from('questions').select();

    if (chapter_id) {
      query = query.eq('chapter_id', chapter_id);
    }

    if (type) {
      query = query.eq('type', type);
    }

    const { data, error } = await query;

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ questions: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('questions')
      .select()
      .eq('id', id)
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ question: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { question_text, option_a, option_b, option_c, option_d, correct_answer, type } = req.body;

    const { data, error } = await supabase
      .from('questions')
      .update({ question_text, option_a, option_b, option_c, option_d, correct_answer, type })
      .eq('id', id)
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({
      message: 'Question updated successfully',
      question: data[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('questions')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
