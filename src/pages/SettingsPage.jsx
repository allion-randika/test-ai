import { useState } from 'react'
import { User, Mail, Phone, MapPin, Clock, Bell, Moon, Shield, Save } from 'lucide-react'
import Sidebar from '../components/layout/Sidebar'
import './pages.css'

function SettingsPage() {
  const [shopSettings, setShopSettings] = useState({
    name: 'PizzaOps Downtown',
    address: '123 Main Street, New York, NY 10001',
    phone: '+1 (555) 123-4567',
    email: 'downtown@pizzaops.com',
  })

  const [hours, setHours] = useState({
    monday: { open: '10:00', close: '22:00', enabled: true },
    tuesday: { open: '10:00', close: '22:00', enabled: true },
    wednesday: { open: '10:00', close: '22:00', enabled: true },
    thursday: { open: '10:00', close: '22:00', enabled: true },
    friday: { open: '10:00', close: '23:00', enabled: true },
    saturday: { open: '11:00', close: '23:00', enabled: true },
    sunday: { open: '11:00', close: '21:00', enabled: false },
  })

  const [notifications, setNotifications] = useState({
    emailOrders: true,
    emailReports: true,
    smsOrders: false,
    smsAlerts: true,
    pushNotifications: true,
  })

  const handleSettingChange = (field, value) => {
    setShopSettings(prev => ({ ...prev, [field]: value }))
  }

  const handleHourChange = (day, field, value) => {
    setHours(prev => ({
      ...prev,
      [day]: { ...prev[day], [field]: value }
    }))
  }

  const handleNotificationToggle = (field) => {
    setNotifications(prev => ({ ...prev, [field]: !prev[field] }))
  }

  return (
    <div className="dashboard-layout">
      <Sidebar />
      
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="header-content">
            <h1>Settings</h1>
            <p className="header-date mono">Manage your shop configuration</p>
          </div>
        </header>

        <div className="page-content">
          <section className="settings-section">
            <div className="settings-card">
              <div className="settings-card-header">
                <User size={20} />
                <h3>Shop Profile</h3>
              </div>
              <div className="settings-card-body">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Shop Name</label>
                    <input
                      type="text"
                      value={shopSettings.name}
                      onChange={(e) => handleSettingChange('name', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="email"
                      value={shopSettings.email}
                      onChange={(e) => handleSettingChange('email', e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="tel"
                      value={shopSettings.phone}
                      onChange={(e) => handleSettingChange('phone', e.target.value)}
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Address</label>
                    <input
                      type="text"
                      value={shopSettings.address}
                      onChange={(e) => handleSettingChange('address', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="settings-card">
              <div className="settings-card-header">
                <Clock size={20} />
                <h3>Business Hours</h3>
              </div>
              <div className="settings-card-body">
                <div className="hours-grid">
                  {Object.entries(hours).map(([day, { open, close, enabled }]) => (
                    <div key={day} className={`hours-row ${!enabled ? 'disabled' : ''}`}>
                      <label className="day-label">
                        <input
                          type="checkbox"
                          checked={enabled}
                          onChange={(e) => handleHourChange(day, 'enabled', e.target.checked)}
                        />
                        <span className="day-name">{day.charAt(0).toUpperCase() + day.slice(1)}</span>
                      </label>
                      <div className="time-inputs">
                        <input
                          type="time"
                          value={open}
                          onChange={(e) => handleHourChange(day, 'open', e.target.value)}
                          disabled={!enabled}
                        />
                        <span>to</span>
                        <input
                          type="time"
                          value={close}
                          onChange={(e) => handleHourChange(day, 'close', e.target.value)}
                          disabled={!enabled}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="settings-card">
              <div className="settings-card-header">
                <Bell size={20} />
                <h3>Notifications</h3>
              </div>
              <div className="settings-card-body">
                <div className="toggle-list">
                  <div className="toggle-row">
                    <div className="toggle-info">
                      <Mail size={18} />
                      <div>
                        <span className="toggle-label">Email Order Notifications</span>
                        <span className="toggle-desc">Receive emails for new orders</span>
                      </div>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={notifications.emailOrders}
                        onChange={() => handleNotificationToggle('emailOrders')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="toggle-row">
                    <div className="toggle-info">
                      <Bell size={18} />
                      <div>
                        <span className="toggle-label">Daily Reports</span>
                        <span className="toggle-desc">Receive daily summary reports</span>
                      </div>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={notifications.emailReports}
                        onChange={() => handleNotificationToggle('emailReports')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="toggle-row">
                    <div className="toggle-info">
                      <Phone size={18} />
                      <div>
                        <span className="toggle-label">SMS Alerts</span>
                        <span className="toggle-desc">Get text messages for urgent alerts</span>
                      </div>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={notifications.smsAlerts}
                        onChange={() => handleNotificationToggle('smsAlerts')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                  <div className="toggle-row">
                    <div className="toggle-info">
                      <Shield size={18} />
                      <div>
                        <span className="toggle-label">Security Alerts</span>
                        <span className="toggle-desc">Get notified of suspicious activity</span>
                      </div>
                    </div>
                    <label className="toggle-switch">
                      <input
                        type="checkbox"
                        checked={notifications.pushNotifications}
                        onChange={() => handleNotificationToggle('pushNotifications')}
                      />
                      <span className="toggle-slider"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="settings-actions">
              <button className="save-btn">
                <Save size={18} />
                Save Changes
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default SettingsPage
