import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize session from storage on boot
  useEffect(() => {
    async function restoreSession() {
      try {
        const storedToken = localStorage.getItem('token');
        const storedRole = localStorage.getItem('userRole');

        if (storedToken && storedRole) {
          // Verify session via verifyToken API
          const data = await authService.verifyToken();
          setToken(data.token);
          setRole(data.role);
          setUser(data.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.warn('Authentication restore failed:', error);
        // Clear broken tokens
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userEmail');
      } finally {
        setLoading(false);
      }
    }
    restoreSession();
  }, []);

  // Listen for global 401 Session Expiry event dispatched by apiClient response interceptor
  useEffect(() => {
    const handleSessionExpired = () => {
      console.warn('SessionExpired event caught in AuthContext. Clearing session.');
      logoutSilent();
    };

    window.addEventListener('neo-health-session-expired', handleSessionExpired);
    return () => {
      window.removeEventListener('neo-health-session-expired', handleSessionExpired);
    };
  }, []);

  const login = async (email, password, loginRole) => {
    setLoading(true);
    try {
      const data = await authService.login(email, password, loginRole);
      
      // Store token variables in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('userRole', data.role);
      localStorage.setItem('userEmail', data.user.email);
      
      setToken(data.token);
      setRole(data.role);
      setUser(data.user);
      setIsAuthenticated(true);
      
      return data;
    } catch (error) {
      setIsAuthenticated(false);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logoutSilent = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    setToken(null);
    setRole(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      logoutSilent();
      setLoading(false);
    }
  };

  const value = {
    user,
    role,
    token,
    isAuthenticated,
    loading,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be consumed within an AuthProvider wrapper.');
  }
  return context;
}
