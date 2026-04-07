import { useState, useEffect, useCallback } from 'react';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simple validation
    if (!email || !password) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setIsLoading(false);
      return;
    }

    // Simulate login request
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  }, [email, password]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      // Cleanup if needed
    };
  }, []);

  const handleForgotPassword = (e) => {
    e.preventDefault();
    alert('Forgot password functionality would be implemented here');
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    alert('Sign up page would be implemented here');
  };

  if (isSuccess) {
    return (
      <div className="login-page">
        <div className="login-container">
          <div className="success-message">
            <div className="success-icon">✓</div>
            <h2>Login Successful!</h2>
            <p>Redirecting to your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to continue to your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="error-message" role="alert" aria-live="polite">
              {error}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={isLoading}
              aria-describedby="email-hint"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="current-password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              disabled={isLoading}
            />
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={isLoading}
              />
              <span>Remember me</span>
            </label>
            <button type="button" className="forgot-link" onClick={handleForgotPassword}>
              Forgot password?
            </button>
          </div>

          <button 
            type="submit" 
            className="login-button" 
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? (
              <span className="loading-spinner" aria-label="Signing in..." />
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account?{' '}
            <button type="button" className="signup-link" onClick={handleSignUp}>
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
