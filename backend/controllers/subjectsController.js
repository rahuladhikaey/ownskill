import supabase from '../config/supabase.js';

export const createSubject = async (req, res) => {
  try {
    const { name, category } = req.body;

    if (!name || !category) {
      return res.status(400).json({ error: 'Subject name and category are required' });
    }

    const { data, error } = await supabase
      .from('subjects')
      .insert([{ name, category }])
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.status(201).json({
      message: 'Subject created successfully',
      subject: data[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSubjects = async (req, res) => {
  try {
    const { category } = req.query;

    let query = supabase.from('subjects').select();

    if (category) {
      query = query.eq('category', category);
    }

    const { data, error } = await query;

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ subjects: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getSubjectById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('subjects')
      .select()
      .eq('id', id)
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ subject: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category } = req.body;

    const { data, error } = await supabase
      .from('subjects')
      .update({ name, category })
      .eq('id', id)
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({
      message: 'Subject updated successfully',
      subject: data[0]
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('subjects')
      .delete()
      .eq('id', id);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({ message: 'Subject deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
