import React from 'react';
import { Link } from 'react-router-dom';

export default function ExamView() {
  return (
    <div className="container-main">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/subjects">Subjects</Link></li>
          <li className="breadcrumb-item active">Exams</li>
        </ol>
      </nav>
      <h1 className="page-title">📊 Available Exams</h1>
      <p>Loading exams...</p>
    </div>
  );
}
