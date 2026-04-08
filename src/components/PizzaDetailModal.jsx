import { X } from 'lucide-react'
import { useState } from 'react'
import { useCart } from '../context/CartContext'
import './PizzaDetailModal.css'

function PizzaDetailModal({ pizza, onClose }) {
  const { addToCart } = useCart()
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = (e) => {
    e.stopPropagation()
    addToCart(pizza)
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 1500)
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-image">
          <span className="modal-emoji">🍕</span>
        </div>

        <div className="modal-details">
          <h2 className="modal-title">{pizza.name}</h2>
          <p className="modal-description">{pizza.description}</p>

          <div className="modal-tags">
            {pizza.tags.map((tag, i) => (
              <span key={i} className="tag">{tag}</span>
            ))}
          </div>

          <div className="modal-footer">
            <span className="modal-price">${pizza.price.toFixed(2)}</span>
            <button 
              className={`modal-add-btn ${isAdded ? 'added' : ''}`}
              onClick={handleAddToCart}
            >
              {isAdded ? 'Added to Cart!' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PizzaDetailModal