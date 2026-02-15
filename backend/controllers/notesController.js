import supabase from '../config/supabase.js';

export const uploadNote = async (req, res) => {
  try {
    const { chapter_id, type, file_url, title } = req.body;

    if (!chapter_id || !type || !file_url) {
      return res.status(400).json({ error: 'Chapter ID, type, and file URL are required' });
    }

    const { data, error } = await supabase
      .from('notes')
      .insert([
        {
          chapter_id,
          type, // 'full_note' or 'short_note'
          file_url,
          title,
          created_at: new Date()
        }
      ])
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: 'Note uploaded successfully',
      note: data[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getNotes = async (req, res) => {
  try {
    const { chapter_id, type } = req.query;

    let query = supabase.from('notes').select();

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

    res.json({ notes: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('notes')
      .select()
      .eq('id', id)
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ note: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, file_url, type } = req.body;

    const { data, error } = await supabase
      .from('notes')
      .update({ title, file_url, type })
      .eq('id', id)
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({
      message: 'Note updated successfully',
      note: data[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('notes')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Note deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
