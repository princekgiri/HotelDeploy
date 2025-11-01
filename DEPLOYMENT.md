# 🚀 Railway Deployment Guide

## ✅ Backend is Now Production-Ready!

All the necessary changes have been made to deploy your application to Railway.

---

## 📋 What Was Changed:

### Backend Changes:
1. ✅ **package.json** - Changed start script from `nodemon` to `node`
2. ✅ **app.js** - All hardcoded values now use environment variables
3. ✅ **.env** - Properly formatted with all required variables
4. ✅ **.env.example** - Template for environment variables (safe to commit)
5. ✅ **.gitignore** - Added to protect sensitive files
6. ✅ **railway.json** - Railway deployment configuration

### Frontend Changes:
1. ✅ **.env** - Added VITE_API_URL for backend connection
2. ✅ **.env.example** - Template created
3. ✅ **.gitignore** - Updated to exclude .env files
4. ✅ **src/config.js** - Centralized API URL configuration

---

## 🚂 How to Deploy on Railway:

### Step 1: Deploy Backend
1. Go to [Railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository: `Prince161724/Hotel-Safe`
4. Railway will detect it's a Node.js project
5. **IMPORTANT: Set Root Directory to `Backend`** (in settings)

### Step 2: Add Environment Variables in Railway
In Railway dashboard, go to Variables tab and add:

```
NODE_ENV=production
MONGO_URL=mongodb+srv://root:moot@hotel.zl9hnzd.mongodb.net/?retryWrites=true&w=majority&appName=Hotel
SESSION_SECRET=Prince
CORS_ORIGIN=https://your-frontend-url.vercel.app
CLOUD_NAME=dnisexrvt
API_KEY=349815747482582
API_SECRET=LzEJ2RwXGa38uClvtJvonPcXF8A
```

**Note:** Update `CORS_ORIGIN` with your actual frontend URL after deploying frontend.

### Step 3: Get Backend URL
After deployment, Railway will give you a URL like:
`https://your-backend.up.railway.app`

### Step 4: Deploy Frontend (Vercel/Netlify)
1. Deploy frontend to Vercel or Netlify
2. Set environment variable:
   ```
   VITE_API_URL=https://your-backend.up.railway.app
   ```

### Step 5: Update CORS
Go back to Railway backend variables and update:
```
CORS_ORIGIN=https://your-frontend.vercel.app
```

---

## ⚠️ Important Notes:

### Security:
- ✅ `.env` files are now gitignored (won't be pushed to GitHub)
- ✅ Secrets are in environment variables, not code
- ✅ Session cookies set to `secure: true` in production

### Frontend API Calls:
- Your frontend currently has hardcoded `http://localhost:3000` URLs
- **After deployment, update these to use the config:**
  ```javascript
  import API_BASE_URL from '../config';
  const url = `${API_BASE_URL}/user/endpoint`;
  ```

### File Uploads:
- Railway has ephemeral filesystem (uploads won't persist)
- You're already using Cloudinary ✅ (perfect for Railway!)

---

## 🔧 Quick Commands:

### Test Locally:
```bash
# Backend
cd Backend
npm install
npm start

# Frontend
cd FrontEnd
npm install
npm run dev
```

### If you need to update production:
Just push to GitHub, Railway auto-deploys!

---

## 📞 Need Help?
If deployment fails, check Railway logs for errors.

Common issues:
- Missing environment variables
- Wrong root directory (must be `Backend`)
- Port conflicts (Railway sets PORT automatically)

---

**Ready to deploy! 🎉**
