import { useEffect, useState } from 'react'
import { Award, Users, Clock, Heart } from 'lucide-react'
import './AboutSection.css'

function AboutSection() {
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

  const stats = [
    { icon: Clock, value: counts.years, label: 'Years in Business', suffix: '+' },
    { icon: Award, value: counts.pizzas, label: 'Pizzas Baked', suffix: '+' },
    { icon: Users, value: counts.customers, label: 'Happy Customers', suffix: '+' },
    { icon: Heart, value: counts.awards, label: 'Awards Won', suffix: '' },
  ]

  return (
    <section className="about-section">
      <div className="container">
        <div className="about-grid">
          <div className="about-visual">
            <div className="about-image-container">
              <div className="about-image pizza-float">🍕</div>
              <div className="about-decor decor-1"></div>
              <div className="about-decor decor-2">✨</div>
              <div className="about-decor decor-3">🎉</div>
            </div>
          </div>
          
          <div className="about-content">
            <span className="about-label">Our Story</span>
            <h2 className="about-title">
              Born to <span>Make Pizzas</span> That Rock Your World!
            </h2>
            <p className="about-text">
              Way back in <strong>2011</strong>, a bunch of pizza-obsessed folks decided 
              that enough was enough - no more boring, floppy pizza crusts! We set out 
              on a mission to create pizzas that would make your taste buds do a happy dance.
            </p>
            <p className="about-text">
              Using <strong>100% organic flour</strong>, hand-picked ingredients, and a 
              whole lot of love (okay, and some secret family recipes), we've been 
              serving up slices of happiness ever since.
            </p>
            
            <div className="about-stats">
              {stats.map((stat, index) => (
                <div key={index} className="stat-item" style={{ animationDelay: `${index * 0.2}s` }}>
                  <stat.icon className="stat-icon" size={24} />
                  <div className="stat-info">
                    <span className="stat-value">
                      {stat.value.toLocaleString()}{stat.suffix}
                    </span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="about-wave">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  )
}

export default AboutSection