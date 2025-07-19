'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import cartService from '@/services/cartService';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

const CartContext = createContext({});

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCart = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      const cart = await cartService.getCart(user.id);
      setCart(cart);
    } catch (error) {
      console.error('Error fetching cart:', error);
      setCart(null);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    if (!user?.id) {
      toast.error('Você precisa estar logado para adicionar itens ao carrinho');
      return { success: false, error: 'User not logged in' };
    }

    console.log('CartContext addToCart chamado:', { userId: user.id, productId, quantity });
    try {
      const cart = await cartService.addToCart(user.id, productId, quantity);
      console.log('Resposta do cartService:', cart);
      setCart(cart);
      toast.success('Item adicionado ao carrinho!');
      return { success: true, cart };
    } catch (error) {
      console.error('Erro no addToCart:', error);
      const errorMessage = error.response?.data || 'Erro ao adicionar item ao carrinho';
      toast.error(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    }
  };

  const removeFromCart = async (productId) => {
    if (!user?.id) {
      toast.error('Você precisa estar logado');
      return { success: false, error: 'User not logged in' };
    }

    try {
      const cart = await cartService.removeFromCart(user.id, productId);
      setCart(cart);
      toast.success('Item removido do carrinho');
      return { success: true, cart };
    } catch (error) {
      const errorMessage = error.response?.data || 'Erro ao remover item do carrinho';
      toast.error(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    }
  };

  const clearCart = async () => {
    if (!user?.id) {
      toast.error('Você precisa estar logado');
      return { success: false, error: 'User not logged in' };
    }

    try {
      await cartService.clearCart(user.id);
      setCart({ items: [], totalAmount: 0 });
      toast.success('Carrinho limpo com sucesso!');
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data || 'Erro ao limpar carrinho';
      toast.error(errorMessage);
      return {
        success: false,
        error: errorMessage
      };
    }
  };

  const getCartTotal = async () => {
    if (!user?.id) return 0;

    try {
      const total = await cartService.getCartTotal(user.id);
      return total;
    } catch (error) {
      console.error('Error getting cart total:', error);
      return 0;
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchCart();
    } else {
      setCart(null);
    }
  }, [user]);

  const value = {
    cart,
    loading,
    addToCart,
    removeFromCart,
    clearCart,
    getCartTotal,
    fetchCart,
    itemCount: cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0,
    totalAmount: cart?.totalAmount || 0
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};