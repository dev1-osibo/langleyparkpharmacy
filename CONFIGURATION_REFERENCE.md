# Langley Park Pharmacy - Configuration Reference

Quick lookup for all configuration values and settings.

---

## Service URLs

| Service | URL | Purpose |
|---------|-----|---------|
| SendGrid Dashboard | https://app.sendgrid.com | Email management |
| Google Analytics | https://analytics.google.com | Traffic & conversions |
| Vercel Dashboard | https://vercel.com | Deployments & hosting |
| GitHub Repository | https://github.com/dev1-osibo/langleyparkpharmacy | Code repo |
| Google Cloud Console | https://console.cloud.google.com | API keys |
| Website (Live) | https://langleyparkpharmacy.com | Live site |
| Website (Preview) | https://langleyparkpharmacy.vercel.app | Preview deployment |

---

## Environment Variables

### Vercel Deployment

```
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
VITE_SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
VITE_MAPS_API_KEY=AIzaSy...
VITE_CALENDLY_URL=https://calendly.com/...
PHARMACY_EMAIL=pharmacy-alerts@langleyparkpharmacy.com
```

### Local Development (.env.local - DO NOT COMMIT)

```
VITE_SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
VITE_MAPS_API_KEY=AIzaSy...
```

### GitHub Secrets

```
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

---

## Email Configuration

### Sender Email

```
From: contact@langleyparkpharmacy.com
Service: SendGrid
Verification: Required
Status: Verified in SendGrid
```

### Pharmacy Alert Email

```
To: pharmacy-alerts@langleyparkpharmacy.com
Service: SendGrid
Purpose: Receive alerts for new form submissions
Aliases: (if using multiple emails, add them here)
```

### SendGrid Templates

| Template Name | Template ID | Type | Purpose |
|---------------|-------------|------|---------|
| contact-confirmation | d-XXXXXXXXXX | Customer | Contact form confirmation |
| appointment-confirmation | d-XXXXXXXXXX | Customer | Appointment request confirmation |
| refill-confirmation | d-XXXXXXXXXX | Customer | Refill request confirmation |
| contact-alert | d-XXXXXXXXXX | Admin | New contact form alert |
| appointment-alert | d-XXXXXXXXXX | Admin | New appointment alert |
| refill-alert | d-XXXXXXXXXX | Admin | New refill alert |

---

## Google Analytics Configuration

### Property Settings

```
Property Name: Langley Park Pharmacy
Website URL: langleyparkpharmacy.com
Measurement ID: G-XXXXXXXXXX
Reporting Timezone: America/New_York
Currency: USD
```

### Goals (Conversions)

```
Goal 1: Contact Form Submission
  Event: form_submission
  Condition: form_type equals contact

Goal 2: Appointment Request
  Event: form_submission
  Condition: form_type equals appointment

Goal 3: Refill Request
  Event: form_submission
  Condition: form_type equals refill
```

### Custom Events

```
form_submission: (form_type: contact|appointment|refill)
page_view: (automatic)
button_click: (button_text, location)
cta_click: (cta_type)
```

---

## Domain Configuration

### Current Domain

```
Domain: langleyparkpharmacy.com
Registrar: (GoDaddy, Namecheap, etc.)
Nameservers: (Vercel nameservers)
DNS Provider: Vercel
SSL: Let's Encrypt (auto-provisioned)
```

### Vercel Nameservers

```
ns1.vercel-dns.com
ns2.vercel-dns.com
(Check Vercel dashboard for exact list)
```

### DNS Records

```
Type: A
Value: 76.76.19.89
TTL: 300

Type: CNAME
Host: www
Value: cname.vercel-dns.com
TTL: 300
```

### SSL Certificate

```
Provider: Let's Encrypt
Auto-renewal: Yes
Valid: langleyparkpharmacy.com
Wildcard: *.langleyparkpharmacy.com (if enabled)
Issued by: Vercel
```

---

## GitHub Configuration

### Repository

```
Owner: dev1-osibo
Name: langleyparkpharmacy
Visibility: Public
License: MIT
Default Branch: main
```

### Branch Protection

```
Branch: main
Requirements:
  - Require pull requests: Yes
  - Require status checks: Yes (if CI enabled)
  - Dismiss stale reviews: Yes
```

### Repository Secrets

```
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

---

## Vercel Configuration

### Project Settings

```
Project Name: langleyparkpharmacy
Framework: React
Build Command: npm run build
Output Directory: dist
Install Command: npm install
Environment: Production
```

### Vercel Deployment

```
Auto-deploy on push: Yes
Preview deployments: Yes (on PRs)
Production Branch: main
Framework Detection: Vite
Node Version: 18.x (recommended)
```

### Domains

```
Primary: langleyparkpharmacy.com
Status: Active
SSL: Enabled
Auto-renewal: Yes
```

---

## API Function Configuration

### Contact Form API

```javascript
// Path: api/contact.js
Method: POST
Body: {
  name: string (required),
  email: string (required, email format),
  phone: string (required, 10 digits),
  message: string (required)
}
Returns: {
  success: boolean,
  message: string
}
```

### Appointment Form API

```javascript
// Path: api/appointment.js
Method: POST
Body: {
  name: string (required),
  email: string (required),
  phone: string (required),
  service: string (required),
  preferredDate: string (required, ISO format),
  notes: string (optional)
}
Returns: {
  success: boolean,
  message: string
}
```

### Refill Form API

```javascript
// Path: api/refill.js
Method: POST
Body: {
  name: string (required),
  email: string (required),
  phone: string (required),
  medication: string (required),
  prescriptionNumber: string (required),
  refillsNeeded: number (required),
  notes: string (optional)
}
Returns: {
  success: boolean,
  message: string
}
```

---

## Google Maps Configuration

### API Key

```
Project: Langley Park Pharmacy
API: Maps JavaScript API
Key Restriction: Domain restriction
Allowed Domains: langleyparkpharmacy.com
                 *.langleyparkpharmacy.com
Billing: Enabled
```

### Map Settings

```
Coordinates: 38.9730, -77.0405
Address: 8004 New Hampshire Ave, Takoma Park, MD 20912
Zoom Level: 15
Style: Default (Google Maps style)
Type: Roadmap
```

---

## Package Dependencies

### Core

```json
{
  "react": "^18.x.x",
  "react-dom": "^18.x.x",
  "vite": "^4.x.x"
}
```

### Third-Party

```json
{
  "@sendgrid/mail": "^7.x.x",
  "@react-google-maps/api": "^2.x.x"
}
```

### Development

```json
{
  "@vitejs/plugin-react": "^4.x.x",
  "vitest": "^0.x.x"
}
```

---

## File Structure

```
project-root/
├── api/
│   ├── contact.js
│   ├── appointment.js
│   ├── refill.js
│   └── config.js (optional)
├── src/
│   ├── components/
│   │   ├── ContactForm.jsx
│   │   ├── AppointmentForm.jsx
│   │   ├── RefillForm.jsx
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── LocationMap.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Services.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   ├── styles/
│   │   ├── App.css
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
├── package.json
├── .gitignore
├── .env.example
└── vercel.json (optional)
```

---

## Service Limits & Quotas

### SendGrid

```
Free Tier:
  - Emails per day: 100
  - Max size: 30MB
  - Sent limit: 100/day

Essentials Tier ($20/month):
  - Emails per month: 30,000
  - Unlimited size
  - Unlimited frequency

Upgrade: Settings → Billing → Change Plan
```

### Google Analytics

```
Free Tier:
  - Unlimited events: Yes
  - Historical data: Unlimited
  - Data retention: 2 months (auto-delete)
  - Users: Unlimited

No rate limits for analytics collection
```

### Vercel

```
Hobby Plan (Free):
  - Deployments: Unlimited
  - Serverless Functions: 100 per day
  - Duration: 60 seconds
  - Bandwidth: 100GB/month

Pro Plan ($20/month):
  - Functions: Unlimited
  - Duration: 900 seconds
  - Better performance SLA
```

### Google Maps API

```
Free Tier:
  - Maps JS API: $7/1000 loads (up to $35/month free)
  - Platform Services: Varies

Setup: Billing enabled in Google Cloud Console
Monitor: Google Cloud Console → Billing
```

---

## Monitoring & Logging

### SendGrid Statistics

```
View at: https://app.sendgrid.com/statistics

Metrics:
  - Emails sent (total)
  - Delivery rate (%)
  - Bounce rate (%)
  - Spam complaints (%)
  - Unsubscribe rate (%)

Frequency: Real-time (updates every minute)
Retention: 30 days activity logs
```

### Google Analytics Reports

```
View at: https://analytics.google.com

Key Reports:
  - Acquisition (traffic sources)
  - Engagement (user behavior)
  - Conversions (goal completions)
  - Real-time (live users)

Data Processing: 24-48 hours for historical
Real-time: 1-2 minutes
Retention: Historical data kept forever
```

### Vercel Logs

```
View at: https://vercel.com → Project → Logs

Logs Include:
  - Build logs (deployment info)
  - Function logs (API errors)
  - Request logs (HTTP requests)

Retention: 30 days
Real-time: Live streaming available
```

---

## Common Configuration Changes

### Change Pharmacy Email

```
1. Update: PHARMACY_EMAIL env var in Vercel
2. Update: api/contact.js, api/appointment.js, api/refill.js
3. Redeploy Vercel
4. Verify emails still arriving
```

### Change SendGrid Template

```
1. Edit template in SendGrid dashboard
2. Save changes
3. Test with "Send Test Email"
4. No redeploy needed (uses remote templates)
```

### Change Google Analytics Property

```
1. Get new Measurement ID from GA
2. Update VITE_GOOGLE_ANALYTICS_ID in Vercel
3. Update <script> tag in index.html
4. Redeploy Vercel
5. Wait 24-48 hours for data to appear
```

### Add New Domain

```
1. Vercel dashboard → Settings → Domains
2. Add new domain
3. Update nameservers at registrar
4. Wait 24-48 hours for propagation
5. Verify status in Vercel
```

---

## Troubleshooting Configuration

### SendGrid API Key Invalid

**Solution:**
```
1. Go to SendGrid → Settings → API Keys
2. Check if key is valid (not revoked)
3. Copy current key
4. Update Vercel env var
5. Redeploy Vercel
```

### Google Analytics Not Tracking

**Solution:**
```
1. Check Measurement ID in index.html
2. Verify env var: VITE_GOOGLE_ANALYTICS_ID
3. Open DevTools → Network tab
4. Look for gtag requests to Google
5. Wait 24 hours for data processing
```

### Vercel Deployment Failing

**Solution:**
```
1. Check build logs: Vercel → Deployments
2. Common errors:
   - npm install failed → check package.json
   - npm run build failed → check code syntax
3. Fix locally: npm run build
4. Commit and push to GitHub
5. Vercel auto-redeploys
```

### Domain Not Resolving

**Solution:**
```
1. Check nameservers updated at registrar
2. Run: nslookup langleyparkpharmacy.com
3. Wait 24-48 hours for propagation
4. Check Vercel → Domains for ✓ status
```

---

## Security Configuration

### API Key Storage

```
✅ DO: Store in Vercel environment variables
✅ DO: Store in GitHub secrets
❌ DON'T: Commit to .env files
❌ DON'T: Hardcode in source files
❌ DON'T: Share in public messages
```

### CORS Configuration

```
SendGrid: Requires API key (no CORS issues)
GA: Uses tracking pixels (no CORS)
Maps API: Key-based (no CORS issues)
```

### Input Validation

```
All API functions validate:
  - Required fields present
  - Email format valid
  - Phone format valid (10 digits)
  - No scripts/malicious content
```

### HTTPS/SSL

```
✅ Automatically enabled by Vercel
✅ Auto-renewed by Let's Encrypt
✅ All traffic redirected to HTTPS
✅ No manual renewal needed
```

---

## Performance Optimization

### Vercel Build Optimization

```
vite.config.js:
  - Code splitting enabled
  - Tree-shaking enabled
  - Minification enabled
  - Source maps (production disabled)

Result: Small bundle size, fast load times
```

### Image Optimization

```
Recommendations:
  - Use WebP format when possible
  - Compress with TinyPNG
  - Use responsive images with srcset
  - Lazy load images: loading="lazy"

Tools:
  - TinyPNG: https://tinypng.com
  - ImageOptim: https://imageoptim.com
```

### Caching Strategy

```
Static assets: 1 year cache
Images: 30 days cache
HTML: No cache (always fresh)
API responses: No cache (dynamic)
```

---

## Quick Reference Card

```
Website: langleyparkpharmacy.com
Phone: +1 (301) 844-5280

SendGrid API Key: SG.xxxxx...
GA ID: G-XXXXXXXXXX
Maps API Key: AIzaSy...

Vercel Deployment: langleyparkpharmacy.vercel.app
GitHub Repo: github.com/dev1-osibo/langleyparkpharmacy

Pharmacy Email: pharmacy-alerts@langleyparkpharmacy.com
Contact Email: contact@langleyparkpharmacy.com
```

---

## Support Contacts

| Issue | Contact | Where |
|-------|---------|-------|
| SendGrid help | SendGrid Support | https://support.sendgrid.com |
| GA questions | Google Support | https://support.google.com/analytics |
| Vercel issues | Vercel Support | https://vercel.com/support |
| Code questions | Your developer | [contact info] |
| General questions | See TROUBLESHOOTING.md | Included docs |

---

**Last Updated:** April 2026  
**Status:** Ready for use
