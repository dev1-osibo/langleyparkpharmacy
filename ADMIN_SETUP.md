# Langley Park Pharmacy - Admin Setup Guide

This guide is for pharmacy staff who need to monitor and manage the website.

---

## Dashboard Access

### 1. Checking Customer Emails (SendGrid)

**Purpose:** Verify customers are receiving confirmations, troubleshoot delivery issues

**Access:**
```
Go to: https://app.sendgrid.com
Email: (your SendGrid account email)
Password: (your SendGrid account password)
```

**Dashboard Overview:**

```
SendGrid Home
├── Statistics (Main Dashboard)
│   ├── Total emails sent (today, this week, this month)
│   ├── Delivery rate (% of emails successfully sent)
│   ├── Bounce rate (% of emails that bounced)
│   └── Spam complaint rate (should be 0%)
├── Activity (Recently sent emails)
│   └── Shows individual emails with status
└── Templates (Manage email templates)
    ├── contact-confirmation
    ├── appointment-confirmation
    ├── refill-confirmation
    ├── contact-alert
    ├── appointment-alert
    └── refill-alert
```

### 2. Checking Website Analytics (Google Analytics)

**Purpose:** See how many people visit, what pages they view, form submission rates

**Access:**
```
Go to: https://analytics.google.com
Email: (Google account)
Password: (Google password)
→ Select property: "Langley Park Pharmacy"
```

**Dashboard Views:**

```
Google Analytics
├── Reports → Real Time (right now)
│   ├── Active users (people on site now)
│   └── Events happening now
├── Reports → Acquisition (where traffic comes from)
│   ├── Google Search
│   ├── Direct (people typing URL)
│   ├── Social (Facebook, Instagram, etc.)
│   └── Referral (other websites)
├── Reports → Engagement (what people do)
│   ├── Page views (most visited pages)
│   ├── Event count (form submissions)
│   └── Session duration (how long people stay)
└── Reports → Conversions (goals achieved)
    ├── Contact form submissions
    ├── Appointment requests
    └── Prescription refill requests
```

### 3. Checking Website Status (Vercel)

**Purpose:** See if site is live, check for errors, view deployment history

**Access:**
```
Go to: https://vercel.com
Email: (your Vercel account)
Password: (your Vercel password)
→ Select project: "langleyparkpharmacy"
```

**Dashboard Views:**

```
Vercel Project
├── Deployments (history of all updates)
│   ├── Latest deployment status (Ready ✓ or Failed ✗)
│   ├── Build logs (if failed, shows error)
│   └── Preview URLs
├── Analytics (website performance)
│   ├── Page load speed (average)
│   ├── Error rate (% of requests with errors)
│   └── Server response time
├── Settings → Environment Variables
│   ├── VITE_SENDGRID_API_KEY (don't share this)
│   ├── VITE_GOOGLE_ANALYTICS_ID
│   └── VITE_MAPS_API_KEY
└── Logs (recent requests and errors)
    ├── Function logs (API errors, SendGrid failures)
    └── Build logs (deployment errors)
```

---

## Daily Monitoring Tasks

### Morning (8 AM)

1. **Check for overnight submissions**
   ```
   SendGrid → Activity
   Search for emails sent last 12 hours
   Count: contact confirmations, appointment confirmations, refill confirmations
   ```

2. **Check pharmacy alert emails**
   ```
   Open your pharmacy email (e.g., hello@langleyparkpharmacy.com)
   Look for emails with subject:
   - "NEW: Contact form submission from..."
   - "NEW APPOINTMENT REQUEST: ..."
   - "NEW REFILL REQUEST: ..."
   
   Note: How many new requests? Any urgent? Any requiring follow-up?
   ```

3. **Check website status**
   ```
   Vercel Dashboard → Deployments
   Is latest deployment "Ready" (green)?
   If not, check build logs for errors
   ```

### Afternoon (2 PM)

1. **Monitor ongoing submissions**
   ```
   SendGrid → Activity
   Any recent bounced emails? (should be 0)
   Any spam complaints? (should be 0)
   ```

2. **Check Google Analytics**
   ```
   GA → Real-Time → Overview
   How many users active right now?
   Has anyone filled out a form in last 2 hours?
   ```

### Evening (5 PM)

1. **Final check before close**
   ```
   SendGrid → Count today's emails sent
   GA → Check today's form submissions
   Email → Any customer questions or issues?
   ```

---

## Weekly Monitoring Tasks

### Every Monday Morning

1. **Review Last Week's Stats**

   **Email Performance:**
   ```
   SendGrid → Statistics
   → Select last 7 days
   → Record:
      - Total emails sent
      - Delivery rate (target: >95%)
      - Bounce rate (target: <5%)
      - Spam complaints (target: 0)
   ```

   **Website Traffic:**
   ```
   GA → Reports → Acquisition
   → Select last 7 days
   → Record:
      - Total users
      - Page views
      - Bounce rate
      - Top traffic sources
   ```

   **Form Submissions:**
   ```
   GA → Reports → Conversions
   → Select last 7 days
   → Count:
      - Contact form submissions
      - Appointment requests
      - Refill requests
   ```

2. **Update Pharmacy Records**

   Create a simple spreadsheet:
   ```
   Week of [Date]
   
   Email Stats:
   - Emails sent: __
   - Delivery rate: __%
   - Bounce rate: __%
   
   Website Stats:
   - Unique users: __
   - Page views: __
   
   Conversions:
   - Contact forms: __
   - Appointments: __
   - Refills: __
   ```

3. **Check for Issues**
   ```
   - Any bounced emails? (check why)
   - Any form submissions not received? (check pharmacy email spam)
   - Website down at any point? (check Vercel status)
   - Any errors in Vercel logs? (check Logs section)
   ```

---

## Monthly Monitoring Tasks

### First Monday of Each Month

1. **Review Full Month's Performance**

   **Email Metrics:**
   ```
   SendGrid → Statistics → Last 30 days
   - Total emails sent this month
   - Delivery rate trend (improving?)
   - Any trends in bounces/complaints?
   ```

   **Website Metrics:**
   ```
   GA → All reports → Last 30 days
   - Total unique users this month
   - Most visited pages (which pages most popular?)
   - Traffic sources (Google, Direct, Social, etc.)
   - Geographic data (where are visitors from?)
   ```

   **Form Performance:**
   ```
   GA → Conversions
   - Contact forms: __ (target: 8-20/month)
   - Appointments: __ (target: 4-12/month)
   - Refills: __ (target: 4-8/month)
   ```

2. **Performance Report**

   Create monthly summary:
   ```
   LANGLEY PARK PHARMACY
   Website Monthly Report
   Month: [Month/Year]
   
   Email Stats:
   - Total emails sent: __
   - Delivery rate: __%
   - Bounced: __
   - Spam complaints: __
   
   Website Traffic:
   - Unique visitors: __
   - Total page views: __
   - Avg bounce rate: __%
   - Avg session duration: __ minutes
   
   Conversions:
   - Contact forms: __
   - Appointments: __
   - Refills: __
   - Total submissions: __
   
   Top Pages:
   1. [Page name] - __ views
   2. [Page name] - __ views
   3. [Page name] - __ views
   
   Traffic Sources:
   - Organic (Google): __%
   - Direct: __%
   - Social: __%
   - Other: __%
   
   Issues/Observations:
   - [Note any issues or trends]
   ```

3. **Review & Plan**
   ```
   Is website performing well?
   - Are form submissions increasing? Good!
   - Are bounce rates trending down? Good!
   - Is email delivery consistent? Good!
   
   Any changes needed?
   - Update content on high-bounce pages?
   - Add more CTAs to low-conversion pages?
   - Promote on social media to increase traffic?
   ```

---

## Responding to Customer Submissions

### When You Receive a Contact Form Alert

**Email arrives:** "NEW: Contact form submission from John Smith"

**Steps to Take:**

1. **Read the alert email**
   ```
   From: SendGrid (on behalf of contact@langleyparkpharmacy.com)
   Subject: NEW: Contact form submission from John Smith
   
   Contains:
   - Customer name
   - Customer email
   - Customer phone
   - Customer message
   ```

2. **Respond within 24 hours**
   ```
   Send reply to customer email with:
   - Thank you for contacting us
   - Brief answer to their question (if applicable)
   - Ask if they'd like to book appointment or call
   - Pharmacy contact info and hours
   ```

3. **Log the submission** (optional)
   ```
   Keep spreadsheet or notebook:
   Date: __
   Customer: __
   Phone: __
   Message: __ (summary)
   Responded: Yes/No
   Date Responded: __
   Outcome: __ (e.g., scheduled appointment, answered question)
   ```

### When You Receive an Appointment Request Alert

**Email arrives:** "NEW APPOINTMENT REQUEST: Immunization"

**Steps to Take:**

1. **Read the alert email**
   ```
   Contains:
   - Desired service (e.g., "Immunization")
   - Preferred date/time
   - Customer name, phone, email
   - Any special notes
   ```

2. **Respond within 24 hours**
   ```
   Call customer at provided phone number, OR
   Email customer at provided email address
   
   Say/Write:
   "Hi [name], we received your appointment request for [service] 
    on [date]. We can see you at [available time]. Please confirm 
    by replying or calling us at [phone]."
   ```

3. **Schedule in pharmacy calendar**
   ```
   Add appointment to your scheduling system
   Note the customer info and requested service
   ```

4. **Send confirmation** (if customer confirms)
   ```
   Email or call back:
   "Your appointment is confirmed for [service] 
    on [date] at [time]. See you then!"
   ```

### When You Receive a Refill Request Alert

**Email arrives:** "NEW REFILL REQUEST: Lisinopril"

**Steps to Take:**

1. **Read the alert email**
   ```
   Contains:
   - Medication name
   - Prescription number
   - Number of refills
   - Customer name, phone, email
   - Any notes (allergy info, etc.)
   ```

2. **Process the refill**
   ```
   In your pharmacy system:
   - Look up customer prescription
   - Verify prescription has refills available
   - Check for any interactions with other meds
   - Fill the prescription
   - Typically 2 hours processing time
   ```

3. **Notify customer**
   ```
   Customer already got confirmation email saying:
   "We'll process your refill and let you know when it's ready 
    (usually 2 hours)"
   
   When ready, call customer:
   "Hi [name], your [medication] refill is ready for pickup."
   
   Or wait for customer to call (if they prefer)
   ```

---

## Email Template Management

### When to Update Email Templates

**Scenario 1: Change Pharmacy Hours**
```
If hours changed, update contact confirmation email:
Current: "We're open 9am-6pm Monday-Friday"
New: "We're open 8am-8pm Monday-Friday"

Steps:
1. Go to SendGrid → Dynamic Templates
2. Edit template (e.g., contact-confirmation)
3. Update text with new hours
4. Click "Save"
5. Test send to yourself to verify
```

**Scenario 2: Add Phone Number (if changed)**
```
SendGrid → Templates → Edit template
Find: +1 (301) 844-5280
Replace with: new number
Save and test
```

**Scenario 3: Change Sender Email Address**
```
Current: contact@langleyparkpharmacy.com
New: hello@langleyparkpharmacy.com

Steps:
1. SendGrid → Dynamic Templates → Edit template
2. At top, find "From address"
3. Change to new email
4. Save
5. Update code/API settings to match
```

**Scenario 4: Add/Remove Discount Code**
```
Example: "New customer? Use code PHARMACY10 for 10% off"

Steps:
1. SendGrid → Templates → Edit template
2. Add promotion section
3. Include code and expiration date
4. Test send
5. Consider adding to all 3 customer templates
```

---

## Troubleshooting Tips for Staff

### "I didn't receive a contact form alert email"

**Check:**
1. Look in spam/promotions folder
2. Check that pharmacy email is set up correctly
3. Verify pharmacy email address in website code (contact webmaster if wrong)

**Verify with SendGrid:**
1. Go to https://app.sendgrid.com/statistics
2. Search for pharmacy email address
3. Check if alert email shows "Bounced" status
   - If bounced: email address invalid (update it)
   - If delivered: check spam folder

### "Customer says they never got confirmation email"

**Check:**
1. Ask customer to check spam/promotions folder
2. Verify customer email is spelled correctly (ask them to say it)
3. Check customer email doesn't block pharmacy domain

**Verify with SendGrid:**
1. Go to https://app.sendgrid.com/statistics
2. Search for customer email address
3. Click on their email to see status:
   - **Delivered**: Email sent successfully (check spam folder)
   - **Bounced**: Email address invalid
   - **Dropped**: Wrong template or rate limit
4. If bounced: have customer resubmit with correct email

### "Analytics shows 0 submissions but I got the emails"

**This is okay!** Two possibilities:
1. GA takes 24 hours to process data (check tomorrow)
2. Contact form doesn't have tracking code installed

**Workaround:**
- Trust the alert emails you receive
- Count submissions manually from pharmacy email inbox
- Update spreadsheet with counts

### "Website showing error when customers try to submit form"

**Tell them:**
"Sorry, we're experiencing a technical issue. Please call us at [phone] or try again in 5 minutes."

**Investigate:**
1. Check Vercel → Logs for error message
2. Contact webmaster with error message
3. Webmaster will fix and redeploy

---

## Monthly Admin Checklist

- [ ] Monday of each month: Review weekly stats
- [ ] Check pharmacy email for any stuck messages
- [ ] Verify SendGrid delivery rate >95%
- [ ] Verify GA tracking active
- [ ] Verify Vercel deployment is "Ready"
- [ ] Update spreadsheet with latest metrics
- [ ] Share metrics with pharmacy owner/manager
- [ ] Check for any customer complaints about emails
- [ ] Review and update templates if needed

---

## Contact & Support

### If You Have Questions

1. **About website traffic/analytics:**
   Contact: Webmaster / Developer

2. **About form submissions:**
   Contact: Webmaster / Developer

3. **About email templates:**
   Contact: Webmaster (templates managed in SendGrid)

4. **About website errors:**
   Contact: Webmaster / Developer

### Escalation

If something breaks:
1. Note what happened and when
2. Take a screenshot of error message
3. Check the relevant dashboard (SendGrid, GA, Vercel)
4. Contact webmaster with:
   - What broke
   - When it broke
   - Screenshot of error
   - Dashboard info (SendGrid activity, Vercel logs, etc.)

---

## Key Contacts

**Pharmacy:** 8004 New Hampshire Ave, Takoma Park, MD 20912  
**Phone:** +1 (301) 844-5280

**Website:** langleyparkpharmacy.com  
**Contact Email:** contact@langleyparkpharmacy.com  
**Admin Alerts Email:** pharmacy-alerts@langleyparkpharmacy.com

**Webmaster/Developer:** (contact person)  
**Webmaster Email:** (email)  
**Webmaster Phone:** (phone)

---

**Last Updated:** April 2026
