'use client';

import Link from "next/link";
import Button from "@/components/ui/Button";
import { ShoppingBag, Package, Users, Shield, TrendingUp, Clock, Star } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Home() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              {user ? `Olá, ${user.name}!` : 'Bem-vindo ao'}
              <span className="text-blue-600 block">ShoppingCart</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {user 
                ? 'Descubra produtos incríveis e tenha a melhor experiência de compra online.'
                : 'Sua loja online favorita com os melhores produtos e preços incríveis. Compre com segurança e praticidade.'
              }
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="px-8 w-full sm:w-auto">
                  <ShoppingBag className="mr-2" size={20} />
                  Explorar Produtos
                </Button>
              </Link>
              <Link href="/cart">
                <Button variant="outline" size="lg" className="px-8 w-full sm:w-auto">
                  <Package className="mr-2" size={20} />
                  Meu Carrinho
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ações Rápidas
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Acesse rapidamente as funcionalidades mais importantes da sua conta.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/products" className="group">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 border border-blue-200 hover:border-blue-300">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <ShoppingBag className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Produtos</h3>
                <p className="text-gray-600">
                  Explore nossa ampla seleção de produtos
                </p>
              </div>
            </Link>

            <Link href="/orders" className="group">
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 border border-green-200 hover:border-green-300">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <Package className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Meus Pedidos</h3>
                <p className="text-gray-600">
                  Acompanhe o status dos seus pedidos
                </p>
              </div>
            </Link>

            <Link href="/cart" className="group">
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 border border-purple-200 hover:border-purple-300">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <ShoppingBag className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">Carrinho</h3>
                <p className="text-gray-600">
                  Finalize suas compras pendentes
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">10k+</div>
              <p className="text-gray-600">Produtos Disponíveis</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">50k+</div>
              <p className="text-gray-600">Clientes Satisfeitos</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-10 h-10 text-white" />
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-2">4.9</div>
              <p className="text-gray-600">Avaliação Média</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Continue sua jornada de compras
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Descubra novidades e ofertas especiais selecionadas para você.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/products">
              <Button variant="secondary" size="lg" className="px-8 w-full sm:w-auto">
                <ShoppingBag className="mr-2" size={20} />
                Ver Novidades
              </Button>
            </Link>
            <Link href="/orders">
              <Button variant="outline" size="lg" className="px-8 w-full sm:w-auto border-white text-white hover:bg-white hover:text-blue-600">
                <Clock className="mr-2" size={20} />
                Meus Pedidos
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
