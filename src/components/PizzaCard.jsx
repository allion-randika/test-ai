import { Plus } from 'lucide-react'
import './PizzaCard.css'

function PizzaCard({ pizza, index }) {
  return (
    <div 
      className="pizza-card" 
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="pizza-card-image">
        <span className="pizza-emoji pizza-float">🍕</span>
        <div className="pizza-card-badge">Hot!</div>
      </div>
      
      <div className="pizza-card-content">
        <h3 className="pizza-card-title">{pizza.name}</h3>
        <p className="pizza-card-desc">{pizza.description}</p>
        
        <div className="pizza-card-tags">
          {pizza.tags.slice(0, 3).map((tag, i) => (
            <span key={i} className="tag">{tag}</span>
          ))}
        </div>
        
        <div className="pizza-card-footer">
          <span className="pizza-card-price">
            ${pizza.price.toFixed(2)}
          </span>
          <button className="add-btn">
            <Plus size={18} />
            Add
          </button>
        </div>
      </div>
    </div>
  )
}

export default PizzaCard