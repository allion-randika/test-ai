import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogIn, User, Lock, AlertCircle } from 'lucide-react'
import './Login.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    setLoading(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Simple validation (demo purposes)
    if (email === 'user@example.com' && password === 'password') {
      localStorage.setItem('user', JSON.stringify({ email, name: 'Demo User' }))
      // Dispatch event to notify App component of auth change
      window.dispatchEvent(new Event('auth-change'))
      navigate('/dashboard')
    } else {
      setError('Invalid email or password')
    }

    setLoading(false)
  }

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-icon">
              <LogIn size={32} />
            </div>
            <h1>Welcome Back</h1>
            <p>Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form" noValidate>
            {error && (
              <div className="error-message" role="alert" aria-live="polite">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-wrapper">
                <User size={18} className="input-icon" />
                <input
                  type="email"
                  id="email"
                  autoComplete="email"
                  placeholder="user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  aria-invalid={!!error}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <div className="input-wrapper">
                <Lock size={18} className="input-icon" />
                <input
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-invalid={!!error}
                />
              </div>
            </div>

            <button type="submit" className="login-button" disabled={loading}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="login-footer">
            <p>Demo: user@example.com / password</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
