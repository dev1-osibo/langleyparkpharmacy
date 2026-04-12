import { Link } from 'react-router-dom'
import ServiceCard from '../components/ServiceCard'

export default function Services() {
  const services = [
    {
      icon: '💊',
      title: 'Prescription Refills',
      description: 'Easy refills with multiple delivery options including home delivery.',
      link: '/refills'
    },
    {
      icon: '🛍️',
      title: 'Over-the-Counter Medications',
      description: 'Complete selection of OTC meds, vitamins, and health supplements.',
      link: '#otc'
    },
    {
      icon: '👨‍⚕️',
      title: 'Pharmacist Consultations',
      description: 'Free consultations with our expert pharmacists on medication use.',
      link: '/appointments'
    },
    {
      icon: '💉',
      title: 'Vaccines & Immunizations',
      description: 'Flu shots, COVID-19 vaccines, shingles, and more.',
      link: '/appointments'
    },
  ]

  const details = [
    {
      title: 'Prescription Refills',
      description: 'Managing your medications has never been easier.',
      features: [
        'Online refill requests',
        'Mail/home delivery options',
        'Insurance verification',
        'Automatic refill programs',
        '24-hour turnaround'
      ]
    },
    {
      title: 'Over-the-Counter Products',
      description: 'We carry a wide range of OTC products to meet your health needs.',
      features: [
        'Pain relievers & fever reducers',
        'Cold & allergy medications',
        'Vitamins & supplements',
        'First aid supplies',
        'Health & wellness products'
      ]
    },
    {
      title: 'Professional Consultations',
      description: 'Our experienced pharmacists provide personalized advice.',
      features: [
        'Medication interaction reviews',
        'Side effect management',
        'Health screening',
        'Dosage guidance',
        'Wellness coaching'
      ]
    },
    {
      title: 'Vaccines & Immunizations',
      description: 'Protect yourself and your loved ones with our vaccine services.',
      features: [
        'Flu shots (seasonal)',
        'COVID-19 vaccines',
        'Shingles vaccine (Shingrix)',
        'Pneumonia vaccines',
        'Walk-ins welcome'
      ]
    },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-white text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-gray-100">
            Comprehensive pharmacy services tailored to your health needs.
          </p>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Service Descriptions */}
      <section className="py-16 md:py-24 bg-light">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-primary text-4xl font-bold mb-16">Service Details</h2>
          
          {details.map((service, index) => (
            <div key={index} className="mb-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
                <div>
                  <h3 className="text-3xl font-bold text-primary mb-4">{service.title}</h3>
                  <p className="text-gray-700 text-lg mb-6">{service.description}</p>
                  <h4 className="font-bold text-primary mb-4">Key Features:</h4>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-secondary font-bold text-lg">✓</span>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-gradient-to-br from-accent to-secondary rounded-xl h-80 flex items-center justify-center p-6">
                  <div className="text-white text-center">
                    <div className="text-6xl mb-4">
                      {index === 0 ? '💊' : index === 1 ? '🛍️' : index === 2 ? '👨‍⚕️' : '💉'}
                    </div>
                    <p className="text-lg font-semibold">{service.title}</p>
                  </div>
                </div>
              </div>
              {index < details.length - 1 && <hr className="my-12 border-gray-300" />}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Need Our Services?</h2>
          <p className="text-xl mb-8">Schedule an appointment or visit us today.</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/appointments" className="btn-primary text-lg">
              Book Appointment
            </Link>
            <a href="tel:+13016191234" className="btn-outline border-white text-white hover:bg-white hover:text-secondary text-lg inline-block">
              Call Us: 301-619-1234
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
