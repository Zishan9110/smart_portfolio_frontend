import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true, // send httpOnly cookie
  headers: {
    'Content-Type': 'application/json',
  },
});

// Attach bearer token from localStorage as a fallback to the httpOnly cookie
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Centralized response error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token invalid/expired — clear local auth state.
      // Components/redux slices decide how to react (e.g. redirect to login).
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default api;
