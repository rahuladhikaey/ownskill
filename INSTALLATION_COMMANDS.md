# 💻 Installation & Setup Commands

Quick copy-paste commands to get Skill2020 Academy running.

## Prerequisites Check

```bash
# Check Node.js installed
node --version
npm --version

# Should show versions like v18.x.x and 9.x.x
```

## Step 1: Install Dependencies

```bash
# Go to backend
cd d:/study\ project/skill2020-academy/backend
npm install

# Go to frontend (new terminal)
cd d:/study\ project/skill2020-academy/frontend
npm install
```

## Step 2: Setup Supabase

```bash
# 1. Visit https://supabase.com
# 2. Create new project
# 3. Copy Project URL and Service Key
# 4. Go to SQL Editor
# 5. Copy & paste contents of DATABASE_SCHEMA.sql in project root
# 6. Execute the SQL
```

## Step 3: Configure Backend

```bash
# Create .env file and copy this:
cd d:/study\ project/skill2020-academy/backend

# Windows: Create file manually in VS Code
# Or use this command:
cat > .env << EOF
PORT=5000
SUPABASE_URL=your_supabase_url_here
SUPABASE_SERVICE_KEY=your_service_key_here
JWT_SECRET=super_secret_key_minimum_32_characters_long_somethinglike_thisexample
NODE_ENV=development
ADMIN_PASSKEY=skill2020
EOF
```

## Step 4: Create Admin User

```bash
# Generate password hash
node -e "console.log(require('bcryptjs').hashSync('admin123', 10))"
# Copy the output hash

# Go to Supabase SQL Editor and run:
INSERT INTO users (name, email, password_hash, role, created_at)
VALUES ('Admin User', 'admin@skill2020.com', 'PASTE_YOUR_HASH_HERE', 'admin', NOW());

# If you get an error, create the schema first:
# Copy & paste DATABASE_SCHEMA.sql contents in SQL Editor
```

## Step 5: Start Backend Server

```bash
cd d:/study\ project/skill2020-academy/backend
npm run dev

# Should see: 🚀 Skill2020 Academy Backend running on http://localhost:5000
```

## Step 6: Start Frontend Server (New Terminal)

```bash
cd d:/study\ project/skill2020-academy/frontend
npm run dev

# Should see: ➜  Local:   http://localhost:5173/
```

## Step 7: Verify Everything Works

```bash
# Test backend health
curl http://localhost:5000/api/health

# Should see:
# {"status":"Backend is running","timestamp":"..."}

# Test frontend
# Visit: http://localhost:5173
# Should see landing page
```

## Common Windows Commands

```bash
# Create .env file in backend
cd backend
type nul > .env

# Edit .env (opens in Notepad)
notepad .env

# Search for process on port
netstat -ano | findstr :5000

# Kill process on port
taskkill /PID PROCESS_ID /F

# Navigate with backslashes
cd d:\study project\skill2020-academy\backend
```

## SSH/Mac/Linux Commands

```bash
# Create .env file
touch .env

# Edit .env (nano editor)
nano .env
# Then press Ctrl+X to save

# Find process on port
lsof -i :5000

# Kill process on port
kill -9 PROCESS_ID
```

## Testing Endpoints

### Student Signup
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "class_level": "5"
  }'
```

### Admin Login
```bash
curl -X POST http://localhost:5000/api/auth/admin-login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@skill2020.com",
    "password": "admin123",
    "passkey": "skill2020"
  }'
# Copy the token from response
```

### Create Subject (with token)
```bash
curl -X POST http://localhost:5000/api/subjects \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Mathematics",
    "category": "class5"
  }'
```

### Get All Subjects
```bash
curl http://localhost:5000/api/subjects
```

## Troubleshooting Commands

```bash
# Check Node installation
node --version
npm --version

# Clear npm cache
npm cache clean --force

# Install dependencies again
rm -rf node_modules package-lock.json
npm install

# Check if port is free
netstat -an | grep 5000  # Linux/Mac
netstat -ano | findstr :5000  # Windows

# View backend logs
# Terminal will show all console.log outputs

# View frontend errors
# Browser DevTools → Console tab
```

## Stop Servers

```bash
# Terminal 1 (Backend): Press Ctrl+C
# Terminal 2 (Frontend): Press Ctrl+C

# Or kill specific ports:
# Linux/Mac:
lsof -i :5000
kill -9 PROCESS_ID

# Windows:
netstat -ano | findstr :5000
taskkill /PID PROCESS_ID /F
```

## Quick File Checklist

```bash
# Verify these files exist:
ls -la d:/study\ project/skill2020-academy/

# Should see:
# frontend/
# backend/
# DATABASE_SCHEMA.sql
# README.md
# QUICKSTART.md
# ... other docs
```

## Environment Variable Reference

```env
# Backend .env values
PORT=5000                               # Server port
NODE_ENV=development                    # or 'production'
SUPABASE_URL=https://xxxx.supabase.co   # From Supabase
SUPABASE_SERVICE_KEY=eyJh...            # From Supabase
JWT_SECRET=min32chars_key_here          # Secret for JWT
ADMIN_PASSKEY=skill2020                 # Admin passkey
```

## Quick Docker Setup (Optional)

```bash
# If you prefer to use Docker:
docker-compose up

# Or individually:

# Backend
docker build -t skill2020-backend ./backend
docker run -p 5000:5000 --env-file backend/.env skill2020-backend

# Frontend
docker build -t skill2020-frontend ./frontend
docker run -p 5173:5173 skill2020-frontend
```

## Useful npm Scripts

```bash
# Backend
npm run dev          # Start with nodemon
npm start            # Start normally

# Frontend
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

## Git Setup (Optional)

```bash
# Initialize git repo
cd d:/study\ project/skill2020-academy
git init

# Add all files
git add .

# First commit
git commit -m "Initial commit: Skill2020 Academy"

# Add remote
git remote add origin https://github.com/yourusername/skill2020-academy.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Complete Setup in One Go (Copy-Paste)

### For Maximum Speed (Windows PowerShell):
```powershell
# Navigate to project
cd "d:\study project\skill2020-academy"

# Install backend
cd backend
npm install
cd ..

# Install frontend
cd frontend
npm install
cd ..

# Setup .env file - create manually with credentials

# Start backend (keep terminal open)
cd backend
npm run dev

# In new terminal, start frontend
cd frontend
npm run dev

# Browser opens automatically to http://localhost:5173
```

---

**That's it! Your platform is running locally! 🎉**

Next: Read QUICKSTART.md for next steps
