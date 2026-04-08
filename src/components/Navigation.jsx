import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ShoppingCart, Pizza } from 'lucide-react'
import './Navigation.css'

function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/menu', label: 'Menu' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon pizza-bounce">🍕</span>
          <span className="logo-text">Pizza Heaven</span>
        </Link>

        <div className={`nav-links ${isOpen ? 'nav-active' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
              <span className="nav-link-underline"></span>
            </Link>
          ))}
        </div>

        <div className="nav-actions">
          <button className="cart-btn">
            <ShoppingCart size={22} />
            <span className="cart-count">3</span>
          </button>
          
          <button 
            className="hamburger" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navigation