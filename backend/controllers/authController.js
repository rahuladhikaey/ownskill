import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import supabase from '../config/supabase.js';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = (userId, email, role) => {
  return jwt.sign(
    { userId, email, role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};

export const signup = async (req, res) => {
  try {
    const { name, email, password, class_level } = req.body;

    if (!name || !email || !password || !class_level) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert into Supabase
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          name,
          email,
          password_hash: hashedPassword,
          role: 'student',
          class_level,
          created_at: new Date()
        }
      ])
      .select();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const user = data[0];
    const token = generateToken(user.id, user.email, user.role);

    res.status(201).json({
      message: 'Signup successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        class_level: user.class_level
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Get user from Supabase
    const { data, error } = await supabase
      .from('users')
      .select()
      .eq('email', email)
      .single();

    if (error || !data) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, data.password_hash);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(data.id, data.email, data.role);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role,
        class_level: data.class_level
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password, passkey } = req.body;

    if (!email || !password || !passkey) {
      return res.status(400).json({ error: 'Email, password, and passkey are required' });
    }

    // Check passkey
    if (passkey !== process.env.ADMIN_PASSKEY) {
      return res.status(403).json({ error: 'Invalid admin passkey' });
    }

    // Get admin user
    const { data, error } = await supabase
      .from('users')
      .select()
      .eq('email', email)
      .eq('role', 'admin')
      .single();

    if (error || !data) {
      return res.status(400).json({ error: 'Admin user not found' });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, data.password_hash);
    if (!passwordMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(data.id, data.email, data.role);

    res.json({
      message: 'Admin login successful',
      token,
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        role: data.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const { userId } = req.user;

    const { data, error } = await supabase
      .from('users')
      .select()
      .eq('id', userId)
      .single();

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    res.json({
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
      class_level: data.class_level
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
