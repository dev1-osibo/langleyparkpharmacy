import { useState } from 'react'
import FAQAccordion from '../components/FAQAccordion'
import { Link } from 'react-router-dom'

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('')

  const faqs = [
    {
      question: 'What are your hours of operation?',
      answer: 'We\'re open Monday-Friday 9 AM-7 PM, Saturday 10 AM-3 PM, and closed on Sunday and major holidays.'
    },
    {
      question: 'Do you accept insurance?',
      answer: 'Yes, we accept most major insurance plans. If you have questions about coverage, please call us at 301-619-1234.'
    },
    {
      question: 'How quickly can I get a refill?',
      answer: 'Most refills are ready within 2 hours. Call ahead or request online to save time.'
    },
    {
      question: 'Do you offer home delivery?',
      answer: 'Yes! We offer home delivery for prescription refills. A delivery fee applies. Call us for details.'
    },
    {
      question: 'Can I request an appointment online?',
      answer: 'Yes, visit our Appointments page to book consultations, vaccines, and other services.'
    },
    {
      question: 'Do you dispense controlled substances?',
      answer: 'We dispense a wide range of medications including controlled substances prescribed by licensed physicians. Proper ID and verification are required.'
    },
    {
      question: 'Can I transfer my prescription from another pharmacy?',
      answer: 'Absolutely! Call us with your prescription details, and we\'ll handle the transfer from your previous pharmacy.'
    },
    {
      question: 'What if I have a question about my medication?',
      answer: 'Our pharmacists offer free consultations. Call 301-619-1234 or visit us in person to speak with an expert.'
    },
    {
      question: 'Do you offer vaccines?',
      answer: 'Yes, we offer flu shots, COVID-19 vaccines, shingles vaccine, and other immunizations. Walk-ins welcome, or book an appointment.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept cash, credit cards, debit cards, and most insurance plans. Contact us if you have questions about payment options.'
    },
    {
      question: 'Are my records kept confidential?',
      answer: 'Absolutely. We follow HIPAA regulations and maintain strict confidentiality of all patient records.'
    },
    {
      question: 'Do you sell over-the-counter products?',
      answer: 'Yes, we carry a wide selection of vitamins, supplements, pain relievers, cold & allergy medications, and other OTC products.'
    },
    {
      question: 'Can I pick up someone else\'s prescription?',
      answer: 'For privacy reasons, only the person named on the prescription can pick it up, unless they provide written authorization.'
    },
    {
      question: 'What should I do if I\'m having side effects from my medication?',
      answer: 'Contact us immediately at 301-619-1234. Our pharmacists can advise you and may suggest speaking with your doctor.'
    },
    {
      question: 'Do you offer medication therapy management?',
      answer: 'Yes, our pharmacists provide comprehensive medication reviews and personalized therapy management. Call to book a consultation.'
    },
  ]

  return (
    <div>
      {/* Hero */}
      <section className="bg-primary text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-white text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-100">
            Find answers to common questions about our pharmacy.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4">
          {/* Search Bar */}
          <div className="mb-10">
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-3 border-2 border-primary rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary"
            />
            {searchTerm && (
              <p className="text-sm text-gray-600 mt-2">
                Found {faqs.filter(faq => 
                  faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
                ).length} results
              </p>
            )}
          </div>

          {/* FAQ Accordion */}
          <FAQAccordion faqs={faqs} searchTerm={searchTerm} />
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 md:py-24 bg-light">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-primary text-3xl font-bold mb-6">Still Have Questions?</h2>
          <p className="text-gray-700 text-lg mb-8">
            If you can't find the answer you're looking for, please reach out to us. Our team is always happy to help!
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary">
              Contact Us
            </Link>
            <a href="tel:+13016191234" className="btn-secondary">
              Call: 301-619-1234
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
