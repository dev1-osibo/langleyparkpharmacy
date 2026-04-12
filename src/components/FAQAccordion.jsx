import { useState } from 'react'

export default function FAQAccordion({ faqs, searchTerm }) {
  const [openIndex, setOpenIndex] = useState(null)

  const filtered = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="space-y-4">
      {filtered.length === 0 ? (
        <p className="text-center text-gray-600 py-8">
          No FAQs match your search. <a href="/contact" className="text-secondary font-bold">Contact us</a> for help.
        </p>
      ) : (
        filtered.map((faq, index) => (
          <div key={index} className="border border-gray-300 rounded-lg">
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full px-6 py-4 text-left font-semibold text-primary hover:bg-light transition flex justify-between items-center"
            >
              <span>{faq.question}</span>
              <span className={`text-2xl transition ${openIndex === index ? 'rotate-180' : ''}`}>
                ▼
              </span>
            </button>
            {openIndex === index && (
              <div className="px-6 py-4 bg-light text-gray-700 border-t border-gray-300">
                {faq.answer}
              </div>
            )}
          </div>
        ))
      )}
    </div>
  )
}
