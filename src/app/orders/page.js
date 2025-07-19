'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { orderService } from '@/services/orderService';
import OrderCard from '@/components/orders/OrderCard';
import Button from '@/components/ui/Button';
import { Package, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.id) {
        setLoading(false);
        return;
      }

      setLoading(true);
      const result = await orderService.getUserOrders(user.id);
      
      if (result.success) {
        setOrders(result.data);
      } else {
        setError(result.error);
      }
      
      setLoading(false);
    };

    fetchOrders();
  }, [user]);

  const handleOrderUpdate = (updatedOrder) => {
    setOrders(prevOrders => 
      prevOrders.map(order => 
        order.id === updatedOrder.id ? updatedOrder : order
      )
    );
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <Package size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Faça login para ver seus pedidos
            </h2>
            <p className="text-gray-600 mb-6">
              Você precisa estar logado para acessar seus pedidos.
            </p>
            <Link href="/auth/login">
              <Button>Fazer Login</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-6"></div>
            <div className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm border p-6">
                  <div className="h-4 bg-gray-300 rounded w-1/3 mb-4"></div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-300 rounded w-full"></div>
                    <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Meus Pedidos
            </h1>
            <p className="text-gray-600 mt-1">
              Acompanhe o status dos seus pedidos
            </p>
          </div>
          
          <Link href="/products">
            <Button variant="outline">
              <ArrowLeft size={16} className="mr-2" />
              Continuar Comprando
            </Button>
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-12">
            <Package size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Nenhum pedido encontrado
            </h3>
            <p className="text-gray-500 mb-6">
              Você ainda não fez nenhum pedido. Que tal começar agora?
            </p>
            <Link href="/products">
              <Button>Ver Produtos</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <OrderCard 
                key={order.id} 
                order={order} 
                onOrderUpdate={handleOrderUpdate}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}