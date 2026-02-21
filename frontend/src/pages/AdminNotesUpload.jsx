import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/UploadPage.css';

export default function AdminNotesUpload() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subjectId: '',
    chapterId: '',
    notes_type: 'complete',
    notes_file: null
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
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (!formData.title || !formData.notes_file) {
      setMessage({ type: 'danger', text: 'Please fill in all required fields' });
      return;
    }

    try {
      setLoading(true);
      const uploadData = new FormData();
      Object.keys(formData).forEach(key => {
        uploadData.append(key, formData[key]);
      });

      const response = await fetch('/api/notes/upload', {
        method: 'POST',
        body: uploadData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        }
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Notes uploaded successfully!' });
        setFormData({
          title: '',
          description: '',
          subjectId: '',
          chapterId: '',
          notes_type: 'complete',
          notes_file: null
        });
        setTimeout(() => navigate('/admin-dashboard'), 2000);
      } else {
        setMessage({ type: 'danger', text: 'Failed to upload notes' });
      }
    } catch (error) {
      setMessage({ type: 'danger', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-page">
      <div className="upload-container">
        <div className="upload-header">
          <div className="upload-header-content">
            <h1 className="upload-title">
              <i className="fas fa-book-open me-2"></i> Upload Study Notes
            </h1>
            <p className="upload-subtitle">Share quality study materials with students</p>
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
            <h3 className="section-title">Notes Information</h3>

            <div className="form-group">
              <label className="form-label">
                <i className="fas fa-heading"></i> Title <span className="required">*</span>
              </label>
              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="e.g., Physics Chapter 5 - Mechanics Complete Notes"
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
                placeholder="Describe the notes content..."
                rows="3"
                value={formData.description}
                onChange={handleChange}
                disabled={loading}
              ></textarea>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <i className="fas fa-book"></i> Subject
                </label>
                <select
                  name="subjectId"
                  className="form-control"
                  value={formData.subjectId}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="">Select Subject</option>
                  <option value="1">Physics</option>
                  <option value="2">Chemistry</option>
                  <option value="3">Mathematics</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <i className="fas fa-layer-group"></i> Notes Type
                </label>
                <select
                  name="notes_type"
                  className="form-control"
                  value={formData.notes_type}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="complete">Complete Notes</option>
                  <option value="short">Short Notes</option>
                  <option value="formula">Formula Sheet</option>
                </select>
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">Upload File</h3>

            <div className="file-upload-group">
              <label htmlFor="notes_file" className="file-upload-label">
                <div className="file-upload-content">
                  <i className="fas fa-cloud-upload-alt"></i>
                  <p className="file-upload-text">
                    Drag and drop your PDF file here, or click to browse
                  </p>
                  <p className="file-upload-hint">Supported format: PDF (Max 50MB)</p>
                </div>
                <input
                  type="file"
                  id="notes_file"
                  name="notes_file"
                  accept=".pdf"
                  onChange={handleChange}
                  disabled={loading}
                  className="file-input"
                />
              </label>
              {formData.notes_file && (
                <div className="file-selected">
                  <i className="fas fa-file-pdf"></i>
                  <span>{formData.notes_file.name}</span>
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
                  <i className="fas fa-upload me-2"></i> Upload Notes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
