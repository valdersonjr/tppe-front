'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { orderService } from '@/services/orderService';
import { formatCurrency } from '@/lib/utils';
import CartItem from '@/components/cart/CartItem';
import Button from '@/components/ui/Button';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const [loading, setLoading] = useState(false);
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const handleCheckout = async () => {
    if (!user?.id) {
      alert('Você precisa estar logado para finalizar o pedido');
      return;
    }

    if (!cart?.items?.length) {
      alert('Seu carrinho está vazio');
      return;
    }

    setLoading(true);
    const result = await orderService.createOrder(user.id);
    
    if (result.success) {
      alert('Pedido criado com sucesso!');
      router.push('/orders');
    } else {
      alert(result.error || 'Erro ao criar pedido');
    }
    
    setLoading(false);
  };

  const handleClearCart = async () => {
    if (window.confirm('Tem certeza que deseja limpar o carrinho?')) {
      await clearCart();
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Faça login para ver seu carrinho
            </h2>
            <p className="text-gray-600 mb-6">
              Você precisa estar logado para acessar seu carrinho de compras.
            </p>
            <Link href="/auth/login">
              <Button>Fazer Login</Button>
            </Link>
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
              Meu Carrinho
            </h1>
            <p className="text-gray-600 mt-1">
              {cart?.items?.length || 0} item(s) no carrinho
            </p>
          </div>
          
          <Link href="/products">
            <Button variant="outline">
              <ArrowLeft size={16} className="mr-2" />
              Continuar Comprando
            </Button>
          </Link>
        </div>

        {!cart?.items?.length ? (
          <div className="text-center py-12">
            <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              Seu carrinho está vazio
            </h3>
            <p className="text-gray-500 mb-6">
              Adicione alguns produtos ao seu carrinho para continuar.
            </p>
            <Link href="/products">
              <Button>Ver Produtos</Button>
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm">
            <div className="p-6">
              <div className="space-y-4">
                {cart.items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t">
                <div className="flex items-center justify-between text-lg font-medium">
                  <span>Total:</span>
                  <span className="text-2xl text-blue-600">
                    {formatCurrency(cart.totalAmount || 0)}
                  </span>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-4">
                <Button
                  onClick={handleClearCart}
                  variant="outline"
                  className="flex-1"
                >
                  Limpar Carrinho
                </Button>
                
                <Button
                  onClick={handleCheckout}
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? 'Processando...' : 'Finalizar Pedido'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}