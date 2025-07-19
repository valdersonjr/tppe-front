import Link from "next/link";
import Button from "@/components/ui/Button";
import { ShoppingBag, Package, Users, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Bem-vindo ao
              <span className="text-blue-600 block">ShoppingCart</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Sua loja online favorita com os melhores produtos e preços incríveis.
              Compre com segurança e praticidade.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/products">
                <Button size="lg" className="px-8">
                  <ShoppingBag className="mr-2" size={20} />
                  Ver Produtos
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button variant="outline" size="lg" className="px-8" type="button">
                  Criar Conta
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Por que escolher o ShoppingCart?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Oferecemos a melhor experiência de compra online com recursos modernos e seguros.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Produtos de Qualidade</h3>
              <p className="text-gray-600">
                Selecionamos cuidadosamente os melhores produtos para você.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Atendimento Excepcional</h3>
              <p className="text-gray-600">
                Nossa equipe está sempre pronta para ajudar você.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Compra Segura</h3>
              <p className="text-gray-600">
                Suas informações e pagamentos são protegidos por criptografia.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Pronto para começar?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Explore nossos produtos e encontre exatamente o que você procura.
          </p>
          <Link href="/products">
            <Button variant="secondary" size="lg" className="px-8">
              Começar a Comprar
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
