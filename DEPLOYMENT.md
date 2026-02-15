# Skill2020 Academy - Deployment Guide

Complete deployment instructions for frontend, backend, and database.

## 📋 Prerequisites

- GitHub account (for version control)
- Netlify account (for frontend)
- Render or Railway account (for backend)
- Supabase account (already set up)

## 🌐 Deployment Checklist

### Phase 1: Database Setup ✅
- [x] Create Supabase project
- [x] Run DATABASE_SCHEMA.sql
- [x] Create admin user
- [x] Test database connections

### Phase 2: Backend Deployment

#### Step 1: Prepare Backend for Deployment

```bash
cd backend
npm run build
```

Ensure these are in `package.json`:
```json
{
  "type": "module",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
}
```

#### Step 2: Push to GitHub

```bash
cd skill2020-academy
git init
git add .
git commit -m "Initial commit: Skill2020 Academy"
git branch -M main
git remote add origin https://github.com/yourusername/skill2020-academy.git
git push -u origin main
```

#### Step 3: Deploy to Render

1. Go to https://render.com
2. Click "New +" → "Web Service"
3. Select your GitHub repository
4. Configure:
   - **Name**: skill2020-academy-backend
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: Free (or Paid)

5. Add Environment Variables:
   - `PORT`: 5000
   - `SUPABASE_URL`: your_url
   - `SUPABASE_SERVICE_KEY`: your_key
   - `JWT_SECRET`: your_secret (min 32 chars)
   - `NODE_ENV`: production
   - `ADMIN_PASSKEY`: skill2020

6. Click "Create Web Service"
7. Wait for deployment (takes 1-2 minutes)
8. Copy the backend URL: `https://your-backend.onrender.com`

#### Alternative: Deploy to Railway

1. Go to https://railway.app
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add variables in Railway dashboard
5. Deploy

### Phase 3: Frontend Deployment

#### Step 1: Update API URL

In `frontend/src/services/apiService.js`:

```javascript
const API_BASE_URL = 'https://your-backend-url.onrender.com/api';
```

#### Step 2: Build Frontend

```bash
cd frontend
npm run build
```

This creates a `dist` folder with optimized production build.

#### Step 3: Deploy to Netlify

**Option A: Drag & Drop**

1. Go to https://netlify.com
2. Sign in with GitHub
3. Drag and drop the `frontend/dist` folder
4. Done! Your site is live

**Option B: GitHub Integration**

1. Go to https://netlify.com
2. Click "New site from Git"
3. Connect GitHub
4. Select your repository
5. Configure:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
   - **Base Directory**: `frontend`

6. Add Environment Variables:
   - `REACT_APP_API_URL`: https://your-backend-url.onrender.com/api

7. Click "Deploy site"

### Phase 4: Custom Domain (Optional)

#### For Backend (Render):
1. Go to Render dashboard
2. Select your service
3. Go to Settings → Custom Domain
4. Add your domain (e.g., api.skill2020.com)
5. Update DNS records as shown

#### For Frontend (Netlify):
1. Go to Netlify Site Settings
2. Domain Management
3. Add custom domain
4. Update DNS records

### Phase 5: SSL Certificates (Auto)

Both Netlify and Render provide free SSL certificates automatically.

## 🔄 Continuous Integration/Deployment

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Render
        run: |
          curl https://api.render.com/deploy/srv-${{ secrets.RENDER_SERVICE_ID }}?key=${{ secrets.RENDER_API_KEY }}

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - run: |
          cd frontend
          npm install
          npm run build
      - uses: actions/deploy-pages@v1
        with:
          folder: frontend/dist
```

## 🧪 Testing After Deployment

### Test Backend

```bash
curl https://your-backend-url.onrender.com/api/health
```

Expected response:
```json
{
  "status": "Backend is running",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Test Database Connection

```bash
curl -X POST https://your-backend-url.onrender.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"testpass"}'
```

### Test Frontend

1. Visit https://your-frontend-url.netlify.app
2. Try student login/signup
3. Check admin login route (/admin-login)

## 📊 Monitoring & Logs

### Render Backend Logs
1. Go to Render dashboard
2. Select your service
3. Click "Logs" tab

### Netlify Frontend Logs
1. Go to Netlify dashboard
2. Select your site
3. Click "Deploys" → View deploy logs

### Supabase Database
1. Go to Supabase dashboard
2. View real-time data in Table Editor
3. Check Storage for uploaded files

## 🔒 Security in Production

- [x] JWT tokens for authentication
- [x] HTTPS/SSL for all connections
- [x] Environment variables for secrets
- [x] Role-based access control
- [x] Input validation on backend
- [x] CORS configured properly
- [x] Rate limiting on API
- [x] Secure password hashing

## 🚨 Troubleshooting Deployment

### Backend not starting?
```bash
# Check build logs in Render
# Verify all dependencies in package.json
# Check environment variables are set
```

### Frontend can't reach backend?
```bash
# Verify REACT_APP_API_URL is correct
# Check CORS is enabled on backend
# Test API endpoint directly
```

### Database connection failing?
```bash
# Verify SUPABASE_URL format
# Check SERVICE_KEY is valid
# Test connection with psql
```

## 📈 Scaling Checklist

As your platform grows:

- [ ] Upgrade Render plan for better performance
- [ ] Add database backups
- [ ] Setup CDN for static assets
- [ ] Add caching layer (Redis)
- [ ] Implement rate limiting
- [ ] Add monitoring/alerts
- [ ] Setup error tracking (Sentry)
- [ ] Optimize database queries

## 🎯 Post-Deployment Tasks

1. **Monitor Performance**
   - Check Render backend metrics
   - Check Netlify analytics
   - Monitor Supabase database

2. **User Feedback**
   - Set up feedback form
   - Monitor error logs
   - Track user engagement

3. **Regular Maintenance**
   - Update dependencies monthly
   - Review security logs
   - Backup database regularly

4. **Marketing**
   - Share deployed link with students
   - Gather feedback for improvements
   - Plan future features

## 📞 Support

If deployment fails:
1. Check error logs in respective dashboards
2. Verify all environment variables
3. Ensure database schema is complete
4. Test locally before deploying again

---

**Your application is now live! 🎉**

Visit: https://your-frontend-url.netlify.app
API: https://your-backend-url.onrender.com/api
