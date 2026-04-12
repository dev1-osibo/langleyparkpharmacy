import AppointmentForm from '../components/AppointmentForm'

export default function Appointments() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-white text-5xl font-bold mb-4">Schedule Your Appointment</h1>
          <p className="text-xl text-gray-100">
            Book a consultation, vaccination, or medication review with our expert team.
          </p>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <h2 className="text-primary text-3xl font-bold mb-8">Book Your Appointment</h2>
              <AppointmentForm />
            </div>

            {/* Side Info */}
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-xl font-bold text-primary mb-4">Why Book Online?</h3>
                <ul className="space-y-3 text-gray-700">
                  <li>✓ Fast & easy booking</li>
                  <li>✓ Confirm within 24 hours</li>
                  <li>✓ Avoid waiting in line</li>
                  <li>✓ Schedule at your convenience</li>
                </ul>
              </div>

              <div className="card">
                <h3 className="text-xl font-bold text-primary mb-4">Same-Day Options?</h3>
                <p className="text-gray-700 mb-4">
                  Need a same-day appointment? Call us directly at:
                </p>
                <a href="tel:+13016191234" className="text-2xl font-bold text-secondary hover:text-primary">
                  301-619-1234
                </a>
              </div>

              <div className="card">
                <h3 className="text-xl font-bold text-primary mb-4">⏰ Our Hours</h3>
                <p className="text-gray-700 text-sm">
                  We're open Monday-Friday 9 AM-7 PM, Saturday 10 AM-3 PM, and closed on Sunday and major holidays.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Available */}
      <section className="py-16 md:py-24 bg-light">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-primary text-4xl font-bold mb-12">Services We Can Schedule</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { emoji: '👨‍⚕️', title: 'Consultation', desc: 'Talk with a pharmacist about your medications' },
              { emoji: '💊', title: 'Refill Setup', desc: 'Organize your prescription refills' },
              { emoji: '💉', title: 'Flu Shot', desc: 'Annual flu vaccination' },
              { emoji: '🦠', title: 'COVID Vaccine', desc: 'COVID-19 vaccination & boosters' },
              { emoji: '📋', title: 'Med Review', desc: 'Complete medication management review' },
              { emoji: '🏥', title: 'Health Screening', desc: 'Blood pressure, glucose, & more' },
            ].map((service, index) => (
              <div key={index} className="card text-center">
                <div className="text-5xl mb-4">{service.emoji}</div>
                <h3 className="text-xl font-bold text-primary mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-center text-primary text-4xl font-bold mb-12">Common Questions</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Do I need insurance?',
                a: 'While we accept most insurance plans, we also offer affordable cash prices. Just let us know!'
              },
              {
                q: 'Can I walk in without an appointment?',
                a: 'Yes! Walk-ins are always welcome, though appointments help us minimize wait times.'
              },
              {
                q: 'How long does an appointment usually take?',
                a: 'Most appointments are 15-30 minutes depending on the service. Complex consultations may take longer.'
              },
              {
                q: 'What if I need to reschedule?',
                a: 'Call us at 301-619-1234 at least 24 hours in advance if possible.'
              },
            ].map((item, index) => (
              <div key={index} className="border border-gray-300 rounded-lg">
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer p-4 font-semibold text-primary hover:bg-light">
                    {item.q}
                    <span className="group-open:rotate-180 transition">▼</span>
                  </summary>
                  <div className="px-4 pb-4 text-gray-700 bg-light">
                    {item.a}
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
