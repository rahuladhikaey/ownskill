import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

// Pages
import Home from './pages/Home';
import StudentLogin from './pages/StudentLogin';
import StudentSignup from './pages/StudentSignup';
import Dashboard from './pages/Dashboard';
import SubjectsList from './pages/SubjectsList';
import ChaptersView from './pages/ChaptersView';
import NotesView from './pages/NotesView';
import DPPView from './pages/DPPView';
import ExamView from './pages/ExamView';
import ExamTest from './pages/ExamTest';
import ResultPage from './pages/ResultPage';
import StudentStats from './pages/StudentStats';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

// Protected Route Component
const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Admin Protected Route
const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/admin-login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={!isAuthenticated ? <StudentLogin /> : <Navigate to="/dashboard" />} />
      <Route path="/signup" element={!isAuthenticated ? <StudentSignup /> : <Navigate to="/dashboard" />} />
      <Route path="/admin-login" element={!isAuthenticated ? <AdminLogin /> : <Navigate to="/admin-dashboard" />} />

      {/* Student Routes */}
      <Route path="/dashboard" element={<ProtectedRoute requiredRole="student"><Dashboard /></ProtectedRoute>} />
      <Route path="/subjects" element={<ProtectedRoute requiredRole="student"><SubjectsList /></ProtectedRoute>} />
      <Route path="/chapters/:subjectId" element={<ProtectedRoute requiredRole="student"><ChaptersView /></ProtectedRoute>} />
      <Route path="/notes/:chapterId" element={<ProtectedRoute requiredRole="student"><NotesView /></ProtectedRoute>} />
      <Route path="/dpp/:chapterId" element={<ProtectedRoute requiredRole="student"><DPPView /></ProtectedRoute>} />
      <Route path="/exams/:subjectId" element={<ProtectedRoute requiredRole="student"><ExamView /></ProtectedRoute>} />
      <Route path="/exam/:examId/take" element={<ProtectedRoute requiredRole="student"><ExamTest /></ProtectedRoute>} />
      <Route path="/result/:resultId" element={<ProtectedRoute requiredRole="student"><ResultPage /></ProtectedRoute>} />
      <Route path="/stats" element={<ProtectedRoute requiredRole="student"><StudentStats /></ProtectedRoute>} />

      {/* Admin Routes */}
      <Route path="/admin-dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  );
}

export default App;
