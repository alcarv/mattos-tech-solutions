import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Article } from './ArticleCard';
import ReactMarkdown from 'react-markdown';

interface ArticleViewProps {
  article: Article;
  onBack: () => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({ article, onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <button
        onClick={onBack}
        className="flex items-center text-blue-600 dark:text-blue-400 mb-8 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
      >
        <ArrowLeft className="h-5 w-5 mr-2" />
        Back to Blogs
      </button>

      <img
        src={article.imageUrl}
        alt={article.title}
        className="w-full h-[400px] object-cover rounded-xl mb-8"
      />

      <div className="flex items-center justify-between mb-6">
        <span className="text-gray-500 dark:text-gray-400">{article.date}</span>
        <span className="text-gray-500 dark:text-gray-400">{article.readTime} read</span>
      </div>

      <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">{article.title}</h1>

      <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:text-gray-900 dark:prose-code:text-white prose-ul:text-gray-700 dark:prose-ul:text-gray-300">
        <ReactMarkdown>
          {article.context}
        </ReactMarkdown>
      </div>
    </div>
  );
};