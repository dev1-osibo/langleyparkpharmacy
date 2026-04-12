# Langley Park Pharmacy - Quick Start Guide

**TL;DR:** Get everything running in 30 minutes.

---

## Prerequisites

- SendGrid account (https://sendgrid.com)
- GitHub account (https://github.com)
- Vercel account (https://vercel.com)
- Google account (for Analytics & Maps API)
- Domain name: langleyparkpharmacy.com

---

## Step 1: SendGrid Setup (10 minutes)

### Create Account

1. Go to https://sendgrid.com
2. Click "Start for free"
3. Sign up with email
4. Verify email address

### Generate API Key

1. Dashboard → Settings → API Keys
2. Click "Create API Key"
3. Name it: `langleyparkpharmacy`
4. Copy the key (you'll only see it once!)
5. Save it somewhere safe (password manager)

### Verify Sender Email

1. Settings → Sender Authentication
2. Click "Create New Sender"
3. Use: `contact@langleyparkpharmacy.com`
4. Verify by clicking link in confirmation email

**Done!** You have: **API Key** ✓

---

## Step 2: Google Analytics Setup (5 minutes)

### Create GA Account

1. Go to https://analytics.google.com
2. Sign in with Google account
3. Click "Start measuring"
4. Account name: `Langley Park Pharmacy`

### Create Property

1. Property name: `Langley Park Pharmacy`
2. Website URL: `langleyparkpharmacy.com`
3. Click "Create"

### Get Measurement ID

1. Go to Admin (bottom left)
2. Property Settings
3. Copy Measurement ID (format: `G-XXXXXXXXXX`)

**Done!** You have: **Measurement ID** ✓

---

## Step 3: GitHub Setup (5 minutes)

### Create Repository

1. Go to https://github.com
2. Click "+" → "New repository"
3. Name: `langleyparkpharmacy`
4. Owner: `dev1-osibo`
5. Public
6. Add README.md, .gitignore (Node.js), MIT License
7. Click "Create"

### Add Secrets

1. Go to repo → Settings → Secrets and variables → Actions
2. Click "New repository secret"
3. Add: `SENDGRID_API_KEY` = [your API key from Step 1]
4. Add: `GOOGLE_ANALYTICS_ID` = [your ID from Step 2]

**Done!** You have: **GitHub repo** ✓

---

## Step 4: Vercel Deployment (5 minutes)

### Create Project

1. Go to https://vercel.com
2. Click "Add new" → "Project"
3. Import GitHub repo: `dev1-osibo/langleyparkpharmacy`
4. Auto-detect: React + Vite
5. Framework: Vite
6. Build command: `npm run build`
7. Output directory: `dist`
8. Click "Deploy"

### Add Environment Variables

1. Project Settings → Environment Variables
2. Add:
   ```
   VITE_SENDGRID_API_KEY = SG.xxxxx...
   VITE_GOOGLE_ANALYTICS_ID = G-XXXXXXXXXX
   ```
3. Redeploy

### Add Domain

1. Go to Settings → Domains
2. Add domain: `langleyparkpharmacy.com`
3. Vercel shows nameservers

**Save these nameservers!** You'll need them next.

**Done!** You have: **Vercel deployment** ✓ **Nameservers** ✓

---

## Step 5: Domain Setup (10 minutes, then wait 24-48 hours)

### Update Nameservers

1. Login to your domain registrar (GoDaddy, Namecheap, etc.)
2. Find "DNS" or "Nameservers" settings
3. Replace with Vercel's nameservers (from Step 4)
4. Save

### Verify in Vercel

1. After 24-48 hours, check Vercel Domains
2. Should show ✓ "Valid Configuration"

**Done!** You have: **Domain configured** ✓ **SSL enabled** ✓

---

## Step 6: Create API Functions (10 minutes)

Create folder: `api/`

### `api/contact.js`

```javascript
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req, res) => {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Not allowed' });

  try {
    const { name, email, phone, message } = req.body;
    
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: 'All fields required' });
    }

    // Send to customer
    await sgMail.send({
      to: email,
      from: 'contact@langleyparkpharmacy.com',
      templateId: 'd-YOUR-TEMPLATE-ID-HERE',
      dynamicTemplateData: { name, email, phone, message }
    });

    // Send to pharmacy
    await sgMail.send({
      to: 'pharmacy-alerts@langleyparkpharmacy.com',
      from: 'contact@langleyparkpharmacy.com',
      templateId: 'd-YOUR-TEMPLATE-ID-HERE',
      dynamicTemplateData: { name, email, phone, message }
    });

    res.json({ success: true, message: 'Thank you! We\'ll get back to you within 24 hours.' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

Repeat for `api/appointment.js` and `api/refill.js` (see api-functions-template.md)

**Done!** You have: **API functions** ✓

---

## Step 7: SendGrid Email Templates (10 minutes)

### Create Customer Templates

1. Go to SendGrid → Dynamic Templates
2. Click "Create Template"
3. Name: `contact-confirmation`
4. Click "Add version"
5. Use the template from INTEGRATION_GUIDE.md
6. Replace variables: `{{name}}`, `{{email}}`, etc.
7. Copy Template ID
8. Update `api/contact.js` with this ID

Repeat for:
- `appointment-confirmation`
- `refill-confirmation`

### Create Admin Templates

1. Same process for admin alerts
2. Names:
   - `contact-alert`
   - `appointment-alert`
   - `refill-alert`

**Done!** You have: **Email templates** ✓ **Template IDs** ✓

---

## Step 8: Create React Forms (20 minutes)

### `components/ContactForm.jsx`

```javascript
import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', message: ''
  });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!res.ok) throw new Error('Submission failed');

      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });

      // Track in GA
      if (window.gtag) gtag('event', 'form_submission', { form_type: 'contact' });

    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
      <input name="email" type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
      <input name="phone" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
      <textarea name="message" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} required></textarea>
      <button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending...' : 'Send'}
      </button>
      {status === 'success' && <p>✓ Thanks! We'll get back to you within 24 hours.</p>}
      {status === 'error' && <p>✗ Error submitting form. Please try again.</p>}
    </form>
  );
}
```

Repeat for `AppointmentForm.jsx` and `RefillForm.jsx`

**Done!** You have: **React forms** ✓

---

## Step 9: Add Google Analytics Tracking (5 minutes)

### In `index.html` (head section)

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Replace `G-XXXXXXXXXX` with your Measurement ID.

### In React Components

```javascript
// Track form submissions (already in the form examples above)
if (window.gtag) {
  gtag('event', 'form_submission', { form_type: 'contact' });
}

// Track page views (auto-tracked by GA)
// Track button clicks
gtag('event', 'button_click', { button_text: 'Book Appointment' });
```

**Done!** You have: **Google Analytics tracking** ✓

---

## Step 10: Test Everything (10 minutes)

### Test Locally

```bash
npm install
npm run dev
# Visit http://localhost:5173
# Submit a test form
```

### Test in SendGrid

1. SendGrid → Dynamic Templates → Select template
2. Click "Send Test"
3. Send to your email
4. Verify email arrives

### Test Deployed

1. Push code to GitHub
2. Vercel auto-deploys
3. Visit langleyparkpharmacy.com
4. Fill out form
5. Check both customer and pharmacy email

**Done!** Everything is working! 🎉

---

## Checklist

- [ ] SendGrid account created & API key generated
- [ ] Google Analytics property created & ID copied
- [ ] GitHub repo created with secrets
- [ ] Vercel project deployed with env vars
- [ ] Domain added to Vercel (nameservers saved)
- [ ] Nameservers updated at registrar
- [ ] API functions created in `api/` folder
- [ ] SendGrid templates created & IDs copied
- [ ] React forms created & API functions linked
- [ ] Google Analytics tracking code added
- [ ] Forms tested locally and deployed
- [ ] Emails verified (customer + pharmacy)

---

## Next Steps

1. **Wait 24-48 hours** for domain nameservers to propagate
2. **Verify domain** in Vercel (should show ✓)
3. **Review INTEGRATION_GUIDE.md** for full details
4. **Use DEPLOYMENT_CHECKLIST.md** for final verification
5. **Share ADMIN_SETUP.md** with pharmacy staff

---

## Quick Links

- SendGrid: https://app.sendgrid.com
- Google Analytics: https://analytics.google.com
- GitHub: https://github.com/dev1-osibo/langleyparkpharmacy
- Vercel: https://vercel.com
- Website: https://langleyparkpharmacy.com

---

## Need Help?

See:
- **INTEGRATION_GUIDE.md** — Full architecture & setup
- **TROUBLESHOOTING.md** — Common issues & fixes
- **ADMIN_SETUP.md** — For pharmacy staff

---

**Estimated Total Time:** 2-3 hours (plus 24-48 hours for DNS propagation)

Good luck! 🚀
