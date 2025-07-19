import api from '@/lib/api';

const cartService = {
  async getCart(userId) {
    const response = await api.get(`/cart/${userId}`);
    return response.data;
  },

  async addToCart(userId, productId, quantity = 1) {
    const response = await api.post(`/cart/${userId}/items`, {
      productId,
      quantity
    });
    return response.data;
  },

  async removeFromCart(userId, productId) {
    const response = await api.delete(`/cart/${userId}/items/${productId}`);
    return response.data;
  },

  async clearCart(userId) {
    await api.delete(`/cart/${userId}`);
  },

  async getCartTotal(userId) {
    const response = await api.get(`/cart/${userId}/total`);
    return response.data;
  }
};

export default cartService;