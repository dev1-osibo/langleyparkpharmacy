# Langley Park Pharmacy - Troubleshooting Guide

## Common Issues & Solutions

---

## SendGrid Email Issues

### Issue: Customer doesn't receive confirmation email

**Symptoms:**
- Form submission succeeds (success message shown)
- Customer email not in inbox after 5 minutes
- No email in spam folder

**Diagnosis Steps:**

1. **Check SendGrid Activity Log**
   ```
   https://app.sendgrid.com/statistics
   → Click on "Search emails" (top right)
   → Search for customer email address
   → Check status (Delivered, Bounced, Dropped, etc.)
   ```

2. **Verify API Key is Correct**
   ```
   Vercel Dashboard → Settings → Environment Variables
   → Check VITE_SENDGRID_API_KEY value
   → Compare against SendGrid Settings → API Keys
   ```

3. **Check Template ID in Code**
   ```javascript
   // In your API function, verify:
   const templateId = 'contact-confirmation'; // Must match SendGrid
   ```

4. **Check Email Address Format**
   ```
   Is the email valid? user@domain.com
   Not: user@domain (missing .com)
   Not: @domain.com (missing username)
   ```

**Solutions:**

- **Email bounced**: 
  - Customer email may be typo (ask customer to resubmit)
  - SendGrid reputation issue (check SendGrid sender reputation)
  - Try sending test email from SendGrid dashboard first

- **Email in spam**:
  - Add `contact@langleyparkpharmacy.com` to contacts (mark as "not spam")
  - Ask customer to check spam folder
  - May need to warm up sendgrid domain (send more emails over time)

- **API key incorrect**:
  - Generate new API key in SendGrid
  - Update Vercel environment variable
  - Redeploy Vercel (or it may auto-redeploy)
  - Test again

- **Template ID wrong**:
  - Check SendGrid Templates dashboard
  - Copy exact template ID
  - Update code with correct ID
  - Redeploy

---

### Issue: Pharmacy doesn't receive alert emails

**Symptoms:**
- Form submission succeeds
- Customer gets confirmation email
- Pharmacy email inbox empty (check spam too)

**Diagnosis Steps:**

1. **Verify Pharmacy Email Address in Code**
   ```javascript
   // Search your code for:
   const pharmacyEmail = 'pharmacy-alerts@langleyparkpharmacy.com';
   // Is this the correct email where alerts should go?
   ```

2. **Check if Email Valid**
   - Is `pharmacy-alerts@langleyparkpharmacy.com` a real mailbox?
   - Or should it be `admin@langleyparkpharmacy.com`?
   - Verify with pharmacy staff

3. **Check SendGrid for Bounced Pharmacy Emails**
   ```
   SendGrid → Statistics → Search emails
   → Search for pharmacy email
   → Check status (should be "Delivered")
   ```

4. **Check Vercel Function Logs**
   ```
   Vercel Dashboard → Project → Logs
   → Find recent form submission
   → Check for errors when sending pharmacy email
   ```

**Solutions:**

- **Wrong pharmacy email in code**:
  - Update the email address in API function
  - Redeploy
  - Test again

- **Pharmacy email bounced/blocked**:
  - Create the email account (if it doesn't exist)
  - Or use different email (e.g., `hello@langleyparkpharmacy.com`)
  - Update code
  - Test in SendGrid dashboard first (send test template)

- **Email in spam folder**:
  - Pharmacy staff checks spam/promotions
  - Add `contact@langleyparkpharmacy.com` to contacts
  - May need to whitelist the sender

---

### Issue: Email template variables not replacing

**Symptoms:**
- Customer receives email
- But it shows `{name}` instead of actual name
- Or `{service}` instead of service name

**Diagnosis:**

1. **Check Template in SendGrid**
   ```
   SendGrid → Dynamic Templates → Select template
   → Check variable syntax: {{name}} not {name}
   ```

2. **Check Code Sending Email**
   ```javascript
   // Verify you're passing dynamicTemplateData correctly:
   await sgMail.send({
     templateId: 'contact-confirmation',
     to: email,
     from: 'contact@langleyparkpharmacy.com',
     dynamicTemplateData: {
       name: formData.name,        // This is the variable
       email: formData.email,
       message: formData.message
     }
   });
   ```

**Solutions:**

- **Template uses {name} instead of {{name}}**:
  - Edit template in SendGrid
  - Replace `{name}` with `{{name}}`
  - Test send template
  - Redeploy website code

- **Variable name mismatch**:
  - In template: `{{customerName}}`
  - In code: `name: formData.name` (should be `customerName: formData.name`)
  - Update code to match template variable names
  - Redeploy

- **Missing variable in dynamicTemplateData**:
  - If template has `{{phone}}` but code doesn't include it
  - Add it: `phone: formData.phone`
  - Redeploy

---

### Issue: "Free plan limit reached" or quota exceeded

**Symptoms:**
- Form submission fails
- Error: "Unable to send email" or "Rate limit exceeded"

**Diagnosis:**

1. **Check SendGrid Plan**
   ```
   SendGrid → Settings → Billing
   → Check current plan and usage
   ```

2. **Check Email Usage**
   ```
   SendGrid → Statistics
   → Check emails sent today
   → Free tier: 100 emails/day max
   ```

**Solutions:**

- **At free tier limit**:
  - Upgrade SendGrid plan to Essentials ($20/month for 30k emails)
  - Or wait until next day (quota resets daily)

- **Running out of quota soon**:
  - Monitor usage in dashboard
  - Have pharmacy staff review unnecessary emails
  - Upgrade to higher tier if needed

---

## Google Analytics Issues

### Issue: No data showing in Google Analytics

**Symptoms:**
- GA account created, property set up
- Website running for 24+ hours
- But GA shows 0 users, 0 page views

**Diagnosis Steps:**

1. **Verify GA Measurement ID**
   ```
   Google Analytics → Admin → Property Settings
   → Copy Measurement ID (G-XXXXXXXXXX)
   
   Vercel → Environment Variables
   → Check VITE_GOOGLE_ANALYTICS_ID matches
   ```

2. **Check Tracking Code in Website**
   ```javascript
   // In your index.html or main.jsx:
   <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'G-XXXXXXXXXX');
   </script>
   ```
   // Verify G-XXXXXXXXXX matches your property ID

3. **Check DevTools Network Tab**
   ```
   Open website in Chrome
   → Press F12 (Developer Tools)
   → Go to Network tab
   → Refresh page
   → Search for "gtag" or "collect"
   → Look for request to www.google-analytics.com
   → Should see blue checkmark (200 status)
   ```

4. **Check Real-Time Reports**
   ```
   Google Analytics → Reports → Real-Time → Overview
   → If page is loading now, should show 1+ active users
   ```

**Solutions:**

- **Measurement ID mismatch**:
  - Get correct ID from GA → Admin → Property Settings
  - Update Vercel environment variable
  - Redeploy website
  - Wait 5 minutes, reload page
  - Check DevTools for gtag requests

- **Tracking code not in HTML**:
  - Add Google Analytics script to `index.html` (head section)
  - Or use React component to inject gtag
  - Redeploy
  - Test in DevTools

- **Data not showing after 24 hours**:
  - Check that website is actually getting visitors
  - GA processes data every ~24 hours
  - Wait another 12 hours and check again
  - Verify no bot exclusions/filters hiding data

---

### Issue: Form submissions not tracked

**Symptoms:**
- Forms submitting successfully
- Emails being sent
- But GA shows 0 form_submission events

**Diagnosis:**

1. **Check Event Tracking Code**
   ```javascript
   // In your form submit handler:
   gtag('event', 'form_submission', {
     form_type: 'contact', // or 'appointment', 'refill'
     timestamp: new Date().toISOString()
   });
   ```
   // Verify this code runs AFTER form submission succeeds

2. **Check DevTools Console**
   ```
   Open website → DevTools → Console tab
   → Submit form
   → Look for any JavaScript errors
   → Search console output for "gtag"
   ```

3. **Check Google Analytics Events**
   ```
   GA → Reports → Engagement → Events
   → Look for form_submission event
   → Should show count of submissions
   ```

**Solutions:**

- **Event tracking code missing**:
  - Add gtag event call in form submit handler
  - Must be after form submit succeeds
  - Redeploy

- **Event data not in GA yet**:
  - Wait 24-48 hours for GA to process
  - Check Real-Time → Events (should show immediately)

- **Event name wrong in GA**:
  - Check GA Events list
  - If showing `contact_form` but code says `form_submission`
  - Update code to match or update GA event name

---

### Issue: Wrong traffic source showing in GA

**Symptoms:**
- All traffic showing as "direct"
- Should show "organic" from Google search
- Or "referral" from Facebook, etc.

**Diagnosis:**

1. **Check UTM Parameters**
   - If promoting on Facebook, links should include `?utm_source=facebook`
   - Direct visits will show as "direct" (this is normal)

2. **Check GA Settings**
   ```
   GA → Admin → Data Streams → Web
   → Verify domain list includes langleyparkpharmacy.com
   ```

**Solutions:**

- **All traffic is direct (normal if)**:
  - People type URL directly in browser
  - People click bookmarks
  - People click from emails without tracking params
  - This is expected behavior

- **Want to track social traffic**:
  - Add UTM parameters to Facebook/Instagram links:
    ```
    https://langleyparkpharmacy.com/?utm_source=facebook&utm_medium=social
    ```
  - Check GA → Reports → Traffic Acquisition → Source/Medium

---

## Deployment & Hosting Issues

### Issue: Website down or very slow

**Symptoms:**
- Site not loading at all (timeout error)
- Site loading very slowly (10+ seconds)
- intermittent access (works sometimes, not others)

**Diagnosis Steps:**

1. **Check Vercel Status**
   ```
   https://vercel.status.page.io
   → Are there any outages?
   ```

2. **Check Deployment Status**
   ```
   Vercel Dashboard → Project → Deployments
   → Is latest deployment "Ready" (green) or "Failed" (red)?
   → If failed, click to see build logs
   ```

3. **Check Build Logs**
   ```
   Vercel → Deployments → Click failed deployment
   → Scroll down to see error messages
   → Common errors:
     - npm install failed (dependency issue)
     - npm run build failed (code error)
     - Memory exceeded (build too large)
   ```

4. **Check Vercel Analytics**
   ```
   Vercel → Analytics
   → Average response time
   → 99th percentile response time
   → Error rate
   ```

5. **Test from Multiple Locations**
   ```
   Use: https://www.webpagetest.org
   → Enter langleyparkpharmacy.com
   → Test from multiple regions
   → Check if slow in specific region
   ```

**Solutions:**

- **Latest deployment failed**:
  - Check build logs for error message
  - Common fixes:
    - `npm install` failed: check package.json syntax
    - `npm run build` failed: check for code errors
    - Run locally: `npm install && npm run build`
  - Fix the error and push to GitHub
  - Vercel will auto-redeploy

- **Build too large**:
  - Check bundle size with: `npm run build -- --verbose`
  - Reduce image sizes
  - Remove unused dependencies
  - Update vite.config.js with optimizations

- **Vercel infrastructure issue**:
  - Check Vercel status page
  - No action needed (will resolve automatically)
  - If persists >1 hour, contact Vercel support

- **DNS not resolving**:
  - Check "Domain Setup" section below

---

### Issue: Domain not resolving (langleyparkpharmacy.com not working)

**Symptoms:**
- Visiting langleyparkpharmacy.com shows "Can't reach this page"
- Or "DNS_PROBE_FINISHED_NXDOMAIN"
- But vercel.app preview works fine

**Diagnosis Steps:**

1. **Check Vercel Domain Status**
   ```
   Vercel → Project Settings → Domains
   → Is langleyparkpharmacy.com listed?
   → Does it show ✓ "Valid Configuration" or ⚠️ "Pending"?
   ```

2. **Check Nameservers at Registrar**
   ```
   Login to GoDaddy / Namecheap / domain registrar
   → Domain Management → DNS / Nameservers
   → Are they pointing to Vercel? (ns1.vercel-dns.com, etc.)
   ```

3. **Test DNS Propagation**
   ```
   Open command prompt:
   nslookup langleyparkpharmacy.com
   
   Should return Vercel IP address (76.76.19.89 or similar)
   If returns "Non-existent domain" → DNS not propagated yet
   ```

4. **Check SSL Certificate**
   ```
   Visit langleyparkpharmacy.com in browser
   → Check for lock icon (HTTPS)
   → If no lock, SSL not provisioned yet
   ```

**Solutions:**

- **DNS pending in Vercel**:
  - Wait 24-48 hours for propagation
  - Check every 12 hours: `nslookup langleyparkpharmacy.com`
  - Once resolved, domain should work

- **Nameservers not updated at registrar**:
  - Login to registrar (GoDaddy, Namecheap, etc.)
  - Find DNS / Nameservers settings
  - Replace current nameservers with Vercel's:
    ```
    ns1.vercel-dns.com
    ns2.vercel-dns.com
    (or whatever Vercel shows)
    ```
  - Save changes
  - Wait 24-48 hours

- **Wrong nameservers entered**:
  - Double-check Vercel → Project Settings → Domains
  - Copy nameservers exactly
  - Update registrar
  - Test with `nslookup` command

- **Registrar doesn't allow nameserver changes**:
  - Some registrars have restrictions
  - Contact registrar support
  - May need to use CNAME records instead (Vercel can help)

---

### Issue: HTTPS/SSL not working

**Symptoms:**
- Visiting langleyparkpharmacy.com shows "Not Secure"
- No lock icon in browser
- Browser warning about "invalid certificate"

**Diagnosis:**

1. **Check Vercel Domain Status**
   ```
   Vercel → Project → Settings → Domains
   → Is domain showing ✓ "Valid Configuration"?
   → If not, DNS not set up correctly (see above)
   ```

2. **Check Certificate Status**
   ```
   Click on domain name in Vercel
   → Scroll down to "Certificate" section
   → Should show valid Let's Encrypt certificate
   ```

**Solutions:**

- **DNS not configured**:
  - Follow "Domain not resolving" section above
  - SSL only provisions after DNS works

- **Wait for SSL to provision**:
  - Takes 5-60 minutes after DNS is correct
  - Check again in 1 hour
  - Refresh page (Ctrl+Shift+R for hard refresh)

- **Certificate expired** (very rare):
  - Vercel auto-renews Let's Encrypt certs
  - Should never happen
  - Contact Vercel support if it does

---

## Form Submission Issues

### Issue: Form submits but no success message

**Symptoms:**
- User fills form and clicks Submit
- Form disappears or page refreshes
- But no "Success" message shown
- User unsure if submission worked

**Diagnosis:**

1. **Check Browser DevTools Console**
   ```
   Open browser → F12 (DevTools)
   → Console tab
   → Submit form
   → Look for JavaScript errors
   ```

2. **Check Network Tab**
   ```
   DevTools → Network tab
   → Refresh page
   → Submit form
   → Look for POST request to /api/contact (or appointment, refill)
   → Check response status (should be 200)
   ```

3. **Check Vercel Logs**
   ```
   Vercel → Project → Logs
   → Search for recent form submission
   → Look for errors in function logs
   ```

**Solutions:**

- **JavaScript error in form code**:
  - Check console error
  - Fix the error (common: variable not defined, syntax error)
  - Test locally: `npm run dev`
  - Push fix to GitHub
  - Vercel auto-redeploys

- **API function returns error**:
  - Check Vercel logs for specific error
  - Common fixes:
    - SendGrid API key wrong: update env var
    - Template ID wrong: update code
    - Email address invalid: add validation
  - Update and redeploy

- **Network request fails**:
  - Check Network tab status code
  - 400 = bad request (validation error)
  - 401 = unauthorized (API key issue)
  - 500 = server error (see Vercel logs)
  - Fix accordingly

---

### Issue: Form validation not working (accepts invalid email, etc.)

**Symptoms:**
- User enters `test` as email (not valid)
- Form submits anyway
- Email not sent (because invalid)

**Diagnosis:**

1. **Check Form Code**
   ```javascript
   // In React form component:
   const validateEmail = (email) => {
     const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     return regex.test(email);
   };
   // Is this function being used?
   ```

2. **Check HTML Input Element**
   ```html
   <input type="email" required />
   <!-- type="email" provides basic validation -->
   <!-- required prevents empty submission -->
   ```

**Solutions:**

- **Add email validation**:
  ```javascript
  if (!validateEmail(formData.email)) {
    setError('Please enter a valid email address');
    return;
  }
  ```
  - Add to form before submitting
  - Redeploy

- **Add required attribute**:
  ```html
  <input type="email" required name="email" />
  ```
  - Prevents empty submissions
  - Redeploy

- **Add phone validation**:
  ```javascript
  if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
    setError('Please enter a valid 10-digit phone number');
    return;
  }
  ```

---

## Google Maps Issues

### Issue: Map not displaying

**Symptoms:**
- Locations/Contact page loading
- But map shows blank area
- Or error message

**Diagnosis:**

1. **Check Google Maps API Key**
   ```
   Vercel → Environment Variables
   → Check VITE_MAPS_API_KEY exists and not empty
   ```

2. **Check API Key Restrictions**
   ```
   Google Cloud Console → APIs & Services → Credentials
   → Click on Maps API key
   → Check Application restrictions: should allow "langleyparkpharmacy.com"
   ```

3. **Check Browser DevTools Console**
   ```
   Open site → DevTools → Console
   → Look for errors mentioning "Maps API"
   ```

4. **Check React Component**
   ```javascript
   // Verify Maps API key is being used:
   <GoogleMap apiKey={import.meta.env.VITE_MAPS_API_KEY} />
   ```

**Solutions:**

- **API key missing or blank**:
  - Get API key from Google Cloud Console
  - Add to Vercel environment variables
  - Redeploy

- **API key restricted to wrong domain**:
  - Google Cloud Console → Credentials
  - Edit Maps API key
  - Application restrictions → HTTP referrers
  - Add: `langleyparkpharmacy.com` and `*.langleyparkpharmacy.com`
  - Save and wait 5 minutes

- **Maps library not loading**:
  - Check package.json for `@react-google-maps/api`
  - If missing: `npm install @react-google-maps/api`
  - Redeploy

---

### Issue: Map shows wrong location

**Symptoms:**
- Map displays but pin/center is wrong location
- Should be 8004 New Hampshire Ave, Takoma Park, MD

**Diagnosis:**

1. **Check Coordinates**
   ```javascript
   // Verify these are correct:
   const pharmacyLocation = {
     lat: 38.9730,  // Should be 38.9730
     lng: -77.0405  // Should be -77.0405
   };
   ```

2. **Verify Address**
   - Address should be: 8004 New Hampshire Ave, Takoma Park, MD 20912
   - Verify with pharmacy staff

**Solutions:**

- **Coordinates wrong**:
  - Use Google Maps to find correct coordinates
  - Right-click on address → click coordinates
  - Update code with correct lat/lng
  - Redeploy

- **Address format wrong**:
  - Use exact format: "8004 New Hampshire Ave, Takoma Park, MD 20912"
  - Update address in contact info (not just map)
  - Redeploy

---

## Performance Issues

### Issue: Website loading slowly

**Symptoms:**
- Page takes 5-10+ seconds to load
- Images load slowly
- Forms respond slowly to input

**Diagnosis:**

1. **Check PageSpeed Insights**
   ```
   https://pagespeed.web.dev
   → Enter langleyparkpharmacy.com
   → Check desktop and mobile scores
   ```

2. **Check Vercel Analytics**
   ```
   Vercel → Analytics
   → Average response time (should be <500ms)
   → 99th percentile (should be <2s)
   ```

3. **Check Network Waterfall**
   ```
   PageSpeed → Scroll down → Opportunities
   → Look for "Reduce unused CSS/JavaScript"
   → Check "Serve images in next-gen formats"
   ```

**Solutions:**

- **Large images slowing page**:
  - Use WebP format instead of PNG/JPEG
  - Compress images with: https://tinypng.com
  - Reduce resolution (for web, 1200px width is enough)
  - Update image paths and redeploy

- **Unused CSS/JavaScript**:
  - Check vite.config.js for tree-shaking enabled
  - Remove unused imports
  - Use code splitting for large pages
  - Run: `npm run build -- --analyze` to see bundle

- **Third-party scripts slow**:
  - Google Analytics can slow page load
  - Load gtag script async (already done by default)
  - Defer non-critical scripts

- **Too many API calls**:
  - Check Network tab for multiple API calls
  - Combine requests where possible
  - Add caching headers

---

### Issue: Mobile performance poor

**Symptoms:**
- Desktop loads quickly
- Mobile loads slowly (especially on 4G)
- Mobile PageSpeed score low (<50)

**Diagnosis:**

1. **Check Mobile PageSpeed Score**
   ```
   https://pagespeed.web.dev
   → Select "Mobile" view
   → Check score (target >80)
   ```

2. **Check Core Web Vitals**
   ```
   PageSpeed → Web Vitals section
   → Largest Contentful Paint (target <2.5s)
   → First Input Delay (target <100ms)
   → Cumulative Layout Shift (target <0.1)
   ```

**Solutions:**

- **High Largest Contentful Paint (slow image)**:
  - Use smaller image for mobile
  - Use responsive images: `<picture>` or `srcset`
  - Lazy load images: `loading="lazy"`

- **High First Input Delay (JavaScript block)**:
  - Move heavy scripts to end of `<body>`
  - Use `defer` attribute on scripts
  - Break long operations into smaller chunks

- **High Cumulative Layout Shift (layout jumps)**:
  - Set fixed widths/heights on images
  - Reserve space for ads/embeds
  - Use CSS containment: `contain: layout`

---

## Email Verification & Testing

### Issue: Unsure if SendGrid is set up correctly

**Solution: Test SendGrid in Dashboard**

1. Login to https://app.sendgrid.com
2. Go to "Dynamic Templates"
3. Select one of your templates (e.g., `contact-confirmation`)
4. Click "Send Test Email"
5. Fill in test data:
   ```
   To: your-test-email@gmail.com
   Subject: (auto-filled)
   ```
6. Click "Send"
7. Check your inbox in 1-2 minutes
8. If you receive it, SendGrid is working!

**Verify Template Variables:**
1. In SendGrid, edit the template
2. Look for variable syntax: `{{variableName}}`
3. Send test email with test data
4. Verify variables replaced in email (not showing {{name}})

---

### Issue: Emails going to spam folder

**Symptoms:**
- Emails sent successfully
- But recipients find them in spam/promotions

**Causes & Solutions:**

1. **Sender Reputation**
   - New SendGrid account may have low reputation
   - Send more emails over time (reputation builds gradually)
   - Monitor bounce rate (keep <5%)

2. **Email Content**
   - Avoid SPAM trigger words: "Free!", "Act Now!", "Limited Offer"
   - Include unsubscribe link (SendGrid does this by default)
   - Use clear, professional subject line

3. **Authentication**
   - Verify SPF/DKIM records (SendGrid sets these up)
   - Check with: https://www.mail-tester.com
   - Should score 8/10 or higher

4. **Recipient Whitelist**
   - Ask pharmacy to add `contact@langleyparkpharmacy.com` to contacts
   - Mark emails as "not spam"

---

## Database & Data Issues

### Issue: Form submissions not being stored

**Symptoms:**
- Forms submit successfully
- Emails sent
- But no record of submission in database/logs

**Note:** If you don't have a database set up, this is expected behavior. Submissions are only tracked via:
- SendGrid (check their statistics)
- Google Analytics (check events)
- Pharmacy email inbox

**If You Have a Database:**

1. Check database connection
2. Verify API function is storing data
3. Check database logs for errors

---

## Server & API Issues

### Issue: "500 Internal Server Error" when submitting form

**Symptoms:**
- Form submission fails
- Error message: "500 Internal Server Error"
- Or "Something went wrong"

**Diagnosis:**

1. **Check Vercel Function Logs**
   ```
   Vercel → Project → Logs
   → Find recent form submission request
   → Click to see full error message
   ```

2. **Common Causes:**
   - SendGrid API key invalid/expired
   - SendGrid rate limit hit
   - Template ID doesn't exist
   - Environment variable not set

**Solutions:**

- **SendGrid API key invalid**:
  - Generate new key in SendGrid
  - Update Vercel env variable
  - Redeploy

- **SendGrid rate limit hit**:
  - You've sent 100+ emails today (free tier limit)
  - Wait until tomorrow for quota reset
  - Or upgrade plan

- **Template ID wrong**:
  - Check SendGrid template ID matches code
  - Update code if needed
  - Redeploy

- **Missing environment variable**:
  - Check Vercel → Settings → Environment Variables
  - Add missing variable
  - Redeploy

---

## Contact & Support

### Need Help?

1. **Check this guide first** — 90% of issues covered here
2. **Check INTEGRATION_GUIDE.md** — Architecture & setup details
3. **Check DEPLOYMENT_CHECKLIST.md** — Verification steps

### External Support

- **SendGrid Help**: https://support.sendgrid.com
- **Google Analytics Help**: https://support.google.com/analytics
- **Vercel Help**: https://vercel.com/support
- **Google Cloud Support**: https://cloud.google.com/support

### Escalation

If you can't find a solution:

1. Document the issue (screenshots, error messages)
2. Note what you've already tried
3. Contact platform support with documentation
4. Share Vercel build logs / SendGrid activity logs

---

**Last Updated**: April 2026
**Pharmacy Contact**: +1 (301) 844-5280
