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
  { id: 1, name: 'Margherita Classic', price: 18.99, category: 'pizza', orders: 234 },
  { id: 2, name: 'Pepperoni Supreme', price: 21.99, category: 'pizza', orders: 312 },
  { id: 3, name: 'BBQ Chicken', price: 22.99, category: 'pizza', orders: 189 },
  { id: 4, name: 'Garlic Bread', price: 6.99, category: 'side', orders: 456 },
  { id: 5, name: 'Caesar Salad', price: 9.99, category: 'side', orders: 178 },
  { id: 6, name: 'Tiramisu', price: 8.99, category: 'dessert', orders: 145 },
]
