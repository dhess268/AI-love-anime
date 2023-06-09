import axios from 'axios';
// Default config options
const defaultOptions = {
  baseURL: 'https://ai-love-anime-production.up.railway.app',
  headers: {
    'Content-Type': 'application/json',
  },
};

// Create instance
export const axiosAuth = axios.create(defaultOptions);

// Set the AUTH token for any request
axiosAuth.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token ? `Bearer ${token}` : '';
  return config;
});
