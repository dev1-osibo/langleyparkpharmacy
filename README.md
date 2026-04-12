# Langley Park Pharmacy Website

A professional, fully-featured React website for Langley Park Pharmacy built with Vite, Tailwind CSS, and deployed on Vercel.

## 📋 Table of Contents

- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Features](#features)
- [Customization Guide](#customization-guide)
- [Deployment](#deployment)
- [Managing Content](#managing-content)
- [Forms & Email Integration](#forms--email-integration)
- [Troubleshooting](#troubleshooting)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The site will be available at `http://localhost:3000`

## 📁 Project Structure

```
langleyparkpharmacy/
├── public/
│   ├── images/              # Images (add your photos here)
│   └── favicon.ico
├── src/
│   ├── components/          # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ServiceCard.jsx
│   │   ├── TestimonialCard.jsx
│   │   ├── BlogCard.jsx
│   │   ├── ContactForm.jsx
│   │   ├── AppointmentForm.jsx
│   │   ├── RefillForm.jsx
│   │   └── FAQAccordion.jsx
│   ├── pages/               # Page components
│   │   ├── Home.jsx
│   │   ├── Services.jsx
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Appointments.jsx
│   │   ├── Refills.jsx
│   │   ├── FAQ.jsx
│   │   ├── Blog.jsx
│   │   └── BlogPost.jsx
│   ├── blog/                # Blog posts (Markdown)
│   │   ├── post-1.md
│   │   ├── post-2.md
│   │   └── post-3.md
│   ├── styles/
│   │   └── globals.css      # Global styles + Tailwind
│   ├── App.jsx              # Main app component
│   └── main.jsx             # Entry point
├── package.json
├── vite.config.js
├── tailwind.config.js
├── vercel.json              # Vercel deployment config
├── .env.local.example       # Environment variables template
├── .gitignore
└── README.md
```

## ✨ Features

- ✅ **Responsive Design** - Mobile-first, works on all devices
- ✅ **Fast Performance** - Vite + Tailwind CSS for speed
- ✅ **Pages Built**:
  - Home page with hero, services, testimonials
  - Services detail page
  - About page with team section
  - Contact page with Google Maps
  - Appointments booking form
  - Prescription refill form
  - FAQ with search
  - Blog system with Markdown support
- ✅ **Forms with Email** - Contact, appointments, refills (ready for SendGrid)
- ✅ **Google Analytics** - Tracking setup included
- ✅ **Calendly Integration** - Ready for booking widget
- ✅ **Dark Mode Ready** - Tailwind classes included
- ✅ **SEO Optimized** - Meta tags in place

## 🛠️ Customization Guide

### Change Business Information

**File:** Edit anywhere in components/pages:

```javascript
// Phone number (used in multiple places)
<a href="tel:+13016191234">301-619-1234</a>

// Address
8004 New Hampshire Ave, Takoma Park, MD 20912

// Email
info@langleyparkpharmacy.com

// Hours (in Footer & Contact pages)
Mon-Fri: 9:00 AM - 7:00 PM
```

### Update Colors & Branding

**File:** `tailwind.config.js`

```javascript
colors: {
  primary: '#2D5F7F',      // Main blue
  secondary: '#E74C3C',    // Red accent
  accent: '#3498DB',       // Light blue
  light: '#ECF0F1',        // Light gray
  dark: '#2C3E50',         // Dark gray
  success: '#27AE60',      // Green
  warning: '#F39C12',      // Orange
}
```

### Add Your Logo

1. Place image file in `public/images/`
2. Update Navbar.jsx:
```javascript
<Link to="/" className="text-2xl font-bold">
  <img src="/images/logo.png" alt="Logo" className="h-8" />
</Link>
```

### Change Fonts

**File:** `tailwind.config.js`

```javascript
fontFamily: {
  sans: ['Your Font Name', 'sans-serif'],
  serif: ['Your Serif Font', 'serif'],
}
```

### Update Team Members

**File:** `src/pages/About.jsx`

```javascript
const team = [
  { name: 'Your Name', role: 'Your Role', emoji: '👨‍⚕️' },
  // Add more...
]
```

## 📝 Managing Content

### Adding Blog Posts

1. Create new `.md` file in `src/blog/`
   Example: `src/blog/post-4.md`

2. Use Markdown format:
```markdown
# Your Post Title

**Published:** Date

## Section Heading

Your content here...
```

3. Add post metadata in `Blog.jsx`:
```javascript
const blogPosts = [
  {
    id: 'post-4',
    title: 'Your Title',
    date: 'April 15, 2024',
    excerpt: 'Brief description...',
    category: 'Category'
  },
  // ... other posts
]
```

### Adding Images

1. Place images in `public/images/`
2. Reference in components:
```javascript
<img src="/images/your-image.jpg" alt="Description" />
```

### Adding Services

Edit relevant pages:
- `Home.jsx` - Featured services
- `Services.jsx` - Detailed service listings
- Add icons using emoji or SVG

### Updating FAQ

**File:** `src/pages/FAQ.jsx`

```javascript
const faqs = [
  {
    question: 'Your Question?',
    answer: 'Your answer here.'
  },
  // Add more...
]
```

## 📧 Forms & Email Integration

### Contact Form
**File:** `src/components/ContactForm.jsx`

Currently logs to console. To enable emails:

1. Set up SendGrid account
2. Get API key: https://sendgrid.com
3. Add to `.env.local`:
```
VITE_SENDGRID_API_KEY=your_api_key
```

4. Uncomment/implement email logic in ContactForm.jsx

### Appointment Form
**File:** `src/components/AppointmentForm.jsx`

Same process as Contact Form. Customize service types in the dropdown.

### Refill Form
**File:** `src/components/RefillForm.jsx`

Ready for integration. Connect to pharmacy system for:
- Medication database lookup
- Insurance verification
- Prescription status checking

## 📊 Analytics Setup

**File:** `index.html`

1. Get Google Analytics ID: https://analytics.google.com
2. Replace `G-XXXXXXXXXX` in two places:
   - HTML meta tag
   - gtag config

Example:
```html
<script src="https://www.googletagmanager.com/gtag/js?id=G-ABC123"></script>
<script>
  gtag('config', 'G-ABC123');
</script>
```

3. Verify tracking in Google Analytics dashboard after deployment

## 🚀 Deployment

### Deploy on Vercel

1. **Connect GitHub**
   - Push code to GitHub: `dev1-osibo/langleyparkpharmacy`
   - Go to https://vercel.com
   - Import project from GitHub

2. **Set Environment Variables**
   - Go to Project Settings → Environment Variables
   - Add:
     ```
     VITE_GOOGLE_ANALYTICS_ID = G-your-id
     VITE_SENDGRID_API_KEY = SG-your-key
     VITE_CALENDLY_URL = https://calendly.com/...
     ```

3. **Configure Domain**
   - Go to Settings → Domains
   - Add `langleyparkpharmacy.com`
   - Update DNS records with Vercel's nameservers

4. **Deploy**
   - Every push to `main` branch auto-deploys
   - Production URL: https://langleyparkpharmacy.com

### Vercel Configuration
**File:** `vercel.json` (already configured)

No changes needed unless adding new environment variables.

## 🔒 Security & Best Practices

- ✅ Never commit `.env.local` (in .gitignore)
- ✅ Use environment variables for API keys
- ✅ All forms are client-side ready (backend integration needed for production)
- ✅ HTTPS enforced on Vercel
- ✅ Regular backups of content

## 📱 Mobile Optimization

Site is mobile-first responsive:
- Hamburger menu on mobile
- Touch-friendly buttons (48px minimum)
- Optimized images
- Fast load times (Vite)

Test responsiveness:
```bash
npm run dev
# Open DevTools → Toggle device toolbar (Ctrl+Shift+M)
```

## 🧪 Testing

Manual testing checklist:

- [ ] All pages load without errors
- [ ] Mobile menu opens/closes
- [ ] Forms submit (check console for data)
- [ ] Links work
- [ ] Images load
- [ ] Google Maps embed works
- [ ] Responsive layout at breakpoints (375px, 768px, 1024px)

## 🐛 Troubleshooting

### "npm install" fails
```bash
# Clear cache and retry
npm cache clean --force
npm install
```

### Dev server won't start
```bash
# Kill process on port 3000
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Then retry:
npm run dev
```

### Build fails
```bash
# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Styles not showing
- Clear browser cache (Ctrl+Shift+Delete)
- Restart dev server
- Check `tailwind.config.js` content paths

### Forms not submitting
- Check browser console for errors
- Verify form component event handlers
- Test with sample data first

## 📞 Support

For questions about:
- **Content Updates:** Edit markdown files, redeploy
- **New Features:** Add components in `src/components/`
- **Styling:** Update `tailwind.config.js` or `src/styles/globals.css`
- **Deployment:** Check Vercel dashboard

## 📄 License

Built for Langley Park Pharmacy. All rights reserved.

---

**Last Updated:** April 2024

For questions or updates, contact the development team.
