import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/UploadPage.css';

export default function AdminPYQUpload() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    exam_board: '',
    year: new Date().getFullYear(),
    subject: '',
    pyq_file: null
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <div className="alert alert-danger">Unauthorized access</div>;
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

    if (!formData.title || !formData.pyq_file) {
      setMessage({ type: 'danger', text: 'Please fill in all required fields' });
      return;
    }

    try {
      setLoading(true);
      const uploadData = new FormData();
      Object.keys(formData).forEach(key => {
        uploadData.append(key, formData[key]);
      });

      const response = await fetch('/api/pyq/upload', {
        method: 'POST',
        body: uploadData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        }
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Previous Year Question uploaded successfully!' });
        setFormData({
          title: '',
          description: '',
          exam_board: '',
          year: new Date().getFullYear(),
          subject: '',
          pyq_file: null
        });
        setTimeout(() => navigate('/admin-dashboard'), 2000);
      } else {
        setMessage({ type: 'danger', text: 'Failed to upload PYQ' });
      }
    } catch (error) {
      setMessage({ type: 'danger', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 15 }, (_, i) => currentYear - i);

  return (
    <div className="upload-page">
      <div className="upload-container">
        <div className="upload-header">
          <div className="upload-header-content">
            <h1 className="upload-title">
              <i className="fas fa-history me-2"></i> Upload Previous Year Questions
            </h1>
            <p className="upload-subtitle">Share previous year exam papers with students</p>
          </div>
          <button onClick={() => navigate('/admin-dashboard')} className="btn-close-upload">
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
          <div className="form-section">
            <h3 className="section-title">
              <i className="fas fa-info-circle"></i> PYQ Information
            </h3>

            <div className="form-group">
              <label className="form-label">
                <i className="fas fa-heading"></i> Title <span className="required">*</span>
              </label>
              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="e.g., GATE 2023 Physics Question Paper"
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
                placeholder="Describe the paper content, difficulty level, etc..."
                rows="3"
                value={formData.description}
                onChange={handleChange}
                disabled={loading}
              ></textarea>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <i className="fas fa-university"></i> Exam Board
                </label>
                <select
                  name="exam_board"
                  className="form-control"
                  value={formData.exam_board}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="">Select Exam Board</option>
                  <option value="gate">GATE</option>
                  <option value="jee_main">JEE Main</option>
                  <option value="jee_advanced">JEE Advanced</option>
                  <option value="neet">NEET</option>
                  <option value="board_cbse">CBSE Board</option>
                  <option value="board_icse">ICSE Board</option>
                  <option value="upsc">UPSC</option>
                  <option value="other">Other</option>
                </select>
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
                <i className="fas fa-book"></i> Subject
              </label>
              <select
                name="subject"
                className="form-control"
                value={formData.subject}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="">Select Subject</option>
                <option value="physics">Physics</option>
                <option value="chemistry">Chemistry</option>
                <option value="mathematics">Mathematics</option>
                <option value="biology">Biology</option>
                <option value="general">General Knowledge</option>
              </select>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">
              <i className="fas fa-paperclip"></i> Upload Paper
            </h3>

            <div className="file-upload-group">
              <label htmlFor="pyq_file" className="file-upload-label">
                <div className="file-upload-content">
                  <i className="fas fa-cloud-upload-alt"></i>
                  <p className="file-upload-text">
                    Drag and drop the question paper here, or click to browse
                  </p>
                  <p className="file-upload-hint">Supported formats: PDF (Max 100MB)</p>
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

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/admin-dashboard')}
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
                  <i className="fas fa-upload me-2"></i> Upload Paper
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
