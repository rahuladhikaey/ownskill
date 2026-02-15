# 📁 Skill2020 Academy - Complete Project Structure Guide

## Project Overview

```
skill2020-academy/
├── frontend/                          # React Vite Frontend
├── backend/                           # Node.js Express Backend  
├── DATABASE_SCHEMA.sql               # PostgreSQL Schema
├── README.md                         # Complete Documentation
├── QUICKSTART.md                     # 5-Minute Setup Guide
├── DEPLOYMENT.md                     # Deployment Instructions
├── API_DOCUMENTATION.md              # All API Endpoints
└── PROJECT_STRUCTURE.md              # This File
```

## 🎨 Frontend Structure (`frontend/`)

### Entry Point
```
frontend/
├── index.html                        # HTML entry point
├── src/
│   └── main.jsx                      # React DOM render
├── vite.config.js                    # Vite configuration
├── package.json                      # Dependencies
└── .env.example                      # Environment template
```

### Application Files
```
frontend/src/
├── App.jsx                           # Main App component with routing
├── App.css                           # Global styles
├── main.jsx                          # React entry point
│
├── pages/                            # Page components
│   ├── Home.jsx                      # Landing page
│   ├── StudentLogin.jsx              # Student login page
│   ├── StudentSignup.jsx             # Student registration
│   ├── AdminLogin.jsx                # Admin login (hidden route)
│   ├── Dashboard.jsx                 # Student dashboard
│   ├── SubjectsList.jsx              # List subjects
│   ├── ChaptersView.jsx              # List chapters
│   ├── NotesView.jsx                 # View study notes
│   ├── DPPView.jsx                   # Daily practice problems
│   ├── ExamView.jsx                  # List exams
│   ├── ExamTest.jsx                  # Take exam (with timer)
│   ├── ResultPage.jsx                # Show exam result
│   ├── StudentStats.jsx              # Performance analytics
│   └── AdminDashboard.jsx            # Admin control panel
│
├── components/                       # Reusable components
│   ├── Navbar.jsx                    # Navigation bar
│   ├── Footer.jsx                    # Footer component
│   ├── QuestionCard.jsx              # Question display
│   ├── ExamTimer.jsx                 # Countdown timer
│   └── ProtectedRoute.jsx            # Route protection
│
├── context/                          # React Context
│   └── AuthContext.jsx               # Authentication context & hooks
│
├── services/                         # API Services
│   └── apiService.js                 # Axios API client & methods
│
└── utils/                            # Utility functions
    └── helpers.js                    # Date, percentage, grading, etc.
```

### Key Frontend Files

#### `App.jsx` - Main Router
- Defines all routes
- Handles route protection with `ProtectedRoute`
- Manages entire app structure

#### `pages/Home.jsx` - Landing Page
- Navigation for all users
- Feature overview
- Signup/Login buttons

#### `context/AuthContext.jsx` - Auth Management
- User authentication state
- JWT token management
- Login/logout/signup functions
- `useAuth()` hook for components

#### `services/apiService.js` - API Client
- Axios configuration
- All API method definitions
- JWT token auto-inclusion
- Error handling

---

## ⚙️ Backend Structure (`backend/`)

### Entry Point
```
backend/
├── server.js                         # Main server file
├── package.json                      # Dependencies
├── .env.example                      # Environment template
└── .gitignore                        # Git ignore rules
```

### Server Configuration
```
backend/server.js
- Express app setup
- Middleware configuration
- CORS settings
- Route mounting
- Error handling
- Server startup
```

### Directory Structure
```
backend/
├── routes/                           # API route definitions
│   ├── auth.js                       # Auth endpoints
│   ├── subjects.js                   # Subject CRUD
│   ├── chapters.js                   # Chapter CRUD
│   ├── notes.js                      # Notes CRUD
│   ├── questions.js                  # Questions CRUD
│   ├── exams.js                      # Exam CRUD
│   └── results.js                    # Results handling
│
├── controllers/                      # Business logic
│   ├── authController.js             # signup,login,adminLogin
│   ├── subjectsController.js         # Subject operations
│   ├── chaptersController.js         # Chapter operations
│   ├── notesController.js            # Note operations
│   ├── questionsController.js        # Question operations
│   ├── examsController.js            # Exam operations
│   └── resultsController.js          # Result operations
│
├── middleware/                       # Express middleware
│   └── authMiddleware.js             # JWT & Admin checks
│
└── config/                           # Configuration files
    └── supabase.js                   # Supabase client setup
```

### Key Backend Files

#### `server.js` - Main Server
```javascript
- Initialize Express app
- Load environment variables
- Setup CORS middleware
- Mount all routes
- Error handling
- Start listening on PORT
```

#### `routes/auth.js` - Authentication Routes
```javascript
POST /auth/signup           - Register student
POST /auth/login            - Student login
POST /auth/admin-login      - Admin login
GET  /auth/profile          - Get user profile
```

#### `controllers/authController.js` - Auth Logic
```javascript
signup()        - Hash password, insert to DB, return JWT
login()         - Check credentials, return JWT
adminLogin()    - Verify passkey, check admin role
getProfile()    - Return user data from token
```

#### `middleware/authMiddleware.js` - Protection
```javascript
authMiddleware    - Verify JWT token, attach user to request
adminMiddleware   - Check if user is admin, block if not
```

#### `config/supabase.js` - Database
```javascript
- Initialize Supabase client
- Use SERVICE_KEY for server operations
- Export client for use in controllers
```

---

## 🗄️ Database Schema (`DATABASE_SCHEMA.sql`)

### Tables

#### `users` Table
```sql
id (UUID)           - Primary key
name               - Student/Admin name
email              - Unique email
password_hash      - Hashed password
role               - 'student' / 'admin' / 'super_admin'
class_level        - '5', '6', 'gate_cse', etc
created_at         - Registration timestamp
updated_at         - Last update timestamp
```

#### `subjects` Table
```sql
id                 - Primary key
name               - Subject name
category           - 'class5' / 'class6' / 'gate_cse', etc
description        - Subject description
created_at         - Creation timestamp
```

#### `chapters` Table
```sql
id                 - Primary key
subject_id         - Foreign key → subjects
title              - Chapter title
description        - Chapter description
created_at         - Creation timestamp
```

#### `notes` Table
```sql
id                 - Primary key
chapter_id         - Foreign key → chapters
title              - Note title
type               - 'full_note' / 'short_note'
file_url           - PDF file URL
created_at         - Upload timestamp
```

#### `questions` Table
```sql
id                 - Primary key
chapter_id         - Foreign key → chapters
question_text      - MCQ question
option_a/b/c/d     - Answer options
correct_answer     - 'A' / 'B' / 'C' / 'D'
type               - 'dpp' / 'exam'
explanation        - Answer explanation
created_at         - Creation timestamp
```

#### `exams` Table
```sql
id                 - Primary key
subject_id         - Foreign key → subjects
title              - Exam name
description        - Exam details
duration_minutes   - Time limit
question_ids       - Array of question IDs
total_marks        - Total marks
passing_marks      - Passing threshold
created_at         - Creation timestamp
```

#### `results` Table
```sql
id                 - Primary key
user_id            - Foreign key → users
exam_id            - Foreign key → exams
answers            - JSON {question_id: answer, ...}
score              - Marks obtained
total_marks        - Total possible marks
percentage         - Calculated percentage
submitted_at       - Submission timestamp
```

---

## 📡 API Flow

### Student Registration Flow
```
Frontend: signup form
    ↓
POST /api/auth/signup
    ↓
Backend: hash password
    ↓
Database: insert user
    ↓
Backend: generate JWT
    ↓
Response: token + user data
    ↓
Frontend: store token, redirect to dashboard
```

### Exam Taking Flow
```
Frontend: request exam
    ↓
GET /api/exams/:id
    ↓
Backend: fetch exam + questions (no answers)
    ↓
Frontend: display questions with timer
    ↓
Frontend: user selects answers
    ↓
Frontend: timer ends or submit clicked
    ↓
POST /api/results
    ↓
Backend: calculate score
    ↓
Database: save result
    ↓
Frontend: show result page
```

### Admin Creating Exam Flow
```
Frontend: admin dashboard
    ↓
Admin creates questions:
    POST /api/questions (one by one)
    ↓
Admin creates exam:
    POST /api/exams (with question IDs)
    ↓
Exam available to students
```

---

## 🔐 Security Architecture

### Authentication Flow
```
User Login
    ↓
POST /login with email + password
    ↓
Backend: find user, compare hashed password (bcryptjs)
    ↓
Backend: generate JWT with userId, email, role
    ↓
Frontend: store token in localStorage
    ↓
Every subsequent request includes token in header
    ↓
Backend: authMiddleware verifies token
    ↓
If valid: request continues
If invalid: 401 Unauthorized
```

### Admin Protection
```
POST /api/subjects with token
    ↓
Backend: adminMiddleware checks token
    ↓
Decode token, check role field
    ↓
If role = 'admin' or 'super_admin': request continues
If not: 403 Forbidden
```

---

## 🚀 Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
SUPABASE_URL=https://...supabase.co
SUPABASE_SERVICE_KEY=eyJh...
JWT_SECRET=min_32_characters_secret_key_here
ADMIN_PASSKEY=skill2020
```

### Frontend (vite.config.js proxy)
```javascript
proxy: {
  '/api': {
    target: 'http://localhost:5000',
    changeOrigin: true
  }
}
```

---

## 📝 File Naming Conventions

### React Components
- PascalCase: `StudentLogin.jsx`
- One component per file
- Descriptive names

### Routes
- kebab-case: `/student-login`
- Clear hierarchy: `/chapters/:subjectId`

### API Methods
- camelCase: `createQuestion()`
- CRUD pattern: create, getAll, getById, update, delete

### Database
- snake_case columns: `class_level`, `question_text`
- Timestamps: `created_at`, `updated_at`

---

## 🔄 Data Flow Example: Creating a Question

### Frontend
```jsx
function AdminCreateQuestion() {
  const [form, setForm] = useState({...});
  
  async function handleSubmit() {
    const response = await questionsService.create(form);
    // Response has question data
  }
}
```

### API Call
```javascript
// services/apiService.js
questionsService.create(data) {
  return api.post('/questions', data)
}

// Automatically includes JWT token in headers
```

### Backend Route
```javascript
// routes/questions.js
router.post('/', adminMiddleware, createQuestion)
```

### Backend Controller
```javascript
// controllers/questionsController.js
export const createQuestion = async (req, res) => {
  const { chapter_id, question_text, ... } = req.body
  
  const { data, error } = await supabase
    .from('questions')
    .insert([{...}])
    .select()
  
  res.status(201).json({...})
}
```

### Database
```sql
INSERT INTO questions (...)
VALUES (...)
RETURNING *
```

---

## 📊 Component Hierarchy

```
App
├── Home (public)
├── StudentLogin (public)
├── StudentSignup (public)
├── AdminLogin (public)
├── ProtectedRoute
│   ├── Dashboard (student)
│   ├── SubjectsList (student)
│   ├── ChaptersView (student)
│   ├── NotesView (student)
│   ├── DPPView (student)
│   ├── ExamView (student)
│   ├── ExamTest (student)
│   ├── ResultPage (student)
│   ├── StudentStats (student)
│   └── AdminDashboard (admin)
│       ├── SubjectsManager
│       ├── ChaptersManager
│       ├── NotesManager
│       ├── QuestionsManager
│       ├── ExamsManager
│       └── ResultsViewer
```

---

## 🎯 Next Steps for Extension

1. **Authentication**
   - Email verification
   - Forgot password
   - 2FA support

2. **Features**
   - Video lessons
   - Live classes
   - Discussion forum
   - Messaging system

3. **Optimization**
   - Implement caching
   - Add pagination
   - Image optimization
   - Code splitting

4. **DevOps**
   - CI/CD pipeline
   - Automated testing
   - Error tracking
   - Performance monitoring

---

**Version**: 1.0.0
**Last Updated**: January 2024
**Created for**: Skill2020 Academy
