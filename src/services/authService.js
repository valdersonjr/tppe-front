import api from '@/lib/api';

const authService = {
  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  async register(name, email, password) {
    const response = await api.post('/auth/register', { name, email, password });
    return response.data;
  },

  async logout() {
    await api.post('/auth/logout');
  },

  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data;
  }
};

export default authService;