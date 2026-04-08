import { useState } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingBag,
  Users,
  Calendar,
  Download
} from 'lucide-react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import Sidebar from '../components/layout/Sidebar'
import { 
  analyticsRevenueData, 
  analyticsOrdersData,
  topItemsData,
  customerData,
  kpiData 
} from '../data/mockData'
import './pages.css'

const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="chart-tooltip">
        <p className="tooltip-label">{label}</p>
        <p className="tooltip-value">{formatCurrency(payload[0].value)}</p>
      </div>
    )
  }
  return null
}

const COLORS = ['#ff6b35', '#f7c548', '#22c55e', '#3b82f6', '#a855f7']

function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('7days')

  const dateRangeOptions = [
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: '90days', label: 'Last 90 Days' },
  ]

  return (
    <div className="dashboard-layout">
      <Sidebar />
      
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-content">
            <h1>Analytics</h1>
            <p className="header-date mono">Business insights and metrics</p>
          </div>
          <div className="header-actions">
            <select 
              value={dateRange} 
              onChange={(e) => setDateRange(e.target.value)}
              className="date-select"
            >
              {dateRangeOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <button className="export-btn">
              <Download size={16} />
              Export CSV
            </button>
          </div>
        </header>

        <div className="page-content">
          <section className="kpi-section">
            <div className="kpi-card">
              <div className="kpi-header">
                <div className="kpi-icon" style={{ backgroundColor: '#22c55e20', color: '#22c55e' }}>
                  <DollarSign size={20} />
                </div>
                <span className="kpi-label">Total Revenue</span>
              </div>
              <div className="kpi-value mono">{formatCurrency(kpiData.totalRevenue)}</div>
              <div className="kpi-change positive">
                <TrendingUp size={14} />
                <span>{kpiData.revenueChange}% from last period</span>
              </div>
            </div>
            <div className="kpi-card">
              <div className="kpi-header">
                <div className="kpi-icon" style={{ backgroundColor: '#ff6b3520', color: '#ff6b35' }}>
                  <ShoppingBag size={20} />
                </div>
                <span className="kpi-label">Total Orders</span>
              </div>
              <div className="kpi-value mono">{kpiData.totalOrders}</div>
              <div className="kpi-change positive">
                <TrendingUp size={14} />
                <span>{kpiData.ordersChange}% from last period</span>
              </div>
            </div>
            <div className="kpi-card">
              <div className="kpi-header">
                <div className="kpi-icon" style={{ backgroundColor: '#f7c54820', color: '#f7c548' }}>
                  <Users size={20} />
                </div>
                <span className="kpi-label">Avg Order Value</span>
              </div>
              <div className="kpi-value mono">{formatCurrency(kpiData.avgOrderValue)}</div>
              <div className="kpi-change positive">
                <TrendingUp size={14} />
                <span>{kpiData.avgChange}% from last period</span>
              </div>
            </div>
            <div className="kpi-card">
              <div className="kpi-header">
                <div className="kpi-icon" style={{ backgroundColor: '#3b82f620', color: '#3b82f6' }}>
                  <Calendar size={20} />
                </div>
                <span className="kpi-label">Daily Average</span>
              </div>
              <div className="kpi-value mono">{formatCurrency(kpiData.dailyAverage)}</div>
              <div className="kpi-change positive">
                <TrendingUp size={14} />
                <span>5.2% from last period</span>
              </div>
            </div>
          </section>

          <section className="charts-section">
            <div className="chart-card full-width">
              <div className="chart-header">
                <h3>Revenue Trend</h3>
                <span className="chart-subtitle">{dateRangeOptions.find(o => o.value === dateRange)?.label}</span>
              </div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analyticsRevenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a32" vertical={false} />
                    <XAxis dataKey="date" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v/1000}k`} />
                    <Tooltip content={<CustomTooltip />} />
                    <Line type="monotone" dataKey="revenue" stroke="#ff6b35" strokeWidth={2} dot={{ fill: '#ff6b35', strokeWidth: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>

          <section className="charts-section two-col">
            <div className="chart-card">
              <div className="chart-header">
                <h3>Top Selling Items</h3>
              </div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={280}>
                  <BarChart data={topItemsData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a32" horizontal={false} />
                    <XAxis type="number" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis type="category" dataKey="name" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} width={120} />
                    <Tooltip />
                    <Bar dataKey="orders" fill="#f7c548" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="chart-card">
              <div className="chart-header">
                <h3>Customer Split</h3>
              </div>
              <div className="chart-container-pie">
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={customerData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {customerData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="pie-legend">
                  {customerData.map((entry, index) => (
                    <div key={entry.name} className="legend-item">
                      <span className="legend-dot" style={{ backgroundColor: COLORS[index % COLORS.length] }}></span>
                      <span className="legend-label">{entry.name}</span>
                      <span className="legend-value mono">{entry.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="charts-section">
            <div className="chart-card full-width">
              <div className="chart-header">
                <h3>Orders Over Time</h3>
              </div>
              <div className="chart-container">
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={analyticsOrdersData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#2a2a32" vertical={false} />
                    <XAxis dataKey="date" stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                    <YAxis stroke="#71717a" fontSize={12} tickLine={false} axisLine={false} />
                    <Tooltip />
                    <Line type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', strokeWidth: 2 }} />
                    <Line type="monotone" dataKey="delivered" stroke="#22c55e" strokeWidth={2} dot={{ fill: '#22c55e', strokeWidth: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default AnalyticsPage
