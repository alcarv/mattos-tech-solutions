import React, { useState } from 'react';
import { useBlogPosts, BlogPost } from '../hooks/useBlogPosts';
import { Loader2, ArrowRight, Image as ImageIcon, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import ReactMarkdown from 'react-markdown';

interface BlogPostsListProps {
  websiteId: string;
  perPage?: number;
}

export const BlogPostsList: React.FC<BlogPostsListProps> = ({ websiteId, perPage = 10 }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const {
    posts,
    loading,
    error,
    hasMore,
    loadMore
  } = useBlogPosts({
    websiteId,
    perPage,
    orderBy: { column: 'published_at', ascending: false }
  });

  if (error) {
    return (
      <div className="text-red-600 dark:text-red-400 p-4 rounded-lg bg-red-50 dark:bg-red-900/20">
        Error: {error.message}
      </div>
    );
  }

  const formatDate = (date: string | null) => {
    if (!date) return 'Sem data';
    return format(new Date(date), "d 'de' MMMM 'de' yyyy", { locale: ptBR });
  };

  if (selectedPost) {
    return (
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => setSelectedPost(null)}
          className="flex items-center text-blue-600 dark:text-blue-400 mb-8 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Voltar para Blogs
        </button>

        {selectedPost.image_url && (
          <img
            src={selectedPost.image_url}
            alt={selectedPost.title}
            className="w-full h-[400px] object-cover rounded-xl mb-8"
          />
        )}

        <div className="flex items-center justify-between mb-6">
          <span className="text-gray-500 dark:text-gray-400">
            {formatDate(selectedPost.published_at || selectedPost.updated_at)}
          </span>
          <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
            selectedPost.published
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
          }`}>
            {selectedPost.published ? 'Publicado' : 'Rascunho'}
          </span>
        </div>

        <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
          {selectedPost.title}
        </h1>

        {selectedPost.description && (
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            {selectedPost.description}
          </p>
        )}

        <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:text-gray-900 dark:prose-code:text-white prose-ul:text-gray-700 dark:prose-ul:text-gray-300">
          <ReactMarkdown>{selectedPost.content}</ReactMarkdown>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post: BlogPost) => (
          <article
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-[1.02]"
          >
            {post.image_url ? (
              <div className="aspect-video w-full overflow-hidden">
                <img
                  src={post.image_url}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-video w-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                <ImageIcon className="h-12 w-12 text-gray-400 dark:text-gray-500" />
              </div>
            )}
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {formatDate(post.published_at || post.updated_at)}
                </span>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  post.published
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                }`}>
                  {post.published ? 'Publicado' : 'Rascunho'}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
                {post.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {post.description}
              </p>
              <button
                onClick={() => setSelectedPost(post)}
                className="flex items-center text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
              >
                Ler Mais
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </article>
        ))}
      </div>

      {loading && (
        <div className="flex justify-center p-4">
          <Loader2 className="animate-spin h-8 w-8 text-blue-600 dark:text-blue-400" />
        </div>
      )}

      {hasMore && !loading && (
        <div className="flex justify-center">
          <button
            onClick={() => loadMore()}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Load More
          </button>
        </div>
      )}

      {!loading && posts.length === 0 && (
        <div className="text-center text-gray-600 dark:text-gray-400 p-8">
          No blog posts found.
        </div>
      )}
    </div>
  );
};