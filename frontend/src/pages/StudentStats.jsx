import React from 'react';
import { Link } from 'react-router-dom';

export default function StudentStats() {
  return (
    <div className="container-main">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
          <li className="breadcrumb-item active">Performance Analytics</li>
        </ol>
      </nav>
      <h1 className="page-title">📊 Performance Analytics</h1>
      <p>Loading your statistics...</p>
    </div>
  );
}
