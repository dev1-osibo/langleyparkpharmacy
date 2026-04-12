import RefillForm from '../components/RefillForm'
import { Link } from 'react-router-dom'

export default function Refills() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-white text-5xl font-bold mb-4">Request a Refill</h1>
          <p className="text-xl text-gray-100">
            Easy, fast prescription refill service online or by phone.
          </p>
        </div>
      </section>

      {/* Main Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <h2 className="text-primary text-3xl font-bold mb-8">Submit Refill Request</h2>
              <RefillForm />
            </div>

            {/* Side Panel */}
            <div className="space-y-6">
              <div className="card">
                <h3 className="text-xl font-bold text-primary mb-4">Quick Tips</h3>
                <ul className="space-y-3 text-gray-700 text-sm">
                  <li>✓ Have your Rx number handy</li>
                  <li>✓ Know the medication name</li>
                  <li>✓ Tell us how many refills</li>
                  <li>✓ We'll confirm within 2 hours</li>
                </ul>
              </div>

              <div className="card bg-light">
                <h3 className="text-xl font-bold text-secondary mb-4">Alternative Methods</h3>
                <div className="space-y-3 text-gray-700 text-sm">
                  <div>
                    <strong>📞 Call:</strong><br />
                    <a href="tel:+13016191234" className="text-secondary hover:text-primary font-bold">
                      301-619-1234
                    </a>
                  </div>
                  <div>
                    <strong>📧 Email:</strong><br />
                    <a href="mailto:refills@langleyparkpharmacy.com" className="text-secondary hover:text-primary font-bold">
                      refills@langleyparkpharmacy.com
                    </a>
                  </div>
                  <div>
                    <strong>🏪 In Person:</strong><br />
                    Visit us at 8004 New Hampshire Ave
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="text-xl font-bold text-primary mb-4">📦 Delivery Options</h3>
                <ul className="space-y-2 text-gray-700 text-sm">
                  <li>✓ Pick up same day</li>
                  <li>✓ Home delivery (fee applies)</li>
                  <li>✓ Mail delivery available</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 md:py-24 bg-light">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-primary text-4xl font-bold mb-12">Why Choose Our Refill Service?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { emoji: '⚡', title: 'Fast Processing', desc: '2-hour turnaround guarantee' },
              { emoji: '🏠', title: 'Home Delivery', desc: 'Convenient delivery options' },
              { emoji: '💰', title: 'Affordable', desc: 'Competitive pricing & insurance accepted' },
              { emoji: '🔒', title: 'Secure', desc: 'HIPAA-compliant & confidential' },
            ].map((item, index) => (
              <div key={index} className="card text-center">
                <div className="text-5xl mb-4">{item.emoji}</div>
                <h3 className="font-bold text-primary mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-center text-primary text-4xl font-bold mb-12">How It Works</h2>
          <div className="space-y-6">
            {[
              { step: '1', title: 'Submit Request', desc: 'Fill out the form or call us with your medication details.' },
              { step: '2', title: 'We Verify', desc: 'We check with your doctor and insurance for authorization.' },
              { step: '3', title: 'We Prepare', desc: 'Our pharmacists prepare your prescription.' },
              { step: '4', title: 'Get Notified', desc: 'We call/text when ready for pickup or delivery.' },
            ].map((item, index) => (
              <div key={index} className="flex gap-6 items-start">
                <div className="bg-secondary text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
                  <p className="text-gray-700">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Refill?</h2>
          <p className="text-xl mb-8">Start above or reach out directly.</p>
          <a href="tel:+13016191234" className="btn-primary text-lg">
            Call: 301-619-1234
          </a>
        </div>
      </section>
    </div>
  )
}
