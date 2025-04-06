import React from 'react';
import { ArrowRight } from 'lucide-react';

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  imageUrl: string;
  context: string;
}

interface ArticleCardProps {
  article: Article;
  onClick: (id: string) => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onClick }) => {
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-transform duration-300 hover:scale-[1.02]"
      onClick={() => onClick(article.id)}
    >
      <img 
        src={article.imageUrl} 
        alt={article.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500 dark:text-gray-400">{article.date}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">{article.readTime} read</span>
        </div>
        <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{article.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{article.excerpt}</p>
        <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold">
          Leia Mais
          <ArrowRight className="ml-2 h-4 w-4" />
        </div>
      </div>
    </div>
  );
};