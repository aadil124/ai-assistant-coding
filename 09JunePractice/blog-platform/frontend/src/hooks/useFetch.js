import { useState, useCallback } from 'react';

const useFetch = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const request = useCallback(async (url, options = {}) => {
    setLoading(true);
    setError(null);

    // Automatically attach Authorization Header if JWT token exists in localStorage
    const token = localStorage.getItem('token');
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || response.statusText || 'Something went wrong');
      }

      setData(json);
      return { data: json, error: null };
    } catch (err) {
      const msg = err.message || 'Network error occurred';
      setError(msg);
      return { data: null, error: msg };
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, error, loading, request };
};

export default useFetch;
