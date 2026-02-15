import React from 'react';
import { Link } from 'react-router-dom';

export default function NotesView() {
  return (
    <div className="container-main">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/subjects">Subjects</Link></li>
          <li className="breadcrumb-item active">Notes</li>
        </ol>
      </nav>
      <h1 className="page-title">📝 Study Notes</h1>
      <p>Loading notes...</p>
    </div>
  );
}
