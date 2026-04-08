import PizzaCard from './PizzaCard'
import './MenuSection.css'

const pizzas = [
  {
    id: 1,
    name: "Pepperoni Paradise",
    description: "Classic pepperoni with extra gooey mozzarella - the ultimate crowd pleaser!",
    price: 16.99,
    tags: ["Pepperoni", "Mozzarella", "Tomato Sauce"]
  },
  {
    id: 2,
    name: "Margherita Magic",
    description: "Fresh tomatoes, creamy mozzarella, and fragrant basil - simple perfection!",
    price: 14.99,
    tags: ["Tomato", "Mozzarella", "Basil"]
  },
  {
    id: 3,
    name: "BBQ Blast",
    description: "Tender BBQ chicken, caramelized red onions, and fresh cilantro kick!",
    price: 18.99,
    tags: ["Chicken", "BBQ Sauce", "Cilantro"]
  },
  {
    id: 4,
    name: "Veggie Vibes",
    description: "Colorful bell peppers, earthy mushrooms, olives, and caramelized onions!",
    price: 15.99,
    tags: ["Peppers", "Mushrooms", "Olives"]
  },
  {
    id: 5,
    name: "Meat Monster",
    description: "A carnivore's dream: pepperoni, Italian sausage, bacon, and ham!",
    price: 19.99,
    tags: ["Pepperoni", "Sausage", "Bacon"]
  },
  {
    id: 6,
    name: "Hawaiian Heat",
    description: "Sweet pineapple, savory ham, and a kick of jalapeños - tropical twist!",
    price: 16.99,
    tags: ["Pineapple", "Ham", "Jalapeños"]
  }
]

function MenuSection() {
  return (
    <section className="menu-section" id="menu">
      <div className="menu-wave">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
      
      <div className="container">
        <h2 className="section-title">
          Our <span>Funky</span> Pizzas
        </h2>
        
        <div className="menu-grid">
          {pizzas.map((pizza, index) => (
            <PizzaCard key={pizza.id} pizza={pizza} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default MenuSection