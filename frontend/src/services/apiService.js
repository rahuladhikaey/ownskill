import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth Services
export const authService = {
  signup: (data) => api.post('/auth/signup', data),
  login: (email, password) => api.post('/auth/login', { email, password }),
  adminLogin: (email, password, passkey) => api.post('/auth/admin-login', { email, password, passkey }),
  getProfile: () => api.get('/auth/profile')
};

// Subjects Services
export const subjectsService = {
  getAll: (category) => api.get('/subjects', { params: { category } }),
  getById: (id) => api.get(`/subjects/${id}`),
  create: (data) => api.post('/subjects', data),
  update: (id, data) => api.put(`/subjects/${id}`, data),
  delete: (id) => api.delete(`/subjects/${id}`)
};

// Chapters Services
export const chaptersService = {
  getAll: (subject_id) => api.get('/chapters', { params: { subject_id } }),
  getById: (id) => api.get(`/chapters/${id}`),
  create: (data) => api.post('/chapters', data),
  update: (id, data) => api.put(`/chapters/${id}`, data),
  delete: (id) => api.delete(`/chapters/${id}`)
};

// Notes Services
export const notesService = {
  getAll: (chapter_id, type) => api.get('/notes', { params: { chapter_id, type } }),
  getById: (id) => api.get(`/notes/${id}`),
  create: (data) => api.post('/notes', data),
  update: (id, data) => api.put(`/notes/${id}`, data),
  delete: (id) => api.delete(`/notes/${id}`)
};

// Questions Services
export const questionsService = {
  getAll: (chapter_id, type) => api.get('/questions', { params: { chapter_id, type } }),
  getById: (id) => api.get(`/questions/${id}`),
  create: (data) => api.post('/questions', data),
  update: (id, data) => api.put(`/questions/${id}`, data),
  delete: (id) => api.delete(`/questions/${id}`)
};

// Exams Services
export const examsService = {
  getAll: (subject_id) => api.get('/exams', { params: { subject_id } }),
  getById: (id) => api.get(`/exams/${id}`),
  create: (data) => api.post('/exams', data),
  update: (id, data) => api.put(`/exams/${id}`, data),
  delete: (id) => api.delete(`/exams/${id}`)
};

// Results Services
export const resultsService = {
  submit: (data) => api.post('/results', data),
  getAll: (user_id, exam_id) => api.get('/results', { params: { user_id, exam_id } }),
  getById: (id) => api.get(`/results/${id}`),
  getUserStats: (user_id) => api.get(`/results/stats/${user_id}`)
};

export default api;
