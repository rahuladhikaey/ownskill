import supabase from '../config/supabase.js';

export const createChapter = async (req, res) => {
  try {
    const { subject_id, title } = req.body;

    if (!subject_id || !title) {
      return res.status(400).json({ error: 'Subject ID and title are required' });
    }

    const { data, error } = await supabase
      .from('chapters')
      .insert([{ subject_id, title }])
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: 'Chapter created successfully',
      chapter: data[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getChapters = async (req, res) => {
  try {
    const { subject_id } = req.query;

    let query = supabase.from('chapters').select();

    if (subject_id) {
      query = query.eq('subject_id', subject_id);
    }

    const { data, error } = await query;

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ chapters: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getChapterById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('chapters')
      .select()
      .eq('id', id)
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ chapter: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateChapter = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    const { data, error } = await supabase
      .from('chapters')
      .update({ title })
      .eq('id', id)
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({
      message: 'Chapter updated successfully',
      chapter: data[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteChapter = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('chapters')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Chapter deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
