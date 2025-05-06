import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import ReactMarkdown from 'react-markdown';
import { useBlogPost } from '../hooks/useBlogPost';
import { Helmet } from 'react-helmet-async';

export const BlogPostPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { post, loading, error } = useBlogPost(id!);

  const handleBack = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      navigate('/#articles');
    }, 300);
  };

  const formatDate = (date: string | null) => {
    if (!date) return 'Sem data';
    return format(new Date(date), "d 'de' MMMM 'de' yyyy", { locale: ptBR });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen pt-20">
        <Loader2 className="animate-spin h-8 w-8 text-blue-600 dark:text-blue-400" />
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-12">
        <Link
          to="/#articles"
          onClick={handleBack}
          className="flex items-center text-blue-600 dark:text-blue-400 mb-8 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Voltar para Home
        </Link>
        <div className="text-red-600 dark:text-red-400 p-4 rounded-lg bg-red-50 dark:bg-red-900/20">
          {error?.message || 'Post não encontrado'}
        </div>
      </div>
    );
  }

  const publishDate = post.published_at || post.updated_at;
  const formattedDate = formatDate(publishDate);

  return (
    <>
      <Helmet>
        <title>{`${post.title} | Mattos Tech Solutions Blog`}</title>
        <meta name="description" content={post.description} />
        <meta name="author" content="Mattos Tech Solutions" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        {post.image_url && <meta property="og:image" content={post.image_url} />}
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={publishDate} />
        
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": post.title,
            "description": post.description,
            "image": post.image_url,
            "datePublished": publishDate,
            "dateModified": post.updated_at,
            "author": {
              "@type": "Organization",
              "name": "Mattos Tech Solutions"
            },
            "publisher": {
              "@type": "Organization",
              "name": "Mattos Tech Solutions",
              "logo": {
                "@type": "ImageObject",
                "url": "https://mattostechsolutions.com/favicon.svg"
              }
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `https://mattostechsolutions.com/blog/${post.id}`
            }
          })}
        </script>
      </Helmet>

      <article className="max-w-4xl mx-auto px-6 pt-24 pb-12">
        <Link
          to="/#articles"
          onClick={handleBack}
          className="flex items-center text-blue-600 dark:text-blue-400 mb-8 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Voltar para Home
        </Link>

        {post.image_url && (
          <img
            src={post.image_url}
            alt={post.title}
            className="w-full h-[400px] object-cover rounded-xl mb-8"
            loading="lazy"
          />
        )}

        <div className="flex items-center justify-between mb-6">
          <time 
            dateTime={publishDate}
            className="text-gray-500 dark:text-gray-400"
          >
            {formattedDate}
          </time>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
            post.published
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
          }`}>
            {post.published ? 'Publicado' : 'Rascunho'}
          </span>
        </div>

        <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
          {post.title}
        </h1>

        {post.description && (
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {post.description}
          </p>
        )}

        <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:text-gray-900 dark:prose-code:text-white prose-ul:text-gray-700 dark:prose-ul:text-gray-300">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
    </>
  );
};