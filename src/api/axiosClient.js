import axios from 'axios';

// Use environment variable for API URL
const API_URL = import.meta.env.VITE_API_URL || 'https://smart-portfolio-backend-irvl.onrender.com/api';

console.log('API Base URL:', API_URL); // Debug log

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout
});

// Attach bearer token from localStorage as a fallback to the httpOnly cookie
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log(`📤 ${config.method.toUpperCase()} ${config.url}`); // Debug log
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Centralized response error handling
api.interceptors.response.use(
  (response) => {
    console.log(`📥 ${response.config.method.toUpperCase()} ${response.config.url} - Status: ${response.status}`); // Debug log
    return response;
  },
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error('Response error:', {
        status: error.response.status,
        data: error.response.data,
        url: error.config?.url
      });

      if (error.response.status === 401) {
        // Token invalid/expired
        localStorage.removeItem('token');
        // Optionally redirect to login
        // window.location.href = '/login';
      }

      if (error.response.status === 404) {
        console.error('Route not found:', error.config?.url);
        console.error('Available routes should be: /api/auth, /api/profile, /api/projects, etc.');
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Error setting up request:', error.message);
    }
    
    return Promise.reject(error);
  }
);

// Test function
export const testBackend = async () => {
  try {
    const response = await api.get('/health');
    console.log('✅ Backend is healthy:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Backend test failed:', error.message);
    return null;
  }
};

export default api;