import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/UploadPage.css';

export default function StudentPYQUpload() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    exam_name: '',
    year: new Date().getFullYear(),
    source_type: 'own_college',
    pyq_file: null
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <div className="alert alert-danger">Please login to upload</div>;
  }

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : (name === 'year' ? parseInt(value) : value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (!formData.title || !formData.exam_name || !formData.pyq_file) {
      setMessage({ type: 'danger', text: 'Please fill in all required fields' });
      return;
    }

    try {
      setLoading(true);
      const uploadData = new FormData();
      Object.keys(formData).forEach(key => {
        uploadData.append(key, formData[key]);
      });
      uploadData.append('student_id', user?.id);

      const response = await fetch('/api/pyq/student-upload', {
        method: 'POST',
        body: uploadData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Paper shared successfully! Admin will review and approve it.' });
        setFormData({
          title: '',
          description: '',
          exam_name: '',
          year: new Date().getFullYear(),
          source_type: 'own_college',
          pyq_file: null
        });
        setTimeout(() => navigate('/dashboard'), 2000);
      } else {
        const error = await response.json();
        setMessage({ type: 'danger', text: error.message || 'Failed to upload paper' });
      }
    } catch (error) {
      setMessage({ type: 'danger', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  return (
    <div className="upload-page">
      <div className="upload-container">
        <div className="upload-header">
          <div className="upload-header-content">
            <h1 className="upload-title">
              <i className="fas fa-share-alt me-2"></i> Share Question Papers
            </h1>
            <p className="upload-subtitle">Help other students by sharing your question papers (Admin approval required)</p>
          </div>
          <button onClick={() => navigate('/dashboard')} className="btn-close-upload">
            <i className="fas fa-times"></i>
          </button>
        </div>

        {message.text && (
          <div className={`alert alert-${message.type}`}>
            <i className={`fas fa-${message.type === 'success' ? 'check-circle' : 'exclamation-circle'}`}></i>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="upload-form">
          <div className="info-box">
            <i className="fas fa-lightbulb"></i>
            <p>
              Your submission will be reviewed by our admin team. Once approved, it will be shared with all students in your class. 
              Thank you for contributing to the learning community!
            </p>
          </div>

          <div className="form-section">
            <h3 className="section-title">
              <i className="fas fa-file-pdf"></i> Paper Details
            </h3>

            <div className="form-group">
              <label className="form-label">
                <i className="fas fa-heading"></i> Paper Title <span className="required">*</span>
              </label>
              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="e.g., Physics Mid-Term Exam Paper"
                value={formData.title}
                onChange={handleChange}
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <i className="fas fa-align-left"></i> Description
              </label>
              <textarea
                name="description"
                className="form-control"
                placeholder="Provide details about the paper - topics covered, difficulty level, etc."
                rows="3"
                value={formData.description}
                onChange={handleChange}
                disabled={loading}
              ></textarea>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <i className="fas fa-graduation-cap"></i> Exam/Test Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="exam_name"
                  className="form-control"
                  placeholder="e.g., Mid-Term, Pre-Board, Monthly Test"
                  value={formData.exam_name}
                  onChange={handleChange}
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <i className="fas fa-calendar"></i> Year <span className="required">*</span>
                </label>
                <select
                  name="year"
                  className="form-control"
                  value={formData.year}
                  onChange={handleChange}
                  disabled={loading}
                >
                  {years.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                <i className="fas fa-source"></i> Source Type
              </label>
              <select
                name="source_type"
                className="form-control"
                value={formData.source_type}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="own_college">College/School Exam</option>
                <option value="coaching">Coaching Center</option>
                <option value="online_platform">Online Platform</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">
              <i className="fas fa-cloud-upload-alt"></i> Upload Paper
            </h3>

            <div className="file-upload-group">
              <label htmlFor="pyq_file" className="file-upload-label">
                <div className="file-upload-content">
                  <i className="fas fa-cloud-upload-alt"></i>
                  <p className="file-upload-text">
                    Drag and drop your paper here, or click to browse
                  </p>
                  <p className="file-upload-hint">Supported format: PDF (Max 50MB)</p>
                </div>
                <input
                  type="file"
                  id="pyq_file"
                  name="pyq_file"
                  accept=".pdf"
                  onChange={handleChange}
                  disabled={loading}
                  className="file-input"
                />
              </label>
              {formData.pyq_file && (
                <div className="file-selected">
                  <i className="fas fa-file-pdf"></i>
                  <span>{formData.pyq_file.name}</span>
                </div>
              )}
            </div>
          </div>

          <div className="guidelines-box">
            <h4 className="guidelines-title">
              <i className="fas fa-check-circle me-2"></i> Guidelines
            </h4>
            <ul className="guidelines-list">
              <li>Ensure the paper is clear and properly scanned (if physical copy)</li>
              <li>Do not upload confidential or restricted papers</li>
              <li>Include question paper with solutions if available</li>
              <li>Papers will be reviewed before being shared</li>
            </ul>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="btn btn-outline"
              disabled={loading}
            >
              <i className="fas fa-times me-2"></i> Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Uploading...
                </>
              ) : (
                <>
                  <i className="fas fa-upload me-2"></i> Share Paper
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
