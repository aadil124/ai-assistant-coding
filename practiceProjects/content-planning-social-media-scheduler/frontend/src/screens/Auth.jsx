import React, { useState } from 'react';
import api from '../utils/api';

export default function Auth({ onLoginSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || (!isLogin && !displayName)) {
      setError('Please fill out all required fields.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const payload = isLogin 
        ? { email, password } 
        : { email, password, displayName };

      const res = await api.post(endpoint, payload);
      
      if (res.success && res.token) {
        localStorage.setItem('token', res.token);
        if (res.user.activeWorkspace) {
          localStorage.setItem('workspaceId', res.user.activeWorkspace);
        }
        onLoginSuccess(res.user);
      } else {
        setError('Authentication response was invalid.');
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light-subtle px-3" style={{
      background: 'radial-gradient(circle at 10% 20%, rgb(240, 243, 248) 0%, rgb(222, 231, 242) 90.1%)'
    }}>
      <div className="card p-4 border rounded-4 shadow-lg bg-white" style={{
        maxWidth: '400px',
        width: '100%',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.4)'
      }}>
        {/* Brand Logo & Name */}
        <div className="text-center mb-4">
          <div className="d-flex align-items-center justify-content-center gap-2 mb-1">
            <span className="material-symbols-outlined text-primary" style={{ fontSize: '36px' }}>auto_awesome</span>
            <h3 className="m-0 font-weight-bold text-dark" style={{ letterSpacing: '-0.5px' }}>CreatorSuite</h3>
          </div>
          <p className="text-muted small m-0">Content Planning & Social Media Scheduler</p>
        </div>

        {/* Tabs switcher */}
        <div className="d-flex border-bottom mb-4">
          <button 
            className={`btn flex-fill pb-2 rounded-0 border-0 ${isLogin ? 'border-bottom border-primary text-primary font-weight-bold' : 'text-muted'}`}
            onClick={() => { setIsLogin(true); setError(''); }}
            type="button"
          >
            Sign In
          </button>
          <button 
            className={`btn flex-fill pb-2 rounded-0 border-0 ${!isLogin ? 'border-bottom border-primary text-primary font-weight-bold' : 'text-muted'}`}
            onClick={() => { setIsLogin(false); setError(''); }}
            type="button"
          >
            Register
          </button>
        </div>

        {error && (
          <div className="alert alert-danger py-2 px-3 small border-0 rounded-3 mb-3" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
          {!isLogin && (
            <div className="form-group">
              <label className="text-xs-caps mb-1">Display Name</label>
              <input 
                type="text" 
                className="form-control rounded-3" 
                placeholder="Alex Rivera"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label className="text-xs-caps mb-1">Email Address</label>
            <input 
              type="email" 
              className="form-control rounded-3" 
              placeholder="alex@creatorsuite.io"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="text-xs-caps mb-1">Password</label>
            <input 
              type="password" 
              className="form-control rounded-3" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary py-2.5 rounded-3 font-weight-bold d-flex align-items-center justify-content-center gap-2 mt-2"
            disabled={loading}
          >
            {loading && <span className="spinner-border spinner-border-sm" role="status"></span>}
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>
      </div>
    </div>
  );
}
