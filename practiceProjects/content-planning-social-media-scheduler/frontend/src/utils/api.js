const getBaseUrl = () => {
  return import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';
};

const request = async (method, path, body = null, customHeaders = {}) => {
  const token = localStorage.getItem('token');
  const workspaceId = localStorage.getItem('workspaceId');

  const headers = {
    'Content-Type': 'application/json',
    ...customHeaders
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  if (workspaceId) {
    headers['x-workspace-id'] = workspaceId;
  }

  const options = {
    method,
    headers
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${getBaseUrl()}${path}`, options);
  const json = await response.json();

  if (!response.ok) {
    const errorMsg = json.message || json.errors?.[0]?.msg || 'Something went wrong';
    throw new Error(errorMsg);
  }

  return json;
};

export const api = {
  get: (path, headers) => request('GET', path, null, headers),
  post: (path, body, headers) => request('POST', path, body, headers),
  put: (path, body, headers) => request('PUT', path, body, headers),
  delete: (path, headers) => request('DELETE', path, null, headers)
};
export default api;
