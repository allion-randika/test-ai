import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { User, Mail, Phone, MapPin, Calendar, Edit2, LogOut } from 'lucide-react'
import Sidebar from '../components/layout/Sidebar'
import './pages.css'

function ProfilePage() {
  const navigate = useNavigate()

  const user = useMemo(() => {
    try {
      const data = localStorage.getItem('user')
      return data ? JSON.parse(data) : null
    } catch {
      return null
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('user')
    navigate('/login')
  }

  const profileData = {
    name: user?.name || 'Demo User',
    email: user?.email || 'user@example.com',
    phone: '+1 (555) 987-6543',
    role: 'Store Manager',
    location: 'New York, NY',
    joinDate: 'March 15, 2024',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
  }

  const stats = [
    { label: 'Total Orders', value: '1,247' },
    { label: 'Revenue Generated', value: '$78,450' },
    { label: 'Avg Rating', value: '4.8/5' },
    { label: 'Active Days', value: '156' },
  ]

  const recentActivity = [
    { action: 'Order #ORD-7823 completed', time: '5 minutes ago', type: 'order' },
    { action: 'Menu item updated: Pepperoni Supreme', time: '2 hours ago', type: 'menu' },
    { action: 'New review received (5 stars)', time: '4 hours ago', type: 'review' },
    { action: 'Staff shift scheduled for tomorrow', time: '6 hours ago', type: 'schedule' },
    { action: 'Order #ORD-7821 delivered', time: '18 minutes ago', type: 'order' },
  ]

  return (
    <div className="dashboard-layout">
      <Sidebar />
      
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-content">
            <h1>Profile</h1>
            <p className="header-date mono">Manage your account settings</p>
          </div>
        </header>

        <div className="page-content">
          <div className="profile-grid">
            <div className="profile-sidebar">
              <div className="profile-card">
                <div className="profile-avatar">
                  <img src={profileData.avatar} alt={profileData.name} />
                  <button className="avatar-edit-btn">
                    <Edit2 size={14} />
                  </button>
                </div>
                <h2 className="profile-name">{profileData.name}</h2>
                <span className="profile-role">{profileData.role}</span>
                
                <div className="profile-info-list">
                  <div className="profile-info-item">
                    <Mail size={16} />
                    <span>{profileData.email}</span>
                  </div>
                  <div className="profile-info-item">
                    <Phone size={16} />
                    <span>{profileData.phone}</span>
                  </div>
                  <div className="profile-info-item">
                    <MapPin size={16} />
                    <span>{profileData.location}</span>
                  </div>
                  <div className="profile-info-item">
                    <Calendar size={16} />
                    <span>Joined {profileData.joinDate}</span>
                  </div>
                </div>

                <button className="logout-profile-btn" onClick={handleLogout}>
                  <LogOut size={18} />
                  Sign Out
                </button>
              </div>
            </div>

            <div className="profile-main">
              <div className="profile-stats">
                {stats.map((stat, index) => (
                  <div key={index} className="stat-card">
                    <span className="stat-value mono">{stat.value}</span>
                    <span className="stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>

              <div className="activity-card">
                <div className="activity-header">
                  <h3>Recent Activity</h3>
                </div>
                <div className="activity-list">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="activity-item">
                      <div className={`activity-dot ${activity.type}`}></div>
                      <div className="activity-content">
                        <span className="activity-action">{activity.action}</span>
                        <span className="activity-time">{activity.time}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="edit-profile-card">
                <div className="edit-profile-header">
                  <h3>Edit Profile</h3>
                  <p>Update your personal information</p>
                </div>
                <div className="edit-profile-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input type="text" defaultValue={profileData.name} />
                    </div>
                    <div className="form-group">
                      <label>Email Address</label>
                      <input type="email" defaultValue={profileData.email} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input type="tel" defaultValue={profileData.phone} />
                    </div>
                    <div className="form-group">
                      <label>Location</label>
                      <input type="text" defaultValue={profileData.location} />
                    </div>
                  </div>
                  <button className="save-profile-btn">Save Changes</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ProfilePage
