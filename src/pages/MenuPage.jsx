import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../components/layout/Sidebar'
import { menuItems } from '../data/mockData'
import './pages.css'

function MenuPage() {
  const navigate = useNavigate()
  
  const categories = ['all', 'pizza', 'side', 'drink', 'dessert']
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return menuItems
    return menuItems.filter(item => item.category === activeCategory)
  }, [activeCategory])

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(value)
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />
      
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-content">
            <h1>Menu Management</h1>
            <p className="header-date mono">{menuItems.length} items total</p>
          </div>
          <button className="add-btn" onClick={() => navigate('/menu')}>
            + Add Item
          </button>
        </header>

        <div className="page-content">
          <div className="category-filters">
            {categories.map(cat => (
              <button
                key={cat}
                className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <div className="menu-grid">
            {filteredItems.map(item => (
              <div key={item.id} className="menu-card">
                <div className="menu-card-image">
                  <span className="category-badge">{item.category}</span>
                </div>
                <div className="menu-card-content">
                  <h3>{item.name}</h3>
                  <p className="menu-description">{item.description}</p>
                  <div className="menu-card-footer">
                    <span className="menu-price mono">{formatCurrency(item.price)}</span>
                    <span className="menu-orders">{item.orders} orders</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default MenuPage
