import { useState } from 'react'
import PizzaCard from '../components/PizzaCard'
import './Menu.css'

const allPizzas = [
  {
    id: 1,
    name: "Pepperoni Paradise",
    description: "Classic pepperoni with extra gooey mozzarella - the ultimate crowd pleaser!",
    price: 16.99,
    tags: ["Pepperoni", "Mozzarella", "Tomato Sauce"],
    category: "meat"
  },
  {
    id: 2,
    name: "Margherita Magic",
    description: "Fresh tomatoes, creamy mozzarella, and fragrant basil - simple perfection!",
    price: 14.99,
    tags: ["Tomato", "Mozzarella", "Basil"],
    category: "vegetarian"
  },
  {
    id: 3,
    name: "BBQ Blast",
    description: "Tender BBQ chicken, caramelized red onions, and fresh cilantro kick!",
    price: 18.99,
    tags: ["Chicken", "BBQ Sauce", "Cilantro"],
    category: "meat"
  },
  {
    id: 4,
    name: "Veggie Vibes",
    description: "Colorful bell peppers, earthy mushrooms, olives, and caramelized onions!",
    price: 15.99,
    tags: ["Peppers", "Mushrooms", "Olives"],
    category: "vegetarian"
  },
  {
    id: 5,
    name: "Meat Monster",
    description: "A carnivore's dream: pepperoni, Italian sausage, bacon, and ham!",
    price: 19.99,
    tags: ["Pepperoni", "Sausage", "Bacon"],
    category: "meat"
  },
  {
    id: 6,
    name: "Hawaiian Heat",
    description: "Sweet pineapple, savory ham, and a kick of jalapeños - tropical twist!",
    price: 16.99,
    tags: ["Pineapple", "Ham", "Jalapeños"],
    category: "meat"
  },
  {
    id: 7,
    name: "Mediterranean Delight",
    description: "Feta cheese, kalamata olives, sun-dried tomatoes, and fresh spinach!",
    price: 17.99,
    tags: ["Feta", "Olives", "Spinach"],
    category: "vegetarian"
  },
  {
    id: 8,
    name: "Spicy Thai Chicken",
    description: "Thai-inspired with grilled chicken, peanuts, and sriracha drizzle!",
    price: 18.99,
    tags: ["Chicken", "Peanuts", "Sriracha"],
    category: "meat"
  }
]

const categories = [
  { id: 'all', label: 'All Pizzas' },
  { id: 'meat', label: 'Meat Lovers' },
  { id: 'vegetarian', label: 'Vegetarian' },
]

function Menu() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredPizzas = activeCategory === 'all' 
    ? allPizzas 
    : allPizzas.filter(pizza => pizza.category === activeCategory)

  return (
    <div className="menu-page">
      <section className="menu-hero">
        <div className="menu-hero-content">
          <h1 className="menu-title">
            Our <span>Funky</span> Menu
          </h1>
          <p className="menu-subtitle">
            Choose from our handcrafted pizzas - each one made with love and the freshest ingredients!
          </p>
        </div>
        <div className="menu-hero-decor">
          <span className="decor-pizza pizza-float">🍕</span>
          <span className="decor-pizza pizza-bounce">🌶️</span>
          <span className="decor-pizza pizza-wiggle">🧀</span>
        </div>
      </section>

      <section className="menu-content">
        <div className="container">
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-btn ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(category.id)}
              >
                {category.label}
              </button>
            ))}
          </div>

          <div className="menu-grid">
            {filteredPizzas.map((pizza, index) => (
              <PizzaCard key={pizza.id} pizza={pizza} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Menu