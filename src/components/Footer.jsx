import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react'
import './Footer.css'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-wave-top">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
      
      <div className="footer-content">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="logo-icon pizza-wiggle">🍕</span>
                <span className="logo-text">Pizza Heaven</span>
              </div>
              <p className="footer-desc">
                Serving funky, fresh pizzas with a whole lot of love since 2011. 
                Your taste buds will thank you!
              </p>
              <div className="footer-social">
                <a href="#" className="social-link" aria-label="Instagram">
                  <Instagram size={20} />
                </a>
                <a href="#" className="social-link" aria-label="Facebook">
                  <Facebook size={20} />
                </a>
                <a href="#" className="social-link" aria-label="Twitter">
                  <Twitter size={20} />
                </a>
              </div>
            </div>
            
            <div className="footer-links">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="/">Home</a></li>
                <li><a href="/menu">Menu</a></li>
                <li><a href="/cart">Cart</a></li>
                <li><a href="/about">About Us</a></li>
                <li><a href="/contact">Contact</a></li>
              </ul>
            </div>
            
            <div className="footer-contact">
              <h4>Contact Us</h4>
              <ul>
                <li>
                  <MapPin size={18} />
                  <span>123 Pizza Street, Flavor Town, FL 12345</span>
                </li>
                <li>
                  <Phone size={18} />
                  <span>(555) 123-4567</span>
                </li>
                <li>
                  <Mail size={18} />
                  <span>hello@pizzaheaven.com</span>
                </li>
                <li>
                  <Clock size={18} />
                  <span>Mon-Sun: 11am - 10pm</span>
                </li>
              </ul>
            </div>
            
            <div className="footer-newsletter">
              <h4>Stay Updated!</h4>
              <p>Get exclusive deals and new pizza alerts!</p>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="newsletter-input"
                />
                <button type="submit" className="newsletter-btn">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>© 2026 Pizza Heaven. Made with <span className="heart">❤️</span> and lots of cheese!</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer