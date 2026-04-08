import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, CreditCard, Truck, User, CheckCircle, ShoppingBag, Loader2 } from 'lucide-react'
import { useCart } from '../context/CartContext'
import './Checkout.css'

// Constants
const TAX_RATE = 0.08
const FREE_DELIVERY_THRESHOLD = 30

function Checkout() {
  const navigate = useNavigate()
  const { cartItems, totalPrice, clearCart } = useCart()
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  })
  
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)
  
  const validateField = (name, value) => {
    switch (name) {
      case 'email':
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Please enter a valid email'
      case 'phone':
        return /^\(?[\d]{3}\)?[\s-]?[\d]{3}[\s-]?[\d]{4}$/.test(value) ? '' : 'Please enter a valid phone number'
      case 'zipCode':
        return /^\d{5}(-\d{4})?$/.test(value) ? '' : 'Please enter a valid ZIP code'
      case 'cardNumber':
        return /^\d{4}[\s]?\d{4}[\s]?\d{4}[\s]?\d{4}$/.test(value) ? '' : 'Please enter a valid card number'
      case 'expiryDate':
        return /^(0[1-9]|1[0-2])\/\d{2}$/.test(value) ? '' : 'Please enter a valid expiry (MM/YY)'
      case 'cvv':
        return /^\d{3,4}$/.test(value) ? '' : 'Please enter a valid CVV (3-4 digits)'
      default:
        return value.trim() ? '' : 'This field is required'
    }
  }
  
  const handleChange = (e) => {
    let { name, value } = e.target
    
    // Format card number with spaces
    if (name === 'cardNumber') {
      value = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim()
    }
    
    // Format expiry date with slash
    if (name === 'expiryDate') {
      value = value.replace(/\D/g, '')
      if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2, 4)
      }
    }
    
    setFormData({ ...formData, [name]: value })
    
    // Validate on change
    const error = validateField(name, value)
    setErrors(prev => ({ ...prev, [name]: error }))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate all fields
    const newErrors = {}
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key])
      if (error) newErrors[key] = error
    })
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate order processing
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setOrderComplete(true)
      clearCart()
    } catch (error) {
      console.error('Order failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  
  const subtotal = totalPrice
  const deliveryFee = subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : 4.99
  const tax = subtotal * TAX_RATE
  const grandTotal = subtotal + deliveryFee + tax
  
  if (cartItems.length === 0 && !orderComplete) {
    return (
      <div className="checkout-page">
        <div className="checkout-empty">
          <div className="empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add some delicious pizzas before checking out!</p>
          <Link to="/menu" className="btn btn-primary">
            Browse Menu
          </Link>
        </div>
      </div>
    )
  }
  
  if (orderComplete) {
    return (
      <div className="checkout-page">
        <div className="order-success">
          <div className="success-icon">
            <CheckCircle size={80} />
          </div>
          <h1>Order Placed Successfully! 🎉</h1>
          <p>Thank you for your order, {formData.firstName}!</p>
          <p className="order-number">Order #{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
          <p className="delivery-message">
            Your order will be delivered to:<br />
            {formData.address}, {formData.city}, {formData.state} {formData.zipCode}
          </p>
          <div className="success-actions">
            <Link to="/menu" className="btn btn-primary">
              Order More Pizzas
            </Link>
            <Link to="/" className="btn btn-secondary">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="checkout-page">
      <section className="checkout-hero">
        <div className="checkout-hero-content">
          <h1 className="checkout-title">
            Checkout 🧾
          </h1>
          <p className="checkout-subtitle">
            Complete your order and satisfy that pizza craving!
          </p>
        </div>
      </section>

      <section className="checkout-content">
        <div className="container">
          <Link to="/cart" className="back-to-cart">
            <ArrowLeft size={20} />
            Back to Cart
          </Link>

          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="checkout-grid">
              <div className="checkout-form-section">
                <div className="form-section">
                  <h3>
                    <User size={22} />
                    Personal Information
                  </h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        placeholder="John"
                        className={errors.firstName ? 'error' : ''}
                        aria-invalid={!!errors.firstName}
                        aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                      />
                      {errors.firstName && <span className="error-message" id="firstName-error">{errors.firstName}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                        placeholder="Doe"
                        className={errors.lastName ? 'error' : ''}
                        aria-invalid={!!errors.lastName}
                        aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                      />
                      {errors.lastName && <span className="error-message" id="lastName-error">{errors.lastName}</span>}
                    </div>
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
                        required
                        placeholder="john@example.com"
                        className={errors.email ? 'error' : ''}
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                      />
                      {errors.email && <span className="error-message" id="email-error">{errors.email}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="(555) 123-4567"
                        className={errors.phone ? 'error' : ''}
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? 'phone-error' : undefined}
                      />
                      {errors.phone && <span className="error-message" id="phone-error">{errors.phone}</span>}
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>
                    <Truck size={22} />
                    Delivery Address
                  </h3>
                  <div className="form-group">
                    <label htmlFor="address">Street Address</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      placeholder="123 Main Street"
                      className={errors.address ? 'error' : ''}
                      aria-invalid={!!errors.address}
                      aria-describedby={errors.address ? 'address-error' : undefined}
                    />
                    {errors.address && <span className="error-message" id="address-error">{errors.address}</span>}
                  </div>
                  <div className="form-row three-col">
                    <div className="form-group">
                      <label htmlFor="city">City</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        placeholder="New York"
                        className={errors.city ? 'error' : ''}
                        aria-invalid={!!errors.city}
                        aria-describedby={errors.city ? 'city-error' : undefined}
                      />
                      {errors.city && <span className="error-message" id="city-error">{errors.city}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="state">State</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                        placeholder="NY"
                        className={errors.state ? 'error' : ''}
                        aria-invalid={!!errors.state}
                        aria-describedby={errors.state ? 'state-error' : undefined}
                      />
                      {errors.state && <span className="error-message" id="state-error">{errors.state}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="zipCode">ZIP Code</label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                        placeholder="10001"
                        className={errors.zipCode ? 'error' : ''}
                        aria-invalid={!!errors.zipCode}
                        aria-describedby={errors.zipCode ? 'zipCode-error' : undefined}
                      />
                      {errors.zipCode && <span className="error-message" id="zipCode-error">{errors.zipCode}</span>}
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>
                    <CreditCard size={22} />
                    Payment Details
                  </h3>
                  <div className="form-group">
                    <label htmlFor="cardName">Name on Card</label>
                    <input
                      type="text"
                      id="cardName"
                      name="cardName"
                      value={formData.cardName}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                      className={errors.cardName ? 'error' : ''}
                      aria-invalid={!!errors.cardName}
                      aria-describedby={errors.cardName ? 'cardName-error' : undefined}
                    />
                    {errors.cardName && <span className="error-message" id="cardName-error">{errors.cardName}</span>}
                  </div>
                  <div className="form-group">
                    <label htmlFor="cardNumber">Card Number</label>
                    <input
                      type="text"
                      id="cardNumber"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      required
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      className={errors.cardNumber ? 'error' : ''}
                      aria-invalid={!!errors.cardNumber}
                      aria-describedby={errors.cardNumber ? 'cardNumber-error' : undefined}
                    />
                    {errors.cardNumber && <span className="error-message" id="cardNumber-error">{errors.cardNumber}</span>}
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="expiryDate">Expiry Date</label>
                      <input
                        type="text"
                        id="expiryDate"
                        name="expiryDate"
                        value={formData.expiryDate}
                        onChange={handleChange}
                        required
                        placeholder="MM/YY"
                        maxLength={5}
                        className={errors.expiryDate ? 'error' : ''}
                        aria-invalid={!!errors.expiryDate}
                        aria-describedby={errors.expiryDate ? 'expiryDate-error' : undefined}
                      />
                      {errors.expiryDate && <span className="error-message" id="expiryDate-error">{errors.expiryDate}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="cvv">CVV</label>
                      <input
                        type="text"
                        id="cvv"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        required
                        placeholder="123"
                        maxLength={4}
                        className={errors.cvv ? 'error' : ''}
                        aria-invalid={!!errors.cvv}
                        aria-describedby={errors.cvv ? 'cvv-error' : undefined}
                      />
                      {errors.cvv && <span className="error-message" id="cvv-error">{errors.cvv}</span>}
                    </div>
                  </div>
                  <p className="payment-note" aria-hidden="true">
                    🔒 Your payment information is secure and encrypted
                  </p>
                </div>
              </div>

              <div className="checkout-summary-section">
                <div className="summary-card">
                  <h3>Order Summary</h3>
                  
                  <div className="order-items">
                    {cartItems.map(item => (
                      <div key={item.id} className="order-item">
                        <div className="order-item-info">
                          <span className="item-emoji">🍕</span>
                          <div>
                            <p className="item-name">{item.name}</p>
                            <p className="item-qty">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="item-price">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="summary-divider"></div>

                  <div className="summary-rows">
                    <div className="summary-row">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                      <span>Delivery {deliveryFee === 0 && <span className="free-badge">FREE</span>}</span>
                      <span>{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
                    </div>
                    <div className="summary-row">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="summary-divider"></div>

                  <div className="summary-row total">
                    <span>Total</span>
                    <span>${grandTotal.toFixed(2)}</span>
                  </div>

                  <button type="submit" className="place-order-btn" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <Loader2 size={20} className="spinner" />
                        Processing Order...
                      </>
                    ) : (
                      <>
                        <ShoppingBag size={20} />
                        Place Order
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Checkout