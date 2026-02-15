# 🚀 Quick Start Guide - Skill2020 Academy

Get your learning platform running in 5 minutes!

## ⚡ 5-Minute Quick Start

### 1. Install Dependencies
```bash
# Backend
cd backend
npm install

# Frontend (in another terminal)
cd frontend
npm install
```

### 2. Setup Supabase
- Go to https://supabase.com and create a free project
- Copy your Project URL and Service Key
- Go to SQL Editor and run the contents of `DATABASE_SCHEMA.sql`

### 3. Configure Environment
```bash
cd backend
# Create .env file with:
PORT=5000
SUPABASE_URL=your_project_url_here
SUPABASE_SERVICE_KEY=your_service_key_here
JWT_SECRET=my_super_secret_key_min_32_characters_long
NODE_ENV=development
ADMIN_PASSKEY=skill2020
```

### 4. Create Admin User (Run in Supabase SQL Editor)
```bash
# Generate bcrypt hash first:
node -e "console.log(require('bcryptjs').hashSync('admin123', 10))"

# Then run this SQL:
INSERT INTO users (name, email, password_hash, role, created_at)
VALUES (
    'Admin User',
    'admin@skill2020.com',
    '$2a$10/PASTE_HASHED_PASSWORD_HERE',
    'admin',
    NOW()
);
```

### 5. Start Both Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Runs on http://localhost:5000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
# Runs on http://localhost:5173
```

## ✅ Verify Everything Works

1. **Test Backend**: Visit http://localhost:5000/api/health
   - Should show: `{"status":"Backend is running"...}`

2. **Test Frontend**: Visit http://localhost:5173
   - Should see home page

3. **Test Login**: 
   - Go to `/admin-login`
   - Use: email: `admin@skill2020.com`, password: `admin123`, passkey: `skill2020`

## 🎓 Demo Credentials

**Student Account** (Create one via signup)
- Email: student@example.com
- Password: test123456
- Class: 5

**Admin Account**
- Email: admin@skill2020.com
- Password: admin123
- Passkey: skill2020

## 📝 Adding Sample Data

### Create a Subject
```bash
curl -X POST http://localhost:5000/api/subjects \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mathematics",
    "category": "class5"
  }'
```

### Create a Chapter
```bash
curl -X POST http://localhost:5000/api/chapters \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "subject_id": "SUBJECT_ID_FROM_ABOVE",
    "title": "Number Systems"
  }'
```

### Create a Question
```bash
curl -X POST http://localhost:5000/api/questions \
  -H "Authorization: Bearer YOUR_ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "chapter_id": "CHAPTER_ID",
    "question_text": "What is 5 + 3?",
    "option_a": "7",
    "option_b": "8",
    "option_c": "9",
    "option_d": "10",
    "correct_answer": "B",
    "type": "dpp"
  }'
```

## 🔑 Getting Admin JWT Token

```bash
curl -X POST http://localhost:5000/api/auth/admin-login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@skill2020.com",
    "password": "admin123",
    "passkey": "skill2020"
  }'
```

Response will include `token` - use this in Authorization header.

## 🐛 Common Issues

### Issue: "Cannot POST /api/auth/login"
- **Solution**: Check backend is running on 5000
- **Command**: `npm run dev` in backend folder

### Issue: "SUPABASE_URL not found"
- **Solution**: Create `.env` file in backend folder
- **Check**: Verify SUPABASE_URL and SERVICE_KEY are correct

### Issue: "Database connection failed"
- **Solution**: Run DATABASE_SCHEMA.sql in Supabase
- **Check**: Verify credentials in .env

### Issue: "Frontend can't fetch data"
- **Solution**: Check API URL in `frontend/src/services/apiService.js`
- **Check**: Ensure backend is running

### Issue: "CORS error"
- **Solution**: Backend CORS is configured for `localhost:5173`
- **Check**: Update if using different port

## 📂 Project Structure

```
skill2020-academy/
├── frontend/              # React app
│   ├── src/pages/        # All pages here
│   ├── vite.config.js
│   └── package.json
├── backend/              # Express server
│   ├── routes/           # All API routes
│   ├── controllers/       # Business logic
│   ├── server.js
│   └── .env              # Your config
└── DATABASE_SCHEMA.sql   # Run in Supabase
```

## 🎯 Next Steps

1. Create subjects using admin panel
2. Add chapters to subjects
3. Create MCQ questions
4. Create exams with questions
5. Test with student account
6. Add more content
7. Deploy to Render & Netlify

## 🚀 Deploy Later

When ready to go live:

1. **Backend**: https://render.com
2. **Frontend**: https://netlify.com
3. **See**: `DEPLOYMENT.md` for full guide

## 💡 Tips

- Use Postman to test API endpoints
- Enable Supabase email auth for real signup
- Add file storage for PDFs
- Implement forgot password feature
- Add email notifications

## 📞 Need Help?

1. Check `README.md` for full documentation
2. Check `DEPLOYMENT.md` for deployment help
3. Check `DATABASE_SCHEMA.sql` for database structure
4. Check backend logs: `console.log()` is your friend

---

**Happy Coding! 🎓**

Your platform is ready to welcome students!
