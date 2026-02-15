import supabase from '../config/supabase.js';

export const submitExam = async (req, res) => {
  try {
    const { user_id, exam_id, answers, score, total_marks } = req.body;

    if (!user_id || !exam_id || !score) {
      return res.status(400).json({ error: 'User ID, exam ID, and score are required' });
    }

    const { data, error } = await supabase
      .from('results')
      .insert([
        {
          user_id,
          exam_id,
          answers,
          score,
          total_marks: total_marks || 100,
          submitted_at: new Date()
        }
      ])
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: 'Exam result saved successfully',
      result: data[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getResults = async (req, res) => {
  try {
    const { user_id, exam_id } = req.query;

    let query = supabase.from('results').select();

    if (user_id) {
      query = query.eq('user_id', user_id);
    }

    if (exam_id) {
      query = query.eq('exam_id', exam_id);
    }

    const { data, error } = await query.order('submitted_at', { ascending: false });

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ results: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getResultById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('results')
      .select()
      .eq('id', id)
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ result: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserStats = async (req, res) => {
  try {
    const { user_id } = req.params;

    const { data, error } = await supabase
      .from('results')
      .select()
      .eq('user_id', user_id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    // Calculate statistics
    const totalExams = data.length;
    const totalScore = data.reduce((sum, result) => sum + result.score, 0);
    const averageScore = totalExams > 0 ? (totalScore / totalExams).toFixed(2) : 0;
    const bestScore = totalExams > 0 ? Math.max(...data.map(r => r.score)) : 0;

    res.json({
      user_id,
      totalExams,
      totalScore,
      averageScore,
      bestScore,
      results: data
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
