'use client';

import { useState } from 'react';
import { Calendar, Package, X } from 'lucide-react';
import { orderService } from '@/services/orderService';
import { useAuth } from '@/contexts/AuthContext';
import { formatCurrency, formatDate } from '@/lib/utils';
import Button from '@/components/ui/Button';

const OrderCard = ({ order, onOrderUpdate }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800';
      case 'CANCELLED':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'PENDING':
        return 'Pendente';
      case 'CONFIRMED':
        return 'Confirmado';
      case 'CANCELLED':
        return 'Cancelado';
      default:
        return status;
    }
  };

  const handleCancel = async () => {
    if (!window.confirm('Tem certeza que deseja cancelar este pedido?')) {
      return;
    }

    setLoading(true);
    const result = await orderService.cancelOrder(user.id, order.id);
    
    if (result.success) {
      onOrderUpdate(result.data);
    } else {
      alert(result.error || 'Erro ao cancelar pedido');
    }
    
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Pedido #{order.id}
          </h3>
          <div className="flex items-center text-sm text-gray-500">
            <Calendar size={16} className="mr-2" />
            {formatDate(order.createdAt)}
          </div>
        </div>
        
        <div className="flex items-center gap-3 sm:flex-shrink-0">
          <span className={`px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap ${getStatusColor(order.status)}`}>
            {getStatusText(order.status)}
          </span>
          
          {order.status === 'PENDING' && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              disabled={loading}
              className="text-red-600 border-red-300 hover:bg-red-50 whitespace-nowrap"
            >
              <X size={16} className="mr-1" />
              {loading ? 'Cancelando...' : 'Cancelar'}
            </Button>
          )}
        </div>
      </div>
      
      <div className="space-y-4 mb-6">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Package size={18} className="text-blue-500" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-gray-900 truncate">{item.productName}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {formatCurrency(item.productPrice)} × {item.quantity}
                </p>
              </div>
            </div>
            <div className="text-right flex-shrink-0 ml-4">
              <span className="font-semibold text-gray-900">
                {formatCurrency(item.subtotal)}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-900">Total:</span>
          <span className="text-xl font-bold text-blue-600">
            {formatCurrency(order.totalAmount)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;