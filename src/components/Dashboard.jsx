import { useNavigate } from 'react-router-dom'
import { LogOut, User, Shield } from 'lucide-react'
import './Dashboard.css'

const getUser = () => {
  try {
    const data = localStorage.getItem('user')
    return data ? JSON.parse(data) : null
  } catch {
    return null
  }
}

function Dashboard() {
  const navigate = useNavigate()
  const user = getUser()

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <div className="dashboard-header">
          <div className="success-icon">
            <Shield size={40} />
          </div>
          <h1>Welcome, {user?.name || 'User'}!</h1>
          <p>You have successfully logged in</p>
        </div>

        <div className="dashboard-info">
          <div className="info-item">
            <User size={20} />
            <div>
              <span className="info-label">Email</span>
              <span className="info-value">{user?.email || 'N/A'}</span>
            </div>
          </div>
          <div className="info-item">
            <Shield size={20} />
            <div>
              <span className="info-label">Status</span>
              <span className="info-value status">Authenticated</span>
            </div>
          </div>
        </div>

        <button onClick={handleLogout} className="logout-button">
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  )
}

export default Dashboard
