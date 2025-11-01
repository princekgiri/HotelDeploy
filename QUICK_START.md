# 🚀 Quick Start - Railway Deployment

## ⚡ 5-Minute Setup

### 1️⃣ Railway Setup (2 minutes)
1. Go to https://railway.app
2. Login with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select "Prince161724/Hotel-Safe"
5. Set root directory: `/Backend`
6. Click "Generate Domain" (copy the URL!)

### 2️⃣ Environment Variables (2 minutes)
Click "Variables" tab → "Raw Editor" → Paste this:

```bash
PORT=3000
NODE_ENV=production
MONGO_URL=your_mongodb_connection_string_here
SESSION_SECRET=generate_a_random_32_char_string
CORS_ORIGIN=your_frontend_url_here
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

**Get MongoDB URL:**
- Atlas: https://cloud.mongodb.com → Connect → Copy connection string
- Format: `mongodb+srv://user:pass@cluster.mongodb.net/hotel-db?retryWrites=true&w=majority`

**Generate Session Secret (PowerShell):**
```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | % {[char]$_})
```

**Get Cloudinary:**
- https://cloudinary.com → Dashboard → Copy credentials

### 3️⃣ Deploy (1 minute)
1. Click "Deploy" 
2. Wait for build to complete
3. Test: `https://your-app.railway.app/health`

✅ **Done!** Backend is live!

---

## 🎨 Frontend on Vercel (Optional)

1. https://vercel.com → Login with GitHub
2. "New Project" → Select "Hotel-Safe"
3. Root Directory: `FrontEnd`
4. Add env var: `VITE_API_URL=https://your-railway-url.railway.app`
5. Deploy!

---

## 🔧 Must-Have Credentials

| Service | What You Need | Where to Get |
|---------|---------------|--------------|
| **MongoDB Atlas** | Connection string | https://cloud.mongodb.com (FREE M0) |
| **Cloudinary** | Cloud name, API key, Secret | https://cloudinary.com (FREE tier) |
| **Railway** | GitHub account | https://railway.app (FREE $5/month) |
| **Vercel** | GitHub account | https://vercel.com (FREE) |

---

## ✅ Success Checklist

- [ ] Railway backend deployed
- [ ] `/health` endpoint returns OK
- [ ] MongoDB connected (check logs)
- [ ] Vercel frontend deployed
- [ ] Login/signup works
- [ ] CORS_ORIGIN updated to Vercel URL

---

## 🆘 Common Fixes

**CORS Error?**
→ Update `CORS_ORIGIN` in Railway to match Vercel URL (no trailing slash)

**Session not saving?**
→ Check SESSION_SECRET is set, cookies secure=true

**MongoDB connection failed?**
→ Atlas: Network Access → Add `0.0.0.0/0`

**Cloudinary upload fails?**
→ Verify all 3 env vars (CLOUD_NAME, API_KEY, API_SECRET)

---

## 📱 Contact & Help

- **Full Guide:** See `RAILWAY_DEPLOYMENT_GUIDE.md`
- **Code Audit:** See `FUNCTIONALITY_AUDIT.md`
- **Railway Docs:** https://docs.railway.app
- **Your Repo:** https://github.com/Prince161724/Hotel-Safe

---

**Ready to deploy? Start at Step 1! 🚀**
