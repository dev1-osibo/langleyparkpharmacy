import { useState } from 'react'

export default function RefillForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    medicationName: '',
    prescriptionNumber: '',
    refillsNeeded: '1',
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
      console.log('Refill request submitted:', formData)
      await new Promise(resolve => setTimeout(resolve, 500))
      
      setSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        medicationName: '',
        prescriptionNumber: '',
        refillsNeeded: '1',
        notes: '',
      })
      
      setTimeout(() => setSubmitted(false), 5000)
    } catch (err) {
      setError('Failed to submit refill request. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
      {submitted && (
        <div className="bg-success text-white p-4 rounded-lg">
          ✓ We've received your refill request! We'll update you within 2 hours.
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
        <label htmlFor="medicationName">Medication Name *</label>
        <input
          type="text"
          id="medicationName"
          name="medicationName"
          value={formData.medicationName}
          onChange={handleChange}
          required
          placeholder="e.g., Lisinopril, Metformin"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="prescriptionNumber">Prescription Number (optional)</label>
          <input
            type="text"
            id="prescriptionNumber"
            name="prescriptionNumber"
            value={formData.prescriptionNumber}
            onChange={handleChange}
            placeholder="RX123456789"
          />
        </div>
        <div>
          <label htmlFor="refillsNeeded">Refills Needed *</label>
          <select
            id="refillsNeeded"
            name="refillsNeeded"
            value={formData.refillsNeeded}
            onChange={handleChange}
            required
          >
            <option value="1">1 Refill</option>
            <option value="2">2 Refills</option>
            <option value="3">3 Refills</option>
            <option value="4">4+ Refills</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="notes">Additional Notes</label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows="3"
          placeholder="Any special instructions?"
        ></textarea>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full"
      >
        {loading ? 'Submitting...' : 'Request Refill'}
      </button>

      <p className="text-sm text-gray-600 text-center">
        Or call us: <a href="tel:+13016191234" className="font-bold text-secondary">301-619-1234</a>
      </p>
    </form>
  )
}
