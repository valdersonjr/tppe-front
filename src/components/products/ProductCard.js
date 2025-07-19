'use client';

import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { formatCurrency } from '@/lib/utils';
import Button from '@/components/ui/Button';

const ProductCard = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = async () => {
    if (!user) {
      alert('Você precisa estar logado para adicionar produtos ao carrinho');
      return;
    }

    console.log('Adicionando ao carrinho:', { productId: product.id, quantity, user: user.id });
    setLoading(true);
    const result = await addToCart(product.id, quantity);
    console.log('Resultado addToCart:', result);
    
    if (result.success) {
      setQuantity(1);
    } else {
      alert(result.error || 'Erro ao adicionar produto ao carrinho');
    }
    
    setLoading(false);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => prev > 1 ? prev - 1 : 1);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="h-48 bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-4xl text-blue-400">📦</div>
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            {product.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-3">
            {product.description || 'Produto sem descrição'}
          </p>
          
          <div className="mb-6">
            <span className="text-2xl font-bold text-blue-600">
              {formatCurrency(product.price)}
            </span>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="flex items-center border-2 border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={decrementQuantity}
                className="p-2 bg-gray-50 hover:bg-red-100 hover:text-red-600 border-r border-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
                disabled={quantity <= 1}
              >
                <Minus size={18} />
              </button>
              <span className="px-4 py-2 font-medium text-gray-900 bg-white min-w-[3rem] text-center">{quantity}</span>
              <button
                onClick={incrementQuantity}
                className="p-2 bg-gray-50 hover:bg-blue-100 hover:text-blue-600 border-l border-gray-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>
          
          <Button
            onClick={handleAddToCart}
            disabled={loading || !user}
            className="w-full"
          >
            {loading ? 'Adicionando...' : 'Adicionar ao Carrinho'}
          </Button>
          
          {!user && (
            <p className="text-xs text-gray-500 text-center">
              Faça login para adicionar ao carrinho
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;