import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { 
  LayoutDashboard, 
  FileText, 
  Trophy, 
  Users, 
  Calendar,
  Menu,
  X
} from 'lucide-react'
import Dashboard from './pages/Dashboard'
import Summary from './pages/Summary'
import './styles/App.css'

function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/summary', label: 'Season Summary', icon: FileText },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <div className="brand-logo">
            <Trophy size={28} />
          </div>
          <div className="brand-text">
            <h1>Thunderbolts</h1>
            <span>Cricket Club</span>
          </div>
        </div>

        <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <div className={`nav-links ${isOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              <item.icon size={20} />
              <span>{item.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  )
}

function App() {
  return (
    <Router>
      <div className="app">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/summary" element={<Summary />} />
          </Routes>
        </main>
        <footer className="footer">
          <p>Thunderbolts Cricket Club - Season 2026 | Softball Division</p>
        </footer>
      </div>
    </Router>
  )
}

export default App
