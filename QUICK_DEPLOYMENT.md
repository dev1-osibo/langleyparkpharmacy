# Quick Deployment - 5 Steps

Get your pharmacy website live in minutes.

## Step 1: Push to GitHub (5 minutes)

```bash
cd C:\Users\babas\.openclaw\workspace\langleyparkpharmacy

# Configure git if not done
git config user.name "Your Name"
git config user.email "your@email.com"

# Add all files
git add .

# Commit
git commit -m "Langley Park Pharmacy website"

# Add GitHub remote
git remote add origin https://github.com/dev1-osibo/langleyparkpharmacy.git

# Push to main
git branch -M main
git push -u origin main
```

✅ Your code is now on GitHub!

## Step 2: Create Vercel Account (2 minutes)

1. Go to https://vercel.com
2. Click "Sign up"
3. Choose "Continue with GitHub"
4. Authorize Vercel

✅ Account ready!

## Step 3: Deploy Project (5 minutes)

1. In Vercel, click **Add New Project**
2. Select **Import Git Repository**
3. Search for and import: `dev1-osibo/langleyparkpharmacy`
4. Click **Deploy**
5. Wait for build to complete (2-3 min)

✅ Your site is live at: `yourproject.vercel.app`

## Step 4: Connect Custom Domain (5 minutes)

1. In Vercel project **Settings → Domains**
2. Click **Add Domain**
3. Enter: `langleyparkpharmacy.com`
4. Choose:
   - **Option A:** Buy through Vercel ($12/year)
   - **Option B:** Use existing registrar (update nameservers)

✅ Domain connected! (DNS takes 24-48h to propagate)

## Step 5: Add Secrets (2 minutes)

In Vercel **Settings → Environment Variables**, add:

```
VITE_GOOGLE_ANALYTICS_ID = (leave blank for now)
VITE_SENDGRID_API_KEY = (leave blank for now)
VITE_CALENDLY_URL = (leave blank for now)
```

Click **Save**. Site auto-redeploys.

✅ Done! Your site is live!

---

## Total Time: ~20 minutes

Your pharmacy website is now:
- ✅ Live on the web
- ✅ On a custom domain
- ✅ Auto-deploying from GitHub
- ✅ Secure with HTTPS
- ✅ Ready for customers

## What's Next?

- Add your logo to `public/images/`
- Update business info in pages
- Add blog posts
- Set up SendGrid for emails
- Configure Google Analytics
- Test on mobile

See **README.md** for detailed customization guide.
See **DEPLOYMENT_GUIDE.md** for detailed setup instructions.
