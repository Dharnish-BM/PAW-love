import axios from 'axios';
const api = axios.create({
  baseURL: '/api',
  withCredentials: true // important: allow http-only cookie auth with backend
});
export default api;
