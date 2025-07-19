import api from '@/lib/api';

export const productService = {
  async getAllProducts() {
    try {
      const response = await api.get('/products');
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao buscar produtos'
      };
    }
  },

  async getProductById(id) {
    try {
      const response = await api.get(`/products/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao buscar produto'
      };
    }
  }
};