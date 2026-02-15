import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { subjectsService } from '../services/apiService';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ total_exams: 0, avg_score: 0, best_score: 0 });

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            <span style={{ color: '#667eea' }}>Skill2020</span>
          </Link>
          <div className="ms-auto">
            <span className="me-3">Welcome, {user?.name}!</span>
            <button className="btn btn-sm btn-danger" onClick={() => { logout(); navigate('/'); }}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container-main">
        <h1 className="page-title">Student Dashboard</h1>

        <div className="row mb-4">
          <div className="col-md-3">
            <div className="stats-card">
              <h4>Total Exams</h4>
              <div className="value">{stats.total_exams}</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stats-card">
              <h4>Average Score</h4>
              <div className="value">{stats.avg_score}</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stats-card">
              <h4>Best Score</h4>
              <div className="value">{stats.best_score}</div>
            </div>
          </div>
          <div className="col-md-3">
            <div className="stats-card">
              <h4>Class</h4>
              <div className="value">{user?.class_level}</div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <Link to="/subjects" className="card text-decoration-none text-dark p-4">
              <div style={{ fontSize: '2rem' }}>📚</div>
              <h4>Study Materials</h4>
              <p>Access study notes and short notes</p>
            </Link>
          </div>

          <div className="col-md-6 mb-3">
            <Link to="/subjects" className="card text-decoration-none text-dark p-4">
              <div style={{ fontSize: '2rem' }}>✏️</div>
              <h4>Practice Problems</h4>
              <p>Solve Daily Practice Problems (DPP)</p>
            </Link>
          </div>

          <div className="col-md-6 mb-3">
            <Link to="/subjects" className="card text-decoration-none text-dark p-4">
              <div style={{ fontSize: '2rem' }}>📝</div>
              <h4>Mock Exams</h4>
              <p>Take timed exams and test your knowledge</p>
            </Link>
          </div>

          <div className="col-md-6 mb-3">
            <Link to="/stats" className="card text-decoration-none text-dark p-4">
              <div style={{ fontSize: '2rem' }}>📊</div>
              <h4>Performance</h4>
              <p>View your overall performance analytics</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
