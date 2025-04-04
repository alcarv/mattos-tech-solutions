import React, { useState, FormEvent } from 'react';
import { Code2, Globe, Laptop, MessageSquare, MonitorSmartphone, Rocket, Star, Check, Sparkles } from 'lucide-react';
import { WhatsAppIcon } from './components/WhatsAppIcon';
import { ArticleCard, Article } from './components/ArticleCard';
import { ArticleView } from './components/ArticleView';
import { Pagination } from './components/Pagination';
import { articles } from './data/articles';
import { CodeAnimation } from './components/CodeAnimation';
import { ThemeToggle } from './components/ThemeToggle';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';

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
  const articlesPerPage = 3;
  
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/+5500000000000', '_blank');
  };

  const handleArticleClick = (id: string) => {
    const article = articles.find(a => a.id === id);
    if (article) {
      setSelectedArticle(article);
      window.scrollTo(0, 0);
    }
  };

  const handleBackToArticles = () => {
    setSelectedArticle(null);
  };

  const handlePageChange = (page: number) => {
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
        'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
        'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
        {
          from_name: formData.name,
          from_email: formData.email,
          from_phone: formData.phone,
          message: formData.message,
        },
        'YOUR_PUBLIC_KEY' // Replace with your EmailJS public key
      );

      if (result.status === 200) {
        toast.success('Message sent successfully!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      }
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
      console.error('Error sending email:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Calculate pagination
  const totalPages = Math.ceil(articles.length / articlesPerPage);
  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle);

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

      {/* Promotional Banner */}
      <div className="bg-yellow-400 text-black py-3 px-4">
        <div className="container mx-auto text-center">
          <p className="font-bold text-lg">🚀 Special Offer: Website Development starting at R$400! 🚀</p>
        </div>
      </div>

      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Code2 className="h-8 w-8" />
              <span className="text-xl font-bold">Mattos Tech & Solutions</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#services" className="hover:text-blue-200 dark:text-gray-300 dark:hover:text-white">Services</a>
              <a href="#pricing" className="hover:text-blue-200 dark:text-gray-300 dark:hover:text-white">Pricing</a>
              <a href="#about" className="hover:text-blue-200 dark:text-gray-300 dark:hover:text-white">About</a>
              <a href="#articles" className="hover:text-blue-200 dark:text-gray-300 dark:hover:text-white">Articles</a>
              <a href="#testimonials" className="hover:text-blue-200 dark:text-gray-300 dark:hover:text-white">Testimonials</a>
              <a href="#contact" className="hover:text-blue-200 dark:text-gray-300 dark:hover:text-white">Contact</a>
              <ThemeToggle />
            </div>
          </div>
        </nav>
        
        <div className="container mx-auto px-6 py-20 md:py-32">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Transform Your Digital Presence
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-blue-100">
                Custom web development and technology solutions tailored to your business needs
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#contact"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition duration-300 text-center"
                >
                  Get Started
                </a>
                <button 
                  onClick={handleWhatsAppClick}
                  className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition duration-300 flex items-center justify-center gap-2"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  <span>Get a Quote</span>
                </button>
              </div>
            </div>
            <div className="hidden md:block">
              <CodeAnimation />
            </div>
          </div>
        </div>
      </header>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 dark:text-white">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard 
              icon={<Globe className="h-8 w-8" />}
              title="Web Development"
              description="Custom websites built with modern technologies and best practices. Starting at R$400"
              price="From R$400"
            />
            <ServiceCard 
              icon={<MonitorSmartphone className="h-8 w-8" />}
              title="Responsive Design"
              description="Mobile-first websites that work perfectly on all devices"
              price="Included"
            />
            <ServiceCard 
              icon={<Rocket className="h-8 w-8" />}
              title="Performance Optimization"
              description="Fast-loading websites optimized for search engines"
              price="Included"
            />
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 dark:text-white">Simple Pricing</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Static Website Package */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
              <div className="p-8 bg-blue-600 text-white">
                <h3 className="text-2xl font-bold mb-2">Static Website Package</h3>
                <p className="text-4xl font-bold mb-4">R$400</p>
                <p className="text-blue-100">Perfect for small businesses and personal websites</p>
              </div>
              <div className="p-8">
                <ul className="space-y-4">
                  {[
                    'Professional website design',
                    'Mobile responsive layout',
                    'Up to 5 pages',
                    'Contact form',
                    'SEO optimization',
                    'Fast loading performance',
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
                    Get Started
                  </button>
                </div>
              </div>
            </div>

            {/* Custom Solutions Package */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border-2 border-indigo-500">
              <div className="p-8 bg-gradient-to-r from-indigo-600 to-purple-600 text-white relative">
                <div className="absolute top-4 right-4">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold mb-2">Custom Solutions</h3>
                <p className="text-4xl font-bold mb-4">Custom Quote</p>
                <p className="text-indigo-100">Tailored solutions for your unique needs</p>
              </div>
              <div className="p-8">
                <ul className="space-y-4">
                  {[
                    'Everything in Static Package',
                    'Custom functionality',
                    'Database integration',
                    'User authentication',
                    'Admin dashboard',
                    'API integration',
                    'Unlimited pages',
                    'Premium support',
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
                    Get a Quote
                  </button>
                  <p className="mt-4 text-gray-600 dark:text-gray-400 text-sm">
                    Contact us for a personalized solution that fits your needs and budget
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
              <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-white">About Us</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We're passionate about creating exceptional digital experiences that help businesses thrive in the modern world. With years of experience in web development and technology solutions, we bring expertise and innovation to every project.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3 dark:text-gray-300">
                  <Laptop className="h-5 w-5 text-blue-600" />
                  <span>Expert development team</span>
                </li>
                <li className="flex items-center space-x-3 dark:text-gray-300">
                  <Rocket className="h-5 w-5 text-blue-600" />
                  <span>Cutting-edge technologies</span>
                </li>
                <li className="flex items-center space-x-3 dark:text-gray-300">
                  <MessageSquare className="h-5 w-5 text-blue-600" />
                  <span>Dedicated support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section id="articles" className="py-20 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 dark:text-white">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentArticles.map(article => (
              <ArticleCard 
                key={article.id} 
                article={article} 
                onClick={handleArticleClick}
              />
            ))}
          </div>
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 dark:text-white">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <TestimonialCard
              name="Maria Silva"
              role="Restaurant Owner"
              image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
              content="The website they created for my restaurant perfectly captures our atmosphere and has significantly increased our online reservations."
            />
            <TestimonialCard
              name="João Santos"
              role="Fitness Trainer"
              image="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80"
              content="Professional service from start to finish. My fitness coaching website looks amazing and works flawlessly on all devices."
            />
            <TestimonialCard
              name="Ana Costa"
              role="Boutique Owner"
              image="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&h=150&q=80"
              content="They transformed my online presence completely. The website is beautiful and has helped increase my sales significantly."
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 dark:text-white">Get In Touch</h2>
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <p className="text-xl mb-4 dark:text-gray-300">Contact us directly:</p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={handleWhatsAppClick}
                  className="flex items-center gap-2 text-[#25D366] hover:text-[#128C7E]"
                >
                  <WhatsAppIcon className="h-5 w-5" />
                  <span>Get a Quote on WhatsApp</span>
                </button>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Your name"
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
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Your phone number"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="Tell us about your project"
                ></textarea>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
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
              <div className="flex items-center justify-center md:justify-end gap-4 mt-2">
                <button onClick={handleWhatsAppClick} className="hover:text-[#25D366]">
                  <WhatsAppIcon className="h-5 w-5" />
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