import api from '@/lib/api';
import toast from 'react-hot-toast';

export const orderService = {
  async createOrder(userId) {
    try {
      const response = await api.post(`/orders/${userId}`);
      toast.success('Pedido criado com sucesso!');
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error.response?.data || 'Erro ao criar pedido';
      toast.error(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    }
  },

  async getUserOrders(userId) {
    try {
      const response = await api.get(`/orders/${userId}`);
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error.response?.data || 'Erro ao buscar pedidos';
      toast.error(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    }
  },

  async cancelOrder(userId, orderId) {
    try {
      const response = await api.put(`/orders/${userId}/${orderId}/cancel`);
      toast.success('Pedido cancelado com sucesso');
      return { success: true, data: response.data };
    } catch (error) {
      const errorMessage = error.response?.data || 'Erro ao cancelar pedido';
      toast.error(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    }
  }
};