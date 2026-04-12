import ContactForm from '../components/ContactForm'

export default function Contact() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-white text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-100">
            We're here to help. Reach out anytime.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-primary text-3xl font-bold mb-8">Send Us a Message</h2>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-primary mb-4">📍 Address</h3>
                <p className="text-gray-700 text-lg mb-4">
                  8004 New Hampshire Ave<br />
                  Takoma Park, MD 20912
                </p>
                <a
                  href="https://maps.google.com/?q=8004+New+Hampshire+Ave+Takoma+Park+MD+20912"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-sm"
                >
                  Get Directions
                </a>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-primary mb-4">📞 Phone</h3>
                <a href="tel:+13016191234" className="text-xl text-secondary font-bold hover:text-primary">
                  (301) 619-1234
                </a>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-primary mb-4">⏰ Hours</h3>
                <p className="text-gray-700">
                  We're open Monday-Friday 9 AM-7 PM, Saturday 10 AM-3 PM, and closed on Sunday and major holidays.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-primary mb-4">📧 Email</h3>
                <a href="mailto:info@langleyparkpharmacy.com" className="text-lg text-secondary font-bold hover:text-primary">
                  info@langleyparkpharmacy.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps Embed */}
      <section className="py-16 md:py-24 bg-light">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-primary text-3xl font-bold mb-8">Location</h2>
          <div className="rounded-xl overflow-hidden shadow-xl h-96">
            <iframe
              width="100%"
              height="100%"
              frameBorder="0"
              title="Langley Park Pharmacy Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3102.2247262635633!2d-77.01706!3d38.977226!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89b7d84c2e3a0001%3A0x5c5b5b5b5b5b5b5b!2s8004%20New%20Hampshire%20Ave%2C%20Takoma%20Park%2C%20MD%2020912!5e0!3m2!1sen!2sus!4v1234567890"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Quick CTA */}
      <section className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Need an appointment? Call or visit online.</h2>
          <a href="tel:+13016191234" className="btn-secondary">
            Call Now: 301-619-1234
          </a>
        </div>
      </section>
    </div>
  )
}
