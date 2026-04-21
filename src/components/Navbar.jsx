import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <nav className="bg-primary text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-light hover:text-secondary transition">
            💊 Langley Park Pharmacy
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            <Link to="/" className="hover:text-secondary transition">Home</Link>
            <Link to="/services" className="hover:text-secondary transition">Services</Link>
            <Link to="/about" className="hover:text-secondary transition">About</Link>
            <Link to="/faq" className="hover:text-secondary transition">FAQ</Link>
            <Link to="/blog" className="hover:text-secondary transition">Blog</Link>
            <Link to="/contact" className="hover:text-secondary transition">Contact</Link>
          </div>

          {/* CTA Button (Desktop) */}
          <a href="tel:+13016191234" className="hidden md:block btn-secondary">
            Call Now
          </a>

          {/* Hamburger Menu */}
          <button
            className="md:hidden flex flex-col gap-1 cursor-pointer"
            onClick={toggleMenu}
          >
            <span className={`w-6 h-0.5 bg-white transition ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition ${isOpen ? 'opacity-0' : ''}`}></span>
            <span className={`w-6 h-0.5 bg-white transition ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-3 pb-4">
            <Link to="/" className="hover:text-secondary transition" onClick={() => setIsOpen(false)}>Home</Link>
            <Link to="/services" className="hover:text-secondary transition" onClick={() => setIsOpen(false)}>Services</Link>
            <Link to="/about" className="hover:text-secondary transition" onClick={() => setIsOpen(false)}>About</Link>
            <Link to="/faq" className="hover:text-secondary transition" onClick={() => setIsOpen(false)}>FAQ</Link>
            <Link to="/blog" className="hover:text-secondary transition" onClick={() => setIsOpen(false)}>Blog</Link>
            <Link to="/contact" className="hover:text-secondary transition" onClick={() => setIsOpen(false)}>Contact</Link>
            <a href="tel:+13016191234" className="btn-secondary text-center">Call Now</a>
          </div>
        )}
      </div>
    </nav>
  )
}
