import { useEffect, useState } from 'react'
import { Award, Users, Clock, Heart, CheckCircle } from 'lucide-react'
import './About.css'

function About() {
  const [counts, setCounts] = useState({ years: 0, pizzas: 0, customers: 0, awards: 0 })

  useEffect(() => {
    const target = { years: 15, pizzas: 50000, customers: 25000, awards: 12 }
    const duration = 2000
    const steps = 60
    const interval = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps
      const easeOut = 1 - Math.pow(1 - progress, 3)
      
      setCounts({
        years: Math.round(target.years * easeOut),
        pizzas: Math.round(target.pizzas * easeOut),
        customers: Math.round(target.customers * easeOut),
        awards: Math.round(target.awards * easeOut)
      })

      if (step >= steps) clearInterval(timer)
    }, interval)

    return () => clearInterval(timer)
  }, [])

  const values = [
    { icon: '🌱', title: 'Fresh Ingredients', desc: 'Only the freshest, organic produce makes it to your pizza' },
    { icon: '❤️', title: 'Made with Love', desc: 'Every pizza is crafted with passion and care' },
    { icon: '⚡', title: 'Super Fast', desc: 'From order to your door in 30 minutes or less' },
    { icon: '🎉', title: 'Fun Vibes', desc: 'We believe pizza time should be a party!' },
  ]

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="about-hero-bg">
          <span className="hero-decor d1">🍕</span>
          <span className="hero-decor d2">🧀</span>
          <span className="hero-decor d3">🌿</span>
          <span className="hero-decor d4">🔥</span>
        </div>
        <div className="container">
          <h1 className="about-hero-title">
            Our <span>Awesome</span> Story
          </h1>
          <p className="about-hero-text">
            From a tiny kitchen to the coolest pizza spot in town - here's how we roll!
          </p>
        </div>
      </section>

      <section className="about-story">
        <div className="container">
          <div className="story-grid">
            <div className="story-content">
              <span className="story-badge">Est. 2011</span>
              <h2 className="story-title">
                The Pizza <span>Revolution</span> Begins!
              </h2>
              <p className="story-text">
                It all started with a simple idea: <strong>pizza should be fun!</strong> 
                Our founders, a group of friends who loved pizza more than anything 
                (except maybe rock 'n' roll), decided to shake things up in 2011.
              </p>
              <p className="story-text">
                We ditched the boring corporate pizza templates and created something 
                <strong> bold, funky, and absolutely delicious</strong>. Using our 
                grandma's secret dough recipe (shhh!), locally-sourced ingredients, 
                and a whole lot of creativity, we baked our way into people's hearts.
              </p>
              <p className="story-text">
                Today, we're proud to be serving over <strong>25,000 happy customers</strong> 
                and baking more than <strong>50,000 pizzas</strong> a year. And the best part? 
                We're just getting started!
              </p>
            </div>
            <div className="story-visual">
              <div className="story-image-container">
                <span className="story-emoji pizza-float">🍕</span>
                <div className="story-decor sd1">✨</div>
                <div className="story-decor sd2">🎸</div>
                <div className="story-decor sd3">🎵</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-stats">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-card">
              <Clock className="stat-icon" size={40} />
              <span className="stat-number">{counts.years}+</span>
              <span className="stat-label">Years of Pizza Magic</span>
            </div>
            <div className="stat-card">
              <Award className="stat-icon" size={40} />
              <span className="stat-number">{counts.pizzas.toLocaleString()}+</span>
              <span className="stat-label">Pizzas Baked</span>
            </div>
            <div className="stat-card">
              <Users className="stat-icon" size={40} />
              <span className="stat-number">{counts.customers.toLocaleString()}+</span>
              <span className="stat-label">Happy Customers</span>
            </div>
            <div className="stat-card">
              <Heart className="stat-icon" size={40} />
              <span className="stat-number">{counts.awards}</span>
              <span className="stat-label">Awards Won</span>
            </div>
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="container">
          <h2 className="values-title">
            Why We <span>Rock</span>!
          </h2>
          <div className="values-grid">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="value-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <span className="value-icon">{value.icon}</span>
                <h3 className="value-title">{value.title}</h3>
                <p className="value-desc">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Ready to Taste the Funky Difference?</h2>
            <p className="cta-text">
              Order now and join thousands of pizza lovers who've discovered their new favorite spot!
            </p>
            <a href="/menu" className="btn btn-primary">
              Explore Our Menu
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About