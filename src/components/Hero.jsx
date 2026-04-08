import { Link } from 'react-router-dom'
import { ArrowRight, Star, Clock, Truck } from 'lucide-react'
import './Hero.css'

function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="floating-element pepperoni p1">🫑</div>
        <div className="floating-element pepperoni p2">🌿</div>
        <div className="floating-element pepperoni p3">🧅</div>
        <div className="floating-element pepperoni p4">🍄</div>
        <div className="floating-element pepperoni p5">🌶️</div>
      </div>
      
      <div className="hero-content">
        <div className="hero-badge">
          <Star size={16} fill="currentColor" />
          <span>#1 Pizza in Town</span>
        </div>
        
        <h1 className="hero-title">
          Fresh & Funky
          <span className="hero-title-highlight"> Pizza Time!</span>
        </h1>
        
        <p className="hero-subtitle">
          Hand-tossed with love, baked with soul, 
          delivered with swagger. Your taste buds are in for a ride! 🎸
        </p>
        
        <div className="hero-actions">
          <Link to="/menu" className="btn btn-primary">
            Order Now
            <ArrowRight size={20} />
          </Link>
          <Link to="/about" className="btn btn-secondary">
            Our Story
          </Link>
        </div>
        
        <div className="hero-features">
          <div className="feature">
            <Clock size={20} />
            <span>30 min Delivery</span>
          </div>
          <div className="feature">
            <Truck size={20} />
            <span>Free Shipping</span>
          </div>
          <div className="feature">
            <span className="feature-emoji">⭐</span>
            <span>4.9 Rating</span>
          </div>
        </div>
      </div>
      
      <div className="hero-visual">
        <div className="pizza-showcase">
          <div className="pizza-main pizza-float">
            🍕
          </div>
          <div className="pizza-shadow"></div>
        </div>
        
        <div className="decoration-ring ring-1"></div>
        <div className="decoration-ring ring-2"></div>
        <div className="decoration-ring ring-3"></div>
      </div>
    </section>
  )
}

export default Hero