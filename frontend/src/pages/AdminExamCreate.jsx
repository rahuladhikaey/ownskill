import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/UploadPage.css';

export default function AdminExamCreate() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    subjectId: '',
    totalQuestions: 0,
    duration: 60,
    passingScore: 40,
    examType: 'practice'
  });
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: '',
    option_a: '',
    option_b: '',
    option_c: '',
    option_d: '',
    correctAnswer: 'a',
    marks: 1
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return <div className="alert alert-danger">Unauthorized access</div>;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'duration' || name === 'passingScore' || name === 'totalQuestions' ? parseInt(value) : value
    }));
  };

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setCurrentQuestion(prev => ({
      ...prev,
      [name]: name === 'marks' ? parseInt(value) : value
    }));
  };

  const addQuestion = (e) => {
    e.preventDefault();
    if (currentQuestion.question && currentQuestion.option_a && currentQuestion.option_b && currentQuestion.option_c && currentQuestion.option_d) {
      setQuestions([...questions, currentQuestion]);
      setCurrentQuestion({
        question: '',
        option_a: '',
        option_b: '',
        option_c: '',
        option_d: '',
        correctAnswer: 'a',
        marks: 1
      });
      setShowQuestionForm(false);
      setMessage({ type: 'success', text: 'Question added successfully!' });
    } else {
      setMessage({ type: 'danger', text: 'Please fill all question fields' });
    }
  };

  const removeQuestion = (index) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    if (!formData.title || questions.length === 0) {
      setMessage({ type: 'danger', text: 'Please add exam details and at least one question' });
      return;
    }

    try {
      setLoading(true);
      const examData = {
        ...formData,
        questions: questions,
        totalQuestions: questions.length
      };

      const response = await fetch('/api/exams/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}`
        },
        body: JSON.stringify(examData)
      });

      if (response.ok) {
        setMessage({ type: 'success', text: 'Exam created successfully!' });
        setTimeout(() => navigate('/admin-dashboard'), 2000);
      } else {
        setMessage({ type: 'danger', text: 'Failed to create exam' });
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
              <i className="fas fa-pencil-alt me-2"></i> Create MCQ Exam
            </h1>
            <p className="upload-subtitle">Design and configure a new exam for students</p>
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
            <h3 className="section-title">Exam Details</h3>

            <div className="form-group">
              <label className="form-label">
                <i className="fas fa-heading"></i> Exam Title <span className="required">*</span>
              </label>
              <input
                type="text"
                name="title"
                className="form-control"
                placeholder="e.g., Physics Full Mock Test 2024"
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
                placeholder="Describe the exam..."
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
                  <i className="fas fa-layer-group"></i> Exam Type
                </label>
                <select
                  name="examType"
                  className="form-control"
                  value={formData.examType}
                  onChange={handleChange}
                  disabled={loading}
                >
                  <option value="practice">Practice Test</option>
                  <option value="mock">Mock Exam</option>
                  <option value="pre_board">Pre Board</option>
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <i className="fas fa-clock"></i> Duration (minutes)
                </label>
                <input
                  type="number"
                  name="duration"
                  className="form-control"
                  value={formData.duration}
                  onChange={handleChange}
                  disabled={loading}
                  min="1"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  <i className="fas fa-percentage"></i> Passing Score (%)
                </label>
                <input
                  type="number"
                  name="passingScore"
                  className="form-control"
                  value={formData.passingScore}
                  onChange={handleChange}
                  disabled={loading}
                  min="0"
                  max="100"
                />
              </div>
            </div>
          </div>

          <div className="form-section">
            <div className="section-header">
              <h3 className="section-title">Questions ({questions.length})</h3>
              {!showQuestionForm && (
                <button
                  type="button"
                  className="btn btn-sm btn-primary"
                  onClick={() => setShowQuestionForm(true)}
                >
                  <i className="fas fa-plus me-1"></i> Add Question
                </button>
              )}
            </div>

            {showQuestionForm && (
              <div className="question-form">
                <div className="form-group">
                  <label className="form-label">
                    <i className="fas fa-question-circle"></i> Question <span className="required">*</span>
                  </label>
                  <textarea
                    name="question"
                    className="form-control"
                    placeholder="Enter the question"
                    rows="2"
                    value={currentQuestion.question}
                    onChange={handleQuestionChange}
                  ></textarea>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Option A <span className="required">*</span></label>
                    <input
                      type="text"
                      name="option_a"
                      className="form-control"
                      placeholder="Option A"
                      value={currentQuestion.option_a}
                      onChange={handleQuestionChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Option B <span className="required">*</span></label>
                    <input
                      type="text"
                      name="option_b"
                      className="form-control"
                      placeholder="Option B"
                      value={currentQuestion.option_b}
                      onChange={handleQuestionChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Option C <span className="required">*</span></label>
                    <input
                      type="text"
                      name="option_c"
                      className="form-control"
                      placeholder="Option C"
                      value={currentQuestion.option_c}
                      onChange={handleQuestionChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Option D <span className="required">*</span></label>
                    <input
                      type="text"
                      name="option_d"
                      className="form-control"
                      placeholder="Option D"
                      value={currentQuestion.option_d}
                      onChange={handleQuestionChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Correct Answer</label>
                    <select
                      name="correctAnswer"
                      className="form-control"
                      value={currentQuestion.correctAnswer}
                      onChange={handleQuestionChange}
                    >
                      <option value="a">Option A</option>
                      <option value="b">Option B</option>
                      <option value="c">Option C</option>
                      <option value="d">Option D</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Marks</label>
                    <input
                      type="number"
                      name="marks"
                      className="form-control"
                      value={currentQuestion.marks}
                      onChange={handleQuestionChange}
                      min="1"
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="btn btn-outline"
                    onClick={() => setShowQuestionForm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={addQuestion}
                  >
                    <i className="fas fa-check me-1"></i> Add Question
                  </button>
                </div>
              </div>
            )}

            <div className="questions-list">
              {questions.map((q, index) => (
                <div key={index} className="question-item">
                  <div className="question-content">
                    <p><strong>Q{index + 1}:</strong> {q.question}</p>
                    <small>Marks: {q.marks} | Answer: {q.correctAnswer.toUpperCase()}</small>
                  </div>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => removeQuestion(index)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              ))}
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
              disabled={loading || questions.length === 0}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Creating...
                </>
              ) : (
                <>
                  <i className="fas fa-check me-2"></i> Create Exam
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
