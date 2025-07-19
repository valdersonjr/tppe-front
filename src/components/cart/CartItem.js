'use client';

import { useState } from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { formatCurrency } from '@/lib/utils';
import Button from '@/components/ui/Button';

const CartItem = ({ item }) => {
  const [loading, setLoading] = useState(false);
  const { removeFromCart, addToCart } = useCart();

  const handleRemove = async () => {
    setLoading(true);
    await removeFromCart(item.productId);
    setLoading(false);
  };

  const handleIncrement = async () => {
    setLoading(true);
    await addToCart(item.productId, 1);
    setLoading(false);
  };

  const handleDecrement = async () => {
    if (item.quantity > 1) {
      setLoading(true);
      await addToCart(item.productId, -1);
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center gap-4 py-6 border-b border-gray-200 last:border-b-0">
      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-lg flex items-center justify-center">
        <span className="text-2xl">📦</span>
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="text-base font-medium text-gray-900 truncate mb-1">
          {item.productName}
        </h3>
        <p className="text-sm text-gray-500">
          {formatCurrency(item.productPrice)} cada
        </p>
      </div>
      
      <div className="flex items-center justify-center">
        <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={handleDecrement}
            disabled={loading || item.quantity <= 1}
            className="p-2 bg-gray-50 hover:bg-red-100 hover:text-red-600 border-r border-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            <Minus size={16} />
          </button>
          
          <span className="px-3 py-2 font-medium text-gray-900 bg-white min-w-[3rem] text-center">
            {item.quantity}
          </span>
          
          <button
            onClick={handleIncrement}
            disabled={loading}
            className="p-2 bg-gray-50 hover:bg-blue-100 hover:text-blue-600 border-l border-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
      
      <div className="text-right min-w-[5rem]">
        <p className="text-base font-semibold text-gray-900">
          {formatCurrency(item.subtotal)}
        </p>
      </div>
      
      <div className="flex-shrink-0">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleRemove}
          disabled={loading}
          className="text-red-600 hover:text-red-700 hover:bg-red-50 p-2"
        >
          <Trash2 size={16} />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;