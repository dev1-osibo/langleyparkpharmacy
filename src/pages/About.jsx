import { Link } from 'react-router-dom'

export default function About() {
  const team = [
    { name: 'Robert Johnson', role: 'Owner & Lead Pharmacist', emoji: '👨‍⚕️' },
    { name: 'Maria Johnson', role: 'Operations Manager', emoji: '👩‍💼' },
    { name: 'David Smith', role: 'Pharmacist', emoji: '👨‍⚕️' },
    { name: 'Lisa Chen', role: 'Pharmacy Technician', emoji: '👩‍⚕️' },
  ]

  const values = [
    { title: 'Community Care', description: 'We treat every customer like family, with personalized attention.' },
    { title: 'Quality First', description: 'We only stock authentic, quality medications and products.' },
    { title: 'Expert Knowledge', description: 'Our team stays current with the latest pharmacy practices.' },
    { title: 'Accessibility', description: 'Convenient hours, delivery options, and affordable pricing.' },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-white text-5xl font-bold mb-4">About Us</h1>
          <p className="text-xl text-gray-100">
            A family-run pharmacy dedicated to serving Takoma Park with compassion and expertise.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-primary text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-gray-700 text-lg mb-4">
                To provide our community with compassionate, expert pharmaceutical care that improves health outcomes and enhances quality of life.
              </p>
              <p className="text-gray-700 text-lg mb-4">
                We believe every customer deserves personalized attention and professional guidance. Our team is committed to building lasting relationships with the families we serve.
              </p>
            </div>
            <div className="bg-gradient-to-br from-accent to-secondary rounded-xl h-80 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-6xl mb-4">🎯</div>
                <p className="text-xl font-semibold">Community Health First</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-16 md:py-24 bg-light">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-primary text-4xl font-bold mb-12">Our Story</h2>
          <div className="max-w-3xl mx-auto space-y-6 text-gray-700 text-lg">
            <p>
              Founded by Robert Johnson, a licensed pharmacist with 25+ years of experience, Langley Park Pharmacy began as a small neighborhood drugstore with a simple mission: provide honest, caring pharmaceutical service to the Takoma Park community.
            </p>
            <p>
              What started as a one-man operation has grown into a trusted institution serving thousands of families. We've expanded our services, team, and hours—but never our commitment to personalized care.
            </p>
            <p>
              Today, our family-run pharmacy combines modern technology with old-fashioned customer service. We know our customers by name, remember their health histories, and genuinely care about their wellbeing.
            </p>
            <p>
              We're proud to be part of this community and look forward to serving you and your family for years to come.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-primary text-4xl font-bold mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div key={index} className="card">
                <h3 className="text-2xl font-bold text-secondary mb-3">{value.title}</h3>
                <p className="text-gray-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16 md:py-24 bg-light">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-primary text-4xl font-bold mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="card text-center">
                <div className="text-6xl mb-4">{member.emoji}</div>
                <h3 className="text-xl font-bold text-primary mb-2">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Let's Connect</h2>
          <p className="text-xl mb-8">Have questions? We'd love to hear from you.</p>
          <Link to="/contact" className="btn-primary text-lg">
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  )
}
