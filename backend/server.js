import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import subjectsRoutes from './routes/subjects.js';
import chaptersRoutes from './routes/chapters.js';
import notesRoutes from './routes/notes.js';
import questionsRoutes from './routes/questions.js';
import examsRoutes from './routes/exams.js';
import resultsRoutes from './routes/results.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'development' ? 'http://localhost:5173' : process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/subjects', subjectsRoutes);
app.use('/api/chapters', chaptersRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/questions', questionsRoutes);
app.use('/api/exams', examsRoutes);
app.use('/api/results', resultsRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running', timestamp: new Date() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong', message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n🚀 Skill2020 Academy Backend running on http://localhost:${PORT}`);
  console.log(`📱 API Health Check: http://localhost:${PORT}/api/health\n`);
});
