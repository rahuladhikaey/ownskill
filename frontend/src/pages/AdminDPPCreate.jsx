import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/UploadPage.css';

export default function AdminDPPCreate() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    chapterId: '',
    subjectId: '',
    difficulty: 'medium',
    dpp_file: null
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

    if (!formData.title || !formData.dpp_file) {
      setMessage({ type: 'danger', text: 'Please fill in all required fields' });
      return;
    }

    try {
      setLoading(true);
      const uploadData = new FormData();
      Object.keys(formData).forEach(key => {
        uploadData.append(key, formData[key]);
      });

      const response = await fetch('/api/dpp/create', {
        method: 'POST',
        body: uploadData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        }
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'DPP created successfully!' });
        setFormData({
          title: '',
          description: '',
          chapterId: '',
          subjectId: '',
          difficulty: 'medium',
          dpp_file: null
        });
        setTimeout(() => navigate('/admin-dashboard'), 2000);
      } else {
        setMessage({ type: 'danger', text: 'Failed to create DPP' });
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
              <i className="fas fa-tasks me-2"></i> Create Daily Practice Problem (DPP)
            </h1>
            <p className="upload-subtitle">Create DPP sets to help students practice daily</p>
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
              <i className="fas fa-cog"></i> DPP Configuration
            </h3>

            <div className="form-group">
              <label className="form-label">
                <i className="fas fa-heading"></i> DPP Title <span className="required">*</span>
              </label>
              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="e.g., Physics DPP - Chapter 5 - Day 1"
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
                placeholder="Describe the DPP content and topics covered..."
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
                  <i className="fas fa-layer-group"></i> Chapter
                </label>
                <select
                  name="chapterId"
                  className="form-control"
                  value={formData.chapterId}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="">Select Chapter</option>
                  <option value="1">Chapter 1</option>
                  <option value="2">Chapter 2</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                <i className="fas fa-signal"></i> Difficulty Level
              </label>
              <select
                name="difficulty"
                className="form-control"
                value={formData.difficulty}
                onChange={handleChange}
                disabled={loading}
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>

          <div className="form-section">
            <h3 className="section-title">
              <i className="fas fa-file"></i> Upload DPP File
            </h3>

            <div className="file-upload-group">
              <label htmlFor="dpp_file" className="file-upload-label">
                <div className="file-upload-content">
                  <i className="fas fa-cloud-upload-alt"></i>
                  <p className="file-upload-text">
                    Drag and drop your DPP file here, or click to browse
                  </p>
                  <p className="file-upload-hint">Supported formats: PDF, DOCX (Max 50MB)</p>
                </div>
                <input
                  type="file"
                  id="dpp_file"
                  name="dpp_file"
                  accept=".pdf,.docx"
                  onChange={handleChange}
                  disabled={loading}
                  className="file-input"
                />
              </label>
              {formData.dpp_file && (
                <div className="file-selected">
                  <i className={`fas fa-${formData.dpp_file.name.endsWith('.pdf') ? 'file-pdf' : 'file-word'}`}></i>
                  <span>{formData.dpp_file.name}</span>
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
                  Creating...
                </>
              ) : (
                <>
                  <i className="fas fa-plus me-2"></i> Create DPP
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
