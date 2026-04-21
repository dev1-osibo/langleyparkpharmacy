import { Link } from 'react-router-dom'
import ServiceCard from '../components/ServiceCard'
import TestimonialCard from '../components/TestimonialCard'

export default function Home() {
  const services = [
    {
      icon: '💊',
      title: 'Prescription Refills',
      description: 'Easy, fast prescription refills. Call us to place an order.',
      link: '/services'
    },
    {
      icon: '🛍️',
      title: 'Over-the-Counter Meds',
      description: 'Wide selection of OTC medications and health products.',
      link: '/services'
    },
    {
      icon: '👨‍⚕️',
      title: 'Consultations',
      description: 'Expert advice from our licensed pharmacists.',
      link: '/services'
    },
    {
      icon: '💉',
      title: 'Vaccines & Shots',
      description: 'Flu shots, COVID-19 vaccines, and more.',
      link: '/services'
    },
  ]

  const testimonials = [
    {
      quote: 'Great customer service and knowledgeable staff. I trust them with my prescriptions.',
      author: 'Sarah M.',
      role: 'Patient'
    },
    {
      quote: 'Been coming here for years. They always go the extra mile to help.',
      author: 'James T.',
      role: 'Long-time Customer'
    },
    {
      quote: 'Professional, friendly, and they actually care about their patients.',
      author: 'Maria L.',
      role: 'Patient'
    },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-secondary text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-white text-5xl md:text-6xl font-bold mb-4">
            Your Trusted Community Pharmacy
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            Serving Takoma Park with quality medications and expert care since our founding.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <a href="tel:+13016191234" className="btn-secondary text-lg">
              Call Us Now
            </a>
            <Link to="/services" className="btn-outline text-white border-white hover:bg-white hover:text-primary text-lg">
              Learn About Services
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16 md:py-24 bg-light">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-primary text-4xl font-bold mb-12">
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* About Snippet */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-primary text-4xl font-bold mb-6">About Langley Park Pharmacy</h2>
              <p className="text-gray-700 mb-4">
                Family-run pharmacy located in the heart of Takoma Park, serving our community for many years.
              </p>
              <p className="text-gray-700 mb-6">
                We're committed to providing personalized care, quality medications, and expert advice. Our knowledgeable pharmacists are always ready to help you with your health needs.
              </p>
              <Link to="/about" className="btn-primary">
                Learn More About Us
              </Link>
            </div>
            <div className="bg-gradient-to-br from-accent to-secondary rounded-xl h-80 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="text-6xl mb-4">🏥</div>
                <p className="text-xl font-semibold">Community Focused Healthcare</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-light">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-center text-primary text-4xl font-bold mb-12">
            What Our Patients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8">Schedule your appointment or contact us today.</p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/appointments" className="btn-secondary text-lg">
              Book Now
            </Link>
            <Link to="/contact" className="btn-outline border-white text-white hover:bg-white hover:text-primary text-lg">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
