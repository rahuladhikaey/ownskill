import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateEmail } from '../utils/helpers';
import '../styles/Auth.css';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passkey, setPasskey] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { adminLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password || !passkey) {
      setError('Please fill all fields');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email');
      return;
    }

    try {
      setLoading(true);
      await adminLogin(email, password, passkey);
      navigate('/admin-dashboard');
    } catch (err) {
      setError(err.details || err.error || 'Admin login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-wrapper">
        <div className="auth-card admin-card">
          <div className="auth-header">
            <div className="brand-logo admin-logo">
              <span className="logo-icon">🛡️</span>
              <h1 className="brand-name">Skill<span className="brand-highlight">2020</span></h1>
            </div>
            <p className="auth-subtitle">Admin Control Panel</p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {error && (
              <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <i className="fas fa-exclamation-circle"></i> {error}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                <i className="fas fa-envelope"></i> Admin Email
              </label>
              <input
                type="email"
                id="email"
                className="form-control form-control-lg"
                placeholder="admin@example.com"
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

            <div className="form-group">
              <label htmlFor="passkey" className="form-label">
                <i className="fas fa-key"></i> Admin Passkey
              </label>
              <input
                type="password"
                id="passkey"
                className="form-control form-control-lg"
                placeholder="Enter admin passkey"
                value={passkey}
                onChange={(e) => setPasskey(e.target.value)}
                disabled={loading}
              />
              <small className="text-muted d-block mt-1">🔐 Required for secure admin access</small>
            </div>

            <button 
              type="submit" 
              className="btn btn-admin btn-lg w-100"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Verifying...
                </>
              ) : (
                <>
                  <i className="fas fa-shield-alt me-2"></i> Admin Login
                </>
              )}
            </button>
          </form>

          <div className="auth-divider">
            <span>Not an admin?</span>
          </div>

          <Link to="/login" className="btn btn-student btn-lg w-100">
            <i className="fas fa-user me-2"></i> Student Portal
          </Link>

          <div className="auth-footer">
            <Link to="/" className="back-link">
              <i className="fas fa-arrow-left me-1"></i> Back to Home
            </Link>
          </div>

          <div className="auth-signup-link">
            <p>New admin user? <Link to="/admin-signup">Create account here</Link></p>
          </div>
        </div>

        <div className="auth-info admin-info">
          <h2>Admin Dashboard 🔐</h2>
          <p>Manage your academy with powerful administration tools</p>
          <ul className="features-list">
            <li><i className="fas fa-check-circle"></i> Upload Notes & Materials</li>
            <li><i className="fas fa-check-circle"></i> Create MCQ Exams</li>
            <li><i className="fas fa-check-circle"></i> Manage DPP (Daily Practice)</li>
            <li><i className="fas fa-check-circle"></i> Upload Previous Year Papers</li>
            <li><i className="fas fa-check-circle"></i> Track Student Progress</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
