import { createContext, useContext, useState, useMemo } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (pizza) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === pizza.id)
      
      if (existingItem) {
        return prev.map(item =>
          item.id === pizza.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      
      return [...prev, { ...pizza, quantity: 1 }]
    })
  }

  const removeFromCart = (pizzaId) => {
    setCartItems(prev => prev.filter(item => item.id !== pizzaId))
  }

  const updateQuantity = (pizzaId, quantity) => {
    if (quantity < 1) {
      removeFromCart(pizzaId)
      return
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.id === pizzaId
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const totalItems = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0)
  }, [cartItems])

  const totalPrice = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }, [cartItems])

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  }

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}