import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api',
  timeout: 10000,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      Cookies.remove('authToken');
      toast.error('Sessão expirada. Faça login novamente.');
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
    } else if (error.response?.status >= 500) {
      toast.error('Erro interno do servidor. Tente novamente mais tarde.');
    } else if (error.code === 'ECONNABORTED') {
      toast.error('Tempo limite da requisição excedido. Verifique sua conexão.');
    } else if (!error.response) {
      toast.error('Erro de conexão. Verifique sua internet.');
    }
    return Promise.reject(error);
  }
);

export default api;