import { useMemo } from 'react'
import { 
  DollarSign, 
  ShoppingBag, 
  TrendingUp, 
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts'
import { format, parseISO } from 'date-fns'
import Sidebar from '../components/layout/Sidebar'
import { revenueData, ordersByHourData, kpiData, recentOrders } from '../data/mockData'
import './DashboardPage.css'

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

const formatDate = (dateStr) => {
  try {
    return format(parseISO(dateStr), 'EEE')
  } catch {
    return dateStr
  }
}

const formatTooltipDate = (dateStr) => {
  try {
    return format(parseISO(dateStr), 'MMM d')
  } catch {
    return dateStr
  }
}

const StatusBadge = ({ status }) => {
  const statusConfig = {
    new: { label: 'New', className: 'status-new' },
    preparing: { label: 'Preparing', className: 'status-preparing' },
    ready: { label: 'Ready', className: 'status-ready' },
    delivered: { label: 'Delivered', className: 'status-delivered' },
    cancelled: { label: 'Cancelled', className: 'status-cancelled' },
  }
  
  const config = statusConfig[status] || statusConfig.new
  
  return <span className={`status-badge ${config.className}`}>{config.label}</span>
}

const KpiCard = ({ icon: Icon, label, value, change, changeType, accentColor }) => (
  <div className="kpi-card">
    <div className="kpi-header">
      <div className="kpi-icon" style={{ backgroundColor: `${accentColor}20`, color: accentColor }}>
        <Icon size={20} />
      </div>
      <span className="kpi-label">{label}</span>
    </div>
    <div className="kpi-value mono">{value}</div>
    <div className={`kpi-change ${changeType}`}>
      {changeType === 'positive' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
      <span>{change}% from yesterday</span>
    </div>
  </div>
)

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <p className="tooltip-label">{formatTooltipDate(label)}</p>
        <p className="tooltip-value">${payload[0].value.toLocaleString()}</p>
        <p className="tooltip-orders">{payload[1]?.value} orders</p>
      </div>
    )
  }
  return null
}

const BarTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <p className="tooltip-label">{label}</p>
        <p className="tooltip-value">{payload[0].value} orders</p>
      </div>
    )
  }
  return null
}

function DashboardPage() {
  const user = useMemo(() => {
    try {
      const data = localStorage.getItem('user')
      return data ? JSON.parse(data) : null
    } catch {
      return null
    }
  }, [])

  const today = useMemo(() => format(new Date(), 'EEEE, MMMM d, yyyy'), [])

  return (
    <div className="dashboard-layout">
      <Sidebar />
      
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-content">
            <h1>Dashboard</h1>
            <p className="header-date mono">{today}</p>
          </div>
          <div className="header-user">
            <span>Welcome back,</span>
            <strong>{user?.name || 'User'}</strong>
          </div>
        </header>

        <div className="dashboard-content">
          {/* KPI Cards */}
          <section className="kpi-section">
            <KpiCard
              icon={DollarSign}
              label="Today's Revenue"
              value={formatCurrency(kpiData.todayRevenue)}
              change={kpiData.revenueChange}
              changeType="positive"
              accentColor="#22c55e"
            />
            <KpiCard
              icon={ShoppingBag}
              label="Orders Today"
              value={kpiData.ordersToday}
              change={kpiData.ordersChange}
              changeType="positive"
              accentColor="#ff6b35"
            />
            <KpiCard
              icon={TrendingUp}
              label="Avg Order Value"
              value={formatCurrency(kpiData.avgOrderValue)}
              change={kpiData.avgChange}
              changeType="positive"
              accentColor="#f7c548"
            />
            <KpiCard
              icon={Clock}
              label="Active Orders"
              value={kpiData.activeOrders}
              change={0}
              changeType="neutral"
              accentColor="#3b82f6"
            />
          </section>

          {/* Charts Section */}
          <section className="charts-section">
            <div className="chart-card revenue-chart">
              <div className="chart-header">
                <h3>Revenue Overview</h3>
                <span className="chart-subtitle">Last 7 days</span>
              </div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={280}>
                  <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ff6b35" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#ff6b35" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a32" vertical={false} />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={formatDate}
                      stroke="#71717a"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      tickFormatter={(v) => `$${v/1000}k`}
                      stroke="#71717a"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#ff6b35" 
                      strokeWidth={2}
                      fill="url(#revenueGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="chart-card orders-chart">
              <div className="chart-header">
                <h3>Orders by Hour</h3>
                <span className="chart-subtitle">Today</span>
              </div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={ordersByHourData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a32" vertical={false} />
                    <XAxis 
                      dataKey="hour" 
                      stroke="#71717a"
                      fontSize={11}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="#71717a"
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip content={<BarTooltip />} />
                    <Bar 
                      dataKey="orders" 
                      fill="#f7c548" 
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          {/* Recent Orders Section */}
          <section className="orders-section">
            <div className="section-header">
              <h3>Recent Orders</h3>
              <button className="view-all-btn">View All</button>
            </div>
            <div className="orders-table">
              <div className="table-header">
                <span>Order ID</span>
                <span>Customer</span>
                <span>Items</span>
                <span>Total</span>
                <span>Status</span>
                <span>Time</span>
              </div>
              <div className="table-body">
                {recentOrders.map((order) => (
                  <div key={order.id} className="table-row">
                    <span className="order-id mono">{order.id}</span>
                    <span className="customer-name">{order.customer}</span>
                    <span className="items-count">{order.items} items</span>
                    <span className="order-total mono">${order.total.toFixed(2)}</span>
                    <StatusBadge status={order.status} />
                    <span className="order-time">{order.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default DashboardPage
