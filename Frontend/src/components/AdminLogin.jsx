import React, { useState } from 'react';
import '../styles/AdminLogin.css';

export default function AdminLogin({ onLoginSuccess, onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Mock authentication - in production, this would call a real API
    // Demo credentials: admin@dentistconnect.ai / admin123
    if (email === 'admin@dentistconnect.ai' && password === 'admin123') {
      onLoginSuccess();
    } else {
      setError('Invalid email or password. Try: admin@dentistconnect.ai / admin123');
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <button className="back-button" onClick={onBack}>
          ← Back to Home
        </button>
        
        <div className="login-card">
          <div className="login-header">
            <h2>Admin Login</h2>
            <p>Access the administrative dashboard</p>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            {error && <div className="error-message">{error}</div>}
            
            <div className="form-group">
              <label htmlFor="admin-email">Email Address</label>
              <input 
                type="email"
                id="admin-email"
                placeholder="admin@dentistconnect.ai"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="admin-password">Password</label>
              <input 
                type="password"
                id="admin-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="login-button">
              Login to Dashboard
            </button>

            <div className="demo-credentials">
              <p>Demo Credentials:</p>
              <p>Email: admin@dentistconnect.ai</p>
              <p>Password: admin123</p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
