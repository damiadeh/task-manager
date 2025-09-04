# 🚀 Deploy Task Manager to Render (Free Plan)

This guide will walk you through deploying your Task Manager application to Render's free tier.

## 📋 Prerequisites

- [GitHub account](https://github.com)
- [Render account](https://render.com) (free)
- Your task-manager project pushed to GitHub

## 🔧 Pre-deployment Setup

### 1. Push Your Code to GitHub

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit for Render deployment"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/task-manager.git
git push -u origin main
```

### 2. Verify Project Structure

Ensure your project has this structure:
```
task-manager/
├── backend/
│   ├── src/
│   ├── package.json
│   ├── tsconfig.json
│   └── prisma/
├── frontend/
│   ├── src/
│   ├── package.json
│   └── public/
├── render.yaml
└── README.md
```

### 3. Test Database Seeding (Optional)

Before deployment, you can test the database seeding locally:

```bash
# Set up database and seed with sample data
npm run db:setup
npm run db:seed
```

This will create 2 sample tasks:
- ✅ **Welcome to Task Manager!** (Completed, High Priority)
- ⏳ **Explore the Features** (Pending, Medium Priority)

## 🌐 Deploy to Render

### Step 1: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with your GitHub account
3. Verify your email

### Step 2: Deploy Frontend (Free)

1. **Click "New +" → "Static Site"**
2. **Connect your GitHub repository**
   - Select `task-manager` repository
   - Click "Connect"

3. **Configure Frontend Service:**
   - **Name**: `task-manager-frontend`
   - **Branch**: `main`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/build`
   - **Plan**: `Free`

4. **Add Environment Variables:**
   - **Key**: `REACT_APP_API_URL` → **Value**: `https://YOUR_BACKEND_URL.onrender.com/api`
   - You'll set this after deploying the backend

5. **Click "Create Static Site"**

### Step 3: Deploy Backend (Paid - $7/month)

1. **Click "New +" → "Web Service"**
2. **Connect your GitHub repository**
   - Select `task-manager` repository
   - Click "Connect"

3. **Configure Backend Service:**
   - **Name**: `task-manager-api`
   - **Environment**: `Node`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Build Command**: `cd backend && npm install && npm run build`
   - **Start Command**: `cd backend && npm start`
   - **Plan**: `Starter` ($7/month)

4. **Add Environment Variables:**
   - **Key**: `NODE_ENV` → **Value**: `production`
   - **Key**: `PORT` → **Value**: `10000`
   - **Key**: `DATABASE_URL` → **Value**: `file:./prisma/dev.db`
   - **Key**: `CORS_ORIGIN` → **Value**: `https://task-manager-frontend.onrender.com`

5. **Click "Create Web Service"**

### Step 4: Update Frontend API URL

After backend deployment:
1. Go to your frontend service
2. Add/Update environment variable:
   - **Key**: `REACT_APP_API_URL`
   - **Value**: `https://YOUR_BACKEND_NAME.onrender.com/api`
3. Redeploy frontend

## 🔄 Alternative: Use render.yaml (Recommended)

If you prefer automated deployment:

1. **Click "New +" → "Blueprint"**
2. **Connect your GitHub repository**
3. **Select the repository** and click "Connect"
4. **Render will automatically detect `render.yaml`**
5. **Click "Create New Environment Instance"**

**Note**: This will create both services with the correct plans.

## 🆓 Free Alternatives for Backend

If you want to keep costs at $0:

### Option 1: Railway (Free Tier)
- 500 hours/month free
- Perfect for Node.js applications
- Easy deployment from GitHub

### Option 2: Render + Free Backend Alternative
- Frontend on Render (free)
- Backend on Railway, Heroku, or similar (free tier)

### Option 3: Vercel + Supabase
- Frontend on Vercel (free)
- Backend on Supabase (free tier)

## 📊 Post-Deployment

### 1. Wait for Build Completion
- Backend: ~5-10 minutes
- Frontend: ~3-5 minutes

### 2. Test Your Application
- **Backend Health Check**: `https://task-manager-api.onrender.com/health`
- **Frontend**: `https://task-manager-frontend.onrender.com`

### 3. Verify API Endpoints
```bash
# Test backend
curl https://task-manager-api.onrender.com/health
curl https://task-manager-api.onrender.com/api/tasks

# Test frontend (should load without errors)
open https://task-manager-frontend.onrender.com
```

## 🚨 Important Notes

### Plan Limitations
- **Frontend (Free)**: Always available
- **Backend (Starter - $7/month)**: Always available, no sleep
- **Database**: SQLite file (persists between deployments)

### Cost Breakdown
- **Frontend**: $0/month (free forever)
- **Backend**: $7/month (always running)
- **Total**: $7/month for full-stack app

### Database Persistence
- SQLite database is stored in the service
- Data persists between deployments
- Starter plan provides reliable uptime

## 🔧 Troubleshooting

### Common Issues

1. **Build Failures**
   - Check build logs in Render dashboard
   - Verify all dependencies are in `package.json`
   - Ensure TypeScript compilation succeeds

2. **CORS Errors**
   - Verify `CORS_ORIGIN` environment variable
   - Check frontend URL matches backend CORS config

3. **Database Issues**
   - Ensure Prisma generates client: `npm run db:generate`
   - Check database file permissions

4. **Environment Variables**
   - Verify all required variables are set
   - Check variable names match code exactly

### Debug Commands

```bash
# Check backend logs
# Go to Render dashboard → Your Backend Service → Logs

# Check frontend build
# Go to Render dashboard → Your Frontend Service → Build Logs

# Test locally with production config
cd backend
NODE_ENV=production npm start
```

## 📈 Monitoring

### Render Dashboard
- **Logs**: Real-time application logs
- **Metrics**: Response times, error rates
- **Deployments**: Build and deployment history

### Health Checks
- Backend: `/health` endpoint
- Frontend: Static file serving

## 🔄 Updates

### Deploy Updates
1. Push changes to GitHub
2. Render automatically detects changes
3. Triggers new build and deployment
4. Zero-downtime updates

### Rollback
- Go to Render dashboard
- Select your service
- Click "Manual Deploy"
- Choose previous commit

## 🎉 Success!

Your Task Manager is now live on Render! 

- **Frontend**: `https://task-manager-frontend.onrender.com` (Free)
- **Backend API**: `https://task-manager-api.onrender.com` ($7/month)
- **Health Check**: `https://task-manager-api.onrender.com/health`

## 💡 Cost Optimization Tips

1. **Development**: Use local development for testing
2. **Staging**: Deploy to free tier alternatives for testing
3. **Production**: Use Render for reliable hosting
4. **Monitoring**: Set up alerts for usage limits

## 📚 Additional Resources

- [Render Documentation](https://render.com/docs)
- [Node.js Deployment](https://render.com/docs/deploy-node-express-app)
- [Static Site Deployment](https://render.com/docs/deploy-create-react-app)
- [Environment Variables](https://render.com/docs/environment-variables)
- [Render Pricing](https://render.com/docs/pricing)
