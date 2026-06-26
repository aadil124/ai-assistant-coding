/**
 * Reusable Helper Utilities
 */

/**
 * Parses axios error object and returns a clean user-facing message.
 * @param {Object} error - Axios error object
 * @returns {string} User-friendly error message
 */
export function parseApiError(error) {
  if (!error) return 'An unexpected error occurred.';
  
  if (error.response) {
    // Server responded with a status code other than 2xx
    const data = error.response.data;
    if (data && typeof data === 'object') {
      return data.message || data.error || JSON.stringify(data);
    }
    return `Server Error: ${error.response.statusText || error.response.status}`;
  } else if (error.request) {
    // Request was made but no response was received
    return 'No response received from server. Please check your network connection.';
  } else {
    // Something happened in setting up the request
    return error.message || 'Request setup error.';
  }
}

/**
 * Formats an ISO date string into a user-friendly local date string.
 * @param {string|Date} dateStr - Date string or Date object
 * @param {boolean} includeTime - Whether to include hours and minutes
 * @returns {string} Formatted date string
 */
export function formatDate(dateStr, includeTime = false) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return String(dateStr);

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  if (includeTime) {
    options.hour = '2-digit';
    options.minute = '2-digit';
  }

  return date.toLocaleDateString('en-US', options);
}

/**
 * Formats a number to USD currency representation.
 * @param {number|string} amount - Amount to format
 * @returns {string} Formatted currency string
 */
export function formatCurrency(amount) {
  const num = typeof amount === 'number' ? amount : parseFloat(amount);
  if (isNaN(num)) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(num);
}

/**
 * Validates whether an email matches standard formats.
 * @param {string} email - Email to test
 * @returns {boolean} True if valid
 */
export function validateEmail(email) {
  if (!email) return false;
  return /\S+@\S+\.\S+/.test(email);
}

/**
 * Validates password strength (min 6 characters).
 * @param {string} password - Password to test
 * @returns {boolean} True if valid
 */
export function validatePassword(password) {
  if (!password) return false;
  return password.length >= 6;
}

/**
 * LocalStorage wrapper with JSON parsing and exception handling.
 */
export const storage = {
  get(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error(`Error reading key "${key}" from localStorage:`, e);
      return null;
    }
  },
  
  set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error(`Error writing key "${key}" to localStorage:`, e);
      return false;
    }
  },
  
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (e) {
      console.error(`Error removing key "${key}" from localStorage:`, e);
      return false;
    }
  },
  
  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (e) {
      console.error('Error clearing localStorage:', e);
      return false;
    }
  }
};
