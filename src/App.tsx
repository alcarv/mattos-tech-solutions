import React, { useState, FormEvent } from 'react';
import { Code2, Globe, Laptop, MessageSquare, MonitorSmartphone, Rocket, Star, Check, Sparkles, X, Menu, Phone } from 'lucide-react';
import { WhatsAppIcon } from './components/WhatsAppIcon';
import { ArticleCard, Article } from './components/ArticleCard';
import { ArticleView } from './components/ArticleView';
import { Pagination } from './components/Pagination';
import { articles } from './data/articles';
import { CodeAnimation } from './components/CodeAnimation';
import { ThemeToggle } from './components/ThemeToggle';
import PromoBanner from './components/PromoBanner';
import { useGoogleAnalytics } from './hooks/useGoogleAnalytics';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';
import { BlogPostsList } from './components/BlogPostsList';

function App() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { trackEvent } = useGoogleAnalytics();

  const handleWhatsAppClick = () => {
    trackEvent('whatsapp_click', 'contact', 'WhatsApp Button');
    window.open('https://wa.me/+5511982712741', '_blank');
  };

  const handleCallClick = () => {
    trackEvent('phone_click', 'contact', 'Phone Button');
    window.location.href = 'tel:+5511982712741';
  };

  const handleArticleClick = (id: string) => {
    const article = articles.find(a => a.id === id);
    if (article) {
      trackEvent('article_view', 'content', article.title);
      setSelectedArticle(article);
      window.scrollTo(0, 0);
    }
  };

  const handleBackToArticles = () => {
    trackEvent('back_to_articles', 'navigation', 'Back to Articles');
    setSelectedArticle(null);
  };

  const handlePageChange = (page: number) => {
    trackEvent('page_change', 'navigation', `Page ${page}`);
    setCurrentPage(page);
    document.getElementById('articles')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const result = await emailjs.send(
        'service_gw5de7u',
        'template_6thkp3e',
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        },
        'EsEG4RZMAvxv8WTse'
      );

      if (result.status === 200) {
        trackEvent('form_submission', 'contact', 'Contact Form', 1);
        toast.success('Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      }
    } catch (error) {
      trackEvent('form_error', 'error', 'Contact Form Error');
      toast.error('Failed to send message. Please try again.');
      console.error('Error sending email:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (selectedArticle) {
    return <ArticleView article={selectedArticle} onBack={handleBackToArticles} />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 relative">
      <Toaster position="top-right" />

      {/* Floating WhatsApp Button */}
      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#128C7E] transition-all z-50 flex items-center justify-center"
        aria-label="Contact on WhatsApp"
      >
        <WhatsAppIcon />
      </button>

      {/* Hero Section */}
      <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Code2 className="h-8 w-8" />
              <span className="text-xl font-bold">Mattos Tech & Solutions</span>
            </div>

            {/* Navegação desktop */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" onClick={() => trackEvent('nav_click', 'navigation', 'Services')} className="hover:text-blue-200 dark:text-gray-300 dark:hover:text-white">Serviços</a>
              <a href="#pricing" onClick={() => trackEvent('nav_click', 'navigation', 'Pricing')} className="hover:text-blue-200 dark:text-gray-300 dark:hover:text-white">Preços</a>
              <a href="#about" onClick={() => trackEvent('nav_click', 'navigation', 'About')} className="hover:text-blue-200 dark:text-gray-300 dark:hover:text-white">Sobre</a>
              <a href="#articles" onClick={() => trackEvent('nav_click', 'navigation', 'Blogs')} className="hover:text-blue-200 dark:text-gray-300 dark:hover:text-white">Blogs</a>
              <a href="#testimonials" onClick={() => trackEvent('nav_click', 'navigation', 'Testimonials')} className="hover:text-blue-200 dark:text-gray-300 dark:hover:text-white">Avaliações</a>
              <a href="#contact" onClick={() => trackEvent('nav_click', 'navigation', 'Contact')} className="hover:text-blue-200 dark:text-gray-300 dark:hover:text-white">Contatos</a>
              <ThemeToggle />
            </div>

            {/* Menu mobile toggle */}
            <button
              onClick={() => {
                trackEvent('mobile_menu', 'navigation', isMobileMenuOpen ? 'Close Menu' : 'Open Menu');
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="md:hidden focus:outline-none"
              aria-label="Abrir menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Menu mobile */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 space-y-4">
              <a href="#services" onClick={() => trackEvent('mobile_nav_click', 'navigation', 'Services')} className="block text-white hover:text-blue-200">Services</a>
              <a href="#pricing" onClick={() => trackEvent('mobile_nav_click', 'navigation', 'Pricing')} className="block text-white hover:text-blue-200">Pricing</a>
              <a href="#about" onClick={() => trackEvent('mobile_nav_click', 'navigation', 'About')} className="block text-white hover:text-blue-200">About</a>
              <a href="#articles" onClick={() => trackEvent('mobile_nav_click', 'navigation', 'Articles')} className="block text-white hover:text-blue-200">Articles</a>
              <a href="#testimonials" onClick={() => trackEvent('mobile_nav_click', 'navigation', 'Testimonials')} className="block text-white hover:text-blue-200">Testimonials</a>
              <a href="#contact" onClick={() => trackEvent('mobile_nav_click', 'navigation', 'Contact')} className="block text-white hover:text-blue-200">Contact</a>
              <ThemeToggle />
            </div>
          )}
        </div>
      </nav>

      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white pt-24">
        <div className="container mx-auto px-6 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Seu site profissional começa aqui
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Soluções digitais personalizadas para quem quer crescer de verdade
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="#contact"
                  onClick={() => trackEvent('cta_click', 'conversion', 'Start Now')}
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-300 text-center"
                >
                  Comece Agora
                </a>
                <button
                  onClick={handleWhatsAppClick}
                  className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300 flex items-center justify-center gap-2"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  <span>Faça uma Cotação</span>
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <CodeAnimation />
            </div>
            <PromoBanner />
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 dark:text-white">Nossos Serviços</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard
              icon={<Globe className="h-8 w-8" />}
              title="Web Development"
              description="Sites e sistemas personalizados construídos com tecnologias modernas e melhores práticas. Começando em R$500,00"
              price="Apartir de R$500,00"
            />
            <ServiceCard
              icon={<MonitorSmartphone className="h-8 w-8" />}
              title="Design Responsivo"
              description="Sites/Sistemas mobile-first que funcionam perfeitamente em todos os dispositivos"
              price="Incluido"
            />
            <ServiceCard
              icon={<Rocket className="h-8 w-8" />}
              title="Otimização de Performance"
              description="Sites de carregamento rápido otimizados para mecanismos de busca"
              price="Incluido"
            />
          </div>
        </div>
      </section>

      <section id="pricing" className="py-20 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 dark:text-white">Preços</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Pacote de Site Estático */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8 bg-blue-600 text-white">
                <h3 className="text-2xl font-bold mb-2">Pacote de Site Estático</h3>
                <p className="text-4xl font-bold mb-4">R$500,00</p>
                <p className="text-blue-100">Perfeito para pequenas empresas e sites pessoais</p>
              </div>
              <div className="p-8">
                <ul className="space-y-4">
                  {[
                    'Design profissional de site',
                    'Layout responsivo para dispositivos móveis',
                    'Até 5 páginas',
                    'Formulário de contato',
                    'Otimização SEO',
                    'Carregamento rápido',
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 dark:text-gray-300">
                      <Check className="h-5 w-5 text-green-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 text-center">
                  <button
                    onClick={handleWhatsAppClick}
                    className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 w-full"
                  >
                    Comece Agora
                  </button>
                </div>
              </div>
            </div>

            {/* Pacote de Soluções Personalizadas */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border-2 border-indigo-500">
              <div className="p-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white relative">
                <div className="absolute top-4 right-4">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Soluções Personalizadas</h3>
                <p className="text-4xl font-bold mb-4">Cotação Personalizada</p>
                <p className="text-indigo-100">Soluções feitas sob medida para suas necessidades únicas</p>
              </div>
              <div className="p-8">
                <ul className="space-y-4">
                  {[
                    'Tudo do Pacote de Site Estático',
                    'Funcionalidades personalizadas',
                    'Integração de banco de dados',
                    'Autenticação de usuário',
                    'Painel administrativo',
                    'Integração de API',
                    'Páginas ilimitadas',
                    'Suporte premium',
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center gap-3 dark:text-gray-300">
                      <Check className="h-5 w-5 text-indigo-500" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 text-center">
                  <button
                    onClick={handleWhatsAppClick}
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition duration-300 w-full flex items-center justify-center gap-2"
                  >
                    <WhatsAppIcon className="h-5 w-5" />
                    Faça uma Cotação
                  </button>
                  <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
                    Entre em contato para uma solução personalizada que atenda às suas necessidades e ao seu orçamento
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=800&q=80"
                alt="Team working"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-white">Sobre Nós</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Somos apaixonados por criar experiências digitais excepcionais que impulsionam o sucesso dos nossos clientes no mundo moderno.
                Desde 2017, atuamos no setor de tecnologia desenvolvendo soluções sob medida — desde websites institucionais até sistemas de alta performance para grandes instituições financeiras.

                Combinamos experiência, inovação e foco em resultados para entregar projetos que realmente fazem a diferença.
                Além do desenvolvimento de software e toda experiência técnica, oferecemos consultoria estratégica para acelerar o crescimento tecnológico e financeiro das empresas.

                Se você busca uma parceria confiável para transformar digitalmente seu negócio, estamos prontos para fazer isso acontecer.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3 dark:text-gray-300">
                  <Laptop className="h-5 w-5 text-blue-600" />
                  <span>Time de Desenvolvimento Expert</span>
                </li>
                <li className="flex items-center space-x-3 dark:text-gray-300">
                  <Rocket className="h-5 w-5 text-blue-600" />
                  <span>Tecnologia Ideal para sua Necessidade</span>
                </li>
                <li className="flex items-center space-x-3 dark:text-gray-300">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  <span>Suporte Dedicado</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section id="articles" className="py-20 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 dark:text-white">Últimos Blogs</h2>
          <BlogPostsList websiteId="c2520460-21b9-4587-8759-a51658a1ad06" perPage={10} />
        </div>
      </section>

      {/* Seção de Depoimentos */}
      <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 dark:text-white">O que nossos clientes dizem</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              name="Maria Silva"
              role="Proprietária de Restaurante"
              image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
              content="O site que criaram para o meu restaurante capta perfeitamente nossa atmosfera e aumentou significativamente nossas reservas online."
            />
            <TestimonialCard
              name="João Santos"
              role="Instrutor de Fitness"
              image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80"
              content="Serviço profissional do começo ao fim. Meu site de treinamento fitness ficou incrível e funciona perfeitamente em todos os dispositivos."
            />
            <TestimonialCard
              name="Ana Costa"
              role="Proprietária de Boutique"
              image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80"
              content="Eles transformaram completamente minha presença online. O site é lindo e ajudou a aumentar significativamente minhas vendas."
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 dark:text-white">Entre em Contato</h2>
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-xl mb-4 dark:text-gray-300">Contato Diretamente:</p>
              <div className="flex justify-center gap-6">
                <button
                  onClick={handleWhatsAppClick}
                  className="flex items-center gap-2 text-[#25D366] hover:text-[#128C7E] transition-colors"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  <span>WhatsApp</span>
                </button>
                <button
                  onClick={handleCallClick}
                  className="flex items-center gap-2 text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Phone className="h-5 w-5" />
                  <span>Ligação</span>
                </button>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Nome</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Seu Nome"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Número de Telefone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Seu Número de Celular"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Mensagem</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Descreva Sobre seu Projeto"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Contato'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Code2 className="h-8 w-8" />
              <span className="text-xl font-bold">Mattos Tech & Solutions</span>
            </div>
            <div className="text-center md:text-right">
              <p>© 2024 Mattos Tech & Solutions. All rights reserved.</p>
              <span className="text-sm">CNPJ: 54.019.901/0001-54</span>
              <div className="flex items-center justify-center md:justify-end gap-4 mt-2">
                <button onClick={handleWhatsAppClick} className="hover:text-[#25D366]">
                  <WhatsAppIcon className="h-5 w-5" />
                </button>
                <button onClick={handleCallClick} className="hover:text-blue-400">
                  <Phone className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  price: string;
}

function ServiceCard({ icon, title, description, price }: ServiceCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
      <p className="text-lg font-semibold text-green-600 dark:text-green-400">{price}</p>
    </div>
  );
}

interface TestimonialCardProps {
  name: string;
  role: string;
  image: string;
  content: string;
}

function TestimonialCard({ name, role, image, content }: TestimonialCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
      <div className="flex items-center gap-4 mb-6">
        <img
          src={image}
          alt={name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="font-semibold text-lg dark:text-white">{name}</h3>
          <p className="text-gray-600 dark:text-gray-400">{role}</p>
        </div>
      </div>
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
        ))}
      </div>
      <p className="text-gray-700 dark:text-gray-300">{content}</p>
    </div>
  );
}

export default App;