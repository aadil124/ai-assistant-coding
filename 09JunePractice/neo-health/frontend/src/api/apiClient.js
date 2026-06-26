import axios from 'axios';

// Get base URL from environment variables, fallback to local standard mock dev API
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 15000, // 15 seconds request timeout
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request Interceptor: Inject JWT token into Authorization headers
apiClient.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('token');
      // If token exists, parse it (or retrieve plain string if saved as plain text)
      if (token) {
        let cleanToken = token;
        if (token.startsWith('"') && token.endsWith('"')) {
          cleanToken = JSON.parse(token);
        }
        config.headers['Authorization'] = `Bearer ${cleanToken}`;
      }
    } catch (error) {
      console.warn('Could not parse auth token for request interceptor:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Global error handlers & 401 Session Expiry triggers
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Check if the server responded with 401 Unauthorized
    if (error.response && error.response.status === 401) {
      console.warn('Session expired or unauthorized request. Triggering global event.');
      // Dispatch custom global event so React context or UI components can show Session Expiry
      const event = new CustomEvent('neo-health-session-expired');
      window.dispatchEvent(event);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
