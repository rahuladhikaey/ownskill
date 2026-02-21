# 🎓 Skill2020 Academy - Complete Learning Platform

A full-stack student learning platform with React frontend, Node.js backend, and Supabase database. Designed for school students (Classes 5-10) and GATE exam preparation.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Database Schema](#database-schema)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Security](#security)

## ✨ Features

### 👨‍🎓 Student Features
- **Authentication**: Signup, Login, Profile Management
- **Study Materials**: Access to study notes and short notes
- **Daily Practice Problems (DPP)**: Chapter-wise MCQ practice
- **Live MCQs Exams**: Timer-based full exams with immediate results
- **Performance Analytics**: Detailed statistics and progress tracking
- **Multiple Categories**: Class 5-10 and GATE subjects

### 👩‍🏫 Admin/Teacher Features
- **Content Management**: Create subjects and chapters
- **Document Upload**: Upload PDF notes
- **Question Bank**: Create and manage MCQ questions
- **Exam Creation**: Create full-featured exams with custom settings
- **Results Tracking**: View student performance and results
- **Secure Admin Portal**: Hidden route with passkey authentication

## 🛠️ Tech Stack

### Frontend
- **React 18** (with Vite)
- **Bootstrap 5** - UI Framework
- **React Router v6** - Routing
- **Axios** - HTTP Client

### Backend
- **Node.js** - JavaScript Runtime
- **Express.js** - Web Framework
- **Supabase** - PostgreSQL Database
- **JWT** - Authentication
- **bcryptjs** - Password Hashing

### Deployment
- **Frontend**: Netlify
- **Backend**: Render/Railway
- **Database**: Supabase

## 📁 Project Structure

```
skill2020-academy/
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/          # Page components
│   │   │   ├── Home.jsx
│   │   │   ├── StudentLogin.jsx
│   │   │   ├── StudentSignup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── AdminLogin.jsx
│   │   │   └── AdminDashboard.jsx
│   │   ├── services/       # API services
│   │   ├── context/        # React Context (Auth)
│   │   ├── utils/          # Helper functions
│   │   ├── App.jsx
│   │   └── App.css
│   ├── public/
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── backend/
│   ├── routes/             # API Routes
│   │   ├── auth.js
│   │   ├── subjects.js
│   │   ├── chapters.js
│   │   ├── notes.js
│   │   ├── questions.js
│   │   ├── exams.js
│   │   └── results.js
│   ├── controllers/        # Business Logic
│   ├── middleware/         # Authentication & Authorization
│   ├── config/            # Supabase Config
│   ├── server.js          # Main Server File
│   ├── package.json
│   └── .env.example
│
└── DATABASE_SCHEMA.sql     # SQL Schema for Supabase

```

## 🗄️ Database Schema

### Tables
1. **users** - Student and admin accounts
2. **subjects** - Subjects organized by category (class/GATE)
3. **chapters** - Chapters within subjects
4. **notes** - Study materials (full notes & short notes)
5. **questions** - MCQ database (DPP & exam questions)
6. **exams** - Full exams with multiple questions
7. **results** - Student exam results and scores

See `DATABASE_SCHEMA.sql` for complete schema.

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- Supabase Account
- Git

### 1. Clone and Setup

```bash
cd skill2020-academy
cd frontend
npm install
cd ../backend
npm install
```

### 2. Setup Environment Variables

Create `.env` in backend folder:

```bash
cp .env.example .env
```

Edit `.env`:
```
PORT=5000
SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_KEY=your_supabase_service_key
JWT_SECRET=your_secret_min_32_characters_long
NODE_ENV=development
ADMIN_PASSKEY=skill2020
```

### 3. Setup Supabase Database

1. Create a Supabase project at https://supabase.com
2. Go to SQL Editor
3. Copy and run the SQL from `DATABASE_SCHEMA.sql`
4. Copy your Supabase URL and Service Key to `.env`

### 4. Create Admin User

Run this SQL in Supabase:

```sql
INSERT INTO users (name, email, password_hash, role)
VALUES (
    'Admin User',
    'admin@skill2020.com',
    '$2a$10$...',  -- bcrypt hash of 'password'
    'admin'
);
```

To generate bcrypt hash:
```bash
node -e "console.log(require('bcryptjs').hashSync('password', 10))"
```

### 5. Start Development Servers

#### Backend Terminal:
```bash
cd backend
npm run dev
```

Backend runs on: http://localhost:5000

#### Frontend Terminal:
```bash
cd frontend
npm run dev
```
                         
Frontend runs on: http://localhost:5173

### 6. Access the Application

- **Student**: http://localhost:5173
- **Admin**: http://localhost:5173/admin-login
- **API Health**: http://localhost:5000/api/health

## 📡 API Endpoints

### Authentication
```
POST   /api/auth/signup              - Student registration
POST   /api/auth/login               - Student login
POST   /api/auth/admin-login         - Admin login
GET    /api/auth/profile             - Get user profile
```

### Subjects
```
GET    /api/subjects                 - Get all subjects
GET    /api/subjects/:id             - Get subject by ID
POST   /api/subjects                 - Create subject (Admin)
PUT    /api/subjects/:id             - Update subject (Admin)
DELETE /api/subjects/:id             - Delete subject (Admin)
```

### Chapters
```
GET    /api/chapters                 - Get chapters
GET    /api/chapters/:id             - Get chapter by ID
POST   /api/chapters                 - Create chapter (Admin)
PUT    /api/chapters/:id             - Update chapter (Admin)
DELETE /api/chapters/:id             - Delete chapter (Admin)
```

### Notes
```
GET    /api/notes                    - Get notes
POST   /api/notes                    - Upload note (Admin)
PUT    /api/notes/:id                - Update note (Admin)
DELETE /api/notes/:id                - Delete note (Admin)
```

### Questions (MCQ)
```
GET    /api/questions                - Get questions
POST   /api/questions                - Create question (Admin)
PUT    /api/questions/:id            - Update question (Admin)
DELETE /api/questions/:id            - Delete question (Admin)
```

### Exams
```
GET    /api/exams                    - Get exams
GET    /api/exams/:id                - Get exam with questions
POST   /api/exams                    - Create exam (Admin)
PUT    /api/exams/:id                - Update exam (Admin)
DELETE /api/exams/:id                - Delete exam (Admin)
```

### Results
```
POST   /api/results                  - Submit exam result
GET    /api/results                  - Get results
GET    /api/results/stats/:user_id   - Get user statistics
GET    /api/results/:id              - Get result by ID
```

## 🔐 Security Features

✅ **JWT Authentication** - Token-based auth
✅ **Password Hashing** - bcryptjs encryption
✅ **Admin Middleware** - Role-based access control
✅ **Protected Routes** - Frontend route protection
✅ **Environment Variables** - Secure credential management
✅ **CORS Protection** - Cross-origin request handling

## 📦 Deployment

### Deploy Backend to Render

1. Push code to GitHub
2. Go to https://render.com
3. Create New → Web Service
4. Connect GitHub repository
5. Set environment variables in Render dashboard
6. Deploy

### Deploy Frontend to Netlify

1. Build the frontend:
```bash
cd frontend
npm run build
```

2. Go to https://netlify.com
3. Drag & drop the `dist` folder OR
4. Connect GitHub and enable auto-deployment

### Update API URL in Frontend

In `frontend/src/services/apiService.js`:
```javascript
const API_BASE_URL = 'https://your-backend-url.com/api';
```

## 🔧 Admin Login

- **Route**: `/admin-login`
- **Default Passkey**: `skill2020`
- **Credentials**: Use any admin user created in database
- **Access**: Subjects, Chapters, Notes, Questions, Exams, Results

## 📊 User Roles

| Role | Access |
|------|--------|
| **Student** | Study, DPP, Exams, Results |
| **Admin** | Create content, upload notes, view results |
| **Super Admin** | Full system control |

## 🎯 Class Levels

- Class 5-10
- GATE CSE, EE, EC, ME, CE

## 📝 Example Data

To add sample data, create a new file `seed_data.sql` and run:

```sql
INSERT INTO subjects (name, category) VALUES
('Mathematics', 'class5'),
('Science', 'class5'),
('Data Structures', 'gate_cse');
```

## 🐛 Troubleshooting

**Backend connection error?**
- Check SUPABASE_URL and SERVICE_KEY in .env
- Verify backend is running on port 5000

**Frontend not fetching data?**
- Check API base URL in apiService.js
- Verify backend CORS is configured

**Login failing?**
- Ensure JWT_SECRET is same on backend
- Check database user exists with correct role

## 📚 Documentation

- See `DATABASE_SCHEMA.sql` for complete schema
- See `backend/.env.example` for environment variables
- Routes are documented in respective files

## 🎉 Features to Add

- [ ] Email verification
- [ ] Forgot password functionality
- [ ] Real-time notifications
- [ ] Student messaging
- [ ] Discussion forums
- [ ] Video explanations
- [ ] Mobile app (React Native)
- [ ] AI-powered recommendations

## 📞 Support

For issues and questions, please open an issue on GitHub.

## 📄 License

This project is open source and available under the MIT License.

---

**Happy Learning! 🚀**

Built with ❤️ for students
