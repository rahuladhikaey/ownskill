import React from 'react';
import { Link } from 'react-router-dom';

export default function DPPView() {
  return (
    <div className="container-main">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/subjects">Subjects</Link></li>
          <li className="breadcrumb-item active">DPP</li>
        </ol>
      </nav>
      <h1 className="page-title">✏️ Daily Practice Problems</h1>
      <p>Loading DPP questions...</p>
    </div>
  );
}
