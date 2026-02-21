import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateEmail, validatePassword } from '../utils/helpers';
import '../styles/Auth.css';

export default function StudentSignup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    class_level: '5'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill all fields');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email');
      return;
    }

    if (!validatePassword(formData.password)) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      await signup(formData.name, formData.email, formData.password, formData.class_level);
      navigate('/dashboard');
    } catch (err) {
      setError(err.details || err.error || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-card signup-card">
          <div className="auth-header">
            <div className="brand-logo">
              <span className="logo-icon">📚</span>
              <h1 className="brand-name">Skill<span className="brand-highlight">2020</span></h1>
            </div>
            <p className="auth-subtitle">Join Our Learning Community</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <i className="fas fa-exclamation-circle"></i> {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="name" className="form-label">
                <i className="fas fa-user"></i> Full Name
              </label>
              <input
                type="text"
                id="name"
                className="form-control form-control-lg"
                placeholder="Your full name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                <i className="fas fa-envelope"></i> Email Address
              </label>
              <input
                type="email"
                id="email"
                className="form-control form-control-lg"
                placeholder="your@email.com"
                name="email"
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="class_level" className="form-label">
                <i className="fas fa-graduation-cap"></i> Select Class/Level
              </label>
              <select
                id="class_level"
                className="form-select form-select-lg"
                name="class_level"
                value={formData.class_level}
                onChange={handleChange}
                disabled={loading}
              >
                <optgroup label="School Level">
                  <option value="5">Class 5</option>
                  <option value="6">Class 6</option>
                  <option value="7">Class 7</option>
                  <option value="8">Class 8</option>
                  <option value="9">Class 9</option>
                  <option value="10">Class 10</option>
                </optgroup>
                <optgroup label="Competitive Exams - GATE">
                  <option value="gate_cse">GATE - Computer Science (CSE)</option>
                  <option value="gate_ee">GATE - Electrical Engineering (EE)</option>
                  <option value="gate_ec">GATE - Electronics (ECE)</option>
                  <option value="gate_me">GATE - Mechanical (ME)</option>
                  <option value="gate_ce">GATE - Civil Engineering (CE)</option>
                </optgroup>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                <i className="fas fa-lock"></i> Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control form-control-lg"
                placeholder="Minimum 6 characters"
                name="password"
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                <i className="fas fa-lock-check"></i> Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                className="form-control form-control-lg"
                placeholder="Re-enter your password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="btn btn-signup btn-lg w-100"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Creating Account...
                </>
              ) : (
                <>
                  <i className="fas fa-user-plus me-2"></i> Create My Account
                </>
              )}
            </button>
          </form>

          <div className="auth-divider">
            <span>Already registered?</span>
          </div>

          <Link to="/login" className="btn btn-outline-primary btn-lg w-100">
            <i className="fas fa-sign-in-alt me-2"></i> Sign In Here
          </Link>

          <div className="auth-footer">
            <Link to="/" className="back-link">
              <i className="fas fa-arrow-left me-1"></i> Back to Home
            </Link>
          </div>
        </div>

        <div className="auth-info">
          <h2>Start Learning Today! 🎓</h2>
          <p>Get instant access to comprehensive study materials and practice exams</p>
          <ul className="features-list">
            <li><i className="fas fa-check-circle"></i> Comprehensive Study Notes</li>
            <li><i className="fas fa-check-circle"></i> Daily Practice Problems (DPP)</li>
            <li><i className="fas fa-check-circle"></i> Mock Tests & Exams</li>
            <li><i className="fas fa-check-circle"></i> Previous Year Papers</li>
            <li><i className="fas fa-check-circle"></i> Performance Tracking</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
