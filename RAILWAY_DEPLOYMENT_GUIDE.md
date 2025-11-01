# 🚂 Railway Deployment Guide - Step by Step

**Complete guide to deploy Hotel-Safe application on Railway**  
**Date:** November 1, 2025

---

## 📋 Prerequisites Checklist

Before starting, ensure you have:

- ✅ GitHub account with Hotel-Safe repository
- ✅ Railway account (sign up at https://railway.app)
- ✅ MongoDB Atlas cluster (or MongoDB connection string)
- ✅ Cloudinary account for file uploads
- ✅ All environment variables ready

---

## 🎯 STEP 1: Create Railway Account

### 1.1 Sign Up for Railway

1. Go to **https://railway.app**
2. Click **"Login"** or **"Start a New Project"**
3. Sign in with **GitHub** (recommended for easier deployment)
4. Authorize Railway to access your GitHub repositories

### 1.2 Verify Your Account

- Railway offers **$5 free credit** per month
- No credit card required for trial
- For production usage, add payment method in Settings

---

## 🚀 STEP 2: Create New Project from GitHub

### 2.1 Create Project

1. Click **"New Project"** button on Railway dashboard
2. Select **"Deploy from GitHub repo"**
3. Click **"Configure GitHub App"**
4. Grant Railway access to your repositories

### 2.2 Select Repository

1. Search for **"Hotel-Safe"** or **"Prince161724/Hotel-Safe"**
2. Click on the repository to select it
3. Railway will automatically detect it's a Node.js project

### 2.3 Choose Root Directory

1. Railway will scan your repo
2. It should detect **Backend** folder
3. Click on **"Backend"** to deploy backend first
   - Or manually set root directory to `/Backend`

---

## ⚙️ STEP 3: Configure Backend Service

### 3.1 Service Settings

1. Click on your newly created service
2. Go to **"Settings"** tab
3. Configure the following:

**Service Name:**
```
hotel-safe-backend
```

**Root Directory:**
```
/Backend
```

**Build Command:** (Auto-detected)
```
npm install --production=false
```

**Start Command:** (Auto-detected from package.json)
```
npm start
```

### 3.2 Generate Domain

1. Go to **"Settings"** > **"Networking"**
2. Click **"Generate Domain"**
3. Railway will provide a URL like:
   ```
   https://hotel-safe-backend-production.up.railway.app
   ```
4. **Copy this URL** - you'll need it for frontend CORS configuration!

---

## 🔑 STEP 4: Set Environment Variables

### 4.1 Navigate to Variables

1. In your service, click **"Variables"** tab
2. Click **"Add Variable"** or **"Raw Editor"**

### 4.2 Add All Environment Variables

Click **"Raw Editor"** and paste the following (replace with your actual values):

```bash
# Server Configuration
PORT=3000
NODE_ENV=production

# MongoDB Connection (REQUIRED)
MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/hotel-db?retryWrites=true&w=majority

# Session Secret (REQUIRED - Generate a strong random string)
SESSION_SECRET=your_very_long_random_secret_string_here_use_at_least_32_characters

# CORS Configuration (REQUIRED - Your frontend URL)
CORS_ORIGIN=https://your-frontend-url.vercel.app

# Cloudinary Configuration (REQUIRED for file uploads)
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

### 4.3 Get Your MongoDB URL

**Option A: MongoDB Atlas (Recommended)**

1. Go to https://cloud.mongodb.com
2. Sign in or create account
3. Create a **FREE** cluster (M0 Sandbox)
4. Click **"Connect"** > **"Connect your application"**
5. Copy the connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<username>` and `<password>` with your database credentials
7. Add database name: `/hotel-db` before the `?`

**Option B: Use Existing MongoDB**

- If you already have a MongoDB connection, use that URL

### 4.4 Generate Session Secret

**Method 1 - Using PowerShell:**
```powershell
# Generate a random 32-character string
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
```

**Method 2 - Using Node.js:**
```javascript
require('crypto').randomBytes(32).toString('hex')
```

**Method 3 - Online Generator:**
- Visit https://randomkeygen.com/
- Use a "Fort Knox Password" (256-bit)

### 4.5 Get Cloudinary Credentials

1. Go to https://cloudinary.com
2. Sign up for FREE account
3. Go to **Dashboard**
4. Copy:
   - **Cloud Name**
   - **API Key**
   - **API Secret**

### 4.6 Save Variables

1. After pasting all variables, click **"Save"**
2. Railway will automatically redeploy with new variables

---

## 🏗️ STEP 5: Deploy Backend

### 5.1 Trigger Deployment

1. Railway should auto-deploy after setting variables
2. If not, go to **"Deployments"** tab
3. Click **"Deploy"** or **"Redeploy"**

### 5.2 Monitor Deployment

1. Watch the **build logs** in real-time
2. Look for:
   ```
   ✓ Building...
   ✓ Installing dependencies...
   ✓ Build complete
   ✓ Deploying...
   ✓ Deployment successful
   ```

### 5.3 Check Logs

1. Go to **"Deployments"** > Click latest deployment
2. Check **"Build Logs"** for any errors
3. Check **"Deploy Logs"** for runtime output
4. You should see:
   ```
   🗄️ MongoDB Connected Successfully!
   Server running on port 3000
   http://localhost:3000
   ```

### 5.4 Test Health Endpoint

1. Copy your Railway backend URL
2. Add `/health` to the end
3. Visit in browser:
   ```
   https://hotel-safe-backend-production.up.railway.app/health
   ```
4. You should see:
   ```json
   {
     "status": "OK",
     "timestamp": "2025-11-01T...",
     "uptime": 123.456,
     "environment": "production"
   }
   ```

---

## 🎨 STEP 6: Deploy Frontend (Vercel Recommended)

### Why Vercel for Frontend?
- ✅ **FREE** for personal projects
- ✅ **Optimized** for React/Vite
- ✅ **Automatic** HTTPS
- ✅ **Fast** global CDN
- ✅ **Easy** GitHub integration

### 6.1 Prepare Frontend

**Update Frontend API URL:**

1. Create `FrontEnd/.env.production`:
   ```bash
   VITE_API_URL=https://hotel-safe-backend-production.up.railway.app
   ```

2. Ensure `FrontEnd/src/config.js` uses this variable:
   ```javascript
   const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
   export default API_BASE_URL;
   ```

3. Commit and push to GitHub:
   ```bash
   git add FrontEnd/.env.production
   git commit -m "Add production API URL for frontend"
   git push hotel-safe main
   ```

### 6.2 Deploy to Vercel

1. Go to https://vercel.com
2. Sign in with **GitHub**
3. Click **"Add New Project"**
4. Select **"Hotel-Safe"** repository
5. Configure:
   - **Framework Preset:** Vite
   - **Root Directory:** `FrontEnd`
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
6. Click **"Deploy"**

### 6.3 Add Environment Variables on Vercel

1. After deployment, go to **Project Settings** > **Environment Variables**
2. Add:
   ```
   VITE_API_URL=https://hotel-safe-backend-production.up.railway.app
   ```
3. Click **"Save"**
4. Redeploy

### 6.4 Get Frontend URL

Vercel will provide a URL like:
```
https://hotel-safe.vercel.app
```

---

## 🔄 STEP 7: Update CORS Settings

### 7.1 Update Backend CORS

1. Go back to **Railway** backend service
2. Go to **"Variables"** tab
3. Update `CORS_ORIGIN` variable:
   ```bash
   CORS_ORIGIN=https://hotel-safe.vercel.app
   ```
4. Save (Railway will auto-redeploy)

### 7.2 Allow Multiple Origins (Optional)

If you want to allow both Vercel and custom domain:

Update `Backend/app.js` to accept multiple origins:
```javascript
app.use(cors({
  origin: function(origin, callback) {
    const allowedOrigins = [
      process.env.CORS_ORIGIN,
      'https://hotel-safe.vercel.app',
      'https://your-custom-domain.com'
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
```

---

## ✅ STEP 8: Final Testing

### 8.1 Test Backend Endpoints

**Health Check:**
```
GET https://hotel-safe-backend-production.up.railway.app/health
```

**All Homes:**
```
GET https://hotel-safe-backend-production.up.railway.app/user/AllHomes
```

**Login (using Postman/Thunder Client):**
```
POST https://hotel-safe-backend-production.up.railway.app/user/Login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "testpass",
  "role": "user"
}
```

### 8.2 Test Frontend

1. Visit your Vercel URL: `https://hotel-safe.vercel.app`
2. Test the following flows:

**User Flow:**
- ✅ Sign up new account
- ✅ Login with credentials
- ✅ Browse homes
- ✅ Add to favorites
- ✅ Book a home
- ✅ Send message to host
- ✅ Update profile
- ✅ Logout

**Host Flow:**
- ✅ Host signup
- ✅ Host login
- ✅ Create new home listing
- ✅ Upload photos/videos
- ✅ Edit home
- ✅ Delete home
- ✅ View messages
- ✅ Reply to users

### 8.3 Check Browser Console

1. Open **DevTools** (F12)
2. Check **Console** tab for errors
3. Check **Network** tab for failed requests
4. Verify cookies are being set

### 8.4 Test Cloudinary Uploads

1. Create a new home as host
2. Upload photos/videos
3. Verify they appear correctly
4. Check Cloudinary dashboard for uploaded files

---

## 🔧 STEP 9: Troubleshooting

### Common Issues & Solutions

#### ❌ Issue 1: "Cannot connect to MongoDB"

**Solution:**
1. Check Railway logs for exact error
2. Verify MONGO_URL is correct
3. Check MongoDB Atlas:
   - Network Access: Add `0.0.0.0/0` (allow all IPs)
   - Database Access: Verify user credentials
4. Ensure connection string includes database name

#### ❌ Issue 2: "CORS Error" in browser

**Solution:**
1. Verify CORS_ORIGIN in Railway matches your Vercel URL
2. Check for trailing slash (should NOT have trailing slash)
3. Ensure `credentials: true` in both frontend and backend
4. Restart Railway service after changing CORS_ORIGIN

#### ❌ Issue 3: "Session not persisting"

**Solution:**
1. Check SESSION_SECRET is set
2. Verify MongoDB session store is connected
3. Ensure cookies are set to `secure: true` in production
4. Check browser allows third-party cookies
5. Verify same domain for frontend/backend or proper CORS setup

#### ❌ Issue 4: "File upload fails"

**Solution:**
1. Verify all Cloudinary variables (CLOUD_NAME, API_KEY, API_SECRET)
2. Check Cloudinary dashboard for upload quota
3. Verify file size is under 100MB
4. Check Railway logs for multer errors

#### ❌ Issue 5: "Application crashes on Railway"

**Solution:**
1. Check Deploy Logs in Railway
2. Common causes:
   - Missing environment variables
   - Port binding issue (should use process.env.PORT)
   - MongoDB connection failed
3. Verify `railway.json` configuration
4. Check package.json start script uses `node app.js` not `nodemon`

#### ❌ Issue 6: "Health check failing"

**Solution:**
1. Verify `/health` endpoint exists in app.js
2. Check if server is listening on correct PORT
3. Ensure Railway healthcheck timeout is adequate (100s)
4. Check if MongoDB connection is blocking startup

---

## 📊 STEP 10: Monitor & Maintain

### 10.1 Railway Monitoring

1. **Deployments Tab:**
   - View all deployment history
   - Check build and deploy logs
   - Rollback to previous versions if needed

2. **Metrics Tab:**
   - Monitor CPU usage
   - Track memory consumption
   - View request counts

3. **Logs Tab:**
   - Real-time application logs
   - Filter by log level
   - Search for specific errors

### 10.2 Set Up Alerts (Optional)

1. Go to **Project Settings** > **Integrations**
2. Connect to Slack/Discord for deployment notifications
3. Set up error tracking (e.g., Sentry)

### 10.3 Custom Domain (Optional)

1. Go to **Settings** > **Networking**
2. Click **"Custom Domain"**
3. Add your domain (e.g., `api.hotel-safe.com`)
4. Update DNS records as instructed
5. Railway provides automatic HTTPS

### 10.4 Database Backups

**MongoDB Atlas:**
1. Go to Atlas dashboard
2. Enable automatic backups
3. Set backup schedule
4. Configure retention policy

### 10.5 Scaling (When Needed)

**Railway:**
- Automatically scales based on traffic
- Upgrade plan for more resources
- No configuration needed

**MongoDB Atlas:**
- Start with M0 (Free tier)
- Upgrade to M10+ when needed
- Monitor storage and connections

---

## 🎯 STEP 11: Post-Deployment Checklist

### ✅ Backend Verification
- [ ] Health endpoint returns 200 OK
- [ ] MongoDB connection successful
- [ ] Session store working
- [ ] All API endpoints responding
- [ ] Cloudinary uploads working
- [ ] CORS configured correctly
- [ ] Environment variables set
- [ ] Logs show no errors

### ✅ Frontend Verification
- [ ] Site loads without errors
- [ ] Login/signup works
- [ ] All pages accessible
- [ ] API calls successful
- [ ] Images/videos display
- [ ] Cookies persist
- [ ] Logout works
- [ ] Mobile responsive

### ✅ Security Verification
- [ ] HTTPS enabled (Railway provides this)
- [ ] Secure cookies in production
- [ ] SESSION_SECRET is strong
- [ ] MongoDB credentials secure
- [ ] No sensitive data in logs
- [ ] CORS restricted to frontend only
- [ ] API keys not exposed in frontend

### ✅ Performance Verification
- [ ] Page load time < 3 seconds
- [ ] API response time < 1 second
- [ ] Images optimized
- [ ] No console errors
- [ ] Database queries optimized

---

## 📝 Environment Variables Reference

**Complete list of required variables for Railway:**

```bash
# REQUIRED
PORT=3000
NODE_ENV=production
MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/hotel-db?retryWrites=true&w=majority
SESSION_SECRET=minimum_32_character_random_string_here
CORS_ORIGIN=https://hotel-safe.vercel.app
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

---

## 🆘 Getting Help

### Railway Support
- Documentation: https://docs.railway.app
- Discord: https://discord.gg/railway
- Support: help@railway.app

### Your Repository
- Issues: https://github.com/Prince161724/Hotel-Safe/issues
- Discussions: https://github.com/Prince161724/Hotel-Safe/discussions

---

## 🎉 SUCCESS!

If all steps are completed, your Hotel-Safe application is now:

✅ **Deployed** on Railway  
✅ **Accessible** worldwide via HTTPS  
✅ **Secure** with proper authentication  
✅ **Scalable** and production-ready  
✅ **Monitored** with logs and metrics  

**Your URLs:**
- **Backend:** https://hotel-safe-backend-production.up.railway.app
- **Frontend:** https://hotel-safe.vercel.app
- **Health Check:** https://hotel-safe-backend-production.up.railway.app/health

---

## 📚 Quick Commands Reference

**Local Development:**
```bash
# Backend
cd Backend
npm install
npm run dev

# Frontend
cd FrontEnd
npm install
npm run dev
```

**Deploy Updates:**
```bash
# Commit changes
git add .
git commit -m "Your update message"
git push hotel-safe main

# Railway and Vercel will auto-deploy
```

**View Logs:**
```bash
# Railway CLI (optional)
railway logs

# Or use Railway dashboard
```

---

**Deployment Guide Created:** November 1, 2025  
**Version:** 1.0  
**Status:** Production Ready ✅
