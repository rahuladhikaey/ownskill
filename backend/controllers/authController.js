import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import supabase from '../config/supabase.js';
import dotenv from 'dotenv';

dotenv.config();

const generateToken = (userId, email, role) => {
  return jwt.sign(
    { userId, email, role, id: userId },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '7d' }
  );
};

export const signup = async (req, res) => {
  try {
    const { name, email, password, class_level } = req.body;

    // Validation
    if (!name || !email || !password || !class_level) {
      return res.status(400).json({ 
        error: 'All fields are required',
        details: 'Please provide name, email, password, and class level'
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Invalid email format',
        details: 'Please enter a valid email address'
      });
    }

    // Password validation
    if (password.length < 6) {
      return res.status(400).json({ 
        error: 'Password too short',
        details: 'Password must be at least 6 characters'
      });
    }

    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('users')
      .select()
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(409).json({ 
        error: 'Email already registered',
        details: 'This email is already in use. Please login or use a different email'
      });
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
          is_active: true,
          created_at: new Date()
        }
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      return res.status(400).json({ 
        error: 'Signup failed',
        details: error.message 
      });
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
    console.error('Signup error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({ 
        error: 'Email and password are required',
        details: 'Please provide both email and password'
      });
    }

    // Get user from Supabase
    const { data, error } = await supabase
      .from('users')
      .select()
      .eq('email', email)
      .eq('role', 'student')
      .single();

    if (error || !data) {
      return res.status(401).json({ 
        error: 'Invalid credentials',
        details: 'Email or password is incorrect'
      });
    }

    // Check if user is active
    if (data.is_active === false) {
      return res.status(403).json({ 
        error: 'Account disabled',
        details: 'Your account has been disabled'
      });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, data.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ 
        error: 'Invalid credentials',
        details: 'Email or password is incorrect'
      });
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
    console.error('Login error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
};

export const adminLogin = async (req, res) => {
  try {
    const { email, password, passkey } = req.body;

    // Validation
    if (!email || !password || !passkey) {
      return res.status(400).json({ 
        error: 'All fields are required',
        details: 'Please provide email, password, and passkey'
      });
    }

    // Get admin user
    const { data, error } = await supabase
      .from('users')
      .select()
      .eq('email', email)
      .eq('role', 'admin')
      .single();

    if (error || !data) {
      return res.status(401).json({ 
        error: 'Admin user not found',
        details: 'Invalid email or this account is not an admin'
      });
    }

    // Check if user is active
    if (data.is_active === false) {
      return res.status(403).json({ 
        error: 'Account disabled',
        details: 'This admin account has been disabled'
      });
    }

    // Check password
    const passwordMatch = await bcrypt.compare(password, data.password_hash);
    if (!passwordMatch) {
      return res.status(401).json({ 
        error: 'Invalid password',
        details: 'The password you entered is incorrect'
      });
    }

    // Check passkey
    const passkeyMatch = data.admin_passkey === passkey;
    if (!passkeyMatch) {
      return res.status(403).json({ 
        error: 'Invalid passkey',
        details: 'The passkey you entered is incorrect'
      });
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
    console.error('Admin login error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
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

export const adminSignup = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, adminPasskey, masterPasskey } = req.body;

    // Validation
    if (!name || !email || !password || !confirmPassword || !adminPasskey || !masterPasskey) {
      return res.status(400).json({ 
        error: 'All fields are required',
        details: 'Please fill in all fields: name, email, password, admin passkey, and master passkey'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Invalid email format',
        details: 'Please enter a valid email address'
      });
    }

    // Validate password length
    if (password.length < 6) {
      return res.status(400).json({ 
        error: 'Password too short',
        details: 'Password must be at least 6 characters long'
      });
    }

    // Check password confirmation
    if (password !== confirmPassword) {
      return res.status(400).json({ 
        error: 'Passwords do not match',
        details: 'The passwords you entered do not match'
      });
    }

    // Validate master passkey
    const MASTER_PASSKEY = process.env.MASTER_PASSKEY || 'skill2020master';
    if (masterPasskey !== MASTER_PASSKEY) {
      return res.status(403).json({ 
        error: 'Invalid master passkey',
        details: 'The master passkey you entered is incorrect. You do not have permission to create admin accounts.'
      });
    }

    // Check if email already exists
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select()
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(409).json({ 
        error: 'Email already registered',
        details: 'This email is already associated with an account'
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Create admin user
    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          name,
          email,
          password_hash,
          role: 'admin',
          admin_passkey: adminPasskey,
          is_active: true,
          created_at: new Date()
        }
      ])
      .select();

    if (error) {
      console.error('Admin signup error:', error);
      return res.status(500).json({ 
        error: 'Failed to create admin account',
        details: error.message 
      });
    }

    const token = generateToken(data[0].id, data[0].email, data[0].role);

    res.status(201).json({
      message: 'Admin account created successfully',
      token,
      user: {
        id: data[0].id,
        name: data[0].name,
        email: data[0].email,
        role: data[0].role
      }
    });
  } catch (error) {
    console.error('Admin signup error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: error.message 
    });
  }
};
