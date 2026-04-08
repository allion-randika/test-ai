import { useState, useMemo } from 'react'
import { Search, Filter, Eye } from 'lucide-react'
import Sidebar from '../components/layout/Sidebar'
import { ordersData } from '../data/mockData'
import './pages.css'

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

function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')

  const filteredOrders = useMemo(() => {
    return ordersData.filter(order => {
      const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           order.customer.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [searchTerm, statusFilter])

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
            <h1>Orders</h1>
            <p className="header-date mono">{filteredOrders.length} orders found</p>
          </div>
        </header>

        <div className="page-content">
          <div className="filters-bar">
            <div className="search-box">
              <Search size={18} />
              <input
                type="text"
                placeholder="Search by order ID or customer..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-group">
              <Filter size={18} />
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="preparing">Preparing</option>
                <option value="ready">Ready</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="orders-table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Phone</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map(order => (
                  <tr key={order.id}>
                    <td className="mono order-id-cell">{order.id}</td>
                    <td>{order.customer}</td>
                    <td className="text-secondary">{order.phone}</td>
                    <td>{order.items.length} items</td>
                    <td className="mono">{formatCurrency(order.total)}</td>
                    <td><StatusBadge status={order.status} /></td>
                    <td className="text-secondary">{order.date}</td>
                    <td>
                      <button className="action-btn" title="View Details">
                        <Eye size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

export default OrdersPage
