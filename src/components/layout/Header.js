'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { ShoppingCart, User, LogOut } from 'lucide-react';
import Button from '@/components/ui/Button';

const Header = () => {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { itemCount } = useCart();

  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              ShoppingCart
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            {user && (
              <>
                <Link 
                  href="/products" 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Produtos
                </Link>
                <Link 
                  href="/orders" 
                  className="text-gray-600 hover:text-gray-900 transition-colors"
                >
                  Meus Pedidos
                </Link>
              </>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link 
                  href="/cart" 
                  className="relative p-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ShoppingCart size={20} />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </Link>
                
                <div className="flex items-center space-x-2">
                  <User size={16} className="text-gray-600" />
                  <span className="text-sm text-gray-700">{user.name}</span>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <LogOut size={16} className="mr-1" />
                  Sair
                </Button>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;