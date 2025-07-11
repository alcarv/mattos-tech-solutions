import React, { useState, FormEvent } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import {
  Code2,
  Globe,
  Rocket,
  Check,
  X,
  Menu,
  Phone,
  Shield,
  Cloud,
  FileSpreadsheet,
  Users,
  Lightbulb,
  Code,
  Database,
  Smartphone,
  LayoutGrid,
  Mail,
  Building2,
  UserCircle2
} from 'lucide-react';
import { WhatsAppIcon } from './components/WhatsAppIcon';
import { InstagramIcon } from './components/InstagramIcon';
import { BlogPostsList } from './components/BlogPostsList';
import { BlogPostPage } from './pages/BlogPostPage';
import { CodeAnimation } from './components/CodeAnimation';
import { ThemeToggle } from './components/ThemeToggle';
import { useGoogleAnalytics } from './hooks/useGoogleAnalytics';
import { Helmet } from 'react-helmet-async';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';
import ScrollReveal from './components/ScrollReveal';

// Campaign configurations for marketing paths
const campaignConfigs = {
  'desenvolvedor-sites': {
    heroTitle: 'Contrate Desenvolvedor de Sites Profissionais',
    heroSubtitle: 'Criamos sites modernos, responsivos e otimizados que convertem visitantes em clientes. Sua presença digital profissional começa aqui.',
    ctaText: 'Criar Meu Site'
  },
  'consultoria-tecnologia': {
    heroTitle: 'Contrate uma Consultoria Tecnológica Especializada',
    heroSubtitle: 'Transforme sua operação com estratégias tecnológicas que reduzem custos, otimizam processos e aceleram o crescimento do seu negócio.',
    ctaText: 'Solicitar Consultoria'
  },
  'sistemas-personalizados': {
    heroTitle: 'Sistemas Personalizados para Sua Empresa',
    heroSubtitle: 'Automatize processos, aumente a eficiência e reduza custos operacionais com sistemas desenvolvidos especificamente para seu negócio.',
    ctaText: 'Desenvolver Sistema'
  },
  'migracao-cloud': {
    heroTitle: 'Migração Segura para Nuvem',
    heroSubtitle: 'Reduza custos de infraestrutura em até 40% e aumente a performance com nossa migração especializada para nuvem.',
    ctaText: 'Migrar para Nuvem'
  },
  'apps-mobile': {
    heroTitle: 'Aplicativos Mobile de Alta Performance',
    heroSubtitle: 'Alcance seus clientes onde eles estão com aplicativos móveis modernos, intuitivos e otimizados para iOS e Android.',
    ctaText: 'Criar Aplicativo'
  },
  'solucoes-ecommerce': {
    heroTitle: 'E-commerce que Vende Mais',
    heroSubtitle: 'Aumente suas vendas online com lojas virtuais otimizadas para conversão, integradas com os melhores sistemas de pagamento.',
    ctaText: 'Criar Loja Virtual'
  }
};

// Rest of the App.tsx file remains exactly the same
function App() {
  const location = useLocation();
  const campaign = location.pathname.startsWith('/') ? location.pathname.slice(1) : null;
  const campaignConfig = campaign && campaignConfigs[campaign as keyof typeof campaignConfigs];
  
  const canonicalUrl = `https://mattostechsolutions.com${location.pathname}`;
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
    if (campaignConfig) {
      trackEvent('whatsapp_campaign_click', 'campaign', campaign);
    }
    const message = encodeURIComponent("Olá! Tenho interesse em serviços de consultoria de TI com a Mattos Tech Solutions.");
    window.open(`https://wa.me/5511982712741?text=${message}`, '_blank');
  };

  const handleInstagramClick = () => {
    trackEvent('instagram_click', 'social', 'Instagram Button');
    window.open('https://instagram.com/mattostechsolutions', '_blank');
  };

  const handleCallClick = () => {
    trackEvent('phone_click', 'contact', 'Phone Button');
    window.location.href = 'tel:+5511982712741';
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

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 relative">
      <Helmet>
        <link rel="canonical" href={canonicalUrl} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#1a1b26" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <link rel="alternate" href="https://mattostechsolutions.com" hrefLang="pt-BR" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "url": "https://mattostechsolutions.com",
            "name": "Mattos Tech Solutions",
            "description": "Desenvolvimento profissional de websites e sistemas personalizados",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://mattostechsolutions.com/search?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      </Helmet>

      <Toaster position="top-right" />

      <button
        onClick={handleWhatsAppClick}
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-lg hover:bg-[#128C7E] transition-all z-50 flex items-center justify-center"
        aria-label="Contact on WhatsApp"
      >
        <WhatsAppIcon />
      </button>

      <nav className="fixed top-0 left-0 w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-md z-40">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="flex items-center space-x-2 hover:text-blue-200 transition-colors duration-200"
              onClick={() => trackEvent('logo_click', 'navigation', 'Home')}
            >
              <Code2 className="h-8 w-8" />
              <span className="text-xl font-bold">Mattos Tech & Solutions</span>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" onClick={() => trackEvent('nav_click', 'navigation', 'Services')} className="hover:text-blue-200 dark:text-gray-300 dark:hover:text-white">Serviços</a>
              <a href="#about" onClick={() => trackEvent('nav_click', 'navigation', 'About')} className="hover:text-blue-200 dark:text-gray-300 dark:hover:text-white">Sobre</a>
              <a href="#target-audience" onClick={() => trackEvent('nav_click', 'navigation', 'Target-Audience')} className="hover:text-blue-200 dark:text-gray-300 dark:hover:text-white">Público Alvo</a>
              <a href="#quote" onClick={() => trackEvent('nav_click', 'navigation', 'Quote')} className="hover:text-blue-200 dark:text-gray-300 dark:hover:text-white">Cotação</a>
              <a href="#articles" onClick={() => trackEvent('nav_click', 'navigation', 'Blogs')} className="hover:text-blue-200 dark:text-gray-300 dark:hover:text-white">Blogs</a>
              <a href="#contact" onClick={() => trackEvent('nav_click', 'navigation', 'Contact')} className="hover:text-blue-200 dark:text-gray-300 dark:hover:text-white">Contatos</a>
              <ThemeToggle />
            </div>

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

          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 space-y-4">
              <a href="#services" onClick={() => trackEvent('mobile_nav_click', 'navigation', 'Services')} className="block text-white hover:text-blue-200">Serviços</a>
              <a href="#about" onClick={() => trackEvent('mobile_nav_click', 'navigation', 'About')} className="block text-white hover:text-blue-200">Sobre</a>
              <a href="#target-audience" onClick={() => trackEvent('mobile_nav_click', 'navigation', 'Target-Audience')} className="block text-white hover:text-blue-200">Público Alvo</a>
              <a href="#quote" onClick={() => trackEvent('mobile_nav_click', 'navigation', 'Quote')} className="block text-white hover:text-blue-200">Cotação</a>
              <a href="#articles" onClick={() => trackEvent('mobile_nav_click', 'navigation', 'Articles')} className="block text-white hover:text-blue-200">Blogs</a>
              <a href="#contact" onClick={() => trackEvent('mobile_nav_click', 'navigation', 'Contact')} className="block text-white hover:text-blue-200">Contatos</a>
              <ThemeToggle />
            </div>
          )}
        </div>
      </nav>

      <Routes>
        <Route path="/blog/:id" element={<BlogPostPage />} />
        <Route path="/" element={
          <>
            <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white pt-24 relative">
              <ScrollReveal>
                <div className="container mx-auto px-6 py-16 md:py-24">
                  <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                    <div className="max-w-2xl">
                      <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
                        {campaignConfig ? campaignConfig.heroTitle : 'Impulsione seu negócio com consultoria tecnológica de verdade'}
                      </h1>
                      <p className="text-lg md:text-xl mb-6 text-blue-100 leading-relaxed">
                        {campaignConfig ? campaignConfig.heroSubtitle : 'Soluções sob medida em tecnologia, especialidade em infraestrutura local e cloud, desenvolvimento de sistemas, sites e suporte contínuo para transformar sua operação digital'}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-4">
                        <a
                          href="#contact"
                          onClick={() => {
                            trackEvent('cta_click', 'conversion', campaignConfig ? campaign : 'Start Now');
                            if (campaignConfig) {
                              trackEvent('campaign_cta_click', 'campaign', campaign);
                            }
                          }}
                          className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-300 text-center text-base"
                        >
                          {campaignConfig ? campaignConfig.ctaText : 'Comece Agora'}
                        </a>
                        <button
                          onClick={handleWhatsAppClick}
                          className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300 flex items-center justify-center gap-2 text-base"
                        >
                          <WhatsAppIcon className="h-5 w-5" />
                          <span>Faça uma Cotação</span>
                        </button>
                      </div>
                      <div className="mt-6 flex items-center gap-4">
                        <span className="text-blue-100">Siga-nos:</span>
                        <button
                          onClick={handleInstagramClick}
                          className="text-blue-100 hover:text-white transition-colors"
                          aria-label="Follow us on Instagram"
                        >
                          <InstagramIcon className="h-6 w-6" />
                        </button>
                      </div>
                    </div>
                    <div className="hidden md:block">
                      <CodeAnimation />
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </header>

            <section id="services" className="py-20 bg-gray-50 dark:bg-gray-800">
              <div className="container mx-auto px-6">
                <ScrollReveal>
                  <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 dark:text-white">
                      Serviços de Consultoria e Desenvolvimento
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                      Maximize o potencial da sua empresa com nossa consultoria especializada em TI
                      e soluções de desenvolvimento personalizadas.
                    </p>
                  </div>
                </ScrollReveal>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    {
                      icon: <Lightbulb className="h-8 w-8" />,
                      title: "Consultoria e Planejamento em TI",
                      description: "Desenvolvemos estratégias de TI alinhadas aos seus objetivos de negócio, garantindo que sua tecnologia impulsione o crescimento da empresa.",
                      features: [
                        "Análise de infraestrutura",
                        "Planejamento estratégico",
                        "Otimização de processos",
                        "Redução de custos"
                      ]
                    },
                    {
                      icon: <Code className="h-8 w-8" />,
                      title: "Desenvolvimento de Software",
                      description: "Criamos soluções de software personalizadas e escaláveis para atender às necessidades específicas do seu negócio.",
                      features: [
                        "Sistemas web personalizados",
                        "APIs e integrações",
                        "Automação de processos",
                        "Manutenção contínua"
                      ]
                    },
                    {
                      icon: <Globe className="h-8 w-8" />,
                      title: "Desenvolvimento Web",
                      description: "Desenvolvemos sites e aplicações web modernas, responsivas e otimizadas para mecanismos de busca.",
                      features: [
                        "Design responsivo",
                        "Otimização SEO",
                        "Performance otimizada",
                        "Integração com CMS"
                      ]
                    },
                    {
                      icon: <Shield className="h-8 w-8" />,
                      title: "Governança e Compliance",
                      description: "Implementamos frameworks de governança em TI e garantimos conformidade com regulamentações do setor.",
                      features: [
                        "Políticas de segurança",
                        "Gestão de riscos",
                        "Conformidade regulatória",
                        "Auditorias de TI"
                      ]
                    },
                    {
                      icon: <Database className="h-8 w-8" />,
                      title: "Banco de Dados e Analytics",
                      description: "Projetamos e implementamos soluções de banco de dados e análise de dados para decisões mais inteligentes.",
                      features: [
                        "Modelagem de dados",
                        "Business Intelligence",
                        "Migração de dados",
                        "Otimização de queries"
                      ]
                    },
                    {
                      icon: <Smartphone className="h-8 w-8" />,
                      title: "Desenvolvimento Mobile",
                      description: "Criamos aplicativos móveis nativos e híbridos que proporcionam uma experiência excepcional aos usuários.",
                      features: [
                        "Apps iOS e Android",
                        "PWAs",
                        "UX/UI mobile",
                        "Integração com APIs"
                      ]
                    },
                    {
                      icon: <Cloud className="h-8 w-8" />,
                      title: "Migração para Nuvem",
                      description: "Facilitamos sua jornada para a nuvem com soluções seguras e escaláveis, otimizando custos e performance.",
                      features: [
                        "Estratégia cloud-first",
                        "Migração de dados",
                        "Otimização de custos",
                        "Arquitetura em nuvem"
                      ]
                    },
                    {
                      icon: <FileSpreadsheet className="h-8 w-8" />,
                      title: "Avaliações de TI",
                      description: "Realizamos análises completas da sua infraestrutura de TI para identificar oportunidades de melhoria e riscos.",
                      features: [
                        "Análise de maturidade",
                        "Avaliação de segurança",
                        "Diagnóstico de sistemas",
                        "Recomendações técnicas"
                      ]
                    },
                    {
                      icon: <LayoutGrid className="h-8 w-8" />,
                      title: "UX/UI Design",
                      description: "Criamos interfaces intuitivas e atraentes que proporcionam a melhor experiência para seus usuários.",
                      features: [
                        "Design de interfaces",
                        "Prototipagem",
                        "Testes de usabilidade",
                        "Design system"
                      ]
                    }
                  ].map((service, index) => (
                    <ScrollReveal key={index}>
                      <ServiceCard {...service} />
                    </ScrollReveal>
                  ))}
                </div>
              </div>
            </section>

            <section id="about" className="py-20 dark:bg-gray-900">
              <ScrollReveal>
                <div className="container mx-auto px-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 dark:text-white">Sobre Nós</h2>
                  <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                      <h3 className="text-2xl font-bold mb-6 dark:text-white">Transformando Ideias em Realidade Digital</h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        A Mattos Tech & Solutions é uma consultoria especializada em soluções tecnológicas que impulsionam o                crescimento de negócios. Atuamos desde 2017 oferecendo serviços completos que vão da criação de sites e sistemas personalizados à manutenção e evolução tecnológica de empresas.

                        Nosso time une visão estratégica, experiência técnica e compromisso com resultados para entregar soluções práticas, eficientes e sob medida para cada cliente.
                      </p>
                      <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                        Nossa equipe combina experiência técnica com criatividade para entregar soluções que não apenas
                        atendem, mas superam as expectativas dos nossos clientes.
                      </p>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">120+</div>
                          <div className="text-gray-600 dark:text-gray-300">Projetos Entregues</div>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">100%</div>
                          <div className="text-gray-600 dark:text-gray-300">Clientes Satisfeitos</div>
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <img
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                        alt="Team working together"
                        className="rounded-lg shadow-xl"
                      />
                      <div className="absolute -bottom-6 -right-6 bg-blue-600 text-white p-6 rounded-lg shadow-lg">
                        <p className="text-lg font-semibold">8 Anos de Experiência</p>
                        <p className="text-sm opacity-90">Desenvolvendo Soluções de Qualidade</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </section>

            <section id="target-audience" className="py-20 bg-gray-50 dark:bg-gray-800">
              <ScrollReveal>
                <div className="container mx-auto px-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 dark:text-white">
                    Atendemos empresas e profissionais com foco em resultados reais
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-300 text-center mb-12 max-w-4xl mx-auto">
                    Na Mattos Tech & Solutions, entendemos que cada cliente é único — por isso oferecemos soluções flexíveis, adaptadas tanto para empresas (CNPJ) quanto para profissionais autônomos (CPF) que desejam usar a tecnologia como aliada no crescimento.
                  </p>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg">
                      <div className="flex items-center mb-6">
                        <Building2 className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                        <h3 className="text-2xl font-bold ml-4 dark:text-white">Empresas (PJ)</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        Atendemos negócios de todos os portes, com foco em performance, escalabilidade e inovação. Oferecemos consultoria estratégica, desenvolvimento de sistemas personalizados, sites profissionais, integração com plataformas e suporte contínuo.
                      </p>
                    </div>

                    <div className="bg-white dark:bg-gray-700 p-8 rounded-xl shadow-lg">
                      <div className="flex items-center mb-6">
                        <UserCircle2 className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                        <h3 className="text-2xl font-bold ml-4 dark:text-white">Profissionais e Autônomos (PF)</h3>
                      </div>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        Se você é um profissional liberal, criador de conteúdo, prestador de serviços ou pequeno empreendedor, temos planos e soluções acessíveis para colocar seu projeto no ar com qualidade e profissionalismo, desde o site até orientações tecnológicas para crescer online.
                      </p>
                    </div>
                  </div>

                  <div className="mt-12 text-center">
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                      Nosso compromisso é entregar tecnologia que faz sentido para o seu momento, com atendimento humanizado e suporte que acompanha sua jornada.
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            </section>

            <section id="quote" className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
              <ScrollReveal>
                <div className="container mx-auto px-6">
                  <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-8">Transforme sua Visão em Realidade</h2>
                    <p className="text-xl mb-12 text-blue-100">
                      Cada projeto é único e merece uma solução personalizada. Entre em contato para uma cotação específica para suas necessidades.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
                        <Users className="h-12 w-12 mb-4 mx-auto text-blue-200" />
                        <h3 className="text-xl font-semibold mb-2">Consultoria Personalizada</h3>
                        <p className="text-blue-100">Análise detalhada das suas necessidades e objetivos</p>
                      </div>

                      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
                        <FileSpreadsheet className="h-12 w-12 mb-4 mx-auto text-blue-200" />
                        <h3 className="text-xl font-semibold mb-2">Proposta Detalhada</h3>
                        <p className="text-blue-100">Planejamento completo com cronograma e orçamento</p>
                      </div>

                      <div className="bg-white/10 backdrop-blur-lg rounded-lg p-6">
                        <Rocket className="h-12 w-12 mb-4 mx-auto text-blue-200" />
                        <h3 className="text-xl font-semibold mb-2">Implementação Ágil</h3>
                        <p className="text-blue-100">Desenvolvimento rápido e eficiente do seu projeto</p>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center">
                      <button
                        onClick={handleWhatsAppClick}
                        className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-semibold transition duration-300 flex items-center justify-center gap-2 text-lg"
                      >
                        <WhatsAppIcon className="h-6 w-6" />
                        <span>Solicitar Cotação via WhatsApp</span>
                      </button>

                      <a
                        href="#contact"
                        className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition duration-300 flex items-center justify-center gap-2 text-lg"
                      >
                        <Mail className="h-6 w-6" />
                        <span>Enviar Mensagem</span>
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </section>

            <section id="articles" className="py-20 dark:bg-gray-900">
              <ScrollReveal>
                <div className="container mx-auto px-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 dark:text-white">Últimos Blogs</h2>
                  <BlogPostsList websiteId="c2520460-21b9-4587-8759-a51658a1ad06" perPage={6} />
                </div>
              </ScrollReveal>
            </section>

            <section id="contact" className="py-20 dark:bg-gray-900">
              <ScrollReveal>
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
                        <button
                          onClick={handleInstagramClick}
                          className="flex items-center gap-2 text-pink-600 hover:text-pink-700 transition-colors"
                        >
                          <InstagramIcon className="h-5 w-5" />
                          <span>Instagram</span>
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
              </ScrollReveal>
            </section>
          </>
        } />
      </Routes>

      <footer className="bg-gray-900 text-white py-12">
        <ScrollReveal>
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
                  <button onClick={handleInstagramClick} className="hover:text-pink-400">
                    <InstagramIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </footer>
    </div>
  );
}

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}

function ServiceCard({ icon, title, description, features }: ServiceCardProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 border border-gray-100 dark:border-gray-700">
      <div className="text-blue-600 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3 dark:text-white">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-6">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-gray-700 dark:text-gray-300">
            <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;