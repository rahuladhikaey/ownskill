import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { subjectsService } from '../services/apiService';
import { useAuth } from '../context/AuthContext';

export default function SubjectsList() {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const category = user?.class_level?.startsWith('gate') ? 'gate' : `class${user?.class_level}`;

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    try {
      const response = await subjectsService.getAll(category);
      setSubjects(response.data.subjects || []);
    } catch (error) {
      console.error('Error fetching subjects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="loading">
          <div className="loading-spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-main">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item"><Link to="/dashboard">Dashboard</Link></li>
          <li className="breadcrumb-item active">Subjects</li>
        </ol>
      </nav>

      <h1 className="page-title">📚 Subjects</h1>

      {subjects.length === 0 ? (
        <div className="alert alert-info">
          No subjects available for your class yet.
        </div>
      ) : (
        <div className="row">
          {subjects.map(subject => (
            <div key={subject.id} className="col-md-6 mb-4">
              <Link to={`/chapters/${subject.id}`} className="card text-decoration-none text-dark p-4">
                <h5>{subject.name}</h5>
                <p>Click to view chapters →</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
