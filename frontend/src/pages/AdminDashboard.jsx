import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            <span style={{ color: '#667eea' }}>Skill2020</span> Admin
          </Link>
          <div className="ms-auto">
            <span className="me-3">Welcome, {user?.name}! (Admin)</span>
            <button className="btn btn-sm btn-danger" onClick={() => { logout(); navigate('/'); }}>
              Logout
            </button>
          </div>
        </div>
      </nav>

      <div className="container-main">
        <h1 className="page-title">⚙️ Admin Dashboard</h1>

        <div className="row">
          <div className="col-md-4 mb-3">
            <div className="card p-4">
              <div style={{ fontSize: '2rem' }}>📚</div>
              <h5>Manage Subjects</h5>
              <p>Create, Edit, Delete Subjects</p>
              <button className="btn btn-primary btn-sm">Open</button>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card p-4">
              <div style={{ fontSize: '2rem' }}>📖</div>
              <h5>Manage Chapters</h5>
              <p>Create, Edit, Delete Chapters</p>
              <button className="btn btn-primary btn-sm">Open</button>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card p-4">
              <div style={{ fontSize: '2rem' }}>📄</div>
              <h5>Upload Notes</h5>
              <p>Upload PDF Study & Short Notes</p>
              <button className="btn btn-primary btn-sm">Open</button>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card p-4">
              <div style={{ fontSize: '2rem' }}>❓</div>
              <h5>Manage Questions</h5>
              <p>Create MCQ DPP & Exam Questions</p>
              <button className="btn btn-primary btn-sm">Open</button>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card p-4">
              <div style={{ fontSize: '2rem' }}>📝</div>
              <h5>Create Exams</h5>
              <p>Create & Configure Full MCQ Exams</p>
              <button className="btn btn-primary btn-sm">Open</button>
            </div>
          </div>

          <div className="col-md-4 mb-3">
            <div className="card p-4">
              <div style={{ fontSize: '2rem' }}>📊</div>
              <h5>View Results</h5>
              <p>See Student Exam Results</p>
              <button className="btn btn-primary btn-sm">Open</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
