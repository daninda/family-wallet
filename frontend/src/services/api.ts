import axios from 'axios';
import env from '../environment';

const api = axios.create({
  baseURL: env.VITE_API_URL,
});

export default api;
