import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/AdminDashboard.css';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const adminFeatures = [
    {
      icon: '📚',
      title: 'Upload Notes',
      description: 'Upload PDF Study Notes and Short Notes',
      path: '/admin/upload-notes',
      color: 'blue'
    },
    {
      icon: '❓',
      title: 'Create MCQ Exams',
      description: 'Design and Create Full MCQ Exams',
      path: '/admin/create-exam',
      color: 'purple'
    },
    {
      icon: '🎯',
      title: 'Create DPP',
      description: 'Create Daily Practice Problems',
      path: '/admin/create-dpp',
      color: 'green'
    },
    {
      icon: '📊',
      title: 'Upload PYQ',
      description: 'Upload Previous Year Questions',
      path: '/admin/upload-pyq',
      color: 'orange'
    },
    {
      icon: '👥',
      title: 'View Students',
      description: 'Monitor Student Progress',
      path: '/admin/students',
      color: 'red'
    },
    {
      icon: '📈',
      title: 'Analytics',
      description: 'View Platform Analytics',
      path: '/admin/analytics',
      color: 'teal'
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-header">
        <div className="admin-title-section">
          <h1 className="admin-title">
            <span className="admin-icon">🛡️</span> Admin Control Panel
          </h1>
          <p className="admin-welcome">Welcome, {user?.name || 'Admin'}</p>
        </div>
        <button className="btn btn-logout" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt me-2"></i> Logout
        </button>
      </div>

      <div className="admin-stats">
        <div className="stat-card blue">
          <div className="stat-icon">📚</div>
          <div className="stat-content">
            <p className="stat-label">Study Materials</p>
            <p className="stat-value">24</p>
          </div>
        </div>
        <div className="stat-card purple">
          <div className="stat-icon">❓</div>
          <div className="stat-content">
            <p className="stat-label">Total Questions</p>
            <p className="stat-value">1,240</p>
          </div>
        </div>
        <div className="stat-card green">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <p className="stat-label">Active Students</p>
            <p className="stat-value">385</p>
          </div>
        </div>
        <div className="stat-card orange">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <p className="stat-label">Exams Created</p>
            <p className="stat-value">18</p>
          </div>
        </div>
      </div>

      <div className="admin-features">
        <h2 className="features-title">
          <i className="fas fa-tasks me-2"></i> Management Tools
        </h2>
        
        <div className="features-grid">
          {adminFeatures.map((feature, index) => (
            <Link 
              to={feature.path} 
              key={index} 
              className={`feature-card ${feature.color}`}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.description}</p>
              <span className="feature-arrow">
                <i className="fas fa-arrow-right"></i>
              </span>
            </Link>
          ))}
        </div>
      </div>

      <div className="admin-quick-actions">
        <h2 className="actions-title">
          <i className="fas fa-lightning-bolt me-2"></i> Quick Actions
        </h2>
        <div className="actions-container">
          <button className="quick-action-btn">
            <i className="fas fa-upload me-2"></i> Quick Upload
          </button>
          <button className="quick-action-btn">
            <i className="fas fa-file-pdf me-2"></i> Bulk Import
          </button>
          <button className="quick-action-btn">
            <i className="fas fa-sync me-2"></i> Sync Data
          </button>
          <button className="quick-action-btn">
            <i className="fas fa-download me-2"></i> Export Report
          </button>
        </div>
      </div>
    </div>
  );
}
