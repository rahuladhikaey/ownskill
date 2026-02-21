import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateEmail, validatePassword } from '../utils/helpers';
import '../styles/Auth.css';

export default function StudentLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please fill all fields');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email');
      return;
    }

    try {
      setLoading(true);
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.details || err.error || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-card">
          <div className="auth-header">
            <div className="brand-logo">
              <span className="logo-icon">📚</span>
              <h1 className="brand-name">Skill<span className="brand-highlight">2020</span></h1>
            </div>
            <p className="auth-subtitle">Student Learning Portal</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <i className="fas fa-exclamation-circle"></i> {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                <i className="fas fa-envelope"></i> Email Address
              </label>
              <input
                type="email"
                id="email"
                className="form-control form-control-lg"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                <i className="fas fa-lock"></i> Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control form-control-lg"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-login btn-lg w-100"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Signing in...
                </>
              ) : (
                <>
                  <i className="fas fa-sign-in-alt me-2"></i> Sign In
                </>
              )}
            </button>
          </form>

          <div className="auth-divider">
            <span>New to Skill2020?</span>
          </div>

          <Link to="/signup" className="btn btn-signup btn-lg w-100">
            <i className="fas fa-user-plus me-2"></i> Create Account
          </Link>

          <div className="auth-footer">
            <Link to="/admin-login" className="admin-link">
              <i className="fas fa-shield-alt me-1"></i> Admin Portal
            </Link>
          </div>
        </div>

        <div className="auth-info">
          <h2>Welcome Students! 👋</h2>
          <p>Master your studies with comprehensive notes, practice questions, and previous year papers</p>
          <ul className="features-list">
            <li><i className="fas fa-check-circle"></i> Study Notes & Materials</li>
            <li><i className="fas fa-check-circle"></i> Daily Practice Problems</li>
            <li><i className="fas fa-check-circle"></i> Mock Exams & Tests</li>
            <li><i className="fas fa-check-circle"></i> Previous Year Questions</li>
            <li><i className="fas fa-check-circle"></i> Performance Analytics</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
