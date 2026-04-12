# Langley Park Pharmacy - API Functions Template

These are the Vercel serverless functions (running in `api/` directory) that handle form submissions and send emails.

---

## Setup

Create a directory structure:
```
project-root/
├── api/
│   ├── contact.js
│   ├── appointment.js
│   ├── refill.js
│   └── config.js (optional)
├── components/
│   ├── ContactForm.jsx
│   ├── AppointmentForm.jsx
│   └── RefillForm.jsx
└── ...
```

Install dependencies:
```bash
npm install @sendgrid/mail
```

---

## Function 1: Contact Form (`api/contact.js`)

```javascript
const sgMail = require('@sendgrid/mail');

// Initialize SendGrid with API key from environment
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req, res) => {
  // Only accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate phone format (10 digits)
    const phoneRegex = /^\d{10}$/;
    const cleanPhone = phone.replace(/\D/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      return res.status(400).json({ error: 'Invalid phone format' });
    }

    // 1. Send confirmation email to customer
    await sgMail.send({
      to: email,
      from: 'contact@langleyparkpharmacy.com',
      templateId: 'd-contact-confirmation-id', // Replace with actual template ID from SendGrid
      dynamicTemplateData: {
        name,
        email,
        phone,
        message
      }
    });

    // 2. Send alert email to pharmacy staff
    await sgMail.send({
      to: process.env.PHARMACY_EMAIL || 'pharmacy-alerts@langleyparkpharmacy.com',
      from: 'contact@langleyparkpharmacy.com',
      templateId: 'd-contact-alert-id', // Replace with actual template ID from SendGrid
      dynamicTemplateData: {
        name,
        email,
        phone,
        message,
        timestamp: new Date().toISOString()
      }
    });

    // 3. Send success response
    res.status(200).json({
      success: true,
      message: 'Thank you for contacting us! We will get back to you within 24 hours.'
    });

  } catch (error) {
    console.error('Contact form error:', error);
    
    // SendGrid specific error handling
    if (error.response) {
      return res.status(error.response.status).json({
        error: 'Failed to send email. Please try again later.',
        details: error.response.body
      });
    }

    res.status(500).json({
      error: 'An error occurred. Please try again later.'
    });
  }
};
```

---

## Function 2: Appointment Form (`api/appointment.js`)

```javascript
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, service, preferredDate, notes } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !service || !preferredDate) {
      return res.status(400).json({ error: 'All required fields must be completed' });
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate phone
    const phoneRegex = /^\d{10}$/;
    const cleanPhone = phone.replace(/\D/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      return res.status(400).json({ error: 'Invalid phone format' });
    }

    // 1. Send confirmation to customer
    await sgMail.send({
      to: email,
      from: 'contact@langleyparkpharmacy.com',
      templateId: 'd-appointment-confirmation-id', // Replace with actual ID
      dynamicTemplateData: {
        name,
        email,
        phone,
        service,
        preferredDate,
        notes: notes || 'None'
      }
    });

    // 2. Send alert to pharmacy
    await sgMail.send({
      to: process.env.PHARMACY_EMAIL || 'pharmacy-alerts@langleyparkpharmacy.com',
      from: 'contact@langleyparkpharmacy.com',
      templateId: 'd-appointment-alert-id', // Replace with actual ID
      dynamicTemplateData: {
        name,
        email,
        phone,
        service,
        preferredDate,
        notes: notes || 'None',
        timestamp: new Date().toISOString(),
        dashboardLink: 'https://langleyparkpharmacy.com/admin/appointments' // Optional
      }
    });

    // 3. Track in Google Analytics (if needed, log event to GA)
    // This can be done on frontend after form submission succeeds

    res.status(200).json({
      success: true,
      message: 'Appointment request submitted! We will confirm within 24 hours.'
    });

  } catch (error) {
    console.error('Appointment form error:', error);

    if (error.response) {
      return res.status(error.response.status).json({
        error: 'Failed to submit appointment request. Please try again.',
        details: error.response.body
      });
    }

    res.status(500).json({
      error: 'An error occurred. Please try again later.'
    });
  }
};
```

---

## Function 3: Refill Form (`api/refill.js`)

```javascript
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, phone, medication, prescriptionNumber, refillsNeeded, notes } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !medication || !prescriptionNumber || !refillsNeeded) {
      return res.status(400).json({ error: 'All required fields must be completed' });
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Validate phone
    const phoneRegex = /^\d{10}$/;
    const cleanPhone = phone.replace(/\D/g, '');
    if (!phoneRegex.test(cleanPhone)) {
      return res.status(400).json({ error: 'Invalid phone format' });
    }

    // 1. Send confirmation to customer
    await sgMail.send({
      to: email,
      from: 'contact@langleyparkpharmacy.com',
      templateId: 'd-refill-confirmation-id', // Replace with actual ID
      dynamicTemplateData: {
        name,
        email,
        phone,
        medication,
        prescriptionNumber,
        refillsNeeded,
        notes: notes || 'None'
      }
    });

    // 2. Send alert to pharmacy
    await sgMail.send({
      to: process.env.PHARMACY_EMAIL || 'pharmacy-alerts@langleyparkpharmacy.com',
      from: 'contact@langleyparkpharmacy.com',
      templateId: 'd-refill-alert-id', // Replace with actual ID
      dynamicTemplateData: {
        name,
        email,
        phone,
        medication,
        prescriptionNumber,
        refillsNeeded,
        notes: notes || 'None',
        timestamp: new Date().toISOString()
      }
    });

    res.status(200).json({
      success: true,
      message: 'Refill request submitted! Your medication will be ready in approximately 2 hours.'
    });

  } catch (error) {
    console.error('Refill form error:', error);

    if (error.response) {
      return res.status(error.response.status).json({
        error: 'Failed to submit refill request. Please try again.',
        details: error.response.body
      });
    }

    res.status(500).json({
      error: 'An error occurred. Please try again later.'
    });
  }
};
```

---

## Frontend Form Examples

### Contact Form (`components/ContactForm.jsx`)

```javascript
import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Form submission failed');
      }

      const data = await response.json();
      
      // Success
      setStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
      
      // Track in Google Analytics
      if (window.gtag) {
        gtag('event', 'form_submission', {
          form_type: 'contact'
        });
      }

      // Show success message for 5 seconds
      setTimeout(() => setStatus('idle'), 5000);

    } catch (error) {
      setStatus('error');
      setErrorMessage(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div>
        <label htmlFor="name">Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="phone">Phone *</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="(301) 844-5280"
          required
        />
      </div>

      <div>
        <label htmlFor="message">Message *</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows="5"
          required
        ></textarea>
      </div>

      <button type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Sending...' : 'Send Message'}
      </button>

      {status === 'success' && (
        <div className="success-message">
          ✓ Thank you! We'll get back to you within 24 hours.
        </div>
      )}

      {status === 'error' && (
        <div className="error-message">
          ✗ {errorMessage}. Please try again or call us at (301) 844-5280.
        </div>
      )}
    </form>
  );
}
```

---

## Environment Variables Setup

### In Vercel Dashboard

Go to `Project Settings → Environment Variables` and add:

```
SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
PHARMACY_EMAIL=pharmacy-alerts@langleyparkpharmacy.com
```

### In `.env.local` (local development, DO NOT COMMIT)

```
VITE_SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
VITE_PHARMACY_EMAIL=pharmacy-alerts@langleyparkpharmacy.com
```

---

## Testing the API Functions

### Test Contact Form

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "3018445280",
    "message": "Hello, I have a question..."
  }'
```

### Expected Response (Success)

```json
{
  "success": true,
  "message": "Thank you for contacting us! We will get back to you within 24 hours."
}
```

### Expected Response (Error)

```json
{
  "error": "Invalid email format"
}
```

---

## SendGrid Template IDs

Replace the template IDs in the code with actual IDs from SendGrid:

1. Go to https://app.sendgrid.com/dynamic_templates
2. Open each template
3. Copy the Template ID (format: `d-xxxxxxxxxxxxxxxx`)
4. Paste into corresponding function

**Example:**
- Template: "contact-confirmation" → ID: `d-a1b2c3d4e5f6g7h8i9j0k1l2`
- Paste in `api/contact.js`: `templateId: 'd-a1b2c3d4e5f6g7h8i9j0k1l2'`

---

## Error Handling Best Practices

All functions include:
- ✅ Input validation
- ✅ Email format validation
- ✅ Phone format validation
- ✅ SendGrid error catching
- ✅ User-friendly error messages
- ✅ Console error logging
- ✅ Proper HTTP status codes

---

## Next Steps

1. Create the `api/` folder with these three files
2. Get SendGrid template IDs and update the code
3. Set environment variables in Vercel
4. Create React form components
5. Deploy and test with real form submissions

---

**Questions?** See INTEGRATION_GUIDE.md or TROUBLESHOOTING.md
