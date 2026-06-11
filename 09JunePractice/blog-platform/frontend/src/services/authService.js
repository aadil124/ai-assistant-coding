import { API_ROUTES } from '../config/api';

export const registerUser = async (username, email, password) => {
  const response = await fetch(API_ROUTES.auth.register, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, email, password }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error || 'Registration failed');
  }

  return json;
};

export const loginUser = async (email, password) => {
  const response = await fetch(API_ROUTES.auth.login, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const json = await response.json();

  if (!response.ok) {
    throw new Error(json.error || 'Login failed');
  }

  return json;
};
