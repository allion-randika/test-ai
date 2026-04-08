import { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login'

// Lazy load all page components
const Dashboard = lazy(() => import('./pages/DashboardPage'))
const Orders = lazy(() => import('./pages/OrdersPage'))
const Menu = lazy(() => import('./pages/MenuPage'))
const Analytics = lazy(() => import('./pages/AnalyticsPage'))
const Settings = lazy(() => import('./pages/SettingsPage'))
const Profile = lazy(() => import('./pages/ProfilePage'))

// Loading fallback component
const PageLoader = () => (
  <div className="page-loader">
    <div className="loader-spinner"></div>
    <span>Loading...</span>
  </div>
)

function App() {
  const isAuthenticated = !!localStorage.getItem('user')

  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route 
            path="/login" 
            element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} 
          />
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/orders" 
            element={isAuthenticated ? <Orders /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/menu" 
            element={isAuthenticated ? <Menu /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/analytics" 
            element={isAuthenticated ? <Analytics /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/settings" 
            element={isAuthenticated ? <Settings /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/profile" 
            element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} 
          />
          <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
