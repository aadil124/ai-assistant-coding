import apiClient from '../api/apiClient';

/**
 * Authentication Service
 */
const authService = {
  /**
   * Authenticates user credentials with role checks.
   * @param {string} email
   * @param {string} password
   * @param {string} role - 'patient' | 'doctor' | 'admin'
   * @returns {Promise<Object>} User session payload
   */
  async login(email, password, role) {
    // In next sprint: return (await apiClient.post('/auth/login', { email, password, role })).data;
    
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Validation check replicates Login.jsx behavior
        if (email === 'admin@neohealth.com' && role !== 'admin') {
          reject(new Error('This email is registered under Admin role. Please select Admin tab.'));
          return;
        }
        if (email === 'doctor@neohealth.com' && role !== 'doctor') {
          reject(new Error('This email is registered under Doctor role. Please select Doctor tab.'));
          return;
        }
        if (role === 'admin' && (email !== 'admin@neohealth.com' || password !== 'admin123')) {
          reject(new Error('Invalid credentials. Hint: use admin@neohealth.com / admin123'));
          return;
        }

        // Return mock session
        resolve({
          token: `dummy-jwt-token-for-${role}-${Date.now()}`,
          role: role,
          user: {
            email: email,
            name: role === 'admin' ? 'Admin User' : role === 'doctor' ? 'Dr. Sarah Jenkins' : 'John Doe',
            id: role === 'admin' ? 'ADM-001' : role === 'doctor' ? 'DOC-001' : 'USR-201'
          }
        });
      }, 800);
    });
  },

  /**
   * Registers a new user.
   * @param {Object} data - Form inputs
   * @returns {Promise<Object>} Result status
   */
  async register(data) {
    // In next sprint: return (await apiClient.post('/auth/register', data)).data;
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Registration request received.' });
      }, 800);
    });
  },

  /**
   * Terminate user session.
   * @returns {Promise<boolean>} Status
   */
  async logout() {
    // In next sprint: return (await apiClient.post('/auth/logout')).data;
    return Promise.resolve(true);
  },

  /**
   * Validates stored token and returns user details.
   * @returns {Promise<Object>} User session payload
   */
  async verifyToken() {
    // In next sprint: return (await apiClient.get('/auth/verify')).data;
    return new Promise((resolve, reject) => {
      const token = localStorage.getItem('token');
      const role = localStorage.getItem('userRole');
      const email = localStorage.getItem('userEmail');

      if (!token || !role) {
        reject(new Error('No token found.'));
        return;
      }

      setTimeout(() => {
        resolve({
          token,
          role,
          user: {
            email: email || 'user@neohealth.com',
            name: role === 'admin' ? 'Admin User' : role === 'doctor' ? 'Dr. Sarah Jenkins' : 'John Doe',
            id: role === 'admin' ? 'ADM-001' : role === 'doctor' ? 'DOC-001' : 'USR-201'
          }
        });
      }, 200);
    });
  }
};

export default authService;
