import { useState } from 'react'

export default function AppointmentForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: 'consultation',
    preferredDate: '',
    preferredTime: '',
    notes: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      console.log('Appointment submitted:', formData)
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setSubmitted(true)
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: 'consultation',
        preferredDate: '',
        preferredTime: '',
        notes: '',
      })
      
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      setError('Failed to book appointment. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
      {submitted && (
        <div className="bg-success text-white p-4 rounded-lg">
          ✓ Your appointment request has been received! We'll confirm within 24 hours.
        </div>
      )}

      {error && (
        <div className="bg-secondary text-white p-4 rounded-lg">
          ✗ {error}
        </div>
      )}

      <div>
        <label htmlFor="name">Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Your full name"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="your@email.com"
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
            required
            placeholder="(301) 555-1234"
          />
        </div>
      </div>

      <div>
        <label htmlFor="service">Service Type *</label>
        <select
          id="service"
          name="service"
          value={formData.service}
          onChange={handleChange}
          required
        >
          <option value="consultation">Consultation</option>
          <option value="refill">Prescription Refill</option>
          <option value="flu-shot">Flu Shot</option>
          <option value="covid-vaccine">COVID-19 Vaccine</option>
          <option value="medication-check">Medication Review</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="preferredDate">Preferred Date *</label>
          <input
            type="date"
            id="preferredDate"
            name="preferredDate"
            value={formData.preferredDate}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="preferredTime">Preferred Time *</label>
          <input
            type="time"
            id="preferredTime"
            name="preferredTime"
            value={formData.preferredTime}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="notes">Additional Notes</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows="4"
          placeholder="Any special requests or information?"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full"
      >
        {loading ? 'Booking...' : 'Book Appointment'}
      </button>

      <p className="text-sm text-gray-600 text-center">
        Or call us directly: <a href="tel:+13016191234" className="font-bold text-secondary">301-619-1234</a>
      </p>
    </form>
  )
}
