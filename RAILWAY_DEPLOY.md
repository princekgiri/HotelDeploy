# 🎯 Quick Railway Deployment Checklist

## ✅ PRE-DEPLOYMENT (Already Done!)
- [x] Environment variables configured
- [x] Production start script set
- [x] .gitignore protecting secrets
- [x] Code pushed to GitHub
- [x] Railway config created

---

## 🚂 DEPLOY TO RAILWAY (Do This Now!)

### 1️⃣ Create Railway Account
- Go to: https://railway.app
- Sign up with GitHub

### 2️⃣ New Project
1. Click **"New Project"**
2. Select **"Deploy from GitHub repo"**
3. Choose: `Prince161724/Hotel-Safe`
4. Railway will start deploying...

### 3️⃣ CRITICAL: Set Root Directory
1. Click on your service
2. Go to **Settings**
3. Find **"Root Directory"**
4. Set to: `Backend`
5. Click **"Update"**

### 4️⃣ Add Environment Variables
Click **"Variables"** tab, then add these:

```
NODE_ENV=production
MONGO_URL=mongodb+srv://root:moot@hotel.zl9hnzd.mongodb.net/?retryWrites=true&w=majority&appName=Hotel
SESSION_SECRET=Prince
CORS_ORIGIN=http://localhost:5173
CLOUD_NAME=dnisexrvt
API_KEY=349815747482582
API_SECRET=LzEJ2RwXGa38uClvtJvonPcXF8A
```

### 5️⃣ Get Your Backend URL
- After deployment completes
- Go to **Settings** → **Networking**
- Copy the **Public URL** (looks like: `https://xxxxx.up.railway.app`)

### 6️⃣ Update CORS (Important!)
After deploying frontend:
1. Go back to Railway Variables
2. Update `CORS_ORIGIN` to your frontend URL

---

## 📱 DEPLOY FRONTEND (Optional - Vercel)

### Option A: Vercel
1. Go to: https://vercel.com
2. Import `Prince161724/Hotel-Safe`
3. Set **Root Directory**: `FrontEnd`
4. Add Environment Variable:
   ```
   VITE_API_URL=https://your-backend.up.railway.app
   ```
5. Deploy!

### Option B: Netlify
Same steps, just use https://netlify.com

---

## ⚡ After Frontend Deployed

1. Copy your frontend URL (e.g., `https://yourapp.vercel.app`)
2. Go back to Railway → Variables
3. Update: `CORS_ORIGIN=https://yourapp.vercel.app`
4. Railway will auto-redeploy

---

## 🎉 YOU'RE DONE!

Your app is now live!

**Backend**: `https://xxxxx.up.railway.app`
**Frontend**: `https://yourapp.vercel.app`

---

## 🐛 Troubleshooting

### Backend won't start?
- Check Railway logs (click on service → Deployments → View logs)
- Verify all environment variables are set
- Verify Root Directory = `Backend`

### CORS errors?
- Update `CORS_ORIGIN` to match your frontend URL
- Must include `https://` prefix
- No trailing slash

### Database connection failed?
- Check `MONGO_URL` is correct
- Verify MongoDB Atlas allows Railway IP (or allow all: 0.0.0.0/0)

---

## 📝 Notes

- Railway gives you $5/month free credit
- Auto-deploys on every git push
- Logs available in dashboard
- Can add custom domain later

**Ready? Go to https://railway.app and deploy! 🚀**
