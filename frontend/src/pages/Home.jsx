import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            <span style={{ color: '#667eea' }}>Skill2020</span> Academy
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              {!isAuthenticated ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Student Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">Student Signup</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/admin-login">Admin Login</Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <span className="nav-link">Welcome, {user?.name}!</span>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-section">
        <h1>🎓 Skill2020 Academy</h1>
        <p>Your Complete Learning Platform for School & GATE Preparation</p>
        {!isAuthenticated ? (
          <div>
            <Link to="/login" className="btn btn-light btn-lg me-3">Get Started</Link>
            <Link to="/admin-login" className="btn btn-outline-light btn-lg">Admin Portal</Link>
          </div>
        ) : (
          <Link to="/dashboard" className="btn btn-light btn-lg">Go to Dashboard</Link>
        )}
      </div>

      {/* Features Section */}
      <div className="container-main">
        <div className="section-title text-center mb-5">Why Choose Skill2020?</div>
        
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="feature-card card">
              <i className="bi bi-book-half"></i>
              <h3>Comprehensive Study Materials</h3>
              <p>Access detailed study notes and short notes for all subjects and chapters.</p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="feature-card card">
              <i className="bi bi-pencil-square"></i>
              <h3>Daily Practice Problems</h3>
              <p>Solve DPP questions to strengthen your concepts and improve accuracy.</p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="feature-card card">
              <i className="bi bi-clock-history"></i>
              <h3>Timed Exams</h3>
              <p>Take full-length exams with timer to prepare for real exam conditions.</p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="feature-card card">
              <i className="bi bi-bar-chart"></i>
              <h3>Performance Analytics</h3>
              <p>Track your progress with detailed statistics and performance reports.</p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="feature-card card">
              <i className="bi bi-mortarboard"></i>
              <h3>Class 5-10 & GATE</h3>
              <p>Prepare for Middle/High School or GATE with subject-specific content.</p>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="feature-card card">
              <i className="bi bi-shield-check"></i>
              <h3>Secure & Reliable</h3>
              <p>JWT authentication and secure database ensure your data safety.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Supported Subjects */}
      <div className="bg-light py-5">
        <div className="container">
          <div className="section-title text-center">Supported Subjects</div>
          
          <div className="row">
            <div className="col-md-6">
              <h5 className="mb-3">School (Class 5-10)</h5>
              <ul className="list-unstyled">
                <li>✓ Mathematics</li>
                <li>✓ Science</li>
                <li>✓ English</li>
                <li>✓ Social Studies</li>
                <li>✓ Hindi</li>
              </ul>
            </div>

            <div className="col-md-6">
              <h5 className="mb-3">GATE Preparation</h5>
              <ul className="list-unstyled">
                <li>✓ Computer Science & IT</li>
                <li>✓ Electronics & Communication</li>
                <li>✓ Electrical Engineering</li>
                <li>✓ Mechanical Engineering</li>
                <li>✓ Civil Engineering</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Skill2020 Academy. All rights reserved.</p>
      </footer>
    </div>
  );
}
