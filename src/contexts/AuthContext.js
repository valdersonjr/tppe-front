'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import authService from '@/services/authService';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    try {
      const user = await authService.login(email, password);
      setUser(user);
      toast.success(`Bem-vindo(a), ${user.name}!`);
      return { success: true, user };
    } catch (error) {
      const errorMessage = error.response?.data || 'Erro ao fazer login';
      toast.error(errorMessage);
      return { 
        success: false, 
        error: errorMessage 
      };
    }
  };

  const register = async (name, email, password) => {
    try {
      const user = await authService.register(name, email, password);
      setUser(user);
      toast.success(`Conta criada com sucesso! Bem-vindo(a), ${user.name}!`);
      return { success: true, user };
    } catch (error) {
      const errorMessage = error.response?.data || 'Erro ao registrar';
      toast.error(errorMessage);
      return { 
        success: false, 
        error: errorMessage 
      };
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      toast.success('Logout realizado com sucesso!');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('Erro ao fazer logout');
    } finally {
      setUser(null);
      Cookies.remove('authToken');
    }
  };

  const getCurrentUser = async () => {
    try {
      const user = await authService.getCurrentUser();
      setUser(user);
      return user;
    } catch (error) {
      setUser(null);
      return null;
    }
  };

  useEffect(() => {
    const token = Cookies.get('authToken');
    if (token) {
      getCurrentUser().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const value = {
    user,
    login,
    register,
    logout,
    loading,
    getCurrentUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};