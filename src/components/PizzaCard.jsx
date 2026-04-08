import { Plus, Check } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import './PizzaCard.css'

function PizzaCard({ pizza, index, onClick }) {
  const { addToCart } = useCart()
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = (e) => {
    e.stopPropagation()
    addToCart(pizza)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 1500)
  }

  const handleCardClick = () => {
    if (onClick) {
      onClick(pizza)
    }
  }

  return (
    <div 
      className="pizza-card" 
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleCardClick()}
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
          <button 
            className={`add-btn ${isAdded ? 'added' : ''}`}
            onClick={handleAddToCart}
          >
            {isAdded ? <Check size={18} /> : <Plus size={18} />}
            {isAdded ? 'Added!' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default PizzaCard