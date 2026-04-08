// Generate dates for the last 7 days
const last7Days = (() => {
  const dates = []
  for (let i = 6; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    dates.push(date.toISOString().split('T')[0])
  }
  return dates
})()

// Generate dates for the last 30 days
const last30Days = (() => {
  const dates = []
  for (let i = 29; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)
    dates.push(date.toISOString().split('T')[0])
  }
  return dates
})()

// Mock revenue data for the last 7 days
export const revenueData = [
  { date: last7Days[0], revenue: 2840, orders: 42 },
  { date: last7Days[1], revenue: 3200, orders: 51 },
  { date: last7Days[2], revenue: 2980, orders: 45 },
  { date: last7Days[3], revenue: 3560, orders: 58 },
  { date: last7Days[4], revenue: 4120, orders: 67 },
  { date: last7Days[5], revenue: 3890, orders: 62 },
  { date: last7Days[6], revenue: 4450, orders: 71 },
]

// Orders by hour data
export const ordersByHourData = [
  { hour: '10AM', orders: 8 },
  { hour: '11AM', orders: 15 },
  { hour: '12PM', orders: 32 },
  { hour: '1PM', orders: 28 },
  { hour: '2PM', orders: 18 },
  { hour: '3PM', orders: 12 },
  { hour: '4PM', orders: 14 },
  { hour: '5PM', orders: 25 },
  { hour: '6PM', orders: 38 },
  { hour: '7PM', orders: 42 },
  { hour: '8PM', orders: 35 },
  { hour: '9PM', orders: 22 },
]

// KPI metrics
export const kpiData = {
  todayRevenue: 4450,
  revenueChange: 14.4,
  ordersToday: 71,
  ordersChange: 8.2,
  avgOrderValue: 62.68,
  avgChange: 5.7,
  activeOrders: 8,
  totalRevenue: 25850,
  totalOrders: 396,
  dailyAverage: 3693,
}

// Recent orders
export const recentOrders = [
  {
    id: 'ORD-7823',
    customer: 'Sarah Mitchell',
    items: 3,
    total: 54.99,
    status: 'preparing',
    time: '5 min ago',
  },
  {
    id: 'ORD-7822',
    customer: 'James Rodriguez',
    items: 2,
    total: 38.50,
    status: 'ready',
    time: '12 min ago',
  },
  {
    id: 'ORD-7821',
    customer: 'Emily Chen',
    items: 4,
    total: 72.25,
    status: 'delivered',
    time: '18 min ago',
  },
  {
    id: 'ORD-7820',
    customer: 'Michael Brown',
    items: 1,
    total: 24.99,
    status: 'delivered',
    time: '25 min ago',
  },
  {
    id: 'ORD-7819',
    customer: 'Lisa Thompson',
    items: 5,
    total: 89.50,
    status: 'delivered',
    time: '32 min ago',
  },
  {
    id: 'ORD-7818',
    customer: 'David Wilson',
    items: 2,
    total: 45.00,
    status: 'delivered',
    time: '45 min ago',
  },
]

// Menu items
export const menuItems = [
  { 
    id: 1, 
    name: 'Margherita Classic', 
    description: 'Fresh mozzarella, San Marzano tomatoes, basil, olive oil',
    price: 18.99, 
    category: 'pizza', 
    orders: 234 
  },
  { 
    id: 2, 
    name: 'Pepperoni Supreme', 
    description: 'Double pepperoni, mozzarella, oregano, red pepper flakes',
    price: 21.99, 
    category: 'pizza', 
    orders: 312 
  },
  { 
    id: 3, 
    name: 'BBQ Chicken', 
    description: 'Grilled chicken, red onion, cilantro, BBQ sauce, smoked gouda',
    price: 22.99, 
    category: 'pizza', 
    orders: 189 
  },
  { 
    id: 4, 
    name: 'Garlic Bread', 
    description: 'Crusty bread topped with roasted garlic butter and herbs',
    price: 6.99, 
    category: 'side', 
    orders: 456 
  },
  { 
    id: 5, 
    name: 'Caesar Salad', 
    description: 'Romaine lettuce, parmesan, croutons, house-made dressing',
    price: 9.99, 
    category: 'side', 
    orders: 178 
  },
  { 
    id: 6, 
    name: 'Tiramisu', 
    description: 'Classic Italian dessert with espresso-soaked ladyfingers and mascarpone',
    price: 8.99, 
    category: 'dessert', 
    orders: 145 
  },
  { 
    id: 7, 
    name: 'Hawaiian Dream', 
    description: 'Ham, pineapple, mozzarella, BBQ drizzle',
    price: 20.99, 
    category: 'pizza', 
    orders: 156 
  },
  { 
    id: 8, 
    name: 'Buffalo Wings', 
    description: 'Crispy chicken wings tossed in spicy buffalo sauce',
    price: 12.99, 
    category: 'side', 
    orders: 289 
  },
  { 
    id: 9, 
    name: 'Mushroom Truffle', 
    description: 'Wild mushrooms, truffle oil, fontina, thyme',
    price: 24.99, 
    category: 'pizza', 
    orders: 98 
  },
  { 
    id: 10, 
    name: 'Italian Soda', 
    description: 'Sparkling water with your choice of flavored syrup',
    price: 3.99, 
    category: 'drink', 
    orders: 234 
  },
  { 
    id: 11, 
    name: 'Panna Cotta', 
    description: 'Creamy vanilla bean panna cotta with berry compote',
    price: 7.99, 
    category: 'dessert', 
    orders: 112 
  },
  { 
    id: 12, 
    name: 'Veggie Delight', 
    description: 'Bell peppers, mushrooms, olives, onion, tomato sauce, mozzarella',
    price: 19.99, 
    category: 'pizza', 
    orders: 167 
  },
]

// Orders data for Orders page
export const ordersData = [
  {
    id: 'ORD-7823',
    customer: 'Sarah Mitchell',
    phone: '+1 (555) 123-4567',
    items: [
      { name: 'Pepperoni Supreme', quantity: 1, price: 21.99 },
      { name: 'Garlic Bread', quantity: 1, price: 6.99 },
      { name: 'Italian Soda', quantity: 1, price: 3.99 },
    ],
    subtotal: 32.97,
    tax: 2.64,
    total: 54.99,
    status: 'preparing',
    date: 'Apr 8, 2026',
    time: '2:45 PM',
  },
  {
    id: 'ORD-7822',
    customer: 'James Rodriguez',
    phone: '+1 (555) 234-5678',
    items: [
      { name: 'BBQ Chicken', quantity: 1, price: 22.99 },
      { name: 'Buffalo Wings', quantity: 1, price: 12.99 },
    ],
    subtotal: 35.98,
    tax: 2.88,
    total: 38.50,
    status: 'ready',
    date: 'Apr 8, 2026',
    time: '2:38 PM',
  },
  {
    id: 'ORD-7821',
    customer: 'Emily Chen',
    phone: '+1 (555) 345-6789',
    items: [
      { name: 'Margherita Classic', quantity: 2, price: 37.98 },
      { name: 'Caesar Salad', quantity: 1, price: 9.99 },
      { name: 'Tiramisu', quantity: 2, price: 17.98 },
    ],
    subtotal: 65.95,
    tax: 5.28,
    total: 72.25,
    status: 'delivered',
    date: 'Apr 8, 2026',
    time: '2:32 PM',
  },
  {
    id: 'ORD-7820',
    customer: 'Michael Brown',
    phone: '+1 (555) 456-7890',
    items: [
      { name: 'Hawaiian Dream', quantity: 1, price: 20.99 },
    ],
    subtotal: 20.99,
    tax: 1.68,
    total: 24.99,
    status: 'delivered',
    date: 'Apr 8, 2026',
    time: '2:25 PM',
  },
  {
    id: 'ORD-7819',
    customer: 'Lisa Thompson',
    phone: '+1 (555) 567-8901',
    items: [
      { name: 'Mushroom Truffle', quantity: 1, price: 24.99 },
      { name: 'Veggie Delight', quantity: 1, price: 19.99 },
      { name: 'Garlic Bread', quantity: 2, price: 13.98 },
      { name: 'Panna Cotta', quantity: 2, price: 15.98 },
      { name: 'Italian Soda', quantity: 2, price: 7.98 },
    ],
    subtotal: 82.92,
    tax: 6.64,
    total: 89.50,
    status: 'delivered',
    date: 'Apr 8, 2026',
    time: '2:18 PM',
  },
  {
    id: 'ORD-7818',
    customer: 'David Wilson',
    phone: '+1 (555) 678-9012',
    items: [
      { name: 'Pepperoni Supreme', quantity: 2, price: 43.98 },
    ],
    subtotal: 43.98,
    tax: 3.52,
    total: 45.00,
    status: 'cancelled',
    date: 'Apr 8, 2026',
    time: '2:05 PM',
  },
  {
    id: 'ORD-7817',
    customer: 'Amanda Foster',
    phone: '+1 (555) 789-0123',
    items: [
      { name: 'Caesar Salad', quantity: 2, price: 19.98 },
      { name: 'Buffalo Wings', quantity: 1, price: 12.99 },
    ],
    subtotal: 32.97,
    tax: 2.64,
    total: 35.61,
    status: 'new',
    date: 'Apr 8, 2026',
    time: '1:58 PM',
  },
  {
    id: 'ORD-7816',
    customer: 'Robert Garcia',
    phone: '+1 (555) 890-1234',
    items: [
      { name: 'BBQ Chicken', quantity: 1, price: 22.99 },
      { name: 'Garlic Bread', quantity: 1, price: 6.99 },
    ],
    subtotal: 29.98,
    tax: 2.40,
    total: 32.38,
    status: 'preparing',
    date: 'Apr 8, 2026',
    time: '1:45 PM',
  },
  {
    id: 'ORD-7815',
    customer: 'Jennifer Lee',
    phone: '+1 (555) 901-2345',
    items: [
      { name: 'Margherita Classic', quantity: 1, price: 18.99 },
      { name: 'Hawaiian Dream', quantity: 1, price: 20.99 },
      { name: 'Italian Soda', quantity: 2, price: 7.98 },
    ],
    subtotal: 47.96,
    tax: 3.84,
    total: 51.80,
    status: 'delivered',
    date: 'Apr 8, 2026',
    time: '1:32 PM',
  },
  {
    id: 'ORD-7814',
    customer: 'Christopher Martinez',
    phone: '+1 (555) 012-3456',
    items: [
      { name: 'Veggie Delight', quantity: 1, price: 19.99 },
      { name: 'Buffalo Wings', quantity: 2, price: 25.98 },
    ],
    subtotal: 45.97,
    tax: 3.68,
    total: 49.65,
    status: 'ready',
    date: 'Apr 8, 2026',
    time: '1:20 PM',
  },
]

// Analytics data
export const analyticsRevenueData = last30Days.map((date, i) => ({
  date: date.split('-').slice(1).join('/'),
  revenue: Math.floor(2800 + Math.random() * 2000 + i * 50),
}))

export const analyticsOrdersData = last30Days.map((date, i) => ({
  date: date.split('-').slice(1).join('/'),
  orders: Math.floor(35 + Math.random() * 40 + i * 0.5),
  delivered: Math.floor(30 + Math.random() * 35 + i * 0.4),
}))

export const topItemsData = [
  { name: 'Pepperoni Supreme', orders: 312 },
  { name: 'Garlic Bread', orders: 456 },
  { name: 'BBQ Chicken', orders: 189 },
  { name: 'Buffalo Wings', orders: 289 },
  { name: 'Margherita Classic', orders: 234 },
  { name: 'Hawaiian Dream', orders: 156 },
]

export const customerData = [
  { name: 'New Customers', value: 35 },
  { name: 'Returning', value: 45 },
  { name: 'VIP', value: 20 },
]
