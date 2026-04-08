import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react'
import './Contact.css'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitted(true)
      setFormData({ name: '', email: '', phone: '', message: '' })
    }, 1000)
  }

  const contactInfo = [
    { icon: MapPin, label: 'Address', value: '123 Pizza Street, Flavor Town, FL 12345' },
    { icon: Phone, label: 'Phone', value: '(555) 123-4567' },
    { icon: Mail, label: 'Email', value: 'hello@pizzaheaven.com' },
    { icon: Clock, label: 'Hours', value: 'Mon-Sun: 11am - 10pm' },
  ]

  return (
    <div className="contact-page">
      <section className="contact-hero">
        <div className="contact-hero-bg">
          <span className="hero-c decor1">📍</span>
          <span className="hero-c decor2">📞</span>
          <span className="hero-c decor3">✉️</span>
          <span className="hero-c decor4">⏰</span>
        </div>
        <div className="container">
          <h1 className="contact-hero-title">
            Get In <span>Touch</span>
          </h1>
          <p className="contact-hero-text">
            Have a question? Want to place a custom order? Drop us a line - we love hearing from you!
          </p>
        </div>
      </section>

      <section className="contact-content">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-info">
              <h2 className="info-title">
                Let's <span>Connect!</span>
              </h2>
              <p className="info-text">
                Whether you're craving pizza, have a question, or want to collaborate - we're all ears!
              </p>
              
              <div className="info-items">
                {contactInfo.map((item, index) => (
                  <div 
                    key={index} 
                    className="info-item"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="info-icon">
                      <item.icon size={24} />
                    </div>
                    <div className="info-details">
                      <span className="info-label">{item.label}</span>
                      <span className="info-value">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="social-section">
                <h3>Follow Us</h3>
                <div className="social-links">
                  <a href="#" className="social-btn instagram">📸</a>
                  <a href="#" className="social-btn facebook">👍</a>
                  <a href="#" className="social-btn twitter">🐦</a>
                  <a href="#" className="social-btn tiktok">🎵</a>
                </div>
              </div>
            </div>

            <div className="contact-form-container">
              {isSubmitted ? (
                <div className="success-message">
                  <div className="success-icon">
                    <CheckCircle size={60} />
                  </div>
                  <h3>Message Sent! 🎉</h3>
                  <p>Thanks for reaching out! We'll get back to you super soon.</p>
                  <button 
                    className="btn btn-primary"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <h3 className="form-title">Send Us a Message</h3>
                  
                  <div className="form-group">
                    <label htmlFor="name">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="What's your name?"
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us what's on your mind..."
                      rows="5"
                      required
                    ></textarea>
                  </div>

                  <button type="submit" className="submit-btn">
                    <Send size={20} />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="contact-map">
        <div className="map-placeholder">
          <div className="map-content">
            <MapPin size={48} />
            <h3>Find Us Here!</h3>
            <p>123 Pizza Street, Flavor Town, FL 12345</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact