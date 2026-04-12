# Langley Park Pharmacy - Deployment Checklist

Use this checklist to verify all integrations are working before going live.

## Phase 1: SendGrid Setup ✓

- [ ] Create SendGrid account (https://sendgrid.com)
- [ ] Verify sender domain: `contact@langleyparkpharmacy.com`
- [ ] Generate API key
- [ ] Store API key securely (don't commit to repo)

### Customer Email Templates

- [ ] **Template 1: Contact Form Confirmation**
  - [ ] Template ID: `contact-confirmation`
  - [ ] Subject: "We received your message"
  - [ ] Variables: {name}, {email}, {phone}, {message}
  - [ ] Test: Create draft email → verify variables render

- [ ] **Template 2: Appointment Request Confirmation**
  - [ ] Template ID: `appointment-confirmation`
  - [ ] Subject: "Appointment request received"
  - [ ] Variables: {name}, {service}, {preferred_date}, {phone}
  - [ ] Test: Create draft email → verify variables render

- [ ] **Template 3: Prescription Refill Confirmation**
  - [ ] Template ID: `refill-confirmation`
  - [ ] Subject: "Prescription refill request received"
  - [ ] Variables: {name}, {medication}, {refills}, {prescription_number}
  - [ ] Test: Create draft email → verify variables render

### Admin Alert Templates

- [ ] **Alert 1: New Contact Submission**
  - [ ] Template ID: `contact-alert`
  - [ ] Recipient: pharmacy-alerts@langleyparkpharmacy.com
  - [ ] Subject: "NEW: Contact form submission from {name}"
  - [ ] Variables: {name}, {email}, {phone}, {message}

- [ ] **Alert 2: New Appointment Request**
  - [ ] Template ID: `appointment-alert`
  - [ ] Recipient: pharmacy-alerts@langleyparkpharmacy.com
  - [ ] Subject: "NEW APPOINTMENT REQUEST: {service}"
  - [ ] Variables: {name}, {phone}, {email}, {service}, {preferred_date}, {notes}

- [ ] **Alert 3: New Refill Request**
  - [ ] Template ID: `refill-alert`
  - [ ] Recipient: pharmacy-alerts@langleyparkpharmacy.com
  - [ ] Subject: "NEW REFILL REQUEST: {medication}"
  - [ ] Variables: {name}, {phone}, {email}, {medication}, {refills}, {notes}

## Phase 2: Google Analytics Setup ✓

- [ ] Create Google account (if needed)
- [ ] Go to https://analytics.google.com
- [ ] Create new property: "Langley Park Pharmacy"
- [ ] Set website URL: `langleyparkpharmacy.com`
- [ ] Copy Measurement ID (format: G-XXXXXXXXXX)

### Events & Goals

- [ ] Create goal: "Contact form submission"
- [ ] Create goal: "Appointment request"
- [ ] Create goal: "Prescription refill"
- [ ] Configure event tracking for form submissions
- [ ] Configure event tracking for CTA clicks

### Dashboards

- [ ] Create "Overview" dashboard
- [ ] Create "Conversions" dashboard
- [ ] Create "Pages Performance" dashboard
- [ ] Create "Traffic Sources" dashboard

## Phase 3: GitHub Setup ✓

- [ ] Create GitHub account (if needed)
- [ ] Create repository: `dev1-osibo/langleyparkpharmacy`
- [ ] Initialize with:
  - [ ] README.md
  - [ ] .gitignore (Node.js template)
  - [ ] LICENSE (MIT)
  - [ ] package.json
- [ ] Make repository public

### GitHub Secrets

- [ ] Store `SENDGRID_API_KEY` in repo secrets
- [ ] Store `GOOGLE_ANALYTICS_ID` in repo secrets

### Branch Protection (Optional)

- [ ] Enable on `main` branch
- [ ] Require pull requests before merging
- [ ] Require status checks before merging (if CI configured)

## Phase 4: Vercel Deployment ✓

- [ ] Create Vercel account (https://vercel.com)
- [ ] Import GitHub repo: `dev1-osibo/langleyparkpharmacy`
- [ ] Verify framework detection: React + Vite
- [ ] Verify build settings:
  - [ ] Build command: `npm run build`
  - [ ] Output directory: `dist`
  - [ ] Install command: `npm install`

### Environment Variables (in Vercel Dashboard)

- [ ] `VITE_SENDGRID_API_KEY` = [your SendGrid API key]
- [ ] `VITE_GOOGLE_ANALYTICS_ID` = G-XXXXXXXXXX
- [ ] `VITE_MAPS_API_KEY` = [your Google Maps API key]
- [ ] `VITE_CALENDLY_URL` = [optional: Calendly embed URL]

### Deployment Verification

- [ ] Trigger first deployment (push to main)
- [ ] Verify build succeeds (check build logs)
- [ ] Verify deployment succeeds
- [ ] Preview deployment accessible at `*.vercel.app`

## Phase 5: Domain Setup (DNS) ✓

- [ ] Add domain to Vercel dashboard
- [ ] Copy Vercel nameservers (usually 4)
- [ ] Login to domain registrar (GoDaddy, Namecheap, etc.)
- [ ] Update nameservers to Vercel's
- [ ] Wait 24-48 hours for DNS propagation

### DNS Verification

- [ ] Verify domain in Vercel dashboard shows ✓
- [ ] Test: `nslookup langleyparkpharmacy.com` (should return Vercel IP)
- [ ] Test: Visit langleyparkpharmacy.com in browser
- [ ] Test: SSL works (HTTPS shows lock icon)

## Phase 6: Google Maps Setup ✓

- [ ] Go to Google Cloud Console
- [ ] Create new project: "Langley Park Pharmacy"
- [ ] Enable "Maps JavaScript API"
- [ ] Create API key
- [ ] Restrict API key to domain: `langleyparkpharmacy.com`
- [ ] Copy API key to Vercel: `VITE_MAPS_API_KEY`

### Map Testing

- [ ] Map displays on Locations/Contact page
- [ ] Marker shows at correct coordinates (38.9730, -77.0405)
- [ ] Map is interactive (zoom, pan, etc.)
- [ ] No API errors in browser console

## Phase 7: Form Integration & Testing

### Contact Form Tests

- [ ] Form loads on Contact page
- [ ] All fields present: name, email, phone, message
- [ ] Frontend validation works (try submitting empty form)
- [ ] **Test submission:**
  - [ ] Fill out form with test email
  - [ ] Submit form
  - [ ] Success message appears
  - [ ] Customer receives confirmation email (check inbox + spam)
  - [ ] Pharmacy receives alert email
- [ ] **Test error handling:**
  - [ ] Disable internet → submit → error message appears
  - [ ] Verify error is user-friendly (no technical jargon)

### Appointment Form Tests

- [ ] Form loads on Appointments page
- [ ] All fields present: service, preferred date/time, name, email, phone, notes
- [ ] Service dropdown populated with options
- [ ] Date/time picker works
- [ ] **Test submission:**
  - [ ] Select service, date, time
  - [ ] Fill name, email, phone
  - [ ] Submit form
  - [ ] Success message: "Request submitted. We'll confirm within 24 hours"
  - [ ] Customer receives confirmation email
  - [ ] Pharmacy receives alert email with all details

### Refill Form Tests

- [ ] Form loads on Refills/Services page
- [ ] All fields present: medication, prescription number, refills needed, name, email, phone, notes
- [ ] **Test submission:**
  - [ ] Fill out form with test data
  - [ ] Submit form
  - [ ] Success message: "Refill submitted. We'll update you in 2 hours"
  - [ ] Customer receives confirmation email
  - [ ] Pharmacy receives alert email

## Phase 8: Analytics Verification

- [ ] Wait 24-48 hours for GA data to process
- [ ] Check Google Analytics dashboard
- [ ] Verify page views recorded
- [ ] Verify form submissions logged as events
- [ ] Verify CTA clicks tracked
- [ ] Run through conversion funnel

### Analytics Test Flow

1. Open browser DevTools → Network tab
2. Visit langleyparkpharmacy.com (home page)
3. Search DevTools Network for "gtag" or "collect"
4. Verify request to Google Analytics sent
5. Submit contact form
6. Verify form_submission event in DevTools

## Phase 9: Email Delivery Verification

### SendGrid Dashboard Checks

- [ ] Login to SendGrid (https://app.sendgrid.com)
- [ ] Go to Statistics → Overview
- [ ] Verify recent emails listed
- [ ] Check delivery rate (should be 100% for test emails)
- [ ] Verify bounce rate is 0%
- [ ] Check spam complaint rate (should be 0%)

### Email Content Verification

- [ ] Check customer confirmation email for:
  - [ ] Correct subject line
  - [ ] Pharmacy contact info (address, phone)
  - [ ] Professional formatting
  - [ ] All variables replaced (not {name}, but actual name)

- [ ] Check pharmacy alert email for:
  - [ ] All customer info present (name, email, phone)
  - [ ] Form content clear and readable
  - [ ] Timestamp included
  - [ ] Call-to-action clear

## Phase 10: Responsiveness Testing

### Desktop (1440px, 1024px)

- [ ] All pages load correctly
- [ ] All forms visible and functional
- [ ] Map displays properly
- [ ] Navigation accessible
- [ ] No horizontal scrolling

### Tablet (768px)

- [ ] Layout adapts to tablet width
- [ ] Touch targets are large enough (>44px)
- [ ] Forms are usable on tablet
- [ ] Map is interactive
- [ ] Images scale properly

### Mobile (375px)

- [ ] Layout stacks vertically
- [ ] Touch targets large enough (>44px minimum)
- [ ] Forms work on mobile (especially date/time picker)
- [ ] Map loads on mobile
- [ ] Submit buttons are easy to tap
- [ ] No horizontal scrolling
- [ ] Text readable without zooming

### Testing Devices

- [ ] Test on Chrome (desktop + mobile)
- [ ] Test on Safari (desktop + mobile if available)
- [ ] Test on Firefox (desktop)
- [ ] Use browser DevTools responsive design mode

## Phase 11: Performance Checks

- [ ] Visit https://pagespeed.web.dev
- [ ] Enter langleyparkpharmacy.com
- [ ] Check results:
  - [ ] Desktop score: target >80
  - [ ] Mobile score: target >80
  - [ ] Core Web Vitals: target "Good"
  - [ ] Largest Contentful Paint (LCP): <2.5s
  - [ ] First Input Delay (FID): <100ms
  - [ ] Cumulative Layout Shift (CLS): <0.1

- [ ] Check Vercel Analytics dashboard
  - [ ] Average response time: <500ms
  - [ ] 99th percentile response time: <2s

## Phase 12: Security Checks

- [ ] Verify HTTPS enabled (lock icon in browser)
- [ ] Verify no sensitive data in source code
  - [ ] API keys only in Vercel env vars, not in .env.local
  - [ ] No secrets committed to GitHub
  - [ ] No hardcoded emails/passwords
- [ ] Test form submission with malicious input (e.g., `<script>alert('xss')</script>`)
  - [ ] Input should be escaped/sanitized in stored data
  - [ ] Should not execute JavaScript

## Phase 13: Final Live Testing

### Complete Customer Journey

1. **Contact Flow**
   - [ ] Visit homepage
   - [ ] Navigate to Contact page
   - [ ] Fill out contact form
   - [ ] Submit
   - [ ] Receive confirmation email
   - [ ] Verify pharmacy received alert

2. **Appointment Flow**
   - [ ] Visit homepage
   - [ ] Navigate to Appointments page
   - [ ] Select service, date, time
   - [ ] Fill out appointment form
   - [ ] Submit
   - [ ] Receive confirmation email

3. **Refill Flow**
   - [ ] Visit homepage
   - [ ] Navigate to Services/Refills page
   - [ ] Fill out refill form
   - [ ] Submit
   - [ ] Receive confirmation email

### Analytics Verification

- [ ] Log into Google Analytics
- [ ] Verify today's traffic recorded
- [ ] Verify form submissions counted as conversions
- [ ] Check traffic sources (should show "direct" if you visited directly)

## Phase 14: Monitoring Setup

- [ ] Bookmark SendGrid dashboard: https://app.sendgrid.com/statistics
- [ ] Bookmark Google Analytics: https://analytics.google.com
- [ ] Bookmark Vercel dashboard: https://vercel.com
- [ ] Set up alert email from SendGrid (Activity → Alerts)
- [ ] Set up pharmacy alert email verification

### Alerts to Configure

- [ ] SendGrid: Alert if delivery rate drops below 90%
- [ ] SendGrid: Alert if bounce rate exceeds 5%
- [ ] Vercel: Alert if build fails
- [ ] Google Analytics: Alert if daily users drop 50%

## Launch Readiness Checklist

After completing all phases above:

- [ ] All forms tested and working
- [ ] All emails sent and received correctly
- [ ] Google Analytics tracking data
- [ ] Domain resolves to correct IP
- [ ] SSL certificate active and valid
- [ ] Page load speed acceptable
- [ ] Mobile responsive and functional
- [ ] No JavaScript errors in console
- [ ] Pharmacy team trained on email alerts
- [ ] Documentation complete (INTEGRATION_GUIDE.md, ADMIN_SETUP.md)

## Go-Live Sign-Off

- [ ] QA sign-off: ______________________ (name, date)
- [ ] Pharmacy approval: ______________________ (name, date)
- [ ] Launch date: ______________________

---

## Post-Launch Monitoring

### Daily Tasks (First 2 Weeks)

- [ ] Check Vercel dashboard for errors
- [ ] Check pharmacy email for alert messages
- [ ] Verify Google Analytics recording data
- [ ] Monitor site performance (Vercel Analytics)

### Weekly Tasks (Ongoing)

- [ ] Review form submissions count
- [ ] Check SendGrid delivery metrics
- [ ] Review Google Analytics dashboard
- [ ] Monitor Core Web Vitals
- [ ] Update ADMIN_SETUP.md with any issues found

### Monthly Tasks (Ongoing)

- [ ] Backup website code (GitHub already does this)
- [ ] Review analytics trends
- [ ] Check for any customer complaints about emails
- [ ] Update documentation as needed
- [ ] Review and archive old form submissions (if storing data)

---

**Questions?** See INTEGRATION_GUIDE.md or TROUBLESHOOTING.md
