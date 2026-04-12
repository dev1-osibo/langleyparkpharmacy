# Deployment Guide - Langley Park Pharmacy Website

This guide walks through deploying the website to Vercel and connecting a custom domain.

## Prerequisites

- GitHub account
- Vercel account (free tier works)
- Domain (langleyparkpharmacy.com)
- SendGrid account (optional, for email forms)
- Google Analytics account (optional, for tracking)

## Phase 1: Push to GitHub

### Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Create new repository:
   - **Repository name:** `langleyparkpharmacy`
   - **Owner:** dev1-osibo
   - **Description:** Professional pharmacy website
   - **Visibility:** Public (or Private)
   - **Initialize:** Leave unchecked (we'll push existing code)

3. Click **Create repository**

### Step 2: Connect Local Git to GitHub

In your project directory (`C:\Users\babas\.openclaw\workspace\langleyparkpharmacy`):

```bash
git remote add origin https://github.com/dev1-osibo/langleyparkpharmacy.git
git branch -M main
git push -u origin main
```

You may be prompted for credentials. Use:
- **Username:** dev1-osibo
- **Password:** Personal Access Token (create in GitHub Settings if needed)

### Step 3: Verify Push

- Go to https://github.com/dev1-osibo/langleyparkpharmacy
- Confirm all files are visible on the main branch

## Phase 2: Deploy on Vercel

### Step 1: Connect to Vercel

1. Go to https://vercel.com
2. Click **Sign up** (or sign in)
3. Choose **Continue with GitHub**
4. Authorize Vercel to access your GitHub account

### Step 2: Import Project

1. Click **Add New Project**
2. Select **Import Git Repository**
3. Search for: `dev1-osibo/langleyparkpharmacy`
4. Click **Import**

### Step 3: Configure Project

**Framework Preset:** React
**Root Directory:** ./
**Build Command:** `npm run build`
**Output Directory:** `dist`

Click **Deploy**. This takes 2-5 minutes.

### Step 4: Set Environment Variables

After deployment completes:

1. Go to project **Settings → Environment Variables**
2. Add the following:

```
VITE_GOOGLE_ANALYTICS_ID = G-XXXXXXXXXX
VITE_SENDGRID_API_KEY = SG-your_key_here
VITE_CALENDLY_URL = https://calendly.com/username
```

Leave blank for now if you don't have these yet. You can add them later.

3. Click **Save**

### Step 5: Verify Deployment

- Click **Visit** to see your live site
- Test on mobile and desktop
- Check all pages load
- Verify forms work

Your site is now live at: `https://langleyparkpharmacy.vercel.app`

## Phase 3: Connect Custom Domain

### Option A: Register Domain with Vercel (Recommended)

1. In Vercel project, go to **Settings → Domains**
2. Click **Add Domain**
3. Enter: `langleyparkpharmacy.com`
4. Select **Buy at Vercel**
5. Complete purchase ($10-15/year)
6. Domain connects automatically

### Option B: Use Existing Domain Registrar

If you already own the domain elsewhere:

1. In Vercel, go to **Settings → Domains**
2. Click **Add Domain**
3. Enter: `langleyparkpharmacy.com`
4. Vercel provides **Nameservers:**
   ```
   ns1.vercel-dns.com
   ns2.vercel-dns.com
   ns3.vercel-dns.com
   ns4.vercel-dns.com
   ```
5. Go to your domain registrar (GoDaddy, Namecheap, etc.)
6. Update **Nameservers** to Vercel's
7. Wait 24-48 hours for DNS to propagate

### Step 4: Add www Subdomain

1. In Vercel **Domains**, add: `www.langleyparkpharmacy.com`
2. Vercel automatically redirects `www` → root domain

### Step 5: Enable SSL/HTTPS

- Vercel auto-enables SSL (Let's Encrypt)
- Connections are secure by default
- Redirect HTTP → HTTPS in Vercel settings

## Phase 4: Setup Services (Optional but Recommended)

### Google Analytics Setup

1. Go to https://analytics.google.com
2. Create new property: "Langley Park Pharmacy"
3. Get **Measurement ID** (format: `G-XXXXXXXXXX`)
4. Add to Vercel environment variables:
   ```
   VITE_GOOGLE_ANALYTICS_ID = G-XXXXXXXXXX
   ```
5. Redeploy (Vercel auto-redeploys on env change)
6. Wait 24-48 hours for first data

### SendGrid Setup (for Forms)

1. Go to https://sendgrid.com
2. Sign up or login
3. Create **API Key**:
   - Settings → API Keys → Create API Key
   - Name it: `Langley Park Pharmacy`
   - Copy the key

4. Add to Vercel environment variables:
   ```
   VITE_SENDGRID_API_KEY = SG-your_key_here
   ```

5. To implement email sending in forms:
   - Update `src/components/ContactForm.jsx`
   - Call SendGrid API with form data
   - Example:
   ```javascript
   const response = await axios.post('https://api.sendgrid.com/v3/mail/send', {
     personalizations: [{
       to: [{ email: 'pharmacy@langleyparkpharmacy.com' }],
       subject: `New contact from ${formData.name}`
     }],
     from: { email: 'noreply@langleyparkpharmacy.com' },
     content: [{ type: 'text/html', value: emailHTML }]
   }, {
     headers: {
       'Authorization': `Bearer ${import.meta.env.VITE_SENDGRID_API_KEY}`
     }
   })
   ```

### Calendly Setup (for Appointments)

If pharmacy has Calendly:

1. Get Calendly URL (e.g., https://calendly.com/langleyparkpharmacy)
2. Add to `.env.local`:
   ```
   VITE_CALENDLY_URL = https://calendly.com/langleyparkpharmacy
   ```
3. Embed in Appointments page:
   ```javascript
   <iframe src={import.meta.env.VITE_CALENDLY_URL} width="100%" height="800px"></iframe>
   ```

## Phase 5: Post-Deployment Checklist

### Before Going Live

- [ ] Domain is connected and resolves
- [ ] Site loads on desktop and mobile
- [ ] All pages accessible
- [ ] Forms submission (check console for data)
- [ ] Images load correctly
- [ ] Google Maps embed works
- [ ] Phone links clickable
- [ ] Email links work
- [ ] Navigation menu functions
- [ ] No console errors

### DNS Verification

If using custom domain registrar:

1. Wait 24-48 hours after nameserver change
2. Check status: https://www.whatsmydns.net
   - Enter: `langleyparkpharmacy.com`
   - Look for Vercel nameservers in results
3. Once propagated, test site at `https://langleyparkpharmacy.com`

### SSL Certificate

- Vercel auto-issues Let's Encrypt certificate
- Check browser: padlock icon in address bar
- Certificate renews automatically

## Phase 6: Continuous Deployment

### How It Works

Every time you:
1. Make changes locally
2. Commit to git
3. Push to GitHub main branch

Vercel automatically:
1. Detects changes
2. Builds site
3. Deploys to production
4. Takes 2-3 minutes

### Making Updates

1. Edit files locally
2. Test with `npm run dev`
3. Commit: `git add . && git commit -m "Update..."`
4. Push: `git push origin main`
5. Watch Vercel dashboard → Deployments
6. Live in 2-3 minutes

### Revert Changes

If deployment breaks:

1. Go to Vercel Deployments
2. Find last working deployment
3. Click **Promote to Production**
4. Reverted to previous version

## Maintenance & Monitoring

### Daily Checks

- Visit site at https://langleyparkpharmacy.com
- Test key features
- Check for any errors

### Weekly Tasks

- Review Google Analytics (if enabled)
- Check form submissions
- Monitor performance

### Monthly Updates

- Update content/blog posts
- Review customer feedback
- Check for dependency updates:
  ```bash
  npm outdated
  npm update
  ```

### Security

- Keep npm packages updated
- Never commit `.env.local` with real keys
- Use strong passwords
- Enable 2FA on GitHub and Vercel

## Troubleshooting Deployment

### Site Won't Deploy

**Issue:** Build fails on Vercel
**Solution:**
1. Check build logs in Vercel dashboard
2. Verify `npm run build` works locally
3. Clear Vercel build cache
4. Check for missing dependencies

### Domain Not Resolving

**Issue:** Can't reach langleyparkpharmacy.com
**Solution:**
1. Verify DNS propagation: https://www.whatsmydns.net
2. Check nameservers in domain registrar settings
3. Wait 24-48 hours if just changed
4. Contact registrar support if issues persist

### Forms Not Working

**Issue:** Form data not submitting
**Solution:**
1. Check browser console for errors
2. Verify SendGrid API key in env variables
3. Check CORS settings if calling external API
4. Test with sample data in dev environment

### Slow Performance

**Issue:** Site loads slowly
**Solution:**
1. Optimize images: use WebP format
2. Check Google PageSpeed Insights
3. Reduce unused dependencies
4. Enable compression in Vercel settings

## Support Contacts

- **Vercel Support:** https://vercel.com/help
- **GitHub Support:** https://support.github.com
- **SendGrid Support:** https://support.sendgrid.com

## Next Steps

1. ✅ Deploy on Vercel
2. ✅ Connect custom domain
3. ✅ Setup Google Analytics
4. ✅ Setup SendGrid for forms
5. Promote on social media
6. Send announcement to customers
7. Monitor performance and feedback

---

**Deployment completed!** Your pharmacy website is live and ready to serve customers.
