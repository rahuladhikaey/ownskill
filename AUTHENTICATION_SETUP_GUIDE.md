## 🎯 Authentication System - Complete Setup & Testing Guide

### 📋 Authentication Flow Overview

```
STUDENT PATH:
StudentSignup/StudentLogin → Backend Validation → JWT Token Generated 
→ Token Stored in localStorage → AuthContext Updates User State 
→ Navigate to /dashboard → ProtectedRoute Accepts (role='student') 
→ Dashboard Component Renders

ADMIN PATH:
AdminSignup/AdminLogin → Backend Validation (with passkey) → JWT Token Generated 
→ Token Stored in localStorage + isAdmin flag → AuthContext Updates User State 
→ Navigate to /admin-dashboard → AdminRoute Accepts (isAdmin=true) 
→ AdminDashboard Component Renders
```

### ✅ Component Configuration Status

#### Frontend Components
1. **StudentSignup.jsx** ✅
   - Route: `/signup`
   - Navigation: → `/dashboard` on success
   - Error Display: `err.details || err.error`
   - Role: Student (implicitly set by signup endpoint)

2. **StudentLogin.jsx** ✅
   - Route: `/login`
   - Navigation: → `/dashboard` on success
   - Error Display: `err.details || err.error`
   - Role: Student (verified by backend)

3. **AdminSignup.jsx** ✅
   - Route: `/admin-signup`
   - Navigation: → `/admin-dashboard` on success
   - Error Display: `err.details || err.error`
   - Role: Admin (set by master passkey verification)
   - Fields: name, email, password, confirmPassword, adminPasskey, masterPasskey

4. **AdminLogin.jsx** ✅
   - Route: `/admin-login`
   - Navigation: → `/admin-dashboard` on success
   - Error Display: `err.details || err.error`
   - Fields: email, password, passkey
   - Role: Admin (verified by role and passkey check)

5. **Dashboard.jsx** ✅
   - Route: `/dashboard`
   - Protected by: `ProtectedRoute requiredRole="student"`
   - Redirects to: `/login` if not authenticated
   - Redirects to: `/` if wrong role
   - Displays: User name, class_level, statistics

6. **AdminDashboard.jsx** ✅
   - Route: `/admin-dashboard`
   - Protected by: `AdminRoute` (isAdmin check)
   - Redirects to: `/admin-login` if not authenticated
   - Redirects to: `/` if not admin
   - Displays: Admin name, feature cards, statistics

#### AuthContext ✅
```javascript
Methods Available:
- signup(name, email, password, class_level)
- login(email, password)
- adminLogin(email, password, passkey)
- adminSignup(name, email, password, confirmPassword, adminPasskey, masterPasskey)
- logout()

State Properties:
- user: { id, name, email, role, class_level, created_at }
- token: JWT token string
- loading: boolean
- isAuthenticated: !!token
- isAdmin: user?.role === 'admin' || user?.role === 'super_admin'
```

#### Backend Routes ✅
```
POST /api/auth/signup
  Request: { name, email, password, class_level }
  Response: { message, token, user: { id, name, email, role } }
  Errors: Email format, password length, duplicate email, missing fields

POST /api/auth/login
  Request: { email, password }
  Response: { message, token, user: { id, name, email, role, class_level } }
  Errors: Invalid email, user not found, wrong password, account inactive

POST /api/auth/admin-login
  Request: { email, password, passkey }
  Response: { message, token, user: { id, name, email, role } }
  Errors: Invalid passkey, wrong password, user not found, account inactive

POST /api/auth/admin-signup
  Request: { name, email, password, confirmPassword, adminPasskey, masterPasskey }
  Response: { message, token, user: { id, name, email, role } }
  Errors: Master passkey invalid, duplicate email, password mismatch, email format, password length

GET /api/auth/profile (Protected - requires token)
  Response: { id, name, email, role, class_level }
```

### 🧪 Step-by-Step Testing Guide

#### Test 1: Student Signup
**Steps:**
1. Navigate to `http://localhost:5173/signup`
2. Fill in:
   - Full Name: `John Student`
   - Email: `john@example.com`
   - Class: `Class 10`
   - Password: `password123`
   - Confirm Password: `password123`
3. Click "Sign Up"

**Expected Results:**
✅ Form validates all fields
✅ Backend checks email validity (regex validation)
✅ Backend checks password length (min 6)
✅ Backend checks for duplicate email
✅ Account created with role = 'student'
✅ Token generated and stored in localStorage
✅ User redirects to `/dashboard`
✅ Dashboard shows student name and class level

**Error Test Cases:**
- Invalid email: `john@example` → Error: "Invalid email format"
- Short password: `pass` → Error: "Password too short"
- Passwords don't match → Error: "Passwords do not match"
- Duplicate email → Error: "Email already registered"
- Missing fields → Error: "All fields are required"

#### Test 2: Student Login
**Steps:**
1. Navigate to `http://localhost:5173/login`
2. Fill in:
   - Email: `john@example.com`
   - Password: `password123`
3. Click "Login"

**Expected Results:**
✅ Backend validates email format
✅ Backend verifies password with bcrypt
✅ Backend checks account is active (is_active = true)
✅ Backend verifies user role is 'student'
✅ Token generated and stored
✅ User redirects to `/dashboard`
✅ Can access protected student routes

**Error Test Cases:**
- Wrong password → Error: "Invalid password"
- User not found → Error: "User not found"
- Account inactive → Error: "Account disabled"

#### Test 3: Admin Signup
**Steps:**
1. Navigate to `http://localhost:5173/admin-signup`
2. Fill in:
   - Full Name: `Admin User`
   - Email: `admin@example.com`
   - Password: `adminpass123`
   - Confirm Password: `adminpass123`
   - Personal Passkey: `myAdminKey123`
   - Master Passkey: `skill2020master` (from .env)
3. Click "Create Admin Account"

**Expected Results:**
✅ Form validates all fields
✅ Backend validates master passkey (must match env variable)
✅ Backend checks email validity
✅ Backend checks password length
✅ Backend prevents duplicate emails
✅ "Personal Passkey" stored as admin_passkey in database
✅ Account created with role = 'admin'
✅ Token generated
✅ User redirects to `/admin-dashboard`
✅ Admin dashboard displays feature cards

**Error Test Cases:**
- Wrong master passkey: `wrongkey` → Error: "Invalid master passkey. You do not have permission to create admin accounts"
- Duplicate email → Error: "Email already registered"
- Password mismatch → Error: "Passwords do not match"
- No master passkey → Error: "All fields are required"

#### Test 4: Admin Login
**Steps:**
1. Navigate to `http://localhost:5173/admin-login`
2. Fill in:
   - Admin Email: `admin@example.com`
   - Password: `adminpass123`
   - Admin Passkey: `myAdminKey123`
3. Click "Admin Login"

**Expected Results:**
✅ Backend finds admin by email and role='admin'
✅ Backend verifies password with bcrypt
✅ Backend verifies individual passkey matches admin_passkey
✅ Backend checks account is active
✅ Token generated
✅ isAdmin flag set in localStorage
✅ User redirects to `/admin-dashboard`
✅ Can access admin feature pages (upload-notes, create-exam, etc)

**Error Test Cases:**
- Wrong passkey → Error: "Invalid passkey. The passkey you entered is incorrect"
- Wrong password → Error: "Invalid password"
- Admin not found → Error: "Admin user not found"

#### Test 5: Route Protection - Student
**Steps:**
1. Without logging in, try to access `http://localhost:5173/dashboard`

**Expected Results:**
✅ Redirects to `/login` (protected route requires authentication)

**Steps:**
2. Student logs in as admin (somehow gets admin token)
3. Try to access `http://localhost:5173/dashboard`

**Expected Results:**
✅ Redirects to `/` (wrong role for this route)

#### Test 6: Route Protection - Admin
**Steps:**
1. Without logging in, try to access `http://localhost:5173/admin-dashboard`

**Expected Results:**
✅ Redirects to `/admin-login`

**Steps:**
2. Student logs in
3. Try to access `http://localhost:5173/admin-dashboard`

**Expected Results:**
✅ Redirects to `/` (not an admin)

#### Test 7: Profile Access
**Steps:**
1. After logging in (student or admin)
2. Make API call to GET `/api/auth/profile` with token

**Expected Results:**
✅ Returns user profile with all fields
✅ Requires valid JWT token in header: `Authorization: Bearer {token}`
✅ Invalid/missing token returns 401 error

#### Test 8: Logout
**Steps:**
1. Student/Admin logged in and on dashboard
2. Click logout button

**Expected Results:**
✅ Token removed from localStorage
✅ isAdmin flag removed
✅ User state cleared
✅ Redirects to home page `/`
✅ Cannot access protected routes anymore

#### Test 9: Token Expiration (Optional)
**Requirements:** Modify JWT expiration or wait 7 days
**Steps:**
1. Login with valid credentials
2. Wait for token to expire
3. Try to access protected route

**Expected Results:**
✅ Token rejected
✅ User redirected to login page
✅ Helpful message: "Session expired, please login again"

### 📊 Database Schema Required

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  role TEXT DEFAULT 'student' -- 'student', 'admin', 'super_admin'
  class_level TEXT, -- For students: 'Class 5' to 'Class 10', 'gate_cse', etc.
  admin_passkey TEXT, -- For admins: individual passkey
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

### 🔐 Environment Variables Required

```bash
# Backend .env file
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
MASTER_PASSKEY=skill2020master
ADMIN_PASSKEY=default-admin-passkey
SUPABASE_URL=https://your-supabase-project.supabase.co
SUPABASE_KEY=your-supabase-anon-key
NODE_ENV=development
PORT=5000

# Frontend .env (if needed)
VITE_API_URL=http://localhost:5000
```

### 🎯 Error Response Format

All authentication endpoints return errors in consistent format:

```javascript
{
  error: "User-friendly error title",
  details: "Specific reason for the error"
}
```

Frontend pages display: `error.details || error.error`

This ensures users see helpful, specific error messages like:
- ✅ "Invalid email format - Please enter a valid email address"
- ✅ "Password too short - Password must be at least 6 characters long"
- ✅ "Invalid passkey - The passkey you entered is incorrect"

### 📱 Responsive Design

All authentication pages are responsive:
- Desktop: Full width form with side info panel
- Tablet: Adjusted spacing and font sizes
- Mobile: Single column layout, touch-friendly buttons

### 🔄 Authentication Flow Diagram

```
┌─────────────────────────────────────────────────┐
│         Home Page (Public)                      │
└──────────────┬────────────────┬─────────────────┘
                │                │
                ▼                ▼
        ┌──────────────┐   ┌──────────────┐
        │ Student Path │   │  Admin Path  │
        └──────┬───────┘   └──────┬───────┘
               │                  │
        ┌──────┴─────┐      ┌─────┴──────┐
        ▼            ▼      ▼            ▼
      Login        Signup AdminLogin  AdminSignup
        │            │      │            │
        └────┬───────┘      └───┬────────┘
             │                  │
             ▼                  ▼
         Validate            Validate +
         Credentials      Master Passkey
             │                  │
        ┌────┴─────────────┬────┘
        ▼                  ▼
    Set Token           Set Token
    + User State       + isAdmin Flag
        │                  │
        │         ┌────────┘
        │         │
        ▼         ▼
    Navigation Decision
        │
        ├─ Dashboard (student)
        ├─ Admin Dashboard (admin)
        └─ Home (invalid)
```

### ✨ Success Indicators

When testing, you'll know authentication is working properly when:

✅ Student can signup with email validation
✅ Student can login with password verification  
✅ Student redirects to `/dashboard` after login
✅ Admin can signup with master passkey verification
✅ Admin receives individual passkey requirement for login
✅ Admin can login with email + password + passkey
✅ Admin redirects to `/admin-dashboard` after login
✅ Protected routes properly filter by role
✅ Error messages are detailed and helpful
✅ Token stored in localStorage
✅ Logout clears all auth state
✅ Pages show user-specific information (name, role, class)

### 🚀 Production Checklist

Before deploying to production:
- [ ] Change JWT_SECRET to a secure random string
- [ ] Change MASTER_PASSKEY to a secure random string
- [ ] Set NODE_ENV=production
- [ ] Enable HTTPS on frontend and backend
- [ ] Add rate limiting to auth endpoints (prevent brute force)
- [ ] Add email verification (optional)
- [ ] Add password reset functionality (optional)
- [ ] Add admin approval workflow for new admins (optional)
- [ ] Add audit logging for admin actions
- [ ] Set up error monitoring (Sentry, LogRocket, etc)
- [ ] Test all authentication flows thoroughly
- [ ] Document admin account recovery process
