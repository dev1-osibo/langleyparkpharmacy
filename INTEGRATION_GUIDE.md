# Langley Park Pharmacy - Integration Guide

## Overview

This guide documents how all services connect to power the Langley Park Pharmacy website. Each integration is independent but works together to create a seamless customer and admin experience.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    Langley Park Pharmacy                     │
│                  langleyparkpharmacy.com                     │
└─────────────────────────────────────────────────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
   ┌──────────┐      ┌──────────┐      ┌──────────┐
   │ SendGrid │      │  Google  │      │ Google   │
   │  (Email) │      │Analytics │      │  Maps    │
   └──────────┘      └──────────┘      └──────────┘
        │                  │                  │
   Forms → Emails    Analytics → Dashboards   Map Embed
   Contact            Conversions             Location
   Appointment        Traffic                 Directions
   Refill             Events
```

## 1. SendGrid Email Integration

### Purpose
SendGrid handles all transactional and notification emails:
- **Customer Confirmations**: Confirms contact, appointment, and refill requests
- **Admin Alerts**: Notifies pharmacy staff of new submissions
- **Status Updates**: Future notifications about order status, etc.

### Account Setup

**SendGrid Account:**
- **URL**: https://sendgrid.com
- **Tier**: Free (100 emails/day)
- **Sender Email**: contact@langleyparkpharmacy.com
- **API Key**: Stored in Vercel environment as `VITE_SENDGRID_API_KEY`

### Email Templates

#### Customer Templates (3 total)

**Template 1: Contact Form Confirmation**
- **Name**: `contact-confirmation`
- **To**: Customer email (from form)
- **From**: contact@langleyparkpharmacy.com
- **Subject**: "We received your message"
- **Variables**: {name}, {email}, {phone}, {message}

**Template 2: Appointment Request Confirmation**
- **Name**: `appointment-confirmation`
- **To**: Customer email
- **From**: contact@langleyparkpharmacy.com
- **Subject**: "Appointment request received"
- **Variables**: {name}, {service}, {preferred_date}, {phone}

**Template 3: Prescription Refill Confirmation**
- **Name**: `refill-confirmation`
- **To**: Customer email
- **From**: contact@langleyparkpharmacy.com
- **Subject**: "Prescription refill request received"
- **Variables**: {name}, {medication}, {refills}, {prescription_number}

#### Admin Alert Templates (3 total)

**Alert 1: New Contact Submission**
- **Name**: `contact-alert`
- **To**: pharmacy-alerts@langleyparkpharmacy.com
- **Subject**: "NEW: Contact form submission from {name}"
- **Variables**: {name}, {email}, {phone}, {message}

**Alert 2: New Appointment Request**
- **Name**: `appointment-alert`
- **To**: pharmacy-alerts@langleyparkpharmacy.com
- **Subject**: "NEW APPOINTMENT REQUEST: {service}"
- **Variables**: {name}, {phone}, {email}, {service}, {preferred_date}, {notes}

**Alert 3: New Refill Request**
- **Name**: `refill-alert`
- **To**: pharmacy-alerts@langleyparkpharmacy.com
- **Subject**: "NEW REFILL REQUEST: {medication}"
- **Variables**: {name}, {phone}, {email}, {medication}, {refills}, {notes}

### Implementation

**Backend (Vercel Serverless Function)**
```javascript
// api/send-email.js
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req, res) => {
  const { templateId, to, dynamicTemplateData } = req.body;
  
  try {
    await sgMail.send({
      to,
      from: 'contact@langleyparkpharmacy.com',
      templateId,
      dynamicTemplateData,
    });
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
```

**Frontend (React Form)**
```javascript
// components/ContactForm.jsx
const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Send confirmation to customer
  await fetch('/api/send-email', {
    method: 'POST',
    body: JSON.stringify({
      templateId: 'contact-confirmation',
      to: formData.email,
      dynamicTemplateData: formData
    })
  });
  
  // Send alert to pharmacy staff
  await fetch('/api/send-email', {
    method: 'POST',
    body: JSON.stringify({
      templateId: 'contact-alert',
      to: 'pharmacy-alerts@langleyparkpharmacy.com',
      dynamicTemplateData: formData
    })
  });
};
```

## 2. Google Analytics Integration

### Purpose
Tracks user behavior, conversions, and traffic sources to inform pharmacy decisions.

### Account Setup

**Google Analytics Account:**
- **URL**: https://analytics.google.com
- **Property**: Langley Park Pharmacy
- **Domain**: langleyparkpharmacy.com
- **Measurement ID**: G-XXXXXXXXXX (stored in Vercel as `VITE_GOOGLE_ANALYTICS_ID`)

### Events to Track

**Automatic:**
- Page views
- Session duration
- Bounce rate
- Traffic source (Google, Facebook, direct, etc.)

**Custom Events:**
```javascript
// Tracking code pattern
gtag('event', 'form_submission', {
  form_type: 'contact' | 'appointment' | 'refill',
  timestamp: new Date().toISOString()
});

gtag('event', 'page_view', {
  page_title: document.title,
  page_path: window.location.pathname
});

gtag('event', 'cta_click', {
  cta_text: 'Book Appointment' | 'Call Us' | etc.,
  location: 'header' | 'hero' | 'sidebar'
});
```

### Dashboards

1. **Overview Dashboard**
   - Total users (past 30 days)
   - Page views by page
   - Bounce rate
   - Average session duration
   - Top traffic sources

2. **Conversions Dashboard**
   - Contact form submissions
   - Appointment requests
   - Prescription refill requests
   - Conversion rate by source

3. **Pages Performance**
   - Home page
   - Services page
   - Appointments page
   - Blog posts
   - Contact page

4. **Traffic Sources**
   - Organic (Google Search)
   - Direct
   - Social (Facebook, Instagram)
   - Referrals
   - Paid (if applicable)

### Goals

- **Goal 1**: Contact form submission
- **Goal 2**: Appointment request submission
- **Goal 3**: Prescription refill request
- **Goal 4**: Phone call conversion (UTM parameter: `utm_medium=phone`)

## 3. GitHub Repository

### Purpose
Version control, CI/CD integration, and code hosting.

### Repository Details

**Repository**: `dev1-osibo/langleyparkpharmacy`
- **Visibility**: Public
- **Default Branch**: `main`
- **Description**: Official website for Langley Park Pharmacy

### Files

- **README.md** — Setup instructions
- **.gitignore** — Node.js template
- **LICENSE** — MIT license
- **package.json** — Dependencies
- **vite.config.js** — Vite configuration

### GitHub Secrets

Set these in GitHub repo settings (Settings → Secrets and variables → Actions):

- `SENDGRID_API_KEY` — SendGrid API key
- `GOOGLE_ANALYTICS_ID` — GA Measurement ID

### Branch Protection (Optional)

Enable on `main` branch:
- Require pull requests before merging
- Require status checks before merging (if CI configured)
- Dismiss stale PR reviews when new commits are pushed

## 4. Vercel Deployment

### Purpose
Continuous deployment, serverless functions, and hosting.

### Account & Project Setup

**Vercel Account**: https://vercel.com
**Project**: langleyparkpharmacy
**Framework**: React + Vite
**Build Settings**:
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

### Environment Variables (in Vercel Dashboard)

```
VITE_SENDGRID_API_KEY=SG.xxxxx...
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
VITE_MAPS_API_KEY=AIzaSy...
VITE_CALENDLY_URL=https://calendly.com/...
```

### Deployment Flow

```
1. Push to GitHub main branch
2. Vercel webhook triggered
3. Build runs: npm install → npm run build
4. Tests run (if configured)
5. Deploy to langleyparkpharmacy.com
6. Preview deployments for PR reviews
7. Automatic rollback if build fails
```

### SSL/HTTPS

- Automatically provisioned by Let's Encrypt
- Auto-renews
- All traffic redirected to HTTPS

## 5. Google Maps Integration

### Purpose
Displays pharmacy location and provides directions.

### Account Setup

**Google Cloud Console**:
- Project: Langley Park Pharmacy
- API: Maps JavaScript API (enabled)
- API Key: Restricted to domain `langleyparkpharmacy.com`

### Map Component

```javascript
// components/LocationMap.jsx
import { GoogleMap, Marker } from '@react-google-maps/api';

export default function LocationMap() {
  const pharmacyLocation = {
    lat: 38.9730,
    lng: -77.0405
  };

  return (
    <GoogleMap
      mapContainerStyle={{ width: '100%', height: '400px' }}
      center={pharmacyLocation}
      zoom={15}
    >
      <Marker position={pharmacyLocation} />
    </GoogleMap>
  );
}
```

### Address

**Langley Park Pharmacy**
8004 New Hampshire Ave
Takoma Park, MD 20912
United States

**Coordinates**: 38.9730° N, 77.0405° W

## 6. Domain Setup (DNS)

### Current Status
- **Domain**: langleyparkpharmacy.com
- **Registrar**: GoDaddy / Namecheap / etc.
- **DNS Provider**: Vercel (after configuration)

### Configuration Steps

1. Add domain in Vercel dashboard (Vercel → Project → Settings → Domains)
2. Copy Vercel nameservers (usually 4 nameservers)
3. Login to domain registrar account
4. Update nameservers to Vercel's
5. Wait 24-48 hours for DNS propagation
6. Verify in Vercel dashboard (should show "✓ Valid Configuration")

### DNS Records (Auto-configured by Vercel)

```
Type: A
Value: 76.76.19.89

Type: CNAME
Host: www
Value: cname.vercel-dns.com

Type: MX (optional, if email forwarding)
Value: (depends on email provider)
```

## 7. Form Submission Flow

### Contact Form Flow

```
┌─────────────────────────┐
│ User submits contact    │
│ (name, email, phone,    │
│  message)               │
└────────────┬────────────┘
             │
             ▼
     ┌───────────────┐
     │ Frontend      │
     │ Validation    │
     │ (required     │
     │  fields, etc) │
     └───────┬───────┘
             │
             ▼
     ┌───────────────────────┐
     │ POST /api/contact     │
     │ (Vercel function)     │
     └───────┬───────────────┘
             │
             ▼
  ┌──────────────────────────┐
  │ SendGrid API Call #1     │
  │ Send confirmation to     │
  │ customer (template ID:   │
  │ contact-confirmation)    │
  └────────────┬─────────────┘
               │
               ▼
  ┌──────────────────────────┐
  │ SendGrid API Call #2     │
  │ Send alert to pharmacy   │
  │ (template ID:            │
  │ contact-alert)           │
  └────────────┬─────────────┘
               │
               ▼
  ┌──────────────────────────┐
  │ Return success response  │
  │ to frontend              │
  └────────────┬─────────────┘
               │
               ▼
  ┌──────────────────────────┐
  │ Display success message  │
  │ "Thanks! We'll get back  │
  │  to you within 24 hours" │
  └──────────────────────────┘
```

### Appointment Form Flow

```
┌──────────────────────────┐
│ User selects service,    │
│ date, time, name, email, │
│ phone                    │
└────────────┬─────────────┘
             │
             ▼
     ┌───────────────┐
     │ Frontend      │
     │ Validation    │
     └───────┬───────┘
             │
             ▼
     ┌───────────────────────┐
     │ POST /api/appointment │
     │ (Vercel function)     │
     └───────┬───────────────┘
             │
             ▼
  ┌──────────────────────────┐
  │ SendGrid API Call #1     │
  │ Send confirmation to     │
  │ customer (template ID:   │
  │ appointment-confirmation)│
  └────────────┬─────────────┘
               │
               ▼
  ┌──────────────────────────┐
  │ SendGrid API Call #2     │
  │ Send alert to pharmacy   │
  │ (template ID:            │
  │ appointment-alert)       │
  └────────────┬─────────────┘
               │
               ▼
  ┌──────────────────────────┐
  │ Google Analytics Event   │
  │ 'appointment_request'    │
  └────────────┬─────────────┘
               │
               ▼
  ┌──────────────────────────┐
  │ Return success response  │
  │ "Request submitted.      │
  │  We'll confirm within    │
  │  24 hours"               │
  └──────────────────────────┘
```

### Refill Form Flow

```
┌──────────────────────────┐
│ User enters medication,  │
│ prescription number,     │
│ refills needed, name,    │
│ email, phone             │
└────────────┬─────────────┘
             │
             ▼
     ┌───────────────┐
     │ Frontend      │
     │ Validation    │
     └───────┬───────┘
             │
             ▼
     ┌───────────────────────┐
     │ POST /api/refill      │
     │ (Vercel function)     │
     └───────┬───────────────┘
             │
             ▼
  ┌──────────────────────────┐
  │ SendGrid API Call #1     │
  │ Send confirmation to     │
  │ customer (template ID:   │
  │ refill-confirmation)     │
  └────────────┬─────────────┘
               │
               ▼
  ┌──────────────────────────┐
  │ SendGrid API Call #2     │
  │ Send alert to pharmacy   │
  │ (template ID:            │
  │ refill-alert)            │
  └────────────┬─────────────┘
               │
               ▼
  ┌──────────────────────────┐
  │ Google Analytics Event   │
  │ 'refill_request'         │
  └────────────┬─────────────┘
               │
               ▼
  ┌──────────────────────────┐
  │ Return success response  │
  │ "Refill submitted.       │
  │  We'll update you in     │
  │  2 hours"                │
  └──────────────────────────┘
```

## 8. Error Handling

### Email Failures

**Scenario**: SendGrid API returns error (invalid email, quota exceeded, etc.)

**Handling**:
1. Log error to console (includes error code, message)
2. Return error response with user-friendly message
3. Show toast notification: "Something went wrong. Please try again or call us at (301) 844-5280"
4. If critical (e.g., pharmacy email invalid), send alert to Vercel logs

**Monitoring**:
- Check Vercel logs (Vercel → Project → Logs)
- Monitor SendGrid dashboard (Activity → Status)
- Check pharmacy inbox for incoming alerts

### Form Validation Failures

**Scenario**: User submits form with missing/invalid data

**Handling**:
1. Frontend validation catches it (React hook validation)
2. Show inline error message under field
3. Disable submit button until fixed
4. Do NOT submit to backend

### Network Timeouts

**Scenario**: Vercel function takes >30 seconds or network drops

**Handling**:
1. Set 30-second timeout on fetch calls
2. Show error message: "Request timed out. Please try again."
3. Log attempt to localStorage (for retry)
4. Allow user to retry

## 9. Monitoring & Analytics

### Key Metrics to Watch

**Email Delivery**:
- Bounced emails (should be 0)
- Spam complaints (should be 0)
- Delivery rate (should be >95%)

**Form Submissions**:
- Contact form: target 2-5/week
- Appointment requests: target 1-3/week
- Refill requests: target 1-2/week

**Website Analytics**:
- Monthly users: track growth
- Bounce rate: target <50%
- Avg session duration: target >2 minutes
- Conversion rate: (form submissions / users) * 100

**Site Performance**:
- Page load speed: target <3 seconds
- Core Web Vitals score: target "Good" on PageSpeed Insights

### Dashboards

**SendGrid Dashboard**:
- https://app.sendgrid.com/statistics
- View sent/bounced/delivered emails
- Check template performance

**Google Analytics Dashboard**:
- https://analytics.google.com
- Check daily user stats
- Monitor conversion goals
- Review traffic sources

**Vercel Dashboard**:
- https://vercel.com
- Check deployment status
- View build logs
- Monitor serverless function usage

## 10. Troubleshooting

### "Email not received by customer"

**Checks**:
1. Verify SendGrid API key is correct (Settings → API Keys)
2. Check Vercel environment variable: `VITE_SENDGRID_API_KEY`
3. Verify template ID in code matches SendGrid
4. Check SendGrid dashboard for bounced/failed emails
5. Check customer spam folder

### "Analytics not tracking"

**Checks**:
1. Verify GA Measurement ID in `.env`
2. Open browser DevTools → Network tab → search "gtag"
3. Verify Google Analytics property exists in GA dashboard
4. Check that website domain matches GA property domain
5. Wait 24-48 hours for GA to process data

### "Domain not resolving"

**Checks**:
1. Verify nameservers updated at registrar (GoDaddy, etc.)
2. Run: `nslookup langleyparkpharmacy.com`
3. Check Vercel dashboard for "Valid Configuration" status
4. Wait full 48 hours for DNS propagation
5. Try clearing DNS cache: `ipconfig /flushdns` (Windows) or `sudo dscacheutil -flushcache` (Mac)

### "Form submissions not reaching pharmacy"

**Checks**:
1. Verify pharmacy email address in code: `pharmacy-alerts@langleyparkpharmacy.com`
2. Check pharmacy email spam folder
3. Verify SendGrid unsubscribe list (shouldn't contain pharmacy email)
4. Test with SendGrid dashboard "Test Template" feature
5. Check Vercel function logs for errors

---

## Contact

**Pharmacy**: 8004 New Hampshire Ave, Takoma Park, MD 20912  
**Phone**: +1 (301) 844-5280  
**Email**: contact@langleyparkpharmacy.com

**Webmaster**: (Babasola)
