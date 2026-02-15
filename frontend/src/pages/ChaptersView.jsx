import React from 'react';
import { Link } from 'react-router-dom';

export default function ChaptersView() {
  return (
    <div className="container-main">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/subjects">Subjects</Link></li>
          <li className="breadcrumb-item active">Chapters</li>
        </ol>
      </nav>
      <h1 className="page-title">📖 Chapters</h1>
      <p>Loading chapters...</p>
    </div>
  );
}
