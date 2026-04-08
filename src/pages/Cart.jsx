import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart } from '../context/CartContext'
import './Cart.css'

function Cart() {
  const { cartItems, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart()

  const handleCheckout = () => {
    alert('Checkout functionality coming soon! 🎉\n\nYour order would include:\n' + 
      cartItems.map(item => `- ${item.name} x${item.quantity}`).join('\n') +
      `\n\nTotal: $${totalPrice.toFixed(2)}`)
  }

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <div className="empty-icon">🍕</div>
          <h2>Your Cart is Empty!</h2>
          <p>Looks like you haven't added any pizzas yet. Time to fix that!</p>
          <Link to="/menu" className="btn btn-primary">
            Browse Menu
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <section className="cart-hero">
        <div className="cart-hero-content">
          <h1 className="cart-title">
            Your <span>Cart</span> 🛒
          </h1>
          <p className="cart-subtitle">
            Review your order and proceed to checkout!
          </p>
        </div>
      </section>

      <section className="cart-content">
        <div className="container">
          <div className="cart-grid">
            <div className="cart-items">
              <div className="cart-header">
                <h2>Order Summary</h2>
                <button className="clear-cart-btn" onClick={clearCart}>
                  Clear All
                </button>
              </div>

              {cartItems.map((item, index) => (
                <div 
                  key={item.id} 
                  className="cart-item"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="cart-item-image">
                    <span className="item-emoji">🍕</span>
                  </div>
                  
                  <div className="cart-item-details">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-price">${item.price.toFixed(2)} each</p>
                    <div className="item-tags">
                      {item.tags.slice(0, 2).map((tag, i) => (
                        <span key={i} className="item-tag">{tag}</span>
                      ))}
                    </div>
                  </div>

                  <div className="cart-item-actions">
                    <div className="quantity-controls">
                      <button 
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="qty-value">{item.quantity}</span>
                      <button 
                        className="qty-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <button 
                      className="remove-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="item-subtotal">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="summary-card">
                <h3>Order Total</h3>
                
                <div className="summary-rows">
                  <div className="summary-row">
                    <span>Items ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="summary-row">
                    <span>Delivery</span>
                    <span className="free">FREE</span>
                  </div>
                  <div className="summary-row">
                    <span>Tax</span>
                    <span>${(totalPrice * 0.08).toFixed(2)}</span>
                  </div>
                </div>

                <div className="summary-divider"></div>

                <div className="summary-row total">
                  <span>Total</span>
                  <span>${(totalPrice * 1.08).toFixed(2)}</span>
                </div>

                <button className="checkout-btn" onClick={handleCheckout}>
                  <ShoppingBag size={20} />
                  Proceed to Checkout
                </button>

                <Link to="/menu" className="continue-shopping">
                  <ArrowRight size={16} />
                  Add more pizzas
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Cart