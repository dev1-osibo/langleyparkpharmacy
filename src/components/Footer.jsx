import { Link } from 'react-router-dom'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-dark text-light py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h4 className="text-xl font-bold mb-4 text-secondary">Langley Park Pharmacy</h4>
            <p className="text-gray-300 text-sm">
              Your trusted community pharmacy providing quality medications and expert care since our founding.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h5 className="font-bold mb-4 text-secondary">Quick Links</h5>
            <ul className="text-gray-300 text-sm space-y-2">
              <li><Link to="/" className="hover:text-secondary transition">Home</Link></li>
              <li><Link to="/services" className="hover:text-secondary transition">Services</Link></li>
              <li><Link to="/about" className="hover:text-secondary transition">About</Link></li>
              <li><Link to="/faq" className="hover:text-secondary transition">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h5 className="font-bold mb-4 text-secondary">Contact</h5>
            <ul className="text-gray-300 text-sm space-y-2">
              <li>📍 8004 New Hampshire Ave, Takoma Park, MD 20912</li>
              <li>📞 <a href="tel:+13016191234" className="hover:text-secondary">301-619-1234</a></li>
              <li>📧 <a href="mailto:info@langleyparkpharmacy.com" className="hover:text-secondary">info@langleyparkpharmacy.com</a></li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h5 className="font-bold mb-4 text-secondary">Hours</h5>
            <p className="text-gray-300 text-sm">
              We're open Monday-Friday 9 AM-7 PM, Saturday 10 AM-3 PM, and closed on Sunday and major holidays.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} Langley Park Pharmacy. All rights reserved.
            </p>
            <div className="flex gap-4 text-sm text-gray-400">
              <a href="#" className="hover:text-secondary transition">Privacy Policy</a>
              <a href="#" className="hover:text-secondary transition">Terms of Service</a>
              <a href="#" className="hover:text-secondary transition">HIPAA Notice</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
