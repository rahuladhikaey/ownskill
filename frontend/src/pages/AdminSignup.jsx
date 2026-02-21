import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/Auth.css';

const AdminSignup = () => {
  const navigate = useNavigate();
  const { adminSignup } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showAdminPasskey, setShowAdminPasskey] = useState(false);
  const [showMasterPasskey, setShowMasterPasskey] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    adminPasskey: '',
    masterPasskey: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('Full name is required');
      return false;
    }
    if (!formData.email.trim()) {
      setError('Email is required');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    if (!formData.adminPasskey.trim()) {
      setError('Admin passkey is required');
      return false;
    }
    if (!formData.masterPasskey.trim()) {
      setError('Master passkey is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await adminSignup(
        formData.name,
        formData.email,
        formData.password,
        formData.confirmPassword,
        formData.adminPasskey,
        formData.masterPasskey
      );
      navigate('/admin-dashboard');
    } catch (err) {
      setError(err.details || err.error || 'Admin signup failed. Please try again.');
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
            <p className="auth-subtitle">Admin Registration</p>
          </div>

          {error && (
            <div className="alert alert-danger alert-dismissible fade show" role="alert">
              <i className="fas fa-exclamation-circle"></i> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            {/* Full Name */}
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                <i className="fas fa-user"></i> Full Name
              </label>
              <input
                type="text"
                id="name"
                className="form-control form-control-lg"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                disabled={loading}
              />
            </div>

            {/* Email */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                <i className="fas fa-envelope"></i> Email Address
              </label>
              <input
                type="email"
                id="email"
                className="form-control form-control-lg"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                disabled={loading}
              />
            </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="password-input">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password (min 6 characters)"
                disabled={loading}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex="-1"
              >
                <i className={`fas fa-eye${showPassword ? '-slash' : ''}`}></i>
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              disabled={loading}
            />
          </div>

          {/* Admin Passkey */}
          <div className="form-group info-group">
            <label htmlFor="adminPasskey">Personal Passkey</label>
            <div className="password-input">
              <input
                type={showAdminPasskey ? 'text' : 'password'}
                id="adminPasskey"
                name="adminPasskey"
                value={formData.adminPasskey}
                onChange={handleChange}
                placeholder="Create a unique admin passkey"
                disabled={loading}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowAdminPasskey(!showAdminPasskey)}
                tabIndex="-1"
              >
                <i className={`fas fa-eye${showAdminPasskey ? '-slash' : ''}`}></i>
              </button>
            </div>
            <small>⚠️ You will need this to log in as admin (separate from password)</small>
          </div>

          {/* Master Passkey */}
          <div className="form-group danger-group">
            <label htmlFor="masterPasskey">Master Passkey</label>
            <div className="password-input">
              <input
                type={showMasterPasskey ? 'text' : 'password'}
                id="masterPasskey"
                name="masterPasskey"
                value={formData.masterPasskey}
                onChange={handleChange}
                placeholder="Enter master passkey for authorization"
                disabled={loading}
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowMasterPasskey(!showMasterPasskey)}
                tabIndex="-1"
              >
                <i className={`fas fa-eye${showMasterPasskey ? '-slash' : ''}`}></i>
              </button>
            </div>
            <small>🔐 Required authorization to create admin accounts</small>
          </div>

          <button
            type="submit"
            className="submit-button"
            disabled={loading}
          >
            {loading ? (
              <>
                <i className="fas fa-spinner fa-spin"></i> Creating Account...
              </>
            ) : (
              <>
                <i className="fas fa-user-plus"></i> Create Admin Account
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an admin account? <Link to="/admin-login">Login here</Link></p>
        </div>

        <div className="info-box">
          <h4><i className="fas fa-info-circle"></i> Admin Account Information</h4>
          <ul>
            <li>Email should be a valid institutional email</li>
            <li>Password must be at least 6 characters</li>
            <li>Personal passkey is used for every admin login</li>
            <li>Master passkey is required for authorization only</li>
            <li>Keep both passkeys secure and confidential</li>
          </ul>
        </div>
      </div>
    </div>
    </div>
  );
};

export default AdminSignup;
