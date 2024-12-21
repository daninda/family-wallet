import axios from 'axios';

const api = axios.create({
    baseURL: window.origin + '/api',
});

export default api;
